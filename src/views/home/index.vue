<template>
  <div id="home">
    <search></search>
    <cSweiper class="swiper" :swiperList="$store.state.swiperList"></cSweiper>
    <ccommodity></ccommodity>
  </div>
</template>
<script>
  import search from "@/components/commen/searchTab";
  import cSweiper from "@/components/commen/swiper";
  import ccommodity from "./components/commodity";

  export default {
    name: "Home",
    props: {},

    components: {
      search,
      cSweiper,
      ccommodity
    },
  };
</script>
<style scoped lang="less">
  .swiper {
    padding-top: 54px;
  }
</style>