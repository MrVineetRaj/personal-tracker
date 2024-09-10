import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../components/profile-header";
import { useSelector } from "react-redux";

const AllNutrients = () => {
  const diet = useSelector((state) => state.diet);
  return (
    <SafeAreaView className="bg-primary h-full p-4">
      <ProfileHeader />

      <Text className="text-2xl font-pbold text-gray-100 my-4">
        All Nutrients Today
      </Text>
      <View className=" flex-col ">
        <View className="flex-row justify-between">
          <Text className="text-lg text-secondary-100 font-psemibold">
            Nutrient
          </Text>
          <Text className="text-lg text-secondary-100 font-psemibold">
            Amount
          </Text>
        </View>
        <View className="flex-row justify-between my-2">
          <Text className="text-lg text-yellow-100 font-psemibold">
            Calories
          </Text>
          <Text className="text-lg text-yellow-100 font-psemibold">
            {diet.calories}
          </Text>
        </View>
        <View className="flex-row justify-between my-2">
          <Text className="text-lg text-gray-100 font-psemibold">
            serving_size_g
          </Text>
          <Text className="text-lg text-gray-100 font-psemibold">
            {diet.serving_size_g}
          </Text>
        </View>
        <View className="flex-row justify-between my-2">
          <Text className="text-lg text-yellow-100 font-psemibold">
            protein_g
          </Text>
          <Text className="text-lg text-yellow-100 font-psemibold">
            {diet.protein_g}
          </Text>
        </View>
        <View className="flex-row justify-between my-2">
          <Text className="text-lg text-gray-100 font-psemibold">
            sodium_mg
          </Text>
          <Text className="text-lg text-gray-100 font-psemibold">
            {diet.sodium_mg}
          </Text>
        </View>
        <View className="flex-row justify-between my-2">
          <Text className="text-lg text-gray-100 font-psemibold">
            cholesterol_mg
          </Text>
          <Text className="text-lg text-gray-100 font-psemibold">
            {diet.cholesterol_mg}
          </Text>
        </View>
        <View className="flex-row justify-between my-2">
          <Text className="text-lg text-gray-100 font-psemibold">
            carbohydrates_total_g
          </Text>
          <Text className="text-lg text-gray-100 font-psemibold">
            {diet.carbohydrates_total_g}
          </Text>
        </View>
        <View className="flex-row justify-between my-2">
          <Text className="text-lg text-yellow-100 font-psemibold">fiber_g</Text>
          <Text className="text-lg text-yellow-100 font-psemibold">
            {diet.fiber_g}
          </Text>
        </View>
        <View className="flex-row justify-between my-2">
          <Text className="text-lg text-gray-100 font-psemibold">sugar_g</Text>
          <Text className="text-lg text-gray-100 font-psemibold">
            {diet.sugar_g}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AllNutrients;
