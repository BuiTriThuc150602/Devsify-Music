import { View, Text, FlatList, ImageBackground, Pressable } from "react-native";
import React from "react";

const Recently = () => {
  const data = [
    {
      id: 1,
      title: "Đi Theo Hướng Mặt Trời",
      image:
        "https://i.ytimg.com/vi/XszJkmsrccI/maxresdefault.jpg",
      description: "Đen - Đi theo bóng mặt trời ft Giang Nguyễn, Món quà tự tặng mình nhân ngày sinh nhật",
    },
  ];
  return (
    <View className="my-5">
      <Text className="text-white text-3xl font-bold my-3">
        Mới nghe gần đây
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <Pressable className="flex relative w-40 h-50 mr-5 rounded-lg">
            <ImageBackground source={{ uri: item.image }} className="w-40 h-40">
              <Text className="text-white absolute bottom-1 left-2 text-2xl font-bold leading-10 w-[70%]">
                {item.title}
              </Text>
            </ImageBackground>
            <Text className="text-gray-400 py-2">{item.description}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default Recently;
