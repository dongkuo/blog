package cn.derker.blog.web.api;

import cn.derker.blog.domain.entity.User;
import cn.derker.blog.util.ThreadLocalUtil;

/**
 * @author derker
 * @since 2018.01.03 22:29
 */
public class BaseApi {

    public static final String CURRENT_USER = "CURRENT_USER";

    public User currentUser() {
        return ThreadLocalUtil.get("currentUser");
    }
}
