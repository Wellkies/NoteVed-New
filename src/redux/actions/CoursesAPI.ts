import { GET_ALL_COURSES_URL, GET_ALL_SUBJECTS_BY_COURSE_URL } from "../../../constants/ApiPaths";
import AsyncStorage from "../../utils/AsyncStorage";

export const getAllCoursesActionAPI = async () => {
  const url = GET_ALL_COURSES_URL;

  console.log(url, "GET_ALL_COURSES_URL=======================");
  const token = await AsyncStorage.getObject("@auth_Token");
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const Data = await response.json();
    console.log(Data, "GET_ALL_COURSES_URL_response................");
    return { data: Data.data };
  } catch (error) {
    console.log(error, "GET_ALL_COURSES_URL_error.......");
    throw error;
  }
};

export const getAllSubjectActionAPI = async () => {
    const url = GET_ALL_SUBJECTS_BY_COURSE_URL;
  
    console.log(url, "GET_ALL_SUBJECTS_BY_COURSE_URL=======================");
    const token = await AsyncStorage.getObject("@auth_Token");
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const Data = await response.json();
      console.log(Data, "GET_ALL_SUBJECTS_BY_COURSE_URL_response................");
      return { data: Data.data };
    } catch (error) {
      console.log(error, "GET_ALL_SUBJECTS_BY_COURSE_URL_error.......");
      throw error;
    }
  };
