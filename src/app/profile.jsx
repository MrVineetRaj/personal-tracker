import { View, Text, Image, Dimensions, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-chart-kit";

import { useSelector } from "react-redux";
import { images } from "../constants";
import InfoBox from "../components/info-box";
import { router } from "expo-router";
import { data_for_profile_graph } from "../lib/utility/data_for_graph";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [graphData, setGraphData] = useState({});
  const [bmi, setBmi] = useState(0);

  const [updatingPhysical, setUpdatingPhysical] = useState({
    value: true,
    attribute: "weight",
  });
  useEffect(() => {
    const weight = parseInt(
      user?.physical?.weight[user?.physical?.weight.length - 1].value.split(
        " "
      )[0]
    );
    const height = parseFloat(
      user?.physical?.height[user?.physical?.height.length - 1].value.split(
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

  // console.log(user);
  return (
    <SafeAreaView className="bg-primary h-full p-4">
      <ScrollView>
        <View className="flex-row justify-between items-start">
          <Text className="text-white text-2xl font-psemibold">
            Personal Tracker
          </Text>
          <View className="w-16 h-16 rounded-full overflow-hidden">
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
        </View>
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-white font-psemibold text-base">
              {user?.name}
            </Text>
            <Text className="text-gray-100 font-pmedium  ">{user?.email}</Text>
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

        <View className="flex-row w-full mt-4">
          <InfoBox
            title={`${
              user?.physical?.height[user?.physical?.height.length - 1].value
            }`}
            // title="180 cm"
            containerColor="bg-green-400 flex-[0.5] mr-4"
            subtitle="Height"
            textStyles="text-black"
          />
          <InfoBox
            title={`${
              user?.physical?.weight[user?.physical?.weight.length - 1].value
            }`}
            // title="70 kg"
            containerColor="bg-secondary-100 flex-[0.5]"
            subtitle="Weight"
          />
        </View>
        <InfoBox
          title={bmi}
          containerColor="bg-red-400  mt-4"
          subtitle="BMI"
          textStyles="text-black text-center"
        />
        <InfoBox
          title={user?.financial?.earning - user?.financial?.expanse}
          containerColor="bg-yellow-400  mt-4"
          subtitle="Nt worth"
          textStyles="text-black text-center"
        />

        {graphData?.weight && (
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
        {graphData?.height && (
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;
