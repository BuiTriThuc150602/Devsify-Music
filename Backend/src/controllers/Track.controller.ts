import { TrackService } from "../services/Track.service";
import { CustomError } from "../types/Error";
import { SpotifyTrack } from "../types/SpotifyTrack.type";
import { Request } from "express";

export class TrackController {
  private trackService: TrackService;

  constructor() {
    this.trackService = new TrackService();
  }

  public async getTrack(req: Request): Promise<SpotifyTrack> {
    try {
      const accessToken = req.headers.authorization;
      const track_id = req.params.track_id;
      if (!accessToken) {
        const error: CustomError = new Error("Parameter missing");
        error.status = 400;
        error.message = "Unauthorized, token or track_id not found";
        throw error;
      }
      const track = await this.trackService.getTrack(accessToken, track_id);
      return track;
    } catch (error) {
      throw error;
    }
  }

  public async getUserSavedTracks(req: Request): Promise<SpotifyTrack> {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        const error: CustomError = new Error("Parameter missing");
        error.status = 400;
        error.message = "Unauthorized, token not found";
        throw error;
      }
      const tracks = await this.trackService.getUserSavedTracks(accessToken);
      return tracks;
    } catch (error) {
      throw error;
    }
  }
}
