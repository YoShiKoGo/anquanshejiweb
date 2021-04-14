<!--登录页面-->
<template>
  <div class="login-container ub main-center cross-center">
    <el-form size="medium" class="login-form" :model="loginForm" :rules="rules" ref="loginForm"
             label-width="80px">
      <el-form-item label>
        <div class="ub main-center cross-center login-title">系统登录</div>
      </el-form-item>
      <el-form-item prop="username" label="">
        <el-input v-model="loginForm.username" placeholder="输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="">
        <el-input v-model="loginForm.password" placeholder="输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="code" label="">
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
      </el-form-item>
      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button class="my-button" type="primary" @click="onSubmit">登录</el-button>
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
  data() {
    return {
      loginForm: {
        username: "",//用户名
        password: "",//密码
        code:""//
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
        ],
        code: [
          {
            required: true,
            trigger: "change",
            message: "请输入验证码"
          }
        ]
      }
    };
  },
  methods: {
//登录表单提交
    onSubmit() {
      // 校验通过以后 掉接口 this.$refs.shop 和html中ref对应
      this.$refs.loginForm.validate(valid => {
        if(valid){
        //成功
          this.$router.push({path:'/'})
        }
      });

    },
    clearAll() {
      this.loginForm.username='';
      this.loginForm.password='';
      this.loginForm.code='';

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
  height: 300px;
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
</style>
