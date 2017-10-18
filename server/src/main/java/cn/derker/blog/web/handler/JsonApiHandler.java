package cn.derker.blog.web.handler;

import cn.derker.blog.annotation.*;
import cn.derker.blog.domain.model.ApiResult;
import cn.derker.blog.web.provider.FlexibleFilterProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.lang.annotation.Annotation;
import java.util.HashMap;
import java.util.Map;

/**
 * @author derker
 * @since 2017-10-13 19:25
 */
@Component
public class JsonApiHandler implements HandlerMethodReturnValueHandler {

    @Resource
    private ObjectMapper defaultMapper;

    // TODO:  最好控制一下Cache的最大容量（LFU、LRU等策略），避免占用过多内存
    private Map<String, ObjectMapper> mapperCache = new HashMap<>();

    @Override
    public boolean supportsReturnType(MethodParameter methodParameter) {
        Class<?> declaringClass = methodParameter.getDeclaringClass();
        return declaringClass.getAnnotation(Api.class) != null ||
                declaringClass.getAnnotation(ApiExcludes.class) != null ||
                declaringClass.getAnnotation(ApiIncludes.class) != null ||
                declaringClass.getAnnotation(ApiExclude.class) != null ||
                declaringClass.getAnnotation(ApiInclude.class) != null ||
                //
                methodParameter.getMethodAnnotation(Api.class) != null ||
                methodParameter.getMethodAnnotation(ApiExcludes.class) != null ||
                methodParameter.getMethodAnnotation(ApiIncludes.class) != null ||
                methodParameter.getMethodAnnotation(ApiExclude.class) != null ||
                methodParameter.getMethodAnnotation(ApiInclude.class) != null;

    }

    @Override
    public void handleReturnValue(Object returnValue, MethodParameter methodParameter,
                                  ModelAndViewContainer container, NativeWebRequest webRequest) throws Exception {
        // 设置这个就是最终的处理类了，处理完不再去找下一个类进行处理
        container.setRequestHandled(true);
        // 获得注解并执行filter方法 最后返回
        HttpServletResponse response = webRequest.getNativeResponse(HttpServletResponse.class);
        response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
        if (returnValue instanceof ApiResult && ((ApiResult) returnValue).getData() == null) {
            response.setStatus(((ApiResult) returnValue).getStatus());
            return;
        }


        Map<Class<?>, String[]> includeMap = new HashMap<>();
        Map<Class<?>, String[]> excludeMap = new HashMap<>();
        Annotation[] annotations = methodParameter.getMethodAnnotations();
        for (Annotation annotation : annotations) {
            if (annotation instanceof ApiIncludes) {
                ApiInclude[] includes = ((ApiIncludes) annotation).value();
                for (ApiInclude include : includes) {
                    includeMap.put(include.clazz(), include.fields());
                }
                continue;
            }

            if (annotation instanceof ApiInclude) {
                ApiInclude include = ((ApiInclude) annotation);
                includeMap.put(include.clazz(), include.fields());
                continue;
            }

            if (annotation instanceof ApiExcludes) {
                ApiExclude[] excludes = ((ApiExcludes) annotation).value();
                for (ApiExclude exclude : excludes) {
                    excludeMap.put(exclude.clazz(), exclude.fields());
                }
                continue;
            }

            if (annotation instanceof ApiExclude) {
                ApiExclude exclude = ((ApiExclude) annotation);
                excludeMap.put(exclude.clazz(), exclude.fields());
            }
        }

        String methodFullName = methodParameter.getDeclaringClass().getName() + "." + methodParameter.getMethod().getName();
        ObjectMapper mapper;
        if ((mapper = mapperCache.get(methodFullName)) == null) {
            synchronized (this) {
                if ((mapper = mapperCache.get(methodFullName)) == null) {
                    final ObjectMapper finalMapper = new ObjectMapper();
                    FlexibleFilterProvider filterProvider = new FlexibleFilterProvider();
                    finalMapper.setFilterProvider(filterProvider);
                    includeMap.forEach((clazz, fields) -> {
                        filterProvider.include(clazz, fields);
                        finalMapper.addMixIn(clazz, FlexibleFilterProvider.class);
                    });
                    excludeMap.forEach((clazz, fields) -> {
                        filterProvider.exclude(clazz, fields);
                        finalMapper.addMixIn(clazz, FlexibleFilterProvider.class);
                    });
                    mapper = finalMapper;
                    mapper.setPropertyNamingStrategy(defaultMapper.getPropertyNamingStrategy());
                    mapperCache.put(methodFullName, mapper);
                }
            }
        }
        response.getWriter().write(mapper.writeValueAsString(returnValue));
    }
}
