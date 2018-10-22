/**
 * @component request.js
 * @description 封装 axios请求
 * @time 2018/5/2
 * @author JUSTIN XU
 */
import axios from 'axios';
import { Toast } from 'antd-mobile';
import history from './history';

const BASE_URL = process.env.REACT_APP_BASE_API;

const ServeError = {
  SERVE_ERROR: '服务器发生未知错误',
  SERVE_TOKEN_ERROR: '令牌失效',
  TIMEOUT_ERROR: '网络连接超时',
  NETWORK_ERROR: '无网络连接',
};

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
  // const language = localStorage.getItem('language');
  // config.headers['X-Pool-Language'] = language || 'zh';
  const token = localStorage.getItem('token');
  // removeToken is true, don't need token
  if (token && !config.removeToken) {
    config.headers['X-Pool-Jwt'] = token;
  }
  return config;
});

// Add a response interceptor
instance.interceptors.response.use((response) => {
  const { data, status } = response;
  if ((status >= 200 && status < 300) || status === 304) {
    if (Object.is('arraybuffer', response.config.responseType)) {
      const filename = response.headers['content-disposition'] || '';
      return { filename, file: data };
    }
    return data;
  }
  const res = new Error(data.code);
  res.response = response;
  throw res;
}, (err) => {
  const { status, data: { msg, message } = {}, config = {} } = err.response || {};
  const errMsg = msg || message;
  if (Object.is(401, status) && !config.removeAuth) {
    localStorage.removeItem('token');
    history.replace('/login');
    const result = errMsg || ServeError.SERVE_TOKEN_ERROR;
    Toast.fail(result);
    throw new Error(result);
  }
  // handle network timeout
  if (Object.is('ECONNABORTED', err.code)) {
    const errMsg = ServeError.TIMEOUT_ERROR;
    Toast.fail(errMsg);
    throw new Error(errMsg);
  }
  // handle network error
  if (Object.is('Network Error', err.message)) {
    const errMsg = ServeError.NETWORK_ERROR;
    Toast.fail(errMsg);
    throw new Error(errMsg);
  }
  if (Object.is('arraybuffer', config.responseType)) {
    const data = err.response.data || '';
    const result = Buffer.from(data, 'binary').toString() || '{}';
    throw new Error(JSON.parse(result).msg || ServeError.SERVE_ERROR);
  }
  throw new Error(errMsg || ServeError.SERVE_ERROR);
});

export default instance;

export function removeHandleAuth() {
  return { removeAuth: true };
}

export function removeHandleToken() {
  return { removeToken: true };
}

export function getBufferResType(download = 1) {
  return download ? 'arraybuffer' : 'json';
}
