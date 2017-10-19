// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from './utils/http'
import './assets/css/app.css'
import date from './utils/date'

Vue.config.productionTip = false

// 自定义过滤器
Vue.filter('date', date)
Vue.prototype.$http = http;

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
