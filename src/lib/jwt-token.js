// Import AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to store token
const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem("@user_token", token);
  } catch (error) {
    console.error("Failed to save token", error);
  }
};

// Function to get token
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("@user_token");
    if (token !== null) {
      return token;
    }
  } catch (error) {
    console.error("Failed to fetch token", error);
  }
  return null;
};


export { storeToken, getToken };
