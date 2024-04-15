import { CREATE_ZOOM_URL } from "../../../constants/ApiPaths";

export const getZoomClassActionAPI = async (data = {}) => {
  const url =
    CREATE_ZOOM_URL +
    "/" +
    data.scholarshipid +
    "/" +
    data.stageid +
    "/" +
    data.boardid;
  console.log(url, "CREATE_ZOOM_URL=======================", data, "====data");
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    //   body: JSON.stringify(phone),
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const Data = await response.json();
    console.log(Data, "CREATE_ZOOM_URL_response................");
    return { data: Data.data };
  } catch (error) {
    console.log(error, "CREATE_ZOOM_URL_error.......");

    throw error;
  }
};
