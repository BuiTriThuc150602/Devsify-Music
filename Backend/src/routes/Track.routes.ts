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
];
