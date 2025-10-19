import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { RootState } from "@/store";
import { FontAwesome6 } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tabs } from "expo-router";
import React from "react";
import { useSelector } from "react-redux";

export default function TabLayout() {
  const theme = useSelector((state: RootState) => state.theme.current);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[theme].text,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: {
            backgroundColor: Colors[theme].background,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Images",
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="image" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="likedImages"
          options={{
            title: "Likes",
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="heart" size={28} color={color} />
            ),
          }}
        />
      </Tabs>
    </QueryClientProvider>
  );
}
