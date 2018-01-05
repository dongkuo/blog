import Vue from 'vue'
import Router from 'vue-router'
import PostList from './components/PostList'
import Archive from './components/Archive'
import About from './components/About'
import PostDetail from './components/PostDetail'
import Writer from './components/Writer'
import Test from './components/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/post_categories/:category_id/posts',
      component: PostList,
    },
    {
      path: '/archives',
      component: Archive
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/posts/:id',
      component: PostDetail
    },
    {
      path: '/writer',
      component: Writer
    },
    {
      path: '/test',
      component: Test
    }
  ]
})
