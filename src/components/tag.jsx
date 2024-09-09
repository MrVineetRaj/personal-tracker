import { View, Text } from "react-native";
import React from "react";

const Tag = ({ tag }) => {
  return (
    <View className="bg-secondary-100 px-2 py-1 rounded-full">
      <Text className="font-psemibold text-white text-sm">{tag}</Text>
    </View>
  );
};

export default Tag;
