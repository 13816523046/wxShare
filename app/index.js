import Vue from 'vue/dist/vue.js'
import Promise from 'pinkie-promise'

import router from './js/router.js';
require('./index.css');
require('./js/common.js');
require('whatwg-fetch');
require('./js/fetch.js');
require('./js/statistic.js');

//开启debug模式
Vue.config.debug = true;

window.app = new Vue({
	router,
	el: '#app'
}).$mount('#app')
