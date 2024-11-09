import { AuthentiactionController } from "../controllers/Authentication.controller";

export const AuthenticationRoutes = [
  {
    method: "post",
    route: "/spotify-callback-auth",
    controller: AuthentiactionController,
    action: "getAuth",
  },
  {
    method: "get",
    route: "/spotify-config",
    controller: AuthentiactionController,
    action: "getConfig",
  },
  {
    method: "get",
    route: "/spotify-me",
    controller: AuthentiactionController,
    action: "getme",
  },
  {
    method: "post",
    route: "/spotify-refresh-token",
    controller: AuthentiactionController,
    action: "refreshToken",
  },
];
