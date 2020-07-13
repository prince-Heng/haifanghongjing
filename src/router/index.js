import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import guard from './guard'
const router = new VueRouter({

    routes: [{
        path: "/login",
        name: "login",
        component: () =>
            import("@/views/login")
    },
    // 首页
    {
        path: "/",
        name: 'home',
        meta: {
            showTab: true
        },
        component: () =>
            import("@/views/home/index.vue")
    },
    // 分类内部
    {
        path: "/listPage",
        name: "listPage",
        params: {
            type: '',
            code: ''
        },
        // meta: {
        //     showTab: true
        // },
        component: () =>
            import("@/views/listPage/index.vue"),
    },
    // 购物车
    {
        path: "/cart",
        meta: {
            // private: true,
            showTab: true
        },
        component: () =>
            import("@/views/cart/index.vue")
    },
    // 订单页
    {
        path: "/order",
        meta: {
            private: true,
            // showTab: true
        },
        component: () =>
            import("@/views/order/index.vue")
    },
    // 订单列表页
    {
        path: "/orderList",
        meta: {
            private: true,
            showTab: true
        },
        component: () =>
            import("@/views/orderList/index.vue")
    },
    // 订单详情
    {
        path: "/orderDetail/:id",
        meta: {
            private: true,
            showTab: true
        },
        component: () =>
            import("@/views/orderList/orderDetail.vue")
    },
    // 个人中心
    {
        path: "/my",
        meta: {
            showTab: true
        },
        component: () =>
            import("@/views/my/index.vue"),
    },
    // 品类页
    {
        path: "/classify",
        meta: {
            showTab: true
        },
        component: () =>
            import("@/views/classify/index.vue"),
    },
    // 客服页
    {
        path: "/service",
        meta: {
            private: true,
            showTab: true
        },
        component: () =>
            import("@/views/service/index.vue"),
    },
    // 详情页
    {
        path: "/product/:id",
        name: 'Product',
        meta: {
            showTab: false
        },
        component: () =>
            import("@/views/product/index.vue"),
    },
    //搜索页
    {
        path: "/search",
        meta: {
            showTab: false
        },
        component: () =>
            import("@/components/search/index.vue"),
    },
    // 设置退出
    {
        path: "/my/setting",
        meta: {
            showTab: false
        },
        component: () =>
            import("@/views/my/setting.vue")
    }
    ],
    scrollBehavior(to, from, savedPosition) { return { x: 0, y: 0 } }
})
// 路由跳转检查
router.beforeEach(guard.beforeEach)
router.afterEach(guard.afterEach)
export default router