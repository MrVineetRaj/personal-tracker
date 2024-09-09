import { View, Text } from "react-native";
import React from "react";

const FoodItemCard = ({ meal }) => {
  return (
    <View className="flex-row items-center justify-between w-full">
      <View>
        <Text className="text-white text-base font-psemibold">{meal.name}</Text>
        <Text className="text-gray-100 text-sm font-medium">
          {meal.servings}
        </Text>
      </View>

      <Text className="text-white text-lg font-bold">
        {meal.calories} cal
      </Text>
    </View>
  );
};

export default FoodItemCard;
