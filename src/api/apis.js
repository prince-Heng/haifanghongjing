import arequest from "./request";
import config from "./config"

let ImgUrlPath = config.ImgUrlPath
    // import store from '@/store'
    // 分类 1
let getClassify = () => {
    return arequest.create({
        url: "/category/list",
        method: "get",
        data: {
            // sid: store.state.sid
        },
    });
}

// 商品列表  （分类与首页公用  传不同的type值即可）
let fetchCommodityList = (type, param, pagesize, pagenum) => {
    return arequest.create({
        url: "/merchandise/list",
        method: "post",
        data: {
            param,
            type,
            paging: { limit: pagesize, skip: (pagenum - 1) * pagesize }
        },
    })
}
let commoditySearch = (productname) => {
    return arequest.create({
        url: "/merchandise/search",
        method: "post",
        data: {
            productname
        },
    })
}

// 首页 轮播     1
// let getSwiper = () => {
//     return arequest.create({
//         url: "config/adlist",
//         method: 'get',
//         data: {
//             // sid: store.state.sid
//         }
//     })

// }

//店铺  活动名称     1
let getActivitylist = () => {
    return arequest.create({
        url: "config/activitylist",
        method: 'get',
        data: {
            // sid: store.state.sid
        }
    })

}

//店铺  详细信息 电话 收货地址      1
//whm 新增接口
let getStoreInfo = () => {
    return arequest.create({
        url: "config/storeinfo",
        method: 'get',
        data: {
            // sid: store.state.sid
        }
    })

}



//sku
let getSkulist = (productSn) => {

    return arequest.create({
        url: "/merchandise/skulist",
        method: "post",
        data: {
            productSn
        },
    })
}

// 商品分类内容语言
let getRuname = () => {
    return arequest.create({
        url: "category/runame",
        method: "get",
        data: {}
    })
}

// 详情页      1
let getProduct = (id) => {
    return arequest.create({
        url: "merchandise/detial",
        method: 'post',
        data: {
            // sid: store.state.sid,    
            _id: id
        }
    })
}

// 提交商品到购物车  1
let saveCart = (data) => {
    return arequest.create({
        url: "cart/save",
        method: "post",
        data
    })
}

// 获取购物车商品   1
let getCart = () => {
    return arequest.create({
        url: "cart/list",
        method: "post",
        data: {}
    })
}

//删除购物车数据
let deleteCart = (ids) => {
    return arequest.create({
        url: "cart/delete",
        method: "post",
        data: {
            ids
        }
    })
}

// 注册  1
let register = (data) => {
    return arequest.create({
        url: "user/register",
        method: "post",
        data: data
    })
}

// 获取用户信息 1
let getUser = () => {
    return arequest.create({
        url: "user/info",
        method: "post",
        data: {}
    })
}

// 登陆 1
let login = (data) => {
    return arequest.create({
        url: "user/login",
        method: "post",
        data
    })
}

// 更改后保存个人信息  
let userSave = (data) => {
        return arequest.create({
            url: "user/saveinfo",
            method: "post",
            data
        })
    }
    // 确认订单
let orderConfirm = (productList) => {
    return arequest.create({
        url: "order/confirm",
        method: "post",
        data: { productList }
    })
}

// 提交订单 1
let order = (data) => {
    return arequest.create({
        url: "order/save",
        method: "post",
        data: data
    })
}

//获取订单列表  1
let orderList = (status) => {
    return arequest.create({
        url: "order/list",
        method: "post",
        data: { status }
    })
}

// 订单列表详情 
let orderDetial = (id) => {
    return arequest.create({
        url: "order/detail",
        method: "post",
        data: { _id: id }
    })
}

// 存地址  传_id 修改地址，不传_id s
let saveAddress = (data) => {
    return arequest.create({
        url: "address/save",
        method: "post",
        data: data
    })
}

// 存地址  传_id 修改地址，不传_id s
let dbreq = (name, req) => {
    return arequest.create({
        url: "db/req",
        method: "post",
        data: { table_name: name, req }
    })
}

// 获取地址列表
// let addressList = () => {
//         return arequest.create({
//             url: "address/list",
//             method: "post",
//             data: {}
//         })
//     }
// 获取地址详情
// let addressDetail = (id) => {
//     return arequest.create({
//         url: "address/detail",
//         method: "post",
//         data: { _id: id }
//     })
// }




let ImgUrl = (id) => {
    if (id == undefined) { return '' }
    return ImgUrlPath + id
        //return process.env.VUE_APP_BASE_API + '/avatar/img?id=' + id
}
let ImgID = (url) => {
    if (url == undefined) { return '' }
    return url.replace(ImgUrlPath, "")

}
let imgpath = (imgid) => {

    return config.ImgUrlPath + imgid
}
export default {
    getStoreInfo,
    // getSwiper,
    getClassify,
    getProduct,
    saveCart,
    getCart,
    register,
    login,
    order,
    orderList,
    orderConfirm,
    getUser,
    userSave,
    orderDetial,
    saveAddress,
    // addressList,
    getActivitylist,
    getSkulist,
    // addressDetail,
    deleteCart,
    fetchCommodityList,
    commoditySearch,
    dbreq,
    getRuname,
    ImgUrlPath,
    imgpath,
    ImgUrl,
    ImgID
};