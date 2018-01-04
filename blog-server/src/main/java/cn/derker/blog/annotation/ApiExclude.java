package cn.derker.blog.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author derker
 * @since 2017-10-13 19:28
 */
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ApiExclude {

    /**
     * json中需要去除的字段
     */
    String[] fields();

    /**
     * 去除字段的class
     */
    Class<?> clazz() default Object.class;
}
