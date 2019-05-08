<template>
    <div class="content4">
      <div id="myChart" :style="{width: '1440px', height: '450px'}"></div>
    </div>
</template>

<script>
	export default {
		name: "Userdislist",
    mounted(){
      this.drawLine();
    },
    methods:{
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title : {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['北京','上海','深圳','杭州','其他']
          },
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:5369, name:'北京'},
                {value:2327, name:'上海'},
                {value:2557, name:'深圳'},
                {value:1368, name:'杭州'},
                {value:13223, name:'其他'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      }
    }
	}
</script>

<style scoped>
#myChart{
  margin-top: 80px;
}
</style>
