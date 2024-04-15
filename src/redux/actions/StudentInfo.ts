import {GET_CHILD_INFO_URL} from '../../../constants/ApiPaths';
import axios from 'axios';
import AsyncStorage from '../../utils/AsyncStorage';

export const getChildDetailsAPIAction = async (
  // signOut='',
  id = '',
  // setLoading='',
  // callBack='',
) => {
  const url =GET_CHILD_INFO_URL + id;
  console.log(url, 'url...........................');
const token = await AsyncStorage.getObject('@auth_Token');
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
       Authorization: `Bearer ${token}`,
      // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWY0Njk4MTE3MmZmNGQ5YmRjZTAwNSIsImlhdCI6MTcwMDExNjM3NiwiZXhwIjoxNzMxNjUyMzc2fQ.ZyEy3RRUPKwxUIU4BV0CEuCne-hDbW7fEztRUAVSqUI`,
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
  return {data: Data.user[0]};
} catch (error) {
  console.log(error, 'getScholarshipPremiumActionAPI.....error.......');

  throw error;
}
};