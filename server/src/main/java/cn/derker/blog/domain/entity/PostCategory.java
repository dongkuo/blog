package cn.derker.blog.domain.entity;

import cn.derker.blog.domain.base.BaseEntity;

import javax.persistence.Table;

/**
 * @author derker
 * @since 2017.12.03 15:50
 */
@Table(name = "tb_post_category")
public class PostCategory extends BaseEntity {

    private String name;
    private String url;
    private Boolean visible = true;
    private Integer sortValue = 0;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getVisible() {
        return visible;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }

    public Integer getSortValue() {
        return sortValue;
    }

    public void setSortValue(Integer sortValue) {
        this.sortValue = sortValue;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "PostCategory{" +
                "name='" + name + '\'' +
                ", url='" + url + '\'' +
                ", visible=" + visible +
                ", sortValue=" + sortValue +
                '}';
    }
}
