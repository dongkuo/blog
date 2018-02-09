import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api'
import date from './date'
import ElementUI from 'element-ui'
import dragging from './directives/dragging'
import './prototype'
import './assets/scss/index.scss'
import './components/editormd/editormd.css'

Vue.config.productionTip = false
Vue.prototype.$api = api

Vue.use(ElementUI)
Vue.use(dragging)
// 自定义过滤器
Vue.filter('date', date)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})

// 请求目录，并缓存
api.postCategory.list().then(resp => {
  let routes = []
  resp.data.data.forEach((category, index) => {
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

