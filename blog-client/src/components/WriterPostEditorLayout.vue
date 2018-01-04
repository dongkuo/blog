<template>
  <div>
    <input type="text" class="title-input" placeholder="文章标题" v-model="value.title">
    <div class="editor-wrapper">
      <mavon-editor v-model="value.markdown" ></mavon-editor>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['value'],
    data() {
      return {
      }
    },
    methods: {
      updateValue() {
        this.$emit('input', this.markdown)
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

  .editor-wrapper {
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
