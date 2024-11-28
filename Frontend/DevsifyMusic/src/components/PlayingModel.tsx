import { Image, Pressable, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import {
  currentSoundState,
  currentTrackState,
  isPlayingState,
  userSaveTrackSelector,
} from "../RecoilState";
import { BottomModal, ModalContent } from "react-native-modals";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Feather,
  Ionicons,
} from "@expo/vector-icons";
import { Audio, AVPlaybackStatus } from "expo-av";
import { Track } from "../stores/types/SpotifyTrack.type";

const PlayingModel = () => {
  const [backgroundColor, setBackgroundColor] = useState("#0A2647");
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  const [modalVisible, setModalVisible] = useState(false);
  const savedTracks = useRecoilValue(userSaveTrackSelector);
  const value = useRef(0);
  const [currentSound, setCurrentSound] = useRecoilState(currentSoundState);
  const [progress, setProgress] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

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
  ];

  useEffect(() => {
    if (isPlaying) playTrack();
    const indexCurrentTrack = savedTracks?.items.findIndex(
      (item) => item.track.id === currentTrack?.id
    );
    value.current = indexCurrentTrack || 0;
  }, [currentTrack]);

  const playTrack = async () => {
    if (savedTracks?.items && savedTracks.items.length > 0 && !currentTrack) {
      setCurrentTrack(savedTracks.items[0].track);
    }
    currentTrack && (await play(currentTrack));
  };

  const play = async (nextTrack: Track) => {
    const preview_url = nextTrack?.preview_url;
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
        console.log("No preview url");
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
    if (savedTracks?.items && value.current < savedTracks.items.length) {
      const nextTrack = savedTracks?.items[value.current].track;
      setCurrentTrack(nextTrack);
      extractColors();
      // await play(nextTrack);
    } else {
      console.log("end of playlist");
    }
  };

  const playPreviousTrack = async () => {
    if (currentSound) {
      await currentSound.stopAsync();
      setCurrentSound(null);
    }
    value.current -= 1;
    if (savedTracks?.items && value.current < savedTracks.items.length) {
      const nextTrack = savedTracks?.items[value.current].track;
      setCurrentTrack(nextTrack);
      extractColors();
      // await play(nextTrack);
    } else {
      console.log("end of playlist");
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
          className={`flex-row w-[96%] p-3 rounded-md absolute bottom-16 left-2 items-center justify-between gap-3`}
        >
          <View className="flex-row gap-5 items-center">
            <Image
              className="w-12 h-12 rounded-md"
              source={{ uri: currentTrack?.album?.images[0].url }}
            />
            <Text numberOfLines={1} className="text-white font-bold w-56">
              {currentTrack?.name} • {currentTrack?.artists[0].name}
            </Text>
          </View>

          <View className="flex-row gap-5 items-center">
            <AntDesign name="heart" size={24} color="#1DB954" />
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
              <View className="flex-row items-center justify-between mt-5">
                <Pressable>
                  <FontAwesome name="arrows" size={30} color="#03C03C" />
                </Pressable>
                <Pressable onPress={playPreviousTrack}>
                  <Ionicons name="play-skip-back" size={30} color="white" />
                </Pressable>
                <Pressable onPress={handlePlayPause}>
                  {isPlaying ? (
                    <AntDesign name="pausecircle" size={60} color="white" />
                  ) : (
                    <Pressable
                      onPress={handlePlayPause}
                      className="flex items-center justify-center w-16 h-16 rounded-full bg-white"
                    >
                      <Entypo name="controller-play" size={26} color="black" />
                    </Pressable>
                  )}
                </Pressable>
                <Pressable onPress={playNextTrack}>
                  <Ionicons name="play-skip-forward" size={30} color="white" />
                </Pressable>
                <Pressable>
                  <Feather name="repeat" size={30} color="#03C03C" />
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
