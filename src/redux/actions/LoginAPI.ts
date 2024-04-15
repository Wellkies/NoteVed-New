import {
  LOGIN_CHILD_OTP_VERIFY_URL,
  LOGIN_SEND_OTP_URL,
} from "../../../constants/ApiPaths";
import AsyncStorage from "../../utils/AsyncStorage";

export const loginOtp = async (bodydata: any, callBack: any) => {
  const url = LOGIN_SEND_OTP_URL;
  console.log(url, "LOGIN_SEND_OTP_URL...........................");
  const token = await AsyncStorage.getObject("@auth_Token");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodydata),
  };

  try {
    // const response = await axios.post(url,bodydata, requestOptions);
    const response = await fetch(url, requestOptions);

    console.log(response, "LOGIN_SEND_OTP_URL.........response..........");
    // const Data = await response.data;
    const Data = await response.json();

    console.log(Data, "Data........................");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    if (response.ok) {
      if (callBack) callBack();
      return { data: Data };
    }
  } catch (error) {
    console.log(error, "LOGIN_SEND_OTP_URL.....error.......");

    throw error;
  }
};

export const LoginOtpVerifyAPI = async (bodydata: any, callBack: any) => {
  const url = LOGIN_CHILD_OTP_VERIFY_URL;
  console.log(url, "LOGIN_CHILD_OTP_VERIFY_URL...........................");
  const token = await AsyncStorage.getObject("@auth_Token");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodydata),
  };

  try {
    const response = await fetch(url, requestOptions);
    console.log(response, "LOGIN_CHILD_OTP_VERIFY_URL_response..........");
    // const Data = await response.data;
    const Data = await response.json();
    console.log(Data, "Data........................");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    if (response.ok) {
      if (callBack) callBack();
      return { data: Data };
    }
  } catch (error) {
    console.log(error, "LOGIN_CHILD_OTP_VERIFY_URL_error.......");
    throw error;
  }
};
