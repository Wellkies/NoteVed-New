import { EDZ_LOGIN_WITH_PASSWORD_URL } from "../../../constants/ApiPaths";
import { GET_CHILD_DETAILS_URL } from "../../../constants/ApiPaths";
import axios from "axios";
import AsyncStorage from "../../utils/AsyncStorage";

export const PasswordLoginAction = async (phone = {}) => {
  const url = EDZ_LOGIN_WITH_PASSWORD_URL;
  
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
    
    return { data: data };
  } catch (error) {
    
    throw error;
  }
};

export const getChildDetailsbyidAPIAction = async (id: any) => {
  const url = GET_CHILD_DETAILS_URL + id;
  // const token = await AsyncStorage.getObject("@auth_Token");
  
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    //   body: JSON.stringify(phone),
  };
  try {
    const response = await axios.get(url, requestOptions);
    if (!response.status) {
      throw new Error("Network response was not ok");
    }
    const Data = await response.data;
    
    const user = AsyncStorage.storeObject("@user", Data.data);
    return { data: Data.data };
  } catch (error) {
    
    throw error;
  }
};
