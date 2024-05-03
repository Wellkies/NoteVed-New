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
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 12,
            marginHorizontal: 20,
            paddingVertical: 6,
            paddingHorizontal: 25,
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
              {trans(subjectname)}
            </Text>
          </View>
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
                paddingVertical: 25,
                justifyContent: 'center',
              }}>
              {TopicBySubjectId.map((item, index) => {
                const {subjectname = '', topicname = ''} = item;
                return (
                  <View key={index}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('ContentDetails', {
                          subjectname: subjectname,
                          topicname: topicname,
                        })
                      }
                      style={{
                        height: device_height * 0.09,
                        width: device_width * 0.35,
                        backgroundColor: '#01FE91',
                        borderRadius: 20,
                        marginHorizontal: 10,
                        marginVertical: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
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
              width: device_width * 1.18,
              height: device_height * 0.68,
              resizeMode: 'contain',
              alignSelf: 'center',
              top: -75,
              zIndex: 1,
            }}
          />
          <Image
            source={require('../../../assets/brain.png')}
            style={{
              width: device_width * 0.96,
              height: device_height * 0.6,
              resizeMode: 'contain',
              alignSelf: 'center',
              position: 'absolute',
              top: -12,
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
