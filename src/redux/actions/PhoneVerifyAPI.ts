import { CHILD_PHONE_NUM_VERIFY_URL } from "../../../constants/ApiPaths";
import AsyncStorage from "../../utils/AsyncStorage";

export const VerifyPhoneNumActionAPI = async (data = {}) => {
  const url = CHILD_PHONE_NUM_VERIFY_URL + data;
  console.log(url, "========CHILD_PHONE_NUM_VERIFY_URL===============", data, "=======data");
  const token = await AsyncStorage.getObject("@auth_Token");
  //   console.log(token, "?????????????????????token..............");

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    //   body: JSON.stringify(phone),
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const Data = await response.json();
    console.log(Data, "CHILD_PHONE_NUM_VERIFY_URL_response................");
    return { data: Data };
  } catch (error) {
    console.log(error, "CHILD_PHONE_NUM_VERIFY_URL_error.......");
    throw error;
  }
};