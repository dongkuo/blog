package cn.derker.blog.service;

import cn.derker.blog.domain.entity.Post;
import cn.derker.blog.domain.model.Page;
import cn.derker.blog.domain.model.Pageable;

import java.util.List;

/**
 * @author derker
 * @since 2017-10-10 19:16
 */
public interface PostService {
    Page<Post> listPost(Pageable pageable);

    Post getPost(Integer id);

    void removePost(Integer id);

    int insertPost(Post postPostser);

    List<Post> allPost();
}
