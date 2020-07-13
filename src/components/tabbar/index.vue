<template>
  <div id="tabbar">
    <van-tabbar v-model="tabbar.active" :active-color="tabbar.activeColor" v-if="tabbar.show" fixed route>
      <template v-for="(item,index) in tabbar.items">
        <van-tabbar-item :to="item.url" :key="index" :icon="item.icon"
          v-if="item.name ==  '购物车' && $store.state.cartList" :badge="$store.state.cartList.length">
          {{item.name}}
        </van-tabbar-item>
        <van-tabbar-item :to="item.url" :key="index" :icon="item.icon"
          v-if="item.name ==  '购物车' && $store.state.cartList== null">
          {{item.name}}
        </van-tabbar-item>

        <van-tabbar-item :to="item.url" :key="index" :icon="item.icon" v-if="item.name !=  '购物车'">
          {{item.name}}
        </van-tabbar-item>
      </template>

    </van-tabbar>
  </div>
</template>

<script>
  // import x from ''
  export default {
    name: 'Tabbar',
    props: {},
    data() {
      return {
        tabbar: {
          active: "",
          cartNumber: '',
          show: true,
          activeColor: '#07c160',
          items: [
            { icon: 'home-o', name: this.$lang["首页"], url: '/' },
            { icon: 'apps-o', name: this.$lang["分类"], url: '/classify' },
            { icon: 'shopping-cart-o', name: this.$lang["购物车"], url: '/cart' },
            { icon: 'smile-comment-o', name: this.$lang["客服"], url: '/service' },
            { icon: 'user-o', name: this.$lang['我的'], url: '/my' }
          ]
        }
      }
    },
    components: {},
    computed: {},
    watch: {},
    methods: {
      tabbarGuards() {
        // 路由跳转结束后判断的路由钩子
        this.$router.afterEach((to, from, next) => {
          // 延迟回调获取下标
          this.$nextTick(() => {

            let index = this.tabbar.items.findIndex(
              (item, index, array) => {
                return to.path == item.url;
              }
            );
            if (index != this.tabbar.active) {
              this.tabbar.show = false;
              this.$nextTick(() => {
                this.tabbar.active = index;
                this.tabbar.show = true;
              });
            }
          });

        });
      }
    },
    created() {
      this.tabbarGuards();
    },
    beforeMount() { },
    activated() { }
  }
</script>
<style scoped lang="less">
  /deep/ .van-tabbar-item__text {
    text-align: center;
  }
</style>