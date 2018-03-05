package cn.derker.blog.util;

/**
 * @author derker
 * @since 2017-10-18 22:02
 */
public class RegexUtil {


    /**
     * 过滤html标签
     *
     * @param limit 限制返回字符串的长度
     * @return
     */
    public static String filterHtmlTag(String html, int limit) {
        if(html == null || html.isEmpty()){
            return html;
        }
        String content = html.replaceAll("</?[^>]+>", "");
        content = content.replaceAll("[\r\n\t]*", "");
        return content.substring(0, Math.min(limit, content.length()));

    }

}
