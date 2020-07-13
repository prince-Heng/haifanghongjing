<template>
  <div>
    <div class="navigation" :class="{show:show}">
      <div class="backgroundo" @click="goLast">
        <van-icon class="left" color="#1989fa" name="arrow-left" />
      </div>
      <div class="backgroundt" @click="goCart">
        <van-icon color="#1989fa" name="shopping-cart" />
      </div>
      <div class="backgrounds">
        <van-button icon="share" round v-clipboard:copy="message" v-clipboard:success="onCopy"
          v-clipboard:error="onError" />
      </div>
    </div>
    <div v-if="Object.values(product).length >0">
      <swiper :swiperList="product.albumPics"></swiper>
      <other :product="product"></other>
      <action></action>
    </div>

  </div>
</template>

<script>
  import { getProduct, getProductBysn } from "@/api/apis";

  import other from "./components/other";
  import swiper from "@/components/commen/swiper";
  import action from "./components/action";

  export default {
    name: "productInfo",
    props: {},
    data() {
      return {
        product: {}, //数据

        show: false, //控制顶部样式
        message: window.location.href,
        data: {}
      };
    },
    components: {
      swiper,
      other,
      action
    },

    computed: {},
    watch: {},
    methods: {
      // 获取商品
      getProducts() {
        this.$request.getProduct(this.$route.params.id).then(res => {
          this.product = res.data;
        });
      },
      // 页面滚动
      handleScroll() {
        // 获取滚动条高度
        var scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        // console.log(scrollTop)
        if (scrollTop >= 200) {
          this.show = true;
        } else {
          this.show = false;
        }
      },
      // 复制当前地址至剪切板
      onCopy(e) {
        // console.log(e.text);
        this.$toast({ message: `${this.$lang["复制成功"]}` });
      },
      // 失败时触发
      onError(e) {
        this.$toast({
          message: `${this.$lang["复制失败"]}+"," + ${this.$lang["请稍后重试"]}`
        });
      },
      // 返回上一级
      goLast() {
        this.$router.back(-1);
      },
      // 前往购物车
      goCart() {
        this.$router.push("/cart");
      }
    },
    created() {
      this.getProducts();
    },
    beforeMount() { },
    mounted() {
      //监听页面滚动
      window.addEventListener("scroll", this.handleScroll);
    },
    activated() { }
  };
</script>
<style scoped lang="less">
  .navigation {
    position: fixed;
    font-size: 25px;
    display: flex;
    z-index: 999;
    height: 40px;
    width: 100%;
    padding: 15px 10px 10px 15px;

    .backgroundo {
      margin-right: 230px;
      height: 30px;
      width: 30px;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      padding-top: 4px;
      padding-left: 3px;
    }

    .backgroundt {
      margin-right: 10px;
      height: 30px;
      width: 30px;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      padding-top: 4px;
      padding-left: 5px;
    }

    .backgrounds {
      margin-right: 10px;

      .van-button {
        color: #1989fa;
        width: 36px;
        height: 36px;
        background-color: rgba(255, 255, 255, 0.8);
      }
    }

    .backgroundf {
      height: 30px;
      width: 30px;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      padding-top: 4px;
      padding-left: 5px;
    }
  }

  .show {
    background-color: #ddd;
  }
</style>