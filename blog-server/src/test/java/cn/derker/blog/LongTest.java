package cn.derker.blog;

import org.junit.Test;

/**
 * @author derker
 * @since 2018.01.03 22:50
 */
public class LongTest {

    @Test
    public void test(){
        System.out.println((int) System.currentTimeMillis() / 1000);
    }

    @Test
    public void test2(){
        int  i = 1;
        int j = (i++) + 1;
        System.out.println(j);
    }

    static class Inner{
        static {
            System.out.println("static Inner");
        }

        public Inner() {
            System.out.println("Inner");
        }
    }

    static class Child extends Inner{

        static {
            System.out.println("static Child");
        }

        public Child() {
            System.out.println("Child");
        }
    }

    @Test
    public void test3(){
        Child child = new Child();
        Child child2 = new Child();
    }

}
