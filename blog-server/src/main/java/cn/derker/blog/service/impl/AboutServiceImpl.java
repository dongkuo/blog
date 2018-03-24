package cn.derker.blog.service.impl;

import cn.derker.blog.dao.mapper.AboutMapper;
import cn.derker.blog.domain.entity.About;
import cn.derker.blog.domain.model.Pageable;
import cn.derker.blog.service.AboutService;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author derker
 * @since 2017.12.17 17:22
 */
@Service
public class AboutServiceImpl implements AboutService {

    @Resource
    private AboutMapper aboutMapper;

    @Override
    public About getAbout(Integer id) {
        return aboutMapper.selectByPrimaryKey(id);
    }

    @Override
    public About getFirstVisibleAbout() {
        List<About> aboutList = listAbout(true, new Pageable(1, 1));
        return aboutList.isEmpty() ? null : aboutList.get(0);
    }

    @Override
    public List<About> listAbout(Boolean visible, Pageable pageable) {
        Example example = new Example(About.class);
        example.createCriteria()
                .andEqualTo("visible", visible);
        List<About> aboutList = aboutMapper.selectByExampleAndRowBounds(example, pageable.getPageRowBounds());
        return aboutList;
    }

    @Override
    public int updateAbout(About about) {
        return aboutMapper.updateByPrimaryKeySelective(about);
    }

    @Override
    public int addAbout(About about) {
        return aboutMapper.insert(about);
    }
}
