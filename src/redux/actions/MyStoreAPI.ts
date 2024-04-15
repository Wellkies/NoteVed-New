import axios from "axios";
import {
  COUPON_DISCOUNT_FOR_PRODUCT_URL,
  CREATE_ADDRESS_URL,
  CREATE_ADD_TO_CART_URL,
  CREATE_MANY_CHILD_ORDER_URL,
  DELETE_ALL_FROM_CART_URL,
  DELETE_USER_ADDRESS_URL,
  GET_ADDRESS_BY_ID_URL,
  GET_ALL_PRODUCT_URL,
  GET_CART_ITEM_URL,
  GET_CHILD_ORDERS_BY_CHILDID_URL,
  GET_ORDER_DETAILS_URL,
  GET_PRODUCT_BY_ID_URL,
  GET_SIGNATURE_VERIFICATION_API,
  GET_USER_ADDRESS_BY_CHILD_URL,
  REMOVE_FROM_CART_URL,
  UPDATE_CART_ITEM_URL,
  UPDATE_USER_ADDRESS_URL,
} from "../../../constants/ApiPaths";
import AsyncStorage from "../../utils/AsyncStorage";

export const getAllProductActionAPI = async () => {
  const url = GET_ALL_PRODUCT_URL;
  console.log(url, "GET_ALL_PRODUCT_URL=======================");
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
    }
    const Data = await response.json();
    console.log(Data, "GET_ALL_PRODUCT_URL_response................");
    return { data: Data.data };
  } catch (error) {
    console.log(error, "GET_ALL_PRODUCT_URL_error.......");
    throw error;
  }
};

export const getProductByIdActionAPI = async (data = {}) => {
  const url = GET_PRODUCT_BY_ID_URL + data;
  // console.log(url, "GET_PRODUCT_BY_ID_URL=======================");
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
    }
    const Data = await response.json();
    // console.log(Data, "GET_PRODUCT_BY_ID_URL_response................");
    return { data: Data.data };
  } catch (error) {
    console.log(error, "GET_PRODUCT_BY_ID_URL_error.......");
    throw error;
  }
};

export const getUserAllAddressActionAPI = async (data = {}) => {
  const url = GET_USER_ADDRESS_BY_CHILD_URL + data;
  console.log(url, "GET_USER_ADDRESS_BY_CHILD_URL=======================");
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
    }
    const Data = await response.json();
    console.log(Data, "GET_USER_ADDRESS_BY_CHILD_URL_response................");
    return { data: Data.data };
  } catch (error) {
    console.log(error, "GET_USER_ADDRESS_BY_CHILD_URL_error.......");
    throw error;
  }
};

export const getCartItemActionAPI = async (data = {}) => {
  const url = GET_CART_ITEM_URL + "/" + data;
  console.log(url, "GET_CART_ITEM_URL=======================");
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
    }
    const Data = await response.json();
    console.log(Data, "GET_CART_ITEM_URL_response................");
    return { data: Data.data };
  } catch (error) {
    console.log(error, "GET_CART_ITEM_URL_error.......");
    throw error;
  }
};

export const getChildAllOrdersActionAPI = async (data = {}) => {
  const url = GET_CHILD_ORDERS_BY_CHILDID_URL + data;
  console.log(url, "GET_CHILD_ORDERS_BY_CHILDID_URL=======================");
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
    }
    const Data = await response.json();
    console.log(
      Data,
      "GET_CHILD_ORDERS_BY_CHILDID_URL_response................"
    );
    return { data: Data.data };
  } catch (error) {
    console.log(error, "GET_CHILD_ORDERS_BY_CHILDID_URL_error.......");
    throw error;
  }
};

export const createAddToCartApi = async (bodydata: any, callBack: any) => {
  const url = CREATE_ADD_TO_CART_URL;
  console.log(url, "CREATE_ADD_TO_CART_URL............................");
  const token = await AsyncStorage.getObject("@auth_Token");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWY0Njk4MTE3MmZmNGQ5YmRjZTAwNSIsImlhdCI6MTcwMDExNjM3NiwiZXhwIjoxNzMxNjUyMzc2fQ.ZyEy3RRUPKwxUIU4BV0CEuCne-hDbW7fEztRUAVSqUI`,
    },
    body: JSON.stringify(bodydata),
  };
  try {
    // const response = await axios.post(url,bodydata, requestOptions);
    const response = await fetch(url, requestOptions);
    console.log(response, "CREATE_ADD_TO_CART_URL_response..........");
    // const Data = await response.data;
    const Data = await response.json();
    console.log(Data, "CREATE_ADD_TO_CART_URL_Data........................");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    if (response.ok) {
      if (callBack) callBack();
      return { data: Data };
    }
  } catch (error) {
    console.log(error, "CREATE_ADD_TO_CART_URL_error.......");
    throw error;
  }
};

export const updateCartUrl = async (bodydata: any, callBack: any) => {
  const url = UPDATE_CART_ITEM_URL;
  console.log(url, "UPDATE_CART_ITEM_URL.............................");
  const token = await AsyncStorage.getObject("@auth_Token");
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodydata),
  };
  try {
    // const response = await axios.post(url,bodydata, requestOptions);
    const response = await fetch(url, requestOptions);
    // console.log(response, "UPDATE_CART_ITEM_URL_response..........");
    // const Data = await response.data;
    const Data = await response.json();
    console.log(Data, "UPDATE_CART_ITEM_URL_Data........................");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    if (response.ok) {
      if (callBack) callBack();
      return { data: Data };
    }
  } catch (error) {
    console.log(error, "UPDATE_CART_ITEM_URL_error.......");
    throw error;
  }
};

export const couponDiscountForProductAPI = async (
  bodydata: any,
  callBack: any
) => {
  const url = COUPON_DISCOUNT_FOR_PRODUCT_URL;
  console.log(
    url,
    "COUPON_DISCOUNT_FOR_PRODUCT_URL............................"
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
    // console.log(response, "COUPON_DISCOUNT_FOR_PRODUCT_URL_response..........");
    // const Data = await response.data;
    const Data = await response.json();
    console.log(
      Data,
      "COUPON_DISCOUNT_FOR_PRODUCT_URL_res_Data........................"
    );
    const { discountedPrice = "", message = "", totalPrice = "" } = Data;
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    if (response.ok) {
      if (callBack) callBack(discountedPrice, message, totalPrice);
      return { data: Data };
    }
  } catch (error) {
    console.log(error, "COUPON_DISCOUNT_FOR_PRODUCT_URL_error.......");
    throw error;
  }
};

export const getAddressByIdActionAPI = async (data = {}) => {
  const url = GET_ADDRESS_BY_ID_URL + data;
  console.log(url, "GET_ADDRESS_BY_ID_URL=======================");
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
    }
    const Data = await response.json();
    console.log(Data, "GET_ADDRESS_BY_ID_URL_response................");
    return { data: Data.data };
  } catch (error) {
    console.log(error, "GET_ADDRESS_BY_ID_URL_error.......");
    throw error;
  }
};

export const AddManyProductChildOrderAPI = async (
  bodydata: any,
  callBack: any
) => {
  const url = CREATE_MANY_CHILD_ORDER_URL;
  console.log(
    url,
    "=============CREATE_MANY_CHILD_ORDER_URL",
    bodydata,
    "============bodyData"
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
    console.log(response, "CREATE_MANY_CHILD_ORDER_URL_response..........");
    // const Data = await response.data;
    const Data = await response.json();
    console.log(
      Data,
      "CREATE_MANY_CHILD_ORDER_URL_Data........................"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    if (response.ok) {
      if (callBack) callBack();
      return { data: Data };
    }
  } catch (error) {
    console.log(error, "CREATE_MANY_CHILD_ORDER_URL_error.......");
    throw error;
  }
};

export const deleteAllCartItemAPI = async (BodyData = {}, callBack: any) => {
  const url = DELETE_ALL_FROM_CART_URL;
  console.log(
    url,
    "DELETE_ALL_FROM_CART_URL...........................",
    BodyData,
    "=============BodyData"
  );
  const token = await AsyncStorage.getObject("@auth_Token");
  // const requestOptions = {
  //   method: "DELETE",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },
  //   body: JSON.stringify(BodyData),
  // };

  try {
    axios
      .delete(DELETE_ALL_FROM_CART_URL, {
        data: { childid: BodyData },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response.data, "DELETE_ALL_FROM_CART_URL_response");
        if (callBack) callBack();
      })
      .catch(function (error) {
        // handle error
        console.log(error, "DELETE_ALL_FROM_CART_URL_error_response");
      });
    // const response = await fetch(url, requestOptions);
    // if (!response.ok) {
    //   throw new Error("Network response was not ok");
    // }
    // const data = await response.json();
    // if (response.ok) {
    //   if (callBack) callBack();
    //   console.log(data, "DELETE_ALL_FROM_CART_URL_response................");
    //   return { data: data };
    // }
  } catch (error) {
    console.log(error, "DELETE_ALL_FROM_CART_URL_error.......");
    throw error;
  }
};

export const removeCartItemApi = async (BodyData = {}, callBack: any) => {
  const url = REMOVE_FROM_CART_URL;
  console.log(
    url,
    "REMOVE_FROM_CART_URL...........................",
    BodyData,
    "=============BodyData"
  );
  const token = await AsyncStorage.getObject("@auth_Token");
  // const requestOptions = {
  //   method: "DELETE",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },
  //   body: JSON.stringify(BodyData),
  // };

  try {
    axios
      .delete(REMOVE_FROM_CART_URL, {
        data: { id: BodyData },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response.data, "delete response");
        if (callBack) callBack();
      })
      .catch(function (error) {
        // handle error
        console.log(error, "REMOVE_FROM_CART_URL_error_response");
      });

    //   const response = await fetch(url, requestOptions);
    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }
    //   const data = await response.json();
    //   if (response.ok) {
    //     if (callBack) callBack();
    //     console.log(data, "REMOVE_FROM_CART_URL_response................");
    //     return { data: data };
    //   }
  } catch (error) {
    console.log(error, "REMOVE_FROM_CART_URL_error.......");
    throw error;
  }
};

export const UpdateUserAddressAPI = async (bodydata: any, callBack: any) => {
  const url = UPDATE_USER_ADDRESS_URL;
  console.log(url, "UPDATE_USER_ADDRESS_URL.............................");
  const token = await AsyncStorage.getObject("@auth_Token");
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodydata),
  };
  try {
    // const response = await axios.post(url,bodydata, requestOptions);
    const response = await fetch(url, requestOptions);
    console.log(response, "UPDATE_USER_ADDRESS_URL_response..........");
    // const Data = await response.data;
    const Data = await response.json();
    console.log(Data, "UPDATE_USER_ADDRESS_URL_Data........................");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    if (response.ok) {
      if (callBack) callBack();
      return { data: Data };
    }
  } catch (error) {
    console.log(error, "UPDATE_USER_ADDRESS_URL_error.......");
    throw error;
  }
};

export const createUserAddressAPI = async (bodydata: any, callBack: any) => {
  const url = CREATE_ADDRESS_URL;
  console.log(url, "CREATE_ADDRESS_URL............................");
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
    console.log(response, "CREATE_ADDRESS_URL_response..........");
    // const Data = await response.data;
    const Data = await response.json();
    console.log(Data, "CREATE_ADDRESS_URL_Data........................");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    if (response.ok) {
      if (callBack) callBack();
      return { data: Data };
    }
  } catch (error) {
    console.log(error, "CREATE_ADDRESS_URL_error.......");
    throw error;
  }
};

export const removeAddressAPI = async (BodyData = {}, callBack: any) => {
  const url = DELETE_USER_ADDRESS_URL;
  console.log(
    url,
    "DELETE_USER_ADDRESS_URL...........................",
    BodyData,
    "=============BodyData"
  );
  const token = await AsyncStorage.getObject("@auth_Token");
  // const requestOptions = {
  //   method: "DELETE",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },
  //   body: JSON.stringify(BodyData),
  // };

  try {
    axios
      .delete(DELETE_USER_ADDRESS_URL, {
        data: { id: BodyData },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response.data, "DELETE_USER_ADDRESS_URL_response");
        if (callBack) callBack();
      })
      .catch(function (error) {
        // handle error
        console.log(error, "DELETE_USER_ADDRESS_URL_error_response");
      });
    // const response = await fetch(url, requestOptions);
    // if (!response.ok) {
    //   throw new Error("Network response was not ok");
    // }
    // const data = await response.json();
    // if (response.ok) {
    //   if (callBack) callBack();
    //   console.log(data, "DELETE_USER_ADDRESS_URL_response................");
    //   return { data: data };
    // }
  } catch (error) {
    console.log(error, "DELETE_USER_ADDRESS_URL_error.......");
    throw error;
  }
};

export const getOrderDetailsActionAPI = async (data = {}) => {
  const url = GET_ORDER_DETAILS_URL + data;
  console.log(url, "GET_ORDER_DETAILS_URL=======================");
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
    }
    const Data = await response.json();
    console.log(Data, "GET_ORDER_DETAILS_URL_response................");
    return { data: Data.data };
  } catch (error) {
    console.log(error, "GET_ORDER_DETAILS_URL_error.......");
    throw error;
  }
};
