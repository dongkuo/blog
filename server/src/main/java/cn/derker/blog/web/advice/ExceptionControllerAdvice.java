package cn.derker.blog.web.advice;

import cn.derker.blog.domain.model.ApiResult;
import cn.derker.blog.exception.base.BaseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author derker
 * @since 2017-10-14 17:40
 */
@ControllerAdvice
public class ExceptionControllerAdvice {

    /**
     * 处理自定义异常
     */
    @ExceptionHandler(value = BaseException.class)
    @ResponseBody
    public ResponseEntity handle(BaseException e) {
        return ResponseEntity.status(e.getStatus()).body(ApiResult.error(e.getCode(), e.getMessage()));
    }

    /**
     * 请求体解析异常
     */
    @ExceptionHandler(value = HttpMessageNotReadableException.class)
    @ResponseBody
    public ResponseEntity handle(HttpMessageNotReadableException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResult.error(HttpStatus.BAD_REQUEST.value(), "request body is missing or illegal"));
    }

    /**
     * 不合法参数异常
     */
    @ExceptionHandler(value = IllegalArgumentException.class)
    @ResponseBody
    public ResponseEntity handle(IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResult.error(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
    }



}
