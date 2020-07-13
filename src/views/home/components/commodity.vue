<template>
  <div>
    <van-tabs type="card" class="title" v-model="commodity.code">
      <van-tab class="oCol" :name="item" :title="item" v-for="(item, index) in activitys" :key="index"
        >
        <commoditylist :commodity="commodity">
        </commoditylist>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
  import commoditylist from "@/components/commodityList"
  export default {
    name: "commodity",
    props: {},
    computed:{
      activitys(){
        var a=[]
        
        this.$store.state.activitys.forEach(element => {
          console.log(element)
            if(element != "首页活动"){
              a.push(element)
            }
        });
        return a
        }
    },
    data() {
      return {
        flag: false,
        active: "",
      //  activitys:[],
        commodity: { listtype: "activity" },
      };
    },
    components: {
      commoditylist
    },
    created() {
      this.$nextTick(() => {
        this.flag = true
      })
    }
  };
</script>
<style scoped lang="less">
  .title {
    margin: 10px 0;
  }
</style>