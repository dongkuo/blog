package cn.derker.blog.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * @author derker
 * @since 2017-10-18 21:44
 */
public class IOUtil {

    public static String readAndClose(InputStream inputStream) throws IOException {
        int len = 0;
        byte[] buff = new byte[1024];
        ByteArrayOutputStream byteStream = new ByteArrayOutputStream();
        while ((len = inputStream.read(buff)) != -1) {
            byteStream.write(buff, 0, len);
        }
        inputStream.close();
        return byteStream.toString();

    }
}
