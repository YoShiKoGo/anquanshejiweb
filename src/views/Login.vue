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
        <el-input v-model="loginForm.password" type="password" placeholder="请输入强密码" show-password></el-input>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="verifyCode">
        <el-input v-model="loginForm.verifyCode" placeholder="验证码" prefix-icon="el-icon-key">
          <template slot="append" style="width: 60px;height:20px">
            <!--<el-image class="login-code" :src="code_url" @click="getVertifyCode" title="看不清？点击切换"  ></el-image>-->
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="login-code" label="">
        <el-image class="login-code" :src="code_url" @click="getVertifyCode" title="看不清？点击切换"></el-image>
      </el-form-item>
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

<script src="../assets/js/jsbn.js"></script>
<script src="../assets/js/rng.js"></script>
<script src="../assets/js/rsa.js"></script>

<script>
import {
  RSAEncrypt,
  RSADoPublic,
  RSASetPublic,
  RSAKey,
  pkcs1pad2,
  byte2Hex,
  linebrk,
  parseBigInt
} from '../assets/js/rsa.js'
import JSEncrypt from 'jsencrypt/bin/jsencrypt'
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
        verifyCode: "",//输入的验证码
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
      },
      code_url: ''
    };
  },
  /*enter事件绑定*/
  created() {
    //绑定事件
    window.addEventListener('keydown', this.keyDown);
    this.getVertifyCode();
    //console.log($)
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
              //console.log("登录信息已填写");
              let formData = new FormData();
              //let e = sessionStorage.getItem('exponent');
              //let n = sessionStorage.getItem('module');
              let p = sessionStorage.getItem('publicKey');
              //const jse = new this.$jsEncrypt()
               //jse.setPublicKey(p)//配置公钥
               let encryptor = new JSEncrypt() // 新建JSEncrypt对象
               encryptor.setPublicKey(p) // 设置公钥
               //var rsa = new RSAKey();
               //rsa.setPublic(n, e);
               //var passWord = rsa.encrypt(_this.loginForm.password);
              var pwd = encryptor.encrypt(_this.loginForm.password)//加密密码

              formData.append("pwd",pwd)
              formData.append("username",_this.loginForm.username)
              formData.append("vCode",_this.loginForm.verifyCode)
              console.log(_this.loginForm);
              let {data: res} = await _this.$http.post("/api/user/login", formData);
              //console.log(res);
              //成功
              // eslint-disable-next-line no-unused-vars
              let menuList = [];

              //登录成功返回的路由数据
              // eslint-disable-next-line no-unused-vars
              let routerList = [];

              if (res.resCode === "1000") {
                console.log(res);
                let role = res.resObj.role;
                let menuList = this.getMenuList(role);
                let routerList = this.getRouterList(role);

                //保存菜单数据
                sessionStorage.setItem("menuList", JSON.stringify(menuList));
                //保存路由数据
                sessionStorage.setItem("routerList", JSON.stringify(routerList));
                sessionStorage.setItem("userId", res.resObj._id);
                sessionStorage.setItem("userName", res.resObj.nick_name);
                sessionStorage.setItem("role", res.resObj.role);
                sessionStorage.setItem("lastLoginTime", res.resObj.lastLogin_time);
                this.$message({
                  message: res.resMsg,
                  type: 'success'
                });
                console.log(sessionStorage)
                //动态生成路由
                this.$store.commit("getMenuList", this.$router);
                this.$router.push({path: '/desktop'});
                /*else为登录失败*/
              } else {
                /*显示提示框，设置提示信息*/
                this.$message.error(res.resMsg);
                this.getVertifyCode();
                //console.log(res.code)
                _this.clearAll();
              }
              //登录成功后跳转的路由
            }
          }
      );

    },
    //根据权限获取菜单
    getMenuList(role) {
      // eslint-disable-next-line no-unused-vars
      let menuList = [];
      //console.log("存入路由")
      if (role === "ROLE_ADMIN") {
        return menuList = [
          {
            children: "",
            code: "company:systenConfig",
            createTime: 1586703003000,
            icon: "el-icon-receiving",
            id: 48,
            isHome: 0,
            label: "个人信息",
            name: "desktop",
            orderNum: 3,
            parentId: 0,
            path: "/desktop",
            type: "0",
            updateTime: 1586684441000
          },
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
                url: "/system/Department/DepartmentList"
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
                url: "/system/User/UserList"
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
                url: "/goods/goodsCategory/goodsCategoryList"
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
            updateTime: 1586684441000
          }
        ]
      } else if (role === "ROLE_COMPANY") {
        return menuList = [
          {
            children: "",
            code: "company:systenConfig",
            createTime: 1586703003000,
            icon: "el-icon-receiving",
            id: 48,
            isHome: 0,
            label: "个人信息",
            name: "desktop",
            orderNum: 3,
            parentId: 0,
            path: "/desktop",
            type: "0",
            updateTime: 1586684441000
          }, {
            children: [
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
                url: "/system/User/UserList"
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
          }]
      } else if (role === "ROLE_OPERATOR") {
        return menuList = [
          {
            children: "",
            code: "company:systenConfig",
            createTime: 1586703003000,
            icon: "el-icon-receiving",
            id: 48,
            isHome: 0,
            label: "个人信息",
            name: "desktop",
            orderNum: 3,
            parentId: 0,
            path: "/desktop",
            type: "0",
            updateTime: 1586684441000
          }]
      }
    },
    //获取验证码
    async getVertifyCode() {
      const {data: res} = await this.$http.get('/api/verify/idcode')
      console.log(res)
      this.code_url = res.resObj.code_url // 验证码图片渲染
      sessionStorage.setItem("module", res.resObj.module);
      sessionStorage.setItem("exponent", res.resObj.exponent);
      sessionStorage.setItem("publicKey", res.resObj.publicScriptKey);
    },
    //根据权限获取路由
    getRouterList(role) {
      // eslint-disable-next-line no-unused-vars
      let routerList = [];
      console.log(role);
      if (role === "ROLE_ADMIN") {
        return routerList = [
          {
            "children": [],
            "code": "company:dept",
            "icon": "el-icon-copy-document",
            "id": 1,
            "isHome": 0,
            "label": "公司平台管理",
            "name": "CompanyList",
            "orderNum": 2,
            "parentId": "3",
            "path": "/companyList",
            "type": "1",
            "url": "/system/company/CompanyList"
          },
          {
            "children": [],
            "code": "company:user",
            "icon": "el-icon-s-custom",
            "id": 2,
            "isHome": 0,
            "label": "平台操作员管理",
            "name": "OperatorList",
            "orderNum": 3,
            "parentId": "3",
            "path": "/operatorList",
            "type": "1",
            "url": "/system/operator/OperatorList"
          },
          {
            "children": [],
            "code": "company:goodsCategory",
            "icon": "el-icon-s-data",
            "id": 4,
            "isHome": 0,
            "label": "登录次数统计",
            "name": "LoginCount",
            "orderNum": 2,
            "parentId": "5",
            "path": "/loginCount",
            "type": "1",
            "url": "/user/LoginCount"
          },
          {
            "children": [],
            "code": "company:systenConfig",
            "icon": "el-icon-receiving",
            "id": 6,
            "isHome": 0,
            "label": "日志管理",
            "name": "LogList",
            "orderNum": 1,
            "parentId": "0",
            "path": "/logList",
            "type": "1",
            "url": "/log/LogList"
          }
        ]
      } else if (role === "ROLE_COMPANY") {
        return routerList = [{
          "children": [],
          "code": "company:dept",
          "icon": "el-icon-copy-document",
          "id": 1,
          "isHome": 0,
          "label": "公司平台管理",
          "name": "CompanyList",
          "orderNum": 2,
          "parentId": "3",
          "path": "/companyList",
          "type": "1",
          "url": "/system/company/CompanyList"
        },
          {
            "children": [],
            "code": "company:user",
            "icon": "el-icon-s-custom",
            "id": 2,
            "isHome": 0,
            "label": "平台操作员管理",
            "name": "OperatorList",
            "orderNum": 3,
            "parentId": "3",
            "path": "/operatorList",
            "type": "1",
            "url": "/system/operator/OperatorList"
          }]
      } else if (role === "ROLE_OPERATOR") {
        return routerList = []
      }
    },
    //清除表单所有数据
    clearAll() {
      this.loginForm.username = '';
      this.loginForm.password = '';
      this.loginForm.verifyCode = '';
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
  height: 370px;
  width: 350px;
  border-radius: 10px;
  box-shadow: 0 0 25px #cac6c6;
  padding: 10px 15px;
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
