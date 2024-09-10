import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Tag from "../tag";
import { router } from "expo-router";
const TodoListCard = ({ todo }) => {
  return (
    <TouchableOpacity
      className={
        (todo?.isCompleted ? "bg-secondary-100" : "bg-primary ") +
        " w-full p-4 my-1 flex-row justify-between rounded-md"
      }
      onPress={() => {
        router.push(`/todo/${todo?._id}`);
      }}
    >
      <View>
        <Text className="text-white font-pmedium">{todo?.title}</Text>
        <Text className="text-gray-100 font-pmedium text-sm">
          {todo?.dueDate?.split("T")[0]}
        </Text>
      </View>
      <View>
        <Tag tag={todo?.tag} />
      </View>
    </TouchableOpacity>
  );
};

export default TodoListCard;
