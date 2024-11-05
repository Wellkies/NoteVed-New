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
  Dimensions,
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
import {
  getLiveQuizAPI,
  selectLiveQuizData,
  selectLiveQuizStatus,
} from '../../redux/reducers/LiveQuizReducer';
import LoadingScreen from '../CommonScreens/LoadingScreen';
// import {
//   TestIds,
//   RewardedAd,
//   RewardedAdEventType,
// } from 'react-native-google-mobile-ads';
import {
  getScholarshipPremiumAPI,
  selectPremiumPurchase,
  selectPremiumPurchaseStatus,
} from '../../redux/reducers/GetPremiumPurchaseReducer';
import {
  getAdsStatus,
  selectAdsStatus,
  selectAdsStatuss,
} from '../../redux/reducers/GetAdsStatusReducer';
// import {REWARDEDAD} from '../../../constants/ApiPaths';
import {selectUserInfo} from '../../redux/reducers/loginReducer';

const LiveQuizInfo = ({route}) => {
  const dispatch = useDispatch<any>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const device_width = Dimensions.get('window').width;
  const device_height = Dimensions.get('window').height;
  const navigation = useNavigation();
  const todayDate = new Date();
  const {t: trans, i18n} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [ansloading, setAnsLoading] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [reminderModal, setReminderModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
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
    //boardname: string;
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
  console.log(childid, '@childid');

  /////////////////////AD/////////////////////

  // const [rewardedad, setRewardedad] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRewardedAddCalled, setIsRewardedAddCalled] = useState(false);
  // const adUnitId3 = REWARDEDAD;

  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      const {width, height} = window;
      setOrientation(height >= width ? 'portrait' : 'landscape');
    });
    console.log(orientation, 'Orientation');
    return () => subscription?.remove();
  }, [orientation]);

  useEffect(() => {
    // initRewardedad();
  }, []);
  const AdsStatus = useAppSelector(selectAdsStatus);
  const AdLoadStatuss = useAppSelector(selectAdsStatuss);
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
  //
  const ListColor = ['#fee2a3', '#f6c4b9', '#c3ccf5', '#76f0c7'];

  const ref = useRef();
  const [imageUri, setImageUri] = useState('');

  const ContentQuiz = useAppSelector(selectLiveQuizData);
  const today = new Date();
  const todayDateString = today.toISOString().split('T')[0];

  const todayliveQuiz = ContentQuiz?.filter(item => {
    const quizDate = new Date(item.starttime).toISOString().split('T')[0];
    return quizDate === todayDateString;
  });

  const ContentLoading = useAppSelector(selectLiveQuizStatus);
  const Livequiz = {
    childid: childid,
  };
  useEffect(() => {
    dispatch(getAdsStatus());
    dispatch(getLiveQuizAPI(Livequiz));
    navigation.addListener('focus', () => {
      const Predata = {childid};
      dispatch(getScholarshipPremiumAPI(Predata));
      dispatch(getLiveQuizAPI(Livequiz));
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.goBack();
        return true;
      });
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        navigation.goBack();
        return true;
      });
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={'#263d2d'} barStyle="light-content" />
      <>
        {ContentLoading == 'loading' ? (
          <LoadingScreen flag={ContentLoading == 'loading'} />
        ) : (
          <ImageBackground
            style={{
              width: device_width,
              height: device_height,
              flex: 1,
              alignSelf: 'center',
            }}
            resizeMode="cover"
            source={require('../../../assets/0.png')}>
            {ContentQuiz.length != '' ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{paddingHorizontal: 0, borderWidth: 0}}>
                <View
                  style={{
                    height: device_height * 0.94,
                    width: '100%',
                    paddingBottom: 10,
                    borderColor: 'yellow',
                  }}>
                  <View
                    style={{
                      height: '96%',
                      width: device_width,
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
                      <MaterialIcons
                        name="arrow-back"
                        size={25}
                        color={'#fff'}
                        onPress={() => navigation.goBack()}
                      />
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
                          {trans('Live Quiz')}
                        </Text>
                      </View>
                    </View>
                    <ScrollView contentContainerStyle={{paddingBottom: '80%'}}>
                      <View
                        style={{
                          justifyContent: 'space-around',
                          alignSelf: 'center',
                          alignItems: 'center',
                          borderWidth: 1.5,
                          backgroundColor: 'green',
                          borderColor: '#fff',
                          borderRadius: 10,
                          marginVertical: 5,
                          paddingHorizontal: 10,
                          width: '98%',
                          height: 90,
                          marginTop: 10,
                        }}>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: device_height * 0.25,
                          }}>
                          <Text
                            style={{
                              fontSize: 17,
                              fontWeight: '700',
                              color: '#fff',
                              marginLeft: 10,
                            }}>
                            {trans('Quiz Details')}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              height: 30,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: '600',
                                color: 'gold',
                              }}>
                              {trans('Total Mark')}
                            </Text>
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: '900',
                                color: '#fff',
                              }}>
                              {' : '} {todayliveQuiz[0]?.quiz.length}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: '600',
                                color: 'gold',
                              }}>
                              {trans('Total No. of Questions')}
                            </Text>
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: '900',
                                color: '#fff',
                              }}>
                              {' : '} {todayliveQuiz[0]?.quiz.length}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          padding: 10,
                          borderWidth: 1,
                          width: '98%',
                          height: device_height * 0.75,
                          backgroundColor: '#fff',
                          borderRadius: 20,
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          alignSelf: 'center',
                        }}>
                        <MaterialIcons name="info" color={'green'} size={50} />
                        <Text
                          style={{
                            fontSize: 24,
                            color: '#333',
                            fontWeight: '700',
                            textAlign: 'center',
                            textDecorationLine: 'underline',
                            marginVertical: 10,
                          }}>
                          {trans('Instructions')}
                        </Text>
                        <View
                          style={{
                            width: '90%',
                            borderWidth: 1,
                            borderColor: '#999',
                            alignItems: 'left',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                          }}>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#333',
                                fontWeight: '600',
                              }}>
                              {trans(
                                `i- The quiz duration is 1 hour (60 minutes).`,
                              )}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#333',
                                fontWeight: '600',
                              }}>
                              {trans(`ii- There are a total of 50 questions.`)}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#333',
                                fontWeight: '600',
                              }}>
                              {trans(
                                `iii- The questions will be in multiple choice format (MCQs).`,
                              )}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#333',
                                fontWeight: '600',
                              }}>
                              {trans(`iv- Each question carries 1 mark.`)}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#333',
                                fontWeight: '600',
                              }}>
                              {trans(`v- The total marks for the quiz are 50.`)}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#333',
                                fontWeight: '600',
                              }}>
                              {trans(
                                `vi- The quiz will start at a specific scheduled time.`,
                              )}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#333',
                                fontWeight: '600',
                              }}>
                              {trans(
                                `vii- Each question should be answered within an average time of 1.2 minutes to complete all questions within the allotted time.`,
                              )}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#333',
                                fontWeight: '600',
                              }}>
                              {trans(
                                `viii- Ensure a stable internet connection throughout the quiz to avoid disconnection and potential loss of progress.`,
                              )}
                            </Text>
                          </View>
                        </View>
                        <TouchableOpacity
                          style={{
                            width: '60%',
                            paddingHorizontal: 20,
                            paddingVertical: 15,
                            backgroundColor: 'green',
                            borderRadius: 20,
                            borderWidth: 1,
                            borderColor: 'gold',
                            marginTop: 15,
                          }}
                          onPress={() => {
                            dispatch(getLiveQuizAPI(childid));
                            console.log(childid, '@12childid');
                            navigation.navigate('LiveQuiz');
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              alignItems: 'center',
                              fontSize: 16,
                              color: 'gold',
                              fontWeight: '600',
                            }}>
                            {trans('Start Test')}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </ScrollView>
            ) : (
              <>
                <View
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      height: device_height * 0.5,
                      width: device_width * 0.98,
                      borderColor: '#FFB901',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}>
                    <View>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
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
                            {trans('Sorry! No Live Quiz Available Today')}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          paddingVertical: 15,
                          alignItems: 'center',
                          marginTop: 10,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignSelf: 'center',
                        }}></View>
                    </View>
                  </View>
                </View>
              </>
            )}
          </ImageBackground>
        )}
        {modalStatus && LiveQuizTopStudent.length > 0 && (
          <Modal transparent={true} visible={modalStatus}>
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
                onPress={() => setModalStatus(false)}
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

              <ScrollView
                showsVerticalScrollIndicator={true}
                persistentScrollbar={true}>
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 50,
                    marginBottom: 50,
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
                            borderRadius: 50,
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

export default LiveQuizInfo;
const styles = StyleSheet.create({
  container: {
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
    borderColor: '#fff',
    borderRadius: 12,
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
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
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
