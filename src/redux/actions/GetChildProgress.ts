import { GET_CHILD_PROGRESS_URL } from "../../../constants/ApiPaths";
import AsyncStorage from "../../utils/AsyncStorage";

export const getChildProgressAction = async (data = {}) => {
  const url =
    GET_CHILD_PROGRESS_URL  +
    data.stageid +
    '/' +
    data.boardid +
    '/' +
    data.scholarshipid +
    '/' +
    data.childid;

  console.log(url, "====GET_CHILD_PROGRESS_URL_URL==========", data,"=============data");
  const token = await AsyncStorage.getObject("@auth_Token");
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
    } else {
      const Data = await response.json();

      console.log(
        Data.data,
        "====GET_CHILD_PROGRESS_URL_response................"
      );
      return { data: Data.data };
    }
  } catch (error) {
    console.log(error, "_______GET_CHILD_PROGRESS_URL_error.......");

    throw error;
  }
};
