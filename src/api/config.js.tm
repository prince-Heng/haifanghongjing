let development = "http://58.87.108.47:7777";
let production = "http://www.shopvill.tm/api"

export default {
    baseURL: process.env.NODE_ENV === 'production' ? production : development,
    timemout: 30,
    headers: {},
    ImgUrlPath: production + "/avatar/img?id="
};