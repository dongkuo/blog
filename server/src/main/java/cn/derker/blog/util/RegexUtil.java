package cn.derker.blog.util;

import javax.swing.text.html.HTMLEditorKit;
import javax.swing.text.html.parser.ParserDelegator;
import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
        String content = html.replaceAll("</?[^>]+>", ""); //剔出html的标签
        content = content.replaceAll("[\r\n\t]*", "");//去除字符串中的回车,换行符,制表符
        return content.substring(0, Math.min(150, content.length()));

    }

}
