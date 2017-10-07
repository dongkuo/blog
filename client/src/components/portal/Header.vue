<template>
  <div class="container">
    <div class="wrapper">
      <img src="../../assets/img/logo.jpg" alt="logo" class="logo">
      <div class="nav-box">
        <router-link to="/writing">写 作</router-link>
        <router-link to="/programing">编 程</router-link>
        <router-link to="/archives">归 档</router-link>
        <router-link to="/moments">片 刻</router-link>
        <router-link to="/about">关 于</router-link>
      </div>
    </div>
    <hr class="divider">
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style scoped>
  .container {
    background-color: #ffffff;
    padding: 8px 0;
  }

  .wrapper {
    width: 660px;
    margin: 0 auto;
    position: relative;
    text-align: center;
  }

  .divider {
    width: 100%;
    height: 0;
    position: absolute;
    bottom: 0;
    border: none;
    border-bottom: 1px solid #f0f0f0;
    margin: 0;
  }

  .logo {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 0;
  }

  .nav-box {
    line-height: 40px;
    padding-left: 40px;
  }

  .nav-box a {
    color: #838ea3;
    text-decoration: none;
    margin: 0 16px;
    position: relative;
    padding-bottom: 8px;
  }

  .nav-box a::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    position: absolute;
    left: 0;
    bottom: -2px;
    background: #1296db;
    transition: all 0.3s ease-in-out;
    transform: scale3d(0, 1, 1);
    transform-origin: 50% 0;
  }

  .nav-box a:hover {
    color: #1296db;
  }

  .nav-box a:hover::after {
    transform: scale3d(1, 1, 1);
  }

  .nav-box .router-link-active {
    color: #1296db;
    border-bottom: 2px solid #1296db;
  }

  @media screen and (max-width: 720px) {

    .wrapper {
      margin: 0;
      text-align: left;
      padding: 0 16px;
    }

    .logo {
      width: 36px;
      height: 36px;
      position: absolute;
      left: 16px;
    }

    .nav-box {
      line-height: 36px;
      padding-left: 44px;
    }

    .nav-box a {
      margin: 0 8px;
      padding: 0;
    }
  }
</style>
