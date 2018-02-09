<template>
  <div :id="id">
    <textarea style="display:none;">{{value}}</textarea>
  </div>
</template>

<script>
  import editormd from './editormd'

  function randomId() {
    let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let res = "";
    for (let i = 0; i < 6; i++) {
      let id = Math.ceil(Math.random() * 9);
      res += chars[id];
    }
    return 'editormd-' + res;
  }

  export default {
    props: ['value', 'options'],
    data() {
      return {
        id: randomId(),
        editor: null,
      }
    },
    mounted() {
      this.editor = editormd(this.id, this.options);
      this.editor.on('load', () => {
        this.editor.cm.on('change', (editor, changeObj) => {
          if (changeObj.origin === '+input') {
            this.$emit('input', editor.getValue())
          }
        })
      })
    },
    methods: {
      getMarkdown() {
        return this.editor ? this.editor.getMarkdown() : ''
      },
      getSummary(length) {
        if (!this.editor) {
          return ''
        }
        if (!length) {
          length = 100
        }
        let text = this.editor.getPreviewedText() || '';
        return text.substr(0, length);
      }
    },
    watch: {
      value: function (newVal) {
        if (this.editor.isReady) {
          this.editor.setValue(newVal)
        }
      }
    }
  }
</script>

<style scoped>
</style>
