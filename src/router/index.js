import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "@/router/routes";

Vue.use(VueRouter)

//重写VueRouter原型对象的push方法
let originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (target, succeed, failed) {
    if (succeed && failed) originPush.call(this, target, succeed, failed)
    originPush.call(this, target, () => {
    }, () => {
    })
}

//重写VueRouter原型对象的replace方法
let originReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (target, succeed, failed) {
    if (succeed && failed) originReplace.call(this, target, succeed, failed)
    originReplace.call(this, target, () => {
    }, () => {
    })
}

const router = new VueRouter({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes,
    scrollBehavior() {
        //使页面跳转后始终从最顶部开始浏览
        return {y: 0}
    },
})

router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token')
    let toPath = to.path

    if (!token && (['/login', '/home', '/me','/shop/*','/orderDetail'].indexOf(toPath) === -1)) {
        //未登录且不去允许的path，则跳转至登录
        next('/login')
    } else if (!token && (['/login', '/home', '/me','/shop/*','/orderDetail'].indexOf(toPath) !== -1)) {
        //未登录且去允许的path，则放行
        next()
    } else if (token && (toPath === '/login')) {
        //已登录且去login，则
        alert('如需重新登录，请先退出登录')
    } else {
        next()
    }
})

export default router
