import {
    EDZ_GET_ALL_MEMBERSHIP,
  } from "../../../constants/ApiPaths";
  import AsyncStorage from "../../utils/AsyncStorage";

  export const getAllMembershipAPI = async () => {
    const url = EDZ_GET_ALL_MEMBERSHIP;
    console.log(url, "$$$$$$$$$$$$$$$$$$$$$$EDZ_GET_ALL_MEMBERSHIP=======================");
    const token = await AsyncStorage.getObject("@auth_Token");
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
      console.log(Data, "EDZ_GET_ALL_MEMBERSHIP_response................");
      return { data: Data.data };
    } catch (error) {
      console.log(error, "EDZ_GET_ALL_MEMBERSHIP_error.......");
      throw error;
    }
  };