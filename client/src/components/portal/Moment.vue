<template>
  <div class="wrapper">
    <div class="timeline">
      <div class="label-wrapper label-wrapper-title">
        <div class="label-box label-box-title">Sep</div>
      </div>
      <h2 class="content content-title">2017年09月</h2>
    </div>
    <div class="timeline">
      <div class="label-wrapper"><div class="label-box">24</div></div>
      <p class="content">
        抱一抱，就当作从没有在一起。好不好，要解释都已经来不及……因为成长，我们逼不得已要习惯。因为成长，我们忽尔间说散就散——JC，说散就散
      </p>
    </div>
    <div class="timeline">
      <div class="label-wrapper"><div class="label-box">24</div></div>
      <p class="content">
        零点的钟声响起，还有20多个小时的时间和这里说再见。3年前，我曾许下期愿——在我某天转身离开这座城市的刹那，我会想，也许我的颠沛流离是值得的。如今到了还愿的时刻，我不知道这个愿望是否已经实现。4年的大学时光里，我收获了重要的知识与爱的人；但在时间面前，我知道，我们都是失败者。</p>
    </div>
    <div class="timeline">
      <div class="label-wrapper label-wrapper-end"><div class="label-box label-box-end">End</div></div>
      <h2 class="content content-title"></h2>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        moments: []
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    position: relative;
    margin: 16px 0;
  }

  .wrapper:before {
    content: "";
    display: block;
    width: 2px;
    height: 100%;
    background: #3b90c8;
    position: absolute;
    top: 0;
    left: 23px;
    z-index: 1;
  }

  .timeline {
    position: relative;
    margin-bottom: 48px;
  }

  .label-wrapper {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 2px solid #1296db;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    background: #fbfcfc;
    border-radius: 50%;
    padding: 2px;
  }

  .label-box {
    width: 100%;
    font-weight: bold;
    color: #1296db;
    font-size: 20px;
    line-height: 40px;
  }

  .label-wrapper-title{
    border-radius: 0;
  }

  .label-box-title{
    font-size: 14px;
    color: white;
    background: #1296db;
  }

  .label-box-end{
    color: #ffffff;
    font-size: 14px;
  }

  .content-title {
    margin: 0;
    line-height: 52px;
    font-size: 24px;
  }

  .label-wrapper-end {
    font-weight: bold;
    color: white;
    font-size: 16px;
    background: #1296db;
    border-radius: 0;
  }

  .label-wrapper-end a {
    color: white;
  }

  .label-wrapper-end a:hover {
    color: #5a5239;
  }

  .content {
    margin-left: 80px;
    min-height: 48px;
  }

  @media screen and (max-width: 720px) {

    .timeline {
      margin-bottom: 32px;
    }

    .wrapper:before {
      left: 20px;
      z-index: 1;
    }

    .label-wrapper{
      width: 36px;
      height: 36px;
    }

    .label-box{
      font-size: 14px;
      line-height: 36px;
    }

    .content {
      margin-left: 56px;
      min-height: 40px;
    }

    .content-title {
      line-height: 40px;
      font-size: 20px;
    }

  }
</style>
