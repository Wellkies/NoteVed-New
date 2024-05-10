import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import {device_width, device_height} from '../style';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAppSelector} from '../../redux/store/reducerHook';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  getTopicBySubIdAPI,
  selectTopicDetailsInfo,
} from '../../redux/reducers/GetTopicDetailsReducer';
import {selectTopicDetailsStatus} from '../../redux/reducers/GetTopicDetailsFormTopicIdReducer';
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

const TopicDetails = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const {t: trans, i18n} = useTranslation();
  const {coursename = '', subjectname = '', subjectid = ''} = route.params;

  const TopicBySubjectId = useAppSelector(selectTopicDetailsInfo);
  console.log(TopicBySubjectId, '$$$$$$$$$$$$#####TopicBySubjectId');
  const TopicLoad = useAppSelector(selectTopicDetailsStatus);

  const filterData = TopicBySubjectId.map(rec => rec.topicid);
  // const topicID = filterData[0];
  //const AllSubjectLevelData = useAppSelector(selectAllSubjectLevelInfo);
  // const filterSubjectData = AllSubjectLevelData.map(rec => rec.subjectid);
  // const subjectID = filterSubjectData[0];
  //console.log(subjectID,'==========!!subjectID')

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

  useEffect(() => {
    const bodydata = {
      subjectid: subjectid,
      childid: childid,
    };
    dispatch(getTopicBySubIdAPI(bodydata));
    // const data = {
    //   topicid: topicID,
    // };
    //dispatch(getContentByTopicIdAPI(data));
    return () => {};
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          width: device_width,
          height: device_height,
          flex: 1,
          alignSelf: 'center',
          backgroundColor: '#1E1E1E',
        }}>
           <TouchableOpacity onPress={() => navigation.goBack()}
           style={{
            position: 'absolute',
            top: 30,
            left: 20,
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
            {coursename !== 'Mind Melters' && coursename !== 'Vidyalaya Vista'
              ? trans(coursename + ' ' + subjectname)
              : trans(subjectname)}
          </Text>
        </View>
        {TopicLoad == 'loading' ? (
          <LoadingScreen flag={TopicLoad == 'loading'} />
        ) : (
          <>
            {TopicBySubjectId.length > 0 ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignContent: 'center',
                    marginHorizontal: 25,
                    marginBottom: 16,
                    marginTop: 50,
                    justifyContent: 'center',
                  }}>
                  {TopicBySubjectId.map((item, index) => {
                    const {
                      //subjectname = '',
                      topicname = '',
                      topicid = '',
                      studenttopic = [],
                    } = item;
                    console.log(
                      studenttopic,
                      'studenttopic%%%%%%%%%%%%%%%%%%%%%%%%%%%%',
                    );
                    const isLock =
                      index !== 0 &&
                      TopicBySubjectId[index - 1].studenttopic.length === 0;
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
                                coursename: coursename,
                                subjectname: subjectname,
                                topicname: topicname,
                                topicid: topicid,
                              });
                            }
                          }}
                          style={{
                            height: device_height * 0.09,
                            width: device_width * 0.35,
                            backgroundColor: isLock ? '#CCCCCC' : '#2C7DB5',
                            borderRadius: 20,
                            marginHorizontal: 10,
                            marginVertical: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            opacity: isLock ? 0.5 : 1,
                          }}>
                          <Text
                            style={{
                              fontSize: 19,
                              color: '#FFFFFF',
                              fontWeight: '500',
                            }}>
                            {trans(topicname)}
                          </Text>
                          {isLock ? (
                            <Fontisto
                              style={{color: '#fff'}}
                              name="locked"
                              size={15}
                            />
                          ) : (
                            <></>
                          )}
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
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
        <View style={{position: 'relative'}}>
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
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TopicDetails;

const styles = StyleSheet.create({});
