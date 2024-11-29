import NodeCache = require("node-cache");
import { CacheSetup } from "../configs/Cache.config";
import { Authentication } from "../types/Auth";
import { AxiosConfig } from "../configs/Axios.config";
import { AxiosInstance } from "axios";

export class AuthenticationService {
  private readonly client_id: string = process.env.SPOTIFY_CLIENT_ID;
  private readonly client_secret: string = process.env.SPOTIFY_CLIENT_SECRET;
  private api: AxiosInstance;
  private cache: NodeCache;

  constructor() {
    this.cache = CacheSetup.getInstace();
    this.api = AxiosConfig;
  }

  async getAuth(code: string, state: string, idToken: string, redirect_uri: string) {
    try {
      const auth: Authentication = this.cache.get("auth");
      console.log("Get Auth from cache", auth);
      if (auth) {
        if (this.checkTokenValidity(auth)) {
          return auth;
        } else {
          return this.refreshToken(auth.refresh_token);
        }
      } else {
        if (state === null || code === null) {
          throw new Error("Invalid state or code");
        } else {
          // const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
          var authOptions = {
            url: process.env.SPOTIFY_ACCOUNTS_URL,
            form: {
              code: code,
              redirect_uri: redirect_uri,
              grant_type: "authorization_code",
            },
            headers: {
              Authorization:
                "Basic " +
                Buffer.from(this.client_id + ":" + this.client_secret).toString(
                  "base64"
                ),

              "Content-Type": "application/x-www-form-urlencoded",
            },
            json: true,
          };

          const get_token = await this.api.post(
            authOptions.url,
            authOptions.form,
            {
              headers: authOptions.headers,
            }
          );

          if (get_token.data.refresh_token) {
            this.cache.set("auth", get_token.data);
          }
          console.log(get_token.data);

          return get_token.data;
        }
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error getting token");
    }
  }

  private checkTokenValidity = (auth: Authentication) => {
    const issuedAt = auth?.issuedAt;
    if (auth.access_token && auth.expires_in) {
      const currentTime = Date.now();
      const expirationDate = issuedAt ? issuedAt + auth.expires_in : 0;
      return currentTime <= expirationDate;
    }
  };
  async refreshToken(refresh_token: string) {
    try {
      if (refresh_token === null) {
        throw new Error("Invalid refresh token");
      } else {
        var authOptions = {
          url: process.env.SPOTIFY_ACCOUNTS_URL,
          form: {
            refresh_token: refresh_token,
            grant_type: "refresh_token",
          },
          headers: {
            Authorization:
              "Basic " +
              Buffer.from(this.client_id + ":" + this.client_secret).toString(
                "base64"
              ),

            "Content-Type": "application/x-www-form-urlencoded",
          },
          json: true,
        };

        const get_token = await this.api.post(
          authOptions.url,
          authOptions.form,
          {
            headers: authOptions.headers,
          }
        );
        console.log(get_token.data);
        return get_token.data;
      }
    } catch (error) {
      console.error(error);
      throw error
    }
  }

  async getMe(access_token: string) {
    try {
      if (access_token === null) {
        throw new Error("Invalid access token");
      } else {
        const options = {
          url: "/me",
          headers: { Authorization: access_token },
          json: true,
        };

        const get_me = await this.api.get(options.url, {
          headers: options.headers,
        });
        return get_me.data;
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw error.response.data;
      }
      throw new Error("Error getting me");
    }
  }
}
