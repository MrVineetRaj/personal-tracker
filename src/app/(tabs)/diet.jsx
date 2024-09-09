import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/profile-header";
import { useSelector } from "react-redux";
import InfoBox from "../../components/info-box";
import FoodItemCard from "../../components/diet/food-item-card";

const Diet = () => {
  const user = useSelector((state) => state.user);
  const [bmi, setBmi] = useState(0);
  const [activeMeal, setActiveMeal] = useState("breakfast");

  const meals = [
    {
      label: "Breakfast",
      value: "breakfast",
    },
    {
      label: "Lunch",
      value: "lunch",
    },
    {
      label: "Dinner",
      value: "dinner",
    },
    {
      label: "Snacks",
      value: "snacks",
    },
  ];

  const [mealsData, setMealsData] = useState({
    breakfast: [
      {
        name: "Oatmeal",
        calories: 150,
        servings: "100 g",
      },
      {
        name: "Milk",
        calories: 100,
        servings: "200 ml",
      },
      {
        name: "Banana",
        calories: 50,
        servings: "1",
      },
    ],
    lunch: [
      {
        name: "Rice",
        calories: 200,
        servings: "100 g",
      },
      {
        name: "Chicken",
        calories: 150,
        servings: "100 g",
      },
      {
        name: "Salad",
        calories: 50,
        servings: "100 g",
      },
    ],
    dinner: [
      {
        name: "Pasta",
        calories: 200,
        servings: "100 g",
      },
      {
        name: "Fish",
        calories: 150,
        servings: "100 g",
      },
      {
        name: "Salad",
        calories: 50,
        servings: "100 g",
      },
    ],
    snacks: [
      {
        name: "Apple",
        calories: 50,
        servings: "1",
      },
      {
        name: "Almonds",
        calories: 100,
        servings: "100 g",
      },
      {
        name: "Yogurt",
        calories: 50,
        servings: "100 g",
      },
    ],
  });
  useEffect(() => {
    const weight = parseInt(user?.physical?.weight.split(" ")[0]);
    const height = parseFloat(user?.physical?.height.split(" ")[0] / 100);
    console.log(weight, height);
    if (!isNaN(weight) && !isNaN(height) && height !== 0) {
      const bmi = (weight / height ** 2).toFixed(3);
      setBmi(parseFloat(bmi));
    } else {
      setBmi(0); // Handle invalid or missing data
    }
  }, [user]);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  return (
    <SafeAreaView className="bg-primary h-full p-4">
      <ProfileHeader />

      <View className="mt-4">
        <View className="flex-row">
          <InfoBox
            subtitle="Weight"
            title={user.physical.weight}
            containerColor="bg-green-400 flex-[0.5] mr-4"
            textStyles="text-center"
          />

          <InfoBox
            subtitle="BMI"
            title={bmi}
            containerColor="bg-secondary-100 flex-[0.5]"
            textStyles="text-center"
          />
        </View>

        <View className="mt-4">
          <InfoBox
            title={`2660 calories`}
            subtitle="Target 3000"
            containerColor="bg-yellow-100 "
            textStyles="text-center"
          />
        </View>

        <View className="mt-4 bg-orange-400 rounded-md  px-4 py-4 flex-row items-center justify-between ">
          <Text className="text-black text-base font-psemibold ">
            Today, {currentDate.toDateString()}
          </Text>

          <Text className="text-secondary-100 text-sm font-psemibold">
            All Nutrients
          </Text>
        </View>

        <View className="mt-4 flex-row justify-around">
          {meals.map((meal) => (
            <Text
              key={meal.value}
              onPress={() => setActiveMeal(meal.value)}
              className={`text-white text-base font-psemibold ${
                activeMeal === meal.value ? "text-secondary-100" : ""
              }`}
            >
              {meal.label}
            </Text>
          ))}
        </View>

        <View className="mt-4  px-4 py-4 flex-row items-center justify-between ">
          <Text className="text-white text-base font-psemibold ">
            {activeMeal.split("")[0].toUpperCase() + activeMeal.slice(1)}
          </Text>
          <TouchableOpacity className="bg-secondary-100 px-4 py-2 rounded-md">
            <Text className="text-white text-sm font-psemibold ">Add Food</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="mt-4">
          {mealsData[activeMeal].map((meal, index) => (
            <View
              key={index}
              className="flex-row justify-between items-center py-2"
            >
              <FoodItemCard meal={meal} />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Diet;
