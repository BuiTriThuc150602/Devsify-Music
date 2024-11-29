import { plainToClass } from "class-transformer";
import { TrackService } from "../services/Track.service";
import { CustomError } from "../types/Error";
import { SpotifySearch } from "../types/SpotifySerach.type";
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

  public async getAudioRepalce(req: Request): Promise<string> {
    const name = req.params.name;
    console.log("name", name);
    return this.trackService.getAudioRepalce(name);
  }

  public async getArtistTopTracks(req: Request): Promise<SpotifyTrack> {
    try {
      const accessToken = req.headers.authorization;
      const artist_id = req.params.artist_id;
      if (!accessToken) {
        const error: CustomError = new Error("Parameter missing");
        error.status = 400;
        error.message = "Unauthorized, token or artist_id not found";
        throw error;
      }
      const tracks = await this.trackService.getArtistTopTracks(
        accessToken,
        artist_id
      );
      return tracks;
    } catch (error) {
      throw error;
    }
  }

  public async search(req: Request): Promise<SpotifySearch> {
    try {
      const accessToken = req.headers.authorization;
      const query = req.query.q as string;
      if (!accessToken || !query) {
        const error: CustomError = new Error("Parameter missing");
        error.status = 400;
        error.message = "Unauthorized, token or query not found";
        throw error;
      }
      const tracks = await this.trackService.search(accessToken, query);
      return plainToClass(SpotifySearch, tracks, {
        excludeExtraneousValues: false,
      });
    } catch (error) {
      throw error;
    }
  }
}
