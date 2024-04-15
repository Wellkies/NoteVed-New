import axios from 'axios';
import {UPLOAD_PHOTO_URL} from '../../../constants/ApiPaths';
import {authHeader} from '../../../constants/Constants';
import AsyncStorage from '../../utils/AsyncStorage';

export const uploadPhotoApi = async (bodydata, callBack: any) => {
  let authHeaderVal: any = await authHeader();

  const url = UPLOAD_PHOTO_URL; // Replace this with your actual API endpoint

  const token = await AsyncStorage.getObject('@auth_Token');
  const requestOptions = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    // const response = await fetch(url, requestOptions);

    const response = await axios
      .post(url, bodydata, requestOptions)
      .then(response => {
        const {location = '', originalname = '', key = ''} = response.data;
        if (response.status) {
          if (callBack) callBack(location, key);
          console.log(
            response.data,
            'Upload Image.............###########################',
          );

          console.log(
            response.data,
            'UPLOAD_PHOTO_URL_______response................',
          );
          return {data: response.data};
        }
      });

    // if (!response.status) {
    //   throw new Error('Network response was not ok');

    // } else {
    //   const data = await response.data;

    // }
  } catch (error) {
    throw error;
  }
};
