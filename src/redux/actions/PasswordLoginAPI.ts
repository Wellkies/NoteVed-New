import { LOGIN_WITH_PASSWORD_URL } from "../../../constants/ApiPaths";
import {GET_CHILD_INFO_URL} from '../../../constants/ApiPaths';
import axios from 'axios';
import AsyncStorage from "../../utils/AsyncStorage";

export const PasswordLoginAction = async (phone = {}) => {
  const url = LOGIN_WITH_PASSWORD_URL;
  console.log(url, "LOGIN_WITH_PASSWORD_URL...........................");
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

    console.log(data, "LOGIN_WITH_PASSWORD_URL_response................");
    return { data: data };
  } catch (error) {
    console.log(error, "LOGIN_WITH_PASSWORD_URL_error.......");

    throw error;
  }
};


export const getChildDetailsbyidAPIAction = async (
  // signOut='',
  id = '',
  // setLoading='',
  // callBack='',
) => {
  const url =GET_CHILD_INFO_URL + id;
  const token = await AsyncStorage.getObject("@auth_Token");
  console.log(url, 'url...........................');
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    //   body: JSON.stringify(phone),
  };

//   try {
//     const response = await fetch(url, requestOptions);

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const Data = await response.json();
//     // console.log(data, 'data................');
//     return {data: Data.user[0]};
//   } catch (error) {
//     console.log(error, 'error.......');

//     throw error;
//   }
// };


try {
  const response = await axios.get(url, requestOptions);
  if (!response.status) {
    throw new Error('Network response was not ok');
  }
  const Data = await response.data
  // console.log(
  //   Data,
  //   'getPremiumAccessActionAPI.............data................',
  // );
  const user = AsyncStorage.storeObject('@user',Data.user[0])
  return {data: Data.user[0]};
} catch (error) {
  console.log(error, 'getScholarshipPremiumActionAPI.....error.......');

  throw error;
}
};