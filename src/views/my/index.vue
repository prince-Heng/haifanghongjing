<template>
  <div class="container">
    <cUser></cUser>
    <cCell></cCell>
  </div>
</template>

<script>
import cUser from "./components/user";
import cCell from "./components/cell";
export default {
  
  name: "my-index",
  components: {
    cUser,
    cCell
  },
  meta: {},
  data() {
    return {
    };
  },
  methods: {
    
  },

};
</script>

<style lang="less" scoped>
</style>
