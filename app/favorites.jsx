import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useFavoritesStore } from "../store/store";
import { useRouter } from "expo-router";


export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavoritesStore(id);
  const router = useRouter();

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorites yet 😢</Text>
        <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/home')}
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⭐ My Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                <Text style={styles.remove}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#f7f7f7",
    borderRadius: 12,
    padding: 10,
  },
  image: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: "500" },
  remove: { color: "red", marginTop: 4 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 18, color: "#999", marginBottom: 20 },

  button: {
   backgroundColor: "#007bff",
   width: "50%",
   position:"relative",
   Top: 50,
   paddingVertical: 12,
   paddingHorizontal: 70,
   borderRadius: 25,
 },
 buttonText: {
   color: "#fff",
   fontSize: 18,
    fontWeight: "bold",
  },
});
