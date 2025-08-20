import { SplashScreen, Slot } from "expo-router";
import "../global.css";
import { useEffect, useState, createContext } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import SafeScreen from "../components/SafeScreen";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from "react-native-paper";

// ✅ ThemeContext to share dark/light mode across the app
export const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

export default function RootLayout() {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    "SpaceGrotesk-Regular": require("../assets/fonts/SpaceGrotesk-Regular.ttf"),
    "SpaceGrotesk-Bold": require("../assets/fonts/SpaceGrotesk-Bold.ttf"),
    "SpaceGrotesk-Medium": require("../assets/fonts/SpaceGrotesk-Medium.ttf"),
    "SpaceGrotesk-Light": require("../assets/fonts/SpaceGrotesk-Light.ttf"),
    "SpaceGrotesk-SemiBold": require("../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
  });

  // Dark mode state
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark(prev => !prev);

  // React Native Paper theme
  const theme = isDark ? MD3DarkTheme : MD3LightTheme;

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <PaperProvider theme={theme}>
        
        <ClerkProvider tokenCache={tokenCache}>
          <SafeScreen>
            {/* StatusBar updates automatically based on theme */}
            <StatusBar style={isDark ? "light" : "dark"} translucent />
            {/* All child screens have access to ThemeContext */}
            <Slot />
          </SafeScreen>
        </ClerkProvider>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}
