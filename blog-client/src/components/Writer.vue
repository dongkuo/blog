<template>
  <div class="wrapper" v-on:keyup.esc="dismissAllModal">
    <!--分类-->
    <app-category-list-layout class="category-layout" :categories="categories"></app-category-list-layout>
    <!--文章-->
    <app-post-list-layout class="post-layout" :posts="posts"></app-post-list-layout>
    <!--编辑器-->
    <app-editor-layout class="editor-layout" v-model="post"></app-editor-layout>
  </div>
</template>

<script>
  import AppCategoryListLayout from "./WriterCategoryListLayout";
  import AppPostListLayout from "./WriterPostListLayout";
  import AppEditorLayout from "./WriterPostEditorLayout";

  export default {
    components: {
      AppCategoryListLayout,
      AppPostListLayout,
      AppEditorLayout
    },
    created() {
      this.getCategories();
    },
    data() {
      return {
        categories: [],
        posts: [],
        post: {
          title: '测试标题',
          markdown: '我是内容'
        }
      }
    },
    methods: {
      getCategories() {
        this.$api.postCategory.list().then(resp => {
          this.categories = resp.data.data
          if (this.categories.length > 0) {
            this.categories[0].selected = true
          }
        }).catch(err => {
          console.error(err)
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";

  .wrapper {
    position: relative;
    height: 100%;
  }

  .category-layout {
    width: $writer-category-list-layout-width;
    position: absolute;
    top: 0;
    left: 0;
    background-color: $writer-category-list-layout-background;
    color: $writer-category-list-layout-color;
    height: 100%;
  }

  .post-layout {
    width: $writer-post-list-layout-width;
    position: absolute;
    top: 0;
    left: $writer-category-list-layout-width;
  }

  .editor-layout {
    height: 100%;
    padding-left: $writer-category-list-layout-width + $writer-post-list-layout-width;
  }
</style>
