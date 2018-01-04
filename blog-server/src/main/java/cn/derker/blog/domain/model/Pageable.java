package cn.derker.blog.domain.model;

import com.github.pagehelper.PageRowBounds;

/**
 * @author derker
 * @since 2017-10-10 19:22
 */
public class Pageable {

    private static final int MAX_PAGE_SIZE = 50;

    private int page = 1;
    private int size = 10;
    private String sort;

    public Pageable() {
    }

    public Pageable(int page, int size) {
        setPageAndSize(page, size);
    }

    public void setPageAndSize(int page, int size) {
        setPage(page);
        setSize(size);
    }

    public void setPage(int page) {
        this.page = Math.max(1, page);
    }

    public void setSize(int size) {
        this.size = Math.min(MAX_PAGE_SIZE, Math.max(0, size));
    }

    public int getPage() {
        return page;
    }

    public int getSize() {
        return size;
    }

    public int getOffset() {
        return (this.page - 1) * this.size;
    }

    public int getLimit() {
        return this.size;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public PageRowBounds getPageRowBounds() {
        return new PageRowBounds(getOffset(), getLimit());
    }

    @Override
    public String toString() {
        return "Pageable{" +
                "page=" + page +
                ", size=" + size +
                ", sort='" + sort + '\'' +
                '}';
    }
}
