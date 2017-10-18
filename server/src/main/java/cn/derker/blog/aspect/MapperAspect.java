package cn.derker.blog.aspect;

import cn.derker.blog.domain.base.BaseEntity;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * @author derker
 * @since 2017-10-18 23:21
 */
@Component
@Aspect
public class MapperAspect {

    private Logger logger = LoggerFactory.getLogger(MapperAspect.class);

    @Pointcut("execution(* cn.derker.blog.dao.mapper..insert*(..))")
    public void insertPoint() {
    }

    @Before("insertPoint()")
    public void beforeInsert(JoinPoint joinPoint) {
        logger.debug("==> beforeInsert: {}", joinPoint);
        Object[] args = joinPoint.getArgs();
        for (Object obj : args) {
            if (obj instanceof BaseEntity) {
                Date now = new Date();
                ((BaseEntity) obj).setCreatedTime(now);
                ((BaseEntity) obj).setUpdatedTime(now);
            }
        }
    }

    @Pointcut("execution(* cn.derker.blog.dao.mapper..update*(..))")
    public void updatePoint() {
    }

    @Before("updatePoint()")
    public void beforeUpdate(JoinPoint joinPoint) {
        logger.debug("==> beforeUpdate: {}", joinPoint);
        Object[] args = joinPoint.getArgs();
        for (Object obj : args) {
            if (obj instanceof BaseEntity) {
                ((BaseEntity) obj).setUpdatedTime(new Date());
            }
        }
    }
}
