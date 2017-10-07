<template>
  <span class="emoji-wrapper-0DD544A7FF8BD307"><slot></slot></span>
</template>

<script>
  import twemoji from 'twemoji'

  export default {
    mounted() {
      twemoji.parse(this.$el)
    }
  }

</script>

<style>
  .emoji-wrapper-0DD544A7FF8BD307 img.emoji {
    height: 1em;
    width: 1em;
    vertical-align: -0.1em;
  }
</style>
