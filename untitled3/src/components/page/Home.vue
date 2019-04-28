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
          <span>1</span><span>新增用户</span>
        </div>
        <div class="body1-1 body1-2">
          <span>1</span><span>新增订单</span>
        </div>
        <div class="body1-1 body1-2">
          <span>1</span><span>新增管理员</span>
        </div>
      </div>

      <div class="body-2">
        <div class="body2-1">
          总数据：
        </div>
        <div class="body2-1 body2-2">
          <span>1</span><span>新增用户</span>
        </div>
        <div class="body2-1 body2-2">
          <span>1</span><span>新增订单</span>
        </div>
        <div class="body2-1 body2-2">
          <span>1</span><span>新增管理员</span>
        </div>
      </div>
    </div>
    <div id="myChart" :style="{width: '1440px', height: '450px'}"></div>
  </div>
</template>

<script>
	export default {
		name: "Home",
    data(){
		  return{
        msg: 'Welcome to Your Vue.js App',
      }
    },
    mounted(){
      this.drawLine();
    },
    methods:{
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
    let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({


          title: {
            text: '走势图'
          },


          tooltip: {
            trigger: 'axis'
          },



          legend: {
            data:['新注册用户','新增订单',"新增管理员"]
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
            data: ['2019-04-22','2019-04-23','2019-04-24','2019-04-25','2019-04-26','2019-04-27','2019-04-28']
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
              data:[199, 113, 77, 50, 26, 1, 5],
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
              data:[124, 3, 2, 30, 16, 4, 17],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
            },{
          name:'新增管理员',
            type:'line',
            data:[124, 129, 123, 124, 82, 17, 27],
            markPoint: {
            data: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
            ]
          },
        }


          ]
        });
      }
    }

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
