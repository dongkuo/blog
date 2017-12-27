package cn.derker.blog.service.impl;

import cn.derker.blog.dao.mapper.PostCategoryMapper;
import cn.derker.blog.dao.mapper.PostMapper;
import cn.derker.blog.domain.entity.Post;
import cn.derker.blog.domain.entity.PostCategory;
import cn.derker.blog.domain.model.Page;
import cn.derker.blog.domain.model.Pageable;
import cn.derker.blog.exception.InsertException;
import cn.derker.blog.exception.RemoveException;
import cn.derker.blog.service.PostService;
import com.github.pagehelper.PageRowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Example;

import java.util.List;


/**
 * @author derker
 * @since 2017-10-10 19:17
 */
@Service
public class PostServiceImpl implements PostService {


    @Autowired
    private PostMapper postMapper;
    @Autowired
    private PostCategoryMapper postCategoryMapper;


    @Override
    public Page<Post> listPost(Integer categoryId, Pageable pageable) {
        Example example = new Example(Post.class);
        example.setOrderByClause("finished_time DESC");
        example.excludeProperties("html", "markdown");
        example.createCriteria().andEqualTo("categoryId", categoryId);
        PageRowBounds pageRowBounds = pageable.getPageRowBounds();
        List<Post> content = postMapper.selectByExampleAndRowBounds(example, pageRowBounds);
        long total = pageRowBounds.getTotal();
        return new Page<>(content, pageable, total);
    }

    @Override
    public Post getPost(Integer id) {
        return postMapper.selectByPrimaryKey(id);
    }

    @Override
    public void removePost(Integer id) {
        int row = postMapper.deleteByPrimaryKey(id);
        if (row == 0) {
            throw new RemoveException("删除文章失败");
        }
    }

    @Override
    public int insertPost(Post post) {
        int row = postMapper.insert(post);
        if (row == 0) {
            throw new InsertException("添加文章失败");
        }
        return row;
    }

    @Override
    public List<Post> listPost() {
        Example example = new Example(Post.class);
        example.selectProperties("id", "title", "finishedTime");
        example.setOrderByClause("finished_time DESC");
        return postMapper.selectByExample(example);
    }

    @Override
    public List<PostCategory> listPostCategory() {
        Example example = new Example(PostCategory.class);
        example.setOrderByClause("sort_value ASC");
        return postCategoryMapper.selectByExample(example);
    }
}
