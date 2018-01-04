package cn.derker.blog.util;

import java.util.HashMap;
import java.util.Map;

/**
 * @author derker
 * @since 2018.01.03 22:34
 */
public class ThreadLocalUtil {

    private static final ThreadLocal<Map<String, Object>> threadLocal = ThreadLocal.withInitial(() -> new HashMap<>(4));

    public static Map<String, Object> getThreadLocal() {
        return threadLocal.get();
    }

    public static <T> T get(String key) {
        Map<String, Object> map = threadLocal.get();
        return (T) map.get(key);
    }

    public static <T> T get(String key, T defaultValue) {
        Map<String, Object> map = threadLocal.get();
        return (T) map.get(key) == null ? defaultValue : (T) map.get(key);
    }

    public static void put(String key, Object value) {
        Map<String, Object> map = threadLocal.get();
        map.put(key, value);
    }

    public static void put(Map<String, Object> map) {
        threadLocal.get().putAll(map);
    }

    public static void remove() {
        threadLocal.remove();
    }

    public static <T> T remove(String key) {
        return (T) threadLocal.get().remove(key);
    }
}
