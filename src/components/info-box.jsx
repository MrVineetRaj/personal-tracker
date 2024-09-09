import { View, Text } from "react-native";
import React from "react";

const InfoBox = ({
  title,
  subtitle = "",
  containerColor = "bg-secondary-100",
  textStyles = "",
}) => {
  console.log("InfoBox", title, subtitle, containerColor);
  return (
    <View
      className={
        "px-4 py-4 rounded-xl flex-col justify-center items-center " +
        " " +
        containerColor
      }
    >
      <View>
        <Text className={" font-pbold text-2xl " + textStyles}>{title}</Text>
        <Text
          className={textStyles + " font-bold text-sm px-1 -mt-2"}
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
};

export default InfoBox;
