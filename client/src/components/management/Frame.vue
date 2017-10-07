<template>
  <div>
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>

  import AppHeader from "./Header";
  import AppFooter from "./Footer";

  export default {
    components: {AppHeader, AppFooter},
    name: 'home',
    data() {
      return {
      }
    }
  }
</script>

<style scoped>
</style>
