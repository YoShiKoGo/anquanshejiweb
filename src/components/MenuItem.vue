<template>
  <div>
    <template v-for="menu in menuList">
      <el-submenu v-if='menu.children.length > 0 ' :index="menu.path"
                  :key='menu.path'>
        <template slot="title">
          <i :class="menu.icon"></i>
          <span style=" font-size: 15px;font-weight: 600;" slot="title">{{menu.label}}
</span>
        </template>
        <menu-item :menuList='menu.children' />
        <!-- <el-submenu index="1-4">
        <span slot="title">选项4</span>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu> -->
      </el-submenu>
      <el-menu-item @click="selectMenu(menu)" v-else :index="menu.path"
                    :key='menu.path'>
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.label}}</span>
      </el-menu-item>
    </template>
  </div>
</template>
<script>
import MenuItem from './MenuItem.vue'
export default {
  name:'MenuItem',
  props: ["menuList"],
  components:{
    MenuItem
  },
  created(){
    console.log('555555')
    console.log(this.menuList)
  },
  methods:{
//菜单点击事件
    selectMenu(item){
// 1.把点击的菜单设置到tabs
      this.$store.commit('selectMenu',item);
// 2.跳转到路由
// this.$router.push({
// name:item.name
// })
    }
  }
};
</script>
<style lang="scss" scoped>
</style>