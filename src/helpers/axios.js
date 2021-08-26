//creating instance of axios so that it can be reused.

import axios from "axios";
import store from "../store";
import { api } from "../urlConfig";

/**send token in headers:--> api will check if valid user or not */
const token = window.localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bearer ${token}` : null,
  },
});

axiosInstance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

export default axiosInstance;
