<template>
  <div>
    <search></search>
    <div class="category">

      <!-- 左边分类 -->
      <van-sidebar v-model="activeKey" v-if="LangType=='ru'">
        <van-sidebar-item :title="item.runame" v-for="(item, index) in menu" :key="index" @click="tabClick(index)" />
      </van-sidebar>
      <van-sidebar v-model="activeKey" v-else>
        <van-sidebar-item :title="item.name" v-for="(item, index) in menu" :key="index" @click="tabClick(index)" />
      </van-sidebar>
      <!-- 右边商品 -->
      <right :goods="goods" v-if="goods.length > 0"></right>
    </div>
  </div>
</template>

<script>
  import right from "./components/rightShop";
  // import { getClassify } from "../../api/apis";
  import search from "@/components/commen/searchTab";
  export default {
    name: "Service",
    props: {},
    data() {
      return {
        menu: [],
        goods: [],
        activeKey: 0,
      };
    },
    mounted() {
      this.getMenu();
    },
    methods: {
      // 点击事件
      tabClick(index) {
        this.activeKey = index;
        this.getMenu();
      },
      // 获取数据
      getMenu() {
        this.$request.getClassify().then((res) => {
          if (res.code == 0) {
            this.menu = res.data.items;
            this.goods = res.data.items[this.activeKey].items;
          }
        })
      },
    },
    components: {
      right,
      search,
    },
  };
</script>
<style scoped lang="less">
  .category {
    padding-top: 45px;
    height: calc(~"100vh - 94px");
    display: flex;

    /deep/.van-sidebar-item--select::before {
      height: 35px;
      width: 3.312px;
      background-image: linear-gradient(rgb(245, 220, 187), rgb(254, 121, 35));
      border-radius: 55.2px;
    }

    /deep/.van-sidebar-item {
      text-align: center;
      overflow: hidden;
      word-break: break-word;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      font-size: 12px;
      padding: 12px;
    }

  }
</style>