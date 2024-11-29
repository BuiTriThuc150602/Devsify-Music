import { AxiosInstance } from "axios";
import { AxiosConfig } from "../configs/Axios.config";
import { SpotifyTrack } from "../types/SpotifyTrack.type";
import { ZingMp3 } from "zingmp3-api-full-v2";

export class TrackService {
  private api: AxiosInstance;

  constructor() {
    this.api = AxiosConfig;
  }

  public async getTrack(
    accessToken: string,
    track_id: string
  ): Promise<SpotifyTrack> {
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

  public async getRecommendations(accessToken: string, seed_tracks: string) {
    try {
      const response = await this.api.get(
        `/recommendations?seed_tracks=${seed_tracks}`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getAudioRepalce(name: string) {
    try {
      const findSong = await fetch(
        `https://ac.zingmp3.vn/v1/web/ac-suggestions?num=10&query=${name}&language=vi&ctime=1732862638&version=1.11.11&sig=491ee6fafb358f488c14981a3f2485258fb782b704c22972f804fd1caf51586965e384dc540355b7123380a30fcb34cd6a580217532aead50741b60a43628a13&apiKey=X5BM3w8N7MKozC0B85o4KMlzLZKhV00y`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return (data as any).data.items[1].suggestions[0];
        });

      const id = findSong.id;
      const song = await ZingMp3.getSong(id).then((data) => {
        console.log(data);
        return data;
      });
      return song.data["128"] || "";
    } catch (error) {
      return "";
    }
  }

  public async getArtistTopTracks(accessToken: string, artist_id: string) {
    try {
      const response = await this.api.get(`/artists/${artist_id}/top-tracks`, {
        headers: {
          Authorization: accessToken,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async search(accessToken: string, query: string) {
    try {
      const response = await this.api.get(
        `/search?q=${query}&type=artist,playlist,track`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
