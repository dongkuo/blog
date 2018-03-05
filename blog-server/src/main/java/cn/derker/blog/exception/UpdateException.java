package cn.derker.blog.exception;

import cn.derker.blog.exception.base.BaseException;
import org.springframework.http.HttpStatus;

public class UpdateException extends BaseException {

    public UpdateException(String message) {
        this(2000, message);
    }

    public UpdateException(int code, String message) {
        super(code, message, HttpStatus.FORBIDDEN);
    }
}
