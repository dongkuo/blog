package cn.derker.blog.service;

import cn.derker.blog.domain.entity.About;
import cn.derker.blog.domain.model.Pageable;

/**
 * @author derker
 * @since 2017.12.17 17:17
 */
public interface AboutService {

    About getAbout(Integer id, Boolean visible, Pageable pageable);

    int updateAbout(About about);

    int addAbout(About about);
}
