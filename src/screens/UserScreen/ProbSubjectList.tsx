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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {useEffect, useRef, useState} from 'react';
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
import Fontisto from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
// import {
//   getChildDetailsAPI,
//   getChildProbableQuestionDetailsAPI,
//   getMostProbableQuestionAPI,
//   getMostProbableQuestionSetAPI,
//   getScholarshipPremiumAPI,
//   handleAsyncSetExamName,
//   handleSetExamName,
// } from '../../redux/actions/Action';
import {
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
import {

  getMostProbableQuestionSetAPI,
  selectMostProbableQsSetData,
  selectMostProbableQsSetStatus,
} from '../../redux/reducers/GetMostProbableQuestionSetReducer';
import Header from '../CommonScreens/Header';
import LoadingScreen from '../CommonScreens/LoadingScreen';
import {useAppSelector} from '../../redux/store/reducerHook';
import {selectStudentInfo} from '../../redux/reducers/StudentInfoReducer';
import { handleSetExamName } from '../../redux/reducers/ExamTestNameReducer';

const ProbSubjectList = ({navigation, route}) => {
  const dispatch = useDispatch<any>();
  
  const {t: trans, i18n} = useTranslation();
  let {
    screenName = '',
    setid = '',
    examSet = '',
    subjectName = '',
    chapterName = '',
    // quiz = [],
    // studentdata = [],
    // SubjectList: subjectList = [],
    ExamQuestionsets = '',
    mostprobablequestionid = '',
    scholarshipid = '',
    scholarship: scholarshipName = '',
    ProbSubjectId = '',
    ProbSubjectName = '',
    timeDuration = '',
  } = route.params;
  console.log(
    scholarshipName,
    '=============route.params-mostprobablequestionid',
    scholarshipid,
    'scholarshipid......',
    setid,
    "setid..................................."
  );
  let quiz = [];
  let studentdata = [];
  let subjectList = [];

  // const {ProbableQuestions = []} = useSelector(
  //   state => state.GetMostProbQuesReducer,
  // );

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
  const ProbableQuestions = useAppSelector(selectMostProbableQsSetData);
  const ProbaleDataLoading = useAppSelector(selectMostProbableQsSetStatus);
  console.log(ProbableQuestions, '........................ProbableQuestions');
  // const {ProbableQuestionsSet: ProbableQuestions = []} = useSelector(
  //   state => state.GetMostProbableQuestionSetReducer,
  // );
  // const [quizList, setQuizList] = useState(quizListData);
  // const [quizList, setQuizList] = useState(quiz);
  // const [subjectwiseList, setSubjectwiseList] = useState(subjectList);

  console.log(
    ProbableQuestions,
    '================ProbableQuestions quizList-----------',
  );
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

  const matchingSetid = ProbableQuestions.find(child => child.setid === setid);
  // const [subjectwiseList, setSubjectwiseList] = useState(matchingYearid.subjects);
// console.log(matchingSetid,"matchingSetid.................")
  if (matchingSetid) {
    // If a matching child is found, console log its childId
    // setSubjectwiseList(matchingYearid.subjects)
    (examSet = matchingSetid.setname),
      (setid = matchingSetid.setid),
      // (mostprobablequestionid = matchingSetid.mostprobablequestionid),
      (ProbSubjectId = matchingSetid.subjectid);
    ProbSubjectName = matchingSetid.subjectname;
    (quiz = matchingSetid.quiz),
      (studentdata = matchingSetid.studentdata),
      // ExamQuestionsets: '',
      (scholarshipName = matchingSetid.scholarship),
      (scholarshipid = matchingSetid.scholarshipid),
      (timeDuration = matchingSetid.timeDuration),
      (subjectList = matchingSetid.subjects);
  }
 

  useEffect(() => {
    navigation.addListener('focus', () => {
      const probsetData = {
        stageid,
        boardid,
        scholarshipid,
        childid,
        setid,
      }
  console.log(probsetData,"probsetData...................")
      dispatch(getMostProbableQuestionSetAPI(probsetData));
      // undefined,
      // stageid,
      // boardid,
      // scholarshipid,
      // childid,
      // setid,
      // setLoading,
      //   ),
      // );

      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.goBack();
        return true;
      });
      // premiumdata();
      if (childid != '') {
        // dispatch(
        //   getScholarshipPremiumAPI(undefined, childid, stageid, boardid),
        // );
        // console.log(childid, stageid, boardid, 'childid, stageid, boardid');
      }
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        navigation.goBack();
        return true;
      });
    };
  }, [scholarshipid]);
 
//   useEffect(() => {
//     const probsetData = {
//       stageid,
//       boardid,
//       scholarshipid,
//       childid,
//       setid,
//     }
// console.log(probsetData,"probsetData...................")
//     dispatch(getMostProbableQuestionSetAPI(probsetData));
//   }, []);
  // const handleBackButtonClick = () => {
  //   console.log('hardwareBackPress----------------');
  //   navigation.navigate('UserHome');
  //   return true;
  // };

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
  //       // console.log(premiumValue,"=============premiumValue");
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };
  // console.log(childInfo, '==================childInfo childinfo');
  const isReattempt = true;

  const [show, setShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
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

  // const colorList = [
  //   ['#2775cf', '#e3eefa'],
  //   ['#f08441', '#f7d7c3'],
  //   ['#8356a8', '#f3e1f7'],
  //   ['#05a851', '#d9fceb'],
  //   ['#f2618a', '#ffdeeb'],
  // ];

  // useEffect(() => {
  //   navigation.addListener('focus', () => {
  //     console.log(
  //       'getTopicBySubClassAPI called==================',
  //       stage,
  //       subject,
  //       childid,
  //     );
  //     // dispatch(getAllSubjectExamAPI());
  //     dispatch(
  //       getTopicBySubClassAPI(undefined, stage, subject, childid, setLoading),
  //     );
  //   });
  // }, []);

  // const {TopicBySubClass = []} = useSelector(
  //   state => state.GetTopicBySubClassReducer,
  // );
  // console.log(TopicBySubClass, '================TopicBySubClass');

  // const quizList = [
  //   {
  //     image: require('../../../assets/test.png'),
  //     label1: `Most Probable Questions`,
  //     contentSet: 'SET - 1',
  //     isPremium: true,
  //     label2: 'Reattempt',
  //   },
  //   {
  //     image: require('../../../assets/test.png'),
  //     label1: `Most Probable Questions`,
  //     contentSet: 'SET - 2',
  //     isPremium: true,
  //     label2: 'Start test',
  //   },
  //
  // ];

  // const RowItem = ({item, index}) => {
  //   // const isHighlighted = index === highlightedIndex;
  //   const isHighlighted = false;
  //   return (
  //     <TouchableOpacity>
  //       <View
  //         style={{
  //           backgroundColor: isHighlighted ? 'orange' : Colors.secondary,
  //           paddingHorizontal: isHighlighted ? 10 : 0,
  //           paddingBottom: isHighlighted ? 10 : 0,
  //           paddingTop: isHighlighted ? 10 : 0,
  //           borderRadius: 10,
  //           elevation: isHighlighted ? 10 : 0,
  //           marginVertical: 5,
  //         }}>
  //         {item}
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  // const handleDisable = quizList => {
  //   let List = [...quizList];
  //   let count = 0;
  //   let DataList = [];
  //   List = List.filter(rec => rec.quiz.length > 0);
  //   List = List.map((row, index) => {
  //     const {studentdata = [], quiz = []} = row;
  //     if (studentdata.length == 0 && count == 0) {
  //       let passStudent = false;
  //       if (index != 0) {
  //         let totalMark = List[index - 1].studentdata[0].lastexamtotalmark;
  //         let secureMark =
  //           List[index - 1].studentdata[0].lastexamtotalsecurmark;
  //         const percentage = (
  //           (List[index - 1].studentdata[0].answerdetails[0].totalsecurmark /
  //             List[index - 1].studentdata[0].answerdetails[0].totalmark) *
  //           100
  //         ).toFixed(1);
  //         // let percentage = ((secureMark / totalMark) * 100).toFixed(1);
  //         if (percentage >= 90) {
  //           passStudent = true;
  //         }
  //         // console.log(
  //         //   passStudent,
  //         //   '=================passStudent',
  //         //   percentage,
  //         //   'percentage===========',
  //         // );
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
  //   if (quiz.length) {
  //     // console.log('handleDisable called');
  //     handleDisable(quiz);
  //   }
  // }, [quiz]);
  // const AllExamAttempted = quizList.find(rec => rec.isExamAvailable == false);

  // const {PremiumPurchase = []} = useSelector(
  //   state => state.GetPremiumPurchaseReducer,
  // );
  // console.log(PremiumPurchase, 'PremiumPurchase............');

  // const handlePayment = () => {
  //   setPaymentModalStatus(false);
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
          label1={trans('Subject List')}
          isbackIconShow={true}
          functionName={() => navigation.goBack()}
        />
        {ProbaleDataLoading == 'loading' ? (
          <LoadingScreen flag={ProbaleDataLoading == 'loading'} />
        ) : (
          <ScrollView>
            <View
              style={{
                marginHorizontal: 10,
                backgroundColor: 'rgba(0,255,0, 0.05)',
              }}>
              {subjectList.length > 0 ? (
                subjectList.map((item, index) => {
                  const {
                    id = '',
                    studentdata = [],
                    quiz = [],
                    setid = '',
                    setname = '',
                    subjectname = '',
                    subjectId = '',
                    // previousyearquestionid = '',
                    subjectwisemostprobablequestionid = '',
                    scholarship = '',
                    // year = '',
                    scholarshipid = '',
                    // isExamAvailable = false,
                    timeDuration = '',
                    ispremium = false,
                  } = item;
                  {
                     console.log(
                      scholarship,
                  'scholarship,,,,,,,,,,,,,,,,,,',
                  timeDuration,
                  'timeDuration.1111111111.................',
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
                    <View key={index}>
                      {quiz.length > 0 ? (
                        <TouchableOpacity
                          disabled={true}
                          style={{
                            // elevation: 5,
                            width: '100%',
                            alignSelf: 'center',
                            // backgroundColor: '#def',
                            backgroundColor: 'rgba(0,255,0, 0.1)',
                            // marginVertical: 5,
                            padding: 10,
                            // justifyContent: 'center',
                            // alignItems: 'center',
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor:'#FFB901',
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
                                {`${scholarshipName} ${trans(
                                  'Most Probable Questions',
                                )} ${subjectname} ${examSet}`}
                              </Text>
                              {/* <Text
                          style={[
                            styles.question,
                            {
                              // width: '92%',
                              marginLeft: 5,
                              color: Colors.primary,
                              fontWeight: '800',
                            },
                          ]}>
                          {' '}
                          {setname}
                        </Text> */}
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

                                {
                                  /* console.log(item, 'ITEM.............%%%%%%%%%%%%%'); */
                                }

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
                                                'ProbableQuestion',                                
                                              ))
                                              // if (childid != '') {
                                              //   dispatch(
                                              //     getChildDetailsAPI(
                                              //       undefined,
                                              //       undefined,
                                              //       childid,
                                              //       setLoading,
                                              //       undefined,
                                              //     ),
                                              //   );
                                              // }

                                              navigation.navigate(
                                                'ProbableMockTest',
                                                {
                                                  screenName: screenName,
                                                  subjectName: subjectname,
                                                  subjectId: subjectId,
                                                  chapterName: '',
                                                  isReattempt: true,
                                                  quiz: quiz,
                                                  studentdata: studentdata,
                                                  ExamQuestionsets: '',
                                                  scholarship: scholarship,
                                                  SubjectList: subjectList,
                                                  scholarshipid: scholarshipid,
                                                  timeDuration: timeDuration,
                                                  subjectWise: true,
                                                  examSet: examSet,
                                                  setid: setid,
                                                  ProbSubjectId: ProbSubjectId,
                                                  ProbSubjectName:
                                                    ProbSubjectName,
                                                  mostprobablequestionid:
                                                    subjectwisemostprobablequestionid,
                                                  ispremium: isPremium,
                                                },
                                              );
                                              // handleAsyncSetExamName(
                                              //   'ProbableQuestion',
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
                                                    'ProbableQuestion',                                                  
                                                  ))
                                                  // if (childid != '') {
                                                  //   dispatch(
                                                  //     getChildDetailsAPI(
                                                  //       undefined,
                                                  //       undefined,
                                                  //       childid,
                                                  //       setLoading,
                                                  //       undefined,
                                                  //     ),
                                                  //   );
                                                  // }

                                                  navigation.navigate(
                                                    'ProbableMockTest',
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
                                                      SubjectList: subjectList,
                                                      scholarshipid:
                                                        scholarshipid,
                                                      timeDuration:
                                                        timeDuration,
                                                      subjectWise: true,
                                                      examSet: examSet,
                                                      setid: setid,
                                                      ProbSubjectId:
                                                        ProbSubjectId,
                                                      ProbSubjectName:
                                                        ProbSubjectName,
                                                      mostprobablequestionid:
                                                        subjectwisemostprobablequestionid,
                                                      ispremium: isPremium,
                                                    },
                                                  );
                                                  // handleAsyncSetExamName(
                                                  //   'ProbableQuestion',
                                                  // );
                                                }}>
                                                <Text
                                                  style={{
                                                    color: '#0f6f25',
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
                                        // borderColor: Colors.primary,
                                        // backgroundColor: Colors.white,
                                        backgroundColor:'#FFB901',
                                        alignItems: 'center',
                                        marginHorizontal: -10,
                                        marginBottom: -10,
                                        // borderTopWidth: 1,
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
                                          setAnsIndex(index);
                                          setAnsLoading(true);
                                          setTimeout(() => {
                                            setAnsLoading(false);
                                            // setAnsIndex(index);
                                           dispatch(handleSetExamName(
                                              'ProbableQuestionList',
                                              
                                            ))
                                            handleAnswersheet(
                                              scholarshipName,
                                              null,
                                              null,
                                              studentQuiz,
                                              correctanswer,
                                              totalmark,
                                              Wronganswer,
                                              Skipped,
                                            );
                                          }, 1000);
                                        }}>
                                        {ansIndex == index &&
                                        ansloading == true ? (
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
                                            color:'green',
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
                                          textTransform: 'capitalize',
                                        },
                                      ]}>
                                      {`${scholarshipName} ${trans(
                                        'Most Probable Questions',
                                      )} ${subjectname} ${examSet}`}
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
                                    borderColor: quiz.length ? '#FFB901' : 'grey',
                                    backgroundColor: quiz.length
                                      ? '#FFB901'
                                      : 'grey',
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
                                      dispatch(handleSetExamName(
                                        'ProbableQuestion',
                                        
                                      ))
                                      // if (childid != '') {
                                      //   dispatch(
                                      //     getChildDetailsAPI(
                                      //       undefined,
                                      //       undefined,
                                      //       childid,
                                      //       setLoading,
                                      //       undefined,
                                      //     ),
                                      //   );
                                      // }

                                      navigation.navigate('ProbableMockTest', {
                                        screenName: screenName,
                                        subjectName: subjectname,
                                        subjectId: subjectId,
                                        chapterName: '',
                                        isReattempt: false,
                                        quiz: quiz,
                                        studentdata: studentdata,
                                        ExamQuestionsets: '',
                                        scholarship: scholarship,
                                        SubjectList: subjectList,
                                        scholarshipid: scholarshipid,
                                        timeDuration: timeDuration,
                                        subjectWise: true,
                                        examSet: examSet,
                                        setid: setid,
                                        ProbSubjectId: ProbSubjectId,
                                        ProbSubjectName: ProbSubjectName,
                                        mostprobablequestionid:
                                          subjectwisemostprobablequestionid,
                                        ispremium: isPremium,
                                      });
                                      // handleAsyncSetExamName(
                                      //   'ProbableQuestion',
                                      // );
                                    }}>
                                    <Text
                                      style={{
                                        color: '#0f6f25',
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
                        </TouchableOpacity>
                      ) : (
                        <></>
                      )}
                    </View>
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
                      height: 70,
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
                        width: '80%',
                        fontSize: 15,
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
              {quiz.length > 0 ? (
                <TouchableOpacity
                  // key={index}
                  disabled={true}
                  style={{
                    // elevation: 5,
                    width: '100%',
                    alignSelf: 'center',
                    // backgroundColor: '#def',
                    backgroundColor: 'rgba(0,255,0, 0.05)',
                    padding: 10,
                    borderRadius: 10,
                    marginVertical: 10,
                    // borderWidth: 1,
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
                          },
                        ]}>
                        <Text style={{textTransform: 'capitalize'}}>
                          {scholarshipName}
                        </Text>
                        {` ${trans(
                          'Most Probable Miscellaneous Questions',
                        )} ${examSet}`}
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

                        {
                          /* console.log(item, 'ITEM.............%%%%%%%%%%%%%'); */
                        }

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
                                  {studentdata.length > 0 ? (
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
                                          'ProbableQuestion',
                                         
                                        ))
                                        // if (childid != '') {
                                        //   dispatch(
                                        //     getChildDetailsAPI(
                                        //       undefined,
                                        //       undefined,
                                        //       childid,
                                        //       setLoading,
                                        //       undefined,
                                        //     ),
                                        //   );
                                        // }

                                        navigation.navigate(
                                          'ProbableMockTest',
                                          {
                                            screenName: screenName,
                                            subjectName:
                                              subjectList.subjectname,
                                            subjectId: subjectList.subjectId,
                                            chapterName: '',
                                            isReattempt: true,
                                            quiz: quiz,
                                            studentdata: studentdata,
                                            ExamQuestionsets: '',
                                            scholarship: scholarshipName,
                                            SubjectList: subjectList,
                                            scholarshipid: scholarshipid,
                                            timeDuration: timeDuration,
                                            subjectWise: false,
                                            examSet: examSet,
                                            setid: setid,
                                            mostprobablequestionid:
                                              mostprobablequestionid,
                                            ProbSubjectId: ProbSubjectId,
                                            ProbSubjectName: ProbSubjectName,
                                            ispremium: isPremium,
                                          },
                                        );
                                        // handleAsyncSetExamName(
                                        //   'ProbableQuestion',
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
                                          disabled={quiz.length ? false : true}
                                          onPress={() => {
                                            dispatch(handleSetExamName(
                                              'ProbableQuestion',
                                              
                                            ))
                                            // if (childid != '') {
                                            //   dispatch(
                                            //     getChildDetailsAPI(
                                            //       undefined,
                                            //       undefined,
                                            //       childid,
                                            //       setLoading,
                                            //       undefined,
                                            //     ),
                                            //   );
                                            // }

                                            navigation.navigate(
                                              'ProbableMockTest',
                                              {
                                                screenName: screenName,
                                                subjectName:
                                                  subjectList.subjectname,
                                                subjectId:
                                                  subjectList.subjectId,
                                                chapterName: '',
                                                isReattempt: false,
                                                quiz: quiz,
                                                studentdata: studentdata,
                                                ExamQuestionsets: '',
                                                scholarship: scholarshipName,
                                                SubjectList: subjectList,
                                                scholarshipid: scholarshipid,
                                                timeDuration: timeDuration,
                                                subjectWise: false,
                                                examSet: examSet,
                                                setid: setid,
                                                mostprobablequestionid:
                                                  mostprobablequestionid,
                                                ProbSubjectId: ProbSubjectId,
                                                ProbSubjectName:
                                                  ProbSubjectName,
                                                ispremium: isPremium,
                                              },
                                            );
                                            // handleAsyncSetExamName(
                                            //   'ProbableQuestion',
                                            // );
                                          }}>
                                          <Text
                                            style={{
                                              color: '#0f6f25',
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
                                // borderRadius: 5,
                                // borderColor: Colors.primary,
                                // backgroundColor: Colors.white,
                                backgroundColor: '#FFB901',
                                alignItems: 'center',
                                marginHorizontal: -10,
                                marginBottom: -10,
                                // borderTopWidth: 1,
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
                                  setAnsIndex(rec);
                                  setAnsLoading(true);
                                  setTimeout(() => {
                                    setAnsLoading(false);
                                    // setAnsIndex(index);
                                    dispatch(handleSetExamName(
                                      'ProbableQuestionList',
                                    ))
                                    handleAnswersheet(
                                      scholarshipName,
                                      null,
                                      null,
                                      studentQuiz,
                                      correctanswer,
                                      totalmark,
                                      Wronganswer,
                                      Skipped,
                                    );
                                  }, 1000);
                                }}>
                                {ansIndex == rec && ansloading == true ? (
                                  <ActivityIndicator
                                    size="small"
                                    color={'green'}
                                    style={{
                                      alignSelf: 'flex-start',
                                      paddingRight: 10,
                                      // fontSize: 12,
                                    }}
                                  />
                                ) : (
                                  <></>
                                )}
                                <Text
                                  style={{
                                    // color: '#FFB901',
                                    color:'green',
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
                                {scholarshipName}
                              </Text>
                              {` ${trans(
                                'Most Probable Miscellaneous Questions',
                              )} ${examSet}`}
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
                                      // color: '#333',
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
                                      // color: '#333',
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
                            borderColor: quiz.length ? '#FFB901' : 'grey',
                            backgroundColor: quiz.length ? '#FFB901' : 'grey',
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
                             dispatch(handleSetExamName(
                                'ProbableQuestion',  
                              ))
                              // if (childid != '') {
                              //   dispatch(
                              //     getChildDetailsAPI(
                              //       undefined,
                              //       undefined,
                              //       childid,
                              //       setLoading,
                              //       undefined,
                              //     ),
                              //   );
                              // }

                              navigation.navigate('ProbableMockTest', {
                                screenName: screenName,
                                subjectName: subjectList.subjectname,
                                subjectId: subjectList.subjectId,
                                chapterName: '',
                                isReattempt: false,
                                quiz: quiz,
                                studentdata: studentdata,
                                ExamQuestionsets: '',
                                scholarship: scholarshipName,
                                SubjectList: subjectList,
                                scholarshipid: scholarshipid,
                                timeDuration: timeDuration,
                                subjectWise: false,
                                examSet: examSet,
                                setid: setid,
                                mostprobablequestionid: mostprobablequestionid,
                                ProbSubjectId: ProbSubjectId,
                                ProbSubjectName: ProbSubjectName,
                                ispremium: isPremium,
                              });
                              // handleAsyncSetExamName('ProbableQuestion');
                            }}>
                            <Text
                              style={{
                                color: '#0f6f25',
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
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>
          </ScrollView>
        )}
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
                          color: '#333',
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
                      onPress={() => handlePayment()}>
                      
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
        {/* {lockedModalStatus && (
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
                          color: '#333',
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
                        borderRadius: 15,
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
export default ProbSubjectList;
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
