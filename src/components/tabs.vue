<template>
  <div>
    <el-tabs :value="editableTabsValue" type="card" closable @tab-remove="removeTab">
      <el-tab-pane
          v-for="item in editableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
      >{{item.content}}</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// import {mapState} from 'vuex'
export default {
  name: "tabs",
  computed:{
// ...mapState({
// //此处报 Computed property "editableTabs" was assigned to but it has no
// //需要把v-model改为 :value即可
// editableTabs: state => state.MenuStore.tabs
// }),
    editableTabs:({
      get(){
        return this.$store.state.MenuStore.tabs
      },
      set(val){
        this.$store.state.MenuStore.tabs = val;
      }
    }),
    editableTabsValue:{
      get(){
        return this.$store.state.MenuStore.editableTabsValue
      },
      set(val){
        this.$store.state.MenuStore.editableTabsValue = val;
      }
    }
  },
  data() {
    return {
//选项卡的name
// editableTabsValue: "2",
// editableTabs: [
// {
// title: "Tab 1",
// name: "1",
// content: "Tab 1 content"
// },
// {
// title: "Tab 2",
// name: "2",
// content: "Tab 2 content"
// }
// ],
      tabIndex: 2
    };
  },
  methods: {
//关闭tabs targetName为关闭选项卡的名称
    removeTab(targetName) {
//首页不能关闭
      if(targetName === 'desktop'){
        return;
      }
      let tabs = this.editableTabs;
//当前激活的选项卡
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
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

