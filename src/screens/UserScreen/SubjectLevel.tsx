import React, { useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import i18n from 'i18next';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Colors from '../../../assets/Colors';
import { device_height, device_width } from '../style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import LoadingScreen from '../CommonScreens/LoadingScreen';
import { useNavigation } from '@react-navigation/native';
import { selectStudentInfo } from '../../redux/reducers/StudentInfoReducer';
import { useAppSelector } from '../../redux/store/reducerHook';
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
import { getProductByIdAPI } from '../../redux/reducers/GetProductDetailsReducer';
import { getChildAllOrdersAPI } from '../../redux/reducers/GetAllOrdersReducer';
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
import { useTranslation } from 'react-i18next';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getTopicBySubIdAPI, selectTopicDetailsInfo } from '../../redux/reducers/GetTopicDetailsReducer';
import { selectTopicDetailsStatus } from '../../redux/reducers/GetTopicDetailsFormTopicIdReducer';
import { getContentByTopicIdAPI, selectContentDetailsInfo, selectContentDetailsStatus } from '../../redux/reducers/GetContentDetailsReducer';
import { handleSetExamName } from '../../redux/reducers/ExamTestNameReducer';

const Tab = createBottomTabNavigator();

const SubjectLevel = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const { t: trans, i18n } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [topicId, setTopicId] = useState('')
  const {
    // stageid = '',
    // boardid = '',
    // scholarshipId = '',
    // scholarshipName = '',
    coursename = '',
    subjectname = '',
    subjectid = ''
  } = route.params;
  console.log(route.params, '===============route.params');
  // const [loading, setLoading] = useState(false);
  // const SchlrshipId = 'NVOOKADA1690811843420'
  const TopicBySubjectId = useAppSelector(selectTopicDetailsInfo);
  const TopicLoad = useAppSelector(selectTopicDetailsStatus);

  const filterData = TopicBySubjectId.map((rec) => rec.topicid)
  // TopicBySubjectId.filter((rec) => rec.sltopic == 1)
  const topicID = filterData[0]
  console.log(
    topicID, "================topicID***************",
    topicId, "=============topicId******************",
    filterData);
    // console.log(TopicBySubjectId, '==============TopicBySubjectId');
    useEffect(() => {
      dispatch(getTopicBySubIdAPI(subjectid))
      // setTopicId(topicID)
      dispatch(getContentByTopicIdAPI(topicID))
    // setTimeout(() => {
    // }, 2000)
    // const data = {
    //   stageid,
    //   boardid,
    //   scholarshipid: scholarshipId,
    // };
    // dispatch(getSubjectByClassAPI(data));
    return () => { };
  }, [topicID]);

  const ContentByTopicId = useAppSelector(selectContentDetailsInfo);
  const ContentLoad = useAppSelector(selectContentDetailsStatus);
  console.log(ContentByTopicId, '==============ContentByTopicId');

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
    // stageid: string;
    // boardid: string;
    classname: string;
  }
  // const {
  //     _id: id = '',
  //     // stageid = '',
  //     // boardid = '',
  //     childid = '',
  //     stage = '',
  //     scholarship = [],
  //     name: userName = '',
  //     fname = '',
  //     gender = '',
  //     lname = '',
  //     email = '',
  //     phone = '',
  //     // cityname = '',
  //     image = '',
  //     age = '',
  //     address = '',
  //     // cityid = '',
  //     language = '',
  //     // coordinates='',
  // } = childInfo;

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

  const handleTabSelect = (sltopic, topicid) => {
    setSelectedIndex(sltopic);
    dispatch(getContentByTopicIdAPI(topicid))
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={{
          width: device_width,
          height: device_height,
          flex: 1,
          alignSelf: 'center',
          // borderWidth: 1,
          backgroundColor: '#feecde',
        }}
        resizeMode="cover"
      // source={require('../../../assets/testBG2.jpg')}
      >
        <Header
          label1={trans('Subject Level')}
          label2={``}
          // label2={`${trans('Std')}-${stage}`}
          isbackIconShow={true}
          functionName={() => navigation.goBack()}
        />
        {TopicLoad == 'loading' ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: device_height * 0.9,
              width: device_width,
              // backgroundColor: Colors.secondary,
            }}>
            <LoadingScreen flag={TopicLoad == 'loading'} />
          </View>
        ) : (
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                disabled={true}
                //   onPress={navigationfunc}
                style={{
                  // backgroundColor: '#fee2a3',
                  backgroundColor: '#febcac',
                  paddingVertical: 35,
                  height: device_height * 0.25,
                  width: device_width * 0.94,
                  paddingHorizontal: 25,
                  alignSelf: 'center',
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: '#999',
                  elevation: 15,
                  marginTop: 10
                }}>
                <Text
                  style={{
                    width: '50%',
                    fontSize: 30,
                    fontWeight: '500',
                    color: '#474747',
                    // marginLeft:30,
                  }}>
                  {subjectname}
                </Text>
                <View>
                  <Text
                    style={{
                      // width: '120%',
                      fontSize: 20,
                      fontWeight: '300',
                      color: '#474747',
                      // marginLeft:30,
                    }}>
                    {`Duration: 15 Days, 11+ Courses`}
                  </Text>
                </View>

                <FastImage
                  style={{
                    marginTop: 5,
                    height: device_height * 0.15,
                    width: device_width * 0.4,
                    // borderWidth:1
                  }}
                  // source={}
                  resizeMode="center"
                />
              </TouchableOpacity>
              {/* <NavigationContainer independent={true}>
                <Tab.Navigator>
                  <Tab.Screen
                    name="Screen1"
                    component={() => (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text>Screen 1</Text>
                      </View>
                    )}
                    options={{
                      tabBarLabel: 'Tab 1',
                      tabBarButton: props => (
                        <TouchableOpacity
                          {...props}
                          style={{
                            flex: 1,
                            alignItems: 'center', // Align items in the tab
                            justifyContent: 'center', // Center content vertically
                          }}>
                          <Text
                            style={{
                              color: props.focused ? '#ffffff' : '#474747',
                            }}>
                            Tab 1
                          </Text>
                        </TouchableOpacity>
                      ),
                    }}
                  />
                  <Tab.Screen
                    name="Screen2"
                    component={() => (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text>Screen 2</Text>
                      </View>
                    )}
                    options={{
                      tabBarLabel: 'Tab 2',
                      tabBarButton: props => (
                        <TouchableOpacity
                          {...props}
                          style={{
                            flex: 1,
                            alignItems: 'center', // Align items in the tab
                            justifyContent: 'center', // Center content vertically
                          }}>
                          <Text
                            style={{
                              color: props.focused ? '#ffffff' : '#474747',
                            }}>
                            Tab 2
                          </Text>
                        </TouchableOpacity>
                      ),
                    }}
                  />
                  <Tab.Screen
                    name="Screen3"
                    component={() => (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text>Screenw 3</Text>
                      </View>
                    )}
                    options={{
                      tabBarLabel: 'Tab 3',
                      tabBarButton: props => (
                        <TouchableOpacity
                          {...props}
                          style={{
                            flex: 1,
                            alignItems: 'center', // Align items in the tab
                            justifyContent: 'center', // Center content vertically
                          }}>
                          <Text
                            style={{
                              color: props.focused ? '#ffffff' : '#474747',
                              padding: 10,
                              paddingHorizontal: 40,
                              backgroundColor: '#f4645b',
                              borderRadius: 10,
                            }}>
                            Tab 3
                          </Text>
                        </TouchableOpacity>
                      ),
                    }}
                  />
                </Tab.Navigator>
              </NavigationContainer> */}
              <View style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                marginVertical: 10,

              }}>
                {TopicBySubjectId.map((item, index) => {
                  const {
                    id = '',
                    topicname = '',
                    sltopic = '',
                    topicid = '',
                    topicimage = '',
                    subjectid = '',
                    subjectname = '',
                    slsubject = '',
                  } = item;
                  const isselectedBtn = sltopic == selectedIndex ? true : false;
                  return (
                    <View key={index}
                      style={{
                        width: device_width * 0.33,
                        height: 55,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {TopicBySubjectId.length == 0 ? (
                        <></>
                      ) : (
                        <TouchableOpacity
                          key={index}
                          style={{
                            width: '80%',
                            height: 45,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            borderColor: isselectedBtn ? '#ee7c75' : '#fff',
                            backgroundColor: isselectedBtn ? '#ee7c75' : '#fff',
                          }}
                          onPress={() => {
                            handleTabSelect(sltopic, topicid)
                            // setSelectedIndex(sltopic);
                            // setContentList(contentList);
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '900',
                              // color: isselectedBtn ? '#000' : '#ee7c75',
                              color: '#000',
                              // textDecorationLine: isselectedBtn
                              //   ? 'underline'
                              //   : 'none',
                              textAlign: 'center',
                            }}>
                            {topicname}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}
              </View>
              <View style={{
                // marginVertical: 10,
                width: '100%',
                marginLeft: 20
              }}>
                <Text style={{
                  fontWeight: '800',
                  color: '#000',
                  fontSize: 18
                }}>
                  Course Content
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // backgroundColor: Colors.secondary,
                }}>
                <View
                  style={{
                    flex: 1,
                    // flexDirection: 'row',
                    // borderWidth:1,
                    height: device_height * 0.9,
                    alignItems: 'center',
                    // flexWrap: 'wrap',
                    // justifyContent: 'center',
                  }}>
                  {ContentLoad == 'loading' ? (
                    <View
                      style={{
                        // flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: device_height * 0.5,
                        width: device_width,
                        // backgroundColor: Colors.secondary,
                      }}>
                      <ActivityIndicator
                        size={'large'}
                        color={'crimson'}
                        visible={ContentLoad}
                      />
                    </View>
                  ) : (
                    <>
                      {ContentByTopicId.length > 0 ? (
                        <>
                          {ContentByTopicId.map((item, index) => {
                            const {
                              _id = '',
                              contentid = '',
                              slcontent = '',
                              contentimage = '',
                              contentset = '',
                              concepts = [],
                              isLock = false,
                              isPremium = true,
                              quiz = [],
                              slsubject = '',
                              sltopic = '',
                              subjectid = '',
                              subjectimage = '',
                              subjectname = '',
                              timeDuration = '',
                              topicid = '',
                              topicimage = '',
                              topicname = '',
                              videos = []
                            } = item

                            // console.log(item, "item..................")
                            // const Revdata = {
                            //   stageid,
                            //   subjectid,
                            //   boardid,
                            //   scholarshipId,
                            //   // childid,
                            // };
                            return (
                              <TouchableOpacity
                                key={index}
                                style={{
                                  width: device_width * 0.95,
                                  marginHorizontal: 10,
                                  marginVertical: 5,
                                  borderWidth: 1,
                                  borderColor: '#666',
                                  borderRadius: 10,
                                  // elevation: 10,
                                  backgroundColor: '#febcac',
                                  alignItems: 'center',
                                  paddingVertical: 5,
                                  paddingHorizontal: 5,
                                  flexDirection: 'row',
                                  justifyContent: 'space-around',
                                }}
                                onPress={async () => {
                                  // let quizData = [...ContentQuiz];
                                  // if (isReattempt) {
                                  //   quizData = quizData.map(rec => {
                                  //     return {
                                  //       ...rec,
                                  //       selectedAns: '',
                                  //     };
                                  //   });
                                  // }

                                  // dispatch(
                                  //   handleSetExamName('SubjectRevision')
                                  // );
                                  navigation.navigate('MockTests', {
                                    screenName: 'ExamSets',
                                    subjectName: subjectname,
                                    chapterName: topicname,
                                    examSet: contentset,
                                    contentid: contentid,
                                    isReattempt: false,
                                    // studentdata: studentdata,
                                    ExamQuestionsets: quiz,
                                    // scholarshipid: scholarshipid,
                                    // boardid: boardid,
                                    // scholarshipName: scholarshipName,
                                    subjectId: subjectid,
                                    timeDuration: timeDuration,
                                    is2ndAvailable: index,
                                    topicid: topicid,
                                  });

                                  // dispatch(getTopicBySubClassAPI(Revdata));
                                  // navigation.navigate('SubjectsDetails', {
                                  //   subjectid: subjectid,
                                  //   subjectname: subjectname,
                                  //   subjectImage: subjectimage,
                                  //   quiz: quiz,
                                  //   contentid: contentid ,
                                  //   slcontent: slcontent,
                                  //   contentimage: contentimage,
                                  //   contentset: contentset,
                                  //   slsubject: slsubject ,
                                  //   sltopic: sltopic ,
                                  //   timeDuration: timeDuration ,
                                  //   topicid: topicid ,
                                  //   topicimage: topicimage ,
                                  //   topicname: topicname ,
                                  // });
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: 10,
                                  }}>
                                  <View
                                    style={{
                                      alignItems: 'center',
                                      paddingVertical: 5,
                                      paddingHorizontal: 5,
                                      flexDirection: 'row',
                                      // justifyContent: 'space-around',
                                      // borderWidth:1,
                                      width: device_width * 0.8,
                                    }}>
                                    <View
                                      style={{
                                        width: 55,
                                        height: 55,
                                        // borderColor: Colors.lightgrey,
                                        // borderWidth: 1.5,
                                        // elevation: 5,
                                        // backgroundColor: '#fff',
                                        // borderRadius: 10,
                                      }}>
                                      {/* {subjectimage != '' ? (
                                    <Image
                                      style={{
                                        width: 75,
                                        height: 75,
                                        resizeMode: 'cover',
                                        borderRadius: 50,
                                        alignSelf: 'center',
                                      }}
                                      source={{ uri: subjectimage }}
                                    />
                                  ) : ( */}
                                      <Image
                                        style={{
                                          width: 55,
                                          height: 55,
                                          // resizeMode: 'cover',
                                          // borderRadius: 15,
                                          alignSelf: 'center',
                                        }}
                                        source={require('../../../assets/test.png')}
                                      />
                                      {/* )} */}
                                    </View>
                                    <View
                                      style={{
                                        justifyContent: 'flex-start',
                                        // backgroundColor: Colors.white,
                                        width: device_width * 0.5,
                                        // borderWidth: 1,
                                        paddingHorizontal: 15,
                                      }}>
                                      <Text
                                        style={{
                                          fontWeight: '600',
                                          color: '#333',
                                          fontSize: 14,
                                        }}>
                                        {`${contentset}`}
                                      </Text>
                                    </View>
                                  </View>
                                  <MaterialIcons
                                    name="chevron-right"
                                    color={'#333'}
                                    size={25}
                                    style={{
                                      marginLeft: 10,
                                      fontWeight: '900',
                                    }}
                                  />
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
                                // borderWidth: 1,
                                // borderLeftWidth:1,
                                width: '85%',
                              }}>
                              {trans('Currently No Content Added')}
                            </Text>
                          </View>
                        </>
                      )}
                    </>
                  )}
                </View>
              </View>
            </ScrollView>
          </>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SubjectLevel;
