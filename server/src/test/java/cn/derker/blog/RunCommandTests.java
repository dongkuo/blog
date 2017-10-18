package cn.derker.blog;

import org.junit.Test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * @author derker
 * @since 2017-10-15 23:19
 */
public class RunCommandTests {

    @Test
    public void test() throws IOException, InterruptedException {

        Long start = System.currentTimeMillis();

        String command = "node /home/derker/Workspaces/NiceBlog/server/src/test/resources/handle.js";
        Process p = Runtime.getRuntime().exec(command);

        // 读取命令的输出信息
        InputStream is = p.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(is));
        p.waitFor();
        if (p.exitValue() != 0) {
            System.out.println("error..");
        }
        //打印输出信息
        String s = null;
        while ((s = reader.readLine()) != null) {
            System.out.println(s);
        }

        Long end = System.currentTimeMillis();

        System.out.println("It spend " + (end - start) + " ms");
    }
}
