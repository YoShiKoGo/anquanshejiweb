<template>
<el-main>
  <!--dialog-->
  <el-dialog
      :title="dialogTitle"
      :visible.sync="visible"
      width="40%"
      :before-close="handleClose">
    <el-form :rules="rules" ref="addCompany" :model="addCompanyForm" :inline="true">
      <el-form-item prop="companyName" label="公司名">
      <el-input size="" v-model="addCompanyForm.companyName" width="42%" placeholder="请输入公司名"></el-input>
      </el-form-item>
      <el-form-item prop="companyAdmin" label="平台管理员">
      <el-input size="" v-model="addCompanyForm.companyAdmin" placeholder="请选择平台管理员"></el-input>
      </el-form-item>
    </el-form>
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="visible = false">取 消</el-button>
    <el-button type="primary" @click="confirmBtn()">确 定</el-button>
  </span>
  </el-dialog>

<!--搜索框  -->
  <el-form size="mine" :model="companyForm" label-width="80px" >
    <el-row>
      <el-col :span="6">
        <el-form-item label="公司名称">
          <el-input size="" v-model="companyForm.companyName" placeholder="请输入公司名"></el-input>
        </el-form-item>
      </el-col>
      <el-button class="btn-left" type="primary" size="" icon="el-icon-search" >查询</el-button>
      <el-button @click="openAddCompany" type="primary" size="" icon="el-icon-plus" >新增</el-button>
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
      height="tableHeight"
      border
      style="width: 100%" size="">
    <el-table-column
        prop="date"
        label="日期"
        width="180">
    </el-table-column>
    <el-table-column
        prop="name"
        label="姓名"
        width="180">
    </el-table-column>
    <el-table-column
        prop="address"
        label="地址">
    </el-table-column>
    <el-table-column label="操作" width="160" align="center">
      <template slot-scope="scope">
        <el-button
            @click.native.prevent="editRow(scope.$index, tableData)" type="primary"
            size="mini" >编辑
        </el-button>
        <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)" type="danger"
            size="mini" >删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</el-main>


</template>

<script>
export default {
  name: "company",
  data(){
    return{
      /*表单验证*/
      rules:{
        companyName:[
          {
            required: true,
            trigger:'change',
            message:'请输入公司名称'
          },
        ],
          companyAdmin:[
      {
        required: true,
        trigger:'change',
        message:'请选择平台管理员'
      }
    ]

      },
      //添加公司的数据
      addCompanyForm:{
        companyName: '',
        companyAdmin:''
      },
      //对话框标题
      dialogTitle:'',
      //对话框显示状态
      visible:false,
      companyForm:{
        companyName:''
      },
      tableHeight:window.innerHeight,
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  methods:{
    //删除按钮
    deleteRow(index,row){
      console.log(index, row);
    },
//编辑按钮
    editRow(index,row){
      console.log(index, row);

    },
    /*新增公司*/
    openAddCompany() {
      this.resetForm("addCompany")
      this.dialogTitle='添加公司平台'
      this.visible = true;
    },

    /*清除打开的提示框内容*/
    resetForm(formName){
      if(this.$refs[formName]){
        this.$refs[formName].resetFields();
    }
    },
    /*添加公司的确定事件*/
    confirmBtn() {
      let _this = this;

      _this.$refs.addCompany.validate(valid=>{
        if (valid) {
          _this.visible = false;
        }
      })

    }

  }
}
</script>

<style scoped>
.btn-left {
  margin-left: 20px;
}
.el-main{
  padding-top: 5px !important;
}
</style>