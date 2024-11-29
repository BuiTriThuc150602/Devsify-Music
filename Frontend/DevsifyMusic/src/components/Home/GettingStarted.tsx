import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import {
  currentListTrackState,
  currentTrackState,
  isPlayingState,
  recentlyPlayedSongsSelector,
} from "@/src/RecoilState";
import { SpotifyTrackItem } from "@/src/stores/types/SpotifyTrack.type";

const GettingStarted = () => {
  const recentlyplayed = useRecoilValueLoadable(recentlyPlayedSongsSelector(6));
  const setCurrentTrack = useSetRecoilState(currentTrackState);
  const setIsPlaying = useSetRecoilState(isPlayingState);
  const setCurrentListTracks = useSetRecoilState(currentListTrackState);

  return (
    <View className="my-5">
      <Text className="text-white text-3xl font-bold my-3">
        Bắt đầu ngày mới với âm nhạc
      </Text>

      {recentlyplayed.state === "loading" ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <View className="flex flex-row flex-wrap justify-between">
          {recentlyplayed.state === "hasValue" &&
            recentlyplayed.contents?.items.map(
              (item: SpotifyTrackItem, index: any) => (
                <Pressable
                  onPress={() => {
                    if (recentlyplayed.contents?.items) {
                      setCurrentTrack(item.track);
                      setIsPlaying(true);
                      setCurrentListTracks(recentlyplayed.contents.items);
                    }
                  }}
                  key={index}
                  className="p-2 rounded-lg flex flex-row w-[48%]"
                >
                  <Image
                    className="w-16 h-16 rounded-lg"
                    source={{ uri: item.track.album.images[0].url }}
                  />
                  <View className="mt-2 ml-3">
                    <Text className="text-white font-bold mb-2">
                      {item?.track?.name}
                    </Text>
                    <Text className="text-gray-400">
                      {item.track.artists[0].name}
                    </Text>
                  </View>
                </Pressable>
              )
            )}
        </View>
      )}
    </View>
  );
};

export default GettingStarted;
