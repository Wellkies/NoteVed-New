import {GET_ALL_STATES, GET_BOARD_API} from '../../../constants/ApiPaths';

export const getBoardAction = async () =>
  // authtoken='',
  // signOut='',
  // id='',
  // setLoading='',
  // callBack='',

  {
    const url = GET_BOARD_API;
    console.log(url, 'url...........................');
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      //   body: JSON.stringify(phone),
    };

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const Data = await response.json();
      console.log(Data, 'STUDENTSTANDARD.............data................');
      return {data: Data.data};
    } catch (error) {
      console.log(error, 'error.......');

      throw error;
    }
  };

export const getStateAction = async () =>
  // authtoken='',
  // signOut='',
  // id='',
  // setLoading='',
  // callBack='',

  {
    const url = GET_ALL_STATES;
    console.log(url, 'url...........................');
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      //   body: JSON.stringify(phone),
    };

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const Data = await response.json();
      console.log(Data, 'GET_ALL_STATES.............data................');
      return {data: Data.data};
    } catch (error) {
      console.log(error, 'error.......');

      throw error;
    }
  };
