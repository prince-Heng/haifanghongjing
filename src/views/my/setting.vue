<template>
  <div class="container">
    <van-nav-bar
      :title="$lang['账户信息']"
      :left-text="$lang['返回']"
      :right-text="$lang['保存']"
      @click-right="onClickRight"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group class="group">
      <van-cell :title="$lang['头像']">
        <template #default>
          <van-image
            :src="require('@/assets/img/avatar.png')"
            width="35"
            height="35"
            fit="cover"
            round
          />
        </template>
      </van-cell>

      <van-field v-model="username" :disabled="true" :label="$lang['用户名']" />

      <van-field v-model="nickname" :label="$lang['昵称']" :placeholder="$lang['请输入您的昵称']" />
      <!-- 增加密码框 -->
      <van-field
        :disabled="isDisabled"
        v-model="newPassword"
        name="validator"
        :label="$lang['密码']"
        :rules="[
              { validator, message: this.$lang['请输入符合规则的密码'] },
            ]"
      >
        <template #button>
          <van-button size="small" @click="passWordChange" center clearable type="primary">更改密码</van-button>
        </template>
      </van-field>
    </van-cell-group>

    <div class="actionWrapper">
      <van-button block class="group" @click="logout" shape="circle">{{$lang['退出登录']}}</van-button>
    </div>
  </div>
</template>

<script>
import { getUser, userSave } from "@/api/apis";
export default {
  name: "my-setting",
   inject:['reload'],
   
  components: {},
  meta: {},
  data() {
    return {
      isDisabled: true,
      username: "",
      newPassword: "********",
      nickname: "",
      img: require("@/assets/img/avatar.png")
    };
  },
  methods: {
    // 保存密码正则校验
    validator(val) {
      return /^[a-zA-Z0-9_-]{6,18}$/.test(val);
    },
    passWordChange() {
      this.isDisabled = false;
      this.newPassword = "";
    },
    // 点击保存  保存个人信息--w
    onClickRight() {
      let userinfo = {
        nickname: this.nickname
      };
      if (this.isDisabled != true) {
        userinfo.password = this.newPassword;
      }
      this.$request.userSave(userinfo).then(res => {
        if (res.code == 0) {
          if (this.isDisabled == false) {
            localStorage.removeItem("token");
            this.$toast.success({
              message: `${this.$lang["请重新登陆"]}`
            });
            this.$router.push("/login");
          } else {
            this.$store.dispatch("syncUpdateUserInfo");
            this.$toast.success({
              message: "保存成功"
            });
          }
        }
      });
    },

    logout() {
      localStorage.removeItem("token");
      this.$store.commit("removeCart", this.$store.state.cartList);
      localStorage.removeItem("cartlist");

      this.nicname = "";
      this.passWord = "";
      this.$toast({
        message: `${this.$lang["已退出"]}`
      });
    this.$store.commit("clear")
      this.$router.replace("/login");
      // this.isRouterAlive = false;
      // this.$nextTick(function() {
      //   this.isRouterAlive = true;
      // });
      //location.reload();
    },
    back() {
      this.$router.back(-1);
    }
  },

  created() {
    this.$nextTick(() => {
      this.username = this.$store.state.username;
      this.nickname = this.$store.state.nickname;
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  /deep/.van-nav-bar .van-icon {
    color: black;
  }

  /deep/.van-nav-bar__text {
    color: black;
  }

  .group {
    margin-bottom: 10px;
  }

  .actionWrapper {
    padding: 10px;
  }
}
</style>