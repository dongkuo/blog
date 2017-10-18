package cn.derker.blog.model;

import java.util.Date;

/**
 * @author derker
 * @since 2017-10-13 18:53
 */
public class Bar {

    private Long id;
    private String bar;

    public Bar(Long id, String bar) {
        this.id = id;
        this.bar = bar;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBar() {
        return bar;
    }

    public void setBar(String bar) {
        this.bar = bar;
    }
}
