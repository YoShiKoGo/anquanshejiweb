<template>
  <el-main>
    <!--新增dialog-->
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        width="40%"
    >
      <el-form :rules="rules" ref="addCompany" :model="addCompanyForm" :inline="true">
        <el-form-item prop="platformName" label="平台名">
          <el-input size="" v-model="addCompanyForm.platformName" width="42%" placeholder="请输入平台名"></el-input>
        </el-form-item>
        <el-form-item prop="platformCode" label="平台代码">
          <el-input size="" v-model="addCompanyForm.platformCode" placeholder="平台代码"></el-input>
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
            <el-input size="" v-model="companyForm.platformName" placeholder="请输入公司名"></el-input>
          </el-form-item>
        </el-col>
        <el-button class="btn-left" type="primary" size="" icon="el-icon-search" @click="selectByplatformName">查询
        </el-button>
        <el-button @click="openAddCompany" type="primary" size="" icon="el-icon-plus">新增</el-button>
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
          prop="platformName"
          label="平台名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="platformCode"
          label="平台代码"
          width="180">
      </el-table-column>
      <el-table-column
          prop="manage"
          label="管理员"
          width="180">
      </el-table-column>
      <el-table-column
          prop="operatorCount"
          label="平台下人员数"
          width="180">
      </el-table-column>
      <el-table-column
          prop="create_time"
          label="平台创建时间">
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
export default {
  name: "company",
  status: 0,
  data() {
    return {
      /*表单验证*/
      rules: {
        platformName: [
          {
            required: true,
            trigger: 'change',
            message: '请输入公司名称'
          },
        ],
        platformCode: [
          {
            required: true,
            trigger: 'change',
            message: '请输入平台代码'
          }
        ]

      },
      //添加公司的数据
      addCompanyForm: {
        _id: '',
        platformName: '',
        platformCode: ''
      },
      //编辑公司的数据
      editCompanyForm: {
        platformName: '',
        platformCode: ''
      },
      //对话框标题
      dialogTitle: '',
      //对话框显示状态
      visible: false,
      companyForm: {
        platformName: ''
      },
      tableHeight: window.innerHeight - 250,
      tableData: []
    }
  },
  methods: {
    //删除按钮
    deleteRow(row) {
      let _this = this;
      _this.$confirm("确定删除吗？", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "waring"
      })
          .then(async () => {
            /*let parm = {
              companyId: row.id
            };*/
            let formData = new FormData
            formData.append("_id", row._id);
            console.log(row._id);
            let {data: res} = await _this.$http.post(
                "/api/company/delPlatform",
                formData
            );
            console.log(res);
            if (res.resCode ==="1000") {
              this.getCompanyList();
              _this.$message({
                message: res.resMsg,
                type: "success"
              });
            } else {
              this.getCompanyList();
              _this.$message({
                message: res.resMsg,
                type: "error"
              });
            }
          });
    },
    //编辑按钮
    editRow(row) {
      this.status = 1;
      this.dialogTitle = '修改公司平台'
      this.visible = true;
      this.addCompanyForm.platformName = row.platformName;
      this.addCompanyForm.platformCode = row.platformCode
      this.addCompanyForm._id = row._id;
    },
    /*新增公司*/
    openAddCompany() {
      this.status = 0
      this.resetForm("addCompany")
      this.dialogTitle = '添加公司平台'
      this.visible = true;
    },

    /*清除打开的提示框内容*/
    resetForm(formName) {
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields();
      }
    },
    async addCompany() {
      let _this = this;

      let platform = {
        platformName: _this.addCompanyForm.platformName,
        platformCode: _this.addCompanyForm.platformCode
      }
      //console.log(platform)
      let {data: resAdd} = await _this.$http.post("api/company/addPlatform", platform);
      _this.getCompanyList();
      //console.log(resAdd)
      if (resAdd.resCode === "1000") {
        //信息提示
        _this.$message({
          message: resAdd.resMsg,
          type: 'success'
        })
      }else {
        this.$message({
          message: resAdd.resMsg,
          type: "error"
        });
      }
    },

    async editCompany() {
      let _this = this;

      let platform = {
        _id: _this.addCompanyForm._id,
        platformName: _this.addCompanyForm.platformName,
        platformCode: _this.addCompanyForm.platformCode
      }
      //console.log(platform)
      let {data: resAdd} = await _this.$http.post("api/company/modifyPlatform", platform);
      _this.getCompanyList();
      //console.log(resAdd)
      if (resAdd.resCode === "1000") {
        //信息提示
        _this.$message({
          message: resAdd.resMsg,
          type: 'success'
        })
      } else {
        this.$message({
          message: resAdd.resMsg,
          type: "error"
        });
      }
    },

    /*添加公司的确定事件*/
    confirmBtn() {
      let _this = this;

      _this.$refs.addCompany.validate(valid => {
        if (valid) {
          if (this.status === 0) {
            this.addCompany()
            /*当为更新表单时*/
          } else if (this.status === 1) {
            this.editCompany();
          }
        }
        _this.visible = false;


      });

    },
    //查询平台
    async selectByplatformName() {
      let _this = this;
      let platformName = this.companyForm.platformName;
      let formData = new FormData()
      formData.append('platformName', platformName)
      console.log(platformName);
        let {data: res} = await _this.$http.post("api/company/findByPlatformName", formData);
        _this.tableData = [];
        console.log("通过名字查找",res);
        if (res.resObj !== null) {
          _this.tableData = res.resObj;
        }
    },

    async getCompanyList() {
      let _this = this;
      let {data: res} = await _this.$http.post("api/company/findAll");
      _this.tableData = res.resObj;
      console.log("查询平台",_this.tableData);
    }

  },

  mounted() {
    this.getCompanyList();

  },

}
</script>

<style scoped>
.btn-left {
  margin-left: 20px;
}

.el-main {
  padding-top: 5px !important;
}
</style>