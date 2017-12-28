<template>
  <div class="wrapper" v-on:keyup.esc="dismissAllModal">
    <!--添加文章分类模态框-->
    <div class="modal" :class="{active: isAddCategoryModalActive}">
      <a href="javascript:void(0)" class="modal-overlay" aria-label="Close"></a>
      <div class="modal-container">
        <div class="modal-header">
          <a href="javascript:void(0)" class="btn btn-clear float-right"
             @click="isAddCategoryModalActive = false"></a>
          <div class="modal-title h5">添加文章分类</div>
        </div>
        <div class="modal-body">
          <div class="content">
            <form class="form-horizontal">
              <div class="form-group" :class="{'has-error': addCategoryModalNameError}">
                <div class="col-2">
                  <label class="form-label" for="input-add-category-name">分类名称：</label>
                </div>
                <div class="col-10">
                  <input id="input-add-category-name" class="form-input" type="text" placeholder="请输入文章分类名称"
                         maxlength="10"
                         v-model="toAddCategory.name">
                  <p class="form-input-hint">{{addCategoryModalNameError}}</p>
                </div>
              </div>
              <div class="form-group" :class="{'has-error': addCategoryModalUrlError}">
                <div class="col-2">
                  <label class="form-label" for="input-add-category-url">分类链接：</label>
                </div>
                <div class="col-10">
                  <input id="input-add-category-url" class="form-input" type="text" placeholder="请输入文章分类链接"
                         v-model="toAddCategory.url">
                  <p class="form-input-hint">{{addCategoryModalUrlError}}</p>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="addCategory">添加</button>
          <a href="javascript:void(0)" class="btn btn-link" aria-label="Close"
             @click="isAddCategoryModalActive = false">取消</a>
        </div>
      </div>
    </div>

    <!--编辑文章分类模态框-->
    <div class="modal" :class="{active: isUpdateCategoryModalActive}">
      <a href="javascript:void(0)" class="modal-overlay" aria-label="Close"></a>
      <div class="modal-container">
        <div class="modal-header">
          <a href="javascript:void(0)" class="btn btn-clear float-right" aria-label="Close"
             @click="isUpdateCategoryModalActive = false"></a>
          <div class="modal-title h5">修改文章分类</div>
        </div>
        <div class="modal-body">
          <div class="content">
            <form class="form-horizontal">
              <div class="form-group has-error">
                <div class="col-2">
                  <label class="form-label" for="input-add-post-name">分类名称：</label>
                </div>
                <div class="col-10">
                  <input id="input-add-post-name" class="form-input" type="text" placeholder="Name">
                  <p class="form-input-hint">分类名称不能为空</p>
                </div>
              </div>
              <div class="form-group has-error">
                <div class="col-2">
                  <label class="form-label" for="checkbox-post-visible">分类可见：</label>
                </div>
                <div class="col-10">
                  <label class="form-switch">
                    <input id="checkbox-post-visible" type="checkbox">
                    <i class="form-icon"></i>
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary">修改</button>
          <a href="javascript:void(0)" class="btn btn-link"
             @click="isUpdateCategoryModalActive = false">取消</a>
        </div>
      </div>
    </div>
    <!--分类-->
    <div class="category-panel">
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
          <span class="float-right text-gray">
            <i class="material-icons c-hand" @click="isUpdateCategoryModalActive = true" title="修改分类">build</i>
            <i class="material-icons c-move" title="拖动排序"
               @mouseenter="allowCategoryDrag = true" @mouseleave="allowCategoryDrag = false">open_with</i>
          </span>
        </li>
      </ul>
    </div>
    <!--文章-->
    <div class="post-panel">
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
          this.$toast('文章分类添加成功')
        }).catch(err => {
          console.error(err)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";

  .wrapper {
    height: 100%;
  }

  .material-icons {
    font-size: 20px;
    vertical-align: sub;
    padding-right: $unit-1;
  }

  .function-group {
    font-size: 14px;
    margin: $unit-4 0;

    .function-item {
      cursor: pointer;
      margin-left: $unit-4;
    }

    .material-icons {
      font-size: 18px;
    }
  }

  .category-panel {
    width: $writer-category-panel-width;
    height: 100%;
    background: $writer-category-panel-background-color;
    float: left;
    color: $writer-category-panel-color;

    .function-group .function-item {
      color: $writer-category-panel-color;

      &:hover {
        color: $primary-color;
      }
    }

    li {
      margin: 0;
      padding: $control-padding-x;
      list-style: none;
      cursor: default;
      border-left: $unit-1 solid transparent;

      &:hover, &.selected {
        border-color: $primary-color;
        background: lighten($writer-category-panel-background-color, 5%);
      }

      &.selected {
        color: $primary-color;
      }
    }

  }

  .post-panel {
    width: $writer-post-panel-width;
    height: 100%;
    float: left;
    overflow-x: auto;
    overflow-y: scroll;

    &::-webkit-scrollbar { /*滚动条整体样式*/
      width: $unit-2; /*高宽分别对应横竖滚动条的尺寸*/
      height: $unit-2;
    }
    &::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
      border-radius: $unit-2;
      -webkit-box-shadow: inset 0 0 $unit-2 rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.2);
    }
    &::-webkit-scrollbar-track { /*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 $unit-2 rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }

    .function-group .function-item:hover {
      color: $primary-color;
    }

    li {
      list-style: none;
      border-left: $unit-1 solid transparent;
      padding: $control-padding-x-lg $control-padding-x-lg $control-padding-x-lg $unit-16;
      position: relative;

      &:hover, &.selected {
        border-color: $primary-color;
        background: lighten($body-font-color, 68%);
      }

      .icon-article {
        font-size: 48px;
        color: $dark-color;
        position: absolute;
        left: $unit-2;
        top: 0;
        line-height: 71px;
      }

      p {
        margin: 0;
      }

      .statistic {
        color: $gray-color;
        font-size: 13px;
        margin-top: $unit-1;

        .item {
          margin-right: $unit-2;
        }
      }

      .btn-delete {
        position: absolute;
        right: 0;
        cursor: pointer;
        bottom: $control-padding-x-lg;
        color: $gray-color-dark;
        display: none;

        &:hover {
          color: $error-color;
        }
      }

      &.selected .btn-delete {
        display: inline-block;
      }
    }
  }

  /*editor-layout*/
  .editor-layout {
    padding-left: $writer-category-panel-width + $writer-post-panel-width;
    height: 100%;

    .input-title {
      width: 100%;
      border: none;
      box-shadow: none;
      outline: none;
      font-size: 1.6em;
      font-weight: bold;
      color: $body-font-color;
      padding: $unit-2 $unit-6;
    }
    .editor-wrapper {
      height: calc(100% - 54px);
    }
    .editor {
      height: 100%;
    }
  }
</style>
