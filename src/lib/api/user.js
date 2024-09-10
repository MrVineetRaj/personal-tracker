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

  
  // console.log("From get user => ", response.data);
  return response.data;
};

export { signUp, getUser };
