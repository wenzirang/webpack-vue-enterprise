import card from "./card";
import layer from "./layer";
import message from "./message";
import popover from "./popover";
import loading from "./loading"
import breadcrumb from './breadcrumb';
import select from "./select";
import { step, steps } from "./steps"

import vue from "vue"
message.install = function (Vue) {
    Vue.$message = Vue.prototype.$message = message;
}
const components = {
    card,
    layer,
    message,
    popover,
    loading,    
    breadcrumb,
    select,    
    step,
    steps,
}


for (const item of Object.values(components)) {
    if (!item.install && item.name) {
        item.install = function (Vue) {
            Vue.component(`${item.name}`, item);
        };
    }
}

const install = function (Vue, opts = {}) {
    if (install.installed) return;
    for (const item of Object.values(components)) {
        if (item.install) {
            Vue.use(item, opts.prefix);
        }
    }
    Vue.prototype.$VUEBEAUTY = { size: opts.size || '' };
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
window.Vue = vue;

export {
    card,
    layer,
    message,
    popover,
    loading,    
    breadcrumb,
    select,    
    step,
    steps
}

export default {
    install,
};