import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import JSEncrypt from 'jsencrypt';//引入模块
import crypto from "crypto";
Vue.prototype.$crypto = crypto;
Vue.prototype.$jsEncrypt = JSEncrypt;//配置全局变量

//element引入
import ElementUI from 'element-ui'
//element样式
import 'element-ui/lib/theme-chalk/index.css'
//引入弹性盒子布局样式
import './assets/css/flex.css'
import axios from 'axios';
Vue.prototype.$http = axios;
Vue.use(ElementUI)
Vue.config.productionTip = false;
//axios拦截器，发送请求之前操作
axios.interceptors.request.use(config=>{
    if(config.url.indexOf("/api/user/login") !== -1){
        //以multipart/form-data形式提交
        config.headers['Content-Type'] = 'multipart/form-data'
    }else{
        //以json形式提交
        config.headers['Content-Type'] = 'application/json'
    }

    return config;
})


//每次刷新执行的方法
router.beforeEach((to, from, next) => {
//to 即将进入的路由
//from 即将离开的路由
//设置tabs数据
//     store.commit('getTabs');
//设置激活选项卡
//     store.commit('setActiveTabs', to.name);
    //解决页面刷新之后菜单不存在问题
    // eslint-disable-next-line no-empty,no-unused-vars
    let userId = sessionStorage.getItem("userId");
    if (to.path === '/' || to.path === '/register') {
        if (userId) {
            next({path: '/homeView'});
        } else {
            next();
        }
    } else {
        //未登录跳转到登录界面
        if (!userId && to.name !== 'login') {
            next({path: '/'});
        } else {
            // //若菜单数据不存在，则存入
            // if (store.state.MenuStore.menu_data.length === 0) {
            //     store.commit('getMenuList', router);
            //     next({path: to.path});
            // } else {
            //     next(); //继续往下执行
            // }
          next();
        }
    }

});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
