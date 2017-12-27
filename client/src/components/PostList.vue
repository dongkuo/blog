<template>
  <div>
    <!--导航栏-->
    <app-primary-nav></app-primary-nav>
    <!--文章列表-->
    <div class="main-wrapper">
      <ul class="post-list">
        <li class="post-list-item" v-for="post in posts">
          <h4 class="title"><router-link :to="`/posts/${post.id}`">{{post.title}}</router-link></h4>
          <time class="time">{{post.finished_time | date('friendly')}}</time>
          <p class="summary">
            {{post.summary}}
            <img :src="post.cover_image || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2N4+fLlfwAJNQO7zHm8/wAAAABJRU5ErkJggg=='" class="cover">
          <p class="statistic">
            <span class="item"><i class="icon material-icons">favorite</i> {{post.like_number}}</span>
            <span class="item"><i class="icon material-icons">mode_comment</i> {{post.commenting_number}}</span>
            <span class="item"><i class="icon material-icons">remove_red_eye</i> {{post.reading_number}}</span>
          </p>
        </li>
        <app-infinite-loading @infinite="getPosts" ref="infiniteLoading">
          <app-loading slot="spinner"></app-loading>
          <div slot="no-more">
            <p>
              <app-emoji :size="2">🙈</app-emoji>
              <br/>没有啦 ~
            </p>
          </div>
          <p slot="no-results">
            <app-emoji :size="2">🐒</app-emoji>
            <br/>啥都没有啊 …
          </p>
        </app-infinite-loading>
      </ul>
    </div>
  </div>
</template>
<script>
  import AppInfiniteLoading from "vue-infinite-loading";
  import AppLoading from "./PostLoading.vue";
  import AppEmoji from "./Emoji.vue";
  import AppPrimaryNav from "./PrimaryNav.vue";

  export default {
    components: {
      AppInfiniteLoading,
      AppLoading,
      AppEmoji,
      AppPrimaryNav
    },
    data() {
      return {
        page: 0,
        size: 10,
        total: Number.POSITIVE_INFINITY,
        posts: []
      };
    },
    beforeRouteUpdate(to, from ,next){
      this.reset()
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      // 路由变化时，数据归零，重新请求数据
      next()
    },
    methods: {
      reset(){
        this.page = 0
        this.total = Number.POSITIVE_INFINITY
        this.posts = []
      },
      getPosts($state) {
        const nextPage = this.page + 1;
        if (this.page * this.size >= this.total) {
          $state.complete();
          return;
        }
        this.$api.post
          .list({page: nextPage, size: this.size, categoryId: this.$route.params.category_id})
          .then(resp => {
            this.total = resp.data.data.total;
            this.page = resp.data.data.page;
            if (resp.data.data.content.length === 0) {
              $state.complete();
              return;
            }
            this.posts = this.posts.concat(resp.data.data.content)
            $state.loaded();
          })
          .catch(e => {
            console.error(e);
            $state.complete();
          });
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";

  .main-wrapper {
    max-width: $page-width;
    margin-left: auto;
    margin-right: auto;
  }

  .post-list {
    list-style: none;
  }

  .post-list-item {
    position: relative;
  }

  .post-list-item .title {
    font-weight: bold;
    color: $dark-color;
  }

  .post-list-item .title a{
    color: $body-font-color;
  }

  .post-list-item .time {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 14px;
    color: $gray-color;
  }

  .post-list-item .summary {
    margin-right: 144px;
    font-size: $font-size-sm;
    line-height: 1.8;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    max-height: 96px;
  }

  .post-list-item .cover {
    width: 128px;
    height: 96px;
    position: absolute;
    top: 44px;
    right: 0;
  }

  .post-list-item .statistic {
    color: $gray-color;
    font-size: $font-size-smer;
  }

  .post-list-item .statistic .item {
    margin-right: $layout-spacing;
  }

  .post-list-item .icon {
    font-size: 18px;
    vertical-align: top;
  }
</style>
