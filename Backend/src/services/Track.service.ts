import { AxiosInstance } from "axios";
import { AxiosConfig } from "../configs/Axios.config";
import { SpotifyTrack } from "../types/SpotifyTrack.type";

export class TrackService {
  private api: AxiosInstance;

  constructor() {
    this.api = AxiosConfig;
  }

  public async getTrack(accessToken: string, track_id: string) : Promise<SpotifyTrack> {
    try {
      const response = await this.api.get(`/tracks/${track_id}`, {
        headers: {
          Authorization: accessToken,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getTrackAudioFeatures(accessToken: string, track_id: string) {
    try {
      const response = await this.api.get(`/audio-features/${track_id}`, {
        headers: {
          Authorization: accessToken,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getUserSavedTracks(accessToken: string) {
    try {
      const response = await this.api.get(`/me/tracks`, {
        headers: {
          Authorization: accessToken,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
