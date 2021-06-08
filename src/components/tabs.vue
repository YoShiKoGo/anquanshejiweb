<template>
  <div>
    <el-tabs :value="editableTabsValue" type="card"   @tab-click="tabClick" >
      <el-tab-pane
          v-for="item in editableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
      >{{ item.content }}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {mapState} from 'vuex'
// eslint-disable-next-line no-unused-vars
import store from "@/store";

export default {
  name: "tabs",
  computed: {
    //   ...mapState({
    //       //tabs选项卡数据
    //       editableTabs: state => state.MenuStore.tabs,
    //       //当前激活的选项卡
    //     //   editableTabsValue: state => state.MenuStore.editableTabsValue
    //   }),
    //当前激活的选项卡
    editableTabsValue: {
      get() {
        return this.$store.state.MenuStore.editableTabsValue;
      },
      set(val) {
        this.$store.state.MenuStore.editableTabsValue = val;
      }
    },
    //tabs选项卡数据
    editableTabs: {
      get() {
        return this.$store.state.MenuStore.tabs;
      },
      set(val) {
        this.$store.state.MenuStore.tabs = val;
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    addTab(targetName) {
      let newTabName = ++this.tabIndex + '';
      this.editableTabs.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content'
      });
      this.editableTabsValue = newTabName;
    },

    //点击tab事件
    tabClick(tab) {
      console.log(tab);
      //组装tabs数据
      let obj = {};
      if (tab.name === "desktop") {
        obj.title = "用户信息";
      } else {
        obj.title = tab.label;
      }
      obj.name = tab.name;
      //设置tabs数据
      this.$store.commit("selectMenu", obj);
      //显示路由
      this.$router.push({ name: tab.name });
    },
    //关闭tab方法
    removeTab(targetName) {
      // if (targetName === 'desktop') {
      //   return;
      // }
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      //当前激活的选项卡
      this.editableTabsValue = activeName;
      //路由跳到当前激活的选项卡
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      //存储当前打开的选项卡
      sessionStorage.setItem('tabsList',JSON.stringify(this.editableTabs));
      //设置激活选项卡
      this.$store.commit('setActiveTabs',this.editableTabsValue);
      //显示路由
      this.$router.push({ name: this.editableTabsValue });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

