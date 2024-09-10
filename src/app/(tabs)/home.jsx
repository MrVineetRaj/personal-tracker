import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/profile-header";
import { getToken } from "../../lib/jwt-token";

const home = () => {
  const token = getToken();

  return (
    <SafeAreaView className="bg-primary h-full p-4">
      <ProfileHeader />
    </SafeAreaView>
  );
};

export default home;
