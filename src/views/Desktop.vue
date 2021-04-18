<template>

  <el-table
      :data="tableData"
      style="width: 100%">
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
    <el-table-column
        prop="companyName"
        label="公司名称">
    </el-table-column>
    <el-table-column
        prop="ip"
        label="ip地址">
    </el-table-column>
  </el-table>
</template>
<style scoped>
</style>
<script>
export default {
  data() {
    return {
      tableData: [{
        username: '',
        loginName: '',
        mobile: '',
        email: '',
        role: '',
        companyName: '',
        ip: localStorage.getItem("Ip")
      }]
    }
  },
  async mounted() {
    let _this = this;
    let formData = new FormData()
    formData.append('id',sessionStorage.getItem('userId'));
    let {data: res} = await _this.$http.post("/api/user/findById",formData);
    console.log(res);
    this.tableData[0].username = res.data.username;
    this.tableData[0].loginName = res.data.loginName;
    this.tableData[0].mobile = res.data.mobile;
    this.tableData[0].email = res.data.email;
    this.tableData[0].role = res.data.role;
    if (res.data.companyId === null) {
      this.tableData[0].companyName = "系统管理员";
    } else {
      this.tableData[0].companyName = res.data.company.companyName;
    }

  }
}
</script>