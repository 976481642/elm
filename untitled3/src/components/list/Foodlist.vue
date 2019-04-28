<template>
  <div>
    <el-table :data="tableData5" style="width: 100%" >
      <el-table-column type="expand">
        <template slot-scope="props">


          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="食品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="餐馆名称">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="食品 ID">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            <el-form-item label="餐馆 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="食品介绍">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="餐馆地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="食品评分">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
            <el-form-item label="视频分类">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="月销量">
              <span>{{ props.row.address }}</span>
            </el-form-item>
          </el-form>


        </template>
      </el-table-column>


      <el-table-column
        label="食品名称"
        prop="name"
      >
      </el-table-column>


      <el-table-column
        label="食品介绍"
        prop="name">
      </el-table-column>


      <el-table-column
        label="评分"
        prop="rating">
      </el-table-column>


      <el-table-column label="操作">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除
        </el-button>
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
        :total="1029">
      </el-pagination>
    </div>
  </div>
</template>

<script>
	export default {
		name: "Foodlist",
    data() {
      return {
        data:[],
        tableData5: [],
        currentPage1: 1,
      }
    },
    mounted() {
      this.axios.get("https://elm.cangdu.org/shopping/v2/foods?offset=0&limit=20&restaurant_id=undefined").then((res)=>{
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
        console.log((val-1) * 20);
        this.axios.get("https://elm.cangdu.org/shopping/v2/foods?offset=0"+((val-1)*20)+"&limit=20&restaurant_id=undefined").then((res)=>{
          if(res){
            this.tableData5=res.data;
            console.log(this.tableData5);
          }
        })
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
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
