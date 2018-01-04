<template>
  <div class="wrapper" v-on:keyup.esc="dismissAllModal">
    <!--分类-->
    <app-category-list-layout class="category-layout" :categories="categories"></app-category-list-layout>
    <!--文章-->
    <app-post-list-layout class="post-layout" :posts="currentCategory && currentCategory.posts"></app-post-list-layout>
    <!--编辑器-->
    <app-editor-layout class="editor-layout" v-model="currentPost"></app-editor-layout>
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
        currentCategory: {},
        currentPost: {}
      }
    },
    methods: {
      /*获取所有分类*/
      getCategories() {
        this.$api.postCategory.list().then(resp => {
          this.categories = resp.data.data
          if (this.categories.length > 0) {
            this.currentCategory = this.categories[0]
            this.currentCategory.selected = true
            this.getPosts()
          }
        }).catch(err => {
          console.error(err)
        })
      },
      /*获取当前分类下的文章*/
      getPosts() {
        if (!this.currentCategory) {
          return
        }
        if (!this.currentCategory.content) {
          this.currentCategory.content = {page: 0, posts: []}
        }
        let query = {page: this.currentCategory.content.page + 1, size: 10, categoryId: this.currentCategory.id}
        this.$api.post.list(query).then(resp => {
          this.currentCategory.content.page = resp.data.data.page
          if (posts.length > 0) {
            this.currentPost = posts[0]
            this.currentPost.selected = true
          }
        }).catch(err => {

        })
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
