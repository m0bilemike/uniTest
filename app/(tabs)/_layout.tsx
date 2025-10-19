import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { FontAwesome6 } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tabs } from "expo-router";
import React from "react";
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="house" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="likedImages"
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="star" size={28} color={color} />
            ),
          }}
        />
      </Tabs>
    </QueryClientProvider>
  );
}
