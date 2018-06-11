// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Utils from './utils'
import Store from './store'
import axios from 'axios'
import router from './router'
import ElementUI from 'element-ui'
import VueAnalytics from 'vue-analytics'
import 'element-ui/lib/theme-chalk/index.css'
import VueClipboard from 'vue-clipboard2'
import VueProgressBar from 'vue-progressbar'

axios.defaults.headers.common['X-CSRFToken'] = Utils.getCookie('csrftoken')
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'

Vue.use(ElementUI)
Vue.use(VueClipboard)
Vue.use(VueAnalytics, {
  id: 'UA-38277310-6'
})

const options = {
  color: '#22df80',
  failedColor: '#F56C6C',
  thickness: '2px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar, options)

router.afterEach(function (to) {
  if (window.ga) {
    // 你可能想根据请求参数添加其他参数，可以修改这里的 to.fullPath
    window.ga('set', 'page', to.fullPath)
    window.ga('send', 'pageview')
  }
})

// 设置全局变量
Vue.prototype.$http = Utils.http
Vue.prototype.$utils = Utils
Vue.prototype.$store = Store
// https://cn.vuejs.org/v2/guide/migration.html#dispatch-和-broadcast-替换
// $emit 无法跨多层父子组件通信, 事件只能传给直接的父组件
// 因此需要一个单独的事件中心管理组件间的通信
Vue.prototype.$eventHub = new Vue()

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  // template: '<App/>',
  // components: {App},
  render: h => h(App)
})

axios.interceptors.request.use(config => {
    app.$Progress.start(); // for every request start the progress
    return config;
});

axios.interceptors.response.use(response => {
    app.$Progress.finish(); // finish when a response is received
    return response;
});
