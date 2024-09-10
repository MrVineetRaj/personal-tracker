import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const FoodItemCard = ({ meal, handlePress }) => {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between w-full my-1"
      onPress={() => {
        handlePress(meal);
      }}
    >
      <View>
        <Text className="text-white text-base font-psemibold">{meal.name}</Text>
        <Text className="text-gray-100 text-sm font-medium">
          {meal.serving_size_g}
        </Text>
      </View>

      <Text className="text-white text-lg font-bold">{meal.calories} cal</Text>
    </TouchableOpacity>
  );
};

export default FoodItemCard;
