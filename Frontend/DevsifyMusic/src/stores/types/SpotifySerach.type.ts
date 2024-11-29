import { Item } from "./SpotifyPlaylist.type";
import { Track } from "./SpotifyTrack.type";
import { SpotifyArtist } from "./SpotifyUser.type";

export type SpotifySearch = {
  artists: ArtistSearch;

  playlists: PlaylistSearch;

  tracks: TrackSearch;
};

export type ArtistSearch = {
  total: number;

  items: SpotifyArtist[];
};

export type TrackSearch = {
  total: number;

  items: Track[];
};

export type PlaylistSearch = {
  total: number;

  items: Item[];
};
