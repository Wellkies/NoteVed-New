import React, {useState, useEffect} from 'react';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import i18n from 'i18next';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Colors from '../../../assets/Colors';
import {device_height, device_width} from '../style';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
import {
  getAllSubByCourseIdAPI,
  selectAllSubByCourseIdInfo,
  selectAllSubByCourseIdStatus,
} from '../../redux/reducers/GetAllSubByCourseIdReducer';

import {handleSetExamName} from '../../redux/reducers/ExamTestNameReducer';
import {ProgressBar} from 'react-native-paper';
import {selectUserInfo} from '../../redux/reducers/loginReducer';
import {
  getChildProgressDetailAPI,
  selectChildDetailData,
} from '../../redux/reducers/GetChildProgressDetailReducer';
import * as Progress from 'react-native-progress';

const Tab = createBottomTabNavigator();

const SubjectLevel = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const {t: trans, i18n} = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [topicId, setTopicId] = useState('');
  const {
    // stageid = '',
    // boardid = '',
    // scholarshipId = '',
    // scholarshipName = '',
    coursename = '',
    subjectname = '',
    courseid = '',
  } = route.params;
  console.log(route.params,'@route.params')
  console.log(courseid, '==========courseid');
  //console.log(route.params, '===============route.params');
  // const [loading, setLoading] = useState(false);
  // const SchlrshipId = 'NVOOKADA1690811843420'
  const TopicBySubjectId = useAppSelector(selectTopicDetailsInfo);
  const TopicLoad = useAppSelector(selectTopicDetailsStatus);

  const filterData = TopicBySubjectId.map(rec => rec.topicid);
  // TopicBySubjectId.filter((rec) => rec.sltopic == 1)
  const topicID = filterData[0];
  console.log(
    topicID,
    '================topicID***************',
    topicId,
    '=============topicId******************',
    filterData,
  );
  // console.log(TopicBySubjectId, '==============TopicBySubjectId');
  // useEffect(() => {
  //   dispatch(getTopicBySubIdAPI(subjectid));
  //   // setTopicId(topicID)
  //   const data = {
  //     topicid: topicID,
  //     childid: childid,
  //   };
  //   dispatch(getContentByTopicIdAPI(data));
  //   // setTimeout(() => {
  //   // }, 2000)
  //   // const data = {
  //   //   stageid,
  //   //   boardid,
  //   //   scholarshipid: scholarshipId,
  //   // };
  //   // dispatch(getSubjectByClassAPI(data));
  //   return () => {};
  // }, [topicID]);

  // const ContentByTopicId = useAppSelector(selectContentDetailsInfo);
  // const {reviewquestionsets = []} = ContentByTopicId[0]
  //   ? ContentByTopicId[0]
  //   : [];
  // const ContentLoad = useAppSelector(selectContentDetailsStatus);
  // console.log(ContentByTopicId, '==============ContentByTopicId');
  // console.log(reviewquestionsets, '==============reviewquestionsets');

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
    // stageid: string;
    // boardid: string;
    classname: string;
  }
  const {
    _id: id = '',
    // stageid = '',
    // boardid = '',
    childid = '',
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
  console.log(childid, '@childid1');
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

  const handleTabSelect = (sltopic, topicid, childid) => {
    setSelectedIndex(sltopic);
    const data = {
      topicid: topicid,
      childid: childid,
    };
    dispatch(getContentByTopicIdAPI(data));
  };
  useEffect(() => {
    dispatch(getAllSubByCourseAPI());
    const data = {
      courseid: courseid,
    };
    dispatch(getAllSubByCourseIdAPI(data));
    return () => {};
  }, []);
  useEffect(() => {
    const data = {
      courseid: courseid,
      childid: childid,
    };
    dispatch(getChildProgressDetailAPI(data));
    return () => {};
  }, []);
  console.log(courseid,'@courseid2')
  const SubjectByCourse = useAppSelector(selectChildDetailData);
  console.log(SubjectByCourse, '@SubjectByCourse1');
  //const SubjectByCourse = useAppSelector(selectAllSubjectsInfo);
  const SubLoading = useAppSelector(selectAllSubjectsStatus);
  const SubByCourseID = useAppSelector(selectAllSubByCourseIdInfo);
  //const SubLoading = useAppSelector(selectAllSubByCourseIdStatus);
  console.log(SubByCourseID, '========SubByCourseID');

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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 12,
            marginHorizontal: 20,
            paddingVertical: 6,
            paddingHorizontal: 25,
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              position: 'absolute',
              top: 3,
              left: 0,
            }}>
            <MaterialIcons
              name="arrow-back"
              size={35}
              style={{color: '#FFFFFF'}}
            />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text
              style={{
                color: '#FFFFFF',
                fontWeight: '600',
                fontSize: 20,
                textAlign: 'center',
              }}>
              {trans(coursename + ' ' + subjectname)}
            </Text>
          </View>
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
                    } = item;
                    //console.log(topics[0], '@topics%%%%');
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
                          dispatch(getChildProgressDetailAPI(bodydata));
                          //dispatch(getTopicBySubIdAPI(bodydata));
                          // dispatch(getTopicBySubIdAPI(subjectid));
                          navigation.navigate('TopicDetails', {
                            coursename: coursename,
                            subjectname: subjectname,
                            subjectid: subjectid,
                          });
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            backgroundColor: 'rgba(0,255,0,0.1)',
                            width: device_width * 0.95,
                            height: device_height * 0.09,
                            marginHorizontal: 10,
                            paddingHorizontal: 10,
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
                            <Image
                              source={require('../../../assets/people.png')}
                              style={{
                                height: device_height * 0.21,
                                width: device_width * 0.15,
                                resizeMode: 'contain',
                                tintColor: '#f1a722',
                              }}
                            />
                            <Text
                              style={{
                                color: '#f1a722',
                                fontWeight: '500',
                                fontSize: 20,
                              }}>
                              {trans(subjectname)}
                            </Text>
                          </View>
                          <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                position:'absolute',
                                right: 10,
                                bottom: 20,
                                //width: '30%',
                                //justifyContent: 'flex-end',
                              }}>
                              <Text
                                style={{
                                  fontWeight: '600',
                                  color: '#def',
                                  fontSize: 16,
                                  marginRight: 10,
                                }}>
                                {parseFloat(`${proData * 100}% `).toFixed(2)}
                                {'%'}
                              </Text>
                              <Progress.Circle
                                progress={proData}
                                size={35}
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
            {/* <ScrollView showsVerticalScrollIndicator={false}>
              {SubjectByCourse.length > 0 ? (
                <>
                  {SubjectByCourse.map((item, index) => {
                    const {
                      _id = '',
                      subjectid = '',
                      subjectImage = '',
                      subjectname = '',
                    } = item;

                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          const bodydata = {
                            subjectid: subjectid,
                            childid: childid,
                          };
                          dispatch(getTopicBySubIdAPI(bodydata));
                          // dispatch(getTopicBySubIdAPI(subjectid));
                          navigation.navigate('TopicDetails', {
                            coursename: coursename,
                            subjectname: subjectname,
                            subjectid: subjectid,
                          });
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            backgroundColor: 'rgba(0,255,0,0.1)',
                            width: device_width * 0.95,
                            height: device_height * 0.09,
                            marginHorizontal: 10,
                            paddingHorizontal: 10,
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
                            <Image
                              source={require('../../../assets/people.png')}
                              style={{
                                height: device_height * 0.21,
                                width: device_width * 0.15,
                                resizeMode: 'contain',
                                tintColor: '#f1a722',
                              }}
                            />
                            <Text
                              style={{
                                color: '#f1a722',
                                fontWeight: '500',
                                fontSize: 20,
                              }}>
                              {trans(subjectname)}
                            </Text>
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
            </ScrollView> */}
          </>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SubjectLevel;
