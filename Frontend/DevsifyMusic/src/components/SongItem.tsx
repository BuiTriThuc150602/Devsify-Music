import { Text, View, Pressable, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useSetRecoilState } from "recoil";
import { currentTrackState, isPlayingState } from "../RecoilState";
import { Track } from "../stores/types/SpotifyTrack.type";

const SongItem = ({
  item,
  onPress,
  isPlaying,
}: {
  item: Track;
  onPress: (item: any) => void;
  isPlaying: boolean;
}) => {
  const setCurrentTrack = useSetRecoilState(currentTrackState);
  const setIsPlaying = useSetRecoilState(isPlayingState);
  const handlePress = () => {
    setCurrentTrack(item);
    setIsPlaying(true);
    onPress(item);
  };
  return (
    <Pressable
      onPress={handlePress}
      style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
      className="flex-row items-center p-3"
    >
      <Image
        style={{ width: 50, height: 50, marginRight: 10 }}
        source={{ uri: item?.album?.images[0].url }}
      />

      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={1}
          style={
            isPlaying
              ? {
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "#3FFF00",
                }
              : { fontWeight: "bold", fontSize: 14, color: "white" }
          }
        >
          {item?.name}
        </Text>
        <Text style={{ marginTop: 4, color: "#989898" }}>
          {item?.artists[0].name}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 7,
          marginHorizontal: 10,
        }}
      >
        <AntDesign name="heart" size={24} color="#1DB954" />
        <Entypo name="dots-three-vertical" size={24} color="#C0C0C0" />
      </View>
    </Pressable>
  );
};

export default SongItem;
