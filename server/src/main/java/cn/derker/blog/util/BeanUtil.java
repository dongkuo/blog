package cn.derker.blog.util;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.PropertyAccessorFactory;
import org.springframework.cglib.beans.BeanMap;

import java.beans.PropertyDescriptor;
import java.util.*;

/**
 * @author derker
 * @since 2017-10-14 18:28
 */
public class BeanUtil {
    /**
     * 將指定的字段设为null
     */
    public static void setNullInclude(Object obj, String... specifiedProperties) {
        Set<String> propertySet = new HashSet<>(Arrays.asList(specifiedProperties));
        BeanWrapper wrapper = PropertyAccessorFactory.forBeanPropertyAccess(obj);
        propertySet.forEach(p -> {
            wrapper.setAutoGrowNestedPaths(true);
            wrapper.setPropertyValue(p, null);
        });
    }

    /**
     * 将非指定字段设为null
     */
    public static void setNullExclude(Object obj, String... exclude) {
        Set<String> excludePropertySet = new HashSet<>(Arrays.asList(exclude));
        String[] allPropertyNames = getAllPropertyNames(obj);
        BeanWrapper wrapper = PropertyAccessorFactory.forBeanPropertyAccess(obj);
        Arrays.stream(allPropertyNames).forEach(p -> {
            if (!excludePropertySet.contains(p)) {
                wrapper.setPropertyValue(p, null);
            }
        });
    }

    public static void copyNonNullProperties(Object src, Object target) {
        BeanUtils.copyProperties(src, target, getNullPropertyNames(src));
    }

    public static void copySpecifiedProperties(Object src, Object trg, String... specifiedProperties) {
        BeanWrapper srcWrap = PropertyAccessorFactory.forBeanPropertyAccess(src);
        BeanWrapper trgWrap = PropertyAccessorFactory.forBeanPropertyAccess(trg);
        Set<String> propertySet = new HashSet<>(Arrays.asList(specifiedProperties));
        propertySet.forEach(p -> {
            trgWrap.setAutoGrowNestedPaths(true);
            trgWrap.setPropertyValue(p, srcWrap.getPropertyValue(p));
        });
    }

    public static String[] getNullPropertyNames(Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<>();
        for (PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null) emptyNames.add(pd.getName());
        }
        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
    }

    public static String[] getAllPropertyNames(Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new LinkedHashSet<>();
        for (PropertyDescriptor pd : pds) {
            emptyNames.add(pd.getName());
        }
        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
    }

    /**
     * 将对象装换为map
     *
     * @param bean
     * @return
     */
    public static <T> Map<String, Object> beanToMap(T bean) {
        Map<String, Object> map = new LinkedHashMap<>();
        if (bean != null) {
            BeanMap beanMap = BeanMap.create(bean);
            for (Object key : beanMap.keySet()) {
                map.put(key + "", beanMap.get(key));
            }
        }
        return map;
    }

    /**
     * 将map装换为javabean对象
     *
     * @param map
     * @param bean
     * @return
     */
    public static <T> T mapToBean(Map<String, Object> map, T bean) {
        BeanMap beanMap = BeanMap.create(bean);
        beanMap.putAll(map);
        return bean;
    }

    /**
     * 将List<T>转换为List<Map<String, Object>>
     *
     * @param objList
     * @return
     */
    public static <T> List<Map<String, Object>> objectsToMaps(List<T> objList) {
        List<Map<String, Object>> list = new ArrayList<>();
        if (objList != null && objList.size() > 0) {
            Map<String, Object> map = null;
            T bean = null;
            for (int i = 0, size = objList.size(); i < size; i++) {
                bean = objList.get(i);
                map = beanToMap(bean);
                list.add(map);
            }
        }
        return list;
    }

    /**
     * 将List<Map<String,Object>>转换为List<T>
     *
     * @param maps
     * @param clazz
     * @return
     * @throws InstantiationException
     * @throws IllegalAccessException
     */
    public static <T> List<T> mapsToObjects(List<Map<String, Object>> maps, Class<T> clazz) throws InstantiationException, IllegalAccessException {
        List<T> list = new ArrayList<>();
        if (maps != null && maps.size() > 0) {
            Map<String, Object> map = null;
            T bean = null;
            for (int i = 0, size = maps.size(); i < size; i++) {
                map = maps.get(i);
                bean = clazz.newInstance();
                mapToBean(map, bean);
                list.add(bean);
            }
        }
        return list;
    }
}
