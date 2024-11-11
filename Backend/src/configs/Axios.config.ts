import axios from "axios";

export const AxiosConfig = axios.create({
  baseURL: process.env.SPOTIFY_BASE_URL,
});

AxiosConfig.interceptors.request.use(
  async (config) => {
    console.log("Request URL :", config.baseURL + config.url);
    console.log("Request Headers :", config.headers);
    console.log("Request Data :", config.data);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("ERROR API :", error.response?.data);
    return Promise.reject(error);
  }
);
