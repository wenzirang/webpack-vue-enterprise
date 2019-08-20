/**
 * 示例使用方法 v-validate="'required|regex(/^[0-9]*$/)'"
 */

import Vue from 'vue'
import {
    parent,
    removeClass,
    addClass
} from "../tool";


function init(el, validateStr, checked) {
    // 将验证规则拆分为验证数组
    let validateRuleArr = validateStr.value.split("&&");
    let ignore = null;
    const filterItem = validateRuleArr.filter(x => x.indexOf("ignore(") > -1);
    if (filterItem[0]) {
        ignore = filterItem[0].replace("ignore(", "").replace(")", "")
    }
    if (checked) {
        checkedfun()
    }
    // 监听失去焦点的时候    
    el.removeEventListener("keyup")
    el.addEventListener("keyup", function (event) {
        //失去焦点进行验证
        checkedfun();
    });
    // 循环进行验证
    function checkedfun() {
        for (var i = 0; i < validateRuleArr.length; ++i) {
            let requiredRegex = /required\(/; // 判断设置了required               
            let emailRegex = /^email$/; // 判断设置了email            
            let phoneRegex = /^phone$/; // 判断设置了 phone
            let minlengthRegex = /minlength\(/; //判断设置了 minlength 最大长度
            let maxlengthRegex = /maxlength\(/; //判断设置了 maxlength 最大长度
            let regexRegex = /regex\(/;
            // 判断设置了required
            if (requiredRegex.test(validateRuleArr[i])) {
                if (!eval(validateRuleArr[i])) {
                    break;
                }
            }
            // 判断设置了email
            if (emailRegex.test(validateRuleArr[i])) {
                if (!email()) {
                    break;
                }
            }
            // 判断设置了 phone
            if (phoneRegex.test(validateRuleArr[i])) {
                if (!phone()) {
                    break;
                }
            }
            // 判断设置了最小长度
            if (minlengthRegex.test(validateRuleArr[i])) {
                if (!eval(validateRuleArr[i])) {
                    break;
                }
            }
            // 判断设置了最大长度
            if (maxlengthRegex.test(validateRuleArr[i])) {
                if (!eval(validateRuleArr[i])) {
                    break;
                }
            }
            // 判断测试正则表达式
            if (regexRegex.test(validateRuleArr[i])) {
                if (!eval(validateRuleArr[i])) {
                    break;
                }
            }
        }
    }
    // 验证是否是必填项
    function required(message) {
        if (el.value == "" || el.value == null) {
            tipMsg(message ? message : "");
            return false;
        }
        success()
        return true;
    }
    // 验证是否是邮箱
    function email() {
        let emailRule = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if (!emailRule.test(el.value)) {
            tipMsg("请输入正确的邮箱地址");
            return false;
        }
        success()
        return true;
    }
    // 验证是否是手机号码
    function phone() {
        let phoneRule = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/;
        if (!phoneRule.test(el.value) && el.value.length !== 10) {
            tipMsg("请输入正确的手机号");
            return false;
        }
        success()
        return true;
    }
    // 最小长度验证
    function minlength(length) {
        console.log('减少', el.value.length)
        if (el.value.length < length) {
            //console.log('最小长度不能小于'+length);
            tipMsg("最小长度不能小于" + length);
            return false;
        }
        success()
        return true;
    }
    // 最大长度进行验证
    function maxlength(length) {
        console.log('add', el.value.length)
        if (el.value.length > length) {
            //console.log('最大长度不能大于'+length);
            tipMsg("最大长度不能大于" + length);
            return false;
        }
        success()
        return true;
    }
    // 进行正则表达式的验证
    function regex(rules) {
        let val = el.value;
        if (ignore) {
            val = `${ignore}${el.value}`
        }
        if (!rules.test(val)) {
            tipMsg("请输入正确的格式");
            return false;
        }
        success()
        return true;
    }

    function success() {
        let currentEl;
        el.className.indexOf("form-el") > -1 ? currentEl = el : currentEl = parent(el, '.form-el');
        addClass(currentEl, 'success');
        removeClass(currentEl, 'error');
        removeTips();
    }
    // 添加提示信息
    function tipMsg(msg) {
        removeTips();
        let currentEl;
        el.className.indexOf("form-el") > -1 ? currentEl = el : currentEl = parent(el, '.form-el');
        addClass(currentEl, 'error');
        removeClass(currentEl, 'success');
    }
    // 移除提示信息
    function removeTips() {
        if (el.nextSibling) {
            if (el.nextSibling.className === "validate_error") {
                el.nextSibling.remove();
            }
        }
    }
}
Vue.directive('validate', {
    // 钩子函数，被绑定元素插入父节点时调用 (父节点存在即可调用，不必存在于 document 中)。
    inserted(el, validateStr) {
        init(el, validateStr, false)
    },
    // 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
    bind(el) { },
    // 所在组件的 VNode 更新时调用，但是可能发生在其孩子的 VNode 更新之前。
    // 指令的值可能发生了改变也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 
    update(ev, validateStr) {
        if (validateStr.oldValue !== validateStr.value) {
            init(ev, validateStr, true);
        }
    },
    // 所在组件的 VNode 及其孩子的 VNode 全部更新时调用。
    componentUpdated(ev, validateStr) {

    },
    // 只调用一次，指令与元素解绑时调用。
    unbind() {
        console.log('unbind');
    }
})

const trigger = (el, type) => {
    const e = document.createEvent('HTMLEvents')
    e.initEvent(type, true, true)
    el.dispatchEvent(e)
}