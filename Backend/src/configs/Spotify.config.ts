import * as dotenv from "dotenv";

dotenv.config();
export const SpotifyConfig = {
  client_id: process.env.SPOTIFY_CLIENT_ID,
  client_secret: process.env.SPOTIFY_CLIENT_SECRET,
  redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
  scopes: [
    "user-read-email",
    "user-library-read",
    "user-read-recently-played",
    "user-top-read",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-public",
  ],
  discovery: {
    authorizationEndpoint: process.env.SPOTIFY_AUTH_URL,
    tokenEndpoint: process.env.SPOTIFY_ACCOUNTS_URL,
  },
};
