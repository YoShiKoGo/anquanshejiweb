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
  methods: {
//登录表单提交
    async onSubmit() {
      let _this = this;

      //从后台拿到的菜单数据
      // eslint-disable-next-line no-unused-vars

      // 校验通过以后 掉接口 this.$refs.shop 和html中ref对应
      this.$refs.loginForm.validate( async valid => {
            if (valid) {
              console.log("登录信息已填写");
              let formData = new FormData();
              formData.append('username',_this.loginForm.username);
              formData.append('password',_this.loginForm.password);
              let {data: res} = await _this.$http.post("/api/user/login", formData);
              console.log(res);
              //成功
              // eslint-disable-next-line no-unused-vars
              let menuList = [
                {
                  children: [
                    {
                      children: [],
                      code: "company:dept",
                      createTime: 1586703509000,
                      icon: "el-icon-copy-document",
                      id: 33,
                      isHome: 0,
                      label: "公司平台管理",
                      name: "CompanyList",
                      orderNum: 2,
                      parentId: 17,
                      path: "/companyList",
                      type: "1",
                      updateTime: 1586337139000,
                      url: "/system/company/CompanyList"
                    },
                    {
                      children: [],
                      code: "company:user",
                      createTime: 1691464271000,
                      icon: "el-icon-s-custom",
                      id: 18,
                      isHome: 0,
                      label: "平台操作员管理",
                      name: "OperatorList",
                      orderNum: 3,
                      parentId: 17,
                      path: "/operatorList",
                      type: "1",
                      updateTime: 1691565988000,
                      url: "/system/operator/OperatorList"
                    },
                  ],
                  code: "company:manage",
                  createTime: 1691464271000,
                  icon: "el-icon-document",
                  id: 17,
                  isHome: 0,
                  label: "系统管理",
                  orderNum: 1,
                  parentId: 0,
                  path: "/system",
                  type: "0",
                  updateTime: 1691565988000
                },
                {
                  children: [
                    {
                      children: [],
                      code: "company:goodsCategory",
                      createTime: 1586703272000,
                      icon: "el-icon-s-data",
                      id: 36,
                      isHome: 0,
                      label: "登录次数统计",
                      name: "LoginCount",
                      orderNum: 1,
                      parentId: 34,
                      path: "/loginCount",
                      type: "1",
                      updateTime: 1586683590000,
                      url: "/user/LoginCount"
                    }
                  ],
                  code: "company:goods",
                  createTime: 1586702987000,
                  icon: "el-icon-user",
                  id: 34,
                  isHome: 0,
                  label: "用户管理",
                  name: "",
                  orderNum: 2,
                  parentId: 0,
                  path: "/goods",
                  type: "0",
                  updateTime: 1586683323000
                },
                {
                  children: "",
                  code: "company:systenConfig",
                  createTime: 1586703003000,
                  icon: "el-icon-receiving",
                  id: 42,
                  isHome: 0,
                  label: "日志管理",
                  name: "LogList",
                  orderNum: 3,
                  parentId: 0,
                  path: "/logList",
                  type: "0",
                  url: 'log/LogList',
                  updateTime: 1586684441000
                }

              ];

              //登录成功返回的路由数据
              // eslint-disable-next-line no-unused-vars
              let routerList = [
                {
                  children: '',
                  code: "company:dept",
                  createTime: 1586703509000,
                  icon: "el-icon-copy-document",
                  id: 33,
                  isHome: 0,
                  label: "公司平台管理",
                  name: "CompanyList",
                  orderNum: 2,
                  parentId: 17,
                  path: "/companyList",
                  type: "1",
                  updateTime: 1586337139000,
                  url: "/system/company/CompanyList"
                },
                {
                  children: '',
                  code: "company:user",
                  createTime: 1691464271000,
                  icon: "el-icon-s-custom",
                  id: 18,
                  isHome: 0,
                  label: "平台操作员管理",
                  name: "OperatorList",
                  orderNum: 3,
                  parentId: 17,
                  path: "/operatorList",
                  type: "1",
                  updateTime: 1691565988000,
                  url: "/system/operator/OperatorList"
                },
                {
                  children: '',
                  code: "company:goodsCategory",
                  createTime: 1586703272000,
                  icon: "el-icon-s-data",
                  id: 36,
                  isHome: 0,
                  label: "登录次数统计",
                  name: "LoginCount",
                  orderNum: 1,
                  parentId: 34,
                  path: "/loginCount",
                  type: "1",
                  updateTime: 1586683590000,
                  url: "/user/LoginCount"
                },

                {
                  children: "",
                  code: "company:systemConfig",
                  createTime: 1586703003000,
                  icon: "el-icon-receiving",
                  id: 42,
                  isHome: 0,
                  label: "日志管理",
                  name: "LogList",
                  orderNum: 3,
                  parentId: 0,
                  path: "/logList",
                  url: "/log/LogList",
                  type: "0",
                  updateTime: 1586684441000
                }
              ];

              if (res.code=="200") {
                console.log(res.code)
                //保存菜单数据
                sessionStorage.setItem("menuList", JSON.stringify(menuList));
                //保存路由数据
                sessionStorage.setItem("routerList", JSON.stringify(routerList));
                //动态生成路由
                this.$store.commit("getMenuList", this.$router);
                await this.$router.push({path: '/home'});
              } else {
                alert(res.msg);
                console.log(res.code)
                this.clearAll();
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
  height: 250px;
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
