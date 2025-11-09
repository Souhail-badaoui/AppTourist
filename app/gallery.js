import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  withSpring,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { FlatList } from "react-native-gesture-handler";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const ITEM_WIDTH = SCREEN_WIDTH * 0.6;

export default function Gallery3DRoulette() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(
          "https://69086a582d902d0651b03223.mockapi.io/api/v1/places"
        );
        const data = await res.json();
        const allImages = data.flatMap((place) => {
          if (Array.isArray(place.images)) return place.images;
          if (typeof place.images === "string") return place.images.split(",");
          if (place.thumbnail) return [place.thumbnail];
          return [];
        });
        setImages(allImages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text>Loading gallery...</Text>
      </View>
    );

  if (!images.length)
    return (
      <View style={styles.center}>
        <Text style={{ color: "gray" }}>No images available 😔</Text>
      </View>
    );

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={styles.title}>Gallery</Text>
      <Animated.FlatList
        data={images}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        bounces={false}
        contentContainerStyle={{ paddingHorizontal: (SCREEN_WIDTH - ITEM_WIDTH) / 2 }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => (
          <Carousel3DItem uri={item} index={index} scrollX={scrollX} />
        )}
      />
    </View>
  );
}


const Carousel3DItem = ({ uri, index, scrollX }) => {
  const scalePress = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    const position = index * ITEM_WIDTH;
    const diff = scrollX.value - position;

    
    const scale = interpolate(
      Math.abs(diff),
      [0, ITEM_WIDTH],
      [1, 0.75],
      "clamp"
    );

    
    const rotateY = interpolate(
      diff,
      [-ITEM_WIDTH, 0, ITEM_WIDTH],
      [30, 0, -30],
      "clamp"
    );

    return {
      transform: [
        { perspective: 1000 }, 
        { rotateY: `${rotateY}deg` },
        { scale: withSpring(scale * scalePress.value) },
      ],
      zIndex: scale > 0.9 ? 1 : 0, 
    };
  });

  return (
    <Pressable
      onPressIn={() => (scalePress.value = 1.2)}
      onPressOut={() => (scalePress.value = 1)}
      style={{ width: ITEM_WIDTH, alignItems: "center" }}
    >
      <Animated.Image
        source={{ uri }}
        style={[styles.image, animatedStyle]}
        resizeMode="cover"
      />
    </Pressable>
  );
};


const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  image: {
    width: ITEM_WIDTH,
    height: SCREEN_HEIGHT * 0.55,
    borderRadius: 15,
    backgroundColor: "#eee",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
