import axios from 'axios';
import {
  GET_CHILD_UNLOCK_URL,
  GET_PREVIOUS_YEAR_REATTEMPT_ANSWER_BY_SUBMIT_URL,
  GET_PREV_YEAR_QUESTION_SET_URL,
  GET_PREV_YEAR_QUES_URL,
  GET_SUBMIT_PREVIOUS_YEAR_QUESTION,
  REATTEMPT_ANSWER_SUBMIT_SUBJECTWISE_PREVIOUS_YEAR_QUESTION,
  SUBMIT_SUBJECTWISE_PREVIOUS_YEAR_QUESTION,
} from '../../../constants/ApiPaths';
import AsyncStorage from '../../utils/AsyncStorage';

export const getPreviousYearQuestionActionAPI = async (DATA = {}) => {
  const url =
    GET_PREV_YEAR_QUES_URL +
    DATA.stageid +
    '/' +
    DATA.boardid +
    '/' +
    DATA.scholarshipId +
    '/' +
    DATA.childid;
  const token = await AsyncStorage.getObject('@auth_Token');
  console.log(url, 'GET_PREV_YEAR_QUES_URL...............................');
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
    const Data = await response.data.data;
    // console.log(
    //   Data,
    //   'GET_PREV_YEAR_QUES_URL.............data................',
    // );
    return {data: Data};
  } catch (error) {
    console.log(error, 'GET_PREV_YEAR_QUES_URL.....error.......');

    throw error;
  }
};

export const getUnlockChildActionAPI = async () => {
  const url = GET_CHILD_UNLOCK_URL;
  console.log(url, 'GET_CHILD_UNLOCK_URL...............................');
  const token = await AsyncStorage.getObject('@auth_Token');
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
    const Data = await response.data.data;
    // console.log(Data, 'GET_CHILD_UNLOCK_URL.............data................');
    return {data: Data};
  } catch (error) {
    console.log(error, 'GET_CHILD_UNLOCK_URL.....error.......');

    throw error;
  }
};

export const getPreviousYearQuestionSetActionAPI = async (data = {}) => {
  const url =
    GET_PREV_YEAR_QUESTION_SET_URL +
    data.stageid +
    '/' +
    data.boardid +
    '/' +
    data.scholarshipid +
    '/' +
    data.yearid +
    '/' +
    data.childid;
  const token = await AsyncStorage.getObject('@auth_Token');
  console.log(
    url,
    '%%%%%%%%%%%%%GET_PREV_YEAR_QUESTION_SET_URL...............................',
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
    const {data = []} = Data;
    let List = [];
    List = data.map(rec => {
      return {...rec, isExamAvailable: false};
    });
    // console.log(
    //   Data,
    //   'GET_PREV_YEAR_QUESTION_SET_URL.............data................',List,"List..............."
    // );
    return {data: List};
  } catch (error) {
    console.log(error, 'GET_PREV_YEAR_QUESTION_SET_URL.....error.......');

    throw error;
  }
};

export const previousYearanswerReattemptSubmitApi = async (
  bodydata: any,
  callBack: any,
) => {
  const url = GET_PREVIOUS_YEAR_REATTEMPT_ANSWER_BY_SUBMIT_URL;
  console.log(
    url,
    'GET_PREVIOUS_YEAR_REATTEMPT_ANSWER_BY_SUBMIT_URL...........url...........................',
  );
  const token = await AsyncStorage.getObject('@auth_Token');
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWY0Njk4MTE3MmZmNGQ5YmRjZTAwNSIsImlhdCI6MTcwMDExNjM3NiwiZXhwIjoxNzMxNjUyMzc2fQ.ZyEy3RRUPKwxUIU4BV0CEuCne-hDbW7fEztRUAVSqUI`,
    },
    body: JSON.stringify(bodydata),
  };

  try {
    // const response = await axios.post(url,bodydata, requestOptions);
    const response = await fetch(url, requestOptions);

    console.log(
      response,
      'GET_PREVIOUS_YEAR_REATTEMPT_ANSWER_BY_SUBMIT_URL.........response..........',
    );
    // const Data = await response.data;
    const Data = await response.json();

    console.log(Data, 'Data........................');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    if (response.ok) {
      if (callBack) callBack();
      return {data: Data};
    }
  } catch (error) {
    console.log(
      error,
      'GET_PREVIOUS_YEAR_REATTEMPT_ANSWER_BY_SUBMIT_URL.....error.......',
    );

    throw error;
  }
};

export const SubjectwisePreviousYearanswerReattemptSubmitApi = async (
  bodydata: any,
  callBack: any,
) => {
  const url = REATTEMPT_ANSWER_SUBMIT_SUBJECTWISE_PREVIOUS_YEAR_QUESTION;
  console.log(
    url,
    'REATTEMPT_ANSWER_SUBMIT_SUBJECTWISE_PREVIOUS_YEAR_QUESTION...........url...........................',
  );
  const token = await AsyncStorage.getObject('@auth_Token');
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWY0Njk4MTE3MmZmNGQ5YmRjZTAwNSIsImlhdCI6MTcwMDExNjM3NiwiZXhwIjoxNzMxNjUyMzc2fQ.ZyEy3RRUPKwxUIU4BV0CEuCne-hDbW7fEztRUAVSqUI`,
    },
    body: JSON.stringify(bodydata),
  };

  try {
    // const response = await axios.post(url,bodydata, requestOptions);
    const response = await fetch(url, requestOptions);

    console.log(
      response,
      'REATTEMPT_ANSWER_SUBMIT_SUBJECTWISE_PREVIOUS_YEAR_QUESTION.........response..........',
    );
    // const Data = await response.data;
    const Data = await response.json();

    console.log(Data, 'Data........................');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    if (response.ok) {
      if (callBack) callBack();
      return {data: Data};
    }
  } catch (error) {
    console.log(
      error,
      'REATTEMPT_ANSWER_SUBMIT_SUBJECTWISE_PREVIOUS_YEAR_QUESTION.....error.......',
    );

    throw error;
  }
};

export const previousYearanswerSubmitApi = async (
  bodydata: any,
  callBack: any,
) => {
  const url = GET_SUBMIT_PREVIOUS_YEAR_QUESTION;
  console.log(
    url,
    'GET_SUBMIT_PREVIOUS_YEAR_QUESTION...........url...........................',
  );
  const token = await AsyncStorage.getObject('@auth_Token');
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWY0Njk4MTE3MmZmNGQ5YmRjZTAwNSIsImlhdCI6MTcwMDExNjM3NiwiZXhwIjoxNzMxNjUyMzc2fQ.ZyEy3RRUPKwxUIU4BV0CEuCne-hDbW7fEztRUAVSqUI`,
    },
    body: JSON.stringify(bodydata),
  };

  try {
    // const response = await axios.post(url,bodydata, requestOptions);
    const response = await fetch(url, requestOptions);

    console.log(
      response,
      'GET_SUBMIT_PREVIOUS_YEAR_QUESTION.........response..........',
    );
    // const Data = await response.data;
    const Data = await response.json();

    console.log(Data, 'Data........................');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    if (response.ok) {
      if (callBack) callBack();
      return {data: Data};
    }
  } catch (error) {
    console.log(error, 'GET_SUBMIT_PREVIOUS_YEAR_QUESTION.....error.......');

    throw error;
  }
};

export const subjectwisePreviousYearanswerSubmitApi = async (
  bodydata: any,
  callBack: any,
) => {
  const url = SUBMIT_SUBJECTWISE_PREVIOUS_YEAR_QUESTION;
  console.log(
    url,
    'SUBMIT_SUBJECTWISE_PREVIOUS_YEAR_QUESTION...........url...........................',
  );
  const token = await AsyncStorage.getObject('@auth_Token');
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWY0Njk4MTE3MmZmNGQ5YmRjZTAwNSIsImlhdCI6MTcwMDExNjM3NiwiZXhwIjoxNzMxNjUyMzc2fQ.ZyEy3RRUPKwxUIU4BV0CEuCne-hDbW7fEztRUAVSqUI`,
    },
    body: JSON.stringify(bodydata),
  };

  try {
    // const response = await axios.post(url,bodydata, requestOptions);
    const response = await fetch(url, requestOptions);

    console.log(
      response,
      'SUBMIT_SUBJECTWISE_PREVIOUS_YEAR_QUESTION.........response..........',
    );
    // const Data = await response.data;
    const Data = await response.json();

    console.log(Data, 'Data........................');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    if (response.ok) {
      if (callBack) callBack();
      return {data: Data};
    }
  } catch (error) {
    console.log(
      error,
      'SUBMIT_SUBJECTWISE_PREVIOUS_YEAR_QUESTION.....error.......',
    );

    throw error;
  }
};
