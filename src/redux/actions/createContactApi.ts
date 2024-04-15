import {CREATE_CONTACT_URL} from '../../../constants/ApiPaths';
import AsyncStorage from '../../utils/AsyncStorage';

export const createContactApi = async (bodydata = {}, callBack: any) => {
  const url = CREATE_CONTACT_URL;
  console.log(url, 'CREATE_CONTACT_URL...........................');
  const token = await AsyncStorage.getObject('@auth_Token');
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodydata),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (response.ok) {
      if (callBack) callBack();

      console.log(data, 'CREATE_CONTACT_URL_response................');
      return {data: data};
    }
  } catch (error) {
    console.log(error, 'CREATE_CONTACT_URL_error.......');

    throw error;
  }
};
