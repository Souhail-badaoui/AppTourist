import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useFavoritesStore } from "../store/store";
import { useRouter } from "expo-router";


export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavoritesStore();

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
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc}>{item.desc}</Text>
              <TouchableOpacity onPress={() => toggleFavorite(item)}>
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
  container: { flex: 1, padding: 16 , marginTop: 50},
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 22 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#1c94f7ff",
    borderRadius: 12,
    padding: 10,
  },
  image: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: "500" , color: "#fff"},
  desc: { fontSize: 12, color: "#ebebebff", marginTop: 4 },
  remove: { color: "red", marginTop: 4 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 18, color: "#999", marginBottom: 20 },

  button: {
   backgroundColor: "#007bff",
   width: "40%",
   position:"relative",
   top: 10,
   paddingVertical: 8,
   paddingHorizontal: 48,
   borderRadius: 25,
 },
 buttonText: {
   color: "#fff",
   fontSize: 18,
    fontWeight: "bold",
  },
});
