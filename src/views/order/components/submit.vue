<template>
  <!-- 订单 -->
  <div class="order">
    <van-submit-bar label=" итого：" :button-text="$lang['提交订单']" @submit="onSubmit">
      <div class="buyprice">
        <p class="p1">
          {{ $lang["合计"] }} ：
          <span>{{ "₽" }}{{ orderBuffer.totalPrice | addZero }}</span>
        </p>
      </div>
    </van-submit-bar>
  </div>
</template>

<script>
  import { order, deleteCart } from "@/api/apis";
  import { eventBus } from "@/main";
  export default {
    props: {
      orderBuffer: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    inject:['loadCartList'] ,
    data() {
      return {
        pay: ""
      };
    },
    // 过滤器过滤商品价格
    // filters: {
    //   addZero(value) {
    //     value = value + 0;
    //     return value.toFixed(2);
    //   }
    // },
    created() {
      eventBus.$on("payment", e => {
        this.pay = e;
        this.orderBuffer.payment = this.pay;
      });
    },
    methods: {
      onSubmit() {
        this.$request.order(this.orderBuffer).then(res => {
          if (res.code == 0) {
            this.loadCartList()
            //this.$store.dispatch("loadCartList")
            let orderId = res.data._id;
            this.$toast({
              message: this.$lang["订单已提交"]
            });
            this.$router.push("/orderDetail/" + res.data._id);
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .order {
    .buyprice {
      flex: 1;
      padding-right: 8px;
      text-align: right;
      display: flex;
      flex-direction: column;

      span {
        color: red;
        font-size: 18px;
      }
    }
  }
</style>