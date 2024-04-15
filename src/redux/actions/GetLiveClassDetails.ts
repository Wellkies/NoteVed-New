import {
  CREATE_ZOOM_URL,
  REGISTER_LIVECLASS_URL,
} from '../../../constants/ApiPaths';
import AsyncStorage from '../../utils/AsyncStorage';

export const getLiveclassAction = async (data = {}) => {
  const url =
    CREATE_ZOOM_URL +
    '/' +
    data.scholarshipid +
    '/' +
    data.stageid +
    '/' +
    data.boardid;

  console.log(
    url,
    '$$$$$$$$$$$$$$$$CREATE_ZOOM_URL_URL=======================',
  );
  const token = await AsyncStorage.getObject('@auth_Token');
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    //   body: JSON.stringify(phone),
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    } else {
      const Data = await response.json();

      console.log(Data.data, 'CREATE_ZOOM_URL_URL_response................');
      const DATA=Data.data
      return {data: DATA};
    }
  } catch (error) {
    console.log(
      error,
      '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$CREATE_ZOOM_URL_URL_error.......',
    );

    throw error;
  }
};

export const registerLiveclassUrl = async (bodydata: any, callBack: any) => {
  const url = REGISTER_LIVECLASS_URL;
  console.log(
    url,
    'REGISTER_LIVECLASS_URL...........url...........................',
  );
  const token = await AsyncStorage.getObject('@auth_Token');
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWY0Njk4MTE3MmZmNGQ5YmRjZTAwNSIsImlhdCI6MTcwMDExNjM3NiwiZXhwIjoxNzMxNjUyMzc2fQ.ZyEy3RRUPKwxUIU4BV0CEuCne-hDbW7fEztRUAVSqUI`,
    },
    body: JSON.stringify(bodydata),
  };

  try {
    // const response = await axios.post(url,bodydata, requestOptions);
    const response = await fetch(url, requestOptions);
    // if (setLoading) setLoading(true);

    console.log(response, 'REGISTER_LIVECLASS_URL.........response..........');
    // const Data = await response.data;
    const Data = await response.json();

    console.log(Data, 'Data........................');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    if (response.ok) {
      // if (setLoading) setLoading(false);
      if (callBack) callBack();
      return {data: Data};
    }
  } catch (error) {
    console.log(error, 'REGISTER_LIVECLASS_URL.....error.......');

    // if (setLoading) setLoading(false);
    throw error;
  }
};
