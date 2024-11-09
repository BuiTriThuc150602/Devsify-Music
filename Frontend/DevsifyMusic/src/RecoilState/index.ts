import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom, selector } from "recoil";
import { Authentication } from "../stores/types/AuthContext.type";
import { ProfileAPI } from "../api/Profile";

export const getAuthenticationFromStorage =
  async (): Promise<Authentication | null> => {
    const authentication = await AsyncStorage.getItem("authentication");
    return authentication ? JSON.parse(authentication) : null;
  };
export const authenticationState = atom<Partial<Authentication> | null>({
  key: "authenticationStateKey",
  default: getAuthenticationFromStorage(),
});

export const authenticationSelector = selector<Partial<Authentication> | null>({
  key: "authenticationSelectorKey",
  get: async ({ get }) => {
    const authentication = get(authenticationState);
    if (authentication) {
      await AsyncStorage.setItem(
        "authentication",
        JSON.stringify(authentication)
      );
    } else {
      await AsyncStorage.removeItem("authentication");
    }
    return authentication;
  },
});

export const profileSelector = selector({
  key: "profileSelectorKey",
  get: async ({ get }) => {
    const authentication = get(authenticationState);
    if (authentication) {
      const api = new ProfileAPI();
      return await api.getProfile();
    }
    return null;
  },
});
