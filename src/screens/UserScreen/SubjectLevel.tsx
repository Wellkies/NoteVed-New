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
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const SubjectLevel = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const {t: trans, i18n} = useTranslation();
  const {
    stageid = '',
    boardid = '',
    scholarshipId = '',
    scholarshipName = '',
  } = route.params;
  console.log(route.params, '===============route.params');
  // const [loading, setLoading] = useState(false);
  // const SchlrshipId = 'NVOOKADA1690811843420'
  useEffect(() => {
    const data = {
      stageid,
      boardid,
      scholarshipid: scholarshipId,
    };
    dispatch(getSubjectByClassAPI(data));
    return () => {};
  }, []);

  const SubjectByClass = useAppSelector(selectSubjectInfo);
  const SubLoading = useAppSelector(selectSubjectStatus);

  console.log(SubjectByClass, '==============SubjectByClass');

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
      const data = {
        stageid,
        boardid,
        scholarshipid: scholarshipId,
      };
      dispatch(getSubjectByClassAPI(data));
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
          alignSelf: 'center',
          borderWidth: 1,
          backgroundColor: '#fff',
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
              <TouchableOpacity
                disabled={true}
                //   onPress={navigationfunc}
                style={{
                  // backgroundColor: '#fee2a3',
                  backgroundColor: '#febcac',
                  paddingVertical: 35,
                  height: device_height * 0.25,
                  paddingHorizontal: 25,
                  //   margin: 10,
                  //   borderWidth: 2,
                }}>
                <Text
                  style={{
                    width: '50%',
                    fontSize: 30,
                    fontWeight: '500',
                    color: '#474747',
                    // marginLeft:30,
                  }}>
                  {'Logical Reasoning'}
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
              <NavigationContainer independent={true}>
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
              </NavigationContainer>

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
                  {SubjectByClass.length > 0 ? (
                    <>
                      {SubjectByClass.map((item, index) => {
                        const {
                          subjectimage = '',
                          subject = '',
                          subjectid = '',
                        } = item;
                        {
                          /* console.log(item,"item..................") */
                        }
                        const Revdata = {
                          stageid,
                          subjectid,
                          boardid,
                          scholarshipId,
                          // childid,
                        };
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
                              backgroundColor: 'rgba(0,255,0,0.2)',
                              alignItems: 'center',
                              paddingVertical: 5,
                              paddingHorizontal: 5,
                              flexDirection: 'row',
                              justifyContent: 'space-around',
                            }}
                            // onPress={() => CommonMessage('We will update shortly !')}
                            onPress={async () => {
                              dispatch(getTopicBySubClassAPI(Revdata));
                              navigation.navigate('SubjectsDetails', {
                                subjectid: subjectid,
                                subjectname: subject,
                                subjectImage: subjectimage,
                                Class: stageid,
                                scholarshipid: scholarshipId,
                                boardid: boardid,
                                // childId: childid,
                                scholarshipName: scholarshipName,
                                showFeedback: false,
                              });
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
                                    borderColor: Colors.lightgrey,
                                    borderWidth: 1.5,
                                    elevation: 5,
                                    backgroundColor: '#fff',
                                    borderRadius: 10,
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
                                      resizeMode: 'cover',
                                      borderRadius: 15,
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
                                      color: '#fff',
                                      fontSize: 14,
                                    }}>
                                    {`Level ${index + 1}`}
                                  </Text>
                                </View>
                              </View>
                              <MaterialIcons
                                name="chevron-right"
                                color={'#f1a722'}
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
