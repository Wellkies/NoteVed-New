import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    BackHandler,
    ImageBackground,
  } from 'react-native';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import PieChart from 'react-native-pie-chart';
  import React, {useEffect, useRef, useState} from 'react';
  import {ActivityIndicator, Avatar, Modal} from 'react-native-paper';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import FastImage from 'react-native-fast-image';
  import ViewShot from 'react-native-view-shot';
  import Share from 'react-native-share';
  import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
  import {useTranslation} from 'react-i18next';
  import Iconz from 'react-native-vector-icons/Entypo';
  import Icon from 'react-native-vector-icons/Ionicons';
  import {device_height, device_width} from '../style';
  import {markCalculation, handlesubjectData} from '../../../constants/Constants';
  import {useNavigation} from '@react-navigation/native';
  import {
    getChildDetailsAPI,
    selectStudentInfo,
  } from '../../redux/reducers/StudentInfoReducer';
  import {selectExamName} from '../../redux/reducers/ExamTestNameReducer';
  import {RootState} from '../../redux/store/Store';
  import Colors from '../../../assets/Colors';
  import moment from 'moment';
  import {
    getLiveQuizTopStudentAPI,
    selectLiveQuizTopStudentData,
  } from '../../redux/reducers/GetLiveQuizTopStudentReducer';
  import { getLiveQuizAPI } from '../../redux/reducers/LiveQuizReducer';
  // import {
  //   TestIds,
  //   RewardedAd,
  //   RewardedAdEventType,
  // } from "react-native-google-mobile-ads";
  import { getScholarshipPremiumAPI, selectPremiumPurchase, selectPremiumPurchaseStatus } from '../../redux/reducers/GetPremiumPurchaseReducer';
  import { getAdsStatus, selectAdsStatus, selectAdsStatuss } from '../../redux/reducers/GetAdsStatusReducer';
  // import { REWARDEDAD } from '../../../constants/ApiPaths';
import { selectUserInfo } from '../../redux/reducers/loginReducer';
  
  const LiveQuizScoreBoard = ({route}) => {
    const dispatch = useDispatch<any>();
    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
    const navigation = useNavigation();
    const todayDate = new Date();
    const {t: trans, i18n} = useTranslation();
    const {
      screenName = '',
      subjectName = '',
      chapterName = '',
      quiz = [],
      scholarshipid = '',
      // boardid = '',
      scholarshipName = '',
  
      quizID = '',
    } = route.params;
    const PremiumPurchase = useAppSelector(selectPremiumPurchase);
    const PremiumPurchaseLoad = useAppSelector(selectPremiumPurchaseStatus);
  
     /////////////////////AD/////////////////////
  
    //  const [rewardedad,setRewardedad] =useState(null)
     const [isLoaded, setIsLoaded] = useState(false);
    //  const [isRewardedAddCalled, setIsRewardedAddCalled] = useState(false)
    //  const adUnitId3 =REWARDEDAD;
   
     useEffect(() => {
     
      //  initRewardedad()
     }, []);
     const AdsStatus=useAppSelector(selectAdsStatus)
     const AdLoadStatuss=useAppSelector(selectAdsStatuss)
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
      //   AdsStatus?.adstatus ==true &&
      //   PremiumPurchaseLoad === 'idle' &&
      //   AdLoadStatuss === 'idle'
      // ) {
      //   rewardedadd();
      //   setIsRewardedAddCalled(true);
      // }
    }, [isLoaded, PremiumPurchaseLoad,AdLoadStatuss]);
    //  const initRewardedad =()=>{
    //    const rewarded = RewardedAd.createForAdRequest(adUnitId3, {
    //          keywords: ["fashion", "clothing"],
    //        });
    //    rewarded.addAdEventListener(RewardedAdEventType.LOADED,()=>{
    //      setRewardedad(rewarded)
    //      setIsLoaded(true)
         
    //    })
    //    rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD,()=>{
    //      initRewardedad()
         
    //    })
    //    rewarded.load()
    //  }
  //  const rewardedadd =()=>{
  //   if (rewardedad) {
  //    rewardedad.show()
  //   }
  //   }
  
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
  
    const ExamName = useAppSelector(selectExamName);
  
    const handleBackButtonClick = () => {
      const Livequiz = {
        //boardid,
        childid,
      };
   dispatch(getLiveQuizAPI(Livequiz));
      navigation.navigate('SubjectLevel');
    };
  
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
    const sliceColor = ['crimson','lime','white'];
  
    const LiveQuizTopStudent = useAppSelector(selectLiveQuizTopStudentData);
    //
    // const ProbableTopStudent = useAppSelector(selectProbTopStudent);
    //
    const ListColor = ['#fee2a3', '#f6c4b9', '#c3ccf5', '#76f0c7'];
  
    const ref = useRef();
    const [imageUri, setImageUri] = useState('');
  
    useEffect(() => {
      // on mount
      ref.current.capture().then(uri => {
        setImageUri(uri);
      });
    }, []);
  
    useEffect(() => {
      dispatch(getAdsStatus())
      const Predata = {childid, stageid, boardid};
      dispatch(getScholarshipPremiumAPI(Predata));
      const Livequiz = {
       // boardid,
        childid,
      };
   dispatch(getLiveQuizAPI(Livequiz));
      const TopstudentData = {
        quizid: quizID,
      };
      dispatch(getLiveQuizTopStudentAPI(TopstudentData));
    }, []);
  
    useEffect(() => {
      if (LiveQuizTopStudent) {
        // setModalStatus(true);
      }
    }, []);
  
    useEffect(() => {
      navigation.addListener('focus', () => {
        BackHandler.addEventListener('hardwareBackPress', () => {
          handleBackButtonClick();
          return true;
        });
      });
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', () => {
          handleBackButtonClick();
          return true;
        });
      };
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
  
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor={'#263d2d'} barStyle="light-content" />
        <>
          <ImageBackground
            style={{
              width: device_width,
              height: device_height,
              flex: 1,
              alignSelf: 'center',
              // borderWidth:1,
            }}
            resizeMode="cover"
            source={require('../../../assets/0.png')}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{paddingHorizontal: 0, borderWidth: 0}}>
              <View
                style={{
                  height: device_height * 1,
                  width: '100%',
                  paddingBottom: 10,
                  // borderWidth: 1,
                  borderColor: 'yellow',
                }}>
                <ViewShot
                  ref={ref}
                  options={{
                    fileName: 'Test_Result',
                    format: 'png',
                    quality: 0.9,
                  }}
                  style={{
                    // flex:1,
                    backgroundColor: 'rgba(230,230,230, 0.1)',
                    // height: device_height * 0.83,
                    height: '84%',
                    width: device_width,
                    // borderWidth: 1,
                    borderColor: 'red',
                    // alignItems:'center',
                    // justifyContent:'center',
                    alignSelf: 'center',
                    paddingVertical: 5,
                    paddingBottom: 10,
                    paddingHorizontal: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: device_width * 0.94,
                      alignSelf: 'center',
                      paddingHorizontal: 10,
                    }}>
                    <View>
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
                          size={20}
                          color={'#fff'}
                          style={{marginRight: 10}}
                        />
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 13,
                            fontWeight: '700',
                          }}>
                          {trans('Exercise Result')}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{alignItems: 'center', justifyContent: 'center'}}>
                      <Text style={{fontWeight: '600', color: '#fff'}}>
                        {trans('Exercise attempted on')}
                      </Text>
                      <Text style={{fontWeight: '600', color: '#fff'}}>
                        {moment(todayDate).format('DD-MMM-YYYY')}
                      </Text>
                    </View>
                  </View>
  
                  <View
                    style={{
                      // width: device_width * 0.9,
                      // height: device_height * 0.28,
                      marginHorizontal: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor: 'rgba(0,255,0, 0.1)',
                      // borderWidth: 2,
                      // height: '43%',
                      // borderColor: '#FFB901',
                      // borderColor: '#aaa',
                      borderRadius: 20,
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
                            color: '#fff',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                          }}>
                          {fname} {lname}
                        </Text>
                      ) : (
                        <Text
                          style={{
                            fontSize: 20,
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
                          fontSize: 15,
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
                        {trans('Live Quiz')}
                        {/* {subjectName == '' ? <></> : `${subjectName.trim()}`} */}
                        {/* {`${subjectName},`}{' '} */}
                      </Text>
                    </View>
                  </View>
  
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '700',
                      // color: isToggled ? Colors.primary : '#000',
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
                      borderWidth:
                        // noofpurchased == '' && author == '' && bookpages == ''
                        //   ? 0
                        //   :
                        1.5,
                      backgroundColor: 'green',
                      borderColor: '#fff',
                      borderRadius: 10,
                      marginVertical: 5,
                      paddingHorizontal: 15,
                      width: '98%',
                      height: 70,
                    }}>
                    {/* {noofpurchased != '' && (*/}
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '48%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 50,
                      }}>
                      <Ionicons
                        name="speedometer-outline"
                        color={'gold'}
                        size={40}
                        style={{marginHorizontal: 10}}
                      />
                      <View
                        style={{
                          // width: '30%',
                          // borderWidth: 1,
                          height: 50,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '600',
                            color: 'gold',
                          }}>
                          {trans('Mark Scored')}
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
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
                      fontSize: 17,
                      fontWeight: '700',
                      // color: isToggled ? Colors.primary : '#000',
                      color: '#fff',
                      marginLeft: 10,
                      marginTop: 10,
                    }}>
                    {trans('Exercise Statistics')}
                  </Text>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      alignSelf: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      borderWidth:
                        // noofpurchased == '' && author == '' && bookpages == ''
                        //   ? 0
                        //   :
                        1.5,
                      backgroundColor: 'green',
                      borderColor: '#fff',
                      borderRadius: 10,
                      marginVertical: 5,
                      paddingHorizontal: 15,
                      width: '98%',
                      height: 70,
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
                          height: 27,
                          width: 27,
                          backgroundColor: 'lime',
                          marginRight: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 3,
                        }}>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: '700',
                            color: '#fff',
                          }}>
                          {`${correctanswer}`}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 15,
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
                          height: 27,
                          width: 27,
                          backgroundColor: 'crimson',
                          marginRight: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 3,
                        }}>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: '700',
                            color: '#fff',
                          }}>
                          {`${Wronganswer}`}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 15,
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
                          height: 27,
                          width: 27,
                          backgroundColor: 'white',
                          marginRight: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 3,
                        }}>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: '700',
                            color: 'green',
                          }}>
                          {`${Skipped}`}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 15,
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
                      height: device_width * 0.33,
                      marginHorizontal: 10,
                      width: '100%',
                      borderWidth: 1,
                      borderColor: 'gold',
                      backgroundColor: '#263d2d',
                      marginTop: 15,
                    }}>
                    <View>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 15,
                        }}>
                        {trans('Percentage : ')}
                        {percentage} {'%'}
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 15,
                        }}>
                        {trans('Total Mark : ')}
                        {totalmark}
                      </Text>
                    </View>
                    <PieChart
                      // doughnut={true}
                      coverRadius={0.45}
                      widthAndHeight={device_width * 0.28}
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
                    // alignItems:'center',
                    // zIndex: -1,
                    width: device_width,
                    // height: '12%',
                    paddingVertical: 10,
                    // borderWidth: 1,
                    alignSelf: 'center',
                    // marginTop: 10,
                  }}>
                  <TouchableOpacity
                    style={{
                      paddingVertical: 5,
                      borderRadius: 10,
                      width: '45%',
                      marginVertical: 10,
                      marginHorizontal: 5,
                      // paddingHorizontal: 15,
                      borderWidth: 1,
                      borderColor: '#FFB901',
                      backgroundColor: 'rgba(250,250,250,0.1)',
                      flexDirection: 'row',
                      // backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      myCustomShare();
                    }}>
                    <View
                      style={{
                        // margin: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          width: '90%',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            // width: '100%',
                            // borderWidth:1
                          }}>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: '700',
                              // marginLeft: 15,
                              color: '#fff',
                            }}>
                            {trans('Share Report')}
                          </Text>
                        </View>
                        <MaterialIcons
                          name="share"
                          color={'#f1a722'}
                          size={22}
                          // style={{height: 30, width: 30}}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('LiveQuizAnswerSheet', {
                        screenName: screenName,
  
                        ExamQuestionsets: quiz,
                        subjectName: subjectName,
  
                        quiz: quiz,
                        quizID: quizID,
  
                        scholarshipid: scholarshipid,
  
                        boardid: boardid,
                        scholarshipName: scholarshipName,
                      })
                    }
                    style={{
                      paddingVertical: 5,
                      borderRadius: 10,
                      width: '45%',
                      marginVertical: 10,
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
                    <Text
                      style={{
                        color: '#fff',
                        // fontSize: 16,
                        fontWeight: '700',
                        textAlign: 'center',
                      }}>
                      {trans('View Result')}
                    </Text>
                  </TouchableOpacity>
                </View>
  
                <View>
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignContent: 'center',
                      height: '20%',
                      width: '90%',
                      alignItems: 'center',
                      alignSelf: 'center',
                      borderWidth: 1,
                      borderRadius: 10,
  
                      borderColor: '#FFB901',
                    }}
                    onPress={() => handleBackButtonClick()}>
                    {/* <MaterialIcons
                          name="arrow-back"
                          size={25}
                          // backgroundColor={'#263d2d'}
                          color={'#fff'}
                          onPress={() => handleBackButtonClick()}
                        /> */}
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#fff',
                        fontSize: 15,
                        fontWeight: '600',
                      }}>
                      {trans('Home')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </ImageBackground>
          {modalStatus && LiveQuizTopStudent.length > 0 && (
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
                    {LiveQuizTopStudent.map((item, index) => {
                      const {
                        student_name: name = '',
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
                          </View>
                          <View style={{width: '20%'}}>
                            <Text
                              style={{
                                alignSelf: 'center',
                                fontSize: 15,
                                fontWeight: '900',
                                color: Colors.primary,
                              }}>
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
        </>
      </SafeAreaView>
    );
  };
  
  export default LiveQuizScoreBoard;
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
  