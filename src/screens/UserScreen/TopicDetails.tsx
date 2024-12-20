import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  BackHandler,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {device_width, device_height} from '../style';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAppSelector} from '../../redux/store/reducerHook';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  getTopicBySubIdAPI,
  selectTopicDetailsInfo,
  selectTopicDetailsStatus,
} from '../../redux/reducers/GetTopicDetailsReducer';
// import {selectTopicDetailsStatus} from '../../redux/reducers/GetTopicDetailsFormTopicIdReducer';
import {dataclearstate} from '../../redux/reducers/GetContentDetailsReducer';
import LoadingScreen from '../CommonScreens/LoadingScreen';
import {selectUserInfo} from '../../redux/reducers/loginReducer';
import CommonMessage from '../../../constants/CommonMessage';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getContentByTopicIdAPI} from '../../redux/reducers/GetContentDetailsReducer';
import {
  getAllSubjectLevelDataAPI,
  selectAllSubjectLevelInfo,
} from '../../redux/reducers/GetAllSubjectLevelReducer';
import SubjectLevel from './SubjectLevel';
import {
  getChildProgressDetailAPI,
  selectChildDetailData,
} from '../../redux/reducers/GetChildProgressDetailReducer';
import * as Progress from 'react-native-progress';
import { IsTabScreen } from '../../../constants/Constants';

const TopicDetails = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const {t: trans, i18n} = useTranslation();
  const device_width = Dimensions.get('window').width;
  const device_height = Dimensions.get('window').height;
  const {
    //coursename = '',
    subjectname = '',
    subjectid = '',
    subjectimage = '',
  } = route.params;

  //const TopicBySubjectId = useAppSelector(selectChildDetailData);
  const TopicBySubjectId = useAppSelector(selectTopicDetailsInfo);

  const TopicLoad = useAppSelector(selectTopicDetailsStatus);

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
    const bodydata = {
      subjectid: subjectid,
      childid: childid,
    };
    dispatch(getTopicBySubIdAPI(bodydata));
    return () => {};
  }, []);

  useEffect(() => {
    const bodydata = {
      subjectid: subjectid,
      childid: childid,
    };
    dispatch(getChildProgressDetailAPI(bodydata));
    return () => {};
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.goBack();
        return true;
      });
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <ScrollView> */}
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
              justifyContent: 'space-between',
              marginVertical: IsTabScreen ? 18 : 10,
              marginHorizontal: IsTabScreen ? 30 :20,
            }}>
            <TouchableOpacity
              onPress={() => {
                const data = {
                  childid: childid,
                };
                dispatch(getChildProgressDetailAPI(data));
                navigation.goBack();
              }}>
              <MaterialIcons
                name="arrow-back"
                size={IsTabScreen ? 45 : 35}
                style={{
                  color: '#FFFFFF',
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              {subjectimage != '' ? (
                <Image
                  source={{uri: subjectimage}}
                  style={{
                    height: IsTabScreen||orientation=='landscape' ? device_height * 0.10 : device_height * 0.06,
                    width: IsTabScreen||orientation=='landscape' ? device_width * 0.10 :device_width * 0.11,
                    resizeMode: 'contain',
                    tintColor: '#FFFFFF',
                    marginRight: IsTabScreen ? 15 :10,
                  }}
                />
              ) : (
                <Image
                  source={require('../../../assets/people.png')}
                  style={{
                    height: IsTabScreen||orientation=='landscape' ? device_height * 0.12 :device_height * 0.07,
                    width: IsTabScreen||orientation=='landscape' ? device_width * 0.10 :device_width * 0.14,
                    resizeMode: 'contain',
                    tintColor: '#FFFFFF',
                    marginRight: IsTabScreen ? 15 :10,
                  }}
                />
              )}
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: IsTabScreen ? 24 :20,
                  color: '#FFFFFF',
                }}>
                {trans(subjectname)}
              </Text>
            </View>
          </View>

          {TopicLoad == 'loading' ? (
            <LoadingScreen flag={TopicLoad == 'loading'} />
          ) : (
            <>
              {TopicLoad.length > 0 ? (
                <>
                <ScrollView>
                  <View
                    style={{
                      flexDirection: 'column',
                      marginHorizontal: IsTabScreen ? -5 : -10,
                      paddingHorizontal: IsTabScreen ? 20 : 10,
                      marginRight: IsTabScreen ? 20 : 10,
                      marginBottom: IsTabScreen ? 35 : 16,
                      marginTop: IsTabScreen ? 30 : 20,
                      justifyContent: 'center',
                    }}>
                    {TopicBySubjectId.map((item, index) => {
                      const {
                        topicname = '',
                        topicid = '',
                        contents = [],
                      } = item;

                      // Calculate the average percentage for each topic
                      const totalPercentage = contents.reduce(
                        (sum, content) => {
                          const contentPercentage =
                            content.studentContent.reduce(
                              (acc, student) => acc + student.percentage,
                              0,
                            );
                          return (
                            sum +
                            contentPercentage /
                              (content.studentContent.length || 1)
                          ); // Prevent division by zero
                        },
                        0,
                      );
                      const averagePercentage =
                        totalPercentage / (contents.length || 1); // Prevent division by zero

                      // Determine if the topic is locked
                      let isLock = false;
                      if (index !== 0) {
                        const previousContents =
                          TopicBySubjectId[index - 1].contents;
                        const previousTotalPercentage = previousContents.reduce(
                          (sum, content) => {
                            const contentPercentage =
                              content.studentContent.reduce(
                                (acc, student) => acc + student.percentage,
                                0,
                              );
                            return (
                              sum +
                              contentPercentage /
                                (content.studentContent.length || 1)
                            );
                          },
                          0,
                        );
                        const previousAveragePercentage =
                          previousTotalPercentage /
                          (previousContents.length || 1);
                        isLock = previousAveragePercentage < 90&& childid!='NVED1725037191939';
                      }

                      return (
                        <View key={index}>
                          <TouchableOpacity
                            onPress={() => {
                              if (isLock) {
                                CommonMessage(
                                  'You have to complete previous level to unlock',
                                );
                              } else {
                                const data = {
                                  topicid: topicid,
                                  childid: childid,
                                };
                                dispatch(getContentByTopicIdAPI(data));
                                navigation.navigate('ContentDetails', {
                                  //coursename: coursename,
                                  subjectname: subjectname,
                                  topicname: topicname,
                                  topicid: topicid,
                                  subjectimage: subjectimage,
                                });
                              }
                            }}
                            style={{
                              height: IsTabScreen||orientation=='landscape' ? device_height * 0.12 : device_height * 0.09,
                              width: '100%',
                              backgroundColor: isLock
                                ? 'rgba(220,220,220,0.1)'
                                : 'rgba(0,255,0,0.1)',
                              borderRadius: 20,
                              borderColor: '#f1a722',
                              borderWidth: 0.9,
                              marginHorizontal: 10,
                              marginVertical: IsTabScreen||orientation=='landscape' ? 12 :10,
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              flexDirection: 'row',
                              opacity: isLock ? 0.5 : 1,
                              paddingHorizontal: 15,
                            }}>
                            <Text
                              style={{
                                fontSize: IsTabScreen ? 22 :19,
                                color: '#f1a722',
                                fontWeight: '600',
                              }}>
                              {trans(topicname)}
                            </Text>
                            {!isLock && (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  position: 'absolute',
                                  right: 20,
                                  // width: '30%',
                                  //justifyContent: 'flex-end',
                                }}>
                                <Text
                                  style={{
                                    fontWeight: '600',
                                    color: '#def',
                                    fontSize: IsTabScreen ? 18 :16,
                                    marginRight: 10,
                                  }}>
                                  {`${averagePercentage.toFixed(2)}%`}
                                  {/* {parseFloat(
                                    `${averagePercentage.toFixed(2)}%`,
                                  )}
                                  {'%'} */}
                                </Text>
                                <Progress.Circle
                                  progress={averagePercentage / 100}
                                  size={IsTabScreen ? 45 :35}
                                  indeterminate={false}
                                  thickness={IsTabScreen ? 8 :6}
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
                            )}
                            {isLock && (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  left: -10,
                                }}>
                                <Fontisto
                                  style={{color: '#f1a722'}}
                                  name="locked"
                                  size={IsTabScreen ? 32 :28}
                                />
                              </View>
                            )}
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>
                  </ScrollView>
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
            </>
          )}
          {/* <View style={{position: 'relative'}}>
          <Image
            source={require('../../../assets/assort.png')}
            style={{
              tintColor: '#FFFFFF',
              width: device_width * 1.16,
              height: device_height * 0.66,
              resizeMode: 'contain',
              alignSelf: 'center',
              top: -50,
              zIndex: 1,
            }}
          />
          <Image
            source={require('../../../assets/brain.png')}
            style={{
              width: device_width * 0.94,
              height: device_height * 0.5,
              resizeMode: 'contain',
              alignSelf: 'center',
              position: 'absolute',
              top: 45,
              left: 9,
              zIndex: 2,
            }}
          />
        </View> */}
        </ImageBackground>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default TopicDetails;

const styles = StyleSheet.create({});
