import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  BackHandler,
  ImageBackground,
  TextInput,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconz from 'react-native-vector-icons/Entypo';
import {Image} from 'react-native';
//   import Header from '../AppScreens/CommonScreens/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {Avatar} from 'react-native-paper';
import Colors from '../../../assets/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//   import CommonModal from '../AppScreens/CommonScreens/CommonModal';
import {Modal} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../../../context';
import {useTranslation} from 'react-i18next';
//   import CommonModalUser from './CommonModalUser';
import Share from 'react-native-share';
import CommonMessage from '../../../constants/CommonMessage';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';
import {device_height, device_width} from '../style';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {TypedUseSelectorHook} from 'react-redux';
import {RootState, AppDispatch} from '../../redux/store/Store';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  getChildDetailsAPI,
  selectStudentInfo,
  selectStudentStatus,
} from '../../redux/reducers/StudentInfoReducer';
import Header from '../CommonScreens/Header';
import CommonModalUser from '../CommonScreens/CommonModalUser';
import {logout, selectUserInfo} from '../../redux/reducers/loginReducer';
import {deleteUserAccountActionApi} from '../../redux/actions/deleteUserAccountApi';
import {
  CheckDeviceTokenApi,
  selectDeviceToken,
} from '../../redux/reducers/GetDeviceTokenReducer';
import Storage from '../../utils/AsyncStorage';
import {setLanguage} from '../../redux/reducers/languageReducer';
// import AsyncStorage from '../../utils/AsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const currentappVersion = DeviceInfo.getVersion();

const UserProfile = ({}) => {
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
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const count = useAppSelector(selectStudentStatus);
  const childInfo = useAppSelector(selectStudentInfo) as ChildInfo;
  const {authToken, status, userInfo} = useAppSelector(selectUserInfo);

  console.log(userInfo, 'in STUDENT PROFILE.............');
  const {t: trans, i18n} = useTranslation();
  const [modalStatus, setModalStatus] = useState(false);
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);
  const [sucessDeleteStatus, setsucessDeleteStatus] = useState(false);
  const [selectReason, setSelectReason] = useState(false);
  const [deleteUserModalStatus, setDeleteUserModalStatus] = useState(false);
  let handleselect = () => {
    setSelectReason(!selectReason);
  };
  console.log(selectReason, 'selectReason...............');

  const Logout = async () => {
    console.log("called");
    dispatch(logout());
    const authValue = await Storage.removeValue('@auth_Token');
    const User = await Storage.removeValue('@user');
    // const navigation = useNavigation();
    dispatch(setLanguage(language));
    console.log(language, 'language######################################');
    if (language == '') {
      dispatch(setLanguage('english'));
    }
    // Storage.storeObject("@user_lang",language)
    AsyncStorage.setItem('@user_lang', language);
    // AsyncStorage.setItem('fcmToken', fcmToken);
  };

  // };

  // const dispatch = useDispatch();
  const CheckToken = useAppSelector(selectDeviceToken);
  // console.log(
  //   CheckToken,
  //   '$$$$$$$$$$$$$$$$$$$$$$$$$$$CheckToken....................',
  // );
  // const tokenCheck = async () => {
  //   const authValue = await Storage.getObject('@auth_Token');
  //   // setGetAuthdata(authValue);
  //   // console.log("getAuthdata///////////",authValue)
  //   const tokenData = {
  //     childid: childid,
  //     devicetoken: authValue,
  //   };
  //   // console.log(tokenData, 'tokenData................####################');
  //   dispatch(CheckDeviceTokenApi(tokenData));
  //   // if (CheckToken != undefined) {
  //   if (CheckToken != undefined && CheckToken.message == 'Token not found!') {
  //     console.log('*****************', CheckToken.message);
  //     navigation.navigate('ExpiredTokenScreen');
  //   }
  //   // }
  // };

  useEffect(() => {
    // tokenCheck();
    navigation.addListener('focus', () => {
      // tokenCheck();
      dispatch(getChildDetailsAPI(id));
      setSelectedIndex(1);
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.navigate('UserHome');
        return true;
      });
    });
    return () => {
      setSelectedIndex(1);
      BackHandler.removeEventListener('hardwareBackPress', () => {
        navigation.navigate('UserHome');
        return true;
      });
    };
  }, []);
  useEffect(() => {
    //   dispatch(
    //     getChildDetailsAPI(undefined, signOut, undefined, undefined, undefined),
    //   );
    console.log('first///////////////////');
    dispatch(getChildDetailsAPI(id));
  }, []);

  // const {childInfo = []} = useSelector(state => state.ChildDetailsReducer);

  // const {user = []} = childInfo;
  const {
    _id: id = '',
    stageid = '',
    childid = '',
    boardid = '',
    stage = '',
    name: userName = '',
    fname = '',
    lname = '',
    email = '',
    phone = '',
    gender = '',
    image = '',
    age = '',
    address = '',
    language = '',
    // coordinates='',
  } = userInfo;
  // console.log(language, 'language..........');
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const myCustomShare = async () => {
    const shareOption = {
      message:
        'NoteVed Academy helps students for OAV(Odisha Adarsha Vidyalaya) and Navodaya competitive examination preparation!',
      // url: 'https://play.google.com/store/apps/details?id=com.wellkies_user&pli=1',
      url: 'https://play.google.com/store/apps/details?id=com.notevook',
    };
    try {
      const shareResponse = await Share.open(shareOption);
    } catch (error) {
      // console.log('Error =>', error);
    }
  };

  const deleteCallBack = () => {
    //   dispatch(
    //     getChildDetailsAPI(undefined, signOut, undefined, setLoading, undefined),
    //   );
    //   navigation.navigate('UserHome');
  };

  const TabButton = [
    {
      label: trans('User Setting'),
      btnId: 1,
      isSelected: false,
    },
    {
      label: trans('Edit Profile'),
      btnId: 2,
      isSelected: false,
    },
  ];
  const [info, setInfo] = useState(false);

  const {reason = ''} = info;

  const handleInputChange = (inputName: string, inputValue: string) => {
    if (inputName == 'reason') {
      setInfo(Info => ({...Info, [inputName]: inputValue}));
    }
  };
  const handleDelete = () => {
    console.log(id, 'id..................');

    const deleteBody = {
      name: userName,
      phone: phone,
      deletereason: reason,
    };
    console.log(deleteBody, 'deleteBody................');
    deleteUserAccountActionApi(deleteBody, deleteCallback);
    // dispatch(deleteUserAccountApi(deleteBody, deleteCallback));
  };
  const deleteCallback = () => {
    // navigation.navigate('SignInScreen');
    // signOut();
    setDeleteModalStatus(false);
    setsucessDeleteStatus(true);
    setSelectReason(false);
  };
  const close = () => {
    setDeleteModalStatus(false);
    setSelectReason(false);
  };
  const closeModal = () => {
    setsucessDeleteStatus(false);
    // signOut();
    Logout();
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={{
          width: device_width,
          height: device_height,
          flex: 1,
          alignSelf: 'center',
          backgroundColor: '#272727',
        }}
        // resizeMode="cover"
        // source={require('../../../assets/0.png')}
      >
        <Header
          isbackIconShow={true}
          label1={trans('Profile')}
          functionName={() => navigation.navigate('LandingScreen')}
          label2={
            <TouchableOpacity
              // onPress={() => {
              //   setDeleteUserModalStatus(true);
              //   // navigation.navigate('Kids_Profile', {childId: id});
              // }}
              style={{
                // backgroundColor: Colors.secondary,
                position: 'absolute',
                top: 25,
                right: 35,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 14, fontWeight: '700', color: '#fff'}}>
                {trans('Version')} : {currentappVersion}
              </Text>
            </TouchableOpacity>
          }
        />
        <View
          style={{
            marginVertical: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {TabButton.map((item, index) => {
            const {label = '', btnId = '', isSelected = ''} = item;

            const isselectedBtn = btnId == selectedIndex ? true : false;
            return (
              <View key={index}>
                <TouchableOpacity
                  key={index}
                  style={{
                    // width: index == 0 ? device_width * 0.4 : device_width * 0.55,
                    width: device_width * 0.47,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // borderRightWidth: 0.5,
                    paddingVertical: 5,
                    borderWidth: 1.5,
                    flexDirection: 'row',
                    // justifyContent:'space-around',
                    // borderBottomWidth:0,
                    borderRadius: 10,
                    borderColor: isselectedBtn ? '#dee' : '#def',
                    backgroundColor: isselectedBtn ? '#FFB901' : '#fff',
                    paddingHorizontal: 20,
                    borderBottomLeftRadius: index == 0 ? 15 : 0,
                    borderTopLeftRadius: index == 0 ? 15 : 0,
                    borderBottomRightRadius: index == 1 ? 15 : 0,
                    borderTopRightRadius: index == 1 ? 15 : 0,
                  }}
                  onPress={() => {
                    setSelectedIndex(btnId);
                    index == 1
                      ? navigation.navigate('EditProfile', {childId: childid})
                      : '';
                    // setContentList(contentList);
                  }}>
                  {index == 0 ? (
                    <MaterialIcons
                      name="settings"
                      color={'#0f6f25'}
                      size={25}
                    />
                  ) : (
                    <FontAwesome5
                      name="user-edit"
                      color={'#0f6f25'}
                      size={20}
                    />
                  )}
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: isselectedBtn ? '900' : '700',
                      color: '#0f6f25',
                      textAlign: 'center',
                      marginLeft: 5,
                      // textDecorationLine: isselectedBtn ? 'underline':'none'
                    }}>
                    {label}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <View style={{paddingHorizontal: 10}}>
          <View
            style={{
              // backgroundColor: '#fff',
              // padding: 10,
              borderRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 25,
              }}>
              {image ? (
                <Avatar.Image
                  onPress={() => {
                    handleChoosePhoto();
                  }}
                  source={image ? {uri: image} : null}
                  size={120}
                  style={{backgroundColor: '#fff'}}
                />
              ) : gender == 'Male' ? (
                <Avatar.Image
                  size={120}
                  style={{
                    backgroundColor: '#fff',
                    borderColor: Colors.primary,
                  }}
                  source={require('../../../assets/boy.png')}
                />
              ) : gender == 'Female' ? (
                <Avatar.Image
                  size={120}
                  style={{
                    backgroundColor: '#fff',
                    borderColor: Colors.primary,
                  }}
                  source={require('../../../assets/girl.png')}
                />
              ) : (
                <Avatar.Image
                  size={120}
                  style={{
                    backgroundColor: '#fff',
                    borderColor: Colors.primary,
                  }}
                  //source={require('../assets/userrr.png')}
                  source={{
                    uri: 'https://wkresources.s3.ap-south-1.amazonaws.com/userrr.png',
                  }}
                />
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 5,
              }}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: '700',
                  color: '#fff',
                }}>{`${fname} ${lname}`}</Text>
            </View>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: 'rgba(0,255,0, 0.12)',
              marginVertical: 10,
              marginHorizontal: 10,
              padding: 10,
              borderRadius: 15,
            }}>
            <TouchableOpacity
              style={styles.middleOptions}
              onPress={() => {
                // dispatch(getDiwaliCouponAPI());
                navigation.navigate('PremiumAccess', {
                  screenName: '',
                  subjectId: '',
                  subjectName: '',
                  topicid: '',
                  topicName: '',
                  ExamQuestionsets: '',
                  isScoreBoardFlag: '',
                  is2ndAvailable: '',
                  index: '',
                  quizList: '',
                  showFeedback: '',
                });
              }}>
              <View style={styles.options}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    // borderWidth:1
                  }}>
                  <FastImage
                    source={require('../../../assets/crown.png')}
                    style={styles.iconStyle}
                  />

                  <Text style={styles.middleOptionsText}>
                    {trans('Get Premium Access')}
                  </Text>
                </View>
                <Iconz name="chevron-small-right" size={20} color={'#f1a722'} />
              </View>
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={() => {
                CommonMessage('We will update shortly !');
              }}
              style={[styles.middleOptions, {backgroundColor: '#fff'}]}>
              <FastImage
                source={require('../../../assets/holiday.png')}
                style={styles.iconStyle}
              />
              <View style={styles.options}>
                <Text style={styles.middleOptionsText}>
                  {trans('Quizzes attempted')}
                </Text>
                <Iconz name="chevron-small-right" size={20} />
              </View>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              onPress={() => {
                CommonMessage('We will update shortly !');
                // navigation.navigate('ProgressChart')
              }}
              style={styles.middleOptions}>
              <FastImage
                source={require('../../../assets/statistic.png')}
                style={styles.iconStyle}
              />
              <View style={styles.options}>
                <Text style={styles.middleOptionsText}>
                  {trans('Your progress')}
                </Text>
                <Iconz name="chevron-small-right" size={20} />
              </View>
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChangePassword');
              }}
              style={styles.middleOptions}>
              {/* <FastImage
                source={require('../../../assets/statistic.png')}
                style={styles.iconStyle}
              /> */}
              <View style={styles.options}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    // borderWidth:1
                  }}>
                  <MaterialIcons
                    name="security"
                    color={'#FFB901'}
                    size={28}
                    style={styles.iconStyle}
                  />
                  <Text style={styles.middleOptionsText}>
                    {trans('Change Password')}
                  </Text>
                </View>
                <Iconz name="chevron-small-right" size={20} color={'#f1a722'} />
              </View>
            </TouchableOpacity>
            {/* 
            <TouchableOpacity
              onPress={() => {
                //   navigation.navigate('ProductList');
              }}
              style={styles.middleOptions}>
              
              <View style={styles.options}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    // borderWidth:1
                  }}>
                  <MaterialCommunityIcons
                    name="storefront"
                    color={'#FFB901'}
                    size={28}
                    style={styles.iconStyle}
                  />
                  <Text style={styles.middleOptionsText}>
                    {trans('My Store')}
                  </Text>
                </View>
                <Iconz name="chevron-small-right" size={20} color={'#f1a722'} />
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity
              // style={styles.middleOptions}
              onPress={() => {
                myCustomShare();
              }}>
              <View style={styles.middleOptions}>
                <View style={styles.options}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '100%',
                      // borderWidth:1
                    }}>
                    <MaterialIcons
                      name="person-add-alt-1"
                      color={'#f1a722'}
                      size={32}
                      style={styles.iconStyle}
                    />
                    {/* <FastImage
                        source={require('../../../assets/add-user.png')}
                        style={[styles.iconStyle, {height: 30, width: 30}]}
                      /> */}
                    <Text style={[styles.middleOptionsText, {marginLeft: 15}]}>
                      {trans('Invite a Friend')}
                    </Text>
                  </View>
                  <Iconz
                    name="chevron-small-right"
                    size={20}
                    color={'#f1a722'}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.middleOptions}
              onPress={() => {
                navigation.navigate('ContactUs');
              }}>
              <View style={styles.options}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    // borderWidth:1
                  }}>
                  <MaterialIcons
                    name="help-center"
                    color={'#f1a722'}
                    size={30}
                    style={styles.iconStyle}
                  />
                  {/* <FastImage
                      source={require('../../../assets/questions.png')}
                      style={[styles.iconStyle, {height: 25, width: 25}]}
                    /> */}

                  <Text style={[styles.middleOptionsText, {marginLeft: 20}]}>
                    {trans('Help')}
                  </Text>
                </View>
                <Iconz name="chevron-small-right" size={20} color={'#f1a722'} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalStatus(true);
                // navigation.navigate('Kids_Profile', {childId: id});
              }}>
              <View style={styles.middleOptions}>
                {/* <Image
                source={require('../../../assets/plus.png')}
                style={styles.iconStyle}
              /> */}

                <View style={styles.options}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '100%',
                      // borderWidth:1
                    }}>
                    <MaterialIcons
                      name="logout"
                      color={'#FFB901'}
                      size={28}
                      style={styles.iconStyle}
                    />

                    <Text style={[styles.middleOptionsText, {marginLeft: 15}]}>
                      {trans('Log Out')}
                    </Text>
                  </View>
                  <Iconz
                    name="chevron-small-right"
                    size={20}
                    color={'#f1a722'}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setDeleteModalStatus(true);
                // navigation.navigate('Kids_Profile', {childId: id});
              }}>
              <View style={styles.middleOptions}>
                <View style={styles.options}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '100%',
                      // borderWidth:1
                    }}>
                    <AntDesign
                      name="delete"
                      color={'#FFB901'}
                      size={28}
                      style={styles.iconStyle}
                    />

                    <Text style={[styles.middleOptionsText, {marginLeft: 15}]}>
                      {trans('Delete Account')}
                    </Text>
                  </View>
                  <Iconz
                    name="chevron-small-right"
                    size={20}
                    color={'#FFB901'}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          {/* <View
            style={{
              backgroundColor: '#fff',
              padding: 10,
              marginHorizontal: 10,
            }}>
            
          </View> */}
        </ScrollView>
        {modalStatus && (
          <CommonModalUser
            ModalStatus={modalStatus}
            // isIconShow={true}
            closeModalFunc={() => setModalStatus(false)}
            label1={trans('Are you sure you want to LOG OUT ?')}
            // label2={`you won't be able yo restart it`}
            yesbtnName={trans('YES')}
            yesbtnFunction={() => Logout()}
            nobtnName={trans('NO')}
            nobtnFunction={() => setModalStatus(false)}
          />
        )}
        {/* {deleteModalStatus && (
          <CommonModalUser
            ModalStatus={deleteModalStatus}
            // isIconShow={true}
            closeModalFunc={() => setDeleteModalStatus(false)}
            label1={trans('Are you sure you want to Delete your account ?')}
            label2={`ବି. ଦ୍ର - ଆପ୍ଲିକେସନ୍ ରେ ଆପଣଙ୍କ ପୂର୍ବ ବ୍ୟବହୃତ ସମସ୍ତ ତଥ୍ୟ ୯୦ ଦିନ ପାଇଁ ଉପଲବ୍ଧ ରହିଛି l ଆପଣ ଚାହିଁଲେ ପୁନର୍ବାର ବ୍ୟବହାର କରି ପାରିବେ l`}
            yesbtnName={trans('YES')}
            yesbtnFunction={() => handleDelete()}
            nobtnName={trans('NO')}
            nobtnFunction={() => setDeleteModalStatus(false)}
          />
        )}  */}

        <Modal transparent={true} visible={deleteModalStatus}>
          <View
            style={{
              backgroundColor: '#0f6f25',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{alignItems: 'flex-end', justifyContent: 'center'}}>
              <View
                style={{
                  borderRadius: 15,
                  borderColor: '#FFB901',
                  borderWidth: 1,
                  minHeight: device_height * 0.58,
                  minWidth: device_width * 0.9,
                  backgroundColor: '#0f6f25',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: 'orange',
                      borderRadius: 50,
                      padding: 10,
                      elevation: 15,
                      alignSelf: 'center',
                      marginTop: 15,
                      // backgroundColor: 'green',
                    }}>
                    <AntDesign
                      name="delete"
                      color={'#FFB901'}
                      size={35}
                      // style={styles.iconStyle}
                    />
                  </View>
                  <View
                    style={{
                      // borderWidth: 1,
                      // flexDirection: 'row',
                      // justifyContent: 'space-evenly',
                      alignItems: 'center',
                    }}>
                    <View style={{}}>
                      <Text
                        style={{
                          width: device_width * 0.85,
                          fontSize: 16,
                          color: '#fff',
                          marginTop: 20,
                          marginLeft: 10,
                          fontWeight: '800',
                          textAlign: 'center',
                        }}>
                        {trans(
                          'Are you sure you want to Delete your account ?',
                        )}
                      </Text>

                      <View
                        style={{
                          justifyContent: 'center',
                          alignSelf: 'center',
                          marginTop: 15,
                        }}>
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 0,
                            padding: 7,
                            paddingHorizontal: 10,
                          }}
                          onPress={() => handleselect()}>
                          <View
                            style={{
                              borderRadius: 50,
                              backgroundColor:
                                selectReason == true ? '#fff' : '#ccc',
                              borderWidth: 1,
                              borderColor:
                                selectReason == true ? '#fff' : '#ccc',
                              justifyContent: 'center',
                              alignSelf: 'center',
                              width: 23,
                              height: 23,
                            }}>
                            <View
                              style={{
                                borderRadius: 50,
                                backgroundColor:
                                  selectReason == true ? '#000' : '#eee',
                                borderWidth: 1,
                                borderColor:
                                  selectReason == true ? '#000' : '#eee',
                                justifyContent: 'center',
                                alignSelf: 'center',
                                width: 13,
                                height: 13,
                              }}></View>
                          </View>
                          <Text
                            style={{
                              paddingLeft: 5,
                              textAlign: 'center',
                              fontWeight: '600',
                              color:
                                selectReason == true ? 'darkorange' : '#ddd',
                            }}>
                            {trans(`Yes, I'm sure. Delete my account`)}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            // marginTop: 5,
                            alignItems: 'center',
                            borderWidth: 0,
                            padding: 7,
                            paddingHorizontal: 10,
                          }}
                          onPress={() => handleselect()}>
                          <View
                            style={{
                              borderRadius: 50,
                              backgroundColor:
                                selectReason == false ? '#fff' : '#ccc',
                              borderWidth: 1,
                              borderColor:
                                selectReason == false ? '#fff' : '#ccc',
                              padding: 5,
                              justifyContent: 'center',
                              alignSelf: 'center',
                              width: 23,
                              height: 23,
                            }}
                            onPress={() => handleselect()}>
                            <View
                              style={{
                                borderRadius: 50,
                                backgroundColor:
                                  selectReason == false ? '#000' : '#eee',
                                borderWidth: 1,
                                borderColor:
                                  selectReason == false ? '#000' : '#eee',
                                justifyContent: 'center',
                                alignSelf: 'center',
                                width: 13,
                                height: 13,
                              }}
                              onPress={() => handleselect()}></View>
                          </View>
                          <Text
                            style={{
                              paddingLeft: 5,
                              textAlign: 'center',
                              fontWeight: '600',
                              color:
                                selectReason == false ? 'darkorange' : '#ddd',
                            }}>
                            {trans(`Cancel, I've changed my mind`)}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      {selectReason == true ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            // borderWidth:1,
                            width: device_width * 0.8,
                            alignSelf: 'center',
                            backgroundColor: '#dee',
                            // borderColor:'#fff',
                            borderBottomColor: '#fff',
                            borderRadius: 15,
                            // paddingBottom: 5,
                            marginTop: 10,
                            // paddingBottom: 10,
                            marginBottom: 10,
                          }}>
                          <TextInput
                            placeholder={trans(`Reason for Account Deletion`)}
                            placeholderTextColor={'#999'}
                            multiline={true}
                            numberOfLines={3}
                            // value={value}
                            style={[
                              {
                                // width: device_width * 0.9,
                                width: '100%',
                                alignSelf: 'center',
                                marginTop: -20,
                                paddingLeft: 10,
                                borderRadius: 15,
                                // borderWidth:1,
                                fontWeight: '600',
                                color: '#333',
                                // justifyContent: 'center',
                                // alignItems: 'center',
                              },
                            ]}
                            autoCapitalize="none"
                            onChangeText={val =>
                              handleInputChange('reason', val)
                            }
                            // onChangeText={onChangeText}
                            // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                            //   onChangeText={val => handleInputChange('parents_phone', val)}
                          />
                        </View>
                      ) : (
                        <></>
                      )}
                      <Text
                        style={{
                          fontSize: 13,
                          color: 'darkorange',
                          marginTop: 5,
                          marginLeft: 10,
                          fontWeight: '600',
                          // textAlign:'center'
                        }}>
                        {trans('Note')}
                        {':'}{' '}
                      </Text>
                      <Text
                        style={{
                          width: device_width * 0.85,
                          fontSize: 11,
                          color: '#fff',
                          marginTop: 5,
                          marginLeft: 10,
                          fontWeight: '500',
                          textAlign: 'left',
                        }}>
                        {trans(
                          'Your data will be stored with us for the next 90 days. However you can retrieve your used data in this period.',
                        )}
                      </Text>
                    </View>
                    {/* <AntDesign
                  name="closecircleo"
                  style={{
                    fontSize: 28,
                    color: '#fff',
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    // marginTop: 10,
                    backgroundColor: 'crimson',
                    borderRadius: 50,
                  }}
                  // onPress={closeModalFunc}
                /> */}
                  </View>
                  <View
                    style={{
                      // borderWidth: 1,
                      paddingVertical: 15,
                      alignItems: 'center',
                      marginTop: 10,
                      // marginLeft: 10,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      // borderColor: '#aaa',
                      // borderRadius: 8,
                      padding: 10,
                    }}>
                    <TouchableOpacity
                      disabled={selectReason == true ? false : true}
                      style={{
                        borderRadius: 15,
                        width: '30%',
                        marginVertical: 5,
                        borderWidth: 1,
                        marginRight: 25,
                        borderColor: 'white',
                      }}
                      onPress={() => handleDelete()}>
                      <LinearGradient
                        colors={
                          selectReason == true
                            ? ['#FFB901', '#FFB901']
                            : ['gray', 'gray']
                        }
                        style={{
                          borderRadius: 15,
                          width: '100%',
                          paddingVertical: 5,
                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}>
                          {/* {loading && (
                            <ActivityIndicator
                              size="small"
                              color={'#fff'}
                              style={{
                                alignSelf: 'flex-start',
                                paddingRight: 10,
                                fontSize: 12,
                              }}
                            />
                          )} */}
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 15,
                              fontWeight: 'bold',
                              textAlign: 'center',
                              alignItems: 'center',
                            }}>
                            {trans('YES')}
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        borderRadius: 15,
                        width: '30%',
                        marginVertical: 5,
                        borderWidth: 1,
                        borderColor: '#fff',
                      }}
                      onPress={() => close()}>
                      <LinearGradient
                        colors={['#800000', '#800000']}
                        style={{
                          borderRadius: 15,
                          width: '100%',
                          paddingVertical: 5,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 15,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            alignItems: 'center',
                          }}>
                          {trans('NO')}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <Modal transparent={true} visible={sucessDeleteStatus}>
          <View
            style={{
              backgroundColor: '#0f6f25',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                // borderRadius: 10,
                //   borderTopLeftRadius: 25,
                //   borderTopRightRadius: 25,
                //   borderBottomLeftRadius: 25,
                //   borderBottomRightRadius: 25,
                borderRadius: 15,
                borderColor: '#FFB901',
                borderWidth: 1,
                minHeight: device_height * 0.3,
                minWidth: device_width * 0.5,
                backgroundColor: '#0f6f25',
                // flexDirection: 'column',
                justifyContent: 'center',
                //   alignItems:'center'
                //   paddingHorizontal: 20,
              }}>
              <Text style={{color: '#fff', padding: 5}}>
                {trans(
                  'We will keep all your account information safe for the next 90 days. During this period, you can revive your account by logging in. After 90 days, all data will be permanently deleted.',
                )}
              </Text>
              <TouchableOpacity
                style={{
                  borderRadius: 15,
                  width: '30%',
                  marginVertical: 5,
                  borderWidth: 1,
                  marginRight: 25,
                  borderColor: 'white',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
                onPress={() => closeModal()}>
                {/* <LinearGradient
                        colors={['#FFB901', '#FFB901']}
                        style={{
                          borderRadius: 15,
                          width: '100%',
                          paddingVertical: 5,
                          justifyContent: 'center',
                          alignSelf:'center',

                        }}> */}
                <View
                  style={{
                    justifyContent: 'center',
                    backgroundColor: '#FFB901',
                    borderRadius: 15,
                    width: '100%',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    // alignItems: 'center',
                    // alignSelf:'center',
                    // alignItems:'center',
                    alignContent: 'center',
                    // flexDirection: 'row',

                    borderWidth: 1,
                    borderColor: 'white',
                  }}>
                  {/* {loading && (
                    <ActivityIndicator
                      size="small"
                      color={'#fff'}
                      style={{alignSelf:'flex-start',paddingRight:10,fontSize:12}}
                    />
                  )} */}
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 15,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      // alignItems: 'center',
                      // padding:5
                    }}>
                    {trans('OK')}
                  </Text>
                </View>
                {/* </LinearGradient> */}
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  middleOptions: {
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  middleOptionsText: {
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 10,
    color: '#fff',
    // marginVertical: 5,
  },
  iconStyle: {
    height: 30,
    width: 30,
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
  },
});

export default UserProfile;
