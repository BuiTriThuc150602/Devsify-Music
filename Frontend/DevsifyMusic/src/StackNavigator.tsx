import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "./pages/LoginScreen";
import HomeScreen from "./pages/HomeScreen";
import SearchScreen from "./pages/SearchScreen";
import ProfileScreen from "./pages/ProfileScreen";
import LikedSongsScreen from "./pages/LikedSongsScreen";
import PlayingModel from "./components/PlayingModel";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName:
              | "home"
              | "home-outline"
              | "library"
              | "library-outline"
              | "search"
              | "search-outline"
              | "person"
              | "person-outline"
              | undefined;

            if (route.name === "Trang Chủ") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Thư Viện") {
              iconName = focused ? "library" : "library-outline";
            } else if (route.name === "Tìm Kiếm") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "Cá Nhân") {
              iconName = focused ? "person" : "person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },

          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            borderTopWidth: 0,
          },
        })}
      >
        <Tab.Screen
          name="Trang Chủ"
          navigationKey="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          name="Thư Viện"
          navigationKey="Library"
          component={LikedSongsScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Tìm Kiếm"
          navigationKey="Search"
          component={SearchScreen}
        />
        <Tab.Screen
          name="Cá Nhân"
          navigationKey="Profile"
          options={{ headerShown: false }}
          component={ProfileScreen}
        />
      </Tab.Navigator>
      <PlayingModel />
    </>
  );
}

const Stack = createNativeStackNavigator();
function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
