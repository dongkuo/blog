<!--
    点赞组件
-->
<template>

  <button :class="{'thumbs-up': true, 'clicked': state}" @click="toggle">
    <i class="fa" :class="{'fa-thumbs-o-up': !state, 'fa-thumbs-up': state}"></i>
    喜欢　|　<span class="placeholder-number">{{value}}</span>
    <transition :name="state ? 'plus' : 'minus'" mode="out-in">
      <span :key="state" class="number">{{value}}</span>
    </transition>
  </button>
</template>

<script>
  export default {
    props: {
      number: {
        type: Number,
        default: 0
      },
      isClicked: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        state: this.isClicked,
        value: this.number
      }
    },
    methods: {
      toggle() {
        this.state = !this.state
        this.value += this.state ? 1 : -1;
      }
    }
  }
</script>

<style scoped>

  .thumbs-up {
    background: transparent;
    border: 1px solid #1296db;
    padding: 6px 8px;
    color: #1296db;
    border-radius: 2px;
    cursor: pointer;
    outline: none;
    transition: color, background-color 0.2s ease;
    position: relative;
    font-size: 15px;
    height: 36px;
  }

  .thumbs-up:hover {
    background: #F0F8FF;
  }

  .thumbs-up.clicked {
    background: #1296db;
    color: #ffffff;
  }

  .thumbs-up.clicked:hover {

  }

  .placeholder-number {
    visibility: hidden;
  }

  .number {
    position: absolute;
    right: 8px;
    top: 0;
    line-height: 36px;
  }

  .minus-enter-active, .minus-leave-active {
    transition: all 0.1s ease;
  }

  .minus-enter {
    transform: translateY(-16px);
    opacity: 0.3;
  }

  .minus-leave-to {
    transform: translateY(16px);
    opacity: 0.3;
  }

  .plus-enter-active, .plus-leave-active {
    transition: all 0.1s ease;
  }

  .plus-enter {
    transform: translateY(16px);
    opacity: 0.3;
  }

  .plus-leave-to {
    transform: translateY(-16px);
    opacity: 0.3;
  }

</style>
