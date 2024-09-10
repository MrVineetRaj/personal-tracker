import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

import DateTimePicker from "@react-native-community/datetimepicker";

import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/profile-header";
import FormField from "../../components/ui/FormField";
import { icons } from "../../constants";
import CustomButton from "../../components/ui/CustomButton";
import { useSelector } from "react-redux";
import { createTodo } from "../../lib/api/todo";
import { router } from "expo-router";
const AddTodo = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tag: "",
    dueDate: "",
  });
  const token = useSelector((state) => state.token.token);

  useEffect(() => {
    const currentDate = new Date();

    setForm({
      ...form,
      dueDate: currentDate,
    });
  }, []);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [addingTodo, setAddingTodo] = useState(false);

  const handleAddTodo = async () => {
    const res = await createTodo(token, form);
    
    if (res.status === 200) {
      Alert.alert("Todo added successfully");
      setForm({
        title: "",
        description: "",
        tag: "",
        dueDate: "",
      });

      router.push("/todo");
    }
  };

  return (
    <ScrollView className="bg-primary h-full p-4">
      <ProfileHeader />
      <Text className="text-gray-100 font-psemibold  text-3xl my-3 ">
        Todo Details
      </Text>

      <View>
        <FormField
          title="Title"
          placeholder="Enter title"
          containerStyles="mt-7"
          handleChangeText={(text) => {
            setForm({
              ...form,
              title: text,
            });
          }}
        />
        <View className=" mt-2">
          <Text className="text-white font-psemibold text-sm">Due Date</Text>
          <TouchableOpacity
            className="flex-row px-4 justify-between items-center mt-2  w-full border py-4 rounded-md border-gray-800 bg-secondary"
            onPress={() => {
              setShowDatePicker(true);
            }}
          >
            <Text className="text-white font-semibold text-base">
              {form.dueDate.toString()}
            </Text>
            <Image
              source={icons.calendar}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={form.dueDate}
              mode="date" // "date" for date picker, "time" for time picker
              display="default" // Display mode can be "default", "spinner", "calendar" (Android)
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                
                setForm({
                  ...form,
                  dueDate: selectedDate,
                });
              }}
            />
          )}
        </View>
        <FormField
          title="Description"
          placeholder="Enter description"
          containerStyles="mt-2"
          handleChangeText={(text) => {
            setForm({
              ...form,
              description: text,
            });
          }}
        />
        <FormField
          title="Todo Tag"
          placeholder="Enter todo tag"
          containerStyles="mt-2"
          handleChangeText={(text) => {
            setForm({
              ...form,
              tag: text,
            });
          }}
        />

        <CustomButton
          title="Add Todo"
          containerStyles="mt-5 py-4"
          textStyles="text-white font-pmedium text-base"
          isLoading={addingTodo}
          handlePress={() => {
            handleAddTodo();
          }}
        />
      </View>
    </ScrollView>
  );
};

export default AddTodo;
