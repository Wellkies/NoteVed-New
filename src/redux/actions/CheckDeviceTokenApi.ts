import axios from 'axios';
import {GET_CHECK_TOKEN_URL} from '../../../constants/ApiPaths';
import AsyncStorage from '../../utils/AsyncStorage';

export const CheckDeviceTokenActionApi = async (data = {}) => {
  const url = GET_CHECK_TOKEN_URL + '/' + data.childid + '/' + data.devicetoken;

  console.log(
    url,
    '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!GET_CHECK_TOKEN_URL...........url...........................',
  );
  const token = await AsyncStorage.getObject('@auth_Token');
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWY0Njk4MTE3MmZmNGQ5YmRjZTAwNSIsImlhdCI6MTcwMDExNjM3NiwiZXhwIjoxNzMxNjUyMzc2fQ.ZyEy3RRUPKwxUIU4BV0CEuCne-hDbW7fEztRUAVSqUI`,
    },
  };
  // console.log(
  //   token,
  //   'token..................!!!!!!!!!!!!!!!!!!!!TOKENNNNNNNNNNNNNNNN',
  // );
  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const Data = await response.json();
    console.log(Data, 'GET_CHECK_TOKEN_URL................');
    return {data: Data};
  } catch (error) {
    console.log(error, 'GET_CHECK_TOKEN_URL.......ERROR');
    throw error;
  }
};
