import { View, Text, Image, FlatList, ImageBackground, Pressable } from "react-native";
import React from "react";

const GettingStarted = () => {
  const data = [
    {
      id: 1,
      title: "Tuyển tập Phan Mạnh Quỳnh",
      image:
        "https://vcdn1-giaitri.vnecdn.net/2020/03/01/phanmanhquynh-1583003838-8319-1583006179.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=UZbSDZGKO62-xYejcoFvVg",
      description: "Phan Mạnh Quỳnh cùng những ca khúc hay nhất",
    },
    {
      id: 2,
      title: "Tuyển tập Hùng Quân",
      image: "https://i.scdn.co/image/ab6761610000e5eb25e45d406464cd9c46ed3034",
      description: "Hùng Quân cùng những ca khúc hay nhất",
    },
    {
      id: 3,
      title: "Mr. Siro",
      image:
        "https://2sao.vietnamnetjsc.vn/images/2018/07/16/10/51/mr-siro-3.jpg",
      description: "Mr. Siro cùng những ca khúc hay nhất",
    },
    {
      id: 4,
      title: "Tuyển tập Bích Phương",
      image:
        "https://vcdn1-giaitri.vnecdn.net/2020/03/01/phanmanhquynh-1583003838-8319-1583006179.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=UZbSDZGKO62-xYejcoFvVg",
      description: "Bích Phương cùng những ca khúc hay nhất",
    },
    {
      id: 5,
      title: "Tuyển tập Hương Tràm",
      image: "https://i.scdn.co/image/ab6761610000e5eb25e45d406464cd9c46ed3034",
      description: "Hương Tràm cùng những ca khúc hay nhất",
    },
    {
      id: 6,
      title: "Sơn Tùng M-TP",
      image:
        "https://2sao.vietnamnetjsc.vn/images/2018/07/16/10/51/mr-siro-3.jpg",
      description: "Sơn Tùng M-TP cùng những ca khúc hay nhất",
    },
  ];

  return (
    <View className="my-5">
      <Text className="text-white text-3xl font-bold my-3">
        Getting Started
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <Pressable className="flex relative w-40 h-50 mr-5 rounded-lg">
            <ImageBackground
              source={{ uri: item.image }}
              className="w-40 h-40"
            >
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

export default GettingStarted;
