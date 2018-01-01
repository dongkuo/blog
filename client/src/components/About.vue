<template>
  <div>
    <app-header></app-header>
    <div class="main-wrapper" v-html="content.html"></div>
  </div>
</template>

<script>
  import AppHeader from "./Header.vue";

  export default {
    components: {
      AppHeader
    },
    data() {
      return {
        content: ''
      }
    },
    created() {
      this.getAbout();
    },
    methods: {
      getAbout() {
        this.$api.about.get().then(resp => {
          this.content = resp.data.data
        }).catch(e => {
          console.log(e)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";
</style>
