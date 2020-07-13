<template>
  <div>
    <van-swipe :autoplay="3000" indicator-color="red">
      <van-swipe-item v-for="(item,index) in swiperList" :key="index">
        <!-- <router-link > -->
        <img v-if="item.img" :src="$imgpath(item.img)" />
        <!-- </router-link> -->
        <img v-else width="100%" height="100%" v-lazy="$imgpath(item)" @click="preview()" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>

  import { ImagePreview } from "vant"
  export default {
    name: "Swiper",
    props: {
      swiperList: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
      }
    },
    methods: {
      preview() {
        ImagePreview(this.swiperList)
      },
    },
  }
</script>
<style scoped lang="less">
  img {
    height: 100%;
    width: 100%;
  }
</style>