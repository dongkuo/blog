package cn.derker.blog.config;

import cn.derker.blog.web.handler.JsonApiHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author derker
 * @since 2017-10-13 20:18
 */
@Configuration
public class WebConfig extends WebMvcConfigurerAdapter {
    @Resource
    private JsonApiHandler jsonApiHandler;


    @Override
    public void addReturnValueHandlers(List<HandlerMethodReturnValueHandler> returnValueHandlers) {
        returnValueHandlers.add(jsonApiHandler);
    }
}
