
/**
 * 格式化时间
 * @param {string} date 
 * @param {string} fmt 
 */
const formatDate = (date, fmt) => {
    if (!date || date.length <= 0) {
        return
    } else {
        date = new Date(date);
    }

    function padLeftZero(val) {
        if (val < 10) {
            return "0" + val;
        } else {
            return val;
        }
    };

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'y+': date.getYear(),
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }

    for (let k in o) {
        let str = o[k] + '';
        if (new RegExp(`(${k})`).test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;

};

export default formatDate