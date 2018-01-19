<template>
  <div class="wrapper" v-on:keyup.esc="dismissAllModal">
    <!--分类-->
    <app-category-list-layout class="category-layout" @onSelected="OnCategorySelected"></app-category-list-layout>
    <!--文章-->
    <app-post-list-layout class="post-layout" :categoryId="categoryId"
                          @onSelected="onPostSelected" ref="postListLayout"></app-post-list-layout>
    <!--编辑器-->
    <app-editor-layout class="editor-layout" :postId="postId" @onChange="onPostChange"></app-editor-layout>
  </div>
</template>

<script>
  import AppCategoryListLayout from "./WriterCategoryListLayout";
  import AppPostListLayout from "./WriterPostListLayout";
  import AppEditorLayout from "./WriterEditorLayout";

  export default {
    components: {
      AppCategoryListLayout,
      AppPostListLayout,
      AppEditorLayout
    },
    data() {
      return {
        categoryId: null,
        postId: 0
      }
    },
    methods: {
      OnCategorySelected(category) {
        this.categoryId = category.id
        this.postId = 0
      },
      onPostSelected(post) {
        this.postId = post.id
      },
      onPostChange(post) {
        this.$refs.postListLayout.setPost(post)
      }
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
