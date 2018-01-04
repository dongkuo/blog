package cn.derker.blog.exception.base;

import org.springframework.http.HttpStatus;

/**
 * @author derker
 * @since 2017-10-14 17:32
 */
public class BaseException extends RuntimeException{

    private int code;
    private HttpStatus status;

    public BaseException(int code, String message, HttpStatus status) {
        super(message);
        this.code = code;
        this.status = status;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }
}
