<template>
  <div class="order">
    <!-- 确认订单 -->
    <van-nav-bar
      fixed
      :title="$lang['确认订单']"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 地址栏 -->
    <cAddress></cAddress>
    <!-- 商品确认 -->
    <shopOrder :orderBuffer="orderBuffer" v-if="Object.keys(this.orderBuffer).length>0"></shopOrder>
    <!-- 优惠活动 -->
    <message></message>
    <!-- 提交订单 -->
    <submit :orderBuffer="orderBuffer" v-if="Object.keys(this.orderBuffer).length>0"></submit>
  </div>
</template>

<script>
import { orderList } from "@/api/apis";
import cAddress from "./components/address";
import shopOrder from "./components/shopOrder";
import submit from "./components/submit";
import message from "./components/message";
export default {
  components: {
    cAddress,
    shopOrder,
    submit,
    message
  },
  name: "",
  data() {
    return {
      orderBuffer:{},
    };
  },
  methods:{
   onClickLeft() {
        this.$router.back(-1);
      },
  },
  mounted(){
    const orderProduct=JSON.parse(localStorage.getItem('orderBuffer'))
    this.orderBuffer=orderProduct||this.$store.state.orderBuffer
  },
  
};
</script>

<style lang="less" scoped>
.order{
   padding-bottom: 50px;
}
</style>
