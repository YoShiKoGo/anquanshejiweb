<template>
  <el-table
      :data="tableData"
      :height="tableHeight"
      border
      style="width: 98%" size="" >
    <el-table-column
        prop="opTime"
        label="操作时间"
        width="180">
    </el-table-column>
    <el-table-column
        prop="opUser"
        label="操作人"
        width="180">
    </el-table-column>
    <el-table-column
        prop="action"
        label="执行"
        >
    </el-table-column>
    <el-table-column
        prop="user"
        label="操作对象"
        width="180">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "LogList",
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.findAll();
  },
  methods: {
    async findAll() {
      let {data: res} = await this.$http.post("api/log/findAll");
      console.log(res);
      this.tableData=res.data;
    }
  }
}
</script>

<style scoped>

</style>