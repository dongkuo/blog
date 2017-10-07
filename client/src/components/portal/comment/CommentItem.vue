<template>
  <ul class="list">
    <li class="item" v-for="comment in comments">
      <img :src="comment.avatar" alt="" class="avatar">
      <div class="box" @mouseenter.stop="onMouseEnterItem(comment)"
           @mouseleave.stop="onMouseLeaveItem(comment)">
        <div class="title">
          <a href="" target="_blank" class="nickname">{{comment.nickname}}</a>
          <span class="time"
                :title="comment.createdTime | date">{{comment.createdTime | date('friendly')}}</span>
          <a class="reply" href="javascript:void(0)" v-show="comment.isShowReply" @click="OnClickReplyButton(comment)">回复</a>
        </div>
        <div class="content">{{comment.content}}</div>
      </div>
      <!--回复框-->
      <transition name="fade">
        <app-comment-input v-if="comment.isShowReplyInput" @cancel="onCancelReplyInput(comment)" class="reply-input">
        </app-comment-input>
      </transition>
      <!--回复-->
      <comment-item v-if="comment.replies" :comments="comment.replies"></comment-item>
    </li>
  </ul>
</template>

<script>
  import AppCommentInput from './CommentInput'

  export default {
    name: 'comment-item',
    components: {AppCommentInput},
    props: ['comments'],
    data() {
      return {}
    },
    methods: {
      onMouseEnterItem(comment) {
        comment.isShowReply = true
      },
      onMouseLeaveItem(comment) {
        comment.isShowReply = false
      },
      OnClickReplyButton(comment) {
        comment.isShowReplyInput = true
      },
      onCancelReplyInput(comment) {
        comment.isShowReplyInput = false
      }
    }
  }
</script>

<style scoped>
  .list {
    list-style: none;
    padding: 0;
  }

  .item {
    position: relative;
    padding-left: 64px;
    min-height: 48px;
    margin: 32px 0;
  }

  .box {
    margin-bottom: 16px;
  }

  .title {
    line-height: 1;
  }

  .item .nickname {
    font-weight: bold;
    color: #373d44;
    font-size: 15px;
  }

  .item .avatar {
    width: 48px;
    height: 48px;
    position: absolute;
    left: 0;
    top: 0;
  }

  .item .time {
    font-size: 14px;
    color: #99a4b9;
    margin-left: 8px;
  }

  .item .reply {
    font-size: 14px;
    color: #99a4b9;
    margin-left: 8px;
  }

  .item .reply:hover {
    color: #373d44;
  }

  .item .content {
    line-height: 1.7;
    font-size: 15px;
    color: #404d54;
    margin-top: 8px;
    margin-bottom: 16px;
  }

  .reply-input {
    height: 92px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: height, opacity .2s, .2s
  }

  .fade-enter, .fade-leave-to {
    height: 0;
    opacity: 0
  }

  @media screen and (max-width: 720px) {
    .item {
      position: relative;
      padding-left: 48px;
      min-height: 36px;
      margin: 16px 0;
    }

    .item .avatar {
      width: 36px;
      height: 36px;
    }

    .item .content {
      margin-bottom: 16px;
    }
  }
</style>
