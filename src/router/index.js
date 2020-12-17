import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Rankings from '../views/Rankings.vue'
import Edit from '../views/Edit.vue'
import EditList from '../views/EditList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/rankings',
    name: 'Rankings',
    component: Rankings
  },
  {
    path: '/edit/',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/edit/:id',
    name: 'EditList',
    component: EditList
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
