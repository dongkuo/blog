<template>
  <div>
    <h3 class="title">评论
      <small class="caption">/ 32</small>
    </h3>
    <!--评论框-->
    <app-comment-input ref="commentInput" :showToolbar="false" @cancel="onCancelCommentInput"></app-comment-input>
    <app-comment-item :comments="comments"></app-comment-item>
  </div>
</template>

<script>
  import AppCommentInput from './CommentInput'
  import AppCommentItem from './CommentItem'

  export default {
    name: 'comment',
    components: {AppCommentInput, AppCommentItem},
    props: ['comments'],
    data() {
      return {}
    },
    methods: {
      onCancelCommentInput() {
        this.$refs['commentInput'].clear()
        this.$refs['commentInput'].toggleToolbar(false)
      }
    }
  }
</script>

<style scoped>
  .title {
    border-bottom: 1px solid #dfe9eb;
    line-height: 2;
    margin: 32px 0;
  }

  .title .caption {
    color: #99a4b9;
    font-weight: normal;
    margin-left: 4px;
    font-size: 14px;
  }
</style>
