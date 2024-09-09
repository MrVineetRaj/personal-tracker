import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../components/profile-header";
import { useSelector } from "react-redux";
import FormField from "../components/ui/FormField";
import CustomButton from "../components/ui/CustomButton";

const EditProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [form, setForm] = useState({
    name: "",
    physical: {
      height: "",
      weight: "",
    },
  });

  useEffect(() => {
    setForm({
      name: user.name,
      physical: {
        height: user.physical.height,
        weight: user.physical.weight,
      },
    });
  }, [user]);

  return (
    <SafeAreaView className="bg-primary p-4 h-full">
      <ProfileHeader />

      <View className="mt-4">
        <FormField
          title="Name"
          value={form.name}
          handleChangeText={(e) => setForm({ ...form, name: e })}
        />

        <FormField
          title="Height"
          value={form.physical.height}
          handleChangeText={(e) =>
            setForm({
              ...form,
              physical: { ...form.physical, height: e },
            })
          }
        />

        <FormField
          title="Weight"
          value={form.physical.weight}
          handleChangeText={(e) =>
            setForm({
              ...form,
              physical: { ...form.physical, weight: e },
            })
          }
        />

        <CustomButton
          title="Save"
          containerStyles="py-4 w-full mt-4"
          textStyles="text-lg font-psemibold text-white"
          handlePress={() => console.log(form)}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditProfilePage;
