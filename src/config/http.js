/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from "axios";
import router from "../router";
import { message } from "ant-design-vue";
import qs from "qs";
import { getLocalStorage } from "./utils";

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: "/sign/login",
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
};

const errorHandle = (status, msg) => {
  // 状态码判断
  switch (status) {
    case 400:
      message.error(msg);
      break;
    case 401:
      message.info("请登录后再试");
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    case 403:
      message.error("拒绝访问");
      break;
    case 404:
      message.error(msg);
      break;
    case 500:
      message.error("服务端出错");
      break;
    default:
      message.error(message);
  }
};

// 创建axios实例
var instance = axios.create({ timeout: 1000 * 20 });
//允许携带cookie
instance.defaults.withCredentials = true;

// 设置post请求头
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

//请求拦截
instance.interceptors.request.use(
  //序列化
  req => {
    if (getLocalStorage("token")) {
      req.headers["Authorization"] = "Bearer " + getLocalStorage("token");
    }
    req.data = qs.stringify(req.data);
    return req;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res =>
    res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res.data),
  // 请求失败
  error => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.msg);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        return;
      } else {
        return Promise.reject(error);
      }
    }
  }
);

export default instance;
