package cn.derker.blog.exception;

import cn.derker.blog.exception.base.BaseException;
import org.springframework.http.HttpStatus;

/**
 * @author derker
 * @since 2017-10-18 23:13
 */
public class InsertException extends BaseException {

    public InsertException(String message) {
        this(2000, message);
    }

    public InsertException(int code, String message) {
        super(code, message, HttpStatus.BAD_REQUEST);
    }
}
