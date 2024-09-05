import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    BackHandler,
    ImageBackground,
    Alert,
  } from 'react-native';
  import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import PieChart from 'react-native-pie-chart';
  import React, {useEffect, useRef, useState} from 'react';
  import {ActivityIndicator, Avatar, Modal} from 'react-native-paper';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import FastImage from 'react-native-fast-image';
  import ViewShot from 'react-native-view-shot';
  import Share from 'react-native-share';
  import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
  import {useTranslation} from 'react-i18next';
  import Iconz from 'react-native-vector-icons/Entypo';
  import Icon from 'react-native-vector-icons/Ionicons';
  import {device_height, device_width} from '../style';
  import {markCalculation, handlesubjectData} from '../../../constants/Constants';
  import {useNavigation} from '@react-navigation/native';
  import {
    getChildDetailsAPI,
    selectStudentInfo,
  } from '../../redux/reducers/StudentInfoReducer';
  import {selectExamName} from '../../redux/reducers/ExamTestNameReducer';
  import {RootState} from '../../redux/store/Store';
  import Colors from '../../../assets/Colors';
  import moment from 'moment';
  import {
    getLiveQuizTopStudentAPI,
    selectLiveQuizTopStudentData,
    selectLiveQuizTopStudentStatus,
  } from '../../redux/reducers/GetLiveQuizTopStudentReducer';
  import {
    getLiveQuizAPI,
    selectLiveQuizData,
    selectLiveQuizStatus,
  } from '../../redux/reducers/LiveQuizReducer';
  import LoadingScreen from '../CommonScreens/LoadingScreen';
  import Header from '../CommonScreens/Header';
  import {
    getPastLiveQuizAPI,
    selectPastLiveQuizData,
    selectPastLiveQuizStatus,
  } from '../../redux/reducers/GetPastLiveQuizReducer';
  import {
    getHomeTopStudentAPI,
    selectHomeTopStudentData,
    selectHomeTopStudentStatus,
  } from '../../redux/reducers/GetHomeLeaderBoardReducer';
  const LiveQuizDetails = ({route}) => {
    const dispatch = useDispatch<any>();
    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
    const navigation = useNavigation();
    const todayDate = new Date();
    const {t: trans, i18n} = useTranslation();
  
    // const {
    //   screenName = '',
    //   isReattempt = false,
    //   studentdata = [],
    //   scholarshipid = '',
    //   // boardid= '',
  
    //   scholarshipName = '',
    // } = route.params;
  
    const [loading, setLoading] = useState(false);
    const [ansloading, setAnsLoading] = useState(false);
    const [modalStatus, setModalStatus] = useState(false);
    const [reminderModal, setReminderModal] = useState(false);
    const [paymentModal, setPaymentModal] = useState(false);
    const [livequizmodalStatus, setLivequizModalStatus] = useState(false);
    const [livequizexceedStatus, setLivequizexceedStatus] = useState(false);
    // const {childInfo = {}} = useSelector(state => state.ChildDetailsReducer);
  
    const Pastquiz = useAppSelector(selectPastLiveQuizData);
    const PastquizLoading = useAppSelector(selectPastLiveQuizStatus);
    
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
      fname = '',
      lname = '',
      stage = '',
      gender = '',
      stageid = '',
      boardid = '',
      childid = '',
      age = '',
      image = '',
      boardname: boardofeducation = '',
    } = childInfo;
  
    const ListColor = ['#fee2a3', '#f6c4b9', '#c3ccf5', '#76f0c7'];
  
    const ref = useRef();
    const [imageUri, setImageUri] = useState('');
    // const ContentQuiz:any=[]
    const ContentQuiz = useAppSelector(selectLiveQuizData);
  
    const today = new Date();
    const todayDateString = today.toISOString().split('T')[0];
    const todayliveQuiz = ContentQuiz.filter(item => {
      const quizDate = new Date(item.starttime).toISOString().split('T')[0];
      return quizDate === todayDateString;
    });
    const upcomingLiveQuiz = ContentQuiz.filter(item => {
      const quizDate = new Date(item.starttime).toISOString().split('T')[0];
      return quizDate > todayDateString;
    });
    const pastliveQuiz = ContentQuiz.filter(item => {
      const quizDate = new Date(item.starttime).toISOString().split('T')[0];
      return quizDate < todayDateString;
    });
  
    const destinationDate = moment(upcomingLiveQuiz[0]?.starttime);
  
    // Get today's date
    const todayDateData = moment();
  
    const daysLeft = destinationDate?.diff(todayDateData, 'days');
  
    const todayliveQuizStudentData = todayliveQuiz?.map(r => r.childlivequiz);
    const upcomingQuizStudentData = upcomingLiveQuiz?.map(r => r.childlivequiz);
    const pastliveQuizStudentData = pastliveQuiz?.map(r => r.childlivequiz);
  
    const [leaderBoardStatus, setLeaderBoardtatus] = useState(false);
    const liveQuizLeaderBoard = useAppSelector(selectHomeTopStudentData);
    const leaderboardLoading = useAppSelector(selectHomeTopStudentStatus);
    const livequizStudentdata = ContentQuiz?.map(r => r.childlivequiz);
  
    const topstudentData = liveQuizLeaderBoard?.map(r => r.childLiveQuizDetails);
  
    const LiveQuizTopStudent = topstudentData[0].slice(0, 3);
    const ContentLoading = useAppSelector(selectLiveQuizStatus);
    const Livequiz = {
      boardid,
      childid,
    };
    // const todayliveQuizDate = new Date(todayliveQuiz[0]?.starttime).toISOString().split('T')[0];
  
    // const PastquizDate = Pastquiz?.filter(item => {
    //   const quizDate = new Date(item.starttime).toISOString().split('T')[0];
    //   return  quizDate === todayliveQuizDate;
    // });
  
    const TopstudentData = {
      quizid:
        todayliveQuiz[0] != undefined && todayliveQuiz[0]?.length != 0
          ? todayliveQuiz[0]?.quizid
          : '',
    };
    // const TopstudentData = {
    //   quizid: Pastquiz[0]?.quizid,
    // };
  
    const pastquizId = {
      childid,
    };
    useEffect(() => {
      // if(Pastquiz[0]?.quizid.length!=0){
      // dispatch(getLiveQuizTopStudentAPI(TopstudentData));
      // }
      dispatch(getHomeTopStudentAPI());
      dispatch(getLiveQuizAPI(Livequiz));
      dispatch(getPastLiveQuizAPI(pastquizId));
      navigation.addListener('focus', () => {
        dispatch(getHomeTopStudentAPI());
        // dispatch(getLiveQuizTopStudentAPI(TopstudentData));
        dispatch(getPastLiveQuizAPI(pastquizId));
  
        dispatch(getLiveQuizAPI(Livequiz));
        BackHandler.addEventListener('hardwareBackPress', () => {
          navigation.navigate('SubjectLevel');
          return true;
        });
      });
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', () => {
          // handleBackButtonClick();
          navigation.navigate('SubjectLevel');
          return true;
        });
      };
    }, []);
  
    const [currentTimeState, setCurrentTimeState] = useState(
      moment().format('h:mma'),
    );
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTimeState(moment().format('h:mma'));
      }, 1000); // Update every second
  
      return () => clearInterval(interval); // Cleanup on component unmount
    }, []);
    ///////////////////////UPCOMING///////////////
    const TodayDate = moment(todayDate).format('DD-MMM-YYYY');
    const startDate = moment(todayliveQuiz[0]?.starttime).format('DD-MMM-YYYY');
  
    let isUpcoming = TodayDate != startDate;
    //////////////////////START TO JOIN//////////////////////////////
    const start_time = moment(todayliveQuiz[0]?.starttime).format('h:mma');
    // const currentTime = moment().format('h:mma');
  
    const beginningTime = moment(start_time, 'h:mma');
    const current_Time = moment(currentTimeState, 'h:mma');
    const start_to_Join = beginningTime.isSameOrBefore(
      moment(currentTimeState, 'h:mma'),
    );
    ////////////////////////END TIMECHECK////////////////////////////////////////
    const Endtimedata = moment(todayliveQuiz[0]?.endtime, 'h:mma');
    const Examendtime = moment(Endtimedata, 'h:mma');
    const ExamtimeEnd = current_Time.isAfter(Examendtime);
    /////////////////////////EXAM EXCEEDTIME///////////////////////////
  
    const examStartTimedt = moment(todayliveQuiz[0]?.starttime);
    const examCutoffTime = examStartTimedt.add(15, 'minutes');
  
    //////////////////////CHECKEND///////////////////
    const EndtimeDetails = moment(todayliveQuiz[0]?.endtime);
    const ExamtimeEndDetails = current_Time.isSameOrAfter(EndtimeDetails);
    /////////////////////////EXAM EXCEEDTIME////////////////
  
    // Get the current time
    const currentTime = moment();
  
    // const examCutoffTime = moment(todayliveQuiz[0]?.starttime).add(15, 'minutes');
    const examExceedTime = current_Time.isSameOrAfter(examCutoffTime);
  
    // console.log(
    //   moment(examCutoffTime).format('h:mma'),
    //   'examCutoffTime',
    //   examExceedTime,
    //   'examExceedTime......',
    //   start_to_Join,
    //   'start_to_Join',
    //   moment(todayliveQuiz[0]?.starttime).format('h:mma'),
    //   'START TIME',
    //   current_Time,
    //   'current_Time',
    //   moment(todayliveQuiz[0]?.endtime).format('h:mma'),
    //   'ENDTIME',
    //   ExamtimeEnd,
    //   'ExamtimeEnd',
    //   ExamtimeEndDetails,
    //   'ExamtimeEndDetails',
    // );
    // console.log(
    //   todayliveQuiz != undefined,
    //   todayliveQuiz.length != 0,
    //   ExamtimeEndDetails == true,
    //   liveQuizLeaderBoard.length > 0,
    //   '[[[[[[[[[[[[[[[[',
    // );
  
    // const startTIME = new Date(`${todayliveQuiz[0]?.starttime}`).getTime();
  
    let startTIME = 0;
    //  new Date(`${todayliveQuiz[0]?.starttime<}`).getTime();
    // console.log(
    //   todayliveQuiz[0].length != 0,
    //   'todayliveQuiz[0].length.........',
    //   upcomingLiveQuiz[0].length != 0,
    //   'upcomingLiveQuiz[0].length > 0..........',
    // );
  
    // const currentTIME = new Date().getTime();
  
    const [currentState, setCurrentState] = useState(new Date().getTime());
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentState(new Date().getTime());
      }, 1000); // Update every second
  
      return () => clearInterval(interval); // Cleanup on component unmount
    }, []);
    const [todayStartTime, getTodayStartTime] = useState(0);
    // console.log(todayStartTime,"todayStartTime$$$$$$$$$$$$$$$")
    let timeLeft = todayStartTime - currentState;
  
    // useEffect(() => {
    //   let interval: any = null;
    //   if (timeLeft > 0) {
    //     interval = setInterval(() => {
    //       setCurrentState(new Date().getTime());
    //     }, 1000);
    //   } // Update every second
    //   else if (timeLeft === 0) {
    //     clearInterval(interval);
    //     timeLeft=0
    //   } else if (timeLeft < 0) {
    //     clearInterval(interval);
    //     console.log("TIME.................LEFT.................NEGATIVE")
    //     startTIME=0
    //     console.log(startTIME,"startTIME....................")
    //     if (
    //       todayliveQuiz[0] != undefined &&
    //       todayliveQuiz[0]?.length != 0 &&
    //       todayliveQuizStudentData[0] != undefined &&
    //       todayliveQuizStudentData[0]?.length == 0
    //     ) {
    //       console.log('111111111111111111111111111111111111111');
    //       startTIME = new Date(`${todayliveQuiz[0]?.starttime}`).getTime();
    //     } else if (
    //       todayliveQuizStudentData[0] != undefined &&
    //       todayliveQuizStudentData[0]?.length != 0 &&
    //       upcomingLiveQuiz[0] != undefined &&
    //       upcomingLiveQuiz[0].length != 0
    //     ) {
    //       console.log('2222222222222222222222222222222222222222');
    //       startTIME = new Date(`${upcomingLiveQuiz[0]?.starttime}`).getTime();
    //       console.log(startTIME, 'startTIME');
    //     } else if (
    //       todayliveQuiz[0] != undefined &&
    //       todayliveQuiz[0].length == 0 &&
    //       upcomingLiveQuiz[0] != undefined &&
    //       upcomingLiveQuiz[0].length != 0
    //     ) {
    //       console.log('33333333333333333333333');
    //       startTIME = new Date(`${upcomingLiveQuiz[0]?.starttime}`).getTime();
    //     } else {
    //     }
    //   }
    //   return () => clearInterval(interval); // Cleanup on component unmount
    // }, [timeLeft, startTIME]);
  
    // console.log(timeLeft==0 ,"timeLeft==0 ",
    // todayliveQuiz[0] != undefined,"todayliveQuiz[0] != undefined",
    // todayliveQuiz[0]?.length != 0,"todayliveQuiz[0]?.length != 0 ",
    // todayliveQuizStudentData[0] != undefined," todayliveQuizStudentData[0] != undefined",
    // todayliveQuizStudentData[0]?.length==0,"todayliveQuizStudentData[0]?.length==0")
  
    useEffect(() => {
      if (
        timeLeft < 0 &&
        timeLeft != 0 &&
        todayliveQuiz[0] != undefined &&
        todayliveQuiz[0]?.length != 0 &&
        todayliveQuizStudentData[0] != undefined &&
        todayliveQuizStudentData[0]?.length == 0
      ) {
        // console.log("TIME.................LEFT.................NEGATIVE")
        startTIME = new Date(`${todayliveQuiz[0]?.starttime}`).getTime();
        getTodayStartTime(startTIME);
        setCurrentState(new Date().getTime());
      } else if (
        timeLeft < 0 &&
        todayliveQuiz[0] != undefined &&
        todayliveQuiz[0]?.length != 0 &&
        todayliveQuizStudentData[0] != undefined &&
        todayliveQuizStudentData[0]?.length != 0
      ) {
        // console.log('111111111111111111111111111111111111111');
        // startTIME = new Date(`${todayliveQuiz[0]?.starttime}`).getTime();
        getTodayStartTime(0);
        setCurrentState(0);
      }
      // else if (
      //   timeLeft<0 &&
      //   todayliveQuiz[0] != undefined &&
      //   todayliveQuiz[0]?.length == 0
  
      // ) {
      //   console.log('111111111111111111111111111111111111111');
      //   // startTIME = new Date(`${todayliveQuiz[0]?.starttime}`).getTime();
      //   getTodayStartTime(0)
      //   setCurrentState(0)
      // }
      else if (timeLeft < 0) {
        getTodayStartTime(0);
        setCurrentState(0);
      } else {
        // getTodayStartTime(0)
        // setCurrentState(0)
      }
    }, []);
  
    // console.log(timeLeft, 'timeLeft//////////////');
    let DaysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  
    // console.log(DaysLeft, '///////////////////////');
    let hoursLeft = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    let minsLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let secsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);
    let total_sec =
      DaysLeft * 24 * 60 * 60 + hoursLeft * 60 * 60 + minsLeft * 60 + secsLeft;
  
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor={'#263d2d'} barStyle="light-content" />
  
        <>
          {ContentLoading == 'loading' ||
          PastquizLoading == 'loading' ||
          leaderboardLoading == 'loading' ? (
            <LoadingScreen
              flag={
                ContentLoading == 'loading' ||
                PastquizLoading == 'loading' ||
                leaderboardLoading == 'loading'
              }
            />
          ) : (
            <ImageBackground
              style={{
                width: device_width,
                height: device_height,
                flex: 1,
                alignSelf: 'center',
                // borderWidth:1,
              }}
              resizeMode="cover"
              source={require('../../../assets/0.png')}>
              <Header
                label1={''}
                label2={''}
                isbackIconShow={true}
                functionName={() => navigation.goBack()}
              />
              <ScrollView>
                {ContentQuiz.length != '' && (
                  <View
                    style={{
                      height: device_height * 1,
                      width: '100%',
                      paddingBottom: 10,
                      // borderWidth: 1,
                      borderColor: 'yellow',
                    }}>
                    {todayliveQuizStudentData[0] != undefined &&
                    todayliveQuizStudentData[0]?.length != '' &&
                    isUpcoming == false ? (
                      <View
                        style={{
                          height: 70,
                          width: '94%',
                          // alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'row',
                          borderColor: 'darkgoldenrod',
                          borderWidth: 1,
                          marginHorizontal: 12,
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
                              fontSize: 14,
                              color: '#333',
                              fontWeight: '600',
                            }}>
                            {'   '}
                            {trans('You have already attempted the Live Quiz')}
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <></>
                    )}
                    {todayliveQuiz != undefined &&
                      todayliveQuiz.length != 0 &&
                      ExamtimeEndDetails == true &&
                      topstudentData[0]?.length > 0 && (
                        <View
                          style={{
                            justifyContent: 'center',
                            alignSelf: 'center',
                            alignItems: 'center',
                            // flexDirection: 'row',
                            borderWidth: 1.5,
                            backgroundColor: '#00a330',
                            borderColor: '#fff',
                            borderRadius: 10,
                            marginVertical: 5,
                            paddingHorizontal: 10,
                            width: '94%',
                            height: device_height * 0.45,
                            marginTop: 10,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignItems: 'center',
                              justifyContent: 'space-around',
                              height: '17%',
                              // borderWidth: 1,
                            }}>
                            <Text
                              style={{
                                fontSize: 20,
                                fontWeight: '900',
                                color: '#fff',
                                // textAlign:'center',
                                letterSpacing: 1,
                              }}>
                              {trans('NOTEVED LIVE QUIZ RESULT')}
                            </Text>
                          </View>
  
                          <View
                            style={{
                              // flexDirection: 'row',
                              // width: '48%',
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: '12%',
                              paddingBottom: 5,
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: '600',
                                color: '#fff',
                                // textAlign: 'center',
                              }}>
                              {LiveQuizTopStudent?.length > 0 &&
                                `${moment(
                                  liveQuizLeaderBoard[0]?.attemptDate,
                                ).format('DD-MMM-YYYY')}`}
                            </Text>
                            <Text
                              style={{
                                fontSize: 18,
                                fontWeight: '800',
                                color: '#fff',
                                textAlign: 'center',
                                letterSpacing: 0.5,
                              }}>
                              {trans('Winners')}
                            </Text>
                          </View>
  
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                              paddingVertical: 10,
                              alignItems: 'flex-start',
                              width: '100%',
                              height: '38%',
                              alignSelf: 'center',
                              // borderWidth: 1,
                              // top:10
                            }}>
                            {LiveQuizTopStudent?.map((item, index) => {
                              const {
                                fname: name = '',
                                fathername = '',
                                schoolname = '',
                                answerdetails = [],
                                quiz = [],
                                lastexamtotalsecurmark = '',
                                timetaken: lastexamtimetaken = '',
                                percentage = '',
                                score: securemark = '',
                                image: studentimage = '',
                                gender = '',
                              } = item;
                              return (
                                <View
                                  key={index}
                                  style={{
                                    // borderWidth: 1,
                                    borderColor: '#fff',
                                    // width: device_width * 0.18,
                                    width: 110,
                                    height: '100%',
                                    // paddingHorizontal:3,
                                    justifyContent: 'flex-start',
                                    paddingVertical: 5,
                                    alignItems: 'center',
                                    // marginVertical: 15,
                                  }}>
                                  <FastImage
                                    style={{
                                      height: '130%',
                                      width: 90,
                                      // marginVertical: 5,
                                      borderRadius: 5,
                                      // borderWidth:1
                                    }}
                                    source={
                                      studentimage != '' && studentimage != null
                                        ? {uri: studentimage}
                                        : gender == 'Male'
                                        ? require('../../../assets/boy.png')
                                        : gender == 'Female'
                                        ? require('../../../assets/girl.png')
                                        : {
                                            uri: 'https://wkresources.s3.ap-south-1.amazonaws.com/userrr.png',
                                          }
                                    }
                                  />
  
                                  <Text
                                    style={{
                                      // color: '#f1a722',
                                      color: '#fff',
                                      fontSize: 12,
                                      fontWeight: '600',
                                      // marginTop: 10,
                                      textTransform: 'capitalize',
                                      textAlign: 'center',
                                    }}>
                                    {name}
                                  </Text>
                                </View>
                              );
                            })}
                          </View>
  
                          {/* {liveQuizLeaderBoard.length == '' && (
                      <Text>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: '700',
                            // marginLeft: 15,
                            color: '#000',
                          }}>
                          {trans('No Top Student Available')}
                        </Text>
                      </Text>
                    )} */}
                          {/* {liveQuizLeaderBoard.length > 0 && ( */}
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignItems: 'center',
                              justifyContent: 'space-around',
                              height: '30%',
                              // borderWidth: 1,
                            }}>
                            <TouchableOpacity
                              // disabled={LiveQuizTopStudent?.length > 0 ? false : true}
                              style={{
                                paddingVertical: 5,
                                borderRadius: 10,
                                width: '50%',
                                marginVertical: 10,
                                marginHorizontal: 5,
                                // paddingHorizontal: 15,
                                // borderWidth: 1,
                                borderColor: '#FFB901',
                                backgroundColor: '#fff',
                                flexDirection: 'row',
                                // backgroundColor: '#fff',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                              onPress={() => {
                                // myCustomShare();
                                // setModalStatus(true);
                                setLeaderBoardtatus(true);
                                // navigation.navigate('LiveQuizLeaderBoardList');
                              }}>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  width: '90%',
                                  alignItems: 'center',
                                }}>
                                <FontAwesome5
                                  style={{color: 'gold', marginHorizontal: 8}}
                                  name={'crown'}
                                  size={22}
                                />
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    // width: '100%',
                                    // borderWidth:1
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 15,
                                      fontWeight: '700',
                                      // marginLeft: 15,
                                      color: '#000',
                                    }}>
                                    {trans('See Leaderboard')}
                                  </Text>
                                </View>
                                {/* <MaterialIcons
                          name="share"
                          color={'#f1a722'}
                          size={22}
                          // style={{height: 30, width: 30}}
                        /> */}
                              </View>
                            </TouchableOpacity>
                            {/* <TouchableOpacity
                    onPress={
                      () => {}
                      // navigation.navigate('LiveQuizAnswerSheet', {
                      //   screenName: screenName,
  
                      //   ExamQuestionsets: quiz,
                      //   subjectName: subjectName,
  
                      //   quiz: quiz,
                      //   quizID: quizID,
  
                      //   scholarshipid: scholarshipid,
  
                      //   boardid: boardid,
                      //   scholarshipName: scholarshipName,
                      // })
                    }
                    style={{
                      paddingVertical: 5,
                      borderRadius: 10,
                      width: '45%',
                      marginVertical: 10,
                      marginHorizontal: 5,
                      // paddingHorizontal: 15,
                      borderWidth: 1,
                      borderColor: '#FFB901',
                      backgroundColor: 'rgba(250,250,250,0.1)',
                      flexDirection: 'row',
                      // backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        // fontSize: 16,
                        fontWeight: '700',
                        textAlign: 'center',
                      }}>
                      {trans('Download Certificate')}
                    </Text>
                  </TouchableOpacity> */}
                          </View>
                          {/* )} */}
                        </View>
                      )}
                    {todayliveQuiz != undefined &&
                      todayliveQuiz.length != 0 &&
                      start_to_Join == true &&
                      ExamtimeEndDetails == false && (
                        <>
                          <View
                            style={{
                              height: 70,
                              width: '94%',
                              // alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'row',
                              borderColor: 'darkgoldenrod',
                              borderWidth: 1,
                              marginHorizontal: 12,
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
                              <MaterialIcons
                                name="info"
                                color={'green'}
                                size={30}
                              />
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: '#333',
                                  fontWeight: '600',
                                  width: '94%',
                                  paddingLeft: 5,
                                }}>
                                {trans(
                                  'Once the exam ends at the mentioned end time, the leaderboard will be displayed, showcasing the top performers',
                                )}
                                {/* {'   '}{' '}
                                {moment(todayliveQuiz[0]?.endtime).format(
                                  'HH:mm:A',
                                )} */}
                              </Text>
                            </View>
                          </View>
                        </>
                      )}
  
                    <View
                      style={{
                        marginTop: 10,
                        padding: 20,
                        paddingVertical: 20,
                        // borderWidth: 1,
                        width: '94%',
                        height: device_height * 0.38,
                        backgroundColor: '#00a330',
                        borderRadius: 20,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 24,
                          color: 'gold',
                          fontWeight: '900',
                          textAlign: 'left',
                          paddingLeft: 5,
                        }}>
                        {todayliveQuiz != undefined &&
                        todayliveQuiz.length == 0 &&
                        upcomingLiveQuiz != undefined &&
                        upcomingLiveQuiz.length !== 0 ? (
                          upcomingLiveQuiz[0].quizname
                        ) : (
                          <></>
                        )}
                        {todayliveQuiz != undefined &&
                        todayliveQuizStudentData[0] != undefined &&
                        todayliveQuizStudentData[0]?.length == 0 ? (
                          todayliveQuiz[0].quizname
                        ) : (
                          <></>
                        )}
                        {todayliveQuizStudentData[0] != undefined &&
                        todayliveQuizStudentData[0]?.length !== 0 &&
                        upcomingLiveQuiz[0] != undefined &&
                        upcomingLiveQuiz[0]?.length !== '' &&
                        upcomingLiveQuiz[0]?.starttime ? (
                          upcomingLiveQuiz[0].quizname
                        ) : (
                          <></>
                        )}
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#fff',
                          fontWeight: '700',
                          textAlign: 'left',
                          paddingLeft: 5,
                          // textDecorationLine: 'underline',
                          // marginVertical: 20,
                        }}>
                        {trans('Upcoming Quiz')}
                      </Text>
                      <View
                        style={{
                          width: '100%',
                          // borderWidth: 1,
                          borderColor: '#999',
                          alignItems: 'left',
                          justifyContent: 'center',
                          // alignSelf: 'center',
                          paddingHorizontal: 5,
                          // paddingVertical: 15,
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#fff',
                            fontWeight: '500',
                            textAlign: 'left',
                            // paddingLeft:5,
                            // textTransform: 'capitalize',
                          }}>
                          {todayliveQuizStudentData[0] != undefined &&
                          todayliveQuizStudentData[0]?.length == 0 ? (
                            `${moment(todayliveQuiz.starttime).format(
                              'DD-MMM-YYYY',
                            )}`
                          ) : (
                            <></>
                          )}
                          {todayliveQuizStudentData[0] != undefined &&
                          todayliveQuizStudentData[0]?.length !== 0 &&
                          upcomingLiveQuiz[0] != undefined &&
                          upcomingLiveQuiz[0]?.length !== '' &&
                          upcomingLiveQuiz[0]?.starttime &&
                          daysLeft!=0? (
                            `${moment(upcomingLiveQuiz[0].starttime).format(
                              'DD-MMM-YYYY',
                            )}${'  '}${'('}${
                              daysLeft != undefined ? daysLeft : <></>
                            }${' Days Left'}${')'}`
                          ) : (
                            <></>
                          )}
  
                          {ContentQuiz?.length < 0 ? (
                            trans('Currently no upcoming live quiz is available')
                          ) : (
                            <></>
                          )}
                          {/* {ContentQuiz?.length != '' &&
                        upcomingLiveQuiz?.length == '' ? (
                          trans('Currently no upcoming live quiz is available')
                        ) : (
                          <></>
                        )} */}
                          {todayliveQuiz != undefined &&
                          todayliveQuiz.length != 0 &&
                          todayliveQuizStudentData[0] != undefined &&
                          todayliveQuizStudentData[0]?.length != 0 &&
                          upcomingLiveQuiz != undefined &&
                          upcomingLiveQuiz.length === 0 ? (
                            trans('Currently no upcoming live quiz is available')
                          ) : (
                            <></>
                          )}
  
                          {todayliveQuiz != undefined &&
                          todayliveQuiz.length == 0 &&
                          upcomingLiveQuiz != undefined &&
                          upcomingLiveQuiz.length !== 0&&
                          daysLeft!=0 ? (
                            `${moment(upcomingLiveQuiz[0].starttime).format(
                              'DD-MMM-YYYY',
                            )}${'  '}${'('}${
                              daysLeft != undefined ? daysLeft : <></>
                            }${' Days Left'}${')'}`
                          ) : (
                            <></>
                          )}
                          {/* {livequizStudentdata[0]?.length != '' &&
                        isUpcoming == false &&
                        (TodayDate == startDate) == true &&
                        `${trans(
                          'Currently no upcoming live quiz is available',
                        )}`}
                      {(TodayDate == startDate) == true &&
                        livequizStudentdata[0]?.length == '' &&
                        `${moment(ContentQuiz[0]?.starttime).format(
                          'DD-MMM-YYYY',
                        )}`}
                      {TodayDate < startDate == true &&
                        `${moment(ContentQuiz[0]?.starttime).format(
                          'DD-MMM-YYYY',
                        )}`}
  
                      {(TodayDate != startDate) == true &&
                        TodayDate > startDate == true &&
                        `${trans(
                          'Currently no upcoming live quiz is available',
                        )}`} */}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#fff',
                            fontWeight: '500',
                            textAlign: 'left',
                            // paddingLeft:5,
                            // textTransform: 'capitalize',
                          }}>
                          {todayliveQuizStudentData[0] != undefined &&
                            todayliveQuizStudentData[0]?.length == 0 &&
                            `${trans('Quiz Start Time')}${' : '}${moment(
                              todayliveQuiz[0]?.starttime,
                            ).format('HH:mm:A')}`}
                          {todayliveQuizStudentData[0] != undefined &&
                            todayliveQuizStudentData[0]?.length !== 0 &&
                            upcomingLiveQuiz[0] != undefined &&
                            upcomingLiveQuiz[0]?.length !== '' &&
                            upcomingLiveQuiz[0]?.starttime &&
                            `${trans('Quiz Start Time')}${' : '}${moment(
                              upcomingLiveQuiz[0].starttime,
                            ).format('HH:mm:A')}`}
  
                          {todayliveQuiz != undefined &&
                          todayliveQuiz.length == 0 &&
                          upcomingLiveQuiz != undefined &&
                          upcomingLiveQuiz.length !== 0 ? (
                            `${trans('Quiz Start Time')}${' : '}${moment(
                              upcomingLiveQuiz[0].starttime,
                            ).format('HH:mm:A')}`
                          ) : (
                            <></>
                          )}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#fff',
                            fontWeight: '500',
                            textAlign: 'left',
                            // paddingLeft:5,
                            // textTransform: 'capitalize',
                          }}>
                          {todayliveQuizStudentData[0] != undefined &&
                            todayliveQuizStudentData[0]?.length == 0 &&
                            `${trans('Quiz End Time')}${' : '}${moment(
                              todayliveQuiz[0]?.endtime,
                            ).format('HH:mm:A')}`}
                          {todayliveQuizStudentData[0] != undefined &&
                            todayliveQuizStudentData[0]?.length !== 0 &&
                            upcomingLiveQuiz[0] != undefined &&
                            upcomingLiveQuiz[0]?.length !== '' &&
                            upcomingLiveQuiz[0]?.starttime &&
                            `${trans('Quiz End Time')}${' : '}${moment(
                              upcomingLiveQuiz[0].endtime,
                            ).format('HH:mm:A')}`}
  
                          {todayliveQuiz != undefined &&
                          todayliveQuiz.length == 0 &&
                          upcomingLiveQuiz != undefined &&
                          upcomingLiveQuiz.length !== 0 ? (
                            `${trans('Quiz End Time')}${' : '}${moment(
                              upcomingLiveQuiz[0].endtime,
                            ).format('HH:mm:A')}`
                          ) : (
                            <></>
                          )}
                        </Text>
                        {timeLeft < 0 ||
                        timeLeft == undefined ||
                        timeLeft == 0 ? (
                          <></>
                        ) : (
                          <>
                            {todayliveQuizStudentData[0] != undefined &&
                              todayliveQuizStudentData[0]?.length == 0 && (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <View
                                    style={{
                                      // borderWidth: 1,
                                      borderColor: '#FFB901',
                                      padding: 5,
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      marginHorizontal: 5,
                                    }}>
                                    <Text
                                      style={{
                                        fontWeight: '900',
                                        color: '#FFB901',
                                        fontSize: 19,
                                      }}>
                                      {DaysLeft > 0 ? DaysLeft : 0}
                                      {`D`}
                                    </Text>
                                  </View>
                                  <Text
                                    style={{
                                      fontWeight: '900',
                                      color: '#FFB901',
                                      fontSize: 19,
                                    }}>
                                    :
                                  </Text>
                                  <View
                                    style={{
                                      // borderWidth: 1,
                                      borderColor: '#FFB901',
                                      padding: 5,
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      marginHorizontal: 5,
                                    }}>
                                    <Text
                                      style={{
                                        fontWeight: '900',
                                        color: '#FFB901',
                                        fontSize: 19,
                                      }}>
                                      {hoursLeft > 0 ? hoursLeft : 0}
                                      {`H`}
                                    </Text>
                                  </View>
                                  <Text
                                    style={{
                                      fontWeight: '900',
                                      color: '#FFB901',
                                      fontSize: 19,
                                    }}>
                                    :
                                  </Text>
                                  <View
                                    style={{
                                      // borderWidth: 1,
                                      borderColor: '#FFB901',
                                      padding: 5,
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      marginHorizontal: 5,
                                    }}>
                                    <Text
                                      style={{
                                        fontWeight: '900',
                                        color: '#FFB901',
                                        fontSize: 19,
                                      }}>
                                      {minsLeft > 0 ? minsLeft : 0}
                                      {`M`}
                                    </Text>
                                  </View>
                                  <Text
                                    style={{
                                      fontWeight: '900',
                                      color: '#FFB901',
                                      fontSize: 19,
                                    }}>
                                    :
                                  </Text>
                                  <View
                                    style={{
                                      // borderWidth: 1,
                                      borderColor: '#FFB901',
                                      padding: 5,
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      marginHorizontal: 5,
                                    }}>
                                    <Text
                                      style={{
                                        fontWeight: '900',
                                        color: '#FFB901',
                                        fontSize: 19,
                                      }}>
                                      {secsLeft > 0 ? secsLeft : 0}
                                      {`S`}
                                    </Text>
                                  </View>
                                </View>
                              )}
                          </>
                        )}
  
                        {todayliveQuiz?.length != '' &&
                          todayliveQuizStudentData[0]?.length == '' && (
                            <TouchableOpacity
                              onPress={() => {
                                // setIstimeExceed(false);
                                start_to_Join == false
                                  ? setLivequizModalStatus(true)
                                  : start_to_Join == true &&
                                    examExceedTime == true
                                  ? setLivequizexceedStatus(true)
                                  : navigation.navigate('LiveQuizInfo');
  
                                // setIsExamStarted(true);
                                // //   setIsButtonDisabled(false);
                                // //   setStartTime(now);
                              }}
                              disabled={ExamtimeEndDetails == true ? true : false}
                              style={{
                                paddingVertical: 5,
                                borderRadius: 10,
                                width: '45%',
                                marginVertical: 10,
                                marginHorizontal: 5,
                                // paddingHorizontal: 15,
                                // borderWidth: 1,
                                borderColor: '#FFB901',
                                backgroundColor:
                                  // istimeExceed == true
                                  //   ? '#aaa'
                                  //   :
                                  start_to_Join == false ||
                                  ExamtimeEndDetails == true ||
                                  examExceedTime == true
                                    ? '#aaa'
                                    : '#fff',
                                flexDirection: 'row',
                                // backgroundColor: '#fff',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  color:
                                    start_to_Join == false ||
                                    ExamtimeEndDetails == true ||
                                    examExceedTime == true
                                      ? 'gray'
                                      : '#000',
                                  // fontSize: 16,
                                  fontWeight: '700',
                                  textAlign: 'center',
                                }}>
                                {trans('Start The Quiz')}
                              </Text>
                            </TouchableOpacity>
                          )}
                        {todayliveQuizStudentData[0] != undefined &&
                          todayliveQuizStudentData[0]?.length !== 0 &&
                          upcomingLiveQuiz[0] != undefined &&
                          upcomingLiveQuiz[0]?.length !== '' &&
                          upcomingLiveQuiz[0]?.starttime && (
                            <TouchableOpacity
                              onPress={() => {}}
                              disabled={true}
                              style={{
                                paddingVertical: 8,
                                borderRadius: 10,
                                width: '65%',
                                alignSelf: 'center',
                                marginVertical: 10,
                                marginHorizontal: 15,
  
                                // paddingHorizontal: 15,
                                // borderWidth: 1,
                                borderColor: '#FFB901',
                                backgroundColor: '#aaa',
  
                                flexDirection: 'row',
                                // backgroundColor: '#fff',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  color: 'gray',
  
                                  // fontSize: 16,
                                  fontWeight: '700',
                                  textAlign: 'center',
                                }}>
                                {trans('Start The Quiz')}
                              </Text>
                            </TouchableOpacity>
                          )}
  
                        {todayliveQuiz != undefined &&
                          todayliveQuiz.length == 0 &&
                          upcomingLiveQuiz != undefined &&
                          upcomingLiveQuiz.length !== 0 && (
                            <TouchableOpacity
                              onPress={() => {}}
                              disabled={true}
                              style={{
                                paddingVertical: 8,
                                borderRadius: 10,
                                width: '65%',
                                alignSelf: 'center',
                                marginVertical: 10,
                                marginHorizontal: 15,
  
                                // paddingHorizontal: 15,
                                // borderWidth: 1,
                                borderColor: '#FFB901',
                                backgroundColor: '#aaa',
  
                                flexDirection: 'row',
                                // backgroundColor: '#fff',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  color: 'gray',
  
                                  // fontSize: 16,
                                  fontWeight: '700',
                                  textAlign: 'center',
                                }}>
                                {trans('Start The Quiz')}
                              </Text>
                            </TouchableOpacity>
                          )}
                        {todayliveQuiz?.length != '' &&
                          todayliveQuizStudentData[0]?.length == '' && (
                            <Text
                              style={{
                                fontSize: 13,
                                color: '#FDDA0D',
                                fontWeight: '500',
                                // textAlign: 'left',
                                marginVertical: 3,
                                width: '100%',
                                fontStyle: 'italic',
                              }}>
                              {examExceedTime == false
                                ? `${trans(
                                    'Note:-This button will be enabled when the live quiz starts at the time shown above.',
                                  )}`
                                : `${trans(
                                    'Note:-You are late for exam . The button is disabled as the exam has started. Join at exam start time from next time onwards.',
                                  )}`}
                            </Text>
                          )}
  
                        {todayliveQuiz != undefined &&
                          todayliveQuiz.length == 0 &&
                          upcomingLiveQuiz != undefined &&
                          upcomingLiveQuiz.length !== 0 && (
                            <Text
                              style={{
                                fontSize: 13,
                                color: '#FDDA0D',
                                fontWeight: '500',
                                // textAlign: 'left',
                                marginVertical: 3,
                                width: '100%',
                                fontStyle: 'italic',
                              }}>
                              {trans(
                                'Note:-This button will be enabled when the live quiz starts at the time shown above.',
                              )}
                            </Text>
                          )}
  
                        {todayliveQuizStudentData[0] != undefined &&
                          todayliveQuizStudentData[0]?.length !== 0 &&
                          upcomingLiveQuiz[0] != undefined &&
                          upcomingLiveQuiz[0]?.length !== '' &&
                          upcomingLiveQuiz[0]?.starttime && (
                            <Text
                              style={{
                                fontSize: 13,
                                color: '#FDDA0D',
                                fontWeight: '500',
                                // textAlign: 'left',
                                marginVertical: 3,
                                width: '100%',
                                fontStyle: 'italic',
                              }}>
                              {trans(
                                'Note:-This button will be enabled when the live quiz starts at the time shown above.',
                              )}
                            </Text>
                          )}
                        {/* )} */}
                      </View>
                    </View>
                  </View>
                )}
              </ScrollView>
              {ContentQuiz.length == '' && (
                <View
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      // borderRadius: 15,
                      // borderWidth: 1,
                      // minHeight: device_height,
                      // minWidth: device_width,
                      height: device_height * 0.5,
                      width: device_width * 0.98,
                      // backgroundColor: '#fff',
                      borderColor: '#FFB901',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}>
                    <View>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              width: device_width * 0.7,
                              fontSize: 15,
                              color: '#fff',
                              marginTop: 10,
                              marginLeft: 10,
                              fontWeight: '700',
                            }}>
                            {trans('Sorry! No Live Quiz Available Today')}
                          </Text>
                        </View>
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
                          alignSelf: 'center',
                          // padding: 10,
                        }}></View>
                    </View>
                  </View>
                </View>
              )}
            </ImageBackground>
          )}
  
          {livequizmodalStatus && (
            <Modal transparent={true} visible={livequizmodalStatus}>
              <View
                style={{
                  borderRadius: 14,
                  // borderRadius: 50,
                  // borderWidth:1,
                  // borderTopWidth: 1,
                  // borderLeftWidth: 1,
                  // borderRightWidth: 1,
                  borderColor: '#fff',
                  backgroundColor: '#fff',
                  // width: device_width,
                  // height: device_height,
                  minHeight: device_height * 0.3,
                  minWidth: device_width * 0.9,
                  // borderRadius: 25,
                  // flex: 1,
                  alignSelf: 'center',
                  // justifyContent: 'center',
                  // alignItems: 'center',
                }}>
                <View
                  style={{
                    borderRadius: 15,
                    borderWidth: 1,
                    minHeight: device_height * 0.3,
                    minWidth: device_width * 0.8,
                    // backgroundColor: '#fff',
                    borderColor: '#fff',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    // flex: 1,
                    alignItems: 'center',
                    //   paddingHorizontal: 20,
                  }}>
                  {/* <AntDesign
                    name="closecircleo"
                    style={{
                      fontSize: 35,
                      color: '#333',
                      position: 'absolute',
                      top: 30,
                      right: 30,
                      // marginTop: 10,
                      backgroundColor: '#f1a722',
                      borderRadius: 50,
                    }}
                    onPress={()=>setLivequizModalStatus(false)}
                  /> */}
  
                  <Text
                    style={{
                      textAlign: 'center',
                      width: device_width * 0.7,
                      fontSize: 18,
                      color: '#333',
                      marginTop: 5,
                      // marginLeft: 5,
                      fontWeight: '600',
                      // textTransform: 'capitalize',
                    }}>
                    {trans(
                      'This button will be enabled when the live quiz starts at the time shown above.',
                    )}
                  </Text>
                  <View
                    style={{
                      // borderWidth: 1,
                      paddingVertical: 15,
                      alignItems: 'center',
                      marginTop: 10,
                      marginLeft: 10,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      // borderColor: '#aaa',
                      // borderRadius: 8,
                      padding: 10,
                    }}>
                    <TouchableOpacity
                      style={{
                        borderRadius: 10,
                        width: '40%',
                        marginVertical: 5,
                        // borderWidth: 1,
                        marginRight: 25,
                        borderColor: 'white',
                        backgroundColor: 'green',
                        paddingVertical: 15,
                        justifyContent: 'center',
                      }}
                      onPress={() => setLivequizModalStatus(false)}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 18,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          alignItems: 'center',
                        }}>
                        {trans('OK')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )}
          {livequizexceedStatus && (
            <Modal transparent={true} visible={livequizexceedStatus}>
              <View
                style={{
                  borderRadius: 14,
                  // borderRadius: 50,
                  // borderWidth:1,
                  // borderTopWidth: 1,
                  // borderLeftWidth: 1,
                  // borderRightWidth: 1,
                  borderColor: '#fff',
                  backgroundColor: '#fff',
                  // width: device_width,
                  // height: device_height,
                  minHeight: device_height * 0.3,
                  minWidth: device_width * 0.9,
                  // borderRadius: 25,
                  // flex: 1,
                  alignSelf: 'center',
                  // justifyContent: 'center',
                  // alignItems: 'center',
                }}>
                <View
                  style={{
                    borderRadius: 15,
                    borderWidth: 1,
                    minHeight: device_height * 0.3,
                    minWidth: device_width * 0.8,
                    // backgroundColor: '#fff',
                    borderColor: '#fff',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    // flex: 1,
                    alignItems: 'center',
                    //   paddingHorizontal: 20,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      width: device_width * 0.7,
                      fontSize: 18,
                      color: '#333',
                      marginTop: 5,
                      // marginLeft: 5,
                      fontWeight: '600',
                      textTransform: 'capitalize',
                    }}>
                    {trans(
                      'Quiz time has exceeded; you can no longer join the quiz',
                    )}
                  </Text>
                  <View
                    style={{
                      // borderWidth: 1,
                      paddingVertical: 15,
                      alignItems: 'center',
                      marginTop: 10,
                      marginLeft: 10,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      // borderColor: '#aaa',
                      // borderRadius: 8,
                      padding: 10,
                    }}>
                    <TouchableOpacity
                      style={{
                        borderRadius: 10,
                        width: '40%',
                        marginVertical: 5,
                        // borderWidth: 1,
                        marginRight: 25,
                        borderColor: 'white',
                        backgroundColor: 'green',
                        paddingVertical: 15,
                        justifyContent: 'center',
                      }}
                      onPress={() => setLivequizexceedStatus(false)}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 18,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          alignItems: 'center',
                        }}>
                        {trans('OK')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )}
          {leaderBoardStatus && liveQuizLeaderBoard.length >= 0 && (
            <Modal transparent={true} visible={leaderBoardStatus}>
              <SafeAreaView
                style={{
                  borderRadius: 15,
                  // borderWidth: 1,
                  backgroundColor: 'mistyrose',
                  height: device_height * 0.85,
                  width: device_width * 0.95,
                  alignSelf: 'center',
                  // backgroundColor: '#fff',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  // flex: 1,
                  alignItems: 'center',
                  //   paddingHorizontal: 20,
                }}>
                <FastImage
                  style={{
                    height: 60,
                    width: 120,
                    // position: 'absolute',
                    //left: 10,
                  }}
                  resizeMode="contain"
                  source={require('../../../assets/crown.png')}
                />
                <AntDesign
                  name="closecircleo"
                  style={{
                    fontSize: 35,
                    color: '#fff',
                    position: 'absolute',
                    top: -15,
                    right: -5,
                    marginTop: 10,
                    backgroundColor: 'crimson',
                    borderRadius: 50,
                  }}
                  onPress={() => {
                    // dispatch(livequizleaderboardstate());
  
                    setLeaderBoardtatus(false);
                  }}
                />
  
                <View
                  style={{
                    // flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    // borderWidth: 1,
                    // paddingVertical: 15,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      width: '100%',
                      fontSize: 27,
                      color: 'darkorange',
                      // marginTop: 10,
                      // marginLeft: 10,
                      fontWeight: '900',
                    }}>
                    {trans('Leaderboard')}
                  </Text>
                </View>
                {leaderboardLoading == 'loading' ? (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '90%',
                      width: '90%',
                      alignSelf: 'center',
                      flex: 1,
                    }}>
                    <ActivityIndicator
                      size="large"
                      color={'green'}
                      // color={'#fff'}
                      style={{alignSelf: 'center'}}
                    />
                    <Text
                      style={{
                        // color: '#f1a722',
                        color: 'green',
                        fontWeight: '600',
                        fontSize: 12,
                      }}>
                      {trans('Loading... Please Wait')}
                    </Text>
                  </View>
                ) : (
                  <>
                    <ScrollView
                      showsVerticalScrollIndicator={true}
                      persistentScrollbar={true}>
                      <View
                        style={{
                          width: '100%',
                          alignSelf: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
                          // paddingBottom: 20,
                          marginTop: 50,
                          marginBottom: 50,
                          // borderWidth: 1,
                          // flex: 1,
                        }}>
                        {topstudentData[0]?.length > 0 && (
                          <>
                            {topstudentData[0]?.map((item, index) => {
                              const {
                                fname: name = '',
                                fathername = '',
                                schoolname = '',
                                answerdetails = [],
                                quiz = [],
                                lastexamtotalsecurmark = '',
                                timetaken: lastexamtimetaken = '',
                                percentage = '',
                                score: securemark = '',
                                image: studentimage = '',
                                gender = '',
                              } = item;
  
                              const hours = Math.floor(lastexamtimetaken / 3600);
                              const minutes = Math.floor(
                                (lastexamtimetaken % 3600) / 60,
                              );
                              const remainingSeconds = lastexamtimetaken % 60;
  
                              const formattedHours =
                                hours < 10 ? `0${hours}` : hours;
                              const formattedMinutes =
                                minutes < 10 ? `0${minutes}` : minutes;
                              const formattedSeconds =
                                remainingSeconds < 10
                                  ? `0${remainingSeconds}`
                                  : remainingSeconds;
  
                              const toOrdinalSuffix = index => {
                                const int = parseInt(index),
                                  digits = [int % 10, int % 100],
                                  ordinals = ['st', 'nd', 'rd', 'th'],
                                  oPattern = [1, 2, 3, 4],
                                  tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
                                return oPattern.includes(digits[0]) &&
                                  !tPattern.includes(digits[1])
                                  ? int + ordinals[digits[0] - 1]
                                  : int + ordinals[3];
                              };
                              return (
                                <View
                                  key={index}
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderWidth: 4,
                                    borderColor: 'mediumpurple',
                                    width: '98%',
                                    borderRadius: 10,
                                    height: device_height * 0.18,
                                    marginVertical: 3,
                                    padding: 3,
                                    backgroundColor:
                                      ListColor[index % ListColor.length],
                                    elevation: 5,
                                  }}>
                                  {toOrdinalSuffix(index + 1) == '1st' ||
                                  toOrdinalSuffix(index + 1) == '2nd' ||
                                  toOrdinalSuffix(index + 1) == '3rd' ? (
                                    <View
                                      style={{
                                        // width: '18%',
                                        borderRadius: 50,
                                        // padding: 7,
                                        height: 50,
                                        width: 50,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 3,
                                        borderColor: 'darkorange',
                                        // backgroundColor: 'rebeccapurple',
                                        elevation: 5,
                                      }}>
                                      <Avatar.Image
                                        source={
                                          toOrdinalSuffix(index + 1) == '1st'
                                            ? require('../../../assets/first.png')
                                            : toOrdinalSuffix(index + 1) == '2nd'
                                            ? require('../../../assets/second.png')
                                            : toOrdinalSuffix(index + 1) == '3rd'
                                            ? require('../../../assets/third.jpg')
                                            : ''
                                        }
                                        size={50}
                                        // style={{backgroundColor: 'rebeccapurple'}}
                                      />
                                    </View>
                                  ) : (
                                    <View
                                      style={{
                                        // width: '18%',
                                        borderRadius: 50,
                                        // padding: 7,
                                        height: 50,
                                        width: 50,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        // borderWidth: 3,
                                        // borderColor: 'darkorange',
                                        // backgroundColor: 'rebeccapurple',
                                        // elevation: 5,
                                      }}>
                                      {/* <Text
                                      style={{
                                        fontSize: 16,
                                        fontWeight: '900',
                                        color: '#fff',
                                      }}>
                                      {toOrdinalSuffix(index + 1)}
                                    </Text> */}
                                    </View>
                                  )}
                                  <View
                                    style={{
                                      width: '65%',
                                      justifyContent: 'center',
                                      paddingVertical: 5,
                                      paddingHorizontal: 15,
                                      // borderWidth:1,
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 18,
                                        fontWeight: '800',
                                        color: Colors.primary,
                                      }}>
                                      {name}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 14,
                                        fontWeight: '700',
                                        color: '#333',
                                      }}>
                                      {trans("Guardian's Name")} -{' '}
                                      <Text
                                        style={{
                                          fontWeight: '800',
                                          color: Colors.primary,
                                        }}>
                                        {fathername}
                                      </Text>
                                    </Text>
                                    {schoolname != undefined &&
                                      schoolname != '' && (
                                        <Text
                                          style={{
                                            fontSize: 14,
                                            fontWeight: '700',
                                            color: '#333',
                                          }}>
                                          {trans('School')} -{' '}
                                          <Text
                                            style={{
                                              fontWeight: '800',
                                              color: Colors.primary,
                                            }}>
                                            {schoolname}
                                          </Text>
                                        </Text>
                                      )}
                                    {securemark != undefined &&
                                      securemark != '' && (
                                        <Text
                                          style={{
                                            fontSize: 14,
                                            fontWeight: '700',
                                            color: '#333',
                                          }}>
                                          {trans('Secure Mark')} -{' '}
                                          <Text
                                            style={{
                                              fontWeight: '800',
                                              color: Colors.primary,
                                            }}>
                                            {securemark}
                                          </Text>
                                          
                                        </Text>
                                      )}
                                       {lastexamtimetaken.length!=0 &&
                                       <Text
                                       style={{
                                         fontSize: 14,
                                         fontWeight: '700',
                                         color: '#333',
                                       }}>
                                       {trans('Time Taken')} -{' '}
                                     
                                       <Text
                                         style={{
                                           fontSize: 13,
                                           fontWeight: '700',
                                           color: 'green',
                                         }}>
                                         {
                                           `${formattedHours}:${formattedMinutes}:${formattedSeconds}`}
                                       </Text>
                                     </Text>
                                     }
                                  </View>
                                  <View
                                    style={{
                                      width: '23%',
                                      height: 70,
                                      marginBottom: 5,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    <FastImage
                                      style={{
                                        height: '110%',
                                        width: 60,
                                        // marginVertical: 5,
                                        borderRadius: 5,
                                        // borderWidth: 1,
                                      }}
                                      resizeMode="contain"
                                      source={
                                        studentimage != '' && studentimage != null
                                          ? {uri: studentimage}
                                          : gender == 'Male'
                                          ? require('../../../assets/boy.png')
                                          : gender == 'Female'
                                          ? require('../../../assets/girl.png')
                                          : {
                                              uri: 'https://wkresources.s3.ap-south-1.amazonaws.com/userrr.png',
                                            }
                                      }
                                    />
                                  </View>
                                </View>
                              );
                            })}
                          </>
                        )}
                        {liveQuizLeaderBoard.length == 0 && (
                          <>
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: '700',
                                // marginLeft: 15,
                                color: '#000',
                              }}>
                              {trans('No Top student Available')}
                            </Text>
                          </>
                        )}
                      </View>
                    </ScrollView>
                    <View
                      style={{
                        // borderWidth: 1,
                        // paddingVertical: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        alignSelf: 'center',
                        marginVertical: 15,
                      }}>
                      <TouchableOpacity
                        style={{
                          borderRadius: 10,
                          width: 150,
                          // marginVertical: 5,
                          // borderWidth: 1,
                          alignSelf: 'center',
                          // marginRight: 25,
                          alignItems: 'center',
                          // borderColor: 'white',
                          backgroundColor: 'green',
                          paddingVertical: 10,
                          // paddingHorizontal:30,
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          // dispatch(livequizleaderboardstate());
                          setLeaderBoardtatus(false);
                          // setModalStatus(false);
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 18,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            alignItems: 'center',
                          }}>
                          {trans('OK')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </SafeAreaView>
            </Modal>
          )}
        </>
      </SafeAreaView>
    );
  };
  
  export default LiveQuizDetails;
  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      backgroundColor: '#fff',
      // paddingHorizontal: 20,
    },
    indicatorStyle: {
      // Customize the indicator color here
      backgroundColor: 'white', // Change this to your desired color
    },
    header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 10,
      paddingBottom: 15,
    },
    headerCointain: {
      width: '100%',
      height: '100%',
      backgroundColor: '#D6EAF8',
      borderWidth: 5,
      borderColor: '#E5E4E2',
      borderRadius: 10,
      alignItems: 'center',
      padding: 10,
    },
  
    headerInner: {
      width: '95%',
      borderWidth: 1,
      // borderBottomWidth: 0,
      borderColor: '#fff',
      // borderTopColor: '#ccc',
      borderRadius: 12,
      // marginTop: 15,
      // alignSelf: 'center',
      marginVertical: 10,
      marginHorizontal: 10,
    },
    headerinner1: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 15,
    },
    innerText: {
      fontSize: 20,
      color: Colors.primary,
      fontWeight: 'bold',
      marginLeft: 5,
      marginRight: 10,
    },
    text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 22,
    },
    header: {
      // flex: 0.8,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      // paddingBottom: 50,
    },
    footer: {
      // flex: 1,
      backgroundColor: '#fff',
      // borderTopLeftRadius: 30,
      // borderTopRightRadius: 30,
      paddingHorizontal: 20,
      // paddingVertical: 10,
    },
  
    text_header: {
      color: '#333',
      fontWeight: 'bold',
      fontSize: 35,
    },
    text_footer: {
      color: '#05375a',
      fontSize: 18,
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,
    },
    actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5,
    },
    textInput: {
      // flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: Colors.primary,
      fontWeight: 'bold',
    },
    errorMsg: {
      color: '#FF0000',
      fontSize: 14,
    },
    button: {
      alignItems: 'center',
      marginTop: 20,
    },
    signIn: {
      display: 'flex',
      flexDirection: 'row',
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
  });
  