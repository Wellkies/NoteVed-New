import {CREATE_FCM_TOKEN_URL} from '../../../constants/ApiPaths';

export const CreateFcmTokenAPI = async (bodydata = {}) => {
  const url = CREATE_FCM_TOKEN_URL;
  console.log(url, 'CREATE_FCM_TOKEN_URL...........................');
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
    //   if (callBack) callBack();

      console.log(data, 'CREATE_FCM_TOKEN_URL_response................');
      return {data: data};
    }
  } catch (error) {
    console.log(error, 'CREATE_FCM_TOKEN_URL_error.......');

    throw error;
  }
};
