import { StyleSheet, Text, View, Image, Button } from "react-native";
import React, { useState, useEffect } from "react";
// import { generateImage } from "./utils/use-get-dalle-img";
import Constants from 'expo-constants';

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
  async function generateImage(prompt) {
    const API_KEY = Constants.expoConfig.extra.apiKey;
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: "Happy staffy pitbull",
        n: 1,
        size: "512x512",
      }),
    });
  
    const data = await response.json();
    await setImageURL(data.data[0].url);
    // return data.data[0].url
 
  }

  async function generateImageFromText(prompt) {
    const defaultUseCase =
      prompt.length !== undefined ? prompt : "Sunset by the venezuelan sea";
    try {
      await generateImage(defaultUseCase);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  }
  console.log('Here2',imageURL)
  return (
    <View style={styles.container}>
      <Text>Wassup React Native</Text>
      <Button title='Click here' onPress={generateImageFromText}/>
      <View>
        {imageURL && (
          <Image
            source={{ uri: imageURL }}
            style={{ width: 200, height: 200 }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
