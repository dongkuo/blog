<template>
  <div>
    <div v-for="posts in archives">
      <h2 class="title">{{posts[0].createdTime | date('yyyy')}}</h2>
      <ul>
        <li v-for="post in posts" class="item"><span class="text-gray">{{post.createdTime | date('yyyy.MM.dd')}}</span>
          — <a href="" class="link-primary">{{post.title}}</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        archives: [
          [
            {title: '梵高先生', createdTime: new Date("2015-03-15")},
          ],
          [
            {title: '遇见', createdTime: new Date("2014-09-14")},
            {title: '八月', createdTime: new Date("2014-09-13")},
            {title: '五月', createdTime: new Date("2014-05-21")},
            {title: '生如夏花', createdTime: new Date("2014-04-29")},
            {title: '你', createdTime: new Date("2014-03-09")},
            {title: '我的大学', createdTime: new Date("2014-02-10")}
          ],
          [
            {title: '十八岁的青春', createdTime: new Date("2013-12-10")},
            {title: '关于旅行', createdTime: new Date("2013-10-12")}
          ]
        ]
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

  @media screen and (max-width: 720px) {
    .title {
      font-size: 20px;
    }
  }
</style>
