<style scoped lang="less"></style>

<template>
  <div>
    <van-goods-action safe-area-inset-bottom>
      <van-goods-action-icon icon="home-o" :text="this.$lang['首页']" @click="go('/')" />
      <van-goods-action-icon icon="smile-comment-o" :text="this.$lang['客服']" @click="go('/service')" dot />
      <van-goods-action-icon icon="shopping-cart-o" :text="this.$lang['购物车']" @click="go('/cart')"
        :badge="$store.state.cartList.length" />
      <van-goods-action-button type="warning" :text="this.$lang['加入购物车']" @click="submitItem" />
    </van-goods-action>
  </div>
</template>

<script>
  //import x from ''
  import { eventBus } from "@/main";
  import { getCart } from "@/api/apis";
  export default {
    name: "Unnamed",
    props: {

    },
    data() {
      return {
        skuItems: null,
        info: null,
        showSkuList: true,
      };
    },
    components: {},
    methods: {
      go(url) {
        this.$router.push(url);
      },

      submitItem() {
        eventBus.$emit("sku", this.showSkuList);
      }
    },
    created() {

    },
    beforeMount() { },
    mounted() { },
    activated() { }
  }
</script>