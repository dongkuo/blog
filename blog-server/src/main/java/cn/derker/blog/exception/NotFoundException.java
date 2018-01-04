package cn.derker.blog.exception;

import cn.derker.blog.exception.base.BaseException;
import org.springframework.http.HttpStatus;

/**
 * @author derker
 * @since 2017-10-14 18:07
 */
public class NotFoundException extends BaseException {

    public NotFoundException(String message) {
        super(HttpStatus.NOT_FOUND.value(), message, HttpStatus.NOT_FOUND);
    }
}
