<template>
  <div>
    <app-header class="header"></app-header>
    <div class="main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>

  import AppHeader from "./Header";
  import AppFooter from "./Footer";

  export default {
    components: {AppHeader, AppFooter},
    data() {
      return {}
    }
  }
</script>

<style scoped>
  .header {
    position: fixed;
    width: 100%;
    z-index: 9999;
  }

  .main {
    max-width: 660px;
    margin: 0 auto;
    padding-top: 72px;
  }

  @media screen and (max-width: 720px) {
    .main {
      padding: 52px 16px 0 16px;
    }
  }

</style>
