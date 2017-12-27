<template>
  <div>
    <app-primary-nav></app-primary-nav>
    <div class="main-wrapper" v-html="content.html">
    </div>
  </div>
</template>

<script>
  import AppPrimaryNav from "./PrimaryNav.vue";

  export default {
    components: {
      AppPrimaryNav
    },
    data() {
      return {
        content: ''
      }
    },
    created(){
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

  .main-wrapper{
    margin-left: auto;
    margin-right: auto;
    max-width: $page-width;
  }
</style>
