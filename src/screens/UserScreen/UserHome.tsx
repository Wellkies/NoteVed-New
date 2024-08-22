import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Linking,
  BackHandler,
  StyleSheet,
  TextInput,
  NativeModules,
} from 'react-native';
import React, { useState, useEffect, useContext, useMemo } from 'react';
// import Header from '../AppScreens/CommonScreens/Header';
import { Avatar, Modal } from 'react-native-paper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../../context';
import Iconz from 'react-native-vector-icons/Entypo';
import { useTranslation } from 'react-i18next';
// import {
//   // deleteChildApi,
//   getChildDetailsAPI,
//   // getChildsByParentAPI,
//   getMostProbableQuestionAPI,
//   getChildProbableQuestionDetailsAPI,
//   getPreviousYearQuestionAPI,
//   getScholarshipByClassAPI,
//   getSubjectByClassAPI,
//   getUserDetails,
//   getScholarshipPremiumAPI,
//   handleSetExamName,
//   createFcmTokenApi,
//   getAppVersionApi,
//   getZoomclassAPI,
//   getAllQuizByFCMQuizidAPI,
//   getTopicBySubClassAPI,
//   createDeviceInfoApi,
//   getReviewFeedbackAPI,
//   getEmergencyMessageAPI,
//   getStudentReviewApi,
//   getAllRecordClassAPI,
//   getChildRevisionDetailsAPI,
//   getDailyFactByDateAPI,
// } from '../../redux/actions/Action';
import Colors from '../../../assets/Colors';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconx from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { device_height, device_width } from '../style';
// import {
//   GET_ALL_RECORDCLASS,
//   GET_SCHOLARSHIP_LIST,
//   GET_SUBJECT_BY_CLASS,
//   SET_CHILD_INFO,
// } from '../../redux/actions/actiontypes';
// import LoadingScreen from '../AppScreens/LoadingScreen';
// import CommonModalUser from './CommonModalUser';
// import Kid_Detail from './Kid_Detail';
import UpdateModal from '../CommonScreens/UpdateModal';
import DeviceInfo from 'react-native-device-info';
// import ProfileTabNavigation from '../../navigation/ProfileTabNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import NetInfo from '../AppScreens/CommonScreens/NetInfo';
import { useNetInfo } from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
import CommonMessage from '../../../constants/CommonMessage';
import moment from 'moment';
import * as Progress from 'react-native-progress';
// import CircularProgress from 'react-native-circular-progress-indicator';
// import CommonFeedback from '../AppScreens/CommonScreens/CommonFeedback';
// import MaintenanceModal from '../AppScreens/CommonScreens/MaintenanceModal';
import { ImageBackground } from 'react-native';
import Storage from '../../utils/AsyncStorage';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '../CommonScreens/NetInfo';
import {
  getChildDetailsAPI,
  selectStudentInfo,
  selectStudentStatus,
} from '../../redux/reducers/StudentInfoReducer';
import { RootState } from '../../redux/store/Store';
import {
  getSubjectByClassAPI,
  selectSubjectInfo,
  selectSubjectStatus,
} from '../../redux/reducers/GetSubjectByClassReducer';
import {
  getTopicBySubClassAPI,
  selectTopicInfo,
} from '../../redux/reducers/GetTopicBySubjectReducer';
import { useAppNavigation } from '../../navigation/types';
import {
  getPreviousYearQuestionAPI,
  selectPreviousYear,
  selectPreviousYearStatus,
} from '../../redux/reducers/GetPrevYearQuesReducer';
import {
  getChildProbableQuestionDetailsAPI,
  selectMostProbableData,
  selectMostProbableDataStatus,
} from '../../redux/reducers/GetMostProbQuesReducer';
import { getScholarshipPremiumAPI } from '../../redux/reducers/GetPremiumPurchaseReducer';
import {
  getScholarshipByClassAPI,
  selectStudentScholarship,
} from '../../redux/reducers/GetAllScholarshipReducer';
import { CreateFcmTokenAPI } from '../../redux/actions/CreateFCMtokenAPI';
import {
  getDailyFactByDateAPI,
  selectDailyFactInfo,
  selectDailyFactStatus,
} from '../../redux/reducers/GetDailyFactByDateReducer';
import { getZoomclassAPI } from '../../redux/reducers/GetZoomClassReducer';
import {
  getDailyMessageByDateAPI,
  selectDailyMessageStatus,
  selectDailyMessagetInfo,
} from '../../redux/reducers/GetDailyMessageByDateReducer';
import {
  CheckDeviceTokenApi,
  selectDeviceToken,
  selectDeviceTokenStatus,
} from '../../redux/reducers/GetDeviceTokenReducer';
import { logout, selectUserInfo } from '../../redux/reducers/loginReducer';
import LoadingScreen from '../CommonScreens/LoadingScreen';
import {
  selectStudentLanguage,
  setLanguage,
} from '../../redux/reducers/languageReducer';
import { IsTabScreen } from '../../../constants/Constants';
import { getAppVersionApi } from '../../redux/actions/CheckAppVersion';
import { handleSetTopicIdForRevision } from '../../redux/reducers/GetTopicIdReducer';
import { getChildProgressAPI, selectChildProgressData, selectProgressStatus } from '../../redux/reducers/GetChildProgressReducer';

// import * as StoreReview from 'react-native-store-review';
// import InAppUpdateComponent from './InAppUpdate'
// import CommonTimer from './../AppScreens/CommonScreens/CommonTimer'

const UserHome = () => {
  const { t: trans, i18n } = useTranslation();
  const navigation = useAppNavigation();
  const [loading, setLoading] = useState(false);
  const [idData, setIdData] = useState();
  // const [btnLoading, setBtnLoading] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [childList, setChildList] = useState([]);
  const [selectedRecordToDelete, setSelectedRecordToDelete] = useState('');
  const [appStatus, setAppStatus] = useState({});
  const [appId, setAppId] = useState('');
  const [appVersion, setAppVersion] = useState();
  const [appVisible, setAppVisible] = useState();
  // 
  const currentappVersion = DeviceInfo.getVersion();
  const [updateModalStatus, setUpdateModalStatus] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const [selectedBtn, setSelectedbtn] = useState([]);
  const [scholarshipName, setScholarshipName] = useState('');
  const [scholarshipId, setScholarshipId] = useState('');
  const [selectedId, setSelectedId] = useState(0);
  const [noSub, setNoSub] = useState(false);
  // 
  const [refreshing, setRefreshing] = React.useState(false);
  const [progressdata, setProgressdata] = useState(0);
  const [maintenance, setMaintenance] = useState(true);
  const { signOut } = useContext(AuthContext);
  const [activeSlide, setActiveSlide] = useState(0);
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dispatch = useDispatch<any>();
  // console.log(
  //   scholarshipId,
  //   'scholarshipId............................',
  //   scholarshipName,
  //   'scholarshipName.........',
  // );
  // const {childInfo = {}, error: child_error = ''} = useSelector(
  //   state => state.ChildDetailsReducer,
  // );

  const childInfo = useAppSelector(selectStudentInfo) as ChildInfo;
  const child_error = useAppSelector(selectStudentStatus);
  const { authToken, status, userInfo = {} } = useAppSelector(selectUserInfo);

  const SubjectByClass = useAppSelector(selectSubjectInfo);
  const btnLoading = useAppSelector(selectSubjectStatus);

  const PrevYearQuestion = useAppSelector(selectPreviousYear);
  const PrevLoad = useAppSelector(selectPreviousYearStatus);

  const ProbableQuestions = useAppSelector(selectMostProbableData);
  const ProbLoad = useAppSelector(selectMostProbableDataStatus);

  // const DailyImageArrayCBSE = [
  //   require('../../../assets/eng_dyk.png'),
  //   require('../../../assets/english_dyk.jpg'),
  // ];
  // const DailyImageArrayBSE = [
  //   require('../../../assets/odia_dyk.jpg'),
  //   require('../../../assets/odi_dyk.jpg'),
  // ];
  // const DailyMessageImage = [require('../../../assets/DailyMsg.png')];
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

  // const { AllFCMquiz = [] } = useSelector(state => state.GetAllFCMquizReducer);
  const [feedbackModalStatus, setFeedbackModalStatus] = useState(false);
  const [succesCodeModal, setsuccesCodeModal] = useState(false);
  const [emergencyModal, setEmergencyModal] = useState(false);
  const [info, setInfo] = useState(false);

  const [good, setGood] = useState(false);
  const [avg, setAvg] = useState(false);
  const [bad, setBad] = useState(false);
  const [selectFeedBack, setSelectFeedback] = useState('');
  // const [values, setValue] = useState(reaction);
  //
  const handleSelectEmoji = (data: any) => {
    //
    // reaction==data
    // setValue(data);
    setSelectFeedback(data);
    // setValue(data)
    //
  };
  //

  // const { EmergencyMsg = {} } = useSelector(
  //   state => state.GetEmergencyMsgReducer,
  // );
  // const {
  //   headermessage = '',
  //   bodymessage = '',
  //   // childid= '',
  //   link = '',
  //   appversion = '',
  //   priority = false,
  // } = Object.keys(EmergencyMsg).length > 0 ? EmergencyMsg : {};
  // console.log(
  //   EmergencyMsg,
  //   'EmergencyMsg...................',
  //   Object.keys(EmergencyMsg).length,
  // );

  const [currentDate, setCurrentDate] = useState(new Date());
  // const [isJoin, setIsJoin] = useState('');
  // const handleJoin = () => {
  //   setIsJoin(!isJoin);
  // };

  const {
    _id: id = '',
    stageid = '',
    childid = '',
    boardid = '',
    stage = '',
    scholarship = [],
    name: userName = '',
    fname = '',
    gender = '',
    lname = '',
    email = '',
    phone = '',
    // cityname = '',
    image = '',
    age = '',
    address = '',
    // cityid = '',
    language = '',
    // coordinates='',
  } = userInfo;

  //

  const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  // const { StudentReview = [] } = useSelector(
  //   state => state.GetStudentReviewReducer,
  // );
  // const { data: StudentReviewData = [] } =
  //   StudentReview != '' ? StudentReview : {};
  // let studentRevData = StudentReview != '' && StudentReview.data.length;
  //

  const _retrieveFcmToken = async (childid: string, userName: string) => {
    //
    try {
      //
      let value: string | null = null;
      // value = await AsyncStorage.getItem('fcmToken');
      value = await Storage.getObject('@auth_Token');
      //
      const bodyData = {
        childid: childid,
        usertype: 'NoteVook',
        token: value,
        childname: `${userName}`,
      };
      //
      if (value !== null) {
        // We have data!!
        dispatch(CreateFcmTokenAPI(bodyData));
        // setFcmToken(value);
        // // //
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  // const getPremiumMember = async () => {
  //   //
  //   const scholarArray = [
  //     { scholarshipName: 'Adarsh', scholarshipId: 'NVOOKADA1690811843420' },
  //     { scholarshipName: 'Adarsh', scholarshipId: '1694585680296' },
  //     { scholarshipName: 'Navodaya', scholarshipId: 'Navodaya1690353664697' },
  //     { scholarshipName: 'CBSENavodaya', scholarshipId: '1697518423791' },
  //   ];
  //   const jsonData = JSON.stringify(scholarArray);
  //   await AsyncStorage.setItem('scholarArray', jsonData);
  //   // try {
  //   //   //
  //   //   let value = '';
  //   //   await AsyncStorage.getItem('fcmToken').then(data => {
  //   //     value = data;
  //   //   });
  //   //   //

  //   //

  //   // } catch (error) {
  //   //   // Error retrieving data
  //   // }
  // };

  // const {scholarshipList = []} = useSelector(
  //   state => state.GetAllScholarshipReducer,
  // );

  const scholarshipList = useAppSelector(selectStudentScholarship);
  const schshipLoading = useAppSelector(selectStudentStatus);

  const ChildCourseProgress = useAppSelector(selectChildProgressData);
  const CourseProgressLoad = useAppSelector(selectProgressStatus);

  console.log(
    ChildCourseProgress,
    '......ChildCourseProgress....................', CourseProgressLoad
  );

  const InAppUpdate = NativeModules.InAppUpdate;
  const CheckToken = useAppSelector(selectDeviceToken);

  useEffect(() => {
    handleSelect();

    // const inappupdated = InAppUpdate.checkUpdate();
    // 

    // dispatch(getDailyFactByDateAPI());
    //
    //   // StoreReview.requestReview();
    //   // deviceInfo();
    //   // let deviceId = DeviceInfo.getDeviceId();
    //   //
    //   // DeviceInfo.getIpAddress().then((ip) => {

    //   //   // const getData= async () => {
    //   //   // await AsyncStorage.getItem('userToken').then(data => {
    //   //   //   if (data !== null) {
    //   //   //
    //   //   //     token = data;
    //   //   //   }
    //   //   // });
    //   //   const deviceInfoBody = {
    //   //     childid: childid,
    //   //     deviceid: deviceId,
    //   //     ipaddress: ip,
    //   //     devicetoken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDRkOGViNDllNTI0OWM0MDk2N2I1YyIsImlhdCI6MTY5ODQxNjMwMCwiZXhwIjoxNzI5OTUyMzAwfQ.qy88TjGG_JHLy7dgPLMnMvqaAPXk9aW_J3WIdNLeu8Q",
    //   //   };
    //   //
    //   //   dispatch(createDeviceInfoApi(deviceInfoBody, undefined));
    //   // // }
    //   // });
    //   //
    //   // const deviceInfoBody = {
    //   //   childid: childid,
    //   //   deviceid: deviceId,
    //   //   ipaddress: ip,
    //   //   devicetoken: '',
    //   // };
    //   // dispatch(createDeviceInfoApi(deviceInfoBody, undefined));
    // if (fname == '') {
    //   onRefresh();
    //   commonCallback();
    // }

    commonCallback();
    //   dispatch(getAllQuizByFCMQuizidAPI(childid, stageid, boardid));
    {
      child_error == 'failed' ? navigation.navigate('MaintenanceModal') : <></>;
    }
    navigation.addListener('focus', () => {
      // child_error == 'failed' ?navigation.navigate('MaintenanceModal'):<></>;

      // dispatch(getEmergencyMessageAPI(undefined, currentappVersion));
      // dispatch(getStudentReviewApi(undefined));
      // dispatch(getAllQuizByFCMQuizidAPI(childid, stageid, boardid));
      //     // commonCallback();
      BackHandler.addEventListener('hardwareBackPress', () => {
        //       // if (StudentReview != '' && studentRevData < 1) {
        //       //   setFeedbackModalStatus(true);
        //       // } else {
        //       //   BackHandler.exitApp();
        //       // }
        BackHandler.exitApp();
        return true;
      });
    });
  }, [boardid, stageid]);
  // }, [boardid, stageid, child_error]);

  const handleNavigation = (subject: string, subjectid: string, topicDetails: any) => {

    const getTopicDetails = topicDetails.map(r => r.sltopic)
    let numberArray = [];
    const length = getTopicDetails.length;
    for (let i = 0; i < length; i++) {
      numberArray.push(parseInt(getTopicDetails[i]));
    }

    const lowest = Math.min(...numberArray);
    topicDetails.map((item, index) => {
      const findFirstEmptyObject = () => {
        for (let i = 0; i < topicDetails.length; i++) {
          if (Array.isArray(topicDetails[i].studenttopic) && topicDetails[i].studenttopic.length === 0) {
            return topicDetails[i];
          }
        }
        return null;
      };
      const findFirstEmptyObjectdata = findFirstEmptyObject()

      const {
        topicimage = "",
        sltopic = "",
        studenttopic = [],
        reviewquestionsets = [],
        topic = '',
        topicid = "",
      } = findFirstEmptyObjectdata

      reviewquestionsets.map((rec, idx) => {
        const {
          id = "",
          // topic = "",
          contentset = "",
          timeDuration = "",
          contentid = "",
          isPremium = false
        } = rec

        dispatch(handleSetTopicIdForRevision(topicid))
        navigation.navigate('ExamSets', {
          // index: index,
          subjectName: subject,
          subjectId: subjectid,
          topicName: topic,
          topicid: topicid,
          ExamQuestionsets: reviewquestionsets,
          Class: stageid,
          boardid: boardid,
          scholarshipName: scholarshipName,
          scholarshipid: scholarshipId,
          childId: childid,
          isScoreBoardFlag: false,
          isProgressFlag: true,
          // is2ndAvailable: index,
        });
      })
    })
  };

  const DailyFact = useAppSelector(selectDailyFactInfo);
  const factLoading = useAppSelector(selectDailyFactStatus);
  const DailyMessage = useAppSelector(selectDailyMessagetInfo);
  const DailyMessageLoading = useAppSelector(selectDailyMessageStatus);

  //

  // interface Info {
  //   feedback?: string;
  //   reaction?: string;
  // }

  // const { feedback = '', reaction = '' } = info as unknown as Info;

  // const handleInputChange = (inputName: string, inputValue: string) => {
  //   if (inputName == 'feedback') {
  //     setInfo(Info => ({ ...Info, [inputName]: inputValue }));
  //   }
  // };

  // const handleFeedbackSubmit = () => {
  //   const feedbackBodyData = {
  //     childid: childid,
  //     reviewmessage: feedback,
  //     reviewstar: selectFeedBack,
  //     createon: '',
  //     updatedon: '',
  //   };
  //
  //   dispatch(
  //     getReviewFeedbackAPI(
  //       feedbackBodyData,
  //       handleFeedbackCallback,
  //       setLoading,
  //     ),
  //   );
  // };

  // const handleFeedbackCallback = () => {
  //   setsuccesCodeModal(true);
  //   exitAppHandler();
  // };

  // const exitAppHandler = () => {
  //   //
  //   setTimeout(() => {
  //     setsuccesCodeModal(false);
  //     setFeedbackModalStatus(false);
  //     BackHandler.exitApp();
  //   }, 6000);
  // };

  // let Data: string;
  // const user = Storage.getObject("@user")
  //   // Data = JSON.parse(user);
  //

  const commonCallback = async () => {
    // setLoading(true);

    // let token = '';
    // await AsyncStorage.getItem('userToken').then(data => {
    //   if (data !== null) {
    //     token = data;
    //   }
    // });
    let value: string | null = null;
    value = await AsyncStorage.getItem('fcmToken');

    // const user = await Storage.getObject('@user');
    const user = userInfo;
    const userid = user._id;
    const stageid = user.stageid;
    const boardid = user.boardid;
    const childid = user.childid;
    const progress = {
      stageid,
      boardid,
      scholarshipid: scholarshipId,
      childid
    }

    dispatch(getChildDetailsAPI(userid));
    dispatch(getDailyFactByDateAPI(boardid));
    dispatch(getDailyMessageByDateAPI(boardid));
    dispatch(
      getAppVersionApi(setAppId, setAppVersion, setAppStatus, setAppVisible),
    );
    dispatch(getChildProgressAPI(progress));
    handleParentCallBack(user);

    // Data = JSON.parse(user);
    // setIdData(user._id)
    //
    //
    // if (user != null && userid != null)
    //   dispatch(
    //     getChildDetailsAPI(
    //       undefined,
    //       signOut,
    //       userid,
    //       setLoading,
    //       handleParentCallBack
    //     ),
    //   );
    // if (Data != null && Data.childid != null) {
    //   //
    //   dispatch(getAllQuizByFCMQuizidAPI(Data.childid,Data.stageid,Data.boardid));
    // }
    // getUserInfoAPI(undefined, signOut, setLoading, handleParentCallBack),

    // dispatch(getChildsByParentAPI(undefined, setLoading, handleParentCallBack));
    // dispatch(getUserDetails(handleParentCallBack));

    // dispatch(getAppVersionApi(setAppId, setAppVersion, setAppStatus));
    // dispatch(
    //   getZoomclassAPI(ResultArray[index].scholarshipid, stageid, boardid),
    // );
  };

  // const { SubjectByClass = [] } = useSelector(
  //   state => state.GetSubjectByClassReducer,
  // );
  //   const [dateVal, setDateVal] = useState(new Date());
  //

  // const { zoomClassList = [] } = useSelector(state => state.GetZoomClassReducer);
  //
  // const liveClassExist = zoomClassList.filter(
  //   recliv =>
  //   recliv.zoomdate,
  // );
  //
  // const inProgressLiveData=liveClassExist.map(rec=>rec>=dateVal)
  //
  // const { PremiumPurchase = [] } = useSelector(
  //   state => state.GetPremiumPurchaseReducer,
  // );
  // //

  // const { PrevYearQuestion = [] } = useSelector(
  //   state => state.GetPrevYearQuesReducer,
  // );
  // //

  // const { ProbableQuestions = [] } = useSelector(
  //   state => state.GetMostProbQuesReducer,
  // );
  //

  //

  const handleParentCallBack = async (childInfo: any) => {
    //
    // {
    //   Object.keys(EmergencyMsg).length > 0
    //     ? setEmergencyModal(true)
    //     : setEmergencyModal(false);
    // }
    const {
      scholarship = [],
      stageid = '',
      boardid = '',
      stage = '',
      childid = '',
      name = '',
      language = '',
    } = childInfo;
    dispatch(setLanguage(language));
    // console.log(
    //   scholarship,
    //   '---------------scholarship///////////////',
    // );
    // handleReset();
    await _retrieveFcmToken(childid, name);
    // await getPremiumMember();
    const tempdata = [...scholarship];
    //
    let list =
      tempdata != undefined && tempdata.length
        ? tempdata.map(rec => {
          return { ...rec, isSelected: false };
        })
        : [];
    //

    // dispatch({
    //   type: GET_SCHOLARSHIP_LIST,
    //   payload: list,
    // });
    //
    if (stageid != '' && boardid != '') {
      handleCallback(list, stageid, boardid, childid, stage);
    }
    // setLoading(false);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    commonCallback();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    // asydat();
    dispatch(
      getAppVersionApi(setAppId, setAppVersion, setAppStatus, setAppVisible),
    );
    //
    if (
      appVersion != '' &&
      appVersion != undefined &&
      appVisible != '' &&
      appVisible != undefined
    ) {
      setUpdateModalStatus(
        appVersion != '' &&
          appVersion != currentappVersion &&
          appVisible == 'true'
          ? true
          : false,
        // false,
      );
      // if (appVersion != '' && appVersion != currentappVersion) {
      //   // signOut();
      // }
    }
  }, [appVersion, appVisible]);

  // useMemo(() => {
  //   //
  //   if (appStatus != null && Object.keys(appStatus).length > 0) {
  //     // console.log(
  //     //   appStatus,
  //     //   appStatus.error == true,
  //     //   appStatus.error,
  //     //   'appStatus.error',
  //     // );
  //     if (appStatus.error == true) {
  //       setUpdateModalStatus(true);
  //       setErrorFlag(true);
  //     }
  //   }
  // }, [appStatus]);
  useEffect(() => {
    if (language != '') i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
    });
  }, []);

  //====================================================================
  const handleSelect = async (index, list) => {
    //
    let tempArray = list != undefined ? [...list] : [...selectedBtn];
    //
    tempArray.map(rec => (rec.isSelected = false));

    let ResultArray = [...selectedBtn];
    ResultArray[index].isSelected = true;
    setSelectedbtn(ResultArray);

    let SchlrshipName = ResultArray[index].scholarshipname;
    let SchlrshipId = ResultArray[index].scholarshipid;
    setScholarshipName(SchlrshipName);
    setScholarshipId(SchlrshipId);
    const {
      stageid = '',
      boardid = '',
      stage = '',
      childid = '',
      fname = '',
    } = childInfo;

    Storage.storeObject('SchlrshipId', SchlrshipId);

    let scholarshipid = SchlrshipId;
    const prevQues = {
      stageid,
      boardid,
      scholarshipId: SchlrshipId,
      childid,
    };
    const data = {
      stageid,
      boardid,
      scholarshipid: SchlrshipId,
    };
    // const Premiumdata = {
    //   childid,
    //   stageid,
    //   boardid,
    // };
    const Premiumdata = {
      childid
    };
    const zoomdata = {
      scholarshipid,
      stageid,
      boardid,
    };
    const progress = {
      stageid,
      boardid,
      scholarshipid,
      childid
    }

    if (ResultArray.length) {
      dispatch(getPreviousYearQuestionAPI(prevQues));
    }
    dispatch(getSubjectByClassAPI(data));
    dispatch(getChildProbableQuestionDetailsAPI(prevQues));
    dispatch(getScholarshipPremiumAPI(Premiumdata));
    dispatch(getZoomclassAPI(zoomdata));
    dispatch(getChildProgressAPI(progress));
  };

  const handleCallback = async (
    list: any,
    stageid: number,
    boardid: number,
    childid: string,
    stage: number,
  ) => {
    //
    let data = [...list];
    let asyncScholarshipValue = '';
    asyncScholarshipValue = await Storage.getObject('SchlrshipId');

    let Dtaindex = data.findIndex(
      rec => rec.scholarshipid == asyncScholarshipValue,
    );
    const indexvalue = Dtaindex != -1 ? Dtaindex : 0;

    if (data.length > 0) {
      data[indexvalue].isSelected = true;
      let SchlrshipName = data[indexvalue].scholarshipname;
      let SchlrshipId = data.length > 0 ? data[indexvalue].scholarshipid : '';
      setScholarshipName(SchlrshipName);
      setScholarshipId(SchlrshipId);
      Storage.storeObject('SchlrshipId', SchlrshipId);
    }
    if (data.length > 0) {
      const scholarshipidval = data[indexvalue].scholarshipid;
      let scholarshipId = scholarshipidval;
      let scholarshipid = scholarshipidval;

      const prevQues = {
        stageid,
        boardid,
        scholarshipId,
        childid,
      };
      const subdata = {
        stageid,
        boardid,
        scholarshipid: scholarshipId,
      };
      const Premiumdata = {
        childid,
        stageid,
        boardid,
      };
      const zoomdata = {
        scholarshipid,
        stageid,
        boardid,
      };
      const progress = {
        stageid,
        boardid,
        scholarshipid,
        childid
      }

      dispatch(getPreviousYearQuestionAPI(prevQues));
      dispatch(getSubjectByClassAPI(subdata));
      dispatch(getChildProbableQuestionDetailsAPI(prevQues));
      dispatch(getScholarshipPremiumAPI(Premiumdata));
      dispatch(getZoomclassAPI(zoomdata));
      dispatch(getChildProgressAPI(progress));
    }
    setSelectedbtn(data);
    // handleSelect(0, list);
  };

  const previousYearSetList = PrevYearQuestion.length;
  let previousYearQuestionList = 0;
  // PrevYearQuestion.map(rec => (previousYearQuestionList += rec.quiz.length));

  const probableQuesSetList = ProbableQuestions.length;
  let probableQuestionList = 0;
  // ProbableQuestions.map(rec => (probableQuestionList += rec.quiz.length));
  // console.log(
  //   probableQuestionList,
  //   probableQuesSetList,
  //   'probableQuesSetList========',
  // );

  const SetQuestions = [
    {
      image: require('../../../assets/test.png'),
      label1: `${trans('Previous Year Questions')}`,
      isPrevious: true,
      contentSet: `${previousYearSetList}+ ${trans('Sets')}`,
      // , ${previousYearQuestionList}+ ${trans('Questions')}`,
      isPremium: false,

      navigationfunc: () => {
        navigation.navigate('PrevYearQues', {
          scholarshipId: scholarshipId,
          scholarshipName: scholarshipName,
          showFeedback: false,
        });
      },
      label2: 'Reattempt',
    },

    {
      image: require('../../../assets/test.png'),
      label1: `${trans('Most Probable Questions')}`,
      contentSet: `${probableQuesSetList}+ ${trans('Sets')}`,
      // , ${probableQuestionList}+ ${trans('Questions')}`,
      isPremium: false,
      isPrevious: false,
      navigationfunc: () => {
        navigation.navigate('ProbQuestion', {
          scholarshipName: scholarshipName,
          showFeedback: false,
          scholarshipID: scholarshipId,
        });
      },
    },
  ];

  // const storeTopicAsyncData = async subjectId => {
  //   const jsonData = JSON.stringify({
  //     stageid: stageid,
  //     subjectId: subjectId,
  //     boardid: boardid,
  //     scholarshipid: scholarshipId,
  //     childid: childid,
  //   });
  //   await AsyncStorage.setItem('TopicApiData', jsonData);
  // };

  // const storeSubjectAsyncData = async SubjectName => {
  //   const jsonData = JSON.stringify({
  //     SubjectSelected: SubjectName,
  //   });
  //   await AsyncStorage.setItem('StoreAllData', jsonData);
  // };

  const asydat = async () => {
    const token = await Storage.getObject('@auth_Token');
    const user = await Storage.getObject('@user');
    const userid = user._id;
    const stageid = user.stageid;
    const boardid = user.boardid;
    const childid = user.childid;
    dispatch(getChildDetailsAPI(userid));
    //
    const scholardata = {
      stageid,
      boardid,
    };
    console.log(
      stageid,
      '===============stageid',
      boardid,
      '............boardid',
      childid,
      '====childid',
      scholardata,
      '====scholardata',
      scholarshipId,
      '--------scholarshipId',
    );

    dispatch(getScholarshipByClassAPI(scholardata));
    // dispatch(getChildDetailsAPI(userid));

    const data = {
      stageid,
      boardid,
      scholarshipid: scholarshipId,
    };
    dispatch(getSubjectByClassAPI(data));
    const prevQues = {
      stageid,
      boardid,
      scholarshipId,
      childid,
    };
    dispatch(getPreviousYearQuestionAPI(prevQues));
    dispatch(getChildProbableQuestionDetailsAPI(prevQues));
    const progress = {
      stageid,
      boardid,
      scholarshipid: scholarshipId,
      childid
    }
    dispatch(getChildProgressAPI(progress));
  };

  useEffect(() => {
    asydat();
  }, [childid]);

  const netInfo = useNetInfo();
  const todayDate = new Date();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={{
          // borderRadius: 50,
          // borderWidth: 1,
          width: device_width,
          height: device_height,
          // borderRadius: 25,
          flex: 1,
          alignSelf: 'center',
          // justifyContent: 'center',
          // alignItems: 'center',
        }}
        resizeMode="cover"
        source={require('../../../assets/0.png')}>
        <StatusBar barStyle="light-content" />
        <UpdateModal
          visible={updateModalStatus}
          heading={
            errorFlag
              ? trans(
                'Our app is under maintenance. Please try after some time',
              )
              : trans('Please update the app to get new features')
          }
          appVersion={true}
          backgroundColor={'darkorange'}
          version={appVersion}
          height={250}
          width={350}
          isIconVisible={false}
          // yesBtnLabel={"update"}
          // isYesBtnVisible={errorFlag ? false : true}
          isYesBtnVisible={false}
          isNoBtnVisible={false}
          onpressno={() => {
            setUpdateModalStatus(false);
          }}
          onpressyes={() => {
            const url = `https://play.google.com/store/apps/details?id=com.notevook`;
            // const url = require('../../../assets/app_logo.jpeg');
            Linking.openURL(url);
          }}
        />
        {netInfo?.isConnected == false ? (
          <NetInfo callBack={commonCallback} />
        ) : (
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // backgroundColor: '#fff',
                backgroundColor: 'rgba(255,255,255, 0)',
                justifyContent: 'center',
                // justifyContent: 'space-between',
                // '#D6EAF8'
                paddingVertical: 12,
              }}>
              <FastImage
                style={{
                  height: 60,
                  width: 50,
                  position: 'absolute',
                  left: 10,
                }}
                resizeMode="contain"
                source={require('../../../assets/NOTEVOOK.jpeg')}
              />
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#0f6f25',
                    // width: '75%',
                    // borderWidth:1,
                    // marginLeft: 10,
                    justifyContent: 'center',
                    paddingHorizontal: 15,
                    paddingTop: 5,
                    // borderRadius: 5,
                    borderTopLeftRadius: 7,
                    borderTopRightRadius: 7,
                  }}>
                  <FastImage
                    style={{ height: 20, width: 20 }}
                    source={require('../../../assets/waving-hand.png')}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      // color: '#f1a722',
                      color: '#fff',
                      marginLeft: 10,
                      textTransform: 'capitalize',
                      fontWeight: '800',
                    }}>
                    {trans('Hello')} {fname}!
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // backgroundColor: '#f1a722',
                    backgroundColor: '#0f6f25',
                    // width: '75%',
                    // borderWidth:1,
                    // marginLeft: 10,
                    justifyContent: 'center',
                    // paddingHorizontal: 25,
                    // paddingVertical: 8,
                    // borderRadius: 5,
                    borderBottomRightRadius: 7,
                    borderBottomLeftRadius: 7,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      // color: '#f1a722',
                      color: '#fff',
                      marginLeft: 10,
                      textTransform: 'capitalize',
                      fontWeight: '700',
                    }}>
                    {trans('Standard')} - {stageid}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 3,
                  right: 10,
                  height: 45,
                  alignItems: 'center',
                  // borderWidth:1
                }}>
                <TouchableOpacity
                  // onPress={
                  //   // () => navigation.navigate('profile_tab')
                  //   () => navigation.navigate('EditProfile', { childId: childid })
                  // }>
                  onPress={() =>
                    navigation.navigate('EditProfile', { childId: childid })
                  }>
                  <Avatar.Image
                    source={
                      image != '' && image != null
                        ? { uri: image }
                        : gender == 'Male'
                          ? require('../../../assets/boy.png')
                          : gender == 'Female'
                            ? require('../../../assets/girl.png')
                            : {
                              uri: 'https://wkresources.s3.ap-south-1.amazonaws.com/userrr.png',
                            }
                    }
                    size={60}
                    style={{ backgroundColor: '#fff' }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* <TouchableOpacity
            style={{
              width: '92%',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#def',
              alignSelf: 'center',
              // justifyContent: 'center',
              paddingHorizontal: 25,
              paddingVertical: 10,
              marginVertical: 10,
              borderRadius: 8,
              borderWidth: 0.5,
              borderColor: Colors.primary,
              elevation: 5,
            }}>
            <Icon size={20} color={'#ccc'} name="search" />
            <Text
              style={{
                fontSize: 13,
                color: '#666',
                marginLeft: 10,
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}>
              {trans('search quiz, categories...')}
            </Text>
          </TouchableOpacity> */}
            <View
              style={{
                flexDirection: 'column',
                display: 'flex',
                // alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                style={{
                  marginBottom: 130,
                }}>
                <View
                  style={{
                    flex: 1,
                    // backgroundColor: Colors.secondary,
                    backgroundColor: 'rgba(255,255,255, 0.05)',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#0f6f25',
                    padding: 8,
                  }}>
                  <Text
                    style={{
                      color: '#f1a722',
                      // color: '#fff',
                      fontWeight: '900',
                      marginLeft: 10,
                      fontSize: 16,
                      marginBottom: 10,
                    }}>
                    {scholarship.length > 0 ? (
                      <>{trans(`Select Scholarship To Continue`)}</>
                    ) : (
                      <>{trans(`No Scholarship Available For This Board`)}</>
                    )}
                  </Text>
                  <View>
                    {schshipLoading == 'loading' ? (
                      <View
                        style={{
                          display: 'flex',
                          // flexDirection: 'row',
                          justifyContent: 'space-evenly',
                          height: device_height * 0.1,
                          alignItems: 'center',
                        }}>
                        <ActivityIndicator
                          size="small"
                          // color={'#f1a722'}
                          color={'#fff'}
                          style={{ marginRight: 10, alignSelf: 'center' }}
                        />
                        <Text
                          style={{
                            // color: '#f1a722',
                            color: '#fff',
                            fontWeight: '700',
                            fontSize: 15,
                          }}>
                          {trans('Loading... Please Wait')}
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          width: '100%',
                          alignSelf: 'center',
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          // borderWidth:1
                          // marginTop: 15,
                        }}>
                        {selectedBtn.map((row, index) => {
                          const {
                            _id = '',
                            scholarshipid: testid = '',
                            scholarshipname: testName = '',
                            scholarshipimage = '',
                            stageid = '',
                            stage = '',
                            boardid = '',
                            boardname = '',
                            isSelected = '',
                          } = row;

                          // console.log(
                          //   row,
                          //   '===================row scholarship list',
                          // );

                          return (
                            <TouchableOpacity
                              key={index}
                              onPress={() => {
                                handleSelect(index);
                                // handleInputChange('schoolBoard', testid, boardname);
                              }}
                            // onFocus={() => handleInputChange('schoolBoard', testid)}
                            >
                              <Text
                                style={{
                                  borderWidth: 1,
                                  borderColor: isSelected ? '#fff' : '#0f6f25',
                                  backgroundColor: isSelected
                                    ? '#f1a722'
                                    : '#fff',
                                  // backgroundColor: '#0f6f25',
                                  paddingVertical: 7,
                                  paddingHorizontal: 17,
                                  borderRadius: 10,
                                  margin: 5,
                                }}>
                                <Text
                                  style={{
                                    // color: isSelected ? '#f1a722' : '#0f6f25',
                                    color: '#0f6f25',
                                    fontWeight: isSelected ? '800' : '600',
                                    // color: '#fff',
                                  }}>
                                  {testName}
                                </Text>
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    )}
                  </View>

                  <View
                    style={{
                      width: '98%',
                      alignSelf: 'center',
                      marginTop: 10,
                      borderRadius: 12,
                      backgroundColor: 'rgba(0,255,0,0.1)',
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      // borderWidth:1
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                        borderBottomWidth: 0.5,
                        // borderBottomColor: '#f1a722',
                        borderBottomColor: '#fff',
                        paddingBottom: 10,
                      }}>
                      <Text
                        style={{
                          // color: '#f1a722',
                          color: '#fff',
                          fontWeight: 'bold',
                        }}>
                        {scholarshipName}
                      </Text>
                    </View>

                    <View style={{ paddingVertical: 10 }}>
                      {btnLoading == 'loading' ? (
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            height: device_height * 0.1,
                            alignItems: 'center',
                          }}>
                          <ActivityIndicator
                            size="small"
                            // color={'#f1a722'}
                            color={'#fff'}
                            style={{ marginRight: 10, alignSelf: 'center' }}
                          />
                          <Text
                            style={{
                              // color: '#f1a722',
                              color: '#fff',
                              fontWeight: '700',
                              fontSize: 15,
                            }}>
                            {trans('Loading... Please Wait')}
                          </Text>
                        </View>
                      ) : (
                        <>
                          <Text
                            style={{
                              color: '#f1a722',
                              fontWeight: 'bold',
                            }}>
                            {trans('Top Categories')}
                          </Text>
                          <ScrollView
                            showsHorizontalScrollIndicator={true}
                            indicatorStyle={styles.indicatorStyle}
                            persistentScrollbar={true}
                            horizontal={
                              SubjectByClass.length <= 4 ? false : true
                            }>
                            <View
                              style={{
                                // width: device_width * 0.83,
                                // borderWidth: 1,
                                flexDirection: 'row',
                                // alignItems: 'center',
                                justifyContent:
                                  SubjectByClass.length > 0
                                    ? 'left'
                                    : 'center',
                                // flexWrap:'nowrap'
                              }}>
                              {/* {SubjectByClass.length > 0 ? (
                                <> */}
                              {SubjectByClass.map((item, index) => {
                                const {
                                  subjectimage = '',
                                  subject = '',
                                  subjectid = '',
                                } = item;
                                const Revdata = {
                                  stageid,
                                  subjectid,
                                  boardid,
                                  scholarshipId,
                                  childid,
                                };
                                return (
                                  <TouchableOpacity
                                    disabled={subjectid == ''}
                                    style={{ borderWidth: 0 }}
                                    key={index}
                                    onPress={async () => {
                                      dispatch(getTopicBySubClassAPI(Revdata));
                                      // await storeTopicAsyncData(subjectid);
                                      // await storeSubjectAsyncData(subject);
                                      navigation.navigate('SubjectsDetails', {
                                        subjectid: subjectid,
                                        subjectname: subject,
                                        subjectImage: subjectimage,
                                        Class: stageid,
                                        scholarshipid: scholarshipId,
                                        boardid: boardid,
                                        childId: childid,
                                        scholarshipName: scholarshipName,
                                        showFeedback: false,
                                      });
                                    }}>
                                    <View
                                      style={{
                                        // borderWidth:1,
                                        borderColor: '#fff',
                                        width:
                                          subjectid == ''
                                            ? device_width * 0.8
                                            : device_width * 0.19,
                                        // paddingHorizontal:3,
                                        paddingVertical: 5,
                                        alignItems: 'center',
                                        marginVertical: 15,
                                      }}>
                                      {subjectid == '' ?
                                        (
                                          <></>
                                        ) : (
                                          <>
                                            {subjectimage == '' && subjectid != '' ? (
                                              <FastImage
                                                style={{
                                                  height: 50,
                                                  width: 50,
                                                  marginVertical: 5,
                                                  borderRadius: 50,
                                                  // borderWidth:1
                                                }}
                                                source={require('../../../assets/test.png')}
                                              />
                                            ) : (
                                              <FastImage
                                                style={{
                                                  height: 50,
                                                  width: 50,
                                                  marginVertical: 5,
                                                  borderRadius: 50,
                                                  // borderWidth:1
                                                }}
                                                source={{ uri: subjectimage }}
                                              />
                                            )}
                                          </>
                                        )}
                                      <Text
                                        style={{
                                          // color: '#f1a722',
                                          color:
                                            subjectid == '' ? 'orange' : '#fff',
                                          fontSize: subjectid == '' ? 18 : 12,
                                          fontWeight: '600',
                                          // marginTop: 10,
                                          textTransform: 'capitalize',
                                          textAlign: 'center',
                                        }}>
                                        {subjectid == '' && language == 'odia' ?
                                          "ବର୍ତ୍ତମାନ କୌଣସି ବିଷୟ ଉପଲବ୍ଧ ନାହିଁ"
                                          : subjectid == '' && language == 'english' ?
                                            "Currently No Subjects Available"
                                            :
                                            subject
                                        }
                                      </Text>
                                    </View>
                                  </TouchableOpacity>
                                );
                              })}
                              {/* </>
                              ) : (
                                <View
                                  style={{
                                    width: device_width * 0.84,
                                    // borderWidth:1,
                                    height: 80,
                                    backgroundColor: '#def',
                                    marginTop: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingVertical: 5,
                                    alignSelf: 'center',
                                    borderRadius: 5,
                                  }}>
                                  <AntDesign
                                    style={{
                                      marginHorizontal: 10,
                                      borderWidth: 0,
                                    }}
                                    name={'infocirlce'}
                                    size={18}
                                    color={'green'}
                                  />
                                  <Text
                                    style={{
                                      color: Colors.primary,
                                      width: '75%',
                                      // marginLeft: 10,
                                      // borderWidth:3,
                                      // textAlign:'center',
                                      fontWeight: '600',
                                      // alignItems: 'center',
                                      // justifyContent: 'center',
                                      fontSize: 16,
                                    }}>
                                    {trans(`Currently No Subjects Available`)}
                                  </Text>
                                </View>
                              )} */}

                              {/* {noSub == true && (
                                )} */}
                            </View>
                          </ScrollView>
                        </>
                      )}
                    </View>
                  </View>

                  {/* <ScrollView
                showsVerticalScrollIndicator={false}
                style={{marginHorizontal: 3, }}> */}
                  {/* <View
                  style={{ position: 'absolute', right: -20, borderWidth: 0 }}>
                  <FastImage
                    style={{
                      height: device_height * 0.3,
                      width: device_width * 0.4,
                    }}
                    source={require('../../../assets/monkey-hanging.png')}
                    resizeMode="contain"
                  // source={{
                  //   // uri: "https://wkresources.s3.ap-south-1.amazonaws.com/f_logo.png",-          //   uri: 'https://leverageedu.com/blog/wp-content/uploads/2020/04/Types-of-Education.jpg',
                  // }}
                  />
                </View> */}
                  {ChildCourseProgress.length > 0 && (
                    <View
                      style={{
                        width: '98%',
                        alignSelf: 'center',
                        marginTop: 10,
                        borderRadius: 12,
                        backgroundColor: 'rgba(0,255,0,0.1)',
                        paddingHorizontal: 5,
                        paddingVertical: 10,
                        // borderWidth: 1
                      }}>
                      <>
                        <Text
                          style={{
                            color: '#f1a722',
                            fontWeight: 'bold',
                            fontSize: 16,
                            marginLeft: 10
                          }}>
                          {trans('Courses In Progress')}
                        </Text>
                        {ChildCourseProgress.map((item, index) => {
                          const {
                            subject = '',
                            subjectid = '',
                            subjectIamge = '',
                            topicDetails = [],
                          } = item;
                          const {
                            topicimage = '',
                            topic = '',
                            sltopic = '',
                            studenttopic = [],
                            reviewquestionsets = [],
                            topicid = ''
                          } = topicDetails
                          const progress = topicDetails.filter(item => item.studenttopic != '').length
                          const totalTopic = topicDetails.length
                          const proData = (progress) / totalTopic

                          console.log(proData, "================proData");

                          return (
                            <TouchableOpacity
                              key={index}
                              onPress={() => handleNavigation(subject, subjectid, topicDetails)}
                              style={{
                                padding: 10,
                                flexDirection: 'row',
                                borderWidth: 1,
                                borderColor: '#f1a722',
                                width: '100%',
                                borderRadius: 15,
                                marginVertical: 5,
                                alignItems: "center",
                                justifyContent: 'space-between'
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  width: '75%',
                                  // borderWidth: 1
                                }}>
                                <View
                                  style={{
                                    padding: 5,
                                    borderRadius: 50,
                                    width: 50,
                                    height: 50,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#def',
                                    elevation: 15,
                                  }}>
                                  {/* <MaterialIcons
                                    name="laptop-chromebook"
                                    size={38}
                                    color={'#0f6f25'} /> */}
                                  {subjectIamge != '' && subjectid !== '' ? (
                                    <FastImage
                                      style={{
                                        height: 50,
                                        width: 50,
                                        marginVertical: 5,
                                        borderRadius: 50,
                                        // borderWidth:1
                                      }}
                                      source={{ uri: subjectIamge }}
                                    />
                                  ) : (
                                    <FastImage
                                      style={{
                                        height: 50,
                                        width: 50,
                                        marginVertical: 5,
                                        borderRadius: 50,
                                        // borderWidth:1
                                      }}
                                      source={require('../../../assets/test.png')}
                                    />
                                  )}
                                </View>
                                <View
                                  style={{
                                    padding: 10,
                                    marginLeft: 10,
                                    // alignItems: 'center',
                                    justifyContent: 'center'
                                  }}>
                                  <Text style={{ fontWeight: '800', color: '#f1a722', fontSize: 14 }}>
                                    {subject}
                                  </Text>
                                  <Text style={{ fontWeight: '600', color: '#def', fontSize: 12 }}>
                                    Topics Completed : {progress}
                                  </Text>
                                  <Text style={{ fontWeight: '600', color: '#def', fontSize: 12 }}>
                                    Total Topics : {totalTopic}
                                  </Text>

                                </View>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  width: '24%',
                                  // borderWidth: 1,
                                  justifyContent: 'space-between'
                                  // justifyContent:'flex-end'
                                }}>
                                <Text style={{ fontWeight: '600', color: '#def', fontSize: 16 }}>
                                  {`${proData * 100}% `}
                                </Text>
                                <Progress.Circle
                                  progress={proData}
                                  size={45}
                                  indeterminate={false}
                                  thickness={6}
                                  allowFontScaling={false}
                                  color={'#def'}
                                  borderWidth={2}
                                  borderColor='orange'
                                  showsText={false}
                                  textStyle={{ fontSize: 12, fontWeight: '600' }}
                                />
                              </View>
                            </TouchableOpacity>
                          )
                        })}
                      </>
                    </View>
                  )}
                  <>
                    {factLoading == 'loading' ? (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',

                          borderWidth: 1,
                          borderRadius: 10,
                          paddingVertical: 15,
                          paddingHorizontal: 5,
                          marginVertical: 5,
                          // backgroundColor: '#def',
                          backgroundColor: 'rgba(0,255,0, 0.05)',
                          borderColor: '#0f6f25',
                          // flexDirection: 'row',
                          // justifyContent: 'space-between',
                          // backgroundColor: '#def',
                          alignItems: 'center',
                        }}>
                        <ActivityIndicator
                          size="small"
                          // color={'#f1a722'}
                          color={'#fff'}
                          style={{
                            marginRight: 10,
                            alignSelf: 'center',
                          }}
                        />
                        <Text
                          style={{
                            // color: '#f1a722',
                            color: '#fff',
                            fontWeight: '600',
                          }}>
                          {trans('Loading... Please Wait')}
                        </Text>
                      </View>
                    ) : (
                      <>
                        {Object.keys(DailyFact).length !== 0 ? (
                          <>
                            {DailyFact.image &&
                              DailyFact.image.length > 0 &&
                              (Array.isArray(DailyFact.image) ? (
                                <>
                                  <Carousel
                                    data={DailyFact.image}
                                    renderItem={({ item }) => (
                                      <View
                                        style={{
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          alignSelf: 'center',
                                          height: device_height * 0.47,
                                          width: device_width * 0.93,
                                          borderRadius: 15,
                                          padding: 5,
                                          // borderWidth: 1,
                                          marginTop: 10,
                                          marginRight: 20,
                                        }}>
                                        <FastImage
                                          style={{
                                            borderRadius: 15,
                                            height: device_height * 0.46,
                                            width: device_width * 0.93,
                                            // marginTop: -5,
                                          }}
                                          source={{ uri: item }}
                                          resizeMode={
                                            IsTabScreen ? 'contain' : 'cover'
                                          }
                                        />
                                      </View>
                                    )}
                                    sliderWidth={device_width}
                                    itemWidth={device_width}
                                    layout={'default'}
                                    autoplay={true}
                                    autoplayInterval={5000}
                                    loop={true}
                                    onSnapToItem={index =>
                                      setActiveSlide(index)
                                    }
                                  />
                                  <Pagination // Pagination component
                                    dotsLength={DailyFact.image.length} // Total number of dots (images)
                                    activeDotIndex={activeSlide} // Active dot index
                                    containerStyle={{ paddingVertical: 10 }} // Style for the pagination container
                                    dotStyle={{
                                      // Style for each dot
                                      width: 10,
                                      height: 10,
                                      borderRadius: 5,
                                      backgroundColor:
                                        'rgba(255, 255, 255, 0.8)',
                                    }}
                                    inactiveDotOpacity={0.4} // Opacity for inactive dots
                                    inactiveDotScale={0.6} // Scale for inactive dots
                                  />
                                </>
                              ) : (
                                <View
                                  style={{
                                    padding: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    // backgroundColor:'#dea',
                                    height: device_height * 0.5,
                                    width: device_width * 0.94,
                                    borderRadius: 15,
                                    zIndex: 1,
                                    marginTop: 5,
                                  }}>
                                  <FastImage
                                    style={{
                                      // borderWidth: 1,
                                      borderRadius: 15,
                                      height: device_height * 0.48,
                                      zIndex: -1,
                                      width: device_width * 0.93,
                                    }}
                                    source={{
                                      uri: DailyFact.image
                                        ? DailyFact.image
                                        : '',
                                    }}
                                    resizeMode={
                                      IsTabScreen ? 'contain' : 'cover'
                                    }
                                  />
                                </View>
                              ))}
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </>
                  <View style={{ paddingBottom: 20, borderWidth: 0 }}>
                    <Text
                      style={{
                        color: '#f1a722',
                        // color: '#fff',
                        fontWeight: '800',
                        marginLeft: 10,
                        fontSize: 16,
                        marginTop: 10,
                      }}>
                      {scholarship.length > 0 ? (
                        <>{trans(`Available Questions Sets:`)}</>
                      ) : (
                        <></>
                      )}
                    </Text>
                    {scholarship != undefined && scholarship.length > 0 ? (
                      <>
                        {SetQuestions.map((item, index) => {
                          const {
                            image = '',
                            label1 = '',
                            contentSet = '',
                            navigationfunc = '',
                            isPremium = '',
                            label2 = '',
                          } = item;
                          {
                            /* console.log(
                          SetQuestions,
                          '============SetQuestions item',
                        ); */
                          }
                          let probaleHide = false;
                          if (
                            (label1 == 'Most Probable Questions' ||
                              label1 == 'ଅତି ସମ୍ଭାବ୍ୟ ପ୍ରଶ୍ନ' ||
                              label1 == 'सर्वाधिक संभावित प्रश्न') &&
                            (contentSet == '0+ Sets' ||
                              contentSet == '0+ ସେଟ୍' ||
                              contentSet == '0+ सेट')
                          ) {
                            probaleHide = true;
                          }
                          {
                            /* &&
                          (contentSet == '0 Sets' ||
                            contentSet == '0 ସେଟ୍') */
                          }
                          return (
                            <View key={index}>
                              {/* {probaleHide ? (
                              <></>
                            ) : */}
                              {ProbLoad == 'loading' ||
                                PrevLoad == 'loading' ? (
                                <View
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',

                                    borderWidth: 1,
                                    borderRadius: 10,
                                    paddingVertical: 15,
                                    paddingHorizontal: 5,
                                    marginVertical: 5,
                                    // backgroundColor: '#def',
                                    backgroundColor: 'rgba(0,255,0, 0.05)',
                                    borderColor: '#0f6f25',
                                    // flexDirection: 'row',
                                    // justifyContent: 'space-between',
                                    // backgroundColor: '#def',
                                    alignItems: 'center',
                                  }}>
                                  <ActivityIndicator
                                    size="small"
                                    // color={'#f1a722'}
                                    color={'#fff'}
                                    style={{
                                      marginRight: 10,
                                      alignSelf: 'center',
                                    }}
                                  />
                                  <Text
                                    style={{
                                      // color: '#f1a722',
                                      color: '#fff',
                                      fontWeight: '600',
                                    }}>
                                    {trans('Loading... Please Wait')}
                                  </Text>
                                </View>
                              ) : (
                                <TouchableOpacity
                                  // disabled={true}
                                  onPress={() => navigationfunc()}
                                  key={index}
                                  style={{
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    paddingVertical: 13,
                                    paddingHorizontal: 5,
                                    marginVertical: 5,
                                    // backgroundColor: '#def',
                                    backgroundColor: 'rgba(0,255,0, 0.1)',
                                    borderColor: '#0f6f25',
                                    // borderColor: Colors.primary,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    // backgroundColor: '#def',
                                    alignItems: 'center',
                                  }}>
                                  <View
                                    style={{
                                      width: device_width * 0.65,
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <FastImage
                                      source={image}
                                      // size={50}
                                      style={{ height: 50, width: 50 }}
                                    />
                                    <View
                                      style={{
                                        marginHorizontal: 10,
                                        width: '75%',
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 16,
                                          fontWeight: '800',
                                          // color: '#f1a722',
                                          color: '#fff',
                                        }}>
                                        {scholarshipName} {label1}
                                      </Text>
                                      {/* <Text
                                    style={{
                                      fontSize: 16,
                                      fontWeight: '800',
                                      color: Colors.primary,
                                    }}>
                                    {label1}
                                  </Text> */}
                                      <Text
                                        style={{
                                          fontSize: 12,
                                          fontWeight: '500',
                                          color: '#f1a722',
                                          // color: '#fff',
                                        }}>
                                        {contentSet}
                                      </Text>
                                    </View>
                                  </View>
                                  <TouchableOpacity
                                    onPress={() => navigationfunc()}
                                    style={{
                                      alignItems: 'center',
                                      width: device_width * 0.2,
                                      // borderWidth: 1,
                                    }}>
                                    {/* <FontAwesome
                                  style={{color: '#f1a722'}}
                                  name="chevron-circle-right"
                                  size={28}
                                /> */}
                                    <MaterialIcons
                                      name="keyboard-arrow-right"
                                      size={30}
                                      color={'#fff'}
                                    />
                                  </TouchableOpacity>
                                </TouchableOpacity>
                              )}
                            </View>
                          );
                        })}
                      </>
                    ) : (
                      <View
                        style={{
                          height: 70,
                          width: '100%',
                          // alignItems: 'center',
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
                            }}>
                            {'   '}
                            {trans('Currently No Exam Sets Available')}
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                  <>
                    {DailyMessageLoading == 'loading' ? (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderRadius: 10,
                          paddingVertical: 15,
                          paddingHorizontal: 5,
                          marginVertical: 5,
                          // backgroundColor: '#def',
                          backgroundColor: 'rgba(0,255,0, 0.05)',
                          borderColor: '#0f6f25',
                          // flexDirection: 'row',
                          // justifyContent: 'space-between',
                          // backgroundColor: '#def',
                          alignItems: 'center',
                        }}>
                        <ActivityIndicator
                          size="small"
                          // color={'#f1a722'}
                          color={'#fff'}
                          style={{
                            marginRight: 10,
                            alignSelf: 'center',
                          }}
                        />
                        <Text
                          style={{
                            // color: '#f1a722',
                            color: '#fff',
                            fontWeight: '600',
                          }}>
                          {trans('Loading... Please Wait')}
                        </Text>
                      </View>
                    ) : (
                      <>
                        {Object.keys(DailyMessage).length !== 0 ? (
                          <>
                            {DailyMessage.image &&
                              DailyMessage.image.length > 0 &&
                              (Array.isArray(DailyMessage.image) ? (
                                <View
                                  style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // borderWidth: 1
                                  }}>
                                  <Carousel
                                    data={DailyMessage.image}
                                    renderItem={({ item }) => (
                                      <View
                                        style={{
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          alignSelf: 'center',
                                          height: device_height * 0.47,
                                          width: device_width * 0.93,
                                          borderRadius: 15,
                                          padding: 5,
                                          // borderTopLeftRadius:50,
                                          // borderTopRightRadius:50,
                                          // borderWidth:1,
                                          // marginTop: 10,
                                          // marginRight: 20,
                                        }}>
                                        <FastImage
                                          style={{
                                            borderRadius: 15,
                                            // borderTopLeftRadius:50,
                                            // borderTopRightRadius:50,
                                            height: device_height * 0.46,
                                            width: device_width * 0.93,
                                            // marginTop: -5,
                                            // height:'100%',
                                            // // width:'100%',
                                            // borderWidth:1
                                          }}
                                          source={{ uri: item }}
                                          resizeMode="cover"
                                        />
                                      </View>
                                    )}
                                    sliderWidth={device_width}
                                    itemWidth={device_width}
                                    layout={'default'}
                                    autoplay={true}
                                    autoplayInterval={5000}
                                    loop={true}
                                    onSnapToItem={index =>
                                      setActiveSlide(index)
                                    }
                                  />
                                  <Pagination // Pagination component
                                    dotsLength={DailyMessage.image.length} // Total number of dots (images)
                                    activeDotIndex={activeSlide} // Active dot index
                                    containerStyle={{ paddingVertical: 10 }} // Style for the pagination container
                                    dotStyle={{
                                      // Style for each dot
                                      width: 10,
                                      height: 10,
                                      borderRadius: 5,
                                      backgroundColor:
                                        'rgba(255, 255, 255, 0.8)',
                                    }}
                                    inactiveDotOpacity={0.4} // Opacity for inactive dots
                                    inactiveDotScale={0.6} // Scale for inactive dots
                                  />
                                </View>
                              ) : (
                                <View
                                  style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    height: device_height * 0.47,
                                    width: device_width * 0.93,
                                    borderRadius: 15,
                                    padding: 5,
                                    // borderWidth:1,
                                    marginTop: 10,
                                    marginRight: 20,
                                  }}>
                                  <FastImage
                                    style={{
                                      borderRadius: 15,
                                      height: device_height * 0.46,
                                      width: device_width * 0.93,
                                      // marginTop: -5,
                                    }}
                                    source={{
                                      uri: DailyMessage.image
                                        ? DailyMessage.image
                                        : '',
                                    }}
                                    resizeMode={
                                      IsTabScreen ? 'contain' : 'cover'
                                    }
                                  />
                                </View>
                              ))}
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </>
                  {/* <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomColor: 'gray',
                        // borderBottomWidth: 1,
                      }}>
                      <View
                        style={{
                          padding: 5,
                          height: 15,
                          width: 15,
                          // backgroundColor: '#f1a722',
                          backgroundColor: 'crimson',
                          borderRadius: 20,
                          // alignSelf: 'center',
                        }}></View>
                      {/* <View>
                        <Text
                          style={{
                            paddingLeft: 10,
                            fontSize: 15,
                            flexDirection: 'row',
                            // color: '#f1a722',
                            color: '#fff',
                            fontWeight: '800',
                          }}>
                          {trans('Live Session')}
                        </Text>
                      </View> */}
                  {/* </View>  */}
                  <TouchableOpacity
                    // disabled={true}
                    onPress={() => {
                      // navigation.navigate('YoutibeList')}
                      navigation.navigate('LiveClassList', {
                        scholarshipId: scholarshipId,
                      });
                    }}
                    // dispatch(
                    //   getAllRecordClassAPI(
                    //     undefined,
                    //     stageid,
                    //     boardid,
                    //     scholarshipId,
                    //     undefined,
                    //   ),
                    // );
                    // dispatch({
                    //   type: GET_ALL_RECORDCLASS,
                    //   payload: [],
                    // });
                    // navigation.navigate('LiveClassList', {
                    //   scholarshipImage:
                    //     scholarshipId == 'NVOOKADA1690811843420'
                    //       ? 'https://notevook.s3.ap-south-1.amazonaws.com/Odisha+Adarsha+Vidyalaya+logo.jpg'
                    //       : scholarshipId == 'Navodaya1690353664697'
                    //       ? 'https://notevook.s3.ap-south-1.amazonaws.com/Jawahar_Navodaya_Vidyalaya_logo.png'
                    //       : '',
                    //   scholarshipId: scholarshipId,
                    // });
                    //  }
                    // }
                    // key={index}
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      paddingVertical: 15,
                      paddingHorizontal: 5,
                      marginVertical: 5,
                      // backgroundColor: '#def',
                      // borderColor: Colors.primary,
                      backgroundColor: 'rgba(0,255,0, 0.1)',
                      borderColor: '#0f6f25',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      // backgroundColor: '#def',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: device_width * 0.65,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      {scholarshipId == 'NVOOKADA1690811843420' ||
                        scholarshipId == '1694585680296' ? (
                        <FastImage
                          source={{
                            uri: 'https://notevook.s3.ap-south-1.amazonaws.com/Odisha+Adarsha+Vidyalaya+logo.jpg',
                          }}
                          //  source={require('../../../assets/video.png')}
                          // size={50}
                          style={{ height: 60, width: 65 }}
                          resizeMode="contain"
                        />
                      ) : scholarshipId == 'Navodaya1690353664697' ||
                        scholarshipId == '1697518423791' ? (
                        <FastImage
                          source={{
                            uri: 'https://notevook.s3.ap-south-1.amazonaws.com/Jawahar_Navodaya_Vidyalaya_logo.png',
                          }}
                          //  source={require('../../../assets/video.png')}
                          // size={50}
                          style={{ height: 50, width: 50 }}
                          resizeMode="contain"
                        />
                      ) : (
                        <></>
                      )}
                      <View
                        style={{
                          marginHorizontal: 10,
                          width: '75%',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '800',
                            // color: '#f1a722',
                            color: '#fff',
                          }}>
                          {scholarshipName}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '800',
                            // color: '#f1a722',
                            color: '#fff',
                          }}>
                          {trans('Video Coaching Session')}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '500',
                            color: '#f1a722',
                            // color: '#fff',
                          }}>
                          {moment(todayDate).format('DD-MMM-YYYY')}
                        </Text>
                      </View>
                    </View>
                    <View
                      // onPress={() => navigationfunc()}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 80,
                        height: 25,
                        borderRadius: 3,
                        borderTopRightRadius: 8,
                        // backgroundColor: '#f1a722',
                        backgroundColor: 'crimson',
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        // borderWidth: 1,
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 12,
                          fontWeight: 700,
                        }}>
                        {trans('LIVE')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {/* {AllFCMquiz.length > 0 && (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomColor: 'gray',
                        // borderBottomWidth: 1,
                      }}>
                     
                      <View>
                        <Text
                          style={{
                            paddingLeft: 10,
                            fontSize: 15,
                            flexDirection: 'row',
                            color: 'crimson',
                            fontWeight: '800',
                          }}>
                          {trans('Daily Quiz')}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      // disabled={true}
                      onPress={() =>
                        navigation.navigate('NotificationQuestion')
                      }
                      // key={index}
                      style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        paddingVertical: 15,
                        paddingHorizontal: 5,
                        marginVertical: 5,
                        // backgroundColor: '#def',
                        backgroundColor: '#dee',
                        borderColor: Colors.primary,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: device_width * 0.65,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <FastImage
                          // source={require('../../../assets/qu')}
                          source={{
                            uri: 'https://as1.ftcdn.net/v2/jpg/05/65/46/82/1000_F_565468262_fAyF78GmO8ZWp7GqK8P8BJiS8nwVUjYk.jpg',
                          }}
                          // size={50}
                          style={{ height: 50, width: 50 }}
                          resizeMode="contain"
                        />

                        <View
                          style={{
                            marginHorizontal: 10,
                            width: '80%',
                          }}>
                        
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '800',
                              color: 'green',
                            }}>
                            {trans('Quiz Section')}
                          </Text>
                         
                        </View>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('NotificationQuestion')
                          }
                          style={{
                            alignItems: 'center',
                            width: device_width * 0.2,
                            // borderWidth: 1,
                          }}>
                         
                          <MaterialIcons
                            name="keyboard-arrow-right"
                            size={30}
                            color={'#f1a722'}
                          />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  </View>
                )} */}
                {/* </View> */}
                <View
                  style={{
                    alignSelf: 'center',
                    // flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    // justifyContent: 'center',
                    // borderWidth: 1,
                    width: device_width,
                    // height: device_height * 0.9,
                    // backgroundColor: '#dee'
                    // position: 'absolute',
                    // bottom: 0,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                      color: '#f1a722',
                      textAlign: 'center',
                      marginTop: IsTabScreen ? 10 : 25,
                      marginVertical: 7,
                    }}>
                    {/* {selectedLanguage === 'odia'
                  ?  */}
                    {`A Product of Noteved Siksha Sandhan Pvt. Ltd.`}
                    {/* : selectedLanguage === 'english'
                    ? 'A Product of Noteved Siksha Sandhan Pvt. Ltd.'
                    : // : 'कृपया अपनी भाषा प्राथमिकता चुनें'}
                    'A Product of Noteved Siksha Sandhan Pvt. Ltd.'} */}
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>
        )}

        {feedbackModalStatus && (
          <Modal transparent={true} visible={feedbackModalStatus}>
            <View
              style={{
                backgroundColor: '#def',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                <View
                  style={{
                    // borderRadius: 10,
                    //   borderTopLeftRadius: 25,
                    //   borderTopRightRadius: 25,
                    //   borderBottomLeftRadius: 25,
                    //   borderBottomRightRadius: 25,
                    borderRadius: 15,
                    // borderWidth: 1,
                    height: device_height * 0.6,
                    width: device_width * 0.9,
                    backgroundColor: '#def',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    //   alignItems:'center'
                    //   paddingHorizontal: 20,
                  }}>
                  <View>
                    <View
                      style={{
                        // flexDirection: 'row',
                        // justifyContent: 'space-evenly',
                        alignItems: 'center',
                      }}>
                      <View style={{ alignItems: 'center', paddingVertical: 15 }}>
                        <View
                          style={{
                            // borderWidth: 0.8,
                            borderColor: 'green',
                            borderRadius: 50,
                            padding: 10,
                            elevation: 15,
                            backgroundColor: '#fff',
                          }}>
                          <MaterialIcons
                            style={{ color: 'green' }}
                            name={'rate-review'}
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
                            textTransform: 'capitalize',
                          }}>
                          {`${trans('Please share your Feedback')}`}
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
                          {`${trans(
                            'How was your experience with last mock test',
                          )}`}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: '#aaa',
                          marginHorizontal: 10,
                          height: '45%',
                          alignItems: 'center',
                          backgroundColor: '#fff',
                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            // borderWidth:1,
                            borderBottomColor: '#ccc',
                            // paddingBottom: 5,
                            // marginTop: 30,
                            // paddingBottom: 10,
                            marginBottom: 10,
                          }}>
                          <TextInput
                            placeholder={trans(`Your Feedback...`)}
                            placeholderTextColor={'#aaa'}
                            multiline={true}
                            numberOfLines={3}
                            value={feedback}
                            style={[
                              {
                                width: '100%',
                                marginTop: -20,
                                paddingLeft: 10,
                                // borderWidth:1,
                                fontWeight: 'bold',
                                color: Colors.primary,
                                justifyContent: 'center',
                                alignItems: 'center',
                              },
                            ]}
                            autoCapitalize="none"
                            onChangeText={val =>
                              handleInputChange('feedback', val)
                            }
                          // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                          //   onChangeText={val => handleInputChange('parents_phone', val)}
                          />
                        </View>
                        <View
                          style={{
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            flexDirection: 'row',
                            // borderWidth: 1,
                            width: '100%',
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              // setGood(!good);
                              handleSelectEmoji('Good');
                              // onFeedback('Good');
                            }}
                            style={{
                              alignContent: 'center',
                              alignItems: 'center',
                            }}>
                            {selectFeedBack == 'Good' ? (
                              <AntDesign
                                name="smile-circle"
                                size={35}
                                // reaction={'Good'}
                                value={reaction}
                                style={{ color: 'green' }}
                              />
                            ) : (
                              <AntDesign
                                name="smileo"
                                size={35}
                                style={{ color: '#666' }}
                              />
                            )}
                            <Text
                              style={{
                                fontSize: 15,
                                color:
                                  selectFeedBack !== 'Good' ? '#666' : 'green',
                                fontWeight: 'bold',
                              }}>
                              {trans('Good')}
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => {
                              // setAvg(!avg);
                              handleSelectEmoji('Average');
                              // onFeedback('Average');
                            }}
                            style={{
                              alignContent: 'center',
                              alignItems: 'center',
                            }}>
                            {selectFeedBack == 'Average' ? (
                              <MaterialCommunityIcons
                                name="emoticon-neutral"
                                size={40}
                                value={reaction}
                                style={{ color: Colors.primary }}
                              />
                            ) : (
                              <MaterialCommunityIcons
                                name="emoticon-neutral-outline"
                                size={40}
                                style={{ color: '#666' }}
                              />
                            )}
                            <Text
                              style={{
                                fontSize: 15,
                                color:
                                  selectFeedBack !== 'Average'
                                    ? '#666'
                                    : Colors.primary,
                                fontWeight: 'bold',
                              }}>
                              {trans('Average')}
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => {
                              // setBad(!bad);
                              // handleSelect(setBad)
                              handleSelectEmoji('Bad');
                              // onFeedback('Bad');
                            }}
                            style={{
                              alignContent: 'center',
                              alignItems: 'center',
                            }}>
                            {selectFeedBack == 'Bad' ? (
                              <MaterialCommunityIcons
                                name="emoticon-sad"
                                size={40}
                                value={reaction}
                                style={{ color: 'crimson' }}
                              />
                            ) : (
                              <MaterialCommunityIcons
                                name="emoticon-sad-outline"
                                size={40}
                                style={{ color: '#666' }}
                              />
                            )}
                            <Text
                              style={{
                                fontSize: 15,
                                color:
                                  selectFeedBack !== 'Bad' ? '#666' : 'crimson',
                                fontWeight: 'bold',
                              }}>
                              {trans('Bad')}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      {/* <AntDesign
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
                  onPress={() => setFeedbackModalStatus(false)}
                /> */}
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
                        // borderColor: '#aaa',
                        // borderRadius: 8,
                        padding: 10,
                      }}>
                      <TouchableOpacity
                        disabled={loading ? true : false}
                        style={{
                          borderRadius: 15,
                          width: '40%',
                          // marginVertical: 5,
                          borderWidth: 2,
                          marginRight: 25,
                          borderColor: 'green',
                        }}
                        onPress={() => handleFeedbackSubmit()}>
                        <LinearGradient
                          colors={['#FFF', '#FFF']}
                          style={{
                            borderRadius: 15,

                            width: '100%',
                            paddingVertical: 5,
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}>
                            {loading && (
                              <ActivityIndicator
                                size="small"
                                color={'green'}
                                style={{
                                  alignSelf: 'flex-start',
                                  paddingRight: 10,
                                  fontSize: 12,
                                }}
                              />
                            )}
                            <Text
                              style={{
                                color: 'green',
                                fontSize: 15,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                alignItems: 'center',
                              }}>
                              {trans('Submit')}
                            </Text>
                          </View>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        )}

        {succesCodeModal && (
          <Modal transparent={true} visible={succesCodeModal}>
            <View
              style={{
                borderRadius: 15,
                // borderWidth: 1,
                height: device_height * 0.7,
                width: device_width * 0.95,
                backgroundColor: '#def',
                alignSelf: 'center',
                justifyContent: 'center',
                // flex: 1,
                alignItems: 'center',
                //   paddingHorizontal: 20,
              }}>
              <FastImage
                style={{
                  height: 200,
                  width: 300,
                  // position: 'absolute',
                  //left: 10,
                }}
                source={require('../../../assets/NOTEVOOK.jpeg')}
                resizeMode="contain"
              />
              <AntDesign
                name="closecircleo"
                style={{
                  fontSize: 38,
                  color: '#fff',
                  position: 'absolute',
                  top: -20,
                  right: -10,
                  // marginTop: 10,
                  backgroundColor: 'crimson',
                  borderRadius: 50,
                }}
                onPress={() => setsuccesCodeModal(false)}
              />

              <View
                style={{
                  // flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  // borderWidth: 1,
                  paddingVertical: 15,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    width: device_width * 0.8,
                    fontSize: 27,
                    color: Colors.primary,
                    marginTop: 10,
                    marginLeft: 10,
                    fontWeight: '900',
                  }}>
                  {trans('Thank You')}
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
                  {trans('We have received your feedback !')}
                </Text>
              </View>
              <View
                style={{
                  // borderWidth: 1,
                  paddingVertical: 15,
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginTop: 10,
                  // marginLeft: 10,
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
                    // marginRight: 25,
                    borderColor: '#000',
                    backgroundColor: 'green',
                    paddingVertical: 15,
                    justifyContent: 'center',
                  }}
                  onPress={() => setsuccesCodeModal(false)}>
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
          </Modal>
        )}
        {/* {Object.keys(EmergencyMsg).length > 0 && emergencyModal && (
          <Modal transparent={true} visible={emergencyModal}>
            <View
              style={{
                borderRadius: 15,
                // borderWidth: 1,
                minHeight: device_height * 0.5,
                width: device_width * 0.95,
                backgroundColor: '#def',
                alignSelf: 'center',
                justifyContent: 'space-between',
                flex: 1,
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  // borderWidth: 1,
                  width: '40%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  // position: 'absolute',
                  // top: 20,
                }}>
                <FastImage
                  style={{
                    height: 130,
                    width: 200,
                    alignSelf: 'center',
                  }}
                  source={require('../../../assets/NOTEVOOK.jpeg')}
                  resizeMode="contain"
                />
              </View>
              {Object.keys(EmergencyMsg).length > 0 &&
                EmergencyMsg.priority == false ? (
                <AntDesign
                  name="closecircleo"
                  style={{
                    fontSize: 38,
                    color: '#fff',
                    position: 'absolute',
                    top: -20,
                    right: -10,
                    // marginTop: 10,
                    backgroundColor: 'crimson',
                    borderRadius: 50,
                  }}
                  onPress={() => setEmergencyModal(false)}
                />
              ) : (
                <></>
              )}
              <View
                style={{
                  // flexDirection: 'row',
                  height: '45%',
                  marginHorizontal: 7,
                  borderRadius: 8,
                  marginTop: 10,
                  width: '94%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderColor: '#aaa',
                  paddingVertical: 10,
                }}>
                {Object.keys(EmergencyMsg).length > 0 &&
                  EmergencyMsg.headermessage != '' ? (
                  <Text
                    style={{
                      textAlign: 'center',
                      width: device_width * 0.8,
                      fontSize: 17,
                      color: '#000',
                      // marginTop: 5,
                      // marginLeft: 5,
                      fontWeight: '700',
                    }}>
                    {EmergencyMsg.headermessage}
                  </Text>
                ) : (
                  <></>
                )}
                {Object.keys(EmergencyMsg).length > 0 &&
                  EmergencyMsg.bodymessage != '' ? (
                  <Text
                    style={{
                      textAlign: 'center',
                      width: device_width * 0.8,
                      fontSize: 15,
                      color: '#333',
                      // marginTop: 5,
                      // marginLeft: 5,
                      fontWeight: '600',
                    }}>
                    {EmergencyMsg.bodymessage}
                  </Text>
                ) : (
                  <></>
                )}
                {Object.keys(EmergencyMsg).length > 0 &&
                  EmergencyMsg.link != '' ? (
                  <Text
                    style={{
                      textAlign: 'center',
                      width: device_width * 0.8,
                      fontSize: 15,
                      color: Colors.primary,
                      fontWeight: '600',
                      textDecorationLine: 'underline',
                    }}
                    onPress={() => Linking.openURL(EmergencyMsg.link)}>
                    {EmergencyMsg.link}
                  </Text>
                ) : (
                  <></>
                )}
              </View>
              <View
                style={{
                  // borderWidth: 1,
                  paddingVertical: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'flex-end',
                  // marginTop: 10,
                  width: '100%',
                  // marginLeft: 10,
                  flexDirection: 'row',
                  // borderColor: '#aaa',
                  // borderRadius: 8,
                  // padding: 10,
                }}>
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    width: '35%',
                    // marginVertical: 5,
                    // borderWidth: 1,
                    alignSelf: 'center',
                    // marginRight: 25,
                    alignItems: 'center',
                    borderColor: '#000',
                    backgroundColor: 'green',
                    paddingVertical: 10,
                    justifyContent: 'center',
                  }}
                  onPress={() => setEmergencyModal(false)}>
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
          </Modal>
        )} */}
        {/* <>
          {loading ? (
            <LoadingScreen flag={loading} />
          ) : ( */}
        {/* {maintenance && (
        <MaintenanceModal
          ModalStatus={maintenance}
          closeModalFunc={() => setMaintenance(false)}
          label1={trans('Our App is under Maintenance')}
          label2={trans('Please try again after some time')}
          exitFunction={() => {
            exitAppFunc();
          }}
          btnName={trans('Okay')}
        />
      )} */}
        {/* {modalStatus && (
            <CommonModalUser
              ModalStatus={modalStatus}
              isIconShow={false}
              closeModalFunc={() => handleDialogClose()}
              label1={trans(
                `Are you sure you want to remove your child's details ?`,
              )}
              label2={trans(`His/Her details will be permanently removed`)}
              yesbtnName={trans('YES')}
              // yesbtnFunction={() => {
              //   dispatch(deleteChildApi(id, deleteCallBack()));
              // }}
              yesbtnFunction={() => deleteChild(selectedRecordToDelete)}
              nobtnName={trans('NO')}
              nobtnFunction={() => handleDialogClose()}
            />
          )} */}
        {/* )}
        </> */}
      </ImageBackground >
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  indicatorStyle: {
    // Customize the indicator color here
    backgroundColor: 'white', // Change this to your desired color
  },
});

export default UserHome;
