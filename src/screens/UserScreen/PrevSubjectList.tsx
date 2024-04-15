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
import React, {useEffect, useState, useRef} from 'react';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
//   import {
//     getAllSubjectExamAPI,
//     getChildDetailsAPI,
//     getPreviousYearQuestionAPI,
//     getPreviousYearQuestionSetAPI,
//     getScholarshipPremiumAPI,
//     getTopicBySubClassAPI,
//     handleAsyncSetExamName,
//     handleSetExamName,
//     updateParentProfile,
//   } from '../../redux/actions/Action';
import {
  emailRegex,
  markCalculation,
  name_reg,
  phoneRegex,
} from '../../../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {device_height, device_width} from '../style';
//   import LoadingScreen from '../AppScreens/LoadingScreen';

import {useTranslation} from 'react-i18next';
import moment from 'moment';
import Header from '../CommonScreens/Header';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../../redux/store/Store';
import {
  selectStudentInfo,
  selectStudentStatus,
} from '../../redux/reducers/StudentInfoReducer';
import {
  getPreviousYearQuestionSetAPI,
  selectPreviousQuestionSet,
  selectPreviousQuestionSetStatus,
} from '../../redux/reducers/GetPrevYearSetReducer';
import {getPreviousYearQuestionSetActionAPI} from '../../redux/actions/PreviousYearAPI';
import LoadingScreen from '../CommonScreens/LoadingScreen';
import { handleSetExamName } from '../../redux/reducers/ExamTestNameReducer';

const PrevSubjectList = ({route}) => {
  let {
    screenName = '',
    subjectName: scholarshipName = '',
    chapterName = '',
    // allPrevQuiz: quiz = [],
    // prevYearStudentdata: studentdata = [],
    ExamQuestionsets = '',
    previousyearquestionid = '',
    scholarship = '',
    year = '',
    yearid = '',
    scholarshipid = 'Navodaya1690353664697',
    timeDuration = '',
  } = route.params;

  console.log(scholarshipid, '$$$$$$$$$$$$$$scholarshipid...................');

  let SubjectList = [];
  let allPrevQuiz = [];
  let prevYearStudentdata = [];
  const {t: trans, i18n} = useTranslation();
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
  const count = useAppSelector(selectPreviousQuestionSetStatus);
  const childInfo = useAppSelector(selectStudentInfo) as ChildInfo;
  const PrevYearSet = useAppSelector(selectPreviousQuestionSet);
  const Prevloading = useAppSelector(selectPreviousQuestionSetStatus);

  // console.log(PrevYearSet, 'PrevYearSet..........');
  // console.log(count,"count...............%%%%%%%%%%%%%")
  // console.log(quizList, '================quizList');
  // const {PrevYearQuestion = [], loading: prevLoading = false} = useSelector(
  //   state => state.GetPrevYearQuesReducer,
  // );

  // const {PrevYearSet = [], loading = false} = useSelector(
  //   state => state.GetPrevYearSetReducer,
  // );
  //   const {PrevYearSet = [], loading: prevLoading = false} = useSelector(
  //     state => state.GetPrevYearSetReducer,
  //   );
  // console.log(PrevYearSet, 'PrevYearSet=============........');
  // const prevYearId=PrevYearSet.map(rec=>rec.yearid)
  //   const [quizList, setQuizList] = useState(quizListData);
  //   const [SubjectList, setSubjectList] = useState(PrevYearSet);
  // console.log(SubjectList, '=============SubjectList');
  // const [quizList, setQuizList] = useState(quiz);
  // console.log(prevYearId, 'prevYearId####################........');

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
    // coordinates='',
  } = childInfo;
  // console.log(id, '==================stage id................');
  const isReattempt = true;
  const [subjectLoading, setSubjectLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [asyncpremiumData, setasyncpremiumData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  // console.log(selectedItems, ' selectedItems==================');
  const [loading, setLoading] = useState(false);
  const [ansloading, setAnsLoading] = useState(false);
  const [ansIndex, setAnsIndex] = useState('');
  const [selectedId, setSelectedId] = useState(null);
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
  // console.log(ansIndex, 'ansIndex============');
  useEffect(() => {
    const qsSet = {
      stageid,
      boardid,
      scholarshipid,
      yearid,
      childid,
    };
    console.log(qsSet, 'qsSet................');
    dispatch(getPreviousYearQuestionSetAPI(qsSet));
  }, []);

  useEffect(() => {
    // if (SubjectList != '') {
    //   setTimeout(() => {
    //     setSubjectLoading(false);
    //   }, 1000);
    // } else {
    //   setSubjectLoading(false);
    // }

    navigation.addListener('focus', () => {
      // if(PrevYearSet.length<0){

      //   dispatch(
      //     getPreviousYearQuestionSetAPI(
      //       undefined,
      //       stageid,
      //       boardid,
      //       scholarshipid,
      //       yearid,
      //       childid,
      //       setLoading,
      //     ),
      //   );
      // }

      // dispatch(
      //   getPreviousYearQuestionAPI(
      //     undefined,
      //     stageid,
      //     boardid,
      //     scholarshipid,
      //     childid,
      //     undefined,
      //   ),
      // );
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.goBack();
        return true;
      });
      // if (childid != '') {
      //   dispatch(
      //     getScholarshipPremiumAPI(undefined, childid, stageid, boardid),
      //   );
      //   // console.log(childid, stageid, boardid, 'childid, stageid, boardid');
      // }
    });
    return () => {
      // if(PrevYearSet.length<0){
      //   dispatch(
      //     getPreviousYearQuestionSetAPI(
      //       undefined,
      //       stageid,
      //       boardid,
      //       scholarshipid,
      //       yearid,
      //       childid,
      //       undefined,
      //     ),
      //   );
      // }
      BackHandler.removeEventListener('hardwareBackPress', () => {
        navigation.goBack();
        return true;
      });
    };
  }, []);

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

  // const premiumdata = async () => {
  //   try {
  //     // console.log('fcmToken2')
  //     let premiumValue = '';
  //     await AsyncStorage.getItem('scholarArray').then(data => {
  //       premiumValue = data;
  //       // console.log(premiumValue, 'premiumValue......................');
  //       setasyncpremiumData(JSON.parse(premiumValue));
  //     });

  //     if (premiumValue !== null) {
  //       console.log(premiumValue);
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };

  // const {PremiumPurchase = []} = useSelector(
  //   state => state.GetPremiumPurchaseReducer,
  // );
  // console.log(PremiumPurchase, 'PremiumPurchase............');

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

  // const {
  //   no_of_Attempts = 0,
  //   correctanswer = 0,
  //   Skipped = 0,
  //   Wronganswer = 0,
  //   totalmark = 0,
  //   percentage = 0,
  // } = markCalculation(quiz);
  // useEffect(()=>{
  if (PrevYearSet.length > 0) {
    const matchingYearid = PrevYearSet?.find(child => child.yearid === yearid);
    // const [subjectwiseList, setSubjectwiseList] = useState(matchingYearid.subjects);
    // console.log(matchingYearid, '==================matchingYearid');

    if (matchingYearid) {
      // If a matching child is found, console log its childId
      // setSubjectwiseList(matchingYearid.subjects)
      (subjectName = matchingYearid.scholarshipName),
        // chapterName: '',
        (allPrevQuiz = matchingYearid.quiz),
        (prevYearStudentdata = matchingYearid.studentdata),
        // ExamQuestionsets: '',
        (previousyearquestionid = matchingYearid.previousyearquestionid),
        (scholarship = matchingYearid.scholarship),
        (year = matchingYearid.year),
        (scholarshipid = matchingYearid.scholarshipid),
        (timeDuration = matchingYearid.timeDuration),
        (SubjectList = matchingYearid.subjects),
        (yearid = matchingYearid.yearid);
      //
    } else {
      // If no matching child is found, print "No year found"
    }
  }

  // },[PrevYearSet])

  // const handleDisable = quizList => {
  //   let List = [...quizList];
  //   let count = 0;
  //   let DataList = [];
  //   console.log(quizList, '========================List');
  //   // List = List.filter(rec => rec.quiz.length > 0);
  //   List = List.map((row, index) => {
  //     const {studentdata = [], quiz = []} = row;
  //     if (studentdata.length == 0 && count == 0) {
  //       let passStudent = false;
  //       if (index != 0) {
  //         let totalMark = List[index - 1].studentdata[0].lastexamtotalmark;
  //         let secureMark =
  //           List[index - 1].studentdata[0].lastexamtotalsecurmark;
  //         // console.log(totalMark, secureMark, 'secureMark============');
  //         let percentage = ((secureMark / totalMark) * 100).toFixed(1);
  //         if (percentage >= 90) {
  //           passStudent = true;
  //         }
  //       }
  //       if (index == 0) DataList.push({...row, isExamAvailable: true});
  //       else if (passStudent) DataList.push({...row, isExamAvailable: true});
  //       else DataList.push({...row, isExamAvailable: false});
  //       count += 1;
  //     } else if (studentdata.length > 0 && count == 0) {
  //       DataList.push({...row, isExamAvailable: true});
  //     } else if (count != 0) {
  //       DataList.push({...row, isExamAvailable: false});
  //     }
  //     const lastindex = DataList.findLastIndex(object => {
  //       return object.isExamAvailable == true;
  //     });
  //     console.log(lastindex, '-----------------index');
  //     setQuizList(DataList);
  //     if (lastindex != -1) {
  //       setHighlightedIndex(lastindex);
  //       // scrollToHighlightedRow(lastindex);
  //       setTimeout(() => scrollToHighlightedRow(lastindex), 400);
  //     } else {
  //       setHighlightedIndex(0);
  //       // scrollToHighlightedRow(0);
  //       setTimeout(() => scrollToHighlightedRow(0), 400);
  //     }
  //     // console.log(DataList[2], 'DataList-----------',"handleDisable ended");
  //   });
  //   //   studentdata
  //   // quiz
  // };

  // useEffect(() => {
  //   if (SubjectList.length) {
  //     // console.log('handleDisable called');
  //     handleDisable(SubjectList);
  //   }
  // }, [SubjectList]);

  // useEffect(() => {
  //   if (quizList.length) {
  //     // console.log('handleDisable called');
  //     handleDisable(quizList);
  //   }
  // }, [quizList]);

  // const AllSubExamAttempted = subjectwiseList.find(rec => rec.isExamAvailable == false);
  // const AllExamAttempted = quizList.find(rec => rec.isExamAvailable == false);

  // const handlePayNow = () => {
  //   setPaymentModalStatus(false);
  //   // navigation.navigate('PremiumAccess');
  //   navigation.navigate('PremiumAccess');
  // };

  const handleAnswersheet = (
    subjectName,
    chapterName,
    examSet,
    quiz,
    correctanswer,
    totalmark,
    Wronganswer,
    Skipped,
    // prevStudentData,
    // previousyearquestionid,
    // scholarship,
    // year,
    // scholarshipid,
    // timeDuration,
    // subjects,
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
      {/* {subjectLoading == true ? (
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
          label1={trans('Subject List')}
          isbackIconShow={true}
          functionName={() => navigation.goBack()}
        />
        {Prevloading=='loading' ? (
          <LoadingScreen flag={Prevloading=='loading'} />
        ) : (
        <ScrollView ref={scrollViewRef}>
          <View
            style={{
              marginHorizontal: 10,
              backgroundColor: 'rgba(0,255,0, 0.05)',
            }}>
            {SubjectList.length > 0 ? (
              SubjectList.map((item, index) => {
                const {
                  id = '',
                  studentdata = [],
                  quiz = [],
                  subjectid: subjectId = '',
                  subjectname = '',
                  previousyearquestionid = '',
                  subjectwisepreviousyearquestionid = '',
                  scholarship = '',
                  // year = '',
                  isReattempt = studentdata.length ? true : false,
                  scholarshipid = '',
                  // isExamAvailable = false,
                  timeDuration = '',
                  ispremium = false,
                } = item;
                {
                  console.log(
                    studentdata,
                    'studentdata,,,,,,,,,,,,,,,,,,',
                    
                  );
                }
                let subjectiddata = [];
                let subdata = '';
                const filterdata = quiz.map(rec => {
                  if (rec.subjectid !== subdata) {
                    subdata = rec.subjectid;
                    subjectiddata.push(rec.subjectid);
                  }
                });
                let uniqueArray = [...new Set(subjectiddata)];
                let subjectArray = [];
                uniqueArray.map(row => {
                  let filterdata = quiz.filter(rec => rec.subjectid == row);
                  if (filterdata.length > 0) {
                    subjectArray.push({
                      subjectName: filterdata.length
                        ? filterdata[0].subjectname
                        : '',
                      questionLength: filterdata.length,
                    });
                  }
                });
                {
                  /* console.log(subjectArray[0], 'subjectArray---------'); */
                }

                {
                  /* let premiumFlag = index < 2 ? true : false;
                  if (PremiumPurchase.length) {
                    const selectedData = PremiumPurchase.find(
                      rec => rec.scholarshipid == scholarshipid,
                    );
                    if (selectedData != undefined) {
                      premiumFlag = true;
                    }
                  }
                  if (premiumFlag == false) {
                    let resultArr = PremiumPurchase.filter(o1 =>
                      asyncpremiumData.some(
                        o2 => o1.scholarshipid === o2.scholarshipId,
                      ),
                    );
                    if (resultArr.length == 0) {
                      premiumFlag = false;
                    } else {
                      premiumFlag = true;
                    } 
                    }
                    */
                }

                {
                  /* let isInfoFlag = false; */
                }

                {
                  /* if (
                    index > 0 &&
                    isExamAvailable == false &&
                    quizList[index - 1].isExamAvailable == true &&
                    AllSubExamAttempted !== undefined
                  )
                    isInfoFlag = true; */
                }
                return (
                  quiz.length > 0 && (
                    <TouchableOpacity
                      key={index}
                      disabled={true}
                      style={{
                        // elevation: 5,
                        width: '100%',
                        alignSelf: 'center',
                        backgroundColor: 'rgba(0,255,0, 0.05)',
                        padding: 10,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor:'#FFB901',
                        marginVertical: 6,
                      }}>
                      {studentdata.length > 0 && (
                        <View
                          style={{
                            // justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            // borderWidth: 1,
                          }}>
                          <MaterialCommunityIcons
                            name="hand-pointing-right"
                            color={'#fff'}
                            size={40}
                            style={{marginRight: 10}}
                          />
                          <Text
                            style={[
                              styles.question,
                              {
                                width: '75%',
                                // borderWidth: 1,
                                // color: '#FFB901',
                                color: '#fff',
                                fontWeight: '800',
                                fontSize: 14,
                                textTransform: 'capitalize',
                              },
                            ]}>
                            <Text>{scholarship}</Text>
                            {` ${trans('Previous Year')} ${subjectname} ${trans(
                              'Questions: ',
                            )}${year}`}
                          </Text>
                          <Text
                            style={[
                              styles.question,
                              {
                                // width: '92%',
                                marginLeft: 5,
                                color: '#2e35de',
                                fontWeight: '800',
                              },
                            ]}>
                            {' '}
                            {/* {contentset} */}
                          </Text>
                        </View>
                      )}

                      {studentdata.length > 0 ? (
                        <View style={{marginTop: 0}}>
                          {studentdata.map((item, rec) => {
                            const {
                              securmark = '',
                              wrongmark = '',
                              skipmark = '',
                              numberofattempt = '',
                              answerdetails = [],
                            } = item;

                            // {
                            //    console.log(numberofattempt, 'ITEM.............%%%%%%%%%%%%%',studentdata);
                            // }

                            const {
                              attemptDate = '',
                              totalmark: totalQS = '',
                              quiz: studentQuiz = [],
                              totalsecurmark = '',
                              totalwrongmark = '',
                              totalskipmark = 0,
                            } = answerdetails[0] || {};

                            const {
                              correctanswer = 0,
                              Skipped = 0,
                              Wronganswer = 0,
                              totalmark = 0,
                              percentage = 0,
                            } = markCalculation(studentQuiz);
                            let percentageSecure = (
                              (answerdetails[0].totalsecurmark /
                                answerdetails[0].totalmark) *
                              100
                            ).toFixed(1);
                            if (
                              answerdetails[0].totalmark < 10 &&
                              percentageSecure >= 80 &&
                              percentageSecure < 90
                            ) {
                              percentageSecure = 90;
                            }
                            {
                              /* console.log(percentageSecure, 'percentageSecure%%%%%%%%%%%%%%%%%%-----'); */
                            }

                            return (
                              <View key={rec}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                  }}>
                                  <View style={{width: '70%'}}>
                                    <>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          marginTop: 10,
                                        }}>
                                        <Text
                                          style={{
                                            // color:wrong?"red':'green',
                                            color: '#fff',
                                            fontSize: 14,
                                            width: '60%',
                                            fontWeight: '700',
                                            marginLeft: 20,
                                          }}>
                                          {trans('Total No. of Attempts')}
                                        </Text>
                                        <Text
                                          style={{
                                            textTransform: 'capitalize',
                                            color: '#fff',
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                          }}>
                                          {`: ${numberofattempt+1}`}
                                        </Text>
                                      </View>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                        }}>
                                        <Text
                                          style={{
                                            color: '#fff',
                                            fontSize: 14,
                                            width: '60%',
                                            fontWeight: '700',
                                            marginLeft: 20,
                                            marginBottom: 2,
                                          }}>
                                          {trans('Last Attempt on')}
                                        </Text>
                                        <Text
                                          style={{
                                            textTransform: 'capitalize',
                                            color: '#fff',
                                            fontSize: 14,
                                            fontWeight: '500',
                                          }}>
                                          {`: ${moment(
                                            answerdetails[0].attemptDate,
                                          ).format('DD/MM/YY')}`}
                                        </Text>
                                      </View>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                        }}>
                                        <Text
                                          style={{
                                            // color:wrong?"red':'green',
                                            color: '#fff',
                                            width: '60%',
                                            fontSize: 14,
                                            fontWeight: '700',
                                            marginLeft: 20,
                                            // marginTop: 10,
                                          }}>
                                          {trans('Total questions')}
                                        </Text>
                                        <Text
                                          style={{
                                            textTransform: 'capitalize',
                                            color: '#fff',
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                          }}>
                                          {`: ${answerdetails[0].totalmark}`}
                                        </Text>
                                      </View>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                        }}>
                                        <Text
                                          style={{
                                            // color:wrong?"red':'green',
                                            width: '60%',
                                            color: '#fff',
                                            fontSize: 14,
                                            fontWeight: '700',
                                            marginLeft: 20,
                                            // marginTop: 10,
                                          }}>
                                          {trans('Correct Answer')}
                                        </Text>
                                        <Text
                                          style={{
                                            textTransform: 'capitalize',
                                            color: '#fff',
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                          }}>
                                          {`: ${answerdetails[0].totalsecurmark}`}
                                        </Text>
                                      </View>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                        }}>
                                        <Text
                                          style={{
                                            // color:wrong?"red':'green',
                                            width: '60%',
                                            color: '#fff',
                                            fontSize: 14,
                                            fontWeight: '700',
                                            marginLeft: 20,
                                            // marginTop: 10,
                                          }}>
                                          {trans('Percentage')}%
                                        </Text>
                                        <Text
                                          style={{
                                            textTransform: 'capitalize',
                                            color:
                                              percentageSecure > 90
                                                ? 'lawngreen'
                                                : 'darkorange',
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                          }}>
                                          : {percentageSecure}%
                                          {/* {`: ${(
                                              (answerdetails[0].totalsecurmark /
                                                answerdetails[0].totalmark) *
                                              100
                                            ).toFixed(1)} %`} */}
                                        </Text>
                                      </View>
                                    </>
                                  </View>

                                  <View
                                    style={{
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: '27%',
                                    }}>
                                    {studentdata.length > 0 ? (
                                      <TouchableOpacity
                                        onPress={() => {
                                          dispatch(handleSetExamName(
                                            'PreviousYear',
                                            
                                          ))
                                          //  if (child_id != '') {
                                          //   dispatch(
                                          //     getChildDetailsAPI(
                                          //       undefined,
                                          //       undefined,
                                          //       child_id,
                                          //       undefined,
                                          //       undefined,
                                          //     ),
                                          //   );
                                          // }
                                          // handleSetExamDetails(
                                          //   'PreviousYear',
                                          //   subjectname,
                                          //   subjectId,
                                          //   '',
                                          //   true,
                                          //   quiz,
                                          //   studentdata,
                                          //   '',
                                          //   scholarship,
                                          //   SubjectList,
                                          //   year,
                                          //   scholarshipid,
                                          //   timeDuration,
                                          //   true,
                                          //   subjectwisepreviousyearquestionid,
                                          //   dispatch,
                                          // );

                                          navigation.navigate('PrevMockTest', {
                                            screenName: screenName,
                                            subjectName: subjectname,
                                            subjectId: subjectId,
                                            chapterName: '',
                                            isReattempt: true,
                                            quiz: quiz,
                                            studentdata: studentdata,
                                            ExamQuestionsets: '',
                                            scholarship: scholarship,
                                            SubjectList: SubjectList,
                                            year: year,
                                            scholarshipid: scholarshipid,
                                            timeDuration: timeDuration,
                                            subjectWise: true,
                                            previousyearquestionid:
                                              subjectwisepreviousyearquestionid,
                                          });
                                          // handleAsyncSetExamName(
                                          //   'PreviousYear',
                                          // );
                                        }}
                                        style={{
                                          alignItems: 'center',
                                          // marginRight: 10,
                                          justifyContent: 'center',
                                          paddingHorizontal: 5,
                                          paddingVertical: 7,
                                          borderRadius: 5,

                                          // borderColor: Colors.primary,
                                          // backgroundColor: Colors.primary,
                                        }}>
                                        <MaterialCommunityIcons
                                          name="refresh"
                                          color={'#FFB901'}
                                          size={40}
                                          // style={{marginRight: 10}}
                                        />
                                        <Text
                                          style={{
                                            // width: 210,
                                            color: '#FFB901',
                                            fontWeight: '900',
                                            fontSize: 12,
                                            letterSpacing: 0.5,
                                          }}>
                                          {trans('Reattempt')}
                                        </Text>
                                      </TouchableOpacity>
                                    ) : (
                                      <View
                                        style={{
                                          paddingHorizontal: 10,
                                          paddingVertical: 7,
                                          borderRadius: 5,
                                          borderColor: quiz.length
                                            ? '#FFB901'
                                            : 'grey',
                                          backgroundColor: quiz.length
                                            ? '#FFB901'
                                            : 'grey',
                                          width: '36%',
                                        }}>
                                        {studentdata.length == 0 && (
                                          <TouchableOpacity
                                            disabled={
                                              quiz.length ? false : true
                                            }
                                            onPress={() => {
                                              dispatch(handleSetExamName(
                                                'PreviousYear',
                                                
                                              ))
                                              // if (child_id != '') {
                                              //   dispatch(
                                              //     getChildDetailsAPI(
                                              //       undefined,
                                              //       child_id,
                                              //       undefined,
                                              //     ),
                                              //   );
                                              // }

                                              navigation.navigate(
                                                'PrevMockTest',
                                                {
                                                  screenName: screenName,
                                                  subjectName: subjectname,
                                                  subjectId: subjectId,
                                                  chapterName: '',
                                                  isReattempt: false,
                                                  quiz: quiz,
                                                  studentdata: studentdata,
                                                  ExamQuestionsets: '',
                                                  scholarship: scholarship,
                                                  SubjectList: SubjectList,
                                                  year: year,
                                                  scholarshipid: scholarshipid,
                                                  timeDuration: timeDuration,
                                                  subjectWise: true,
                                                  previousyearquestionid:
                                                    subjectwisepreviousyearquestionid,
                                                },
                                              );
                                              // handleAsyncSetExamName(
                                              //   'PreviousYear',
                                              // );
                                            }}>
                                            <Text
                                              style={{
                                                color: quiz.length
                                                  ? '#fff'
                                                  : '#def',
                                                fontSize: 12,
                                                letterSpacing: 0.5,
                                                fontWeight: '900',
                                                textAlign: 'center',
                                              }}>
                                              {trans('Start Test')}
                                            </Text>
                                          </TouchableOpacity>
                                        )}
                                      </View>
                                    )}
                                  </View>
                                </View>
                                <View
                                  style={{
                                    paddingHorizontal: 10,
                                    paddingVertical: 10,
                                    marginTop: 10,
                                    // borderRadius: 5,
                                    borderColor: Colors.primary,
                                    // backgroundColor: Colors.white,
                                    backgroundColor:'#FFB901',
                                    alignItems: 'center',
                                    marginHorizontal: -10,
                                    marginBottom: -10,
                                    borderTopWidth: 1,
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                    // width: '35%',
                                  }}>
                                  <TouchableOpacity
                                    disabled={ansloading == true}
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}
                                    onPress={() => {
                                      setAnsIndex(item);
                                      setAnsLoading(true);
                                      setTimeout(() => {
                                        setAnsLoading(false);
                                        // setAnsIndex(rec);
                                        dispatch(handleSetExamName(
                                          'PreviousYearList',
                                          
                                        ))
                                        handleAnswersheet(
                                          scholarship,
                                          null,
                                          null,
                                          studentQuiz,
                                          correctanswer,
                                          totalmark,
                                          Wronganswer,
                                          Skipped,
                                          // prevYearStudentdata,
                                          // previousyearquestionid,
                                          // scholarship,
                                          // year,
                                          // scholarshipid,
                                          // timeDuration,
                                          // subjectname,
                                        );
                                      }, 1000);
                                    }}>
                                    {ansIndex == item && ansloading == true ? (
                                      <ActivityIndicator
                                        size="small"
                                        color={'green'}
                                        style={{
                                          alignSelf: 'flex-start',
                                          paddingRight: 10,
                                          fontSize: 12,
                                        }}
                                      />
                                    ) : (
                                      <></>
                                    )}
                                    <Text
                                      style={{
                                        // color: '#FFB901',
                                        color: 'green',
                                        fontSize: 15,
                                        letterSpacing: 0.5,
                                        fontWeight: '900',
                                      }}>
                                      {trans(`View Answers`)}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            );
                          })}
                        </View>
                      ) : (
                        <>
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
                                <MaterialCommunityIcons
                                  name="hand-pointing-right"
                                  color={'#fff'}
                                  size={40}
                                  style={{marginRight: 10}}
                                />
                                <Text
                                  style={[
                                    styles.question,
                                    {
                                      width: '75%',
                                      // color: '#FFB901',
                                      color: '#fff',
                                      fontWeight: '800',
                                      fontSize: 14,
                                      textTransform: 'capitalize',
                                    },
                                  ]}>
                                  <Text>{scholarship}</Text>
                                  {` ${trans(
                                    'Previous Year',
                                  )} ${subjectname} ${trans(
                                    'Questions: ',
                                  )}${year}`}
                                </Text>
                              </View>

                              <>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    // borderWidth: 1,
                                    width: '100%',
                                    justifyContent: 'space-between',
                                  }}>
                                  <Text
                                    style={{
                                      // color:wrong?"red':'green',
                                      // width: '100%',
                                      color: '#fff',
                                      fontSize: 14,
                                      fontWeight: '700',
                                      width: '80%',
                                      // borderWidth: 1,
                                      // paddingLeft: 20,
                                      // marginTop: 10,
                                    }}>
                                    {trans('Total Question')}
                                  </Text>
                                  <Text
                                    style={{
                                      textTransform: 'capitalize',
                                      color: '#fff',
                                      width: '20%',
                                      // borderWidth: 1,
                                      // percentageSecure > 90
                                      //   ? 'green'
                                      //   :
                                      // 'darkorange',
                                      fontSize: 14,
                                      fontWeight: 'bold',
                                    }}>
                                    : {quiz.length}
                                  </Text>
                                </View>

                                <View
                                  style={{
                                    borderWidth: 0,
                                    width: device_width * 0.72,
                                  }}>
                                  {timeDuration ? (
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        // borderWidth: 1,
                                        justifyContent: 'space-between',
                                      }}>
                                      <Text
                                        style={{
                                          // color:wrong?"red':'green',
                                          // width: '100%',
                                          color: '#fff',
                                          fontSize: 14,
                                          fontWeight: '700',
                                          // width: '45%',
                                          // marginLeft: 20,
                                          // marginTop: 10,
                                        }}>
                                        {trans('Time Duration')}
                                      </Text>
                                      <Text
                                        style={{
                                          textTransform: 'capitalize',
                                          color: '#fff',
                                          width: '40%',
                                          // percentageSecure > 90
                                          //   ? 'green'
                                          //   :
                                          // 'darkorange',
                                          fontSize: 14,
                                          fontWeight: 'bold',
                                        }}>
                                        : {timeDuration} {trans('Mins.')}
                                      </Text>
                                    </View>
                                  ) : (
                                    <></>
                                  )}
                                </View>
                              </>
                            </View>
                            <View
                              style={{
                                borderRadius: 5,
                                borderColor: quiz.length ? '#FFB901' : '#def',
                                backgroundColor: quiz.length ? '#FFB901' : '#def',
                                width: '35%',
                                alignItems: 'center',
                                // borderWidth: 1,
                              }}>
                              <TouchableOpacity
                                disabled={quiz.length ? false : true}
                                style={{
                                  paddingHorizontal: 10,
                                  paddingVertical: 10,
                                }}
                                onPress={() => {
                                  dispatch(handleSetExamName('PreviousYear'))
                                  // if (child_id != '') {
                                  //   dispatch(
                                  //     getChildDetailsAPI(
                                  //       undefined,
                                  //       undefined,
                                  //       child_id,
                                  //       undefined,
                                  //       undefined,
                                  //     ),
                                  //   );
                                  // }

                                  navigation.navigate('PrevMockTest', {
                                    screenName: screenName,
                                    subjectName: subjectname,
                                    subjectId: subjectId,
                                    chapterName: '',
                                    isReattempt: false,
                                    quiz: quiz,
                                    studentdata: studentdata,
                                    ExamQuestionsets: '',
                                    scholarship: scholarship,
                                    SubjectList: SubjectList,
                                    year: year,
                                    scholarshipid: scholarshipid,
                                    timeDuration: timeDuration,
                                    subjectWise: true,
                                    previousyearquestionid:
                                      subjectwisepreviousyearquestionid,
                                  });
                                  // handleAsyncSetExamName('PreviousYear');
                                }}>
                                <Text
                                  style={{
                                    color: quiz.length ? '#0f6f25' : '#def',
                                    fontSize: 12,
                                    letterSpacing: 0.5,
                                    fontWeight: '900',
                                    textAlign: 'center',
                                  }}>
                                  <AntDesign
                                    style={{
                                      color: quiz.length ? '#0f6f25' : '#def',
                                    }}
                                    name="playcircleo"
                                    size={15}
                                  />{' '}
                                  {trans('Start Test')}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </>
                      )}
                    </TouchableOpacity>
                  )
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
                  <MaterialIcons name="info" color={'#fff'} size={30} />
                  <Text
                    style={{
                      fontSize: 15,
                      width: '80%',
                      color: '#0f6f25',
                      fontWeight: '600',
                      textAlign: 'center',
                      alignSelf: 'center',
                    }}>
                    {'   '}
                    {trans('Currently No Contents Added')}
                  </Text>
                </View>
              </View>
            )}
            {allPrevQuiz.length > 0 ? (
              <>
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
                    borderWidth: 2,
                    borderColor: '#fff',
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
                      fontWeight: '700',
                      fontSize: 13,
                      textAlign: 'center',
                      // borderWidth: 1,
                      // borderLeftWidth:1,
                      width: '85%',
                    }}>
                    {trans(
                      'You have to score atleast 90% to attempt next locked test ',
                    )}
                  </Text>
                </View>
                <TouchableOpacity
                  // key={index}
                  disabled={true}
                  style={{
                    // elevation: 5,
                    width: '100%',
                    alignSelf: 'center',
                    backgroundColor: 'rgba(0,255,0, 0.05)',
                    padding: 10,
                    borderRadius: 10,
                    marginVertical: 10,
                    // borderWidth: 1,
                    borderWidth: 3,
                    borderColor: 'burlywood',
                  }}>
                  <>
                    {prevYearStudentdata.length > 0 && (
                      <View
                        style={{
                          // justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          // borderWidth: 1,
                        }}>
                        <MaterialCommunityIcons
                          name="hand-pointing-right"
                          color={'#fff'}
                          size={40}
                          style={{marginRight: 10}}
                        />
                        <Text
                          style={[
                            styles.question,
                            {
                              width: '75%',
                              // borderWidth: 1,
                              // color: '#FFB901',
                              color: '#fff',
                              fontWeight: '800',
                              fontSize: 14,
                            },
                          ]}>
                          <Text style={{textTransform: 'capitalize'}}>
                            {scholarship}
                          </Text>
                          {` ${trans(
                            'Previous Year Miscellaneous Questions:',
                          )} ${year}`}
                        </Text>
                        <Text
                          style={[
                            styles.question,
                            {
                              // width: '92%',
                              marginLeft: 5,
                              color: '#2e35de',
                              fontWeight: '800',
                            },
                          ]}>
                          {' '}
                          {/* {contentset} */}
                        </Text>
                      </View>
                    )}

                    {prevYearStudentdata.length > 0 ? (
                      <View style={{marginTop: 0}}>
                        {prevYearStudentdata.map((item, rec) => {
                          const {
                            securmark = '',
                            wrongmark = '',
                            skipmark = '',
                            numberofattempt = '',
                            answerdetails = [],
                          } = item;

                          // {
                          //    console.log(numberofattempt, 'numberofattempt.............%%%%%%%%%%%%%prevYearStudentdata'); 
                          // }

                          const {
                            attemptDate = '',
                            totalmark: totalQS = '',
                            quiz: studentQuiz = [],
                            totalsecurmark = '',
                            totalwrongmark = '',
                            totalskipmark = 0,
                          } = answerdetails[0] || {};

                          {
                            /* console.log(
                                answerdetails[0].totalsecurmark,
                                answerdetails[0].totalwrongmark,
                                answerdetails[0].totalmark,
    
                                '************answerdetails[0]................',
                              ); */
                          }
                          const {
                            correctanswer = 0,
                            Skipped = 0,
                            Wronganswer = 0,
                            totalmark = 0,
                            percentage = 0,
                          } = markCalculation(studentQuiz);
                          let percentageSecure = (
                            (answerdetails[0].totalsecurmark /
                              answerdetails[0].totalmark) *
                            100
                          ).toFixed(1);
                          if (
                            answerdetails[0].totalmark < 10 &&
                            percentageSecure >= 80 &&
                            percentageSecure < 90
                          ) {
                            percentageSecure = 90;
                          }
                          {
                            /* console.log(percentageSecure, 'percentageSecure%%%%%%%%%%%%%%%%%%-----'); */
                          }

                          return (
                            <View key={rec}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}>
                                <View style={{width: '70%'}}>
                                  <>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: 10,
                                      }}>
                                      <Text
                                        style={{
                                          // color:wrong?"red':'green',
                                          color: '#fff',
                                          fontSize: 14,
                                          width: '60%',
                                          fontWeight: '700',
                                          marginLeft: 20,
                                        }}>
                                        {trans('Total No. of Attempts')}
                                      </Text>
                                      <Text
                                        style={{
                                          textTransform: 'capitalize',
                                          color: '#fff',
                                          fontSize: 14,
                                          fontWeight: 'bold',
                                        }}>
                                        {`: ${numberofattempt}`}
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                      }}>
                                      <Text
                                        style={{
                                          color: '#fff',
                                          fontSize: 14,
                                          width: '60%',
                                          fontWeight: '700',
                                          marginLeft: 20,
                                          marginBottom: 2,
                                        }}>
                                        {trans('Last Attempt on')}
                                      </Text>
                                      <Text
                                        style={{
                                          textTransform: 'capitalize',
                                          color: '#fff',
                                          fontSize: 14,
                                          fontWeight: '500',
                                        }}>
                                        {`: ${moment(
                                          answerdetails[0].attemptDate,
                                        ).format('DD/MM/YY')}`}
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                      }}>
                                      <Text
                                        style={{
                                          // color:wrong?"red':'green',
                                          color: '#fff',
                                          width: '60%',
                                          fontSize: 14,
                                          fontWeight: '700',
                                          marginLeft: 20,
                                          // marginTop: 10,
                                        }}>
                                        {trans('Total questions')}
                                      </Text>
                                      <Text
                                        style={{
                                          textTransform: 'capitalize',
                                          color: '#fff',
                                          fontSize: 14,
                                          fontWeight: 'bold',
                                        }}>
                                        {`: ${answerdetails[0].totalmark}`}
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                      }}>
                                      <Text
                                        style={{
                                          // color:wrong?"red':'green',
                                          width: '60%',
                                          color: '#fff',
                                          fontSize: 14,
                                          fontWeight: '700',
                                          marginLeft: 20,
                                          // marginTop: 10,
                                        }}>
                                        {trans('Correct Answer')}
                                      </Text>
                                      <Text
                                        style={{
                                          textTransform: 'capitalize',
                                          color: '#fff',
                                          fontSize: 14,
                                          fontWeight: 'bold',
                                        }}>
                                        {`: ${answerdetails[0].totalsecurmark}`}
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                      }}>
                                      <Text
                                        style={{
                                          // color:wrong?"red':'green',
                                          width: '60%',
                                          color: '#fff',
                                          fontSize: 14,
                                          fontWeight: '700',
                                          marginLeft: 20,
                                          // marginTop: 10,
                                        }}>
                                        {trans('Percentage')}%
                                      </Text>
                                      <Text
                                        style={{
                                          textTransform: 'capitalize',
                                          color:
                                            percentageSecure > 90
                                              ? 'lawngreen'
                                              : 'darkorange',
                                          fontSize: 14,
                                          fontWeight: 'bold',
                                        }}>
                                        : {percentageSecure}%
                                        {/* {`: ${(
                                              (answerdetails[0].totalsecurmark /
                                                answerdetails[0].totalmark) *
                                              100
                                            ).toFixed(1)} %`} */}
                                      </Text>
                                    </View>
                                  </>
                                </View>

                                <>
                                  <View
                                    style={{
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: '27%',
                                    }}>
                                    {prevYearStudentdata.length > 0 ? (
                                      <TouchableOpacity
                                        onPress={() => {
                                          // let quizData = [...QData];
                                          // if (isReattempt) {
                                          //   quizData = quizData.map(rec => {
                                          //     return {...rec, selectedAns: ''};
                                          //   });
                                          // }
                                          // {
                                          //   console.log(
                                          //     quizData,
                                          //     'quizData///////////////////',
                                          //   );
                                          // }
                                          dispatch(handleSetExamName(
                                            'PreviousYear',
                                            // scholarshipid,
                                            // boardid,
                                            // stage,
                                            // childid,
                                            // subjectid,
                                            // scholarshipName,
                                            // stageid,
                                            
                                          ))
                                          // if (child_id != '') {
                                          //   dispatch(
                                          //     getChildDetailsAPI(
                                          //       undefined,
                                          //       undefined,
                                          //       child_id,
                                          //       undefined,
                                          //       undefined,
                                          //     ),
                                          //   );
                                          // }

                                          navigation.navigate('PrevMockTest', {
                                            screenName: screenName,
                                            subjectName: scholarship,
                                            subjectId: '',
                                            chapterName: '',
                                            isReattempt: true,
                                            quiz: allPrevQuiz,
                                            studentdata: prevYearStudentdata,
                                            ExamQuestionsets: '',
                                            scholarship: scholarship,
                                            SubjectList: SubjectList,
                                            year: year,
                                            scholarshipid: scholarshipid,
                                            timeDuration: timeDuration,
                                            subjectWise: false,
                                            previousyearquestionid:
                                              previousyearquestionid,
                                          });
                                          // handleAsyncSetExamName(
                                          //   'PreviousYear',
                                          // );
                                        }}
                                        style={{
                                          alignItems: 'center',
                                          // marginRight: 10,
                                          justifyContent: 'center',
                                          paddingHorizontal: 5,
                                          paddingVertical: 7,
                                          borderRadius: 5,

                                          // borderColor: "#fff",
                                          // backgroundColor: "#fff",
                                        }}>
                                        <MaterialCommunityIcons
                                          // name="add-circle"
                                          name="refresh"
                                          color={'#FFB901'}
                                          size={40}
                                          // style={{marginRight: 10}}
                                        />
                                        <Text
                                          style={{
                                            // width: 210,
                                            color: '#FFB901',
                                            fontWeight: '900',
                                            fontSize: 12,
                                            letterSpacing: 0.5,
                                          }}>
                                          {trans('Reattempt')}
                                        </Text>
                                      </TouchableOpacity>
                                    ) : (
                                      <View
                                        style={{
                                          paddingHorizontal: 10,
                                          paddingVertical: 7,
                                          borderRadius: 5,
                                          borderColor: allPrevQuiz.length
                                            ? '#FFB901'
                                            : 'grey',
                                          backgroundColor: allPrevQuiz.length
                                            ? '#FFB901'
                                            : 'grey',
                                          width: '36%',
                                        }}>
                                        {prevYearStudentdata.length == 0 && (
                                          <TouchableOpacity
                                            disabled={
                                              allPrevQuiz.length ? false : true
                                            }
                                            onPress={() => {
                                              dispatch(handleSetExamName(
                                                'PreviousYear',
                                                // scholarshipid,
                                                // boardid,
                                                // stage,
                                                // childid,
                                                // subjectid,
                                                // scholarshipName,
                                                // stageid,
                                                
                                              ))
                                              // if (child_id != '') {
                                              //   dispatch(
                                              //     getChildDetailsAPI(
                                              //       undefined,
                                              //       child_id,
                                              //       undefined,
                                              //     ),
                                              //   );
                                              // }

                                              navigation.navigate(
                                                'PrevMockTest',
                                                {
                                                  screenName: screenName,
                                                  subjectName: scholarship,
                                                  subjectId: '',
                                                  chapterName: '',
                                                  isReattempt: false,
                                                  quiz: allPrevQuiz,
                                                  studentdata:
                                                    prevYearStudentdata,
                                                  ExamQuestionsets: '',
                                                  scholarship: scholarship,
                                                  SubjectList: SubjectList,
                                                  year: year,
                                                  scholarshipid: scholarshipid,
                                                  timeDuration: timeDuration,
                                                  subjectWise: false,
                                                  previousyearquestionid:
                                                    previousyearquestionid,
                                                },
                                              );
                                              // handleAsyncSetExamName(
                                              //   'PreviousYear',
                                              // );
                                            }}>
                                            <Text
                                              style={{
                                                color: allPrevQuiz.length
                                                  ? '#fff'
                                                  : '#def',
                                                fontSize: 12,
                                                letterSpacing: 0.5,
                                                fontWeight: '900',
                                                textAlign: 'center',
                                              }}>
                                              {trans('Start Test')}
                                            </Text>
                                          </TouchableOpacity>
                                        )}
                                      </View>
                                    )}
                                  </View>
                                </>
                              </View>
                              <View
                                style={{
                                  paddingHorizontal: 10,
                                  paddingVertical: 10,
                                  marginTop: 10,
                                  borderRadius: 5,
                                  borderColor: '#fff',
                                  // backgroundColor: Colors.white,
                                  backgroundColor:'#FFB901',
                                  alignItems: 'center',
                                  marginHorizontal: -10,
                                  marginBottom: -10,
                                  borderTopWidth: 1,
                                  borderBottomLeftRadius: 10,
                                  borderBottomRightRadius: 10,
                                  // width: '35%',
                                }}>
                                <TouchableOpacity
                                  disabled={ansloading == true}
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}
                                  onPress={() => {
                                    setAnsIndex(item);
                                    setAnsLoading(true);
                                    setTimeout(() => {
                                      setAnsLoading(false);
                                      // setAnsIndex(index);
                                      dispatch(handleSetExamName(
                                        'PreviousYearList',
                                      
                                      ))
                                      handleAnswersheet(
                                        scholarship,
                                        null,
                                        null,
                                        studentQuiz,
                                        correctanswer,
                                        totalmark,
                                        Wronganswer,
                                        Skipped,
                                        // prevYearStudentdata,
                                        // previousyearquestionid,
                                        // scholarship,
                                        // year,
                                        // scholarshipid,
                                        // timeDuration,
                                        // null,
                                      );
                                    }, 1000);
                                  }}>
                                  {ansIndex == item && ansloading == true ? (
                                    <ActivityIndicator
                                      size="small"
                                      color={'green'}
                                      style={{
                                        alignSelf: 'flex-start',
                                        paddingRight: 10,
                                        fontSize: 12,
                                      }}
                                    />
                                  ) : (
                                    <></>
                                  )}
                                  <Text
                                    style={{
                                      // color: '#FFB901',
                                      color: 'green',
                                      fontSize: 15,
                                      letterSpacing: 0.5,
                                      fontWeight: '900',
                                    }}>
                                    {trans(`View Answers`)}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    ) : (
                      <>
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
                              <MaterialCommunityIcons
                                name="hand-pointing-right"
                                color={'#fff'}
                                size={40}
                                style={{marginRight: 10}}
                              />
                              <Text
                                style={[
                                  styles.question,
                                  {
                                    width: '75%',
                                    // color: '#FFB901',
                                    color: '#fff',
                                    fontWeight: '800',
                                    fontSize: 14,
                                    fontSize: 14,
                                  },
                                ]}>
                                <Text style={{textTransform: 'capitalize'}}>
                                  {scholarship}
                                </Text>
                                {` ${trans(
                                  'Previous Year Miscellaneous Questions:',
                                )} ${year}`}
                              </Text>
                            </View>

                            <>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  // borderWidth: 1,
                                  width: '100%',
                                  justifyContent: 'space-between',
                                }}>
                                <Text
                                  style={{
                                    // color:wrong?"red':'green',
                                    // width: '100%',
                                    color: '#fff',
                                    fontSize: 14,
                                    fontWeight: '700',
                                    width: '80%',
                                    // borderWidth: 1,
                                    // paddingLeft: 20,
                                    // marginTop: 10,
                                  }}>
                                  {trans('Total Question')}
                                </Text>
                                <Text
                                  style={{
                                    textTransform: 'capitalize',
                                    color: '#fff',
                                    width: '20%',
                                    // borderWidth: 1,
                                    // percentageSecure > 90
                                    //   ? 'green'
                                    //   :
                                    // 'darkorange',
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                  }}>
                                  : {allPrevQuiz.length}
                                </Text>
                              </View>
                              {/* {subjectArray.map(
                                        (
                                          {subjectName = '', questionLength = ''},
                                          index,
                                        ) => {
                                          return (
                                            <View
                                              key={index}
                                              style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                // borderWidth: 1,
                                                width: '100%',
                                                justifyContent: 'space-between',
                                              }}>
                                              <Text
                                                style={{
                                                  // color:wrong?"red':'green',
                                                  // width: '100%',
                                                  color: '#fff',
                                                  fontSize: 14,
                                                  fontWeight: '700',
                                                  width: '80%',
                                                  // borderWidth: 1,
                                                  // paddingLeft: 20,
                                                  // marginTop: 10,
                                                }}>
                                                {trans(
                                                  subjectName +
                                                    ' ' +
                                                    trans('Question'),
                                                )}
                                              </Text>
                                              <Text
                                                style={{
                                                  textTransform: 'capitalize',
                                                  color: '#333',
                                                  width: '20%',
                                                  // borderWidth: 1,
                                                  // percentageSecure > 90
                                                  //   ? 'green'
                                                  //   :
                                                  // 'darkorange',
                                                  fontSize: 14,
                                                  fontWeight: 'bold',
                                                }}>
                                                : {questionLength}
                                              </Text>
                                            </View>
                                          );
                                        },
                                      )} */}
                              <View
                                style={{
                                  borderWidth: 0,
                                  width: device_width * 0.72,
                                }}>
                                {timeDuration ? (
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      // borderWidth: 1,
                                      justifyContent: 'space-between',
                                    }}>
                                    <Text
                                      style={{
                                        // color:wrong?"red':'green',
                                        // width: '100%',
                                        color: '#fff',
                                        fontSize: 14,
                                        fontWeight: '700',
                                        // width: '45%',
                                        // marginLeft: 20,
                                        // marginTop: 10,
                                      }}>
                                      {trans('Time Duration')}
                                    </Text>
                                    <Text
                                      style={{
                                        textTransform: 'capitalize',
                                        color: '#fff',
                                        width: '40%',
                                        // percentageSecure > 90
                                        //   ? 'green'
                                        //   :
                                        // 'darkorange',
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                      }}>
                                      : {timeDuration} {trans('Mins.')}
                                    </Text>
                                  </View>
                                ) : (
                                  <></>
                                )}
                              </View>
                            </>
                          </View>
                          <View
                            style={{
                              borderRadius: 5,
                              borderColor: allPrevQuiz.length ? '#FFB901' : 'grey',
                              backgroundColor: allPrevQuiz.length
                                ? '#FFB901'
                                : 'grey',
                              width: '35%',
                              alignItems: 'center',
                              // borderWidth: 1,
                            }}>
                            <TouchableOpacity
                              style={{
                                paddingHorizontal: 10,
                                paddingVertical: 10,
                              }}
                              disabled={allPrevQuiz.length ? false : true}
                              onPress={() => {
                                dispatch(handleSetExamName(
                                  'PreviousYear',
                                  // scholarshipid,
                                  // boardid,
                                  // stage,
                                  // childid,
                                  // subjectid,
                                  // scholarshipName,
                                  // stageid,
                                  
                                ))
                                // if (child_id != '') {
                                //   dispatch(
                                //     getChildDetailsAPI(
                                //       undefined,
                                //       undefined,
                                //       child_id,
                                //       undefined,
                                //       undefined,
                                //     ),
                                //   );
                                // }

                                navigation.navigate('PrevMockTest', {
                                  screenName: screenName,
                                  subjectName: scholarship,
                                  subjectId: '',
                                  chapterName: '',
                                  isReattempt: false,
                                  quiz: allPrevQuiz,
                                  studentdata: prevYearStudentdata,
                                  ExamQuestionsets: '',
                                  scholarship: scholarship,
                                  SubjectList: SubjectList,
                                  year: year,
                                  scholarshipid: scholarshipid,
                                  timeDuration: timeDuration,
                                  subjectWise: false,
                                  previousyearquestionid:
                                    previousyearquestionid,
                                });
                                // handleAsyncSetExamName('PreviousYear');
                              }}>
                              <Text
                                style={{
                                  color: allPrevQuiz.length
                                    ? '#0f6f25'
                                    : '#def',
                                  fontSize: 12,
                                  letterSpacing: 0.5,
                                  fontWeight: '900',
                                  textAlign: 'center',
                                }}>
                                <AntDesign
                                  style={{color: '#0f6f25'}}
                                  name="playcircleo"
                                  size={15}
                                />{' '}
                                {trans('Start Test')}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </>
                    )}
                  </>
                </TouchableOpacity>
              </>
            ) : (
              <></>
            )}
          </View>
        </ScrollView>
        )} 
        {/* )} */}
        {/* {lockedModalStatus && (
          <Modal transparent={true} visible={lockedModalStatus}>
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
                    backgroundColor: '#fff',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <View style={{alignItems: 'center', paddingVertical: 15}}>
                        <View
                          style={{
                            // borderWidth: 0.8,
                            borderColor: 'green',
                            borderRadius: 50,
                            padding: 10,
                            elevation: 15,
                            backgroundColor: '#dee',
                          }}>
                          <Fontisto
                            style={{color: Colors.primary}}
                            name={'locked'}
                            size={30}
                          />
                        </View>
  
                        <Text
                          style={{
                            textAlign: 'center',
                            width: device_width * 0.8,
                            fontSize: 17,
                            color: "#0f6f25",
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
                            fontSize: 15,
                            color: '#666',
                            marginTop: 5,
                            // marginLeft: 5,
                            fontWeight: '500',
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
                          backgroundColor: Colors.primary,
                          // width: '100%',
                          paddingVertical: 5,
                          justifyContent: 'center',
                        }}
                        onPress={() => setLockedModalStatus(false)}>
                        <Text
                          style={{
                            color: 'white',
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
        )} */}
        {/* {paymentModalStatus && (
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
                    minHeight: device_height * 0.35,
                    minWidth: device_width * 0.8,
                    backgroundColor: '#fff',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <View style={{alignItems: 'center', paddingVertical: 15}}>
                        <View
                          style={{
                            // borderWidth: 0.8,
                            borderColor: 'green',
                            borderRadius: 50,
                            padding: 10,
                            elevation: 15,
                            backgroundColor: '#dee',
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
                            fontSize: 17,
                            color: "#0f6f25",
                            marginTop: 10,
                            marginLeft: 10,
                            fontWeight: '900',
                          }}>
                          {trans('You have to purchase premium')}
                        </Text>
                        <Text
                          style={{
                            textAlign: 'center',
                            width: device_width * 0.7,
                            fontSize: 15,
                            color: '#666',
                            marginTop: 5,
                            // marginLeft: 5,
                            fontWeight: '500',
                          }}>
                          {trans('to access this feature')}
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
                          backgroundColor: Colors.primary,
                          // width: '100%',
                          paddingVertical: 5,
                          justifyContent: 'center',
                        }}
                        onPress={() => handlePayNow()}>
                        <Text
                          style={{
                            color: 'white',
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
        )} */}
      </ImageBackground>
    </SafeAreaView>
  );
};
export default PrevSubjectList;
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
    // elevation: 20,
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
