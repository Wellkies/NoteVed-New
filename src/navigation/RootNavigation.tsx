import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStackScreen from './RootStack';
import BottomTabNavigator from './BottomTabNavigator';
import { useAppSelector } from '../redux/store/reducerHook'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { selectUserInfo, getDatafromAsync } from '../redux/reducers/loginReducer';
import Storage from '../utils/AsyncStorage';
export const RootNavigator = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const fetchData = async () => {
      const authtoken = await Storage.getObject("@auth_Token")
      const user = await Storage.getObject("@user")
      dispatch(getDatafromAsync({ user: user, authtoken: authtoken }))
    }

    fetchData();
  }, []);
  const { authToken, status, userInfo } = useAppSelector(selectUserInfo);
  console.log(authToken, "authToken");

  return (
    <>
      {/* {authToken == null || authToken == "" ? (
        <RootStackScreen />
      ) : (
        <BottomTabNavigator />
      )} */}

      <BottomTabNavigator />
    </>
  );
}