<template>
  <div
    :class="[
        'toast',
        type ? `toast-${ type }` : ''
      ]"
    v-show="visible"
    @mouseenter="clearTimer"
    @mouseleave="startTimer"
    role="alert">
    <button v-if="showClose" class="btn btn-clear float-right" @click="close"></button>
    <slot>
      <p>{{ toast }}</p>
    </slot>
  </div>
</template>

<script type="text/babel">
  export default {
    data() {
      return {
        visible: false,
        toast: '',
        duration: 3000,
        type: 'primary',
        onClose: null,
        showClose: false,
        closed: false,
        timer: null,
      };
    },
    watch: {
      closed(newVal) {
        if (newVal) {
          this.visible = false;
        }
      }
    },
    methods: {
      destroyElement() {
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      },
      close() {
        this.closed = true;
        if (typeof this.onClose === 'function') {
          this.onClose(this);
        }
      },
      clearTimer() {
        clearTimeout(this.timer);
      },
      startTimer() {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            if (!this.closed) {
              this.close();
            }
          }, this.duration);
        }
      },
      keydown(e) {
        if (e.keyCode === 27) { // esc关闭消息
          if (!this.closed) {
            this.close();
          }
        }
      }
    },
    mounted() {
      this.startTimer();
      document.addEventListener('keydown', this.keydown);
    },
    beforeDestroy() {
      document.removeEventListener('keydown', this.keydown);
    }
  };
</script>
