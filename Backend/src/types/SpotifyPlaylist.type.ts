import { Expose, Type } from "class-transformer";

export class SpotifyPlaylist {
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
  items: Array<Item>;
}

export class Item {
  @Expose()
  collaborative: boolean;
  @Expose()
  description: string;
  @Expose()
  external_urls: {
    spotify: string;
  };
  @Expose()
  href: string;
  id: string;
  @Expose()
  images: Array<{
    url: string;
    height: number | null;
    width: number | null;
  }>;
  @Expose()
  name: string;
  @Expose()
  owner: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string | null;
      total: number;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
  };
  @Expose()
  public: boolean;
  @Expose()
  snapshot_id: string;
  @Expose()
  tracks: {
    href: string;
    total: number;
  };
  @Expose()
  type: string;
  @Expose()
  uri: string;
}
