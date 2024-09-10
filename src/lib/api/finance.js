import axios from "axios";
import { API_URL } from "@env";
import { Alert } from "react-native";

const addTransaction = async (token, transaction) => {
  console.log("Transaction => ", transaction);
  const response = await axios.post(
    `${API_URL}/finance/add-transaction?token=${token}`,
    transaction
  );
  return response.data;
};

const getTransactions = async (token) => {
  const response = await axios.get(
    `${API_URL}/finance/get-transactions?token=${token}`
  );

  if (response.data.status !== 200) {
    Alert.alert("Error", response.data.message);
  }
  return response.data.data;
};

const deleteTransaction = async (token, id) => {
  const response = await axios.delete(
    `${API_URL}/finance/delete-transaction?token=${token}&id=${id}`
  );
  return response.data;
};

const updateTransaction = async (token, id, transaction) => {
  const response = await axios.put(
    `${API_URL}/finance/update-transaction?token=${token}&id=${id}`,
    transaction
  );
  return response.data;
};

export {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
};
