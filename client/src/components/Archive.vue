<template>
  <div>
    <!--导航栏-->
    <app-primary-nav></app-primary-nav>
    <!--主要内容-->
    <div class="main-wrapper" v-for="posts in archives" :key="posts.id">
      <h2 class="title">{{posts[0].year}}</h2>
      <ul class="archive-list">
        <li v-for="post in posts" :key="post.id" class="item">
          <span class="text-gray time">{{post.finished_time | date('yyyy.MM.dd')}}</span> —
          <router-link class="text-body-color" :to="'/posts/' + post.id">{{post.title}}</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import AppPrimaryNav from "./PrimaryNav.vue";

  export default {
    components: {
      AppPrimaryNav
    },
    created(){
      this.getArchives();
    },
    data() {
      return {
        archives: []
      }
    },
    methods:{
      getArchives(){
        this.$api.post.all().then(resp => {
          let lastPost = null
          let array = []
          resp.data.data.forEach(post => {
            let year = new Date(post.finished_time).getFullYear();
            post.year = year
            if(!lastPost || new Date(lastPost.finished_time).getFullYear() !== year){
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

  .main-wrapper{
    margin-left: auto;
    margin-right: auto;
    max-width: $page-width;
  }
  .title {
    font-size: 22px;
    font-weight: bold;
  }

  .archive-list{
    padding-left: 36px;
  }

  @media screen and (max-width: 720px) {
    .title {
      font-size: 20px;
    }
  }
</style>
