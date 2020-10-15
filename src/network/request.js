import axios from "axios";

export function request(config) {
  // 1创建axios实例
  const intstance = axios.create({
    // baseURL: 'http://localhost:8088/',
    baseURL: "http://129.204.92.64:8081/",
    // baseURL: "https://localhost:44367/",
    timeout: 5000
    // changeOrigin: true,
    // contentType: 'application/json;charset=UTF-8',
    // dataType: 'json'
  });
  // 1.axios拦截器
  intstance.interceptors.request.use(
    config => {
      return config;
    },
    er => {
      console.log(er);
    }
  );

  // 1.axios响应拦截拦截
  intstance.interceptors.response.use(
    res => {
      return res;
    },
    er => {
      console.log(er);
    }
  );
  return intstance(config);
}
export default request;
