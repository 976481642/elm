<template>
  <div class="data">
    <div class="a">
      <!-- 头部 -->
      <div class="D-header">
        <p>数据统计</p>
        <div class="D-1">
          <ul>
            <li>当日数据:</li>
            <li>{{newregistereduser}}新增用户</li>
            <li>{{newindent}}新增订单</li>
            <li>{{newAdministrator}}新增管理员</li>
          </ul>
        </div>
        <div class="D-2">
          <ul>
            <li>总数据:</li>
            <li>{{registereduser}}注册用户</li>
            <li>{{ inden}}订单</li>
            <li>{{Administrator}}管理员</li>
          </ul>
        </div>
      </div>
      <!-- 走势图 -->
      <div class="D-3">
          <div class="D-chart" id="Mychart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import headers from "./header/Header.vue"
import time from 'time-formater'
import {mapMutations} from 'vuex'
export default {
components: {headers},
    data() {
        return {
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
//     // 意思是 在路由 进来之前
//    beforeRouteEnter:(to,from,next)=>{
//       //console.log(this) // 这里的this 不会vue实例
//       next((vm)=>{ //next 函数的参数 vm就是vue实例
//          //console.log(vm)
//          var data=vm.$store.state.adminInfo
//             if(data.login==true){
//               next(true)
//             }else{
//               next("/")
//             }
//       })
//     },
    mounted(){

        //调用时间
        // this.nowTimes();

        this.axios.get("https://elm.cangdu.org/v1/users/count").then((res)=>{
           if(res.data){
               this.registereduser=res.data.count
           }

        })
        this.axios.get("https://elm.cangdu.org/bos/orders/count").then((res)=>{
           if(res.data){
               this.inden=res.data.count
           }

        })
        this.axios.get("https://elm.cangdu.org/admin/count").then((res)=>{
           if(res.data){
               this.Administrator=res.data.count
           }

        })
        this.getSant()
    },

    methods:{

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
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
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
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
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
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    }
                ]



           })
       },

    },

}
</script>

<style scoped >
</style>
