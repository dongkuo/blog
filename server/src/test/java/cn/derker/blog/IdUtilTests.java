package cn.derker.blog;

import cn.derker.blog.util.IdUtil;
import org.junit.Test;

import java.util.Arrays;

/**
 * @author derker
 * @since 2017-10-14 15:05
 */
public class IdUtilTests {


    @Test
    public void test1() {
        Long id = 10012L;
        byte byte1 = (byte) (id & 0xFF);
        byte byte2 = (byte) (id & 0xFF);
        byte byte3 = (byte) (id & 0xFF);
        byte byte4 = (byte) (id & 0xFF);
        System.out.println(byte1);
    }

    @Test
    public void test2() {
        System.out.println(base64Encode("1"));
    }

    @Test
    public void test3() {
        System.out.println(Arrays.toString("中1".getBytes()));
    }

    @Test
    public void test4() {
        for (int i = 1; i < 1000; i++) {
            int encode = IdUtil.encode(i);
            int decode = IdUtil.decode(encode);
            System.out.println(String.format("%d -> %d -> %d", i, encode, decode));
        }
    }

    public String base64Encode(String text) {
        if (text == null) {
            return null;
        }
        final String table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-";
        byte[] textBytes = text.getBytes();
        int remain = 0, remainBitCount = 0;
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < textBytes.length; i++) {
            int b = textBytes[i] & 0xFF;
            // 获取b的高(6 - remainBitCount)位
            int high = b >>> (2 + remainBitCount) & 0xFF;
            // 与上一轮的余留组合成一个字节
            int curr = remain << (6 - remainBitCount) | high;
            // builder.append(table.charAt(curr));
            builder.append(table.charAt(curr));
            // 剩余b的低(2 + remainBitCount)位
            remain = high << (2 + remainBitCount) ^ b;
            remainBitCount += 2;
            // 若剩余的位刚好为6位，则进行编码
            if (remainBitCount == 6) {
                builder.append(table.charAt(remain));
                remainBitCount = 0;
                remain = 0;
            }
        }
        if (remainBitCount != 0) {
            // 多出的位到末尾补0凑够6位
            builder.append(table.charAt(remain << (6 - remainBitCount)));
        }
        return builder.toString();
    }
}
