package cn.derker.blog.domain.entity;

import cn.derker.blog.domain.base.BaseEntity;

import javax.persistence.Table;

/**
 * 片刻实体
 *
 * @author derker
 * @since 2017.11.27 22:29
 */
@Table(name = "tb_moment")
public class Moment extends BaseEntity {
    /**
     * 内容
     */
    private String content;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
