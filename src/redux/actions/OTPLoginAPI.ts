import { LOGIN_SEND_OTP_URL } from "../../../constants/ApiPaths";

export const OTPLoginAction = async (phone = {}) => {
  const url = LOGIN_SEND_OTP_URL;
  console.log(url, "LOGIN_SEND_OTP_URL...........................");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(phone),
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    console.log(data, "LOGIN_SEND_OTP_URL_response................");
    return { data: data };
  } catch (error) {
    console.log(error, "LOGIN_SEND_OTP_URL_error.......");

    throw error;
  }
};
