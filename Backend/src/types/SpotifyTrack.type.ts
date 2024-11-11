type Image = {
  url: string;
  height: number;
  width: number;
};

type Artist = {
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type Album = {
  album_type: string;
  total_tracks: number;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
  artists: Artist[];
};

export type Track = {
  album: Album;
  artists: Artist[];
  disc_number: number;
  duration_ms: number;
  id: string;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};

type Item = {
  added_at: string;
  track: Track;
};

export type SpotifyTrack = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: Item[];
};
