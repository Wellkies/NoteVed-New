import {
    GET_ALL_LICENSE_DETAILS,
  } from "../../../constants/ApiPaths";
  import AsyncStorage from "../../utils/AsyncStorage";

  export const getAllLicenseDetailsAPI = async () => {
    const url = GET_ALL_LICENSE_DETAILS;
    console.log(url, "@GET_ALL_LICENSE_DETAILS");
    const token = await AsyncStorage.getObject('@auth_Token');
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const Data = await response.json();
      console.log(Data, "GET_ALL_LICENSE_DETAILS_response................");
      return { data: Data.data };
    } catch (error) {
      console.log(error, "GET_ALL_LICENSE_DETAILS_error.......");
      throw error;
    }
  };