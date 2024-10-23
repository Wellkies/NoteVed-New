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
  Image,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Colors from '../../../assets/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import * as Progress from 'react-native-progress';
import {device_height, device_width} from '../style';
import {
  IsTabScreen,
  markCalculation,
  // remainingTimerdata,
} from '../../../constants/Constants';
import WebView from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../redux/store/reducerHook';
import {
  getContentQuizAPI,
  selectContentQuizStatus,
} from '../../redux/reducers/GetContentQuizReducer';
import CommonModalUser from '../CommonScreens/CommonModalUser';
import CommonTimer from '../CommonScreens/CommonTimer';
import {
  getChildDetailsAPI,
  selectStudentInfo,
} from '../../redux/reducers/StudentInfoReducer';
import {getTopicBySubClassAPI} from '../../redux/reducers/GetTopicBySubjectReducer';
import LoadingScreen from '../CommonScreens/LoadingScreen';
import {
  AddChildRevisionAPI,
  answerReattemptSubmitApi,
  answerSubmitApi,
  createBelow90PercentageBSEApi,
  createBelow90PercentageOtherApi,
  createabove90PercentageBSEApi,
  createabove90PercentageOtherApi,
} from '../../redux/actions/SubjectsAPI';
import {
  handleSetTopicIdForRevision,
  selectTopicId,
} from '../../redux/reducers/GetTopicIdReducer';
import {
  getTopicDetailsAPI,
  selectTopicDetails,
} from '../../redux/reducers/GetTopicDetailsFormTopicIdReducer';
import {
  getContentByContentIdAPI,
  selectContentDetailsInfo,
  selectContentDetailsStatus,
  selectContentQuiz,
} from '../../redux/reducers/GetContentDetailsReducer';
import {selectUserInfo} from '../../redux/reducers/loginReducer';
// import {
//   BannerAd,
//   BannerAdSize,
//   InterstitialAd,
//   TestIds,
//   RewardedAd,
//   AdEventType,
//   RewardedAdEventType,
// } from 'react-native-google-mobile-ads';
import {Modal} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {createContactApi} from '../../redux/actions/createContactApi';
import CommonMessage from '../../../constants/CommonMessage';
// import {BANNERAD} from '../../../constants/ApiPaths';
import {
  getChildContentDetailsAPI,
  selectContentsingleChild,
} from '../../redux/reducers/GetChildRevisionReducer';

const MockTests = ({route}) => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation();
  const scrollRef = useRef();
  const {t: trans, i18n} = useTranslation();

  const {
    screenName = '',
    subjectName = '',
    coursename = '',
    chapterName = '',
    examSet = '',
    // quiz = [],
    contentid = '',
    studentdata = [],
    scholarshipid = '',
    subjectId = '',
    boardid = '',
    timeDuration = '',
    scholarshipName = '',
    is2ndAvailable = '',
    topicid = '',
    topic = '',
    bQuiz = [],
    ExamQuestionsets: [],
    islastexercise = false,
    isReattempt = '',
    subjectimage = '',
  } = route.params;

  // let baseQuiz = ContentQuiz[0] ? ContentQuiz[0] : [];
  const ContentQuiz = useAppSelector(selectContentQuiz);
  const ContentLoading = useAppSelector(selectContentDetailsStatus);

  // {
  // const quizz = ContentQuiz.map(rec => rec.quiz);
  let quiz = ContentQuiz[0]?.quiz ? ContentQuiz[0].quiz : [];

  const baseQuiz = ContentQuiz[0] ? ContentQuiz[0] : [];
  const sortedQuestionList = ContentQuiz.slice().sort(
    (a, b) => a.questionno - b.questionno,
  );

  const timeDurationValue = timeDuration.length
    ? parseInt(timeDuration) * 60
    : '';

  // const timeDurationValue = 120
  const [loading, setLoading] = useState(false);
  const [Questionlist, setQuestionlist] = useState(
    sortedQuestionList ? sortedQuestionList : [],
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalStatus, setModalStatus] = useState(false);
  const [quitModalStatus, setQuitModalStatus] = useState(false);
  const [skipModalStatus, setSkipModalStatus] = useState(false);
  const [clearSkipModalStatus, setClearSkipModalStatus] = useState(false);
  const [progressdata, setProgressdata] = useState(0);

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
    childid = '',
    name: childName = '',
    stage = '',
    stageid = '',
    image: c_image = '',
    age: C_age = '',
    phone = '',
    name = '',
  } = userInfo;
  //
  const TopicList = useAppSelector(selectTopicDetails);
  const childContentReducer = useAppSelector(selectContentsingleChild);
  //console.log(childContentReducer, ']]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]');

  //
  const TopicId = useAppSelector(selectTopicId);
  //
  const selectedTopic = TopicList.find(rec => rec.topicid == TopicId);
  //
  let ContentIndex = -1;
  if (selectedTopic != undefined) {
    ContentIndex = selectedTopic.reviewquestionsets.findIndex(
      rec => rec.contentid == contentid,
    );
  }

  const handleUnlockChapter = () => {
    const revisionbody = {
      childid: childid,
      subjectDetails: [
        {
          subjectid: subjectId,
          subject: subjectName,
          completestatus: 'false',
          topicDetails: [
            {
              topicid: topicid,
              topic: topic,
              completestatus: 'true',
            },
          ],
        },
      ],
    };
    // console.log(
    //   revisionbody,
    //   '********************revisionbody***********************',
    // );

    AddChildRevisionAPI(revisionbody);
  };

  const handleselectAnswer = (answerid: string, index: number) => {
    let questions = [...Questionlist];
    questions[index] = {
      ...questions[index],
      selectedAns: answerid,
    };
    setQuestionlist(questions);
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
  // const adUnitId = BANNERAD;

  const handleNavigation = () => {
    navigation.navigate('ScoreBoard', {
      screenName: screenName,
      contentid: contentid,
      isReattempt: false,
      topicName: chapterName,
      ExamQuestionsets: quiz,
      subjectName: subjectName,
      coursename: coursename,
      chapterName: chapterName,
      examSet: examSet,
      quiz: Questionlist,
      studentdata: studentdata,
      scholarshipid: scholarshipid,
      subjectId: subjectId,
      boardid: boardid,
      scholarshipName: scholarshipName,
      is2ndAvailable: is2ndAvailable,
      topicid: topicid,
      timeDuration: timeDuration,
      islastexercise: islastexercise,
      bQuiz: baseQuiz,
      subjectimage: subjectimage,
    });
  };
  const handleCallback = async () => {
    setCurrentIndex(0);
    const TopicData = {
      Class: boardid,
      subjectId,
      boardid,
      scholarshipid,
      topicid,
      childId: childid,
    };

    dispatch(getTopicBySubClassAPI(TopicData));
    handleNavigation();
    return true;
  };

  const handleAnswerSubmit = () => {
    const {
      no_of_Attempts = 0,
      correctanswer = 0,
      Skipped = 0,
      Wronganswer = 0,
      totalmark = 0,
      percentage = 0,
    } = markCalculation(Questionlist);
    //
    setQuitModalStatus(false);
    if (isReattempt) {
      let bodyReattemptAnswerData = {
        id: childContentReducer._id,
        securmark: correctanswer,
        quiz: Questionlist,
        percentage: percentage,
      };

      //   const below90Body = {
      //     phone: phone,
      //     userName: name,
      //   };
      //   const above90Body = {
      //     phone: phone,
      //     userName: name,
      //     totalmark: totalmark,
      //     correctanswer: correctanswer,
      //     wrongresponse: Wronganswer,
      //     skippedquestion: Skipped,
      //     percentagescored: percentage,
      //   };
      //
      //   if (boardid == 1 && percentage >= 90) {
      //     createabove90PercentageBSEApi(above90Body, undefined);
      //   } else if (boardid !== 1 && percentage >= 90) {
      //     createabove90PercentageOtherApi(above90Body, undefined);
      //   } else if (boardid == 1 && percentage < 90) {
      //     createBelow90PercentageBSEApi(below90Body, undefined);
      //   } else if (boardid !== 1 && percentage < 90) {
      //     createBelow90PercentageOtherApi(below90Body, undefined);
      //   } else {
      //   }
      //   // console.log( ContentIndex != -1 ,
      //   //   ContentIndex == selectedTopic.reviewquestionsets.length - 1 ,
      //   //   percentage >= 90,"*****************************")
      if (
        // ContentIndex != -1 &&
        // ContentIndex == selectedTopic.reviewquestionsets.length - 1 &&
        // percentage >= 90
        islastexercise
      ) {
        handleUnlockChapter();
      }
      answerReattemptSubmitApi(bodyReattemptAnswerData, handleCallback);
    } else {
      const bodyAnswerData = {
        childid: childid,
        name: childName,
        age: C_age,
        // parentid: '',
        // stage: stage,
        // stageid: stageid,
        contentid: contentid,
        subjectid: subjectId,
        subject: subjectName,
        topicid: topicid,
        topic: chapterName,
        contentset: examSet,
        totalmark: Questionlist.length,
        securmark: correctanswer,
        percentage: percentage,
        wrongmark: Wronganswer,
        skipmark: Skipped,
        quiz: Questionlist,
        // quiz: submitData,
        subjectimage: '',
        topicimage: '',
        contentimage: '',
        isPremium: false,
      };
      const below90Body = {
        phone: phone,
        userName: name,
      };
      const above90Body = {
        phone: phone,
        userName: name,
        totalmark: totalmark,
        correctanswer: correctanswer,
        wrongresponse: Wronganswer,
        skippedquestion: Skipped,
        percentagescored: percentage,
      };
      // if (boardid == 1 && percentage >= 90) {
      //   createabove90PercentageBSEApi(above90Body, undefined);
      // } else if (boardid != 1 && percentage >= 90) {
      //   createabove90PercentageOtherApi(above90Body, undefined);
      // } else if (boardid == 1 && percentage < 90) {
      //   createBelow90PercentageBSEApi(below90Body, undefined);
      // } else if (boardid != 1 && percentage < 90) {
      //   createBelow90PercentageOtherApi(below90Body, undefined);
      // } else {
      // }
      // // console.log( ContentIndex != -1 ,
      // //   ContentIndex == selectedTopic.reviewquestionsets.length - 1 ,
      // //   percentage >= 90,"*****************************")
      // if (
      //   ContentIndex != -1 &&
      //   ContentIndex == selectedTopic.reviewquestionsets.length - 1 &&
      //   percentage >= 90
      // ) {
      //   handleUnlockChapter();
      // }
      if (
        // ContentIndex != -1 &&
        // ContentIndex == selectedTopic.reviewquestionsets.length - 1 &&
        // percentage >= 90
        islastexercise
      ) {
        handleUnlockChapter();
      }
      answerSubmitApi(bodyAnswerData, handleCallback);
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

  const handleBackButtonClick = () => {
    setQuitModalStatus(true);
    return true;
  };

  useEffect(() => {
    const childContent = {
      contentid,
      childid,
    };
    // console.log(
    //   childContent,
    //   'chil%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%',
    // );

    dispatch(getChildContentDetailsAPI(childContent));

    const contentData = {
      contentid,
    };
    dispatch(getContentByContentIdAPI(contentData));
  }, []);

  useEffect(() => {
    // dispatch(handleSetTopicIdForRevision(topicid));
    navigation.addListener('focus', () => {
      const contentData = {
        contentid,
      };
      dispatch(getContentByContentIdAPI(contentData));
      BackHandler.addEventListener('hardwareBackPress', () =>
        handleBackButtonClick(),
      );
      setModalStatus(false);
      // if (id != '') dispatch(getChildDetailsAPI(childid));
      if (progressdata == 0) handlePress();
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () =>
        handleBackButtonClick(),
      );
    };
  }, []);

  useEffect(() => {
    if (isReattempt == false) {
      if (quiz?.length > 0) {
        setQuestionlist(quiz);
      }
    } else {
      if (quiz?.length > 0) setQuestionlist(quiz);
    }
    // if (quiz?.length > 0) setQuestionlist(quiz);
  }, [ContentQuiz]);

  const handlePress = () => {
    let newprogressdata = parseFloat(progressdata) + 1 / Questionlist?.length;
    newprogressdata = parseFloat(newprogressdata);
    setProgressdata(newprogressdata);
  };

  const handlePreviousPress = () => {
    let newprogressdata = parseFloat(progressdata) - 1 / Questionlist?.length;
    newprogressdata = parseFloat(newprogressdata);
    setProgressdata(newprogressdata);
  };
  const [confirmReport, setConfirmReport] = useState(false);
  const handleReport = () => {
    setConfirmReport(true);
  };
  const reportSubmitForm = async (question: any) => {
    console.log(
      subjectName,
      stageid,
      childName,
      boardid,
      scholarshipid,
      subjectName,
      chapterName,
      question,
      contentid,
      '@DataBody',
    );
    const bodyData = {
      edcontactName: childName,
      //edcontactemail: email,
      subject: subjectName,
      phone: phone,
      message:
        'stageid' +
        ':' +
        stageid +
        ', ' +
        'boardid' +
        ':' +
        boardid +
        ', ' +
        'scholarshipid' +
        ':' +
        scholarshipid +
        ',' +
        'subjectId' +
        ': ' +
        subjectId +
        ', ' +
        'topicid' +
        ':' +
        topicid +
        ', ' +
        'contentid' +
        ':' +
        contentid +
        ', ' +
        'question' +
        ':' +
        question +
        ', ' +
        'name' +
        ':' +
        name,
      boardid,
      scholarshipid,
      subjectName,
      chapterName,
      question,
      apptype: 'Skill Development',
    };

    createContactApi(bodyData, reporthandleCallback);
    CommonMessage('Your query has been successfully sent.');
  };
  const reporthandleCallback = () => {
    setConfirmReport(false);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {ContentLoading == 'loading' ? (
        <LoadingScreen flag={ContentLoading == 'loading'} />
      ) : (
        <ImageBackground
          style={{
            width: device_width,
            height: device_height,
            flex: 1,
            alignSelf: 'center',
            //backgroundColor: '#272727',
            //backgroundColor: '#1E1E1E',
          }}
          resizeMode="cover"
          source={require('../../../assets/0.png')}>
          <StatusBar barStyle="light-content" />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}>
            <View style={{height: 40, marginHorizontal: 20}}>
              {timeDurationValue ? (
                <CommonTimer
                  duration={timeDurationValue}
                  handleAnswerSubmit={handleAnswerSubmit}
                />
              ) : (
                <></>
              )}
            </View>
            <View style={{position: 'absolute', top: 0, right: 10}}>
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate('Kids_Profile', {childId: id});
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
                  style={{
                    color: '#fff',
                    marginLeft: 5,
                    fontWeight: '700',
                    fontSize: 15,
                  }}>
                  {trans('Quit Test')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={{alignItems: 'center', marginVertical: 5}}>
            <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.BANNER}
              onAdFailedToLoad={error =>
                console.error('Ad failed to load: ', error)
              }
              onAdLoaded={() => console.log('Ad loaded')}
            />
          </View> */}
          <View
            style={{
              paddingHorizontal: 25,
              flex: 0.9,
              borderRadius: 10,
              // borderWidth: 1,
              borderColor: '#000',
              // elevation: 10,
              // borderWidth:1,
              // backgroundColor: 'rgba(0,255,0,0.08)',
              //backgroundColor: '#272727',
              marginHorizontal: 10,
              marginVertical: 10,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical:20,
                // borderWidth:1,
              }}>
              <Progress.Bar
                color={'#f1a722'}
                progress={progressdata}
                width={IsTabScreen ? 400 : 300}
                height={7}
                style={{marginTop: -5}}
              />
            </View>
            <TouchableOpacity
              style={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: IsTabScreen ? 12 : 10,
              }}
              onPress={() => handleReport()}>
              <MaterialIcons
                name="report"
                size={IsTabScreen ? 24 : 20}
                // backgroundColor={Colors.secondary}
                color={'#fff'}
                // onPress={() => navigation.goBack()}
              />
              <Text
                style={{
                  color: '#fff',
                  fontSize: IsTabScreen ? 14 :12,
                  textDecorationLine: 'underline',
                }}>
                {trans('Report Wrong Question')}
              </Text>
            </TouchableOpacity>
            <Text
              style={[
                styles.question,
                {
                  textAlign: 'left',
                  color: '#fff',
                  alignSelf: 'flex-start',
                  marginTop: 10,
                  fontSize: 18,
                },
              ]}>
              {`${trans('Qs.')} ( ${currentIndex + 1}/${
                Questionlist?.length
              } )`}
            </Text>
            {/* <ScrollView
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={true}
              indicatorStyle={'white'}
              ref={scrollRef}
              style={{
                flex: 1,
              }}
              persistentScrollbar={true}> */}
              <View style={{width:'100%',flex:1}}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {Questionlist[currentIndex]?.questiontype == 'image' ? (
                    Questionlist[currentIndex]?.question != '' ? (
                      <ScrollView
                        horizontal={true}
                        // contentContainerStyle={{height: device_height*0.5}}
                        showsVerticalScrollIndicator={true}
                        showsHorizontalScrollIndicator={true}
                        persistentScrollbar={true}
                        ref={scrollRef}>
                        <View
                          style={{
                            // padding: 10,
                            paddingVertical: 10,
                            color: '#333',
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 5,
                            // fontSize: '38',
                            minHeight: IsTabScreen ? device_height * 0.4 :device_height * 0.5,
                            width: IsTabScreen ? device_width * 0.7 :device_width,
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            // backgroundColor:Colors.secondary,
                            backgroundColor: '#fff',
                          }}>
                          <WebView
                            style={{
                              flex: 1,
                              // marginLeft: -30,
                              minHeight: IsTabScreen ? device_height * 0.38 :device_height * 0.47,
                              width: IsTabScreen ? device_width * 0.6 : device_width * 0.77,
                            }}
                            originWhitelist={['*']}
                            nestedScrollEnabled={true}
                            source={{
                              html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><p style={object-fit: contain}>${JSON.parse(
                                Questionlist[currentIndex]?.question,
                              )}</p></body></html>`,
                            }}
                          />
                        </View>
                      </ScrollView>
                    ) : (
                      <></>
                    )
                  ) : (
                    <View>
                      <Text
                        style={[
                          styles.question,
                          {
                            textAlign: 'center', 
                            color: '#fff',
                            fontSize: IsTabScreen ? 20 : 16,
                            lineHeight: 20, 
                            padding: IsTabScreen ? 10 : 10,
                          },
                        ]}>
                        {Questionlist[currentIndex]?.question}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            {/* </ScrollView> */}
            {Questionlist[currentIndex]?.questiontype == 'image' && (
              <View
                style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
                <MaterialIcons
                  name="report"
                  size={20}
                  // backgroundColor={Colors.secondary}
                  color={'#fff'}
                  // onPress={() => navigation.goBack()}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 12,
                    // textDecorationLine: 'underline',
                  }}>
                  {trans('Scroll to see the question')}
                </Text>
              </View>
            )}
            <View
              style={{
                marginVertical: 10,
                paddingBottom: 5,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              {Questionlist[currentIndex]?.option?.map((item, indx) => {
                const {
                  label = '',
                  imagurl = '',
                  value = '',
                  contenttype = '',
                } = item;
                const {selectedAns = ''} = Questionlist[currentIndex];
                const selectedItem = label == selectedAns;
                let imageUrl;
                if (contenttype === 'image') {
                  console.log(value, '@value');
                  const htmlString = imagurl.replace(/\\"/g, '"');
                  const imageUrlMatch = htmlString.match(/<img.*?src="(.*?)"/);
                  imageUrl =
                    imageUrlMatch && imageUrlMatch[1]
                      ? imageUrlMatch[1].replace(/&amp;/g, '&')
                      : '';
                }
                return (
                  <View
                    key={indx}
                    style={{
                      width:
                        Questionlist[currentIndex]?.questiontype == 'image'
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
                        padding: 5,
                        backgroundColor: selectedItem ? '#f1a722' : '#F0F0F0',
                      }}>
                      {contenttype === 'image' ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            borderRadius: 10,
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              width: 80,
                              height:80,
                              borderRadius: 10,
                              overflow: 'hidden',
                            }}>
                            <Image
                              source={{uri: imageUrl}}
                              style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'cover',
                              }}
                            />
                          </View>
                          <View
                            style={{
                              flex: 1,
                              marginLeft: 10,
                            }}>
                            <Text
                              style={{
                                fontSize:IsTabScreen ? 18 : 15,
                                fontWeight: '700',
                                color: selectedItem ? 'darkgreen' : '#333',
                              }}>
                              {`(${label}) ${value}`}
                            </Text>
                          </View>
                        </View>
                      ) : (
                        <View
                          style={{
                            flexDirection: 'row',
                            padding: IsTabScreen ? 15 :10,
                            borderRadius: 10,
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: IsTabScreen ? 18 :15,
                              fontWeight: '700',
                              marginLeft: IsTabScreen ? 20 :15,
                              color: selectedItem ? 'darkgreen' : '#333',
                            }}>
                            {`(${label}) ${value}`}
                          </Text>
                        </View>
                      )}
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
              justifyContent: 'space-between',
              // backgroundColor: '#FFF',
              marginLeft:IsTabScreen ? 20 : 7,
              paddingHorizontal: IsTabScreen ? 20 :10,
            }}>
            <TouchableOpacity
              style={{padding:IsTabScreen ? 20 : 15}}
              disabled={currentIndex == 0}
              onPress={() => {
                handlePrevious();
                // scrollRef.current.scrollTo({
                //   x:0, // Required
                //   y: 0, // Required
                //   animated: true,
                // });
              }}>
              <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                <FontAwesome
                  style={{color: currentIndex == 0 ? '#bbb' : '#f1a722'}}
                  name="chevron-left"
                  size={IsTabScreen ? 24 :18}
                />
                <Text
                  style={{
                    fontSize: IsTabScreen ? 20 :16,
                    fontWeight: '600',
                    color: currentIndex == 0 ? '#bbb' : '#f1a722',
                    marginLeft: 10,
                  }}>
                  {trans('Previous')}
                </Text>
              </View>
            </TouchableOpacity>
            {Questionlist[currentIndex]?.selectedAns != '' && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'baseline',
                  // borderWidth: 1,
                  backgroundColor: '#f1a722',
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
                      Questionlist[currentIndex]?.selectedAns;
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
                      fontSize: IsTabScreen ? 20 :16,
                      fontWeight: '600',
                      color: '#333',
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
                  //alignItems: 'baseline',
                  backgroundColor: '#f1a722',
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
                      fontSize:IsTabScreen ? 20 : 16,
                      fontWeight: '900',
                      color: 'green',
                    }}>
                    {trans('Submit')}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                <TouchableOpacity
                  disabled={currentIndex == Questionlist.length - 1}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    padding: IsTabScreen ? 20 :15,
                  }}
                  onPress={() => {
                    // scrollRef.current.scrollTo({
                    //   x: 10, // Required
                    //   y: 10, // Required
                    //   animated: true,
                    // });
                    const selectedAnswerValue =
                      Questionlist[currentIndex]?.selectedAns;
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
                      fontSize: IsTabScreen ? 20 :18,
                      fontWeight: '600',
                      color:
                        currentIndex == Questionlist.length - 1
                          ? '#bbb'
                          : '#f1a722',
                      marginRight: 10,
                    }}>
                    {trans('Next')}
                  </Text>
                  <FontAwesome
                    style={{
                      color:
                        currentIndex == Questionlist.length - 1
                          ? '#bbb'
                          : '#f1a722',
                    }}
                    name="chevron-right"
                    size={IsTabScreen ? 20 :16}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ImageBackground>
      )}
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
          )} ${no_of_Attempts} ${trans('questions out of')} ${
            Questionlist.length
          } ${trans('questions ')}`}
          // label2={`${trans('You have only attempted ')${no_of_Attempts} questions out of} ${
          //   Questionlist.length}
          // }questions ')}`}
          yesbtnName={trans('YES')}
          loading={loading}
          yesbtnFunction={() => {
            handleAnswerSubmit();
            setQuitModalStatus(false);
          }}
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
              Questionlist[currentIndex]?.selectedAns,
              currentIndex,
            )
          }
          nobtnName={trans('NO')}
          nobtnFunction={() => setClearSkipModalStatus(false)}
        />
      )}
      <Modal transparent={true} visible={confirmReport}>
        <ImageBackground
          style={{
            borderRadius: 20,
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: '#fff',
            // width: device_width,
            // height: device_height,
            minHeight: device_height * 0.3,
            minWidth: device_width * 0.9,
            // borderRadius: 15,
            // flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          resizeMode="cover"
          source={require('../../../assets/0.png')}>
          <View
            style={{
              // backgroundColor: '#fff',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{alignItems: 'flex-end', justifyContent: 'center'}}>
              <View
                style={{
                  borderRadius: 20,
                  borderWidth: 1,
                  minHeight: device_height * 0.3,
                  minWidth: device_width * 0.9,
                  // backgroundColor: '#fff',
                  borderColor: '#fff',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <View
                    style={{
                      alignItems: 'center',
                    }}>
                    <View style={{alignItems: 'center'}}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: 15,
                          width: device_width * 0.8,
                          fontSize: 17,
                          color: '#fff',
                          marginTop: 25,
                          marginLeft: 10,
                          fontWeight: '900',
                        }}>
                        {trans(
                          'Report if this question or answer options are wrong!!!',
                        )}
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
                      onPress={() => setConfirmReport(false)}
                    />
                  </View>
                  <View
                    style={{
                      // borderWidth: 1,
                      // backgroundColor:'#fff',
                      // paddingVertical: 10,
                      alignItems: 'center',
                      marginTop: 10,
                      marginLeft: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      // alignSelf: 'center',
                      // padding: 10,
                    }}>
                    <TouchableOpacity
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        borderWidth: 1,
                        borderRadius: 10,
                        width: 100,
                        // marginVertical: 5,
                        // borderWidth: 1,
                        alignSelf: 'center',
                        // marginRight: 25,
                        alignItems: 'center',
                        // borderColor: 'white',
                        backgroundColor: 'white',
                        paddingVertical: 10,
                        // paddingHorizontal:30,
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        reportSubmitForm(Questionlist[currentIndex]?.question)
                      }>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            // marginRight: 10,
                            fontWeight: '700',
                            color: '#FFB901',
                          }}>
                          {trans('Report ')}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        borderWidth: 1,
                        borderRadius: 10,
                        width: 100,
                        // marginVertical: 5,
                        // borderWidth: 1,
                        alignSelf: 'center',
                        // marginRight: 25,

                        // borderColor: 'white',
                        backgroundColor: 'white',
                        paddingVertical: 10,
                        // paddingHorizontal:30,
                        justifyContent: 'center',
                      }}
                      onPress={() => setConfirmReport(false)}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          // alignSelf:"center",
                        }}>
                        <Text
                          style={{
                            // marginRight: 10,
                            fontWeight: '700',
                            color: '#FFB901',
                            textAlign: 'center',
                          }}>
                          {trans('Cancel')}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Modal>
    </SafeAreaView>
  );
};

export default MockTests;

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
