<template>
  <div>
    <van-cell clas is-link @click="showPopup">
      {{ $lang["支付方式"] + "：" + pay }}</van-cell
    >
    <van-popup
      v-model="show"
      position="bottom"
      roundround
      :style="{ height: '50%' }"
    >
      <van-picker
        show-toolbar
        :confirm-button-text="$lang['确认']"
        :cancel-button-text="$lang['取消']"
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>

    <van-cell-group>
      <van-cell :title="$lang['优惠']" />
      <van-cell :title="$lang['运费']" />
    </van-cell-group>
  </div>
</template>

<script>
import { eventBus } from "@/main";
export default {
  name: "Message",
  props: {},
  data() {
    return {
      show: false,
      pay: this.$lang["转账"], //默认支付方式
      columns: [this.$lang["转账"], this.$lang["现金"], this.$lang["赊账"]],
    };
  },
  methods: {
    // 支付方式弹层
    showPopup() {
      this.show = true;
    },
    // 点击支付弹窗确认时触发
    onConfirm(value) {
      this.pay = value;
      eventBus.$emit("payment", value); 
      this.show = false;
     
    },
    // 点击支付弹窗取消时触发
    onCancel() {
      this.show = false;
    },
  },
 
};
</script>

<style scoped lang="less">
.van-cell {
  margin-top: 10px;
}
</style>
