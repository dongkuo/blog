package cn.derker.blog.model;

/**
 * @author derker
 * @since 2017-10-13 18:53
 */
public class Foo {

    private Long id;
    private String foo;
    private Bar bar;

    public Foo(Long id, String foo, Bar bar) {
        this.id = id;
        this.bar = bar;
        this.foo = foo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Bar getBar() {
        return bar;
    }

    public void setBar(Bar bar) {
        this.bar = bar;
    }

    public String getFoo() {
        return foo;
    }

    public void setFoo(String foo) {
        this.foo = foo;
    }
}
