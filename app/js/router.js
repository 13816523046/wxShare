/*
 * @description:路由表
 * @author:活动组-liyanfang-wuxiaobo-wangchao
 * @version:1.0.0
 * @data:2017年03月27日
 */
import Vue from 'vue/dist/vue.js'
import VueRouter from 'vue-router'

// import Payment from '../components/Payment.vue'
// import Browser from '../components/Browser.vue'
// import ZFB from '../components/ZFB.vue'
// import test from '../components/test.vue'
import WxShare from '../components/WxShare.vue'

Vue.use(VueRouter);

var routes = [
	//{ path: '/', component: Payment },
	// { path: '/Browser', component: Browser },
	// { path: '/ZFB', component: ZFB },
	// { path: '/test', component: test },
	{ path: '/', component: WxShare },
    { path: '*', redirect:'/'}
]
var router = new VueRouter({
	routes // （缩写）相当于 routes: routes
})

export default router; //将路由器导出
