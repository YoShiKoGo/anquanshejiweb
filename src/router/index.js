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
      },
      {
        path: "/404",
        name: "notFound",
        component: () => import("../components/notFound")
      },
    ]
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
