import axios from "axios";

const instance = axios.create({
   baseURL: import.meta.VITE_NODE_ENV = "development" ? 'http://localhost:5000' : "https://my-hours-api.vercel.app",
   withCredentials: true,
   headers: {
      'Content-Type': 'application/json'
   }
})
// instance.interceptors.request.use(config => {
//    const token = Cookies.get("jwt");

//    if (token) {
//      config.headers["x-access-token"] = token;
//    }

//    return config;
//  });
// instance.interceptors.request.use((config) => {
//    config.headers.Authorization = window.localStorage.getItem('token')
//    return config
// })
export default instance