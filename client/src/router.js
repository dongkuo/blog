import Vue from 'vue'
import Router from 'vue-router'

import PortalFrame from './components/portal/Frame.vue'
import PortalWriting from './components/portal/Writing.vue'
import PortalPrograming from './components/portal/Programing.vue'
import PortalArchive from './components/portal/Archive.vue'
import PortalMoment from './components/portal/Moment.vue'
import PortalAbout from './components/portal/About.vue'
import PortalPost from './components/portal/Post.vue'

import ManagementFrame from './components/management/Frame.vue'
import ManagementHome from './components/management/Home.vue'
import ManagementWrite from './components/management/Write.vue'

import NotFound from './components/public/NotFound.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: PortalFrame,
      children: [
        { path: '', alias: ['index', 'index.html'], redirect: 'writing' },
        { path: '/writing', component: PortalWriting },
        { path: '/programing', component: PortalPrograming },
        { path: '/archives', component: PortalArchive },
        { path: '/moments', component: PortalMoment },
        { path: '/about', component: PortalAbout },
        { path: '/posts/:id', component: PortalPost },
      ]
    },
    {
      path: '/management',
      component: ManagementFrame,
      children: [
        { path: '', alias: 'home', component: ManagementHome },
        { path: 'write', component: ManagementWrite }
      ]
    },
    {
      path: '*', component: NotFound
    }
  ],
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    console.log("scrollBehavior")
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
