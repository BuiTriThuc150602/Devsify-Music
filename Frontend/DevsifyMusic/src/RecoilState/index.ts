import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom, selector } from "recoil";
import { Authentication } from "../stores/types/AuthContext.type";
import { ProfileAPI } from "../api/Profile.service";
import { SpotifyUser } from "../stores/types/SpotifyUser.type";
import { SpotifyPlaylist } from "../stores/types/SpotifyPlaylist.type";
import { getAuthenticationFromStorage } from "../utils/AsyncStorage.util";
import { TrackAPI } from "../api/Track.service";
import { SpotifyTrack, Track } from "../stores/types/SpotifyTrack.type";

const profileApi = new ProfileAPI();
const trackApi = new TrackAPI();

export const authenticationState = atom<Partial<Authentication> | null>({
  key: "authenticationStateKey",
  default: getAuthenticationFromStorage(),
});

export const authenticationSelector = selector<Partial<Authentication> | null>({
  key: "authenticationSelectorKey",
  get: async ({ get }) => {
    const authentication = get(authenticationState);
    if (authentication) {
      await AsyncStorage.setItem(
        "authentication",
        JSON.stringify(authentication)
      );
    } else {
      await AsyncStorage.removeItem("authentication");
    }
    return authentication;
  },
});

export const profileSelector = selector<SpotifyUser>({
  key: "profileSelectorKey",
  get: async ({ get }) => {
    const authentication = get(authenticationState);
    if (authentication) {
      return await profileApi.getProfile();
    }
    return null;
  },
});

export const userPlaylistsSelector = selector<SpotifyPlaylist | null>({
  key: "userPlaylistsSelectorKey",
  get: async ({ get }) => {
    const user = get(profileSelector);
    if (user && user.id) {
      return await profileApi.getUserPlaylists(user.id);
    }
    return null;
  },
});

export const currentTrackState = atom<Track | null>({
  key: "currentTrackStateKey",
  default: null,
});

export const userSaveTrackSelector = selector<SpotifyTrack | null>({
  key: "userSaveTrackSelectorKey",
  get: async ({ get }) => {
    const authentication = get(authenticationState);
    if (authentication && authentication.access_token) {
      const tracks =  await trackApi.getUserSavedTracks();
      console.log("USER SAVED TRACKS", tracks);
      return tracks;
      
    }
    return null;
  },
});

export const currentSoundState = atom<any>({
  key: "currentSoundStateKey",
  default: null,
});
