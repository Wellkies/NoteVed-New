import axios from 'axios';
import {GET_SCHOLARSHIP_URL} from '../../../constants/ApiPaths';
import AsyncStorage from '../../utils/AsyncStorage';

export const getAllScholarshipAction = async (data = {}) => {
  const url = GET_SCHOLARSHIP_URL + data.stageid + '/' + data.boardid;
  console.log(url, 'GET_SCHOLARSHIP_URL...........................', data);
  const token = await AsyncStorage.getObject('@auth_Token');
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWY0Njk4MTE3MmZmNGQ5YmRjZTAwNSIsImlhdCI6MTcwMDExNjM3NiwiZXhwIjoxNzMxNjUyMzc2fQ.ZyEy3RRUPKwxUIU4BV0CEuCne-hDbW7fEztRUAVSqUI`,
    },
    //   body: JSON.stringify(phone),
  };

  try {
    // const response = await fetch(url, requestOptions);
    const response = await axios.get(url, requestOptions);
    // console.log(response,"=======GET_SCHOLARSHIP_URL_response===####");
    if (!response.status) {
      throw new Error('Network response was not ok');
    }
    // const Data = await response.json();
    const Data = await response.data.data;
    // console.log(Data, "GET_SCHOLARSHIP_URL_response...................");
    return {data: Data};
  } catch (error) {
    console.log(error, 'GET_SCHOLARSHIP_URL_error.......');

    throw error;
  }
};
