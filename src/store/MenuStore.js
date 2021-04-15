import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default {
    //status相当于一个内存，存储数据的，但是不能直接操作status里面的数据
    //需要mutation来操作
    state: {
        //当前激活的选项卡
        editableTabsValue:'desktop',
        //tabs数据
        tabs: [
            {
                title: '首页',
                name: 'desktop'
            }
        ]
    },
    mutations: {
        //菜单点击时调用
        selectMenu(state,val){
            console.log(val);
            //1.把点击的菜单加到tabs里面,如果不存在才添加
            let res = state.tabs.findIndex(item => item.name === val.name)
            if(res === -1){
                let obj = {}
                obj.title = val.label
                obj.name = val.name
                state.tabs.push(obj)
            }
            //当前激活的选项卡
            state.editableTabsValue = val.name;
            //解决浏览器刷新tabs不存在的问题
            sessionStorage.setItem('tabsList',JSON.stringify(state.tabs));
        },
        getTabs(state){
            let tabs = sessionStorage.getItem('tabsList');
            if(tabs){
                state.tabs = JSON.parse(tabs);
            }
        },
        //用于设置当前激活的选项卡
         setActiveTabs(state,val){
               state.editableTabsValue = val;
               console.log(this.state.editableTabsValue)
           }
        //刷新浏览器，进入路由时调用，获取tabs数据
        /*getTabs(state){
            let tabs = sessionStorage.getItem('tabsList');
            if(tabs){
                let currentTabsList = JSON.parse(tabs);
                state.tabs = currentTabsList;
            }
        },*/
        //用于设置当前激活的选项卡
     /*   setActiveTabs(state,curent){
            state.editableTabsValue = curent;
        }*/
    },
    actions: {
    }
}