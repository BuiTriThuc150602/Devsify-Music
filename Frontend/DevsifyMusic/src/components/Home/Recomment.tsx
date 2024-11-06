import { View, Text, FlatList, Pressable, ImageBackground } from "react-native";
import React from "react";

const Recomment = () => {
    const data = [
        {
          id: 1,
          title: "Em Thích",
          image:
            "https://i.ytimg.com/vi/WDA7OIXXW1U/maxresdefault.jpg",
          description: "Anh chẳng muốn công chúa của anh ướt mi, EM THÍCH - SEAN X LỬA",
        },
        {
          id: 2,
          title: "Đi Theo Hướng Mặt Trời",
          image:
            "https://i.ytimg.com/vi/XszJkmsrccI/maxresdefault.jpg",
          description: "Đen - Đi theo bóng mặt trời ft Giang Nguyễn, Món quà tự tặng mình nhân ngày sinh nhật",
        },
        {
          id: 3,
          title: "Thời Gian Sẽ Trả Lời",
          image:
            "https://avatar-ex-swe.nixcdn.com/song/2023/02/15/7/7/6/c/1676455209236_640.jpg",
          description: "Thời Gian Sẽ Trả Lời - JustaTee, Tiên Cookie, BigDaddy - tải mp3",
        },
      ];
  return (
    <View className="my-5">
      <Text className="text-white text-3xl font-bold my-3">
        Đề xuất cho hôm nay
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

export default Recomment;
