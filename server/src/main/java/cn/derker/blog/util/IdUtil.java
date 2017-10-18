package cn.derker.blog.util;

/**
 * @author derker
 * @since 2017-10-14 16:51
 */
public class IdUtil {


    public static int encode(int id) {
        int b1 = (id & 0x7F); // 7 bit
        int b2 = (id >> 7 & 0xFF); // 8 bit
        int b3 = (id >> 15 & 0x7F); // 7 bit
        int b4 = (id >> 22 & 0xFF); // 8 bit
        int nb4 = b1 ^ b4;
        int nb2 = b2 ^ b3;
        return nb4 << 22 | b1 << 15 | nb2 << 7 | b3;
    }

    public static int decode(int num) {
        int nb4 = (num >> 22 & 0xFF); // 8 bit
        int nb3 = (num >> 15 & 0x7F); // 7 bit
        int nb2 = (num >> 7 & 0xFF); // 8 bit
        int nb1 = (num & 0x7F); // 7 bit
        int b4 = nb3 ^ nb4;
        int b2 = nb1 ^ nb2;
        return b4 << 22 | nb1 << 15 | b2 << 7 | nb3;
    }
}
