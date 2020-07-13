<template>
  <div>
    <van-count-down
      :style="this.$route.path=='/'?'color: #ee0a24':'color: #fff'"
      :time="time.endtime * 1000 - curtime"
      v-if="time.endtime"
      format="DDd HH : mm : ss"
    >
    </van-count-down>
  </div>
</template>

<script>
export default {
  props: {
    time: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data(){
      return{
        curtime: new Date().getTime()
      }
  },
  mounted(){
  }
};
</script>

<style></style>
