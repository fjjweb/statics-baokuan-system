
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import store from './store/store';
import utils from './utils/utils';
import './assets/style/theme/index.css'
Vue.config.productionTip = false

Vue.use(router);
Vue.use(ElementUI);
require('./config')
var echarts = require('echarts/lib/echarts')
// 引入折现图组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
Vue.prototype.$echarts = echarts;

axios.defaults.headers.common['username'] = utils.getCookieUsername('plw_username');
Vue.prototype.$axios = axios;
/* eslint-disable no-new */

new Vue({
  el:"#app",
  router,
  store,
  render:h=>h(App)
})


