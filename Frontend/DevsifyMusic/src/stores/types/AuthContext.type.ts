import { AuthRequest, AuthSessionResult } from "expo-auth-session";

export interface AuthContextType {
  request: AuthRequest | null;
  response: AuthSessionResult | null;
  promptAsync: () => void;
}

export type Authentication = {
  access_token: string;
  expires_in?: number | undefined;
  idToken: string | undefined;
  issuedAt: number;
  refresh_token: string | undefined;
  scope: string | undefined;
  state: string;
  token_type: string;
};

export type SpotifyConfig = {
  client_id: string | undefined;
  client_secret: string | undefined;
  redirect_uri: string | undefined;
  scopes: string[];
  discovery: {
    authorizationEndpoint: string | undefined;
    tokenEndpoint: string | undefined;
  };
};
