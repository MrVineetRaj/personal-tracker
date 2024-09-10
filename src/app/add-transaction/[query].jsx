import { View, Text, Alert, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/profile-header";
import FormField from "../../components/ui/FormField";
import { router, useLocalSearchParams } from "expo-router";
import { addTransaction } from "../../lib/api/finance";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/ui/CustomButton";
import FinanceTransactionCard from "../../components/finance-transaction-card";
import { setUser } from "../../lib/slices/userSlice";

const AddTransaction = () => {
  const { query } = useLocalSearchParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  const user = useSelector((state) => state.user);
  const [transaction, setTransaction] = useState({
    amount: 0,
    reason: "",
  });
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(user.recent_finance);

  const handleAcceptSuggestions = (meal) => {
    setTransaction({
      ...transaction,
      amount: meal.amount,
      reason: meal.reason,
    });
  };

  const handleAddTransaction = async () => {
    setLoading(true);
    const currentDate = new Date().toISOString().split("T")[0];

    const newTransaction = {
      ...transaction,
      date: currentDate,
      transactionType: query,
    };

    const res = await addTransaction(token, newTransaction);
    if (res.status === 200) {
      Alert.alert("Transaction added successfully");
      dispatch(setUser(res.data));
      router.push("/finance");
      setLoading(false);
      return;
    }

    setLoading(false);
    Alert.alert("Error", res.message);
  };
  return (
    <SafeAreaView className="bg-primary p-4 h-full">
      <ProfileHeader />
      <Text className="text-gray-100 font-pbold text-3xl mt-4">
        Add Transaction
      </Text>
      <Text className="text-gray-100 font-pbold text-base">for {query}</Text>

      <View className="mt-8">
        <FormField
          title="Reason"
          value={transaction.reason}
          placeholder="Enter Reason"
          handleChangeText={(value) => {
            setTransaction({ ...transaction, reason: value });

            const tempSuggestions = user.recent_finance.filter((transaction) =>
              transaction.reason.includes(transaction.reason)
            );
            setSuggestions(tempSuggestions);
          }}
        />

        <FormField
          title="Amount"
          value={transaction.amount}
          placeholder="Enter Amount"
          handleChangeText={(value) =>
            setTransaction({ ...transaction, amount: value })
          }
        />

        <CustomButton
          title="Add Transaction"
          handlePress={handleAddTransaction}
          isLoading={loading}
          containerStyles="py-4 mt-4"
          textStyles="text-white font-psemibold text-xl"
        />
      </View>
      <ScrollView className="bg-primary w-full mt-4">
        {suggestions.map((transaction, index) => (
          <View key={index}>
            <FinanceTransactionCard
              transaction={transaction}
              handlePress={handleAcceptSuggestions}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddTransaction;
