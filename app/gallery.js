import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import Animated, { FadeInDown, FadeInUp, FadeOut } from "react-native-reanimated";
import { SlideInLeft, SlideInRight, ZoomIn, ZoomOut, BounceIn, } from "react-native-reanimated";


export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("https://69086a582d902d0651b03223.mockapi.io/api/v1/places");
        const data = await res.json();

        // Collect all images from all places
        const allImages = data.flatMap((place) => {
          if (Array.isArray(place.images)) return place.images;
          if (typeof place.images === "string") return place.images.split(",");
          if (place.thumbnail) return [place.thumbnail];
          return [];
        });

        setImages(allImages);
      } catch (error) {
        console.error("Error loading gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text>Loading gallery...</Text>
      </View>
    );
  }

  if (images.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "gray" }}>No images available 😔</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌅 Gallery of All Places</Text>

      <FlatList
        data={images}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) => (
          <Animated.Image
           entering={ZoomIn.delay(index * 100)}
exiting={ZoomOut}

            source={{ uri: item }}
            style={styles.image}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, color: "#333" },
  image: {
    width: "48%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#eee",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
