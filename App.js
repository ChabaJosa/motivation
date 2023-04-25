import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { generateImage } from "./utils/use-get-dalle-img";
import { generateQuote } from "./utils/use-get-quote";
import { LinearGradient } from "expo-linear-gradient";

// TODO:
// 1) Fetch inspirational quote from the following api and fetch image from quote:
//      Inspiration API: https://api.goprogram.ai/inspiration/docs/ or https://docs.zenquotes.io/zenquotes-documentation/
// 2) Add Speech of quote
// 3) Add image as background, change size to size of screen
// 4) Add signup flow
// 5) Add feedback system
// 6) Setup push notifications with Expo
// Add List of inspirational quotes? Favorite authors? Categories ? Save fav quotes ?

export default function App() {
  const [imageURL, setImageURL] = useState(null);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(null);
  //
  async function generateImageFromText() {
    await setLoading(true);
    //
    // Fetch Quote
    //
    const quoteArray = await generateQuote();
    await setQuote(quoteArray);
    //
    //  Fetch Image
    //
    try {
      const imageUrl = await generateImage(quoteArray[1], quoteArray[0]);
      await setImageURL(imageUrl);
      await setLoading(false);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  }
  //
  return (
    <>
      {imageURL ? (
        <LinearGradient
          colors={["#f27a7d", "#f7d486", "#c5f9d7"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBackground}
        >
          <ImageBackground
            source={{ uri: imageURL }}
            style={styles.background}
            imageStyle={{ borderRadius: 16 }}
          >
            <LinearGradient
              colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.6)", "rgba(0,0,0,0.8)"]}
              style={styles.linearGradient}
            >
              <View style={styles.quoteContainer}>
                <Text style={styles.quote}>
                  {loading ? "   Loading..." : quote[1]}
                </Text>
                <Text></Text>
                <Text style={styles.quote}>
                  {loading ? "" : `- ${quote[0]}`}
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={generateImageFromText}
                  style={[styles.button, { backgroundColor: "transparent", borderWidth:1, borderColor:'white' }]}
                >
                  <Text style={styles.buttonText}>{"New Quote"}</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </ImageBackground>
        </LinearGradient>
      ) : (
        <LinearGradient
          colors={["#f27a7d", "#f7d486", "#c5f9d7"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBackground}
        >
          <View style={styles.container}>
            <Text style={{ fontSize: 24, color: "white", fontWeight: "bold" }}>
              {"Welcome!"}
            </Text>
            <TouchableOpacity
              onPress={generateImageFromText}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{"Inspire"}</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  background: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
    justifyContent: "center",
    // marginHorizontal: 16,
    marginTop: 32,
    marginBottom: 16,
    minWidth: "96%",
  },
  linearGradient: {
    flex: 1,
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 16,
  },
  gradientBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 8,
    backgroundColor: "coral", // Green Apple color
    borderRadius: 25, // Rounded edges
    paddingHorizontal: 20, // Horizontal padding
    paddingVertical: 10, // Vertical padding
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowOpacity: 0.25, // iOS shadow
    shadowRadius: 3.84, // iOS shadow
  },
  buttonText: {
    fontSize: 16,
    color: "#FFF", // White text
    fontWeight: "600", // Semi-bold font
  },
  quoteContainer: {
    flex: 4,
    padding: 16,
    fontSize: 24,
    margin: 16,
    // borderRadius: 16,
    // borderWidth: 1,
    justifyContent: "flex-end",
    borderColor: "white",
  },
  quote: {
    textAlign: "right",
    color: "white",
    fontSize: 18,
    // maxWidth:124
  },
});
