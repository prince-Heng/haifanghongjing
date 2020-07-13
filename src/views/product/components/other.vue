<template>
  <div id="boxContainer">
    <div class="top">
      <div class="discounts" v-if="skuPrice == ''">{{product.price }}₽</div>
      <div class="discounts" v-else>{{ skuPrice }}₽</div>
      <!-- <countDown :time="product"></countDown> whm -->
    </div>

    <!-- 库存   购买数量选择 -->
    <div span="6" class="all">{{$lang['库存'] + '：'+ product.stock + $lang['件']}}</div>
    <van-row class="quantity">
      <van-col span="6" class="number">{{$lang['数量']}}</van-col>
      <van-col span="8">
        <van-stepper :max="stock" v-model="productNumber" integer @change="onChange" />
      </van-col>
      <van-col span="4" class="unit">{{$lang['件']}}</van-col>
    </van-row>

    <!-- sku 选择弹层-->

    <div class="ku">
      <van-cell is-link @click="showSku">
        <van-row v-if="skuDataList">
          <van-col span="4">{{$lang['选择']}}</van-col>
          <van-col span="20">
            <div v-if="text">{{$lang['已选']+'：' + text}}</div>
            <div v-else>{{$lang['请选择'] + $lang['颜色分类']}}</div>
          </van-col>
        </van-row>
      </van-cell>
    </div>
    <van-popup class="sku" closeable v-model="show" round position="bottom" :style="{ height: '80%' }">
      <div>
        <van-row>
          <van-col span="8">
            <van-image v-if="changeSkuImg != ''" :src="$imgpath(changeSkuImg)" width="100px" height="100px"
              fit="contain">
            </van-image>
            <van-image v-else :src="$imgpath(defaultSkuImg)" width="100px" height="100px" fit="contain"></van-image>
          </van-col>
          <van-col span="16">
            <div class="skuPrice" v-if="skuPrice != ''">{{ skuPrice }}₽</div>

            <!-- <div class="skuPrice" v-if="items.price">{{item.price}}</div> -->
            <div v-else class="skuPrice">{{product.price }}₽</div>
            <!-- <div class="skuPrice" v-else>{{minPrice |addZero}} ~ {{maxPrice|addZero}}</div> -->


            <div class="skuNum" v-if="skuStock>0">{{$lang['库存']+'：'+skuStock}}</div>
            <div class="skuNum" v-else>{{$lang['库存'] + stock + $lang['件']}}</div>
            <div class="pitch" v-if="text">{{$lang['已选']+'：' + text}}</div>
            <div class="pitch" v-else>{{$lang['请选择规格']}}</div>
          </van-col>
        </van-row>
      </div>
      <div>
        <van-row class="listBox" gutter="20" type="flex">
          <van-col span="12" v-for="(item,index) in skuDataList" :key="index">
            <van-row :class="{newColor:colorIndex===index}" class="skuLis" @click="getSkus(index)"
              :disabled="item.skunum == 0">
              <van-col class="litieImg" span="6">
                <van-image round width="30px" height="30px" :src="$imgpath(item.pic)"></van-image>
              </van-col>
              <van-col class="colorName" span="18">
                <div class="miniColorName" v-for="(item,index) in Object.values(item.attributeList)" :key="index">
                  {{item}}
                </div>
              </van-col>
            </van-row>
          </van-col>
        </van-row>

        <van-button class="submitcart" type="warning" round size="large" :text="this.$lang['加入购物车']"
          @click="submitCartItem"></van-button>
      </div>
    </van-popup>

    <div class="parame" v-if="attarList">
      <!-- 参数表弹层 -->
      <van-cell is-link @click="showParmas">{{$lang['参数'] + $lang['规格'] + '...'}}</van-cell>
      <van-popup v-model="parmas" round position="bottom" :style="{ height: '50%' }">
        <div class="paramsTitle">{{$lang['产品参数']}}</div>
        <van-cell-group class="dataList" v-for="(item,index) in attarList" :key="index">
          <van-cell :title="item.name" :value="item.value" />
        </van-cell-group>
      </van-popup>
    </div>
    <!-- 商品详情 -->

    <div class="productTitle">{{$lang['商品详情']}}</div>
    <van-divider :style="{color:'#999'}"></van-divider>
    <div v-if="product.detailMobileHtml" class="container" v-html="getMobile()"></div>
    <div v-else style="text-align:center;">{{$lang['暂无数据']}}</div>
  </div>
</template>

<script>
  //import x from ''
  //import baseUrl from "@/utils/imgConfig";
  import filter from "@/filter/filter";
  import countDown from "@/components/commen/countDown";
  import { eventBus } from "@/main";
  import { getSkulist, getCart } from "@/api/apis";

  export default {
    name: "other",
    props: {
      product: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },

    data() {
      return {
        cartNum: 0,
        logOutCart: [],
        attarList: [],
        selectedSku: null, //传入购物车数据
        stock: 0, //全部sku库存
        parmaKey: [], //key
        parmaVal: [], //val
        isRed: false, //控制选择样式
        colorIndex: "", //控制选择样式
        productNumber: 1,
        show: false, //控制商品sku选择弹层显示
        parmas: false,
        skuDataList: [],
        // minPrice: this.items.priceMin,
        // maxPrice: this.items.priceMax,
        // priceList: [],
        //baseUrl: baseUrl.ImgUrlPath, //图片根目录地址
        defaultSkuImg: '',
        changeSkuImg: "", //当前选择的img
        text: "",
        skuPrice: "",
        skuStock: 0, //sku库存
        curtime: new Date().getTime(),
        skuPric: ""
      };
    },
    components: {
      countDown
    },
    computed: {},
    watch: {
      productNumber(newValue, oldValue) {
        if (this.selectedSku) {
          this.selectedSku.productNumber = newValue;
          // eventBus.$emit("getSkuData", this.lists);
        }
      }
    },
    methods: {
      // getLocalStorage() {
      //   if (
      //     !localStorage.getItem("token") &&
      //     JSON.parse(localStorage.getItem("cartInfo") != null)
      //   ) {
      //     this.logOutCart.push(...JSON.parse(localStorage.getItem("cartInfo")));
      //   }
      // },
      submitCartItem() {
        if (!this.selectedSku) { //whm?
          this.$toast({
            message: this.$lang["请选择商品规格"]
          });
        } else {

          let sku = this.selectedSku
          const localInfo = {
            attributeList: sku.attributeList,
            productId: this.product._id,
            categoryNameRu: this.product.categoryNameRu,
            categoryName: this.product.categoryName,
            skuprice: sku.skuprice,
            productNumber: sku.productNumber,
            skuImg: this.product.albumPics[0],
            pic: sku.pic,
            name: this.product.name,
            isChecked: false,
            productSn: sku.productSn,
            skuplace: sku.skuplace,
            skucode: sku.skucode
          };

          this.$store.dispatch("addCart", localInfo);
          // this.$store.dispatch("loadCartList")

          // console.log(this.$store.state.cartInfo);

          this.$toast.success(this.$lang["添加成功"]);
          this.show = false;
          this.colorIndex = "";
          this.skuPrice = "";
          this.skuStock = 0;
          this.selectedSku = null;
        }
      },

      // loadCartList() {
      //   if (localStorage.getItem("token")) {
      //     //已经登陆
      //     this.$request.getCart().then(res => {
      //       if (res.code == 0) {
      //         this.$store.commit("setCartList", res.data.items);
      //       }
      //     })
      //   } else {
      //     let listBuff = []
      //     let str = localStorage.getItem("cartlist")
      //     if (str != null)
      //       listBuff = JSON.parse(str)
      //     this.$store.commit("setCartList", listBuff);

      //   }


      // },

      getMobile() {
        let html = this.product.detailMobileHtml.replace(
          RegExp("<img ", "g"),
          "<img style='width:100%'"
        );
        html = html.replace(
          RegExp('src="', "g"),
          'src="' + this.$request.imgpath("")
        );
        return html;
      },

      // 获取sku
      getSkulist() {
        console.log("pppp", this.product)
        this.$request.getSkulist(this.product.productSn, this.$store.state.sid).then(res => {
          if (res.code == 0) {
            console.log("res", res)
            this.defaultSkuImg = this.product.albumPics[0]; //?
            this.skuDataList = res.data.items;
            this.stock = 0
            this.skuDataList.forEach(item => {
              this.stock += parseInt(item.skunum);
            });
          }


          // if (res.data.items) {
          //   this.skuData = res.data.items;
          //   // skus.forEach((sku, index) => {
          //   //   if (Object.values(sku.attributeList).length == 0) {
          //   //     datas.splice(index, 1);
          //   //   }
          //   // });

          //   // this.skuData = datas;
          //   this.skuData.forEach(item => {
          //     this.stock += parseInt(item.skunum);
          //   });
          // } else {
          //   this.skuData = null;
          //   this.stock = this.items.stock;
          // }
        });
      },

      // 选择sku规格
      getSkus(index) {
        let sku = this.skuDataList[index]
        this.colorIndex = index;
        this.selectedSku = sku;
        this.skuPrice = sku.skuprice;
        // this.changeSkuImg = sku.pic
        this.skuPrice = sku.skuprice + "0";
        this.skuStock = sku.skunum;
        this.text = Object.values(sku.attributeList).join("-");
        this.selectedSku.productNumber = this.productNumber;
      },

      // 设置产品规格弹层
      attributeList() {
        let attributeList = this.product.attributeList;
        this.attarList = []
        for (let name in attributeList) {
          this.attarList.push({
            name,
            value: attributeList[name]
          });
        }

      },

      //sku弹层
      showSku() {
        this.show = true;
      },
      // 商品参数弹层控制
      showParmas() {
        this.parmas = true;
      },

      onChange(productNumber) {
        this.productNumber = productNumber;
      },
      //  点击切换样式更新顶部
      changeStyle(index) {
        this.colorIndex = index;
      }
    },

    created() {
      //this.$nextTick(() => {
      this.getSkulist();
      this.attributeList();
      // })

      // this.getLocalStorage();
      // console.log(this.$store.state.cartInfo);
    },
    beforeMount() { },
    mounted() {
      eventBus.$on("sku", showSkuList => {
        this.show = showSkuList;
      });
    },
    activated() { }
  };
</script>
<style scoped lang="less">
  #boxContainer {
    margin-bottom: 50px;
  }

  .top {
    background-color: #ff2d2d;
    position: relative;

    .discounts {
      font-size: 25px;
      color: #fff;
      height: 40px;
      line-height: 40px;
      padding-left: 13px;
    }

    /deep/.van-count-down {
      padding: 0px 20px;
      font-size: 18px;
      position: absolute;
      right: 0px;
      top: 20px;
      color: #fff;
    }

    .price {
      text-decoration: line-through;
      font-size: 14px;
      color: #fff;
      height: 25px;
      line-height: 25px;
      padding-left: 13px;
    }
  }

  .all {
    padding-left: 20px;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    border-top: 10px solid #eeeeee;
    background: #fff;
  }

  .quantity {
    font-size: 16px;
    // margin: 10px 0 8px 0;
    border-top: 10px solid #eeeeee;
    border-bottom: 10px solid #eeeeee;
    height: 50px;
    line-height: 50px;
    background: #fff;

    .number {
      margin-left: 10px;
      margin-right: 50px;
    }

    .unit {
      margin-left: 20px;
    }
  }

  .ku {
    margin-bottom: 5px;
    border-bottom: 10px solid #eeeeee;

  }

  .box {
    border-bottom: 5px solid #eeeeee;
    width: 100%;
    height: 100px;

    .select {
      color: #999;
    }

    .lbox {
      margin-top: 10px;

      .shows {
        margin-left: 3px;
        border-radius: 5px;
        height: 37.4px;
        line-height: 37.4px;
        overflow: hidden;
      }

      .text {
        overflow: hidden;
        margin-top: 3.7px;
        font-size: 10px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #ccc;
        color: #999;
        border-radius: 5px;
      }
    }
  }

  .sku {
    box-sizing: border-box;
    padding: 30px 15px 0px 15px;

    .skuPrice {
      font-size: 14px;
      color: red;
      margin-top: 35px;
    }

    .skuNum {
      font-size: 14px;
      margin: 8px 0;
    }

    .pitch {
      font-size: 14px;
    }

    .listBox {
      flex-wrap: wrap;
      margin-top: 10px;

      .skuLis {
        text-align: center;
        height: 40px;
        border-radius: 20px;
        overflow: hidden;
        margin-bottom: 20px;

        .litieImg {
          background-color: #eee;
          padding-top: 5px;
        }

        .colorName {
          height: 100%;
          background-color: #eee;
          // line-height: 38.71px;
          font-size: 10px;
          display: flex;
          align-items: center;

          .miniColorName {
            flex: 1;
          }
        }
      }
    }

    .submitcart {
      position: fixed;
      bottom: 0px;
      left: 0px;
      z-index: 2;
    }
  }

  .newColor {
    border: 1px solid red;
    color: red;
  }

  .popup {
    font-size: 14px;

    .first {
      margin: 15px;
      height: 90px;

      .left {
        height: 100%;
      }

      .price {
        .number {
          margin-top: 10px;
          font-size: 22px;
          color: red;
        }

        .surplus {
          color: #999;
        }
      }
    }

    .Cclassify {
      margin: 15px;

      .Clist {
        flex-wrap: wrap;

        .nape {
          border-radius: 5px;
          margin-right: 10px;
          overflow: hidden;
          background-color: #eee;

          .boxts {
            height: 30px;
            width: 30px;
            padding: 5px;
          }

          .txt {
            border-radius: 3px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 12px;
            padding-right: 10px;
          }
        }
      }
    }

    .click {
      border: 1px solid red;
      color: red;
    }
  }

  .parame {
    margin-bottom: 5px;
    border-bottom: 10px solid #eeeeee;
  }

  .paramsTitle {
    text-align: center;
    padding: 10px 0;
    font-size: 14px;
  }

  .dataList {
    padding: 0 10px;
  }

  .productTitle {
    // color: #ccc;
    margin-top: 20px 0;
    font-size: 20px;
    text-align: center;
  }

  .container {
    text-align: center;
    font-size: 12px;
  }
</style>