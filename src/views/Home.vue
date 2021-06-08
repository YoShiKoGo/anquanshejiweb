<template>
  <el-container class="home">
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        width="40%"
    >
      <el-form :model="tableData" :rules="rules" ref="tableData" label-width="100px" >
        <el-form-item label="账户" prop="account">
          <el-input v-model="tableData.account" :disabled="true"></el-input>
        </el-form-item>
        <!--<el-form-item label="密码" prop="password">
          <el-input v-model="tableData.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="tableData.confirmPassword" show-password></el-input>
        </el-form-item>-->
        <el-form-item label="昵称" prop="nick_name">
          <el-input v-model="tableData.nick_name"></el-input>
        </el-form-item>
        <el-form-item label="工号" prop="employee_no">
          <el-input v-model="tableData.employee_no"></el-input>
        </el-form-item>
        <el-form-item label="用户级别" prop="role"  :disabled="true">
          <el-input v-model="tableData.role"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="所在平台" prop="companyName" >
          <el-input v-model="tableData.companyName"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="tableData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobilePhone">
          <el-input v-model="tableData.mobilePhone"></el-input>
        </el-form-item>

        <el-form-item >
          <el-button type="primary" icon="el-icon-edit" @click="resetForm()">更新个人信息</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
    <!-- 头部开始 -->
    <el-header class="header ub main-justify cross-center">
      <div class="header-title">用户管理系统</div>
      <div class="ub main-center cross-center header-right">

        <el-dropdown placement='bottom-start'>
          <img class="user-img" src="../assets/images/admin.jpg" alt="用户头像"/>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item @click.native="userDetail">用户信息</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <div class="header-right-user">
          <div class="header-welcome">{{ userName }}</div>
          <!--<div class="header-time">{{ nowTime }}</div>-->

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
      tableData: {
        _id:'',
        //账号
        account: '',
        //昵称
        nick_name: '',
        //密码框
        //password: '',
        //确认密码
        //confirmPassword: '',
        //工号
        employee_no: '',
        //用户级别
        role: '',
        //所在平台
        companyName: '',
        //邮箱
        email: '',
        //手机号
        mobilePhone: '',
        ip: localStorage.getItem("Ip"),
        //lastLoginTime: ''
      },
      nowTime: '',
      visible: false,
      //对话框标题
      dialogTitle: '',
      userName: sessionStorage.getItem("userName"),
      rules: {
        account: [
          {required: true, message: '请输入账户名称（用于登陆）', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        nick_name: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        employee_no: [
          {required: true, message: '请输入工号'},
          //{ type: 'number', message: '工号必须为数字值' }
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
        mobilePhone: [
          {required: true, message: '请填写手机号', trigger: 'blur'}
        ]
      }
    }
  },
  async mounted() {
    this.nowTimes()
    let _this = this;
    let formData = new FormData();
    formData.append('_id', sessionStorage.getItem('userId'));
    //console.log(sessionStorage.getItem('userId'));
    let {data: res} = await _this.$http.post("/api/user/getUser", formData);
    //console.log(res);password
    this.tableData.account = res.resObj.account;
    this.tableData._id = sessionStorage.getItem('userId');
    this.tableData.nick_name = res.resObj.nick_name;
    this.tableData.employee_no = res.resObj.employee_no;
    this.tableData.role = res.resObj.role;
    this.tableData.email = res.resObj.email;
    this.tableData.mobilePhone = res.resObj.mobilePhone;
    //this.tableData.lastLoginTime = sessionStorage.getItem("lastLoginTime");
    //console.log(this.tableData[0]);
    if (res.resObj.platformId === null) {
      this.tableData.companyName = "系统管理员";
    } else {
      this.tableData.companyName = res.resObj.platformName;
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

      let {data: res} = await this.$http.post("/api/user/logout");
      console.log(res);
      if (res.resCode ==="1") {
        sessionStorage.clear();
        window.location.href = "/";
      }
    },
    //用户页面
    async userDetail() {
      this.visible = true;
      this.dialogTitle = '修改用户信息'
    },
    async resetForm() {
      //let formData = new FormData();
      //if (!(this.tableData.password===''||this.tableData.password===null||this.tableData.confirmPassword===null)){
        //console.log(1)
       // if (this.getPwdStrength(this.tableData.password) < 9 || !this.checkPwd()){
       //   console.log(2)
       //   this.$message.error('请输入强密码或确认密码是否输入正确');
        //  this.clearPwd();
        //}else {
          // eslint-disable-next-line no-undef
       //   let {data: res} =await this.$http.post("/api/user/updateUser", this.tableData);

       //   if (res.resCode === "1"){
         //   this.$message({
         //     message: res.resMsg,
         //     type: 'success'
          //  });
        //  }
      //  }
      //}else {
        //console.log("1111"+this.tableData.password)
        // eslint-disable-next-line no-undef
        let {data: res} =await this.$http.post("/api/user/updateUser", this.tableData);
        if (res.resCode === "1"){
          this.$message({
            message: res.resMsg,
            type: 'success'
          });
        }
      //}
    },
    getPwdStrength(pwd) {
      var level = 1;
      if (pwd.length >= 8) {
        level += 5;
      }
      var m = [
        /[a-z]/,
        /[A-Z]/,
        /[\d]/,
        /[^\da-zA-Z]/
      ];
      for (var i = m.length - 1; i >= 0; i--) {
        if (null !== pwd.match(m[i])) {
          level += 1;
        }
      }
      return level;
    },
    clearPwd() {
      this.tableData.password = '';
      this.tableData.confirmPassword = '';
    },
    checkPwd() {
      if (this.tableData.password === this.tableData.confirmPassword) {
        return true;
      }
      return false;
    }
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
  background: #409EFF;
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
