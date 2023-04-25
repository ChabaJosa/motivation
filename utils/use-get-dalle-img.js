import Constants from "expo-constants";

export async function generateImage(quote,author) {
  const API_KEY = Constants.expoConfig.extra.apiKey;
//   console.log(prompt)
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: `Van Gogh portrait of ${author}`,
      n: 1,
      size: "512x512",
    }),
  });

  try {
    const data = await response.json();
    return data.data[0].url;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}

