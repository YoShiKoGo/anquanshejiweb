<!--登录页面-->
<template>


  <div class="login-container ub main-center  cross-center">
    <!--    <el-dialog
            title="提示"
            :visible.sync="centerDialogVisible"
            width="20%"
            center>
          <span :class="infoStatus">{{dialogInfo.msg}}</span>
          <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
        </el-dialog>-->
    <el-form size="medium" class="login-form" :model="loginForm" :rules="rules" ref="loginForm"
             label-width="80px">
      <el-form-item label>
        <div class="ub main-center cross-center login-title">系统登录</div>
      </el-form-item>
      <el-form-item prop="username" label="">
        <el-input v-model="loginForm.username" placeholder="输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="">
        <el-input v-model="loginForm.password" type="password" placeholder="输入密码"></el-input>

      </el-form-item>
      <!--      <el-form-item prop="code" label="">
              <el-row :gutter="10">
                <el-col :span="16">
                  <el-input v-model="loginForm.code" placeholder="请输入验证码"></el-input>
                </el-col>
                <el-col :span="8">
                  <el-input
                      readonly
                      v-model="loginForm.captcha"
                      auto-complete="off"
                      placeholder="单击图片刷新"
                      style="width: 100%;"
                  ></el-input>
                </el-col>
              </el-row>
            </el-form-item>-->
      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button class="my-button" type="primary" @keyup.enter="onSubmit" @click="onSubmit">登录</el-button>
          </el-col>
          <el-col :span="12">
            <el-button class="my-button" @click="clearAll">重置</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>

export default {
  components: {},
  data() {

    return {
      infoStatus: '',
      centerDialogVisible: false,
      dialogInfo: {
        msg: ""
      },
      loginForm: {
        username: "",//用户名
        password: "",//密码
        code: ""//
      },
      //验证规则
      rules: {
        username: [
          {
            required: true,
            trigger: "change",
            message: "请输入用户名"
          }
        ],
        password: [
          {
            required: true,
            trigger: "change",
            message: "请输入密码"
          }
        ]
      }
    };
  },
  /*enter事件绑定*/
  mounted() {
    //绑定事件
    window.addEventListener('keydown', this.keyDown);
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDown, false);
  },
  methods: {
    keyDown(e) {
      //如果是回车则执行登录方法
      if (e.keyCode === 13) {
        this.onSubmit();
      }
    },
//登录表单提交
    async onSubmit() {
      let _this = this;

      //从后台拿到的菜单数据
      // eslint-disable-next-line no-unused-vars

      // 校验通过以后 掉接口 this.$refs.shop 和html中ref对应
      this.$refs.loginForm.validate(async valid => {
            if (valid) {
              console.log("登录信息已填写");
              let formData = new FormData();
              formData.append('username', _this.loginForm.username);
              formData.append('password', _this.loginForm.password);
              let {data: res} = await _this.$http.post("/api/user/login", formData);
              console.log(res);
              //成功
              // eslint-disable-next-line no-unused-vars
              let menuList = [];

              //登录成功返回的路由数据
              // eslint-disable-next-line no-unused-vars
              let routerList = [];

              if (res.code === 200) {
                console.log(res.code)
                routerList = res.data.routerList;
                menuList = res.data.menuList;

                //保存菜单数据
                sessionStorage.setItem("menuList", JSON.stringify(menuList));
                //保存路由数据
                sessionStorage.setItem("routerList", JSON.stringify(routerList));
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("userId", res.data.userId);
                sessionStorage.setItem("userName", res.data.userName);
                sessionStorage.setItem("role", res.data.role);
                sessionStorage.setItem("lastLoginTime", res.data.lastLoginTime);
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
                //动态生成路由
                this.$store.commit("getMenuList", this.$router);
                this.$router.push({path: '/desktop'});
                /*else为登录失败*/
              } else {
                /*显示提示框，设置提示信息*/
                this.$message.error(res.msg);
                console.log(res.code)
                _this.clearAll();
              }
              //登录成功后跳转的路由
            }
          }
      );

    },
    //清除表单所有数据
    clearAll() {
      this.loginForm.username = '';
      this.loginForm.password = '';
      this.loginForm.code = '';
    }

  }
};
</script>
<style lang="css" scoped>
.login-title {
  font-size: 24px;
  font-weight: 600;
}

.login-container {
  height: 100%;
}

.login-form {
  height: 270px;
  width: 350px;
  border-radius: 10px;
  box-shadow: 0 0 25px #cac6c6;
  padding: 20px 35px;
}

.login-container /deep/ .el-form-item__content {
  margin-left: 0 !important;
}

.my-button {
  width: 100%;
}

.info-error {
  color: red;
  font-size: 15px;
}
</style>
