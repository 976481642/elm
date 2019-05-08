// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import animated from 'animate.css'
import echarts from 'echarts'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


Vue.use(VueQuillEditor)
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
Vue.use(animated);
import axios from 'axios'
Vue.prototype.axios=axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render:h=>h(App),
  router,
  components: { App },
  template: '<App/>'
})
