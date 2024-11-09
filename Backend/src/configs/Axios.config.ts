import axios from "axios";

export const AxiosConfig = axios.create({
  baseURL: process.env.SPOTIFY_BASE_URL,
});

AxiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error.response?.data);
    return Promise.reject(error);
  }
);
