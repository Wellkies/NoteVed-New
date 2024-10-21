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
  BackHandler,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import React, { useEffect, useState, useRef } from 'react';
import Colors from '../../../assets/Colors';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {
  ActivityIndicator,
  Avatar,
  Modal,
  RadioButton,
} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import {
//   getChildDetailsAPI,
//   getPreviousYearQuestionAPI,
//   getPreviousYearQuestionSetAPI,
//   getScholarshipPremiumAPI,
//   getUnlockChildAPI,
//   handleAsyncSetExamName,
//   handleSetExamName,
// } from '../../redux/actions/Action';
import {
  emailRegex,
  markCalculation,
  name_reg,
  phoneRegex,
} from '../../../constants/Constants';
// import {ImageBackground} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { device_height, device_width } from '../style';
// import LoadingScreen from '../AppScreens/LoadingScreen';
// import Header from './CommonScreens/Header';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import Header from '../CommonScreens/Header';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../../redux/store/Store';
import {
  getChildDetailsAPI,
  selectStudentInfo,
  selectStudentStatus,
} from '../../redux/reducers/StudentInfoReducer';
import {
  getPreviousYearQuestionAPI,
  selectPreviousYear,
} from '../../redux/reducers/GetPrevYearQuesReducer';
import { getUnlockChildAPI, selectUnlockStudent } from '../../redux/reducers/GetUnlockChildReducer';
import { getScholarshipPremiumAPI, selectPremiumPurchase } from '../../redux/reducers/GetPremiumPurchaseReducer';
import { getPreviousYearQuestionSetAPI } from '../../redux/reducers/GetPrevYearSetReducer';
// import CommonFeedback from './CommonScreens/CommonFeedback';

const PrevYearQues = ({ route }) => {
  const {
    scholarshipName = '',
    scholarshipId = '',
    showFeedback = false,
  } = route.params;
  
  const { t: trans, i18n } = useTranslation();
  // const {childInfo = {}} = useSelector(state => state.ChildDetailsReducer);
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
  // 
  const quizListData = useAppSelector(selectPreviousYear);
  const UnlockChild = useAppSelector(selectUnlockStudent)
  // 
  // 
  const PremiumPurchase = useAppSelector(selectPremiumPurchase)
  // 
  // const {PrevYearQuestion: quizListData = [], loading: prevLoading = false} =
  //   useSelector(state => state.GetPrevYearQuesReducer);
  // const [quizList, setQuizList] = useState(quizListData);
  const [quizList, setQuizList] = useState(quizListData);
  // 

  const {
    _id: child_id = '',
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
    // coordinates='',`
  } = childInfo;
  // 
  // const {UnlockChild = []} = useSelector(state => state.GetUnlockChildReducer);
  const unlockstudent = UnlockChild.filter(r =>
    r.childid == childid
  );
  
  // 
  const isReattempt = true;
  const [qusetionLoading, setQuestionLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [asyncpremiumData, setasyncpremiumData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ansloading, setAnsLoading] = useState(false);
  const [ansIndex, setAnsIndex] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState('');
  const [lockedModalStatus, setLockedModalStatus] = useState(false);
  const [feedbackModalStatus, setFeedbackModalStatus] = useState(false);
  const [paymentModalStatus, setPaymentModalStatus] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  // let highlightedIndex = 0;
  const scrollViewRef = useRef(null);

  const scrollToHighlightedRow = highlightedIndex => {
    if (scrollViewRef.current) {
      const yOffset = highlightedIndex * 200; // Adjust this value based on your row height
      scrollViewRef.current.scrollTo({ y: yOffset, animated: true });
    }
  };
  // 

  const handleFeedbackSubmit = () => {
    setFeedbackModalStatus(false);
  };

  useEffect(() => {
    const Predata = { childid, stageid, boardid }
    dispatch(getScholarshipPremiumAPI(Predata))
    const prevQues = { stageid, boardid, scholarshipId, childid }
    dispatch(getUnlockChildAPI());
    dispatch(
      getPreviousYearQuestionAPI(prevQues),
    );
    dispatch(getChildDetailsAPI(childid));

    // if (quizList != '') {
    //   setTimeout(() => {
    //     setQuestionLoading(false);
    //   }, 1000);
    // } else {
    //   setQuestionLoading(false);
    // }
    navigation.addListener('focus', () => {
      const Predata = { childid, stageid, boardid };
      dispatch(getScholarshipPremiumAPI(Predata));
      const prevQues = { stageid, boardid, scholarshipId, childid }
      dispatch(getUnlockChildAPI());
      dispatch(
        getPreviousYearQuestionAPI(prevQues),
      );
      // if (showFeedback == true) {
      //   setFeedbackModalStatus(true);
      // }

      // dispatch(
      //   getPreviousYearQuestionAPI(
      //     undefined,
      //     stageid,
      //     boardid,
      //     scholarshipId,
      //     childid,
      //     undefined,
      //   ),
      // );
      premiumdata();
      // 
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.goBack();
        return true;
      });
      if (childid != '') {
        // dispatch(
        //   getScholarshipPremiumAPI(undefined, childid, stageid, boardid),
        // );
        // 
      }
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        // if (showFeedback == true) {
        //   setFeedbackModalStatus(true);
        // }
        navigation.goBack();
        return true;
      });
    };
  }, []);

  const RowItem = ({ item, index }) => {
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

  const premiumdata = async () => {
    try {
      let premiumValue = '';
      await AsyncStorage.getItem('scholarArray').then(data => {
        premiumValue = data;
        // 
        setasyncpremiumData(JSON.parse(premiumValue));
      });

      if (premiumValue !== null) {
        // 
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  // const {PremiumPurchase = []} = useSelector(
  //   state => state.GetPremiumPurchaseReducer,
  // );
  const { paymentid = '', enddate = '' } = PremiumPurchase.length
    ? PremiumPurchase[0]
    : [];
  // 

  // const colorList = [
  //   ['#2775cf', '#e3eefa'],
  //   ['#f08441', '#f7d7c3'],
  //   ['#8356a8', '#f3e1f7'],
  //   ['#05a851', '#d9fceb'],
  //   ['#f2618a', '#ffdeeb'],
  // ];

  // const previousQuestions = [
  //   {
  //     image: require('../../../assets/test.png'),
  //     label1: `Year 2013 Questions`,
  //     contentSet: 'SET - 1',
  //     isPremium: false,
  //     label2: 'Reattempt',
  //   },
  // ];

  // let previousYearQuestionList = 0;
  // quizList.map(rec => (previousYearQuestionList += rec.quiz.length));
  const {
    no_of_Attempts = 0,
    correctanswer = 0,
    Skipped = 0,
    Wronganswer = 0,
    totalmark = 0,
    percentage = 0,
  } = markCalculation(quizListData);

  const handleDisable = quizList => {
    let List = [...quizList];
    let count = 0;
    let DataList = [];
    // List = List.filter(rec => rec.quiz.length > 0);
    List = List.map((row, index) => {
      const { studentdata = [], quiz = [] } = row;
      // if(childid==='WELL1704277327585' ||childid==='WELL1701947157365'||childid==='WELL1699357185960'){
      //   DataList.push({...row, isExamAvailable: true});
      // }
      // else{
      if (studentdata.length == 0 && count == 0) {
        let passStudent = false;
        if (index != 0) {
          let totalMark = List[index - 1].studentdata[0].lastexamtotalmark;
          let secureMark =
            List[index - 1].studentdata[0].lastexamtotalsecurmark;
          // 
          let percentage = ((secureMark / totalMark) * 100).toFixed(1);
          if (percentage >= 90) {
            passStudent = true;
          }
        }
        if (index == 0) DataList.push({ ...row, isExamAvailable: true });
        else if (passStudent) DataList.push({ ...row, isExamAvailable: true });
        else DataList.push({ ...row, isExamAvailable: false });
        count += 1;
      } else if (studentdata.length > 0 && count == 0) {
        DataList.push({ ...row, isExamAvailable: true });
      } else if (count != 0) {
        DataList.push({ ...row, isExamAvailable: false });
      }
      // }
      const lastindex = DataList.findLastIndex(object => {
        return object.isExamAvailable == true;
      });
      // 
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
      // 
    });
    //   studentdata
    // quiz
  };
  useEffect(() => {
    if (quizListData.length) {
      // 
      handleDisable(quizListData);
    }
  }, [quizListData]);

  const AllExamAttempted = quizList.find(rec => rec.isExamAvailable == false);

  const handlePayNow = () => {
    setPaymentModalStatus(false);
    navigation.navigate('PremiumAccess', {
      screenName: 'PrevYearQues',
      subjectId: '',
      subjectName: '',
      topicid: '',
      topicName: '',
      ExamQuestionsets: '',
      isScoreBoardFlag: false,
      is2ndAvailable: '',
      index: '',
      scholarshipid: scholarshipId,
      scholarshipName: scholarshipName,
      quizList: quizList,
      showFeedback: showFeedback,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* {qusetionLoading == true ? (
        <View
          style={{
            height: 180,
            width: device_width,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator
            size="small"
            color={Colors.primary}
            style={{
              alignSelf: 'center',
              // paddingRight: 10,
              justifyContent: 'center',
              fontSize: 12,
            }}
          />
        </View>
      ) : ( */}
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
          label1={trans('Previous Year Exam set')}
          // label2={`{Std - ${stage}`}
          // label2={`${trans('Std')}-${stage}`}
          isbackIconShow={true}
          functionName={() => navigation.goBack()}
        />
        {/* {prevLoading ? (
        <LoadingScreen flag={true} />
      ) : (  */}

        <ScrollView>
          <View
            style={{
              marginHorizontal: 10,
              // backgroundColor: isExamAvailable
              //                       ? 'rgba(0,255,0,0.1)'
              //                       : 'rgba(220,220,220,0.1)',
              // backgroundColor: 'rgba(0,255,0, 0.05)',
            }}>
            {quizList.length > 0 ? (
              quizList.map((item, index) => {
                const {
                  id = '',
                  previousyearquestionid = '',
                  scholarship = '',
                  year = '',
                  yearid = '',
                  scholarshipid = '',
                  isExamAvailable = false,
                  quiz = [],
                  ispremium = false,
                  timeDuration = '',
                  studentdata = [],
                  subjects = [],
                } = item;
                {
                  
                }
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
                  );
                  {
                    /* console.log(
                    resultArr,
                    'resultArr=================',
                    PremiumPurchase,
                    '=============PremiumPurchase',
                    asyncpremiumData,
                  ); 
                  }
                  if (resultArr.length == 0) {
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
                    /* if(LicenseID[0]==true)
                        {
                          premiumFlag=true

                        }
                        else{
                          premiumFlag=false
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
                return (
                  <TouchableOpacity
                    key={index}
                    disabled={true}
                    // style={{
                    //   elevation: 5,
                    //   width: '100%',
                    //   alignSelf: 'center',
                    //   backgroundColor: '#def',
                    //   padding: 10,
                    //   borderRadius: 10,
                    //   marginTop: 10,
                    //   // borderWidth: 1,
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
                    {/* {quiz.length > 0 ? (
                      <> */}
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
                          style={{ marginHorizontal: 10, borderWidth: 0 }}
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
                          width: '60%',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          // borderWidth: 1,
                        }}>
                        <View
                          style={{
                            // width: '60%',
                            // borderWidth: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          {/* <MaterialCommunityIcons
                            // name="add-circle" refresh
                            name="hand-pointing-right"
                            color={isExamAvailable ? '#fff' : 'grey'}
                            size={40}
                            style={{marginRight: 10}}
                          /> */}
                          <Ionicons
                            style={{ marginRight: 10 }}
                            color={isExamAvailable ? '#fff' : 'grey'}
                            name="eye-outline"
                            size={28}
                          />
                          <Text
                            style={[
                              styles.question,
                              {
                                width: '75%',
                                color: isExamAvailable ? '#fff' : 'grey',
                                fontWeight: '800',
                                fontSize: 14,
                                // borderWidth: 1,
                              },
                            ]}>
                            {/* {`${scholarshipName} ${trans(
                              'Previous Year Questions:',
                            )} ${year}`} */}
                            {`${trans(
                              'Previous Year Questions:',
                            )} ${year}`}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          borderRadius: 5,
                          borderColor: '#fff',
                          backgroundColor:
                            isExamAvailable ||
                              (unlockstudent != undefined &&
                                unlockstudent.length > 0)
                              ? '#fff'
                              : 'grey',
                          width: '36%',
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
                                  paddingHorizontal: 15,
                                  paddingVertical: 10,
                                }}

                                onPress={() => {
                                  // const setData={
                                  //   stageid,
                                  //   boardid,
                                  //   scholarshipid,
                                  //   yearid,
                                  //   childid}
                                  // handleSetExamName('PreviousYear', dispatch);
                                  // dispatch(
                                  //   getPreviousYearQuestionSetAPI(setData                                   ),
                                  // );
                                  // if (child_id != '') {
                                  //   // dispatch(
                                  //   //   getChildDetailsAPI(
                                  //   //     undefined,
                                  //   //     undefined,
                                  //   //     child_id,
                                  //   //     undefined,
                                  //   //     undefined,
                                  //   //   ),
                                  //   // );
                                  // }

                                  navigation.navigate('PrevSubjectList', {
                                    screenName: 'PrevYearQues',
                                    subjectName: scholarshipName,
                                    chapterName: '',
                                    allPrevQuiz: quiz,
                                    prevYearStudentdata: studentdata,
                                    ExamQuestionsets: '',
                                    previousyearquestionid:
                                      previousyearquestionid,
                                    scholarship: scholarship,
                                    year: year,
                                    yearid: yearid,
                                    scholarshipid: scholarshipid,
                                    timeDuration: timeDuration,
                                    SubjectList: subjects,
                                  });
                                  // handleAsyncSetExamName('PreviousYear');
                                }}>
                                <Text
                                  style={{
                                    color: '#0f6f25',
                                    fontSize: 12,
                                    letterSpacing: 0.5,
                                    fontWeight: '900',
                                    textAlign: 'center',
                                  }}>
                                  {trans('Continue')}{' '}
                                  <AntDesign
                                    style={{ color: '#0f6f25' }}
                                    name="playcircleo"
                                    size={15}
                                  />
                                </Text>
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
                                style={{ color: '#ccc' }}
                                name="locked"
                                size={15}
                              />{' '}
                              {trans('Locked')}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                    {/* </>
                    ) : (
                      <></>
                    )} */}
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
                  borderColor: '#79851f',
                  // borderWidth: 1,
                }}>
                <View
                  style={{
                    width: 10,
                    backgroundColor: '#79851f',
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
                    style={{ marginHorizontal: 10, borderWidth: 0 }}
                    name={'infocirlce'}
                    size={20}
                    color={'#fff'}
                  />
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: '600',
                      fontSize: 15,
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
        {/* )} */}
        {/* )}  */}
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
        {lockedModalStatus && (
          <Modal transparent={true} visible={lockedModalStatus}>
            <View
              style={{
                // backgroundColor: '#fff',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                <View
                  style={{
                    borderRadius: 15,
                    borderWidth: 1,
                    minHeight: device_height * 0.35,
                    minWidth: device_width * 0.8,
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
                      <View style={{ alignItems: 'center', paddingVertical: 15 }}>
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
                            style={{ color: '#FFB901' }}
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
                            'You have to score atleast 90% in all active test',
                          )}
                        </Text>
                        <Text
                          style={{
                            textAlign: 'center',
                            width: device_width * 0.7,
                            fontSize: 17,
                            color: '#fff',
                            marginTop: 5,
                            // marginLeft: 5,
                            fontWeight: '900',
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
                        onPress={() => setLockedModalStatus(false)}>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 15,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            alignItems: 'center',
                          }}>
                          {trans('CLOSE')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
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
              <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
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
                          style={{ alignItems: 'center', paddingVertical: 15 }}>
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
                              style={{ color: 'gold' }}
                              name={'crown'}
                              size={30}
                            />
                          </View>

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
                            {trans(
                              'Oops! This feature is not included in the free trial. Upgrade to Premium for access to this feature!',
                            )}
                          </Text>
                        </View>
                      ) : (
                        <View
                          style={{ alignItems: 'center', paddingVertical: 15 }}>
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
                              style={{ color: 'gold' }}
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
                              {trans('Your seven days free trial has expired !')}
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
                              {trans(`Oops! It looks like you're trying to access content from a different board`)}
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
                        onPress={() => handlePayNow()}>
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
export default PrevYearQues;
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
