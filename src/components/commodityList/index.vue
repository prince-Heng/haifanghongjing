<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list :immediate-check="false" offset="200" v-model="loading" :finished="finished"
      :finished-text="$lang['没有更多了']" @load="onLoad">
      <commodity-item :list="dataList"></commodity-item>
    </van-list>
  </van-pull-refresh>
</template>

<script>
  //import ImgUrlPath from "@/utils/imgConfig";
  import countDown from "@/components/commen/countDown";
  import commodityItem from "./items"
  import filter from "@/filter/filter";

  export default {
    name: "commodityList",
    components: {
      commodityItem
    },
    props: {
      commodity: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },

    data() {
      return {
        //imgUrlPath: ImgUrlPath.ImgUrlPath,
        offset: 100,
        pagesize: 10,
        pagenum: 1,
        total: 0,
        dataList: [],
        loading: false,
        finished: false,
        refreshing: false
        // curtime: new Date().getTime()
      };
    },
    methods: {
      // 获取数据
      getList() {
        this.loading = true;
        this.$request.fetchCommodityList(
          this.commodity.listtype,
          this.commodity.code,
          this.pagesize,
          this.pagenum
        )
          .then(res => {
            this.loading = false;
            if (res.code == 0) {
              this.dataList = res.data.items;
              this.total = res.data.total;
              if (this.dataList.length >= this.total) {
                this.finished = true;
              }
            }

          });
      },

      onRefresh() {
        this.pagenum = 1;
        this.finished = false;

        this.getList();
        this.refreshing = false;
      },
      onLoad() {
        this.pagenum++
        this.getList()

      }
    },
    mounted() {
      this.$nextTick(() => {
        this.onRefresh()
      })

    }
  };
</script>
<style scoped lang="less">
  #commodityList {
    margin-top: 10px;
    padding: 0 10px;

    .commodityBox {
      flex-wrap: wrap;
      font-size: 14px;

      .commodityContainer {
        background-color: #fff;
        margin-bottom: 10px;
        padding: 10px !important;
        border-radius: 20px;

        // box-shadow: #666 5px 5px 5px;
        .textBox {
          margin: 5px 0px 5px 0px;

          .colon {
            display: inline-block;
            margin: 0 4px;
            color: black;
          }

          .block {
            display: inline-block;
            width: 30px;
            color: #fff;
            font-size: 12px;
            text-align: center;
            background-color: #ee0a24;
          }

          .batch {
            color: green;
          }

          .batch p {
            margin: 3px;
          }
        }
      }
    }
  }
</style>