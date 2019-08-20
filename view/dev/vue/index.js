
import Vue from 'vue';
import router from './src/router/router';
import index from "./index.vue";
import store from "./src/store";
import '@src/common/utiles/filters/index';
import '@src/common/utiles/directives/index';
import baseComponent from './src/components/base';

import "babel-polyfill";
Vue.use(baseComponent);
new Vue({
  el: '#app',
  router,  //命名不能变化 一定是router
  store,  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件 
  render: h => h(index),
})
