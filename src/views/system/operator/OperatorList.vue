<template>
  <el-main>
    <!--新增dialog-->
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        width="40%"
    >
      <el-form :rules="rules" ref="addCompany" :model="addCompanyForm" :inline="true">
        <el-form-item prop="account" label="用户名">
          <el-input autocomplete="off" size="" v-model="addCompanyForm.account" width="42%"
                    placeholder="请输入用户名" :disabled=accountIsEdir ></el-input>
        </el-form-item>
        <el-form-item  prop="password" label="密码">
          <el-input autocomplete="off" size="" type="password" v-model="addCompanyForm.password" width="42%"
                    placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item prop="nick_name" label="昵称">
          <el-input size="" v-model="addCompanyForm.nick_name" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item prop="employee_no" label="工号">
          <el-input size="" v-model="addCompanyForm.employee_no" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item prop="mobilePhone" label="手机号">
          <el-input size="" v-model="addCompanyForm.mobilePhone" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input size="" v-model="addCompanyForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="role" label="角色" v-show="role==='ROLE_ADMIN'">
          <el-select v-model="valueRole" placeholder="请选择">
            <el-option
                v-for="item in optionsRole"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span></span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="visible = false">取 消</el-button>
    <el-button type="primary" @click="confirmBtn()">确 定</el-button>
  </span>
    </el-dialog>

    <!--搜索框  -->
    <el-form size="mine" :model="companyForm" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="公司名称">
            <el-select v-model="value" filterable placeholder="请选择" @change="itemChange">
              <el-option
                  v-for="item in options"
                  :key="item._id"
                  :label="item.platformName"
                  :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>


        <el-button v-show="value!==''" class="btn-left" @click="openAddCompany" type="primary" size="" icon="el-icon-plus">新增用户</el-button>
      </el-row>
    </el-form>
    <!--数据表格
     :data 绑定表格数据
      size: 表格尺寸 可选 medium / small / mini
      stripe 是否为斑马线
      height 表格高度
     -->
    <el-table
        :data="tableData"
        :height="tableHeight"
        border
        style="width: 100%" size="">
      <el-table-column
          prop="account"
          label="用户名"
          width="180" >
      </el-table-column>
      <el-table-column
          prop="nick_name"
          label="昵称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="mobilePhone"
          label="电话">
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮箱">
      </el-table-column>
      <el-table-column
          prop="role"
          label="角色">
      </el-table-column>
      <el-table-column
          prop="platformName"
          label="平台名称">
      </el-table-column>
      <el-table-column
          prop="employee_no"
          label="工号">
      </el-table-column>

      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button
              @click.native.prevent="editRow(scope.row)" type="primary"
              size="mini">编辑
          </el-button>
          <el-button
              @click.native.prevent="deleteRow(scope.row)" type="danger"
              size="mini">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
/**
 * 邮箱
 * @param {*} s
 */
export function isEmail(s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

// eslint-disable-next-line no-unused-vars
let validateEmail = (rule, value, callback) => {
  // eslint-disable-next-line no-undef
  if (!isEmail(value)) {
    callback(new Error('邮箱格式错误'))
  } else {
    callback()
  }
}
import JSEncrypt from 'jsencrypt/bin/jsencrypt'
export default {

  name: "company",
  status: 0,
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确的手机号'));
        }
      }
    };

    return {
      /*表单验证*/
      rules: {
        account: [
          {
            required: true,
            trigger: 'change',
            message: '请输入用户名'
          },

        ],
        nick_name: [
          {
            required: true,
            trigger: 'change',
            message: '请输入昵称'
          },

        ],
        employee_no: [
          {
            required: true,
            trigger: 'change',
            message: '请输入工号'
          },

        ],
        password: [
          {
            required: true,
            trigger: 'change',
            message: '请输入密码'
          },
        ],
        loginName: [
          {
            required: true,
            trigger: 'change',
            message: '请输入'
          }
        ],
        email: [
          {
            required: true,
            trigger: 'change',
            message: '请输入邮箱'
          },
          {
            validator: validateEmail,
            trigger: 'blur'
          }
        ],
        mobilePhone: [
          {
            required: true,
            trigger: 'change',
            message: '请输入电话'
          },
          {
            validator: checkPhone, trigger: 'blur'
          }
        ],

      },
      //判断是否是点击的编辑
      isEdit: false,
      //公司id保证当前添加更改用户时存入公司id
      platformId: '',

      optionsRole: [
        {
          value: '公司管理员',
          label: '公司管理员'
        }, {
          value: '普通操作员',
          label: '普通操作员'
        },],
      valueRole: '普通操作员',
      //当前用户的权限
      role: sessionStorage.getItem("role"),
      options: [],
      value: '',
      //添加用户的数据
      addCompanyForm: {
        account: '',
        password: '',
        nick_name:'',
        employee_no:'',
        mobilePhone: '',
        email: '',
        loginName: '',
        role: '',
        id: ''
      },
      //编辑公司的数据
      editCompanyForm: {
        platformName: '',
        des: ''
      },
      //对话框标题
      dialogTitle: '',
      //用户名能否修改
      accountIsEdir:'',
      //对话框显示状态
      visible: false,
      companyForm: {
        platformName: ''
      },
      tableHeight: window.innerHeight - 250,
      //用户列表
      tableData: []
    }
  },


  methods: {
    //点击下拉框事件
    async itemChange() {
      let _this = this;
      //value为公司的id
      let formData = new FormData
      formData.append("platformId", _this.value);
      let {data: res} = await this.$http.post("/api/user/getUsersByPlatForm", formData);
      console.log(res);
      this.tableData = res.resObj;
      this.platformId = _this.value;
      console.log(this.tableData)
    },
    //删除按钮
    deleteRow(row) {
      let _this = this;
      _this.$confirm("确定删除吗？", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "waring"
      })
          .then(async () => {

            let formData = new FormData
            formData.append("_id", row._id);
            console.log(row.id);
            let {data: res} = await _this.$http.post(
                "/api/admin/delUser",
                formData
            );
            if (res.resCode === "1") {
              _this.$message({
                message: res.resMsg,
                type: "success"
              });
              _this.getCompanyList();
              _this.getAllUser();
            } else {
              _this.$message({
                message: res.resMsg,
                type: "error"
              });
            }
          });
    },
    //编辑按钮
    editRow(row) {
      this.isEdit = true;
      this.accountIsEdir = true;
      this.dialogTitle = '修改用户信息'
      this.visible = true;
      console.log(row);
      this.addCompanyForm.account = row.account;
      this.addCompanyForm.password = row.password
      this.addCompanyForm.nick_name = row.nick_name
      this.addCompanyForm.employee_no = row.employee_no
      this.addCompanyForm.mobilePhone = row.mobilePhone;
      this.addCompanyForm.email = row.email;
      this.addCompanyForm.id = row._id;
      this.addCompanyForm.platformId = row.platformId;
      this.valueRole = row.role;
    },
    /*点击新建按钮*/
    openAddCompany() {
      this.isEdit = false;
      this.accountIsEdir = false;
      this.resetForm("addCompany")
      this.dialogTitle = '添加用户'
      this.visible = true;
    },

    /*清除打开的提示框内容*/
    resetForm(formName) {
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields();
      }
    },
    /*弹出框的确定事件*/
    confirmBtn() {
      let _this = this;
      //新增
      if (!_this.isEdit) {
        _this.$refs.addCompany.validate(valid => {
          if (valid) {
            this.addUser();
          }
        });
        //编辑
      } else {
        //console.log(_this.valueRole);
        this.editUser()
      }
      _this.visible = false;
    },

    //编辑用户
    async editUser() {
      let user = {
        account: this.addCompanyForm.account,
        //password: this.addCompanyForm.password,
        nick_name: this.addCompanyForm.nick_name,
        employee_no: this.addCompanyForm.employee_no,
        mobilePhone: this.addCompanyForm.mobilePhone,
        email: this.addCompanyForm.email,
        role: this.valueRole,
        platformId: this.addCompanyForm.platformId,
        _id: this.addCompanyForm.id,
        opUser:sessionStorage.getItem("userName")
      };
      console.log(this.addCompanyForm);
      let {data: resAdd} = await this.$http.post("api/admin/updateUser", user);
      //console.log("zheer",resAdd);
      if (resAdd.resCode === "1000") {
        //信息提示
        this.$message({
          message: resAdd.resMsg,
          type: 'success'
        });
        this.getCompanyList();
        this.getAllUser();
        //this.itemChange();
      } else {
        this.$message({
          message: resAdd.resMsg,
          type: "error"
        });
      }
    },

    //添加用户
    async addUser() {
      let p = sessionStorage.getItem('publicKey');
      let encryptor = new JSEncrypt() // 新建JSEncrypt对象
      encryptor.setPublicKey(p) // 设置公钥
      var pwd = encryptor.encrypt(this.addCompanyForm.password)//加密密码
      let user = {
        account: this.addCompanyForm.account,
        password: pwd,
        nick_name: this.addCompanyForm.nick_name,
        employee_no: this.addCompanyForm.employee_no,
        mobilePhone: this.addCompanyForm.mobilePhone,
        email: this.addCompanyForm.email,
        role: this.valueRole,
        platformId: this.platformId,
        opUser: sessionStorage.getItem("userName")
      }
      //console.log(user)
      let {data: resAdd} = await this.$http.post("api/admin/addUser", user);
      console.log(resAdd)
      if (resAdd.resCode === "1000") {
        //信息提示
        this.$message({
          message: resAdd.resMsg,
          type: 'success'
        });
        this.itemChange();

      } else {
        this.$message({
          message: resAdd.resMsg,
          type: "error"
        });
      }
    },
    //查询公司
    async selectByplatformName() {
      let _this = this;
      let platformName = this.companyForm.platformName;
      let formData = new FormData()
      formData.append('platformName', platformName)
      let {data: res} = await _this.$http.post("api/company/findByplatformName", formData);
      _this.tableData = [];
      if (res.data !== null) {
        _this.tableData[0] = res.resObj;
      }
    },
    async getAllUser() {
      let _this = this;
      //console.log("所有用户");
      let {data: res} = await _this.$http.post("api/admin/userAll");
      //console.log("所有用户",res)
      this.tableData = res.resObj;
      //console.log(res.resObj)
    },
    //获取公司列表
    async getCompanyList() {
      //console.log("获取公司列表");
      if (sessionStorage.getItem("role") === 'ROLE_ADMIN') {
        let {data: res} = await this.$http.post('api/company/findAll');
        this.options = res.resObj
      } else {
        //let formData = new FormData();
        //formData.append("userId",sessionStorage.getItem("userId"))
        let {data: res} = await this.$http.post('api/company/getPlatformByUser');
        //console.log("平台列表",res);
        this.options = [res.resObj]
        //console.log(this.options)
      }
    },
    /**
     * 邮箱
     * @param {*} s
     */
    isEmail(s) {
      return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
    }


  },

   mounted() {
    //在页面加载时，获取公司列表
    this.getCompanyList();
    this.getAllUser();


  },

};
</script>

<style scoped>
.btn-left {
  margin-left: 20px;
}

.el-main {
  padding-top: 5px !important;
}
</style>