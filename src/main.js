import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
        // error: require('./statics/imgs/erry.jpg'),
        // loading: require('./statics/imgs/load.gif')
        throttleWait: 5000
    })
    // import Utils from '@/utils/index'

import lang from '@/utils/lang'
import moment from 'moment'
Vue.prototype.moment = moment
let curlang = ""
var apptype = navigator.appName
if (apptype == "Netscape") {
    curlang = navigator.language; //获取浏览器配置语言，支持非IE浏览器
} else {
    curlang = navigator.userLanguage; //获取浏览器配置语言，支持IE5+ == navigator.systemLanguage
}
if (curlang != "zh-cn" && curlang != "zh-CN") {
    curlang = "ru"
}

Vue.prototype.LangType = '' // curlang
if (Vue.prototype.LangType == "ru") {
    Vue.prototype.$lang = lang.ru
} else {
    Vue.prototype.$lang = lang.zh_cn
}

// Vue.prototype.$utils = Utils
// Utils.install();
export const eventBus = new Vue()
    // VANT
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
import 'amfe-flexible/index.js'
//  amfe-flexible rem适配
// vue实例中挂载Apis
import Request from '@/api/apis';
Vue.prototype.$request = Request;
Vue.prototype.$imgpath = Request.imgpath;
console.log(Vue.prototype.$imgpath(22))
    // 适配
import 'amfe-flexible/index.js'
Vue.config.productionTip = false
    //复制内容至剪切板插件
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
import filters from './filter/filter'
//过滤器统一处理加载
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')