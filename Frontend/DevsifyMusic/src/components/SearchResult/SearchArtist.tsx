import { Image, Pressable, Text, View } from "react-native";
import React from "react";
import { ArtistSearch } from "@/src/stores/types/SpotifySerach.type";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/stores/types/RootStackParamList";
import { selectedArtistState } from "@/src/RecoilState/ArtistState";
import { useSetRecoilState } from "recoil";

const SearchArtist = ({ artists }: { artists: ArtistSearch }) => {
  const naivgation = useNavigation<NavigationProp<RootStackParamList>>();
  const setArtistSeleted = useSetRecoilState(selectedArtistState);
  return (
    <View className="m-3">
      <Text className="text-white text-xl font-bold">
        Nhạc sĩ
        <Text className="italic text-sm">
          {" "}
          ( {artists.total || 0} kết quả ){" "}
        </Text>
      </Text>
      {artists.items
        ?.filter((artist) => artist.images.length > 0)
        .map((artist, index) => (
          <Pressable
            onPress={() => {
              naivgation.navigate("Artist");
              setArtistSeleted(artist);
            }}
            key={index}
            className="p-2 rounded-lg flex flex-row w-[48%]"
          >
            <Image
              className="w-16 h-16 rounded-lg"
              source={{ uri: artist.images[0]?.url }}
            />
            <View className="mt-2 ml-3">
              <Text className="text-white font-bold mb-2">
                {artist?.name || "Unknown"}
              </Text>
              <Text className="text-gray-400">
                {artist.genres.join(", ") || "Unknown"}
              </Text>
            </View>
          </Pressable>
        ))}
    </View>
  );
};

export default SearchArtist;
