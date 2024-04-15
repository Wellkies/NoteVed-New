import { REGISTER_NEW_CHILD_URL } from "../../../constants/ApiPaths";
import AsyncStorage from "../../utils/AsyncStorage";
import { login } from "../reducers/loginReducer";
import { dispatch } from "../store/reducerHook";

export const RegisterNewChild = async (bodydata: any, callBack: any) => {
  const url = REGISTER_NEW_CHILD_URL;
  console.log(url, "REGISTER_NEW_CHILD_URL_url...........................");
  const token = await AsyncStorage.getObject("@auth_Token");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodydata),
  };

  try {
    // const response = await axios.post(url,bodydata, requestOptions);
    const response = await fetch(url, requestOptions);
    console.log(response, "REGISTER_NEW_CHILD_URL_response..........");
    // const Data = await response.data;
    const Data = await response.json();
    console.log(Data,"data@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    
   
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    if (response.ok) {
      if (callBack) callBack(Data.user[0],"success",Data.authtoken,Data);
      return { data: Data };
    }
  } catch (error) {
    console.log(error, "REGISTER_NEW_CHILD_URL_error.......");
    throw error;
  }
};
