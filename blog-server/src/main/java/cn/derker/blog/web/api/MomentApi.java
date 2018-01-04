package cn.derker.blog.web.api;

import cn.derker.blog.annotation.Api;
import cn.derker.blog.domain.model.ApiResult;
import cn.derker.blog.domain.model.Pageable;
import cn.derker.blog.service.MomentService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

/**
 * @author derker
 * @since 2017.11.27 22:26
 */
@Controller
@Api
@RequestMapping("/moments")
public class MomentApi {

    @Resource
    private MomentService momentService;

    @GetMapping
    public ApiResult list(Pageable pageable) {
        return ApiResult.ok(momentService.list(pageable));
    }
}
