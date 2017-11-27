<template>
  <span class="emoji-wrapper-0DD544A7FF8BD307" :style="{display: 'inline-block', width: size + 'em'}"><slot></slot></span>
</template>

<script>
  import twemoji from 'twemoji'

  export default {
    props: {
      size: {
        type: Number,
        default: 1
      }
    },
    mounted() {
      twemoji.parse(this.$el)
    }
  }

</script>

<style>
  .emoji-wrapper-0DD544A7FF8BD307 img.emoji {
    width: 100%;
    height: 100%;
    vertical-align: -0.1em;
  }
</style>
