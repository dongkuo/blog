<template>
  <div>
    <h1>editor.md</h1>
    <p>{{content}}</p>
    <app-editormd v-model="content" :options="options"></app-editormd>
  </div>
</template>

<script>
  import AppEditormd from "./editormd/Editormd.vue";

  export default {
    components: {AppEditormd},
    data() {
      return {
        content: '测试',
        options: {
          path: '/static/lib/',
          height: 200
        }
      }
    }
  }
</script>

<style scoped>
</style>
