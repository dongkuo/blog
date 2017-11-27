package cn.derker.blog.service;

import cn.derker.blog.domain.model.Page;
import cn.derker.blog.domain.model.Pageable;
import cn.derker.blog.domain.entity.Moment;

/**
 * @author derker
 * @since 2017.11.27 22:28
 */
public interface MomentService {

    Page<Moment> list(Pageable pageable);
}
