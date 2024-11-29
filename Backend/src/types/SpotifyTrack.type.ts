import { Expose, Type } from "class-transformer";

class Image  {
  @Expose()
  url: string;
  @Expose()
  height: number;
  @Expose()
  width: number;
};

class Artist {
  @Expose()
  href: string;
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  type: string;
  @Expose()
  uri: string;
};

export class Album  {
  @Expose()
  album_type: string;
  @Expose()
  total_tracks: number;
  @Expose()
  id: string;
  @Expose()
  @Type(() => Image)
  images: Image[];
  @Expose()
  name: string;
  @Expose()
  release_date: string;
  @Expose()
  release_date_precision: string;
  @Expose()
  type: string;
  @Expose()
  uri: string;
  @Expose()
  @Type(() => Artist)
  artists: Artist[];
};

export class Track {
  @Expose()
  @Type(() => Album)
  album: Album;
  @Expose()
  @Type(() => Artist)
  artists: Artist[];
  @Expose()
  disc_number: number;
  @Expose()
  duration_ms: number;
  @Expose()
  id: string;
  @Expose()
  is_playable: boolean;
  @Expose()
  name: string;
  @Expose()
  popularity: number;
  @Expose()
  preview_url: string | null;
  @Expose()
  track_number: number;
  @Expose()
  type: string;
  @Expose()
  uri: string;
  @Expose()
  is_local: boolean;
};

class Item  {
  @Expose()
  added_at: string;
  @Expose()
  @Type(() => Track)
  track: Track;
};

export class SpotifyTrack {
  @Expose()
  href: string;
  @Expose()
  limit: number;
  @Expose()
  next: string | null;
  @Expose()
  offset: number;
  @Expose()
  previous: string | null;
  @Expose()
  total: number;
  @Expose()
  @Type(() => Item)
  items: Item[];
};
