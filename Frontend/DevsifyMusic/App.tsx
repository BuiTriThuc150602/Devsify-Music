import { PlayerContext } from "./src/contexts/PlayerContext";
import { ModalPortal } from "react-native-modals";
import Navigation from "./src/StackNavigator";
import { AuthProvider } from "./src/contexts/AuthContext";
import { RecoilRoot } from "recoil";
import React, { Suspense } from "react";
import { ActivityIndicator } from "react-native";
import "./global.css"

export default function App() {
  return (
    <Suspense fallback={<ActivityIndicator size={20} color={"white"}/>}>
      <RecoilRoot>
        <AuthProvider>
          <PlayerContext>
            <Navigation />
            <ModalPortal />
          </PlayerContext>
        </AuthProvider>
      </RecoilRoot>
    </Suspense>
  );
}
