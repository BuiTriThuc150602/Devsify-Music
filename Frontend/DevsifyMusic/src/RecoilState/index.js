import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom, selector } from "recoil";

const getAuthenticationFromStorage = async () => {
  const authentication = await AsyncStorage.getItem("authentication");
  return authentication ? JSON.parse(authentication) : null;
};
export const authenticationState = atom({
  key: "authenticationStateKey",
  default: getAuthenticationFromStorage(),
});

export const authenticationSelector = selector({
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
