<template>
  <div class="wrapper" v-on:keyup.esc="dismissAllModal">
    <!--分类-->
    <div class="category-layout">
      <div class="function-group">
        <router-link class="function-item" to="/"><i class="material-icons">home</i>返回首页</router-link>
        <span class="function-item" @click="showAddCategoryModal"><i
          class="material-icons">add_box</i>添加分类</span>
      </div>
      <ul>
        <li v-for="category in categories"
            v-dragging="{ item: category, list: categories, group: 'postCategory' }"
            :class="{selected: category.selected}"
            :key="category.id">
          <i class="material-icons">library_books</i>
          <span>{{category.name}}</span>
          <span class="btn-group text-gray">
            <i class="material-icons c-hand" @click="isUpdateCategoryModalActive = true" title="修改分类">build</i>
            <i class="material-icons c-hand" @click="isUpdateCategoryModalActive = true" title="删除">delete</i>
            <i class="material-icons c-move" title="拖动排序"
               @mouseenter="allowCategoryDrag = true" @mouseleave="allowCategoryDrag = false">open_with</i>
          </span>
        </li>
      </ul>
    </div>
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
        <mavon-editor v-model="markdown" class="editor"/>
      </div>
    </div>

  </div>
</template>

<script>

  export default {
    mounted() {
      this.$dragging.$on('dragstart', ({event}) => {
        if (!this.allowCategoryDrag) {
          event.preventDefault();
        }
      })
    },
    data() {
      return {
        isAddCategoryModalActive: false,
        isUpdateCategoryModalActive: false,
        allowCategoryDrag: false,
        categories: [],
        toAddCategory: {name: '', url: ''},
        addCategoryModalNameError: '',
        addCategoryModalUrlError: '',
        markdown: ''
      }
    },
    created() {
      this.getCategories();
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
      showAddCategoryModal() {
        this.isAddCategoryModalActive = true;
        this.toAddCategory = {name: '', url: ''}
        this.addCategoryModalNameError = ''
      },
      dismissAllModal() {
        this.isAddCategoryModalActive = false;
        this.isUpdateCategoryModalActive = false;
      },
      addCategory() {
        if (!this.toAddCategory.name) {
          this.addCategoryModalNameError = '请输入文章分类名称'
          return
        }
        if (this.toAddCategory.name.length > 10) {
          this.addCategoryModalNameError = '分类名称长度不能多于10个字符'
          return
        }
        if (!this.toAddCategory.url) {
          this.addCategoryModalNameError = '请输入文章分类链接'
          return
        }
        this.$api.postCategory.save(this.toAddCategory).then(resp => {
          this.categories.push(resp.data.data)
          this.dismissAllModal()
          // this.$toast('文章分类添加成功')
        }).catch(err => {
          console.error(err)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";

  .wrapper{
    position: relative;
    height: 100%;
  }

  .category-layout{
    width: $writer-category-layout-width;
    position: absolute;
    top: 0;
    left: 0;
    background-color: $writer-category-layout-background;
    color: $writer-category-layout-color;
    height: 100%;
  }
  .post-layout{
    width: $writer-post-layout-width;
    position: absolute;
    top: 0;
    left: $writer-category-layout-width;
  }
  .editor-layout{
    padding-left: $writer-category-layout-width + $writer-post-layout-width;
  }
</style>
