<template>
  <div class="loading text-left">
    <h2 class="title"></h2>
    <div class="content">
      <p class="paragraph paragraph-first loading-25"></p>
      <p class="paragraph loading-50"></p>
      <p class="paragraph loading-75"></p>
      <p class="paragraph loading-100"></p>
      <span class="cover"></span>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
  .loading .title {
    height: 25px;
    background: #e8edf5;
  }

  .loading .content {
    padding-right: 160px;
    position: relative;
  }

  .loading .paragraph {
    height: 16px;
    background: #e8edf5;
  }

  .loading .paragraph-first{
    margin-top: 0;
  }

  .loading .cover {
    width: 144px;
    height: 112px;
    position: absolute;
    top: 0;
    right: 0;
    background: #e8edf5;
  }

  .loading .loading-25{
    animation:loading-25 1.5s infinite ease;
  }

  .loading .loading-50{
    animation:loading-50 1s infinite ease;
  }

  .loading .loading-75{
    animation:loading-75 1s infinite linear;
  }

  .loading .loading-100{
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

    .loading .content {
      padding-right: 104px;
      height: 80px;
      overflow: hidden;
    }

    .loading .cover {
      width: 96px;
      height: 80px;
    }
  }
</style>
