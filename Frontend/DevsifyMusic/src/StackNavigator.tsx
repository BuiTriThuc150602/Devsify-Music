import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "./pages/LoginScreen";
import HomeScreen from "./pages/HomeScreen";
import LibraryScreen from "./pages/LibraryScreen";
import SearchScreen from "./pages/SearchScreen";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
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
            | undefined;

          if (route.name === "Trang Chủ") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Thư Viện") {
            iconName = focused ? "library" : "library-outline";
          } else if (route.name === "Tìm Kiếm") {
            iconName = focused ? "search" : "search-outline";
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
        options={{
          headerTitle: "",
        }}
      />
      <Tab.Screen
        name="Thư Viện"
        navigationKey="Library"
        component={LibraryScreen}
      />
      <Tab.Screen
        name="Tìm Kiếm"
        navigationKey="Search"
        component={SearchScreen}
      />
    </Tab.Navigator>
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
        {/* <Stack.Screen name="Liked" component={LikedSongsScreen} options={{headerShown:false}}/>  */}
        {/* <Stack.Screen name="Info" component={SongInfoScreen} options={{headerShown:false}}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
