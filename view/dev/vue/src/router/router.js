import Vue from "vue"
import store from "../store/index";
import VueRouter from "vue-router"
Vue.use(VueRouter);
const user = resolve => { require(["#/src/views/user/user"], resolve) };
const login = resolve => { require(["#/src/views/user/login/login"], resolve) };
const register = resolve => { require(["#/src/views/user/register/register"], resolve) };
const Main = resolve => { require(["#/src/views/main/main"], resolve) };
const dashboard = resolve => { require(["#/src/views/main/dashboard/dashboard"], resolve) };
const routes = [
    {
        path: '',
        component: Main,
        redirect: "/main/dashboard",
        alias: '首页'
    },
    {
        path: '/user',
        component: user,
        alias: '用户',
        redirect: "/user/login",
        children: [
            {
                path: 'login',
                component: login,
                name: "Login",
                alias: '登录'
            },
            {
                path: 'register',
                component: register,
                name: "Register",
                alias: '注册'
            }
        ]
    },
    {
        path: '/main',
        name: 'Main',
        component: Main,
        meta: { requireAuth: true },
        redirect: "/main/dashboard",
        alias: '首页',
        children: [
            {
                path: 'dashboard',
                component: dashboard,
                name: 'Dashboard',
                alias: '仪表盘',
            }
        ]
    }
]

const router = new VueRouter({
    routes: routes
})
router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
        if (localStorage.getItem('token')) {// 判断是否登录         
            if (!store.state.currentUserInfo.isGet) {
                // 获取当前用户信息      
                store.state.currentUserInfo.isGet = true
                store.state.currentUserInfo = {
                    userName: '欢迎您的到来'
                }
                next()
            } else {
                if (to.matched.some(res => res.meta.isOpen)) {
                    next()
                }
            }
        } else {// 没登录则跳转到登录界面
            next({
                path: '/user/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next()
    }
})


export default router