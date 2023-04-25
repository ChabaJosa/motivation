import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
// import { generateImage } from "./utils/use-get-dalle-img";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";

// TODO:
// 1) Fetch inspirational quote from the following api and fetch image from quote:
//      Inspiration API: https://api.goprogram.ai/inspiration/docs/
// 2) Add Speech of quote
// 3) Add image as background, change size to size of screen
// 4) Add signup flow
// 5) Add feedback system
// 6) Setup push notifications with Expo
// Add List of inspirational quotes? Favorite authors? Categories ? Save fav quotes ?

export default function App() {
  const [imageURL, setImageURL] = useState(null);
  //
  async function generateImage(prompt) {
    const API_KEY = Constants.expoConfig.extra.apiKey;
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: "Florida House with Patio",
          n: 1,
          size: "512x512",
        }),
      }
    );

    const data = await response.json();
    // await setImageURL(data.data[0].url);
    return data.data[0].url;
  }

  async function generateImageFromText(prompt) {
    const defaultUseCase =
      prompt.length !== undefined ? prompt : "Sunset by the venezuelan sea";
    try {
      const imageUrl = await generateImage(defaultUseCase);
      await setImageURL(imageUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  }
  console.log("Here2", imageURL);
  return (
    <>
      {imageURL ? (
        <ImageBackground source={{ uri: imageURL }} style={styles.background}>
          <LinearGradient
            colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.6)", "rgba(0,0,0,0.8)"]}
            style={styles.linearGradient}
          >
            <Text
              style={{ color: "white", alignSelf: "center", fontSize: "32" }}
            >
              {"Hi there"}
            </Text>
            <Button
              title="Inspire me"
              onPress={generateImageFromText}
              style={styles.button}
            />
          </LinearGradient>
        </ImageBackground>
      ) : (
        <LinearGradient
          colors={["#c5f9d7", "#f7d486", "#f27a7d"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBackground}
        >
          <View style={styles.container}>
            <Text style={{fontSize: '24', color:'white', fontWeight:'bold', }}>Welcome</Text>
            <Button
              title="Inspire me"
              onPress={generateImageFromText}
              style={styles.button}
            />
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
    justifyContent: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
    justifyContent: "center",
  },
  linearGradient: {
    flex: 1,
    justifyContent: "center",
  },
  gradientBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4C8F37", // Green Apple color
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
    color: "#FFF", // White text
    fontSize: 16,
    fontWeight: "600", // Semi-bold font
  },
});
