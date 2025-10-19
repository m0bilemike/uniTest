import { useColorScheme } from "@/hooks/use-color-scheme";
import { AppDispatch, persistor, store } from "@/store";
import { registerAppOpen } from "@/store/appUsageSlice";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const AppInitializer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(registerAppOpen());
  }, [dispatch]);

  return null;
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  
  useEffect(() => {
    if (error) throw error;
  }, [error]);
  
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator size="large" />}
        persistor={persistor}
      >
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <AppInitializer />

          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="settings"
              options={{ presentation: "modal", headerShown: false }}
            />
          </Stack>

          <StatusBar style="auto" />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
