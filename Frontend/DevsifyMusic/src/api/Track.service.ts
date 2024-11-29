import { AxiosInstance } from "axios";
import { AxiosConfig } from "./Axios.config";
import { SpotifyTrack, Track } from "../stores/types/SpotifyTrack.type";
import { SpotifyArtist } from "../stores/types/SpotifyUser.type";
import { SpotifySearch } from "../stores/types/SpotifySerach.type";

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
  async getUserSavedTracks(): Promise<SpotifyTrack> {
    return AxiosConfig.get(`/spotify-me/tracks`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }

  async getRecentlyPlayedSongs(limit: number = 6) {
    return AxiosConfig.get(`/spotify-me/recently-played?limit=${limit}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }

  async getUserTopItems(
    type: string
  ): Promise<SpotifyTrack[] | SpotifyArtist[]> {
    return AxiosConfig.get(`/spotify-me/top-items?type=${type}`)
      .then((response) => {
        return response.data.items;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }

  async getAudioRepalce(name: string) {
    console.log("name", name);

    return AxiosConfig.get(`/replace/tracks/${name}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }

  async getArtistTopTracks(artist_id: string): Promise<Track[]> {
    return AxiosConfig.get(`/spotify-me/artists/${artist_id}/top-tracks`)
      .then((response) => {
        return response.data?.tracks;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }

  async search(query: string): Promise<SpotifySearch> {
    return AxiosConfig.get(`/spotify-me/search?q=${query}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }
}
