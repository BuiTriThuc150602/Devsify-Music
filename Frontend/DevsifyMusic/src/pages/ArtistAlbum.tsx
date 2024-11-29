import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import {
  artistTopTracksSelector,
  selectedArtistState,
} from "../RecoilState/ArtistState";
import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Track } from "../stores/types/SpotifyTrack.type";
import {
  currentListTrackState,
  currentTrackState,
  isPlayingState,
} from "../RecoilState";
import SongItem from "../components/SongItem";

export const ArtistAlbum = () => {
  const navigation = useNavigation();
  const artist = useRecoilValue(selectedArtistState);
  const artistTopTracks = useRecoilValueLoadable(artistTopTracksSelector);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const setCurrentListTracks = useSetRecoilState(currentListTrackState);
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  const playTrack = async () => {
    if (
      artistTopTracks.state === "hasValue" &&
      artistTopTracks?.contents &&
      artistTopTracks.contents.length > 0
    ) {
      setCurrentTrack(artistTopTracks.contents[0]);
      setCurrentListTracks(
        artistTopTracks.contents?.map((track: Track) => ({
          added_at: track.album.release_date,
          track: track,
        }))
      );
    }
  };

  return (
    <>
      <LinearGradient colors={["#614385", "#516395"]} style={{ flex: 1 }}>
        <ScrollView className="flex mt-12 p-3">
          <Pressable onPress={() => navigation.goBack()} className="flex ml-4">
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>

          <View className="my-5 flex flex-col justify-center items-center">
            <Image
              source={{ uri: artist?.images[0]?.url }}
              style={{ width: 200, height: 200, borderRadius: 10 }}
            />
            <Text className="text-white mt-2 text-2xl font-semibold">
              {artist?.name || "Unknown Artist"}
            </Text>
            <Text className="text-gray-200 mt-2">
              {artist?.followers.total} Followers
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

          {artistTopTracks.state === "loading" ? (
            <ActivityIndicator size="large" color="gray" />
          ) : (
            <View>
              {artistTopTracks.state === "hasValue" &&
                artistTopTracks.contents &&
                artistTopTracks.contents?.map((item: Track, index: number) => (
                  <SongItem
                    key={index}
                    item={item}
                    isPlaying={currentTrack?.id === item.id}
                    onPress={(item: Track) => {
                      setCurrentTrack(item);
                      setCurrentListTracks(
                        artistTopTracks.contents &&
                          artistTopTracks.contents.map((track: Track) => ({
                            added_at: track.album.release_date,
                            track: track,
                          }))
                      );
                    }}
                  />
                ))}
              <View className="h-20" />
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </>
  );
};
