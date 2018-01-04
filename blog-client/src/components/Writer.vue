<template>
  <div class="wrapper" v-on:keyup.esc="dismissAllModal">
    <!--分类-->
    <app-writer-category-layout></app-writer-category-layout>
    <!--文章-->
    <div class="post-layout">
      <div class="function-group">
        <span class="function-item" @click="isAddPostModalActive = true"><i class="material-icons">edit</i>写文章</span>
      </div>
      <ul>
        <li class="selected">
          <i class="material-icons icon-article">insert_drive_file</i>
          <p class="text-ellipsis">我是文章标题，我可能很长很长很长很长</p>
          <p class="statistic">
            <span class="item text-hint">喜欢 121</span>
            <span class="item text-hint">评论 122</span>
            <span class="item text-hint">阅读 73</span>
            <span class="item text-hint">3天前</span>
          </p>
          <a href="javascript:void(0)" class="material-icons btn-delete" title="删除">delete</a>
        </li>
        <li>
          <i class="material-icons icon-article">insert_drive_file</i>
          <p class="text-ellipsis">我是文章标题，我可能很长很长很长很长</p>
          <p class="statistic">
            <span class="item text-hint">喜欢 121</span>
            <span class="item text-hint">评论 122</span>
            <span class="item text-hint">阅读 73</span>
            <span class="item text-hint">3天前</span>
          </p>
          <a href="javascript:void(0)" class="material-icons btn-delete" title="删除">delete</a>
        </li>
      </ul>
    </div>
    <!--编辑器-->
    <div class="editor-layout">
      <input type="text" class="input-title" placeholder="请输入文章标题">
      <div class="editor-wrapper">
        <mavon-editor v-model="markdown" class="editor"></mavon-editor>
      </div>
    </div>
  </div>
</template>

<script>
  import AppWriterCategoryLayout from "./WriterCategoryLayout.vue";

  export default {
    components: {
      AppWriterCategoryLayout
    },
    data() {
      return {
        markdown: ''
      }
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";

  .wrapper {
    position: relative;
    height: 100%;
  }

  .post-layout {
    width: $writer-post-layout-width;
    position: absolute;
    top: 0;
    left: $writer-category-layout-width;
  }

  .editor-layout {
    padding-left: $writer-category-layout-width + $writer-post-layout-width;
  }
</style>
