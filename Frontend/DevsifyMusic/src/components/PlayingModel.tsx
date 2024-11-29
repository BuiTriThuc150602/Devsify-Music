import { Image, Pressable, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import {
  currentListTrackState,
  currentSoundState,
  currentTrackState,
  isPlayingState,
  userSaveTrackSelector,
} from "../RecoilState";
import { BottomModal, ModalContent } from "react-native-modals";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { Audio, AVPlaybackStatus } from "expo-av";
import { Track } from "../stores/types/SpotifyTrack.type";
import { TrackAPI } from "../api/Track.service";
import { useNavigation } from "@react-navigation/native";

const PlayingModel = () => {
  const navigation = useNavigation();
  const [isShow, setIsShow] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#0A2647");
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  const [modalVisible, setModalVisible] = useState(false);
  const value = useRef(0);
  const [currentSound, setCurrentSound] = useRecoilState(currentSoundState);
  const [progress, setProgress] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const currentListTracks = useRecoilValue(currentListTrackState);

  const colors = [
    "#27374D",
    "#1D267D",
    "#BE5A83",
    "#212A3E",
    "#917FB3",
    "#37306B",
    "#443C68",
    "#5B8FB9",
    "#144272",
    "#1F4068",
  ];

  useEffect(() => {
    console.log((navigation as any).getCurrentRoute().name);
    
    if ((navigation as any).getCurrentRoute().name === "Artist"
      || (navigation as any).getCurrentRoute().name === "Tìm Kiếm"
  ) {
      setIsShow(false);
    } else {
      setIsShow(true);
    }
  }, [navigation.getState()]);

  useEffect(() => {
    if (isPlaying) playTrack();
    const indexCurrentTrack = currentListTracks?.findIndex(
      (item) => item.track.id === currentTrack?.id
    );
    value.current = indexCurrentTrack || 0;
  }, [currentTrack]);

  const playTrack = async () => {
    if (currentListTracks && currentListTracks.length > 0 && !currentTrack) {
      setCurrentTrack(currentListTracks[0].track);
    }
    currentTrack && (await play(currentTrack));
  };

  const play = async (nextTrack: Track) => {
    let preview_url = nextTrack?.preview_url;
    if (!preview_url) {
      const trackService = new TrackAPI();
      preview_url = await trackService.getAudioRepalce(nextTrack?.name);
    }
    try {
      if (currentSound) {
        await currentSound.stopAsync();
      }
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });
      if (!preview_url) {
        playNextTrack();
        return;
      }
      const { sound, status } = await Audio.Sound.createAsync(
        {
          uri: preview_url,
        },
        {
          shouldPlay: true,
          isLooping: false,
        },
        onPlaybackStatusUpdate
      );
      onPlaybackStatusUpdate(status);
      setCurrentSound(sound);
      setIsPlaying(status.isLoaded);
      await sound.playAsync();
    } catch (err: any) {
      console.log(err.message);
    }
  };
  const onPlaybackStatusUpdate = async (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      if (status.isPlaying) {
        const progress = status.positionMillis / (status.durationMillis || 1);
        setProgress(progress);
        setCurrentTime(status.positionMillis);
        setTotalDuration(status.durationMillis || 0);
      }

      if (status.didJustFinish) {
        setCurrentSound(null);
        playNextTrack();
      }
    }
  };

  const circleSize = 12;
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handlePlayPause = async () => {
    if (currentSound) {
      if (isPlaying) {
        await currentSound.pauseAsync();
      } else {
        await currentSound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const extractColors = async () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    setBackgroundColor(randomColor);
  };

  const playNextTrack = async () => {
    if (currentSound) {
      await currentSound.stopAsync();
      setCurrentSound(null);
    }
    value.current += 1;
    if (currentListTracks && value.current < currentListTracks.length) {
      const nextTrack = currentListTracks[value.current].track;
      setCurrentTrack(nextTrack);
      extractColors();
    } else {
      console.log("end of playlist");
      value.current = 0;
      setCurrentTrack(currentListTracks ? currentListTracks[0].track : null);
    }
  };

  const playPreviousTrack = async () => {
    if (currentSound) {
      await currentSound.stopAsync();
      setCurrentSound(null);
    }
    value.current -= 1;
    if (currentListTracks && value.current < currentListTracks.length) {
      const nextTrack = currentListTracks[value.current].track;
      setCurrentTrack(nextTrack);
      extractColors();
    } else {
      console.log("end of playlist");
      value.current = 0;
      setCurrentTrack(currentListTracks ? currentListTracks[0].track : null);
    }
  };

  return (
    <View>
      {currentTrack && (
        <Pressable
          onPress={() => setModalVisible(!modalVisible)}
          style={{
            backgroundColor: backgroundColor,
          }}
          className={`flex-row ${
            isShow ? "w-[96%] left-2" : "right-2"
          } p-3 rounded-md absolute bottom-16 items-center justify-between gap-3`}
        >
          <View className="flex-row gap-5 items-center">
            <Image
              className="w-12 h-12 rounded-md"
              source={{ uri: currentTrack?.album?.images[0].url }}
            />
            {isShow && (
              <Text numberOfLines={1} className="text-white font-bold w-56">
                {currentTrack?.name} • {currentTrack?.artists[0].name}
              </Text>
            )}
          </View>

          <View className="flex-row gap-5 items-center">
            <Text className="text-white">
              {formatTime(currentTime)} / {formatTime(totalDuration)}
            </Text>
            <Pressable onPress={handlePlayPause}>
              {isPlaying ? (
                <AntDesign name="pausecircle" size={28} color="white" />
              ) : (
                <Entypo name="controller-play" size={28} color="white" />
              )}
            </Pressable>
          </View>
        </Pressable>
      )}

      <BottomModal
        visible={modalVisible}
        onHardwareBackPress={() => {
          setModalVisible(false);
          return true;
        }}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
      >
        <ModalContent
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: backgroundColor,
          }}
        >
          <View className="w-full h-full mt-10">
            <View className="flex-row items-center justify-between">
              <AntDesign
                onPress={() => setModalVisible(!modalVisible)}
                name="down"
                size={24}
                color="white"
              />

              <Text className="text-white font-bold text-lg">
                {currentTrack?.name}
              </Text>

              <Entypo name="dots-three-vertical" size={24} color="white" />
            </View>

            <View className="h-20" />

            <View className="p-3">
              <Image
                className="w-full h-96 rounded-md"
                source={{ uri: currentTrack?.album?.images[0].url }}
              />
              <View className="flex-row justify-between mt-8">
                <View>
                  <Text className="text-white font-bold text-lg">
                    {currentTrack?.name}
                  </Text>
                  <Text className="text-gray-300 mt-1">
                    {currentTrack?.artists[0].name}
                  </Text>
                </View>

                <AntDesign name="heart" size={24} color="#1DB954" />
              </View>

              <View className="mt-3">
                <View className="bg-gray-400 h-1 rounded-md mt-5">
                  <View
                    style={{ width: `${(progress ?? 0) * 100}%` }}
                    className="bg-white h-full"
                  />
                  <View
                    style={[
                      {
                        position: "absolute",
                        top: -5,
                        width: circleSize,
                        height: circleSize,
                        borderRadius: circleSize / 2,
                        backgroundColor: "white",
                      },
                      {
                        left: `${(progress ?? 0) * 100}%`,
                        marginLeft: -circleSize / 2,
                      },
                    ]}
                  />
                </View>
                <View className="mt-5 flex-row justify-between items-center">
                  <Text className="text-lg text-[#D3D3D3]">
                    {formatTime(currentTime)}
                  </Text>

                  <Text className="text-lg text-[#D3D3D3]">
                    {formatTime(totalDuration)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderWidth: 0.1,
                }}
              >
                <Pressable onPress={playPreviousTrack}>
                  <Ionicons name="play-skip-back" size={30} color="white" />
                </Pressable>
                <Pressable
                  onPress={handlePlayPause}
                  className="flex items-center justify-center w-16 h-16 rounded-full bg-white"
                >
                  {isPlaying ? (
                    <AntDesign name="pausecircle" size={26} color="black" />
                  ) : (
                    <Entypo name="controller-play" size={26} color="black" />
                  )}
                </Pressable>
                <Pressable onPress={playNextTrack}>
                  <Ionicons name="play-skip-forward" size={30} color="white" />
                </Pressable>
              </View>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </View>
  );
};

export default PlayingModel;
