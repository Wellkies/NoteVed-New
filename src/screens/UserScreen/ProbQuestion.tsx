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
} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import React, {useEffect, useRef, useState} from 'react';
import Colors from '../../../assets/Colors';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ActivityIndicator,
  Avatar,
  Modal,
  RadioButton,
} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
// import {
//   getAllSubjectExamAPI,
//   getChildProbableQuestionDetailsAPI,
//   getMostProbableQuestionAPI,
//   getMostProbableQuestionSetAPI,
//   getScholarshipPremiumAPI,
//   getTopicBySubClassAPI,
//   getUnlockChildAPI,
//   handleAsyncSetExamName,
//   handleSetExamName,
//   updateParentProfile,
// } from '../../redux/actions/Action';
import {
  IsTabScreen,
  emailRegex,
  markCalculation,
  name_reg,
  phoneRegex,
} from '../../../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {device_height, device_width} from '../style';
// import LoadingScreen from '../AppScreens/LoadingScreen';
// import Header from './CommonScreens/Header';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
// import CommonFeedback from './CommonScreens/CommonFeedback';
// import {GET_MOST_PROBABLE_QUESTION_SET} from '../../redux/actions/actiontypes';
// import {ImageBackground} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useAppSelector} from '../../redux/store/reducerHook';
import {
  getChildProbableQuestionDetailsAPI,
  selectMostProbableData,
  selectMostProbableDataStatus,
} from '../../redux/reducers/GetMostProbQuesReducer';
import {
  getChildDetailsAPI,
  selectStudentInfo,
} from '../../redux/reducers/StudentInfoReducer';
import {
  getUnlockChildAPI,
  selectUnlockStudent,
} from '../../redux/reducers/GetUnlockChildReducer';
import {
  getScholarshipPremiumAPI,
  selectPremiumPurchase,
} from '../../redux/reducers/GetPremiumPurchaseReducer';
import Header from '../CommonScreens/Header';
import LoadingScreen from '../CommonScreens/LoadingScreen';
import {
  getMostProbableQuestionSetAPI,
  probstate,
} from '../../redux/reducers/GetMostProbableQuestionSetReducer';
import {useNavigation} from '@react-navigation/native';
import {selectStudentLanguage} from '../../redux/reducers/languageReducer';
// import Progress from './CommonScreens/Progress';
// import ExamSets from './ExamSets';

const ProbQuestion = ({route}) => {
  const selectedLanguage = useAppSelector(selectStudentLanguage);
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();

  const {t: trans, i18n} = useTranslation();
  const {
    scholarshipName = '',
    showFeedback = false,
    scholarshipID: scholarshipid = '',
  } = route.params;
  console.log(
    route.params,
    '=============route.params',
    scholarshipid,
    'scholarshipid..........',
  );

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

  // const {ProbableQuestions: quizListData = []} = useSelector(
  //   state => state.GetMostProbQuesReducer,
  // );
  const quizListData = useAppSelector(selectMostProbableData);
  const quizListDataLoading = useAppSelector(selectMostProbableDataStatus);
  console.log(
    quizListDataLoading,
    '........................quizListDataLoading',
  );
  const [quizList, setQuizList] = useState(quizListData);
  const [feedbackModalStatus, setFeedbackModalStatus] = useState(false);
  // console.log(quizListData, '================Probable  Questions-----------');
  // const {childInfo = {}} = useSelector(state => state.ChildDetailsReducer);
  const {
    _id: id = '',
    name = '',
    stage = '',
    phone = '',

    image = '',
    age = '',
    address = '',

    childid = '',
    stageid = '',
    boardid = '',
    isPremium = '',
    // coordinates='',
  } = childInfo;
  // const {UnlockChild = []} = useSelector(state => state.GetUnlockChildReducer);
  const UnlockChild = useAppSelector(selectUnlockStudent);
  const unlockstudent = UnlockChild.filter(r => r.childid == childid);
  const handleFeedbackSubmit = () => {
    setFeedbackModalStatus(false);
  };
  useEffect(() => {
    dispatch(getUnlockChildAPI());

    const probdata = {
      stageid,
      boardid,
      scholarshipId: scholarshipid,
      childid,
    };
    const childDetails = {
      childid,
    };
    dispatch(getChildDetailsAPI(childDetails));
    dispatch(getChildProbableQuestionDetailsAPI(probdata));
    const Predata = {childid, stageid, boardid};
    dispatch(getScholarshipPremiumAPI(Predata));
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      // const probdata = {
      //   stageid,
      //   boardid,
      //   scholarshipid,
      // };
      dispatch(getChildProbableQuestionDetailsAPI(probdata));
      // dispatch(
      //   getChildProbableQuestionDetailsAPI(
      //     undefined,
      //     stageid,
      //     boardid,
      //     scholarshipid,
      //     childid,
      //     setLoading,
      //   ),
      // );
      const probdata = {
        stageid,
        boardid,
        scholarshipId: scholarshipid,
        childid,
      };
      const childDetails = {
        childid,
      };
      dispatch(getChildDetailsAPI(childDetails));
      dispatch(getChildProbableQuestionDetailsAPI(probdata));
      const Predata = {childid, stageid, boardid};
      dispatch(getScholarshipPremiumAPI(Predata));
      BackHandler.addEventListener('hardwareBackPress', () => {
        dispatch(getChildProbableQuestionDetailsAPI(probdata));
        navigation.goBack();
        return true;
      });
      // if (showFeedback == true) {
      //   setFeedbackModalStatus(true);
      // }
      premiumdata();
      if (childid != '') {
        // dispatch(
        //   getScholarshipPremiumAPI(undefined, childid, stageid, boardid),
        // );
        // console.log(childid, stageid, boardid, 'childid, stageid, boardid');
      }
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        // if (showFeedback == true) {
        //   setFeedbackModalStatus(true);
        // }
        dispatch(getChildProbableQuestionDetailsAPI(probdata));
        navigation.goBack();
        return true;
      });
    };
  }, []);

  // const handleBackButtonClick = () => {
  //   console.log('hardwareBackPress----------------');
  //   navigation.navigate('UserHome');
  //   return true;
  // };

  const premiumdata = async () => {
    try {
      // console.log('fcmToken2')
      let premiumValue = '';
      await AsyncStorage.getItem('scholarArray').then(data => {
        premiumValue = data;
        // console.log(premiumValue, 'premiumValue......................');
        setasyncpremiumData(JSON.parse(premiumValue));
      });

      if (premiumValue !== null) {
        // console.log(premiumValue);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  // console.log(childInfo, '==================childInfo childinfo');

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(loading, 'loading............');
  const [asyncpremiumData, setasyncpremiumData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [ansloading, setAnsLoading] = useState(false);
  const [ansIndex, setAnsIndex] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [lockedModalStatus, setLockedModalStatus] = useState(false);
  const [paymentModalStatus, setPaymentModalStatus] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  // let highlightedIndex = 0;
  const scrollViewRef = useRef(null);

  const scrollToHighlightedRow = highlightedIndex => {
    if (scrollViewRef.current) {
      const yOffset = highlightedIndex * 200; // Adjust this value based on your row height
      scrollViewRef.current.scrollTo({y: yOffset, animated: true});
    }
  };
  // const selectedhandler = (index, name) => {
  //   if (selectedId == index && selectedName == name) {
  //     setSelectedId(null);
  //     setSelectedName('');
  //     setShow(false);
  //   } else {
  //     setSelectedId(index);
  //     setSelectedName(name);
  //     setShow(true);
  //   }
  // };

  const colorList = [
    ['#2775cf', '#e3eefa'],
    ['#f08441', '#f7d7c3'],
    ['#8356a8', '#f3e1f7'],
    ['#05a851', '#d9fceb'],
    ['#f2618a', '#ffdeeb'],
  ];

  const RowItem = ({item, index}) => {
    // const isHighlighted = index === highlightedIndex;
    const isHighlighted = false;
    return (
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: isHighlighted ? 'orange' : Colors.secondary,
            paddingHorizontal: isHighlighted ? 10 : 0,
            paddingBottom: isHighlighted ? 10 : 0,
            paddingTop: isHighlighted ? 10 : 0,
            borderRadius: 10,
            elevation: isHighlighted ? 10 : 0,
            marginVertical: 5,
          }}>
          {item}
        </View>
      </TouchableOpacity>
    );
  };

  const handleDisable = quizList => {
    let List = [...quizList];
    let count = 0;
    let DataList = [];
    // List = List.filter(rec => rec.quiz.length > 0);
    List = List.map((row, index) => {
      const {studentdata = [], quiz = []} = row;
      // if(childid==='WELL1704277327585' ||childid==='WELL1701947157365'||childid==='WELL1699357185960'){
      //   DataList.push({...row, isExamAvailable: true});
      // }
      // else{
      // console.log(index, "??????????????????INDEX????????????????????")
      if (studentdata.length == 0 && count == 0) {
        let passStudent = false;
        if (index != 0) {
          let totalMark = List[index - 1].studentdata[0].lastexamtotalmark;
          let secureMark =
            List[index - 1].studentdata[0].lastexamtotalsecurmark;
          // console.log(totalMark, secureMark, 'secureMark============');
          let percentage = ((secureMark / totalMark) * 100).toFixed(1);
          if (percentage >= 90) {
            passStudent = true;
          }
        }
        if (index == 0) DataList.push({...row, isExamAvailable: true});
        else if (passStudent) DataList.push({...row, isExamAvailable: true});
        else DataList.push({...row, isExamAvailable: false});
        count += 1;
      } else if (studentdata.length > 0 && count == 0) {
        DataList.push({...row, isExamAvailable: true});
      } else if (count != 0) {
        DataList.push({...row, isExamAvailable: false});
      }
      // }
      const lastindex = DataList.findLastIndex(object => {
        return object.isExamAvailable == true;
      });
      // console.log(lastindex, '-----------------index');
      setQuizList(DataList);
      if (lastindex != -1) {
        setHighlightedIndex(lastindex);
        // scrollToHighlightedRow(lastindex);
        setTimeout(() => scrollToHighlightedRow(lastindex), 400);
      } else {
        setHighlightedIndex(0);
        // scrollToHighlightedRow(0);
        setTimeout(() => scrollToHighlightedRow(0), 400);
      }
      // console.log(DataList[2], 'DataList-----------',"handleDisable ended");
    });
    //   studentdata
    // quiz
  };
  useEffect(() => {
    if (quizListData.length) {
      // console.log('handleDisable called');
      handleDisable(quizListData);
    }
  }, [quizListData]);
  const AllExamAttempted = quizList.find(rec => rec.isExamAvailable == false);

  // const {PremiumPurchase = []} = useSelector(
  //   state => state.GetPremiumPurchaseReducer,
  // );
  const PremiumPurchase = useAppSelector(selectPremiumPurchase);

  const {paymentid = '', enddate = ''} = PremiumPurchase.length
    ? PremiumPurchase[0]
    : [];
  // console.log(PremiumPurchase, 'PremiumPurchase............');

  const handlePayment = () => {
    setPaymentModalStatus(false);
    navigation.navigate('PremiumAccess', {
      screenName: 'ProbQuestion',
      subjectId: '',
      subjectName: '',
      topicid: '',
      topicName: '',
      ExamQuestionsets: '',
      isScoreBoardFlag: false,
      is2ndAvailable: '',
      index: '',
      scholarshipName: scholarshipName,
      quizList: quizList,
      showFeedback: showFeedback,
    });
  };

  const handleAnswersheet = (
    subjectName,
    chapterName,
    examSet,
    quiz,
    correctanswer,
    totalmark,
    Wronganswer,
    Skipped,
  ) => {
    navigation.navigate('AnswerSheet', {
      subjectname: subjectName,
      chapterName: chapterName,
      examSet: examSet,
      quiz: quiz,
      securemark: correctanswer,
      totalmark: totalmark,
      Wronganswer: Wronganswer,
      Skipped: Skipped,
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
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
          label1={trans('Probable Questions')}
          isbackIconShow={true}
          functionName={() => navigation.goBack()}
        />
        {quizListDataLoading == 'loading' ? (
          <LoadingScreen flag={quizListDataLoading == 'loading'} />
        ) : (
          <ScrollView>
            <View
              style={{
                marginHorizontal: 10,
                // backgroundColor: 'rgba(0,255,0, 0.05)',
              }}>
              {quizList.length > 0 ? (
                quizList.map((item, index) => {
                  const {
                    _id = '',
                    quiz = [],
                    mostprobablequestionid = '',
                    setname = '',
                    stage = '',
                    stageid = '',
                    boardid = '',
                    boardname = '',
                    subjectid: ProbSubjectId = '',
                    subjectname: ProbSubjectName = '',
                    name = '',
                    scholarshipid = '',
                    scholarship = '',
                    setid = '',
                    ispremium = false,
                    studentdata = [],
                    isExamAvailable = false,
                    timeDuration = '',
                    subjects = [],
                  } = item;

                  // console.log(
                  //   mostprobablequestionid,
                  //   '================mostprobablequestionid',
                  //   scholarshipid,
                  //   '==============scholarshipid==========',
                  //   setid,
                  //   "setid###################################"
                  // );
                  let premiumFlag = index < 0 ? true : false;
                  {
                    /* if (PremiumPurchase.length) {
                  const selectedData = PremiumPurchase.find(
                    rec => rec.scholarshipid == scholarshipid,
                  );
                  if (selectedData != undefined) {
                    premiumFlag = true;
                  }
                } */
                  }
                  if (premiumFlag == false) {
                    {
                      /* let resultArr = PremiumPurchase.filter(o1 =>
                    asyncpremiumData.some(
                      o2 => o1.scholarshipid === o2.scholarshipId,
                    ),
                  ); */
                    }
                    {
                      /* console.log(
                    resultArr,
                    'resultArr=================',
                    PremiumPurchase,
                    '=============PremiumPurchase',
                    asyncpremiumData,
                  ); */
                    }
                    {
                      /* if (resultArr.length == 0) {
                    premiumFlag = false;
                  } else {
                    premiumFlag = true;
                  } */
                    }
                    {
                      /* isPremium = true; */
                    }
                    const LicenseID = PremiumPurchase.map(
                      rec =>
                        rec.licenseid == '1695358760234' ||
                        rec.licenseid == 'ADA51690528084298' ||
                        rec.licenseid == '1704875373950' ||
                        rec.licenseid == '1705039500455',
                    );
                    // console.log(
                    //   LicenseID[0],
                    //   'LicenseID[0]^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
                    // );
                    {
                      /* if (LicenseID[0] == true) {
                      premiumFlag = true;
                    } else {
                      premiumFlag = false;
                    } */
                    }
                    if (LicenseID[0] == true) {
                      if (paymentid == 'free7days') {
                        premiumFlag = false;
                      } else {
                        premiumFlag = true;
                      }
                    } else {
                      premiumFlag = false;
                    }
                  }
                  let isInfoFlag = false;

                  if (
                    index > 0 &&
                    isExamAvailable == false &&
                    quizList[index - 1].isExamAvailable == true &&
                    AllExamAttempted !== undefined
                  )
                    isInfoFlag = true;
                  if (unlockstudent != undefined && unlockstudent.length > 0) {
                    isInfoFlag = false;
                  }
                  {
                    /* <RowItem
                    key={index}
                    item={
                    }
                    index={index}
                  /> */
                  }
                  return (
                    <TouchableOpacity
                      key={index}
                      disabled={true}
                      style={{
                        // elevation: 5,
                        width: '100%',
                        alignSelf: 'center',
                        // backgroundColor: '#0f6f25',
                        // backgroundColor: 'rgba(0,255,0, 0.1)',
                        backgroundColor: isExamAvailable
                          ? 'rgba(0,255,0,0.15)'
                          : 'rgba(220,220,220,0.1)',
                        marginVertical: 5,
                        padding: 10,
                        // justifyContent: 'center',
                        // alignItems: 'center',
                        borderRadius: 10,
                        // borderWidth: 0.5,
                        borderColor: '#0f6f25',
                      }}>
                      {isInfoFlag && (
                        <View
                          style={{
                            backgroundColor: '#79851f',
                            paddingVertical: 10,
                            paddingHorizontal: 15,
                            marginVertical: 10,
                            // marginHorizontal: 15,
                            // borderRadius: 7,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                          }}>
                          <AntDesign
                            style={{marginHorizontal: 10, borderWidth: 0}}
                            name={'infocirlce'}
                            size={20}
                            color={'#fff'}
                          />
                          <Text
                            style={{
                              color: '#fff',
                              fontWeight: '600',
                              fontSize: 13,
                              textAlign: 'center',
                              // borderWidth: 1,
                              // borderLeftWidth:1,
                              width: '85%',
                            }}>
                            {trans(
                              'You have to score atleast 90% to attempt next locked test',
                            )}
                          </Text>
                        </View>
                      )}
                      <View
                        style={{
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexDirection: 'row',
                          // borderWidth: 1,
                          paddingVertical: 10,
                        }}>
                        <View
                          style={{
                            width: '62%',
                            // borderWidth: 1,
                            flexDirection: 'row',
                            // alignItems: 'center',
                          }}>
                          {/* <MaterialCommunityIcons
                              name="hand-pointing-right"
                              color={isExamAvailable ? Colors.primary : 'grey'}
                              size={40}
                              style={{marginRight: 10}}
                            /> */}
                          <Ionicons
                            style={{marginRight: 10}}
                            color={isExamAvailable ? '#fff' : 'grey'}
                            name="eye-outline"
                            size={28}
                          />
                          <View style={{flexDirection: 'column'}}>
                            <View
                              style={{
                                width: '100%',
                                // borderWidth: 1,
                              }}>
                              <Text
                                style={[
                                  styles.question,
                                  {
                                    // width: '85%',
                                    width: IsTabScreen
                                      ? '100%'
                                      : !IsTabScreen &&
                                        selectedLanguage === 'english'
                                      ? '88%'
                                      : !IsTabScreen &&
                                        selectedLanguage === 'odia'
                                      ? '100%'
                                      : '100%',
                                    color: isExamAvailable ? '#fff' : 'grey',
                                    fontWeight: '800',
                                    fontSize: 14,
                                    // borderWidth:1
                                  },
                                ]}>
                                {`${scholarshipName} ${trans(
                                  'Most Probable Questions',
                                )}`}
                              </Text>
                              <Text
                                style={[
                                  styles.question,
                                  {
                                    color: isExamAvailable ? '#fff' : 'grey',
                                    fontWeight: '800',
                                    fontSize: 13,
                                    textTransform: 'uppercase',
                                  },
                                ]}>
                                {setname}
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View
                          style={{
                            borderRadius: 5,
                            borderColor: '#0f6f25',
                            // backgroundColor: Colors.primary,
                            backgroundColor:
                              isExamAvailable ||
                              (unlockstudent != undefined &&
                                unlockstudent.length > 0)
                                ? '#fff'
                                : 'grey',
                            width: '33%',
                            alignItems: 'center',
                            // borderWidth: 1,
                          }}>
                          {isExamAvailable ||
                          (unlockstudent != undefined &&
                            unlockstudent.length > 0) ? (
                            <>
                              {premiumFlag == true ? (
                                <TouchableOpacity
                                  style={{
                                    paddingHorizontal: 12,
                                    paddingVertical: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}
                                  onPress={() => {
                                    dispatch(probstate());
                                    const probsetData = {
                                      stageid,
                                      boardid,
                                      scholarshipid,
                                      childid,
                                      setid,
                                    };
                                    console.log(
                                      probsetData,
                                      'probsetData...................',
                                    );
                                    dispatch(
                                      getMostProbableQuestionSetAPI(
                                        probsetData,
                                      ),
                                    );
                                    navigation.navigate('ProbSubjectList', {
                                      screenName: 'ProbQuestion',
                                      setid: setid,
                                      quiz: quiz,
                                      studentdata: studentdata,
                                      ExamQuestionsets: '',
                                      scholarshipid: scholarshipid,
                                      scholarship: scholarshipName,
                                      examSet: setname,
                                      mostprobablequestionid:
                                        mostprobablequestionid,
                                      ProbSubjectId: ProbSubjectId,
                                      ProbSubjectName: ProbSubjectName,
                                      timeDuration: timeDuration,
                                      SubjectList: subjects,
                                    });
                                    // handleAsyncSetExamName('ProbableQuestion');
                                  }}>
                                  <Text
                                    style={{
                                      color: '#0f6f25',
                                      fontSize: 12,
                                      // letterSpacing: 0.5,
                                      fontWeight: '700',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      textAlign: 'center',
                                    }}>
                                    {trans('Continue')}{' '}
                                  </Text>
                                  <FontAwesome
                                    style={{
                                      color: '#0f6f25',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                    name="chevron-circle-right"
                                    size={15}
                                  />
                                </TouchableOpacity>
                              ) : (
                                <View
                                  style={{
                                    width: '100%',
                                  }}>
                                  <TouchableOpacity
                                    style={{
                                      paddingVertical: 10,
                                      borderRadius: 5,
                                      // borderColor: Colors.primary,
                                      backgroundColor: '#FFB901',
                                      width: '100%',
                                      alignItems: 'center',
                                      // borderWidth: 1,
                                    }}
                                    onPress={() => setPaymentModalStatus(true)}>
                                    <Text
                                      style={{
                                        color: '#000',
                                        fontSize: 12,
                                        letterSpacing: 0.5,
                                        fontWeight: '900',
                                      }}>
                                      {trans('Pay Now')}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              )}
                            </>
                          ) : (
                            <TouchableOpacity
                              style={{
                                paddingHorizontal: 15,
                                paddingVertical: 10,
                              }}
                              onPress={() => setLockedModalStatus(true)}>
                              <Text
                                style={{
                                  color: '#ccc',
                                  fontSize: 12,
                                  letterSpacing: 0.5,
                                  fontWeight: '900',
                                }}>
                                <Fontisto
                                  style={{color: '#ccc'}}
                                  name="locked"
                                  size={15}
                                />{' '}
                                {trans('Locked')}
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <View
                  style={{
                    height: 70,
                    width: '100%',
                    marginVertical: 20,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    borderColor: 'darkgoldenrod',
                    // borderWidth: 1,
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
                      backgroundColor: '#79851f',
                      paddingHorizontal: 10,
                    }}>
                    <AntDesign
                      style={{marginHorizontal: 10, borderWidth: 0}}
                      name={'infocirlce'}
                      size={20}
                      color={'#fff'}
                    />
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: '600',
                        fontSize: 13,
                        textAlign: 'center',
                        // borderWidth: 1,
                        // borderLeftWidth:1,
                        width: '85%',
                      }}>
                      {'   '}
                      {trans('Currently No Contents Added')}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        )}
        {feedbackModalStatus && (
          <CommonFeedback
            ModalStatus={feedbackModalStatus}
            isIconShow={true}
            closeModalFunc={() => setFeedbackModalStatus(false)}
            label1={`${trans('Please share your Feedback')}`}
            label2={`${trans('How was your experience with last mock test')}`}
            yesbtnName={trans('Send')}
            loading={loading}
            yesbtnFunction={() => handleFeedbackSubmit()}
            // nobtnName={trans('NO')}
            // nobtnFunction={() => setFeedbackModalStatus(false)}
          />
        )}
        {paymentModalStatus && (
          <Modal transparent={true} visible={paymentModalStatus}>
            <View
              style={{
                backgroundColor: '#fff',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{alignItems: 'flex-end', justifyContent: 'center'}}>
                <View
                  style={{
                    borderRadius: 15,
                    borderWidth: 1,
                    minHeight: device_height * 0.45,
                    minWidth: device_width * 0.8,
                    backgroundColor: '#0f6f25',
                    borderColor: '#FFB901',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      {paymentid == 'free7days' ? (
                        <View
                          style={{alignItems: 'center', paddingVertical: 15}}>
                          <View
                            style={{
                              borderWidth: 1,
                              borderColor: 'gold',
                              borderRadius: 50,
                              padding: 10,
                              paddingVertical: 12,
                              elevation: 15,
                              // backgroundColor: '#dee',
                            }}>
                            <FontAwesome5
                              style={{color: 'gold'}}
                              name={'crown'}
                              size={30}
                            />
                          </View>

                          <Text
                            style={{
                              textAlign: 'center',
                              width: device_width * 0.8,
                              fontSize: 15,
                              color: '#fff',
                              marginTop: 10,
                              marginLeft: 10,
                              fontWeight: '700',
                            }}>
                            {trans(
                              'Oops! This feature is not included in the free trial. Upgrade to Premium for access to this feature!',
                            )}
                          </Text>
                        </View>
                      ) : (
                        <View
                          style={{alignItems: 'center', paddingVertical: 15}}>
                          <View
                            style={{
                              borderWidth: 1,
                              borderColor: 'gold',
                              borderRadius: 50,
                              padding: 10,
                              paddingVertical: 12,
                              elevation: 15,
                              // backgroundColor: '#dee',
                            }}>
                            <FontAwesome5
                              style={{color: 'gold'}}
                              name={'crown'}
                              size={30}
                            />
                          </View>
                          {boardid == '1' ? (
                            <Text
                              style={{
                                textAlign: 'center',
                                width: device_width * 0.8,
                                fontSize: 16,
                                color: 'darkorange',
                                marginTop: 10,
                                marginLeft: 10,
                                fontWeight: '800',
                              }}>
                              {trans(
                                'Your seven days free trial has expired !',
                              )}
                            </Text>
                          ) : (
                            <Text
                              style={{
                                textAlign: 'center',
                                width: device_width * 0.8,
                                fontSize: 16,
                                color: 'darkorange',
                                marginTop: 10,
                                marginLeft: 10,
                                fontWeight: '800',
                              }}>
                              {trans(
                                `Oops! It looks like you're trying to access content from a different board`,
                              )}
                            </Text>
                          )}

                          <Text
                            style={{
                              textAlign: 'center',
                              width: device_width * 0.8,
                              fontSize: 15,
                              color: '#fff',
                              marginTop: 10,
                              marginLeft: 10,
                              fontWeight: '700',
                            }}>
                            {trans('You have to purchase premium')}
                          </Text>
                          <Text
                            style={{
                              textAlign: 'center',
                              width: device_width * 0.7,
                              fontSize: 15,
                              color: '#fff',
                              marginTop: 5,
                              // marginLeft: 5,
                              fontWeight: '700',
                            }}>
                            {trans('to access this feature')}
                          </Text>
                        </View>
                      )}
                      <AntDesign
                        name="closecircleo"
                        style={{
                          fontSize: 38,
                          color: '#fff',
                          position: 'absolute',
                          top: -10,
                          right: -10,
                          // marginTop: 10,
                          backgroundColor: 'crimson',
                          borderRadius: 50,
                        }}
                        onPress={() => setPaymentModalStatus(false)}
                      />
                    </View>
                    <View
                      style={{
                        // borderWidth: 1,
                        paddingVertical: 15,
                        alignItems: 'center',
                        marginTop: 10,
                        marginLeft: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        padding: 10,
                      }}>
                      <TouchableOpacity
                        style={{
                          borderRadius: 10,
                          width: '30%',
                          marginVertical: 5,
                          borderWidth: 1,
                          marginRight: 25,
                          borderColor: 'white',
                          backgroundColor: '#FFB901',
                          // width: '100%',
                          paddingVertical: 5,
                          justifyContent: 'center',
                        }}
                        onPress={() => handlePayment()}>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 15,
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
              </View>
            </View>
          </Modal>
        )}
        {lockedModalStatus && (
          <Modal transparent={true} visible={true}>
            <View
              style={{
                backgroundColor: '#fff',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{alignItems: 'flex-end', justifyContent: 'center'}}>
                <View
                  style={{
                    borderRadius: 15,
                    borderWidth: 1,
                    minHeight: device_height * 0.35,
                    minWidth: device_width * 0.8,
                    // backgroundColor: '#fff',
                    backgroundColor: '#0f6f25',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderColor: '#FFB901',
                  }}>
                  <View>
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <View style={{alignItems: 'center', paddingVertical: 15}}>
                        <View
                          style={{
                            borderWidth: 0.8,
                            borderColor: '#FFB901',
                            borderRadius: 50,
                            padding: 10,
                            elevation: 15,
                            backgroundColor: '#dee',
                          }}>
                          <Fontisto
                            style={{color: '#FFB901'}}
                            name={'locked'}
                            size={30}
                          />
                        </View>

                        <Text
                          style={{
                            textAlign: 'center',
                            width: device_width * 0.8,
                            fontSize: 17,
                            color: '#fff',
                            marginTop: 10,
                            marginLeft: 10,
                            fontWeight: '900',
                          }}>
                          {trans(
                            'You have to score atleast 90% in the previous test',
                          )}
                        </Text>
                        <Text
                          style={{
                            textAlign: 'center',
                            width: device_width * 0.7,
                            fontSize: 14,
                            color: '#fff',
                            marginTop: 5,
                            // marginLeft: 5,
                            fontWeight: '600',
                          }}>
                          {trans('to unlock this test')}
                        </Text>
                      </View>
                      <AntDesign
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
                        onPress={() => setLockedModalStatus(false)}
                      />
                    </View>
                    <View
                      style={{
                        // borderWidth: 1,
                        paddingVertical: 15,
                        alignItems: 'center',
                        marginTop: 10,
                        marginLeft: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        padding: 10,
                      }}>
                      <TouchableOpacity
                        style={{
                          borderRadius: 15,
                          width: '30%',
                          marginVertical: 5,
                          borderWidth: 1,
                          marginRight: 25,
                          borderColor: 'white',
                          backgroundColor: '#FFB901',
                          // width: '100%',
                          paddingVertical: 5,
                          justifyContent: 'center',
                        }}
                        onPress={() => setLockedModalStatus(false)}>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 15,
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
              </View>
            </View>
          </Modal>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};
export default ProbQuestion;
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
