import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { useAttractionStore } from "./store"; // 🔥 for favorites

export default function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { favorites, toggleFavorite } = useAttractionStore();

  useEffect(() => {
    axios
      .get("https://69086a582d902d0651b03223.mockapi.io/api/v1/places")
      .then((res) => setData(res.data))
      .catch((err) => console.log("API Error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Loading places...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const imageUrl = item.images?.[0] || item.thumbnail || "https://via.placeholder.com/200";
        const isFavorite = favorites.includes(item.id);

        return (
          <View style={styles.card}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.city}>{item.city}</Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, isFavorite && { backgroundColor: "#ff8080" }]}
                  onPress={() => toggleFavorite(item.id)}
                >
                  <Text style={styles.buttonText}>{isFavorite ? "❤️ Favorited" : "🤍 Favorite"}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#4A90E2" }]}
                  onPress={() => router.push(`/details?id=${item.id}`)}
                >
                  <Text style={styles.buttonText}>Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      }}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
  },
  cardContent: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  city: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
