import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

interface Track {
  name: string;
  album: {
    images: { url: string }[];
  };
}

interface RecentlyPlayedCardProps {
  item: {
    track: Track;
  };
}

const RecentlyPlayedCard: React.FC<RecentlyPlayedCardProps> = ({ item }) => {
  const navigation = useNavigation();
  return (
    <Pressable style={{ margin: 10 }}>
      <Image
        style={{ width: 130, height: 130, borderRadius: 5 }}
        source={{ uri: item.track.album.images[0].url }}
      />
      <Text
        numberOfLines={1}
        style={{
          fontSize: 13,
          fontWeight: "500",
          color: "white",
          marginTop: 10,
        }}
      >
        {item?.track?.name}
      </Text>
    </Pressable>
  );
};

export default RecentlyPlayedCard;

const styles = StyleSheet.create({});
