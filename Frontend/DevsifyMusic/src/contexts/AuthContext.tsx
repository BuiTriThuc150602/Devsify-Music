import React from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { createContext, useContext, useEffect } from "react";
import { config } from "../configs/auth_config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticationState } from "../RecoilState";
import { useRecoilState } from "recoil";
import { ReactNode } from "react";
import {
  AuthContextType,
  Authentication,
} from "../stores/types/AuthContext.type";

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

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authentication, setAuthentication] =
    useRecoilState(authenticationState);
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      scopes: config.scopes,
      usePKCE: false,
      redirectUri: config.redirectUrl,
    },
    discovery
  );

  useEffect(() => {
    const checkTokenValidity = async () => {
      const accessToken = authentication?.accessToken;
      const expirationTime = authentication?.expiresIn;
      const issuedAt = authentication?.issuedAt;
      if (accessToken && expirationTime) {
        const currentTime = Date.now();
        const expirationDate = issuedAt ? issuedAt + expirationTime : 0;
        if (currentTime > expirationDate) {
          setAuthentication(null);
          await AsyncStorage.removeItem("authentication");
        }
      }
    };
    checkTokenValidity();
  }, [authentication]);

  useEffect(() => {
    if (response?.type === "success") {
      const authentication = response.authentication;
      if (authentication?.accessToken) {
        setAuthentication(authentication);
      } else {
        console.log("Error");
        setAuthentication(null);
      }
    }
  }, [response]);
  return (
    <AuthContext.Provider value={{ request, response, promptAsync }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext, useAuthContext };
