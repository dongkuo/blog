<template>
  <div>
    <h1>editor.md</h1>
    <app-editor-md class="editor"></app-editor-md>
  </div>
</template>

<script>
  import AppEditorMd from "./EditorMd";
  export default {
    components:{AppEditorMd}
  }
</script>

<style scoped>
  .editor{
    height: 500px;
  }
</style>
