<template>
<div class="content3">
  <el-table
    :data="tableData"
    stripe
    border
    style="width: 100%">
    <el-table-column
      prop="user_name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="create_time"
      label="注册日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="city"
      label="地址">
    </el-table-column>
    <el-table-column
      prop="admin"
      label="权限">
    </el-table-column>
  </el-table>
  <div class="block">
    <span class="demonstration">显示总数</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="37860">
    </el-pagination>
  </div>
</div>
</template>

<script>
	export default {
		name: "Adminlist",
    data() {
      return {
        tableData: [],
        currentPage1: 1,
      }
    },
    mounted() {
		  this.axios.get("https://elm.cangdu.org/admin/all?offset=0&limit=20").then((res)=>{
        console.log(res.data.data);
        this.tableData=res.data.data
      })
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.axios.get("https://elm.cangdu.org/admin/all?offset="+((val-1)*20)+"&limit=20").then((res)=>{
          console.log(res.data.data);
          this.tableData=res.data.data
        })
      }
    }
  }
</script>

<style scoped lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
  .content3{
    padding:40px;
  }
</style>
