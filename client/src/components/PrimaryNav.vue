<!--主导航栏-->
<template>
  <div class="nav-container">
    <div class="nav-wrapper">
      <a href="#" class="btn-link"><img src="../assets/img/logo.jpg" class="nav-logo"></a>
      <nav class="nav-box text-center">
        <router-link v-for="category in categories" :key="category.id" :to="category.url">{{category.name}}
        </router-link>
        <router-link to="/archives">归 档</router-link>
        <router-link to="/about">关 于</router-link>
      </nav>
    </div>
    <div class="divider"></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        categories: this.$categories
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";

  $nav-wrapper-height: $nav-height - 2 * $layout-spacing;
  $nav-wrapper-height-sm: $nav-height-sm - 2 * $layout-spacing;

  .nav-container {
    position: relative;
    height: $nav-height;
    background-color: $nav-background-color;
    @media screen and (max-width: $page-width) {
      height: $nav-height-sm;
    }
  }

  .nav-wrapper {
    max-width: $page-width;
    margin-left: auto;
    margin-right: auto;
    padding: $layout-spacing 0;
    line-height: $nav-wrapper-height;
    @media screen and (max-width: $page-width) {
      line-height: $nav-wrapper-height-sm;
      padding: $layout-spacing $layout-spacing;
    }
  }

  .nav-logo {
    position: absolute;
    height: $nav-wrapper-height;
    @media screen and (max-width: $page-width) {
      height: $nav-wrapper-height-sm;
    }
  }

  .nav-box {
    @media screen and (max-width: $page-width) {
      text-align: left;
      margin-left: $nav-height-sm - $layout-spacing;
    }
  }

  .nav-box a {
    color: $gray-color-dark;
    margin: 0 $layout-spacing-lg;
    padding-bottom: $layout-spacing;
    text-decoration: none;
    position: relative;
    @media screen and (max-width: $page-width) {
      margin: 0 $layout-spacing;
      padding-bottom: $layout-spacing-sm;
    }
  }

  .nav-box a::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    position: absolute;
    left: 0;
    bottom: -2px;
    background: $primary-color;
    transition: all 0.3s ease-in-out;
    transform: scale3d(0, 1, 1);
    transform-origin: 50% 0;
  }

  .nav-box a:hover {
    color: $primary-color;
  }

  .nav-box a:hover::after {
    transform: scale3d(1, 1, 1);
  }

  .nav-box .router-link-active {
    color: $primary-color;
    border-bottom: 2px solid $primary-color;
  }

  .divider {
    position: absolute;
    width: 100%;
    bottom: 0;
    margin: 0;
  }
</style>
