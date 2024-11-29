import { PlaylistController } from "../controllers/Playlist.controller";

export const PlaylistRoutes = [
  {
    method: "get",
    route: "/spotify-me/playlists/:user_id",
    controller: PlaylistController,
    action: "getUserPlaylists",
  },
  {
    method: "get",
    route: "/spotify-me/playlists/:playlist_id",
    controller: PlaylistController,
    action: "getPlaylist",
  },
  {
    method: "get",
    route: "/spotify-me/playlists/:playlist_id/tracks",
    controller: PlaylistController,
    action: "getPlaylistTracks",
  },
  {
    method: "get",
    route: "/spotify-me/playlists/:playlist_id/tracks/next",
    controller: PlaylistController,
    action: "getPlaylistTracksNext",
  },

  {
    method: "get",
    route: "/spotify-me/top-items",
    controller: PlaylistController,
    action: "getUserTopItems",
  },

  {
    method: "get",
    route: "/spotify-me/recently-played",
    controller: PlaylistController,
    action: "getRecentlyPlayedSongs",
  },
];
