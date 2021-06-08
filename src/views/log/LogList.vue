<template>
  <div>
  <el-table
      :data="tableData"

      border
      style="width: 98%" size="" >
    <el-table-column
        prop="account"
        label="操作人"
        width="180">
    </el-table-column>
    <el-table-column
        prop="role"
        label="用户级别"
        width="180">
    </el-table-column>
    <el-table-column
        prop="dateStr"
        label="操作时间"
        width="180">
    </el-table-column>

    <el-table-column
        prop="logContent"
        label="操作内容"
        >
    </el-table-column>
  </el-table>
    <div class="block" style="margin-top: 13px">
      <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalSize">
      </el-pagination>
    </div>
  </div>
</template>


<script>
export default {
  name: "LogList",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      totalSize: 1,
    }
  },
  mounted() {
    this.findAll();
  },
  methods: {
    async findAll() {
      let {data: res} = await this.$http.post("api/admin/getTotalUserLog");
      console.log(res);
      let formData = new FormData
      formData.append("pageSize", this.pageSize);
      formData.append("currentPage", this.currentPage);
      let {data: ress} = await this.$http.post("api/admin/getUserLog",formData);
      this.tableData=ress.resObj;
      this.totalSize=res.resObj;

    },
    async handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;//每次改变每页多少条都会重置当前页码为1
      let formData = new FormData
      formData.append("pageSize", this.pageSize);
      formData.append("currentPage", this.currentPage);
      let {data: res} = await this.$http.post("api/admin/getUserLog",formData);
      this.tableData=res.resObj;
      console.log(res);
      console.log(`每页 ${val} 条`);
    },
    async handleCurrentChange(val) {
      this.currentPage = val;
      let formData = new FormData
      formData.append("pageSize", this.pageSize);
      formData.append("currentPage", this.currentPage);
      let {data: res} = await this.$http.post("api/admin/getUserLog",formData);
      this.tableData=res.resObj;
      console.log(res);
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style scoped>

</style>