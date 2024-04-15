import axios from 'axios';
import {
  GET_DAILY_FACT_BY_DATE_URL,
  GET_DAILY_MESSAGE_BY_DATE_URL,
} from '../../../constants/ApiPaths';
import AsyncStorage from '../../utils/AsyncStorage';

export const getDailyFactActionAPI = async (data = {}) => {
  const url = GET_DAILY_FACT_BY_DATE_URL + data;

  const DailyImageArrayCBSE = {
    image: [
      'https://wkresources.s3.ap-south-1.amazonaws.com/1711375669645_348037080.png',
      'https://wkresources.s3.ap-south-1.amazonaws.com/1711375694585_76334385.png',
      'https://wkresources.s3.ap-south-1.amazonaws.com/1711375713290_21045758.png',
      'https://wkresources.s3.ap-south-1.amazonaws.com/1711375736090_576690145.png',
    ],
  };

  const DailyImageArrayBSE = {
    image: [
      'https://wkresources.s3.ap-south-1.amazonaws.com/1711375834635_783405251.png',
      'https://wkresources.s3.ap-south-1.amazonaws.com/1711375870950_280963106.png',
      'https://wkresources.s3.ap-south-1.amazonaws.com/1711375907702_989388665.png',
      'https://wkresources.s3.ap-south-1.amazonaws.com/1711375944714_62680266.png',
    ],
  };
  // console.log(
  //   url,
  //   'GET_DAILY_FACT_BY_DATE_URL=======================',
  //   data,
  //   '====data',
  // );
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
    }
    const Data = await response.json();
    // console.log(Data, 'GET_DAILY_FACT_BY_DATE_URL_response................');
    if (Object.keys(Data.data).length === 0 && data == 1) {
      console.log(
        Data,
        // 'GET_DAILY_FACT_BY_DATE_URL_response_______forEMPTY................',
      );
      return {data: DailyImageArrayBSE};
    } else if (Object.keys(Data.data).length === 0 && data !== 1) {
      console.log(
        Data,
        // 'GET_DAILY_FACT_BY_DATE_URL_response________forEMPTY................',
      );
      return {data: DailyImageArrayCBSE};
    } else {
      return {data: Data.data};
    }
  } catch (error) {
    console.log(error, 'GET_DAILY_FACT_BY_DATE_URL_error.......');
    throw error;
  }
};

export const getDailyMessageActionAPI = async (data = {}) => {
  const url = GET_DAILY_MESSAGE_BY_DATE_URL + '/' + data;
  const DailyMessageImage = {
    image: [
      'https://wkresources.s3.ap-south-1.amazonaws.com/1711183626083_213969809.png',
    ],
  };

  const token = await AsyncStorage.getObject('@auth_Token');
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    //   body: JSON.stringify(phone),
  };
  // console.log(
  //   url,
  //   '????????????????????????GET_DAILY_MESSAGE_BY_DATE_URL_URL=======================',
  // );
  try {
    const response = await axios.get(url, requestOptions);
    // console.log(response,"response?????????????????????????????")
    if (!response.status) {
      throw new Error('Network response was not ok');
    }
    const Data = await response.data;
    // console.log(
    //   Data,
    //   'GET_DAILY_MESSAGE_BY_DATE_URL_URL_response................',
    // );
    if (Object.keys(Data.data).length === 0) {
      return {data: DailyMessageImage};
    } else {
      return {data: Data.data};
    }
    // return { data: Data.data };
  } catch (error) {
    // console.log(error, 'GET_DAILY_MESSAGE_BY_DATE_URL_URL_error.......');
    throw error;
  }
};
