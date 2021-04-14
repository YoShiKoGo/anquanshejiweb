<template>
  <el-container class="home">
    <!-- 头部开始 -->
    <el-header class="header ub main-justify cross-center">
      <div class="header-title">后台用户管理系统</div>
      <div class="ub main-center cross-center header-right">
        <div>
          <el-dropdown placement='bottom-start'>
            <img class="header-img" src="../assets/images/avatar.jpg" alt="用户头像"/>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="header-right-user">
          <div class="header-wollcom">欢迎你，管理员</div>
          <div class="header-time">2021.4.14 12:55:20 星期三</div>
        </div>
      </div>
    </el-header>
    <!-- 头部结束 -->
    <el-container>
      <!-- 左侧菜单开始 -->
      <el-aside width="auto">
        <el-menu
            default-active="1-4-1"
            class="menu-bar"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
              <el-menu-item index="1-4-2">选项2</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!--左侧菜单结束 -->
      <!-- 右侧内容显示区 -->
      <el-container style="background:red">
        <el-main style='background:#FFF;'>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "home",
  components: {}
};
</script>
<style scoped>
.home {
  height: 100%;
}

/*头部CSS样式*/
header {
  background: #42b983;
  color: #fff;
  padding: 0 20px;
}

.header-title {
  font-size: 20px;
}

.header-img {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  cursor: pointer;
}

.header-wollcom {
  font-size: 15px;
  font-weight: 600;
}

.header-time {
  font-size: 14px;
}

.header-right-user {
  margin-left: 10px;
}

.header-right {
  margin-right: 30px;
}
/*左侧菜单CSS样式*/
.el-container /deep/ .el-menu {
  border-right: none !important;
}

.el-menu {
  border-right: none !important;
}

.el-aside {
  border-right: solid 1px #e6e6e6;
}

/* 此样式用于设置 el-aside width="auto" 宽度为auto的样式 */
.menu-bar:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>