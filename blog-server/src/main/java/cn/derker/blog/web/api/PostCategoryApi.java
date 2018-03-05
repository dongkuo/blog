package cn.derker.blog.web.api;

import cn.derker.blog.annotation.Api;
import cn.derker.blog.annotation.ApiInclude;
import cn.derker.blog.domain.entity.PostCategory;
import cn.derker.blog.domain.entity.User;
import cn.derker.blog.domain.model.ApiResult;
import cn.derker.blog.service.PostCategoryService;
import cn.derker.blog.util.BeanUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

/**
 * @author derker
 * @date 2017-12-28 15：49
 */
@RestController
@RequestMapping("/post_categories")
public class PostCategoryApi extends BaseApi {

    private static final long DEFINED_TIME = 1514991663800L;

    private static final Logger LOGGER = LoggerFactory.getLogger(PostCategoryApi.class);

    @Autowired
    private PostCategoryService postCategoryService;


    /**
     * 获取所有的文章分类（visible = true）
     *
     * @return
     */
    @GetMapping
    @ApiInclude(clazz = PostCategory.class, fields = {"id", "name", "url", "visible"})
    public ApiResult allPostCategories() {
        User user = currentUser();
        boolean showInvisible = user != null;
        return ApiResult.ok(postCategoryService.listPostCategory(showInvisible));
    }

    /**
     * 添加文章分类
     *
     * @return
     */
    @PostMapping
    @ApiInclude(clazz = PostCategory.class, fields = {"id", "name", "url", "visible"})
    public ApiResult savePostCategory(@RequestBody PostCategory postCategory) {
        Assert.hasLength(postCategory.getName(), "文章分类名称不能为空.");
        Assert.hasLength(postCategory.getUrl(), "文章分类url不能为空.");

        PostCategory newPostCategory = new PostCategory();
        BeanUtil.copySpecifiedProperties(postCategory, newPostCategory, "name", "url");
        newPostCategory.setVisible(true);
        newPostCategory.setSortValue((int) ((System.currentTimeMillis() - DEFINED_TIME) / 1000));
        postCategoryService.savePostCategory(newPostCategory);
        return ApiResult.ok(newPostCategory);
    }

    /**
     * 删除文章分类
     *
     * @return
     */
    @DeleteMapping("/{id}")
    public ApiResult deletePostCategory(@PathVariable("id") Integer id) {
        LOGGER.info("==> 删除文章分类, id = {}", id);
        postCategoryService.deletePostCategory(id);
        return ApiResult.empty();
    }

    /**
     * 更新文章分类
     *
     * @return
     */
    @PatchMapping("/{id}")
    public ApiResult updatePostCategory(@PathVariable("id") Integer id, @RequestBody PostCategory postCategory) {
        LOGGER.info("==> 更新文章分类, id = {}, postCategory = {}", id, postCategory);
        Assert.hasLength(postCategory.getName(), "文章分类name字段不能为空.");
        Assert.hasLength(postCategory.getUrl(), "文章分类url字段不能为空.");
        Assert.notNull(postCategory.getVisible(), "文章分类visible字段不能为空.");

        PostCategory newPostCategory = new PostCategory();
        BeanUtil.copySpecifiedProperties(postCategory, newPostCategory,
                "id", "name", "url", "visible", "sortValue");

        postCategoryService.updatePostCategory(postCategory);
        return ApiResult.empty();
    }
}
