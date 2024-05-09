import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {device_height, device_width} from '../style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommonMessage from '../../../constants/CommonMessage';
import {useAppSelector} from '../../redux/store/reducerHook';
import {
  getContentByTopicIdAPI,
  selectContentDetailsInfo,
} from '../../redux/reducers/GetContentDetailsReducer';
import {selectTopicDetailsInfo} from '../../redux/reducers/GetTopicDetailsReducer';
import {selectTopicDetailsStatus} from '../../redux/reducers/GetTopicDetailsFormTopicIdReducer';
import {selectUserInfo} from '../../redux/reducers/loginReducer';
import LevelCompleted from '../UserScreen/LevelCompleted';

const ContentDetails = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const {t: trans, i18n} = useTranslation();
  const {
    coursename = '',
    subjectname = '',
    topicname = '',
    percentage = '',
  } = route.params;
  console.log(
    coursename,
    subjectname,
    topicname,
    percentage,
    '=======coursename, subjectname, topicname, percentage',
  );
  const Percentage = Math.trunc(percentage);
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

  const filterData = TopicBySubjectId.map(rec => rec.topicid);
  // TopicBySubjectId.filter((rec) => rec.sltopic == 1)
  const topicID = filterData[0];

  useEffect(() => {
    // dispatch(getTopicBySubIdAPI(subjectid));
    // setTopicId(topicID)
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

  const ContentAvailable = [
    {
      contents: 'Current Affairs and Global Issues',
      navigationfunc: () => CommonMessage('Coming Soon !'),
    },
    {
      contents: 'Mythology and Folklore',
      navigationfunc: () => CommonMessage('Coming Soon !'),
    },
    {
      contents: 'History and Civilization',
      navigationfunc: () => CommonMessage('Coming Soon !'),
    },
  ];
  const [openCompleteModal, setOpenCompleteModal] = useState(false);
  const openLevelCompleteModal = () => {
    setOpenCompleteModal(true);
  };

  const ContentByTopicId = useAppSelector(selectContentDetailsInfo);
  const {reviewquestionsets = []} = ContentByTopicId[0]
    ? ContentByTopicId[0]
    : [];

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: device_width,
            height: device_height,
            flex: 1,
            alignSelf: 'center',
            backgroundColor: '#1E1E1E',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 12,
              marginHorizontal: 20,
              paddingVertical: 6,
              paddingHorizontal: 25,
              marginBottom: 28,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={require('../../../assets/people.png')}
                style={{
                  height: device_height * 0.065,
                  width: device_width * 0.16,
                  resizeMode: 'contain',
                  tintColor: '#FFFFFF',
                }}
              />
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 20,
                  marginLeft: 10,
                  marginVertical: 10,
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
                  subjectid = '',
                  subjectimage = '',
                  // subjectname = '',
                  timeDuration = '',
                  topicid = '',
                  topicimage = '',
                  //topicname = '',
                  videos = [],
                } = item;
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignContent: 'center',
                      backgroundColor: '#000000',
                      width: device_width * 0.95,
                      height: device_height * 0.17,
                      marginHorizontal: 10,
                      borderRadius: 12,
                      marginBottom: 5,
                      marginTop: 24,
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                    <View style={{position: 'absolute', top: -10, right: -10}}>
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
                              backgroundColor:'#2C7DB5',
                              height: 4,
                              width: '50%',
                              borderRadius: 4,
                            }}
                          />
                          <Text
                            style={{
                              color: '#2C7DB5',
                              marginLeft: 10,
                            }}>
                            {Percentage + '/100'}
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
                          }}>
                          <View
                            style={{
                              paddingVertical: 4,
                              paddingHorizontal: 10,
                              borderRadius: 10,
                              marginRight: 8,
                              borderWidth: 1.2,
                              borderColor: '#2C7DB5',
                              width: device_width * 0.2,
                              bottom: -10,
                              left: -2,
                            }}>
                            <Text style={{color: '#FFFFFF'}}>
                              {trans('Continue')}
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
          <TouchableOpacity onPress={openLevelCompleteModal} style={{}}>
            <Text
              style={{
                color: '#FFFFFF',
              }}>
              Completed
            </Text>
          </TouchableOpacity>
        </View>
        {openCompleteModal && <LevelCompleted play={openCompleteModal} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContentDetails;

const styles = StyleSheet.create({});
