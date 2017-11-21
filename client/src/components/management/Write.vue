<template>
  <div>
    <p>类　　型：
      <select v-model="post.type">
        <option value="0">写作</option>
        <option value="1">编程</option>
      </select>
    </p>
    <p>
      封面URL：<input type="text" v-model="post.cover_image">
    </p>
    <p>
      封面说明：<input type="text" v-model="post.cover_caption">
    </p>
    <p>
      标　　题：<input type="text" v-model="post.title">
    </p>
    <p>
      时　　间：<input type="text" v-model="time">
    </p>
    <p>
      内　　容：<textarea rows="20" cols="125" v-model="post.markdown"></textarea>
    </p>
    <p>
      <button @click="commit">提交</button>
    </p>
  </div>
</template>

<script scoped>
  export default {
    data() {
      return {
        post: {
          type: 0,
          cover_caption: '图片来自网络'
        },
        time: ''
      }
    },
    methods: {
      commit() {
        this.post.finished_time = new Date(this.time).getTime();
        this.$http.api.post.save(this.post)
        console.log(this.post)
      }
    }
  }
</script>

<style>

</style>
