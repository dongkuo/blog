// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/scss/global.scss'
import api from './api'
import date from './date'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$categories = []

// 自定义过滤器
Vue.filter('date', date)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})

// 请求目录，并缓存
api.category.list().then(resp => {
  let routes = []
  resp.data.data.forEach((category, index) => {
    Vue.prototype.$categories.push(category)
    routes.push({path: `/post_categories/${category.id}/posts`, alias: category.url})
    if (index === 0) {
      routes.push({path: `/`, redirect: category.url})
    }
  })
  // 添加路由
  router.addRoutes(routes)
}).catch(e => {
  console.error(e)
})

