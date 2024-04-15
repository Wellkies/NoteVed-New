import axios from 'axios';
import {
  GET_CHILD_PROBABLE_QUES_DETAILS_URL,
  GET_MOST_PROBABLE_QUESTION_SET_URL,
  GET_PROBABLE_REATTEMPT_ANSWER_BY_SUBMIT_URL,
  GET_SUBMIT_PROBABLE_QUESTION,
  REATTEMPT_ANSWER_SUBMIT_SUBJECTWISE_PROBABLE_URL,
  SUBMIT_SUBJECTWISE_PROBABLE_QUESTION,
} from '../../../constants/ApiPaths';
import AsyncStorage from '../../utils/AsyncStorage';

export const getChildProbableQuestionDetailsActionAPI = async (DATA = {}) => {
  const url =
    GET_CHILD_PROBABLE_QUES_DETAILS_URL +
    DATA.stageid +
    '/' +
    DATA.boardid +
    '/' +
    DATA.scholarshipId +
    '/' +
    DATA.childid;
  const token = await AsyncStorage.getObject('@auth_Token');
  console.log(
    url,
    '*******************GET_CHILD_PROBABLE_QUES_DETAILS_URL...............................',
  );
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWY0Njk4MTE3MmZmNGQ5YmRjZTAwNSIsImlhdCI6MTcwMDExNjM3NiwiZXhwIjoxNzMxNjUyMzc2fQ.ZyEy3RRUPKwxUIU4BV0CEuCne-hDbW7fEztRUAVSqUI`,
    },
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    } else {
      const Data = await response.json();
      // console.log(
      //   Data,
      //   'GET_CHILD_PROBABLE_QUES_DETAILS_URLresponse................',
      // );
      return {data: Data.data};
    }
  } catch (error) {
    console.log(error, 'GET_CHILD_PROBABLE_QUES_DETAILS_URLURLerror.......');
    throw error;
  }
};
// export const getMostProbableQuestionSetActionAPI = async (data = {}) => {
//   const url =
//     GET_MOST_PROBABLE_QUESTION_SET_URL +
//     '/' +
//     data.stageid +
//     '/' +
//     data.boardid +
//     '/' +
//     data.scholarshipid +
//     '/' +
//     data.childid +
//     '/' +
//     data.setid;

//   console.log(
//     url,
//     '*******************GET_MOST_PROBABLE_QUESTION_SET_URL...............................',
//   );
//   const token = await AsyncStorage.getObject('@auth_Token');
//   const requestOptions = {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//       // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWY0Njk4MTE3MmZmNGQ5YmRjZTAwNSIsImlhdCI6MTcwMDExNjM3NiwiZXhwIjoxNzMxNjUyMzc2fQ.ZyEy3RRUPKwxUIU4BV0CEuCne-hDbW7fEztRUAVSqUI`,
//     },
//   };

//   try {
//     const response = await axios.get(url, requestOptions);
//     if (!response.status) {
//       throw new Error('Network response was not ok');
//     }
//     const Data = await response.data.data;
//     // console.log(
//     //   Data,
//     //   'GET_MOST_PROBABLE_QUESTION_SET_URL........@@@@@@@.....data................',
//     // );
//     if (response.status) {
//       return {data: Data};
//     }
//   } catch (error) {
//     console.log(error, 'GET_MOST_PROBABLE_QUESTION_SET_URL.....error.......');

//     throw error;
//   }
// };

export const getMostProbableQuestionSetActionAPI = async (data = {}) => {
  const url =
    GET_MOST_PROBABLE_QUESTION_SET_URL +
    '/' +
    data.stageid +
    '/' +
    data.boardid +
    '/' +
    data.scholarshipid +
    '/' +
    data.childid +
    '/' +
    data.setid;

  console.log(
    url,
    '*******************GET_MOST_PROBABLE_QUESTION_SET_URL...............................',
  );
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
    } else {
      const Data = await response.json();
      console.log(
        Data,
        'GET_MOST_PROBABLE_QUESTION_SET_URLresponse................',
      );
      return {data: Data.data};
    }
  } catch (error) {
    console.log(error, 'GET_MOST_PROBABLE_QUESTION_SET_URLerror.......');
    throw error;
  }
};

export const probableanswerSubmitApi = async (bodydata: any, callBack: any,setLoading:any) => {
  const url = GET_SUBMIT_PROBABLE_QUESTION;
  console.log(
    url,
    'GET_SUBMIT_PROBABLE_QUESTION...........url...........................',
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
    if (setLoading) setLoading(true);

    console.log(
      response,
      'GET_SUBMIT_PROBABLE_QUESTION.........response..........',
    );
    // const Data = await response.data;
    const Data = await response.json();

    console.log(Data, 'Data........................');
    if (!response.ok) {
    if (setLoading) setLoading(false);
      throw new Error('Network response was not ok');
    }
    if (response.ok) {
    if (setLoading) setLoading(false);
      if (callBack) callBack();
      return {data: Data};
    }
  } catch (error) {
    if (setLoading) setLoading(false);
    console.log(error, 'GET_SUBMIT_PROBABLE_QUESTION.....error.......');
    throw error;
  }
};

export const subjectwiseProbableanswerSubmitApi = async (
  bodydata: any,
  callBack: any,
  setLoading: any,
) => {
  const url = SUBMIT_SUBJECTWISE_PROBABLE_QUESTION;
  console.log(
    url,
    'SUBMIT_SUBJECTWISE_PROBABLE_QUESTION...........url...........................',
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
    if (setLoading) setLoading(true);

    console.log(
      response,
      'SUBMIT_SUBJECTWISE_PROBABLE_QUESTION.........response..........',
    );
    // const Data = await response.data;
    const Data = await response.json();

    console.log(Data, 'Data........................');
    if (!response.ok) {
    if (setLoading) setLoading(false);
      throw new Error('Network response was not ok');
    }
    if (response.ok) {
    if (setLoading) setLoading(false);
      if (callBack) callBack();
      return {data: Data};
    }
  } catch (error) {
    console.log(error, 'SUBMIT_SUBJECTWISE_PROBABLE_QUESTION.....error.......');
    if (setLoading) setLoading(false);
    throw error;
  }
};

export const probableanswerReattemptSubmitApi = async (
  bodydata: any,
  callBack: any,
  setLoading: any,
) => {
  const url = GET_PROBABLE_REATTEMPT_ANSWER_BY_SUBMIT_URL;
  console.log(
    url,
    'GET_PROBABLE_REATTEMPT_ANSWER_BY_SUBMIT_URL...........url...........................',
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
    if (setLoading) setLoading(true);

    console.log(
      response,
      'GET_PROBABLE_REATTEMPT_ANSWER_BY_SUBMIT_URL.........response..........',
    );
    // const Data = await response.data;
    const Data = await response.json();

    console.log(Data, 'Data........................');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    if (response.ok) {
      if (setLoading) setLoading(false);
      if (callBack) callBack();
      return {data: Data};
    }
  } catch (error) {
    console.log(
      error,
      'GET_PROBABLE_REATTEMPT_ANSWER_BY_SUBMIT_URL.....error.......',
    );

    if (setLoading) setLoading(false);
    throw error;
  }
};

export const subjectwiseProbableanswerReattemptSubmitApi = async (
  bodydata: any,
  callBack: any,
  setLoading: any,
) => {
  const url = REATTEMPT_ANSWER_SUBMIT_SUBJECTWISE_PROBABLE_URL;
  console.log(
    url,
    'REATTEMPT_ANSWER_SUBMIT_SUBJECTWISE_PROBABLE_URL...........url...........................',
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
    if (setLoading) setLoading(true);

    console.log(
      response,
      'REATTEMPT_ANSWER_SUBMIT_SUBJECTWISE_PROBABLE_URL.........response..........',
    );
    // const Data = await response.data;
    const Data = await response.json();

    console.log(Data, 'Data........................');
    if (!response.ok) {
    if (setLoading) setLoading(false);
      throw new Error('Network response was not ok');
    }
    if (response.ok) {
      if (setLoading) setLoading(false);

      if (callBack) callBack();
      return {data: Data};
    }
  } catch (error) {
    console.log(
      error,
      'REATTEMPT_ANSWER_SUBMIT_SUBJECTWISE_PROBABLE_URL.....error.......',
    );
    if (setLoading) setLoading(false);
    throw error;
  }
};
