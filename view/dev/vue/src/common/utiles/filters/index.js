import Vue from 'vue';
import * as formatDate from "./formatDate.filter"
const filters = {
    formatDate
}
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key].default)
})