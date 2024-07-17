import axios from "axios";

const htpp = axios.create({
  baseURL: "https://service.olimjanov.uz/v1",
});

htpp.interceptors.request.use((config) => {
 const access_token=localStorage.getItem("access_token")
  if (access_token) {
    config.headers["Authorization"] = access_token
  }

  return config
});

export default htpp;