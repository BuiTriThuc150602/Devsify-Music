import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getAuthenticationFromStorage } from "../RecoilState";

export const AxiosConfig = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosConfig.interceptors.request.use(
  async (config) => {
    const authentication = await getAuthenticationFromStorage();
    if (authentication?.access_token) {
      config.headers["Authorization"] = `Bearer ${authentication.access_token}`;
    }
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
    console.log("ERROR API :", error);
    if (error.response?.status === 401) {
      console.log("token expired");
      const authentication = await getAuthenticationFromStorage();
      if (authentication?.refresh_token) {
        const auth = await AxiosConfig.post("/spotify-refresh-token", {
          refresh_token: authentication.refresh_token,
        });

        await AsyncStorage.setItem(
          "authentication",
          JSON.stringify({
            ...authentication,
            access_token: auth.data.access_token,
          })
        );
        return AxiosConfig.request(error.config);
      }
    }
    return Promise.reject(error);
  }
);
