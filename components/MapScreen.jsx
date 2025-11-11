import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function MapScreen() {
  const router = useRouter();
  const [places, setPlaces] = useState([]);
  const mapRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const markerScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://690f362145e65ab24ac2e1f5.mockapi.io/Data");
      const withCoords = res.data.map((p, i) => ({
        ...p,
        latitude: 32.3 + i * 0.05,
        longitude: -6.5 + i * 0.05,
      }));
      setPlaces(withCoords);
    };
    fetchData();
  }, []);

  const handleScroll = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / 270);
    if (index !== activeIndex && places[index]) {
      setActiveIndex(index);
      const place = places[index];

      mapRef.current?.animateToRegion(
        {
          latitude: place.latitude,
          longitude: place.longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        },
        700
      );

      Animated.sequence([
        Animated.timing(markerScale, {
          toValue: 1.3,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(markerScale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 32.3,
          longitude: -6.5,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
      >
        {places.map((p, i) => (
          <Marker
            key={p.id}
            coordinate={{ latitude: p.latitude, longitude: p.longitude }}
          >
            <Animated.View
              style={{
                transform: [
                  { scale: i === activeIndex ? markerScale : 1 },
                ],
              }}
            >
              <Ionicons
                name="location-sharp"
                size={40}
                color={i === activeIndex ? "#ff2d55" : "#1a73e8"}
              />
            </Animated.View>
          </Marker>
        ))}
      </MapView>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#fff" />
        <TextInput
          placeholder="Search destination..."
          placeholderTextColor="#4fabf7ff"
          style={styles.input}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={270}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.bottomScroll}
      >
        {places.map((p) => (
          <View key={p.id} style={styles.card}>
            <Image source={{ uri: p.image }} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{p.name}</Text>
              <Text style={styles.desc} numberOfLines={2}>
                {p.desc}
              </Text>
            </View>
          </View>
        ))}
         </ScrollView>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.back("/details")}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
               
     
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  searchContainer: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: "#3e88e9ff",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 45,
    color: "#000000ff",
    marginLeft: 3,
    borderRadius: 25,
    backgroundColor: "#ffffffff",
    paddingHorizontal: 15,
    fontWeight: "600",
  },
  bottomScroll: {
    position: "absolute",
    bottom: 90,
    paddingLeft: 20,
  },
  card: {
    backgroundColor: "#457df7ff",
    borderRadius: 20,
    flexDirection: "row",
    width: 260,
    marginRight: 20,
    padding: 10,
    elevation: 9,
  },
  image: { width: 90, height: 90, borderRadius: 15, marginRight: 10, backgroundColor: "#f3f2f2ff" },
  title: { fontSize: 16, fontWeight: "bold", color: "#fff",position: "relative", top: 10 },
  desc: { fontSize: 12, color: "#f0efefff", marginTop: 22 },
     backBtn: {
    position: "absolute",
    top: 720,
    left: 10,
    backgroundColor: "rgba(34, 161, 245, 1)",
    borderRadius: 25,
    padding: 8,
  },
});
