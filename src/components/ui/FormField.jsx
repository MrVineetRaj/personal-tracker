import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "../../constants";

const FormField = ({
  title = "",
  placeholder = "",
  value = "",
  handleChangeText = () => {},
  textStyles = "",
  containerStyles = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <View className={containerStyles}>
      <Text className="text-white font-psemibold text-sm">{title}</Text>
      <View className="border-2 border-black-200  bg-secondary w-full h-16 rounded-2xl  focus:border-secondary-100 items-center flex-row px-4">
        
        <TextInput
          className="flex-1 text-white font-semibold text-base "
          placeholder={placeholder}
          defaultValue={value}
          onChangeText={(text) => {
            handleChangeText(text);
          }}
          placeholderTextColor="#7b7b8b"
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
