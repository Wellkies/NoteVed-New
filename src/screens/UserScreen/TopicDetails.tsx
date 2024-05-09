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

import {getContentByTopicIdAPI} from '../../redux/reducers/GetContentDetailsReducer';
import LoadingScreen from '../CommonScreens/LoadingScreen';
import { getAllSubjectLevelDataAPI, selectAllSubjectLevelInfo } from '../../redux/reducers/GetAllSubjectLevelReducer';
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
  const topicID = filterData[0];
  //const AllSubjectLevelData = useAppSelector(selectAllSubjectLevelInfo);
  // const filterSubjectData = AllSubjectLevelData.map(rec => rec.subjectid);
  // const subjectID = filterSubjectData[0];
  //console.log(subjectID,'==========!!subjectID')
  useEffect(() => {
    dispatch(getTopicBySubIdAPI(subjectid));
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
            {coursename !== 'Mind Melters' && coursename !== 'Vidyalaya Vista'
              ? trans(coursename + ' ' + subjectname)
              : trans(subjectname)}
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
                const isEnabled = index === 0;
                const {topicname = ''} = item;
                return (
                  <View key={index}>
                    <TouchableOpacity
                      onPress={() =>
                        isEnabled &&
                        navigation.navigate('ContentDetails', {
                          coursename: coursename,
                          subjectname: subjectname,
                          topicname: topicname,
                        })
                      }
                      style={{
                        height: device_height * 0.09,
                        width: device_width * 0.35,
                        backgroundColor: '#2C7DB5',
                        borderRadius: 20,
                        marginHorizontal: 10,
                        marginVertical: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 19,
                          color: '#FFFFFF',
                          fontWeight: '500',
                        }}>
                        {trans(topicname)}
                      </Text>
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
