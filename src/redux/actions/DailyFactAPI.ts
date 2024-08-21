import axios from 'axios';
import {
  EDZ_GET_DAILY_FACT_BY_DATE_URL,
  GET_DAILY_MESSAGE_BY_DATE_URL,
} from '../../../constants/ApiPaths';
import AsyncStorage from '../../utils/AsyncStorage';

export const getDailyFactActionAPI = async () => {
  const url = EDZ_GET_DAILY_FACT_BY_DATE_URL;

  const DailyImageArrayCBSE = {
    image: [
      'https://wkresources.s3.ap-south-1.amazonaws.com/1711375669645_348037080.png',
      'https://wkresources.s3.ap-south-1.amazonaws.com/1711375694585_76334385.png',
      'https://wkresources.s3.ap-south-1.amazonaws.com/1711375713290_21045758.png',
      'https://wkresources.s3.ap-south-1.amazonaws.com/1711375736090_576690145.png',
    ],
  };

  // const DailyImageArrayBSE = {
  //   image: [
  //     'https://wkresources.s3.ap-south-1.amazonaws.com/1711375834635_783405251.png',
  //     'https://wkresources.s3.ap-south-1.amazonaws.com/1711375870950_280963106.png',
  //     'https://wkresources.s3.ap-south-1.amazonaws.com/1711375907702_989388665.png',
  //     'https://wkresources.s3.ap-south-1.amazonaws.com/1711375944714_62680266.png',
  //   ],
  // };

  // console.log(
  //   url,
  //   'EDZ_GET_DAILY_FACT_BY_DATE_URL======================='
  // );
  const token = await AsyncStorage.getObject('@auth_Token');
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const Data = await response.json();
    //console.log(Data, 'EDZ_GET_DAILY_FACT_BY_DATE_URL_response................');
    if (Data.data.length === 0) {
      return {data: DailyImageArrayCBSE, visibility: Data.visibility};
    } else {
      return {data: Data.data, visibility: Data.visibility};
    }
  } catch (error) {
    //console.log(error, 'GET_DAILY_FACT_BY_DATE_URL_error.......');
    throw error;
  }
};

// export const getDailyMessageActionAPI = async (data = {}) => {
//   const url = `${GET_DAILY_MESSAGE_BY_DATE_URL}/${data}`;
//   const DailyMessageImage = {
//     image: [
//       'https://wkresources.s3.ap-south-1.amazonaws.com/1711183626083_213969809.png',
//     ],
//   };

//   const token = await AsyncStorage.getObject('@auth_Token');
//   const requestOptions = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   console.log(url, 'GET_DAILY_MESSAGE_BY_DATE_URL_URL=======================');
//   try {
//     const response = await axios.get(url, requestOptions);
//     if (!response.status) {
//       throw new Error('Network response was not ok');
//     }
//     const Data = await response.data;
//     console.log(Data, 'GET_DAILY_MESSAGE_BY_DATE_URL_URL_response................');
//     if (Object.keys(Data.data).length === 0) {
//       return { data: DailyMessageImage, visibility: Data.visibility }; // Include visibility if available
//     } else {
//       return { data: Data.data, visibility: Data.visibility }; // Include visibility if available
//     }
//   } catch (error) {
//     throw error;
//   }
// };