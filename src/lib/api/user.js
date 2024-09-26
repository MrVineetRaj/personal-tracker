import axios from "axios";
import { API_URL } from "@env";
import { storeToken } from "../jwt-token";

const signUp = async (data) => {
  const response = await axios.post(
    `https://personal-guide-backend.onrender.com/user/create-user`,
    data
  );

  if (response.data.status === 200) {
    storeToken(response.data.token);
  }

  return response.data;
};

const getUser = async (token) => {
  const response = await axios.get(
    `https://personal-guide-backend.onrender.com/user/get-user?token=${token}`
  );

  return response.data;
};

const updateUserPhysical = async (data, token) => {
  const response = await axios.put(
    `https://personal-guide-backend.onrender.com/user/update-physical-details?token=${token}`,
    data
  );

  return response.data;
};

const signIn = async (data) => {
  const response = await axios.post(
    `https://personal-guide-backend.onrender.com/user/sign-in`,
    data
  );

  if (response.data.status === 200) {
    storeToken(response.data.token);
  }

  return response.data;
};

const logOut = async (token) => {
  const response = await axios.delete(
    `https://personal-guide-backend.onrender.com/user/log-out?token=${token}`
  );

  return response.data;
};

export { signUp, getUser, updateUserPhysical, signIn, logOut };
