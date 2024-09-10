import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/ui/FormField";
import CustomButton from "../../components/ui/CustomButton";
import { sendOtp, verifyOtp } from "../../lib/api/otp";
import { signUp } from "../../lib/api/user";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [sendingOtp, setSendingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSendOtp = async () => {
    
    setSendingOtp(true);

    const tempData = {
      email: form.email,
      name: form.name,
    };
    const res = await sendOtp(tempData);

    if (res.status === 200) {
      setOtpSent(true);
    }

    Alert.alert(res.message);
    setSendingOtp(false);
  };

  const handleVerifyOtp = async () => {
    setVerifyingOtp(true);

    const verifyOtpData = {
      email: form.email,
      otp: otp,
    };

    const res = await verifyOtp(verifyOtpData);
    
    
    if (res.status === 200) {
      handleSignUp();
      return;
    }

    Alert.alert("Error", res.message);
    setVerifyingOtp(false);
  };
  
  const handleSignUp = async () => {
    const res = await signUp(form);

    if (res.status === 200) {
      
      Alert.alert("Success", "User created successfully");
      return;
    }

    Alert.alert("Error", res.message);
  };
  return (
    <SafeAreaView className="bg-primary h-full justify-center px-4">
      <Text className="text-white text-4xl font-pbold">Sign Up</Text>

      {!otpSent && (
        <View className="justify-center">
          <FormField
            title="Name"
            placeholder="Enter your Name"
            value=""
            handleChangeText={(e) => {
              setForm({ ...form, name: e });
            }}
            textStyles="text-white"
            containerStyles="mt-4"
          />
          <FormField
            title="Email"
            placeholder="Enter your email"
            value=""
            handleChangeText={(e) => {
              setForm({ ...form, email: e });
            }}
            textStyles="text-white"
            containerStyles="mt-4"
          />
          <FormField
            title="Password"
            placeholder="Enter your email"
            value=""
            handleChangeText={(e) => {
              setForm({ ...form, password: e });
            }}
            textStyles="text-white"
            containerStyles="mt-4"
          />
          <CustomButton
            title="Send OTP"
            handlePress={() => {
              handleSendOtp();
            }}
            containerStyles="mt-4"
            textStyles="text-lg text-white font-pbold"
            isLoading={sendingOtp}
          />
        </View>
      )}

      {otpSent && (
        <View className="justify-center">
          <FormField
            title="OTP"
            placeholder="Enter OTP"
            value=""
            handleChangeText={(e) => {
              
              setOtp(e);
            }}
            textStyles="text-white"
            containerStyles="mt-4"
          />
          <CustomButton
            title="Verify OTP and Sign Up"
            handlePress={() => {
              handleVerifyOtp();
            }}
            containerStyles="mt-4"
            textStyles="text-lg text-white font-pbold"
            isLoading={verifyingOtp}
          />
        </View>
      )}
      <Text className="text-white text-center mt-4">
        Already have an account ?{" "}
        <Text className="text-secondary-100 font-pbold">Sign in</Text>
      </Text>
    </SafeAreaView>
  );
};

export default SignUp;
