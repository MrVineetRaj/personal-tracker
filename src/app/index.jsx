import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/ui/CustomButton";
import { router } from "expo-router";
import { getToken } from "../lib/jwt-token";
import { getUser } from "../lib/api/user";
import { useDispatch } from "react-redux";
import { setUser } from "../lib/slices/userSlice";
import { setToken } from "../lib/slices/tokenSlice";

const index = () => {
  const dispatch = useDispatch();
  const handlePress = () => {
    router.push("/sign-in");
  };

  useEffect(() => {
    getToken().then((token) => {
      if (token) {
        if (token === "undefined") {
          return;
        }
        getUser(token).then((res) => {
          if (res.status === 200) {
            dispatch(setToken(token));
            dispatch(setUser(res.user));
            router.replace("/home");
            return;
          }

          Alert.alert("Session Expired", "Please login again");
        });
      }
    });
  }, []);
  return (
    <SafeAreaView className="h-full items-center justify-center bg-primary">
      <View className="items-center">
        <Text className="text-white font-pextrabold text-5xl">Personal</Text>
        <Text className="text-white font-pextrabold text-5xl">Tracker</Text>
      </View>
      <View className="items-center">
        <Text className="text-gray-100 font-pregular text-base text-center px-4">
          <Text className="text-white font-psemibold">Welcome Abroad !</Text>{" "}
          Here you can track all your important utilities like Finance , Calorie
          , Todo etc at{" "}
          <Text className="text-secondary-100 font-psemibold text-lg">
            Personal Tracker
          </Text>
        </Text>
      </View>

      <CustomButton
        title="Get Started"
        handlePress={handlePress}
        containerStyles="w-[80%]"
        textStyles="font-psemibold text-white text-lg py-4"
      />
    </SafeAreaView>
  );
};

export default index;
