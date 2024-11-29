import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import ArtistCard from "./ArtistCard";
import { useRecoilValueLoadable } from "recoil";
import { getUserTopItems } from "@/src/RecoilState";
import { SpotifyArtist } from "@/src/stores/types/SpotifyUser.type";

const YourArtist = () => {
  const topArtists = useRecoilValueLoadable(getUserTopItems("artists"));
  return (
    <View>
      <Text className="text-white text-3xl font-bold my-3">
        Top nghệ sĩ yêu thích
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {topArtists.state === "hasValue" &&
          (topArtists.contents as SpotifyArtist[])?.map(
            (item: SpotifyArtist, index : any) => <ArtistCard item={item} key={index} />
          )}
      </ScrollView>
    </View>
  );
};

export default YourArtist;
