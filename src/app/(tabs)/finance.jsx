import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/profile-header";
import { useSelector } from "react-redux";
import InfoBox from "../../components/info-box";
import FinanceTransactionCard from "../../components/finance-transaction-card";

const finance = () => {
  const user = useSelector((state) => state.user);
  const [activeTransactionType, setActiveTransactionType] = useState("earning");
  const transactionType = {
    earning: "Earnings",
    expanse: "Expanse",
  };

  const [transactions, setTransactions] = useState({
    earning: [
      {
        title: "Freelancing",
        amount: 5000,
        date: "12-12-2021",
      },
      {
        title: "Salary",
        amount: 50000,
        date: "12-12-2021",
      },
    ],
    expanse: [
      {
        title: "Parents",
        amount: 15000,
        date: "12-12-2021",
      },
      {
        title: "EMI",
        amount: 5000,
        date: "12-12-2021",
      },
      {
        title: "GF",
        amount: 5000,
        date: "12-12-2021",
      },
    ],
  });
  return (
    <SafeAreaView className="h-full bg-primary p-4">
      <ProfileHeader />
      <Text className="text-gray-100 text-2xl font-psemibold mt-4">
        Financial Overview
      </Text>
      <View className="flex-row items-center justify-between my-4">
        <InfoBox
          title={user.financial.earning + " rs"}
          subtitle="Earnings"
          textStyles="text-white text-center"
          containerColor="bg-secondary-100 flex-[0.5] mr-4"
        />
        <InfoBox
          title={user.financial.expanse + " rs"}
          subtitle="Expanse"
          textStyles="text-white text-center"
          containerColor="bg-red-400 flex-[0.5]"
        />
      </View>

      <View className="flex-row items-center justify-around mt-4">
        {Object.keys(transactionType).map((type) => (
          <Text
            key={type}
            onPress={() => setActiveTransactionType(type)}
            className={`text-white text-base font-psemibold ${
              activeTransactionType === type ? "text-secondary-100" : ""
            }`}
          >
            {transactionType[type]}
          </Text>
        ))}
      </View>

      <View className="mt-4 flex-row  items-center justify-between">
        <Text className="text-gray-100 text-lg font-psemibold">
          {transactionType[activeTransactionType]}
        </Text>

        <TouchableOpacity className="bg-secondary-100 py-2 px-4 rounded-sm ">
          <Text className="text-white text-sm font-psemibold">
            Add Transaction
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mt-4">
        {transactions[activeTransactionType].map((transaction, index) => (
          <View
            key={index}
            className="my-1"
          >
            <FinanceTransactionCard transaction={transaction} />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default finance;
