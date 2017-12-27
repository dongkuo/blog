<template>
  <div>
    <!--导航-->
    <app-primary-nav></app-primary-nav>
    <!--正文-->
    <div class="main-wrapper post-detail-wrapper">
      <!--标题-->
      <h2>{{post.title}}</h2>
      <p class="text-gray text-small statistic">
        <span>喜欢 {{post.like_number}}</span>
        <span>评论 {{post.commenting_number}}</span>
        <span>阅读 {{post.reading_number}}</span>
        <span>写于{{post.finished_time | date('friendly')}}</span>
      </p>
      <!--封面-->
      <figure class="figure">
        <img :src="post.cover_image" class="img-responsive" :alt="post.cover_caption">
        <figcaption class="figure-caption text-center">{{post.cover_caption}}</figcaption>
      </figure>
      <!--正文-->
      <div v-html="post.html"></div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppPrimaryNav from './PrimaryNav'
  import AppFooter from './Footer'

  export default {
    components: {
      AppPrimaryNav,
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

  .statistic span{
    margin-right: $unit-2;
  }

</style>
