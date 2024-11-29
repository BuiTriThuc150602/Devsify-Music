import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import { debounce } from "lodash";
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import {
  currentListTrackState,
  currentTrackState,
  isPlayingState,
  userSaveTrackSelector,
} from "../RecoilState";
import SongItem from "../components/SongItem";
import { SpotifyTrackItem, Track } from "../stores/types/SpotifyTrack.type";

const LikedSongsScreen = () => {
  const navigation = useNavigation();
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  const [searchedTracks, setSearchedTracks] = useState<Track[]>([]);
  const [input, setInput] = useState("");
  const savedTracks = useRecoilValueLoadable(userSaveTrackSelector);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const setCurrentListTracks = useSetRecoilState(currentListTrackState);

  useEffect(() => {
    if (savedTracks.state === "hasValue") {
      if (savedTracks.contents) {
        setSearchedTracks(
          savedTracks.contents.items?.map(
            (item: SpotifyTrackItem) => item.track
          )
        );
      }
    }
  }, [savedTracks]);

  const debouncedSearch = debounce(handleSearch, 800);
  function handleSearch(text: string) {
    if (savedTracks.state === "hasValue") {
      const filteredTracks = savedTracks.contents?.items?.filter(
        (item: SpotifyTrackItem) =>
          item.track.name.toLowerCase().includes(text.toLowerCase())
      );
      if (filteredTracks) {
        setSearchedTracks(
          filteredTracks.map((item: SpotifyTrackItem) => item.track)
        );
      }
    }
  }
  const handleInputChange = (text: string) => {
    setInput(text);
    debouncedSearch(text);
  };

  const playTrack = async () => {
    if (
      savedTracks.state === "hasValue" &&
      savedTracks?.contents?.items &&
      savedTracks.contents.items.length > 0
    ) {
      setCurrentTrack(savedTracks.contents.items[0].track);
      setCurrentListTracks(savedTracks.contents.items);
    }
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
              className="text-white h-full ml-5 items-center"
            />
          </View>

          <View style={{ height: 50 }} />
          <View className="mx-3">
            <Text className="text-white text-3xl font-bold">
              Bài hát yêu thích
            </Text>
            <Text className="text-white mt-2">
              {savedTracks.contents?.total} bài hát
            </Text>
          </View>

          <Pressable className="flex-row justify-between items-center mx-3">
            <Pressable className="w-10 h-10 rounded-full bg-[#1DB954] flex items-center justify-center">
              <AntDesign name="arrowdown" size={20} color="white" />
            </Pressable>

            <View className="flex-row items-center gap-3">
              <MaterialCommunityIcons
                name="cross-bolnisi"
                size={24}
                color="#1DB954"
              />
              <Pressable
                onPress={() => {
                  setIsPlaying(!isPlaying);
                  playTrack();
                }}
                className="flex items-center justify-center bg-[#1DB954] w-16 h-16 rounded-full"
              >
                {isPlaying ? (
                  <Entypo name="controller-paus" size={24} color="white" />
                ) : (
                  <Entypo name="controller-play" size={24} color="white" />
                )}
              </Pressable>
            </View>
          </Pressable>

          {savedTracks.state === "loading" ? (
            <ActivityIndicator size="large" color="gray" />
          ) : (
            <View>
              {searchedTracks &&
                searchedTracks?.map((item: Track, index: number) => (
                  <SongItem
                    key={index}
                    item={item}
                    isPlaying={currentTrack?.id === item.id}
                    onPress={(item: Track) => {
                      setCurrentTrack(item);
                      setCurrentListTracks(savedTracks.contents?.items);
                    }}
                  />
                ))}
              <View className="h-24" />
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default LikedSongsScreen;
