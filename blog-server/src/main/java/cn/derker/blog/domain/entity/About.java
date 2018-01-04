package cn.derker.blog.domain.entity;

import cn.derker.blog.domain.base.BaseEntity;

import javax.persistence.Table;

/**
 * @author derker
 * @since 2017.12.17 17:17
 */
@Table(name = "tb_about")
public class About extends BaseEntity{

    private String html;
    private String markdown;
    private Boolean visible;

    public String getHtml() {
        return html;
    }

    public void setHtml(String html) {
        this.html = html;
    }

    public String getMarkdown() {
        return markdown;
    }

    public void setMarkdown(String markdown) {
        this.markdown = markdown;
    }

    public Boolean getVisible() {
        return visible;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }
}
