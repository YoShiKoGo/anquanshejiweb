<template>
  <div>
    <template v-for="menu in menuList">
      <el-submenu v-if="menu.children.length>0" :index="menu.path" :key="menu.path">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title">{{ menu.label }}</span>
        </template>
        <menu-item-test :menuList="menu.children"></menu-item-test>
        <!--     <el-submenu index="1-4">
               <span slot="title">选项4</span>
               <el-menu-item index="1-4-1">选项1</el-menu-item>
               <el-menu-item index="1-4-2">选项2</el-menu-item>
             </el-submenu>-->
      </el-submenu>
      <el-menu-item v-else @click="selectMenu(menu) " :index="menu.path" :key="menu.path">
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.label }}</span>
      </el-menu-item>
    </template>


  </div>
</template>

<script>
import MenuItemTest from "@/components/MenuItemTest";
export default {
  name: "MenuItemTest",
  props: ['menuList'],
  components: {
    MenuItemTest
  },
  methods:{
    // eslint-disable-next-line no-unused-vars
    selectMenu(item) {
      //设置选项卡
      this.$store.commit('selectMenu', item);
      //设置路由
      this.$router.push({name:item.name})
    }
  }
}
</script>

<style scoped>

</style>