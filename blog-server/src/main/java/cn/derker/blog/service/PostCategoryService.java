package cn.derker.blog.service;

import cn.derker.blog.domain.entity.PostCategory;

import java.util.List;

/**
 * @author derker
 * @date 2017-12-28 15：47
 */
public interface PostCategoryService {

    List<PostCategory> listPostCategory(boolean showInvisible);

    int savePostCategory(PostCategory postCategory);

    int deletePostCategory(Integer id);

    int updatePostCategory(PostCategory postCategory);
}
