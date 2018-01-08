<template>
  <div>
    <h1>editor.md</h1>
    <app-editormd class="editor"></app-editormd>
  </div>
</template>

<script>
  import AppEditormd from "./editormd/Editormd.vue";

  export default {
    components: {AppEditormd}
  }
</script>

<style scoped>
  .editor {
    height: 500px;
  }
</style>
