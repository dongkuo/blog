package cn.derker.blog.domain.entity;

import cn.derker.blog.domain.base.BaseEntity;

import javax.persistence.Table;
import java.util.Date;

/**
 * @author derker
 * @since 2017-10-10 19:13
 */
@Table(name = "tb_post")
public class Post extends BaseEntity {

    /**
     * 写作
     */
    public static final int TYPE_WRITING = 0;
    /**
     * 编程
     */
    public static final int TYPE_PROGRAMING = 1;

    /**
     * 正常
     */
    public static final int STATUS_NORMAL = 0;
    /**
     * 下线
     */
    public static final int STATUS_OFFLINE = 1;


    private Integer type = 0;
    private Integer state = 0;
    private String coverImage;
    private String coverCaption;
    private String title;
    private String summary;
    private String html;
    private String markdown;
    private Integer readingNumber = 0;
    private Integer likeNumber = 0;
    private Integer commentingNumber = 0;
    private Date finishedTime;

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public String getCoverCaption() {
        return coverCaption;
    }

    public void setCoverCaption(String coverCaption) {
        this.coverCaption = coverCaption;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

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

    public Integer getReadingNumber() {
        return readingNumber;
    }

    public void setReadingNumber(Integer readingNumber) {
        this.readingNumber = readingNumber;
    }

    public Integer getLikeNumber() {
        return likeNumber;
    }

    public void setLikeNumber(Integer likeNumber) {
        this.likeNumber = likeNumber;
    }

    public Integer getCommentingNumber() {
        return commentingNumber;
    }

    public void setCommentingNumber(Integer commentingNumber) {
        this.commentingNumber = commentingNumber;
    }

    public Date getFinishedTime() {
        return finishedTime;
    }

    public void setFinishedTime(Date finishedTime) {
        this.finishedTime = finishedTime;
    }
}
