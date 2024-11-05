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
    selectLiveQuizTopStudentStatus,
  } from '../../redux/reducers/GetLiveQuizTopStudentReducer';
  import {
    getLiveQuizAPI,
    selectLiveQuizData,
    selectLiveQuizStatus,
  } from '../../redux/reducers/LiveQuizReducer';
  import LoadingScreen from '../CommonScreens/LoadingScreen';
  import {
    getPastLiveQuizAPI,
    selectPastLiveQuizData,
    selectPastLiveQuizStatus,
  } from '../../redux/reducers/GetPastLiveQuizReducer';
  import Header from '../CommonScreens/Header';
import { selectUserInfo } from '../../redux/reducers/loginReducer';
  
  const LiveQuizLeaderBoardList = ({route}) => {
    const dispatch = useDispatch<any>();
    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
    const device_width = Dimensions.get('window').width;
    const device_height = Dimensions.get('window').height;
    const navigation = useNavigation();
    const todayDate = new Date();
    const {t: trans, i18n} = useTranslation();
  
    // const {
  
    //   scholarshipid = '',
    //   // boardid= '',
  
    //   scholarshipName = '',
    // } = route.params;
    const ListColor = ['#fee2a3', '#f6c4b9', '#c3ccf5', '#76f0c7'];
  
    const ref = useRef();
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
      //boardname: string;
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

    const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      const {width, height} = window;
      setOrientation(height >= width ? 'portrait' : 'landscape');
    });
    console.log(orientation, 'Orientation');
    return () => subscription?.remove();
  }, [orientation]);

    const Pastquiz = useAppSelector(selectPastLiveQuizData);
    const PastquizLoading = useAppSelector(selectPastLiveQuizStatus);
    const pastquizId = {
      boardid,
    };
    useEffect(() => {
      dispatch(getPastLiveQuizAPI());
      navigation.addListener('focus', () => {
        dispatch(getPastLiveQuizAPI());
        BackHandler.addEventListener('hardwareBackPress', () => {
          navigation.goBack();
          return true;
        });
      });
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', () => {
          // handleBackButtonClick();
          navigation.goBack();
          return true;
        });
      };
    }, []);
  
    const liveQuizLeaderBoard = useAppSelector(selectLiveQuizTopStudentData);
    const LeaderBoardLoading = useAppSelector(selectLiveQuizTopStudentStatus);
  
    const [topData, settopData] = useState(
      liveQuizLeaderBoard ? liveQuizLeaderBoard : [],
    );
    const handleTopStudent = (quizID: any) => {
      const TopstudentData = {
        quizid: quizID,
      };
      dispatch(getLiveQuizTopStudentAPI(TopstudentData));
      // let toplist = [...liveQuizLeaderBoard];
      // settopData(liveQuizLeaderBoard);
      setModalStatus(true);
    };
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor={'#263d2d'} barStyle="light-content" />
        <>
          {PastquizLoading == 'loading' ? (
            <LoadingScreen flag={PastquizLoading == 'loading'} />
          ) : (
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
              <Header
                label1={trans('See Leaderboard')}
                label2={''}
                isbackIconShow={true}
                functionName={() => navigation.goBack()}
              />
              {Pastquiz?.length != '' ? (
                <>
                  <View
                    style={{
                      height: 70,
                      width: '96%',
                      alignSelf: 'center',
                      alignItems: 'flex-start',
                      marginTop: 10,
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
                        height: 68,
                        flexDirection: 'row',
                        alignItems: 'center',
                        // justifyContent: 'space-around',
                        backgroundColor: 'burlywood',
                        paddingHorizontal: 10,
                      }}>
                      <MaterialIcons name="info" color={'green'} size={30} />
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#333',
                          width: '88%',
                          fontWeight: '600',
                          marginLeft: 15,
                        }}>
                        {trans('Select one to see leaderboard for that date')}
                      </Text>
                    </View>
                  </View>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                      style={{
                        height: device_height * 0.94,
                        width: '100%',
                        paddingBottom: 10,
                        alignItems: 'center',
                        // borderWidth: 1,
                        // borderColor: 'yellow',
                      }}>
                      <View
                        style={{
                          width: device_width,
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          paddingVertical: 10,
                          paddingHorizontal: 10,
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          // flex:1,
                          // height: device_height * 0.83,
                          // height: '84%',
                          // borderWidth: 1,
                          // borderColor: 'red',
                        }}>
                        {Pastquiz?.map((item, index) => {
                          const {starttime = '', quizid = ''} = item;
                          let startDate = new Date(starttime)
                            .toISOString()
                            .split('T')[0];
                          return (
                            <TouchableOpacity
                              key={index}
                              onPress={() => {
                                // dispatch(livequizleaderboardstate());
                                handleTopStudent(quizid);
                              }}
                              style={{
                                backgroundColor: 'rgba(230,230,230, 0.1)',
                                borderWidth: 1,
                                borderColor: '#aaa',
                                borderRadius: 8,
                                marginVertical: 5,
                                marginHorizontal: 5,
                                paddingVertical: 12,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '29%',
                                // alignSelf: 'center',
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 12,
                                  fontWeight: '600',
                                  color: '#fff',
                                }}>
                                {`${moment(startDate).format('DD-MMM-YYYY')}`}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  </ScrollView>
                </>
              ) : (
                <View
                  style={{
                    height: 70,
                    width: '100%',
                    alignSelf: 'center',
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
                    <MaterialIcons name="info" color={'green'} size={30} />
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#333',
                        width: device_width * 0.7,
                        fontWeight: '600',
                      }}>
                      {'   '}
                      {trans('No Top student Available')}
                    </Text>
                  </View>
                </View>
              )}
            </ImageBackground>
          )}
          {modalStatus && liveQuizLeaderBoard.length >= 0 && (
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
                  onPress={() => {
                    // dispatch(livequizleaderboardstate());
  
                    setModalStatus(false);
                  }}
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
                {LeaderBoardLoading == 'loading' ? (
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
                      // color={'#fff'}
                      style={{alignSelf: 'center'}}
                    />
                    <Text
                      style={{
                        // color: '#f1a722',
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
                        {liveQuizLeaderBoard.length > 0 && (
                          <>
                            {liveQuizLeaderBoard.map((item, index) => {
                              const {
                                student_name: name = '',
                                fathername = '',
                                schoolname = '',
                                answerdetails = [],
                                quiz = [],
                                lastexamtotalsecurmark = '',
                                timetaken: lastexamtimetaken = '',
                                percentage = '',
                                securemark = '',
                                studentimage = '',
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
                                    height:device_height*0.18,
                                    marginVertical: 3,
                                    padding: 3,
                                    backgroundColor:
                                      ListColor[index % ListColor.length],
                                    elevation: 5,
                                  }}>
                                  {toOrdinalSuffix(index + 1) == '1st' ||
                                  '2nd' ||
                                  '3rd' ? (
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
                                      <Avatar.Image
                                        source={
                                          toOrdinalSuffix(index + 1) == '1st'
                                            ? require('../../../assets/first.png')
                                            : toOrdinalSuffix(index + 1) == '2nd'
                                            ? require('../../../assets/second.png')
                                            : toOrdinalSuffix(index + 1) == '3rd'
                                            ? require('../../../assets/third.jpg')
                                            : ''
                                        }
                                        size={50}
                                        style={{backgroundColor: 'rebeccapurple'}}
                                      />
                                    </View>
                                  ) : (
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
                                  )}
                                  <View
                                    style={{
                                      width: '65%',
                                      justifyContent: 'center',
                                      paddingVertical: 5,
                                      paddingHorizontal: 15,
                                      // borderWidth:1,
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
                                          <Text
                                            style={{
                                              fontSize: 13,
                                              fontWeight: '700',
                                              color: 'green',
                                            }}>
                                            {lastexamtimetaken.length > 0 &&
                                              `${formattedHours}:${formattedMinutes}:${formattedSeconds}`}
                                          </Text>
                                        </Text>
                                      )}
                                  </View>
                                  <View style={{width: '23%', height: 70,marginBottom:5,justifyContent:'center',alignItems:'center'}}>
                                    <FastImage
                                      style={{
                                        height: '110%',
                                        width: 60,
                                        // marginVertical: 5,
                                        borderRadius: 5,
                                        // borderWidth: 1,
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
                                // marginLeft: 15,
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
                        onPress={() => {
                          // dispatch(livequizleaderboardstate());
  
                          setModalStatus(false);
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
        </>
      </SafeAreaView>
    );
  };
  
  export default LiveQuizLeaderBoardList;
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
    footer: {
      // flex: 1,
      backgroundColor: '#fff',
      // borderTopLeftRadius: 30,
      // borderTopRightRadius: 30,
      paddingHorizontal: 20,
      // paddingVertical: 10,
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
  