import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  BackHandler,
} from 'react-native';
import React, {useEffect} from 'react';
import {device_height, device_width} from '../style';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {dispatch} from '../../redux/store/reducerHook';
import {getAllSubByCourseAPI} from '../../redux/reducers/GetSubjectByCourseReducer';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image} from 'react-native-animatable';

const Reviews = ({route}) => {
  const navigation = useNavigation();
  const {t: trans, i18n} = useTranslation();

  useEffect(() => {
    navigation.addListener('focus', () => {
      // const data = {
      //   stageid,
      //   boardid,
      //   scholarshipid: SchlrshipId,
      // };
      dispatch(getAllSubByCourseAPI());
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
          // alignSelf: 'center',
          // borderWidth: 1,
          backgroundColor: '#404040',
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
              style={{color: 'white'}}
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
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Level
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
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignContent: 'center',
            backgroundColor: '#1dfc8c',
            paddingVertical: 20,
            width: device_width * 0.95,
            height: device_height * 0.25,
            paddingHorizontal: 25,
            margin: 10,
            borderRadius: 40,
            flex: 1,
          }}>
          <View
            style={{
              paddingBottom: 20,
            }}>
            <Image
              style={{
                width: 100,
                height: 120,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
              source={require('../../../assets/p2.png')}
            />
          </View>
          <View
            style={{
              paddingBottom: 20,
            }}>
            <Text
              style={{
                fontSize: 35,
                fontWeight: 'bold',
                color: '#ffff1a',
                textAlign: 'center',
              }}>
              {'Congratulations'}
            </Text>
            <Text
              style={{
                fontSize: 22,
                color: '#ffffff',
                textAlign: 'center',
                fontWeight: '600',
              }}>
              {'You are a level 4 certified learner'}
            </Text>
          </View>
          <View
            style={{
              paddingTop: 50,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#404040',
                padding: 5,
                borderRadius: 25,
                paddingHorizontal: 10,
                width: device_width * 0.6,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  fontSize: 20,
                  textAlign: 'center',
                }}>
                {'Download Certificate'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            paddingVertical: 10,
            alignSelf: 'center',
            paddingTop: 20,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 28,
              fontWeight: '600',
              textAlign: 'center',
              alignItems: 'center',
            }}>
            {'Liked Our Courses?'}
          </Text>
        </View>
        <View
          style={{
            marginBottom: -33,
          }}>
          <TouchableOpacity
          onPress={async () => {
            navigation.navigate('Pricing')
          }}>
            <Image
              style={{
                width: 300,
                height: 300,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
              source={require('../../../assets/p3.png')}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Reviews;

const styles = StyleSheet.create({});
