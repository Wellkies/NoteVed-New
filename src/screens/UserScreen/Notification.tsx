import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ScrollView,
  TextInput,
  SafeAreaView,
  BackHandler,
  ImageBackground,
  Platform,
  Dimensions,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import React, { useEffect, useState } from 'react';
import Colors from '../../../assets/Colors';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { Avatar, Modal, RadioButton } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { device_height, device_width } from '../style';
import Header from '../CommonScreens/Header';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import LoadingScreen from '../CommonScreens/LoadingScreen';
import { useAppNavigation } from '../../navigation/types';
import { RootState } from '../../redux/store/Store';
import { selectStudentInfo } from '../../redux/reducers/StudentInfoReducer';
import { getFCMnotificationAPI, selectFcmNotificationInfo, selectFcmNotificationStatus } from '../../redux/reducers/GetFCMnotificationReducer';
import { updateFCMmessage } from '../../redux/actions/NotificationAPI';

const Notification = () => {
  const { t: trans, i18n } = useTranslation();
  const navigation = useAppNavigation();
  const device_width = Dimensions.get('window').width;
  const device_height = Dimensions.get('window').height;
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dispatch = useDispatch<any>();
  const [readMsg, setReadMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  // const {childInfo = {}} = useSelector(state => state.ChildDetailsReducer);
  const childInfo = useAppSelector(selectStudentInfo) as ChildInfo;
  // console.log(childInfo, '================childInfo');

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
    name = '',
    stage = '',
    phone = '',
    image = '',
    age = '',
    address = '',
    childid = '',
  } = childInfo;

  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      const {width, height} = window;
      setOrientation(height >= width ? 'portrait' : 'landscape');
    });
    console.log(orientation, 'Orientation');
    return () => subscription?.remove();
  }, [orientation]);
  
  useEffect(() => {
    const fcmData={
      childid,
    }
    dispatch(getFCMnotificationAPI());
    navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', () => {
        // navigation.goBack();
        navigation.navigate('SubjectLevel');
        return true;
      });
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        // navigation.goBack();
        navigation.navigate('SubjectLevel');
        return true;
      });
    };
  }, []);

  // const {FCMnotification = {}} = useSelector(
  //   state => state.GetFCMnotificationReducer,
  // );

  const FCMnotification = useAppSelector(selectFcmNotificationInfo)
  const fcmLoading = useAppSelector(selectFcmNotificationStatus);

  const colorList = [
    ['#2775cf', '#e3eefa'],
    ['#f08441', '#f7d7c3'],
    ['#8356a8', '#f3e1f7'],
    ['#05a851', '#d9fceb'],
    ['#f2618a', '#ffdeeb'],
  ];

  const handleUpdate = (_id: string) => {
    const updateBody = {
      id: _id,
      readstatus: 'false',
    };
    console.log(updateBody, 'updateBody........................');
    updateFCMmessage(updateBody, callBack);
  };
  const callBack = () => {
    const fcmData={
      childid,
    }
    dispatch(getFCMnotificationAPI());
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={{
          width: device_width,
          height: device_height,
          flex: 1,
          alignSelf: 'center',
        }}
        resizeMode="cover"
        source={require('../../../assets/0.png')}>
        <Header
          label1={trans('Notification')}
          label2={<FontAwesome name={'bell'} size={22} color={'#fff'} />}
          isbackIconShow={true}
          functionName={() => navigation.navigate('SubjectLevel')}
        />
        {fcmLoading == 'loading' ? (
          <LoadingScreen flag={fcmLoading == 'loading'} />
        ) : (
          <ScrollView>
            <View
              style={{
                paddingBottom: 15,
                // backgroundColor: Colors.secondary,
                marginHorizontal: 5,
              }}>
              {FCMnotification.length > 0 ? (
                <>
                  {FCMnotification.map((item: any, index: number) => {
                    const {
                      fcmmessagetitle = '',
                      fcmimage = '',
                      fcmmessagebody = '',
                      _id = '',
                      readstatus = false,
                      scheduledate = '',
                    } = item;

                    console.log(FCMnotification, 'FCMnotification...........');

                    return (
                      <View
                        key={index}
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            // backgroundColor: '#eaeaea',
                            backgroundColor: 'orange',
                            paddingHorizontal: 15,
                            paddingVertical: 7,
                            borderRadius: 15,
                            marginTop: 15,
                            marginBottom: -3,
                            elevation: 5,
                            alignSelf: 'center',
                          }}>
                          <Text style={{ color: '#666' }}>
                            {moment(scheduledate).format('Do MMMM')}
                          </Text>
                        </View>
                        <TouchableOpacity
                          disabled={true}
                          // onPress={() => {
                          //   handleUpdate(_id);
                          // }}
                          style={{
                            elevation: 5,
                            width: '96%',
                            alignSelf: 'center',
                            // backgroundColor: '#79851f',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 10,
                            borderRadius: 10,
                            borderWidth: readstatus == 'true' ? 2 : 1,
                            borderColor:
                              readstatus == 'true' ? 'orange' : '#dee',
                          }}>
                          <LinearGradient
                            colors={
                              readstatus == 'true'
                                ? ['#79dd1f', '#79dd1f']
                                : ['#ded', '#ded']
                            }
                            style={{
                              display: 'flex',
                              width: '100%',
                              paddingVertical: 15,
                              borderRadius: 10,
                              justifyContent: 'center',
                              paddingHorizontal: 15,
                            }}>
                            <View
                              style={{
                                marginBottom: 7,
                                // flexDirection: 'row',
                                // justifyContent: 'space-between',
                                // alignItems: 'center',
                                // borderWidth:1,
                                //   borderBottomWidth: 1,
                                //   borderBottomColor: '#ccc',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  // borderWidth: 1,
                                  width: '100%',
                                }}>
                                <View
                                  style={{
                                    // width: device_width * 0.4,
                                    // marginTop: 20,
                                    // height: 70,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    // borderWidth: 1,
                                    backgroundColor:
                                      readstatus == 'true' ? '#def' : '#ccc',
                                    alignSelf: 'center',
                                    width: fcmimage ? 88 : 75,
                                  }}>
                                  <FastImage
                                    style={{
                                      height: 75,
                                      width: fcmimage ? 88 : 75,
                                      borderRadius: 5,
                                      // borderWidth: 1,
                                      borderColor: '#000',
                                    }}
                                    resizeMode="contain"
                                    source={
                                      fcmimage
                                        ? {
                                          uri: fcmimage,
                                        }
                                        : require('../../../assets/IQ.jpg')
                                    }
                                  />
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: '70%',
                                    // justifyContent: 'space-between',
                                    // borderWidth: 1,
                                    // marginLeft: 20,
                                  }}>
                                  <Text
                                    style={{
                                      // width: 210,
                                      color:
                                        readstatus == 'true' ? '#fff' : '#333',
                                      fontWeight: '700',
                                      fontSize: 22,
                                    }}>
                                    {' '}
                                    {fcmmessagetitle}
                                  </Text>
                                  {readstatus == 'true' ? (
                                    <View
                                      style={{
                                        padding: 4,
                                        backgroundColor: 'crimson',
                                        borderRadius: 20,
                                        marginHorizontal: 10,
                                        position: 'absolute',
                                        right: -25,
                                        top: 0,
                                        // marginRight:5
                                        // width: '10%',
                                      }}></View>
                                  ) : (
                                    <></>
                                  )}
                                </View>
                              </View>
                              <Text
                                style={{
                                  color: readstatus == 'true' ? '#fff' : '#333',
                                  fontSize: 14,
                                  // marginRight: 10,
                                  fontWeight: '500',
                                  marginTop: 5,
                                  // width:'20%'
                                }}>
                                {fcmmessagebody}
                              </Text>
                            </View>
                            <Text
                              style={{
                                color: readstatus == 'true' ? '#ccc' : '#999',
                                fontSize: 11,
                                fontWeight: '700',
                                position: 'absolute',
                                right: 10,
                                bottom: 5,
                              }}>
                              {moment(scheduledate).format('hh:mm A')}
                            </Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </>
              ) : (
                <View
                  style={{
                    height: 70,
                    width: '100%',
                    marginVertical: 20,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    borderColor: 'darkgoldenrod',
                    borderWidth: 1,
                  }}>
                  <View
                    style={{
                      width: 10,
                      backgroundColor: 'darkgoldenrod',
                      height: 69,
                    }}></View>
                  <View
                    style={{
                      width: '98%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      // justifyContent: 'space-around',
                      backgroundColor: 'burlywood',
                      paddingHorizontal: 10,
                    }}>
                    <MaterialIcons name="info" color={'green'} size={30} />
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#333',
                        fontWeight: '600',
                        width: '80%',
                        textAlign: 'center',
                      }}>
                      {'   '}
                      {trans(
                        'There is no notification available for the moment',
                      )}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Notification;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
  headerCointain: {
    width: '100%',
    backgroundColor: '#D6EAF8',
    borderWidth: 1,
    borderColor: '#E5E4E2',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },

  headerInner: {
    width: '95%',
    // height: '10%',

    // elevation: 10,
    // backgroundColor: '#fff',
    borderWidth: 1,
    // borderBottomWidth: 0,
    borderColor: '#fff',
    // borderTopColor: '#ccc',
    borderRadius: 40,
    // marginTop: 15,
    // alignSelf: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  headerinner1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  innerText: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: '700',
    marginLeft: 5,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
  },
  textArea: {
    height: 110,
    justifyContent: 'flex-start',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 15,
    fontWeight: 'bold',
  },
  action: {
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -5,
    marginBottom: Platform.OS === 'ios' ? 0 : -15,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    // marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
  cardstyle: {
    width: '95%',
    height: '30%',
    backgroundColor: '#fff',
    // borderWidth: 2,
    // borderBottomWidth: 0,
    // borderColor: Colors.primary,
    // borderTopColor: '#ccc',
    borderRadius: 9,
    elevation: 20,
    alignSelf: 'center',
    // padding: 15,
  },
  cardstyle1: {
    width: '95%',
    height: '15%',
    backgroundColor: '#fff',
    borderWidth: 1,
    // borderBottomWidth: 0,
    // borderColor: Colors.primary,
    // borderTopColor: '#ccc',
    borderColor: Colors.primary,
    borderRadius: 10,
    // elevation: 20,
    // alignSelf: 'center',
    alignItems: 'center',
    padding: 15,
  },
  Innercardstyle: {
    width: '24%',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    // borderBottomWidth: 0,
    borderColor: '#fff',
    // borderTopColor: '#ccc',
    borderRadius: 9,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingLeft: 10,

    // alignSelf: 'center',
    // padding: 15,
  },
  question: {
    fontSize: 17,
    fontWeight: '500',
    color: Colors.primary,
  },
});
