import Vue from 'vue'
import Router from 'vue-router'

import PortalFrame from './components/portal/Frame'
import PortalWriting from './components/portal/Writing'
import PortalPrograming from './components/portal/Programing'
import PortalArchive from './components/portal/Archive'
import PortalMoment from './components/portal/Moment'
import PortalAbout from './components/portal/About'
import PortalPost from './components/portal/Post'

import ManagementFrame from './components/management/Frame'
import ManagementHome from './components/management/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: PortalFrame,
      children: [
        { path: '/', redirect: 'writing' },
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
        { path: '', alias: 'home', component: ManagementHome }
      ]
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
