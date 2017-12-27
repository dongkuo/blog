<template>
  <div class="wrapper">
    <div class="category-panel">
      <p class="function-group">
        <router-link class="function-item" to="/"><i class="material-icons">home</i> 返回首页</router-link>
        <span class="function-item"><i class="material-icons">add_box</i> 添加分类</span>
      </p>
      <ul>
        <li class="selected"><i class="material-icons">library_books</i> 写作</li>
        <li><i class="material-icons">library_books</i> 编程</li>
      </ul>
    </div>
    <div class="post-panel">
      <p class="function-group">
        <span class="function-item"><i class="material-icons">add_box</i> 创建文章</span>
      </p>
      <ul>
        <li class="selected">
          <i class="material-icons icon-article">insert_drive_file</i>
          <p class="text-ellipsis">我是文章标题，我可能很长很长很长很长</p>
          <p class="statistic">
            <span class="item">喜欢 121</span>
            <span class="item">评论 122</span>
            <span class="item">阅读 73</span>
          </p>
          <btn class="material-icons btn-delete" title="删除">delete</btn>
        </li>
        <li>
          <i class="material-icons icon-article">insert_drive_file</i>
          <p class="text-ellipsis">我是文章标题，我可能很长很长很长很长</p>
          <p class="statistic">
            <span class="item">喜欢 121</span>
            <span class="item">评论 122</span>
            <span class="item">阅读 73</span>
          </p>
          <btn class="material-icons btn-delete" title="删除">delete</btn>
        </li>
      </ul>
    </div>
    <div class="editor">col-6</div>
  </div>
</template>

<script>

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

    .function-item {
      cursor: pointer;
      margin-left: $unit-3;
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
      cursor: pointer;
      border-left: $unit-1 solid transparent;

      &:hover, &.selected {
        border-color: $primary-color;
        color: $primary-color;
        background: lighten($writer-category-panel-background-color, 5%);
      }
    }
  }

  .post-panel {
    width: $post-category-panel-width;
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

      &.selected .btn-delete{
        display: inline-block;
      }
    }
  }

  .editor {
    height: 100%;
  }
</style>
