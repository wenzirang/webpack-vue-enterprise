/**
 * 函数防抖 (只执行最后一次点击)
 * @param fn
 * @param delay
 * @returns {Function}
 * @constructor
 */
export const Debounce = (fn, t) => {
    const delay = t || 500
    let timer
    return function () {
        const args = arguments
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            timer = null
            fn.apply(this, args);
        }, delay)
    }
}
/**
* 函数节流
* @param fn
* @param interval
* @returns {Function}
* @constructor
*/
export const Throttle = (fn, t) => {
    let last
    let timer
    const interval = t || 500
    return function () {
        const args = arguments
        const now = +new Date()
        if (last && now - last < interval) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                last = now
                fn.apply(this, args)
            }, interval)
        } else {
            last = now
            fn.apply(this, args)
        }
    }
}
/**
 * 在指定的元素之前插入某个元素
 * @param {Element} el 
 * @param {Element} targetEl 
 */
export const elInsertBefore = (el, targetEl) => {
    targetEl.insertAdjacentElement("beforeBegin", el);
    return el;
}

/**
 * 在指定的元素之后插入某个元素
 * @param {Element} el 
 * @param {Element} targetEl 
 */
export const elInsertAfter = (el, targetEl) => {
    targetEl.insertAdjacentElement("afterEnd", el);
    return el;
}


/**
 * 返回当前页面相对于窗口显示区左上角的 X ，Y 的位置
 * @param {*} top 
 */
export const getScroll = (top) => {
    let ret = window[`page${top ? 'Y' : 'X'}Offset`];
    const method = `scroll${top ? 'Top' : 'Left'}`;
    if (typeof ret !== 'number') {
        const d = window.document;
        // ie6,7,8 standard mode
        ret = d.documentElement[method];
        if (typeof ret !== 'number') {
            // quirks mode
            ret = d.body[method];
        }
    }
    return ret;
}

/**
 * 获取元素top,left,right,bottom的绝对位置
 * @param {HTMLElement} element 元素
 * @param {HTMLElement} container 容器
 */
export const getOffset = (element, container = document.body) => {
    const elRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const clientTop = element.clientTop || container.clientTop || 0;
    const clientLeft = element.clientLeft || container.clientLeft || 0;
    let top;
    let left;

    if (container === document.body) {
        top = getScroll(true);
        left = getScroll();
    } else {
        top = container.scrollTop - containerRect.top;
        left = container.scrollLeft - containerRect.left;
    }

    return {
        top: elRect.top + top - clientTop,
        left: elRect.left + left - clientLeft,
        right: elRect.right + left - clientLeft,
        bottom: elRect.bottom + top - clientTop,
    };
}

/**
 * 浏览器tab切换兼容性问题
 */
export const visibilityChange = () => {
    // 找到当前浏览器支持的hidden属性名和visibilitychange事件名
    var hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }
    return visibilityChange;
}

/**
 * 数组内元素移动到指定位置
 * @param {Array} arr 要操作的数组
 * @param {Number} moveIndsArr 要移动的元素数组下标
 * @param {Number} moveToInd 目标的下标值
 * @param {Number} isBeforAfter 移动到目标的前还是后 （0/1）
 */
export const moveArray = (arr, moveIndsArr, moveToInd, isBeforAfter) => {
    var temp = [];
    moveIndsArr.sort(function (x, y) { return x - y });
    moveToInd += isBeforAfter;
    for (var i = 0; i < moveIndsArr.length; i++) {
        if (moveIndsArr[i] < moveToInd) {
            moveToInd -= 1;
        }
        temp[temp.length] = arr.splice(moveIndsArr[i] - i, 1)[0];
    }
    temp.unshift(moveToInd, 0);
    Array.prototype.splice.apply(arr, temp);
}
/**
 * 在数组中获取当前元素的下标
 * @param {*} tagretArray 
 * @param {*} item 
 */
export const findIndexInArray = (tagretArray, item) => {
    for (var i = 0; i < tagretArray.length; i++) {
        if (tagretArray[i] == item) {
            return i;
        }

    }
}

/**
 * 返回指定的父级元素
 * @param {Element} ele 当前元素
 * @param {string} tag 返回元素的名
 * @return {Element | null} 返回指定的元素，没有则返回null
 */
export function parent(ele, tag) {
    if (!tag || tag.length <= 0) return null;
    var d = ele.parentElement;
    do {
        if (eleEqualStr(d, tag)) {
            return d;
        }
        if (d.nodeName === "HTML") return null;
        d = d.parentElement;
    } while (d);
    return null;
}

/**
 * 删除元素的类
 * @param {Element} ele 元素
 * @param {string} className 类名
 * @return {Element}
 */
export function removeClass(ele, className) {
    var type = getDataType(ele);
    if (!/\[object HTML.*Element\]/.test(type)) {
        throw new Error('' + fxLanguage.dom.notElement);
    }
    var classAry = ele.className.split(" ");
    if (classAry.indexOf(className) >= 0) classAry.splice(classAry.indexOf(className), 1);
    ele.className = classAry.join(" ");
    return ele;
}
/**
 * 添加元素的类
 * @param {Element} ele 元素
 * @param {string} className 类名
 * @return {Element}
 */
export function addClass(ele, className) {
    var type = getDataType(ele);
    if (!/\[object HTML.*Element\]/.test(type)) {
        throw new Error('' + fxLanguage.dom.notElement);
    }
    var classAry = ele.className.split(" ");
    if (classAry.indexOf(className) === -1) classAry.push(className);
    ele.className = classAry.join(" ");
    return ele;
}

/**
     * 获取或判断任意数据类类型的通用方法
     * @param {any} any 任意数据
     * @example
     * var aa=null;
     * getDataType(aa);
     * var abc;
     * getDataType(abc); //[object Undefined] 说明此变量已经声明，但尚未被初始化
     * var fn=function(){}
     * getDataType(fn); //[object Function]
     * getDataType(new Object()); //[object Object]
     * getDataType("Hello");//[object String]
     * getDataType(234);//[object Number]
     * getDataType(true));//[object Boolean]
     * getDataType(new Date()); //[object Date]
     * getDataType(new Date().getTime()); //[object Number]
     * getDataType(document.getElementById("demopic")); //[object HTMLDivElement]
     * getDataType(document.querySelector('div'));//[object HTMLDivElement]
     * var nodelist=NodeListToArray(document.getElementsByTagName("*"));
     * getDataType(nodelist); //[object Array]
     * getDataType(document.getElementsByTagName("*")); //[object NodeList)]
     * getDataType(document.querySelectorAll('div')); //[object NodeList)]
     * //nodelist[10].tagName);
     * getDataType(/[a-z]/); //[object RegExp]
     */
export function getDataType(any) {
    /* (1) Object.prototype.toString.call 方法判断类型：
    优点：通用，返回"[object String]" 具体object的类型
    缺点：不能返回继承的类型
    
    (2)typeof x
    缺点：对object类型不能细分；
    优点：对空null的判断 'undefined'的应用;
    返回类型有：'undefined' “string” 'number' 'boolean' 'function' 'object'
    
    (3) instanceof 能返回具体的类型，只适用于用new关键字创建的对象进行判断
    */
    // var baseType=["string","number","boolean"];//基本类型
    // var refType=["object", "Function","Array","Date"];//引用类型
    try {
        var dtype = Object.prototype.toString.call(any);
        if (dtype == "[object Object]") //IE，某个dom元素对象
        {
            try {
                if (any.constructor) {
                    var constructorStr = any.constructor.toString(); //obj.constructor可以返回继承的类型
                    if (constructorStr.indexOf("Array") != -1) {
                        dtype = "[object Array]";
                    } else if (constructorStr.indexOf("HTMLCollection") != -1) {
                        /* IE */
                        dtype = "[object NodeList]";
                    } else if (constructorStr.indexOf("function") != -1 && constructorStr.indexOf("Object()") != -1) {
                        dtype = "[object Object]";
                    } else dtype = constructorStr;
                }
            } catch (e) {
                return "[object Null]";
            }
        } else {
            if (dtype == "[object HTMLCollection]") {
                /* FF */
                dtype = "[object NodeList]";
            }
        }
        return dtype;
    } catch (e) {
        return "variable is not defined.";
    }
}