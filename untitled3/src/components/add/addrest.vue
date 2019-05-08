<template>
    <div>
      <div class="header">

      </div>
      <div class="content5">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="店铺名称"  class="inp">
            <el-input v-model="formLabelAlign.name" ></el-input>
          </el-form-item>
          <div class="add">
            <span>详细地址</span>
            <el-select
              v-model="value"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.address"
                :value="item.address">
              </el-option>
            </el-select>
            <p>当前城市：{{cityid.name}}</p>
          </div>
          <el-form-item label="联系电话"   class="inp">
            <el-input v-model="formLabelAlign.type" ></el-input>
          </el-form-item>
          <el-form-item label="店铺介绍"   class="inp">
            <el-input v-model="formLabelAlign.info" ></el-input>
          </el-form-item>
          <el-form-item label="店铺标语"   class="inp">
            <el-input v-model="formLabelAlign.title" ></el-input>
          </el-form-item>


          <div class="block">
            <span>店铺分类</span>
            <el-cascader
              :options="list1"
              v-model="selectedOptions"
              @change="handleChange">
            </el-cascader>
          </div>

          <el-form-item label="即时配送" prop="delivery">
            <span>品牌保证<el-switch v-model="ruleForm.delivery"></el-switch></span>
            <span>蜂鸟专送<el-switch v-model="ruleForm.delivery1"></el-switch></span>
            <span>新开店铺<el-switch v-model="ruleForm.delivery2"></el-switch></span>
          </el-form-item>
          <el-form-item  prop="delivery">
            <span>外卖保<el-switch v-model="ruleForm.delivery3"></el-switch></span>
            <span>准时达<el-switch v-model="ruleForm.delivery4"></el-switch></span>
            <span>开发票<el-switch v-model="ruleForm.delivery5"></el-switch></span>
          </el-form-item>
        </el-form>
        <p class="inp1"><span >配送费</span><el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number></p>
        <p class="inp1"><span >起送价</span><el-input-number v-model="num2" @change="handleChange" :min="1"  label="描述文字"></el-input-number></p>
        <p class="time">
          <span>营业时间</span>
          <span><el-time-select placeholder="起始时间" v-model="startTime" :picker-options="{ start: '08:30', step: '00:15', end: '18:30' }"></el-time-select></span>
          <span><el-time-select placeholder="结束时间" v-model="endTime" :picker-options="{ start: '08:30',  step: '00:15',  end: '18:30',  minTime: startTime}"></el-time-select></span>
        </p>




        <div class="update">
          <p>
            <span>上传店铺头像</span>
            <el-upload
              class="avatar-uploader"
              action="https://elm.cangdu.org/v1/addimg/shop"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="'https://elm.cangdu.org/img/'+imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </p>

          <p>
            <span>上传营业执照</span>
            <el-upload
              class="avatar-uploader"
              action="https://elm.cangdu.org/v1/addimg/shop"
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
              :before-upload="beforeAvatarUpload1">
              <img v-if="imageUrl1" :src="'https://elm.cangdu.org/img/'+imageUrl1" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </p>


          <p>
            <span>上传餐饮服务许可证</span>
            <el-upload
              class="avatar-uploader"
              action="https://elm.cangdu.org/v1/addimg/shop"
              :show-file-list="false"
              :on-success="handleAvatarSuccess2"
              :before-upload="beforeAvatarUpload2">
              <img v-if="imageUrl2" :src="'https://elm.cangdu.org/img/'+imageUrl2" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </p>
        </div>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="优惠活动" prop="region" class="inp">
          <el-select v-model="ruleForm.region" placeholder="请选择" @change="open">
            <el-option  v-for="(i,index) in ddaa" :key="index" :label="i.nam"  :value="i.nam"></el-option>
          </el-select>
        </el-form-item>
        </el-form>



        <div class="list">
          <el-table
            :data="tableData"
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column
              prop="bt"
              label="活动标题"
              width="180">
            </el-table-column>
            <el-table-column
              prop="nam"
              label="活动名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="xq"
              label="活动详情">
            </el-table-column>
            <el-table-column
              prop="cz"
              label="操作">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </el-table-column>
          </el-table>
        </div>
        <div class="button">
          <el-button type="primary" @click="ok">立即创建</el-button>
        </div>
      </div>
    </div>
</template>

<script>
	export default {
		name: "addrest",
    data() {
      return {
        //下拉
        centerDialogVisible: false,
        data:[],
        //店铺分类
        list1:[],
        selectedOptions: [],
        //详细地址
        cityid:"",
        options: [],
        value: [],
        list: [],
        loading: false,
        states: [],
        //配送时间
        startTime: '',
        endTime: '',
        //配送费默认值
        num1:5,
        num2:20,
        //表格右对齐属性
        labelPosition: 'right',
        //图片上传格式
        imageUrl: '',
        imageUrl1: '',
        imageUrl2: '',
        //最下面的表格
        tableData: [],

        ddaa:[{val:"满",nam:"满减优惠"},{val:"优",nam:"优惠大酬宾"},{val:"新",nam:"新用户立减"},{val:"领",nam:"进店领券"}],


        //
        formLabelAlign: {
          name: '',
          region: '',
          type: '',
          info:'',
          title:'',
        },
        ruleForm: {
          region:'',
          delivery:true,
          delivery1:true,
          delivery2:true,
          delivery3:true,
          delivery4:true,
          delivery5:true,
        },
      };
    },
    beforeMount(){
      this.axios.defaults.withCredentials=true;
    },
    mounted() {
      this.axios.get("https://elm.cangdu.org/shopping/v2/restaurant/category").then((res)=>{
        if(res){
          this.list1=res.data;
          let a=this.list1;
          for(let i in a){
            this.list1[i].label=a[i].name;
            this.list1[i].value=a[i].name;
          }
        }
      });
      this.axios.get("https://elm.cangdu.org/v1/cities?type=guess").then((res)=>{
        if(res){
          this.cityid=res.data;
        }
      });
      this.list = this.states.map(item => {
        return { value: item, label: item };
      });
    },
    methods: {
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleChange(value) {
        console.log(value);
      },
      //上传头像
      handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
        // console.log(res);
        if(res.status==1){
          this.imageUrl=res.image_path
          console.log(this.imageUrl);
        }
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
      handleAvatarSuccess1(res, file) {
        if(res.status==1){
          this.imageUrl1=res.image_path
        }
      },
      beforeAvatarUpload1(file) {
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
      handleAvatarSuccess2(res, file) {
        if(res.status==1){
          this.imageUrl2=res.image_path
        }
      },
      beforeAvatarUpload2(file) {
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
      //详细地址
      remoteMethod(query) {
        this.axios.get("https://elm.cangdu.org/v1/pois?type=search&city_id="+this.cityid.id+"&keyword="+query).then((res)=>{
          if(res){
            console.log(res.data);
            this.options=res.data
          }
        });
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          }, 200);
        } else {
          this.options = [];
        }
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      //对话遮罩层
      open() {
        this.$prompt('请输入活动信息',"提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          console.log(value);
          console.log(this.ruleForm.region);
          if(this.ruleForm.region=="满减优惠"){
             let obj={};
             obj.bt=this.ruleForm.region;
             obj.nam="满";
             obj.xq=value;
            console.log(obj);
            this.tableData.push(obj);
          }else if (this.ruleForm.region=="优惠大酬宾") {
            let obj={};
            obj.bt=this.ruleForm.region;
            obj.nam="优";
            obj.xq=value;
            console.log(obj);
            this.tableData.push(obj);
          }else if(this.ruleForm.region=="新用户立减"){
            let obj={};
            obj.bt=this.ruleForm.region;
            obj.nam="新";
            obj.xq=value;
            console.log(obj);
            this.tableData.push(obj);
          }else {
            let obj={};
            obj.bt=this.ruleForm.region;
            obj.nam="领";
            obj.xq=value;
            console.log(obj);
            this.tableData.push(obj);
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      ok(){
        console.log(this.tableData);
        let obj={
          // activities:[{icon_name: this.tableData[0].nam,name: this.tableData[0].bt,description:"满30减5，满60减8"}],
          // address: "北京市朝阳区建国路18号(珠江绿洲家园内)",
          // bao: true,
          // business_license_image: "16a917acd0b36969.jpg",
          // category: "快餐便当/简餐",
          // catering_service_license_image: "16a917ad93c36970.jpg",
          // delivery_mode: true,
          // description: "123123123",
          // endTime: "23:00",
          // float_delivery_fee: 5,
          // float_minimum_order_amount: 20,
          // image_path: "16a917ab32836968.jpg",
          // is_premium: true,
          // latitude: 39.90783,
          // longitude: 116.55921,
          // name: "仰望星啊",
          // new: true,
          // phone: 132123123,
          // piao: true,
          // promotion_info: "123123",
          // startTime: "05:30",
          // zhun: true
          activities:[{icon_name: this.tableData[0].nam,name: this.tableData[0].bt,description:this.tableData[0].xq}],
          address:this.value,
          bao:true,
          business_license_image:this.imageUrl,
          category:"快餐便当/简餐",
          catering_service_license_image:this.imageUrl1,
          delivery_mode:true,
          description:this.formLabelAlign.info,
          endTime:this.endTime,
          float_delivery_fee:this.num1,
          float_minimum_order_amount:this.num2,
          image_path: this.imageUrl2,
          is_premium: true,
          latitude: 39.90783,
          longitude: 116.55921,
          name: this.formLabelAlign.name,
          new: true,
          phone: this.formLabelAlign.type,
          piao: true,
          promotion_info: this.formLabelAlign.title,
          startTime: this.startTime,
          zhun: true
        };
        this.axios.post("https://elm.cangdu.org/shopping/addShop",obj).then((res)=>{
          if(res){
            console.log(res);
          }
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
  .header{
    width: 100%;
    height: 50px;
    background-color: #eff2f7;
  }

  .content5{

    padding: 20px  200px  20px 200px;
    .inp{
      padding-top: 20px;
    }
    .inp1{
      padding-top: 20px;
      padding-left: 20px;
      font-size: 14px;
      span{
        color: #606266;
        margin-right: 15px;
      }
    }
    .time{
      margin-top: 20px;
      span:nth-of-type(1){
        color: #606266;
        font-size: 14px;
        margin-left: 5px;
        margin-right: 10px;
      }
      span:nth-of-type(2){
        margin-right: 15px;
      }
    }
    .update{
      p{
        margin-top: 20px;
        span{
          float: left;
          font-size: 14px;
          color: #606266;
          margin-left: -20px;
          margin-right:100px;
        }
      }
      p:nth-of-type(3){
        span{
          margin-right: 56px;
        }
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
    }
    .list{
      button{
        width: 50px;
        height: 25px;
      }
      .el-table .warning-row {
        background: oldlace;
      }

      .el-table .success-row {
        background: #f0f9eb;
      }
    }
    .button{
      width: 100%;
      text-align: center;
      button{
        width: 150px;
        height: 35px;
      }
    }
    .add{
      width: 100%;
      margin-top: 10px;
      span{
        font-size: 14px;
        color: #606266;
        margin-left: 10px;
        margin-right: 14px;
      }
      p{
        font-size: 14px;
        margin-left: 90px;
        margin-top: 10px;
        margin-bottom: -10px;
      }
    }
    .block{
      margin-top: 20px;
      span{
        font-size: 14px;
        color: #606266;
        margin-left: 10px;
      }
    }
  }
</style>
