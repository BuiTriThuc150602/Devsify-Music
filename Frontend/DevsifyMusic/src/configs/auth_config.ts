import * as Linking from "expo-linking";

export const config = {
  issuer: "https://accounts.spotify.com",
  clientId: "d7e655b5064d425aa121ff625754d306",
  clientSecret: "d1bd570a23224867910944f6299662c0",
  scopes: [
    "user-read-email",
    "user-library-read",
    "user-read-recently-played",
    "user-top-read",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-public",
  ],
  redirectUrl: Linking.createURL(),
};
