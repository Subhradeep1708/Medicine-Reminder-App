import { SplashScreen, Slot } from "expo-router";
import "../global.css"
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from 'expo-status-bar';
import SafeScreen from "../components/SafeScreen";
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { PaperProvider } from 'react-native-paper';
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "SpaceGrotesk-Regular": require("../assets/fonts/SpaceGrotesk-Regular.ttf"),
    "SpaceGrotesk-Bold": require("../assets/fonts/SpaceGrotesk-Bold.ttf"),
    "SpaceGrotesk-Medium": require("../assets/fonts/SpaceGrotesk-Medium.ttf"),
    "SpaceGrotesk-Light": require("../assets/fonts/SpaceGrotesk-Light.ttf"),
    "SpaceGrotesk-SemiBold": require("../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  return (
    <PaperProvider>
      <ClerkProvider>
        <SafeScreen tokenCache={tokenCache}>
          <StatusBar style="dark" translucent />
          <Slot />
        </SafeScreen>
      </ClerkProvider>
    </PaperProvider>
  );
}
