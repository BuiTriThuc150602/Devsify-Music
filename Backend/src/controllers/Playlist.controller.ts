import { PlaylistService } from "../services/Playlist.service";
import { CustomError } from "../types/Error";
import { SpotifyPlaylist } from "../types/SpotifyPlaylist.type";
import { Request } from "express";

export class PlaylistController {
  private playlistService: PlaylistService;

  constructor() {
    this.playlistService = new PlaylistService();
  }

  public async getUserPlaylists(req: Request): Promise<SpotifyPlaylist> {
    try {
      const accessToken = req.headers.authorization;
      const user_id = req.params.user_id;
      if (!accessToken) {
        const error: CustomError = new Error("Parameter missing");
        error.status = 400;
        error.message = "Unauthorized, token or user_id not found";
        throw error;
      }
      const playlists = await this.playlistService.getUserPlaylists(
        accessToken,
        user_id
      );
      return playlists;
    } catch (error) {
      throw error;
    }
  }

  public async getPlaylist(req: Request): Promise<SpotifyPlaylist> {
    try {
      const accessToken = req.headers.authorization;
      const playlist_id = req.params.playlist_id;
      if (!accessToken) {
        const error: CustomError = new Error("Parameter missing");
        error.status = 400;
        error.message = "Unauthorized, token or playlist_id not found";
        throw error;
      }
      const playlist = await this.playlistService.getPlaylist(
        accessToken,
        playlist_id
      );
      return playlist;
    } catch (error) {
      throw error;
    }
  }

  public async getPlaylistTracks(req: Request): Promise<SpotifyPlaylist> {
    try {
      const accessToken = req.headers.authorization;
      const playlist_id = req.params.playlist_id;
      if (!accessToken) {
        const error: CustomError = new Error("Parameter missing");
        error.status = 400;
        error.message = "Unauthorized, token or playlist_id not found";
        throw error;
      }
      const playlist = await this.playlistService.getPlaylistTracks(
        accessToken,
        playlist_id
      );
      return playlist;
    } catch (error) {
      throw error;
    }
  }

  public async getPlaylistTracksNext(req: Request): Promise<SpotifyPlaylist> {
    try {
      const accessToken = req.headers.authorization;
      const playlist_id = req.params.playlist_id;
      const next = req.query.next as string;
      if (!accessToken) {
        const error: CustomError = new Error("Parameter missing");
        error.status = 400;
        error.message = "Unauthorized, token or playlist_id not found";
        throw error;
      }
      const playlist = await this.playlistService.getPlaylistTracksNext(
        accessToken,
        playlist_id,
        next
      );
      return playlist;
    } catch (error) {
      throw error;
    }
  }

  public async getPlaylistTracksPrevious(
    req: Request
  ): Promise<SpotifyPlaylist> {
    try {
      const accessToken = req.headers.authorization;
      const playlist_id = req.params.playlist_id;
      const previous = req.query.previous as string;
      if (!accessToken) {
        const error: CustomError = new Error("Parameter missing");
        error.status = 400;
        error.message = "Unauthorized, token or playlist_id not found";
        throw error;
      }
      const playlist = await this.playlistService.getPlaylistTracksPrevious(
        accessToken,
        playlist_id,
        previous
      );
      return playlist;
    } catch (error) {
      throw error;
    }
  }

  public async getUserTopItems(req: Request): Promise<SpotifyPlaylist> {
    try {
      const accessToken = req.headers.authorization;
      const type = req.query.type as string;
      if (!accessToken) {
        const error: CustomError = new Error("Parameter missing");
        error.status = 400;
        error.message = "Unauthorized, token or type not found";
        throw error;
      }
      const playlist = await this.playlistService.getUserTopItems(
        accessToken,
        type
      );
      return playlist;
    } catch (error) {
      throw error;
    }
  }

  public async getRecentlyPlayedSongs(req: Request): Promise<SpotifyPlaylist> {
    try {
      const accessToken = req.headers.authorization;
      const limit = req.query.limit as string;
      if (!accessToken) {
        const error: CustomError = new Error("Parameter missing");
        error.status = 400;
        error.message = "Unauthorized, token not found";
        throw error;
      }
      const playlist = await this.playlistService.getRecentlyPlayedSongs(
        accessToken,
        parseInt(limit)
      );
      return playlist;
    } catch (error) {
      throw error;
    }
  }
}
