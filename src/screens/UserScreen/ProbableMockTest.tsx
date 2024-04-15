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
// import CommonModal from '../AppScreens/CommonScreens/CommonModal';
// import CommonModalUser from './CommonModalUser';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {
//   answerReattemptSubmitApi,
//   answerSubmitApi,
//   getChildDetailsAPI,
//   getChildProbableQuestionDetailsAPI,
//   probableanswerReattemptSubmitApi,
//   probableanswerSubmitApi,
//   subjectwiseProbableanswerReattemptSubmitApi,
//   subjectwiseProbableanswerSubmitApi,
// } from '../../redux/actions/Action';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppSelector } from '../../redux/store/reducerHook';
import {
  getChildDetailsAPI, selectStudentInfo
} from '../../redux/reducers/StudentInfoReducer';
import {
  getChildProbableQuestionDetailsAPI, selectMostProbableData
} from '../../redux/reducers/GetMostProbQuesReducer';
import CommonTimer from '../CommonScreens/CommonTimer';
import CommonModalUser from '../CommonScreens/CommonModalUser';
import {
  probableanswerReattemptSubmitApi, probableanswerSubmitApi,
  subjectwiseProbableanswerReattemptSubmitApi, subjectwiseProbableanswerSubmitApi
} from '../../redux/actions/MostProbableAPI';
import { useNavigation } from '@react-navigation/native';
import { selectExamName } from '../../redux/reducers/ExamTestNameReducer';
import { getMostProbableQuestionSetAPI, selectMostProbableQsSetData } from '../../redux/reducers/GetMostProbableQuestionSetReducer';
import { RootState } from '../../redux/store/Store';


const ProbableMockTest = ({ route }) => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

  const { t: trans, i18n } = useTranslation();
  const scrollRef = useRef();
  const {
    screenName = '',
    subjectId = '',
    ExamQuestionsets = '',
    setid = '',
    ProbSubjectId = '',
    ProbSubjectName = '',
    subjectName = '',
    chapterName = '',
    examSet = '',
    quiz = [],
    contentid = '',
    isReattempt = '',
    studentdata = [],
    SubjectList = [],
    subjectWise = '',
    mostprobablequestionid = '',
    scholarship = '',
    scholarshipid = '',
    ispremium = false,
    timeDuration = '',
  } = route.params;
  // 
  console.log(
    // route.params,
    // 'route.params.......@@@@@@@@@@@@@@@@@@@@@@@@@@',
    setid,
    '==============setid@@@@@@@@@@@@@@@222',
    scholarship,
    "scholarship.............."
    // subjectWise,
    // '===========subjectWise',
    // scholarship,
  );

  const sortedQuestionList = quiz.slice().sort((a, b) => a.questionno - b.questionno)

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
  const timeDurationValue = timeDuration.length
    ? parseInt(timeDuration) * 60
    : '';
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
  // const {childInfo = {}} = useSelector(state => state.ChildDetailsReducer);

  const {
    _id: id = '',
    childid = '',
    name: childName = '',
    stage = '',
    boardid = '',
    stageid = '',
    image: c_image = '',
    age: C_age = '',
  } = childInfo;



  // const {ExamDetails = {}} = useSelector(state => state.ExamTestNameReducer);
  // const ExamDetails = {};
  // const {
  //   ExamName = '',
  //   // scholarshipid:ScholarshipId= '',
  //   // boardid:BoardId= '',
  //   // stage:standard= '',
  //   // stageid:standardid= '',
  //   // childid:ChildId= '',
  //   // subjectid:SubjectId= '',
  //   // subjectName: subjtname= '',
  // } = ExamDetails;
  const ExamName = useAppSelector(selectExamName)
  console.log(ExamName, "ExamName.....................")
  const probdata = {
    stageid,
    boardid,
    scholarshipId: scholarshipid,
    childid
  };
  // 
  const handleselectAnswer = (answerid: string, index) => {
    let questions = [...Questionlist];
    questions[index] = {
      ...questions[index], selectedAns: answerid
    }
    setQuestionlist(questions);
  };
  const handleQuitTest = () => {
    setQuitModalStatus(false);
    setCurrentIndex(0);
    navigation.goBack();
  };
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
    // 
    setCurrentIndex(0);
    navigation.navigate('ScoreBoard', {
      screenName: screenName,
      contentid: contentid,
      isReattempt: isReattempt,
      subjectWise: subjectWise,
      topicName: chapterName,
      ExamQuestionsets: quiz,
      ProbSubjectName: ProbSubjectName,
      chapterName: scholarship,
      examSet: examSet,
      setid: setid,
      mostprobablequestionid: mostprobablequestionid,
      timeDuration: timeDuration,
      SubjectList: SubjectList,
      quiz: Questionlist,
      studentdata: studentdata,
      scholarshipid: scholarshipid,
      scholarship: scholarship,
      subjectId: subjectData[0],
      boardid: boardid,
      ProbSubjectId: ProbSubjectId,
      subjectName: subjectName,
    });

    dispatch(getChildProbableQuestionDetailsAPI(probdata));
    // dispatch(
    //   getChildProbableQuestionDetailsAPI(
    //     // undefined,
    //     // stageid,
    //     // boardid,
    //     // scholarshipid,
    //     // childid,
    //     // setLoading,
    //   ),
    // );
  };
  // const {ProbableQuestions = []} = useSelector(
  //   state => state.GetMostProbQuesReducer,
  // );
  // console.log(
  //   ProbableQuestions,
  //   '================ProbableQuestions-----------',
  // );
  interface probableQuestions {
    boardname: string,
    BSE: string,
    mostprobablequestionid: string,
    scholarship: string,
    stage: string,
    // stageid = '',
    // subjectid :string,
    subjectname: string,
    year: string,
    yearid: string,
  }
  const ProbableQuestions = useAppSelector(selectMostProbableQsSetData)


  const {
    // boardid = '',
    boardname = '',
    BSE = '',
    mostprobablequestionid: questionid = '',
    scholarship: Scholarship = '',
    stage: probableYearStage = '',
    // stageid = '',
    subjectid = '',
    subjectname = '',
    year = '',
    yearid = '',
  } = ProbableQuestions;
  const subjectData = ProbableQuestions.map(r => r.subjectid)
  console.log(boardname, "boardname.....!!!!!!!!!!!!!!!!!!!..")
  // console.log(ProbableQuestions,"$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ProbableQuestions....................",ProbableQuestions.subjectid,"subjectid............")


  useEffect(() => {
    const probsetData = {
      stageid,
      boardid,
      scholarshipid,
      childid,
      setid,
    }
    console.log(probsetData, "probsetData...................")
    dispatch(getMostProbableQuestionSetAPI(probsetData));
  }, []);

  const handleAnswerSubmit = async () => {

    let ExamnameVal = ExamName;
    if (ExamName == '') {
      await AsyncStorage.getItem('ExamName').then(data => {
        ExamnameVal = data;
      });
    }

    let quizData = [...quiz];

    if (ExamnameVal == 'ProbableQuestion') {
      const {
        no_of_Attempts = 0,
        correctanswer = 0,
        Skipped = 0,
        Wronganswer = 0,
        totalmark = 0,
        percentage = 0,
      } = markCalculation(Questionlist);

      // const quizData = quiz.map(rec => rec);

      if (isReattempt) {
        if (subjectWise == false) {
          // 
          let bodyReattemptAnswerData = {
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
              },
            ],
            // securmark,wrongmark,skipmark, quiz ,subjectIamge,topicImage,contentImage,isPremium,
          };
          console.log(
            bodyReattemptAnswerData,
            'bodyReattemptAnswerData................',
            // bodyReattemptAnswerData.answerdetails[0].quiz,
          );

          // dispatch(
          probableanswerReattemptSubmitApi(
            bodyReattemptAnswerData,
            handleCallback,
            // navigation.navigate('ScoreBoard'),
            setLoading,
          );
          // );
        } else {
          let bodySubjectwiseReattemptAnswerData = {
            id: studentdata[0]._id,
            childid: childid,
            subjectwisemostprobablequestionid: mostprobablequestionid,
            stageid: stageid,
            stage: stageid,
            setid: subjectData[0],
            name: childName,
            subjectname: subjectName,
            subjectid: subjectData[0],
            setname: subjectName,
            scholarshipname: scholarship,
            scholarshipid: scholarshipid,
            questionsetid: '',
            questionsetname: '',
            boardid: boardid,
            boardname: boardname,
            ispremium: ispremium,
            timeDuration: timeDuration,
            isunlock: false,
            numberofattempt: no_of_Attempts,
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
              },
            ],
            // securmark,wrongmark,skipmark, quiz ,subjectIamge,topicImage,contentImage,isPremium,
          };
          console.log(
            bodySubjectwiseReattemptAnswerData,
            'bodySubjectwiseReattemptAnswerData................',
            bodySubjectwiseReattemptAnswerData.answerdetails[0].quiz,
          );

          // dispatch(
          subjectwiseProbableanswerReattemptSubmitApi(
            bodySubjectwiseReattemptAnswerData,
            handleCallback,
            setLoading,
          );
          // );
        }
      } else {
        if (subjectWise == false) {
          // 

          const bodyAnswerData = {
            childid: childid,
            parentid: '',
            name: childName,
            age: C_age,
            stage: stage,
            stageid: stageid,
            mostprobablequestionid: mostprobablequestionid,
            subject: quizData[0].subjectName,
            mostprobablequestionname: scholarshipid,
            subjectid: quizData[0].subjectid,
            lastexamtotalmark: Questionlist.length,
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
              },
            ],
          };
          // 

          // dispatch(
          probableanswerSubmitApi
            (bodyAnswerData,
              handleCallback,
              setLoading
              //  ),
            );
        } else {
          const bodySubjectwiseAnswerData = {
            childid: childid,
            subjectwisemostprobablequestionid: mostprobablequestionid,
            stageid: stageid,
            stage: stage,
            setid: subjectData[0],
            name: childName,
            subjectname: subjectName,
            setname: subjectName,
            subjectid: subjectData[0],
            scholarshipname: scholarship,
            scholarshipid: scholarshipid,
            questionsetid: '',
            questionsetname: '',
            boardid: boardid,
            boardname: boardname,
            ispremium: ispremium,
            timeDuration: timeDuration,
            islock: false,
            numberofattempt: no_of_Attempts,
            mostprobablequestionname: scholarshipid,
            lastexamtotalmark: Questionlist.length,
            lastexamtotalwrongmark: Wronganswer,
            lastexamtotalsecurmark: correctanswer,
            lastexamtotalskipmark: Skipped,
            lastexampercentage: percentage,
            answerdetails: [
              {
                totalmark: Questionlist.length,
                totalsecurmark: correctanswer,
                totalwrongmark: Wronganswer,
                totalskipmark: Skipped,
                quiz: Questionlist,
              },
            ],
          };
          // 

          // dispatch(
          subjectwiseProbableanswerSubmitApi(
            bodySubjectwiseAnswerData,
            handleCallback,
            setLoading,
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
  const childData = { childid }

  useEffect(() => {
    // setModalStatus(false);
    navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      setModalStatus(false);
      dispatch(
        getChildDetailsAPI(childid))
      const probsetData = {
        stageid,
        boardid,
        scholarshipid,
        childid,
        setid,
      }

      console.log(probsetData, "probsetData...................")
      dispatch(getMostProbableQuestionSetAPI(probsetData));
      // dispatch(getUserInfoAPI(undefined, undefined, setLoading));
      if (id != '')
        // dispatch(
        //   getChildDetailsAPI(childData))
        // undefined,
        // undefined,
        // undefined,
        // setLoading,
        // undefined,
        //   ),
        // );
        if (progressdata == 0) handlePress();
    });
    return () => {
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
        // 

        // const data = list.map((rec, index) => {
        //   let optionList = [];
        //   if (rec.option.length > 0) {
        //     
        //     rec.option.map((item, idx) => {
        //       let keydata = Object.keys(item);
        //       let Valuedata = Object.values(item);
        //       optionList.push({label: keydata[0], value: Valuedata[0]});
        //     });
        //   }
        //   // 
        //   return {...rec, option: optionList};
        // });
        // 
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
    // 
    newprogressdata = parseFloat(newprogressdata);
    // 
    setProgressdata(newprogressdata);
  };
  const handlePreviousPress = () => {
    // 
    let newprogressdata = parseFloat(progressdata) - 1 / Questionlist.length;
    // newprogressdata = parseFloat(newprogressdata).toFixed(1);
    // 
    // 
    newprogressdata = parseFloat(newprogressdata);
    // 
    setProgressdata(newprogressdata);
  };
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
        }}>
        {trans('Mock Test')}
      </Text> */}
          <View style={{ height: 40, marginHorizontal: 20 }}>
            {timeDurationValue ? (
              <CommonTimer
                duration={timeDurationValue}
                handleAnswerSubmit={handleAnswerSubmit}
              />
            ) : (
              <></>
            )}
          </View>
          <View style={{ position: 'absolute', top: 0, right: 10 }}>
            <TouchableOpacity
              onPress={() => {
                setQuitModalStatus(true);
              }}
              style={{
                // backgroundColor: Colors.secondary,
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
              color: '#fff',
              marginLeft: 10,
              textAlign: 'center',
              fontWeight: '700',
            }}>
            {scholarship} {trans(`Most Probable Question`)}
          </Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 20,
              // borderWidth: 1,
            }}>
            <Progress.Bar
              color={'#EBCB00'}
              progress={progressdata}
              width={300}
              height={7}
              style={{ marginTop: -5 }}
            />

            {/* {timeDurationValue ? (
          <CountdownTimer
            duration={timeDurationValue}
            handleAnswerSubmit={handleAnswerSubmit}
          />
        ) : (
          <></>
        )} */}
          </View>
          <Text
            style={[
              styles.question,
              { textAlign: 'left', color: '#fff', alignSelf: 'flex-start' },
            ]}>
            {`${trans('Qs.')} ( ${currentIndex + 1}/${Questionlist.length} )`}
          </Text>
          <ScrollView
            // horizontal={true}
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={true}
            indicatorStyle={'black'}
            persistentScrollbar={true}
            ref={scrollRef}
            style={{
              flex: 1,
              // borderWidth:1
              // minHeight: device_height * 0.3,
              // minWidth: device_width * 0.8,
            }}
          >
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
                {Questionlist[currentIndex].questiontype == 'image' ? (
                  Questionlist[currentIndex].question != '' ? (

                    <View
                      style={{
                        padding: 10,
                        paddingVertical: 10,
                        color: '#333',
                        // borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                        borderBottomWidth: 4,
                        // fontSize: '38',
                        minHeight: device_height * 0.49,
                        width: device_width * 0.88,
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
                        source={{
                          html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><p>${JSON.parse(
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
                      { textAlign: 'center', color: '#fff' },
                    ]}>
                    {Questionlist[currentIndex].question}
                  </Text>
                )}
              </View>
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
            {/*               
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  {Questionlist[currentIndex].options.map((item, indx) => {
                    const {label = '', value = ''} = item;
                    const {selectedAns = ''} = Questionlist[currentIndex];
                    const selectedItem = label == selectedAns;
                    
                    return (
                      <View
                        key={indx}
                        style={{
                          width: '100%',
                          backgroundColor: selectedItem
                            ? Colors.primary
                            : '#F0F0F0',

                          // borderWidth: 1,
                          // borderWidth:1,
                          // borderColor:'#000',
                          marginTop: 25,
                          borderColor: '#FFF',
                          elevation: 5,
                          borderRadius: 10,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            handleselectAnswer(label, currentIndex);
                          }}
                          style={[
                            styles.headerInner,
                            {
                              backgroundColor: selectedItem
                                ? Colors.primary
                                : '#F0F0F0',
                            },
                          ]}>
                          <View style={styles.headerinner1}>
                            <Text
                              style={[
                                styles.innerText,
                                {color: selectedItem ? '#fff' : '#000'},
                              ]}>
                              {`(${label})`} {value}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
             */}
            {/* </View> */}
            {/* );
        })} */}
          </ScrollView>
          <View
            style={
              Questionlist[currentIndex].questiontype == 'image'
                ? {
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: '#ccc',
                  borderRadius: 5,

                  paddingBottom: 5,
                }
                : { marginVertical: 10, paddingBottom: 5 }
            }>
            {Questionlist[currentIndex]?.option?.map((item, indx) => {
              const { label = '', value = '', contenttype = '' } = item;
              const { selectedAns = '' } = Questionlist[currentIndex];
              const selectedItem = label == selectedAns;
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
                    backgroundColor: selectedItem ? '#FFB901' : '#F0F0F0',
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
                      backgroundColor: selectedItem ? '#FFB901' : '#F0F0F0',
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
            // backgroundColor: '#FFF',
            backgroundColor: 'rgba(0,255,0, 0.1)',
            marginLeft: 7,
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity
            style={{ padding: 15 }}
            disabled={currentIndex == 0}
            onPress={() => handlePrevious()}>
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
                backgroundColor: '#FFB901', 
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
                  // else handleNext();
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: 'green',
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
                // alignItems: 'baseline',
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
                disabled={loading}
                onPress={() => {
                  //   handleActiveStep();

                  setModalStatus(true);
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '700',
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
            loading={loading}
            yesbtnFunction={() => handleAnswerSubmit()}
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
            loading={loading}
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

export default ProbableMockTest;

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
    padding: 10,
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
