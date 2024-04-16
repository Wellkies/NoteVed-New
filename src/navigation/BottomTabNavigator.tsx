import React, {useEffect, useState} from 'react';
// import { NavigationActions } from 'react-navigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
// import SettingsNavigator from './SettingsNavigator';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
import {CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AppStack from './AppStack';
import Colors from '../../assets/Colors';
import {ROUTES} from '../../constants';
import ProfileTabNavigation from './ProfileTabNavigation';
import StoreTabNavigator from './StoreTabNavigator';
import NotificationTabNavigator from './NotificationTabNavigator';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '../redux/store/reducerHook'
import { selectUserInfo} from '../redux/reducers/loginReducer';
// import {
//   getChildDetailsAPI,
//   getFCMnotificationAPI,
// } from '../redux/actions/Action';
import AsyncStorage from '@react-native-async-storage/async-storage';
// const Stack = createStackNavigator();
function BottomTabNavigator() {
  const dispatch = useDispatch();
  const {t: trans, i18n} = useTranslation();
  const [showTab, setShowtab] = useState('flex');
  // const [maintenance, setMaintenance] = useState(true);
  const hideTabbar = (hide = false) => {
    // console.log(hide,'hide======')
    if (hide == false) {
      setShowtab('flex');
      // return 'flex';
    } else {
      setShowtab('none');
      // return 'none';
    }
  };
  const getData = async () => {
    let Data = '';
    await AsyncStorage.getItem('userInfo').then(data => {
      Data = JSON.parse(data);
    });
    // console.log(Data, signOut,'Data&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
    // if (Data != null && Data._id != null)
      // dispatch(
        // getChildDetailsAPI(undefined, undefined, Data._id, undefined, callBack),
      // );
  };
  const {authToken,status,userInfo} = useAppSelector(selectUserInfo);
  // console.log(childInfo, 'childInfo..............');
  // const {childid = ''} = userInfo;
  // useEffect(() => {
  //   // dispatch(getFCMnotificationAPI(undefined, childid));
  //   getData();
  // }, [childid]);

  const callBack = () => {
    // dispatch(getFCMnotificationAPI(undefined, childid));
  };
  const [count, setCount] = React.useState(1);
  // console.log(count, 'count.........................');
  // const {FCMnotification = {}} = useSelector(
  //   state => state.GetFCMnotificationReducer,
  // );
  // console.log(FCMnotification, 'FCMnotification............');

  const exitAppFunc = () => {
    BackHandler.exitApp();
  };

  // useEffect(() => {
    // Update countFalseReadStatus whenever AllQuery changes
    // setCount(FCMnotification.filter(item => item.readstatus === 'true').length);
  // }, [FCMnotification]);
  // let badgeCountdata = FCMnotification.filter(
  //   item => item.readstatus === 'true',
  // ).length;
  // console.log(badgeCountdata, 'badgeCountdata......');
  return (
    <>
      <StatusBar backgroundColor={'#263d2d'} barStyle="light-content" />
      <Tab.Navigator
        backBehaviour="initialRoute"
        screenOptions={({route, navigation}) => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
          headerStyle: {
            backgroundColor: '#263d2d',
          },
          headerTintColor: Colors.white,
          headerTitleStyle: {
            fontWeight: '500',
            marginLeft: -20,
            fontFamily: 'Yaldevi-Regular',
          },
          tabBarStyle: {
            height: 60,
            backgroundColor: '#263d2d',
            display: showTab,
          },
          // tabBarStyle: {height: 50, backgroundColor: '#def',display: 'flex',},
          // tabBarInactiveTintColor: '#f1a722',
          tabBarInactiveTintColor: '#fff',
          tabBarActiveTintColor: '#f1a722',
          tabBarLabelStyle: {paddingBottom: 5},
          tabBarIcon: ({color, size, focused}) => {
            let iconName;
            if (route.name === ROUTES.HOMETAB) {
              iconName = focused ? 'home' : 'home-outline';
              return <Ionicons name={iconName} size={22} color={color} />;
            }
            if (route.name === ROUTES.PROFILE_TAB) {
              iconName = focused ? 'user' : 'user-o';
              if (focused) {
                return <FontAwesome name={iconName} size={22} color={color} />;
              } else {
                return <FontAwesome name={iconName} size={22} color={color} />;
              }
            }
            if (route.name === ROUTES.STORE_TAB) {
              iconName = focused
                ? 'storefront'
                : 'storefront-outline';
              return <Ionicons name={iconName} size={22} color={color} />;
            }
            if (route.name === ROUTES.NOTIFICATION_TAB) {
              iconName = focused ? 'bell' : 'bell-o';
              return (
                <View>
                  <FontAwesome name={iconName} size={22} color={color} />
                  {/* {badgeCountdata!="0"?
                  <View
                    style={{
                      backgroundColor: 'crimson',
                      // padding: 2,
                      paddingHorizontal: 6,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                      right: -10,
                      top: -10,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>
                      {badgeCountdata}
                    </Text>
                  </View>:""} */}
                </View>
              );
            }
          },
        })}>
        <Tab.Screen
          name={ROUTES.HOMETAB}
          // component={AppStack}
          children={() => {
            return <AppStack hideTabbar={hideTabbar} />;
          }}
          options={({route, navigation}) =>
            // console.log(
            //   navigation.getState().routes[navigation.getState().index].name,
            // ),
            ({
              title: trans('Home'),
            })
          }
          // options={{
          //   tabBarButton: props => <CustomTabBarButton route="home" {...props} />,
          // }}
        />
        {/* <Tab.Screen
          name={ROUTES.PROFILE_TAB}
          // component={ProfileTabNavigation}
          options={({route, navigation}) => ({
            title: trans('User Profile'),
          })}
          // options={{
          //   tabBarButton: props => <CustomTabBarButton route="home" {...props} />,
          // }}
        /> */}
         {/* <Tab.Screen
          name={ROUTES.STORE_TAB}
          component={StoreTabNavigator}
          options={({route, navigation}) => ({
            title: trans('My Store'),
          })}
          // options={{
          //   tabBarButton: props => <CustomTabBarButton route="home" {...props} />,
          // }}
        />  */}

        {/* <Tab.Screen
          name={ROUTES.NOTIFICATION_TAB}
          component={NotificationTabNavigator}
          options={({route, navigation}) => ({
            title: trans('Notification'),
          })}
        /> */}
      </Tab.Navigator>
    </>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: '#263d2d',
    borderTopWidth: 0,
    // bottom: 10,
    // right: 10,
    // left: 10,
    height: 80,
  },
});
