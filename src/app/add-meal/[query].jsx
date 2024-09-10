import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/profile-header";
import FormField from "../../components/ui/FormField";
import { useDispatch, useSelector } from "react-redux";
import FoodItemCard from "../../components/diet/food-item-card";
import CustomButton from "../../components/ui/CustomButton";
import { addMeal } from "../../lib/api/diet";
import { router, useLocalSearchParams } from "expo-router";
import { setUser } from "../../lib/slices/userSlice";
import { getUser } from "../../lib/api/user";

const AddMeal = () => {
  const { query } = useLocalSearchParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token.token);
  const [suggestions, setSuggestions] = useState(user.recent_food);
  const [addingMeal, setAddingMeal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    date: "",
    serving_size_g: "",
  });

  const handleAcceptSuggestions = (meal) => {
    setForm({
      ...form,
      name: meal.name,
      serving_size_g: meal.serving_size_g,
    });
  };

  const handleSaveMeal = async () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    

    setForm({ ...form, date: currentDate.toDateString() });
    setAddingMeal(true);
    const res = await addMeal(form, token, query);

    if (res.status === 200) {
      await getUser(token).then((res) => dispatch(setUser(res.user)));

      setForm({
        name: "",
        date: "",
        serving_size_g: "",
      });

      router.push("/diet");
    }

    setAddingMeal(false);
    
  };
  return (
    <SafeAreaView className="bg-primary h-full p-4">
      <ProfileHeader />

      <Text className="font-pbold text-2xl text-gray-100 mt-4">
        Add Meal for {query}
      </Text>

      <FormField
        title="Food"
        value={form.name}
        handleChangeText={(value) => {
          setForm({ ...form, name: value });

          const tempSuggestions = user.recent_food.filter((meal) =>
            meal.name.includes(form.name)
          );

          setSuggestions(tempSuggestions);
        }}
        containerStyles="mt-4"
      />

      <FormField
        title="Serving in gm"
        value={form.serving_size_g}
        handleChangeText={(value) =>
          setForm({ ...form, serving_size_g: value })
        }
        containerStyles="mt-2"
      />

      <CustomButton
        title="Add Meal"
        containerStyles="py-4 my-4"
        textStyles="text-lg font-pbold text-white"
        isLoading={addingMeal}
        handlePress={handleSaveMeal}
      />
      <ScrollView className="bg-primary w-full mt-4">
        {suggestions.map((food, index) => (
          <View key={index}>
            <FoodItemCard meal={food} handlePress={handleAcceptSuggestions} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddMeal;
