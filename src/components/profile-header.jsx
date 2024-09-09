import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { images } from "../constants";
import { router } from "expo-router";

const ProfileHeader = () => {
  const { name, email, avatar } = useSelector((state) => state.user);

  return (
    <View className="flex-row items-center justify-between">
      <View className="">
        <Text className="text-gray-100 font-pregular">Welcome Back!</Text>
        <Text className="text-white font-psemibold text-xl">{name}</Text>
      </View>
      <TouchableOpacity
        className="rounded-full overflow-hidden w-16 h-16"
        onPress={() => {
          router.push("/profile");
        }}
      >
        {avatar ? (
          <Image source={{ uri: avatar }} />
        ) : (
          <Image
            source={images.profile}
            resizeMode="contain"
            className="w-16 h-16"
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;
