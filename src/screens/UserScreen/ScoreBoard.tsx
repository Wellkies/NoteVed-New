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
  Dimensions,
  BackHandler,
  ImageBackground,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import React, {useEffect, useRef, useState} from 'react';
import Colors from '../../../assets/Colors.ts';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {
  ActivityIndicator,
  Avatar,
  RadioButton,
  Modal,
} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import FastImage from 'react-native-fast-image';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
// import {device_height, device_width} from '../style';
import Iconz from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons';
import {device_height, device_width} from '../style.ts';
import {
  markCalculation,
  handlesubjectData,
  changeIsoDateToLocaldate,
  upgradetimeformat,
} from '../../../constants/Constants.ts';
// import PieChart from 'react-native-pie-chart';
// import LoadingScreen from './LoadingScreen';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {
  getChildDetailsAPI,
  selectStudentInfo,
} from '../../redux/reducers/StudentInfoReducer';
import {selectExamName} from '../../redux/reducers/ExamTestNameReducer';
import {
  getScholarshipPremiumAPI,
  selectPremiumPurchase,
} from '../../redux/reducers/GetPremiumPurchaseReducer';
import {
  getChildRevisionDetailsAPI,
  selectRevisionChild,
} from '../../redux/reducers/GetChildRevisionReducer';
import {
  AddChildRevisionAPI,
  getChildRevisionDetailsActionAPI,
} from '../../redux/actions/SubjectsAPI';

import {
  getTopicDetailsAPI,
  selectTopicDetails,
} from '../../redux/reducers/GetTopicDetailsFormTopicIdReducer';
import {getTopicBySubClassAPI} from '../../redux/reducers/GetTopicBySubjectReducer';
import {RootState} from '../../redux/store/Store.ts';
import {
  getChildProbableQuestionDetailsAPI,
  selectMostProbableData,
} from '../../redux/reducers/GetMostProbQuesReducer';
import {
  getPrevYearTopStudentAPI,
  selectTopStudent,
} from '../../redux/reducers/GetTopStudentReducer';
import {
  getMostProbTopStudentAPI,
  selectProbTopStudent,
} from '../../redux/reducers/MostProbTopStudentReducer';
import {selectMostProbableQsSetData} from '../../redux/reducers/GetMostProbableQuestionSetReducer.ts';
import {
  getPreviousYearQuestionAPI,
  selectPreviousYear,
} from '../../redux/reducers/GetPrevYearQuesReducer.ts';
import {getPreviousYearQuestionSetAPI} from '../../redux/reducers/GetPrevYearSetReducer.ts';
import {
  handleSetTopicIdForRevision,
  selectTopicId,
} from '../../redux/reducers/GetTopicIdReducer.ts';
import {getChildProgressAPI} from '../../redux/reducers/GetChildProgressReducer.ts';
import {selectUserInfo} from '../../redux/reducers/loginReducer.ts';
import {getTopicBySubIdAPI} from '../../redux/reducers/GetTopicDetailsReducer.ts';
import {getContentByTopicIdAPI} from '../../redux/reducers/GetContentDetailsReducer';
import CircularProgressBar from './CircularProgressBar.tsx';
// import PaymentReminderModal from './CommonScreens/PaymentReminderModal.js';

const ScoreBoard = ({route}) => {
  const dispatch = useDispatch<any>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const navigation = useNavigation();
  const {t: trans, i18n} = useTranslation();
  const {
    screenName = '',
    setid = '',
    ProbSubjectId = '',
    ProbSubjectName = '',
    mostprobablequestionid = '',
    contentid = '',
    isReattempt = false,
    subjectWise = false,
    topicName = '',
    studentdata = [],
    ExamQuestionsets = [],
    subjectName = '',
    coursename = '',
    chapterName = '',
    examSet = '',
    quiz = [],
    scholarshipid = '',
    SubjectList = [],
    scholarship = '',
    year = '',
    previousyearquestionid = '',
    timeDuration = '',
    subjectId = '',
    // boardid = '',
    scholarshipName = '',
    is2ndAvailable = '',
    topicid = '',
  } = route.params;
  console.log(
    subjectName,
    coursename,
    chapterName,
    '======???subjectName,coursename,chapterName',
  );
  // console.log(subjectId,"subjectId",subjectName,"subjectName",topicName,"topicName",chapterName,"chapterName", ' route.params.................SCOREBOARD');
  //childid: childid,

  // const subjectName = ''
  // const chapterName = ''
  // const examSet = ''
  //     const device_width = Dimensions.get('window').width;
  //   const device_height = Dimensions.get('window').height;
  const [loading, setLoading] = useState(false);
  const [ansloading, setAnsLoading] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [reminderModal, setReminderModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);

  // const {childInfo = {}} = useSelector(state => state.ChildDetailsReducer);
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
  } = userInfo;
  // console.log(
  //   stageid,
  //   subjectId,
  //   boardid,
  //   scholarshipid,
  //   childid,
  //   'stageidsubjectIdboardidscholarshipidchildid',
  // );
  //   const {userInfo = {}} = useSelector(state => state.UserInfoReducer);

  // const {PremiumPurchase = []} = useSelector(
  //   state => state.GetPremiumPurchaseReducer,
  // );
  const PremiumPurchase = useAppSelector(selectPremiumPurchase);
  // console.log(PremiumPurchase, 'PremiumPurchase..........');
  // const {RevisionData = []} = useSelector(
  //   state => state.GetChildRevisionReducer,
  // );
  const RevisionData = useAppSelector(selectRevisionChild);

  // console.log(RevisionData, 'RevisionData..................');
  // console.log(RevisionData,"/////////////////RevisionData....................")
  const {paymentid = ''} = PremiumPurchase.length ? PremiumPurchase[0] : [];

  // const {TopicId = ''} = useSelector(state => state.GetTopicIdReducer);
  const TopicId = useAppSelector(selectTopicId);
  // const TopicId = '';

  // //
  // console.log(TopicId, 'TopicId...............');
  // const {ExamDetails = {}} = useSelector(state => state.ExamTestNameReducer);
  // const ExamName = useAppSelector(selectExamName);

  // // const {
  // //   ExamName = '',
  // //   // scholarshipid:ScholarshipId= '',
  // //   // boardid:BoardId= '',
  // //   // stage:standard= '',
  // //   // stageid:standardid= '',
  // //   // childid:ChildId= '',
  // //   // subjectid= '',
  // //   // subjectName: subjectname= '',
  // // } = ExamDetails;
  // //
  const ExamName = useAppSelector(selectExamName);
  // console.log(ExamName, 'ExamName.............');

  useEffect(() => {
    dispatch(handleSetTopicIdForRevision(topicid));
    if (ExamName == 'SubjectRevision') {
      const selectedTopic = TopicList.find(rec => rec.topicid == TopicId);
      let ContentIndex = -1;
      if (
        ContentIndex != -1 &&
        ContentIndex == selectedTopic.reviewquestionsets.length - 1 &&
        percentage >= 90
      ) {
        setPaymentModal(true);
      }
      // setPaymentModal(true);
      const progress = {
        stageid,
        boardid,
        scholarshipid,
        childid,
      };
      dispatch(getChildProgressAPI(progress));
    }
  }, []);

  // const {TopicBySubClass: TopicList = []} = useSelector(
  //   state => state.GetTopicBySubClassReducer,
  // );
  // const {TopicDetailsByTopicId: TopicList = []} = useSelector(
  //   state => state.GetTopicDetailsFormTopicIdReducer,
  // );
  const TopicList = useAppSelector(selectTopicDetails);
  // console.log(TopicList, "TopicList.................")
  // const {PrevYearQuestion = []} = useSelector(
  //   state => state.GetPrevYearQuesReducer,
  // );
  interface prevYearQuestion {
    studentdata: [];
  }
  const PrevYearQuestion = useAppSelector(
    selectPreviousYear,
  ) as prevYearQuestion;
  const {studentdata: prevStudentData = []} = PrevYearQuestion;

  // console.log(prevStudentData,"prevStudentData.................")

  // const {ProbableQuestions = []} = useSelector(
  //   state => state.GetMostProbQuesReducer,
  // );

  const ProbableQuestions = useAppSelector(selectMostProbableQsSetData);
  const handleCloseFunction = () => {
    setReminderModal(false);
    if (previousyearquestionid != '' && subjectWise == false) {
      setModalStatus(true);
    }
  };
  const matchingYearid = PrevYearQuestion.find(child => child.yearid === year);
  const matchingSetid = ProbableQuestions.find(child => child.setid == setid);

  const handleBackButtonClick = () => {
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
    if (ExamName == 'PreviousYear') {
      const matchingYearid = PrevYearQuestion.find(
        child => child.yearid === year,
      );
      // dispatch(
      //   getPreviousYearQuestionSetAPI(
      //     undefined,
      //     stageid,
      //     boardid,
      //     scholarshipid,
      //     matchingYearid.year,
      //     childid,
      //     undefined,
      //   ),
      // );
      const qsSet = {
        stageid,
        boardid,
        scholarshipid,
        yearid: matchingYearid.year,
        childid,
      };
      // console.log(qsSet, 'qsSet................');
      dispatch(getPreviousYearQuestionSetAPI(qsSet));
      if (matchingYearid) {
        // If a matching child is found, console log its childId
        if (subjectWise == false && percentage >= 90) {
          // dispatch(
          //   getTopicBySubClassAPI(
          //     undefined,
          //     Class,
          //     subjectId,
          //     boardid,
          //     scholarshipid,
          //     childid,
          //     setLoading,
          //   ),
          // );
          navigation.navigate('PrevYearQues', {
            // subjectId:subjectId,
            scholarshipId: scholarshipid,
            scholarshipName: scholarship,
            showFeedback: true,
            // quizList: ExamQuestionsets,
          });
        } else {
          navigation.navigate('PrevSubjectList', {
            screenName: screenName,
            subjectName: scholarship,
            chapterName: '',
            allPrevQuiz: quiz,
            prevYearStudentdata: prevStudentData,
            ExamQuestionsets: '',
            previousyearquestionid: previousyearquestionid,
            scholarship: scholarship,
            year: matchingYearid.year,
            scholarshipid: scholarshipid,
            timeDuration: timeDuration,
            SubjectList: matchingYearid.subjects,
            yearid: year,
          });
        }
      }
      const prevQues = {
        stageid,
        boardid,
        scholarshipId: scholarshipid,
        childid,
      };
      dispatch(getPreviousYearQuestionAPI(prevQues));
      // dispatch(
      //   getPreviousYearQuestionAPI(
      //     undefined,
      //     stageid,
      //     boardid,
      //     scholarshipid,
      //     childid,
      //     setLoading,
      //   ),
      // );

      // navigation.navigate('PrevSubjectList', {
      //   subjectName: scholarship,
      //   chapterName: '',
      //   allPrevQuiz: quiz,
      //   prevYearStudentdata: studentdata,
      //   ExamQuestionsets: '',
      //   previousyearquestionid: previousyearquestionid,
      //   scholarship: scholarship,
      //   year: year,
      //   scholarshipid: scholarshipid,
      //   timeDuration: timeDuration,
      //   SubjectList: SubjectList,
      // });

      // navigation.navigate('PrevYearQues', {
      //   scholarshipName: scholarship,
      //   // quizList: ExamQuestionsets,
      // });
      return true;
    } else if (ExamName == 'ProbableQuestion') {
      // console.log('called..............');
      const matchingSetid = ProbableQuestions.find(
        child => child.setid == setid,
      );
      // console.log(matchingSetid, 'matchingSetid................');
      if (matchingSetid) {
        if (subjectWise == false && percentage >= 90) {
          navigation.navigate('ProbQuestion', {
            scholarshipName: chapterName,
            showFeedback: true,
            scholarshipID: scholarshipid,
            // quizList: ExamQuestionsets,
          });
        } else {
          navigation.navigate('ProbSubjectList', {
            screenName: screenName,
            examSet: examSet,
            setid: matchingSetid.setid,
            mostprobablequestionid: mostprobablequestionid,
            ProbSubjectId: ProbSubjectId,
            ProbSubjectName: ProbSubjectName,
            quiz: quiz,
            studentdata: studentdata,
            ExamQuestionsets: '',
            scholarshipid: scholarshipid,
            scholarship: scholarship,
            timeDuration: timeDuration,
            SubjectList: matchingSetid.subjects,
          });
        }
      }
      const probdata = {
        stageid,
        boardid,
        scholarshipId: scholarshipid,
        childid,
      };
      // console.log(probdata, "probdata$$$$$$$$$$$$$$$$$$$$$$$$$$$444")
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

      // navigation.navigate('ProbQuestion', {
      //   scholarshipName: chapterName,
      //   // quizList: ExamQuestionsets,
      // });
      return true;
    } else if (ExamName == 'SubjectRevision') {
      const progress = {
        stageid,
        boardid,
        scholarshipid,
        childid,
      };
      dispatch(getChildProgressAPI(progress));
      const selectedTopic = TopicList.find(rec => rec.topicid == TopicId);
      // const selectedTopicdata = TopicList.find(rec => rec.topicid == TopicId);
      // console.log(selectedTopic, '..............selectedTopic.................');
      //   // selectedTopic.reviewquestionsets[0].studentdata,
      //   // selectedTopic.reviewquestionsets[0].studentdata,
      //   // selectedTopic.reviewquestionsets[0].studentdata[0].totalmark,
      //   // selectedTopic.reviewquestionsets[0].studentdata[0].securmark,
      //   // TopicId,
      //   // TopicList,
      // );
      let ContentIndex = -1;
      if (selectedTopic != undefined) {
        ContentIndex = selectedTopic.reviewquestionsets.findIndex(
          rec => rec.contentid == contentid,
        );
      }
      if (stageid != '' && boardid != '' && childid != '') {
        // dispatch(
        //   getTopicBySubClassAPI(
        //     undefined,
        //     stageid,
        //     subjectId,
        //     boardid,
        //     scholarshipid,
        //     childid,
        //     setLoading,
        //   ),
        // );
        // navigation.navigate('UserHome');
        if (
          ContentIndex != -1 &&
          ContentIndex == selectedTopic.reviewquestionsets.length - 1 &&
          percentage >= 90
        ) {
          const revisionbody = {
            childid: childid,
            subjectDetails: [
              {
                subjectid: subjectId,
                subject: subjectName,
                completestatus: 'false',
                topicDetails: [
                  {
                    topicid: TopicId,
                    topic: topicName,
                    completestatus: 'true',
                  },
                ],
              },
            ],
          };
          // console.log(
          //   revisionbody,
          //   '********************revisionbody................',
          // );
          AddChildRevisionAPI(revisionbody);
          // const revisionCallback=()=>{
          //   console.log(revisionCallback,"revisionCallback,,,,,,,,,,,")
          //   dispatch(
          //     getChildRevisionDetailsAPI(
          //       undefined,
          //       stageid,
          //       subjectId,
          //       boardid,
          //       scholarshipid,
          //       childid,
          //       setLoading,
          //     ),
          //   );
          // }
          const RevData = {
            Class: stageid,
            subjectid: subjectId,
            boardid,
            scholarshipid,
            childId: childid,
          };
          // storeSubjectAsyncData();
          dispatch(getChildRevisionDetailsAPI(RevData));

          navigation.navigate('SubjectsDetails', {
            subjectid: subjectId,
            subjectname: subjectName,
            subjectImage: '',
            Class: stageid,
            scholarshipid: scholarshipid,
            boardid: boardid,
            childId: childid,
            scholarshipName: scholarshipName,
            showFeedback: true,
            topicid: topicid,
          });

          const TopicData = {
            Class: stageid,
            subjectid: subjectId,
            boardid,
            scholarshipid,
            topicid,
            childId: childid,
          };
          dispatch(getTopicBySubClassAPI(TopicData));
          // dispatch(getTopicDetailsAPI(TopicData));
          // dispatch(
          //   getTopicBySubClassAPI(
          //     undefined,
          //     stageid,
          //     subjectId,
          //     boardid,
          //     scholarshipid,
          //     childid,
          //     setLoading,
          //   ),
          // );
          // navigation.navigate('SubjectsDetails', {
          //   subjectid: subjectId,
          //   subjectname: subjectName,
          //   subjectImage: '',
          //   Class: stageid,
          //   scholarshipid: scholarshipid,
          //   boardid: boardid,
          //   childId: childid,
          //   scholarshipName: scholarshipName,
          //   showFeedback: true,
          // });
        } else {
          // getTopicBySubClassAPI(
          //   undefined,
          //   stageid,
          //   subjectId,
          //   boardid,
          //   scholarshipid,
          //   childid,
          //   setLoading,
          // ),
          const TopicData = {
            Class: stageid,
            subjectId,
            boardid,
            scholarshipid,
            topicid,
            childId: childid,
          };
          dispatch(getTopicBySubClassAPI(TopicData));
          navigation.navigate('ExamSets', {
            subjectName: subjectName,
            topicName: chapterName,
            ExamQuestionsets: selectedTopic.reviewquestionsets,
            Class: stageid,
            subjectId: subjectId,
            boardid: boardid,
            scholarshipid: scholarshipid,
            childId: childid,
            isScoreBoardFlag: true,
            scholarshipName: scholarshipName,
            is2ndAvailable: is2ndAvailable,
            topicid: topicid,
          });
          return true;
        }
        // navigation.navigate('SubjectsDetails', {
        //   subjectImage: '',
        //   scholarshipid: scholarshipid,
        //   childId: childid,
        //   boardid: boardid,
        //   subjectid: subjectId,
        //   Class: stageid,
        //   subjectname: subjectName,
        // });
      }
    } else {
      () => {};
    }
    return true;
  };
  useEffect(() => {
    // navigation.addListener('focus', () => {

    if (PremiumPurchase.length > 0 && paymentid === 'free7days') {
      if (ExamName == 'SubjectRevision') {
        const selectedTopic = TopicList.find(rec => rec.topicid == TopicId);
        let ContentIndex = -1;
        if (selectedTopic != undefined) {
          ContentIndex = selectedTopic.reviewquestionsets.findIndex(
            rec => rec.contentid == contentid,
          );
        }
        if (stageid != '' && boardid != '' && childid != '') {
          if (
            ContentIndex != -1 &&
            ContentIndex == selectedTopic.reviewquestionsets.length - 1
            // &&
            // percentage >= 90
          ) {
            setReminderModal(true);
          }
        }
      }
    }
    if (previousyearquestionid != '' && subjectWise == false) {
      setModalStatus(true);
    }
    const prevTopId = {
      previousyearquestionid,
    };
    dispatch(getPrevYearTopStudentAPI(prevTopId));
    if (mostprobablequestionid != '' && subjectWise == false) {
      setModalStatus(true);
    }
    const probTopId = {
      mostprobablequestionid,
    };
    dispatch(getMostProbTopStudentAPI(probTopId));
    // if (previousyearquestionid != '' && subjectWise == false) {
    //   setModalStatus(true);
    // }
    dispatch(handleSetTopicIdForRevision(topicid));
    BackHandler.addEventListener('hardwareBackPress', () => {});
    // });
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
      const prevTopId = {
        previousyearquestionid,
      };
      dispatch(getPrevYearTopStudentAPI(prevTopId));
      const probTopId = {
        mostprobablequestionid,
      };
      dispatch(getMostProbTopStudentAPI(probTopId));
      // dispatch(
      //   getPrevYearTopStudentAPI(undefined, previousyearquestionid, setLoading),
      // );
      // dispatch(
      //   getMostProbTopStudentAPI(undefined, mostprobablequestionid, setLoading),
      // );
      // if (previousyearquestionid != '' && subjectWise == false) {
      //   setModalStatus(true);
      // }
      if (PremiumPurchase.length > 0 && paymentid === 'free7days') {
        setReminderModal(true);
      }
      if (previousyearquestionid != '' && subjectWise == false) {
        setModalStatus(true);
      }
    };
  }, []);

  const {
    no_of_Attempts = 0,
    correctanswer = 0,
    Skipped = 0,
    Wronganswer = 0,
    totalmark = 0,
    percentage = 0,
  } = markCalculation(quiz);
  const subjectList = handlesubjectData(quiz, true);

  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const series = [Wronganswer, correctanswer, Skipped];
  const sliceColor = ['red', 'green', 'orange'];

  // const {TopStudent = []} = useSelector(state => state.GetTopStudentReducer);
  // console.log(modalStatus, TopStudent, 'TopStudent================');

  // const {ProbableTopStudent = []} = useSelector(
  //   state => state.MostProbTopStudentReducer,
  // );
  const TopStudent = useAppSelector(selectTopStudent);
  // console.log(TopStudent,"TopStudent.............")
  const ProbableTopStudent = useAppSelector(selectProbTopStudent);
  // console.log(ProbableTopStudent,"ProbableTopStudent//////////////")
  const ListColor = ['#fee2a3', '#f6c4b9', '#c3ccf5', '#76f0c7'];

  useEffect(() => {
    const Predata = {childid, stageid, boardid};
    // console.log(Predata, 'Predata...............');
    dispatch(getScholarshipPremiumAPI(Predata));
    dispatch(getChildDetailsAPI(childid));
    const revisionData = {
      Class: stageid,
      subjectid: subjectId,
      boardid,
      scholarshipid,
      childId: childid,
    };
    dispatch(getChildRevisionDetailsAPI(revisionData));
    const TopicData = {
      Class: stageid,
      subjectid: subjectId,
      boardid,
      scholarshipid,
      topicid,
      childId: childid,
    };
    const TopicDetails = {
      Class: stageid,
      subjectId,
      boardid,
      scholarshipid,
      topicid,
      childId: childid,
    };

    // console.log(TopicDetails, 'TopicDetails/////////////////>>>>>>>>>>>>>>>>');
    dispatch(getTopicDetailsAPI(TopicDetails));
    dispatch(getTopicBySubClassAPI(TopicData));
    const prevQues = {stageid, boardid, scholarshipId: scholarshipid, childid};
    dispatch(getPreviousYearQuestionAPI(prevQues));
    // dispatch(getPrevYearTopStudentAPI(previousyearquestionid))
    // dispatch(getMostProbTopStudentAPI(mostprobablequestionid))
  }, []);

  const ref = useRef();
  const [imageUri, setImageUri] = useState('');

  useEffect(() => {
    // on mount
    ref.current.capture().then(uri => {
      console.log('screenshot captured ! do something with ', uri);
      setImageUri(uri);
    });
  }, []);

  const myCustomShare = async () => {
    const shareOption = {
      message: 'NoteVed Academy',
      title: 'Result',
      url: imageUri,
      // 'NoteVed Academy helps students for OAV(Odisha Adarsha Vidyalaya) and Navodaya competitive examination preparation!',
      // url: 'https://play.google.com/store/apps/details?id=com.wellkies_user&pli=1',
      // url: 'https://play.google.com/store/apps/details?id=com.notevook',
    };
    try {
      // const shareResponse =
      await Share.open(shareOption);
    } catch (error) {
      // console.log('Error =>', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#1E1E1E'}}>
      <StatusBar backgroundColor={'#263d2d'} barStyle="light-content" />
      <ImageBackground
        style={{
          width: device_width,
          height: device_height,
          flex: 1,
          alignSelf: 'center',
          backgroundColor: '#364D3D',
        }}
        resizeMode="cover"
        //</SafeAreaView>source={require('../../../assets/0.png')}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{paddingHorizontal: 10}}>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              marginHorizontal: 10,
              marginVertical: 10,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              disabled={ansloading == true}
              onPress={() => {
                setAnsLoading(true);
                setTimeout(() => {
                  setAnsLoading(false);

                  if (ExamName == 'PreviousYear') {
                    navigation.navigate('AnswerSheet', {
                      subjectname: subjectName,
                      chapterName: chapterName,
                      examSet: examSet,
                      quiz: quiz,
                      securemark: correctanswer,
                      totalmark: totalmark,
                      Wronganswer: Wronganswer,
                      Skipped: Skipped,
                      isNotificationFlag: false,
                      subjectName: scholarship,
                      chapterName: '',
                      allPrevQuiz: quiz,
                      prevYearStudentdata: prevStudentData,
                      ExamQuestionsets: '',
                      previousyearquestionid: previousyearquestionid,
                      scholarship: scholarship,
                      year: matchingYearid.year,
                      scholarshipid: scholarshipid,
                      timeDuration: timeDuration,
                      SubjectList: matchingYearid.subjects,
                      yearid: year,
                    });
                  } else if (ExamName == 'ProbableQuestion') {
                    navigation.navigate('AnswerSheet', {
                      subjectname: subjectName,
                      chapterName: chapterName,
                      securemark: correctanswer,
                      totalmark: totalmark,
                      Wronganswer: Wronganswer,
                      Skipped: Skipped,
                      isNotificationFlag: false,
                      subjectName: scholarship,
                      // screenName: screenName,
                      examSet: examSet,
                      setid: matchingSetid.setid,
                      mostprobablequestionid: mostprobablequestionid,
                      ProbSubjectId: ProbSubjectId,
                      ProbSubjectName: ProbSubjectName,
                      quiz: quiz,
                      studentdata: studentdata,
                      // studentdata: prevStudentData,
                      ExamQuestionsets: '',
                      scholarshipid: scholarshipid,
                      scholarship: scholarship,
                      timeDuration: timeDuration,
                      SubjectList: matchingSetid.subjects,
                      screenName: screenName,
                    });
                  } else {
                    navigation.navigate('AnswerSheet', {
                      subjectname: subjectName,
                      chapterName: chapterName,
                      examSet: examSet,
                      quiz: quiz,
                      securemark: correctanswer,
                      totalmark: totalmark,
                      Wronganswer: Wronganswer,
                      Skipped: Skipped,
                      isNotificationFlag: false,
                      is2ndAvailable: is2ndAvailable,
                      scholarshipName: scholarshipName,
                      subjectId: subjectId,
                      scholarshipid: scholarshipid,
                      topicid: topicid,
                      boardid: boardid,
                      contentid: contentid,
                      percentage: percentage,
                      coursename: coursename,
                    });
                  }
                }, 1000);
              }}
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#FFFFFF',
                width: '35%',
                padding: 5,
                alignItems: 'center',
                flexDirection: 'row',
                gap: 4,
              }}>
              <EvilIcons
                name="trophy"
                size={30}
                style={{
                  color: '#FFFFFF',
                }}
              />
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 14,
                  fontWeight: '400',
                }}>
                Quiz Result
              </Text>
            </TouchableOpacity>
            <AntDesign
              name="bells"
              size={30}
              style={{
                color: '#FFFFFF',
                marginLeft: 20,
              }}
            />
          </View>
          <View>
            <ViewShot
              ref={ref}
              options={{fileName: 'Test_Result', format: 'png', quality: 0.9}}
              style={{
                //flex:1,
                // backgroundColor: 'rgba(0,255,0, 0.1)',
                //backgroundColor: '#272727',
                height: device_height * 0.7,
                // width: device_width,
                // alignItems:'center',
                // justifyContent:'center',
                alignSelf: 'center',
                // paddingVertical: 15,
                // paddingHorizontal: 10,
                // marginHorizontal: 10,
              }}>
              <View
                style={{
                  // width: device_width * 0.9,
                  // height: device_height * 0.28,
                  marginHorizontal: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // backgroundColor: 'rgba(0,255,0, 0.1)',
                  //backgroundColor: '#2C7DB5',
                  //borderWidth: 2,
                  height: '43%',
                  // borderColor: '#FFB901',
                  //borderColor: '#aaa',
                  //borderRadius: 20,
                  // marginTop:10
                }}>
                <View
                  style={{
                    width: device_width * 0.25,
                    height: device_width * 0.25,
                    backgroundColor: Colors.primary,
                    marginVertical: 10,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Avatar.Image
                    source={
                      image != '' && image != null
                        ? {uri: image}
                        : gender == 'Male'
                        ? require('../../../assets/boy.png')
                        : gender == 'Female'
                        ? require('../../../assets/girl.png')
                        : {
                            uri: 'https://wkresources.s3.ap-south-1.amazonaws.com/userrr.png',
                          }
                    }
                    size={device_width * 0.25}
                    style={{backgroundColor: Colors.primary}}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  {fname !== '' ? (
                    <Text
                      style={{
                        fontSize: 20,
                        //color: '#FFB901',
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                      }}>
                      {fname} {lname}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                      }}>
                      {name}
                    </Text>
                  )}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // borderWidth: 1,
                    width: '95%',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      textTransform: 'capitalize',
                      textAlign: 'center',
                      width: '100%',
                      marginBottom: 10,
                      // borderWidth:1
                    }}>
                    {scholarshipName != '' && scholarshipName != null ? (
                      <Text style={{}}>{scholarshipName.trim()}, </Text>
                    ) : (
                      <></>
                    )}
                    {boardofeducation != '' && boardofeducation != null ? (
                      <Text style={{textTransform: 'uppercase'}}>
                        {boardofeducation.trim()},{' '}
                      </Text>
                    ) : (
                      <></>
                    )}
                    {subjectName == '' ? <></> : `${subjectName.trim()}, `}
                    {/* {`${subjectName},`}{' '} */}
                    {ExamName == 'PreviousYear' ? (
                      year != '' && year != null ? (
                        <Text style={{textTransform: 'uppercase'}}>
                          {year.trim()}{' '}
                        </Text>
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )}
                    {chapterName != '' && chapterName != null ? (
                      <Text style={{textTransform: 'uppercase'}}>
                        {chapterName.trim()},{' '}
                      </Text>
                    ) : (
                      <></>
                    )}{' '}
                    {examSet != '' && examSet != null ? (
                      <Text style={{textTransform: 'uppercase'}}>
                        {examSet.trim()}{' '}
                      </Text>
                    ) : (
                      <></>
                    )}
                  </Text>
                </View>
              </View>
              {/* <View
                style={{
                  // padding: 20,
                  height: '18%',
                  // borderWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  disabled={true}
                  style={{
                    width: '80%',
                    height: '60%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // borderRightWidth: 0.5,
                    paddingVertical: 10,
                    borderWidth: 1,
                    borderColor: '#FFFFFF',
                    //backgroundColor: '#0f6f25',
                    backgroundColor: '#2C7DB5',
                    borderRadius: 15,
                    // borderBottomLeftRadius: 15,
                    // borderTopLeftRadius: 15,
                  }}
                  onPress={handleToggle}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                      // color: '#FFB901',
                      color: '#FFFFFF',
                    }}>
                    {trans('DETAILS')}
                  </Text>
                </TouchableOpacity> */}
              {/* <TouchableOpacity
              style={{
                width: '30%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRightWidth: 0.5,
                paddingVertical: 10,
                borderWidth: 0.5,
                borderColor: Colors.primary,
              }}
              onPress={handleToggle}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 500,
                  color: Colors.primary,
                }}>
                {trans('RANK')}
              </Text>
            </TouchableOpacity> */}
              {/* <TouchableOpacity
              style={{
                width: '30%',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomRightRadius: 15,
                borderTopRightRadius: 15,
                borderWidth: 0.5,
                borderColor: Colors.primary,
                paddingVertical: 10,
              }}
              onPress={handleToggle}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 500,
                  // color: isToggled ? Colors.primary : '#000',
                  color: Colors.primary,
                }}>
                {trans('RESULT')}
              </Text>
            </TouchableOpacity> */}
              {/* </View> */}
              {/* <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <PieChart
                  // doughnut={true}
                  // coverRadius={0.35}
                    widthAndHeight={WidthAndHeight}
                    series={series}
                    sliceColor={sliceColor}
                    coverFill={'#ccc'}
                />
              </View> */}

              {/* <View
                style={{
                  // alignItems: 'center',
                  //justifyContent: 'space-evenly',
                  marginTop: 12,
                  // height: '39%',
                  // borderWidth:1,
                }}> */}
              {/* <View style={{marginBottom: 10}}> */}
              <Text
                style={{
                  color: '#FFFFFF',
                  fontWeight: '500',
                  fontSize: 15,
                  marginTop: 20,
                  marginBottom: 8,
                  marginLeft: 4,
                }}>
                RESULT
              </Text>
              {/* </View> */}
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#116505',
                  paddingVertical: 18,
                  paddingHorizontal: 16,
                  borderRadius: 10,
                  borderColor: '#FFFFFF',
                  borderWidth: 0.6,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons
                      name="speedometer-outline"
                      size={30}
                      style={{color: '#FFFFFF'}}
                    />
                    <Text style={{color: '#FFFFFF', fontSize: 11}}>
                      Point Scored
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 13,
                    }}>
                    {correctanswer + '/ ' + totalmark}
                  </Text>
                </View>
                <View
                  style={{
                    height: '100%',
                    width: 1,
                    backgroundColor: '#FFFFFF',
                    marginHorizontal: 10,
                  }}
                />
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Octicons
                      name="stopwatch"
                      size={30}
                      style={{color: '#FFFFFF'}}
                    />
                    <Text style={{color: '#FFFFFF', fontSize: 11}}>
                      Time Spent
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 13,
                    }}>
                    {'Time'}
                  </Text>
                </View>
                <View
                  style={{
                    height: '100%',
                    width: 1,
                    backgroundColor: '#FFFFFF',
                    marginHorizontal: 10,
                  }}
                />
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name="medal"
                      size={30}
                      style={{color: '#FFFFFF'}}
                    />
                    <Text style={{color: '#FFFFFF', fontSize: 11}}>
                      Rank Secured
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 13,
                    }}>
                    {'44/83'}
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  color: '#FFFFFF',
                  fontWeight: '500',
                  fontSize: 15,
                  marginTop: 20,
                  marginBottom: 8,
                  marginLeft: 4,
                }}>
                Quiz Statistics
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#1A780A',
                  paddingVertical: 18,
                  paddingHorizontal: 16,
                  borderRadius: 10,
                  borderColor: '#FFFFFF',
                  borderWidth: 0.6,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      backgroundColor: '#18D70F',
                      paddingVertical: 10,
                      paddingHorizontal: 15,
                      borderRadius: 4,
                    }}>
                    {correctanswer}
                  </Text>
                  <Text style={{color: '#FFFFFF'}}>Correct</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      backgroundColor: '#E00106',
                      paddingVertical: 10,
                      paddingHorizontal: 15,
                      borderRadius: 4,
                    }}>
                    {Wronganswer}
                  </Text>
                  <Text style={{color: '#FFFFFF'}}>Wrong</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#166308',
                      backgroundColor: '#FFFFFF',
                      paddingVertical: 10,
                      paddingHorizontal: 15,
                      borderRadius: 4,
                    }}>
                    {Skipped}
                  </Text>
                  <Text style={{color: '#FFFFFF'}}>Unattempted</Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (percentage >= 90) {
                      const bodydata = {
                        subjectid: subjectId,
                        childid: childid,
                      };
                      dispatch(getTopicBySubIdAPI(bodydata));
                      navigation.navigate('TopicDetails', {
                        // stageid: '5',
                        // boardid: '1',
                        // scholarshipId: 'NVOOKADA1690811843420',
                        // coursename: subjectName,
                        coursename: coursename,
                        subjectname: subjectName,
                        subjectid: subjectId,
                      });
                    } else {
                      const data = {
                        topicid: topicid,
                        childid: childid,
                      };
                      dispatch(getContentByTopicIdAPI(data));
                      navigation.navigate('ContentDetails', {
                        coursename: coursename,
                        subjectname: subjectName,
                        topicname: chapterName,
                        percentage: percentage,
                        topicid: topicid,
                      });
                    }
                  }}
                  style={{
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: '#FEFEFE',
                    width: '45%',
                    padding: 5,
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#FEFEFE'}}>
                    {percentage >= 90 ? 'Next' : 'Re-attempt'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    myCustomShare();
                  }}
                  style={{
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: '#FEFEFE',
                    width: '45%',
                    padding: 5,
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#FEFEFE'}}>Share Report</Text>
                </TouchableOpacity>
              </View>

              {/* <LinearGradient
                  colors={['#012650', '#012650']}
                  style={{
                    width: '100%',
                    //backgroundColor: 'rgba(0,255,0, 0.1)',
                    backgroundColor: '#C4E6E8',
                    // borderRadius: 10,
                    paddingVertical: 30,
                    paddingHorizontal: 20,
                    gap: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: 20,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontWeight: '900',
                        color: '#fff',
                        fontSize: 25,
                        textAlign: 'center',
                      }}>
                      <Text style={{fontWeight: '800', fontSize: 17}}>
                        {trans('Total Questions')} {` : `}
                      </Text>
                    </Text>
                    <Text
                      style={{fontWeight: '800', fontSize: 17, color: '#fff'}}>
                      {`${totalmark}`}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: 20,
                    }}>
                    <Text
                      style={{
                        fontWeight: '900',
                        color: 'lawngreen',
                        fontSize: 25,
                        textAlign: 'center',
                      }}>
                      <Text style={{fontWeight: '800', fontSize: 17}}>
                        {trans('Correct Answer')}
                        {` : `}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        fontWeight: '800',
                        fontSize: 17,
                        color: 'lawngreen',
                      }}>
                      {`${correctanswer}`}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: 20,
                    }}>
                    <Text
                      style={{
                        fontWeight: '900',
                        color: 'crimson',
                        fontSize: 25,
                        textAlign: 'center',
                      }}>
                      <Text style={{fontWeight: '800', fontSize: 17}}>
                        {trans('Wrong response')} {` : `}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        fontWeight: '800',
                        fontSize: 17,
                        color: 'crimson',
                      }}>
                      {`${Wronganswer}`}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: 20,
                    }}>
                    <Text
                      style={{
                        fontWeight: '900',
                        color: 'darkorange',
                        fontSize: 25,
                        textAlign: 'center',
                      }}>
                      <Text style={{fontWeight: '800', fontSize: 17}}>
                        {trans('Skipped Question')}
                        {` : `}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        fontWeight: '800',
                        fontSize: 17,
                        color: 'darkorange',
                      }}>
                      {`${Skipped}`}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: 20,
                    }}>
                    <Text
                      style={{
                        fontWeight: '900',
                        color: '#fff',
                        fontSize: 22,
                        textAlign: 'center',
                      }}>
                      <Text style={{fontWeight: '800', fontSize: 17}}>
                        {trans('Percentage Scored')} {` : `}
                      </Text>
                    </Text>
                    <Text
                      style={{fontWeight: '800', fontSize: 17, color: '#fff'}}>
                      {`${percentage}%`}
                    </Text>
                  </View>
                </LinearGradient> */}
              {/* </View> */}
            </ViewShot>
            <View
              style={{
                backgroundColor: '#093B00',
                borderRadius: 10,
                paddingVertical: 20,
                paddingHorizontal: 16,
                flexDirection: 'row',
                flex: 1,
                marginTop: -20,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 18,
                  }}>
                  Percentile: {`${percentage}%`}
                </Text>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 18,
                  }}>
                  Response:
                </Text>
              </View>
              <CircularProgressBar
                correct={correctanswer}
                wrong={Wronganswer}
                skipped={Skipped}
                total={totalmark}
              />
            </View>
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                zIndex: -1,
                width: device_width,
                // borderWidth:1,
                alignSelf: 'center',
                marginVertical: 20,
              }}> */}
            {/* <TouchableOpacity
                onPress={() => {
                  const bodydata = {
                    subjectid: subjectId,
                    childid: childid,
                  };
                  dispatch(getTopicBySubIdAPI(bodydata));
                  navigation.navigate('TopicDetails', {
                    // stageid: '5',
                    // boardid: '1',
                    // scholarshipId: 'NVOOKADA1690811843420',
                    // coursename: subjectName,
                    coursename: coursename,
                    subjectname: subjectName,
                    subjectid: subjectId,
                  });
                }}
                style={{
                  paddingVertical: 16,
                  borderRadius: 50,
                  width: '45%',
                  marginVertical: 15,
                  marginRight: 10,
                  padding: 15,
                  borderWidth: 0.5,
                  borderColor: '#FFFFFF',
                  // backgroundColor: '#FFB901',
                  backgroundColor: '#2C7DB5',
                }}>
                <Text
                  style={{
                    //color: '#0f6f25',
                    color: '#FFFFFF',
                    fontSize: 18,
                    fontWeight: '700',
                    textAlign: 'center',
                  }}>
                  {trans('Take Next Test')}
                </Text>
              </TouchableOpacity> */}
            {/* <TouchableOpacity
                disabled={ansloading == true}
                onPress={() => {
                  setAnsLoading(true);
                  setTimeout(() => {
                    setAnsLoading(false);

                    if (ExamName == 'PreviousYear') {
                      navigation.navigate('AnswerSheet', {
                        subjectname: subjectName,
                        chapterName: chapterName,
                        examSet: examSet,
                        quiz: quiz,
                        securemark: correctanswer,
                        totalmark: totalmark,
                        Wronganswer: Wronganswer,
                        Skipped: Skipped,
                        isNotificationFlag: false,
                        subjectName: scholarship,
                        chapterName: '',
                        allPrevQuiz: quiz,
                        prevYearStudentdata: prevStudentData,
                        ExamQuestionsets: '',
                        previousyearquestionid: previousyearquestionid,
                        scholarship: scholarship,
                        year: matchingYearid.year,
                        scholarshipid: scholarshipid,
                        timeDuration: timeDuration,
                        SubjectList: matchingYearid.subjects,
                        yearid: year,
                      });
                    } else if (ExamName == 'ProbableQuestion') {
                      navigation.navigate('AnswerSheet', {
                        subjectname: subjectName,
                        chapterName: chapterName,
                        securemark: correctanswer,
                        totalmark: totalmark,
                        Wronganswer: Wronganswer,
                        Skipped: Skipped,
                        isNotificationFlag: false,
                        subjectName: scholarship,
                        // screenName: screenName,
                        examSet: examSet,
                        setid: matchingSetid.setid,
                        mostprobablequestionid: mostprobablequestionid,
                        ProbSubjectId: ProbSubjectId,
                        ProbSubjectName: ProbSubjectName,
                        quiz: quiz,
                        studentdata: studentdata,
                        // studentdata: prevStudentData,
                        ExamQuestionsets: '',
                        scholarshipid: scholarshipid,
                        scholarship: scholarship,
                        timeDuration: timeDuration,
                        SubjectList: matchingSetid.subjects,
                        screenName: screenName,
                      });
                    } else {
                      navigation.navigate('AnswerSheet', {
                        subjectname: subjectName,
                        chapterName: chapterName,
                        examSet: examSet,
                        quiz: quiz,
                        securemark: correctanswer,
                        totalmark: totalmark,
                        Wronganswer: Wronganswer,
                        Skipped: Skipped,
                        isNotificationFlag: false,
                        is2ndAvailable: is2ndAvailable,
                        scholarshipName: scholarshipName,
                        subjectId: subjectId,
                        scholarshipid: scholarshipid,
                        topicid: topicid,
                        boardid: boardid,
                        contentid: contentid,
                        percentage: percentage,
                        coursename: coursename,
                      });
                    }
                  }, 1000);
                }}
                style={{
                  paddingVertical: 16,
                  // paddingHorizontal: 30,
                  borderRadius: 50,
                  width: '45%',
                  padding: 10,
                  marginVertical: 15,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: '#FFFFFF',
                  // backgroundColor: '#FFB901',
                  backgroundColor: '#2C7DB5',
                }}>
                {ansloading == true ? (
                  <ActivityIndicator
                    size="small"
                    color={'#0f6f25'}
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
                    color: '#FFFFFF',
                    fontSize: 18,
                    fontWeight: '700',
                    textAlign: 'center',
                  }}>
                  {/* {trans("View Result")} */}
            {/* {trans('View Result')}
                </Text>
              </TouchableOpacity>  */}
            {/* </View> */}

            {/* {percentage >= 90 && (
              <TouchableOpacity
                style={{borderWidth: 1, borderColor: 'gold', borderRadius: 10}}
                onPress={() => {
                  myCustomShare();
                }}>
                <View
                  style={{
                    margin: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '90%',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        // borderWidth:1
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '700',
                          marginLeft: 15,
                          color: '#fff',
                        }}>
                        {trans('Share this result')}
                      </Text>
                    </View>
                    <MaterialIcons
                      name="share"
                      color={'#f1a722'}
                      size={32}
                      style={{height: 30, width: 30}}
                    /> */}
            {/* <Iconz
                      name="chevron-small-right"
                      size={20}
                      color={'#f1a722'}
                    /> */}
            {/* </View>
                </View>
              </TouchableOpacity> */}
            {/* )} */}
          </View>
        </ScrollView>

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            // borderWidth: 2,
            height: device_height * 0.25,
            width: device_width,
            zIndex: -1,
            justifyContent: 'flex-start',
          }}>
          {/* <ImageBackground
            style={{
              height: device_height * 0.25,
              width: device_width,
              position: 'absolute',
              bottom: 0,
              // top: -60,
              // borderWidth:1
            }}
            source={require('../../../assets/jungle.png')}
            resizeMode="contain"></ImageBackground> */}
        </View>
        {/* {reminderModal && (
          <PaymentReminderModal
            reminderModal={reminderModal}
            navigation={() => {
              navigation.navigate('PremiumAccess', {
                screenName: screenName,
                subjectId: subjectId,
                subjectName: subjectName,
                topicid: contentid,
                topicName: topicName,
                ExamQuestionsets: ExamQuestionsets,
                isScoreBoardFlag: false,
                is2ndAvailable: is2ndAvailable,
                index: '',
                quizList: '',
                showFeedback: '',
              });
              // setReminderModal(false);

              handleCloseFunction();
            }}
            // closeFunction={() => setReminderModal(false)}
            closeFunction={() => handleCloseFunction()}
          />
        )} */}
        {modalStatus && ExamName == 'PreviousYear' && TopStudent.length > 0 && (
          <Modal transparent={true} visible={modalStatus}>
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
                onPress={() => setModalStatus(false)}
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
              {/* {loading ? (
              <View
                style={{
                  flex: 1,
                  height: '100%',
                  width: '100%',
                  backgroundColor: 'mistyrose',
                }}>
                <LoadingScreen flag={loading} />
              </View>
            ) : ( */}
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
                  {TopStudent.map((item, index) => {
                    const {
                      name = '',
                      fathername = '',
                      schoolname = '',
                      answerdetails = [],
                      quiz = [],
                      lastexamtotalsecurmark = '',
                      lastexamtimetaken = '',
                      percentage = '',
                    } = item;
                    const hours = Math.floor(lastexamtimetaken / 3600);
                    const minutes = Math.floor((lastexamtimetaken % 3600) / 60);
                    const remainingSeconds = lastexamtimetaken % 60;

                    const formattedHours = hours < 10 ? `0${hours}` : hours;
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
                          marginVertical: 3,
                          padding: 3,
                          backgroundColor: ListColor[index % ListColor.length],
                          elevation: 5,
                        }}>
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
                            backgroundColor: 'rebeccapurple',
                            elevation: 5,
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '900',
                              color: '#fff',
                            }}>
                            {toOrdinalSuffix(index + 1)}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '65%',
                            justifyContent: 'center',
                            paddingVertical: 5,
                            paddingHorizontal: 15,
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
                          {schoolname != undefined && schoolname != '' && (
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
                          {/* {lastexamtimetaken != undefined &&
                          lastexamtimetaken != '' > 0 && (
                            <Text
                              style={{
                                fontSize: 13,
                                fontWeight: '700',
                                color: '#333',
                              }}>
                              {formattedHours}:{formattedMinutes}:
                              {formattedSeconds}
                            </Text>
                          )} */}
                        </View>
                        <View style={{width: '20%'}}>
                          <Text
                            style={{
                              alignSelf: 'center',
                              fontSize: 15,
                              fontWeight: '900',
                              color: Colors.primary,
                            }}>
                            {/* {lastexamtotalsecurmark} */}
                            {`${percentage.toFixed(1)} %`}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
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
                  // marginLeft: 10,
                  // flexDirection: 'row',
                  // borderColor: '#aaa',
                  // borderRadius: 8,
                  // padding: 10,
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
                  onPress={() => setModalStatus(false)}>
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
            </SafeAreaView>
          </Modal>
        )}
        {modalStatus &&
          ExamName == 'ProbableQuestion' &&
          ProbableTopStudent.length > 0 && (
            <Modal transparent={true} visible={modalStatus}>
              <SafeAreaView
                style={{
                  borderRadius: 15,
                  // borderWidth: 1,
                  backgroundColor: 'mistyrose',
                  height: device_height * 0.85,
                  width: device_width * 0.95,
                  alignSelf: 'center',
                  // backgroundColor: '#fff',
                  // flexDirection: 'row',
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
                  onPress={() => setModalStatus(false)}
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
                {/* {loading ? (
              <View
                style={{
                  flex: 1,
                  height: '100%',
                  width: '100%',
                  backgroundColor: 'mistyrose',
                }}>
                <LoadingScreen flag={loading} />
              </View>
            ) : ( */}
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
                    {ProbableTopStudent.map((item, index) => {
                      const {
                        name = '',
                        fathername = '',
                        schoolname = '',
                        answerdetails = [],
                        quiz = [],
                        lastexamtotalsecurmark = '',
                        lastexamtimetaken = '',
                        percentage = '',
                      } = item;
                      const hours = Math.floor(lastexamtimetaken / 3600);
                      const minutes = Math.floor(
                        (lastexamtimetaken % 3600) / 60,
                      );
                      const remainingSeconds = lastexamtimetaken % 60;

                      const formattedHours = hours < 10 ? `0${hours}` : hours;
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
                            marginVertical: 3,
                            padding: 3,
                            backgroundColor:
                              ListColor[index % ListColor.length],
                            elevation: 5,
                          }}>
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
                              backgroundColor: 'rebeccapurple',
                              elevation: 5,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: '900',
                                color: '#fff',
                              }}>
                              {toOrdinalSuffix(index + 1)}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: '65%',
                              justifyContent: 'center',
                              paddingVertical: 5,
                              paddingHorizontal: 15,
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
                            {schoolname != undefined && schoolname != '' && (
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
                            {/* {lastexamtimetaken != undefined &&
                          lastexamtimetaken != '' > 0 && (
                            <Text
                              style={{
                                fontSize: 13,
                                fontWeight: '700',
                                color: '#333',
                              }}>
                              {formattedHours}:{formattedMinutes}:
                              {formattedSeconds}
                            </Text>
                          )} */}
                          </View>
                          <View style={{width: '20%'}}>
                            <Text
                              style={{
                                alignSelf: 'center',
                                fontSize: 15,
                                fontWeight: '900',
                                color: Colors.primary,
                              }}>
                              {/* {lastexamtotalsecurmark} */}
                              {`${percentage.toFixed(1)} %`}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
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
                    // marginLeft: 10,
                    // flexDirection: 'row',
                    // borderColor: '#aaa',
                    // borderRadius: 8,
                    // padding: 10,
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
                    onPress={() => setModalStatus(false)}>
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
              </SafeAreaView>
            </Modal>
          )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ScoreBoard;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 20,
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
