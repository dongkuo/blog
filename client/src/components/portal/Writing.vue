<template>
  <ul class="post-list">
    <li class="post" v-for="post in posts">
      <h2 class="title"><router-link to="/posts/47cfa58c0eb3" class="link-primary">{{post.title}}</router-link></h2>
      <span class="date">{{post.createdTime}}</span>
      <p class="content">
        <span>{{post.summary}}</span>
        <a href=""><img :src="post.cover" class="cover"></a>
      </p>
      <span class="label" v-for="label in post.labels">{{label}}</span>
      <span class="attribute">
        <i class="fa fa-eye" aria-hidden="true"></i>
        {{post.readingNumber}}
      </span>
      <span class="attribute">
        <i class="fa fa-heart" aria-hidden="true"></i>
        {{post.likeNumber}}
      </span>
      <span class="attribute">
        <i class="fa fa-commenting" aria-hidden="true"></i>
        {{post.commentingNumber}}
      </span>
    </li>
    <infinite-loading @infinite="getPosts">
      <app-loading slot="spinner"></app-loading>
      <p slot="no-more"><app-emoji>🙈</app-emoji> 没有啦...</p>
    </infinite-loading>
  </ul>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading'
  import AppLoading from './Loading.vue'
  import AppEmoji from '../public/Emoji'

  export default {
    components: {
      InfiniteLoading,
      AppLoading,
      AppEmoji
    },
    data() {
      return {
        page: 1,
        size: 10,
        posts: []
      }
    },
    methods: {
      getPosts($state) {
        if (this.page === 3) {
          $state.complete()
          return
        }
        setTimeout(() => {
          const temp = []
          for (let i = this.posts.length; i < this.posts.length + this.size; i++) {
            temp.push({
              title: '老海棠树' + (i + 1),
              summary: '如果可能，如果有一块空地，不论窗前窗后，要是能随我的心愿种点什么，我就种两棵树。一棵合欢，纪念母亲。一棵海棠，纪念奶奶。奶奶和一棵老海棠树，在我的记忆里不能分开；好像她们从来就在一起，奶奶一生一世都在那棵老海棠树的影子里张望。老海棠树近房高的地方，有两条粗壮的枝丫，弯曲如一把躺椅，小时候我常爬上去',
              cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506695525761&di=147a130b5c43c1119781db3a305e32f9&imgtype=0&src=http%3A%2F%2Fwww.xiedingshan.com%2FUpload%2Fplpro2015073114331470812.jpg',
              labels: ['读书', '散文'],
              readingNumber: 2302,
              likeNumber: 1029,
              commentingNumber: 1872,
              createdTime: "2分钟以前"
            })
          }
          this.posts = this.posts.concat(temp);
          this.page++;
          $state.loaded();
        }, 1500)
      }
    }
  }
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
