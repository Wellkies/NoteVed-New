import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {device_height, device_width} from '../style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CommonMessage from '../../../constants/CommonMessage';
import {useAppSelector} from '../../redux/store/reducerHook';
import {
  dataclearstate,
  getContentByTopicIdAPI,
  selectContentDetailsInfo,
  selectContentDetailsStatus,
} from '../../redux/reducers/GetContentDetailsReducer';
import {selectTopicDetailsInfo} from '../../redux/reducers/GetTopicDetailsReducer';
import {selectTopicDetailsStatus} from '../../redux/reducers/GetTopicDetailsFormTopicIdReducer';
import {selectUserInfo} from '../../redux/reducers/loginReducer';
import LevelCompleted from '../UserScreen/LevelCompleted';
import {
  selectAllSubjectsInfo,
  selectAllSubjectsStatus,
} from '../../redux/reducers/GetSubjectByCourseReducer';
import LoadingScreen from '../CommonScreens/LoadingScreen';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

const ContentDetails = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const {t: trans, i18n} = useTranslation();
  const {
    coursename = '',
    subjectname = '',
    topicname = '',
    topicid: topicID = '',
    //percentage = '',
  } = route.params;
  console.log(
    coursename,
    // subjectname,
    topicname,
    //percentage,
    '=======coursename, subjectname, topicname, percentage',
  );
  //const Percentage = Math.trunc(percentage);
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

  const TopicBySubjectId = useAppSelector(selectTopicDetailsInfo);
  const TopicLoad = useAppSelector(selectTopicDetailsStatus);
  const contentLoad = useAppSelector(selectContentDetailsStatus);

  // const filterData = TopicBySubjectId.map(rec => rec.topicid);
  // TopicBySubjectId.filter((rec) => rec.sltopic == 1)
  // const topicID = filterData[0];

  useEffect(() => {
    // dispatch(getTopicBySubIdAPI(subjectid));
    // setTopicId(topicID)
    dispatch(dataclearstate());
    const data = {
      topicid: topicID,
      childid: childid,
    };
    dispatch(getContentByTopicIdAPI(data));
    // setTimeout(() => {
    // }, 2000)
    // const data = {
    //   stageid,
    //   boardid,
    //   scholarshipid: scholarshipId,
    // };
    // dispatch(getSubjectByClassAPI(data));
    return () => {};
  }, [topicID]);

  const SubjectByCourse = useAppSelector(selectAllSubjectsInfo);
  const SubLoading = useAppSelector(selectAllSubjectsStatus);
  //console.log(SubjectByCourse, '########################$$$$SubjectByCourse');

  const ContentByTopicId = useAppSelector(selectContentDetailsInfo);
  const {
    reviewquestionsets = [],
    subjectid = '',
    //subjectname = '',
    topic = '',
    topicid = '',
  } = ContentByTopicId[0] ? ContentByTopicId[0] : [];

  //console.log(reviewquestionsets.studentdata, '@@@@@@@@@@@@@@@@@@@@@@@review');

  const [allIndexesContain90Percent, setAllIndexesContain90Percent] =
    useState(false);

  console.log(reviewquestionsets[0], '===============reviewquestionsets');
  const percentageComplete = async () => {
    if (reviewquestionsets[0].studentdata.length === 0) {
      return false;
    }
    for (const questionSet of reviewquestionsets) {
      console.log(questionSet, '==========questionSet');
      if (questionSet.studentdata.length === 0) {
        return false;
      }
      for (const student of questionSet.studentdata) {
        if (student.percentage < 90) {
          return false;
        }
      }
    }
    return true;
  };
  useEffect(() => {
    const checkPercentages = async () => {
      const result = await percentageComplete();
      setAllIndexesContain90Percent(result);
      console.log(result, '====result');
    };
    if (reviewquestionsets.length > 0) {
      checkPercentages();
    } else {
      setAllIndexesContain90Percent(false);
    }
  }, [reviewquestionsets]);
  console.log(reviewquestionsets, '=====reviewquestionsets');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#1E1E1E'}}>
      {contentLoad == 'loading' ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: device_height * 0.9,
            width: device_width,
            backgroundColor: '#1E1E1E',
          }}>
          <LoadingScreen flag={contentLoad == 'loading'} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              // width: device_width,
              // height: device_height,
              flex: 1,
              alignSelf: 'center',
              backgroundColor: '#1E1E1E',
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 10,
                marginHorizontal: 20,
              }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  position: 'absolute',
                  top: 30,
                  left: 0,
                }}>
                <MaterialIcons
                  name="arrow-back"
                  size={35}
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
                  marginVertical: 12,
                  marginHorizontal: 20,
                  gap: 4,
                }}>
                <Image
                  source={require('../../../assets/people.png')}
                  style={{
                    height: device_height * 0.069,
                    width: device_width * 0.17,
                    resizeMode: 'contain',
                    tintColor: '#FFFFFF',
                  }}
                />
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: 20,
                    color: '#FFFFFF',
                  }}>
                  {coursename !== 'Mind Melters' &&
                  coursename !== 'Vidyalaya Vista'
                    ? trans(coursename + ' ' + subjectname)
                    : trans(subjectname)}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#2C7DB5',
                  paddingVertical: 6,
                  paddingHorizontal: 20,
                  borderRadius: 7,
                  marginHorizontal: 20,
                  right: -15,
                }}>
                <Text
                  style={{
                    fontSize: 19,
                    color: '#FFFFFF',
                    fontWeight: '500',
                    letterSpacing: 0.5,
                  }}>
                  {trans(topicname)}
                </Text>
              </View>
            </View>
            {reviewquestionsets.length > 0 ? (
              <>
                {reviewquestionsets.map((item, index) => {
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
                    subjectimage = '',
                    // subjectname = '',
                    timeDuration = '',
                    topicimage = '',
                    //topicname = '',
                    videos = [],
                    studentdata = [],
                  } = item;
                  const {percentage = ''} = studentdata[0] || {};
                  const isReattempt = studentdata.length > 0;
                  //console.log(studentdata[0], '@@@@@@@@@@@studentdata');
                  // const islastexercise =
                  //   reviewquestionsets.length === index + 1;

                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        //flex: 1,
                        alignContent: 'center',
                        backgroundColor: '#000000',
                        width: device_width * 0.95,
                        height: device_height * 0.18,
                        marginHorizontal: 10,
                        borderRadius: 12,
                        marginBottom: 5,
                        marginTop: 24,
                        //position: 'relative',
                        overflow: 'hidden',
                      }}>
                      <View
                        style={{
                          position: 'absolute',
                          top: -10,
                          right: -10,
                        }}>
                        <View
                          style={{
                            backgroundColor: '#2C7DB5',
                            width: 55,
                            height: 55,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 30,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          marginHorizontal: 16,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={require('../../../assets/book.png')}
                          style={{
                            padding: 10,
                            width: 75,
                            height: 78,
                            resizeMode: 'contain',
                            tintColor: '#FFFFFF',
                            top: -10,
                          }}
                        />
                        <View
                          style={{
                            marginHorizontal: 20,
                            flexDirection: 'column',
                            width: device_width * 0.58,
                          }}>
                          <Text
                            style={{
                              color: '#2C7DB5',
                              fontWeight: '500',
                              fontSize: 18,
                              top: -10,
                            }}>
                            {trans(contentset)}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                backgroundColor: '#2C7DB5',
                                height: 4,
                                width: '50%',
                                borderRadius: 4,
                              }}
                            />
                            <Text
                              style={{
                                color: '#2C7DB5',
                                marginLeft: 10,
                                width: '20%',
                              }}>
                              {`${percentage || 0}%`}
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={async () => {
                              navigation.navigate('MockTests', {
                                screenName: 'ExamSets',
                                subjectName: subjectname,
                                coursename: coursename,
                                chapterName: topicname,
                                examSet: contentset,
                                contentid: contentid,
                                isReattempt: isReattempt,
                                studentdata: studentdata,
                                ExamQuestionsets: quiz,
                                // scholarshipid: scholarshipid,
                                // boardid: boardid,
                                // scholarshipName: scholarshipName,
                                subjectId: subjectid,
                                timeDuration: timeDuration,
                                is2ndAvailable: index,
                                topicid: topicid,
                                topic: topic,
                                islastexercise: allIndexesContain90Percent,
                              });
                            }}>
                            <View
                              style={{
                                paddingVertical: 8,
                                paddingHorizontal: 10,
                                borderRadius: 10,
                                marginRight: 8,
                                borderWidth: 1.2,
                                borderColor: '#2C7DB5',
                                backgroundColor: '#2C7DB5',
                                width: device_width * 0.3,
                                bottom: -10,
                                left: -2,
                              }}>
                              <Text
                                style={{
                                  color: '#FFFFFF',
                                  textAlign: 'center',
                                  fontSize: 16,
                                  fontWeight: '500',
                                }}>
                                {isReattempt
                                  ? trans('Reattempt')
                                  : trans('Continue')}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
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
          {allIndexesContain90Percent && <LevelCompleted />}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ContentDetails;

const styles = StyleSheet.create({});
