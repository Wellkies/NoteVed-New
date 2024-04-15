import React, { useEffect, useReducer, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  PermissionsAndroid,
  Platform,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { useNetInfo } from '@react-native-community/netinfo';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {request} from 'react-native-permissions';
import {
  NotificationServices,
  requestUserPermission,
} from './services/PushNotification_handler';
import {handleNavigationRefAvailable} from './src/navigation/Navigationref';
// import {device_height, device_width} from './src/screens/style';
import { AuthContext } from './context';
// import Colors from './assets/Colors';
import { store, RootState, AppDispatch } from './src/redux/store/Store';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import NetInfo from './src/screens/CommonScreens/NetInfo';
import RootStackScreen from './src/navigation/RootStack';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { fetchUserAsync, selectUserInfo, getDatafromAsync } from './src/redux/reducers/loginReducer';
import { useAppSelector } from './src/redux/store/reducerHook'
import { RootNavigator } from './src/navigation/RootNavigation';
import Storage from './src/utils/AsyncStorage';

export const navigationRef = React.createRef();

interface ILoginState {
  isLoading: boolean;
  userName: string | null;
  userToken: string | null;
}

const App: React.FC = () => {

  const initialLoginState: ILoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };
  // const dispatch = useDispatch<any>()
  const [visible, setVisible] = useState(false);

  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.allowFontScaling = false;
  
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;
  

  const netInfo = useNetInfo();

  useEffect(() => {
    setVisible(true);
    askForPermission();
    console.log(netInfo?.isConnected,"===============netInfo?.isConnected");
    setTimeout(() => {
      if (netInfo?.isConnected) {
        setVisible(false);
      }
    }, 1000);
  }, [netInfo?.isConnected]);

  const askForPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        console.log('=====askForPermission called');
      } catch (error) {
        console.log(error, '===========func error');
      }
    }
  };

  const loginReducer = (prevState: any, action: any) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  // const [loginState, dispatch] = React.useReducer(
  //   loginReducer,
  //   initialLoginState,
  // );
  // console.log(loginState,"loginState===========app.js");

  // const googleSignOut = async () => {
  //   try {
  //     // await GoogleSignin.configure();
  //     // await GoogleSignin.signOut();
  //     // setState({ user: null }); // Remember to remove the user from your app's state as well
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };



  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser: any, authtoken: string) => {
        const userToken = String(authtoken);
        const userData = JSON.stringify(foundUser);
        // console.log(userData[0].parentid)

        // console.log(userData, userToken, 'authtoken');
        try {
          await AsyncStorage.setItem('newUser', String(false));
          await AsyncStorage.setItem('userToken', userToken);
          await AsyncStorage.setItem('userInfo', userData);
        } catch (e) {
          //console.log(e);
        }
        dispatch({ type: 'LOGIN', id: 'userName', token: userToken });
      },

      // signIn: async (foundUser: any, authtoken: string) => {
      //   const userToken = String(authtoken);
      //   const userData = foundUser.length > 0 ? foundUser[0] : {};
      //   const childData = JSON.stringify(userData);
      //   // console.log(userData[0].parentid)

      //   // console.log(userData, userToken, 'authtoken');
      //   try {
      //     //         await AsyncStorage.setItem('newUser', String(false));
      //     //         await AsyncStorage.setItem('userToken', userToken);
      //     //         await AsyncStorage.setItem('userInfo', childData);
      //   } catch (e) {
      //     //console.log(e);
      //   }
      //       dispatch({type: 'LOGIN', id: 'userName', token: userToken});
      //     },


      //     signOut: async () => {
      //       try {
      //         await AsyncStorage.removeItem('userToken');
      //         await AsyncStorage.removeItem('newUser');
      //         await AsyncStorage.removeItem('userInfo');
      //         googleSignOut();
      //         // console.log("=====sign out");
      //       } catch (e) {
      //         //console.log(e);
      //       }
      //       dispatch({type: 'LOGOUT'});
      //     },
      //     signUp: () => {
      //       // setUserToken('fgkj');
      //       // setIsLoading(false);
      //     },
      //     // toggleTheme: () => {
      //     //   setIsDarkTheme(isDarkTheme => !isDarkTheme);
      //     // },
    }),
    [],
  );

  // useEffect(() => {
  //   setTimeout(async () => {
  //     let userToken;
  //     userToken = null;
  //     try {
  //       // userToken = await AsyncStorage.getItem('userToken');
  //     } catch (e) {
  //       //console.log(e);
  //     }
  //     // dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
  //   }, 1000);
  //   // requestUserPermission();
  //   // NotificationServices();
  // }, []);

  // if (loginState.isLoading) {
  //   return (
  //     <ImageBackground
  //       style={{
  //         width: device_width,
  //         height: device_height,
  //         flex: 1,
  //         alignSelf: 'center',
  //       }}
  //       resizeMode="cover"
  //       source={require('./assets/0.png')}>
  //       <View
  //         style={{
  //           flex: 1,
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //           backgroundColor: '#fff',
  //         }}>
  //         <ActivityIndicator size={'large'} color={'#f1a722'} />
  //       </View>
  //     </ImageBackground>
  //   );
  // }

  // const store = ConfigureStore();

  return (
    <AuthContext.Provider value={authContext}>
      {visible ? (
        <NetInfo />
      ) : (
        <Provider store={store}>
          <NavigationContainer
            // ref={navigationRef}
            // onReady={handleNavigationRefAvailable}
            >
            {/* {loginState.userToken !== null ? (
              <BottomTabNavigator />
            ) : (
              <RootStackScreen />
            )} */}
            <RootNavigator />
          </NavigationContainer>
        </Provider>
      )}
    </AuthContext.Provider>
  );
};

export default App;