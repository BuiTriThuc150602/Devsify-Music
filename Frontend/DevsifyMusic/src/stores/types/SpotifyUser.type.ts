import { SpotifyTrack } from "./SpotifyTrack.type";

export type SpotifyUser = {
  display_name: string;
  email: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: Array<{
    height: number;
    url: string;
    width: number;
  }>;
  type: string;
  uri: string;
};

export type SpotifyArtist = {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: Array<{
    height: number | null;
    url: string;
    width: number | null;
  }>;
  name: string;
  popularity: number;
  type: string;
  uri: string;
};
