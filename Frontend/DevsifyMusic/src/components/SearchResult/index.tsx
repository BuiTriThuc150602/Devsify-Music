import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import SearchTrack from "./SearchTrack";
import SearchArtist from "./SearchArtist";
import SearchPlaylist from "./SearchPlaylist";
import { useRecoilValueLoadable } from "recoil";
import { searchResultSelector } from "@/src/RecoilState/Search";

const SearchResult = () => {
  const searchResult = useRecoilValueLoadable(searchResultSelector);
  return (
    <View className="">
      <Text className="text-white text-3xl font-bold">
        Top kết quả tìm kiếm
      </Text>
      {searchResult.state === "hasValue" && searchResult.contents && (
        <>
          <SearchTrack tracks={searchResult.contents.tracks} />
          <SearchArtist artists={searchResult.contents.artists} />
          <SearchPlaylist playlists={searchResult.contents.playlists} />
        </>
      )}

      {searchResult.state === "loading" && (
        <ActivityIndicator size="large" color="#00ff00" />
      )}
      {searchResult.state === "hasError" && (
        <Text
          className="text-white text-xl font-bold"
          style={{ textAlign: "center" }}
        >
          Không thể tìm thấy kết quả
        </Text>
      )}
    </View>
  );
};

export default SearchResult;
