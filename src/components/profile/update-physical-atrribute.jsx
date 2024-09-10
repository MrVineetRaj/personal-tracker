import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import FormField from "../ui/FormField";
import CustomButton from "../ui/CustomButton";
import { updateUserPhysical } from "../../lib/api/user";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../lib/slices/userSlice";

const UpdatePhysicalAttribute = ({ attribute, setUpdatingPhysical }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  const [updating, setUpdating] = useState(false);
  const [value, setValue] = useState("");

  const handleUpdate = async () => {
    setUpdating(true);
    const currentDate = new Date().toISOString().split("T")[0];
    console.log("Current Date => ", currentDate);

    const res = await updateUserPhysical(
      {
        [attribute]: { value: value, date: currentDate },
      },
      token
    );

    if (res.status === 200) {
      dispatch(setUser(res.data));
      Alert.alert("Success", `${attribute} updated successfully`);
      setUpdatingPhysical({ isOpen: false, attribute: "" });
      return;
    }

    Alert.alert("Error", `Failed to update ${attribute}`);
    setUpdating(false);
  };

  return (
    <View className="absolute bg-primary border-2 border-secondary-100 mt-20 z-50 w-full rounded-xl p-4">
      <Text className="text-white font-psemibold text-lg text-center">
        Update {attribute}
      </Text>

      <FormField
        title={attribute}
        placeholder={`Enter your ${attribute} in ${
          attribute === "height" ? "cm" : "kg"
        }`}
        handleChangeText={(text) => {
          setValue(text);
        }}
      />

      <View className="flex-row w-full mt-4">
        <CustomButton
          title="Cancel"
          handlePress={() => {
            setUpdatingPhysical({ isOpen: false, attribute: "" });
          }}
          containerStyles="py-4 bg-red-400 flex-[0.5] mr-4"
          textStyles="font-psemibold text-lg text-white"
        />
        <CustomButton
          title="Update"
          handlePress={() => {
            handleUpdate();
          }}
          containerStyles="py-4 flex-[0.5] "
          textStyles="font-psemibold text-lg text-white"
          isLoading={updating}
        />
      </View>
    </View>
  );
};

export default UpdatePhysicalAttribute;
