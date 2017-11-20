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

    /**
     * 文章类型，0：写作，1：编程
     */
    private Integer type = 0;
    /**
     * 文章状态，0：正常，1：下线
     */
    private Integer state = 0;
    /**
     * 文章封面，500字符以内
     */
    private String coverImage;
    /**
     * 文章封面说明，50字以内
     */
    private String coverCaption;
    /**
     * 文章标题，50字以内
     */
    private String title;
    /**
     * 文章摘要，500字以内
     */
    private String summary;
    /**
     * 文章html格式内容
     */
    private String html;
    /**
     * 文章markdown格式内容
     */
    private String markdown;
    /**
     * 阅读数
     */
    private Integer readingNumber = 0;
    /**
     * 点赞数
     */
    private Integer likeNumber = 0;
    /**
     * 评论数
     */
    private Integer commentingNumber = 0;
    /**
     * 文章完成时间
     */
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

    @Override
    public String toString() {
        return "Post{" +
                "id=" + getId() +
                ", type=" + type +
                ", state=" + state +
                ", coverImage='" + coverImage + '\'' +
                ", coverCaption='" + coverCaption + '\'' +
                ", title='" + title + '\'' +
                ", summary='" + summary + '\'' +
                ", html='" + html + '\'' +
                ", markdown='" + markdown + '\'' +
                ", readingNumber=" + readingNumber +
                ", likeNumber=" + likeNumber +
                ", commentingNumber=" + commentingNumber +
                ", finishedTime=" + finishedTime +
                '}';
    }
}
