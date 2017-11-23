<template>
  <div class="text-center wrapper">
    <app-emoji :size="4">🙈</app-emoji>
    <h1 class="title">404</h1>
  </div>
</template>

<script>
  import AppEmoji from "./Emoji";

  export default {
    components: {
      AppEmoji
    }
  }
</script>

<style scoped>
  .title {
    font-size: 60px;
  }
  .wrapper{
    margin-top: 100px;
  }
</style>
