import Constants from "expo-constants";

async function generateImage(prompt) {
  const API_KEY = Constants.expoConfig.extra.apiKey;
  console.log("Yoo");
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: "venezuelan sea", // prompt,
      n: 1,
      size: "512x512",
      //   response_format: "url",
    }),
  });

  try {
    const response = await response.json();
    const imageURL = response.data.data[0].url;
    return imageURL;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}

export default generateImage;
