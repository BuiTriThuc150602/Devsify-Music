import AsyncStorage from "@react-native-async-storage/async-storage";
import { Authentication } from "../stores/types/AuthContext.type";

export const getAuthenticationFromStorage =
  async (): Promise<Authentication | null> => {
    const authentication = await AsyncStorage.getItem("authentication");
    return authentication ? JSON.parse(authentication) : null;
  };
