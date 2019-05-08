<template>
  <div class="content2">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="用户名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="店铺名称">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="收货地址">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="订单 ID"
        prop="id">
      </el-table-column>
      <el-table-column
        label="总价格"
        prop="total_amount">
      </el-table-column>
      <el-table-column
        label="支付状态"
        prop="status_bar.title">
      </el-table-column>
    </el-table>

    <div class="block">
      <span class="demonstration">显示总数</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="20"
        layout="total, prev, pager, next"
        :total="9364">
      </el-pagination>
    </div>
  </div>
</template>

<script>
	export default {
		name: "Orderlist",
    data() {
      return {
        tableData: [],
        currentPage1: 1,
      }
    },
    mounted() {
		  this.axios.get("https://elm.cangdu.org/bos/orders?offset=0&limit=20&restaurant_id=undefined").then((res)=>{
		    if(res){
          console.log(res.data);
          this.tableData=res.data
        }
      })
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.axios.get("https://elm.cangdu.org/bos/orders?offset="+((val-1)*20)+"&limit=20&restaurant_id=undefined").then((res)=>{
          this.tableData=res.data
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
  .content2{
padding: 60px;
}

</style>
