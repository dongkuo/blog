package cn.derker.blog.web.api;

import cn.derker.blog.annotation.Api;
import cn.derker.blog.annotation.ApiExclude;
import cn.derker.blog.annotation.ApiInclude;
import cn.derker.blog.domain.entity.Post;
import cn.derker.blog.domain.model.ApiResult;
import cn.derker.blog.domain.model.Pageable;
import cn.derker.blog.service.PostService;
import cn.derker.blog.util.BeanUtil;
import cn.derker.blog.util.IdUtil;
import cn.derker.blog.util.MarkdownUtil;
import cn.derker.blog.util.RegexUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

/**
 * @author derker
 * @since 2017-10-10 19:21
 */
@Controller
@Api
@RequestMapping("/posts")
public class PostApi {

    @Autowired
    private PostService postService;

    /**
     * 获取文章归档
     */
    @GetMapping("/all")
    @ApiInclude(clazz = Post.class, fields = {"id", "finished_time", "title"})
    public ApiResult allPost() {
        return ApiResult.ok(postService.allPost());
    }

    /**
     * 获取文章列表
     *
     * @param pageable
     * @return
     */
    @GetMapping("/list")
    @ApiExclude(clazz = Post.class, fields = {"html", "markdown"})
    public ApiResult listPost(Pageable pageable) {
        return ApiResult.ok(postService.listPost(pageable));
    }

    /**
     * 根据id获取文章
     *
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    public ApiResult getPost(@PathVariable Integer id) {
        id = IdUtil.decode(id);
        return ApiResult.ok(postService.getPost(id));
    }

    /**
     * 删除文章
     *
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    public ApiResult removePost(@PathVariable Integer id) {
        id = IdUtil.decode(id);
        postService.removePost(id);
        return ApiResult.empty();
    }

    /**
     * 添加文章
     *
     * @param post
     * @return
     */
    @PostMapping
    public ApiResult insertPost(@RequestBody Post post) {
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

        System.out.println(html.length());

        // summary
        String summary = RegexUtil.filterHtmlTag(html, 200);
        newPost.setSummary(summary);

        // 保证finishedTime有值
        if (newPost.getFinishedTime() == null) {
            newPost.setFinishedTime(new Date());
        }

        postService.insertPost(newPost);
        return ApiResult.empty();
    }
}

