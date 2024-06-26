// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import * as Pinia from 'pinia';
import App from './App.vue'
import {
	useUserStore
} from '@/stores/user.js'

import {
	$http
} from '@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中...'
	})

	if (options.url.indexOf('/my/') != -1) {
		options.header = {
			Authorization: useUserStore().token
		}
	}
}
$http.afterRequest = function() {
	uni.hideLoading()
}

uni.$showMsg = function(title = "数据请求失败！", duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}

export function createApp() {
	const app = createSSRApp(App)
	app.use(Pinia.createPinia());
	return {
		app,
		Pinia,
	}
}
// #endif