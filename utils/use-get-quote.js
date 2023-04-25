import Constants from "expo-constants";

export async function generateQuote() {
//   const API_KEY = Constants.expoConfig.extra.apiKey;
  const response = await fetch("https://zenquotes.io/api/random/[your_key]", {
    method: "POST",
    headers: {
    //   Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(),
  });

  try {
    const data = await response.json();
    // console.log(data)
    return [data[0].a, data[0].q]
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}
