<template>
<div class="box1">
  <div class="content1">
    <el-table :data="tableData" style="width: 100%; height: 100%">
      <el-table-column type="index" :index="indexMethod"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
    <div class="block">
      <span class="demonstration">显示总数</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="20"
        layout="total, prev, pager, next"
        :total="26465">
      </el-pagination>
    </div>
  </div>
</template>

<script>
	export default {
		name: "Userlist",
    data(){
		  return{
        data:[],
        tableData: [],
        currentPage1: 1,
        num:0

      }
    },
    mounted() {
		  this.axios.get("https://elm.cangdu.org/v1/users/list?offset=0&limit=20").then((res)=>{
		    if(res){
          this.data=res.data;
          console.log(this.data);
          for(let i=0;i<this.data.length;i++){
            let obj={};
            obj.date=this.data[i].registe_time;
            obj.name=this.data[i].username;
            obj.address=this.data[i].city;
            this.tableData.push(obj);
            console.log(this.tableData);
          }
        }
      });

    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        if(val===1){
          val=1;
        }
        let a=20;
        let sum=(val-1)*a;
        console.log(sum);
        this.num=sum;
        this.axios.get("https://elm.cangdu.org/v1/users/list?offset="+this.num+"&limit=20").then((res)=>{
          if(res){
            this.data=res.data;
            this.tableData=[];
            for(let i=0;i<this.data.length;i++){
              let obj={};
              obj.id=[i];
              obj.date=this.data[i].registe_time;
              obj.name=this.data[i].username;
              obj.address=this.data[i].city;
              this.tableData.push(obj);
            }
          }
        });
      },
      indexMethod(index) {
        return index + 1;
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
.box1{
  padding: 20px;
}
  .content1{
  width: 100%;
  }
  .block{
    margin-top: 20px;
    margin-left: 20px;
  }
</style>
