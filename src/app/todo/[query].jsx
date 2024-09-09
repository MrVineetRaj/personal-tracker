import {
  View,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchOneTodo, updateTodo } from "../../lib/api/todo";
import { useSelector } from "react-redux";
import Tag from "../../components/tag";
import ProfileHeader from "../../components/profile-header";
import FormField from "../../components/ui/FormField";
import DateTimePicker from "@react-native-community/datetimepicker";
import { icons } from "../../constants";
import CustomButton from "../../components/ui/CustomButton";
const TodoPage = () => {
  const token = useSelector((state) => state.token.token);
  const { query } = useLocalSearchParams();
  const [todo, setTodo] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [savingTodo, setSavingTodo] = useState(false);

  useEffect(() => {
    fetchOneTodo(token, query).then((res) => {
      // console.log(res);

      if (res.status === 200) {
        const todoData = res.todo;
        // Convert date string to Date object
        if (todoData.dueDate) {
          todoData.dueDate = new Date(todoData.dueDate);
        }
        setTodo(todoData);
        return;
      }
      Alert.alert("Error", res.message);
    });
  }, [query]);

  const handleUpdateTodo = () => {
    setSavingTodo(true);

    updateTodo(token, todo, query).then((res) => {
      setSavingTodo(false);
      if (res.status === 200) {
        setTodo(res.todo);
        Alert.alert("Success", "Todo updated successfully");
        router.replace("/todo");
        setIsUpdating(false);
        return;
      }

      setIsUpdating(false);
      Alert.alert("Error", res.message);
    });
  };

  console.log(query);
  return (
    <SafeAreaView className="bg-primary h-full p-4">
      <ProfileHeader />
      {!isUpdating && (
        <View>
          <View className="flex-col items-start justify-start mt-8">
            <Text className="text-white text-2xl font-pbold mb-2">
              {todo?.title}
            </Text>
            <View className="flex-row justify-between items-center w-full">
              <Tag tag={todo?.tag} />
              <Text
                className="text-white text-base font-pmedium"
                onPress={() => setIsUpdating(true)}
              >
                Edit
              </Text>
            </View>
          </View>
          <View className="mt-4">
            <Text className="text-gray-100 text-sm font-pmedium">
              {todo?.dueDate?.toString().split("T")[0] ||
                `T${todo?.dueDate.toString().split("T")[1]}`}
            </Text>
            <Text className="text-gray-100 text-base font-pmedium mt-8">
              {todo?.description}
            </Text>
          </View>
        </View>
      )}

      {isUpdating && (
        <View>
          <ScrollView className="bg-primary h-full p-4">
            <Text className="text-gray-100 font-psemibold  text-3xl my-3 ">
              Edit Todo
            </Text>
            <View>
              <FormField
                title="Title"
                placeholder="Enter title"
                value={todo?.title}
                containerStyles="mt-7"
                handleChangeText={(text) => {
                  setTodo({
                    ...todo,
                    title: text,
                  });
                }}
              />
              <View className=" mt-2">
                <Text className="text-white font-psemibold text-sm">
                  Due Date
                </Text>
                <TouchableOpacity
                  className="flex-row px-4 justify-between items-center mt-2  w-full border py-4 rounded-md border-gray-800 bg-secondary"
                  onPress={() => {
                    setShowDatePicker(true);
                  }}
                >
                  <Text className="text-white font-semibold text-base">
                    {todo?.dueDate.toString().split("T")[0] ||
                      `T${todo?.dueDate.toString().split("T")[1]}`}
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
                    value={todo.dueDate}
                    mode="date" // "date" for date picker, "time" for time picker
                    display="default" // Display mode can be "default", "spinner", "calendar" (Android)
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      console.log(selectedDate);
                      setTodo({
                        ...todo,
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
                value={todo?.description}
                handleChangeText={(text) => {
                  setTodo({
                    ...todo,
                    description: text,
                  });
                }}
              />
              <FormField
                title="Todo Tag"
                placeholder="Enter todo tag"
                containerStyles="mt-2"
                value={todo?.tag}
                handleChangeText={(text) => {
                  setTodo({
                    ...todo,
                    tag: text,
                  });
                }}
              />

              <CustomButton
                title="Add Todo"
                containerStyles="mt-5 py-4"
                textStyles="text-white font-pmedium text-base"
                isLoading={savingTodo}
                handlePress={() => {
                  handleUpdateTodo();
                }}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default TodoPage;
