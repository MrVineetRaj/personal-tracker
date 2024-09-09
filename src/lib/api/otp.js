import axios from "axios";
import { API_URL } from "@env";

const sendOtp = async (data) => {
  const response = await axios.post(`${API_URL}/otp/send-otp`, data);
  return response.data;
};

const verifyOtp = async (data) => {
  console.log("From verifyOtp => ", data);

  try {
    const response = await axios.delete(
      `${API_URL}/otp/verify-otp?email=${data.email}&otp=${data.otp}`,
      data
    );
    console.log("From verifyOtp response => ", response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};

export { sendOtp, verifyOtp };
