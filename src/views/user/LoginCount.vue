<template>
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
            @click.native.prevent="deleteRow(scope.row)" type="danger"
            size="mini">删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "LoginCount"
}
</script>

<style scoped>

</style>