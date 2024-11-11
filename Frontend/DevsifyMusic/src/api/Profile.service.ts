import { SpotifyPlaylist } from "../stores/types/SpotifyPlaylist.type";
import { AxiosConfig } from "./Axios.config";

export class ProfileAPI {
  async getProfile() {
    return AxiosConfig.get("/spotify-me")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }

  async getUserPlaylists(user_id: string) : Promise<SpotifyPlaylist> {
    return AxiosConfig.get(`/spotify-me/playlists/${user_id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }
}
