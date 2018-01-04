import http from 'axios'
import router from './router'
import url from './url'
import config from '../config'

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
    router.replace({path: '/login', query: {redirect: router.currentRoute.fullPath}});
  }
  if (http.onError instanceof Function) {
    http.onError(error);
  }
  return Promise.reject(error);
});

// api
const api = {}
api.postCategory = {
  list() {
    return http.get(`${config.dev.apiPrefix}/post_categories`)
  },
  save(postCategory) {
    return http.post(`${config.dev.apiPrefix}/post_categories`, postCategory)
  },
  delete(id) {
    return http.delete(`${config.dev.apiPrefix}/post_categories/${id}`)
  },
  patch(postCategory) {
    return http.patch(`${config.dev.apiPrefix}/post_categories/${postCategory.id}`, postCategory)
  }
}
api.post = {
  list(queries) {
    return http.get(`${config.dev.apiPrefix}/posts?${url.buildQueries(queries)}`)
  },
  get(id) {
    return http.get(`${config.dev.apiPrefix}/posts/${id}`)
  },
  all() {
    return http.get(`${config.dev.apiPrefix}/posts/archives`)
  },
  save(post) {
    return http.post(`${config.dev.apiPrefix}/posts`, post)
  }
}
api.moments = {
  list(page, size) {
    return http.get(`${config.dev.apiPrefix}/moments?page=${page}&size=${size}`)
  }
}
api.about = {
  get() {
    return http.get(`${config.dev.apiPrefix}/about`)
  }
}
export default api
