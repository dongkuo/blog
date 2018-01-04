<template>
  <div>
    <!--header-->
    <app-header></app-header>
    <!--main-->
    <ul class="main-wrapper post-list">
      <li class="post-list-item" v-for="post in posts">
        <h3 class="link-primary">
          <router-link :to="`/posts/${post.id}`" class="link-primary">{{post.title}}</router-link>
        </h3>
        <time class="finished-time text-hint">{{post.finished_time | date('friendly')}}</time>
        <p class="summary">
          {{post.summary}}
          <img
            :src="post.cover_image || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2N4+fLlfwAJNQO7zHm8/wAAAABJRU5ErkJggg=='"
            class="cover">
        <p class="statistic text-hint">
          <span class="item"><img src="../assets/img/star.png">{{post.like_number}}</span>
          <span class="item"><img src="../assets/img/comment.png">{{post.commenting_number}}</span>
          <span class="item"><img src="../assets/img/eye.png">{{post.reading_number}}</span>
        </p>
        <hr class="divider"/>
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
    <!--footer-->
    <app-footer></app-footer>
  </div>
</template>
<script>
  import AppInfiniteLoading from "vue-infinite-loading";
  import AppLoading from "./PostLoading.vue";
  import AppEmoji from "./Emoji.vue";
  import AppHeader from "./Header.vue";
  import AppFooter from "./Footer.vue";

  export default {
    components: {
      AppInfiniteLoading,
      AppLoading,
      AppEmoji,
      AppHeader,
      AppFooter
    },
    data() {
      return {
        page: 0,
        size: 10,
        total: Number.POSITIVE_INFINITY,
        posts: []
      };
    },
    beforeRouteUpdate(to, from, next) {
      this.reset()
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      // 路由变化时，数据归零，重新请求数据
      next()
    },
    methods: {
      reset() {
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

  .post-list {
    list-style: none;
  }

  .post-list-item{
    position: relative;
  }

  .finished-time{
    position: absolute;
    top: $space;
    right: 0;
  }
  .summary{
    font-size: $page-font-size-sm;
    position: relative;
    padding-right: $post-list-cover-width + $space-lg;
    height: $post-list-cover-height;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }

  .summary .cover{
    width: $post-list-cover-width;
    height: $post-list-cover-height;
    position: absolute;
    top: 0;
    right: 0;
  }

  .statistic .item{
    margin-right: $space;
  }

  .statistic img{
    margin-right: $space-sm;
  }

  .divider{
    border: 1px dashed $post-list-divider-background-color;
    border-top: none;
  }
</style>
