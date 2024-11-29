import { Expose, Type } from "class-transformer";
import { Item } from "./SpotifyPlaylist.type";
import { Track } from "./SpotifyTrack.type";
import { SpotifyArtist } from "./SpotifyUser.type";

export class SpotifySearch {
  @Expose()
  @Type(() => ArtistSearch)
  artists: ArtistSearch[];
  @Expose()
  @Type(() => PlaylistSearch)
  playlists: PlaylistSearch[];
  @Expose()
  @Type(() => TrackSearch)
  tracks: TrackSearch[];
}

class ArtistSearch {
  @Expose()
  total: number;
  @Expose()
  @Type(() => SpotifyArtist)
  items: SpotifyArtist[];
}

class TrackSearch {
  @Expose()
  total: number;
  @Expose()
  @Type(() => Track)
  items: Track[];
}

class PlaylistSearch {
  @Expose()
  total: number;
  @Expose()
  @Type(() => Item)
  items: Item[];
}
