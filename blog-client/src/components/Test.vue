<template>
  <ul>
    <li v-for="item in list"
        :class="{selected: item.selected}"
        @click="onSelected(item)">
      {{item.name}}
    </li>
  </ul>
</template>

<script>
  export default {
    name: "test",
    data() {
      return {
        list: [
          {name: 'zhangsan', selected: true},
          {name: 'lisi', selected: false},
          {name: 'wangwu', selected: false},
        ]
      }
    },
    methods: {
      onSelected(item) {
        console.log(item.name)
        for(let item of this.list){
          item.selected = false
        }
        item.selected = true
      }
    }
  }
</script>

<style scoped>
  li {
    padding: 8px 16px;
    margin: 16px;
    display: inline-block;
    background: #ebeefa;
  }

  .selected {
    color: red;
  }
</style>
