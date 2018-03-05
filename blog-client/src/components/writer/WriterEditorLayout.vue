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
  import AppEditormd from "../editormd/Editormd.vue";

  export default {
    props: ['value'],
    components: {AppEditormd},
    data() {
      return {
        postsCache: {},
        options: {
          path: '/static/lib/',
          tex: true,
          toolbarIconsClass: {
            save: "fa-save"  // 指定一个FontAawsome的图标类
          },
          toolbarIcons: function () {
            return [
              "undo", "redo", "|",
              "bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|",
              "h1", "h2", "h3", "h4", "h5", "h6", "|",
              "list-ul", "list-ol", "hr", "|",
              "link", "reference-link", "image", "code", "preformatted-text", "code-block", "table", "datetime", "emoji", "html-entities", "pagebreak", "|",
              "watch", "preview", "fullscreen", "search", "||",
              "save"
            ]
          },
          lang: {
            toolbar: {
              save: "保存文章",
            }
          },
          toolbarHandlers: {
            save: (cm, icon, cursor, selection) => {
              if (this.id) {
                this.savePost()
              } else {
                this.updatePost()
              }
            }
          }
        }
      }
    },
    methods: {
      // 保存文章
      savePost() {

      },
      // 更新文章
      updatePost() {
        this.$api.post.patch({id: this.value.id, title: this.value.title, markdown: this.value.markdown}).then(resp => {
          let msg = resp.data.code === 0 ? "修改成功" : "修改失败" + resp.data.error
          alert(msg)
        }).catch(err => {
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";

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
  @import "../../assets/scss/variables";

  .content-input-wrapper {
    padding: $space $space-lg !important;
  }
</style>
