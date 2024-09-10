import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/profile-header";
import { useSelector } from "react-redux";
import InfoBox from "../../components/info-box";
import FinanceTransactionCard from "../../components/finance-transaction-card";
import { router } from "expo-router";
import useFetchObject from "../../lib/hooks/use-fetch-objects";
import { getTransactions } from "../../lib/api/finance";

const finance = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token.token);
  const [net, setNet] = useState({
    earning: 0,
    expanse: 0,
  });
  const {
    data: transactions,
    refetch,
    isLoading,
  } = useFetchObject(() => {
    const res = getTransactions(token);
    return res;
  });
  const [activeTransactionType, setActiveTransactionType] = useState("earning");
  const transactionType = {
    earning: "Earnings",
    expanse: "Expanse",
  };

  useEffect(() => {
    if (transactions) {
      const earning = transactions?.earning?.reduce(
        (acc, curr) => acc + curr.amount,
        0
      );
      const expanse = transactions?.expanse?.reduce(
        (acc, curr) => acc + curr.amount,
        0
      );

      setNet({ earning, expanse });
    }
  }, [transactions, user]);
  return (
    <SafeAreaView className="h-full bg-primary p-4">
      <ProfileHeader />
      <Text className="text-gray-100 text-2xl font-psemibold mt-4">
        Financial Overview
      </Text>
      <View className="flex-row items-center justify-between my-4">
        <InfoBox
          title={net.earning + " rs"}
          subtitle="Earnings"
          textStyles="text-white text-center"
          containerColor="bg-secondary-100 flex-[0.5] mr-4"
        />
        <InfoBox
          title={net.expanse + " rs"}
          subtitle="Expanse"
          textStyles="text-white text-center"
          containerColor="bg-red-400 flex-[0.5]"
        />
      </View>

      <InfoBox
        title={net.earning - net.expanse + " rs"}
        subtitle="Net Balance"
        textStyles="text-white text-center"
        containerColor="bg-green-400"
      />

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

        <TouchableOpacity
          className="bg-secondary-100 py-2 px-4 rounded-sm "
          onPress={() => {
            router.push(`/add-transaction/${activeTransactionType}`);
          }}
        >
          <Text className="text-white text-sm font-psemibold">
            Add Transaction
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mt-4">
        {transactions[activeTransactionType]?.map((transaction, index) => (
          <View key={index} className="my-1">
            <FinanceTransactionCard transaction={transaction} />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default finance;
