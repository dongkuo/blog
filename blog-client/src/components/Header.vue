<!--主导航栏-->
<template>
  <div class="header-container">
    <div class="main-wrapper">
      <a href="#"><img src="../assets/img/logo.jpg" class="header-logo"></a>
      <div class="header-link-group">
        <router-link v-for="category in categories" :key="category.id" :to="category.url">{{category.name}}
        </router-link>
        <router-link to="/archives">归 档</router-link>
        <router-link to="/about">关 于</router-link>
      </div>
    </div>
    <div class="divider"></div>
  </div>
</template>
<script>
  export default {
    created() {
      this.$api.postCategory.list().then(resp => {
        this.categories = resp.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    data() {
      return {
        categories: []
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";

  .header-container {
    background-color: #FFFFFF;
    height: $header-height;
    padding: $space 0;
    position: relative;

    @media screen and (max-width: 720px) {
      height: $header-height-phone;
      padding: $space;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 99999;
      background: $page-background-color;
    }
  }

  .header-logo {
    width: $header-height;
    height: $header-height;
    position: absolute;

    @media screen and (max-width: 720px) {
      width: $header-height-phone;
      height: $header-height-phone;
    }
  }

  .header-link-group {
    margin-left: $header-height;
    text-align: center;
    line-height: $header-height;
    font-size: $page-font-size-lg;

    a {
      margin: 0 $space-lg;
      color: $page-font-color-lighter;
      position: relative;
      padding-bottom: $space-sm;
    }

    a::after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      position: absolute;
      left: 0;
      bottom: -2px;
      background: $text-color-primary;
      transition: all 0.3s ease-in-out;
      transform: scale3d(0, 1, 1);
      transform-origin: 50% 0;
    }

    a:hover {
      color: $text-color-primary;
    }

    a:hover::after {
      transform: scale3d(1, 1, 1);
    }

    .router-link-active {
      color: $text-color-primary;
      border-bottom: 2px solid $text-color-primary;
    }
  }

  .divider {
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    margin: 0;
    background: $header-divider-background-color;
  }
</style>
