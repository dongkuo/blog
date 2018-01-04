package cn.derker.blog.exception;

import cn.derker.blog.exception.base.BaseException;
import org.springframework.http.HttpStatus;

/**
 * @author derker
 * @since 2017-10-14 17:34
 */
public class RemoveException extends BaseException {

    public RemoveException(String message) {
        this(2000, message);
    }

    public RemoveException(int code, String message) {
        super(code, message, HttpStatus.FORBIDDEN);
    }
}
