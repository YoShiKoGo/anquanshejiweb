<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu>
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <router-link :to="{name: 'desktop'}" tag="span" >用户管理</router-link>
<!--          <span slot="title">用户管理</span>-->
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">用户列表</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-menu"></i>
          <span slot="title">常旅客管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown @command="logout">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{nick_name}}</span>
      </el-header>

      <el-main>
<!--        <el-table :data="tableData">-->
<!--          <el-table-column prop="date" label="日期" width="140">-->
<!--          </el-table-column>-->
<!--          <el-table-column prop="name" label="姓名" width="120">-->
<!--          </el-table-column>-->
<!--          <el-table-column prop="address" label="地址">-->
<!--          </el-table-column>-->
<!--        </el-table>-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "HomeView",

  created() {
    // let role = sessionStorage.getItem("role")
    // let user = sessionStorage.getItem("user")
    // console.log(role)
    // console.log(user)
  },
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    let nick_name = sessionStorage.getItem("userName")
    let role = sessionStorage.getItem("role")
    console.log(nick_name)
    console.log(role)
    return {
      nick_name : nick_name,
      tableData: Array(20).fill(item)
    }
  },
  methods:{
    //退出登录
    async logout() {
      console.log('退出登录')
      let {data: res} = await this.$http.post("/api/user/logout");
      console.log(res);
      if (res.resCode ==="1") {
        sessionStorage.clear();
        window.location.href = "/";
      }
    },
  }

}
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
