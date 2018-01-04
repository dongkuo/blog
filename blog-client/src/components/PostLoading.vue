<template>
  <div class="text-left">
    <h2 class="title"></h2>
    <div class="content">
      <p class="paragraph loading-25"></p>
      <p class="paragraph loading-50"></p>
      <p class="paragraph loading-75"></p>
      <p class="paragraph loading-100"></p>
      <span class="cover"></span>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";

  .title {
    height: 25px;
    background: #E5E9F2;
  }
  .content {
    padding-right: 144px;
    position: relative;
  }
  .paragraph {
    height: 14px;
    background: #E5E9F2;
    margin-bottom: 12px;
  }
  .cover {
    width: 128px;
    height: 96px;
    position: absolute;
    top: 0;
    right: 0;
    background: #E5E9F2;
  }
  .loading-25{
    animation:loading-25 1.5s infinite ease;
  }
  .loading-50{
    animation:loading-50 1s infinite ease;
  }
  .loading-75{
    animation:loading-75 1s infinite linear;
  }
  .loading-100{
    animation:loading-100 1s infinite ease;
  }
  @keyframes loading-25 {
    0% {
      width: 25%;
    }
    50%{
      width: 100%;
    }
    100%{
      width: 25%;
    }
  }
  @keyframes loading-50 {
    0% {
      width: 50%;
    }
    50%{
      width: 100%;
    }
    100%{
      width: 50%;
    }
  }
  @keyframes loading-75 {
    0% {
      width: 75%;
    }
    25%{
      width: 100%;
    }
    75%{
      width: 50%;
    }
    100%{
      width: 75%;
    }
  }
  @keyframes loading-100 {
    0% {
      width: 100%;
    }
    50%{
      width: 50%;
    }
    100%{
      width: 100%;
    }
  }
  @media screen and (max-width: 720px) {
    .content {
      padding-right: 104px;
      height: 80px;
      overflow: hidden;
    }
    .cover {
      width: 96px;
      height: 80px;
    }
  }
</style>
