import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Animated,
  BackHandler,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Colors from '../../../assets/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import * as Progress from 'react-native-progress';

import {device_height, device_width} from '../style';
import {markCalculation} from '../../../constants/Constants';
import WebView from 'react-native-webview';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../redux/store/reducerHook';
import {
  getContentQuizAPI,
  selectContentQuiz,
  selectContentQuizStatus,
} from '../../redux/reducers/GetContentQuizReducer';
import CommonModalUser from '../CommonScreens/CommonModalUser';
import CommonTimer from '../CommonScreens/CommonTimer';
import {
  getChildDetailsAPI,
  selectStudentInfo,
} from '../../redux/reducers/StudentInfoReducer';
import {getTopicBySubClassAPI} from '../../redux/reducers/GetTopicBySubjectReducer';
import LoadingScreen from '../CommonScreens/LoadingScreen';
import {
  AddChildRevisionAPI,
  answerReattemptSubmitApi,
  answerSubmitApi,
  createBelow90PercentageBSEApi,
  createBelow90PercentageOtherApi,
  createabove90PercentageBSEApi,
  createabove90PercentageOtherApi,
} from '../../redux/actions/SubjectsAPI';
import {
  handleSetTopicIdForRevision,
  selectTopicId,
} from '../../redux/reducers/GetTopicIdReducer';
import {
  dataclearstate,
  getTopicDetailsAPI,
  selectTopicDetails,
} from '../../redux/reducers/GetTopicDetailsFormTopicIdReducer';
import {
  clearrivisionstate,
  getChildRevisionDetailsAPI,
} from '../../redux/reducers/GetChildRevisionReducer';
import {
  getLiveQuizAPI,
  selectLiveQuizData,
  selectLiveQuizStatus,
} from '../../redux/reducers/LiveQuizReducer';
import {LiveQuizAnswerSubmitApi} from '../../redux/actions/LiveQuizAPI';
import { selectUserInfo } from '../../redux/reducers/loginReducer';

const LiveQuiz = ({route}) => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation();
  const scrollRef = useRef();
  const {t: trans, i18n} = useTranslation();

  const animatedScale = useRef(new Animated.Value(8)).current;
  //
  useEffect(() => {
    animatedScale.setValue(1);
  }, []);

  const ContentQuiz = useAppSelector(selectLiveQuizData);
  const ContentLoading = useAppSelector(selectLiveQuizStatus);

  const today = new Date();
  const todayDateString = today.toISOString().split('T')[0];

  const todayliveQuiz = ContentQuiz?.filter(item => {
    const quizDate = new Date(item.starttime).toISOString().split('T')[0];
    return quizDate === todayDateString;
  });

  let quiz = todayliveQuiz[0]?.quiz ? todayliveQuiz[0]?.quiz : [];
  const sortedQuestionList = todayliveQuiz[0]?.quiz
    .slice()
    .sort((a, b) => a.questionno - b.questionno);
  const [Questionlist, setQuestionlist] = useState(
    sortedQuestionList?.quiz ? sortedQuestionList.quiz : [],
  );
  //
  const [currentIndex, setCurrentIndex] = useState(0);

  const timeDurationValue =
    Questionlist[currentIndex]?.timeDuration != 0 &&
    Questionlist[currentIndex]?.timeDuration != ''
      ? Questionlist[currentIndex]?.timeDuration
      : 0;

  const [timeLeft, setTimeLeft] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);

  const [timerHeight, setTimerHeight] = useState('100%');

  useEffect(() => {
    // if (timeDurationValue > 0 && timeTaken == timeDurationValue) {
    //   handleClearAndSkipQuestion(currentIndex);
    // } else if (timeDurationValue == 0) {
    //   setTimerHeight(`${0}`);
    // } else {
    // }
    const interval = setInterval(() => {
      setTimeTaken(prevTimeTaken => prevTimeTaken + 1);
      setTimerHeight(`${(timeTaken / timeDurationValue) * 100}%`);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeTaken, timeDurationValue]);

  const [loading, setLoading] = useState(false);
  const [selectedStep, setSelectedStep] = useState(1);

  const [modalStatus, setModalStatus] = useState(false);
  //
  const [quitModalStatus, setQuitModalStatus] = useState(false);
  //
  const [skipModalStatus, setSkipModalStatus] = useState(false);
  const [clearSkipModalStatus, setClearSkipModalStatus] = useState(false);
  const [isProgress, setIsProgress] = React.useState(true);
  const [progressdata, setProgressdata] = useState(todayliveQuiz ? 0 : 0);
  const [rightAnswer, setRightAnswer] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);

  const childInfo = useAppSelector(selectStudentInfo) as ChildInfo;
  const {authToken, status, userInfo} = useAppSelector(selectUserInfo);
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
    classname: string;
  }

  const {
    _id: id = '',
    childid = '',
    stage = '',
    scholarship = [],
    name: userName = '',
    fname = '',
    gender = '',
    lname = '',
    email = '',
    phone = '',
    image = '',
    age = '',
    address = '',
    language = '',
  } = userInfo;

  const handleselectAnswer = (answerid: string, index: number) => {
    let questions = [...Questionlist];
    questions[index] = {
      ...questions[index],
      selectedAns: answerid.toLowerCase(),
    };

    if (answerid == Questionlist[index].answer.toLowerCase()) {
      setQuestionlist(questions);
      setRightAnswer(true);
      setWrongAnswer(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        if (Questionlist?.length == currentIndex + 1) {
          setQuestionlist(questions);
          handleAnswerSubmit(questions);
        } else {
          setCurrentIndex(currentIndex + 1);
          handlePress();
        }
      }, 300);
    } else {
      setQuestionlist(questions);
      setWrongAnswer(true);
      setRightAnswer(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        if (Questionlist?.length == currentIndex + 1) {
          setQuestionlist(questions);
          handleAnswerSubmit(questions);
        } else {
          setCurrentIndex(currentIndex + 1);
          handlePress();
        }
      }, 300);
    }

    animatedScale.setValue(0.8);
    Animated.spring(animatedScale, {
      toValue: 1,
      bounciness: 20,
      speed: 50,
      useNativeDriver: true,
    }).start();
  };

  const handleClearAndSkipQuestion = async (index: number) => {
    let questions = [...Questionlist];
    questions[index].selectedAns = '';
    setQuestionlist(questions);
    if (currentIndex == Questionlist.length + 1) {
      handleAnswerSubmit(questions);
    } else {
      setCurrentIndex(currentIndex + 1);
      await handleNext();
    }
  };

  const handleSkipQuestion = async () => {
    await handleNext();
    setSkipModalStatus(false);
  };

  const handleNext = async () => {
    setCurrentIndex(currentIndex + 1);
    handlePress();
  };

  const handlePrevious = async () => {
    setCurrentIndex(currentIndex - 1);
    handlePreviousPress();
  };

  const handleNavigation = questions => {
    navigation.navigate('LiveQuizScoreBoard', {
      quiz: questions,
      quizID: todayliveQuiz[0].quizid,
    });
    setIsQuit(false);
  };

  const handleCallback = async questions => {
    setIsQuit(false);
    setCurrentIndex(0);
    handleNavigation(questions);
    return true;
  };

  const handleAnswerSubmit = questions => {
    setIsQuit(true);
    const {
      no_of_Attempts = 0,
      correctanswer = 0,
      Skipped = 0,
      Wronganswer = 0,
      totalmark = 0,
      percentage = 0,
    } = markCalculation(questions);

    const questionLength = Questionlist.length;

    const bodyAnswerData = {
      // quizid: todayliveQuiz[0].quizid,
      // childid: childid,
      // stage: stage,
      // stageid: stageid,
      //boardname: boardname,
      //boardid: boardid,
      // totalmark: Questionlist.length,
      // securemark: correctanswer,
      // skipmark: Skipped,
      // wrongmark: Wronganswer,
      // quiz: questions,
      // attemptDate: '',
      // quizimage: '',
      // ispremium: false,
      // starttime: todayliveQuiz[0]?.starttime,
      // endtime: todayliveQuiz[0]?.endtime,
      // timetaken: lastExamTimeTaken > 0 ? lastExamTimeTaken : 0,
      childid: childid,
      quizid: todayliveQuiz[0].quizid,
      totalmark: Questionlist.length,
      securemark: correctanswer,
      skipmark: Skipped,
      wrongmark: Wronganswer,
      quiz: questions,
      attemptDate: '',
      quizimage: '',
      ispremium: false,
      starttime: todayliveQuiz[0]?.starttime,
      endtime: todayliveQuiz[0]?.endtime,
      timetaken: lastExamTimeTaken > 0 ? lastExamTimeTaken : 0,
    };
    console.log(bodyAnswerData, childid, '@bodyAnswerData');

    LiveQuizAnswerSubmitApi(
      bodyAnswerData,
      handleCallback(questions),
      setLoading,
    );
  };

  const {
    no_of_Attempts = 0,
    correctanswer = 0,
    Skipped = 0,
    Wronganswer = 0,
    totalmark = 0,
    percentage = 0,
  } = markCalculation(Questionlist);

  const handleBackButtonClick = () => {
    setQuitModalStatus(true);
    return true;
  };

  useEffect(() => {
    if (progressdata == Infinity) {
      setProgressdata(0);
    } else {
      setProgressdata(progressdata);
    }
  }, []);
  const Livequiz = {
    childid,
  };
  useEffect(() => {
    setModalStatus(false);
    setQuitModalStatus(false);
    dispatch(getLiveQuizAPI(Livequiz));
    navigation.addListener('focus', () => {
      dispatch(getLiveQuizAPI(Livequiz));
      BackHandler.addEventListener('hardwareBackPress', () =>
        handleBackButtonClick(),
      );

      setModalStatus(false);
      setQuitModalStatus(false);

      if (id != '') dispatch(getChildDetailsAPI(childid));
      if (progressdata == 0) handlePress();
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () =>
        handleBackButtonClick(),
      );
    };
  }, [progressdata]);
  const isReattempt = false;
  useEffect(() => {
    if (isReattempt == false) {
      if (quiz?.length > 0) {
        setQuestionlist(quiz);
      }
    } else {
      if (quiz?.length > 0) setQuestionlist(quiz);
    }
  }, [ContentQuiz]);

  const handleReattemptSubmit = () => {};

  const handlePress = () => {
    setTimeTaken(0);
    let newprogressdata = parseFloat(progressdata) + 1 / Questionlist?.length;
    newprogressdata = parseFloat(newprogressdata);
    setProgressdata(newprogressdata);
  };

  const handlePreviousPress = () => {
    let newprogressdata = parseFloat(progressdata) - 1 / Questionlist?.length;
    newprogressdata = parseFloat(newprogressdata);
    setProgressdata(newprogressdata);
  };

  const timeDurationValues = todayliveQuiz[0]?.timeDuration;
  let timeDurationValueData =
    timeDurationValues != null && timeDurationValues.length != 0
      ? timeDurationValues * 60
      : 0;

  const [timeRemainingData, setTimeRemainingData] = useState(
    timeDurationValueData,
  );
  useEffect(() => {
    let interval: any = null;
    if (timeRemainingData > 0) {
      interval = setInterval(() => {
        setTimeRemainingData(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
    } else if (timeRemainingData === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeRemainingData, timeDurationValueData]);
  const lastExamTimeTaken = timeDurationValueData - timeRemainingData;

  const timeDurationVal = todayliveQuiz[0]?.timeDuration;
  let timeDurationValueDatas =
    timeDurationValues != null && timeDurationValues.length != 0
      ? timeDurationValues * 60
      : 0;

  const [timeTakens, setTimeTakens] = useState(0);

  const handleTimerEnd = timeTakenByUser => {
    setTimeTakens(timeTakenByUser);
  };
  const [timeRemaining, setTimeRemaining] = useState(timeDurationValueDatas);
  const [isQuit, setIsQuit] = React.useState(false);
  useEffect(() => {
    let interval = null;
    if (timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prevTimeLeft => prevTimeLeft - 1);
        setTimeTakens(prevTimeTaken => prevTimeTaken + 1);
        if (isQuit == true) {
          clearInterval(interval);
          setTimeRemaining(0);
          handleAnswerSubmit(Questionlist);
        }
      }, 1000);
    } else if (timeRemaining === 0) {
      clearInterval(interval);
      handleAnswerSubmit(Questionlist);
    }
    return () => clearInterval(interval);
  }, [timeRemaining, timeDurationValueDatas]);

  // const formatTime = timeRemaining => {
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const remainingSeconds = timeRemaining % 60;

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return (
    <SafeAreaView style={{flex: 1}}>
      {ContentLoading == 'loading' ? (
        <LoadingScreen flag={ContentLoading == 'loading'} />
      ) : (
        <ImageBackground
          style={{
            width: device_width,
            height: device_height,
            flex: 1,
            alignSelf: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}
          resizeMode="cover"
          source={require('../../../assets/0.png')}>
          <View
            style={{
              // position: 'absolute',
              // top: 0,
              // right: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              // borderWidth:1,
              // borderColor:'#FFF'
            }}>
            <View style={{height: 40, marginHorizontal: 20}}>
              {timeDurationValueDatas ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      borderWidth: 1,
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
                      {formattedHours}
                    </Text>
                  </View>
                  <Text
                    style={{fontWeight: '900', color: '#FFB901', fontSize: 19}}>
                    :
                  </Text>
                  <View
                    style={{
                      borderWidth: 1,
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
                      {formattedMinutes}
                    </Text>
                  </View>
                  <Text
                    style={{fontWeight: '900', color: '#FFB901', fontSize: 19}}>
                    :
                  </Text>
                  <View
                    style={{
                      borderWidth: 1,
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
                      {formattedSeconds}
                    </Text>
                  </View>
                </View>
              ) : (
                <></>
              )}
            </View>

            <TouchableOpacity
              onPress={() => {
                setQuitModalStatus(true);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 20,
              }}>
              <MaterialIcons name="logout" color={'#fff'} size={32} />
              <Text
                style={{
                  color: '#fff',
                  marginLeft: 5,
                  fontWeight: '700',
                }}>
                {trans('Quit Test')}
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View
              style={{
                marginHorizontal: 2,
                paddingVertical: 20,
                paddingHorizontal: 10,
                top: 30,
                left: 0,
                width: device_width,
                height:device_height * 0.9,
                  // timeDurationValue == 0 || timeDurationValue == ''
                  //   ? device_height * 0.9
                  //   : timerHeight,
                backgroundColor: 'rgba(255,255,255,0.1)',
                position: 'absolute',
              }}> */}
          <View
            style={{
              height: device_height * 0.94,
              alignSelf: 'center',
            }}>
            <Text
              style={[
                styles.question,
                {
                  textAlign: 'left',
                  color: '#fff',
                  alignSelf: 'flex-start',
                  marginTop: 10,
                },
              ]}>
              {`${trans('Qs.')} ( ${currentIndex + 1}/${
                Questionlist?.length
              } )`}
            </Text>
            <ScrollView
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={true}
              indicatorStyle={'white'}
              ref={scrollRef}
              persistentScrollbar={true}>
              <View
                style={{
                  width: '100%',
                  height:
                    Questionlist[currentIndex]?.questiontype == 'image'
                      ? device_height * 0.46
                      : device_height * 0.4,
                  borderBottomWidth:
                    Questionlist[currentIndex]?.questiontype == 'image' ? 8 : 0,
                  borderBottomColor:
                    Questionlist[currentIndex]?.questiontype == 'image'
                      ? '#B2BEB5'
                      : '',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {Questionlist[currentIndex]?.questiontype == 'image' ? (
                    Questionlist[currentIndex]?.question != '' ? (
                      <ScrollView
                        horizontal={true}
                        showsVerticalScrollIndicator={true}
                        showsHorizontalScrollIndicator={true}
                        persistentScrollbar={true}
                        ref={scrollRef}>
                        <View
                          style={{
                            paddingVertical: 10,
                            // borderWidth: 5,
                            borderRightWidth: 8,
                            borderRightColor: '#B2BEB5',
                            borderColor: '#ccc',
                            borderRadius: 5,
                            minHeight: device_height * 0.7,
                            width: device_width,
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            backgroundColor: '#fff',
                          }}>
                          <WebView
                            style={{
                              flex: 1,
                              minHeight: device_height * 0.7,
                              width: device_width * 0.9,
                            }}
                            originWhitelist={['*']}
                            nestedScrollEnabled={true}
                            source={{
                              html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><p style={object-fit: contain}>${JSON.parse(
                                Questionlist[currentIndex]?.question,
                              )}</p></body></html>`,
                            }}
                          />
                        </View>
                      </ScrollView>
                    ) : (
                      <></>
                    )
                  ) : (
                    <View
                      style={{
                        zIndex: 1,
                      }}>
                      <Text
                        style={[
                          styles.question,
                          {textAlign: 'center', color: '#fff'},
                        ]}>
                        {Questionlist[currentIndex]?.question}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              {Questionlist[currentIndex]?.questiontype == 'image' && (
                <View
                  style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
                  <MaterialIcons
                    name="report"
                    size={20}
                    // backgroundColor={Colors.secondary}
                    color={'#fff'}
                    // onPress={() => navigation.goBack()}
                  />
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 12,
                      // textDecorationLine: 'underline',
                    }}>
                    {trans('Scroll to see the question')}
                  </Text>
                </View>
              )}
              <View
                style={{
                  width: '100%',
                  height: device_height * 0.45,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    marginVertical: 10,
                    paddingBottom: 5,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                  }}>
                  {Questionlist[currentIndex]?.option?.map((item, indx) => {
                    const {label = '', value = '', contenttype = ''} = item;
                    const {selectedAns = ''} = Questionlist[currentIndex];
                    const selectedItem = label == selectedAns;
                    return (
                      <View
                        style={{
                          width: device_width * 0.35,
                          marginHorizontal: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        key={indx}>
                        {Questionlist[currentIndex]?.questiontype == 'image' ? (
                          <Animated.View
                            key={indx}
                            style={{
                              transform: selectedItem
                                ? [{scale: animatedScale}]
                                : [],
                              width: device_width * 0.28,
                              height: device_width * 0.28,
                              backgroundColor:
                                selectedItem && rightAnswer == true
                                  ? 'limegreen'
                                  : selectedItem && wrongAnswer == true
                                  ? 'red'
                                  : '#fff',
                              marginVertical: 7,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderColor: '#ccc',
                              elevation: 5,
                              borderRadius: 100,
                              borderWidth: 5,
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                handleselectAnswer(label, currentIndex);
                              }}
                              style={{
                                width: '100%',
                                height: '100%',
                                borderColor: '#fff',
                                borderRadius: 100,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor:
                                  selectedItem && rightAnswer == true
                                    ? 'limegreen'
                                    : selectedItem && wrongAnswer == true
                                    ? 'crimson'
                                    : '#fff',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  padding: 10,
                                  borderRadius: 10,
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: value.length > 20 ? 12 : 15,
                                    fontWeight: '700',
                                    color:
                                      selectedItem && rightAnswer == true
                                        ? '#fff'
                                        : selectedItem && wrongAnswer == true
                                        ? '#fff'
                                        : '#333',
                                  }}>
                                  {`(${label}) ${value}`}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </Animated.View>
                        ) : (
                          <Animated.View
                            key={indx}
                            style={{
                              transform: selectedItem
                                ? [{scale: animatedScale}]
                                : [],
                              width: device_width * 0.3,
                              height: device_width * 0.3,
                              backgroundColor:
                                selectedItem && rightAnswer == true
                                  ? 'limegreen'
                                  : selectedItem && wrongAnswer == true
                                  ? 'red'
                                  : '#fff',
                              marginVertical: 7,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderColor: '#ccc',
                              elevation: 5,
                              borderRadius: 100,
                              borderWidth: 5,
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                handleselectAnswer(label, currentIndex);
                              }}
                              style={{
                                width: '100%',
                                height: '100%',
                                borderColor: '#fff',
                                borderRadius: 100,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor:
                                  selectedItem && rightAnswer == true
                                    ? 'limegreen'
                                    : selectedItem && wrongAnswer == true
                                    ? 'crimson'
                                    : '#fff',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  padding: 10,
                                  borderRadius: 10,
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: value.length > 20 ? 12 : 15,
                                    fontWeight: '700',
                                    marginLeft: 15,
                                    color:
                                      selectedItem && rightAnswer == true
                                        ? '#fff'
                                        : selectedItem && wrongAnswer == true
                                        ? '#fff'
                                        : '#333',
                                  }}>
                                  {`(${label}) ${value}`}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </Animated.View>
                        )}
                      </View>
                    );
                  })}
                </View>

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    alignSelf: 'center',
                    paddingVertical: 8,
                    paddingHorizontal: 30,
                    borderRadius: 8,
                  }}
                  onPress={() => {
                    handleClearAndSkipQuestion(currentIndex);
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#fff',
                      textDecorationLine: 'underline',
                    }}>
                    {trans(`I don't know`)}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
          {/* </View> */}
        </ImageBackground>
      )}
      {modalStatus && (
        <CommonModalUser
          ModalStatus={modalStatus}
          isIconShow={false}
          closeModalFunc={() => setModalStatus(false)}
          label1={`${trans('Are you sure, you want to submit ?')}`}
          yesbtnName={trans('YES')}
          loading={loading}
          yesbtnFunction={() => handleAnswerSubmit(Questionlist)}
          nobtnName={trans('NO')}
          nobtnFunction={() => setModalStatus(false)}
        />
      )}
      {quitModalStatus && (
        <CommonModalUser
          ModalStatus={quitModalStatus}
          isIconShow={false}
          closeModalFunc={() => {
            setQuitModalStatus(false);
          }}
          label1={`${trans('Are you sure, you want to quit ?')}`}
          label2={`${trans(
            'You have only attempted',
          )} ${no_of_Attempts} ${trans('questions out of')} ${
            Questionlist.length
          } ${trans('questions ')}`}
          yesbtnName={trans('YES')}
          loading={loading}
          yesbtnFunction={() => handleAnswerSubmit(Questionlist)}
          nobtnName={trans('NO')}
          nobtnFunction={() => {
            setQuitModalStatus(false);
          }}
        />
      )}
      {skipModalStatus && (
        <CommonModalUser
          ModalStatus={skipModalStatus}
          isIconShow={false}
          closeModalFunc={() => setSkipModalStatus(false)}
          label1={trans('Are you sure')}
          label2={trans('you want to skip this question ?')}
          yesbtnName={trans('YES')}
          yesbtnFunction={() => handleSkipQuestion()}
          nobtnName={trans('NO')}
          nobtnFunction={() => setSkipModalStatus(false)}
        />
      )}
      {clearSkipModalStatus && (
        <CommonModalUser
          ModalStatus={clearSkipModalStatus}
          isIconShow={false}
          closeModalFunc={() => setClearSkipModalStatus(false)}
          label1={trans('You want to skip this question ?')}
          label2={
            currentIndex == Questionlist.length - 1
              ? trans('All your response will be submitted')
              : trans('your response will be cleared')
          }
          yesbtnName={trans('YES')}
          yesbtnFunction={() => handleClearAndSkipQuestion(currentIndex)}
          nobtnName={trans('NO')}
          nobtnFunction={() => setClearSkipModalStatus(false)}
        />
      )}
    </SafeAreaView>
  );
};

export default LiveQuiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bar: {
    height: 20,
    backgroundColor: '#333',
    borderRadius: 10,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
  headerCointain: {
    // width: '100%',
    // backgroundColor: selectedItem ? Colors.primary : '#F0F0F0',
    // // borderWidth: 1,
    // // borderWidth:1,
    // // borderColor:'#000',
    // marginTop: 25,
    // borderColor: '#FFF',
    // elevation: 5,
    // borderRadius: 10,
    // // alignItems: 'center',
    // padding: 5,
  },

  headerInner: {
    width: '100%',
    backgroundColor: '#F0F0F0',
    borderColor: '#fff',
    borderRadius: 15,
    marginVertical: 5,
  },
  headerinner1: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  innerText: {
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 15,
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
  },
  signIn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textSign: {
    fontSize: 15,
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
    borderRadius: 9,
    elevation: 20,
    alignSelf: 'center',
  },
  cardstyle1: {
    width: '95%',
    height: '15%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    padding: 15,
  },
  Innercardstyle: {
    width: '24%',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#fff',
    borderRadius: 9,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    fontSize: 17,
    fontWeight: '500',
    color: Colors.primary,
  },
});
