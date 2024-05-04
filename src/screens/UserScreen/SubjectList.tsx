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
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import i18n from 'i18next';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Colors from '../../../assets/Colors';
import {device_height, device_width} from '../style';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
import LinearGradient from 'react-native-linear-gradient';
import {
  getAllSubByCourseAPI,
  selectAllSubjectsInfo,
  selectAllSubjectsStatus,
} from '../../redux/reducers/GetSubjectByCourseReducer';
import {getTopicBySubIdAPI} from '../../redux/reducers/GetTopicDetailsReducer';
import {
  getAllCoursesAPI,
  selectAllCoursesInfo,
} from '../../redux/reducers/GetAllCoursesReducer';

const SubjectList = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const {t: trans, i18n} = useTranslation();
  const {stageid = '', boardid = '', coursename = ''} = route.params;
  console.log(route.params, '===============route.params');
  // const [loading, setLoading] = useState(false);
  // const SchlrshipId = 'NVOOKADA1690811843420';
  // const ScholarshipName = 'Adarsha';
  useEffect(() => {
    // const data = {
    //   stageid,
    //   boardid,
    //   scholarshipid: SchlrshipId,
    // };
    // dispatch(getSubjectByClassAPI(data));
    dispatch(getAllSubByCourseAPI());
    return () => {};
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      dispatch(getAllCoursesAPI());
      BackHandler.addEventListener('hardwareBackPress', () => {
        // navigation.goBack();
        BackHandler.exitApp();
        return true;
      });
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        BackHandler.exitApp();
        // navigation.goBack();
        return true;
      });
    };
  }, []);

  useEffect(() => {
    dispatch(getAllCoursesAPI());
  }, []);

  // const SubjectByCourse = useAppSelector(selectAllSubjectsInfo);
  const SubLoading = useAppSelector(selectAllSubjectsStatus);
  const SubjectByCourse = useAppSelector(selectAllCoursesInfo);

  // console.log(SubjectByCourse, '==============SubjectByCourse');

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
      //   scholarshipid: SchlrshipId,
      // };
      dispatch(getAllSubByCourseAPI());
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
  const ListColor = ['#0AC671', '#06A05A', '#0ED76D'];
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={{
          width: device_width,
          height: device_height,
          flex: 1,
          // alignSelf: 'center',
          // borderWidth: 1,
          backgroundColor: '#222222',
          //backgroundColor: '#404040'
        }}
        resizeMode="contain"
        // source={require('../../../assets/testBG3.jpg')}
      >
        {/* <Header
          label1={trans('Subject List')}
          label2={``}
          // label2={`${trans('Std')}-${stage}`}
          isbackIconShow={true}
          functionName={() => navigation.goBack()}
        /> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginLeft: 10,
            paddingTop: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 30,
                color: '#FFFFFF',
              }}>
              {'Example App'}
            </Text>
          </View>
          <View
            style={{
              marginRight: 10,
            }}>
            <TouchableOpacity>
              <MaterialIcons
                style={{
                  fontWeight: 'bold',
                  color: '#0DFF8F',
                }}
                name="menu"
                size={50}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            marginLeft: 10,
          }}>
          <Text
            style={{
              //fontWeight: 'bold',
              fontSize: 18,
              alignItems: 'center',
              // fontStyle: 'italic',
              color: '#0DFF8F',
            }}>
            {'Hello'}
          </Text>
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
            <ScrollView showsVerticalScrollIndicator={true}>
              <View
                //disabled={true}
                //   onPress={navigationfunc}
                style={{
                  // backgroundColor: '#fee2a3',
                  //backgroundColor: '#fec993',
                  //paddingVertical: 25,
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignContent: 'center',
                  backgroundColor: '#0DFF8F',
                  paddingVertical: 20,
                  width: device_width * 0.95,
                  height: device_height * 0.25,
                  paddingHorizontal: 25,
                  margin: 10,
                  //   borderWidth: 2,
                  borderRadius: 20,
                }}>
                <View>
                  <Text
                    style={{
                      // width: '120%',
                      fontSize: 40,
                      fontWeight: 'bold',
                      color: 'black',
                      // marginLeft:30,
                    }}>
                    {'3 Sutras'}
                  </Text>
                  <View
                    style={{
                      //width: '83%',
                      width: device_width * 0.4,
                      borderBottomWidth: 0.5,
                      paddingBottom: 12,
                      borderColor: 'black',
                    }}>
                    <Text
                      style={{
                        // width: '120%',
                        fontSize: 24,
                        fontWeight: '400',
                        color: 'black',
                        // marginLeft:30,
                      }}>
                      {`To Prepare For ${coursename}`}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 20,
                      width: device_width * 0.3,
                      //width: '44%',
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#000000',
                        padding: 2,
                        // borderRadius: 50,
                        borderRadius: 20,
                      }}>
                      <Text style={{color: '#FFFFFF', textAlign: 'center'}}>
                        {'Read More'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    // width: '100%',
                    // height: '100%',
                    // marginTop:32,
                    // marginRight:32,
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                  }}>
                  <Image
                    style={{
                      // width: 180,
                      // height: 180,
                      width: device_width * 0.4,
                      height: device_height * 0.2,
                      resizeMode: 'contain',
                      paddingLeft: 10,
                      // right: -10,
                      // borderRadius: 50,
                      // alignSelf: 'center',
                    }}
                    source={require('../../../assets/p1.png')}
                  />
                </View>
                {/* <FastImage
                  style={{
                    marginTop: 5,
                    height: device_height * 0.15,
                    width: device_width * 0.4,
                    // borderWidth:1
                  }}
                  // source={}
                  resizeMode="center"
                /> */}
              </View>
              <View
                style={
                  {
                    //   flex: 1,
                    //   justifyContent: 'center',
                    //   alignItems: 'center',
                    // backgroundColor: Colors.secondary,
                  }
                }>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontWeight: '900',
                      color: '#2EFFA1',
                      fontSize: 20,
                      marginLeft: 15,
                      marginTop: 12,
                      marginBottom: 15,
                    }}>
                    {'Categories'}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      height: 1,
                      backgroundColor: '#195FF2',
                      marginLeft: 10,
                      marginRight: 15,
                    }}
                  />
                </View>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  persistentScrollbar={true}
                  horizontal={true}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      // borderWidth:1,
                      // height: device_height * 0.9,
                      alignItems: 'center',
                      flexWrap: 'nowrap',
                      //   justifyContent: 'center',
                      //width: '100%',
                      width: device_width * 2,
                    }}>
                    {SubjectByCourse.length > 0 ? (
                      <>
                        {SubjectByCourse.map((item, index) => {
                          const {
                            slcourse = '',
                            courseid = '',
                            coursename = '',
                            description = '',
                            image = '',
                            createon = '',
                            updatedon = '',
                          } = item;
                          // const {
                          //   _id = '',
                          //   subjectImage = '',
                          //   subjectid = '',
                          //   subjectname = '',
                          // } = item;
                          // console.log(item, 'item..................');
                          return (
                            <TouchableOpacity
                              key={index}
                              onPress={() => {
                                dispatch(getTopicBySubIdAPI(courseid));
                                navigation.navigate('SubjectLevel', {
                                  // stageid: '5',
                                  // boardid: '1',
                                  // scholarshipId: 'NVOOKADA1690811843420',
                                  // coursename: coursename,
                                  // subjectname: subjectname,
                                  // subjectid: subjectid,
                                  coursename: coursename,
                                  subjectname: description,
                                  subjectid: courseid,
                                });
                              }}
                              //<LinearGradient
                              //colors={[ '#289C0E','#00FF7F']}
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor:
                                  ListColor[index % ListColor.length],
                                paddingVertical: 25,
                                width: device_width * 0.35,
                                height: device_height * 0.15,
                                // width: device_width * 0.4,
                                // height: device_height * 0.2,
                                paddingHorizontal: 15,
                                margin: 5,
                                //elevation: 15,
                                borderWidth: 0.5,
                                borderColor: '#FFFFFF',
                                borderRadius: 20,
                                marginBottom: 10,
                              }}>
                              <Text
                                style={{
                                  width: '100%',
                                  fontSize: 18,
                                  fontWeight: 'bold',
                                  color: '#FFFFFF',
                                  // borderWidth: 1,
                                  //color: '#333',
                                  // marginLeft: 30,
                                }}>
                                {coursename}
                              </Text>
                              {/* <Text
                                style={{
                                  fontSize: 14,
                                  fontWeight: '700',
                                  textAlign: 'center',
                                  color: '#333',
                                  flex:1
                                }}>
                                {description}
                              </Text> */}
                              <View
                                style={{
                                  borderColor: Colors.lightgrey,
                                  // borderWidth: 1.5,
                                  // elevation: 5,
                                  // backgroundColor: '#fff',
                                  borderRadius: 50,
                                  marginLeft: 50,
                                  marginTop: 20,
                                }}>
                                {image != '' ? (
                                  <Image
                                    style={{
                                      width: 50,
                                      height: 50,
                                      resizeMode: 'cover',
                                      right: -10,
                                      // borderRadius: 50,
                                      alignSelf: 'center',
                                    }}
                                    source={{uri: image}}
                                  />
                                ) : (
                                  <Image
                                    style={{
                                      width: 75,
                                      height: 75,
                                      resizeMode: 'cover',
                                      right: -10,
                                      // borderRadius: 50,
                                      alignSelf: 'center',
                                    }}
                                    source={require('../../../assets/test.png')}
                                  />
                                )}
                              </View>
                              {/* </LinearGradient> */}
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
                  </View>
                </ScrollView>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: 10,
                    marginRight: 10,
                    marginLeft: 10,
                  }}>
                  <View
                    style={{
                      paddingBottom: 10,
                    }}>
                    <Text
                      style={{
                        fontWeight: '900',
                        fontSize: 18,
                        color: '#2EFFA1',
                      }}>
                      {'Level Cleared'}
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingBottom: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Details');
                      }}
                      style={{
                        backgroundColor: '#195FF2',
                        borderRadius: 10,
                        width: device_width * 0.2,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#FFFFFF',
                          textAlign: 'center',
                          paddingHorizontal: 10,
                          paddingVertical: 2,
                        }}>
                        {'Details'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: '#2EFFA1',
                    padding: 40,
                    marginVertical: 10,
                    marginHorizontal: 14,
                    flex: 1,
                  }}></View>
              </View>
              <View
                style={{
                  borderRadius: 20,
                  backgroundColor: '#195FF2',
                  width: device_width * 0.92,
                  height: device_height * 0.11,
                  marginVertical: 12,
                  marginHorizontal: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    margin: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '600',
                      color: '#F5FF00',
                    }}>
                    {trans('Congratulations')}
                  </Text>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 14,
                      marginTop: 5,
                    }}>
                    {trans('You are level 4 certified learner')}
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 16,
                        marginTop: 5,
                        textDecorationLine: 'underline',
                      }}>
                      {trans('Download Certificate')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    right: 15,
                    //bottom: 0,
                    top: 20,
                  }}>
                  <Image
                    style={{
                      width: 53,
                      height: 53,
                      resizeMode: 'contain',
                    }}
                    source={require('../../../assets/p2.png')}
                  />
                </View>
              </View>
            </ScrollView>
          </>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SubjectList;
