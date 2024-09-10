import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/ui/FormField";
import CustomButton from "../../components/ui/CustomButton";
import { router } from "expo-router";
import { signIn } from "../../lib/api/user";
import { useDispatch } from "react-redux";
import { setToken } from "../../lib/slices/tokenSlice";
import { setUser } from "../../lib/slices/userSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSignIn = async () => {
    setLoading(true);
    console.log("Sign in => ", form);

    const res = await signIn(form);

    if (res.status === 200) {
      dispatch(setToken(res.token));
      dispatch(setUser(res.user));
      setLoading(false);
      router.replace("/home");
      return;
    }

    setLoading(false);
    Alert.alert("Error", res.message);
  };

  return (
    <SafeAreaView className="bg-primary h-full justify-center px-4">
      <Text className="text-white text-4xl font-pbold">Sign in</Text>
      <FormField
        title="Email"
        placeholder="Enter your email"
        value=""
        handleChangeText={(text) => {
          setForm({ ...form, email: text });
        }}
        textStyles="text-white"
        containerStyles="mt-4"
      />
      <FormField
        title="Password"
        placeholder="Enter your email"
        value=""
        handleChangeText={(text) => {
          setForm({ ...form, password: text });
        }}
        textStyles="text-white"
        containerStyles="mt-4"
      />

      <Text className="text-white text-right mt-4">Forgot Password ?</Text>
      <CustomButton
        title="Sign in"
        handlePress={() => {
          handleSignIn();
        }}
        containerStyles="mt-4 py-4"
        textStyles="text-lg text-white font-pbold"
        isLoading={loading}
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
