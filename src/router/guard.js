let beforeEach = (to, from, next) => {
    // 执行可见性检查
    // 如果被访问的页面需要登陆
    if (to.meta.private && !localStorage.getItem("token")) {
        next({
            path: "/login"
        });
        return;
    }
    next();

}


let afterEach = (to, from) => { };

export default {
    beforeEach,
    afterEach
}