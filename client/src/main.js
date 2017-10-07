// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/css/app.css'

Vue.config.productionTip = false

// 自定义过滤器
import format from './utils/date'
Vue.filter('date', format)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
