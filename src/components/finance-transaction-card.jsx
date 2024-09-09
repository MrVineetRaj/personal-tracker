import { View, Text } from "react-native";
import React from "react";

const FinanceTransactionCard = ({ transaction }) => {
  return (
    <View className="flex-row items-center justify-between w-full">
      <View>
        <Text className="text-white font-psemibold text-base">
          {transaction.title}
        </Text>
        <Text className="text-gray-100 font-pregular">{transaction.date}</Text>
      </View>

      <Text className="text-white font-psemibold text-lg">
        {transaction.amount} rs
      </Text>
    </View>
  );
};

export default FinanceTransactionCard;
