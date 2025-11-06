import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { backgroundColor: "#fff", borderTopWidth: 0.3 },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favorites",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart-outline" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="gallery"
          options={{
            title: "Gallery",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="images-outline" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
