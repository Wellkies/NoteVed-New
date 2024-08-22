import {
  COUPONCODE_DISCOUNT_URL,
  CREATE_SCHOLARSHIP_MEMBERSHIP_URL,
  GET_AVAILABLE_COUPONCODE_URL,
  GET_LICENSE_SCHOLARSHIP,
  GET_SCHOLARSHIP_PREMIUM_URL,
  GET_SIGNATURE_VERIFICATION_API,
} from '../../../constants/ApiPaths';
import axios from 'axios';
import AsyncStorage from '../../utils/AsyncStorage';

export const getScholarshipPremiumActionAPI = async (data = {}) => {
  // console.log(data, "data..................");
  // const {stageid='',
  //     boardid=''}=data
  const url =
    GET_SCHOLARSHIP_PREMIUM_URL +
    '/' +
    data.childid;
  console.log(url, 'GET_SCHOLARSHIP_PREMIUM_URL...........................');
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
    // console.log(
    //   response.data,
    //   "GET_SCHOLARSHIP_PREMIUM_URL_response..............."
    // );
    if (!response.status) {
      throw new Error('Network response was not ok');
    }
    const Data = await response.data.data;
    // console.log(
    //   Data,
    //   'getPremiumAccessActionAPI.............data................',
    // );
    return {data: Data};
  } catch (error) {
    console.log(error, 'GET_SCHOLARSHIP_PREMIUM_URL_error.......');

    throw error;
  }
};

export const getPremiumAccessActionAPI = async (data = {}) => {
  // console.log(data, "data..................");
  // const {stageid='',
  //     boardid=''}=data
  const token = await AsyncStorage.getObject('@auth_Token');
  const url = GET_LICENSE_SCHOLARSHIP + '/' + data.stageid + '/' + data.boardid;
  console.log(url, 'GET_LICENSE_SCHOLARSHIP_url...........................');
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
    //   'GET_LICENSE_SCHOLARSHIP_response................',
    // );
    return {data: Data};
  } catch (error) {
    console.log(error, 'GET_LICENSE_SCHOLARSHIP_error.......');

    throw error;
  }
};
export const getCouponActionAPI = async () => {
  const url = GET_AVAILABLE_COUPONCODE_URL;
  console.log(url, 'GET_AVAILABLE_COUPONCODE_URL...........................');
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
    // console.log(
    //   Data,
    //   'GET_AVAILABLE_COUPONCODE_URL_response................',
    // );
    return {data: Data};
  } catch (error) {
    console.log(error, 'GET_AVAILABLE_COUPONCODE_URL_error.......');

    throw error;
  }
};

export const couponCodeDiscountApi = async (bodydata: any, callBack: any) => {
  const url = COUPONCODE_DISCOUNT_URL;
  console.log(url, 'COUPONCODE_DISCOUNT_URL...........................');
  const token = await AsyncStorage.getObject('@auth_Token');
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWY0Njk4MTE3MmZmNGQ5YmRjZTAwNSIsImlhdCI6MTcwMDExNjM3NiwiZXhwIjoxNzMxNjUyMzc2fQ.ZyEy3RRUPKwxUIU4BV0CEuCne-hDbW7fEztRUAVSqUI`,
    },
  };

  try {
    const response = await axios.post(url, bodydata, requestOptions);
    if (!response.status) {
      throw new Error('Network response was not ok');
    }

    const Data = await response.data;
    const {
      data,
      status = false,
      message = '',
      percentage = '',
      updatedAmount = '',
    } = response.data;
    console.log(
      response.data,
      'response.data...............',
      updatedAmount,
      percentage,
      message,
    );
    if (response.status) {
      if (callBack) callBack(updatedAmount, percentage, message);
      console.log(
        updatedAmount,
        percentage,
        message,
        'message......................??????',
      );
      return {data: Data};
    }
  } catch (error) {
    console.log(error, 'COUPONCODE_DISCOUNT_URL_error.......');

    throw error;
  }
};

export const craeteScholarshipMembershipApi = async (
  bodydata: any,
  callBack: any,
) => {
  const url = CREATE_SCHOLARSHIP_MEMBERSHIP_URL;
  console.log(
    url,
    'CREATE_SCHOLARSHIP_MEMBERSHIP_URL...........................',
  );
  const token = await AsyncStorage.getObject('@auth_Token');
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWY0Njk4MTE3MmZmNGQ5YmRjZTAwNSIsImlhdCI6MTcwMDExNjM3NiwiZXhwIjoxNzMxNjUyMzc2fQ.ZyEy3RRUPKwxUIU4BV0CEuCne-hDbW7fEztRUAVSqUI`,
    },
  };

  try {
    const response = await axios.post(url, bodydata, requestOptions);
    console.log(
      response,
      'CREATE_SCHOLARSHIP_MEMBERSHIP_URL_response...................',
    );
    if (!response.status) {
      throw new Error('Network response was not ok');
    }

    const Data = await response.data;

    if (response.data) {
      if (callBack) callBack();
    }
    return {data: Data};
  } catch (error) {
    console.log(error, 'CREATE_SCHOLARSHIP_MEMBERSHIP_URL_error.......');

    throw error;
  }
};

// export const getSignatureVerification = async (
//   bodydata: any,
//   callBack: any,
// ) => {
//   const url = GET_SIGNATURE_VERIFICATION_API;
//   console.log(
//     url,
//     'GET_SIGNATURE_VERIFICATION_API_url...........................',
//   );
//   const token = await AsyncStorage.getObject('@auth_Token');
//   const requestOptions = {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   try {
//     // const response = await axios.post(url, bodydata, requestOptions);
//     // console.log(response, 'GET_SIGNATURE_VERIFICATION_API_response..........');
//     // const Data = await response.data;
//     // // const {
//     // //   razorpay_payment_id
//     // // } = response.data
//     // console.log(Data, 'Data........................');

//     const response = await fetch(url, requestOptions);
//     console.log(response, 'GET_SIGNATURE_VERIFICATION_API_response..........');
//     // const Data = await response.data;
//     const Data = await response.json();
//     const {
//         razorpay_payment_id
//       } = Data
//     console.log(Data, "GET_SIGNATURE_VERIFICATION_API_Data...............");
//     if (!response.status) {
//       throw new Error('Network response was not ok');
//     }

//     if (response) {
//       // if (callBack) callBack();
//       if (callBack) callBack(razorpay_payment_id);
//       return {data: Data};
//     }
//   } catch (error) {
//     console.log(error, 'GET_SIGNATURE_VERIFICATION_API_error.......');
//     throw error;
//   }
// };

export const getSignatureVerification = async (
  bodydata: any,
  callBack: any
) => {
  const url = GET_SIGNATURE_VERIFICATION_API;
  console.log(
    url,
    "GET_SIGNATURE_VERIFICATION_API............................",
    bodydata,"=============bodydata"
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
    // console.log(response, "GET_SIGNATURE_VERIFICATION_API_response..........");
    // const Data = await response.data;
    const Data = await response.json();
    console.log(
      Data,
      "GET_SIGNATURE_VERIFICATION_API_res_Data........................",response,"=====response"
    );
    const { razorpay_payment_id = "" } = bodydata;
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    if (response.ok) {
      if (callBack) callBack(razorpay_payment_id);
      return { data: Data };
    }
  } catch (error) {
    console.log(error, "GET_SIGNATURE_VERIFICATION_API_error.......");
    throw error;
  }
};
