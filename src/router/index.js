import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

/*路由数据*/
const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/desktop',
        name: 'desktop',
        component:()=> import('../views/Desktop')
      }
     /* {
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
      },*/
    ]
  },

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
