import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { TrackSearch } from "@/src/stores/types/SpotifySerach.type";
import {
  currentListTrackState,
  currentTrackState,
  isPlayingState,
} from "@/src/RecoilState";
import { useSetRecoilState } from "recoil";

const SearchTrack = ({ tracks }: { tracks: TrackSearch }) => {
  const setCurrentTrack = useSetRecoilState(currentTrackState);
  const setIsPlaying = useSetRecoilState(isPlayingState);
  const setCurrentListTracks = useSetRecoilState(currentListTrackState);
  return (
    <View className="m-3">
      <Text className="text-white text-xl font-bold">
        Bài hát
        <Text className="italic text-sm">   ( {tracks.total || 0} kết quả ) </Text>
      </Text>
      <View>
        {tracks.items?.map((track, index) => (
          <Pressable
            onPress={() => {
              if (tracks.items) {
                setCurrentTrack(track);
                setIsPlaying(true);
                setCurrentListTracks(
                  tracks.items.map((track) => ({
                    added_at: track.album.release_date,
                    track: track,
                  }))
                );
              }
            }}
            key={index}
            className="p-2 rounded-lg flex flex-row w-[48%]"
          >
            <Image
              className="w-16 h-16 rounded-lg"
              source={{ uri: track.album.images[0].url }}
            />
            <View className="mt-2 ml-3">
              <Text className="text-white font-bold mb-2">{track?.name}</Text>
              <Text className="text-gray-400">{track.artists[0].name}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default SearchTrack;
