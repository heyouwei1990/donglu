import axios from 'axios'
// import qs from 'qs'
const IsDev = process.env.NODE_ENV == 'development' ? true : false;
let BASEURL = 'http://192.168.2.186:8000';
if (!IsDev) {
    BASEURL = 'http://api.donglu.xyz'
}

import { Toast } from 'vant'
import { Promise } from 'core-js';
let loaddingToast = null;
// axios.defaults.baseURL = BASEURL;
axios.defaults.timeout = 30000;

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
// 添加请求拦截器
axios.interceptors.request.use(config => {
    return config;
});
// 添加响应拦截器   
axios.interceptors.response.use(response => {
    if (loaddingToast) {
        loaddingToast.clear();
    }
    return response.data;
}, error => {
    loaddingToast.clear();
    if (error.message.includes('timeout')) {
        Toast({
            message: '请求超时！',
            type: 'fail'
        });
    }
    return Promise.reject(error)
});

function request(method = 'post', url, params, loading = true) {
    if (loading) {
        loaddingToast = Toast.loading({
            duration: 0,
            message: '请稍候...',
            forbidClick: true,
            className: 'toast-loading',
            loadingType: 'spinner'
        });
    }
    //生产环境加baseURL
    url = IsDev ? url : BASEURL + url;
    return axios({
        url: url,
        method: method,
        data: method == 'post' ? params : null,
        params: method == 'get' ? params : null
    });
}

export {
    BASEURL,
    request,
};