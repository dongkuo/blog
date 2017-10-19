<template>
  <div>
    <div v-for="posts in archives" :key="posts.id">
      <h2 class="title">{{posts[0].year}}</h2>
      <ul>
        <li v-for="post in posts" :key="post.id" class="item"><span class="text-gray time">{{post.finished_time | date('yyyy.MM.dd')}}</span>
          — <a href="" class="link-primary">{{post.title}}</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
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
        this.$http.api.post.all().then(resp => {
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
          console.log(err)
        });
      }
    }
  }
</script>

<style scoped>
  .title {
    font-size: 22px;
  }

  .item {
    margin: 16px 0;
  }

  .time{
    letter-spacing: 2px;
  }

  @media screen and (max-width: 720px) {
    .title {
      font-size: 20px;
    }
  }
</style>
