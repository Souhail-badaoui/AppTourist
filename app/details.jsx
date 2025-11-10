// app/details.js
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { useFavoritesStore } from "../store/store";

export default function DetailsPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, favorites } = useFavoritesStore();

  const isFavorite = favorites.includes(id);

  useEffect(() => {
    axios
      .get(`https://69086a582d902d0651b03223.mockapi.io/api/v1/places/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log("Error loading detail:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading details...</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.center}>
        <Text>Attraction not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: data.image || data.thumbnail }} style={styles.image} />
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.description}>{data.description}</Text>

      <TouchableOpacity
        style={[styles.favoriteBtn, isFavorite && { backgroundColor: "#ff8080" }]}
        onPress={() => toggleFavorite(id)}
      >
        <Text style={{ color: "#fff" }}>{isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backBtn} onPress={() => router.back('/home')}>
        <Text style={{ color: "#333" ,fontSize: 18 }}>⬅ Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff", marginTop: 20 },
  image: { width: "100%", height: 250, borderRadius: 12, marginBottom: 50, position:'relative', top: 40 },
  name: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  description: { fontSize: 14, color: "#555", lineHeight: 22 },
  favoriteBtn: {
    backgroundColor: "#4A90E2",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  backBtn: {
    alignItems: "center",
    marginTop: 10,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
