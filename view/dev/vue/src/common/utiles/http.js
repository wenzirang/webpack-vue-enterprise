var https = {
    /**
       * js封装ajax请求
       * >>使用new XMLHttpRequest 创建请求对象,所以不考虑低端IE浏览器(IE6及以下不支持XMLHttpRequest)
       * >>使用es6语法,如果需要在正式环境使用,则可以用babel转换为es5语法 https://babeljs.cn/docs/setup/#installation
       *  @param settings 请求参数模仿jQuery ajax
       *  调用该方法,data参数需要和请求头Content-Type对应
       *  Content-Type                        data                                     描述
       *  application/x-www-form-urlencoded   'name=哈哈&age=12'或{name:'哈哈',age:12}  查询字符串,用&分割
       *  application/json                     name=哈哈&age=12'                        json字符串
       *  multipart/form-data                  new FormData()                           FormData对象,当为FormData类型,不要手动设置Content-Type
       *  注意:请求参数如果包含日期类型.是否能请求成功需要后台接口配合
       */
    ajax: function ajax() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var _s = void 0;
        _s = mergeOptions({
            url: "",
            type: "GET",
            dataType: "json",
            async: true,
            data: null,
            headers: {},
            timeout: 10000,
            beforeSend: function beforeSend(xhr) { },
            success: function success(result, status, xhr) { },
            error: function error(xhr, status, _error) { },
            complete: function complete(xhr, status) { }
        }, settings);
        //验证参数
        if (!_s.url || !_s.type || !_s.data || !_s.dataType) {
            log(fxLanguage.httprequset.parameterError);
            return;
        }
        //创建请求
        var xhr = new XMLHttpRequest();
        //请求开始回调函数
        xhr.addEventListener('loadstart', function (e) {
            _s.beforeSend(xhr);
        });
        //请求成功
        xhr.addEventListener("load", function (e) {
            var status = xhr.status;
            if (status >= 200 && status <= 300 || status === 304) {
                var result = void 0;
                if (xhr.responseType === "text") {
                    result = xhr.responseText;
                } else if (xhr.responseType === "document") {
                    result = xhr.responseXML;
                } else {
                    if (xhr.response) {
                        result = Object.prototype.toString.call(xhr.response) === "[object String]" ? JSON.parse(xhr.response) : xhr.response;
                    } else {
                        result = Object.prototype.toString.call(xhr.responseText) === "[object String]" ? JSON.parse(xhr.responseText) : xhr.responseText;
                    }
                }
                _s.success(result, status, xhr);
            } else {
                _s.error(xhr, status, e);
            }
        });
        //请求结束
        xhr.addEventListener("loadend", function (e) {
            _s.complete(xhr, xhr.status);
        });
        //请求错误
        xhr.addEventListener("error", function (e) {
            _s.error(xhr, xhr.status, e);
        });
        //请求超时
        xhr.addEventListener("timeout", function (e) {
            _s.error(xhr, 408, e);
        });
        var useUrlParam = false;
        var sType = _s.type.toUpperCase();
        //如果是简单的请求，则把data参数组装在URL上
        if (sType === "GET" || sType === "DELETE") {
            useUrlParam = true;
            _s.url += https.getUrlParam(_s.url, _s.data);
        }
        //初始化请求
        try {
            xhr.open(_s.type, _s.url, _s.async);
        } catch (e) {
            _s.error(xhr, xhr.status, e);
            return;
        }
        //设置返回类型
        xhr.responseType = _s.dataType;
        //设置请求头
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = _getIterator(_Object$keys(_s.headers)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var key = _step.value;

                xhr.setRequestHeader(key, _s.headers[key]);
            }
            //设置超时时间
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        if (_s.async && _s.timeout) {
            xhr.timeout = _s.timeout;
        }
        //发送请求.如果是简单请求,请求参数应为null.否则,请求参数类型需要和请求头Content-Type对应
        xhr.send(useUrlParam ? null : https.getQueryString(_s.data));
    },
    getUrlParam: function getUrlParam(url, data) {
        if (!data) {
            return "";
        }
        var paramStr = data instanceof Object ? https.getQueryString(data) : data;
        return url.indexOf("?") !== -1 ? paramStr : "?" + paramStr;
    },
    // 把对象转为查询字符串
    getQueryString: function getQueryString(data) {
        var parasArr = [];
        if (data instanceof Object) {
            each(data, function (value, key) {
                var val = value;
                parasArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
            });
        }
        return parasArr.join("&");
    },
    /**
     * 根据实际业务情况装饰 ajax 方法
     * 如:统一异常处理,添加http请求头,请求展示loading等
     * @param settings
     */
    request: function request() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        //统一异常处理
        var errorHandle = function errorHandle(xhr, status) {
            if (status === 401) {
                log(fxLanguage.httprequset.noAuthority);
            } else if (status === 408) {
                log(fxLanguage.httprequset.timeOut);
            }
        };
        // 使用before拦截参数的 beforeSend 回调函数
        settings.beforeSend = (settings.beforeSend || function () { }).before(function (xhr) {
            log("request show loading...");
        });
        // 保存参数success回调函数
        var successFn = settings.success;
        // 覆盖参数success回调函数
        settings.success = function (result, status, xhr) {
            // todo 根据后台api判断是否请求成功
            if (result && result instanceof Object && result.code !== 1) {
                errorHandle(xhr, status);
            } else {
                log("request success");
                successFn && successFn(result, status, xhr);
            }
        };
        // 拦截参数的 error
        settings.error = (settings.error || function () { }).before(function (result, status, xhr) {
            errorHandle(xhr, status);
        });
        // 拦截参数的 complete
        settings.complete = (settings.complete || function () { }).after(function (xhr, status) {
            log('request hide loading...');
        });
        // 请求添加权限头,然后调用http.ajax方法
        https.ajax.before(https.addAuthorizationHeader)(settings);
    },
    // 添加权限请求头
    addAuthorizationHeader: function addAuthorizationHeader(settings) {
        settings.headers = settings.headers || {};
        var headerKey = 'Authorization'; // todo 权限头名称
        // 判断是否已经存在权限header
        var hasAuthorization = _Object$keys(settings.headers).some(function (key) {
            return key === headerKey;
        });
        if (!hasAuthorization) {
            settings.headers[headerKey] = 'test'; // todo 从缓存中获取headerKey的值
        }
    }
};
Function.prototype.before = function (beforeFn) {
    var _self = _this;
    return function () {
        for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
            arg[_key] = arguments[_key];
        }

        beforeFn.apply(_this, arg);
        _self.apply(_this, arg);
    };
};
Function.prototype.after = function (afterFn) {
    var _self = _this;
    return function () {
        for (var _len2 = arguments.length, arg = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            arg[_key2] = arguments[_key2];
        }

        _self.apply(_this, arg);
        afterFn.apply(_this, arg);
    };
};

var dataModel = function dataModel(data) {
    _classCallCheck(this, dataModel);

    this.dataType = 'json';
    this.data = {};
    this.headers = {};
    this.success = function () { };
    this.beforeSend = function () { };
    this.complete = function () { };
    this.error = function () { };
    this.headers = data.headers;
    this.type = data.type;
};

export const http = {
    get: function get(data) {
        var d = mergeOptions(new dataModel({ headers: {}, type: 'GET' }), data);
        https.ajax(d);
    },
    delete: function _delete(data) {
        var d = mergeOptions(new dataModel({ headers: {}, type: 'DELETE' }), data);
        https.ajax(d);
    },
    // 调用此方法,参数data应为查询字符串或普通对象
    post: function post(data) {
        var d = mergeOptions(new dataModel({ headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, type: 'POST' }), data);
        https.ajax(d);
    },
    // 调用此方法,参数data应为json字符串
    postbody: function postbody(data) {
        var d = mergeOptions(new dataModel({ headers: { 'Content-Type': 'application/json; charset=UTF-8' }, type: 'POST' }), data);
        https.ajax(d);
    }
};