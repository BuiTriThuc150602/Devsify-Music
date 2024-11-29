import { TrackAPI } from "@/src/api/Track.service";
import { Track } from "@/src/stores/types/SpotifyTrack.type";
import { SpotifyArtist } from "@/src/stores/types/SpotifyUser.type";
import { atom, selector } from "recoil";

const trackApi = new TrackAPI();

export const selectedArtistState = atom<SpotifyArtist | null>({
  key: "selectedArtistStateKey",
  default: null,
});

export const artistTopTracksSelector = selector<Track[] | null>({
  key: "artistAlbumsSelectorKey",
  get: async ({ get }) => {
    const artist = get(selectedArtistState);
    if (artist && artist.id) {
      return await trackApi.getArtistTopTracks(artist.id);
    }
    return null;
  },
});
