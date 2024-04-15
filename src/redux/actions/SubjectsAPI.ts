import axios from 'axios';
import {
  ADD_CHILD_REVISION_URL,
  CREATE_CHILD_ABOVE_90_PERCENTAGE_BSE_URL,
  CREATE_CHILD_ABOVE_90_PERCENTAGE_OTHER_URL,
  CREATE_CHILD_BELOW_90_PERCENTAGE_BSE_URL,
  CREATE_CHILD_BELOW_90_PERCENTAGE_OTHER_URL,
  GET_ANSWER_BY_SUBMIT_URL,
  GET_CHILD_REVISION_DETAILS_URL,
  GET_CONTENT_QUIZ_URL,
  GET_REATTEMPT_ANSWER_BY_SUBMIT_URL,
  GET_SUBJECTS_BY_CLASS_API,
  GET_TOPIC_BY_CLASS_SUB_API,
  GET_TOPIC_DETAILS_API,
} from '../../../constants/ApiPaths';
import AsyncStorage from '../../utils/AsyncStorage';

export const getSubjectByClassActionAPI = async (data = {}) => {
  const url =
    GET_SUBJECTS_BY_CLASS_API +
    data.stageid +
    '/' +
    data.boardid +
    '/' +
    data.scholarshipid;
  console.log(
    url,
    'GET_SUBJECTS_BY_CLASS_API_URL...........................',
    data,
  );
  const NoSub = [
    {"slsubject": "", "subject": "Currently No Subjects Available", "subjectid": "", "subjectimage": ""}
  ]
   
  
  const token = await AsyncStorage.getObject('@auth_Token');
  // console.log(
  //   token,
  //   '?????????????????????token.$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$..............',
  // );

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
    console.log(Data, 'GET_SUBJECTS_BY_CLASS_API_response................');

    if (Object.keys(Data.data).length === 0) {
      return {data: NoSub};
    } else {
      return {data: Data.data};
    }
    // 
    // return {data: Data.data};
  } catch (error) {
    console.log(error, 'GET_SUBJECTS_BY_CLASS_API_error.......');

    throw error;
  }
};

export const getTopicBySubClassActionAPI = async (data = {}) => {
  const url =
    GET_TOPIC_BY_CLASS_SUB_API +
    data.stageid +
    '/' +
    data.subjectid +
    '/' +
    data.boardid +
    '/' +
    data.scholarshipid +
    '/' +
    childId;
  const token = await AsyncStorage.getObject('@auth_Token');
  console.log(url, 'GET_TOPIC_BY_CLASS_SUB_API_url...........................');
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
    console.log(Data, 'GET_TOPIC_BY_CLASS_SUB_API_response................');
    return {data: Data.data};
  } catch (error) {
    console.log(error, 'GET_TOPIC_BY_CLASS_SUB_API_error.......');

    throw error;
  }
};

export const getChildRevisionDetailsActionAPI = async (data = {}) => {
  const url =
    GET_CHILD_REVISION_DETAILS_URL +
    '/' +
    data.Class +
    '/' +
    data.subjectid +
    '/' +
    data.boardid +
    '/' +
    data.scholarshipid +
    '/' +
    data.childId;
  const token = await AsyncStorage.getObject('@auth_Token');
  console.log(url, 'GET_CHILD_REVISION_DETAILS_URL=======================');
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
    console.log(response, 'v.....................................');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const Data = await response.json();
    // console.log(Data, "GET_CHILD_REVISION_DETAILS_URL_response................");
    return {data: Data.data};
  } catch (error) {
    console.log(error, 'GET_CHILD_REVISION_DETAILS_URL_error.......');

    throw error;
  }
};

export const getTopicDetailsActionAPI = async (data = {}) => {
  const url =
    GET_TOPIC_DETAILS_API +
    data.Class +
    '/' +
    data.subjectId +
    '/' +
    data.boardid +
    '/' +
    data.scholarshipid +
    '/' +
    data.topicid +
    '/' +
    data.childId;

  console.log(
    url,
    '$$$$$$$$$$$$$$$$GET_TOPIC_DETAILS_URL=======================',
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

      console.log(Data.data, 'GET_TOPIC_DETAILS_URL_response................');
      return {data: Data.data};
    }
  } catch (error) {
    console.log(
      error,
      '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$GET_TOPIC_DETAILS_URL_error.......',
    );

    throw error;
  }
};

export const getContentQuizActionAPI = async (data = {}) => {
  const url = GET_CONTENT_QUIZ_URL + data.contentid;
  const token = await AsyncStorage.getObject('@auth_Token');
  console.log(url, 'GET_CONTENT_QUIZ_URL=======================');
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    //   body: JSON.stringify(phone),
  };

  try {
    const response = await axios.get(url, requestOptions);
    if (!response.status) {
      throw new Error('Network response was not ok');
    }
    const Data = await response.data.data;
    console.log(Data, 'GET_CONTENT_QUIZ_URL_response................');
    return {data: Data};
  } catch (error) {
    console.log(error, 'GET_CONTENT_QUIZ_URL_error.......');
    throw error;
  }
};

export const answerReattemptSubmitApi = async (
  bodydata: any,
  callBack: any,
) => {
  const url = GET_REATTEMPT_ANSWER_BY_SUBMIT_URL;
  console.log(
    url,
    'GET_REATTEMPT_ANSWER_BY_SUBMIT_URL...........url...........................',
  );
  const token = await AsyncStorage.getObject('@auth_Token');
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodydata),
  };

  try {
    // const response = await axios.post(url,bodydata, requestOptions);
    const response = await fetch(url, requestOptions);

    console.log(
      response,
      'GET_REATTEMPT_ANSWER_BY_SUBMIT_URL.........response..........',
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
    console.log(error, 'GET_REATTEMPT_ANSWER_BY_SUBMIT_URL.....error.......');

    throw error;
  }
};

export const answerSubmitApi = async (bodydata: any, callBack: any) => {
  const url = GET_ANSWER_BY_SUBMIT_URL;
  console.log(
    url,
    'GET_ANSWER_BY_SUBMIT_URL...........url...........................',
  );
  const token = await AsyncStorage.getObject('@auth_Token');
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodydata),
  };

  try {
    // const response = await axios.post(url,bodydata, requestOptions);
    const response = await fetch(url, requestOptions);

    console.log(
      response,
      'GET_ANSWER_BY_SUBMIT_URL.........response..........',
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
    console.log(error, 'GET_ANSWER_BY_SUBMIT_URL.....error.......');

    throw error;
  }
};

export const createabove90PercentageBSEApi = async (
  bodydata: any,
  callBack: any,
) => {
  const url = CREATE_CHILD_ABOVE_90_PERCENTAGE_BSE_URL;
  console.log(
    url,
    'CREATE_CHILD_ABOVE_90_PERCENTAGE_BSE_URL...........url...........................',
  );
  const token = await AsyncStorage.getObject('@auth_Token');
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodydata),
  };

  try {
    // const response = await axios.post(url,bodydata, requestOptions);
    const response = await fetch(url, requestOptions);

    console.log(
      response,
      'CREATE_CHILD_ABOVE_90_PERCENTAGE_BSE_URL.........response..........',
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
      'CREATE_CHILD_ABOVE_90_PERCENTAGE_BSE_URL.....error.......',
    );

    throw error;
  }
};

export const createabove90PercentageOtherApi = async (
  bodydata: any,
  callBack: any,
) => {
  const url = CREATE_CHILD_ABOVE_90_PERCENTAGE_OTHER_URL;
  console.log(
    url,
    'CREATE_CHILD_ABOVE_90_PERCENTAGE_OTHER_URL...........url...........................',
  );
  const token = await AsyncStorage.getObject('@auth_Token');
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodydata),
  };

  try {
    // const response = await axios.post(url,bodydata, requestOptions);
    const response = await fetch(url, requestOptions);

    console.log(
      response,
      'CREATE_CHILD_ABOVE_90_PERCENTAGE_OTHER_URL.........response..........',
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
      'CREATE_CHILD_ABOVE_90_PERCENTAGE_OTHER_URL.....error.......',
    );

    throw error;
  }
};

export const createBelow90PercentageBSEApi = async (
  bodydata: any,
  callBack: any,
) => {
  const url = CREATE_CHILD_BELOW_90_PERCENTAGE_BSE_URL;
  console.log(
    url,
    'CREATE_CHILD_BELOW_90_PERCENTAGE_BSE_URL...........url...........................',
  );
  const token = await AsyncStorage.getObject('@auth_Token');
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodydata),
  };

  try {
    // const response = await axios.post(url,bodydata, requestOptions);
    const response = await fetch(url, requestOptions);

    console.log(
      response,
      'CREATE_CHILD_BELOW_90_PERCENTAGE_BSE_URL.........response..........',
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
      'CREATE_CHILD_BELOW_90_PERCENTAGE_BSE_URL.....error.......',
    );

    throw error;
  }
};

export const createBelow90PercentageOtherApi = async (
  bodydata: any,
  callBack: any,
) => {
  const url = CREATE_CHILD_BELOW_90_PERCENTAGE_OTHER_URL;
  console.log(
    url,
    'CREATE_CHILD_BELOW_90_PERCENTAGE_OTHER_URL...........url...........................',
  );
  const token = await AsyncStorage.getObject('@auth_Token');
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodydata),
  };

  try {
    // const response = await axios.post(url,bodydata, requestOptions);
    const response = await fetch(url, requestOptions);

    console.log(
      response,
      'CREATE_CHILD_BELOW_90_PERCENTAGE_OTHER_URL.........response..........',
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
      'CREATE_CHILD_BELOW_90_PERCENTAGE_OTHER_URL.....error.......',
    );

    throw error;
  }
};

export const AddChildRevisionAPI = async (
  bodydata: any,
  
) => {
  const url = ADD_CHILD_REVISION_URL;
  console.log(
    url,
    'ADD_CHILD_REVISION_URL...........url...........................',
  );
  const token = await AsyncStorage.getObject('@auth_Token');
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodydata),
  };

  try {
    // const response = await axios.post(url,bodydata, requestOptions);
    const response = await fetch(url, requestOptions);

    console.log(
      response,
      'ADD_CHILD_REVISION_URL.........response..........',
    );
    // const Data = await response.data;
    const Data = await response.json();

    console.log(Data, 'Data........................');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    if (response.ok) {
      // if (callBack) callBack();
      return {data: Data};
    }
  } catch (error) {
    console.log(
      error,
      'ADD_CHILD_REVISION_URL.....error.......',
    );

    throw error;
  }
};
