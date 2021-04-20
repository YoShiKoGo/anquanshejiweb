<template>
  <el-container class="home">
    <!-- 头部开始 -->
    <el-header class="header ub main-justify cross-center">
      <div class="header-title">后台用户管理系统</div>
      <div class="ub main-center cross-center header-right">

        <el-dropdown placement='bottom-start'>
          <img class="user-img" src="../assets/images/avatar.jpg" alt="用户头像"/>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <div class="header-right-user">
          <div class="header-welcome">欢迎你，{{ userName }}</div>
          <div class="header-time">{{ nowTime }}</div>

        </div>
      </div>
    </el-header>
    <!-- 头部结束 -->
    <!--侧边栏-->
    <el-container>
      <el-aside width="auto">
        <menu-bar></menu-bar>
      </el-aside>
      <!--选项卡，主界面      -->
      <el-container>
        <el-main style='padding: 0'>
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
import MenuBar from "@/components/MenuBar";
// eslint-disable-next-line no-unused-vars
import tabs from "@/components/tabs";

export default {
  name: "home",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    MenuBar,
    // eslint-disable-next-line vue/no-unused-components
    tabs,

  },
  data() {
    return {
      nowTime: '',
      userName: sessionStorage.getItem("userName")
    }
  },
  methods: {
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear()
      let month = new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1
      let date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate()
      let hh = new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours()
      let mm = new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes()
      let ss = new Date(timeStamp).getSeconds() < 10 ? '0' + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds()
      let week = new Date(timeStamp).getDay()
      let weeks = ['日', '一', '二', '三', '四', '五', '六']
      let getWeek = '星期' + weeks[week]
      this.nowTime = year + '年' + month + '月' + date + '日' + ' ' + hh + ':' + mm + ':' + ss + getWeek
    }, // 实时刷新当前时间，格式化
    nowTimes() {
      this.timeFormate(new Date())
      setInterval(this.nowTimes, 1000)
      this.clear()
    },
    clear() {
      clearInterval(this.nowTimes)
      this.nowTimes = null
    },
    //退出登录
    async logout() {

      let {data: res} = await this.$http.post("/api/user/loginOut");
      console.log(res);
      if (res.code === 200) {
        sessionStorage.clear();
        window.location.href = "/";
      }
    },
  },
  mounted() {
    this.nowTimes()
  },
  beforeDestroy() {
    this.clear()
  },

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
.el-container /deep/
.el-menu {
  border-right: none !important;
}

.user-img {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  cursor: pointer;
}


</style>
