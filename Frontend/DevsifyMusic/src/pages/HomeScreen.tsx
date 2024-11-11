import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import GettingStarted from "../components/Home/GettingStarted";
import Recently from "../components/Home/Recently";
import Recomment from "../components/Home/Recomment";
import YourArtist from "../components/Home/YourArtist";
import AnotherWay from "../components/Home/AnotherWay";
import { useNavigation } from "@react-navigation/native";
import { profileSelector } from "../RecoilState";
import { useRecoilValueLoadable } from "recoil";

const HomeScreen = () => {
  const [caterogy, setCategory] = useState("all");
  const navigation = useNavigation();
  const profile = useRecoilValueLoadable(profileSelector);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        shadowColor: "transparent",
        height: 100,
      },
      headerLeft: () => (
        <Pressable className="border rounded-full ml-1 my-5 border-gray-400">
          {profile.state === "hasValue" && profile.contents && (
            <Image
              source={{ uri: profile.contents.images[0].url }}
              className="w-12 h-12 rounded-full"
            />
          )}
          {profile.state === "hasError" && (
            <Image
              source={require("../../assets/icon.png")}
              className="w-10 h-10 rounded-full"
            />
          )}
          {profile.state === "loading" && (
            <ActivityIndicator size="small" color="#00ff00" />
          )}
        </Pressable>
      ),
      headerTitle: () => (
        <View>
          {profile.state === "hasValue" && profile.contents && (
            <View>
              <Text className="text-white text-lg font-bold">Xin chào,</Text>
              <Text className="text-white text-xl font-bold">
                {profile.contents.display_name}
              </Text>
              <Text className="text-gray-500 text-xs">
                {profile.contents.followers.total} Followers
              </Text>
            </View>
          )}
          {profile.state === "hasError" && (
            <Text className="text-white text-xl font-bold">Devsify Music</Text>
          )}
          {profile.state === "loading" && (
            <View className="flex-row items-center gap-5">
              <Text className="text-white text-xl font-bold">Loading...</Text>
            </View>
          )}
        </View>
      ),
    });
  }, [navigation, caterogy, profile]);

  const handleCategory = (category: string) => {
    setCategory(category);
  };

  return (
    <ScrollView className="flex bg-black h-screen">
      <View className="flex flex-row w-full items-center">
        <Pressable
          className={`rounded-full my-5 border-gray-400 w-[70px] h-8 justify-center items-center ${
            caterogy === "all" ? "bg-green-600 text-gray-950" : "bg-gray-800"
          }  `}
          onPress={() => handleCategory("all")}
        >
          <Text
            className={`${
              caterogy === "all" ? " text-gray-950" : "text-white"
            }`}
          >
            Tất cả
          </Text>
        </Pressable>
        <Pressable
          className={`rounded-full ml-5 my-5 border-gray-400 w-[70px] h-8 justify-center items-center ${
            caterogy === "music" ? "bg-green-600 text-gray-950" : "bg-gray-800"
          }`}
          onPress={() => handleCategory("music")}
        >
          <Text
            className={`${
              caterogy === "music" ? "text-gray-950" : "text-white"
            }`}
          >
            Nhạc
          </Text>
        </Pressable>
        <Pressable
          className={`rounded-full ml-5 my-5 border-gray-400 w-[70px] h-8 justify-center items-center ${
            caterogy === "postcards"
              ? "bg-green-600 text-gray-950"
              : "bg-gray-800"
          }`}
          onPress={() => handleCategory("postcards")}
        >
          <Text
            className={`${
              caterogy === "postcards" ? " text-gray-950" : "text-white"
            }`}
          >
            Postcards
          </Text>
        </Pressable>
      </View>
      <GettingStarted />
      <AnotherWay />
      <Recently />
      <Recomment />
      <YourArtist />
    </ScrollView>
  );
};

export default HomeScreen;
