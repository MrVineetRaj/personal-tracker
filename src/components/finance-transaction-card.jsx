import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const FinanceTransactionCard = ({ transaction, handlePress =()=>{} }) => {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between w-full"
      onPress={() => {
        handlePress(transaction);
      }}
    >
      <View>
        <Text className="text-white font-psemibold text-base">
          {transaction.reason}
        </Text>
        <Text className="text-gray-100 font-pregular">{transaction?.date}</Text>
      </View>

      <Text className="text-white font-psemibold text-lg">
        {transaction.amount} rs
      </Text>
    </TouchableOpacity>
  );
};

export default FinanceTransactionCard;
