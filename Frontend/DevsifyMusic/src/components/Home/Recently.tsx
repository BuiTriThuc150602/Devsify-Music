import {
  View,
  Text,
  FlatList,
  ImageBackground,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import {
  currentListTrackState,
  currentTrackState,
  isPlayingState,
  recentlyPlayedSongsSelector,
} from "@/src/RecoilState";
import { SpotifyTrackItem } from "@/src/stores/types/SpotifyTrack.type";
import { Image } from "react-native";

const Recently = () => {
  const recentlyplayed = useRecoilValueLoadable(
    recentlyPlayedSongsSelector(20)
  );
  const setCurrentTrack = useSetRecoilState(currentTrackState);
  const setIsPlaying = useSetRecoilState(isPlayingState);
  const setCurrentListTracks = useSetRecoilState(currentListTrackState);

  const habdlePress = (item: SpotifyTrackItem) => {
    setCurrentListTracks(recentlyplayed.contents?.items);
    setCurrentTrack(item.track);
    setIsPlaying(true);
  };
  return (
    <View className="my-5">
      <Text className="text-white text-3xl font-bold my-3">
        Mới nghe gần đây
      </Text>
      {recentlyplayed.state === "loading" ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recentlyplayed.state === "hasValue" &&
            recentlyplayed.contents?.items.map(
              (item: SpotifyTrackItem, index: any) => (
                <Pressable
                  onPress={() => habdlePress(item)}
                  key={index}
                  className="flex w-40 h-50 rounded-lg"
                >
                  <Image
                    source={{ uri: item.track.album.images[0].url }}
                    className="w-36 h-36 rounded-lg"
                  />
                  <Text className="text-white text-xl font-bold leading-10">
                    {item.track.name}
                  </Text>
                  <Text className="text-gray-400 py-2">
                    {item.track.artists[0].name}
                  </Text>
                </Pressable>
              )
            )}
        </ScrollView>
      )}
    </View>
  );
};

export default Recently;
