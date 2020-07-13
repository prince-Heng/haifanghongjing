<template>
  <div class="container2">
    <search></search>
    <!-- 商品列表 -->
    <commoditylist :commodity="commodity" v-if="Object.keys(commodity).length>0" @productClick="onProductClick">
    </commoditylist>
  </div>
</template>

<script>
  import search from "@/components/commen/searchTab";
  import commoditylist from "@/components/commodityList"
  // import { commodityList } from "@/api/apis";
  export default {
    components: {
      commoditylist,
      search
    },
    data() {
      return {
        id: "",
        pageSize: 10,
        pageNum: 1,
        show: false, //遮罩层
        commodity: {
          listtype: "",
          code: "0",
        },
      };
    },
    methods: {
      onProductClick(obj) {
        this.$router.push(`/product/${obj._id}`);
      },
    },
    mounted() {
      this.commodity.listtype = this.$route.query.type
      this.commodity.code = this.$route.query.code
      // this.getList();

    },
  };
</script>

<style lang="less" scoped>
  .container2 {
    /deep/ #commodityList {
      padding-top: 54px;
    }
  }
</style>