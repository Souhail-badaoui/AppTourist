import { router } from "expo-router";
import { View,TouchableOpacity, Text, Image, StyleSheet, ScrollView, Dimensions } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";
const { width } = Dimensions.get("window");

export default function WelcomeScreen() {
  const slides = [
    {
      image: require("../assets/Boat.png"),
      title: "Life is short and \nworld is wide",
      highlight: "world is wide",
      description:
        "At Friends tours and travel, we customize reliable and trustworthy educational tours to destinations all over the world.",
    },
    {
      image: require("../assets/beach.jpg"),
      title: "Discover amazing\nplaces with us",
      highlight: "amazing",
      description:  "At Friends tours and travel, we customize reliable and trustworthy educational tours to destinations all over the world.",
    },
    {
      image: require("../assets/Mountain.png"),
      title: "Adventure awaits\nfor everyone",
      highlight: "Adventure",
      description: "At Friends tours and travel, we customize reliable and trustworthy educational tours to destinations all over the world.",
    },
  ];
  const [current, setCurrent] = useState(0);
  const nextSlide = () => {
    if (current < slides.length - 1) { 
      setCurrent(current + 1);
    } else {
      setCurrent(0);
    }
  };
  return ( 
    <SafeAreaProvider>
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={nextSlide}
      scrollEventThrottle={16}
      style={{ flex: 1 }}
    >
       <View style={{ flex: 1 , flexDirection: 'row'}}>
      {slides.map((slide, i) => (
        <View key={i} style={[styles.container, { width }]}>
          <Image source={slide.image} style={styles.image} />

          <Text style={styles.title}>
            {slide.title.split(slide.highlight)[0]}
            <Text style={styles.highlight}>{slide.highlight}</Text>
            {slide.title.split(slide.highlight)[1]}
          </Text>

          <Text style={styles.description}>{slide.description}</Text>
        </View>
        
      ))}
       </View>
   
    </ScrollView>
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: index === current ? "#007bff" : "#ccc" },
              ]}
            />
          ))}
        </View>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/home')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
  </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 60,
  },
  image: {
    width: 320,
    height: 350,
    borderRadius: 32,
    marginBottom: 17,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#222",
    marginBottom: 10,
  },
  highlight: {
    color: "#ff6600",
  },
  description: {
    textAlign: "center",
    color: "#555",
    fontSize: 14,
    lineHeight: 20,
    width: 300,
  },
 dotsContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
 dot: { 
   width: 8,
   height: 8,
   borderRadius: 8,
   backgroundColor: "#ccc",
   marginHorizontal: 8,
   position:"relative",
   bottom:30,
   left:140,

 },
 button: {
   backgroundColor: "#007bff",
   width: "50%",
   position:"relative",
   bottom:30,
   alignSelf: "center",
   marginBottom: 60,
   paddingVertical: 12,
   paddingHorizontal: 40,
   borderRadius: 25,
 },
 buttonText: {
   color: "#fff",
   fontSize: 18,
    fontWeight: "bold",
  },
});
