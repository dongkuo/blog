package cn.derker.blog.web.api;

import cn.derker.blog.annotation.ApiExclude;
import cn.derker.blog.domain.entity.About;
import cn.derker.blog.domain.model.ApiResult;
import cn.derker.blog.service.AboutService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * 关于Api
 *
 * @author derker
 * @since 2017.12.17 17:16
 */
@RestController
@RequestMapping("/about")
public class AboutApi {

    @Resource
    private AboutService aboutService;

    @GetMapping
    @ApiExclude(clazz = About.class, fields = "visible")
    public ApiResult getFirstVisibleAbout() {
        return ApiResult.ok(aboutService.getFirstVisibleAbout());
    }
}
