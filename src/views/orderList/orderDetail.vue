<template>
  <div>
    <van-nav-bar :fixed="true" :title="$lang['订单详情']" left-text left-arrow @click-left="onClickLeft" />
    <div class="detailOrder">
      <!-- 商品卡片 -->
      <!-- 修改cart绑定值 -->
      <van-card v-for="(item, index) in this.productDetail.productList" :key="index" :num="item.productNumber"
        :title="item.name" :desc="$lang['商品规格']" :price="item.skuprice" :thumb="$imgpath(item.pic)" currency="₽">
        <template #tags>
          <van-tag plain type="danger" v-for="(i,index) in attribute(item.attributeList)" :key="index">{{ i }}</van-tag>
        </template>
      </van-card>
      <!-- 商品名称 title="商品名称" -->
      <div class="message">
        <van-cell-group>
          <van-cell :title="$lang['订单编号:']" :value="idSubstr" v-if="this.productDetail._id" />
          <van-cell :title="$lang['订单状态:']" :value="$lang['3天内发货']" />
          <van-cell :title="$lang['下单时间:']" :value="this.date" />
          <van-cell :title="$lang['支付方式']" :value="this.payment" />
          <van-cell class="price" :title="$lang['合计金额']" :value="totalPriceFilter" v-if="productDetail.totalPrice" />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
  import { orderDetial } from "@/api/apis";

  export default {
    data() {
      return {
        id: "",
        //baseUrl: baseUrl.ImgUrlPath,
        productDetail: {},
        date: "",
        payment: ''
      };
    },
    computed: {
      totalPriceFilter() {
        let price = this.productDetail.totalPrice * 1
        return price.toFixed(2)
      },
      idSubstr() {
        return this.productDetail._id.substr(-8)
      }
    },
    methods: {

      attribute(item) {
        return Object.values(item)
      },
      onClickLeft() {
        this.$router.push("/");
      },
      getOrder() {
        this.$request.orderDetial(this.id).then(res => {
          if (res.code == 0) {
            if (res.data.payment) {
              this.payment = res.data.payment
            } else {
              this.payment = this.$lang['转账']
            }
            this.productDetail = res.data;
            console.log(this.productDetail);
          }


        });
      },
      formateDate(time) {
        return this.moment(time).format("YYYY-MM-DD HH:mm:ss");
      }
    },
    created() {
      this.date = this.formateDate(this.productDetail._createtime);
      this.id = this.$route.params.id;
      this.getOrder();

    }
  };
</script>

<style lang="less" scoped>
  .detailOrder {
    padding-top: 46px;

    /deep/ .van-card {
      background: #fff;
      margin: 10px;
    }

    .message {
      margin-top: 20px;

      .price span {
        color: red;
      }
    }
  }

  /deep/.van-cell__title {
    flex: 4;
  }

  /deep/.van-cell__value {
    flex: 6;
    color: #999;
    text-align: left;
  }
</style>