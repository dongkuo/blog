package cn.derker.blog.dao.base;

import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.common.MySqlMapper;

/**
 * @author derker
 * @since 2017-10-10 19:06
 */
public interface BaseMapper<T> extends Mapper<T>, MySqlMapper<T> {
}
