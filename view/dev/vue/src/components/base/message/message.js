import Vue from 'vue';
import BlMessage from './message.vue';

BlMessage.newInstance = (data) => {
    const _props = data || {};
    const Instance = new Vue({
        data: _props,
        render(h) {
            return h(BlMessage, {
                props: _props
            })
        }
    });

    const component = Instance.$mount();
    document.body.appendChild(component.$el);

    const message = Instance.$children[0];

    return {
        component: message,
        notice(noticeProps) {
            message.add(noticeProps);
        },
        removeNotice(key) {
            message.close(key);
        },
        destroy() {
            message.destroy();
        },
    }
}

export default BlMessage