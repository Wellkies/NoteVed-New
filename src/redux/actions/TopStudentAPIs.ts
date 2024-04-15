import axios from 'axios';
import {
  GET_MOST_PROB_TOP_STUDENT_URL,
  GET_PREV_YEAR_TOP_STUDENT_URL,
} from '../../../constants/ApiPaths';
import AsyncStorage from '../../utils/AsyncStorage';

export const getPrevYearTopActionStudentAPI = async (data = {}) => {
  const url = GET_PREV_YEAR_TOP_STUDENT_URL + data.previousyearquestionid;
  const token = await AsyncStorage.getObject('@auth_Token');
  console.log(
    url,
    'GET_PREV_YEAR_TOP_STUDENT_URL_url...........................',
  );
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWY0Njk4MTE3MmZmNGQ5YmRjZTAwNSIsImlhdCI6MTcwMDExNjM3NiwiZXhwIjoxNzMxNjUyMzc2fQ.ZyEy3RRUPKwxUIU4BV0CEuCne-hDbW7fEztRUAVSqUI`,
    },
  };

  try {
    const response = await axios.get(url, requestOptions);
    if (!response.status) {
      throw new Error('Network response was not ok');
    }
    const Data = await response.data;
    // console.log(
    //   Data,
    //   'GET_PREV_YEAR_TOP_STUDENT_URL_response................',
    // );
    return {data: Data.data};
  } catch (error) {
    console.log(error, 'GET_PREV_YEAR_TOP_STUDENT_URL_error.......');

    throw error;
  }
};

export const getMostProbTopStudentActionAPI = async (data = {}) => {
  const url = GET_MOST_PROB_TOP_STUDENT_URL + data.mostprobablequestionid;
  const token = await AsyncStorage.getObject('@auth_Token');
  console.log(
    url,
    'GET_MOST_PROB_TOP_STUDENT_URLurl...........................',
  );
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWY0Njk4MTE3MmZmNGQ5YmRjZTAwNSIsImlhdCI6MTcwMDExNjM3NiwiZXhwIjoxNzMxNjUyMzc2fQ.ZyEy3RRUPKwxUIU4BV0CEuCne-hDbW7fEztRUAVSqUI`,
    },
  };

  try {
    const response = await axios.get(url, requestOptions);
    console.log(
      response,
      'response....................TOPPROBABLE .............',
    );
    if (!response.status) {
      throw new Error('Network response was not ok');
    }
    if (response.status) {
      const Data = await response.data;
      console.log(
        Data,
        'GET_MOST_PROB_TOP_STUDENT_URLresponse................',
      );
      return {data: Data.data};
    }
  } catch (error) {
    console.log(error, 'GET_MOST_PROB_TOP_STUDENT_URLerror.......');

    throw error;
  }
};
