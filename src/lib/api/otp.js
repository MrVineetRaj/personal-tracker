import axios from "axios";
import { API_URL } from "@env";

const sendOtp = async (data) => {
  const response = await axios.post(
    `https://personal-guide-backend.onrender.com/otp/send-otp`,
    data
  );
  return response.data;
};

const verifyOtp = async (data) => {
  try {
    const response = await axios.delete(
      `https://personal-guide-backend.onrender.com/otp/verify-otp?email=${data.email}&otp=${data.otp}`,
      data
    );

    return response.data;
  } catch (e) {
    return e.response.data;
  }
};

export { sendOtp, verifyOtp };
