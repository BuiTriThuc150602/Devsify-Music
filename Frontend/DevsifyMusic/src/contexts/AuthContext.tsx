import React, { useRef } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { createContext, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticationState } from "../RecoilState";
import { useRecoilState } from "recoil";
import { ReactNode } from "react";
import {
  AuthContextType,
  Authentication,
  SpotifyConfig,
} from "../stores/types/AuthContext.type";
import { AuthAPI } from "../api/Auth.service";
import * as Linking from "expo-linking";

const AuthContext = createContext<AuthContextType>({
  request: null,
  response: null,
  promptAsync: () => {},
});
const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};

// (async () => await AsyncStorage.clear())();

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = React.useState<SpotifyConfig>();
  const redirect_uri = useRef<string>(Linking.createURL(""));
  const [authentication, setAuthentication] =
    useRecoilState<Partial<Authentication> | null>(authenticationState);
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Code,
      clientId: config?.client_id || "",
      scopes: config?.scopes,
      usePKCE: false,
      redirectUri: redirect_uri.current,
    },
    config?.discovery as any
  );

  useEffect(() => {
    if (!authentication) {
      const getConfig = async () => {
        const api = new AuthAPI();
        const configData = await api.getConfig();
        setConfig(configData);
      };
      getConfig();
    }
  }, []);

  useEffect(() => {
    const getAuthenToken = async () => {
      if (response?.type === "success") {
        const { code, state } = response.params;
        const getAuthAPI = new AuthAPI();
        const auth = await getAuthAPI.getAuth(
          code,
          state,
          redirect_uri.current
        );
        await AsyncStorage.setItem("authentication", JSON.stringify(auth));
        setAuthentication(auth);
      }
    };
    getAuthenToken();
  }, [response]);

  return (
    <AuthContext.Provider value={{ request, response, promptAsync }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext, useAuthContext };
