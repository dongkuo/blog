<template>
  <div>
    <div class="mask" v-if="!post">
      <input type="text" class="title-input" placeholder="文章标题">
      <div class="editor-box">
        <mavon-editor class="editor"></mavon-editor>
      </div>
    </div>
    <div class="editor-wrapper" v-else>
      <input type="text" class="title-input" placeholder="文章标题" :value="post.title">
      <div class="editor-box">
        <mavon-editor :value="post.markdown" class="editor"></mavon-editor>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['post'],
    data() {
      return {}
    },
    methods: {}
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
    background: gray;
    position: fixed;
    opacity: 0.8;
    z-index: 9999999999999;
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
