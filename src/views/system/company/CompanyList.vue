<template>
  <el-main>
    <!--新增dialog-->
    <el-dialog
        :title="dialogTitle"
        :visible.sync="visible"
        width="40%"
    >
      <el-form :rules="rules" ref="addCompany" :model="addCompanyForm" :inline="true">
        <el-form-item prop="companyName" label="公司名">
          <el-input size="" v-model="addCompanyForm.companyName" width="42%" placeholder="请输入公司名"></el-input>
        </el-form-item>
        <el-form-item prop="des" label="描述">
          <el-input size="" v-model="addCompanyForm.des" placeholder="请输入描述"></el-input>
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
            <el-input size="" v-model="companyForm.companyName" placeholder="请输入公司名"></el-input>
          </el-form-item>
        </el-col>
        <el-button class="btn-left" type="primary" size="" icon="el-icon-search" @click="selectByCompanyName">查询
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
          prop="companyName"
          label="公司名称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="des"
          label="描述"
          width="180">
      </el-table-column>
      <el-table-column
          prop="adminUserName"
          label="管理员">
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button
              @click.native.prevent="editRow(scope.row)" type="primary"
              size="mini">编辑
          </el-button>
          <el-button
              @click.native.prevent="deleteRow(cc)" type="danger"
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
  status:0,
  data() {
    return {
      /*表单验证*/
      rules: {
        companyName: [
          {
            required: true,
            trigger: 'change',
            message: '请输入公司名称'
          },
        ],
        des: [
          {
            required: true,
            trigger: 'change',
            message: '请选择平台管理员'
          }
        ]

      },
      //添加公司的数据
      addCompanyForm: {
        id:'',
        companyName: '',
        des: ''
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
            let formData=new FormData
            formData.append("companyId", row.id);
            console.log(row.id);
            let { data: res } = await _this.$http.post(
                "/api/company/deleteById",
                formData
            );
            if (res.code === 200) {
              _this.$message({
                message: res.msg,
                type: "success"
              });
              _this.getCompanyList();
            }else{
              _this.$message({
                message: res.msg,
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
      this.addCompanyForm.companyName = row.companyName;
      this.addCompanyForm.des=row.des
      this.addCompanyForm.id = row.id;
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
    /*添加公司的确定事件*/
    confirmBtn() {
      let _this = this;

      _this.$refs.addCompany.validate(valid => {
        if (valid) {
          if (this.status === 0) {
            let parm = {
              companyName: _this.addCompanyForm.companyName,
              des: _this.addCompanyForm.companyName
            }
            let {data: resAdd} =  _this.$http.post("api/company/insert", parm);
            _this.getCompanyList();
            if (resAdd.code === 200) {
              //信息提示
              _this.$message({
                message: resAdd.msg,
                type: 'success'
              })
            }
          /*当为更新表单时*/
          }else if (this.status === 1) {
            let parm = {
              id:_this.addCompanyForm.id,
              companyName: _this.addCompanyForm.companyName,
              des: _this.addCompanyForm.des
            }

             let {data: resAdd} =_this.$http.post("api/company/update", parm);
            _this.getCompanyList();
            console.log(resAdd)
    /*        if (resAdd.code === 200) {
              //信息提示
              _this.$message({
                message: resAdd.msg,
                type: 'success'
              })
            }*/
          }
          }
        _this.visible = false;


      });

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

    async getCompanyList() {
      let _this = this;
      let {data: res} = await _this.$http.post("api/company/findAll");
      console.log(res);
      _this.tableData = res.data;
      console.log(_this.tableData);
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