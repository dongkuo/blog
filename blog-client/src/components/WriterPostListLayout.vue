<template>
  <div>
    <div class="function-group">
      <span class="function-item" @click="isAddPostModalActive = true">
        <img src="../assets/img/pen.png" class="icon">写文章</span>
    </div>
    <ul class="post-list">
      <li class="post-item" :class="{selected: post.selected}" v-for="post in posts">
        <p class="title">{{post.title}}</p>
        <span class="finished-time">{{post.finishedTime | date('friendly')}}</span>
        <p class="summary">{{post.summary}}</p>
        <p class="meta">
          <span>喜欢 {{post.like_number}}</span>
          <span>评论 {{post.commenting_number}}</span>
          <span>阅读 {{post.reading_number}}</span>
        </p>
        <span title="删除文章" class="delete-btn"></span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['posts'],
    data() {
      return {
      }
    },
    created() {

    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";
  @import "../assets/scss/global.scss";

  .function-group {
    padding: $space-lg $space;
    text-align: right;
    border-bottom: 1px solid $header-divider-background-color;
  }

  .function-item {
    @extend .text-hint, .cursor-pointer;
    color: $page-font-color-lighter;
    margin-right: $space;
  }

  .function-item:hover {
    color: $page-font-color;
  }

  .function-item .icon {
    margin-right: $space-sm;
  }

  .post-list{
    margin: 0;
  }

  .post-item {
    position: relative;
    cursor: pointer;
    padding: $space;
    border-bottom: 1px solid $header-divider-background-color;

    p {
      line-height: 1.5;
      margin: 0 0 $space;
    }
  }

  .post-item:hover, .post-item.selected {
    background-color: $writer-post-list-layout-item-background;

    & .delete-btn {
      display: initial;
    }
  }

  .post-item-icon {
    width: 40px;
    height: 40px;
    position: absolute;
    left: $space;
  }

  .title {
    font-weight: bold;
  }

  .finished-time {
    @extend .text-hint;
    font-size: $page-font-size-mini;
    position: absolute;
    top: 12px;
    right: $space;
  }

  .summary {
    font-size: $page-font-size-sm;
    color: $page-font-color-light;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .meta {
    @extend .text-hint, .text-ellipsis;
    margin-bottom: 0 !important;

    span {
      margin-right: $space;
    }
  }

  .delete-btn {
    width: 18px;
    height: 18px;
    display: none;
    position: absolute;
    right: $space;
    bottom: $space + 2px;
    background-image: url("../assets/img/delete_18.png");

    &:hover {
      background-image: url("../assets/img/delete_18_danger.png");
    }
  }
</style>
