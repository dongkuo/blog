package cn.derker.blog.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author derker
 * @since 2017-10-13 19:26
 */
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ApiExcludes {

    /**
     * json中需要出去的字段
     */
    ApiExclude[] value();
}
