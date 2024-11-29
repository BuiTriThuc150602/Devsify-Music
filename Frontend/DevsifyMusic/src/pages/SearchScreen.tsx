import { View, ScrollView, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSetRecoilState } from "recoil";
import { debounce } from "lodash";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import SearchResult from "../components/SearchResult";
import { searchValue } from "../RecoilState/Search";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState("");
  const setSearchValue = useSetRecoilState(searchValue);

  const handleSearch = (text: string) => {
    setSearchValue(text);
  };
  const debouncedSearch = debounce(handleSearch, 800);

  const handleInputChange = (text: string) => {
    setInput(text);
    debouncedSearch(text);
  };
  return (
    <>
      <LinearGradient colors={["#614385", "#516395"]} style={{ flex: 1 }}>
        <ScrollView className="flex mt-12 p-3">
          <Pressable onPress={() => navigation.goBack()} className="flex mb-5">
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>

          <View className="flex-row items-center rounded-lg h-12 bg-[#42275a] py-1 px-3">
            <AntDesign name="search1" size={20} color="white" />
            <TextInput
              value={input}
              onChangeText={(text) => handleInputChange(text)}
              placeholder="Search"
              placeholderTextColor="white"
              className="text-white h-full ml-5 items-center w-full"
            />
          </View>

          <View style={{ height: 50 }} />
          <SearchResult />
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default SearchScreen;
