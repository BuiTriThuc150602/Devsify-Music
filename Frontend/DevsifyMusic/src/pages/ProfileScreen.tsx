import { Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRecoilValueLoadable } from "recoil";
import { profileSelector, userPlaylistsSelector } from "../RecoilState";

const ProfileScreen = () => {
  const profile = useRecoilValueLoadable(profileSelector);
  const playlists = useRecoilValueLoadable(userPlaylistsSelector);
  return (
    <LinearGradient
      colors={["#764830", "#131624", "#121212", "#040404"]}
      className="flex-1"
    >
      <View className="px-6 py-20 h-2/6">
        <View className="flex-row items-center gap-5">
          <Image
            className="w-32 h-32 rounded-full object-cover"
            source={{ uri: profile.contents?.images[0]?.url }}
          />
          <View>
            <Text className="text-white text-3xl font-bold">
              {profile.contents?.display_name}
            </Text>
            <Text className="text-gray-400 text-lg font-semibold">
              {profile.contents?.email}
            </Text>
            <Text className="text-gray-400 text-lg font-semibold">
              {profile.contents?.followers.total} Người theo dõi
            </Text>
          </View>
        </View>
      </View>
      <Text className="text-white text-2xl font-bold px-6">Danh sách phát</Text>
      <ScrollView className="h-4/6 flex-1">
        <View className="p-6">
          {playlists.state === "loading" && (
            <View>
              <Text className="text-white text-lg font-semibold border border-white p-5 rounded-xl text-center">
                Đang tải danh sách phát...
              </Text>
            </View>
          )}
          {playlists.state === "hasError" && (
            <View>
              <Text className="text-red-500 text-lg font-semibold border border-red-500 p-5 rounded-xl text-center">
                Đã xảy ra lỗi khi tải danh sách phát
              </Text>
            </View>
          )}
          {playlists.state === "hasValue" &&
            playlists.contents?.items?.map((item, index) => {
              return (
                <View
                  key={item.id}
                  className="flex-row items-center gap-5 p-5 border-b border-gray-700"
                >
                  <Image
                    source={{
                      uri:
                        (item.images && item?.images[1]?.url) ||
                        "https://images.pexels.com/photos/3944091/pexels-photo-3944091.jpeg?auto=compress&cs=tinysrgb&w=800",
                    }}
                    style={{ width: 80, height: 80, borderRadius: 4 }}
                  />
                  <View>
                    <Text className="text-white text-xl font-semibold">
                      {item?.name}
                    </Text>
                    <Text className="text-white mt-2">
                      Tạo bởi: {item?.owner.display_name}
                    </Text>
                    <Text className="text-white mt-2">
                      {item?.tracks.total} bài hát
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ProfileScreen;
