import { View, Text, FlatList, ImageBackground, Pressable } from "react-native";
import React from "react";

const AnotherWay = () => {
  const data = [
    {
      id: 1,
      title: "Nhạc tháng 9",
      image:
        "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/12/4/photo-1638558309945-163855831935293298717.jpg",
      description: "Những ca khúc mới nhất tháng 9",
    },
    {
      id: 2,
      title: "Thiên hạ nghe gì hôm nay",
      image: "https://thanhnien.mediacdn.vn/Uploaded/nguyenvan/2022_12_19/untitled-3929.png",
      description: "Những ca khúc hot nhất hiện nay",
    },
    {
      id: 3,
      title: "Mr. Siro",
      image:
        "https://2sao.vietnamnetjsc.vn/images/2018/07/16/10/51/mr-siro-3.jpg",
      description: "Mr. Siro cùng những ca khúc hay nhất",
    },
    {
      id: 5,
      title: "Tuyển tập Hương Tràm",
      image: "https://nld.mediacdn.vn/291774122806476800/2024/5/1/huong-tram-1-171452552224485130766.jpg",
      description: "Hương Tràm cùng những ca khúc hay nhất",
    },
  ];

  return (
    <View className="my-5">
      <Text className="text-white text-3xl font-bold my-3">
        Hãy thử nghe điều khác biệt
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

export default AnotherWay;
