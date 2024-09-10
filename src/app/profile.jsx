import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-chart-kit";

import { useDispatch, useSelector } from "react-redux";
import { images, icons } from "../constants";
import InfoBox from "../components/info-box";
import { router } from "expo-router";
import { data_for_profile_graph } from "../lib/utility/data_for_graph";
import UpdatePhysicalAttribute from "../components/profile/update-physical-atrribute";
import { removeToken } from "../lib/jwt-token";
import { setToken } from "../lib/slices/tokenSlice";
import { setUser } from "../lib/slices/userSlice";
import { logOut } from "../lib/api/user";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token.token);
  const dispatch = useDispatch();
  const [graphData, setGraphData] = useState({});
  const [bmi, setBmi] = useState(0);
  const [loading, setLoading] = useState(false);
  const [updatingPhysical, setUpdatingPhysical] = useState({
    isOpen: false,
    attribute: "",
  });
  useEffect(() => {
    const weight = parseInt(
      user?.physical?.weight[user?.physical?.weight.length - 1]?.value?.split(
        " "
      )[0]
    );
    const height = parseFloat(
      user?.physical?.height[user?.physical?.height.length - 1]?.value?.split(
        " "
      )[0] / 100
    );

    if (!isNaN(weight) && !isNaN(height) && height !== 0) {
      const bmi = (weight / height ** 2).toFixed(3);
      setBmi(parseFloat(bmi));
    } else {
      setBmi(0); // Handle invalid or missing data
    }

    const data = data_for_profile_graph(
      user?.physical?.weight,
      user?.physical?.height
    );

    console.log(data?.height_dataset?.data);
    const tempGraphData = {
      weight: {
        labels: data?.weight_dataset?.label,
        datasets: [
          {
            data: data?.weight_dataset?.data,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          },
        ],
        legend: ["Weight over time"], // optional
      },
      height: {
        labels: data?.height_dataset?.label,
        datasets: [
          {
            data: data?.height_dataset?.data,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          },
        ],
        legend: ["Height over time"], // optional
      },
    };

    setGraphData(tempGraphData);
  }, [user]);

  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const handleLogout = async () => {
    setLoading(true);
    const res = await logOut(token);

    if (res.status === 200) {
      dispatch(setUser({}));
      dispatch(setToken(""));
      await removeToken();
      Alert.alert("Success", res.message);
      setLoading(false);
      router.replace("/sign-in");
      return;
    }

    setLoading(false);
    Alert.alert("Error", res.message);
  };

  return (
    <SafeAreaView className="bg-primary h-full p-4">
      <ScrollView className="h-full ">
        <View className="flex-row justify-between items-start">
          <Text className="text-white text-2xl font-psemibold">
            Personal Tracker
          </Text>

          <TouchableOpacity
            onPress={() => {
              handleLogout();
            }}
          >
            <Image
              source={icons.logout}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between items-center">
          <View className="w-16 h-16 rounded-full overflow-hidden my-4">
            {user?.avatar ? (
              <Image source={{ uri: user?.avatar }} />
            ) : (
              <Image
                source={images.profile}
                resizeMode="contain"
                className="w-16 h-16"
              />
            )}
          </View>
          <Text
            className="text-gray-100 font-pmedium"
            onPress={() => {
              router.push("/edit-profile");
            }}
          >
            Edit Profile
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-white font-psemibold text-base">
              {user?.name}
            </Text>
            <Text className="text-gray-100 font-pmedium  ">{user?.email}</Text>
          </View>
        </View>

        <View className="flex-row w-full mt-4 ">
          <TouchableOpacity
            className="flex-[0.5] mr-4 "
            onPress={() => {
              setUpdatingPhysical({
                isOpen: !updatingPhysical.isOpen,
                attribute: "height",
              });
            }}
          >
            <InfoBox
              title={`${
                user?.physical?.height[user?.physical?.height.length - 1]?.value
              }`}
              // title="180 cm"
              containerColor="bg-green-400"
              subtitle="Height"
              textStyles="text-black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-[0.5]"
            onPress={() => {
              setUpdatingPhysical({
                isOpen: !updatingPhysical.isOpen,
                attribute: "weight",
              });
            }}
          >
            <InfoBox
              title={`${
                user?.physical?.weight[user?.physical?.weight.length - 1]?.value
              }`}
              // title="70 kg"
              containerColor="bg-secondary-100"
              subtitle="Weight"
            />
          </TouchableOpacity>

          {updatingPhysical.isOpen && (
            <UpdatePhysicalAttribute
              attribute={updatingPhysical.attribute}
              setUpdatingPhysical={setUpdatingPhysical}
            />
          )}
        </View>
        <InfoBox
          title={bmi}
          containerColor="bg-red-400 mt-4 static -z-50"
          subtitle="BMI"
          textStyles="text-black text-center"
        />
        <InfoBox
          title={user?.financial?.earning - user?.financial?.expanse}
          containerColor="bg-yellow-400  mt-4 static -z-50"
          subtitle="Nt worth"
          textStyles="text-black text-center"
        />

        <View className="static -z-50 mt-4">
          {graphData?.weight?.datasets[0]?.data?.length > 1 && (
            <LineChart
              data={graphData.weight}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          )}
          {graphData?.height?.datasets[0]?.data?.length > 1 && (
            <LineChart
              data={graphData.height}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;
