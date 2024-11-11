import { AxiosInstance } from "axios";
import { AxiosConfig } from "./Axios.config";
import { SpotifyTrack } from "../stores/types/SpotifyTrack.type";

export class TrackAPI {
  private api: AxiosInstance;

  constructor() {
    this.api = AxiosConfig;
  }
  async getTrack(track_id: string) {
    return AxiosConfig.get(`/spotify-me/tracks/${track_id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }
  async getUserSavedTracks() : Promise<SpotifyTrack> {
    return AxiosConfig.get(`/spotify-me/tracks`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }
}
