<template>
  <div class="conent">
    <div class="header">
      <span>首页</span>
      <img src="//elm.cangdu.org/img/default.jpg" alt="">
    </div>
    <div class="body">
      <p>数据统计</p>
      <div class="body-1">
        <div class="body1-1">
          当日数据：
        </div>
        <div class="body1-1 body1-2">
          <span>{{newregistereduser}}</span><span>新增用户</span>
        </div>
        <div class="body1-1 body1-2">
          <span>{{newindent}}</span><span>新增订单</span>
        </div>
        <div class="body1-1 body1-2">
          <span>{{newAdministrator}}</span><span>新增管理员</span>
        </div>
      </div>

      <div class="body-2">
        <div class="body2-1">
          总数据：
        </div>
        <div class="body2-1 body2-2">
          <span>{{registereduser}}</span><span>新增用户</span>
        </div>
        <div class="body2-1 body2-2">
          <span>{{inden}}</span><span>新增订单</span>
        </div>
        <div class="body2-1 body2-2">
          <span>{{Administrator}}</span><span>新增管理员</span>
        </div>
      </div>
    </div>
    <div id="Mychart" :style="{width: '1440px', height: '450px'}"></div>
  </div>
</template>

<script>
  import time from 'time-formater'
  export default {
		name: "Home",
    data(){
		  return{
        arr0:[],
        arr1:[],
        arr2:[],
        time:"",
        newregistereduser:"",
        newindent:"",
        newAdministrator:"",
        registereduser:"",
        inden:"",
        Administrator:"",
      }
    },
    mounted(){
      this.axios.get("https://elm.cangdu.org/v1/users/count").then((res)=>{
        if(res.data){
          this.registereduser=res.data.count
        }

      });
      this.axios.get("https://elm.cangdu.org/bos/orders/count").then((res)=>{
        if(res.data){
          this.inden=res.data.count
        }

      });
      this.axios.get("https://elm.cangdu.org/admin/count").then((res)=>{
        if(res.data){
          this.Administrator=res.data.count
        }

      });
      this.getSant();
    },
    methods: {
      // 封装的  axios 方法
      sent(val,time){
        return new Promise((s,e)=>{
          this.axios.get("https://elm.cangdu.org/statis/"+val+"/"+time+"/count").then(res=>{
            s(res)
          })
        })
      },

      // 调用
      getSant(){
        const apiArr =[[],[],[]]
        let dataArr=[]
        //  循环出  今天之前的 前6天的 时间
        for(var i=0;i<=6;i++){
          let times=time(new Date()-(i*24*60*60*1000)).format('YYYY-MM-DD');
          dataArr.push(times)
        }
        // 改变  顺序  时间从远到今 排序
        this.time=dataArr.reverse()
        dataArr.map(item=>{
          apiArr[0].push(this.sent('user',item))
          apiArr[1].push(this.sent('order',item))
          apiArr[2].push(this.sent('admin',item))
        })
        let arr =[...apiArr[0],...apiArr[1],...apiArr[2]]
        let resArr=[[],[],[]]
        Promise.all(arr).then(res=>{
          res.forEach((item,index)=>{
            if(item.data.status==1){
              resArr[Math.floor(index/7)].push(item.data.count)
            }
          })
          this.arr0=resArr[0]
          this.arr1=resArr[1]
          this.arr2=resArr[2]


          let a=this.arr0.length-1
          let b=this.arr1.length-1
          let c=this.arr2.length-1
          this.newregistereduse=this.arr0[a]
          console.log(this.newregistereduse)
          this.newindent=this.arr1[b]
          this.newAdministrator=this.arr2[c]
          this.drawLine()
        })
      },


      // 调用 折线图
      drawLine(){


        // 基于准备好的 dom 初始化 echarts 实例
        var mychart=this.$echarts.init(document.getElementById('Mychart'))
        // 绘制图表
        mychart.setOption({
          title: {
            text: '走势图',
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['新注册用户','新增订单','新增管理员']
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: this.time
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            }
          },

          series: [
            {
              name:'新注册用户',
              type:'line',
              data:this.arr0,

              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },

            },
            {
              name:'新增订单',
              type:'line',
              data:this.arr1,
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },

            },
            // this.S1,this.F1,this.Fe1,this.Te1,this.Tw1,this.On1,this.J1
            {
              name:'新增管理员',
              type:'line',
              data:this.arr2,
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },

            }
          ]



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
  .conent{
    width: 100%;
    height: 100%;
    .header{
      width: 100%;
      height: 60px;
      background-color: #eff2f7;
      span:nth-of-type(1){
        line-height: 60px;
        padding-left: 40px;
        color: #97a8be;
      }
      img{
        width: 36px;
        height: 36px;
        float: right;
        margin-right: 40px;
        margin-top: 12px;
        border-radius: 20px;
      }
    }
    .body{
      width: 100%;
      p:nth-of-type(1){
        text-align: center;
        margin-top: 20px;
        font-size: 30px;
      }
      .body-1{
        width: 100%;
        font-size: 30px;
        padding-top: 20px;
        line-height: 30px;
        .body1-1{
          margin-left: 40px;
          display: inline-block;
          width: 200px;
          height: 35px;
          background-color: #ff9800;
          color: white;
          text-align: center;
          border-radius: 5px;
          span:nth-of-type(2){
            font-size: 16px;
          }
        }
        .body1-2{
          background-color: #e5e9f2;
          color: black;
        }
      }
      .body-2{
        width: 100%;
        font-size: 30px;
        padding-top: 20px;
        line-height: 30px;
        .body2-1{
          margin-left: 40px;
          display: inline-block;
          width: 200px;
          height: 35px;
          background-color: #20a0ff;
          color: white;
          text-align: center;
          border-radius: 5px;
          span:nth-of-type(2){
            font-size: 16px;
          }
        }
        .body2-2{
          background-color: #e5e9f2;
          color: black;
        }
      }
    }
    #myChart{
      margin-top: 100px;
      padding-left: 50px;
    }
  }

</style>
