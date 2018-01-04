package cn.derker.blog.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.http.HttpStatus;

/**
 * @author derker
 * @since 2017-10-13 21:07
 */
public class ApiResult {

    private int code;
    private Object data;
    private String error;
    @JsonIgnore
    private int status;

    private static ApiResult EMPTY;

    public static ApiResult empty() {
        if (EMPTY == null) {
            synchronized (ApiResult.class) {
                if (EMPTY == null) {
                    EMPTY = ApiResult.ok(null, HttpStatus.NO_CONTENT.value());
                }
            }
        }
        return EMPTY;
    }

    public static ApiResult ok(Object data) {
        return ok(data, HttpStatus.OK.value());
    }

    public static ApiResult ok(Object data, int status) {
        ApiResult result = new ApiResult();
        result.code = 0;
        result.data = data;
        result.status = status;
        return result;
    }

    public static ApiResult error(int code, String error) {
        return error(code, error, HttpStatus.BAD_REQUEST.value());
    }

    public static ApiResult error(int code, String error, int status) {
        ApiResult result = new ApiResult();
        result.code = code;
        result.error = error;
        result.status = status;
        return result;
    }

    public int getCode() {
        return code;
    }


    public Object getData() {
        return data;
    }

    public String getError() {
        return error;
    }

    public int getStatus() {
        return status;
    }
}
