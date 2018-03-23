<template>
  <div>
    <!--header-->
    <app-header></app-header>
    <!--main-->
    <div class="main-wrapper post-detail-wrapper">
      <!--标题-->
      <h1>{{post.title}}</h1>
      <p class="text-hint statistic">
        <span class="item">喜欢 {{post.like_number}}</span>
        <span class="item">评论 {{post.commenting_number}}</span>
        <span class="item">阅读 {{post.reading_number}}</span>
        <span class="item">写于 {{post.finished_time | date('friendly')}}</span>
      </p>
      <!--封面-->
      <figure v-if="post.cover_image">
        <img :src="post.cover_image" class="img-responsive" :alt="post.cover_caption">
        <figcaption class="figure-caption text-center">{{post.cover_caption}}</figcaption>
      </figure>
      <!--正文-->
      <div class="post-detail" v-html="post.html"></div>
    </div>
    <!--footer-->
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppHeader from './Header'
  import AppFooter from './Footer'
  import load from '../load'

  export default {
    components: {
      AppHeader,
      AppFooter
    },
    data() {
      return {
        post: {}
      }
    },
    created() {
      // 获取文章详情
      this.$api.post.get(this.$route.params.id).then(resp => {
        this.post = resp.data.data
      }).catch(e => {
        console.error(e)
      })
      // 加载css
      load.css("//cdn.bootcss.com/highlight.js/9.12.0/styles/atom-one-light.min.css")
      load.css("//cdn.bootcss.com/KaTeX/0.9.0/katex.min.css")
    },
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";

  .statistic .item {
    margin-right: $space;
  }
</style>
<style lang="scss">
  @import "../assets/scss/variables.scss";

  .post-detail {
    p, li {
      line-height: 1.75rem;
    }

    blockquote {
      padding: 0 1rem;
      border-left: 4px solid $text-color-primary;
      background-color: darken($page-background-color, 0.75%);
      color: lighten($page-font-color, 20%);

      p {
        margin: 0;
        padding: 0.5rem 0;
      }
    }

    pre {
      background: #f1f1f5;
      padding: 0.5rem 1rem;
      overflow-y: auto;
      border-radius: 3px;
      line-height: 1.6rem;
    }
    ul, ol {
      padding-left: 2.4rem;
    }

    .katex-block{
      text-align: center;
    }
  }
</style>
