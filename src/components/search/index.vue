<style scoped lang="less">
</style>

<template>
  <div class="search-container">
    <form action="/">
      <van-search v-model="searchStr" show-action :placeholder="this.$lang['请输入商品名称']" @cancel="$router.back(-1)"
        shape="round" :action-text="this.$lang['取消']" @search="onRefresh" />
    </form>

    <div id="commodityList">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list :immediate-check="false" offset="200" v-model="loading" :finished="finished"
          :finished-text="$lang['没有更多了']" @load="onLoad">
          <commodity-item :list="dataList"></commodity-item>
        </van-list>
      </van-pull-refresh>
    </div>

  </div>
</template>


<script>
  //import ImgUrlPath from "@/utils/imgConfig";
  import countDown from "@/components/commen/countDown";
  import commodityItem from "@/components/commodityList/items"

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
        searchStr: "",
        offset: 100,
        pagesize: 10,
        pagenum: 1,
        total: 0,
        dataList: [],
        loading: false,
        finished: false,
        refreshing: false

      };
    },
    methods: {
      // 获取数据
      getList() {
        if (this.searchStr == "") {

          return
        }

        this.loading = true;
        this.$request.fetchCommodityList(
          "search",
          this.searchStr,
          this.pagesize,
          this.pagenum
        )
          .then(res => {
            this.dataList = res.data.items;
            this.total = res.data.total;
            this.loading = false;
          });
      },
      // ProductName(name) {
      //   if (this.LangType == "") return name;
      //   if (this.$lang[name] == undefined) {
      //     return name;
      //   }
      //   return this.$lang[name];
      // },
      // 点击跳转详情页
      goProduct(id) {
        this.$router.push(`/product/${id}`);
      },
      onRefresh() {
        this.pagenum = 1;
        this.finished = false;

        this.getList();
        this.refreshing = false;
      },
      onLoad() {

        this.pagenum++
        this.loading = true;
        this.$request.fetchCommodityList(
          "search",
          this.searchStr,
          this.pagesize,
          this.pagenum
        )
          .then(res => {
            if (res.code == 0) {
              this.total = res.data.total;
              this.dataList.push(...res.data.items);
              this.loading = false;
            }
            if (this.dataList.length >= this.total) {
              this.finished = true;
            }
          });

      }
    },
    mounted() {

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