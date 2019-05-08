<template>
  <div class="addfood">
    <headers></headers>
    <div class="addfoods">
      <!-- 添加食品种类 -->
      <div class="tianj">
        <h3>选择食品种类</h3>
        <el-form label-width="100px" class="demo-ruleForm">
          <el-form-item label="食品种类">
            <el-cascader
              class="inline-input"
              :options="options"
              :show-all-levels="false"
              @change="onProvincesChange"
            ></el-cascader>
          </el-form-item>
          <transition name="fade" mode="out-in">
          <div class="x animate bouncelnDown" v-if="isshow">
            <el-form-item label="食品种类">
              <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
            </el-form-item>

            <br>
            <el-form-item label="食品描述">
              <el-input placeholder="请输入内容" v-model="inputs" clearable></el-input>
            </el-form-item>
           <el-form-item>
              <el-button @click="onSubmit">提交</el-button>
            </el-form-item>
          </div>
          </transition>

        </el-form>
        <div class="anniu">
          <el-button v-if="isshow" icon="el-icon-caret-top" @click="zhankai" class="an">隐藏内容</el-button>
          <el-button v-else icon="el-icon-caret-bottom" @click="zhankai" class="an">显示内容</el-button>
        </div>
      </div>

      <!-- 添加商品 -->
      <div class="shop">
        <div class="biao">添加食品</div>
        <div class="tianjs">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="食品名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="食品活动">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="食品详情">
              <el-input type="textarea" v-model="form.xq"></el-input>
            </el-form-item>
            <el-form-item label="上传食品图片">
              <el-upload
                class="avatar-uploader"
                action="https://elm.cangdu.org/v1/addimg/food"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="'//elm.cangdu.org/img/'+imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="食品特点">
              <el-select v-model="value5" multiple placeholder="请选择">
                <el-option
                  v-for="item in option"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="食品特点">
              <el-radio v-model="radio" label="1" @change="change">单规格</el-radio>
              <el-radio v-model="radio" label="2" @change="change">多规格</el-radio>
            </el-form-item>
            <!-- 单规格显示 -->
            <div class="a1" v-if="gueige">
              <el-form-item label="包装费">
                <el-input-number
                  v-model="num"
                  @change="handleChange"
                  :min="1"
                  :max="100"
                  label="描述文字"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="价格">
                <el-input-number
                  v-model="num2"
                  @change="handleChange"
                  :min="1"
                  :max="10000"
                  label="描述文字"
                ></el-input-number>
              </el-form-item>
            </div>
            <!-- 多规格显示 -->
            <div class="a2" v-else>
              <div class="a3">
                <el-button type="primary" @click="open">添加规格</el-button>
              </div>
              <el-table :data="list" style="width: 100%">
                <el-table-column prop="name" label="规格" width="180"></el-table-column>
                <el-table-column prop="num" label="包装费" width="180"></el-table-column>
                <el-table-column prop="num2" label="价格"></el-table-column>
                <el-table-column label="操作" width="180">
                  <el-button
                    size="mini"
                    type="danger"
                    v-for="(i, index) in list"
                    :key="index"
                    @click="del(index)"
                  >删除</el-button>
                </el-table-column>
              </el-table>
            </div>
            <div class="di">
              <div>
                <el-form-item>
                  <el-button type="primary" @click="onSubmits">确认添加食品</el-button>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <!-- 遮罩层 -->
      <div class="zhe" v-if="duoguei">
        <div class="xuanze">
          <div class="ding-header">
            <span>修改食品信息</span>
            <span @click="quxiao">X</span>
          </div>
          <div class="ding-center2">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="规格" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="包装费" prop="num">
                <el-input-number size="medium" :min="0" v-model="num"></el-input-number>
              </el-form-item>
              <el-form-item label="价格" prop="num1">
                <el-input-number size="medium" :min="0" v-model="num2"></el-input-number>
              </el-form-item>
            </el-form>
            <!-- <button @click="tianjia">添加</button> -->
            <div class="ding-footer">
              <el-button @click="quxiao">取消</el-button>
              <el-button type="primary" @click="queren">确认</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headers from "../header/Header.vue"
export default {
  components: {headers},
  // 意思是 在路由 进来之前
  beforeRouteEnter: (to, from, next) => {
    //console.log(this) // 这里的this 不会vue实例
    next(vm => {
      //next 函数的参数 vm就是vue实例
      //console.log(vm);
      var data = vm.$store.state.adminInfo;
      if (data.login == true) {
        next(true);
      } else {
        next("/");
      }
    });
  },
  data() {
    return {
      show:true,
      gueige: true,
      duoguei: false,
      isshow: false,
      input: "",
      inputs: "",
      state: "",
      options: [],
      imageUrl: "",
      radio: "1",
     num: 5,
        num2: 30,
      ruleForm: {
        name: "",

      },
      form: {
        name: "",
        desc: "",
        xq: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入规格", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      list: [],
      value5: [],
      option: [
        {
          value: "新品",
          label: "新品"
        },
        {
          value: "招牌",
          label: "招牌"
        }
      ]
    };
  },
  methods: {
    // 点击多规格 是触发的事件
    change() {
      if (this.radio == 1) {
        this.gueige = true;
      } else {
        this.gueige = false;
      }
    },
    // 多规格 显示
    open() {
      this.duoguei = true;
    },
    del(index) {
      this.list.splice(index, 1);
    },
    //点击 x  和取消按钮  关闭 遮罩层
    quxiao() {
      this.duoguei = false;
    },
    //点击确认  吧值 添加到 list 里面
    queren() {
      let obj = {};
      obj.name = this.ruleForm.name;
      obj.num = this.ruleForm.num;
      obj.num2 = this.ruleForm.num2;
      this.list.push(obj);
      this.duoguei = false;
    },

    //点击展开按钮   展开内容
    zhankai() {
        this.isshow = !this.isshow
    },
    onProvincesChange(item) {
      this.state = item[0];
    },
    //点击  提交  提交食品种类
    onSubmit() {
      let obj = {};
      obj.restaurant_id = this.state;
      obj.name = this.input;
      obj.description = this.inputs;
      this.axios
        .post("https://elm.cangdu.org/shopping/addcategory", obj)
        .then(res => {
          if (res.data.status == 1) {
            this.$message({
              tyep: "success",
              message: "添加食品种类成功"
            });
          } else {
            this.$message({
              tyep: "success",
              message: "添加食品种类失败"
            });
          }
        });
    },
    //点击添加食品的  post 提交
    onSubmits() {
      console.log(this.$route.query.id)
      let obj = {};

      obj.activity= this.form.desc;
      obj.attributes= this.value5;
      obj.category_id= this.$route.query.id;
      obj.description= this.form.xq;
      obj.image_path= this.imageUrl;
      obj.name= this.form.name;
      obj.restaurant_id= 3;
      obj.specs= [
        {
          specs: this.list.name,
          packing_fee: this.num,
          price: this.num2
        }
      ];
      this.axios.post("https://elm.cangdu.org/shopping/addfood",obj).then(res => {
        console.log(res);
      });
    },

    handleChange(itme) {
      console.log(itme);
    },

    //上传图片
    handleAvatarSuccess(res, file) {
      console.log(res);
      if (res.status == 1) {
        this.imageUrl = res.image_path;
      } else {
        this.$message({
          tyep: "success",
          message: "上传食品图片失败"
        });
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

    handleDelete(index, row) {
      console.log(index, row);
    },
    // 提示
    addgoods() {
      this.$confirm("添加食品需要选择一个商铺，现在就去选择商铺吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$router.push("/Sank");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消"
          });
        });
    }
  },
  mounted() {
    //  获取食品种类

    this.axios
      .get("https://elm.cangdu.org/shopping/getcategory/2")
      .then(res => {
        if (res.data) {
          for (let i = 0; i < res.data.category_list.length; i++) {
            let obj = {};
            obj.value = res.data.category_list[i].id;
            obj.label = res.data.category_list[i].name;
            this.options.push(obj);
          }
        }
      });
    if (this.$route.query.id) {
    } else {
      this.addgoods();
    }
  }
};
</script>

<style scope lang="scss">

</style>
