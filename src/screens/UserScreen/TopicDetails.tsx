import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {device_width, device_height} from '../style';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAppSelector} from '../../redux/store/reducerHook';
import {
  getTopicBySubIdAPI,
  selectTopicDetailsInfo,
} from '../../redux/reducers/GetTopicDetailsReducer';
import {selectTopicDetailsStatus} from '../../redux/reducers/GetTopicDetailsFormTopicIdReducer';
import {
  dataclearstate,
  getContentByTopicIdAPI,
} from '../../redux/reducers/GetContentDetailsReducer';
import LoadingScreen from '../CommonScreens/LoadingScreen';
import {selectUserInfo} from '../../redux/reducers/loginReducer';
import CommonMessage from '../../../constants/CommonMessage';
import Fontisto from 'react-native-vector-icons/Fontisto';

const TopicDetails = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const {t: trans, i18n} = useTranslation();
  const {coursename = '', subjectname = '', subjectid = ''} = route.params;

  const TopicBySubjectId = useAppSelector(selectTopicDetailsInfo);
  console.log(TopicBySubjectId, '$$$$$$$$$$$$#####TopicBySubjectId');
  const TopicLoad = useAppSelector(selectTopicDetailsStatus);

  const filterData = TopicBySubjectId.map(rec => rec.topicid);
  const topicID = filterData[0];

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
    const data = {
      topicid: topicID,
    };
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
              color: '#FFFFFF',
            }}>
            {trans(subjectname)}
          </Text>
        </View>
        {TopicLoad == 'loading' ? (
          <LoadingScreen flag={TopicLoad == 'loading'} />
        ) : (
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
                  subjectname = '',
                  topicname = '',
                  studenttopic = [],
                } = item;
                const isDisabled = index !== 0 && studenttopic.length === 0;
                return (
                  <View key={index}>
                    <TouchableOpacity
                      onPress={() => {
                        if (isDisabled) {
                          CommonMessage(
                            'You have to complete previous level to unlock',
                          );
                        } else {
                          navigation.navigate('ContentDetails', {
                            subjectname: subjectname,
                            topicname: topicname,
                          });
                        }
                      }}
                      style={{
                        height: device_height * 0.09,
                        width: device_width * 0.35,
                        backgroundColor: isDisabled ? '#CCCCCC' : '#2C7DB5',
                        borderRadius: 20,
                        marginHorizontal: 10,
                        marginVertical: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: isDisabled ? 0.5 : 1,
                      }}>
                      <Text
                        style={{
                          fontSize: 19,
                          color: '#FFFFFF',
                          fontWeight: '500',
                        }}>
                        {trans(topicname)}
                      </Text>
                      {isDisabled ? (
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
