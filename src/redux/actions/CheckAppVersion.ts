import axios from "axios";
import { GET_APP_VERSION_URL } from "../../../constants/ApiPaths";
import AsyncStorage from "../../utils/AsyncStorage";


export const getAppVersionApi = (setAppId:any, setAppVersion:any, setAppStatus:any, setAppVisible:any) => {
  return async dispatch => {
    let token = '';
    // let authHeaderVal = await authHeader();
    // await AsyncStorage.getItem('userToken').then(data => {
    //   token = data;
    // });

    console.log(
      GET_APP_VERSION_URL + '/' + 'NotevedApp01',
      'GET_APP_VERSION_URL.............',
    );
    // if (authHeaderVal != null) {
    await axios
      .get(GET_APP_VERSION_URL + '/' + 'NotevedApp01')
      .then(async function (response) {
        const {data = []} = response.data;
        const {appid = '', edappversion = '', visible = false} = data.length > 0 ? data[0] : '';
        // await AsyncStorage.setItem(
        //   'appVersion',
        //   JSON.stringify(response.data.data),
        // );
        if (setAppId) setAppId(appid);
        if (setAppVersion) setAppVersion(edappversion);
        if (setAppStatus) setAppStatus(data[0]);
        if (setAppVisible) setAppVisible(visible);
        //
        // const{ data:list=[],status=false,message=''}=response.data
        // if (response.data.status) {
        // console.log(
        //   response.data,
        //   'GET_APP_VERSION_URL response==============',
        // );
        // setLoading(false);
      })
      .catch(function (error) {
        // handle error
        // setLoading(false);
      })
      .finally(function () {
        // always executed
        // setLoading(false);
      });
    // }
  };
};