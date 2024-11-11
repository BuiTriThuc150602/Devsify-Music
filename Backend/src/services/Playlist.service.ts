import { AxiosInstance } from "axios";
import { AxiosConfig } from "../configs/Axios.config";
import { SpotifyPlaylist } from "../types/SpotifyPlaylist.type";

export class PlaylistService {
  private api: AxiosInstance;
  constructor() {
    this.api = AxiosConfig;
  }
  public async getUserPlaylists(
    accessToken: string,
    user_id: string
  ): Promise<SpotifyPlaylist> {
    try {
      const response = await this.api.get(`/users/${user_id}/playlists`, {
        headers: {
          Authorization: accessToken,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getPlaylist(
    accessToken: string,
    playlist_id: string
  ): Promise<SpotifyPlaylist> {
    try {
      const response = await this.api.get(`/playlists/${playlist_id}`, {
        headers: {
          Authorization: accessToken,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getPlaylistTracks(
    accessToken: string,
    playlist_id: string
  ): Promise<SpotifyPlaylist> {
    try {
      const response = await this.api.get(`/playlists/${playlist_id}/tracks`, {
        headers: {
          Authorization: accessToken,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getPlaylistTracksNext(
    accessToken: string,
    playlist_id: string,
    next: string
  ): Promise<SpotifyPlaylist> {
    try {
      const response = await this.api.get(next, {
        headers: {
          Authorization: accessToken,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getPlaylistTracksPrevious(
    accessToken: string,
    playlist_id: string,
    previous: string
  ): Promise<SpotifyPlaylist> {
    try {
      const response = await this.api.get(previous, {
        headers: {
          Authorization: accessToken,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getUserTopItems(
    accessToken: string,
    type: string
  ): Promise<SpotifyPlaylist> {
    try {
      const response = await this.api.get(`/me/top/${type ?? "tracks"}`, {
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
