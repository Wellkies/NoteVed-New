import { LOGIN_CHILD_OTP_VERIFY_URL } from "../../../constants/ApiPaths";

export const OTPLoginAction = async (phone = {}) => {
  const url = LOGIN_CHILD_OTP_VERIFY_URL;
  console.log(url, "LOGIN_CHILD_OTP_VERIFY_URL...........................");
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

    console.log(data, "LOGIN_CHILD_OTP_VERIFY_URL_response................");
    return { data: data };
  } catch (error) {
    console.log(error, "LOGIN_CHILD_OTP_VERIFY_URL_error.......");

    throw error;
  }
};
