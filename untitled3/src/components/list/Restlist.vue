<template>
<div>
  <el-table
    :data="tableData5"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="店铺名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="店铺介绍">
            <span>{{ props.row.description }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="联系电话">
            <span>{{ props.row.phone }}</span>
          </el-form-item>
          <el-form-item label="评分">
            <span>{{ props.row.rating }}</span>
          </el-form-item>
          <el-form-item label="销售量">
            <span>{{ props.row.rating_count }}</span>
          </el-form-item>
          <el-form-item label="分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="商品 ID"
      prop="name">
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="address">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="descrption">
    </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            @click="handleEdit1(scope.$index, scope.row)">添加商品</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
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
      :total="1000">
    </el-pagination>
  </div>
</div>
</template>

<script>
	export default {
		name: "Restlist",
    data() {
      return {
        data:[],
        tableData5: [],
        currentPage1: 1,
      }
    },
    mounted() {
		  this.axios.get("https://elm.cangdu.org/shopping/restaurants?latitude=39.90469&longitude=116.407173&offset=0&limit=20").then((res)=>{
		    if(res){
          this.tableData5=res.data;
          console.log(this.tableData5);
        }
      })
		},
		methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.axios.get("https://elm.cangdu.org/shopping/restaurants?latitude=39.90469&longitude=116.407173&offset="+((val-1)*20)+"&limit=20").then((res)=>{
          if(res){
            this.tableData5=res.data;
            console.log(this.tableData5);
          }
        })
      },
      handleEdit1(index,row){
        console.log(index, row);
        console.log(this.tableData5[index].id);
        this.$router.push({name:"addfood",query:{id:this.tableData5[index].id}})
      }
    }
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item{
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
