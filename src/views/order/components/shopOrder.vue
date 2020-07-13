<template>
  <div class="shopOrder">
    <div class="shopLists">
      <!-- 修改cart绑定值 -->
      <van-card v-for="(item, index) in orderBuffer.productList" :key="index" :num="item.productNumber"
        :price=" item.skuprice" :title="item.name" :desc="$lang['商品规格']" :thumb="$imgpath(item.pic)" currency="₽">
        <template #tags>
          <van-tag plain type="danger" v-for="(i,index) in attribute(item.attributeList)" :key="index">{{ i }}</van-tag>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      orderBuffer: {
        type: Object,
        default: () => {
          return {};
        },
      },
    },
    data() {
      return {
        //baseUrl: baseUrl.ImgUrlPath
      }
    },
    methods: {
      attribute(item) {
        return Object.values(item)
      },
    }
  };
</script>

<style lang="less" scoped>
  .shopOrder {
    padding: 10px;

    .van-card {
      background-color: #fff;
      border-radius: 20px;
    }
  }
</style>