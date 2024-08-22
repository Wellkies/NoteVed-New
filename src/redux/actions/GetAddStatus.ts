import axios from 'axios';
import AsyncStorage from '../../utils/AsyncStorage';
import { GET_AD_STATUS } from '../../../constants/ApiPaths';

export const getAdsStatusActionAPI = async () => {
    const url =
    GET_AD_STATUS;

    const token = await AsyncStorage.getObject('@auth_Token');
    console.log(url, '&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&GET_AD_STATUS...............................');
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const response = await axios.get(url, requestOptions);
      if (!response.status) {
        throw new Error('Network response was not ok');
      }
      const Data = await response.data;
      console.log(
        Data,
        'GET_AD_STATUS.............data................',
      );
      return {data: Data};
    } catch (error) {
      console.log(error, 'GET_AD_STATUS.....error.......');
  
      throw error;
    }
  };
