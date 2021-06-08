<template>
  <div>
    <template v-for="menu in menuList">
      <el-submenu v-if="menu.children.length>0" :index="menu.path" :key="menu.path">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title">{{ menu.label }}</span>
        </template>
        <menu-item-test :menuList="menu.children"></menu-item-test>
      </el-submenu>
      <el-menu-item v-else @click="selectMenu(menu) " :index="menu.path" :key="menu.path">
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.label }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
import MenuItemTest from "@/components/MenuItem";
export default {
  name: "MenuItemTest",
  props: ['menuList'],
  components: {
    MenuItemTest
  },
  methods:{
    // eslint-disable-next-line no-unused-vars
    selectMenu(item) {
      //console.log("点击了左侧菜单")
      //设置选项卡
      this.$store.commit('selectMenu', item);
      //设置路由
      //console.log(item.name)
      this.$router.push({name:item.name})
      //console.log("左侧跳转路由")
    }
  }
}
</script>

<style scoped>

</style>