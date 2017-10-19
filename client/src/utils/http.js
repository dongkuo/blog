import http from 'axios'
import router from '../router'
import url from '../utils/url'
import config from '../../config'

// 统一添加请求头
http.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});

//统一处理错误
http.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    router.replace({ path: '/login', query: { redirect: router.currentRoute.fullPath } });
  }
  if (http.onError instanceof Function) {
    http.onError(error);
  }
  return Promise.reject(error);
});

// api
http.api = {}
http.api.post = {
  list(queries){
    return http.get(`${config.dev.apiPrefix}/posts/list?${url.buildQueries(queries)}`)
  },
  get(id) {
    return http.get(`${config.dev.apiPrefix}/posts/${id}`)
  },
  all(){
    return http.get(`${config.dev.apiPrefix}/posts/all`)
  }
}
export default http