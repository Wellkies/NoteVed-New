import {
  GET_ALL_COURSES_URL,
  GET_ALL_SUBJECTS_BY_COURSE_URL,
  GET_CONTENT_BY_CONTENTID_URL,
  GET_CONTENT_BY_TOPICID_URL,
  GET_TOPICS_BY_SUBJECTID_URL,
} from '../../../constants/ApiPaths';
import AsyncStorage from '../../utils/AsyncStorage';

export const getAllCoursesActionAPI = async () => {
  const url = GET_ALL_COURSES_URL;

  //
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
    //
    return {data: Data.data};
  } catch (error) {
    //
    throw error;
  }
};

export const getAllSubjectActionAPI = async () => {
  const url = GET_ALL_SUBJECTS_BY_COURSE_URL;

  
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
    // console.log(
    //   Data,
    //   'GET_ALL_SUBJECTS_BY_COURSE_URL_response................',
    // );
    return {data: Data.data};
  } catch (error) {
    //
    throw error;
  }
};

export const getTopicsBySubIdActionAPI = async (data = {}) => {
  const url = GET_TOPICS_BY_SUBJECTID_URL + data.subjectid + '/' + data.childid;
  
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
    //
    return {data: Data.data};
  } catch (error) {
   // 
    throw error;
  }
};

export const getContentByTopicIdActionAPI = async (data = {}) => {
  const url = GET_CONTENT_BY_TOPICID_URL + data.topicid + '/' + data.childid;
  console.log(
    url,
    'GET_CONTENT_BY_TOPICID_URL======================='
  );
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
   // 
    return {data: Data.data};
  } catch (error) {
   // 
    throw error;
  }
};


export const getContentByContentIdActionAPI = async (data = {}) => {
  const url = GET_CONTENT_BY_CONTENTID_URL + data.contentid ;
  console.log(
    url,
    'GET_CONTENT_BY_TOPICID_URL======================='
  );
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
    
   // 
    return {data: Data.data};
  } catch (error) {
   // 
    throw error;
  }
};
