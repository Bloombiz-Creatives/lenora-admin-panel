import axios from "axios";
import { getLocalStore } from "./index";

var axiosInstance = axios.create({});
axiosInstance.defaults.baseURL = "http://localhost:5000/api"
let token = getLocalStore('accessToken');


axiosInstance.interceptors.request.use(
  function (config) {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
      return config;

  },
  function (error) {
     return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  }
);
export default axiosInstance;