package cn.derker.blog.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author derker
 * @since 2017-10-13 19:29
 */
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ApiInclude {

    /**
     * json中包含的字段
     */
    String[] fields();

    Class<?> clazz() default Object.class;
}
