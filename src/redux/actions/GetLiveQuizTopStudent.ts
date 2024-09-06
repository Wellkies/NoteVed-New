import axios from "axios";
import { GET_LIVE_QUIZ_TOP_STUDENT_URL } from "../../../constants/ApiPaths";
import AsyncStorage from "../../utils/AsyncStorage";

export const getLiveQuizTopStudentActionAPI = async (data = {}) => {
    const url =
    GET_LIVE_QUIZ_TOP_STUDENT_URL +
      data.quizid ;
      
    const token = await AsyncStorage.getObject('@auth_Token');
    console.log(
      url,
      '%%%%%%%%%%%%%getLiveQuizTopStudentActionAPI...............................',
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
console.log(Data,"--------------------------%getLiveQuizTopStudentActionAPI.----------")
      return {data: Data.data};
    } catch (error) {
      console.log(error, 'getLiveQuizTopStudentActionAPI.....error.......');
  
      throw error;
    }
  };