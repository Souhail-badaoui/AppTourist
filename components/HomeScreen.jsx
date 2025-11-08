import { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator ,
  TextInput
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import Animated, { ZoomIn} from "react-native-reanimated";

export default function HomeScreen() {
  const [destinations, setDestinations] = useState([]);
  const [AllDestinations, setAllDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); 
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Beach", "Mountain", "Camping"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://690f362145e65ab24ac2e1f5.mockapi.io/Data");
        setDestinations(res.data);
        setAllDestinations(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
    const handleSearch = (text) => {
    setSearch(text);
    const results = destinations.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setDestinations(results);
  };
    const handleCategory = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setDestinations(AllDestinations);
    } else {
      const results = AllDestinations.filter((item) =>
        item.category?.toLowerCase().includes(category.toLowerCase())
      );
      setDestinations(results);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
         <Image 
          source={require("../assets/Mountain.png")}
          style={styles.profileImage}
        />
        <Text style={styles.logo}>Travel App</Text>
        <TouchableOpacity style={styles.notificationBtn}>
          <Ionicons name="notifications-outline" size={26} padding={2} borderRadius={9} backgroundColor="#ffffffff" color="#333" />
      </TouchableOpacity>
      </View>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#555" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Search Destination..."
            value={search}
            onChangeText={handleSearch}
          />
        </View>
     x
      
      <Text style={styles.title}>
        Explore the{" "}
        <Text style={styles.highlight1}>Beautiful</Text>
        <Text style={styles.highlight}> world!</Text>
      </Text>
 <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {categories.map((cat, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.categoryButtonActive,
            ]}
            onPress={() => handleCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Best Destination</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>

      <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false}>
 
        {destinations.map((item, index) => (
   <Animated.View
    key={index}
    entering={ZoomIn.duration(300).delay(index * 100).springify().damping(10)} 
    style={styles.card}
  >

          <View key={index} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardLocation}>{item.location}</Text>
              <Text style={styles.rating}>⭐ {item.rating}</Text>
            </View>
          </View>
          </Animated.View>
        ))}
    
      </Animated.ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  loaderContainer: {
    flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff",
  },
    searchContainer: {
    flexDirection: "row",
    position: "relative",
    bottom: 20,
    alignItems: "center",
    borderColor: "#2647ffff",
    borderWidth: 0.25,
    borderRadius: 30,
    paddingHorizontal: 14,
    marginBottom: 6,
  },
     input: {
    flex: 1,
    fontSize: 16,
    height: 55,
  },
    searchIcon: {
    marginRight: 8,
    color: "#2455f3ff",
  },
   categoryContainer: { flexDirection: "row" , position: "relative", bottom: 50 },
  categoryButton: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: "#007bff",
  },
  categoryText: { color: "#333", fontWeight: "500" },
  categoryTextActive: { color: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    top: 32,
    marginBottom: 80,
  },
  logo: { fontSize: 16, padding: 6, backgroundColor: "#fffdfdff", borderRadius: 22, color: "#292929ff", position: 'relative', right: '25%' },
  profileImage: { width: 34, height: 34, borderRadius: 20 },
  title: { fontSize: 39, color: "#333", marginBottom: 55, position: "relative", bottom: 20 },
  highlight1: { color: "#202020ff",  },
  highlight: { color: "#ff780aff", fontWeight: "500" },
  sectionHeader: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",position: "relative", bottom: 14, 
  },
  sectionTitle: { fontSize: 18, color: "#222",  },
  viewAll: { color: "#007bff", fontSize: 14 },
  card: {
    width: 220,
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    marginRight: 15,
    overflow: "hidden",
    elevation: 3,
    
  },
  cardImage: { width: "100%", height: 180 , },
  cardInfo: { padding: 10 },
  cardTitle: { fontSize: 16, color: "#333" },
  cardLocation: { fontSize: 13, color: "#777", marginVertical: 4 },
  rating: { fontSize: 13, color: "#ff9900" },
});
