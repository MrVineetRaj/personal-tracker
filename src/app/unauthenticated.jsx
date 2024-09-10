import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";

const UnAuthenticated = () => {
  return (
    <SafeAreaView className="bg-primary h-full justify-center items-center">
      <Text className="text-white font-psemibold text-5xl">
        Please Authenticate
      </Text>
      <Image
        source={images.unauthenticated}
        resizeMode="contain"
        className="w-[100vw] h-[100vw]"
      />
    </SafeAreaView>
  );
};

export default UnAuthenticated;
