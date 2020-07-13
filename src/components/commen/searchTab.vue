<template>
  <div id="box">
    <!-- 返回按钮 -->
    <van-nav-bar @click-left="onClickLeft" left-arrow v-if="isShow" class="listPage">
      <template #title>
        <van-search class="search" v-model="value" shape="round" :placeholder="$lang['请输入商品名称']" @click="goSearch" />
      </template>
    </van-nav-bar>
    <!-- 搜索框 -->
    <div class="searchDiv" v-else>
      <form>
        <van-search v-model="value" shape="round" :placeholder="$lang['请输入商品名称']" @click="goSearch" />
      </form>
    </div>
  </div>
</template>

<script>
  //import x from ''
  export default {
    name: "Search",
    props: {},
    data() {
      return {
        value: "",
        isShow: false
      };
    },
    components: {},
    computed: {},
    watch: {},
    methods: {
      // 点击返回上一级

      onClickLeft() {
        this.$router.back(-1);
        // console.log(this.$route.path);
      },

      // 控制返回图标显示与否
      show() {
        if (this.$route.path == "/") {
          this.isShow = false;
        } else {
          this.isShow = true;
        }
      },

      // 跳转到搜索页面
      goSearch() {
        this.$router.push("/search");
      }
    },
    created() {
      this.show();
    },
    beforeMount() { },
    mounted() { },
    activated() { }
  };
</script>
<style scoped lang="less">
  #box {
    display: flex;
    top: 0px;
    position: fixed;
    width: 100%;
    z-index: 999;

    .listPage {
      width: 100%;

      .search {
        padding: 0;
      }
    }

    .searchDiv {
      flex: 10;
    }
  }
</style>