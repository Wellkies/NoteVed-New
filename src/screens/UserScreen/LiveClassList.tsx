import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  ToastAndroid,
  Linking,
  Image,
  RefreshControl,
  BackHandler,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import Colors from '../../../assets/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import {
//   childLoginOTPVerification,
//   getAllRecordClassAPI,
//   getChildDetailsAPI,
//   getLiveClassDetailsAPI,
//   getScholarshipByClassAPI,
//   getScholarshipPremiumAPI,
//   getSubjectByClassAPI,
//   getZoomclassAPI,
//   updateZoomUrl,
// } from '../../redux/actions/Action';
import { device_height, device_width } from '../style';
import colors from '../../../constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AntDesign from 'react-native-vector-icons/AntDesign';

import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../../context';

import moment from 'moment';
import FastImage from 'react-native-fast-image';
import { ImageBackground } from 'react-native';
import Header from '../CommonScreens/Header';
import LoadingScreen from '../CommonScreens/LoadingScreen';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../../redux/store/Store';
import {
  getChildDetailsAPI,
  selectStudentInfo,
} from '../../redux/reducers/StudentInfoReducer';
import {
  getSubjectByClassAPI,
  selectSubjectInfo,
} from '../../redux/reducers/GetSubjectByClassReducer';
import {
  getLiveclassAPI,
  selectLiveClassData,
} from '../../redux/reducers/GetLiveClassData';
import {
  getyoutubelist,
  selectyoutube,
  selectyoutubeStatus,
} from '../../redux/reducers/youtubeReducer';
import { getScholarshipPremiumAPI, selectPremiumPurchase } from '../../redux/reducers/GetPremiumPurchaseReducer';
import { registerLiveclassUrl } from '../../redux/actions/GetLiveClassDetails';

const LiveClassList = ({ route }) => {
  const navigation = useNavigation();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dispatch = useDispatch<any>();
  const { scholarshipImage = '', scholarshipId: scholarshipid = '' } = route.params;
  console.log(scholarshipid, "scholarshipId//////////")
  const [date, setDate] = useState(new Date());
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userBlink, setUserBlink] = useState(true);
  const [selectedSub, setSelectedSub] = useState();
  // useState(AllRecordClass.data[0]?AllRecordClass.data[0]:[]);
  // console.log(scholarshipId, 'scholarshipId..................');
  const { t: trans, i18n } = useTranslation();
  const youtubelist = useAppSelector(selectyoutube);
  const Youtubelistload = useAppSelector(selectyoutubeStatus);
  // console.log(youtubelist, 'youtubelist.....');
  const l1 = youtubelist.map(r => r.snippet);
  const childInfo = useAppSelector(selectStudentInfo) as ChildInfo;
  // console.log(childInfo, 'childInfo..........');

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
    _id: ChildID = '',
    stageid = '',
    childid = '',
    boardid = '',
    boardname = '',
    stage = '',
    scholarship = [],
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
  } = childInfo;
  const liveclassData = {
    scholarshipid,
    stageid,
    boardid,
  };
  console.log(liveclassData, "@@@@@@@@@@@@@@@@@@@@22liveclassData.....................")

  useEffect(() => {
    // dispatch(
    //   getAllRecordClassAPI(
    //     undefined,
    //     stageid,
    //     boardid,
    //     scholarshipId,
    //     setLoading,
    //   ),
    // );
    // dispatch(
    //   getChildDetailsAPI(undefined, undefined, undefined, undefined, undefined),
    // );
    dispatch(getyoutubelist());
    dispatch(getChildDetailsAPI(ChildID));

    dispatch(getLiveclassAPI(liveclassData));

    const subjectData = {
      stageid,
      boardid,
      scholarshipid,
    };

    dispatch(getSubjectByClassAPI(subjectData));
    // handleData(allRecordList)
    navigation.addListener('focus', () => {
      // dispatch(
      //   getChildDetailsAPI(
      //     undefined,
      //     undefined,
      //     undefined,
      //     undefined,
      //     undefined,
      //   ),
      // );
      // dispatch(
      //   getAllRecordClassAPI(
      //     undefined,
      //     stageid,
      //     boardid,
      //     scholarshipId,
      //     setLoading,
      //   ),
      // );
      // const liveclassData = {
      //   scholarshipid: scholarshipId,
      //   stageid,
      //   boardid,
      // };
      dispatch(getLiveclassAPI(liveclassData));
      dispatch(getSubjectByClassAPI(subjectData));
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.goBack();
        return true;
      });
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        navigation.goBack();
        return true;
      });
    };
  }, [scholarshipid]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setUserBlink(userBlink => !userBlink);
  //   }, 800);
  //   return () => clearInterval(interval);
  // }, []);

  // const {AllRecordClass = []} = useSelector(
  //   state => state.GetAllRecordClassReducer,
  // );
  // console.log(AllRecordClass,"AllRecordClass/////////////////")
  // let allRecordList = AllRecordClass.map(rec => rec.data[0]);

  const [subjectRecordClass, setSubjectRecordClass] = React.useState([]);
  // setSubjectRecordClass(allRecordList)
  const LiveClassList = useAppSelector(selectLiveClassData);
  console.log(LiveClassList, "LiveClassList////////////////")
  const today = new Date();
  const todayDateString = today.toISOString().split('T')[0];

  const liveClasses = LiveClassList.filter(item => {
    const classDate = new Date(item.zoomdate).toISOString().split('T')[0];
    return classDate === todayDateString;
  });

  const upcomingClasses = LiveClassList.filter(item => {
    const classDate = new Date(item.zoomdate).toISOString().split('T')[0];
    return classDate > todayDateString;
  });

  //
  const [isRegister, setIsRegister] = useState(false);

  const handleRegistration = (_id, registerstudentlist) => {
    const registerBody = {
      id: _id,
      registerstudentlist: [
        ...registerstudentlist,
        {
          childid: childid,
          fname: fname,
          lname: lname,
          name: fname + ' ' + lname,
          gender: gender,
          phone: phone,
          email: email,
        },
      ],
    };
    // console.log(registerBody, '=============registerBody');
    // dispatch(updateZoomUrl(registerBody, registerCallback));
    registerLiveclassUrl(registerBody, registerCallback)
  };
  const registerCallback = () => {
    //
    setIsRegister(!isRegister);
    // dispatch(getZoomclassAPI(scholarshipId, stageid, boardid));
    const liveclassData = {
      scholarshipid,
      stageid,
      boardid,
    };
    dispatch(getLiveclassAPI(liveclassData));
    ToastAndroid.showWithGravityAndOffset(
      'Sucessfully Registered',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50,
    );
  };

  const TabButton = [
    {
      label: trans('Today Class'),
      btnId: 1,
      isSelected: false,
    },
    {
      label: trans('Upcoming Class'),
      btnId: 2,
      isSelected: false,
    },
    {
      label: trans('Recorded Class'),
      btnId: 3,
      isSelected: false,
    },
  ];
  // const {SubjectByClass = []} = useSelector(
  //   state => state.GetSubjectByClassReducer,
  // );
  const SubjectByClass = useAppSelector(selectSubjectInfo);
  const handleSelect = item => {
    const subjectID = item.subjectid;

    // dispatch(getAllRecordClassAPI(undefined, stageid, boardid));
    let matchingSubjectData = AllRecordClass.filter(rec => {
      const matchSubjectId = rec.data[0].subjectid == subjectID;
      // const subjectDetails=matchSubjectId.map(rec=>rec.data)
      return matchSubjectId;
    });
    // console.log(matchingSubjectData,"matchingSubjectData..")
    const subjectRecordData = matchingSubjectData.map(rec => rec.data);
    // console.log(subjectRecordData, 'subjectRecordData.........');
    const datarecord = matchingSubjectData.map(rec => rec.data);
    setSubjectRecordClass(datarecord[0]);
    setSelectedSub(subjectID);
  };
  // useEffect(() => {
  //   let FirstsubData = AllRecordClass.filter(rec => {
  //     const matchhSubjectId = rec.data[0].subjectid;
  //     return matchhSubjectId;
  //   });
  //   const Firstrecord = FirstsubData.map(rec => rec.data);

  //   if (Firstrecord.length > 0) {
  //     setSubjectRecordClass(Firstrecord[0]);
  //     // console.log(Firstrecord[0], 'Firstrecord..............');
  //     let getID = subjectRecordClass.map(r => r.subjectid);
  //     // console.log(getID, 'getID.............');
  //     setSelectedSub(getID[0] ? getID[0] : '');
  //   } else {
  //     setSubjectRecordClass([]);
  //     setSelectedSub('');
  //   }
  // }, [AllRecordClass ? AllRecordClass : []]);
  const [asyncpremiumData, setasyncpremiumData] = useState([]);

  useEffect(() => {
    //const Predata = { childid, stageid, boardid };
    const Predata = {childid};
    dispatch(getScholarshipPremiumAPI(Predata));
    return () => { };
  }, [PremiumPurchase]);

  const PremiumPurchase = useAppSelector(selectPremiumPurchase);
  // console.log(PremiumPurchase, 'PremiumPurchase..........');
  return (
    <View style={styles.container}>
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
          label1={trans('Available Live Classes')}
          isbackIconShow={true}
          functionName={() => navigation.goBack()}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // borderWidth: 1,
            justifyContent: 'center',
            width: device_width * 0.99,
            alignSelf: 'center',
            marginBottom: 15,
          }}>
          {TabButton.map((item, index) => {
            const { label = '', btnId = '', isSelected = '' } = item;
            const isselectedBtn = btnId == selectedIndex ? true : false;
            return (
              <TouchableOpacity
                key={index}
                style={{
                  width: device_width * 0.32,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderWidth: 1.5,
                  height: 60,
                  // borderBottomWidth:0,
                  // borderRadius: isselectedBtn ? 10 : 10,
                  borderColor: isselectedBtn ? '#0f6f25' : '#FFB901',
                  backgroundColor: isselectedBtn ? '#0f6f25' : '#ddd',
                  // paddingHorizontal: index == 0 ? 28 : index == 1 ? 20 : 28,

                  borderBottomLeftRadius: index == 0 ? 15 : index == 1 ? 0 : 0,
                  borderTopLeftRadius: index == 0 ? 15 : index == 1 ? 0 : 0,
                  borderBottomRightRadius: index == 1 ? 0 : index == 0 ? 0 : 15,
                  borderTopRightRadius: index == 1 ? 0 : index == 0 ? 0 : 15,
                }}
                onPress={() => {
                  setSelectedIndex(btnId);
                  // setContentList(contentList);
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: isselectedBtn ? '900' : '700',
                    color: isselectedBtn ? '#FFB901' : '#0f6f25',
                    textAlign: 'center',
                    // borderWidth:1,
                    textAlignVertical: 'center',
                    width: '100%',
                    height: '100%',
                  }}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {selectedIndex == 1 && (
          <ScrollView
            contentContainerStyle={{ paddingBottom: 50 }}
            showsVerticalScrollIndicator={false}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          >
            <View
              style={{
                marginHorizontal: 5,
                marginVertical: 5,
                borderRadius: 10,
                // borderWidth: 2,
                // borderColor: 'red',
                // backgroundColor: Colors.secondary,
                // elevation: 10,
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  // flexDirection: 'row',
                  // flexWrap: 'wrap',
                  // borderWidth: 1,
                  // borderColor: 'green',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // marginVertical: 5,
                }}>
                {liveClasses.length > 0 ? (
                  liveClasses.map((item, index) => {
                    const {
                      zoomtitle = '',
                      zoomdate = '',
                      zoomlink = '',
                      duration = '',
                      starttime = '',
                      endtime = '',
                      _id = '',
                      image = '',
                      zoomid = '',
                      zoomclassid = '',
                      teachername = '',
                      scholarshipid = '',
                      scholarshipname = '',
                      boardname = '',
                      registerstudentlist = [],
                      zoomclassname = '',
                    } = item;
                    const LicenseID = PremiumPurchase.map(
                      rec =>
                        rec.licenseid == '1704875373950' ||
                        rec.licenseid == '1705039500455' ||
                        rec.licenseid == '1695358760234' ||
                        rec.licenseid == 'ADA51690528084298',
                    );
                    const paymentData = PremiumPurchase.map(
                      rec => rec.paymentid == 'free7days',
                    );

                    let getRegisterChildId = registerstudentlist.filter(
                      r => r.childid == childid,
                    );
                    {
                      /* if (getRegisterChildId.length > 0) {
                    setIsRegister(true);
                  } */
                    }
                    const start_time = moment(starttime).format('h:mma');
                    const currentTime = moment().format('h:mma');

                    var beginningTime = moment(start_time, 'h:mma');
                    var current_Time = moment(currentTime, 'h:mma');
                    {
                      /*  */
                    }
                    // const live_class_end_time = changeIsoDateToLocaldate(endtime);
                    const start_to_Join = beginningTime.isBefore(current_Time);

                    return (
                      <View
                        key={index}
                        style={{
                          // borderWidth: 1,
                          // borderColor: 'blue',
                          marginVertical: 5,
                          paddingHorizontal: 2,
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                        }}>
                        <Text
                          style={{
                            color: '#FFB901',
                            fontWeight: '700',
                            textAlign: 'center',
                            width: '12%',
                          }}>
                          {moment(starttime).format('hh:mm A')}
                          {' - '}
                          {moment(endtime).format('hh:mm A')}
                          {'  '}
                        </Text>
                        <View
                          style={{
                            backgroundColor: '#fff',
                            padding: 1.5,
                            minHeight: device_height * 0.23,
                            marginHorizontal: 10,
                            marginVertical: 5,
                          }}></View>
                        <View
                          style={{
                            // marginVertical: 10,
                            width: '88%',
                            marginLeft: 10,
                            borderWidth: 1,
                            borderColor: '#FFB901',
                            // backgroundColor: '#def',
                            backgroundColor: 'rgba(0,255,0, 0.05)',
                            // elevation: 5,
                            borderRadius: 10,
                            // paddingHorizontal: 10,
                            // paddingVertical: 5,
                            minHeight: device_height * 0.23,
                          }}>
                          {start_to_Join ? (
                            <View
                              style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                width: 80,
                                height: 25,
                                borderRadius: 3,
                                borderTopRightRadius: 8,
                                backgroundColor: 'crimson',
                                position: 'absolute',
                                right: 0,
                                top: 0,
                                // borderWidth: 1,
                              }}>
                              <View
                                style={{
                                  marginRight: 7,
                                  height: 10,
                                  width: 10,
                                  // backgroundColor: '#fff',
                                  backgroundColor: userBlink
                                    ? Colors.secondary
                                    : 'crimson',
                                  borderRadius: 20,
                                }}></View>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontSize: 12,
                                  fontWeight: 700,
                                }}>
                                {trans('LIVE')}
                              </Text>
                            </View>
                          ) : (
                            <></>
                          )}
                          <View
                            style={{
                              // width: device_width * 0.4,
                              // marginTop: 20,
                              // height: 70,
                              flexDirection: 'row',
                              alignItems: 'flex-start',
                              justifyContent: 'flex-start',
                              // borderWidth: 1,
                              // paddingVertical: 5,
                              // backgroundColor: '#def',
                              // backgroundColor: 'rgba(0,255,0, 0.05)',
                              alignSelf: 'center',
                              width: '100%',
                            }}>
                            <FastImage
                              style={{
                                minHeight: device_height * 0.2,
                                width: 120,
                                borderTopLeftRadius: 10,
                                // borderWidth: 1,
                                // borderColor: 'red',
                              }}
                              resizeMode="cover"
                              source={{
                                uri: image
                                  ? image
                                  : 'https://wkresources.s3.ap-south-1.amazonaws.com/userrr.png',
                              }}
                            />
                            <View
                              style={{
                                // borderWidth: 1,
                                marginTop: 25,
                                // marginHorizontal: 8,
                                marginLeft: 10,
                                width: '60%',
                                height: '100%',
                                padding: 1,
                              }}>
                              <Text
                                style={{
                                  color: '#FFB901',
                                  fontWeight: '800',
                                  fontSize: 17,
                                  // textAlign: 'center',
                                }}>
                                {scholarshipname}
                                {','}
                                {boardname}
                              </Text>

                              <Text
                                style={{
                                  color: '#fff',
                                  fontWeight: '800',
                                  // textAlign: 'center',
                                  width: '75%',
                                }}>
                                {zoomtitle}
                              </Text>

                              <Text
                                style={{
                                  color: '#fff',
                                  fontSize: 13,
                                  fontWeight: '700',
                                  // textAlign: 'center',
                                  width: '75%',
                                }}>
                                {/* {trans('Coaching Sessions')} */}
                                {zoomclassname}
                              </Text>
                              {teachername ? (
                                <View style={{ flexDirection: 'row' }}>
                                  <MaterialCommunityIcons
                                    size={20}
                                    name="human-male-board"
                                    color={'lawngreen'}
                                    style={{ alignSelf: 'center' }}
                                  />

                                  <Text
                                    style={{
                                      color: 'lawngreen',
                                      fontWeight: '700',
                                      paddingLeft: 5,
                                      fontSize: 16,
                                      width: '75%',
                                      // textAlign: 'center',
                                    }}>
                                    {teachername ? teachername : ''}
                                  </Text>
                                </View>
                              ) : (
                                <></>
                              )}
                            </View>
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              // borderWidth: 1,
                              alignItems: 'center',
                              width: '100%',
                              justifyContent: 'space-evenly',
                              // marginBottom: 10,
                              marginVertical: 10,
                            }}>
                            {/* {paymentData[0] == false ? ( */}
                            {paymentData[0] == true ||
                              (PremiumPurchase.length > 0 &&
                                LicenseID[0] == true) ? (
                              <TouchableOpacity
                                disabled={
                                  // start_to_Join
                                  //   ? false
                                  //   : getRegisterChildId.length > 0 &&
                                  start_to_Join ? false : true
                                }
                                style={{
                                  // marginHorizontal: 20,
                                  // marginVertical: 20,
                                  height: 30,
                                  borderRadius: 10,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderWidth: 1,
                                  borderColor:
                                    // start_to_Join
                                    //   ? 'green'
                                    //   : getRegisterChildId.length > 0 &&
                                    start_to_Join ? 'green' : 'gray',
                                  backgroundColor:
                                    // start_to_Join
                                    //   ? 'green'
                                    //   : getRegisterChildId.length > 0 &&
                                    start_to_Join ? 'green' : 'gray',
                                  width: '60%',
                                  // height:40
                                }}
                                onPress={() => {
                                  handleRegistration(_id, registerstudentlist);
                                  // navigation.navigate('Youtubevideo', {
                                  //   recordLink: zoomlink,
                                  // });
                                  Linking.openURL(zoomlink);
                                }}>
                                <Text
                                  style={{
                                    color: '#fff',
                                    textAlign: 'center',
                                    fontSize: 12,
                                    fontWeight: '600',
                                  }}>
                                  {trans('Join')}
                                </Text>
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                style={{
                                  // marginHorizontal: 20,
                                  // marginVertical: 20,
                                  height: 30,
                                  borderRadius: 10,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderWidth: 1,
                                  borderColor: '#FFB901',
                                  flexDirection: 'row',
                                  backgroundColor: '#FFB901',

                                  width: '60%',
                                  // height:40
                                }}
                                onPress={() => {
                                  navigation.navigate('PremiumAccess', {
                                    screenName: 'LiveclassList',
                                    subjectId: '',
                                    subjectName: '',
                                    topicid: '',
                                    topicName: '',
                                    ExamQuestionsets: '',
                                    isScoreBoardFlag: false,
                                    is2ndAvailable: '',
                                    index: '',
                                    scholarshipid: scholarshipid,
                                    scholarshipName: '',
                                    quizList: '',
                                    showFeedback: '',
                                  });
                                }}>
                                <FontAwesome5
                                  name="rupee-sign"
                                  style={{
                                    color: '#000',
                                    fontSize: 18,
                                    paddingHorizontal: 20,
                                  }}
                                  size={20}
                                />
                                <Text
                                  style={{
                                    color: '#000',
                                    textAlign: 'center',
                                    fontSize: 12,
                                    fontWeight: '600',
                                  }}>
                                  {trans('Pay Now')}
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                      </View>
                    );
                  })
                ) : (
                  <View
                    style={{
                      width: '98%',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                      // justifyContent: 'space-around',
                      backgroundColor: '#79851f',
                      padding: 10,
                      paddingHorizontal: 15,
                    }}>
                    <MaterialIcons name="info" color={'#fff'} size={35} />
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#fff',
                        fontWeight: '600',
                        textAlign: 'center',
                        alignSelf: 'center',
                        width: '90%',
                        // marginLeft:10
                      }}>
                      {trans(
                        `No live classes are scheduled for today's session`,
                      )}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        )}

        {selectedIndex == 2 && (
          <ScrollView
            contentContainerStyle={{ paddingBottom: 50 }}
            showsVerticalScrollIndicator={false}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          >
            <View
              style={{
                marginHorizontal: 5,
                marginVertical: 5,
                borderRadius: 10,
                // borderWidth: 2,
                // borderColor: 'red',
                // backgroundColor: Colors.secondary,
                // elevation: 10,
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  // flexDirection: 'row',
                  // flexWrap: 'wrap',
                  // borderWidth: 1,
                  // borderColor: 'green',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // marginVertical: 5,
                }}>
                {upcomingClasses.length > 0 ? (
                  upcomingClasses.map((item, index) => {
                    const {
                      zoomtitle = '',
                      zoomdate = '',
                      zoomlink = '',
                      duration = '',
                      starttime = '',
                      endtime = '',
                      _id = '',
                      image = '',
                      zoomid = '',
                      zoomclassid = '',
                      teachername = '',
                      scholarshipid = '',
                      scholarshipname = '',
                      boardname = '',
                      registerstudentlist = [],
                      zoomclassname = '',
                    } = item;

                    // console.log(
                    //   registerstudentlist,
                    //   'registerstudentlist.................',
                    // );

                    let getRegisterChildId = registerstudentlist.filter(
                      r => r.childid == childid,
                    );
                    { /* if (getRegisterChildId.length > 0) {
                         setIsRegister(true);
                    } */ }
                    const start_time = moment(starttime).format('h:mma');
                    const currentTime = moment().format('h:mma');

                    var beginningTime = moment(start_time, 'h:mma');
                    var current_Time = moment(currentTime, 'h:mma');

                    // const live_class_end_time = changeIsoDateToLocaldate(endtime);
                    const start_to_Join = beginningTime.isBefore(current_Time);
 
                    return (
                      <View
                        key={index}
                        style={{
                          // borderWidth: 1,
                          // borderColor: 'blue',
                          marginVertical: 5,
                          paddingHorizontal: 2,
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                        }}>
                        <Text
                          style={{
                            color: '#FFB901',
                            fontWeight: '700',
                            textAlign: 'center',
                            width: '12%',
                          }}>
                          {/* {'....'} */}
                          {moment(starttime).format('hh:mm A')}
                          {' - '}
                          {moment(endtime).format('hh:mm A')}
                          {'  '}
                        </Text>
                        <View
                          style={{
                            backgroundColor: '#fff',
                            padding: 1.5,
                            minHeight: device_height * 0.2,
                            marginHorizontal: 10,
                            marginVertical: 5,
                          }}></View>
                        <View
                          style={{
                            // marginVertical: 10,
                            width: '88%',
                            marginLeft: 10,
                            borderWidth: 1,
                            borderColor: '#FFB901',
                            // backgroundColor: '#def',
                            backgroundColor: 'rgba(0,255,0, 0.05)',
                            // elevation: 5,
                            borderRadius: 15,
                            // paddingHorizontal: 10,
                            // paddingVertical: 5,
                            minHeight: device_height * 0.2,
                          }}>
                          {/* {start_to_Join ? (
                          <View
                            style={{
                              // borderWidth: 1,
                              alignItems: 'center',
                              width: 80,
                              flexDirection: 'row',
                              position: 'absolute',
                              top: 5,
                              left: 5,
                              height: 18,
                            }}>
                            <View
                              style={{
                                padding: 4,
                                height: 12,
                                width: 12,
                                backgroundColor: 'crimson',
                                borderRadius: 20,
                                // alignSelf:'flex-end'
                                // alignSelf: 'center',
                              }}></View>
                            <Text
                              style={{
                                paddingLeft: 10,
                                fontSize: 14,
                                flexDirection: 'row',
                                color: 'crimson',
                                fontWeight: '700',
                              }}>
                              {trans('Live')}
                            </Text>
                          </View>
                        ) : (
                          <></>
                        )} */}
                          <View
                            style={{
                              // width: device_width * 0.4,
                              // marginTop: 10,
                              // height: 90,
                              flexDirection: 'row',
                              alignItems: 'flex-start',
                              justifyContent: 'flex-start',
                              // borderWidth: 1,
                              // paddingVertical: 5,
                              // backgroundColor: '#def',
                              alignSelf: 'center',
                              width: '100%',
                            }}>
                            <FastImage
                              style={{
                                minHeight: device_height * 0.21,
                                width: 120,
                                borderTopLeftRadius: 15,
                                borderBottomLeftRadius: 15,
                                // borderWidth: 1,
                              }}
                              resizeMode="cover"
                              source={{
                                uri: image
                                  ? image
                                  : 'https://wkresources.s3.ap-south-1.amazonaws.com/userrr.png',
                              }}
                            />
                            <View
                              style={{
                                // borderWidth: 1,
                                marginHorizontal: 8,
                                width: '70%',
                                height: '100%',
                                padding: 1,
                                marginBottom: 10,
                              }}>
                              <Text
                                style={{
                                  color: '#FFB901',
                                  fontWeight: '800',
                                  // textAlign: 'center',
                                }}>
                                {moment(zoomdate).format('DD-MMM-YYYY')}
                              </Text>
                              <Text
                                style={{
                                  color: '#FFB901',
                                  fontWeight: '800',
                                  fontSize: 16,
                                  width:'75%',
                                  // borderWidth:1
                                  // textAlign: 'center',
                                }}>
                                {scholarshipname}
                                {', '}
                                {boardname}
                              </Text>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontWeight: '800',
                                  // textAlign: 'center',
                                  width: '75%',
                                }}>
                                {zoomtitle}
                              </Text>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontSize: 13,
                                  fontWeight: '700',
                                  width: '75%',
                                  // textAlign: 'center',
                                }}>
                                {zoomclassname}
                              </Text>
                              {teachername ? (
                                <View style={{ flexDirection: 'row' }}>
                                  <MaterialCommunityIcons
                                    size={20}
                                    name="human-male-board"
                                    color={'lawngreen'}
                                    style={{ alignSelf: 'center' }}
                                  />
                                  <Text
                                    style={{
                                      color: 'lawngreen',
                                      fontWeight: '700',
                                      paddingLeft: 5,
                                      fontSize: 16,
                                      width: '75%',
                                      // textAlign: 'center',
                                    }}>
                                    {teachername ? teachername : ''}
                                  </Text>
                                </View>
                              ) : (
                                <></>
                              )}
                            </View>
                          </View>

                          {/* <View
                          style={{
                            flexDirection: 'row',
                            // borderWidth: 1,
                            alignItems: 'center',
                            width: '100%',
                            justifyContent: 'space-evenly',
                            marginBottom: 10,
                          }}>
                          <TouchableOpacity
                            disabled={true}
                            style={{
                              // marginHorizontal: 20,
                              // marginVertical: 20,
                              height: 30,
                              borderRadius: 10,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderWidth: 1,
                              borderColor: 'gray',
                              backgroundColor: 'gray',
                              // backgroundColor: 'green',
                              // padding: 5,
                              width: '30%',
                              // height:40
                            }}
                            onPress={() =>
                              navigation.navigate('Youtubevideo', {
                                recordLink: zoomlink,
                              })
                            }>
                            <Text
                              style={{
                                color: '#fff',
                                textAlign: 'center',
                                fontSize: 13,
                                fontWeight: '600',
                              }}>
                              {trans('Join')}
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            disabled={
                              getRegisterChildId.length > 0 ? true : false
                            }
                            style={{
                              height: 30,
                              // marginHorizontal: 20,
                              // marginVertical: 20,
                              borderRadius: 10,
                              borderWidth: 1,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor:
                                getRegisterChildId.length > 0
                                  ? 'gray'
                                  : '#FFBF00',
                              borderColor:
                                getRegisterChildId.length > 0
                                  ? 'gray'
                                  : '#FFBF00',
                              // backgroundColor: 'green',
                              padding: 5,
                              width: '30%',
                            }}
                            onPress={() =>
                              handleRegistration(_id, registerstudentlist)
                            }>
                            <Text
                              style={{
                                color: '#fff',
                                textAlign: 'center',
                                fontSize: 13,
                                fontWeight: '600',
                              }}>
                              {getRegisterChildId.length > 0
                                ? trans('Registered')
                                : trans('Registration')}
                            </Text>
                          </TouchableOpacity>
                          
                        </View> */}
                        </View>
                      </View>
                    );
                  })
                ) : (
                  <View
                    style={{
                      width: '98%',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                      // justifyContent: 'space-around',
                      backgroundColor: '#79851f',
                      padding: 10,
                      paddingHorizontal: 15,
                    }}>
                    <MaterialIcons name="info" color={'#fff'} size={35} />
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#fff',
                        fontWeight: '600',
                        textAlign: 'center',
                        alignSelf: 'center',
                        width: '90%',
                      }}>
                      {trans(
                        `No live classes are scheduled for upcoming session`,
                      )}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        )}

        {selectedIndex == 3 && (
          <>
            {Youtubelistload == 'loading' ? (
              <LoadingScreen flag={Youtubelistload == 'loading'} />
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}>
                {l1.map((rec, idx) => {
                  const { thumbnails = {}, resourceId = {} } = rec;
                  let videoID = [resourceId];
                  const l3 = videoID.map(r => r.videoId);

                  // console.log(l3, 'l3/////////');
                  let thumb = [thumbnails];
                  const l2 = thumb.map(r => r.high);
                  return (
                    <View key={idx}>
                      {/* {thumbnails.map} */}
                      {l2.map((record, indx) => {
                        const { url = '' } = record;
                        return (
                          <TouchableOpacity
                            key={indx}
                            onPress={() => {
                              navigation.navigate('Youtubevideo', {
                                recordLink: l3,
                              });
                            }}>
                            <ImageBackground
                              style={{
                                // borderRadius: 10,
                                borderWidth: 1,
                                borderColor:'gold',
                                alignSelf: 'center',
                                width: device_width * 0.94,
                                height: device_height * 0.3,
                                // borderRadius: 25,
                                // paddingVertical:10,
                                // flex: 1,
                                // justifyContent: 'flex-end',
                                // alignItems: 'flex-end',
                                marginVertical: 5,
                              }}
                              resizeMode="cover"
                              source={{
                                uri:
                                  url != '' && url != null
                                    ? url
                                    : 'https://notevook.s3.ap-south-1.amazonaws.com/Adarsh/Notevook+NVA.png',
                              }}></ImageBackground>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  );
                })}
              </ScrollView>
            )}
          </>
        )}
      </ImageBackground>
    </View>
  );
};

export default LiveClassList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.secondary,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  tests: {
    color: '#2f60e2',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
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
    // borderBottomWidth: 1,
    // borderBottomColor: '#f2f2f2',
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
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },

  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  checkboxContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderWidth: 1,
    // marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});
