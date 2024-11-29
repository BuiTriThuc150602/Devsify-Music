import { View, Text } from "react-native";
import React from "react";
import { PlaylistSearch } from "@/src/stores/types/SpotifySerach.type";
import { Image } from "react-native";

const SearchPlaylist = ({ playlists }: { playlists: PlaylistSearch }) => {
  return (
    <View className="m-3">
      <Text className="text-white text-xl font-bold">
        Danh sách phát
        <Text className="italic text-sm">  ( {playlists.total || 0} kết quả ) </Text>
      </Text>
      {playlists.items
        ?.filter((playlist) => playlist !== null)
        .map((playlist) => (
          <View
            key={playlist?.id}
            className="flex-row items-center gap-5 p-3 rounded-lg mt-3 overflow-x-hidden"
          >
            <Image
              source={{
                uri:
                  (playlist?.images && playlist?.images[0]?.url) ||
                  "https://images.pexels.com/photos/3944091/pexels-photo-3944091.jpeg?auto=compress&cs=tinysrgb&w=800",
              }}
              style={{ width: 80, height: 80, borderRadius: 4 }}
            />
            <View>
              <Text className="text-white text-xl font-semibold">
                {playlist?.name}
              </Text>
              <Text className="text-white mt-2">
                Tạo bởi: {playlist?.owner.display_name}
              </Text>
              <Text className="text-white mt-2">
                {playlist?.tracks.total} bài hát
              </Text>
            </View>
          </View>
        ))}

        <View className="h-32"/>
    </View>
  );
};

export default SearchPlaylist;
