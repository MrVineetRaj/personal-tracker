import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/ui/FormField";
import CustomButton from "../../components/ui/CustomButton";
import { router } from "expo-router";

const SignIn = () => {
  return (
    <SafeAreaView className="bg-primary h-full justify-center px-4">
      <Text className="text-white text-4xl font-pbold">Sign in</Text>
      <FormField
        title="Email"
        placeholder="Enter your email"
        value=""
        handleTextChange={() => {}}
        textStyles="text-white"
        containerStyles="mt-4"
      />
      <FormField
        title="Password"
        placeholder="Enter your email"
        value=""
        handleTextChange={() => {}}
        textStyles="text-white"
        containerStyles="mt-4"
      />

      <Text className="text-white text-right mt-4">Forgot Password ?</Text>
      <CustomButton
        title="Sign in"
        handlePress={() => {}}
        containerStyles="mt-4"
        textStyles="text-lg text-white font-pbold"
      />
      <Text className="text-white text-center mt-4">
        Don't have an account ?{" "}
        <Text
          className="text-secondary-100 font-pbold"
          onPress={() => {
            router.push("/sign-up");
          }}
        >
          Sign up
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default SignIn;
