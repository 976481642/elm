<template>
  <div>
    <el-table :data="tableData5" :date="list" :date1="list1" style="width: 100%" @expand-change="Open">
        <el-table-column  type="expand" >
          <template slot-scope="props" >
            <el-form label-position="left" inline class="demo-table-expand" >
              <el-form-item label="食品名称">
                <span>{{ props.row.name}}</span>
              </el-form-item>
              <el-form-item label="餐馆名称">
                <span>{{ list.name}}</span>
              </el-form-item>
              <el-form-item label="食品 ID">
                <span>{{ props.row.item_id }}</span>
              </el-form-item>
              <el-form-item label="餐馆 ID">
                <span>{{ props.row.restaurant_id }}</span>
              </el-form-item>
              <el-form-item label="食品介绍">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="餐馆地址">
                <span>{{ list.address }}</span>
              </el-form-item>
              <el-form-item label="食品评分">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="食品分类">
                <span>{{ list1.name }}</span>
              </el-form-item>
              <el-form-item label="月销量">
                <span>{{ props.row.month_sales }}</span>
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
        <template slot-scope="scope">

          <el-button type="text" size="mini" @click="handleEdit(scope.$index, scope.row)" >编辑</el-button>

          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <div class="change">

              <div>
                <span>食品名称</span><el-input v-model="aname" placeholder="请输入内容"></el-input>
                <span>食品介绍</span><el-input v-model="jieshao" placeholder="请输入内容"></el-input>
              </div>

              <div>
                <span>食品分类</span><el-select v-model="value" placeholder="请选择">
                  <el-option

                    v-for="item in options"
                    :key="item.value"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </div>

              <div>
                <span>食品图片</span>
                <!--<el-upload-->
                  <!--class="avatar-uploader"-->
                  <!--action="https://elm.cangdu.org/v1/addimg/food"-->
                  <!--:show-file-list="false"-->
                  <!--:on-success="handleAvatarSuccess"-->
                  <!--:before-upload="beforeAvatarUpload">-->
                  <!--<img v-if="imageUrl" :src="'https://elm.cangdu.org/img/'+imageUrl" class="avatar">-->
                  <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                <!--</el-upload>-->
                <el-upload
                  class="avatar-uploader"
                  action="https://elm.cangdu.org/v1/addimg/food"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>

              <div>
                <el-table
                  :data="tableData"
                  stripe
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label="规格"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="包装费"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="价格">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="操作">
                  </el-table-column>
                </el-table>
              </div>


            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <span @click="sure"><el-button type="primary" @click="dialogVisible=false">确 定</el-button></span>
  </span>
          </el-dialog>



        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除
        </el-button>
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
        dialogVisible: false,
        date1:[],
        list1:[],
        date:[],
        list:[],
        data:[],
        tableData5: [],
        currentPage1: 1,
        //对话框的表格
        tableData: [{
        }],
        //对话框
        options: [],
        value: '',
        name:'',
        jieshao:'',
        imageUrl: '',
        imageUrl1: '',
        //对话框内容
        adata:[],
        aname:"",
        alist:'',
        aindex:''
      }
    },

    mounted() {
      this.axios.get("https://elm.cangdu.org/shopping/v2/foods?offset=0&limit=20&restaurant_id=undefined").then((res)=>{
        if(res){
          this.tableData5=res.data;
        }
      });
        this.axios.defaults.withCredentials=true;
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.axios.get("https://elm.cangdu.org/shopping/v2/foods?offset=0"+((val-1)*20)+"&limit=20&restaurant_id=undefined").then((res)=>{
          if(res){
            this.tableData5=res.data;
          }
        })
      },

      handleDelete(index, row) {
        console.log(index, row);
      },
      handleEdit(index, row) {
        this.aindex=index;
        this.alist=row;
        this.aname=row.name;
        this.dialogVisible=true;
        this.axios.get("https://elm.cangdu.org/shopping/restaurant/"+row.restaurant_id).then((res)=>{
          if(res){
            console.log(res.data);
            this.adata=res.data;
            this.imageUrl="https://elm.cangdu.org/img/"+res.data.image_path;
          }
        });
        this.axios.get("https://elm.cangdu.org/shopping/v2/menu?restaurant_id="+row.restaurant_id+"&allMenu=true").then((res)=>{
          if(res){
            // console.log(res.data);
            this.options=res.data;
          }
        })
      },
      Open(row){
        this.axios.get("https://elm.cangdu.org/shopping/restaurant/"+row.restaurant_id).then((res)=>{
          if(res){
            this.list=res.data;
          }
        });
        this.axios.get("https://elm.cangdu.org/shopping/v2/menu/"+row.category_id).then((res)=>{
          if(res){
            this.list1=res.data;
          }
        })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl1=file.name;
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      sure(){
        // console.log(this.adata);
        // console.log(this.options);
        // console.log(this.alist);
        let data={
          category_id:this.alist.category_id,
          category_name: this.options.name,
          description: this.alist.description,
          image_path: this.imageUrl,
          index: this.aindex,
          item_id: this.alist.item_id,
          month_sales: this.alist.month_sales,
          name: this.aname,
          new_category_id: this.alist.item_id,
          rating: this.alist.rating,
          restaurant_address: this.adata.restaurant_address,
          restaurant_id: this.adata.id,
          restaurant_name: this.adata.name,
          specfoods:[{
              checkout_mode: this.alist.specfoods[0].checkout_mode,
              food_id: this.alist.specfoods[0].food_id,
              is_essential: this.alist.specfoods[0].is_essential,
              item_id: this.alist.specfoods[0].item_id,
              name: this.aname,
              original_price: this.alist.specfoods[0].original_price,
              packing_fee:this.alist.specfoods[0].packing_fee,
              pinyin_name: this.alist.specfoods[0].pinyin_name,
              price: this.alist.specfoods[0].price,
              promotion_stock:  this.alist.specfoods[0].promotion_stock,
              recent_popularity: this.alist.specfoods[0].recent_popularity,
              recent_rating: this.alist.specfoods[0].recent_rating,
              restaurant_id: this.alist.specfoods[0].restaurant_id,
              sku_id: this.alist.specfoods[0].sku_id,
              sold_out: this.alist.specfoods[0].sold_out,
              specs: [],
              specs_name: this.alist.specfoods[0].specs_name,
              stock: this.alist.specfoods[0].stock,
              _id: this.alist.specfoods[0]._id
            }],
          specs:[{
            packing_fee: 0,
            price: 18,
            specs: "默认",
          }]
        };
        console.log(this.imageUrl);
        this.axios.post("https://elm.cangdu.org/shopping/v2/updatefood",data).then((res)=>{
         if(res){
           console.log(res);
         }
       });
      },

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
  .avatar-uploader{
    width: 178px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
