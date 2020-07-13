<template>
<div>  
    <!-- 基础用法 --> 
      <div class="sku-container">
        <van-sku
          v-model="showBase"
          :sku="skuData.sku"
          :goods="skuData.goods_info"
          :goods-id="skuData.goods_id"
          reset-stepper-on-hide
          reset-selected-sku-on-hide
          disable-stepper-input
          :close-on-click-overlay="closeOnClickOverlay" 
          :custom-sku-validator="customSkuValidator"  
          @add-cart="onAddCartClicked"
        />
        <van-cell
          @click="showBase = true"
        >
          <van-row>
          <van-col span="4">{{$lang['选择']}}</van-col>
          <van-col span="20">
            <div>{{$lang['已选']  }}</div>
            <!-- <div v-else>{{$lang['请选择'] + $lang['颜色分类']}}</div> -->
          </van-col>
        </van-row>
        </van-cell>
      </div> 
</div>
</template>

<script> 
import skuData from './data'; 
export default {  
  data() {
    return {
      skuData:skuData,
      showBase: true,
      showCustom: false,
      showStepper: false,
      showSoldout: false,
      closeOnClickOverlay: true,
    //   initialSku: {
    //     s1: '30349',
    //     s2: '1193',
    //     selectedNum: 3
    //   },
      customSkuValidator: () => '请选择xxx!', 
    };
  },

  methods: {
    onAddCartClicked(data) {
      this.$toast('add cart:' + JSON.stringify(data));
    }, 
  }
};
</script>

<style lang="less">
.demo-sku {
  .sku-container {
    padding: 0 15px;
  }
}
</style>