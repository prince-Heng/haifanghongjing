// 将价格强制保留小数点后两位
const addZero = function(value) {
    value = value - 0
    return value.toFixed(2)
}
export default {
    addZero
}