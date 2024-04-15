import {CREATE_CONTACT_URL} from '../../../constants/ApiPaths';
import AsyncStorage from '../../utils/AsyncStorage';

export const youtubelistApi = async () => {
  const url = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2C%20id%2C%20snippet%2C%20status&playlistId=PLCthd99y3kbKwlaN8F_buXJCGBrbHqg76&key=AIzaSyDf3M1nGB7Xc2CGgMWB-wgGfiAqlbmKe_A';
  console.log(url, 'youtubelistApi...........................');
  const token = await AsyncStorage.getObject('@auth_Token');
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    //   Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(bodydata),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const Data = await response.json();
    // console.log(
    //   Data,
    //   "youtubelistApi_URL_response................"
    // );
    return { data: Data.items };
  } catch (error) {
    console.log(error, "youtubelistApi_error.......");
    throw error;
  }
};