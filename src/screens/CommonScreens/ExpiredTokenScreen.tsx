import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  TextInput,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconz from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ActivityIndicator, Modal } from 'react-native-paper';
// import {device_height, device_width} from '../../style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {device_height, device_width} from '../../style';
import { useTranslation } from 'react-i18next';
// import Colors from '../../../../assets/Colors';
import FastImage from 'react-native-fast-image';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {AuthContext} from '../../../../context';
import Colors from '../../../assets/Colors';
import { device_height, device_width } from '../style';
import { logout } from '../../redux/reducers/loginReducer';
import { getChildDetailsAPI, selectStudentInfo, selectStudentStatus } from '../../redux/reducers/StudentInfoReducer';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../../redux/store/Store';

const ExpiredTokenScreen = ({ }) => {
  const { t: trans, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  // const {signOut} = useContext(AuthContext);
  const [count, setCount] = useState(30);
  const navigation = useNavigation();

  const dispatch = useDispatch<any>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;



  const Logout = () => {
    dispatch(logout());
  };
  // const {childInfo = {}, error: child_error = ''} = useSelector(
  //   state => state.ChildDetailsReducer,
  // );
  const childInfo = useAppSelector(selectStudentInfo) as ChildInfo;
  const child_error = useAppSelector(selectStudentStatus)

  interface ChildInfo {
    _id: string;
    age: string;
    childid: string;
    image: string;
    imagename: string;
    fname: string;
    lname: string;
    phone: string;
    name: string;
    boardname: string;
    fathername: string;
    mothername: string;
    // board: string;
    subscriptionStartDate: string;
    subscriptionEndDate: string;
    isPremium: boolean;
    parentid: string;
    stage: string;
    gender: string;
    address: string;
    alterphone: string;
    schoolname: string;
    language: string;
    email: string;
    stageid: string;
    boardid: string;
    classname: string;
  }
  const {
    _id: id = '',
    stageid = '',
    childid = '',
    boardid = '',
    stage = '',
    name: userName = '',
    fname = '',
    lname = '',
  } = childInfo;

  console.log(count, '===========count');

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (count == 0) {
  //       // dispatch(
  //       //   getChildDetailsAPI(
  //       //     undefined,
  //       //     signOut,
  //       //     id,
  //       //     setLoading,
  //       //     undefined,
  //       //   ),
  //       // );
  //       dispatch(getChildDetailsAPI(id));
  //       // dispatch(logout())
  //       commonCallback();
  //       clearInterval(interval);
  //     } else {
  //       setCount(count - 1);
  //     }
  //   }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [count]);

  useEffect(() => {
    //   commonCallback();
    // }
    navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', () => {
        Logout();
        return true;
      });
    });
  }, []);

  // const commonCallback = async () => {
  //   let token = '';
  //   await AsyncStorage.getItem('userToken').then(data => {
  //     if (data !== null) {
  //       console.log(data, 'data.................');
  //       token = data;
  //     }
  //   });
  //   let Data = {};
  //   await AsyncStorage.getItem('userInfo').then(data => {
  //     Data = JSON.parse(data);
  //   });
  //   // console.log(Data, signOut,'Data&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
  //   if (Data != null && Data._id != null)
  //     dispatch(
  //       getChildDetailsAPI( Data._id),
  //     );
  //     // dispatch(logout())

  //   if (child_error == '') {
  //     navigation.navigate('UserHome');
  //   }
  // };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor={'#263d2d'} barStyle="light-content" />
      <View
        style={{
          borderRadius: 15,
          // borderWidth: 1,
          height: device_height,
          width: device_width * 0.99,
          backgroundColor: '#fefefe',
          alignSelf: 'center',
          justifyContent: 'space-between',
          // flex: 1,
          alignItems: 'center',
          paddingVertical: 150,
        }}>
        <View
          style={{
            // borderWidth: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            // position: 'absolute',
            // top: 20,
          }}>
          {/* <FastImage
              style={{
                height: 280,
                width: '100%',
                alignSelf: 'center',
              }}
              // source={require('../../../assets/NOTEVOOK.jpeg')}
              source={{
                uri: 'https://5.imimg.com/data5/KW/XI/MY-5514661/under-maintenance-sign-500x500.jpg',
              }}
              resizeMode="contain"
            /> */}
        </View>
        {/* <AntDesign
              name="closecircleo"
              style={{
                fontSize: 38,
                color: '#fff',
                position: 'absolute',
                top: -20,
                right: -10,
                // marginTop: 10,
                backgroundColor: 'crimson',
                borderRadius: 50,
              }}
              onPress={closeModalFunc}
            /> */}

        <View
          style={{
            // flexDirection: 'row',
            height: '20%',
            marginHorizontal: 7,
            borderRadius: 8,
            marginTop: 10,
            width: '94%',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            // borderWidth: 1,
            borderColor: '#aaa',
            paddingVertical: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              width: device_width * 0.8,
              fontSize: 18,
              color: Colors.primary,
              // marginTop: 5,
              // marginLeft: 5,
              fontWeight: '800',
            }}>
            {trans(`Oops! It looks like you're already logged in on another device`)}
          </Text>
          {/* <Text
              style={{
                textAlign: 'center',
                width: device_width * 0.8,
                fontSize: 14,
                color: Colors.primary,
                // marginTop: 5,
                // marginLeft: 5,
                fontWeight: '800',
              }}>
              {trans('Please try again after some time')}
            </Text> */}
        </View>
        <TouchableOpacity
          onPress={() => Logout()}
          style={{
            borderWidth: 1,
            paddingVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            // marginTop: 10,
            width: '40%',
            backgroundColor: 'green',
            // marginLeft: 10,
            flexDirection: 'row',
            borderColor: '#aaa',
            borderRadius: 8,
            // padding: 10,
          }}>
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>
            {trans('Okay')}
          </Text>
        </TouchableOpacity>
      </View>
      {/* </Modal> */}
    </SafeAreaView>
  );
};

export default ExpiredTokenScreen;
