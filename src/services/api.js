import axios from "axios";

const api = axios.create({
  baseURL: "http://172.18.9.236:8081/",
});

export default api;
