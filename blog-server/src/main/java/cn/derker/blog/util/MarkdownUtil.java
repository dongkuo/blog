package cn.derker.blog.util;

import java.io.*;
import java.util.Scanner;
import java.util.concurrent.TimeoutException;

/**
 * @author derker
 * @since 2017-10-14 18:33
 */
public class MarkdownUtil {

    public static String markdown2html(String markdown){
        try {
            ProcessUtil.ProcessStatus status = ProcessUtil.execute(5000, "node", "tool/markdown-1.0.0.min.js", markdown);
            return status.getOutput();
        } catch (IOException | TimeoutException | InterruptedException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static void main(String[] args) throws InterruptedException, FileNotFoundException {
        Scanner scanner = new Scanner(new FileInputStream("/home/derker/Desktop/2016-08-29-摊还分析.md"));
        StringBuilder sb = new StringBuilder();
        while (scanner.hasNext()) {
            sb.append(scanner.nextLine());
            sb.append('\n');
        }
        scanner.close();
        String result = markdown2html(sb.toString());
        System.out.println(result);
        System.out.println("==============");
        System.out.println(RegexUtil.filterHtmlTag(result, 150));
//        PrintWriter writer = new PrintWriter(new FileOutputStream("test-markdown.html"));
//        writer.println("<link rel=\"stylesheet\" href=\"http://cdn.bootcss.com/highlight.js/9.12.0/styles/default.min.css\">\n" +
//                "<link href=\"http://cdn.bootcss.com/highlight.js/9.12.0/styles/github.min.css\" rel=\"stylesheet\">\n" +
//                "<link href=\"http://cdn.bootcss.com/KaTeX/0.9.0-alpha/katex.min.css\" rel=\"stylesheet\">");
//        writer.print(result);
//        writer.close();
    }
}
