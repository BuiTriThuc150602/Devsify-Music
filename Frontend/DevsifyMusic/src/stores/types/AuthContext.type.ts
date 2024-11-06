import { AuthRequest, AuthSessionResult } from "expo-auth-session";

export interface AuthContextType {
  request: AuthRequest | null;
  response: AuthSessionResult | null;
  promptAsync: () => void;
}

export type Authentication = {
  accessToken: string;
  expiresIn?: number | undefined;
  idToken: string | undefined;
  issuedAt: number;
  refreshToken: string | undefined;
  scope: string | undefined;
  state: string;
  tokenType: string;
};
