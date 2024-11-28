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
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { currentTrackState, userSaveTrackSelector } from "../RecoilState";
import SongItem from "../components/SongItem";
import { SpotifyTrackItem, Track } from "../stores/types/SpotifyTrack.type";

const LikedSongsScreen = () => {
  const navigation = useNavigation();
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  const [searchedTracks, setSearchedTracks] = useState<Track[]>([]);
  const [input, setInput] = useState("");
  const savedTracks = useRecoilValueLoadable(userSaveTrackSelector);

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
    if (savedTracks.contents?.length > 0) {
      setCurrentTrack(savedTracks.contents[0]);
    }
  };
  return (
    <>
      <LinearGradient colors={["#614385", "#516395"]} style={{ flex: 1 }}>
        <ScrollView className="flex mt-12 p-3">
          <Pressable onPress={() => navigation.goBack()} className="flex ml-4">
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>

          <Pressable
            style={{
              marginHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 9,
            }}
          >
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                backgroundColor: "#42275a",
                padding: 9,
                flex: 1,
                borderRadius: 3,
                height: 38,
              }}
            >
              <AntDesign name="search1" size={20} color="white" />
              <TextInput
                value={input}
                onChangeText={(text) => handleInputChange(text)}
                placeholder="Find in Liked songs"
                placeholderTextColor={"white"}
                style={{ fontWeight: "500", color: "white" }}
              />
            </Pressable>

            <Pressable
              style={{
                marginHorizontal: 10,
                backgroundColor: "#42275a",
                padding: 10,
                borderRadius: 3,
                height: 38,
              }}
            >
              <Text style={{ color: "white" }}>Sort</Text>
            </Pressable>
          </Pressable>

          <View style={{ height: 50 }} />
          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
              Liked Songs
            </Text>
            <Text style={{ color: "white", fontSize: 13, marginTop: 5 }}>
              430 songs
            </Text>
          </View>

          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 10,
            }}
          >
            <Pressable
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: "#1DB954",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="arrowdown" size={20} color="white" />
            </Pressable>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <MaterialCommunityIcons
                name="cross-bolnisi"
                size={24}
                color="#1DB954"
              />
              <Pressable
                onPress={playTrack}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#1DB954",
                }}
              >
                <Entypo name="controller-play" size={24} color="white" />
              </Pressable>
            </View>
          </Pressable>

          {savedTracks.state === "loading" ? (
            <ActivityIndicator size="large" color="gray" />
          ) : (
            searchedTracks &&
            searchedTracks?.map((item: Track, index: number) => (
              <SongItem
                key={index}
                item={item}
                isPlaying={currentTrack?.id === item.id}
                onPress={(item: any) => setCurrentTrack(item)}
              />
            ))
          )}
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default LikedSongsScreen;
