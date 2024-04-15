import {
  GET_APP_NOTIFICATION_FCM_MESSAGE_URL,
  GET_APP_NOTIFICATION_URL,
  UPDATE_FCM_MESSAGE_URL,
} from "../../../constants/ApiPaths";
import { authorization } from "../../constant/Constants";
import AsyncStorage from "../../utils/AsyncStorage";

export const getNotificationActionAPI = async () => {
  const url = GET_APP_NOTIFICATION_URL;
  console.log(
    url,
    "GET_APP_NOTIFICATION_FCM_MESSAGE_URL======================="
  );
  const token = await AsyncStorage.getObject("@auth_Token");

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWY0Njk4MTE3MmZmNGQ5YmRjZTAwNSIsImlhdCI6MTcwMDExNjM3NiwiZXhwIjoxNzMxNjUyMzc2fQ.ZyEy3RRUPKwxUIU4BV0CEuCne-hDbW7fEztRUAVSqUI`,
    },
    //   body: JSON.stringify(phone),
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const Data = await response.json();
    console.log(
      Data,
      "GET_APP_NOTIFICATION_FCM_MESSAGE_URL_response................"
    );
    return { data: Data.data };
  } catch (error) {
    console.log(error, "GET_APP_NOTIFICATION_FCM_MESSAGE_URL_error.......");

    throw error;
  }
};

export const updateFCMmessage = async (bodydata: any, callBack: any) => {
  const url = UPDATE_FCM_MESSAGE_URL;
  console.log(url, "UPDATE_FCM_MESSAGE_URL...........................");
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
    body: JSON.stringify(bodydata),
  };

  try {
    // const response = await axios.post(url,bodydata, requestOptions);
    const response = await fetch(url, requestOptions);
    console.log(response, "UPDATE_FCM_MESSAGE_URL_response..........");
    // const Data = await response.data;
    const Data = await response.json();
    console.log(
      Data,
      "UPDATE_FCM_MESSAGE_URL_response_JSONData........................"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    if (response.ok) {
      if (callBack) callBack();
      return { data: Data };
    }
  } catch (error) {
    console.log(error, "UPDATE_FCM_MESSAGE_URL_error.......");
    throw error;
  }
};
