import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/profile-header";
import { useDispatch, useSelector } from "react-redux";
import InfoBox from "../../components/info-box";
import FoodItemCard from "../../components/diet/food-item-card";
import { router } from "expo-router";
import { fetchAllMeals } from "../../lib/api/diet";
import useFetchObject from "../../lib/hooks/use-fetch-objects";
import { setDiet } from "../../lib/slices/dietSlice";
import preProcessingNutrients from "../../lib/utility/pre_processing_nutrients";

const Diet = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token.token);
  const diet = useSelector((state) => state.diet);

  const [bmi, setBmi] = useState(0);
  const [activeMeal, setActiveMeal] = useState("breakfast");

  const {
    data: mealsData,
    refetch,
    isLoading,
  } = useFetchObject(async () => {
    const res = await fetchAllMeals(token);
    return res;
  });

  useEffect(() => {
    const weight = parseInt(
      user?.physical?.weight[user?.physical?.weight.length - 1].value.split(
        " "
      )[0]
    );
    const height = parseFloat(
      user?.physical?.height[user?.physical?.height.length - 1].value.split(
        " "
      )[0] / 100
    );

    if (!isNaN(weight) && !isNaN(height) && height !== 0) {
      const bmi = (weight / height ** 2).toFixed(3);
      console.log(
        "bmi => ",
        bmi,
        "\nweight => ",
        weight,
        "\nheight => ",
        height
      );
      setBmi(parseFloat(bmi));
    } else {
      setBmi(0); // Handle invalid or missing data
    }
  }, [user, token]);

  useEffect(() => {
    if (!mealsData) return;
    console.log(mealsData.breakfast);
    const nutrients = preProcessingNutrients(mealsData);

    dispatch(setDiet(nutrients));
  }, [mealsData]);

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

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

  return (
    <SafeAreaView className="bg-primary h-full p-4">
      <FlatList
        ListHeaderComponent={
          <View>
            <ProfileHeader />

            <View className="flex-row mt-4">
              <InfoBox
                subtitle="Weight"
                title={
                  user?.physical?.weight[user?.physical?.weight.length - 1]
                    .value
                }
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
                title={`${diet.calories} calories`}
                subtitle="Target 3000"
                containerColor="bg-yellow-100 "
                textStyles="text-center"
              />
            </View>
            <View className="mt-4 bg-orange-400 rounded-md  px-4 py-4 flex-row items-center justify-between ">
              <Text className="text-black text-base font-psemibold ">
                Today, {currentDate.toDateString()}
              </Text>

              <Text
                className="text-secondary-100 text-sm font-psemibold"
                onPress={() => {
                  router.push("/all-nutrients");
                }}
              >
                All Nutrients
              </Text>
            </View>
            <View className="mt-4 flex-row justify-around">
              {meals?.map((meal) => (
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
              <TouchableOpacity
                className="bg-secondary-100 px-4 py-2 rounded-md"
                onPress={() => {
                  router.push(`/add-meal/${activeMeal}`);
                }}
              >
                <Text className="text-white text-sm font-psemibold ">
                  Add Food
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        data={mealsData[activeMeal]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center py-2">
            <FoodItemCard meal={item} handlePress={() => {}} />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      />
    </SafeAreaView>
  );
};

export default Diet;
