import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import ProfileHeader from "../../components/profile-header";
import CustomButton from "../../components/ui/CustomButton";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import useFetchArray from "../../lib/hooks/use-fetch-array";
import { fetchTodos } from "../../lib/api/todo";
import TodoListCard from "../../components/todo/TodoListCard";

const todo = () => {
  const token = useSelector((state) => state.token.token);
  const {
    data: todos,
    refetch,
    isLoading,
  } = useFetchArray(async () => {
    const res = await fetchTodos(token);
    return res;
  });

  useEffect(() => {
    refetch();
  }, []);

  
  return (
    <SafeAreaView className="h-full bg-primary p-4">
      <ProfileHeader />
      <FlatList
        data={todos}
        ListHeaderComponent={() => {
          return (
            <View className="flex-row justify-between items-center px-4 my-4">
              <Text className="text-gray-100 text-3xl font-psemibold">
                Todo
              </Text>
              <CustomButton
                title="Add Todo"
                containerStyles="py-3 px-10 "
                textStyles="text-white font-pmedium text-base"
                handlePress={() => {
                  router.push("/todo/add");
                }}
              />
            </View>
          );
        }}
        renderItem={({ item }) => <TodoListCard todo={item} />}
        ListEmptyComponent={() => {
          return (
            <View className="flex justify-center items-center">
              {/* <Image
                source={require("../../assets/empty.png")}
                className="w-60 h-60"
              /> */}
              <Text className="text-gray-100 font-pmedium text-lg mt-8">
                No todos found
              </Text>
            </View>
          );
        }}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            tintColor="#fff"
          />
        }
      />
    </SafeAreaView>
  );
};

export default todo;
