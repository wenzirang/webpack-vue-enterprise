import loading from "./loading.vue";
let instance;
let el;


loading.install = function (Vue, options = {}) {
    const defaultOptions = {
        text: "正在加载中...",
        isShowText: true,
        textStyle: {
            fontSize: "14px",
            color: "#fff"
        },
        ...options
    };
    Vue.prototype.$loading = {
        show(options = {}) {
            if (!instance) {
                let LoadingInstance = Vue.extend(loading);
                el = document.createElement("div");
                document.body.appendChild(el);
                instance = new LoadingInstance({
                    propsData: { defaultOptions, ...options }
                }).$mount(el);
            } else {
                return instance;
            }
        },
        hide() {
            if (instance) {
                document.body.removeChild(document.querySelector(".loading_container"));
                instance = undefined;
            }
        }
    };
};

export default loading;