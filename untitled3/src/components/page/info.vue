<template>
    <div class="box">
      <el-col :span="12">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="rgb(50, 64, 87)"
          text-color="#fff"
          active-text-color="#ffd04b">

          <el-menu-item index="1" @click="Rhome">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>



          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="Routeuser">用户列表</el-menu-item>
              <el-menu-item index="2-2" @click="Restlist">商家列表</el-menu-item>
              <el-menu-item index="2-3" @click="Rfood">食品列表</el-menu-item>
              <el-menu-item index="2-4" @click="Rorder">订单列表</el-menu-item>
              <el-menu-item index="2-5" @click="Radmin">管理员列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>添加商品</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" @click="Raddrest">添加商铺</el-menu-item>
              <el-menu-item index="3-2" @click="Raddfood">添加商品</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>图表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1" @click="Ruserdis">用户分布</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>编辑</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1" @click="Rword">文本编辑</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="6-1">管理设置</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>说明</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="7-1">说明</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-col>
      <div class="div1">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
	export default {
		name: "info",
    data(){
      return {

      }
    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      Routeuser(){
        this.$router.push({name:'Userlist'})
      },
      Rhome(){
        this.$router.push({name:'Home'})
      },
      Restlist(){
        this.$router.push({name:'Restlist'})
      },
      Rfood(){
        this.$router.push({name:'Foodlist'})
      },
      Rorder(){
        this.$router.push({name:'Orderlist'})
      },
      Radmin(){
        this.$router.push({name:'Adminlist'})
      },
      Ruserdis(){
        this.$router.push({name:'Userdislist'})
      },
      Raddrest(){
        this.$router.push({name:'addrest'})
      },
      Rword(){
        this.$router.push({name:'world'})
      },
      Raddfood(){
        this.$router.push({name:'addfood'})
      }
		}
	}
</script>

<style scoped    lang="scss">
  .box {
    width: 100%;
    height: 100%;
    display: flex;
    .el-col{
      flex: 2;
      background-color:rgb(50, 64, 87);
    }
    div:nth-of-type(2){
      flex: 8;
    }
    .div1{
      background-color: white;
      overflow: auto;
    }
  }

</style>
