import { Text, View, SafeAreaView, Pressable, Image } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import banner from "../../assets/splash.png";
import { useAuthContext } from "../contexts/AuthContext";
import { useRecoilValue } from "recoil";
import { authenticationState } from "../RecoilState";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const { promptAsync } = useAuthContext();
  const navigation = useNavigation();
  const authentication = useRecoilValue(authenticationState);

  useEffect(() => {
    console.log("LoginScreen", authentication);

    if (authentication && authentication.accessToken) {
      navigation.navigate("Main");
    } else {
      navigation.navigate("Login");
    }
  }, [authentication]);

  return (
    <LinearGradient colors={["#040306", "#131624"]} className="flex-1">
      <SafeAreaView>
        <View className="h-1/2 justify-end">
          <Image
            source={banner}
            className="w-full h-1/2"
            resizeMode="contain"
          />
        </View>
        <View className="h-1/2 justify-around">
          <View className="space-y-3">
            <Entypo
              style={{ textAlign: "center" }}
              name="spotify"
              size={80}
              color="white"
            />
            <Text className="text-white text-5xl font-bold text-center mt-16">
              Millions of Songs Free on Devsify!
            </Text>
          </View>
          <Pressable
            onPress={() => promptAsync()}
            className="bg-green-500 rounded-full p-4 m-4"
          >
            <Text className="text-white text-xl font-semibold text-center">
              Sign In with spotify
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;
