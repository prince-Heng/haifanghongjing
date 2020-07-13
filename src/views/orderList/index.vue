<template>
  <div id="orderList">
    <van-nav-bar class="top" :title="$lang['订单管理']" left-arrow @click-left="onClickLeft" fixed border />
    <van-tabs v-model="activeName" class="oList" @click="onClick">
      <van-tab :title="$lang[item.label]" :name="item.value" v-for="(item, index) in list" :key="index" class="title">
        <van-collapse v-model="activeNames">
          <van-collapse-item :name="index" v-for="(item, index) in orderList" :key="index">
            <template #title>
              <div>
                订单编号:
                <span>{{ item._id.substr(-8) }}</span>
                <div>
                  <span>订单状态:</span>
                  <span style="margin-left:10px;color:green">{{orderStatus(item.status)}}</span>

                  <span class="userAction" style="float:right">
                    <van-button type="danger" size="mini" plain @click.stop.prevent="cancle(item._id)"
                      v-if="item.status=='0'||item.status=='1'">取消订单</van-button>
                    <van-button type="info" size="mini" @click.stop.prevent="finished(item._id,item.status)"
                      style="margin-left:20px" v-if="item.status=='2'">订单收货</van-button>
                  </span>
                </div>
              </div>
            </template>

            <div class="shopLists">
              <div v-if="item.logId">
                物流号:
                <span>{{ item.logId.substr(0, 8) }}</span>
              </div>
              <div v-if="item.logType">
                物流类型:
                <span>{{ item.logType }}</span>
              </div>
              <van-card v-for="(n, index) in item.productList" :key="index" :num="n.productNumber" :price="n.skuprice"
                :desc="n.name" :thumb="$imgpath(n.pic)" :title="$lang['商品名称']" currency="₽">
                <template #tags>
                  <van-tag plain type="danger" v-for="(i,index) in attribute(n.attributeList)" :key="index">{{ i }}
                  </van-tag>
                  <van-tag>aaa</van-tag>
                </template>
              </van-card>
            </div>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import { orderList, order } from "@/api/apis"
  //import baseUrl from "@/utils/imgConfig";
  export default {
    name: "OrderList",
    props: {},
    data() {
      return {
        //baseUrl: baseUrl.ImgUrlPath,
        list: [],
        orderList: [],
        status: "-1",
        orderall: [],
        activeName: -1,
        orderId: "",
        activeNames: ["1"]
      };
    },

    methods: {
      attribute(item) {

        let name = Object.values(item)
        return name
      },
      // 取消订单
      cancle(id) {
        const infoCancel = {
          _id: id,
          status: '4'
        }
        this.$request.order(infoCancel).then(res => {
          if (res.code == 0) {
            this.getOrderList();
          }

        })

      },
      // 订单已收货
      finished(id) {
        const infoFinsh = {
          _id: id,
          status: '3'
        }
        this.$request.order(infoFinsh).then(res => {
          if (res.code == 0) {
            this.getOrderList();
          }

        })
      },
      orderStatus(status) {
        switch (status) {
          case "0":
            return "待付款";
            break;
          case "1":
            return "待发货";
            break;
          case "2":
            return "待收货";
            break;
          case "3":
            return "完成收货";
            break;
          case "4":
            return "已取消";
            break;
        }
      },
      getOrderList() {
        var status = {
          status: this.status
        };
        this.$request.orderList(this.status).then(res => {
          if (res.code == 0) {
            this.orderList = res.data.items;
          }

        });
      },
      onClick(name) {
        this.status = name;
        this.getOrderList();
      },
      //点击左侧按钮跳转到上一级
      onClickLeft() {
        this.$router.back(-1);
      },
      //从vuex中获取订单状态数据
      getData() {
        this.list.push(...this.$store.state.odList);
      }
    },
    created() {
      this.getData();
      this.getOrderList();

    }
  };
</script>
<style scoped lang="less">
  #orderList {
    /deep/.van-tabs__wrap {
      position: fixed;
      top: 40px;
      width: 100%;
      z-index: 999;

      /deep/.van-tab__text {
        font-size: 12px;
      }
    }

    .title {
      margin-top: 80px;
    }

    .shopOrder {
      padding: 5px;
      width: 100%;
      position: relative;
      box-sizing: border-box;

      .shopLists {
        width: 100%;
        position: relative;
        border-radius: 20px;

        .van-card {
          background-color: #fff;
          border-radius: 20px;
          margin-top: 15px;
        }
      }
    }
  }
</style>