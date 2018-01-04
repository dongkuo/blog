<template>
  <div>
    <!--header-->
    <app-header></app-header>
    <!--主要内容-->
    <div class="main-wrapper" v-for="posts in archives" :key="posts.id">
      <h3>{{posts[0].year}}</h3>
      <ul class="archive-list">
        <li v-for="post in posts" :key="post.id" class="item">
          <span class="text-color-light">{{post.finished_time | date('yyyy.MM.dd')}}</span> —
          <router-link class="link-primary" :to="'/posts/' + post.id">{{post.title}}</router-link>
        </li>
      </ul>
    </div>
    <!--footer-->
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppHeader from "./Header.vue";
  import AppFooter from './Footer'

  export default {
    components: {
      AppHeader,
      AppFooter
    },
    created() {
      this.getArchives();
    },
    data() {
      return {
        archives: []
      }
    },
    methods: {
      getArchives() {
        this.$api.post.all().then(resp => {
          let lastPost = null
          let array = []
          resp.data.data.forEach(post => {
            let year = new Date(post.finished_time).getFullYear();
            post.year = year
            if (!lastPost || new Date(lastPost.finished_time).getFullYear() !== year) {
              array = []
              this.archives.push(array)
            }
            array.push(post)
            lastPost = post
          });
        }).catch(err => {
          console.error(err)
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";

  .archive-list{
    padding: 0 2em;
  }
</style>
