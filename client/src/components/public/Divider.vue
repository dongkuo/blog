<template>
  <p class="divider">
    <strong class="tip"><slot></slot></strong>
  </p>
</template>

<script>

</script>

<style scoped>
  .divider {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    white-space: nowrap;
    height: auto;
    margin: 16px 0;
    font-size: 14px;
    color: #37474f;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: .05em;
    line-height: 1;
  }

  .divider:before, .divider:after {
    content: "";
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 50%;
    background-color: #e9f3f5;
    height: 1px;
    margin-top: .5em;
  }

  .tip{
    padding: 0 16px;
  }

  @media screen and (max-width: 720px) {
    .divider {
      margin: 32px 0;
    }
  }
</style>
