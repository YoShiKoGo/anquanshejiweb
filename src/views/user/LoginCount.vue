<template>
  <el-main>

    <template>
      <el-carousel :interval="4000" type="card" height="150px">
        <el-carousel-item v-for="item in showTable" :key="item">
          <h3 class="medium" >{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </template>

    <!--搜索框  -->
<!--    <el-form size="mine"  label-width="80px">-->
<!--      <el-row>-->
<!--        <el-col :span="6">-->
<!--          <el-form-item label="日期区间">-->
<!--            <div class="block">-->
<!--              <el-date-picker-->
<!--                  v-model="value"-->
<!--                  type="daterange"-->
<!--                  align="right"-->
<!--                  unlink-panels-->
<!--                  range-separator="至"-->
<!--                  start-placeholder="开始日期"-->
<!--                  end-placeholder="结束日期"-->
<!--                  :picker-options="pickerOptions">-->
<!--              </el-date-picker>-->
<!--            </div>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-button class="btn-left" @click="search" type="primary" size="" icon="el-icon-search">查询</el-button>-->

<!--      </el-row>-->
<!--    </el-form>-->





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
          width="180">
      </el-table-column>
      <el-table-column
          prop="role"
          label="用户角色">
      </el-table-column>
      <el-table-column
          prop="dayCount"
          label="当日登录次数"
          width="180">
      </el-table-column>
      <el-table-column
          prop="month"
          label="当月登录次数"
          width="180">
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
      tableData: [],
      showTable:[]
    }
  },
  async mounted() {
    this.search();
  },
  methods:{
    async search() {
      console.log(this.value);
      //let formData=new FormData()
      //formData.append("beginTime",this.value[0])
     // formData.append("endTime",this.value[1])
      let {data: res} = await this.$http.post("api/admin/getUserStats");
      console.log(res);
      this.tableData = res.resObj.userStatsList;
      this.showTable[0] = "系统当前在线人数"+res.resObj.onlineCount;
      this.showTable[1] = "系统当日登陆人数"+res.resObj.sysDayCount;
      this.showTable[2] = "系统当月登陆人数"+res.resObj.sysMouthCount;
    }
  }
}
</script>

<style scoped>
.btn-left {
  margin-left: 200px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align:center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>