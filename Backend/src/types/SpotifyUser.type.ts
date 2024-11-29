import { Expose } from "class-transformer";

export class SpotifyUser {
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
}

export class SpotifyArtist {
  @Expose()
  external_urls: {
    spotify: string;
  };
  @Expose()
  followers: {
    href: string | null;
    total: number;
  };
  @Expose()
  genres: string[];
  @Expose()
  href: string;
  @Expose()
  id: string;
  @Expose()
  images: Array<{
    height: number | null;
    url: string;
    width: number | null;
  }>;
  @Expose()
  name: string;
  @Expose()
  popularity: number;
  @Expose()
  type: string;
  @Expose()
  uri: string;
}
