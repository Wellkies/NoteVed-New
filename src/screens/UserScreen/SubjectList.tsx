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

  const SubjectByCourse = useAppSelector(selectAllSubjectsInfo);
  const SubLoading = useAppSelector(selectAllSubjectsStatus);

  console.log(SubjectByCourse, '==============SubjectByCourse');

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

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={{
          width: device_width,
          height: device_height,
          flex: 1,
          // alignSelf: 'center',
          borderWidth: 1,
          backgroundColor: '#fff',
        }}
        resizeMode="cover"
        // source={require('../../../assets/testBG2.jpg')}
      >
        <Header
          label1={trans('Subject List')}
          label2={``}
          // label2={`${trans('Std')}-${stage}`}
          isbackIconShow={true}
          functionName={() => navigation.goBack()}
        />
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
              <TouchableOpacity
                disabled={true}
                //   onPress={navigationfunc}
                style={{
                  // backgroundColor: '#fee2a3',
                  backgroundColor: '#fec993',
                  paddingVertical: 25,
                  width: device_width * 0.95,
                  height: device_height * 0.25,
                  paddingHorizontal: 25,
                  margin: 10,
                  //   borderWidth: 2,
                  borderRadius: 20,
                }}>
                <Text
                  style={{
                    // width: '120%',
                    fontSize: 50,
                    fontWeight: 'bold',
                    color: '#474747',
                    // marginLeft:30,
                  }}>
                  {'3 Sutras'}
                </Text>
                <View
                  style={{
                    width: '60%',
                    borderBottomWidth: 0.5,
                    paddingBottom: 15,
                  }}>
                  <Text
                    style={{
                      // width: '120%',
                      fontSize: 20,
                      fontWeight: '400',
                      color: '#474747',
                      // marginLeft:30,
                    }}>
                    {`To Prepare For ${coursename}`}
                  </Text>
                </View>
                <View style={{marginTop: 10, width: '25%'}}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#474747',
                      padding: 5,
                      borderRadius: 50,
                    }}>
                    <Text style={{color: '#fff', textAlign: 'center'}}>
                      {'Read More'}
                    </Text>
                  </TouchableOpacity>
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
              <View
                style={
                  {
                    //   flex: 1,
                    //   justifyContent: 'center',
                    //   alignItems: 'center',
                    // backgroundColor: Colors.secondary,
                  }
                }>
                <Text
                  style={{
                    fontWeight: '900',
                    color: '#f56759',
                    fontSize: 20,
                    marginLeft: 15,
                    marginTop: 12,
                    marginBottom: 15,
                  }}>
                  {'Categories'}
                </Text>
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
                      width: '100%',
                    }}>
                    {SubjectByCourse.length > 0 ? (
                      <>
                        {SubjectByCourse.map((item, index) => {
                          const {
                            // subjectimage = '',
                            // subject = '',
                            // subjectid = '',

                            _id = '',
                            subjectImage = '',
                            subjectid = '',
                            subjectname = '',
                          } = item;
                          console.log(item, 'item..................');
                          return (
                            <TouchableOpacity
                              style={
                                {
                                  // borderWidth: 1
                                }
                              }
                              key={index}
                              onPress={() => {
                                navigation.navigate('SubjectLevel', {
                                  stageid: '5',
                                  boardid: '1',
                                  scholarshipId: 'NVOOKADA1690811843420',
                                  coursename: coursename,
                                });
                              }}>
                              <LinearGradient
                                colors={['#feecde', '#fdbead']}
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  // backgroundColor: '#fee2a3',
                                  // backgroundColor: '#fdc0ae',
                                  paddingVertical: 25,
                                  width: device_width * 0.4,
                                  height: device_height * 0.18,
                                  paddingHorizontal: 15,
                                  margin: 10,
                                  //   borderWidth: 1,
                                  //   borderColor: 'darkgreen',
                                  borderRadius: 20,
                                }}>
                                <Text
                                  style={{
                                    width: '120%',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: '#474747',
                                    marginLeft: 30,
                                  }}>
                                  {subjectname}
                                </Text>
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
                                  {subjectImage != '' ? (
                                    <Image
                                      style={{
                                        width: 75,
                                        height: 75,
                                        resizeMode: 'cover',
                                        right: -10,
                                        // borderRadius: 50,
                                        alignSelf: 'center',
                                      }}
                                      source={{uri: subjectImage}}
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
                              </LinearGradient>
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
              </View>
            </ScrollView>
          </>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SubjectList;
