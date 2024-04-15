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
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import Colors from '../../../assets/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AntDesign from 'react-native-vector-icons/AntDesign';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
// import CountdownTimer from './CountdownTimer';
// import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import * as Progress from 'react-native-progress';

import { device_height, device_width } from '../style';
import {
  IsTabScreen,
  markCalculation,
  // remainingTimerdata,
} from '../../../constants/Constants';
import WebView from 'react-native-webview';
// import CommonTimer from '../AppScreens/CommonScreens/CommonTimer';
// import {black} from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
import CommonModalUser from '../CommonScreens/CommonModalUser';
import { RootState } from '../../redux/store/Store';
import { selectStudentInfo } from '../../redux/reducers/StudentInfoReducer';
import { selectExamName } from '../../redux/reducers/ExamTestNameReducer';
import { getPreviousYearQuestionAPI, selectPreviousYear } from '../../redux/reducers/GetPrevYearQuesReducer';
import { SubjectwisePreviousYearanswerReattemptSubmitApi, previousYearanswerReattemptSubmitApi, previousYearanswerSubmitApi, subjectwisePreviousYearanswerSubmitApi } from '../../redux/actions/PreviousYearAPI';
import { useNavigation } from '@react-navigation/native';

const PrevMockTest = ({ route }) => {
  const navigation = useNavigation();

  const dispatch = useDispatch<any>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { t: trans, i18n } = useTranslation();
  const scrollRef = useRef(); // Create scrollRef constant

  const {
    screenName = '',
    subjectName = '',
    subjectId = '',
    chapterName = '',
    examSet = '',
    quiz = [],
    contentid = '',
    isReattempt = '',
    studentdata = [],
    SubjectList = [],
    subjectWise = '',
    previousyearquestionid = '',
    scholarship = '',
    year: ExamYear = '',
    scholarshipid = '',
    timeDuration = '',
  } = route.params;
  // console.log(timeDuration,"timeDuration...................")
  // console.log(
  //   route.params,
  //   'route.params.......@@@@@@@@@@@@@@@@@@@@@@@@@@............',
  //   isReattempt,
  //   '=======isReattempt',
  //   subjectWise,
  //   '=========subjectWise',
  // );
  // console.log(subjectId,"subjectId.................................PREVMOCK")

  const sortedQuestionList = quiz.slice().sort((a, b) => a.questionno - b.questionno)

  let timeDurationValue =
    timeDuration != null && timeDuration.length != '' ? timeDuration * 60 : '';
  const [timeRemaining, setTimeRemaining] = useState(timeDurationValue);

  useEffect(() => {
    if (timeDurationValue.length != 0) {
      const interval = setInterval(() => {
        if (timeRemaining > 0) {
          setTimeRemaining(time => time - 1);
        } else {
          clearInterval(interval);
          handleAnswerSubmit();
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
    // formatTime(timeRemaining)
  }, [timeRemaining]);

  // const formatTime = timeRemaining => {
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const remainingSeconds = timeRemaining % 60;

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  // }

  const lastExamTimeTaken = timeDurationValue - timeRemaining;
  //   console.log(timeDurationValue,"timeDurationValue..........................",timeRemaining,"timeRemaining.............")
  // console.log(submitTimeData,"submitTimeData................")
  // let timeDurationValue = 35;
  // console.log(quizData[0].subjectname,"quizData.subjectname......................")
  // console.log(
  //   timeDuration,
  //   'timeDuration...................',
  //   timeDurationValue,
  //   '--------------timeDurationValue++++++++++++++',
  // );

  // console.log(timeDurationValue, 'timeDurationValue...................');
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [loading, setLoading] = useState(false);

  const [selectedStep, setSelectedStep] = useState(1);
  const [Questionlist, setQuestionlist] = useState(sortedQuestionList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalStatus, setModalStatus] = useState(false);
  const [quitModalStatus, setQuitModalStatus] = useState(false);
  const [skipModalStatus, setSkipModalStatus] = useState(false);
  const [clearSkipModalStatus, setClearSkipModalStatus] = useState(false);
  const [isProgress, setIsProgress] = React.useState(true);
  const [progressdata, setProgressdata] = useState(0);

  // const {childInfo = {}} = useSelector(state => state.ChildDetailsReducer);
  // // console.log(Questionlist, '================Questionlist');
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
  const childInfo = useAppSelector(selectStudentInfo) as ChildInfo;
  const {
    _id: id = '',
    childid = '',
    name: childName = '',
    stage = '',
    image: c_image = '',
    age: C_age = '',
    boardid = '',
    boardname: board = '',
    stageid = '',
  } = childInfo;

  // console.log(childInfo, 'childInfo[0]...................',board,"====board");
  // const {userInfo = {}} = useSelector(state => state.UserInfoReducer);

  // const {
  //   _id = '',
  //   parentid = '',
  //   name = '',
  //   email = '',
  //   phone = '',
  //   cityname = '',
  //   image = '',
  //   age = '',
  //   address = '',
  // } = userInfo;
  // const {ExamDetails = {}} = useSelector(state => state.ExamTestNameReducer);
  // const {
  //   ExamName = '',
  //   // scholarshipid:ScholarshipId= '',
  //   // boardid:BoardId= '',
  //   // stage:standard= '',
  //   // stageid:standardid= '',
  //   // childid:ChildId= '',
  //   // subjectid:SubjectId= '',
  //   // subjectName: subjtName= '',
  // } = ExamDetails;
  // // console.log(ExamName, 'ExamDetails...................');\
  const ExamName = useAppSelector(selectExamName);
  console.log(ExamName, 'ExamName.............');
  const handleselectAnswer = (answerid, index) => {
    let questions = [...Questionlist];
    // questions[index].selectedAns = answerid;
    questions[index] = {
      ...questions[index], selectedAns: answerid
    }
    // console.log(
    //   questions[index].selectedAns,
    //   ' questions[index].selectedAns======',
    //   answerid,
    //   questions,
    // );
    setQuestionlist(questions);
  };
  // const handleQuitTest = () => {
  //   setQuitModalStatus(false);
  //   setCurrentIndex(0);
  //   navigation.goBack();
  // };

  const handleClearAndSkipQuestion = async (answerid, index) => {
    let questions = [...Questionlist];
    questions[index].selectedAns = answerid = '';
    setQuestionlist(questions);
    if (currentIndex == Questionlist.length - 1) {
      handleAnswerSubmit();
    } else {
      await handleNext();
    }
    setClearSkipModalStatus(false);
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

  const handleCallback = () => {
    setCurrentIndex(0);
    navigation.navigate('ScoreBoard', {
      screenName: screenName,
      contentid: contentid,
      isReattempt: isReattempt,
      subjectWise: subjectWise,
      topicName: chapterName,
      ExamQuestionsets: quiz,
      subjectName: subjectName,
      chapterName: chapterName,
      examSet: examSet,
      year: ExamYear,
      previousyearquestionid: previousyearquestionid,
      timeDuration: timeDuration,
      SubjectList: SubjectList,
      quiz: Questionlist,
      studentdata: studentdata,
      scholarshipid: scholarshipid,
      scholarship: scholarship,
      boardid: boardid,
      subjectId: subjectId,
    });
    const prevQues = { stageid, boardid, scholarshipId: scholarshipid, childid }
    dispatch(
      getPreviousYearQuestionAPI(prevQues),
    );
  };
  // const {PrevYearQuestion = []} = useSelector(
  //   state => state.GetPrevYearQuesReducer,
  // );
  const PrevYearQuestion = useAppSelector(selectPreviousYear);

  // console.log(PrevYearQuestion, '================PrevYearQuestion-----------');
  const {
    boardname = '',
    BSE = '',
    stage: previousYearStage = '',
    subjectid = '',
    subjectname = '',
    year = '',
    yearid = '',
  } = PrevYearQuestion;
  // console.log(PrevYearQuestion, '======================PrevYearQuestion##############');

  const handleAnswerSubmit = async () => {
    // console.log(ExamName, 'ExamName========');
    let ExamnameVal = ExamName;
    if (ExamName == '') {
      await AsyncStorage.getItem('ExamName').then(data => {
        ExamnameVal = data;
      });
    }
    let quizData = [...quiz];
    // const submitData = quizData.map(row => {
    //   return {...row, selectedAns: row.answer};
    // });
    if (ExamnameVal == 'PreviousYear') {
      const {
        no_of_Attempts = 0,
        correctanswer = 0,
        Skipped = 0,
        Wronganswer = 0,
        totalmark = 0,
        percentage = 0,
        // } = markCalculation(submitData);
      } = markCalculation(Questionlist);

      // const quizData = quiz.map(rec => rec);
      // console.log(studentdata, '==================studentdata---------------');
      if (isReattempt) {
        if (subjectWise == false) {
          let bodyReattemptAnswerData = {
            id: studentdata[0]._id,
            lastexamtotalmark: Questionlist.length,
            lastexamtotalsecurmark: correctanswer,
            lastexamtotalwrongmark: Wronganswer,
            lastexamtotalskipmark: Skipped,
            lastexamtimetaken: lastExamTimeTaken,
            lastexampercentage: percentage,
            answerdetails: [
              {
                totalmark: Questionlist.length,
                totalsecurmark: correctanswer,
                totalwrongmark: Wronganswer,
                totalskipmark: Skipped,
                quiz: Questionlist,
                // quiz: submitData,
              },
            ],
            // securmark,wrongmark,skipmark, quiz ,subjectIamge,topicImage,contentImage,isPremium,
          };
          // console.log(
          //   bodyReattemptAnswerData,
          //   'bodyReattemptAnswerData========',
          // );

          // dispatch(
          previousYearanswerReattemptSubmitApi(
            bodyReattemptAnswerData,
            handleCallback,
            // setLoading,
            // ),
          );
        } else {
          let SubjectwiseReattemptAnswerBodyData = {
            childid: childid,
            subjectwisepreviousyearquestionid: previousyearquestionid,
            stage: stage,
            stageid: stageid,
            year: ExamYear,
            yearid: ExamYear,
            name: childName,
            subjectname: subjectName,
            subjectid: subjectId,
            scholarship: scholarship,
            scholarshipid: scholarshipid,
            boardid: boardid,
            boardname: board,
            ispremium: true,
            timeDuration: timeDuration,
            islock: false,
            quiz: quiz,
            id: studentdata[0]._id,
            lastexamtotalmark: Questionlist.length,
            lastexamtotalsecurmark: correctanswer,
            lastexamtotalwrongmark: Wronganswer,
            lastexamtotalskipmark: Skipped,
            lastexampercentage: percentage,
            answerdetails: [
              {
                totalmark: Questionlist.length,
                totalsecurmark: correctanswer,
                totalwrongmark: Wronganswer,
                totalskipmark: Skipped,
                quiz: Questionlist,
                // quiz: submitData,
              },
            ],
          };
          // console.log(
          //   SubjectwiseReattemptAnswerBodyData,
          //   'SubjectwiseReattemptAnswerBodyData========',
          // );
          // dispatch(
          SubjectwisePreviousYearanswerReattemptSubmitApi(
            SubjectwiseReattemptAnswerBodyData,
            handleCallback,
            //   setLoading,
            // ),
          );
        }
      } else {
        if (subjectWise == false) {
          const bodyAnswerData = {
            childid: childid,
            parentid: '',
            name: childName,
            age: C_age,
            stage: stage,
            stageid: stageid,
            previousyearquestionid: previousyearquestionid,
            subject: quizData[0].subjectname,
            previousyearquestionname: scholarship,
            subjectid: quizData[0].subjectid,
            lastexamtotalmark: Questionlist.length,
            lastexamtotalsecurmark: correctanswer,
            lastexamtotalwrongmark: Wronganswer,
            lastexamtotalskipmark: Skipped,
            lastexamtimetaken: lastExamTimeTaken,
            lastexampercentage: percentage,
            answerdetails: [
              {
                totalmark: Questionlist.length,
                totalsecurmark: correctanswer,
                totalwrongmark: Wronganswer,
                totalskipmark: Skipped,
                quiz: Questionlist,
                // quiz: submitData,
              },
            ],
          };

          console.log(bodyAnswerData, '================bodyAnswerData');

          // dispatch(
          previousYearanswerSubmitApi(
            bodyAnswerData,
            handleCallback,
            //   setLoading,
            // ),
          );
        } else {
          const subjectwiseBodyAnswerData = {
            childid: childid,
            subjectwisepreviousyearquestionid: previousyearquestionid,
            stage: stage,
            stageid: stageid,
            year: ExamYear,
            yearid: ExamYear,
            name: childName,
            subjectname: subjectName,
            subjectid: subjectId,
            scholarship: scholarship,
            scholarshipid: scholarshipid,
            boardid: boardid,
            boardname: board,
            ispremium: true,
            timeDuration: timeDuration,
            islock: false,
            quiz: quiz,
            lastexamtotalmark: Questionlist.length,
            lastexamtotalsecurmark: correctanswer,
            lastexamtotalwrongmark: Wronganswer,
            lastexamtotalskipmark: Skipped,
            lastexampercentage: percentage,
            answerdetails: [
              {
                totalmark: Questionlist.length,
                totalsecurmark: correctanswer,
                totalwrongmark: Wronganswer,
                totalskipmark: Skipped,
                quiz: Questionlist,
                // quiz: submitData,
              },
            ],
          };

          // console.log(
          //   subjectwiseBodyAnswerData,
          //   '================subjectwiseBodyAnswerData',
          // );
          // dispatch(
          subjectwisePreviousYearanswerSubmitApi(
            subjectwiseBodyAnswerData,
            handleCallback,
            //   setLoading,
            // ),
          );
        }
      }
    }
  };
  const {
    no_of_Attempts = 0,
    correctanswer = 0,
    Skipped = 0,
    Wronganswer = 0,
    totalmark = 0,
    percentage = 0,
  } = markCalculation(Questionlist);
  //setQuitModalStatus(true);=====================

  function handleBackButtonClick() {
    // dispatch(getTopicBySubClassAPI(undefined, stage, subjectName, childid));
    // navigation.navigate('ScoreBoard', {
    //   subjectName: subjectName,
    //   chapterName: chapterName,
    //   examSet: examSet,
    //   quiz: Questionlist,
    // });
    setQuitModalStatus(true);
    return true;
  }

  useEffect(() => {
    // setModalStatus(false);
    navigation.addListener('focus', () => {

      // console.log('inside useEffect==========');
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      setModalStatus(false);
      // dispatch(getUserInfoAPI(undefined, undefined, setLoading));
      // if (id != '')
      //   dispatch(
      //     getChildDetailsAPI(
      //       undefined,
      //       undefined,
      //       undefined,
      //       setLoading,
      //       () => {},
      //       undefined,
      //     ),
      //   );

      const prevQues = { stageid, boardid, scholarshipId: scholarshipid, childid }
      dispatch(
        getPreviousYearQuestionAPI(prevQues),
      );
      if (progressdata == 0) handlePress();
    });
    return () => {
      // console.log('inside useEffect return==========');
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  useEffect(() => {
    if (isReattempt == false) {
      if (quiz.length > 0) {
        // let list = [...quiz];
        // console.log('quizData===========', quiz[0]);

        // const data = list.map((rec, index) => {
        //   let optionList = [];
        //   if (rec.option.length > 0) {
        //     console.log('valuedata===========', rec.option);
        //     rec.option.map((item, idx) => {
        //       let keydata = Object.keys(item);
        //       let Valuedata = Object.values(item);
        //       optionList.push({label: keydata[0], value: Valuedata[0]});
        //     });
        //   }
        //   // console.log(optionList, 'optionList===============');
        //   return {...rec, option: optionList};
        // });
        // console.log(data, 'data===========');
        setQuestionlist(quiz);
      }
    } else {
      if (quiz.length > 0) setQuestionlist(quiz);
    }
  }, [quiz]);

  const handleReattemptSubmit = () => { };
  const handlePress = () => {
    // console.log(
    //   progressdata,
    //   'progressData2--------------',
    //   Questionlist.length,
    //   '======Questionlist.length',
    // );
    let newprogressdata = parseFloat(progressdata) + 1 / Questionlist.length;
    // newprogressdata = parseFloat(newprogressdata).toFixed(1);
    // console.log(
    //   newprogressdata,
    //   '==================parseFloat(newprogressdata).toFixed(1)',
    // );
    // console.log(typeof newprogressdata, 'progressData--------------');
    newprogressdata = parseFloat(newprogressdata);
    // console.log(typeof newprogressdata, 'progressData--------------');
    setProgressdata(newprogressdata);
  };
  const handlePreviousPress = () => {
    // console.log(progressdata, 'progressData2--------------');
    let newprogressdata = parseFloat(progressdata) - 1 / Questionlist.length;
    // newprogressdata = parseFloat(newprogressdata).toFixed(1);
    // console.log(newprogressdata);
    // console.log(typeof newprogressdata, 'progressData--------------');
    newprogressdata = parseFloat(newprogressdata);
    // console.log(typeof newprogressdata, 'progressData--------------');
    setProgressdata(newprogressdata);
  };
  // console.log(
  //   // Questionlist[currentIndex].selectedAns,
  //   // '=============',
  //   Questionlist[currentIndex],
  //   'Questionlist[currentIndex]',
  // );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={'#263d2d'} barStyle="light-content" />
      <ImageBackground
        style={{
          width: device_width,
          height: device_height,
          flex: 1,
          alignSelf: 'center',
        }}
        resizeMode="cover"
        source={require('../../../assets/0.png')}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#263d2d',
            justifyContent: 'space-between',
            paddingBottom: 10,
            // borderWidth:1
          }}>
          {/* <Text
          style={{
            fontSize: 20,
            color: Colors.primary,
            marginLeft: 10,
            textAlign: 'center',
            fontWeight: '700',
          }}>
          {trans('Mock Test')} {`${ExamYear}`}
        </Text> */}
          <View style={{ height: 40, marginHorizontal: 20 }}>
            {/* {timeDurationValue ? (
            <CommonTimer
              duration={timeDurationValue}
              handleAnswerSubmit={handleAnswerSubmit}
            />
          ) : (
            <></>
          )} */}
            {timeDurationValue ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#FFB901',
                    padding: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 5,
                  }}>
                  <Text style={{ fontWeight: '900', color: '#FFB901', fontSize: 16 }}>
                    {formattedHours}
                  </Text>
                </View>
                <Text style={{ fontWeight: '900', color: '#FFB901', fontSize: 16 }}>
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
                  <Text style={{ fontWeight: '900', color: '#FFB901', fontSize: 16 }}>
                    {formattedMinutes}
                  </Text>
                </View>
                <Text style={{ fontWeight: '900', color: '#FFB901', fontSize: 16 }}>
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
                  <Text style={{ fontWeight: '900', color: '#FFB901', fontSize: 16 }}>
                    {formattedSeconds}
                  </Text>
                </View>
              </View>
            ) : (
              <></>
            )}
          </View>
          <View style={{ position: 'absolute', top: 0, right: 10 }}>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('Kids_Profile', {childId: id});
                setQuitModalStatus(true);
              }}
              style={{
                // backgroundColor: Colors.secondary,
                // backgroundColor: 'rgba(0,255,0, 0.1)',
                // position: 'absolute',
                flexDirection: 'row',
                // top: 0,
                // right: 0,
                // borderWidth:1,
                alignItems: 'center',
              }}>
              <MaterialIcons name="logout" color={'#fff'} size={32} />
              <Text
                style={{ color: '#fff', marginLeft: 5, fontWeight: '700' }}>
                {trans('Quit Test')}
              </Text>
              {/* <FontAwesome5 style={{color: '#fff'}} name="power-off" size={18} /> */}
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 25,
            flex: 0.9,
            borderRadius: 10,
            // borderWidth: 1,
            borderColor: '#000',
            // elevation: 10,
            // borderWidth:1,
            // backgroundColor: '#fff',
            backgroundColor: 'rgba(0,255,0, 0.1)',
            marginHorizontal: 10,
            marginVertical: 10,
            paddingTop: 10,
          }}>
          <Text
            style={{
              fontSize: 17,
              color: "#fff",
              marginLeft: 10,
              textAlign: 'center',
              fontWeight: '700',
            }}>
            {subjectName} {trans(`Previous Year Question Set`)}
          </Text>
          <Text
            style={{
              fontSize: 17,
              color: '#fff',
              marginLeft: 10,
              textAlign: 'center',
              fontWeight: '700',
            }}>
            {`${ExamYear}`}
          </Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 20,
              // borderWidth:1,
            }}>
            <Progress.Bar
              color={'#EBCB00'}
              progress={progressdata}
              width={300}
              height={7}
              style={{ marginTop: -5 }}
            />
            {/* {timeDurationValue != '' ? (
            <CountdownTimer
              duration={timeDurationValue}
              handleAnswerSubmit={handleAnswerSubmit}
            />
          ) : (
            <></>
          )} */}
            {/* <View style={{borderWidth:1, backgroundColor:'grey'}}> */}
            {/* </View> */}
          </View>
          <Text
            style={[
              styles.question,
              { textAlign: 'left', color: '#fff', alignSelf: 'flex-start' },
            ]}>
            {`${trans('Qs.')} ( ${currentIndex + 1}/${Questionlist.length} )`}
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={true}
            indicatorStyle={'black'}
            style={{
              flex: 1,
              // minHeight: device_height * 0.3,
              // minWidth: device_width * 0.8,
            }}
            persistentScrollbar={true}
            ref={scrollRef}>
            <View
              style={{
                width: '100%',
                borderWidth: 0,
                paddingHorizontal: 10,
                paddingBottom: 20,
              }}>
              <View
                style={{
                  // borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {/* <TouchableOpacity
                onPress={() => {
                  scrollRef.current.scrollToEnd({
                    // x: 0, // Required
                    // y: 0, // Required
                    animated: true,
                  });
                }}>
                <AntDesign
                  name="downcircle"
                  size={35}
                  color={Colors.primary}></AntDesign>
              </TouchableOpacity> */}
                {Questionlist[currentIndex].questiontype == 'image' ? (
                  Questionlist[currentIndex].question != '' ? (
                    <View
                      style={{
                        padding: 10,
                        paddingVertical: 10,
                        color: '#333',
                        // borderWidth: 5,
                        borderBottomWidth: 4,
                        borderColor: '#ccc',
                        borderRadius: 5,
                        // fontSize: '38',
                        minHeight: device_height * 0.43,
                        width: device_width * 0.9,
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        // backgroundColor:Colors.secondary,
                        backgroundColor: '#fff',
                      }}>
                      <WebView
                        style={{
                          flex: 1,
                          // marginLeft: -30,
                          minHeight: device_height * 0.3,
                          width: device_width * 0.78,
                        }}
                        originWhitelist={['*']}
                        nestedScrollEnabled={true}
                        // showsVerticalScrollIndicator={setTimeout(() =>1000)?true:true}
                        source={{
                          html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><p style={object-fit: contain}>${JSON.parse(
                            Questionlist[currentIndex].question,
                          )}</p></body></html>`,
                        }}
                      />
                    </View>
                  ) : (
                    <></>
                  )
                ) : (
                  <Text
                    style={[
                      styles.question,
                      { textAlign: 'center', color: '#fff', marginTop: 20 },
                    ]}>
                    {Questionlist[currentIndex].question}
                  </Text>
                )}
              </View>
              {/* <View>
              <View
                style={{
                  // borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    scrollRef.current.scrollTo({
                      x: 0, // Required
                      y: 0, // Required
                      animated: true,
                    });
                  }}>
                  <AntDesign
                    name="upcircle"
                    size={35}
                    color={Colors.primary}></AntDesign>
                </TouchableOpacity>
              </View>
            </View> */}
              {/* {Questionlist.map((item, index) => {
            const {
              id = '',
              question = '',
              options = [],
              correctanswer = '',
              selectedAns = '',
            } = item;
            return ( */}
              {/* <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                  // marginVertical: 10,
                }}
             > */}
              {/* <Text
                style={[styles.question, {textAlign: 'center', color: '#000'}]}>
                {Questionlist[currentIndex].question}
              </Text> */}
            </View>
          </ScrollView>
          <View
            style={{
              marginVertical: 10,
              paddingBottom: 5,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            {Questionlist[currentIndex]?.option?.map((item, indx) => {
              const { label = '', value = '', contenttype = '' } = item;
              const { selectedAns = '' } = Questionlist[currentIndex];
              const selectedItem = label == selectedAns;
              { /* 
                  console.log(item, 'item======', label);
                */ }
              return (
                <View
                  key={indx}
                  style={{
                    width:
                    Questionlist[currentIndex]?.questiontype == 'image' && 
                    IsTabScreen 
                    ? '45%'
                    : Questionlist[currentIndex]?.questiontype == 'image' && 
                    !IsTabScreen
                      ? '49%'
                      : '100%',
                    backgroundColor: selectedItem ? '#f1a722' : '#F0F0F0',
                    // borderWidth:1,
                    marginVertical: 7,
                    borderColor: '#ccc',
                    elevation: 5,
                    borderRadius: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      //
                      handleselectAnswer(label, currentIndex);
                    }}
                    style={{
                      width: '100%',
                      // borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 15,
                      marginVertical: 5,
                      backgroundColor: selectedItem ? '#f1a722' : '#F0F0F0',
                    }}>
                    <View style={{
                      flexDirection: 'row',
                      padding: 10,
                      // borderWidth:1,
                      borderRadius: 10,
                      alignItems: 'center',
                    }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '700',
                          marginLeft: 15,
                          color: selectedItem ? 'green' : '#333'
                        }}>
                        {`(${label}) ${value}`}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flex: 0.1,
            alignItems: 'center',
            // margin: 20,
            // borderWidth:1,
            // width:"100%",
            // height:device_height*0.2,
            justifyContent: 'space-between',
            backgroundColor: 'rgba(0,255,0, 0.1)',
            marginLeft: 7,
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity
            style={{ padding: 15 }}
            disabled={currentIndex == 0}
            onPress={() => {
              handlePrevious();
              scrollRef.current.scrollTo({
                x: 0, // Required
                y: 0, // Required
                animated: true,
              });
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <FontAwesome
                style={{ color: currentIndex == 0 ? '#ccc' : '#FFB901' }}
                name="chevron-left"
                size={18}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '500',
                  color: currentIndex == 0 ? '#ccc' : '#FFB901',
                  marginLeft: 10,
                }}>
                {trans('Previous')}
              </Text>
            </View>
          </TouchableOpacity>
          {Questionlist[currentIndex].selectedAns != '' && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                // borderWidth: 1,
                backgroundColor: '#79851f',
                borderRadius: 8,
              }}>
              <TouchableOpacity
                // disabled={currentIndex == Questionlist.length - 1}
                disabled={false}
                style={{
                  flexDirection: 'row',
                  alignItems: 'baseline',
                  // borderWidth: 1,
                  paddingVertical: 8,
                  paddingHorizontal: 30,
                  borderRadius: 8,
                }}
                onPress={() => {
                  const selectedAnswerValue =
                    Questionlist[currentIndex].selectedAns;
                  //   console.warn(
                  //     selectedAnswerValue,
                  //   'inside data called',
                  // );
                  if (selectedAnswerValue !== '') {
                    setClearSkipModalStatus(true);
                  }
                  scrollRef.current.scrollTo({
                    x: 0, // Required
                    y: 0, // Required
                    animated: true,
                  });
                  // else handleNext();
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#FFB901',
                    // currentIndex == Questionlist.length - 1 ? '#bbb' : '#333',
                    // marginRight: 10,
                  }}>
                  {trans('Skip')}
                </Text>
                {/* <FontAwesome
                style={{color: '#fff'}}
                name="chevron-right"
                size={12}
              /> */}
              </TouchableOpacity>
            </View>
          )}
          {currentIndex == Questionlist.length - 1 ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                backgroundColor: 'green',
                borderRadius: 10,
                alignItems: 'center',
                // marginLeft:10
                borderWidth: 1,
                borderColor: '#FFF',
                elevation: 10,
              }}>
              <TouchableOpacity
                style={styles.signIn}
                // disabled={loading}
                onPress={() => {
                  //   handleActiveStep();

                  setModalStatus(true);
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '900',
                    color: 'white',
                  }}>
                  {trans('Submit')}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <TouchableOpacity
                disabled={currentIndex == Questionlist.length - 1}
                style={{
                  flexDirection: 'row',
                  alignItems: 'baseline',
                  padding: 15,
                }}
                onPress={() => {
                  const selectedAnswerValue =
                    Questionlist[currentIndex].selectedAns;
                  //   console.warn(
                  //     selectedAnswerValue,
                  //   'inside data called',
                  // );
                  if (selectedAnswerValue == '') {
                    setSkipModalStatus(true);
                  } else handleNext();
                  scrollRef.current.scrollTo({
                    x: 0, // Required
                    y: 0, // Required
                    animated: true,
                  });
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                    color:
                      currentIndex == Questionlist.length - 1 ? '#ccc' : '#FFB901',
                    marginRight: 10,
                  }}>
                  {trans('Next')}
                </Text>
                <FontAwesome
                  style={{ color: currentIndex == Questionlist.length - 1 ? '#ccc' : '#FFB901' }}
                  name="chevron-right"
                  size={18}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {modalStatus && (
          <CommonModalUser
            ModalStatus={modalStatus}
            isIconShow={false}
            closeModalFunc={() => setModalStatus(false)}
            label1={`${trans('Are you sure, you want to submit ?')}`}
            // label2={`${trans('you wont be able to re-appear this question')}`}
            yesbtnName={trans('YES')}
            yesbtnFunction={() => handleAnswerSubmit()}
            loading={loading}
            nobtnName={trans('NO')}
            nobtnFunction={() => setModalStatus(false)}
          />
        )}
        {quitModalStatus && (
          <CommonModalUser
            ModalStatus={quitModalStatus}
            isIconShow={false}
            loading={loading}
            closeModalFunc={() => {
              setQuitModalStatus(false);
              // setCurrentIndex(0);
            }}
            label1={`${trans('Are you sure, you want to quit ?')}`}
            // label2={`${'You have only attempted ${no_of_Attempts} questions out of  ${Questionlist.length}'}`}
            label2={`${trans(
              'You have only attempted',
            )} ${no_of_Attempts} ${trans('questions out of')} ${Questionlist.length
              } ${trans('questions ')}`}
            // label2={`${trans('You have only attempted ')${no_of_Attempts} questions out of} ${
            //   Questionlist.length}
            // }questions ')}`}
            yesbtnName={trans('YES')}
            yesbtnFunction={() => handleAnswerSubmit()}
            nobtnName={trans('NO')}
            nobtnFunction={() => {
              setQuitModalStatus(false);
              // setCurrentIndex(0);
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
            yesbtnFunction={() =>
              handleClearAndSkipQuestion(
                Questionlist[currentIndex].selectedAns,
                currentIndex,
              )
            }
            nobtnName={trans('NO')}
            nobtnFunction={() => setClearSkipModalStatus(false)}
          />
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default PrevMockTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    height: 20,
    backgroundColor: '#ccc',
    borderRadius: 10,
    margin: 10,
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
    // borderWidth: 1,
    backgroundColor: '#F0F0F0',
    borderColor: '#fff',
    borderRadius: 15,
    marginVertical: 5,
    // marginHorizontal: 10,
  },
  headerinner1: {
    flexDirection: 'row',
    // paddingLeft: 12,
    padding: 8,
    // borderWidth:1,
    borderRadius: 10,
    // justifyContent: 'center',
    alignItems: 'center',
    // marginVertical: 10,
  },
  innerText: {
    fontSize: 15,
    // color: Colors.primary,
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
    // marginTop: 50,
  },
  signIn: {
    // width: '100',
    // height: 50,
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
    // padding: 10,
    fontSize: 17,
    fontWeight: '500',
    color: Colors.primary,
  },
});
