<template>
  <el-main>

    <!--搜索框  -->
    <el-form size="mine" :model="companyForm" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="日期区间">
            <div class="block">
              <el-date-picker
                  v-model="value"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-button class="btn-left" @click="search" type="primary" size="" icon="el-icon-search">查询</el-button>

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
          label="登录次数"
          width="180">
      </el-table-column>
      <el-table-column
          prop="role"
          label="用户角色">
      </el-table-column>
    </el-table>
  </el-main>
</template>


<script>
export default {
  name: "LoginCount",
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value: '',
      tableHeight: window.innerHeight - 250,
    };
  },
  methods:{
    async search() {
      console.log(this.value);
      let formData=new FormData()
      formData.append("data",this.value[0])
      let {data: res} = await this.$http.post("api/loginCount/test",formData);
      console.log(res);
    }
  }
}
</script>

<style scoped>
.btn-left {
  margin-left: 200px;
}
</style>