<template>
  <ul class="post-list">
    <li class="post" v-for="post in posts" :key="post.id">
      <h2 class="title">
        <router-link :to="'/posts/' + post.id" class="link-primary">{{post.title}}</router-link>
      </h2>
      <span class="date" :title="post.finished_time | date">{{post.finished_time | date('friendly')}}</span>
      <p class="content">
        <span>{{post.summary}}</span>
        <router-link :to="'/posts/' + post.id" class="link-primary">
          <img :src="post.cover_image ||  'http://oy1w6h5oy.bkt.clouddn.com/picture.svg'" class="cover">
        </router-link>
      </p>
      <span class="label" v-for="label in post.labels" :key="label">{{label}}</span>
      <span class="attribute">
        <i class="fa fa-eye" aria-hidden="true"></i>
        {{post.reading_number}}
      </span>
      <span class="attribute">
        <i class="fa fa-heart" aria-hidden="true"></i>
        {{post.like_number}}
      </span>
      <span class="attribute">
        <i class="fa fa-commenting" aria-hidden="true"></i>
        {{post.commenting_number}}
      </span>
    </li>
    <infinite-loading @infinite="getPosts">
      <app-loading slot="spinner"></app-loading>
      <p slot="no-more">
        <app-emoji>🙈</app-emoji> 没有啦...</p>
    </infinite-loading>
  </ul>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import AppLoading from "./Loading.vue";
import AppEmoji from "../public/Emoji";

export default {
  components: {
    InfiniteLoading,
    AppLoading,
    AppEmoji
  },
  data() {
    return {
      page: 0,
      size: 10,
      total: Number.POSITIVE_INFINITY,
      posts: []
    };
  },
  methods: {
    getPosts($state) {
      const nextPage = this.page + 1;
      if (this.page * this.size >= this.total) {
        $state.complete();
        return;
      }
      this.$http.api.post
        .list({ page: nextPage, size: this.size })
        .then(resp => {
          this.total = resp.data.data.total;
          this.page = resp.data.data.page;
          if (resp.data.data.content.length === 0) {
            $state.complete();
            return;
          }
          resp.data.data.content.forEach(post => {
            this.posts.push(post);
            $state.loaded();
          }, this);
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};
</script>

<style scoped>
.post-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.post {
  position: relative;
  padding: 16px 0;
  border-bottom: 1px dashed #dfe9eb;
}

.post .title {
  margin: 0 0 16px 0;
  font-size: 1.4em;
  line-height: 1;
}

.post .date {
  position: absolute;
  top: 16px;
  line-height: 1;
  right: 0;
  color: #99a4b9;
  font-size: 14px;
}

.post .content {
  position: relative;
  height: 108px;
  padding-right: 160px;
  overflow: hidden;
  font-size: 14px;
}

.post .cover {
  width: 144px;
  height: 108px;
  position: absolute;
  top: 0;
  right: 0;
}

.post .label {
  border: 1px solid #1296db;
  border-radius: 2px;
  padding: 2px 4px;
  color: #1296db;
  margin-right: 8px;
  font-size: 14px;
}

.post .attribute {
  color: #8590a6;
  font-size: 14px;
  margin-right: 8px;
}

@media screen and (max-width: 720px) {
  .post .content {
    padding-right: 104px;
    height: 72px;
  }

  .post .cover {
    width: 96px;
    height: 72px;
  }
}
</style>
