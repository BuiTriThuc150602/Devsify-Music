import {
  Image,
  Pressable,
  SafeAreaView,
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

const HomeScreen = () => {
  const [caterogy, setCategory] = useState("all");
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        shadowColor: "transparent",
        height: 100,
      },
      headerLeft: () => (
        <Pressable className="border rounded-full ml-1 my-5 border-gray-400 p-1">
          <Image
            source={require("../../assets/icon.png")}
            className="w-8 h-8"
          />
        </Pressable>
      ),
      headerTitle: () => (
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
              caterogy === "music"
                ? "bg-green-600 text-gray-950"
                : "bg-gray-800"
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
      ),
    });
  }, [navigation, caterogy]);

  const handleCategory = (category: string) => {
    setCategory(category);
  };

  return (
    <ScrollView className="flex bg-black h-screen">
      <GettingStarted />
      <AnotherWay />
      <Recently />
      <Recomment />
      <YourArtist />
    </ScrollView>
  );
};

export default HomeScreen;
