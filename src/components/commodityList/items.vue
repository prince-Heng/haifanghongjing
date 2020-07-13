<template>
    <div id="commodityList">
        <van-row gutter="11" type="flex" class="commodityBox" justify="space-around">
            <van-col span="11" v-for="(item, index) in list" :key="index" class="commodityContainer"
                @click="goProduct(item._id)">

                <div class="imgBox">

                    <img height="100%" width="100%" :src="$imgpath(item.albumPics[0])" />
                </div>
                <div class="textBox">
                    <countDown :time="item"></countDown>
                    <div v-if="$lang.language == 'cn'">{{ item.name }}</div>
                    <div v-else>{{item.runame }}</div>
                    <div class="batch" v-if="item.bradePrice && $store.state.userInfo.roles">
                        <p>{{ $lang["批发价"] }} </p>
                        <p>₽{{ item.bradePrice}}</p>
                    </div>
                    <div class="price">₽{{item.price }}</div>
                    <div class="sales">
                        {{
          $lang["已售_"] + Math.floor(Math.random() * 100) + $lang["件"]
          }}
                    </div>
                </div>
            </van-col>
            <van-col span="11" v-if="list.length%2==1"></van-col>
        </van-row>
    </div>
</template>
<script>
    import countDown from "@/components/commen/countDown";
    export default {
        components: {
            countDown
        },
        props: {
            list: {
                type: Array,
                default: () => {
                    return [];
                }
            }
        },
        name: "commodityItem",
        methods: {
            goProduct(id) {
                this.$router.push(`/product/${id}`);
            },
        }
    }
</script>

<style scoped lang="less">
    #commodityList {
        margin-top: 10px;
        padding: 0 10px;

        .commodityBox {
            flex-wrap: wrap;
            font-size: 14px;

            .commodityContainer {
                background-color: #fff;
                margin-bottom: 10px;
                padding: 10px !important;
                border-radius: 20px;

                // box-shadow: #666 5px 5px 5px;
                .textBox {
                    margin: 5px 0px 5px 0px;

                    .colon {
                        display: inline-block;
                        margin: 0 4px;
                        color: black;
                    }

                    .block {
                        display: inline-block;
                        width: 30px;
                        color: #fff;
                        font-size: 12px;
                        text-align: center;
                        background-color: #ee0a24;
                    }

                    .batch {
                        color: green;
                    }

                    .batch p {
                        margin: 3px;
                    }
                }
            }
        }
    }
</style>