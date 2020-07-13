<template>
  <div class="cell">
    <van-panel class="group">
      <template #header>
        <van-cell-group>
          <van-cell :title="$lang['我的订单']" icon="orders-o" :value="$lang['查看全部订单']" is-link @click="goOrderList" />
        </van-cell-group>
      </template>
    </van-panel>

    <van-cell-group class="group">
      <van-cell :title="$lang['地址管理']"  :value="serviceAddress"/>
    </van-cell-group>
    <van-cell-group class="group">
      <van-cell :title="$lang['客服电话']" :value="serviceTel" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "cell",
  data() {
    return {
    };
  },
  computed:{
    serviceTel(){  
     return this.$store.state.storeinfo.tel
    },
    serviceAddress(){
      return this.$store.state.storeinfo.address
    }
  },
  methods: {
	//   进入订单列表
    goOrderList() {
      this.$router.push("/orderList");
    },
  },
};
</script>

<style lang="less" scoped>
.group {
  margin-bottom: 10px;
}
</style>