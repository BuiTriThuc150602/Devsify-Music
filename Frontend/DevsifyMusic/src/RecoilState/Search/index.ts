import { TrackAPI } from "@/src/api/Track.service";
import { ArtistSearch, PlaylistSearch, SpotifySearch, TrackSearch } from "@/src/stores/types/SpotifySerach.type";
import { atom, selector } from "recoil";

const trackApi = new TrackAPI();

export const searchValue = atom({
  key: "searchValue",
  default: "",
});

export const searchResultSelector = selector<SpotifySearch>({
  key: "searchResultSelector",
  get: async ({ get }) => {
    const search = get(searchValue);
    if (search) {
      return await trackApi.search(search);
    }
    return {
      artists: {} as ArtistSearch,
      playlists: {} as PlaylistSearch,
      tracks: {} as TrackSearch,
    };
  },
});
