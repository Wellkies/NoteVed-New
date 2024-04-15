import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Iconx from 'react-native-vector-icons/FontAwesome';
import i18n from 'i18next';
import Colors from '../../../assets/Colors';
import FastImage from 'react-native-fast-image';
import { device_height } from '../style';
import { useDispatch, useSelector } from 'react-redux';
import { selectStudentInfo } from '../../redux/reducers/StudentInfoReducer';
import { useAppSelector } from '../../redux/store/reducerHook';
import { useNavigation } from '@react-navigation/native';
import { deleteAllCartItemAPI } from '../../redux/actions/MyStoreAPI';
const { t: trans } = i18n;

const Thanks = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch<any>();
  const childInfo = useAppSelector(selectStudentInfo) as ChildInfo;
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
    scholarship: object[];
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
    scholarship = [],
    name: userName = '',
    fname = '',
    gender = '',
    lname = '',
    email = '',
    phone = '',
    // cityname = '',
    image = '',
    age = '',
    address = '',
    // cityid = '',
    language = '',
    // coordinates='',
  } = childInfo;

  // console.log(childInfo, "====================childinfo");

  useEffect(() => {
    navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.navigate('ProductList');
        // navigation.goBack();
        return true;
      });
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        navigation.navigate('ProductList');
        // navigation.goBack();
        return true;
      });
    };
  }, []);

  const GoBackFunction = () => {
    deleteAllCartItemAPI(childid, ClearCartCallBack);
    // navigation.navigate('Thanks');
  };

  const ClearCartCallBack = () => {
    // CommonMessage('Cart Deleted !')
    navigation.navigate('ProductList');
    console.log('Cart Deleted !!!!');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: "#263d2d",
              // margin: 30,
              marginHorizontal: 30,
              marginVertical: 15,
              borderRadius: 15,
              minheight: device_height * 0.4,
              paddingVertical: 20,
            }}>
            <FastImage
              style={{
                height: 200,
                width: '100%',
                // position: 'absolute',
                //left: 10,
              }}
              source={require('../../../assets/Thanks.png')}
              resizeMode="contain"
            />
            <View style={{
              borderRadius: 50, 
              borderColor: 'lawngreen',
              marginVertical: 10, 
              borderWidth: 1, 
              height: 90,
              width: 90, 
              alignSelf: 'center',
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <Iconx name="check" style={stylex.icon} />
            </View>
            <Text
              style={{
                fontSize: 22,
                // color: '#4372b8',
                // color: "#263d2d",
                fontWeight: '800',
                fontFamily: 'Yaldevi-Regular',
                color: '#fff',
                textAlign: 'center',
              }}>
              {trans('Payment Received & Order Placed Successfully')}
            </Text>
          </View>

          <View style={stylex.btns}>
            <TouchableOpacity
              style={stylex.btn}
              onPress={() => {
                GoBackFunction();
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '800',
                }}>
                {trans('OK')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Thanks;

const stylex = StyleSheet.create({
  btns: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  btn: {
    // width: '100%',
    height: 50,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: "#263d2d",
    marginBottom: 30,
    // marginLeft: 70,
    // marginTop: 50,
  },
  icon: {
    color: 'lawngreen',
    // marginTop: 20,
    fontSize: 70,
    textAlign: 'center',
  },
});
