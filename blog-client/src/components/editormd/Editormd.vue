<template>
  <div>
    <div id="editormd">
      <textarea style="display:none;">### Hello Editor.md !</textarea>
    </div>
  </div>
</template>

<script>
  import jQuery from 'jquery'
  import editormdFactory from './editormd'

  export default {
    mounted() {
      console.log('jQuery', jQuery)
      var editor = editormdFactory(jQuery)("editormd", {
        path: "/static/lib/"
      });

    }
  }
</script>

<style scoped>
</style>
