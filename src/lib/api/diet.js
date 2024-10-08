import axios from "axios";
import { Alert } from "react-native";
import { API_URL } from "@env";

const addMeal = async (mealData, token, meal) => {
  try {
    const response = await axios.post(
      `https://personal-guide-backend.onrender.com/diet/add-meal?token=${token}&meal=${meal}`,
      mealData
    );

    Alert.alert("Success", response.data.message);

    return response.data;
  } catch (e) {
    return e.response.data;
  }
};

const fetchAllMeals = async (token) => {
  const currentData = new Date();

  try {
    const response = await axios.get(
      `https://personal-guide-backend.onrender.com/diet/get-meals?token=${token}&date=${currentData.toISOString()}`
    );
    return response.data.data;
  } catch (e) {
    return e.response.data;
  }
};

export { addMeal, fetchAllMeals };
