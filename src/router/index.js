import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/desktop',
        name: 'desktop',
        component:()=> import('../views/Desktop')
      },
      {
        path: '/companyList',
        name: 'CompanyList',
        component: ()=>import('../views/system/company/CompanyList')
      },
      {
        path: '/operatorList',
        name: 'OperatorList',
        component: ()=>import('../views/system/operator/OperatorList')
      },
      {
        path: '/loginCount',
        name: 'LoginCount',
        component: ()=>import('../views/user/LoginCount')
      },
      {
        path: '/logList',
        name: 'LogList',
        component: ()=>import('../views/log/LogList')
      },
    ]


  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },{
    path: '/test',
    name: 'Test',
    component: () => import('../views/test')
  },{
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  }
]
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
