import { http } from "./utiles/http"

/**
 * 请求回传的状态
 * @param {string} subCode 状态码
 * @return {boolean} true 成功 false 失败
 */
function dataState(subCode) {
    var state = subCode.slice(-2);
    if (state === "00") return true;
    return false;
}
//数据的异常判断
export const dataExceptionHandling = function (data) {
    if (data === 'error') {
        window.Vue.$message.error(`请求出现错误`, 4);
        return false;
    }
    if (dataState(data.subCode)) {
        return true
    } else {
        window.Vue.$message.error(data.message, 4);
        return false
    }
}

/**
 * get请求 获取序列化有的data数据
 * @param {dataModel} datas 
 */
export const getParseData = (datas) => {
    return new promise((resolve, reject) => {
        http.get({
            url: datas.url,
            data: datas.data || {},
            type: "get",
            headers: {
                Authorization: localStorage.getItem("token")
            },
            timeout: 20000,
            success: function (data) {
                if (dataExceptionHandling(data)) {
                    let d = JSON.parse(data.bodyMessage);
                    if (data)
                        resolve(d);

                } else {
                    reject({ message: data.message });
                }
            },
            error: function (e) {
                dataExceptionHandling('error');
                reject({ message: '请求失败' });
            }
        })
    })
}


/**
 * post请求 获取序列化有的data数据
 * @param {dataModel} datas 
 */
export const postParseData = (datas) => {
    return new promise((resolve, reject) => {
        http.post({
            url: datas.url,
            data: datas.data || {},
            type: "post",
            headers: {
                Authorization: localStorage.getItem("token")
            },
            timeout: 20000,
            success: function (data) {
                if (dataExceptionHandling(data)) {
                    let d = JSON.parse(data.bodyMessage);
                    resolve(d);
                } else {
                    reject({ message: data.message });
                }

            },
            error: function (e) {
                dataExceptionHandling('error');
                reject({ message: '请求失败' });
            }
        })
    })
}



