<template>
  <div>
    <van-nav-bar :left-text="$lang['返回']" left-arrow @click-left="onClickLeft" />
    <div class="titleWrapper">
      <h1 class="title">{{ $lang["高级商城"] }}</h1>
      <h2 class="methods" v-if="isShow">{{ $lang["登录"] }}</h2>
      <h2 class="methods" v-if="!isShow">{{ $lang["注册"] }}</h2>
    </div>
    <!-- 登陆 -->
    <div class="loginShop" v-if="isShow">
      <div class="login">
        <van-form @submit="onLogin">
          <van-field
            v-model="nameLogin"
            :name="$lang['用户名']"
            :label="$lang['用户名']"
            :placeholder="$lang['用户名']"
            :rules="[{ required: true, message: this.$lang['请填写用户名'] }]"
          />
          <van-field
            v-model="passwordLogin"
            type="password"
            :name="$lang['密码']"
            :label="$lang['密码']"
            :placeholder="$lang['密码']"
            :rules="[{ required: true, message: this.$lang['请填写密码'] }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="danger" native-type="submit">
              {{
              $lang["立即登录"]
              }}
            </van-button>
          </div>
        </van-form>
      </div>
      <!-- 跳转注册 -->
      <div class="switherWrapper">
        <span>
          {{ $lang["还没有账号"] }}?
          <i @click="register()">{{ $lang["注册"] }}</i>
        </span>
      </div>
    </div>
    <!-- 注册 -->
    <div class="register" v-else>
      <div class="login">
        <van-form @submit="onRegister">
          <van-field
            v-model="userRegister"
            name="pattern "
            :label="$lang['用户名称']"
            :placeholder="$lang['3~16位英文或数字']"
            :rules="[
              { pattern, message: this.$lang['请输入符合规则的用户名'] },
            ]"
          />

          <van-field
            v-model="passwordRegister"
            type="password"
            name="validator"
            :label="$lang['密码']"
            :placeholder="$lang['6~18位英文或数字']"
            :rules="[
              { validator, message: this.$lang['请输入符合规则的密码'] },
            ]"
          />
          <van-field
            v-model="passnewReg"
            type="password"
            :label="$lang['确认密码']"
            :placeholder="$lang['请再一次填写密码']"
          />
          <div style="margin: 16px;">
            <van-button round block type="danger" native-type="submit">
              {{
              this.$lang["立即注册"]
              }}
            </van-button>
          </div>
        </van-form>
      </div>
      <!-- 跳转注册 -->
      <div class="switherWrapper">
        <span>
          <i @click="register()">{{ $lang["已经有账号"] }}</i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from "vant";
export default {
 
  data() {
    return {
      nameLogin: "",
      passwordLogin: "",
      userRegister: "whm",
      passwordRegister: "whm123",
      passnewReg: "whm123",
      pattern: /^[a-zA-Z0-9_-]{3,16}$/, //用户名正则校验
      isShow: true,
      registerflag: false
    };
  },
  inject:['loadCartList'] ,
  created() {
    console.log(this.flag);
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    // 注册密码正则校验
    validator(val) {
      return /^[a-zA-Z0-9_-]{6,18}$/.test(val);
    },

    register() {
      this.isShow = !this.isShow;
    },

    login() {
     
      this.$request
        .login({ username: this.nameLogin, password: this.passwordLogin })
        .then(res => {
          if (res.code == 0) {
            this.$store.commit("setToken", res.data.token);
            this.$store.dispatch("syncUpdateUserInfo");
            this.loadCartList()
            //this.$store.dispatch("loadCartList");
            this.$toast({
              message: `${this.$lang["登录成功"]}`
            });
            //if (this.flag) {
            //  this.$router.push("/");
            //}
            //else {
            this.$router.back(-1);
            // }

            // if (localStorage.getItem("cartInfo")) {
            //   let localCart = JSON.parse(localStorage.getItem("cartInfo"));

            //   localCart.forEach(item => {
            //     this.$store.commit("saveCartList",item)
            //   });

            // }

            // console.log(this.$store.state.cartInfo);
          } else {
            this.$toast({
              message: `${this.$lang["用户名或密码错误"]}`
            });
          }
        });
    },
    // 登陆
    onLogin() {
      this.login();
    },
    // 注册
    onRegister() {
      if (this.passwordRegister != this.passnewReg) {
        this.$toast({
          message: `${this.$lang["两次输入密码不同"] +
            "，" +
            this.$lang["请重新输"]}`
        });
        return;
      }

      this.$request
        .register({ username: this.userRegister, password: this.passnewReg })
        .then(res => {
          console.log(res);
          if (res.code == 0) {
            this.nameLogin = this.userRegister;
            this.passwordLogin = this.passnewReg;
            this.$toast({
              message: `${this.$lang["注册成功"]}`
            });

            this.login();
          }
          if (res.code == 1) {
            this.$toast({
              message: `${this.$lang["该账号已注册"]}`
            });
          }
        });
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.titleWrapper {
  padding: 50px 0px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .title {
    font-size: 28px;
    font-weight: 600;
    color: #666;
  }

  .methods {
    font-size: 18px;
    font-weight: normal;
  }
}

.login {
  padding: 10px 16px;
}

.switherWrapper {
  font-size: 12px;
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;

  i {
    color: red;
    font-style: normal;
  }
}
</style>