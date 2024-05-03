import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {device_height, device_width} from '../style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommonMessage from '../../../constants/CommonMessage';

const ContentDetails = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const {t: trans, i18n} = useTranslation();
  const {subjectname = '', topicname = ''} = route.params;

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
                {trans(subjectname)}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#90FF96',
                paddingVertical: 6,
                paddingHorizontal: 20,
                borderRadius: 7,
                marginHorizontal: 20,
              }}>
              <Text
                style={{
                  fontSize: 19,
                  color: '#000',
                  fontWeight: '700',
                  letterSpacing: 0.5,
                }}>
                {trans(topicname)}
              </Text>
            </View>
          </View>
          {ContentAvailable.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  backgroundColor: '#000000',
                  width: device_width * 0.95,
                  height: device_height * 0.15,
                  marginHorizontal: 10,
                  borderRadius: 12,
                  marginBottom: 5,
                  marginTop: 24,
                }}>
                <View
                  style={{
                    paddingLeft: 10,
                    paddingRight: 10,
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
                      top: -17,
                    }}
                  />
                  <View
                    style={{
                      paddingLeft: 10,
                      flexDirection: 'column',
                    }}>
                    <View
                      style={{
                        marginHorizontal: 2,
                      }}>
                      <Text
                        style={{
                          color: '#90FF96',
                          fontWeight: '500',
                          fontSize: 18,
                          top: -10,
                        }}>
                        {trans(item.contents)}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingTop: 2,
                      }}>
                      <View
                        style={{
                          backgroundColor: '#0BB713',
                          height: 2,
                          width: '60%',
                          borderRadius: 4,
                          marginRight: 10,
                        }}
                      />
                      <Text
                        style={{
                          color: '#0BB713',
                          top: -10,
                          marginHorizontal: 2,
                        }}>
                        70/100
                      </Text>
                    </View>
                    <TouchableOpacity onPress={item.navigationfunc}>
                      <View
                        style={{
                          paddingVertical: 4,
                          paddingHorizontal: 10,
                          borderRadius: 10,
                          marginRight: 8,
                          borderWidth: 1.2,
                          borderColor: '#01FE91',
                          width: device_width * 0.2,
                          bottom: -10,
                          left: -5,
                        }}>
                        <Text style={{color: '#FFFFFF'}}>Continue</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContentDetails;

const styles = StyleSheet.create({});
