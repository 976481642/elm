<template>
<div>
  <!--<div v-if="this.isShow">{{this.data}}</div>-->
  <input type="text" v-model="msg">
  {{msg}}
  <p v-for="(i,index) in data" :key="index" @click="clk(index)">{{i.name}}</p>
  <div v-for="(e,index) in list"  @click="ckl(index)">{{e.name}}</div>
</div>

</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      data:"123123123123",
      isShow:true,
      msg:"",
      data:[{name:'feifei'},{name:'feifei2'},{name:'feifei3'},{name:'feifei4'}],
      list:[]
    }
  },
  methods:{
    clk(index) {
      // console.log(this.data[index].name);
      let obj={};
      obj.name=this.data[index].name;
      this.list.push(obj);
    },
    ckl(index){
      console.log(index);
      console.log(this.list[index].name);
    }
  },
  watch:{

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
