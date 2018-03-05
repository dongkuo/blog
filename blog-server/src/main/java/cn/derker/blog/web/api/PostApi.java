package cn.derker.blog.web.api;

import cn.derker.blog.annotation.Api;
import cn.derker.blog.annotation.ApiExclude;
import cn.derker.blog.annotation.ApiInclude;
import cn.derker.blog.domain.entity.Post;
import cn.derker.blog.domain.model.Page;
import cn.derker.blog.domain.model.Pageable;
import cn.derker.blog.service.PostService;
import cn.derker.blog.util.BeanUtil;
import cn.derker.blog.util.IdUtil;
import cn.derker.blog.util.MarkdownUtil;
import cn.derker.blog.util.RegexUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * @author derker
 * @since 2017-10-10 19:21
 */
@Controller
@Api
@RequestMapping("/posts")
public class PostApi {

    private static final Logger LOGGER = LoggerFactory.getLogger(PostApi.class);

    @Autowired
    private PostService postService;

    /**
     * 获取文章归档
     */
    @GetMapping("/archives")
    @ApiInclude(clazz = Post.class, fields = {"id", "finished_time", "title"})
    public List<Post> getArchives() {
        return postService.listPost();
    }

    /**
     * 获取文章列表
     *
     * @param pageable
     * @return
     */
    @GetMapping
    @ApiExclude(clazz = Post.class, fields = {"html", "markdown"})
    public Page<Post> listPosts(Integer categoryId, Pageable pageable) {
        return postService.listPost(categoryId, pageable);
    }

    /**
     * 根据id获取文章
     *
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    @ApiExclude(clazz = Post.class, fields = "category_id")
    public Post getPost(@PathVariable Integer id) {
        return postService.getPost(id);
    }

    /**
     * 删除文章
     *
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    public void removePost(@PathVariable Integer id) {
        id = IdUtil.decode(id);
        postService.removePost(id);
    }

    /**
     * 添加文章
     *
     * @param post
     * @return
     */
    @PostMapping
    @ApiInclude(clazz = Post.class, fields = {"id"})
    public Post savePost(@RequestBody Post post) {
        Post newPost = new Post();

        // title（必须）
        String title = post.getTitle();
        Assert.hasLength(title, "文章标题不能为空.");
        newPost.setTitle(title);

        // markdown（必须）
        String markdown = post.getMarkdown();
        Assert.hasLength(markdown, "文章内容(markdown)不能为空.");
        newPost.setMarkdown(markdown);

        // coverImage, coverCaption, readingNumber, likeNumber, commentingNumber(可选)
        BeanUtil.copySpecifiedProperties(post, newPost,
                "coverImage", "coverCaption", "readingNumber",
                "likeNumber", "commentingNumber", "finishedTime");

        // html
        String html = MarkdownUtil.markdown2html(markdown);
        Assert.hasLength(html, "markdown解析失败.");
        newPost.setHtml(html);

        // summary
        String summary = RegexUtil.filterHtmlTag(html, 200);
        newPost.setSummary(summary);

        // 保证finishedTime有值
        if (newPost.getFinishedTime() == null) {
            newPost.setFinishedTime(new Date());
        }

        newPost.setCategoryId(post.getCategoryId());
        postService.insertPost(newPost);
        LOGGER.debug("保存文章：{}", newPost);
        return newPost;
    }

    /**
     * 修改文章
     *
     * @param id   文章id
     * @param post 修改后的文章
     * @return
     */
    @PatchMapping("/{id}")
    public Object updatePost(@PathVariable("id") Integer id, @RequestBody Post post) {
        Post updatedPost = new Post();

        // id
        Assert.notNull(id, "文章id不能为空");
        updatedPost.setId(id);

        // coverImage, coverCaption, readingNumber, likeNumber, commentingNumber(可选)
        BeanUtil.copySpecifiedProperties(post, updatedPost, "title", "markdown",
                "coverImage", "coverCaption", "readingNumber",
                "likeNumber", "commentingNumber", "finishedTime");

        // html, summary
        String markdown = post.getMarkdown();
        if (markdown != null) {
            String html = MarkdownUtil.markdown2html(markdown);
            Assert.hasLength(html, "markdown解析失败.");
            updatedPost.setHtml(html);
            String summary = RegexUtil.filterHtmlTag(html, 200);
            updatedPost.setSummary(summary);
        }

        postService.updatePost(updatedPost);
        LOGGER.debug("修改文章： {}", updatedPost);
        return null;
    }
}

