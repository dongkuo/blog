<template>
  <div class="wrapper">
    <img src="/static/img/avatar.png" alt="" class="avatar">
    <span v-show="isShowPlaceholder" class="placeholder">说些什么吧...</span>
    <div class="input-box" :class="{focus: isFocus}">
      <div class="input" contenteditable="true" ref="inputBox" @focus="onFocus" @blur="onBlur" @input="onInput"></div>
      <!--toolbar-->
      <div class="toolbar" :class="{show: isShowToolbar}">
        <i class="fa fa-smile-o tool-item" onclick="alert('暂不支持')"></i>
        <i class="fa fa-picture-o tool-item" onclick="alert('暂不支持')"></i>
        <div class="text-right button-box">
          <button class="btn btn-text btn-small" @click="onCancel">取消</button>
          <button class="btn btn-primary btn-small">提交</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      showToolbar: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        isFocus: false,
        isShowPlaceholder: true,
        isShowToolbar: this.showToolbar,
        content: ''
      }
    },
    methods: {
      onFocus() {
        this.isShowPlaceholder = false
        this.isFocus = true
        this.isShowToolbar = true
      },
      onBlur() {
        this.isShowPlaceholder = !this.content
        this.isFocus = false
      },
      onInput() {
        this.content = this.$refs['inputBox'].innerHTML
        this.isShowPlaceholder = !this.isFocus && !this.content
      },
      onCancel() {
        this.$emit('cancel')
      },
      // 清空内容
      clear() {
        this.content = ''
        this.isShowPlaceholder = true
        this.$refs['inputBox'].innerHTML = null
      },
      toggleToolbar(isShow) {
        this.isShowToolbar = isShow instanceof Boolean ? isShow : !this.isShowToolbar
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    position: relative;
    padding-left: 64px;
  }

  .avatar {
    width: 48px;
    height: 48px;
    position: absolute;
    left: 0;
    top: 0;
  }

  .placeholder {
    color: #99a4b9;
    position: absolute;
    font-size: 15px;
    top: 2px;
    left: 72px;
    line-height: 46px;
  }

  .input-box {
    border: 1px solid #e4e5e5;
    border-radius: 2px;
  }

  .input-box.focus {
    border-color: #64a9ed;
  }

  .input {
    min-height: 22px;
    padding: 12px 8px;
    color: #3d4c53;
    font-size: 14px;
    outline: none;
    position: relative;
    line-height: 1.6;
    user-modify: read-write-plaintext-only;
    -webkit-user-modify: read-write-plaintext-only;
  }

  .input:focus {
    border-color: #64a9ed;
    border-bottom-color: #e5e6e6;
  }

  .toolbar {
    background-color: #f8f9f9;
    line-height: 44px;
    padding: 0 8px;
    position: relative;
    height: 0;
    overflow: hidden;
    transition: height 0.25s;
  }

  .toolbar.show {
    height: 43px;
    border-top: 1px solid #e6e7e7;
  }

  .tool-item {
    font-size: 22px;
    font-weight: 500;
    color: #6d7789;
    cursor: pointer;
    line-height: 44px;
    margin-right: 8px;
  }

  .tool-item:hover {
    color: #1296db;
  }

  .button-box {
    position: absolute;
    top: 0;
    right: 8px;
  }

  @media screen and (max-width: 720px) {

    .wrapper {
      padding-left: 48px;
    }

    .avatar {
      width: 36px;
      height: 36px;
    }

    .input {
      min-height: 22px;
      padding: 6px 8px;
    }

    .placeholder {
      top: 2px;
      left: 56px;
      font-size: 14px;
      line-height: 36px;
    }

    .toolbar {
      line-height: 36px;
    }

    .tool-item{
      line-height: 36px;
    }

    .toolbar.show {
      height: 35px;
      border-top: 1px solid #e6e7e7;
    }
  }

</style>
