package cn.derker.blog.web.api;

import cn.derker.blog.annotation.Api;
import cn.derker.blog.annotation.ApiExclude;
import cn.derker.blog.domain.entity.About;
import cn.derker.blog.domain.model.ApiResult;
import cn.derker.blog.domain.model.Pageable;
import cn.derker.blog.service.AboutService;
import cn.derker.blog.util.IdUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

/**
 * 关于Api
 *
 * @author derker
 * @since 2017.12.17 17:16
 */
@Controller
@Api
@RequestMapping("/about")
public class AboutApi {

    @Resource
    private AboutService aboutService;

    @GetMapping
    @ApiExclude(clazz = About.class, fields = "visible")
    public ApiResult get(Integer id) {
        id = id == null ? 1 : IdUtil.decode(id);
        return ApiResult.ok(aboutService.getAbout(id, true, new Pageable(1, 1)));
    }
}
