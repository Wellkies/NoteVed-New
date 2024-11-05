import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  BackHandler,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Avatar, Modal} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import i18n from 'i18next';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Colors from '../../../assets/Colors';
import {device_height, device_width} from '../style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import FastImage from 'react-native-fast-image';
import LoadingScreen from '../CommonScreens/LoadingScreen';
import {useNavigation} from '@react-navigation/native';
import {selectStudentInfo} from '../../redux/reducers/StudentInfoReducer';
import {useAppSelector} from '../../redux/store/reducerHook';
import {
  getAllProductAPI,
  selectAllProduct,
  selectAllProductStatus,
} from '../../redux/reducers/GetAllProductReducer';
import {
  getUserAllAddressAPI,
  selectAllAddressInfo,
} from '../../redux/reducers/GetAllAddressReducer';
import {
  getCartItemAPI,
  selectCartItemInfo,
} from '../../redux/reducers/GetCartItemReducer';
import {getProductByIdAPI} from '../../redux/reducers/GetProductDetailsReducer';
import {getChildAllOrdersAPI} from '../../redux/reducers/GetAllOrdersReducer';
import {
  getSubjectByClassAPI,
  selectSubjectInfo,
  selectSubjectStatus,
} from '../../redux/reducers/GetSubjectByClassReducer';
import {
  getTopicBySubClassAPI,
  selectTopicInfo,
} from '../../redux/reducers/GetTopicBySubjectReducer';
import CommonMessage from '../../../constants/CommonMessage';
import Header from '../CommonScreens/Header';
import {useTranslation} from 'react-i18next';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  getTopicBySubIdAPI,
  selectTopicDetailsInfo,
} from '../../redux/reducers/GetTopicDetailsReducer';
import {selectTopicDetailsStatus} from '../../redux/reducers/GetTopicDetailsFormTopicIdReducer';
import {
  getContentByTopicIdAPI,
  selectContentDetailsInfo,
  selectContentDetailsStatus,
} from '../../redux/reducers/GetContentDetailsReducer';
import {
  getAllSubByCourseAPI,
  selectAllSubjectsInfo,
  selectAllSubjectsStatus,
} from '../../redux/reducers/GetSubjectByCourseReducer';
// import {
//   getAllSubByCourseIdAPI,
//   selectAllSubByCourseIdInfo,
//   selectAllSubByCourseIdStatus,
// } from '../../redux/reducers/GetAllSubByCourseIdReducer';

import {handleSetExamName} from '../../redux/reducers/ExamTestNameReducer';
import {ProgressBar} from 'react-native-paper';
import {selectUserInfo} from '../../redux/reducers/loginReducer';
import {
  getChildProgressDetailAPI,
  selectChildDetailData,
} from '../../redux/reducers/GetChildProgressDetailReducer';
import * as Progress from 'react-native-progress';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {IsTabScreen} from '../../../constants/Constants';
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
import {
  selectPremiumPurchase,
  selectPremiumPurchaseStatus,
} from '../../redux/reducers/GetPremiumPurchaseReducer.ts';
import {CreateFcmTokenAPI} from '../../redux/actions/CreateFCMtokenAPI.ts';
import {RefreshControl} from 'react-native-gesture-handler';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import {
  getLiveQuizAPI,
  selectLiveQuizData,
  selectLiveQuizStatus,
} from '../../redux/reducers/LiveQuizReducer.ts';
import {
  getPastLiveQuizAPI,
  selectPastLiveQuizData,
  selectPastLiveQuizStatus,
} from '../../redux/reducers/GetPastLiveQuizReducer.ts';
import {
  getHomeTopStudentAPI,
  selectHomeTopStudentData,
  selectHomeTopStudentStatus,
} from '../../redux/reducers/GetHomeLeaderBoardReducer.ts';

const Tab = createBottomTabNavigator();

const SubjectLevel = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const todayDate = new Date();
  const {t: trans, i18n} = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [topicId, setTopicId] = useState('');
  const TopicBySubjectId = useAppSelector(selectTopicDetailsInfo);
  const TopicLoad = useAppSelector(selectTopicDetailsStatus);

  const filterData = TopicBySubjectId.map(rec => rec.topicid);
  // TopicBySubjectId.filter((rec) => rec.sltopic == 1)
  const topicID = filterData[0];

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
    classname: string;
  }
  const {
    _id: id = '',
    childid = '',
    stage = '',
    scholarship = [],
    name: userName = '',
    fname = '',
    gender = '',
    lname = '',
    email = '',
    phone = '',
    image = '',
    age = '',
    address = '',
    language = '',
  } = userInfo;

  const PremiumPurchase = useAppSelector(selectPremiumPurchase);
  const PremiumPurchaseLoad = useAppSelector(selectPremiumPurchaseStatus);

  const AdsStatus = useAppSelector(selectAdsStatus);
  const AdLoadStatuss = useAppSelector(selectAdsStatuss);

  const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  useEffect(() => {
    navigation.addListener('focus', () => {
      // const data = {
      //   stageid,
      //   boardid,
      //   scholarshipid: scholarshipId,
      // };
      // dispatch(getSubjectByClassAPI(data));
      BackHandler.addEventListener('hardwareBackPress', () => {
        // navigation.navigate('LandingScreen');
        navigation.goBack();
        return true;
      });
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        // navigation.navigate('LandingScreen');
        navigation.goBack();
        return true;
      });
    };
  }, []);
  const _retrieveFcmToken = async (childid: string, userName: string) => {
    try {
      let value: string | null = null;
      await AsyncStorage.getItem('fcmToken').then(data => {
        value = data;
      });
      console.log(value, 'value=======================================');

      const bodyData = {
        childid: childid,
        usertype: 'NoteVook SkilzUp',
        token: value,
        childname: `${userName}`,
      };

      if (value !== null) {
        // We have data!!
        dispatch(CreateFcmTokenAPI(bodyData));
      }
    } catch (error) {
      console.log(error, '----------------------------------');

      // Error retrieving data
    }
  };

  useEffect(() => {
    const data = {
      //courseid: courseid,
      childid: childid,
    };
    dispatch(getChildProgressDetailAPI(data));

    dispatch(getLiveQuizAPI(data));
    dispatch(getHomeTopStudentAPI());
    dispatch(getPastLiveQuizAPI());

    const {name = ''} = childInfo;
    _retrieveFcmToken(childid, name);
    return () => {};
  }, []);
  const SubjectByCourse = useAppSelector(selectChildDetailData);
  //const SubjectByCourse = useAppSelector(selectAllSubjectsInfo);
  const SubLoading = useAppSelector(selectAllSubjectsStatus);
  //const SubByCourseID = useAppSelector(selectAllSubByCourseIdInfo);
  //const SubLoading = useAppSelector(selectAllSubByCourseIdStatus);
  const data = [
    // require('../../../assets/prepare.png'),
    require('../../../assets/practice.png'),
    require('../../../assets/aquestion.png'),
    //require('../../../assets/skillfact4.jpg'),
  ];
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);
  const renderItem = ({item}) => (
    <View
      style={{
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: IsTabScreen?6:12,
        // borderWidth: 0.9,
        // borderColor: '#f1a722',
        borderRadius: 20,
        width: IsTabScreen ? device_width * 0.99 : device_width * 0.95,
        height: IsTabScreen ? device_height * 0.5:device_height * 0.28,
      }}>
      <FastImage
        style={{
          borderRadius: 18,
          width: IsTabScreen ? device_width * 0.99: device_width * 0.95,
          height: IsTabScreen ? device_height * 0.5 :device_height * 0.28,
        }}
        source={item}
        resizeMode={IsTabScreen?'stretch':'cover'}
      />
    </View>
  );
  // const [rewardedad, setRewardedad] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  //
  // const [isRewardedAddCalled, setIsRewardedAddCalled] = useState(false);

  // const adUnitId3 = __DEV__
  //   ? TestIds.REWARDED
  //   : 'ca-app-pub-1582661677692525~7964330200';

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
  const [userQuizBlink, setQuizUserBlink] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setQuizUserBlink(userQuizBlink => !userQuizBlink);
    }, 800);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 10000); // Clear interval after 10 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);
  const [leaderBoardStatus, setLeaderBoardtatus] = useState(false);
  const ContentQuiz = useAppSelector(selectLiveQuizData);
  //console.log(ContentQuiz, '@ContentQuiz');
  const ContentQuizLoading = useAppSelector(selectLiveQuizStatus);

  const liveQuizLeaderBoard = useAppSelector(selectHomeTopStudentData);
  const leaderboardLoading = useAppSelector(selectHomeTopStudentStatus);
  const Pastquiz = useAppSelector(selectPastLiveQuizData);
  const PastquizLoading = useAppSelector(selectPastLiveQuizStatus);
  const topstudentData = liveQuizLeaderBoard?.map(r => r.childLiveQuizDetails);
  const LiveQuizTopStudent = topstudentData[0]?.slice(0, 3);

  const ListColor = ['#fee2a3', '#f6c4b9', '#c3ccf5', '#76f0c7'];
  /////////////////////////////////////////////////////////////////
  const [livequizmodalStatus, setLivequizModalStatus] = useState(false);
  const [livequizexceedStatus, setLivequizexceedStatus] = useState(false);
  const today = new Date();
  const todayDateString = today.toISOString().split('T')[0];
  const todayliveQuiz = ContentQuiz.filter(item => {
    const quizDate = new Date(item.starttime).toISOString().split('T')[0];
    return quizDate === todayDateString;
  });
  const upcomingLiveQuiz = ContentQuiz.filter(item => {
    const quizDate = new Date(item.starttime).toISOString().split('T')[0];
    return quizDate > todayDateString;
  });
  const destinationDate = moment(upcomingLiveQuiz[0]?.starttime);

  // Get today's date
  const todayDateData = moment();

  const daysLeft = destinationDate?.diff(todayDateData, 'days');

  const todayliveQuizStudentData = todayliveQuiz?.map(r => r.childlivequiz);

  const [currentTimeState, setCurrentTimeState] = useState(
    moment().format('h:mma'),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimeState(moment().format('h:mma'));
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);
  ///////////////////////UPCOMING///////////////
  const TodayDate = moment(todayDate).format('DD-MMM-YYYY');
  const startDate = moment(todayliveQuiz[0]?.starttime).format('DD-MMM-YYYY');

  let isUpcoming = TodayDate != startDate;
  //////////////////////START TO JOIN//////////////////////////////
  const start_time = moment(todayliveQuiz[0]?.starttime).format('h:mma');

  const beginningTime = moment(start_time, 'h:mma');
  const current_Time = moment(currentTimeState, 'h:mma');
  const start_to_Join = beginningTime.isSameOrBefore(
    moment(currentTimeState, 'h:mma'),
  );
  ////////////////////////END TIMECHECK////////////////////////////////////////
  const Endtimedata = moment(todayliveQuiz[0]?.endtime, 'h:mma');
  const Examendtime = moment(Endtimedata, 'h:mma');
  const ExamtimeEnd = current_Time.isAfter(Examendtime);
  /////////////////////////EXAM EXCEEDTIME///////////////////////////

  const examStartTimedt = moment(todayliveQuiz[0]?.starttime);
  const examCutoffTime = examStartTimedt.add(15, 'minutes');

  //////////////////////CHECKEND///////////////////
  const EndtimeDetails = moment(todayliveQuiz[0]?.endtime);
  const ExamtimeEndDetails = current_Time.isSameOrAfter(EndtimeDetails);
  //console.log(ExamtimeEndDetails,'@ExamtimeEndDetails');

  /////////////////////////EXAM EXCEEDTIME////////////////

  // Get the current time
  const currentTime = moment();

  const examExceedTime = current_Time.isSameOrAfter(examCutoffTime);

  let startTIME = 0;
  const [currentState, setCurrentState] = useState(new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentState(new Date().getTime());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);
  const [todayStartTime, getTodayStartTime] = useState(0);
  let timeLeft = todayStartTime - currentState;

  useEffect(() => {
    if (
      timeLeft < 0 &&
      timeLeft != 0 &&
      todayliveQuiz[0] != undefined &&
      todayliveQuiz[0]?.length != 0 &&
      todayliveQuizStudentData[0] != undefined &&
      todayliveQuizStudentData[0]?.length == 0
    ) {
      startTIME = new Date(`${todayliveQuiz[0]?.starttime}`).getTime();
      getTodayStartTime(startTIME);
      setCurrentState(new Date().getTime());
    } else if (
      timeLeft < 0 &&
      todayliveQuiz[0] != undefined &&
      todayliveQuiz[0]?.length != 0 &&
      todayliveQuizStudentData[0] != undefined &&
      todayliveQuizStudentData[0]?.length != 0
    ) {
      getTodayStartTime(0);
      setCurrentState(0);
    } else if (timeLeft < 0) {
      getTodayStartTime(0);
      setCurrentState(0);
    }
  }, []);

  let DaysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  let hoursLeft = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  let minsLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  let secsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);
  let total_sec =
    DaysLeft * 24 * 60 * 60 + hoursLeft * 60 * 60 + minsLeft * 60 + secsLeft;

  const livequizStudentdata = ContentQuiz?.map(r => r.childlivequiz);

  const [refreshing, setRefreshing] = React.useState(false);
  const asydat = async () => {
    console.log('refreshing');
    //const token = await Storage.getObject('@auth_Token');
    //const user = await Storage.getObject('@user');
    // const childid = user.childid;
    const data = {
      //courseid: courseid,
      childid: childid,
    };
    dispatch(getChildProgressDetailAPI(data));

    dispatch(getLiveQuizAPI(data));
    dispatch(getHomeTopStudentAPI());
    dispatch(getPastLiveQuizAPI());
    // const {name = ''} = childInfo;
    // _retrieveFcmToken(childid, name);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    asydat();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', () => {
        BackHandler.exitApp();
        return true;
      });
    });
  }, []);
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
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View
            style={{
              marginTop: 20,
            }}>
            <Carousel
              ref={carouselRef}
              data={data}
              renderItem={renderItem}
              sliderWidth={device_width}
              itemWidth={device_width}
              autoplay={true}
              autoplayInterval={5000}
              loop={true}
              onSnapToItem={index => setActiveSlide(index)}
            />
            <Pagination
              dotsLength={data.length}
              activeDotIndex={activeSlide}
              carouselRef={carouselRef}
              tappableDots={true}
              containerStyle={{paddingVertical: 10}}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                marginBottom: 20,
              }}>
              {todayliveQuiz != undefined &&
                todayliveQuiz?.length == 0 &&
                liveQuizLeaderBoard.length > 0 && (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignSelf: 'center',
                      alignItems: 'center',
                      borderWidth: 1.5,
                      backgroundColor: 'rgba(0,255,0, 0.05)',
                      borderColor: '#fff',
                      borderRadius: 10,
                      marginVertical: 5,
                      paddingHorizontal: 10,
                      width: '94%',
                      height: device_height * 0.45,
                      marginTop: 10,
                    }}>
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '15%',
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '900',
                          color: '#f1a722',
                          letterSpacing: 1,
                        }}>
                        {trans('NOTEVED CCA LIVE QUIZ RESULT')}
                      </Text>
                    </View>

                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '10%',
                        paddingBottom: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '600',
                          color: '#fff',
                        }}>
                        {LiveQuizTopStudent?.length > 0 &&
                          `${moment(liveQuizLeaderBoard[0]?.attemptDate).format(
                            'DD-MMM-YYYY',
                          )}`}
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '800',
                          color: '#fff',
                          textAlign: 'center',
                          letterSpacing: 0.5,
                        }}>
                        {trans('Winners')}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingVertical: 10,
                        alignItems: 'flex-start',
                        width: '100%',
                        height: '45%',
                        alignSelf: 'center',
                      }}>
                      {LiveQuizTopStudent?.map((item, index) => {
                        const {
                          student_name = '',
                          image = '',
                          gender = '',
                          schoolname = '',
                          securemark = '',
                          fname = '',
                        } = item;
                        return (
                          <View
                            key={index}
                            style={{
                              borderColor: '#fff',
                              width: 110,
                              height: '100%',
                              justifyContent: 'flex-start',
                              paddingVertical: 5,
                              alignItems: 'center',
                            }}>
                            <FastImage
                              style={{
                                height: '100%',
                                width: 90,
                                borderRadius: 5,
                                borderColor: '#fff',
                              }}
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
                            />

                            <Text
                              style={{
                                color: '#fff',
                                fontSize: 12,
                                fontWeight: '600',
                                textTransform: 'capitalize',
                                textAlign: 'center',
                              }}>
                              {fname}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        height: '25%',
                        paddingBottom: 10,
                      }}>
                      <TouchableOpacity
                        style={{
                          paddingVertical: 7,
                          borderRadius: 10,
                          width: '60%',
                          marginVertical: 10,
                          marginHorizontal: 5,
                          borderWidth: 1,
                          borderColor: '#fff',
                          paddingHorizontal: 7,
                          backgroundColor: '#fff',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          setLeaderBoardtatus(true);
                        }}>
                        <FontAwesome5
                          style={{color: 'gold', marginHorizontal: 8}}
                          name={'crown'}
                          size={22}
                        />

                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: '700',
                            color: '#000',
                          }}>
                          {trans('See Leaderboard')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

              {todayliveQuiz != undefined &&
                todayliveQuiz?.length != 0 &&
                ExamtimeEndDetails == true &&
                liveQuizLeaderBoard.length > 0 && (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignSelf: 'center',
                      alignItems: 'center',
                      borderWidth: 1.5,
                      backgroundColor: 'rgba(0,255,0, 0.05)',
                      borderColor: '#fff',
                      borderRadius: 10,
                      marginVertical: 5,
                      paddingHorizontal: 10,
                      width: '94%',
                      height: device_height * 0.45,
                      marginTop: 10,
                    }}>
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '15%',
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '900',
                          color: '#f1a722',
                          letterSpacing: 1,
                        }}>
                        {trans('NOTEVED CCA LIVE QUIZ RESULT')}
                      </Text>
                    </View>

                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '10%',
                        paddingBottom: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '600',
                          color: '#fff',
                        }}>
                        {LiveQuizTopStudent?.length > 0 &&
                          `${moment(liveQuizLeaderBoard[0]?.attemptDate).format(
                            'DD-MMM-YYYY',
                          )}`}
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '800',
                          color: '#fff',
                          textAlign: 'center',
                          letterSpacing: 0.5,
                        }}>
                        {trans('Winners')}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingVertical: 10,
                        alignItems: 'flex-start',
                        width: '100%',
                        height: '45%',
                        alignSelf: 'center',
                      }}>
                      {LiveQuizTopStudent?.map((item, index) => {
                        const {
                          student_name = '',
                          image = '',
                          gender = '',
                          schoolname = '',
                          securemark = '',
                          fname = '',
                        } = item;
                        return (
                          <View
                            key={index}
                            style={{
                              borderColor: '#fff',
                              width: 110,
                              height: '100%',
                              justifyContent: 'flex-start',
                              paddingVertical: 5,
                              alignItems: 'center',
                            }}>
                            <FastImage
                              style={{
                                height: '100%',
                                width: 90,
                                borderRadius: 5,
                                borderColor: '#fff',
                              }}
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
                            />

                            <Text
                              style={{
                                color: '#fff',
                                fontSize: 12,
                                fontWeight: '600',
                                textTransform: 'capitalize',
                                textAlign: 'center',
                              }}>
                              {fname}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        height: '25%',
                        paddingBottom: 10,
                      }}>
                      <TouchableOpacity
                        style={{
                          paddingVertical: 7,
                          borderRadius: 10,
                          width: '60%',
                          marginVertical: 10,
                          marginHorizontal: 5,
                          borderWidth: 1,
                          borderColor: '#fff',
                          paddingHorizontal: 7,
                          backgroundColor: '#fff',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          setLeaderBoardtatus(true);
                        }}>
                        <FontAwesome5
                          style={{color: 'gold', marginHorizontal: 8}}
                          name={'crown'}
                          size={22}
                        />

                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: '700',
                            color: '#000',
                          }}>
                          {trans('See Leaderboard')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
            </View>
            {ContentQuiz.length != '' && (
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(255,255,255, 0.05)',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#0f6f25',
                  padding: 8,
                  marginBottom: 20,
                }}>
                {/* {ContentQuiz.length != '' && (
                <> */}
                <Text
                  style={{
                    color: '#f1a722',
                    fontWeight: '800',
                    marginLeft: 10,
                    fontSize: 16,
                    marginVertical: 10,
                  }}>
                  {trans(`Available Live Quiz:`)}
                </Text>

                <View>
                  {leaderboardLoading == 'loading' ||
                  ContentQuizLoading == 'loading' ? (
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
                        backgroundColor: 'rgba(0,255,0, 0.05)',
                        borderColor: '#0f6f25',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: '98%',
                          alignSelf: 'center',
                          marginTop: 10,
                          borderRadius: 12,
                          backgroundColor: 'rgba(0,255,0,0.1)',
                          paddingHorizontal: 5,
                          paddingVertical: 10,
                          flexDirection: 'row',
                        }}>
                        <ShimmerPlaceholder
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            marginHorizontal: 10,
                            backgroundColor: '#9e9e9e',
                            opacity: 0.2,
                          }}></ShimmerPlaceholder>
                        <View>
                          <ShimmerPlaceholder
                            style={{
                              width: '100%',
                              height: 15,
                              marginVertical: 5,
                              backgroundColor: '#9e9e9e',
                              opacity: 0.2,
                            }}></ShimmerPlaceholder>
                          <ShimmerPlaceholder
                            style={{
                              width: '80%',
                              height: 15,
                              marginVertical: 5,
                              backgroundColor: '#9e9e9e',
                              opacity: 0.2,
                            }}></ShimmerPlaceholder>
                        </View>
                      </View>
                    </View>
                  ) : (
                    <>
                      {liveQuizLeaderBoard.length == 0 && (
                        <View
                          style={{
                            marginTop: 10,
                            padding: 20,
                            paddingVertical: 20,
                            width: '94%',
                            height: device_height * 0.39,
                            backgroundColor: 'rgba(0,255,0,0.1)',
                            borderRadius: 20,
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            alignSelf: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 24,
                              color: 'gold',
                              fontWeight: '900',
                              textAlign: 'left',
                              paddingLeft: 5,
                            }}>
                            {todayliveQuiz != undefined &&
                            todayliveQuiz.length == 0 &&
                            upcomingLiveQuiz != undefined &&
                            upcomingLiveQuiz.length !== 0 ? (
                              upcomingLiveQuiz[0].quizname
                            ) : (
                              <></>
                            )}
                            {todayliveQuiz != undefined &&
                            todayliveQuizStudentData[0] != undefined &&
                            todayliveQuizStudentData[0]?.length == 0 ? (
                              todayliveQuiz[0].quizname
                            ) : (
                              <></>
                            )}
                            {todayliveQuizStudentData[0] != undefined &&
                            todayliveQuizStudentData[0]?.length !== 0 &&
                            upcomingLiveQuiz[0] != undefined &&
                            upcomingLiveQuiz[0]?.length !== '' &&
                            upcomingLiveQuiz[0]?.starttime ? (
                              upcomingLiveQuiz[0].quizname
                            ) : (
                              <></>
                            )}
                          </Text>
                          <Text
                            style={{
                              fontSize: 20,
                              color: '#fff',
                              fontWeight: '700',
                              textAlign: 'left',
                              paddingLeft: 5,
                              marginVertical: 3,
                            }}>
                            {trans('Upcoming Quiz')}
                          </Text>
                          <View
                            style={{
                              width: '100%',
                              borderColor: '#999',
                              alignItems: 'left',
                              justifyContent: 'center',
                              paddingHorizontal: 5,
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#fff',
                                fontWeight: '500',
                                textAlign: 'left',
                                marginVertical: 3,
                              }}>
                              {todayliveQuizStudentData[0] != undefined &&
                              todayliveQuizStudentData[0]?.length == 0 ? (
                                `${trans('Quiz Start Date')}${' : '}${moment(
                                  todayliveQuiz.starttime,
                                ).format('DD-MMM-YYYY')}`
                              ) : (
                                <></>
                              )}
                              {todayliveQuizStudentData[0] != undefined &&
                              todayliveQuizStudentData[0]?.length !== 0 &&
                              upcomingLiveQuiz[0] != undefined &&
                              upcomingLiveQuiz[0]?.length !== '' &&
                              upcomingLiveQuiz[0]?.starttime ? (
                                `${moment(upcomingLiveQuiz[0].starttime).format(
                                  'DD-MMM-YYYY',
                                )}${'  '}${'('}${
                                  daysLeft != undefined && daysLeft != 0 ? (
                                    daysLeft
                                  ) : (
                                    <></>
                                  )
                                }${' Days Left'}${')'}`
                              ) : (
                                <></>
                              )}

                              {ContentQuiz?.length < 0 ? (
                                trans(
                                  'Currently no upcoming live quiz is available',
                                )
                              ) : (
                                <></>
                              )}

                              {todayliveQuiz != undefined &&
                              todayliveQuiz.length != 0 &&
                              todayliveQuizStudentData[0] != undefined &&
                              todayliveQuizStudentData[0]?.length != 0 &&
                              upcomingLiveQuiz != undefined &&
                              upcomingLiveQuiz.length === 0 ? (
                                trans(
                                  'Currently no upcoming live quiz is available',
                                )
                              ) : (
                                <></>
                              )}

                              {todayliveQuiz != undefined &&
                              todayliveQuiz.length == 0 &&
                              upcomingLiveQuiz != undefined &&
                              upcomingLiveQuiz.length !== 0 ? (
                                `${moment(upcomingLiveQuiz[0].starttime).format(
                                  'DD-MMM-YYYY',
                                )}${'  '}${'('}${
                                  daysLeft != undefined && daysLeft != 0 ? (
                                    daysLeft
                                  ) : (
                                    <></>
                                  )
                                }${' Days Left'}${')'}`
                              ) : (
                                <></>
                              )}
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#fff',
                                fontWeight: '500',
                                textAlign: 'left',
                                marginVertical: 3,
                              }}>
                              {todayliveQuizStudentData[0] != undefined &&
                                todayliveQuizStudentData[0]?.length == 0 &&
                                `${trans('Quiz Start Time')}${' : '}${moment(
                                  todayliveQuiz[0]?.starttime,
                                ).format('HH:mm:A')}`}

                              {todayliveQuizStudentData[0] != undefined &&
                                todayliveQuizStudentData[0]?.length !== 0 &&
                                upcomingLiveQuiz[0] != undefined &&
                                upcomingLiveQuiz[0]?.length !== '' &&
                                upcomingLiveQuiz[0]?.starttime &&
                                `${trans('Quiz Start Time')}${' : '}${moment(
                                  upcomingLiveQuiz[0]?.starttime,
                                ).format('HH:mm:A')}`}

                              {todayliveQuiz != undefined &&
                              todayliveQuiz.length == 0 &&
                              upcomingLiveQuiz != undefined &&
                              upcomingLiveQuiz.length !== 0 ? (
                                `${trans('Quiz Start Time')}${' : '}${moment(
                                  upcomingLiveQuiz[0].starttime,
                                ).format('HH:mm:A')}`
                              ) : (
                                <></>
                              )}
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#fff',
                                fontWeight: '500',
                                textAlign: 'left',
                                marginVertical: 3,
                              }}>
                              {todayliveQuizStudentData[0] != undefined &&
                                todayliveQuizStudentData[0]?.length == 0 &&
                                `${trans('Quiz End Time')}${' : '}${moment(
                                  todayliveQuiz[0]?.endtime,
                                ).format('HH:mm:A')}`}
                              {todayliveQuizStudentData[0] != undefined &&
                                todayliveQuizStudentData[0]?.length !== 0 &&
                                upcomingLiveQuiz[0] != undefined &&
                                upcomingLiveQuiz[0]?.length !== '' &&
                                upcomingLiveQuiz[0]?.starttime &&
                                `${trans('Quiz End Time')}${' : '}${moment(
                                  upcomingLiveQuiz[0].endtime,
                                ).format('HH:mm:A')}`}

                              {todayliveQuiz != undefined &&
                              todayliveQuiz.length == 0 &&
                              upcomingLiveQuiz != undefined &&
                              upcomingLiveQuiz.length !== 0 ? (
                                `${trans('Quiz End Time')}${' : '}${moment(
                                  upcomingLiveQuiz[0].endtime,
                                ).format('HH:mm:A')}`
                              ) : (
                                <></>
                              )}
                            </Text>
                            {timeLeft < 0 ||
                            timeLeft == undefined ||
                            timeLeft == 0 ? (
                              <></>
                            ) : (
                              <>
                                {todayliveQuizStudentData[0] != undefined &&
                                  todayliveQuizStudentData[0]?.length == 0 && (
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                      }}>
                                      <View
                                        style={{
                                          borderColor: '#FFB901',
                                          padding: 5,
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          marginHorizontal: 5,
                                        }}>
                                        <Text
                                          style={{
                                            fontWeight: '900',
                                            color: '#FFB901',
                                            fontSize: 19,
                                          }}>
                                          {DaysLeft > 0 ? DaysLeft : 0}
                                          {`D`}
                                        </Text>
                                      </View>
                                      <Text
                                        style={{
                                          fontWeight: '900',
                                          color: '#FFB901',
                                          fontSize: 19,
                                        }}>
                                        :
                                      </Text>
                                      <View
                                        style={{
                                          borderColor: '#FFB901',
                                          padding: 5,
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          marginHorizontal: 5,
                                        }}>
                                        <Text
                                          style={{
                                            fontWeight: '900',
                                            color: '#FFB901',
                                            fontSize: 19,
                                          }}>
                                          {hoursLeft > 0 ? hoursLeft : 0}
                                          {`H`}
                                        </Text>
                                      </View>
                                      <Text
                                        style={{
                                          fontWeight: '900',
                                          color: '#FFB901',
                                          fontSize: 19,
                                        }}>
                                        :
                                      </Text>
                                      <View
                                        style={{
                                          borderColor: '#FFB901',
                                          padding: 5,
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          marginHorizontal: 5,
                                        }}>
                                        <Text
                                          style={{
                                            fontWeight: '900',
                                            color: '#FFB901',
                                            fontSize: 19,
                                          }}>
                                          {minsLeft > 0 ? minsLeft : 0}
                                          {`M`}
                                        </Text>
                                      </View>
                                      <Text
                                        style={{
                                          fontWeight: '900',
                                          color: '#FFB901',
                                          fontSize: 19,
                                        }}>
                                        :
                                      </Text>
                                      <View
                                        style={{
                                          borderColor: '#FFB901',
                                          padding: 5,
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          marginHorizontal: 5,
                                        }}>
                                        <Text
                                          style={{
                                            fontWeight: '900',
                                            color: '#FFB901',
                                            fontSize: 19,
                                          }}>
                                          {secsLeft > 0 ? secsLeft : 0}
                                          {`S`}
                                        </Text>
                                      </View>
                                    </View>
                                  )}
                              </>
                            )}

                            {todayliveQuiz?.length != '' &&
                              todayliveQuizStudentData[0]?.length == '' && (
                                <TouchableOpacity
                                  onPress={() => {
                                    start_to_Join == false
                                      ? setLivequizModalStatus(true)
                                      : start_to_Join == true &&
                                        examExceedTime == true
                                      ? setLivequizexceedStatus(true)
                                      : navigation.navigate('LiveQuizInfo');
                                  }}
                                  disabled={
                                    ExamtimeEndDetails == true ? true : false
                                  }
                                  style={{
                                    paddingVertical: 8,
                                    borderRadius: 10,
                                    width: '65%',
                                    alignSelf: 'center',
                                    marginVertical: 10,
                                    marginHorizontal: 15,
                                    borderColor: '#FFB901',
                                    backgroundColor:
                                      start_to_Join == false ||
                                      ExamtimeEndDetails == true ||
                                      examExceedTime == true
                                        ? '#aaa'
                                        : '#fff',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      color:
                                        start_to_Join == false ||
                                        ExamtimeEndDetails == true ||
                                        examExceedTime == true
                                          ? 'gray'
                                          : '#000',
                                      fontWeight: '700',
                                      textAlign: 'center',
                                    }}>
                                    {trans('Start The Quiz')}
                                  </Text>
                                </TouchableOpacity>
                              )}

                            {todayliveQuizStudentData[0] != undefined &&
                              todayliveQuizStudentData[0]?.length !== 0 &&
                              upcomingLiveQuiz[0] != undefined &&
                              upcomingLiveQuiz[0]?.length !== '' &&
                              upcomingLiveQuiz[0]?.starttime && (
                                <TouchableOpacity
                                  onPress={() => {}}
                                  disabled={true}
                                  style={{
                                    paddingVertical: 8,
                                    borderRadius: 10,
                                    width: '65%',
                                    alignSelf: 'center',
                                    marginVertical: 10,
                                    marginHorizontal: 15,
                                    borderColor: '#FFB901',
                                    backgroundColor: '#aaa',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      color: 'gray',
                                      fontWeight: '700',
                                      textAlign: 'center',
                                    }}>
                                    {trans('Start The Quiz')}
                                  </Text>
                                </TouchableOpacity>
                              )}

                            {todayliveQuiz != undefined &&
                              todayliveQuiz.length == 0 &&
                              upcomingLiveQuiz != undefined &&
                              upcomingLiveQuiz.length !== 0 && (
                                <TouchableOpacity
                                  onPress={() => {}}
                                  disabled={true}
                                  style={{
                                    paddingVertical: 8,
                                    borderRadius: 10,
                                    width: '65%',
                                    alignSelf: 'center',
                                    marginVertical: 10,
                                    marginHorizontal: 15,
                                    borderColor: '#FFB901',
                                    backgroundColor: '#aaa',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      color: 'gray',
                                      fontWeight: '700',
                                      textAlign: 'center',
                                    }}>
                                    {trans('Start The Quiz')}
                                  </Text>
                                </TouchableOpacity>
                              )}
                            {todayliveQuiz?.length != '' &&
                              todayliveQuizStudentData[0]?.length == '' && (
                                <Text
                                  style={{
                                    fontSize: 13,
                                    color: '#FDDA0D',
                                    fontWeight: '500',
                                    marginVertical: 3,
                                    width: '100%',
                                    fontStyle: 'italic',
                                  }}>
                                  {ExamtimeEndDetails == true
                                    ? `${trans(
                                        'Note:-You are late for exam . The button is disabled as the exam has already ended. Join at exam start time from next time onwards.',
                                      )}`
                                    : examExceedTime == false
                                    ? `${trans(
                                        'Note:-This button will be enabled when the live quiz starts at the time shown above.',
                                      )}`
                                    : `${trans(
                                        'Note:-You are late for exam . The button is disabled as the exam has started. Join at exam start time from next time onwards.',
                                      )}`}
                                </Text>
                              )}
                            {todayliveQuiz != undefined &&
                              todayliveQuiz.length == 0 &&
                              upcomingLiveQuiz != undefined &&
                              upcomingLiveQuiz.length !== 0 && (
                                <Text
                                  style={{
                                    fontSize: 13,
                                    color: '#FDDA0D',
                                    fontWeight: '500',
                                    marginVertical: 3,
                                    width: '100%',
                                    fontStyle: 'italic',
                                  }}>
                                  {trans(
                                    'Note:-This button will be enabled when the live quiz starts at the time shown above.',
                                  )}
                                </Text>
                              )}

                            {todayliveQuizStudentData[0] != undefined &&
                              todayliveQuizStudentData[0]?.length !== 0 &&
                              upcomingLiveQuiz[0] != undefined &&
                              upcomingLiveQuiz[0]?.length !== '' &&
                              upcomingLiveQuiz[0]?.starttime && (
                                <Text
                                  style={{
                                    fontSize: 13,
                                    color: '#FDDA0D',
                                    fontWeight: '500',
                                    marginVertical: 3,
                                    width: '100%',
                                    fontStyle: 'italic',
                                  }}>
                                  {trans(
                                    'Note:-This button will be enabled when the live quiz starts at the time shown above.',
                                  )}
                                </Text>
                              )}
                          </View>
                        </View>
                      )}
                      {liveQuizLeaderBoard.length != 0 && (
                        <>
                          <TouchableOpacity
                            onPress={() => {
                              const pastquizId = {
                                childid,
                              };
                              dispatch(getPastLiveQuizAPI());
                              navigation.navigate('LiveQuizDetails', {});
                            }}
                            style={{
                              width: device_width * 0.96,
                              height: device_height * 0.12,
                              borderWidth: 0.5,
                              borderRadius: 10,
                              marginVertical: 10,
                              borderColor: userQuizBlink
                                ? 'gold'
                                : 'lightgreen',
                              backgroundColor: userQuizBlink
                                ? 'rgba(0,255,0, 0.1)'
                                : '#f1a722',
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                                paddingHorizontal: 5,
                              }}>
                              <View
                                style={{
                                  width: device_width * 0.8,
                                  height: '100%',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  paddingHorizontal: 10,
                                }}>
                                <FastImage
                                  source={require('../../../assets/test.png')}
                                  style={{height: 60, width: 60}}
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
                                      color: userQuizBlink
                                        ? '#fff'
                                        : 'darkgreen',
                                    }}>
                                    {trans('NoteVed CCA Live Quiz')}
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      fontWeight: '600',
                                      color: userQuizBlink
                                        ? '#fff'
                                        : 'darkgreen',
                                    }}>
                                    {todayliveQuiz != undefined &&
                                    todayliveQuiz[0]?.length != 0 &&
                                    ExamtimeEndDetails == false ? (
                                      `${moment(
                                        todayliveQuiz[0]?.starttime,
                                      ).format('DD-MMM-YYYY')}`
                                    ) : (
                                      <></>
                                    )}

                                    {todayliveQuiz != undefined &&
                                    todayliveQuiz[0]?.length != 0 &&
                                    ExamtimeEndDetails == true &&
                                    upcomingLiveQuiz[0] != undefined &&
                                    upcomingLiveQuiz[0]?.length !== '' &&
                                    upcomingLiveQuiz[0]?.starttime ? (
                                      `${moment(
                                        upcomingLiveQuiz[0]?.starttime,
                                      ).format('DD-MMM-YYYY')}${'  '}${'('}${
                                        daysLeft != undefined &&
                                        daysLeft != 0 ? (
                                          daysLeft
                                        ) : (
                                          <></>
                                        )
                                      }${' Days Left'}${')'}`
                                    ) : (
                                      <></>
                                    )}

                                    {todayliveQuiz != undefined &&
                                    todayliveQuiz[0]?.length == 0 &&
                                    upcomingLiveQuiz[0] != undefined &&
                                    upcomingLiveQuiz[0]?.length !== '' &&
                                    upcomingLiveQuiz[0]?.starttime ? (
                                      `${moment(
                                        upcomingLiveQuiz[0]?.starttime,
                                      ).format('DD-MMM-YYYY')}${'  '}${'('}${
                                        daysLeft != undefined &&
                                        daysLeft != 0 ? (
                                          daysLeft
                                        ) : (
                                          <></>
                                        )
                                      }${' Days Left'}${')'}`
                                    ) : (
                                      <></>
                                    )}
                                  </Text>
                                  <TouchableOpacity
                                    style={{
                                      width: '100%',
                                      height: 30,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      paddingVertical: 5,
                                    }}
                                    onPress={() => {
                                      const pastquizId = {
                                        childid,
                                      };
                                      dispatch(getPastLiveQuizAPI());
                                      navigation.navigate(
                                        'LiveQuizDetails',
                                        {},
                                      );
                                    }}>
                                    <Text
                                      style={{
                                        color: userQuizBlink
                                          ? '#fff'
                                          : 'darkgreen',
                                        fontSize: 15,
                                        width: '100%',
                                        fontWeight: '700',
                                        textDecorationLine: 'underline',
                                      }}>
                                      {trans('Quiz Details')}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                              <MaterialIcons
                                name="keyboard-arrow-right"
                                size={30}
                                color={userQuizBlink ? '#fff' : 'darkgreen'}
                                style={{marginRight: 10}}
                              />
                            </View>
                          </TouchableOpacity>
                        </>
                      )}
                    </>
                  )}
                </View>
                {/* </>
              )} */}
              </View>
            )}
          </View>
          {SubLoading == 'loading' ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                height: device_height * 0.9,
                width: device_width,
                // backgroundColor: Colors.secondary,
              }}>
              <LoadingScreen flag={SubLoading == 'loading'} />
            </View>
          ) : (
            <>
              <ScrollView showsVerticalScrollIndicator={false}>
                {SubjectByCourse.length > 0 ? (
                  <>
                    {SubjectByCourse.map((item, index) => {
                      const {
                        _id = '',
                        subjectid = '',
                        subjectname = '',
                        topics = [],
                        subjectimage = '',
                      } = item;
                      //
                      const progress = topics.filter(
                        item => item.studenttopic != '',
                      ).length;
                      const totalTopic = topics.length;
                      const proData = progress / totalTopic;
                      //const completionPercentage = Math.round(proData * 100);
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            const bodydata = {
                              subjectid: subjectid,
                              childid: childid,
                            };
                            //dispatch(getChildProgressDetailAPI(bodydata));
                            dispatch(getTopicBySubIdAPI(bodydata));
                            // dispatch(getTopicBySubIdAPI(subjectid));
                            navigation.navigate('TopicDetails', {
                              //coursename: coursename,
                              subjectname: subjectname,
                              subjectid: subjectid,
                              subjectimage: subjectimage,
                            });
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              backgroundColor: 'rgba(0,255,0,0.1)',
                              width: IsTabScreen
                                ? device_width * 0.9
                                : device_width * 0.95,
                              height: IsTabScreen
                                ? device_height * 0.13
                                : device_height * 0.09,
                              marginHorizontal: IsTabScreen
                                ? device_width * 0.05
                                : 10,
                              paddingHorizontal: IsTabScreen ? 25 : 10,
                              borderRadius: 12,
                              borderWidth: 0.9,
                              borderColor: '#f1a722',
                              marginBottom: 15,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 12,
                              }}>
                              {subjectimage != '' ? (
                                <Image
                                  source={{uri: subjectimage}}
                                  style={{
                                    height: IsTabScreen
                                      ? device_height * 0.10
                                      : device_height * 0.2,
                                    width: IsTabScreen
                                      ? device_width * 0.10
                                      : device_width * 0.12,
                                    resizeMode: 'contain',
                                    tintColor: '#f1a722',
                                  }}
                                />
                              ) : (
                                <Image
                                  source={require('../../../assets/people.png')}
                                  style={{
                                    height: IsTabScreen
                                      ? device_height * 0.12
                                      : device_height * 0.21,
                                    width: IsTabScreen
                                      ? device_width * 0.10
                                      : device_width * 0.15,
                                    resizeMode: 'contain',
                                    tintColor: '#f1a722',
                                  }}
                                />
                              )}
                              <View
                                style={{
                                  flexDirection: 'row',
                                  display: 'flex',
                                  flexWrap:
                                    subjectname.length > 10 ? 'wrap' : 'nowrap',
                                }}>
                                <Text
                                  style={{
                                    color: '#f1a722',
                                    fontWeight: '500',
                                    fontSize: IsTabScreen ? 22 : 18,
                                  }}>
                                  {trans(subjectname)}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                position: 'absolute',
                                right: IsTabScreen ? 22 : 10,
                                bottom: IsTabScreen ? 30 : 15,
                              }}>
                              <Text
                                style={{
                                  fontWeight: '600',
                                  color: '#def',
                                  fontSize: IsTabScreen ? 20 : 16,
                                  marginRight: IsTabScreen ? 15 : 10,
                                }}>
                                {parseFloat(`${proData * 100}% `).toFixed(2)}
                                {'%'}
                              </Text>
                              <Progress.Circle
                                progress={proData}
                                size={IsTabScreen ? 50 : 35}
                                indeterminate={false}
                                thickness={6}
                                allowFontScaling={false}
                                color={'#def'}
                                borderWidth={2}
                                borderColor="orange"
                                showsText={false}
                                textStyle={{
                                  fontSize: 12,
                                  fontWeight: '600',
                                }}
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <View
                      style={{
                        backgroundColor: 'burlywood',
                        paddingVertical: 15,
                        paddingHorizontal: 15,
                        marginVertical: 10,
                        marginHorizontal: 15,
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
                        color={'darkgreen'}
                      />
                      <Text
                        style={{
                          color: '#333',
                          fontWeight: '700',
                          fontSize: 15,
                          textAlign: 'center',
                          width: '85%',
                        }}>
                        {trans('Currently No Content Added')}
                      </Text>
                    </View>
                  </>
                )}
              </ScrollView>
            </>
          )}
        </ScrollView>
        {livequizmodalStatus && (
          <Modal transparent={true} visible={livequizmodalStatus}>
            <View
              style={{
                borderRadius: 14,
                borderColor: '#fff',
                backgroundColor: '#fff',
                minHeight: device_height * 0.3,
                minWidth: device_width * 0.9,
                alignSelf: 'center',
              }}>
              <View
                style={{
                  borderRadius: 15,
                  borderWidth: 1,
                  minHeight: device_height * 0.3,
                  minWidth: device_width * 0.8,
                  borderColor: '#fff',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    width: device_width * 0.7,
                    fontSize: 18,
                    color: '#333',
                    marginTop: 5,
                    fontWeight: '600',
                  }}>
                  {trans(
                    'This button will be enabled when the live quiz starts at the time shown above.',
                  )}
                </Text>
                <View
                  style={{
                    paddingVertical: 15,
                    alignItems: 'center',
                    marginTop: 10,
                    marginLeft: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    padding: 10,
                  }}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 10,
                      width: '40%',
                      marginVertical: 5,
                      marginRight: 25,
                      borderColor: 'white',
                      backgroundColor: 'green',
                      paddingVertical: 15,
                      justifyContent: 'center',
                    }}
                    onPress={() => setLivequizModalStatus(false)}>
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
            </View>
          </Modal>
        )}
        {livequizexceedStatus && (
          <Modal transparent={true} visible={livequizexceedStatus}>
            <View
              style={{
                borderRadius: 14,
                borderColor: '#fff',
                backgroundColor: '#fff',
                minHeight: device_height * 0.3,
                minWidth: device_width * 0.9,
                alignSelf: 'center',
              }}>
              <View
                style={{
                  borderRadius: 15,
                  borderWidth: 1,
                  minHeight: device_height * 0.3,
                  minWidth: device_width * 0.8,
                  borderColor: '#fff',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    width: device_width * 0.7,
                    fontSize: 18,
                    color: '#333',
                    marginTop: 5,
                    fontWeight: '600',
                    textTransform: 'capitalize',
                  }}>
                  {trans(
                    'Quiz time has exceeded; you can no longer join the quiz',
                  )}
                </Text>
                <View
                  style={{
                    paddingVertical: 15,
                    alignItems: 'center',
                    marginTop: 10,
                    marginLeft: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    padding: 10,
                  }}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 10,
                      width: '40%',
                      marginVertical: 5,
                      marginRight: 25,
                      borderColor: 'white',
                      backgroundColor: 'green',
                      paddingVertical: 15,
                      justifyContent: 'center',
                    }}
                    onPress={() => setLivequizexceedStatus(false)}>
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
            </View>
          </Modal>
        )}
        {leaderBoardStatus && liveQuizLeaderBoard.length >= 0 && (
          <Modal transparent={true} visible={leaderBoardStatus}>
            <SafeAreaView
              style={{
                borderRadius: 15,
                backgroundColor: 'mistyrose',
                height: device_height * 0.85,
                width: device_width * 0.95,
                alignSelf: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FastImage
                style={{
                  height: 60,
                  width: 120,
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
                onPress={() => {
                  setLeaderBoardtatus(false);
                }}
              />

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    fontSize: 27,
                    color: 'darkorange',
                    fontWeight: '900',
                  }}>
                  {trans('Leaderboard')}
                </Text>
              </View>
              {leaderboardLoading == 'loading' ? (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '90%',
                    width: '90%',
                    alignSelf: 'center',
                    flex: 1,
                  }}>
                  <ActivityIndicator
                    size="large"
                    color={'green'}
                    style={{alignSelf: 'center'}}
                  />
                  <Text
                    style={{
                      color: 'green',
                      fontWeight: '600',
                      fontSize: 12,
                    }}>
                    {trans('Loading... Please Wait')}
                  </Text>
                </View>
              ) : (
                <>
                  <ScrollView
                    showsVerticalScrollIndicator={true}
                    persistentScrollbar={true}
                    style={{flexGrow: 1}}>
                    <View
                      style={{
                        width: '100%',
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 50,
                        marginBottom: 50,
                      }}>
                      {topstudentData[0]?.length > 0 && (
                        <>
                          {topstudentData[0]?.map((item, index) => {
                            const {
                              fname: name = '',
                              fathername = '',
                              schoolname = '',
                              answerdetails = [],
                              quiz = [],
                              lastexamtotalsecurmark = '',
                              timetaken: lastexamtimetaken = '',
                              percentage = '',
                              score: securemark = '',
                              image: studentimage = '',
                              gender = '',
                            } = item;

                            const hours = Math.floor(lastexamtimetaken / 3600);
                            const minutes = Math.floor(
                              (lastexamtimetaken % 3600) / 60,
                            );
                            const remainingSeconds = lastexamtimetaken % 60;

                            const formattedHours =
                              hours < 10 ? `0${hours}` : hours;
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
                                  height: device_height * 0.18,
                                  marginVertical: 3,
                                  padding: 3,
                                  backgroundColor:
                                    ListColor[index % ListColor.length],
                                  elevation: 5,
                                }}>
                                {toOrdinalSuffix(index + 1) == '1st' ||
                                toOrdinalSuffix(index + 1) == '2nd' ||
                                toOrdinalSuffix(index + 1) == '3rd' ? (
                                  <View
                                    style={{
                                      borderRadius: 50,
                                      height: 50,
                                      width: 50,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      borderWidth: 3,
                                      borderColor: 'darkorange',
                                      elevation: 5,
                                    }}>
                                    <Avatar.Image
                                      source={
                                        toOrdinalSuffix(index + 1) == '1st'
                                          ? require('../../../assets/first.png')
                                          : toOrdinalSuffix(index + 1) == '2nd'
                                          ? require('../../../assets/second.png')
                                          : toOrdinalSuffix(index + 1) == '3rd'
                                          ? require('../../../assets/third.jpg')
                                          : null
                                      }
                                      size={50}
                                    />
                                  </View>
                                ) : (
                                  <View
                                    style={{
                                      borderRadius: 50,
                                      flexGrow: 1,
                                      width: 50,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}></View>
                                )}
                                <View
                                  style={{
                                    width: '65%',
                                    justifyContent: 'center',
                                    paddingVertical: 5,
                                    paddingHorizontal: 15,
                                    alignSelf: 'stretch',
                                    flexGrow: 1,
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
                                  {schoolname != undefined &&
                                    schoolname != '' && (
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
                                  {securemark != undefined &&
                                    securemark != '' && (
                                      <Text
                                        style={{
                                          fontSize: 14,
                                          fontWeight: '700',
                                          color: '#333',
                                        }}>
                                        {trans('Secure Mark')} -{' '}
                                        <Text
                                          style={{
                                            fontWeight: '800',
                                            color: Colors.primary,
                                          }}>
                                          {securemark}
                                        </Text>
                                      </Text>
                                    )}
                                  {lastexamtimetaken.length != 0 && (
                                    <Text
                                      style={{
                                        fontSize: 14,
                                        fontWeight: '700',
                                        color: '#333',
                                      }}>
                                      {trans('Time Taken')} -{' '}
                                      <Text
                                        style={{
                                          fontSize: 13,
                                          fontWeight: '700',
                                          color: 'green',
                                        }}>
                                        {`${formattedHours}:${formattedMinutes}:${formattedSeconds}`}
                                      </Text>
                                    </Text>
                                  )}
                                </View>
                                <View
                                  style={{
                                    width: '23%',
                                    height: 70,
                                    marginBottom: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <FastImage
                                    style={{
                                      height: '110%',
                                      width: 60,
                                      borderRadius: 5,
                                    }}
                                    resizeMode="contain"
                                    source={
                                      studentimage != '' && studentimage != null
                                        ? {uri: studentimage}
                                        : gender == 'Male'
                                        ? require('../../../assets/boy.png')
                                        : gender == 'Female'
                                        ? require('../../../assets/girl.png')
                                        : {
                                            uri: 'https://wkresources.s3.ap-south-1.amazonaws.com/userrr.png',
                                          }
                                    }
                                  />
                                </View>
                              </View>
                            );
                          })}
                        </>
                      )}
                      {liveQuizLeaderBoard.length == 0 && (
                        <>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: '700',
                              color: '#000',
                            }}>
                            {trans('No Top student Available')}
                          </Text>
                        </>
                      )}
                    </View>
                  </ScrollView>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      alignSelf: 'center',
                      marginVertical: 15,
                    }}>
                    <TouchableOpacity
                      style={{
                        borderRadius: 10,
                        width: 150,
                        alignSelf: 'center',
                        alignItems: 'center',
                        backgroundColor: 'green',
                        paddingVertical: 10,
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        setLeaderBoardtatus(false);
                      }}>
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
                </>
              )}
            </SafeAreaView>
          </Modal>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SubjectLevel;
