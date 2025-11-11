import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useFavoritesStore } from "../store/store";
import { useRouter } from "expo-router";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams(); 
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { favorites, toggleFavorite } = useFavoritesStore();

  const isFav = favorites.some((fav) => fav.id === id);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`https://690f362145e65ab24ac2e1f5.mockapi.io/Data/${id}`);
        setItem(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!item) {
    return (
      <View style={styles.errorContainer}>
        <Text>Item not found 😢</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
    
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
            <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back("/home")}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.heartBtn}
          onPress={() => toggleFavorite(item)}
        >
          <Ionicons
            name={isFav ? "heart" : "heart-outline"}
            size={26}
            color={isFav ? "red" : "#fff"}
          />
        </TouchableOpacity>
      </View>

    
      <View style={styles.infoContainer}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.row}>
              <Ionicons name="location-outline" size={16} color="#777" />
              <Text style={styles.location}>{item.location}</Text>
            </View>
          </View>
        </View>

        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <Ionicons name="star" size={16} color="#fbc531" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="people-outline" size={16} color="#777" />
            <Text style={styles.people}>17 People Reviewed</Text>
          </View>
        </View>

       
        <View style={styles.tabs}>
          <Text style={[styles.tab, styles.activeTab]}>Overview</Text>
          <Text style={styles.tab}>Maps</Text>
          <Text style={styles.tab}>Preview</Text>
        </View>

     
        <Text style={styles.desc}>
          {item.description ||
            "This is one of the most beautiful destinations in the world, with stunning views and great experiences."}
        </Text>

        <TouchableOpacity style={styles.bookBtn} onPress={() => router.push('/maps')}>
          <Text style={styles.bookText}>Preview in maps</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  imageContainer: { position: "relative" },
  image: { width: "100%", height: 280, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 },
    backBtn: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 25,
    padding: 8,
  },
  heartBtn: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 25,
    padding: 8,
  },
  infoContainer: { padding: 20 },
  name: { fontSize: 22, fontWeight: "bold", color: "#222" },
  location: { fontSize: 14, color: "#777", marginLeft: 5 },
  price: { color: "#007bff", fontSize: 16, fontWeight: "bold" },
  rating: { marginLeft: 4, fontWeight: "600" },
  people: { fontSize: 13, marginLeft: 4, color: "#555" },
  row: { flexDirection: "row", alignItems: "center" },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
  tabs: { flexDirection: "row", marginTop: 20, marginBottom: 10 },
  tab: { fontSize: 16, marginRight: 20, color: "#777" },
  activeTab: { color: "#000", fontWeight: "bold", borderBottomWidth: 2, borderColor: "#007bff" },
  desc: { color: "#555", fontSize: 14, lineHeight: 20, marginVertical: 10 },
  bookBtn: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 15,
  },
  bookText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
