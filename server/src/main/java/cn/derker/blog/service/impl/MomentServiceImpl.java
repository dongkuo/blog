package cn.derker.blog.service.impl;

import cn.derker.blog.dao.mapper.MomentMapper;
import cn.derker.blog.domain.entity.Moment;
import cn.derker.blog.domain.model.Page;
import cn.derker.blog.domain.model.Pageable;
import cn.derker.blog.service.MomentService;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author derker
 * @since 2017.11.27 22:32
 */
@Service
public class MomentServiceImpl implements MomentService {

    @Resource
    private MomentMapper momentMapper;

    @Override
    public Page<Moment> list(Pageable pageable) {
        Example example = new Example(Moment.class);
        example.setOrderByClause("created_time desc");
        List<Moment> moments = momentMapper.selectByExampleAndRowBounds(example, pageable.getPageRowBounds());
        int total = momentMapper.selectCount(null);
        return new Page<>(moments, pageable, total);
    }
}
