import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom, selector } from "recoil";
import { Authentication } from "../stores/types/AuthContext.type";

const getAuthenticationFromStorage = async () => {
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
      AsyncStorage.setItem("authentication", JSON.stringify(authentication));
    } else {
      AsyncStorage.removeItem("authentication");
    }
    return authentication;
  },
});
