import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default {
    //status相当于一个内存，存储数据的，但是不能直接操作status里面的数据
    //需要mutation来操作
    state: {
        //当前激活的选项卡
        editableTabsValue: 'desktop',
        //tabs数据
        tabs: [
            {
                title: '用户个人信息',
                name: 'desktop'
            }
        ],
        menu_data: [

        ]
    },
    mutations: {
        //菜单点击时调用
        selectMenu(state, val) {
            //console.log(val);
            //1.把点击的菜单加到tabs里面,如果不存在才添加
            let res = state.tabs.findIndex(item => item.name === val.name)
            if (res === -1) {
                let obj = {}
                obj.title = val.label
                obj.name = val.name
                state.tabs =[]
                state.tabs.push(obj)
            }
            //当前激活的选项卡
            state.editableTabsValue = val.name;
            //解决浏览器刷新tabs不存在的问题
            sessionStorage.setItem('tabsList', JSON.stringify(state.tabs));
        },
        getTabs(state) {
            let tabs = sessionStorage.getItem('tabsList');
            if (tabs) {
                state.tabs = JSON.parse(tabs);
            }
        },
        //用于设置当前激活的选项卡
        setActiveTabs(state, val) {
            state.editableTabsValue = val;
            //console.log(this.state.editableTabsValue)
        },
        //获取菜单数据和生成路由
        getMenuList(state, router) {
            if (sessionStorage.getItem('menuList').length===0||sessionStorage.getItem('menuList').length===null||sessionStorage.getItem('routerList').length===0){
                sessionStorage.clear();
                window.location.href('/');
            }else {
                //当前存在的路由
                let newRoutes = router.options.routes;
                //从sessionStorage获取menuList数据
                let menuList = JSON.parse(sessionStorage.getItem('menuList'));
                //console.log('json')
                //把后端返回的数据设置到state中的menu_data中
                state.menu_data = menuList;
                let routerList = JSON.parse(sessionStorage.getItem('routerList'));
                routerList.forEach(item => {
                    //生成 component: () => import('@/views/Login.vue')
                    //item.component = () => import(`@/views${item.url}.vue`);
                    item.component = () => import('../views' + item.url)
                    //console.log("getMenu的路径"+'../views'+item.url)
                    //newRoutes[1] 表示获取到home路由,把后台返回的路由添加到该路由的子路由
                    newRoutes[1].children.push(item);
                });
                router.addRoutes(newRoutes);
            }


        }
    },
    actions: {}
}
