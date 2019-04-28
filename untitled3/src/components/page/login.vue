<template>
    <div class="box">
      <div class="tra animated fadeInDown">
        <h1>elm后台管理系统</h1>
        <div class="login">
          <p><el-input  placeholder="请输入用户名" v-model="username"></el-input></p>
          <p><el-input  placeholder="请输入密码" v-model="psw" show-password></el-input></p>
          <el-button type="primary" @click="Routere">登录</el-button>
          <p>温馨提示：</p>
          <p>未登录过的新用户，自动注册</p>
          <p>注册过的用户可凭账号密码登录</p>
        </div>
      </div>
    </div>
</template>

<script>
	export default {
		name: "login",
    data(){
		  return{
          username:'',
          psw:''
      }
    },
    methods:{
		  Routere(){
        console.log(this.username);
        console.log(this.psw);
        let obj={
          user_name: this.username,
          password: this.psw
        };
        this.axios.post("https://elm.cangdu.org/admin/login",obj).then((res)=>{
          if(res){
            console.log(res.data);
            if(res.data.status==1) {
              this.$router.push({name: "info"});
            }
            if(res.data.status==0){
              console.log(res.data.message);
            }
          }
        })
      },
    },


	}
</script>

<style scoped lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing:border-box;
}
html,body{
  width: 100%;
  height: 100%;
}
  .box{
    width: 100%;
    height: 100%;
    background-color: #324057;
    text-align: center;
    position: relative;
    h1{
      padding-top: 200px;
      color: white;
      margin-left: 70px;
      margin-bottom: 60px;
    }
    .login{
      background-color: white;
      border:1px solid black;
      width: 370px;
      height:270px;
      border-radius: 10px;
      position: absolute;
      left: 50%;
      margin-left: -150px;
      p:nth-of-type(1){
       padding: 20px;
      }
      p:nth-of-type(2){
        padding: 20px;
      }
      button{
        width: 328px;
        height: 38px;
      }
      p:nth-of-type(3){
        margin-top: 15px;
        color: red;
        font-size: 10px;
      }
      p:nth-of-type(4){
        color: red;
        font-size: 10px;

      }
      p:nth-of-type(5){
        color: red;
        font-size: 10px;
      }
    }

  }
</style>
