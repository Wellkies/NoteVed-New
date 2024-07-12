import { GET_CHILD_DETAILS_URL } from "../../../constants/ApiPaths";
import axios from "axios";
import AsyncStorage from "../../utils/AsyncStorage";

export const getChildDetailsAPIAction = async (id: any) => {
  const url = GET_CHILD_DETAILS_URL + id;
  console.log(url, "GET_CHILD_DETAILS_URL...........................");
  const token = await AsyncStorage.getObject('@auth_Token');
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
    },
    //   body: JSON.stringify(phone),
  };
  try {
    const response = await axios.get(url, requestOptions);
    if (!response.status) {
      throw new Error("Network response was not ok");
    }
    const Data = await response.data;
    console.log(Data, "GET_CHILD_DETAILS_URL_data................");
    return { data: Data.user[0] };
  } catch (error) {
    console.log(error, "GET_CHILD_DETAILS_URL_error.......");
    throw error;
  }
};
