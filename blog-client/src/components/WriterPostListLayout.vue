<template>
  <div>
    <div class="function-group">
      <span class="function-item" @click="newPost">
        <img src="../assets/img/pen.png" class="icon">写文章
      </span>
    </div>
    <ul class="post-list">
      <li class="post-item" :class="{selected: post.selected}" @click="onSelectPost(post)" v-for="post in posts">
        <p class="title">{{post.title}}</p>
        <span class="finished-time">{{post.finished_time | date('friendly')}}</span>
        <p class="summary">{{post.summary}}</p>
        <p class="meta">
          <span>喜欢 {{post.like_number || 0}}</span>
          <span>评论 {{post.commenting_number || 0}}</span>
          <span>阅读 {{post.reading_number || 0}}</span>
        </p>
        <span title="删除文章" class="delete-btn"></span>
      </li>
      <app-infinite-loading @infinite="getPosts" spinner="waveDots" ref="infiniteLoading">
        <div slot="no-more"></div>
        <p slot="no-results">
          <app-emoji :size="2">🐒</app-emoji>
          <br/>啥都没有啊 …
        </p>
      </app-infinite-loading>
    </ul>
  </div>
</template>

<script>
  import AppInfiniteLoading from "vue-infinite-loading";
  import AppEmoji from "./Emoji.vue";

  export default {
    components: {
      AppInfiniteLoading,
      AppEmoji
    },
    props: ['categoryId'],
    data() {
      return {
        posts: [],
        postsCache: {}
      }
    },
    created() {

    },
    methods: {
      getPosts($state) {
        console.log('getPosts')
        let data = this.postsCache[this.categoryId]
        if (!data) {
          data = {page: 0, total: Infinity, size: 10, posts: []}
          this.postsCache[this.categoryId] = data
        }
        this.posts = data.posts
        if (data.page * data.size >= data.total) {
          if (data.total !== 0) {
            $state.loaded();
          }
          $state.complete();
          return;
        }
        this.$api.post
          .list({page: data.page + 1, size: data.size, categoryId: this.categoryId})
          .then(resp => {
            data.total = resp.data.data.total;
            data.page = resp.data.data.page;
            if (resp.data.data.content.length === 0) {
              $state.complete();
              return;
            }
            resp.data.data.content.forEach(post => post.selected = false)
            data.posts.addAll(resp.data.data.content)
            $state.loaded();
          })
          .catch(e => {
            console.error(e);
            $state.complete();
          });
      },
      onSelectPost(post) {
        this.posts.forEach(post => post.selected = false)
        post.selected = true
        this.$emit('onSelectPost', post)
      },
      newPost() {
        let newPost = {
          id: -Date.now(),
          title: '新建文章',
          summary: '',
          finished_time: Date.now()
        }
        this.onSelectPost(newPost)
        this.postsCache[this.categoryId].posts.unshift(newPost)
      },
      reset() {
        let data = this.postsCache[this.categoryId]
        if (data) {
          data.posts.forEach(post => post.selected = false)
        }
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      }
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

  .post-list {
    margin: 0;
    height: 100%;
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
    min-height: 40px;
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
