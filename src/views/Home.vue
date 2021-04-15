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
    <!--侧边栏-->
    <el-container>
    <el-aside width="auto">
    <menu-bar-test></menu-bar-test>
    </el-aside>
<!--选项卡，主界面      -->
    <el-container>
      <el-main  style='padding: 0'>
        <tabs></tabs>
        <router-view></router-view>
      </el-main>
      <!--      <el-footer>Footer</el-footer>-->
    </el-container>
    </el-container>
  </el-container>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import MenuBarTest from "@/components/MenuBar";
// eslint-disable-next-line no-unused-vars
import tabs from "@/components/tabs";
export default {
  name: "home",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    MenuBarTest,
    // eslint-disable-next-line vue/no-unused-components
    tabs
  }
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


</style>