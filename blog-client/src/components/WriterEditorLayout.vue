<template>
  <div>
    <!--<div class="mask" v-if="value"></div>-->
    <div class="editor-wrapper">
      <input type="text" class="title-input" placeholder="文章标题" v-model="value.title">
      <div class="editor-box">
        <app-editormd class="editor" v-model="value.markdown" :options="options"></app-editormd>
      </div>
    </div>
  </div>
</template>

<script>
  import AppEditormd from "./editormd/Editormd.vue";

  export default {
    props: ['value'],
    components: {AppEditormd},
    data() {
      return {
        postsCache: {},
        options: {
          path: '/static/lib/',
          tex: true
        }
      }
    },
    mounted(){
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
    outline: none;
    border-left: 1px solid #ddd;
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
