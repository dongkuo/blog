package cn.derker.blog.service.impl;

import cn.derker.blog.dao.mapper.PostMapper;
import cn.derker.blog.domain.entity.Post;
import cn.derker.blog.domain.model.Page;
import cn.derker.blog.domain.model.Pageable;
import cn.derker.blog.exception.InsertException;
import cn.derker.blog.exception.RemoveException;
import cn.derker.blog.service.PostService;
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


    @Override
    public Page<Post> listPost(Pageable pageable) {
        Example example = new Example(Post.class);
        example.setOrderByClause("finished_time DESC");
        example.excludeProperties("html", "markdown");
        List<Post> content = postMapper.selectByExampleAndRowBounds(example, pageable.getPageRowBounds());
        int total = postMapper.selectCount(null);
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
    public List<Post> allPost() {
        Example example = new Example(Post.class);
        example.selectProperties("id", "title", "finishedTime");
        example.setOrderByClause("finished_time DESC");
        return postMapper.selectByExample(example);
    }
}
