import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { SpotifyArtist } from "@/src/stores/types/SpotifyUser.type";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/stores/types/RootStackParamList";
import { useSetRecoilState } from "recoil";
import { selectedArtistState } from "@/src/RecoilState/ArtistState";

const ArtistCard = ({ item }: { item: SpotifyArtist }) => {
  const naivgation = useNavigation<NavigationProp<RootStackParamList>>();
  const setArtistSeleted = useSetRecoilState(selectedArtistState);
  return (
    <Pressable
      onPress={() => {
        naivgation.navigate("Artist");
        setArtistSeleted(item);
      }}
      className="m-2"
    >
      <Image
        className="w-36 h-36 rounded-lg"
        source={{ uri: item.images[0].url }}
      />
      <Text className="text-white font-bold text-center mt-2">
        {item?.name}
      </Text>
    </Pressable>
  );
};

export default ArtistCard;
