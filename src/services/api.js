import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.196:8081/",
});

export default api;
