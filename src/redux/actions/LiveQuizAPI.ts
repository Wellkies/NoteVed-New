import {
    ANSWER_SUBMIT_LIVE_QUIZ,
    GET_ALL_LIVE_QUIZ,
    GET_ALL_PAST_LIVE_QUIZ,
    GET_HOMESCREEN_LIVE_QUIZ_TOP_STUDENT_URL,
  } from "../../../constants/ApiPaths";
  import AsyncStorage from "../../utils/AsyncStorage";
  
  export const getLiveQuizAPIAction = async (data = {}) => {
    const url = GET_ALL_LIVE_QUIZ + data.childid;
  
    console.log(url, "$GET_ALL_LIVE_QUIZ=======================");
    const token = await AsyncStorage.getObject("@auth_Token");
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      //   body: JSON.stringify(phone),
    };
  
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        const Data = await response.json();
  
        // console.log(Data.data, "GET_ALL_LIVE_QUIZ_response................");
        const DATA = Data.data;
        return { data: DATA };
      }
    } catch (error) {
      console.log(
        error,
        "$$$GET_ALL_LIVE_QUIZ_error......."
      );
      throw error;
    }
  };
  
  export const LiveQuizAnswerSubmitApi = async (
    bodydata: any,
    callBack: any,
    setLoading: any
  ) => {
    const url = ANSWER_SUBMIT_LIVE_QUIZ;
    console.log(
      url,
      "ANSWER_SUBMIT_LIVE_QUIZ...........url..........................."
    );
    const token = await AsyncStorage.getObject("@auth_Token");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodydata),
    };
  
    try {
      // const response = await axios.post(url,bodydata, requestOptions);
      const response = await fetch(url, requestOptions);
      if (setLoading) setLoading(true);
      console.log(response, "ANSWER_SUBMIT_LIVE_QUIZ.........response..........");
      // const Data = await response.data;
      const Data = await response.json();
  
      console.log(Data, "Data........................");
      if (!response.ok) {
        if (setLoading) setLoading(false);
        throw new Error("Network response was not ok");
      }
      if (response.ok) {
        if (setLoading) setLoading(false);
        if (callBack) callBack();
        return { data: Data };
      }
    } catch (error) {
      if (setLoading) setLoading(false);
      console.log(error, "ANSWER_SUBMIT_LIVE_QUIZ.....error.......");
      throw error;
    }
  };
  
  export const getPastLiveQuizAPIAction = async (data = {}) => {
    const url = GET_ALL_PAST_LIVE_QUIZ + data.childid ;
  
    console.log(url, "$$$$$$$$$$$$$$$$GET_ALL_PAST_LIVE_QUIZ=======================");
    const token = await AsyncStorage.getObject("@auth_Token");
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      //   body: JSON.stringify(phone),
    };
  
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        const Data = await response.json();
  
        // console.log(Data.data, "GET_ALL_PAST_LIVE_QUIZ_response................");
        const DATA = Data.data;
        return { data: DATA };
      }
    } catch (error) {
      console.log(
        error,
        "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$GET_ALL_PAST_LIVE_QUIZ_error......."
      );
      throw error;
    }
  };
  
  export const getHomeScreenTopStudentActionAPI = async () => {
    const url = GET_HOMESCREEN_LIVE_QUIZ_TOP_STUDENT_URL;
  
    const token = await AsyncStorage.getObject("@auth_Token");
    console.log(
      url,
      "%%%%%%%%%%%%%GET_HOMESCREEN_LIVE_QUIZ_TOP_STUDENT_URL..............................."
    );
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWY0Njk4MTE3MmZmNGQ5YmRjZTAwNSIsImlhdCI6MTcwMDExNjM3NiwiZXhwIjoxNzMxNjUyMzc2fQ.ZyEy3RRUPKwxUIU4BV0CEuCne-hDbW7fEztRUAVSqUI`,
      },
    };
  
    try {
      const response = await fetch(url, requestOptions);
      if (!response.status) {
        throw new Error("Network response was not ok");
      }
      const Data = await response.json();
      console.log(
        Data,
        "--------------------------%GET_HOMESCREEN_LIVE_QUIZ_TOP_STUDENT_URL.----------"
      );
      return { data: Data.data };
    } catch (error) {
      console.log(error, "GET_HOMESCREEN_LIVE_QUIZ_TOP_STUDENT_URL_error.......");
      throw error;
    }
  };