import axios from "axios";
import { API_URL } from "@env";
import { storeToken } from "../jwt-token";

const signUp = async (data) => {
  const response = await axios.post(`${API_URL}/user/create-user`, data);

  if (response.data.status === 200) {
    storeToken(response.data.token);
  }

  return response.data;
};

const getUser = async (token) => {
  const response = await axios.get(`${API_URL}/user/get-user?token=${token}`);

  console.log("From get user => ", response.data);
  return response.data;
};

const updateUserPhysical = async (data, token) => {
  const response = await axios.put(
    `${API_URL}/user/update-physical-details?token=${token}`,
    data
  );
  console.log("user from update attribute => ", response.data);
  return response.data;
};

const signIn = async (data) => {
  const response = await axios.post(`${API_URL}/user/sign-in`, data);

  if (response.data.status === 200) {
    storeToken(response.data.token);
  }

  return response.data;
};

const logOut = async (token) => {
  console.log("From logout => ", token);
  const response = await axios.delete(`${API_URL}/user/log-out?token=${token}`);
  console.log("From logout => ", response.data);
  return response.data;
};

export { signUp, getUser, updateUserPhysical, signIn, logOut };
