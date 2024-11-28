import { AxiosInstance } from "axios";
import { AxiosConfig } from "./Axios.config";
import {
  Authentication,
  SpotifyConfig,
} from "../stores/types/AuthContext.type";

export class AuthAPI {
  private api: AxiosInstance;

  constructor() {
    this.api = AxiosConfig;
  }
  async getConfig(): Promise<SpotifyConfig> {
    const config = await this.api.get("/spotify-config");
    return config.data;
  }
  async getAuth(code: string, state: string): Promise<Authentication> {
    const auth = await this.api.post("/spotify-callback-auth", {
      code,
      state,
    });
    return auth.data;
  }

  async refreshToken() {
    const auth = await this.api.post("/spotify-refresh-token");
    return auth.data;
  }
}
