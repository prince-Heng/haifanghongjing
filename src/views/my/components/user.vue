<template>
  <div class="user">
    <div class="avatarWrapper">
      <van-image width="65" height="65" fit="cover" round :src="require('@/assets/img/avatar.png')" />
    </div>
    <div class="userWrapper">

      <span class="username" v-if="$store.state.username">
        <!-- <span v-if="$store.state.userInfo.nickname && $store.state.userInfo.nickname.length >0">
          {{$store.state.userInfo.nicname}}</span> -->
        <span> {{$store.state.username}}</span>
      </span>
      <span v-else class="username" @click="goLogin">{{$lang['注册']+'/'+$lang['登录']}}</span>
    </div>
    <div class="actionWrapper" v-if="$store.state.username">
      <router-link to="/my/setting">
        <div class="setting" @click="setting">
          <van-icon class="icon" name="setting-o" />
          <span class="title">{{$lang['设置']}}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "user",
    data() {
      return {
        user: {},
      };
    },
    methods: {
      goLogin() {
        this.$router.push("/login");
      },

      // 设置
      setting() {
        this.$router.push("/my/setting").catch(err => { });
      }
    }
  };
</script>

<style lang="less" scoped>
  .user {
    background: linear-gradient(145deg, #ff0000, #940303);
    height: 135px;
    display: flex;
    align-items: center;

    .avatarWrapper {
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .userWrapper {
      .username {
        color: #fff;
        font-size: 18px;
      }

      align-items: center;
      display: flex;
      flex: 1;
    }

    .actionWrapper {
      display: flex;
      height: 100%;
      align-items: flex-start;
      justify-content: flex-end;

      * {
        color: #fff;
      }

      .setting {
        padding: 10px;

        .icon {
          vertical-align: middle;
          padding: 0 5px 0 0;
        }

        .title {
          font-size: 12px;
        }
      }
    }
  }
</style>