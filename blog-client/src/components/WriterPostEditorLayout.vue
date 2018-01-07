<template>
  <div>
    <div class="mask" v-if="!postId"></div>
    <div class="editor-wrapper">
      <input type="text" class="title-input" placeholder="文章标题" v-model="post.title">
      <div class="editor-box">
        <!--<mavon-editor class="editor" v-model="post.markdown"></mavon-editor>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['postId'],
    data() {
      return {
        post: {title: '', markdown: ''},
        postsCache: {}
      }
    },
    methods: {},
    watch: {
      postId: function (postId) {
        if (postId === 0) {
          // postId = 0时，表示未选中任何文章，要清空标题和编辑器数据
          this.post = {title: '', markdown: ''}
          return
        }
        let post = this.postsCache[postId]
        if (post) {
          this.post = post
          return
        }
        if (postId < 0) {
          // postId < 0时，表示是新建的文章
          this.post = {title: '新建文章', markdown: ''}
          this.postsCache[postId] = this.post
          return
        }
        this.$api.post.get(postId).then(resp => {
          let post = resp.data.data
          if (post) {
            post.markdown = post.markdown || ''
            this.post = post
            this.postsCache[postId] = post
          }
        }).catch(err => {
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";

  .title-input {
    font-size: $writer-editor-layout-title-font;
    height: $writer-editor-layout-title-height;
    font-weight: bold;
    border: none;
    padding: 0 $space-lg;
    width: 100%;
    box-sizing: border-box;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.157), 0 0 4px rgba(0, 0, 0, 0.227);
    outline: none;
    color: $page-font-color;
  }

  .mask {
    width: 100%;
    height: 100%;
    background: white;
    position: fixed;
    opacity: 0.6;
    z-index: 1600;
    cursor: not-allowed;
  }

  .editor-wrapper {
    height: 100%;
  }

  .editor-box {
    height: calc(100% - #{$writer-editor-layout-title-height});
  }

  .editor {
    height: 100%;
  }
</style>

<style lang="scss">
  @import "../assets/scss/variables.scss";

  .content-input-wrapper {
    padding: $space $space-lg !important;
  }
</style>
