<template>
  <el-main>
    <!--新增dialog-->
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        width="40%"
    >
      <el-form :rules="rules" ref="addCompany" :model="addCompanyForm" :inline="true">
        <el-form-item prop="username" label="用户名">
          <el-input autocomplete="off" size="" v-model="addCompanyForm.username" width="42%"
                    placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item v-show="!isEdit" prop="password" label="密码">
          <el-input autocomplete="off" size="" type="password" v-model="addCompanyForm.password" width="42%"
                    placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="loginName" label="姓名">
          <el-input size="" v-model="addCompanyForm.loginName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="电话">
          <el-input size="" v-model="addCompanyForm.mobile" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input size="" v-model="addCompanyForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="role" label="角色" v-show="role==='SYS_ADMIN'&&isEdit">
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
                  :key="item.id"
                  :label="item.companyName"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>


        <el-button v-show="value!==''" class="btn-left" @click="openAddCompany" type="primary" size="" icon="el-icon-plus">新增</el-button>
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
          prop="username"
          label="用户名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="loginName"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="mobile"
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
export default {

  name: "company",
  status: 0,
  data() {
    return {
      /*表单验证*/
      rules: {
        username: [
          {
            required: true,
            trigger: 'change',
            message: '请输入用户名'
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
            message: '请输入用户名'
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
        mobile: [
          {
            required: true,
            trigger: 'change',
            message: '请输入电话'
          },
        ],

      },
      //判断是否是点击的编辑
      isEdit: false,
      //公司id保证当前添加更改用户时存入公司id
      companyId: '',

      optionsRole: [
        {
          value: 'ADMIN',
          label: '公司管理员'
        }, {
          value: 'USER',
          label: '操作员'
        },],
      valueRole: '',
      //当前用户的权限
      role: sessionStorage.getItem("role"),
      options: [],
      value: '',
      //添加用户的数据
      addCompanyForm: {
        username: '',
        password: '',
        mobile: '',
        email: '',
        loginName: '',
        role: '',
        id: ''

      },
      //编辑公司的数据
      editCompanyForm: {
        companyName: '',
        des: ''
      },
      //对话框标题
      dialogTitle: '',
      //对话框显示状态
      visible: false,
      companyForm: {
        companyName: ''
      },
      tableHeight: window.innerHeight - 250,
      //用户列表
      tableData: []
    }
  },


  methods: {
    //点击下拉框事件
    async itemChange() {
      //value为公司的id
      let id = this.value;
      let formData = new FormData()
      formData.append("companyId", id)
      formData.append("userId", sessionStorage.getItem("userId"))
      console.log(sessionStorage.getItem("userId"))
      let {data: res} = await this.$http.post("/api/user/findByCompanyId", formData);
      console.log(res);
      this.tableData = res.data;
      this.companyId = id;
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
            formData.append("id", row.id);
            console.log(row.id);
            let {data: res} = await _this.$http.post(
                "/api/user/deleteById",
                formData
            );
            if (res.code === 200) {
              _this.$message({
                message: res.msg,
                type: "success"
              });
              _this.getCompanyList();
              _this.itemChange();
            } else {
              _this.$message({
                message: res.msg,
                type: "error"
              });
            }
          });
    },
    //编辑按钮
    editRow(row) {
      this.isEdit = true;
      this.dialogTitle = '修改用户平台'
      this.visible = true;
      console.log(row);
      this.addCompanyForm.username = row.username;
      this.addCompanyForm.loginName = row.loginName
      this.addCompanyForm.mobile = row.mobile
      this.addCompanyForm.email = row.email
      this.addCompanyForm.id = row.id;
      this.valueRole = row.role;
    },
    /*点击新建按钮*/
    openAddCompany() {
      this.isEdit = false;
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
        console.log(_this.valueRole);
        this.editUser()
      }
      _this.visible = false;


    },

    //编辑用户
    async editUser() {
      let parm = {
        username: this.addCompanyForm.username,
        loginName: this.addCompanyForm.loginName,
        mobile: this.addCompanyForm.mobile,
        email: this.addCompanyForm.email,
        role: this.valueRole,
        companyId: this.companyId,
        id: this.addCompanyForm.id
      };
      console.log(parm);
      let {data: resAdd} = await this.$http.post("api/user/update", parm);
      console.log(resAdd);
      if (resAdd.code === 200) {
        //信息提示
        this.$message({
          message: resAdd.msg,
          type: 'success'
        });
        this.itemChange();
      } else {
        this.$message({
          message: resAdd.msg,
          type: "error"
        });
      }
    },

    //添加用户
    async addUser() {
      let parm = {
        username: this.addCompanyForm.username,
        password: this.addCompanyForm.password,
        loginName: this.addCompanyForm.loginName,
        mobile: this.addCompanyForm.mobile,
        email: this.addCompanyForm.email,
        companyId: this.companyId,
        role: this.valueRole
      }
      let {data: resAdd} = await this.$http.post("api/user/addUser", parm);
      if (resAdd.code === 200) {
        //信息提示
        this.$message({
          message: resAdd.msg,
          type: 'success'
        });
        this.itemChange();

      } else {
        this.$message({
          message: resAdd.msg,
          type: "error"
        });
      }
    },
    //查询公司
    async selectByCompanyName() {
      let _this = this;
      let companyName = this.companyForm.companyName;
      let formData = new FormData()
      formData.append('companyName', companyName)
      let {data: res} = await _this.$http.post("api/company/findByCompanyName", formData);
      _this.tableData = [];
      if (res.data !== null) {
        _this.tableData[0] = res.data;
      }
    },

    //获取公司列表
    async getCompanyList() {
      if (sessionStorage.getItem("role") === 'SYS_ADMIN') {
        let {data: res} = await this.$http.post('api/company/findAll');
        this.options = res.data
        console.log(res);
      } else {
        let formData = new FormData();
        formData.append("userId",sessionStorage.getItem("userId"))
        let {data: res} = await this.$http.post('api/company/findByUserId',formData);
        console.log(res);
        this.options = res.data
        console.log(this.options)
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