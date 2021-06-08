<template>

  <el-form :model="tableData" :rules="rules" ref="tableData" label-width="100px" >
    <el-form-item label="用户名" prop="account">
      <el-input v-model="tableData.account" :disabled="true"></el-input>
    </el-form-item>
    <!--<el-form-item label="密码" prop="password">
      <el-input v-model="tableData.password" placeholder="请输入强密码" show-password></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input v-model="tableData.confirmPassword" placeholder="请输入强密码" show-password></el-input>
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
    <el-form-item label="ip" prop="ip">
      <el-input v-model="tableData.ip" :disabled="true"></el-input>
    </el-form-item>
<!--    <el-form-item label="最后登陆时间" prop="lastLoginTime">-->
<!--      <el-input v-model="tableData.lastLoginTime" :disabled="true"></el-input>-->
<!--    </el-form-item>-->
    <el-form-item >
      <el-button type="primary" icon="el-icon-edit" @click="resetForm()">更新个人信息</el-button>
    </el-form-item>
  </el-form>
</template>
<style scoped>
</style>
<script>
export default {
  data() {
    return {
      tableData: {
        _id:'',
        //账号
        account: '',
        //昵称
        nick_name: '',
        //密码框
       // password: '',
        //确认密码
       // confirmPassword: '',
        //工号
        employee_no: '',
        //用户级别
        role: '',
        //用户级别
        level: '',
        //所在平台
        companyName: '',
        //邮箱
        email: '',
        //手机号
        mobilePhone: '',
        ip: localStorage.getItem("Ip"),
        //lastLoginTime: sessionStorage.getItem("lastLoginTime")
      },
      rules: {
        account: [
          {required: true, message: '请输入用户名称（用于登陆）', trigger: 'blur'},
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
    //this.tableData.level = res.resObj.level;
    this.tableData.email = res.resObj.email;
    this.tableData.mobilePhone = res.resObj.mobilePhone;
    //this.tableData.lastUpdate_time = res.resObj.lastUpdate_time;
    //this.tableData.create_time = res.resObj.create_time;
    //this.tableData.lastLogin_time = res.resObj.lastLogin_time;
    //this.tableData.lastLogin_ip = res.resObj.lastLogin_ip;
    console.log(this.tableData);
    if (res.resObj.platformId === null) {
      this.tableData.companyName = "微航管理系统";
    } else {
      this.tableData.companyName = res.resObj.platformName;
    }

  },
  methods: {
    async resetForm() {
      //let formData = new FormData();
      //if (!(this.tableData.password===''||this.tableData.password===null||this.tableData.confirmPassword===null)){
       // console.log(1)
       // if (this.getPwdStrength(this.tableData.password) < 9 || !this.checkPwd()){
       //   console.log(2)
       //   this.$message.error('请输入强密码或确认密码是否输入正确');
       //   this.clearPwd();
       // }else {
       //   console.log("1111"+this.tableData.password)
          // eslint-disable-next-line no-undef
        //  let {data: res} =await this.$http.post("/api/user/updateUser", this.tableData);
        //  if (res.resCode === "1"){
        //    this.$message({
        //      message: res.resMsg,
        //      type: 'success'
        //    });
       //   }
       // }
     // }else {
        //console.log("1111"+this.tableData.password)
        // eslint-disable-next-line no-undef
        let {data: res} =await this.$http.post("/api/user/updateUser", this.tableData);
        if (res.resCode === "1"){
          this.$message({
            message: res.resMsg,
            type: 'success'
          });
        }
     // }
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

  }
}
</script>