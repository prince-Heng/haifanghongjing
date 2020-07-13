<template>
  <div>
    <van-nav-bar
      :fixed="true"
      :title="$lang['购物车']"
      :left-text="$lang['返回']"
      :right-text="$lang['删除']"
      left-arrow
      @click-left="$router.back()"
      @click-right="onClickRight"
    />
    <!-- <apiCart v-if="isShow"></apiCart>
    <localCart v-else></localCart>-->

    <div>
      <!-- v-if="$store.state.cartList" -->
      <!-- 登陆提示 -->
      <div class="logToast">
        <div v-if="! $store.state.token">
          <span>{{ $lang["登陆后可同步购物车商品"] }}</span>
          <van-button round type="danger" size="small" @click="$router.push('/login')">
            {{
            $lang["登录"]
            }}
          </van-button>
        </div>
      </div>

      <div v-if="$store.state.cartList!= null && $store.state.cartList.length > 0">
        <cartlist></cartlist>
      </div>
      <div v-else>
        <cEmpty>
          <span v-if="$store.state.token">{{$lang['购物车空空滴']}}</span>
          <span v-else>{{$lang["登陆后可同步购物车商品"] }}</span>
        </cEmpty>
      </div>
    </div>
  </div>
</template>
<script>
import cEmpty from "./components/empty";
// import apiCart from "./components/getCart/apiCarts"
// import localCart from './components/getCart/localCart'
import cartlist from "./components/cartlist";
export default {
  components: {
    cartlist,
    cEmpty
  },
  name: "Cart",
  props: {},
  data() {
    return {};
  },
  mounted() {},

  methods: {
    onClickRight() {
      let removeList = [];
      let list = this.$store.state.cartList;

      this.$store.state.cartList.forEach(cart => {
        if (cart.isChecked == true) removeList.push(cart);
      });
      if (removeList.length > 0) this.$store.dispatch("removeCart", removeList);
    }
  }
};
</script>
<style scoped lang="less">
.logToast {
  font-size: 18px;
  background: #fff;
  padding-top: 46px;
  text-align: center;

  .van-button--round{
    margin-left: 10px;
  }
}
</style>