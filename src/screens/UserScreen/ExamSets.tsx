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
  Alert,
  BackHandler,
  ImageBackground,
  Platform,
} from 'react-native';
import {
  GET_REVISION_ANSWER_URL,
  GET_TOPIC_DETAILS_API,
} from '../../../constants/ApiPaths';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
import RazorpayCheckout from 'react-native-razorpay';
import WebView from 'react-native-webview';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  emailRegex,
  markCalculation,
  name_reg,
  phoneRegex,
} from '../../../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {device_height, device_width} from '../style';
// import Progress from './CommonScreens/Progress';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import { createImageProgress } from 'react-native-image-progress';
import Header from '../CommonScreens/Header';
import moment from 'moment';
import LoadingScreen from '../CommonScreens/LoadingScreen';
import {API_URL} from '../../../constants/ApiPaths';
import axios from 'axios';
import CommonMessage from '../../../constants/CommonMessage';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../../redux/store/Store';
import {selectStudentInfo} from '../../redux/reducers/StudentInfoReducer';
import {
  getUnlockChildAPI,
  selectUnlockStudent,
} from '../../redux/reducers/GetUnlockChildReducer';
import {getTopicBySubClassAPI} from '../../redux/reducers/GetTopicBySubjectReducer';
import {
  getScholarshipPremiumAPI,
  selectPremiumPurchase,
} from '../../redux/reducers/GetPremiumPurchaseReducer';
import {selectRevisionChild} from '../../redux/reducers/GetChildRevisionReducer';
import {
  getTopicDetailsAPI,
  selectTopicDetails,
  selectTopicDetailsStatus,
} from '../../redux/reducers/GetTopicDetailsFormTopicIdReducer';
import {selectContentQuiz} from '../../redux/reducers/GetContentQuizReducer';
import {handleSetExamName} from '../../redux/reducers/ExamTestNameReducer';
import {selectTopicId} from '../../redux/reducers/GetTopicIdReducer';
import {getSignatureVerification} from '../../redux/actions/ScholarshipPremiumAPI';

const ExamSets = ({route}) => {
  const navigation = useNavigation();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dispatch = useDispatch<any>();
  const {t: trans, i18n} = useTranslation();
  const [ansloading, setAnsLoading] = useState(false);
  const [vdloading, setVdLoading] = useState(true);
  const [ansIndex, setAnsIndex] = useState('');
  const Image = createImageProgress(FastImage);
  // console.log(
  //   ansIndex,
  //   'ansIndex..................',
  //   ansloading,
  //   'ansloading......................',
  //   AnsLoading,
  //   '...AnsLoading..........',
  // );
  const [ansLike, setAnsLike] = useState(false);
  const [ansDislike, setAnsDislike] = useState(false);
  const [asyncpremiumData, setasyncpremiumData] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [quizList, setQuizList] = useState(TopicList);
  const [paymentModalStatus, setPaymentModalStatus] = useState(false);

  const scrollViewRef = useRef(null);
  //
  const scrollToHighlightedRow = (highlightedIndex: any) => {
    if (selectedIndex == 3) {
      if (scrollViewRef.current) {
        const yOffset = highlightedIndex * 200; // Adjust this value based on your row height
        scrollViewRef.current.scrollTo({y: yOffset, animated: true});
      }
    }
  };

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
  // const {RevisionAnswer = [], AnsLoading = false} = useSelector(
  //   state => state.GetRevisionAnswerReducer,
  // );

  // console.log(
  //   RevisionAnswer,
  //   '......RevisionAnswer........',
  //   AnsLoading,
  //   'AnsLoading',
  // );
  const {
    Class = '',
    subjectId = '',
    boardid = '',
    scholarshipid = '',
    childId = '',
    subjectName: subject = '',
    topicName = '',
    // ExamQuestionsets = [],
    isScoreBoardFlag = false,
    scholarshipName = '',
    is2ndAvailable = '',
    topicid = '',
    index = 0,
    isVideotab = false,
    isViewAnswer = false,
    isProgressFlag = false
  } = route.params;
  console.log(
  //   is2ndAvailable,
  //   '....................route.paramsEXAMSET..............',
    topicid,
    '==================topicid',
  );
  const disableTextSelection = `
  document.documentElement.style.webkitUserSelect='none';
  document.documentElement.style.userSelect='none';
  document.documentElement.style.webkitTouchCallout='none';
`;
  // const {ExamDetails = {}} = useSelector(state => state.ExamTestNameReducer);
  // const {ExamName = ''} = ExamDetails;
  //  ExamName == 'SubjectRevisionList'
  // 
  //
  // console.log(
  //   Class,
  //   'Class',
  //   subjectId,
  //   'subjectId',
  //   boardid,
  //   'boardid',
  //   scholarshipid,
  //   'scholarshipid',
  //   childId,
  //   'childId',
  //   subject,
  //   'subject',
  //   topicName,
  //   'topicName',
  //   // ExamQuestionsets = [],
  //   isScoreBoardFlag,
  //   'isScoreBoardFlag',
  //   scholarshipName,
  //   'scholarshipName',
  //   is2ndAvailable,
  //   'is2ndAvailable',
  //   topicid,
  //   'topicid',
  //   index,
  //   'index',
  //   isVideotab,
  //   'isVideotab',
  //   isViewAnswer,
  //   'isViewAnswer',
  //   '=====================ROUTEEEEEEEEEE------------',
  // );
  // const {TopicBySubClass: TopicsList = []} = useSelector(
  //   state => state.GetTopicBySubClassReducer,
  // );
  // const {TopicDetailsByTopicId: TopicList = []} = useSelector(
  //   state => state.GetTopicDetailsFormTopicIdReducer,
  // );
  //
  // const {TopicDetailsByTopicId = []} = useSelector(
  //   state => state.GetTopicDetailsFormTopicIdReducer,
  // );

  // const {reviewquestionsets=[]}=TopicList
  const TopicList = useAppSelector(selectTopicDetails);
  const TopicLoading = useAppSelector(selectTopicDetailsStatus);
  
  // 

  // const {ContentQuiz = []} = useSelector(state => state.GetContentQuizReducer);
  const ContentQuiz = useAppSelector(selectContentQuiz);

  // 

  const ExamQuestionset = TopicList.map(r => r.reviewquestionsets);

  const ExamQuestionsets = ExamQuestionset[0];

  const premiumdata = async () => {
    try {
      let premiumValue: string | null = '';
      premiumValue = await AsyncStorage.getItem('scholarArray');
      if (premiumValue !== null) {
        setasyncpremiumData(JSON.parse(premiumValue));
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  const [lockedModalStatus, setLockedModalStatus] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState('');

  const childInfo = useAppSelector(selectStudentInfo) as ChildInfo;
  // 

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
    stageid = '',
    childid = '',
    boardid: boardID = '',
    stage = '',
    scholarship = [],
    name: userName = '',
    fname = '',
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
  } = childInfo;

  const TopicData = {
    Class,
    subjectId,
    boardid,
    scholarshipid,
    topicid,
    childId,
  };

  // const TopicDetail = {
  //   Class,
  //       subjectId,
  //       boardid,
  //       scholarshipid,
  //       childId,
  // }

  useEffect(() => {
    dispatch(getUnlockChildAPI());
    premiumdata();
    //const Predata = {childid, stageid, boardid};
    const Predata = {childid};
    dispatch(getScholarshipPremiumAPI(Predata));
    dispatch(getTopicBySubClassAPI(TopicData));
    dispatch(getUnlockChildAPI());
    navigation.addListener('focus', () => {
      dispatch(getTopicDetailsAPI(TopicData));
      dispatch(getTopicBySubClassAPI(TopicData));
      const Predata = {childid, stageid, boardid};
      dispatch(getScholarshipPremiumAPI(Predata));

      //     undefined,
      //     Class,
      //     subjectId,
      //     boardid,
      //     scholarshipid,
      //     childId,
      //     setLoading,
      //     () => {},
      //   ),
      // );
      BackHandler.addEventListener('hardwareBackPress', () => {
        // navigation.goBack();
        handleGoBack();
        return true;
      });
      // if (childid != '') {
      //   // dispatch(
      //   //   getScholarshipPremiumAPI(undefined, childid, stageid, boardid),
      //   // );
      //   // dispatch(
      //   //   getTopicDetailsAPI(
      //   //     undefined,
      //   //     Class,
      //   //     subjectId,
      //   //     boardid,
      //   //     scholarshipid,
      //   //     topicid,
      //   //     childId,
      //   //     setLoading,
      //   //   ),
      //   // );
      //   // console.log(
      //   //   childid,
      //   //   stageid,
      //   //   boardid,
      //   //   '------childid, ++++++++++stageid, =============boardid',
      //   // );
      // }
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        // navigation.goBack();
        handleGoBack();
        return true;
      });
    };
  }, [selectedIndex]);

  // const handleBackButtonClick = () => {
  //
  //   // navigation.goBack();
  //   // navigation.replace('SubjectsDetails', {
  //   //   subjectid: subjectId,
  //   //   subjectname: subject,
  //   //   subjectImage: "",
  //   //   Class: stageid,
  //   //   scholarshipid: scholarshipid,
  //   //   boardid: boardid,
  //   //   childId: childid,
  //   // });
  //   navigation.goBack();
  //   // return true;
  // };
  const [videoList, setVideoList] = useState([]);
  const [conceptList, setConceptList] = useState([]);
  const [videoIndex, setVideoIndex] = useState('');
  // const [parentIndex,setParentIndex]=useState(index)

  useEffect(() => {
    if (ExamQuestionsets) {
      if (ExamQuestionsets[0].videos.length > 0) {
        let datalist = [...ExamQuestionsets];

        // let data = [...ExamQuestionsets[0].videos];
        datalist = datalist.map(row => {
          let list = [];
          if (row.videos.length > 0)
            row.videos.map(rec => {
              list.push({...rec, paused: true});
            });
          return {...row, videos: list};
        });
        setVideoList(datalist);
      }
      if (ExamQuestionsets[0].concepts.length > 0) {
        let datalist = [...ExamQuestionsets];

        // let data = [...ExamQuestionsets[0].videos];
        datalist = datalist.map(row => {
          let list = [];
          if (row.concepts.length > 0)
            row.concepts.map(rec => {
              list.push({...rec});
            });
          return {...row, concepts: list};
        });
        setContentList(datalist);
      }
    }
  }, [ExamQuestionsets]);

  const handleLikeVal = (parentindex, childindex, isLike) => {
    setVideoIndex(childindex);
    if (ExamQuestionsets[0].videos.length > 0) {
      let datalist = [...ExamQuestionsets];
      let likeUpdateBodyData = {
        id: ExamQuestionsets[parentindex].id,
        videos: ExamQuestionsets[parentindex].videos,
      };
      // let data = [...ExamQuestionsets[0].videos];
      // datalist = datalist.map(row => {
      //   let list = [];
      //   if (row.videos.length > 0)
      //     row.videos.map(rec => {
      //       list.push({...rec, paused: true});
      //     });
      //   //

      //   return {...row, videos: list};
      // });
      //
      if (isLike) {
        let Like = !datalist[parentindex].videos[childindex].like;

        datalist[parentindex].videos[childindex].like =
          !datalist[parentindex].videos[childindex].like;
        datalist[parentindex].videos[childindex].dislike = false;
        let userLikedata = datalist[parentindex].videos[childindex].userslike;
        userLikedata = userLikedata.filter(row => row.childid != childId);
        if (Like) {
          let userData = {
            childid: childId,
            comment: 'like',
            timestamp: '',
          };
          // let userLikedata = datalist[parentindex].videos[childindex].userslike;
          datalist[parentindex].videos[childindex].userslike = [
            ...userLikedata,
            userData,
          ];
          likeUpdateBodyData = {
            ...likeUpdateBodyData,
            videos: datalist[parentindex].videos,
          };
        } else {
          // let userLikedata = datalist[parentindex].videos[childindex].userslike;
          // userLikedata=userLikedata.filter(row=>row.childid!=childId )
          datalist[parentindex].videos[childindex].userslike = [
            ...userLikedata,
          ];
        }
      } else {
        let disLike = !datalist[parentindex].videos[childindex].dislike;

        datalist[parentindex].videos[childindex].like = false;
        datalist[parentindex].videos[childindex].dislike =
          !datalist[parentindex].videos[childindex].dislike;
        let userLikedata = datalist[parentindex].videos[childindex].userslike;
        userLikedata = userLikedata.filter(row => row.childid != childId);
        if (disLike) {
          let userData = {
            childid: childId,
            comment: 'dislike',
            timestamp: '',
          };
          // let userLikedata = datalist[parentindex].videos[childindex].userslike;
          datalist[parentindex].videos[childindex].userslike = [
            ...userLikedata,
            userData,
          ];
          likeUpdateBodyData = {
            ...likeUpdateBodyData,
            videos: datalist[parentindex].videos,
          };
        } else {
          // let userLikedata = datalist[parentindex].videos[childindex].userslike;
          // userLikedata=userLikedata.filter(row=>row.childid!=childId )
          datalist[parentindex].videos[childindex].userslike = [
            ...userLikedata,
          ];
        }
      }
      //
      setVideoList(datalist);
      //
      dispatch(
        updateUserLikeDislikeApi(
          likeUpdateBodyData,
          setLikeLoading,
          handleCallback,
        ),
        // updateUserLikeDislikeApi(likeUpdateBodyData, setLoading, () => {}),
      );
    }
  };

  const handleConceptLikeVal = (parentindex, childindex, isLike) => {
    if (ExamQuestionsets[0].concepts.length > 0) {
      let datalist = [...ExamQuestionsets];
      let conceptLikeBodyData = {
        id: ExamQuestionsets[parentindex].id,
        concepts: ExamQuestionsets[parentindex].concepts,
      };
      if (isLike) {
        let Like = !datalist[parentindex].concepts[childindex].like;

        datalist[parentindex].concepts[childindex].like =
          !datalist[parentindex].concepts[childindex].like;
        datalist[parentindex].concepts[childindex].dislike = false;
        let userLikedata = datalist[parentindex].concepts[childindex].userslike;
        userLikedata = userLikedata.filter(row => row.childid != childId);
        if (Like) {
          let userData = {
            childid: childId,
            comment: 'like',
            timestamp: '',
          };
          // let userLikedata = datalist[parentindex].concepts[childindex].userslike;
          datalist[parentindex].concepts[childindex].userslike = [
            ...userLikedata,
            userData,
          ];
          conceptLikeBodyData = {
            ...conceptLikeBodyData,
            videos: datalist[parentindex].concepts,
          };
        } else {
          // let userLikedata = datalist[parentindex].concepts[childindex].userslike;
          // userLikedata=userLikedata.filter(row=>row.childid!=childId )
          datalist[parentindex].concepts[childindex].userslike = [
            ...userLikedata,
          ];
        }
      } else {
        let disLike = !datalist[parentindex].concepts[childindex].dislike;

        datalist[parentindex].concepts[childindex].like = false;
        datalist[parentindex].concepts[childindex].dislike =
          !datalist[parentindex].concepts[childindex].dislike;
        let userLikedata = datalist[parentindex].concepts[childindex].userslike;
        userLikedata = userLikedata.filter(row => row.childid != childId);
        if (disLike) {
          let userData = {
            childid: childId,
            comment: 'dislike',
            timestamp: '',
          };
          // let userLikedata = datalist[parentindex].concepts[childindex].userslike;
          datalist[parentindex].concepts[childindex].userslike = [
            ...userLikedata,
            userData,
          ];
          conceptLikeBodyData = {
            ...conceptLikeBodyData,
            videos: datalist[parentindex].concepts,
          };
        } else {
          // let userLikedata = datalist[parentindex].concepts[childindex].userslike;
          // userLikedata=userLikedata.filter(row=>row.childid!=childId )
          datalist[parentindex].concepts[childindex].userslike = [
            ...userLikedata,
          ];
        }
      }
      //
      setContentList(datalist);
      //
      // dispatch(
      //   updateUserLikeDislikeApi(
      //     conceptLikeBodyData,
      //     setLikeLoading,
      //     handleCallback,
      //   ),
      //   // updateUserLikeDislikeApi(conceptLikeBodyData, setLoading, () => {}),
      // );
    }
  };

  const PremiumPurchase = useAppSelector(selectPremiumPurchase);
  // const {PremiumPurchase = []} = useSelector(
  //   state => state.GetPremiumPurchaseReducer,
  // );
  //
  const RevisionData = useAppSelector(selectRevisionChild);
  // const {RevisionData = []} = useSelector(
  //   state => state.GetChildRevisionReducer,
  // );
  const [revisionData, setrevisionData] = React.useState();
  const [checkIndex, setCheckIndex] = React.useState();
  const {paymentid = '', enddate = ''} = PremiumPurchase.length
    ? PremiumPurchase[0]
    : [];

  

  useEffect(() => {
    setLockStatus(RevisionData);
  }, [RevisionData]);

  const setLockStatus = (RevisionData: any) => {
    let previousTopicUnlocked = true;

    let topicdetails = [];
    // 
    RevisionData.forEach((row, index) => {
      // RevisionData.map((row,index)=>{
      //   RevisionData.push({...row, isExamAvailable: false});
      // })
      

      if (index < 1) {
        topicdetails.push({...row, isExamAvailable: true});
      } else if (index == 1) {
        let topiconePer = RevisionData[0].studenttopic;
        console.log(
          topiconePer,
          'topiconePer*************',
          topiconePer.length > 0,
        );
        if (topiconePer.length > 0) {
          topicdetails.push({...row, isExamAvailable: true});
        } else {
          topicdetails.push({...row, isExamAvailable: false});
        }
      } else {
        let topiconePers = RevisionData[index - 1].studenttopic;
        // let topicprePer = RevisionData.map(
        //   item => item.studenttopic,
        // );
        
        if (topiconePers.length > 0) {
          topicdetails.push({...row, isExamAvailable: true});
        } else {
          topicdetails.push({...row, isExamAvailable: false});
        }
      }
    });
    setrevisionData(topicdetails);
    // 

    /////////////Code for Heighlight
    const lastindexes = topicdetails.findLastIndex(object => {
      return object.isExamAvailable == true;
    });
    setCheckIndex(lastindexes);
    
  };
  const isReattempt = true;

  //
  //
  const handleAnswersheet = async (
    authtoken,
    contentid,
    childId,
    subject,
    topicName,
    examSet,
    quiz,
    // correctanswer,
    // totalmark,
    // Wronganswer,
    // Skipped,
  ) => {
    let token = '';
    if (authtoken !== undefined) {
      authHeaderVal = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authtoken}`,
        },
      };
    }
    const url = GET_REVISION_ANSWER_URL + '/' + contentid + '/' + childId;
    await axios.get(url).then(response => {
      console.log(
        response.data.data[0].subject,
        response.data.data[0].topic,
        '...............sending data',
      );
      navigation.navigate('AnswerSheet', {
        subjectname: response.data.data[0].subject,
        chapterName: response.data.data[0].topic,
        examSet: response.data.data[0].contentset,
        quiz: response.data.data[0].quiz,
        securemark: response.data.data[0].securmark,
        totalmark: response.data.data[0].totalmark,
        Wronganswer: response.data.data[0].Wronganswer,
        Skipped: response.data.data[0].skipmark,
        Class: Class,
        subjectId: subjectId,
        boardid: boardid,
        scholarshipid: scholarshipid,
        childId: childId,
        // subjectName:subject,
        // topicName: topicName,
        // ExamQuestionsets = [],
        isScoreBoardFlag: isScoreBoardFlag,
        scholarshipName: scholarshipName,
        is2ndAvailable: is2ndAvailable,
        topicid: topicid,
        index: index,
        isVideotab: false,
        isViewAnswer: true,
      });
      setLoading(false);
      setAnsLoading(false);
    });
    const {
      correctanswer = 0,
      Skipped = 0,
      Wronganswer = 0,
      totalmark = 0,
    } = markCalculation(quiz);
  };
  const handleCallback = () => {
    dispatch(
      getTopicDetailsAPI(
        undefined,
        Class,
        subjectId,
        boardid,
        scholarshipid,
        topicid,
        childId,
        setLoading,
      ),
    );
  };

  const [show, setShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  //
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState('');
  const selectedhandler = (index, name) => {
    if (selectedId == index && selectedName == name) {
      setSelectedId(null);
      setSelectedName('');
      setShow(false);
    } else {
      setSelectedId(index);
      setSelectedName(name);
      setShow(true);
    }
  };

  // const colorList = [
  //   ['#2775cf', '#e3eefa'],
  //   ['#f08441', '#f7d7c3'],
  //   ['#8356a8', '#f3e1f7'],
  //   ['#05a851', '#d9fceb'],
  //   ['#f2618a', '#ffdeeb'],
  // ];

  // const {
  //   no_of_Attempts = 0,
  //   correctanswer = 0,
  //   Skipped = 0,
  //   Wronganswer = 0,
  //   totalmark = 0,
  //   percentage = 0,
  // } = markCalculation(ExamQuestionsets);
  const [contentList, setContentList] = useState([]);
  const [QuestionList, setQuestionList] = useState([]);

  //
  // useEffect(() => {
  //   if (ExamQuestionsets.length > 0) {
  //     setContentList(ExamQuestionsets[0].contentList);
  //   }
  // }, []);

  const TabButtonForMath = [
    {
      label: trans('Concept'),
      btnId: 1,
      isSelected: false,
    },
    {
      label: trans('Video'),
      btnId: 2,
      isSelected: false,
    },
    {
      label: trans('Revision'),
      btnId: 3,
      isSelected: false,
    },
  ];

  // const {TopicBySubClass: TopicList = []} = useSelector(
  //   state => state.GetTopicBySubClassReducer,
  // );
  // const { TopicId = '' } = useSelector(state => state.GetTopicIdReducer);

  const TopicId = useAppSelector(selectTopicId);
  
  // const {UnlockChild = []} = useSelector(state => state.GetUnlockChildReducer);
  const UnlockChild = useAppSelector(selectUnlockStudent);
  const unlockstudent = UnlockChild.filter(r => r.childid == childId);
  // 
  // 

  const handleDisable = (ExamQuestionsets: any) => {
    let selectedTopic = undefined;
    //
    if (TopicId != '') {
      selectedTopic = TopicList.find(row => row.topicid == TopicId);
    }

    const parentIndex = TopicList.findIndex(obj => obj.topicid == TopicId);
    // 
    let Data =
      selectedTopic != undefined
        ? selectedTopic.reviewquestionsets
        : ExamQuestionsets;
    let List = [...Data];
    let count = 0;
    let revisionList = [];

    //
    // List = List.filter(rec => rec.quizlength.length > 0);
    List = List.map((row, index) => {
      // const {studentdata = [], quiz = []} = row;
      const {studentdata = [], quizlength = 0} = row;
      //

      // if (parentIndex > 0) {
      if (quizlength > 0) {
        if (studentdata.length == 0 && count == 0) {
          let passStudent = false;
          if (index != 0) {
            //
            let percentage = 0;
            if (List[index - 1].studentdata.length > 0) {
              let {percentage: percentageval = 0} = markCalculation(
                List[index - 1].studentdata[0].quiz,
              );
              percentage = List[index - 1].studentdata[0].percentage;
              //
            }
            // let totalMark = List[index - 1].studentdata[0].lastexamtotalmark;
            // let secureMark =
            //   List[index - 1].studentdata[0].lastexamtotalsecurmark;
            //
            // let percentage = ((secureMark / totalMark) * 100).toFixed(1);
            //
            if (percentage >= 90) {
              passStudent = true;
            }
          }
          if (index == 0) revisionList.push({...row, isExamAvailable: true});
          else if (passStudent)
            revisionList.push({...row, isExamAvailable: true});
          else revisionList.push({...row, isExamAvailable: false});
          count += 1;
          //
        } else if (studentdata.length > 0 && count == 0) {
          revisionList.push({...row, isExamAvailable: true});
          //
        } else if (count != 0) {
          revisionList.push({...row, isExamAvailable: false});
          //
        }
      }
      // } else {
      //   revisionList.push({...row, isExamAvailable: true});
      // }
      setQuestionList(revisionList);
      //
      //

      // const lastindex = revisionList.findLastIndex(object => {
      //   return object.isExamAvailable == true;
      // });

      // 
      // setQuizList(revisionList);
      // if (lastindex != -1) {
      //   setHighlightedIndex(lastindex);
      //   // scrollToHighlightedRow(lastindex);
      //   setTimeout(() => scrollToHighlightedRow(lastindex), 400);
      // } else {
      //   setHighlightedIndex(0);
      //   // scrollToHighlightedRow(0);
      //   setTimeout(() => scrollToHighlightedRow(0), 400);
      // }
    });
  };
  // 

  const AllExamAttempted = QuestionList.find(
    rec => rec.isExamAvailable == false,
  );

  useEffect(() => {
    if (ExamQuestionsets?.length) {
      setSelectedIndex(
        isScoreBoardFlag ? 3 : tabFlag ? 3 : videotabFlag ? 2 : 1,
      );
      if (isVideotab == true) {
        setSelectedIndex(2);
      }
      if (isViewAnswer == true) {
        setSelectedIndex(3);
      }
      handleDisable(ExamQuestionsets);
    }
    if (isProgressFlag == true) {
      setSelectedIndex(3);
    }
  }, [ExamQuestionsets, TopicList, selectedIndex]);

  const isConceptList = ExamQuestionsets?.length
    ? ExamQuestionsets[0].concepts.length
      ? [ExamQuestionsets[0].concepts]
      : []
    : [];
  let isVideoList = [];
  if (ExamQuestionsets?.length) {
    ExamQuestionsets.map(rec => {
      if (rec.videos.length > 0) {
        const dataList = rec.videos.filter(
          row => row.thumbnaillink != '' && row.videolink != '',
        );
        if (dataList.length > 0) {
          isVideoList.push(rec.videos);
        }
      }
    });
  }
  const tabFlag = isVideoList.length == 0 && isConceptList.length == 0;
  const videotabFlag = isConceptList.length == 0;

  const [selectedIndex, setSelectedIndex] = useState(
    isScoreBoardFlag ? 3 : tabFlag ? 3 : videotabFlag ? 2 : 1,
  );

  //Scroll heighlight
  let lastindex = QuestionList.findLastIndex(object => {
    return object.isExamAvailable == true;
  });
  if (selectedIndex == 3) {
    if (lastindex != -1) {
      // setHighlightedIndex(lastindex);
      // scrollToHighlightedRow(lastindex);
      setTimeout(() => scrollToHighlightedRow(lastindex), 400);
    } else {
      // setHighlightedIndex(0);
      // scrollToHighlightedRow(0);
      setTimeout(() => scrollToHighlightedRow(0), 400);
    }
  }
  const handleGoBack = () => {
    navigation.goBack();
  };

  const questionlistIndex = QuestionList?.length;

  // 
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.secondary}}>
      {TopicLoading == 'loading' ? (
        <LoadingScreen flag={TopicLoading == 'loading'} />
      ) : (
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
          <Header
            label1={trans('Exam Set')}
            // label2={`{Std - ${stage}`}
            label2={`${trans('Std')}-${Class}`}
            isbackIconShow={true}
            functionName={() => {
              // navigation.goBack();
              handleGoBack();
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              // marginTop: -10,
            }}>
            <Text
              style={{
                width: '95%',
                color: '#f1a722',
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 700,
                textTransform: 'capitalize',
              }}>{`${subject} (${topicName})`}</Text>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* {subjectId == 'ଗଣି51ADA1690811051095' ? (
              <> */}
            {/* {} */}
            {TabButtonForMath.map((item, index) => {
              const {label = '', btnId = '', isSelected = ''} = item;
              const isselectedBtn = btnId == selectedIndex ? true : false;
              return (
                <View key={index}>
                  {(isVideoList.length == 0 &&
                    (item.label == 'Video' ||
                      item.label == 'ଭିଡିଓ/ ଆଭାସି' ||
                      item.label == 'वीडियो')) ||
                  (isConceptList.length == 0 &&
                    (item.label == 'Concept' ||
                      item.label == 'ଧାରଣା' ||
                      item.label == 'अवधारणा')) ? (
                    <></>
                  ) : (
                    <TouchableOpacity
                      key={index}
                      style={{
                        width: device_width * 0.33,
                        height: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // borderRightWidth: 0.5,
                        paddingVertical: 10,
                        borderWidth: 1.5,
                        // borderBottomWidth:0,
                        borderRadius: 0,
                        borderColor: isselectedBtn ? '#f1a722' : '#fff',
                        backgroundColor: isselectedBtn ? '#f1a722' : '#fff',
                        paddingHorizontal: index == 0 ? 28 : 20,
                        // borderBottomLeftRadius: index == 0 ? 15 : 0,
                        // borderTopLeftRadius: index == 0 ? 15 : 0,
                        // borderTopRightRadius: index == 2 ? 15 : 0,
                        // borderTopRightRadius: index == 2 ? 15 : 0,
                      }}
                      onPress={() => {
                        setSelectedIndex(btnId);
                        setContentList(contentList);
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: isselectedBtn ? '900' : '600',
                          color: isselectedBtn ? '#000' : 'green',
                          textDecorationLine: isselectedBtn
                            ? 'underline'
                            : 'none',
                          textAlign: 'center',
                        }}>
                        {label}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
          <ScrollView ref={scrollViewRef}>
            {/* {subjectId == 'ଗଣି51ADA1690811051095' ? (
              <> */}
            {selectedIndex == 1 ? (
              <>
                {ExamQuestionsets[0].concepts != undefined &&
                ExamQuestionsets[0].concepts.length > 0 ? (
                  contentList.map((rec, idx) => {
                    if (idx == 0) {
                      return (
                        <View key={idx}>
                          {rec.concepts.map((item, index) => {
                            const {
                              conceptname = '',
                              conceptdata = '',
                              userslike = [],
                            } = item;
                            let like = false;
                            let dislike = false;
                            const conceptVal =
                              conceptdata != '' ? JSON.parse(conceptdata) : '';
                            const likerec = userslike.find(
                              row => row.childid == childId,
                            );
                            like =
                              likerec != undefined
                                ? likerec.comment == 'like'
                                : false;
                            dislike =
                              likerec != undefined
                                ? likerec.comment == 'dislike'
                                : false;
                            {
                              /* console.log(
                              like,
                              'like=======',
                              dislike,
                              likerec,
                              '============likerec',
                              userslike,
                              'item=============>>',
                              item,
                            ); */
                            }
                            return (
                              <View
                                key={index}
                                style={{
                                  padding: 20,
                                  color: '#333',
                                  borderWidth: 1,
                                  borderColor: '#ccc',
                                  borderRadius: 5,
                                  fontSize: '38',
                                  // backgroundColor:Colors.secondary,
                                  backgroundColor: '#fff',
                                  borderWidth: 1,
                                  borderColor: '#000',
                                  marginTop: 10,
                                  // marginHorizontal: 5,
                                }}>
                                <Text
                                  style={{
                                    fontWeight: '800',
                                    color: '#333',
                                    fontSize: 15,
                                  }}>
                                  {conceptname}
                                </Text>
                                {/* <ScrollView> */}
                                <WebView
                                  style={{
                                    minHeight: device_height * 0.6,
                                    fontSize: 25,
                                  }}
                                  originWhitelist={['*']}
                                  nestedScrollEnabled
                                  injectedJavaScript={disableTextSelection}
                                  source={{
                                    html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><p>${conceptVal}</p></body></html>`,
                                  }}
                                />

                                {/* {likeLoading && index == videoIndex ? (
                                  <View
                                    style={{
                                      width: '40%',
                                      // borderWidth: 1,
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      alignSelf: 'flex-end',
                                      height: 50,
                                      justifyContent: 'space-evenly',
                                      // backgroundColor: '#def',
                                      marginVertical: 10,
                                    }}>
                                    <ActivityIndicator
                                      animating
                                      size="small"
                                      color={Colors.primary}
                                      // style={{opacity:true}}
                                    />
                                  </View>
                                ) : (
                                  <View
                                    style={{
                                      width: '40%',
                                      // borderWidth: 1,
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      alignSelf: 'flex-end',
                                      height: 50,
                                      justifyContent: 'space-evenly',
                                      // backgroundColor: '#def',
                                      marginVertical: 10,
                                    }}>
                                    <TouchableOpacity
                                      onPress={() => {
                                        // setAnsDislike(!ansDislike);
                                        // setAnsLike(false);
                                        handleConceptLikeVal(idx, index, false);
                                      }}
                                      style={{
                                        // elevation: 5,
                                        // borderWidth:1,
                                        paddingTop: 5,
                                        backgroundColor: '#fff',
                                        borderRadius: 50,
                                        height: 40,
                                        width: 40,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: 10,
                                      }}>
                                      {likeLoading && index == videoIndex ? (
                                        <></>
                                      ) : dislike ? (
                                        <Fontisto
                                          style={{
                                            marginHorizontal: 10,
                                            borderWidth: 0,
                                          }}
                                          name={'dislike'}
                                          size={20}
                                          color={'crimson'}
                                        />
                                      ) : (
                                        <>
                                          <Fontisto
                                            style={{
                                              marginHorizontal: 10,
                                              borderWidth: 0,
                                            }}
                                            name={'dislike'}
                                            size={20}
                                            color={'gray'}
                                            backgroundColor={Colors.white}
                                          />
                                        </>
                                      )}
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                      onPress={() => {
                                        // setAnsLike(!ansLike);
                                        // setAnsDislike(false);
                                        handleConceptLikeVal(idx, index, true);
                                      }}
                                      style={{
                                        // elevation: 5,
                                        backgroundColor: '#fff',
                                        borderRadius: 50,
                                        paddingBottom: 5,
                                        height: 40,
                                        width: 40,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: 10,
                                        marginRight: 10,
                                        marginLeft: 10,
                                        // borderWidth:1
                                      }}>
                                      {likeLoading ? (
                                        <></>
                                      ) : like ? (
                                        <Fontisto
                                          style={{
                                            marginHorizontal: 10,
                                            borderWidth: 0,
                                          }}
                                          name={'like'}
                                          size={20}
                                          color={Colors.primary}
                                        />
                                      ) : (
                                        <>
                                          <Fontisto
                                            style={{
                                              marginHorizontal: 10,
                                              borderWidth: 0,
                                            }}
                                            name={'like'}
                                            size={20}
                                            color={'gray'}
                                            backgroundColor={Colors.white}
                                          />
                                        </>
                                      )}
                                    </TouchableOpacity>
                                  </View>
                                )} */}

                                {/* </ScrollView> */}
                                {/* html: `${conceptdata}`, */}
                              </View>
                            );
                          })}
                        </View>
                      );
                    }
                  })
                ) : (
                  <></>
                )}
              </>
            ) : selectedIndex == 2 ? (
              <>
                {ExamQuestionsets[0].videos != undefined &&
                ExamQuestionsets[0].videos.length > 0 ? (
                  videoList != undefined &&
                  videoList.map((rec, idx) => {
                    return (
                      // <RowItem
                      //   key={idx}
                      //   item={
                      <View
                        key={idx}
                        style={{
                          display: 'flex',
                          flex: 1,

                          // borderWidth:1,
                          // borderColor:'red'
                          // flexDirection: 'column',
                          // paddingVertical: 10,
                        }}>
                        {rec.videos.map((item, index) => {
                          const {
                            videoname = '',
                            videolink = '',
                            thumbnaillink = '',
                            paused = true,
                            userslike = [],
                          } = item;
                          let like = false;
                          let dislike = false;

                          const likerec = userslike.find(
                            row => row.childid == childId,
                          );
                          like =
                            likerec != undefined
                              ? likerec.comment == 'like'
                              : false;
                          dislike =
                            likerec != undefined
                              ? likerec.comment == 'dislike'
                              : false;
                          {
                            /* console.log(
                            //like,
                           // 'like=======',
                            //dislike,
                            //likerec,
                            //'============likerec',
                            //userslike,
                            'rec=============>>',
                            rec,
                          ); */
                          }

                          if (videolink != '') {
                            setTimeout(() => {
                              setVdLoading(false);
                            }, 1050);
                            return (
                              <TouchableOpacity
                                key={index}
                                style={{
                                  // marginVertical: 5,
                                  marginHorizontal: 10,
                                  // padding: 10,
                                  // backgroundColor: "#333",
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  // borderRadius: 25,
                                  // borderWidth:1
                                }}
                                // onTouchStart
                                // onTouchStart={() => {
                                //   // resetpausevalue(idx, index);
                                //   navigation.navigate('VideoScreen', {
                                //     url: videolink,
                                //   });
                                // }}
                                onPress={() => {
                                  // resetpausevalue(idx, index);
                                  navigation.navigate('VideoScreen', {
                                    url: videolink,
                                    Class: Class,
                                    subjectId: subjectId,
                                    boardid: boardid,
                                    scholarshipid: scholarshipid,
                                    childId: childId,
                                    subject: subject,
                                    topicName: topicName,
                                    // ExamQuestionsets : [],
                                    isScoreBoardFlag: false,
                                    scholarshipName: scholarshipName,
                                    is2ndAvailable: is2ndAvailable,
                                    topicid: topicid,
                                    index: index,
                                    isVideotab: true,
                                  });
                                }}>
                                {/* {vdloading == true ? (
                                  <View
                                    style={{
                                      height: 180,
                                      width: device_width,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}>
                                    <FastImage
                                      style={{
                                        height: 180,
                                        width: device_width,
                                        flex: 1,
                                        alignSelf: 'center',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }}
                                      resizeMode="cover"
                                      source={require('../../../assets/0.png')}>
                                      <ActivityIndicator
                                        size="small"
                                        color={'#fff'}
                                        style={{
                                          alignSelf: 'center',
                                          // paddingRight: 10,
                                          justifyContent: 'center',
                                          // fontSize: 12,
                                        }}
                                      />
                                    </FastImage>
                                  </View>
                                ) : ( */}
                                  <Image
                                    style={{
                                      // borderRadius: 50,
                                      // borderWidth: 1,
                                      width: device_width * 0.94,
                                      height: device_height * 0.3,
                                      borderRadius: 16,
                                      // borderColor:'#fff',
                                      flex: 1,
                                      justifyContent: 'flex-end',
                                      alignItems: 'flex-end',
                                    }}
                                    resizeMode="contain"
                                    source={{
                                      uri:
                                        thumbnaillink != '' &&
                                        thumbnaillink != null
                                          ? thumbnaillink
                                          : 'https://notevook.s3.ap-south-1.amazonaws.com/Adarsh/Notevook+NVA.png',
                                      // priority: FastImage.priority.high,
                                    }}
                                    indicator={Progress.Pie}
                                    onLoad={() => {
                                      thumbnaillink;
                                    }}>
                                    {/* {likeLoading && index == videoIndex ? (
                                    <View
                                      style={{
                                        width: '40%',
                                        // borderWidth: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        alignSelf: 'flex-end',
                                        height: 50,
                                        justifyContent: 'space-evenly',
                                        // backgroundColor: '#def',
                                        marginVertical: 10,
                                      }}>
                                      <ActivityIndicator
                                        animating
                                        size="small"
                                        color={Colors.primary}
                                        // style={{opacity:true}}
                                      />
                                    </View>
                                  ) : (
                                    <View
                                      style={{
                                        width: '40%',
                                        // borderWidth: 1,
                                        flexDirection: 'row',
                                        alignItems: 'flex-end',
                                        height: 40,
                                        justifyContent: 'flex-end',
                                      }}>
                                      <TouchableOpacity
                                        onPress={() => {
                                          // setAnsDislike(!ansDislike);
                                          // setAnsLike(false);
                                          handleLikeVal(idx, index, false);
                                        }}
                                        style={{
                                          // elevation: 5,
                                          // borderWidth:1,
                                          paddingTop: 5,
                                          backgroundColor: '#fff',
                                          borderRadius: 50,
                                          height: 40,
                                          width: 40,
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          marginBottom: 10,
                                        }}>
                                        {likeLoading && index == videoIndex ? (
                                          <></>
                                        ) : dislike ? (
                                          <Fontisto
                                            style={{
                                              marginHorizontal: 10,
                                              borderWidth: 0,
                                            }}
                                            name={'dislike'}
                                            size={20}
                                            color={'crimson'}
                                          />
                                        ) : (
                                          <>
                                            <Fontisto
                                              style={{
                                                marginHorizontal: 10,
                                                borderWidth: 0,
                                              }}
                                              name={'dislike'}
                                              size={20}
                                              color={'gray'}
                                              backgroundColor={Colors.white}
                                            />
                                          </>
                                        )}
                                      </TouchableOpacity>
                                      <TouchableOpacity
                                        onPress={() => {
                                          // setAnsLike(!ansLike);
                                          // setAnsDislike(false);
                                          handleLikeVal(idx, index, true);
                                        }}
                                        style={{
                                          // elevation: 5,
                                          backgroundColor: '#fff',
                                          borderRadius: 50,
                                          paddingBottom: 5,
                                          height: 40,
                                          width: 40,
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          marginBottom: 10,
                                          marginRight: 10,
                                          marginLeft: 10,
                                          // borderWidth:1
                                        }}>
                                        {likeLoading && index == videoIndex ? (
                                          <></>
                                        ) : like ? (
                                          <Fontisto
                                            style={{
                                              marginHorizontal: 10,
                                              borderWidth: 0,
                                            }}
                                            name={'like'}
                                            size={20}
                                            color={Colors.primary}
                                          />
                                        ) : (
                                          <>
                                            <Fontisto
                                              style={{
                                                marginHorizontal: 10,
                                                borderWidth: 0,
                                              }}
                                              name={'like'}
                                              size={20}
                                              color={'gray'}
                                              backgroundColor={Colors.white}
                                            />
                                          </>
                                        )}
                                      </TouchableOpacity>
                                    </View>
                                  )} */}
                                  </Image>
                                {/* )} */}
                                {/* <FastImage
                                      style={{
                                        width: device_width * 0.95,
                                        height: device_height * 0.3,
                                        borderRadius: 25,
                                        // borderWidth:2,
                                        // borderColor:'#ccc'
                                      }}
                                      source={{
                                        uri:
                                          thumbnaillink != '' &&
                                          thumbnaillink != undefined
                                            ? thumbnaillink
                                            : 'https://notevook.s3.ap-south-1.amazonaws.com/Adarsh/Notevook+NVA.png',

                                        priority: FastImage.priority.normal,
                                      }}
                                      resizeMode={'contain'}
                                    /> */}

                                {/* <VideoCard
                                      navigation={navigation}
                                      url={videolink}
                                      isVideoPaused={paused}
                                      thumbnaillink={
                                        thumbnaillink != '' &&
                                        thumbnaillink != undefined
                                          ? thumbnaillink
                                          : // : (src = require('../../../assets/thumbnail.png'))
                                            'https://notevook.s3.ap-south-1.amazonaws.com/Adarsh/Notevook+NVA.png'
                                      }
                                      // resizeMode={'contain'}
                                    /> */}
                              </TouchableOpacity>
                            );
                          }
                        })}
                      </View>
                      // }
                      // index={idx}
                      // />
                    );
                  })
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                {/* {is2ndAvailable == 1 && ( */}
                {questionlistIndex == 1 && (
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
                      style={{
                        marginHorizontal: 10,
                        borderWidth: 0,
                      }}
                      name={'infocirlce'}
                      size={30}
                      color={'#fff'}
                    />
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: '700',
                        fontSize: 15,
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
                )}
                <View style={{paddingVertical: 10}}>
                  {QuestionList.length > 0 ? (
                    QuestionList.map((item, index) => {
                      const {
                        id = '',
                        contentset = '',
                        contentid = '',
                        studentdata = [],
                        quiz = [],
                        score = '',
                        result = '',
                        fullmark = '',
                        timeDuration = '',
                        quizlength = '',
                        isExamAvailable = false,
                      } = item;

                      {
                        {
                          /*  */
                        }
                      }
                      let isInfoFlag = false;
                      let selectedTopic = undefined;
                      if (TopicId != '') {
                        selectedTopic = TopicList.find(
                          row => row.topicid == TopicId,
                        );
                      }
                      let parentIndex = TopicList.findIndex(
                        obj => obj.topicid == TopicId,
                      );
                      {
                        /*  */
                      }
                      if (
                        index > 0 &&
                        isExamAvailable == false &&
                        QuestionList[index - 1].isExamAvailable == true &&
                        AllExamAttempted !== undefined
                      )
                        isInfoFlag = true;
                      {
                        /* console.log(
                        item,
                        '===================item***************',
                      ); */
                      }

                      let isPremium = index < 2 ? true : false;
                      isPremium = parentIndex < 0 ? true : false;

                      if (PremiumPurchase.length) {
                        {
                          /* const premiumData = PremiumPurchase.find(
                          rec => rec.scholarshipid == scholarshipid,
                        );
                        if (premiumData != undefined) {
                          isPremium = true;
                        } */
                        }

                        {
                          /* if(isPremium=false){
                              const premiumAccessData=PremiumPurchase.find(
                                record=>rec.scholarshipid==premiumValue.scholarshipid
                              )

                             }  */
                        }

                        {
                          /* if (isPremium == false && parentIndex >= 0) {
                          {
                            
                          }
                          let resultArr = PremiumPurchase.filter(o1 =>
                            asyncpremiumData.some(
                              o2 => o1.scholarshipid === o2.scholarshipId,
                            ),
                          );
                          if (resultArr.length == 0) {
                            isPremium = false;
                          } else {
                            isPremium = true;
                          }
                        }  */
                        }
                        if (isPremium == false && parentIndex >= 0) {
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
                          if (LicenseID[0] == true) {
                            if (is2ndAvailable > 1) {
                              if (paymentid == 'free7days') {
                                isPremium = false;
                              } else {
                                isPremium = true;
                              }
                            } else {
                              isPremium = true;
                            }
                          } else {
                            isPremium = false;
                          }

                          {
                            
                          }
                        }
                      }
                      {
                        /*  */
                      }
                      {
                        /* if (item.quizlength.length > 0) {  */
                      }
                      return (
                        <TouchableOpacity
                          disabled={true}
                          key={index}
                          style={{
                            // elevation: 5,
                            width: '94%',
                            alignSelf: 'center',
                            // backgroundColor: '#def',
                            // backgroundColor: 'rgba(0,255,0,0.15)',
                            backgroundColor: isExamAvailable
                              ? 'rgba(0,255,0,0.1)'
                              : 'rgba(220,220,220,0.1)',
                            marginTop: 10,
                            padding: 10,
                            // justifyContent: 'center',
                            // alignItems: 'center',
                            borderRadius: 10,
                            borderWidth: 0.5,
                            borderColor: isExamAvailable ? '#f1a722' : '#999',
                          }}>
                          {isExamAvailable ||
                          (unlockstudent != undefined &&
                            unlockstudent.length > 0) ? (
                            <View>
                              {isPremium ? (
                                <View>
                                  {studentdata.length > 0 ? (
                                    <View>
                                      <View
                                        style={{
                                          // justifyContent: 'center',
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                          // borderWidth: 1,
                                        }}>
                                        <MaterialCommunityIcons
                                          name="hand-pointing-right"
                                          color={'#f1a722'}
                                          size={30}
                                          style={{marginRight: 10}}
                                        />
                                        <Text
                                          style={[
                                            styles.question,
                                            {
                                              width: '75%',
                                              // marginLeft: 5,
                                              color: '#f1a722',
                                              fontWeight: '800',
                                              fontSize: 16,
                                            },
                                          ]}>
                                          {contentset}
                                        </Text>
                                      </View>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          justifyContent: 'space-between',
                                        }}>
                                        {studentdata.length > 0 &&
                                          studentdata.map((item, index) => {
                                            const {
                                              totalmark = '',
                                              securmark = '',
                                              wrongmark = '',
                                              skipmark = '',
                                              percentage = '',
                                              lastattemptDate = '',
                                              numberofattempt = '',
                                              quiz: studentQuiz = [],
                                            } = item;
                                            {
                                              /*  */
                                            }
                                            const {
                                              correctanswer = 0,
                                              Skipped = 0,
                                              Wronganswer = 0,
                                              // totalmark = 0,
                                              // percentage = 0,
                                            } = markCalculation(studentQuiz);
                                            {
                                              /* const percentageSecure =
                                                      percentage.toFixed(1); */
                                            }
                                            {
                                              /* console.log(
                                                percentageSecure,
                                                'percentageSecure...........@@@@@',
                                              ); */
                                            }
                                            let percentageSecure = percentage;

                                            return (
                                              <View
                                                key={index}
                                                style={{width: '70%'}}>
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
                                                    {trans(
                                                      'Total No. of Attempts',
                                                    )}
                                                  </Text>
                                                  <Text
                                                    style={{
                                                      textTransform:
                                                        'capitalize',
                                                      color: '#f1a722',
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
                                                      textTransform:
                                                        'capitalize',
                                                      color: '#f1a722',
                                                      fontSize: 14,
                                                      fontWeight: '500',
                                                    }}>
                                                    {`: ${moment(
                                                      lastattemptDate,
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
                                                      textTransform:
                                                        'capitalize',
                                                      color: '#f1a722',
                                                      fontSize: 14,
                                                      fontWeight: 'bold',
                                                    }}>
                                                    {`: ${totalmark}`}
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
                                                      textTransform:
                                                        'capitalize',
                                                      color: 'lawngreen',
                                                      fontSize: 14,
                                                      fontWeight: 'bold',
                                                    }}>
                                                    {`: ${securmark}`}
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
                                                      textTransform:
                                                        'capitalize',
                                                      color:
                                                        percentageSecure >= 90
                                                          ? 'lawngreen'
                                                          : 'darkorange',
                                                      fontSize: 14,
                                                      fontWeight: 'bold',
                                                    }}>
                                                    : {percentageSecure}%
                                                  </Text>
                                                </View>
                                              </View>
                                            );
                                          })}
                                        <TouchableOpacity
                                          onPress={() => {
                                            let quizData = [...ContentQuiz];
                                            // let quizData = [...quiz];
                                            if (isReattempt) {
                                              quizData = quizData.map(rec => {
                                                return {
                                                  ...rec,
                                                  selectedAns: '',
                                                };
                                              });
                                            }

                                            dispatch(
                                              handleSetExamName(
                                                'SubjectRevision',
                                                // scholarshipid,
                                                // boardid,
                                                // stage,
                                                // childid,
                                                // subjectid,
                                                // scholarshipName,
                                                // stageid,
                                              ),
                                            );
                                            // dispatch(
                                            //   getContentQuizAPI(
                                            //     undefined,
                                            //     contentid,
                                            //   ),
                                            // );
                                            navigation.navigate('MockTests', {
                                              screenName: 'ExamSets',
                                              subjectName: subject,
                                              chapterName: topicName,
                                              examSet: contentset,
                                              // quiz: quizData,
                                              contentid: contentid,
                                              isReattempt: isReattempt,
                                              studentdata: studentdata,
                                              ExamQuestionsets:
                                                ExamQuestionsets,
                                              scholarshipid: scholarshipid,
                                              subjectId: subjectId,
                                              boardid: boardid,
                                              timeDuration: timeDuration,
                                              scholarshipName: scholarshipName,
                                              is2ndAvailable: is2ndAvailable,
                                              topicid: topicid,
                                            });
                                            // handleAsyncSetExamName(
                                            //   'SubjectRevision',
                                            // );
                                          }}
                                          style={{
                                            alignItems: 'center',
                                            // borderWidth: 1,
                                            justifyContent: 'center',
                                            paddingHorizontal: 5,
                                            paddingVertical: 7,
                                            borderRadius: 5,
                                            marginRight: 10,
                                          }}>
                                          <MaterialCommunityIcons
                                            name="refresh"
                                            color={'#f1a722'}
                                            size={40}
                                            // style={{marginRight: 10}}
                                          />
                                          <Text
                                            style={{
                                              // width: 210,
                                              color: '#f1a722',
                                              fontWeight: '900',
                                              fontSize: 12,
                                              letterSpacing: 0.5,
                                            }}>
                                            {trans('Reattempt')}
                                          </Text>
                                        </TouchableOpacity>
                                      </View>
                                      <View
                                        style={{
                                          paddingHorizontal: 10,
                                          // paddingVertical: 10,
                                          marginTop: 10,
                                          borderRadius: 5,
                                          borderColor: '#f1a722',
                                          backgroundColor: '#f1a722',
                                          alignItems: 'center',
                                          marginHorizontal: -10,
                                          marginBottom: -10,
                                          borderTopWidth: 1,
                                          borderBottomLeftRadius: 10,
                                          borderBottomRightRadius: 10,
                                          flexDirection: 'row',
                                          justifyContent: 'center',
                                          // justifyContent: 'space-between',
                                        }}>
                                        <TouchableOpacity
                                          disabled={ansloading == true}
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            width: '45%',
                                            // width: '100%',
                                            height: 40,
                                            // borderWidth: 1,
                                            justifyContent: 'center',
                                          }}
                                          onPress={() => {
                                            handleAnswersheet(
                                              undefined,
                                              contentid,
                                              childId,
                                              // subject,
                                              // topicName,
                                              // contentset,
                                              // RevisionAnswer[0].quiz,
                                            );
                                            // dispatch(
                                            //   getRevisionAnswerAPI(
                                            //     undefined,
                                            //     contentid,
                                            //     childId,
                                            //   ),
                                            // );
                                            setAnsIndex(index);
                                            setAnsLoading(true);
                                            setTimeout(() => {
                                              // setAnsLoading(false);
                                              dispatch(
                                                handleSetExamName(
                                                  'SubjectRevisionList',
                                                ),
                                              );
                                              // {
                                              //   RevisionAnswer.length > 0 ? (
                                              //     //   handleAnswersheet(
                                              //     //     undefined,
                                              //     // contentid,
                                              //     // childId,
                                              //     //     // subject,
                                              //     //     // topicName,
                                              //     //     // contentset,
                                              //     //     // RevisionAnswer[0].quiz,
                                              //     //   )
                                              //     <></>
                                              //   ) : (
                                              //     <></>
                                              //   );
                                              // }
                                              dispatch(
                                                handleSetExamName(
                                                  'SubjectRevisionList',
                                                ),
                                              );
                                              // handleAsyncSetExamName(
                                              //   'SubjectRevision',
                                              // );
                                            }, 1000);
                                          }}>
                                          {ansIndex == index &&
                                          ansloading == true ? (
                                            <ActivityIndicator
                                              size="small"
                                              color={'#000'}
                                              style={{
                                                // alignSelf: 'flex-start',
                                                paddingRight: 10,
                                                fontSize: 12,
                                              }}
                                            />
                                          ) : (
                                            <></>
                                          )}
                                          <Text
                                            style={{
                                              color: '#333',
                                              fontSize: 15,
                                              letterSpacing: 0.5,
                                              fontWeight: '900',
                                            }}>
                                            {trans(`View Answers`)}
                                          </Text>
                                        </TouchableOpacity>

                                        {/* <View
                                            style={{
                                              width: '40%',
                                              // borderWidth: 1,
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              height: 40,
                                              justifyContent: 'center',
                                            }}>
                                            <TouchableOpacity
                                              onPress={() => {
                                                setAnsDislike(!ansDislike);
                                                setAnsLike(false);
                                              }}
                                              style={{
                                                // elevation: 5,
                                                // borderWidth:1,
                                                paddingTop: 5,
                                                backgroundColor: '#fff',
                                                // borderRadius: 50,
                                                height: 40,
                                                width: '40%',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                              }}>
                                              {ansIndex == index &&
                                              ansDislike ? (
                                                <Fontisto
                                                  style={{
                                                    marginHorizontal: 10,
                                                    borderWidth: 0,
                                                  }}
                                                  name={'dislike'}
                                                  size={20}
                                                  color={'crimson'}
                                                />
                                              ) : (
                                                <Fontisto
                                                  style={{
                                                    marginHorizontal: 10,
                                                    borderWidth: 0,
                                                  }}
                                                  name={'dislike'}
                                                  size={20}
                                                  color={'gray'}
                                                  backgroundColor={Colors.white}
                                                />
                                              )}
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                              onPress={() => {
                                                setAnsLike(!ansLike);
                                                setAnsDislike(false);
                                              }}
                                              style={{
                                                // elevation: 5,
                                                backgroundColor: '#fff',
                                                // borderRadius: 50,
                                                paddingBottom: 5,
                                                height: 40,
                                                width: '40%',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                // borderWidth:1
                                              }}>
                                              {ansIndex == index && ansLike ? (
                                                <Fontisto
                                                  style={{
                                                    marginHorizontal: 10,
                                                    borderWidth: 0,
                                                  }}
                                                  name={'like'}
                                                  size={20}
                                                  color={Colors.primary}
                                                />
                                              ) : (
                                                <Fontisto
                                                  style={{
                                                    marginHorizontal: 10,
                                                    borderWidth: 0,
                                                  }}
                                                  name={'like'}
                                                  size={20}
                                                  color={'gray'}
                                                  backgroundColor={Colors.white}
                                                />
                                              )}
                                            </TouchableOpacity>
                                          </View> */}
                                      </View>
                                    </View>
                                  ) : (
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                      }}>
                                      <View style={{width: '70%'}}>
                                        <View
                                          style={{
                                            // justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            // borderWidth: 1,
                                          }}>
                                          <MaterialCommunityIcons
                                            name="hand-pointing-right"
                                            color={'#f1a722'}
                                            size={30}
                                            style={{marginRight: 10}}
                                          />
                                          <Text
                                            style={[
                                              styles.question,
                                              {
                                                width: '75%',
                                                // marginLeft: 5,
                                                color: '#f1a722',
                                                fontWeight: '800',
                                                fontSize: 16,
                                              },
                                            ]}>
                                            {contentset}
                                          </Text>
                                        </View>
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
                                              // marginLeft: 20,
                                              // marginTop: 10,
                                            }}>
                                            {trans('Total Question')}
                                          </Text>
                                          <Text
                                            style={{
                                              textTransform: 'capitalize',
                                              color: '#fff',
                                              width: '50%',
                                              // percentageSecure > 90
                                              //   ? 'green'
                                              //   :
                                              // 'darkorange',
                                              fontSize: 14,
                                              fontWeight: 'bold',
                                            }}>
                                            : {item.quizlength}
                                          </Text>
                                        </View>
                                        {timeDuration != '' && (
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
                                                // marginLeft: 20,
                                                // marginTop: 10,
                                              }}>
                                              {trans('Time Duration')}
                                            </Text>
                                            <Text
                                              style={{
                                                textTransform: 'capitalize',
                                                color: '#fff',
                                                width: '50%',
                                                // percentageSecure > 90
                                                //   ? 'green'
                                                //   :
                                                // 'darkorange',
                                                fontSize: 14,
                                                fontWeight: 'bold',
                                              }}>
                                              : {timeDuration} mins
                                            </Text>
                                          </View>
                                        )}
                                      </View>
                                      <TouchableOpacity
                                        style={{
                                          paddingHorizontal: 10,
                                          paddingVertical: 7,
                                          borderRadius: 5,
                                          borderColor: '#f1a722',
                                          // backgroundColor: '#f1a722',
                                          backgroundColor: '#fff',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          height: 38,
                                          width: '30%',
                                        }}
                                        onPress={() => {
                                          dispatch(
                                            handleSetExamName(
                                              'SubjectRevision',
                                            ),
                                          );
                                          // dispatch(
                                          //   getContentQuizAPI(
                                          //     undefined,
                                          //     contentid,
                                          //   ),
                                          // );
                                          navigation.navigate('MockTests', {
                                            screenName: 'ExamSets',
                                            subjectName: subject,
                                            chapterName: topicName,
                                            examSet: contentset,
                                            // quiz: quiz,
                                            // quiz: ContentQuiz,
                                            contentid: contentid,
                                            isReattempt: isReattempt == false,
                                            studentdata: studentdata,
                                            ExamQuestionsets: ExamQuestionsets,
                                            scholarshipid: scholarshipid,
                                            subjectId: subjectId,
                                            boardid: boardid,
                                            timeDuration: timeDuration,
                                            scholarshipName: scholarshipName,
                                            is2ndAvailable: is2ndAvailable,
                                            topicid: topicid,
                                          });
                                          // handleAsyncSetExamName(
                                          //   'SubjectRevision',
                                          // );
                                        }}>
                                        <Text
                                          style={{
                                            color: 'green',
                                            fontSize: 12,
                                            letterSpacing: 0.5,
                                            fontWeight: '900',
                                          }}>
                                          {trans('Start Test')}
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                  )}
                                </View>
                              ) : (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingVertical: 10,
                                  }}>
                                  <View style={{width: '70%'}}>
                                    <View
                                      style={{
                                        // justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        // borderWidth: 1,
                                      }}>
                                      <MaterialCommunityIcons
                                        name="hand-pointing-right"
                                        color={'#f1a722'}
                                        size={30}
                                        style={{marginRight: 10}}
                                      />
                                      <Text
                                        style={[
                                          styles.question,
                                          {
                                            width: '75%',
                                            // marginLeft: 5,
                                            color: '#f1a722',
                                            fontWeight: '800',
                                            fontSize: 16,
                                          },
                                        ]}>
                                        {contentset}
                                      </Text>
                                    </View>
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
                                          // marginLeft: 20,
                                          // marginTop: 10,
                                        }}>
                                        {trans('Total Question')}
                                      </Text>
                                      <Text
                                        style={{
                                          textTransform: 'capitalize',
                                          color: '#fff',
                                          width: '50%',
                                          // percentageSecure > 90
                                          //   ? 'green'
                                          //   :
                                          // 'darkorange',
                                          fontSize: 14,
                                          fontWeight: 'bold',
                                        }}>
                                        : {item.quizlength}
                                      </Text>
                                    </View>
                                    {timeDuration != '' && (
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
                                            // marginLeft: 20,
                                            // marginTop: 10,
                                          }}>
                                          {trans('Time Duration')}
                                        </Text>
                                        <Text
                                          style={{
                                            textTransform: 'capitalize',
                                            color: '#fff',
                                            width: '50%',
                                            // percentageSecure > 90
                                            //   ? 'green'
                                            //   :
                                            // 'darkorange',
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                          }}>
                                          : {timeDuration} mins
                                        </Text>
                                      </View>
                                    )}
                                  </View>
                                  <TouchableOpacity
                                    style={{
                                      paddingHorizontal: 15,
                                      paddingVertical: 7,
                                      borderRadius: 5,
                                      borderColor: '#f1a722',
                                      backgroundColor: '#f1a722',
                                      width: '30%',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      height: 38,
                                      // marginBottom: 50,
                                      // marginTop: 20,
                                    }}
                                    onPress={
                                      () => setPaymentModalStatus(true)
                                      // navigation.navigate('PremiumAccess', {
                                      //   screenName: 'ExamSets',
                                      //   subjectId: subjectId,
                                      //   subjectName: subject,
                                      //   topicid: topicid,
                                      //   topicName: topicName,
                                      //   ExamQuestionsets: ExamQuestionsets,
                                      //   isScoreBoardFlag: false,
                                      //   scholarshipid: scholarshipid,
                                      //   scholarshipName: scholarshipName,
                                      //   is2ndAvailable: is2ndAvailable,
                                      //   index: index,
                                      //   quizList: [],
                                      //   showFeedback: false,
                                      // })
                                    }>
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
                            </View>
                          ) : (
                            <>
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
                                    style={{
                                      marginHorizontal: 10,
                                      borderWidth: 0,
                                    }}
                                    name={'infocirlce'}
                                    size={20}
                                    color={'#fff'}
                                  />
                                  <Text
                                    style={{
                                      color: '#fff',
                                      fontWeight: '700',
                                      fontSize: 15,
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
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <View style={{width: '70%'}}>
                                  <View
                                    style={{
                                      // justifyContent: 'center',
                                      alignItems: 'center',
                                      flexDirection: 'row',
                                      // borderWidth: 1,
                                    }}>
                                    <MaterialCommunityIcons
                                      name="hand-pointing-right"
                                      color={'grey'}
                                      size={30}
                                      style={{marginRight: 10}}
                                    />

                                    <Text
                                      style={[
                                        styles.question,
                                        {
                                          width: '75%',
                                          // marginLeft: 5,
                                          color: 'grey',
                                          fontWeight: '800',
                                          fontSize: 16,
                                        },
                                      ]}>
                                      {contentset}
                                    </Text>
                                  </View>
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
                                        color: '#666',
                                        fontSize: 14,
                                        fontWeight: '700',
                                        // marginLeft: 20,
                                        // marginTop: 10,
                                      }}>
                                      {trans('Total Question')}
                                    </Text>
                                    <Text
                                      style={{
                                        textTransform: 'capitalize',
                                        color: '#666',
                                        width: '50%',
                                        // percentageSecure > 90
                                        //   ? 'green'
                                        //   :
                                        // 'darkorange',
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                      }}>
                                      : {item.quizlength}
                                    </Text>
                                  </View>
                                  {timeDuration != '' && (
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
                                          color: '#666',
                                          fontSize: 14,
                                          fontWeight: '700',
                                          // marginLeft: 20,
                                          // marginTop: 10,
                                        }}>
                                        {trans('Time Duration')}
                                      </Text>
                                      <Text
                                        style={{
                                          textTransform: 'capitalize',
                                          color: '#666',
                                          width: '50%',
                                          // percentageSecure > 90
                                          //   ? 'green'
                                          //   :
                                          // 'darkorange',
                                          fontSize: 14,
                                          fontWeight: 'bold',
                                        }}>
                                        : {timeDuration} mins
                                      </Text>
                                    </View>
                                  )}
                                </View>
                                <TouchableOpacity
                                  style={{
                                    backgroundColor: 'gray',
                                    paddingHorizontal: 15,
                                    paddingVertical: 10,
                                    borderRadius: 5,
                                    width: '30%',
                                    height: 38,
                                    alignItems: 'center',
                                  }}
                                  onPress={() => setLockedModalStatus(true)}>
                                  <Text
                                    style={{
                                      color: '#fff',
                                      fontSize: 12,
                                      letterSpacing: 0.5,
                                      fontWeight: '900',
                                    }}>
                                    <Fontisto
                                      style={{color: '#fff'}}
                                      name="locked"
                                      size={15}
                                    />
                                    {'  '}
                                    {trans('Locked')}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </>
                          )}
                        </TouchableOpacity>
                      );
                      {
                        /* } else { */
                      }
                      return (
                        <View key={index} style={{marginHorizontal: 15}}></View>
                      );
                      {
                        /* } */
                      }
                    })
                  ) : (
                    <View style={{marginHorizontal: 15}}>
                      <View
                        style={{
                          height: 70,
                          width: '100%',
                          // marginVertical: 20,
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
                              width: '80%',
                              fontSize: 15,
                              color: '#333',
                              fontWeight: '600',
                              textAlign: 'center',
                              alignSelf: 'center',
                            }}>
                            {'   '}
                            {trans('Currently No Contents Added')}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              </>
            )}
            {isConceptList.length == 0 && selectedIndex == 1 && (
              <View style={{marginTop: 25, marginHorizontal: 15}}>
                <View
                  style={{
                    height: 70,
                    width: '100%',
                    justifyContent: 'center',
                    // marginVertical: 20,
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
                    <MaterialIcons name="info" color={'green'} size={30} />
                    <Text
                      style={{
                        width: '80%',
                        fontSize: 15,
                        color: '#333',
                        fontWeight: '600',
                        textAlign: 'center',
                        alignSelf: 'center',
                      }}>
                      {'   '}
                      {trans('Currently No Contents Added')}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {isVideoList.length == 0 && selectedIndex == 2 && (
              <View style={{marginTop: 25, marginHorizontal: 15}}>
                <View
                  style={{
                    height: 70,
                    width: '100%',
                    justifyContent: 'center',
                    // marginVertical: 20,
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
                    <MaterialIcons name="info" color={'green'} size={30} />
                    <Text
                      style={{
                        width: '80%',
                        fontSize: 15,
                        color: '#333',
                        fontWeight: '600',
                        textAlign: 'center',
                        alignSelf: 'center',
                      }}>
                      {'   '}
                      {trans('Currently No Contents Added')}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
        </ImageBackground>
      )}
      {lockedModalStatus && (
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
                    <View style={{alignItems: 'center', paddingVertical: 15}}>
                      <View
                        style={{
                          borderWidth: 0.8,
                          borderColor: '#FFB901',
                          borderRadius: 50,
                          padding: 10,
                          paddingHorizontal: 13,
                          elevation: 15,
                          // backgroundColor: 'green',
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
                          color: 'darkorange',
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
                          color: '#fff',
                          // borderWidth:1,
                          marginTop: 5,
                          alignSelf: 'center',
                          // marginLeft: 5,
                          fontWeight: '500',
                        }}>
                        {trans('to unlock this test')}
                      </Text>
                    </View>
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
                          // color: '#0f6f25',
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
                    <View style={{alignItems: 'center', paddingVertical: 15}}>
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

                      {paymentid == 'free7days' ? (
                        <Text
                          style={{
                            textAlign: 'center',
                            width: device_width * 0.7,
                            fontSize: 16,
                            color: '#fff',
                            marginTop: 10,
                            marginLeft: 10,
                            fontWeight: '800',
                          }}>
                          {trans(
                            'Oops! This feature is not included in the free trial.',
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
                          {trans('Your seven days free trial has expired !')}
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
                         {trans("Upgrade to Premium for access to this feature!")} 
                        {/* // {trans('You have to purchase premium')} */}
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
                        {/* {trans('to access this feature')} */}
                      </Text>
                    </View>
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
                      onPress={() =>{
                        setPaymentModalStatus(false);
                        navigation.navigate('PremiumAccess', {
                          screenName: 'ExamSets',
                          subjectId: subjectId,
                          subjectName: subject,
                          topicid: topicid,
                          topicName: topicName,
                          ExamQuestionsets: ExamQuestionsets,
                          isScoreBoardFlag: false,
                          scholarshipid: scholarshipid,
                          scholarshipName: scholarshipName,
                          is2ndAvailable: is2ndAvailable,
                          index: index,
                          quizList: [],
                          showFeedback: false,
                        }) }
                      }>
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
    </SafeAreaView>
  );
};
export default ExamSets;

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
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 40,
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
