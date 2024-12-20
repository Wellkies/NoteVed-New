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
  IsTabScreen,
} from '../../../constants/Constants.ts';
import PieChart from 'react-native-pie-chart';
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
  selectPremiumPurchaseStatus,
} from '../../redux/reducers/GetPremiumPurchaseReducer';
import {
  getChildContentDetailsAPI,
  getChildRevisionDetailsAPI,
  selectContentsingleChild,
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
// import {
//   TestIds,
//   RewardedAd,
//   RewardedAdEventType,
// } from 'react-native-google-mobile-ads';
import {
  getAdsStatus,
  selectAdsStatus,
  selectAdsStatuss,
} from '../../redux/reducers/GetAdsStatusReducer.ts';
// import {REWARDEDAD} from '../../../constants/ApiPaths.ts';
import {handleExamTimeTaken} from '../../redux/reducers/ExamTimeTakenReducer.ts';
import {getChildProgressDetailAPI} from '../../redux/reducers/GetChildProgressDetailReducer.ts';
import LevelCompleted from './LevelCompleted.tsx';
// import PaymentReminderModal from './CommonScreens/PaymentReminderModal.js';

const ScoreBoard = ({route}) => {
  const dispatch = useDispatch<any>();
  const device_width = Dimensions.get('window').width;
  const device_height = Dimensions.get('window').height;
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const navigation = useNavigation();
  // const [rewardedad, setRewardedad] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  //
  // const [isRewardedAddCalled, setIsRewardedAddCalled] = useState(false);
  // const adUnitId3 = REWARDEDAD;
  const PremiumPurchaseLoad = useAppSelector(selectPremiumPurchaseStatus);
  const AdsStatus = useAppSelector(selectAdsStatus);
  const AdLoadStatuss = useAppSelector(selectAdsStatuss);
  const childContentReducer = useAppSelector(selectContentsingleChild);

  useEffect(() => {
    // initRewardedad();
  }, []);
  useEffect(() => {
    // if (
    //   isLoaded &&
    //   !isRewardedAddCalled &&
    //   PremiumPurchase.length === 0 &&
    //   PremiumPurchaseLoad === 'idle'
    // ) {
    //   rewardedadd();
    //   setIsRewardedAddCalled(true);
    // }
    // if (
    //   isLoaded &&
    //   !isRewardedAddCalled &&
    //   PremiumPurchase.length != 0 &&
    //   AdsStatus?.adstatus == true &&
    //   PremiumPurchaseLoad === 'idle' &&
    //   AdLoadStatuss === 'idle'
    // ) {
    //   rewardedadd();
    //   setIsRewardedAddCalled(true);
    // }
  }, [isLoaded, PremiumPurchaseLoad, AdLoadStatuss]);
  // const initRewardedad = () => {
  //   const rewarded = RewardedAd.createForAdRequest(adUnitId3, {
  //     keywords: ['fashion', 'clothing'],
  //   });
  //   rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
  //     setRewardedad(rewarded);
  //     setIsLoaded(true);
  //   });
  //   rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
  //     initRewardedad();
  //   });
  //   rewarded.load();
  // };
  // const rewardedadd = () => {
  //   if (rewardedad) {
  //     rewardedad.show();
  //   }
  // };
  const {t: trans, i18n} = useTranslation();
  const todayDate = new Date();
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
    islastexercise = false,
    QuestionsList = [],
    bQuiz = [],
    subjectimage = '',
  } = route.params;

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

  const PremiumPurchase = useAppSelector(selectPremiumPurchase);
  const RevisionData = useAppSelector(selectRevisionChild);
  const {paymentid = ''} = PremiumPurchase.length ? PremiumPurchase[0] : [];

  // const {TopicId = ''} = useSelector(state => state.GetTopicIdReducer);
  const TopicId = useAppSelector(selectTopicId);

  const ExamName = useAppSelector(selectExamName);
  //

  useEffect(() => {
    const childContent = {
      contentid,
      childid,
    };

    dispatch(getChildContentDetailsAPI(childContent));
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

  const TopicList = useAppSelector(selectTopicDetails);
  interface prevYearQuestion {
    studentdata: [];
  }
  const PrevYearQuestion = useAppSelector(
    selectPreviousYear,
  ) as prevYearQuestion;
  const {studentdata: prevStudentData = []} = PrevYearQuestion;

  //

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
      //
      dispatch(getPreviousYearQuestionSetAPI(qsSet));
      if (matchingYearid) {
        // If a matching child is found, console log its childId
        if (subjectWise == false && percentage >= 90) {
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
      return true;
    } else if (ExamName == 'ProbableQuestion') {
      //
      const matchingSetid = ProbableQuestions.find(
        child => child.setid == setid,
      );
      //
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
      dispatch(getChildProbableQuestionDetailsAPI(probdata));
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
      let ContentIndex = -1;
      if (selectedTopic != undefined) {
        ContentIndex = selectedTopic.reviewquestionsets.findIndex(
          rec => rec.contentid == contentid,
        );
      }
      if (childid != '') {
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
          AddChildRevisionAPI(revisionbody);
          const RevData = {
            Class: stageid,
            subjectid: subjectId,
            boardid,
            scholarshipid,
            childId: childid,
          };
          // storeSubjectAsyncData();
          dispatch(getChildRevisionDetailsAPI(RevData));
          dispatch(getTopicBySubClassAPI(TopicData));
          const data = {
            //courseid: courseid,
            childid: childid,
          };

          dispatch(getChildProgressDetailAPI(data));

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
        } else {
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
  //

  // const {ProbableTopStudent = []} = useSelector(
  //   state => state.MostProbTopStudentReducer,
  // );
  const TopStudent = useAppSelector(selectTopStudent);
  //
  const ProbableTopStudent = useAppSelector(selectProbTopStudent);
  //
  const ListColor = ['#fee2a3', '#f6c4b9', '#c3ccf5', '#76f0c7'];

  useEffect(() => {
    //const Predata = {childid, stageid, boardid};
    const Predata = {childid};
    //
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

    //
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
      setImageUri(uri);
    });
  }, []);
  useEffect(() => {
    dispatch(getAdsStatus());
  }, []);

  const myCustomShare = async () => {
    const shareOption = {
      message: 'NoteVed CCA',
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
      //
    }
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.navigate('SubjectLevel');
        // navigation.goBack();
        return true;
      });
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        navigation.navigate('SubjectLevel');
        // navigation.goBack();
        return true;
      });
    };
  }, []);
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      const {width, height} = window;
      setOrientation(height >= width ? 'portrait' : 'landscape');
    });
    console.log(orientation, 'Orientation');
    return () => subscription?.remove();
  }, [orientation]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={'#263d2d'} barStyle="light-content" />
      <ImageBackground
        style={{
          width: device_width,
          //height: device_height,
          flex: 1,
          //alignSelf: 'center',
          backgroundColor: '#364D3D',
        }}
        resizeMode="cover">
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{paddingBottom: "30%"}}
          style={{paddingHorizontal:10}}>
          <ViewShot
            ref={ref}
            options={{
              fileName: 'Test_Result',
              format: 'png',
              quality: 0.9,
            }}
            style={{
              backgroundColor: 'rgba(230,230,230, 0.1)',
              height: IsTabScreen ? '90%' : '82%',
              width: IsTabScreen ? device_width * 1 : device_width,
              alignSelf: 'center',
              paddingVertical: IsTabScreen ? 10 : 5,
              paddingBottom: IsTabScreen ? 15 : 10,
              paddingHorizontal: IsTabScreen ? 15 : 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width:  IsTabScreen ?device_width*0.96:device_width * 0.94,
                alignSelf: 'center',
                paddingHorizontal:  IsTabScreen ?15:10,
              }}>
              <View
                style={{
                  width: device_width * 0.3,
                  height: 45,
                  borderWidth: 1,
                  borderColor: '#aaa',
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <FontAwesome
                  name="trophy"
                  size={ IsTabScreen ?22:20}
                  color={'#fff'}
                  style={{marginRight: 10}}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: IsTabScreen ?15: 13,
                    fontWeight: '700',
                  }}>
                  {trans('Quiz Result')}
                </Text>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontWeight: '600', color: '#fff',fontSize: IsTabScreen ?16:14}}>
                  {trans('Quiz attempted on')}
                </Text>
                <Text style={{fontWeight: '600', color: '#fff',fontSize: IsTabScreen ?16:14}}>
                  {moment(todayDate).format('DD-MMM-YYYY')}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                height: IsTabScreen ?'38%':'33%',
              }}>
              <View
                style={{
                  // width: device_width * 0.25,
                  // height: device_width * 0.25,
                  width: IsTabScreen ? device_width * 0.2 : device_width * 0.25,
                  height: IsTabScreen
                    ? device_width * 0.2
                    : device_width * 0.25,
                  backgroundColor: Colors.primary,
                  marginVertical: IsTabScreen ? 30 : 10,
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
                      fontSize: IsTabScreen ?25:20,
                      color: '#fff',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                    }}>
                    {fname} {lname}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize:IsTabScreen ?25: 20,
                      color: '#fff',
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
                    fontSize: IsTabScreen ?18:15,
                    color: '#fff',
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
                      {chapterName.length < 25
                        ? `${chapterName}, `
                        : `${chapterName.substring(0, 20)}...`}
                      {/* {chapterName.trim()},{' '} */}
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
            <Text
              style={{
                fontSize: IsTabScreen ?20:17,
                fontWeight: '700',
                color: '#fff',
                marginLeft: 10,
              }}>
              {trans('RESULT')}
            </Text>
            <View
              style={{
                justifyContent: 'space-around',
                alignSelf: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                borderWidth: 1.5,
                backgroundColor: '#116505',
                borderColor: '#fff',
                borderRadius: 10,
                marginVertical: 5,
                paddingHorizontal: 15,
                width: '98%',
                height:IsTabScreen ?80: 70,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '48%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: IsTabScreen ?55:50,
                }}>
                <Ionicons
                  name="speedometer-outline"
                  color={'gold'}
                  size={IsTabScreen ?45:40}
                  style={{marginHorizontal: 10}}
                />
                <View
                  style={{
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: IsTabScreen ?18:12,
                      fontWeight: '600',
                      color: 'gold',
                    }}>
                    {trans('Mark Scored')}
                  </Text>
                  <Text
                    style={{
                      fontSize: IsTabScreen ?18:15,
                      fontWeight: '900',
                      color: '#fff',
                    }}>
                    {`${correctanswer}/${totalmark}`}
                  </Text>
                </View>
              </View>
            </View>
            <Text
              style={{
                fontSize: IsTabScreen ?20:17,
                fontWeight: '700',
                color: '#fff',
                marginLeft: IsTabScreen ?15:10,
                marginTop: IsTabScreen ?15:10,
              }}>
              {trans('Quiz Statistics')}
            </Text>
            <View
              style={{
                justifyContent: 'space-between',
                alignSelf: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                borderWidth: 1.5,
                backgroundColor: '#116505',
                borderColor: '#fff',
                borderRadius: 10,
                marginVertical: 5,
                paddingHorizontal: 15,
                width: '98%',
                height:IsTabScreen ?80: 70,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '31%',
                  // borderWidth:1
                }}>
                <View
                  style={{
                    height:IsTabScreen ?30: 27,
                    width: IsTabScreen ?30:27,
                    backgroundColor: 'lime',
                    marginRight: IsTabScreen ?15:10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 3,
                  }}>
                  <Text
                    style={{
                      fontSize: IsTabScreen ?18:15,
                      fontWeight: '700',
                      color: '#fff',
                    }}>
                    {`${correctanswer}`}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: IsTabScreen ?18:15,
                    fontWeight: '700',
                    color: '#fff',
                    width: '75%',
                  }}>
                  {trans('Correct')}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '30%',
                  // borderWidth:1
                }}>
                <View
                  style={{
                    height:IsTabScreen ?30: 27,
                    width: IsTabScreen ?30:27,
                    backgroundColor: 'crimson',
                    marginRight: IsTabScreen ?15:10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 3,
                  }}>
                  <Text
                    style={{
                      fontSize: IsTabScreen ?18:15,
                      fontWeight: '700',
                      color: '#fff',
                    }}>
                    {`${Wronganswer}`}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: IsTabScreen ?18:15,
                    fontWeight: '700',
                    color: '#fff',
                    width: '75%',
                  }}>
                  {trans('Wrong')}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // borderWidth:1,
                  width: '35%',
                }}>
                <View
                  style={{
                    height:IsTabScreen ?30: 27,
                    width: IsTabScreen ?30:27,
                    backgroundColor: 'white',
                    marginRight: IsTabScreen ?15:10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 3,
                  }}>
                  <Text
                    style={{
                      fontSize: IsTabScreen ?18:15,
                      fontWeight: '700',
                      color: 'green',
                    }}>
                    {`${Skipped}`}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: IsTabScreen ?18:15,
                    fontWeight: '700',
                    color: '#fff',
                    width: '75%',
                  }}>
                  {trans('Skipped')}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: 15,
                justifyContent: 'space-around',
                height: device_width * 0.3,
                marginHorizontal: 10,
                width: '100%',
                backgroundColor: '#263d2d',
                marginTop: 15,
              }}>
              <View>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: IsTabScreen ?18:15,
                  }}>
                  {trans('Percentage : ')}
                  {percentage} {'%'}
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: IsTabScreen ?18:15,
                  }}>
                  {trans('Total Mark : ')}
                  {totalmark}
                </Text>
              </View>
              <PieChart
                // doughnut={true}
                coverRadius={0.45}
                widthAndHeight={IsTabScreen?device_width * 0.20:device_width * 0.25}
                series={series}
                sliceColor={sliceColor}
                coverFill={'#263d2d'}
              />
            </View>
          </ViewShot>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: device_width,
              //height:IsTabScreen ?'90%': '9%',
              paddingVertical: 10,
              alignSelf: 'center',
              marginTop: 10,
              flexWrap: 'wrap',
              gap: 12,
            }}>
            <TouchableOpacity
              onPress={() => {
                console.log(
                  percentage,
                  '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%',
                );

                if (percentage < 90) {
                  const bodydata = {
                    subjectid: subjectId,
                    childid: childid,
                  };
                  //
                  dispatch(handleExamTimeTaken(0));
                  navigation.navigate('MockTests', {
                    screenName: 'ExamSets',
                    subjectName: subjectName,
                    coursename: coursename,
                    chapterName: topicName,
                    examSet: examSet,
                    contentid: contentid,
                    isReattempt: true,
                    bQuiz: bQuiz,
                    studentdata: studentdata,
                    ExamQuestionsets: quiz,
                    subjectId: subjectId,
                    timeDuration: timeDuration,
                    is2ndAvailable: is2ndAvailable,
                    topicid: topicid,
                    //topic: topic,
                    islastexercise: islastexercise,
                    subjectimage: subjectimage,
                  });
                } else if (!islastexercise) {
                  console.log(islastexercise, 'islastexercise');

                  const datas = {
                    //courseid: courseid,
                    childid: childid,
                  };
                  dispatch(getChildProgressDetailAPI(data));
                  const bodydata = {
                    subjectid: subjectId,
                    childid: childid,
                  };
                  dispatch(getTopicBySubIdAPI(bodydata));
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
                    subjectimage: subjectimage,
                  });
                } else {
                  console.log(islastexercise, 'islastexercise');
                  const datas = {
                    //courseid: courseid,
                    childid: childid,
                  };
                  dispatch(getChildProgressDetailAPI(datas));
                  const bodydata = {
                    subjectid: subjectId,
                    childid: childid,
                  };
                  dispatch(getTopicBySubIdAPI(bodydata));
                  navigation.navigate('TopicDetails', {
                    coursename: coursename,
                    subjectname: subjectName,
                    subjectid: subjectId,
                    subjectimage: subjectimage,
                  });
                }
              }}
              style={{
                paddingVertical: IsTabScreen ? 15 : 10,
                borderRadius: 10,
                //width: '42%',
                width: device_width * 0.44,
                marginHorizontal: 5,
                borderWidth: 1,
                borderColor: '#FFB901',
                backgroundColor: 'rgba(250,250,250,0.1)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#FEFEFE',
                  fontSize:  IsTabScreen ? 18 :15,
                  fontWeight: '600',
                }}>
                {percentage >= 90 ? 'Next' : 'Re-attempt'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={ansloading == true}
              onPress={() => {
                setAnsLoading(true);
                setTimeout(() => {
                  setAnsLoading(false);
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
                    studentdata: studentdata,
                    isReattempt: true,
                  });
                }, 1000);
              }}
              style={{
                paddingVertical:  IsTabScreen ? 15 :10,
                borderRadius: 10,
                //width: '42%',
                width: device_width * 0.44,
                // marginVertical: 15,
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
              {ansloading == true ? (
                <ActivityIndicator
                  size="small"
                  color={'#FFB901'}
                  style={{
                    alignSelf: 'flex-start',
                    paddingRight: 10,
                  }}
                />
              ) : (
                <></>
              )}
              <Text
                style={{
                  color: '#fff',
                  fontSize: IsTabScreen ? 18 :15,
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                {trans('View Result')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SubjectLevel');
              }}
              style={{
                paddingVertical: IsTabScreen ? 15 : 10,
                borderRadius: 10,
                width: IsTabScreen? device_width*0.44:device_width * 0.44,
                marginHorizontal: 5,
                borderWidth: 1,
                borderColor: '#FFB901',
                backgroundColor: 'rgba(250,250,250,0.1)',
                alignItems: 'center',
                justifyContent: 'center',
                //flexBasis: IsTabScreen ? '48%' : '44%',
              }}>
              <Text style={{color: '#FEFEFE', fontSize: IsTabScreen ? 18 :15, fontWeight: '600'}}>
                Home
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                myCustomShare();
              }}
              style={{
                paddingVertical: IsTabScreen ? 15 : 10,
                borderRadius: 10,
                width: IsTabScreen? device_width*0.44:device_width * 0.44,
                marginHorizontal: 5,
                borderWidth: 1,
                borderColor: '#FFB901',
                backgroundColor: 'rgba(250,250,250,0.1)',
                alignItems: 'center',
                justifyContent: 'center',
                //flexBasis: IsTabScreen ? '48%' : '44%',
                flexDirection: 'row',
              }}>
              <Text style={{color: '#FEFEFE', fontSize:IsTabScreen?18: 15, fontWeight: '600'}}>
                Share Report
              </Text>
              <MaterialIcons
                name="share"
                color={'#f1a722'}
                size={IsTabScreen?24:22}
                // style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
          </View>
          {percentage >= 90 && islastexercise && <LevelCompleted />}
        </ScrollView>
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
