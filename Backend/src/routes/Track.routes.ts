import { TrackController } from "../controllers/Track.controller";

export const TrackRoutes = [
  {
    method: "get",
    route: "/spotify-me/tracks/:track_id",
    controller: TrackController,
    action: "getTrack",
  },
  {
    method: "get",
    route: "/spotify-me/tracks",
    controller: TrackController,
    action: "getUserSavedTracks",
  },
  {
    method: "get",
    route: "/replace/tracks/:name",
    controller: TrackController,
    action: "getAudioRepalce",
  },
  {
    method: "get",
    route: "/spotify-me/artists/:artist_id/top-tracks",
    controller: TrackController,
    action: "getArtistTopTracks",
  },

  {
    method: "get",
    route: "/spotify-me/search",
    controller: TrackController,
    action: "search",
  },
];
