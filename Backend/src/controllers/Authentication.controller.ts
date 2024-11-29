import { SpotifyConfig } from "../configs/Spotify.config";
import { Request, Response } from "express";
import { AuthenticationService } from "../services/Authentiaction.service";
import { CustomError } from "../types/Error";

export class AuthentiactionController {
  private authService: AuthenticationService;
  constructor() {
    this.authService = new AuthenticationService();
  }
  getConfig() {
    const config = SpotifyConfig;
    return config;
  }
  async getAuth(req: Request, resp: Response) {
    try {
      const { code, state, idToken, redirect_uri } = req.body;
      console.log("Params", { code, state, idToken });
      const result = await this.authService.getAuth(code, state, idToken, redirect_uri);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getme(req: Request, resp: Response) {
    try {
      const token = req.headers.authorization;
      const user = await this.authService.getMe(token);
      return user;
    } catch (error) {
      if (error.error.status === 401) {
        const customError: CustomError = new Error("Token expired");
        customError.status = 401;
        customError.code = "TOKEN_EXPIRED";
        throw customError;
      }
      console.error("Error getme controller", error);
      throw error;
    }
  }

  async refreshToken(req: Request) {
    try {
      const { refresh_token } = req.body;
      const result = await this.authService.refreshToken(refresh_token);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
