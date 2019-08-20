import Vue from "vue"
import Vuex from "vuex"
import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"
import modules from "./module"
Vue.use(Vuex);



const store = new Vuex.Store({
    state:state,
    getters:getters,
    mutations:mutations,//  里面的方法必须是同步方法
    actions:actions, // 里面的方法可以为异步的方法   
    module:modules

})


export default store

