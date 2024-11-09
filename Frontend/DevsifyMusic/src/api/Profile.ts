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
}
