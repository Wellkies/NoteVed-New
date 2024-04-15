import {UPDATE_CHILD_API} from '../../../constants/ApiPaths';
import {authHeader} from '../../../constants/Constants';
import AsyncStorage from '../../utils/AsyncStorage';

export const updateChildProfile = async (bodydata = {}, callBack: any) => {
  let authHeaderVal: any = await authHeader();

  const url = UPDATE_CHILD_API; // Replace this with your actual API endpoint
  console.log(url, 'url//////////////////////');
const token = await AsyncStorage.getObject('@auth_Token');
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodydata),
  };

  try {
    const response = await fetch(url, requestOptions);
console.log(response,"response.......................")
    if (!response.ok) {
      throw new Error('Network response was not ok');
    } else {
      const data = await response.json();
      console.log(data, "dat''''''''''a");

      if (response.ok) {
        if (callBack) callBack(bodydata);
        return {data: data};
      }
    }
  } catch (error) {
    console.log(error);

    throw error;
  }
};
