import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BottomTabs() {
  const [activeTab, setActiveTab] = useState("Home");
  const scaleValue = new Animated.Value(1);

  const handlePress = (tab) => {
    setActiveTab(tab);
    Animated.sequence([
      Animated.timing(scaleValue, { toValue: 1.2, duration: 150, useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  const tabs = [
    { name: "Home", icon: "home-outline" },
    { name: "Calendar", icon: "calendar-outline" },
    { name: "Messages", icon: "chatbubble-outline" },
    { name: "Profile", icon: "person-outline" },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => handlePress(tab.name)}
            activeOpacity={0.8}
          >
            <Animated.View
              style={[
                styles.iconContainer,
                isActive && { transform: [{ scale: scaleValue }], top: -10 },
              ]}
            >
              <Ionicons
                name={tab.icon}
                size={26}
                color={isActive ? "#007AFF" : "#999"}
              />
              <Text style={[styles.label, isActive && { color: "#007AFF", fontWeight: "600" }]}>
                {tab.name}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#ddd",
  },
  tab: {
    alignItems: "center",
    marginBottom: 38,
  },
  iconContainer: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    color: "#999",
  },
});
