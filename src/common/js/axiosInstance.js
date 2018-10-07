import axios from "axios";
import router from "@/router/router.js";

const BASE_RUL =
  process.env.NODE_ENV === "development" ? "http://127.0.0.1:7001" : "/";

// 需要设置头部的请求
const axiosWithHeaders = axios.create();
const axiosInstance = axios.create();

// 拦截器
axiosWithHeaders.interceptors.request.use(
  config => {
    config.headers = {
      Authorization: `JWT ${window.localStorage.getItem("token")}`
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axiosWithHeaders.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(error);
    if (error.response && error.response.status === 401) {
      router.replace({
        name: "login",
        query: { next: router.currentRoute.fullPath }
      });
    }
    return Promise.reject(error.response); // 返回接口返回的错误信息
  }
);

axiosInstance.interceptors.request.use(
  config => {
    config.baseURL = BASE_RUL;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export { axiosWithHeaders, axiosInstance };
