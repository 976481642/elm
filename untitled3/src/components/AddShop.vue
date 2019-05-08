<template>
  <div class="addshop">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="店铺名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="详细地址">
        <el-select
          v-model="ruleForm.address"
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="remoteMethod"
          :loading="loading"
        >
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <p>
          当前城市：<span>{{ city.name }}</span>
        </p>
      </el-form-item>

      <el-form-item label="联系电话" prop="phone">
        <el-input v-model.number="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="店铺简介">
        <el-input v-model="ruleForm.about"></el-input>
      </el-form-item>
      <el-form-item label="店铺标语">
        <el-input v-model="ruleForm.slogan"></el-input>
      </el-form-item>
      <el-form-item label="店铺分类">
        <el-cascader
          :options="options"
          v-model="selectedOptions"
          :props="defaultParams"
          change-on-select
          ref="cascaderAddr"
        ></el-cascader>
      </el-form-item>

      <el-form-item label="店铺特点" prop="delivery">
        <span>品牌保证</span><el-switch v-model="ruleForm.pinpai"></el-switch>
        <span>蜂鸟专送</span
        ><el-switch v-model="ruleForm.fengniao"></el-switch>
        <span>新开店铺</span><el-switch v-model="ruleForm.xindian"></el-switch>
      </el-form-item>
      <el-form-item label="" prop="delivery">
        <span>外卖保</span><el-switch v-model="ruleForm.bao"></el-switch>
        <span>准时达</span><el-switch v-model="ruleForm.da"></el-switch>
        <span>开发票</span><el-switch v-model="ruleForm.piao"></el-switch>
      </el-form-item>

      <el-form-item label="配送费" prop="delivery">
        <el-input-number
          v-model="ruleForm.fee"
          @change="handleChange"
          :min="1"
          :max="10"
          label="描述文字"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="起送价" prop="delivery">
        <el-input-number
          v-model="ruleForm.price"
          @change="handleChange"
          :min="1"
          :max="10"
          label="描述文字"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="营业时间" required>
        <el-time-select
          placeholder="起始时间"
          v-model="startTime"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }"
        >
        </el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="endTime"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
            minTime: startTime
          }"
        >
        </el-time-select>
      </el-form-item>
      <!-- 上传头像 -->
      <el-form-item label="上传店铺头像">
        <el-upload
          class="avatar-uploader"
          action="https://elm.cangdu.org/v1/addimg/shop"
          :show-file-list="false"
          :on-success="handleAvatarSuccessa"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="imageUrla"
            :src="'https://elm.cangdu.org/img/' + imageUrla"
            class="avatara"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传营业执照">
        <el-upload
          class="avatar-uploader"
          action="https://elm.cangdu.org/v1/addimg/shop"
          :show-file-list="false"
          :on-success="handleAvatarSuccessb"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="imageUrlb"
            :src="'https://elm.cangdu.org/img/' + imageUrlb"
            class="avatarb"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传餐饮服务许可证">
        <el-upload
          class="avatar-uploader"
          action="https://elm.cangdu.org/v1/addimg/shop"
          :show-file-list="false"
          :on-success="handleAvatarSuccessc"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="imageUrlc"
            :src="'https://elm.cangdu.org/img/' + imageUrlc"
            class="avatarc"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="优惠活动" prop="delivery">
        <el-select v-model="value2" placeholder="请选择" @change="addopen">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-table style="width: 100%" :data="tabledata" height="160px">
        <el-table-column prop="active_title" label="活动标题" width="100">
        </el-table-column>
        <el-table-column prop="active_name" label="活动名称" width="100">
        </el-table-column>
        <el-table-column prop="active_details" label="活动详情">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      // setTimeout(() => {
      //   if (!Number.isInteger(value)) {
      //     callback(new Error("请输入手机号"));
      //   } else {
      //     console.log(value.length)
      //     // if (value.length != 11) {
      //       callback(new Error("手机号码格式不正确"));
      //     // } else {
      //       // callback();
      //     // }
      //   }
      // }, 1000);
    };
    return {
      //底部表格数据
      tabledata: [
        {
          active_title: "减",
          active_name: "满减活动",
          active_details: "满30减5，满60减8"
        }
      ],
      //选择城市下拉
      options1: [],
      list: [],
      loading: false,
      states: [],
      //上传图片
      imageUrla: "",
      imageUrlb: "",
      imageUrlc: "",

      startTime: "",
      endTime: "",
      shopdata: [],
      city: {},
      ruleForm: {
        name: "",
        slogan: "",
        about: "",
        region: "",
        pinpai: true,
        fengniao: true,
        xindian: true,
        bao: true,
        da: true,
        piao: true,
        type: [],
        resource: "",
        desc: "",
        address: [],
        fee: 1,
        price: 1,
        phone: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入店铺名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        phone: [{ validator: checkAge, trigger: "blur" }],
        // region2: [
        //   { required: true, message: "请选择活动区域", trigger: "change" }
        // ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },
      //店铺分类
      options: [],
      selectedOptions: [260, 260],
      defaultParams: {
        label: "name",
        value: "id",
        children: "sub_categories"
      },
      options2: [
        {
          value: "减",
          label: "满减优惠"
        },
        {
          value: "特",
          label: "优惠大酬宾"
        },
        {
          value: "新",
          label: "新用户立减"
        },
        {
          value: "领",
          label: "进店领劵"
        }
      ],
      value2: "",
      val: ""
    };
  },
  mounted() {
    axios.get("https://elm.cangdu.org/v1/cities?type=guess").then(res => {
      // console.log(res);
      this.city = res.data;
    });
    axios
      .get("https://elm.cangdu.org/shopping/v2/restaurant/category")
      .then(res => {
        // console.log(res.data);
        this.options = res.data;
      });
  },
  methods: {
    addopen(val) {
      this.open();
      // console.log(val)
      this.val = val;
    },
    //提示框
    open() {
      this.$prompt("请输入活动详情", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          console.log(this.value2);
          this.tabledata.push({
            active_title: this.val,
            active_name: this.value2,
            active_details: value
          });
          this.$message({
            type: "success",
            message: "你的活动详情是: " + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    //选择城市下拉
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        axios
          .get(
            "https://elm.cangdu.org/v1/pois?type=search&city_id=" +
              this.city.city_id +
              "&keyword=" +
              query
          )
          .then(res => {
            //   console.log(res)
            this.states = res.data;
            this.list = this.states.map(item => {
              return { value: item.address, label: item.address };
            });
            this.options1 = this.list.filter(item => {
              return item.label.indexOf(query) > -1;
            });
            this.loading = false;
            // console.log(this.list);
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        this.options1 = [];
      }
    },
    submitForm(formName) {
          let obj = {
            address: this.ruleForm.address, //地址
            bao: this.ruleForm.bao, //外卖保
            business_license_image: this.imageUrlb, //上传营业执照
            category: this.$refs["cascaderAddr"].currentLabels, //店铺分类
            catering_service_license_image: this.imageUrlc, //上传餐饮服务许可证
            delivery_mode: this.ruleForm.fengniao, //蜂鸟专送
            description: this.ruleForm.about, //简介
            endTime: this.ruleForm.endTime, //结束时间
            float_delivery_fee: this.ruleForm.fee, //配送费
            float_minimum_order_amount: this.ruleForm.price, //起送价
            image_path: this.imageUrla, //商铺图片
            is_premium: this.ruleForm.pinpai, //品牌保证
            latitude: 40.176441,
            longitude: 116.163191,
            name: this.ruleForm.name, //店铺名称
            new: this.ruleForm.xindian, //新店
            phone: this.ruleForm.phone, //联系电话
            piao: this.ruleForm.piao, //开发票
            promotion_info: this.ruleForm.slogan, //店铺标语
            startTime: this.ruleForm.startTime, //开始时间
            zhun: this.ruleForm.da, //准时达
            activities: this.tabledata //规格
          };
          console.log(obj)
          axios
            .post("https://elm.cangdu.org/shopping/addShop", obj)
            .then(res => {
              console.log(res);
            });
    },
    handleDelete(index, row) {
      // console.log(index, row);
      this.tabledata.splice(index, 1);
    },
    //上传头像
    handleAvatarSuccessa(res, file) {
      if (res.status === 1) {
        this.imageUrla = res.image_path;
      }
    },
    handleAvatarSuccessb(res, file) {
      if (res.status === 1) {
        this.imageUrlb = res.image_path;
      }
    },
    handleAvatarSuccessc(res, file) {
      if (res.status === 1) {
        this.imageUrlc = res.image_path;
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleChange() {}
  }
};
</script>

<style lang="scss" scoped>
.addshop {
  width: 100%;
  height: 100%;
  overflow: auto;
  form {
    width: 60%;
    margin: 20px auto;
    button {
      margin-top: 30px;
      margin-left: 60px;
    }
  }
}
//上传头像
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
