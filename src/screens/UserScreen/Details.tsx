import {
  BackHandler,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {dispatch} from '../../redux/store/reducerHook';
import {getAllSubByCourseAPI} from '../../redux/reducers/GetSubjectByCourseReducer';
import {device_height, device_width} from '../style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import Video from 'react-native-video';
import DemoVideo from '../../../assets/students.mp4';

const Details = () => {
  const navigation = useNavigation();
  const {t: trans, i18n} = useTranslation();

  useEffect(() => {
    navigation.addListener('focus', () => {
      dispatch(getAllSubByCourseAPI());
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.goBack();
        return true;
      });
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        navigation.goBack();
        return true;
      });
    };
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          style={{
            width: device_width,
            height: device_height,
            flex: 1,
            // alignSelf: 'center',
            // borderWidth: 1,
            backgroundColor: '#282828',
          }}
          resizeMode="contain"
          // source={require('../../../assets/testBG3.jpg')}
        >
          <View
            style={{
              marginVertical: 12,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              alignSelf: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                flex: 1,
              }}>
              <MaterialIcons
                name="arrow-back"
                size={28}
                style={{color: '#FFFFFF'}}
              />
            </TouchableOpacity>
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                flex: 1,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                {trans('Details')}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                flex: 1,
              }}>
              <Entypo
                name="dots-three-vertical"
                size={20}
                style={{
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignContent: 'center',
              backgroundColor: '#0DFF8F',
              paddingVertical: 20,
              width: device_width * 0.95,
              height: device_height * 0.38,
              paddingHorizontal: 22,
              margin: 10,
              borderRadius: 5,
              marginBottom: 10,
              paddingBottom: 10,
              //marginTop: 10,
            }}>
            <View
              style={{
                //justifyContent: 'center',
                flex: 1,
                paddingTop: 10,
                top: -24,
                paddingBottom: 15,
                width: device_width * 0.85,
                //alignContent: 'center',
              }}>
              <Video
                source={DemoVideo}
                resizeMode="contain"
                style={{
                  flex: 1,
                }}
                controls={true}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: [{translateX: -25}, {translateY: -25}],
                }}>
                {/* <MaterialIcons
                  name="play-arrow"
                  size={30}
                  style={{
                    backgroundColor: '#289C0E',
                    color: 'white',
                    padding: 5,
                    borderRadius:20
                  }}
                /> */}
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
                // justifyContent: 'center',
                alignContent: 'center',
                top: -30,
                right: 10,
                gap: 5,
              }}>
              <View>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '500',
                    fontSize: 16,
                  }}>
                  {trans('Introduction to Vedic Math')}
                </Text>

                <Text
                  style={{
                    color: '#000',
                    fontWeight: '300',
                  }}>
                  {trans(
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
                  )}
                </Text>
              </View>
              <AntDesign
                name="star"
                size={14}
                style={{
                  right: 10,
                  bottom: -2,
                  color: '#000',
                }}
              />
              <Text
                style={{
                  right: 10,
                  marginBottom: 20,
                  color: '#000',
                }}>
                {trans('5.0')}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                //justifyContent: 'space-between',
              }}>
              <TouchableOpacity>
                <AntDesign
                  name="staro"
                  size={20}
                  style={{
                    top: -10,
                    left: -5,
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#000',
                  top: -10,
                  left: -5,
                }}>
                {trans('5.0')}
              </Text>
              <TouchableOpacity>
                <Octicons
                  name="people"
                  size={20}
                  style={{
                    top: -10,
                    left: -5,
                    marginLeft: 10,
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#000',
                  top: -10,
                  left: -5,
                }}>
                {trans('1k+')}
              </Text>
              <TouchableOpacity>
                <Feather
                  name="send"
                  size={20}
                  style={{
                    top: -10,
                    left: -5,
                    marginLeft: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginTop: 8,
              marginBottom: 10,
              marginHorizontal: 15,
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontWeight: '400',
                fontSize: 20,
              }}>
              {trans('Course Details')}
            </Text>
            <View
              style={{
                marginTop: 5,
                marginHorizontal: 2,
                paddingBottom: 15,
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontWeight: '400',
                  fontSize: 12,
                }}>
                {trans(
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus nisl tincidunt.',
                )}
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                //justifyContent: 'center',
                alignContent: 'center',
                backgroundColor: '#FFFFFF',
                width: device_width * 0.95,
                height: device_height * 0.08,
                marginHorizontal: 10,
                borderRadius: 15,
              }}>
              <View
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <AntDesign
                  name="filetext1"
                  size={28}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: '#f8f8f8',
                    color: '#A9A9A9',
                  }}
                />
              </View>
              <View
                style={{
                  paddingTop: 15,
                  paddingLeft: 10,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '700',
                    fontSize: 16,
                  }}>
                  {trans('15 Article')}
                </Text>
                <View
                  style={{
                    paddingTop: 2,
                  }}>
                  <Text>{trans('purus viverra accumsan in nisl')}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                //justifyContent: 'center',
                alignContent: 'center',
                backgroundColor: '#FFFFFF',
                width: device_width * 0.95,
                height: device_height * 0.08,
                marginHorizontal: 10,
                borderRadius: 15,
                marginTop: 20,
              }}>
              <View
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <AntDesign
                  name="file1"
                  size={28}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: '#f8f8f8',
                    color: '#A9A9A9',
                  }}
                />
              </View>
              <View
                style={{
                  paddingTop: 15,
                  paddingLeft: 12,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '700',
                    fontSize: 16,
                  }}>
                  {trans('35 Download Resource')}
                </Text>
                <View
                  style={{
                    paddingTop: 2,
                  }}>
                  <Text>{trans('purus viverra accumsan in nisl')}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                //justifyContent: 'center',
                alignContent: 'center',
                backgroundColor: '#FFFFFF',
                width: device_width * 0.95,
                height: device_height * 0.08,
                marginHorizontal: 10,
                borderRadius: 15,
                marginTop: 20,
              }}>
              <View
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Feather
                  name="video"
                  size={28}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: '#f8f8f8',
                    color: '#A9A9A9',
                  }}
                />
              </View>
              <View
                style={{
                  paddingTop: 15,
                  paddingLeft: 12,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '700',
                    fontSize: 16,
                  }}>
                  {trans('12-Hours Demand Video')}
                </Text>
                <View
                  style={{
                    paddingTop: 2,
                  }}>
                  <Text>{trans('purus viverra accumsan in nisl')}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Details;

const styles = StyleSheet.create({});
