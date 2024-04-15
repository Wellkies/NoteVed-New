import { API_URL, GET_STANDARD_API } from "../../../constants/ApiPaths";


export const getStandardAction = async (
    // authtoken='',
    // signOut='',
    // id='',
    // setLoading='',
    // callBack='',
    
    
    ) => {
        const url =GET_STANDARD_API
  console.log(url,"url...........................")
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    //   body: JSON.stringify(phone),
    };
  
    try {
      const response = await fetch(url, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const Data = await response.json();
     console.log(Data,"STUDENTSTANDARD.............data................")
      return {data: Data.data};

    } catch (error) {
      console.log(error,"error.......")

      throw error;
    }
  };
  