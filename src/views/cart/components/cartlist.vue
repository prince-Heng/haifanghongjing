<template>
    <div>
        <div>


            <!-- 商品 -->
            <div class="goodShow">
                <van-row v-for="(item,index) in $store.state.cartList" :key="item._id">
                    <van-col span="4" class="checkOnly" @click="checkGroup(item)">
                        <van-checkbox v-model="item.isChecked"></van-checkbox>
                    </van-col>
                    <van-col span="20">
                        <van-card :price="item.skuprice" :desc="$lang['商品规格']" :title="item.name"
                            :thumb="$imgpath(item.pic)" currency="₽" @click-thumb="goProduct(item.productId)">
                            <template #tags>
                                <van-tag plain type="danger" v-for="(attr,key) in item.attributeList" :key="key">
                                    {{ attr }}
                                </van-tag>
                            </template>
                            <template #footer>
                                <van-stepper v-model="item.productNumber" @change="onChangeNum(index)"  />
                            </template>
                        </van-card>
                    </van-col>
                </van-row>
            </div>

            <div class="chart">
                <van-submit-bar :label="$lang['全选']" :button-text="$lang['提交订单']" @submit="onSubmit"
                    :price="calcTotalPrice*100" currency="₽">
                    <van-checkbox v-model="isCheckAll" @click="checkAll(true)">
                        {{
                      $lang["全选"]
                      }}
                    </van-checkbox>
                </van-submit-bar>
            </div>
        </div>
    </div>
</template>

<script>
    //import baseUrl from "@/utils/imgConfig";

    // import {
    //     getCart,
    //     order,
    //     deleteCart,
    //     orderConfirm
    // } from "@/api/apis";

    export default {

        data() {
            return {

                isCheckAll: false,
                sumPrice: 0, //总价
                allCkeckData: [] //选中的商品信息
            };
        },
        created() { },

        computed: {
            calcTotalPrice() {
                //每次遍历商品之前对总金额进行清零
                let isCheckAll=true
                this.sumPrice = 0;
                this.$store.state.cartList.forEach((item, index) => {
                    if (item.isChecked == true) {
                        this.sumPrice += item.skuprice * item.productNumber;
                    }else{
                        isCheckAll=false
                    }
                });
                this.isCheckAll=isCheckAll
                return this.sumPrice;
            }
        },

        methods: {
            onChangeNum(index) {
                this.$store.dispatch("updateCart", this.$store.state.cartList[index]);
            },

            //跳转详情页
            goProduct(id) {
                this.$router.push("/product/" + id);
            },

            // 确认订单
            onSubmit() {

                let selectedList = [];
                this.$store.state.cartList.forEach((item, index) => {
                    if (item.isChecked == true) {
                        selectedList.push(item)
                    }
                });
                if (selectedList.length == 0) {
                    this.$toast({
                        message: `${this.$lang["请选择要购买的商品"]}`
                    });
                    return
                }

                if (this.$store.state.token == null) {
                    this.$router.push("/login");
                    return
                }

                this.$request.orderConfirm(selectedList).then(res => {
                    if (res.code == 0) {
                        this.$store.commit("orderBuffer", res.data)
                        this.$router.push("/order")
                    } else {
                        this.$toast({
                            message: `${this.$lang["订单创建失败"]}`
                        });
                    }
                });
            },

            checkGroup(item) {
                item.isChecked = !item.isChecked; //状态取反
                this.isCheckAll = true;
                 this.$store.dispatch("updateCart", item);
                this.$store.state.cartList.forEach((item, index) => {
                    if (item.isChecked === false) {
                        this.isCheckAll = false;

                        return
                    }
                });
            },
            // 全选
            checkAll() {
                this.isCheckAll != this.isCheckAll;
                this.$store.state.cartList.forEach((item, index) => {
                    item.isChecked = this.isCheckAll
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    .goodShow {
        padding-top: 5px;
        padding-bottom: 100px;
        .van-row {
            background-color: #fff;
            margin: 10px;

            .checkOnly {
                margin-top: 55px;
                padding-left:5%;
            }
            /deep/.van-card{
                background: #fff;
            }
        }
    }

    .chart {
        /deep/ .van-submit-bar {
            bottom: 50px;
        }
    }
</style>