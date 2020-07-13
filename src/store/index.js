// store/index.js
// import _this from "@/main.js"
import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/apis'
Vue.use(Vuex)
    // 引入本地存储的方法
export default new Vuex.Store({

    state: {
        orderBuffer: {},
        token: localStorage.getItem('token'),
        //购物车数据储存
        cartList: [],
        username: "",
        nickname: "",
        // cartNumber: localStorage.getItem('cartNum') || 0,
        storeinfo: {

        },
        userInfo: {},
        activitys: [],
        swiperList: [],
        // getAddress:JSON.parse(localStorage.getItem('setAddress'))||null,
        sid: localStorage.getItem("sid"),
        odList: [
            { label: "全部", value: "-1" },
            {
                label: '待支付',
                value: "0"
            },
            {
                label: '待发货',
                value: "1"
            },
            {
                label: '待收货',
                value: "2"
            },
            {
                label: '已完成',
                value: "3"
            },
            {
                label: '已取消',
                value: "4"
            }
        ],
    },
    mutations: {
        clear(state) {
            state.orderBuffer = {}
            state.token = ""
                //购物车数据储存
            state.cartList = []
            state.username = ""
            state.nickname = ""

            state.userInfo = {}
        },
        setToken(state, token) {
            state.token = token
            localStorage.setItem("token", token);
        },
        setUserName(state, payload) {
            state.username = payload
        },
        setNickName(state, payload) {
            state.nickname = payload
        },

        loadCartList(state, list) {
            state.cartList = list
        },

        addCart(state, cart) {

            state.cartList.unshift(cart)
        },

        removeCart(state, carts) {
            for (var i in carts) {
                for (var j in state.cartList) {
                    if (carts[i].skucode == state.cartList[j].skucode) {
                        state.cartList.splice(j, 1)
                        break
                    }
                }
            }
        },



        // 数据缓存
        orderBuffer(state, payload) {
            state.orderBuffer = payload
            localStorage.setItem('orderBuffer', JSON.stringify(payload))
        },


        getUserInfo(state, payload) {
            state.userInfo = payload
        },

        getUserName(state, payload) {
            state.username = payload
        },

        setSid(state, payload) {
            let old = localStorage.getItem("sid")
            if (payload == "") {
                if (old == undefined || old == "") {
                    payload = "shopvill"
                }
            } else {
                state.sid = payload
            }
            if (payload != "")
                localStorage.setItem("sid", payload);
        },
        setStoreInfo(state, payload) {
            state.activitys = []
            for (var i in payload.activitys) {
                if (payload.activitys[i] != "")
                    state.activitys.push(state.activitys[i])
            }
            state.storeinfo = payload
        },

        setActivitys(state, payload) {
            state.activitys = []
            payload.forEach(function(active) {
                if (active != "") {
                    state.activitys.push(active)
                }
            });
            //  console.log("payload", payload)
        },
        setSwiperList(state, payload) {
            state.swiperList = payload
        },
    },
    getters: {},

    actions: {

        syncUpdateUserInfo({ commit }) {
            api.getUser().then(res => {
                console.log(res);
                if (res.code == 0) {
                    commit("setUserName", res.data.username);
                    commit("setNickName", res.data.nickname);
                }
            });
        },
        addCart({ commit, state }, cart) {
            let buffItem = null
                //寻找原有列表 有的话增加数量
            if (state != null) {
                state.cartList.forEach(item => {
                    if (item.skucode == cart.skucode) {
                        item.productNumber += cart.productNumber
                        buffItem = item
                    }
                })
            }

            //如果已登陆 保存增加数量的购物车元素或新的到服务器 
            if (localStorage.getItem('token')) {
                if (buffItem != null) { //原有的
                    api.saveCart(buffItem).then(res => {
                        if (res.code == 0) {

                        }
                    })
                } else { //新的
                    api.saveCart(cart).then(res => {
                        if (res.code == 0) {
                            commit("addCart", res.data)
                        }
                    })
                }
            } //否则保存到本地存储 如果是新增的则加一个元素
            else {
                if (buffItem == null) {
                    commit("addCart", cart)
                }
                localStorage.setItem("cartlist", JSON.stringify(state.cartList))
            }
        },
        removeCart({ commit }, carts) {
            if (localStorage.getItem('token')) {
                let ids = []
                carts.forEach(cart => {
                    ids.push(cart._id)
                })
                api.deleteCart(ids.join(",")).then(res => {
                    if (res.code == 0) {
                        commit("removeCart", carts)
                    }
                })
            } else {
                commit("removeCart", carts)
            }
        },

        updateCart({ commit, state }, cart) {
            if (localStorage.getItem('token')) {
                api.saveCart(cart).then(res => {
                    if (res.code == 0) {

                    }
                })
            } else {
                localStorage.setItem("cartlist", JSON.stringify(state.cartList))
            }
        },

    },
    modules: {}
});