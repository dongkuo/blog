package cn.derker.blog.domain.model;

import java.util.List;

/**
 * @author derker
 * @since 2017-10-10 19:18
 */
public class Page<T> {


    private int page; // 页码（从1开始计数）
    private int size; // 页面大小
    private long total; // 数据总数
    private List<T> content;

    public Page(List<T> content, Pageable pageable, long total) {
        this.content = content;
        this.page = pageable.getPage();
        this.size = pageable.getSize();
        this.total = total;
    }

    public Page(List<T> content, int page, int size, int total) {
        this.content = content;
        this.page = page;
        this.size = size;
        this.total = total;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public List<T> getContent() {
        return content;
    }

    public void setContent(List<T> content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "Page{" +
                "page=" + page +
                ", size=" + size +
                ", total=" + total +
                ", content=" + content +
                '}';
    }
}
