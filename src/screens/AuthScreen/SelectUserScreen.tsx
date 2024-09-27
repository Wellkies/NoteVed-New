import {
  BackHandler,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import React, {useEffect, useState} from 'react';
import {device_height, device_width} from '../style';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store/Store';
import {
  selectStudentLanguage,
  setLanguage,
} from '../../redux/reducers/languageReducer';
import AsyncStorage from '../../utils/AsyncStorage';
import {useNavigation} from '@react-navigation/native';
import Header from '../CommonScreens/Header';
import Colors from '../../../assets/Colors';
// import {
//   TestIds,
//   RewardedAd,
//   RewardedAdEventType,
// } from 'react-native-google-mobile-ads';
// import {REWARDEDAD} from '../../../constants/ApiPaths';
// import Header from '../CommonScreens/Header';

const SelectUserScreen = ({route}) => {
  const navigation = useNavigation();
  // const dispatch = useDispatch<any>();
  // const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  // const { t: trans, i18n } = useTranslation();
  const {userLanguage = ''} = route.params;

  /////////////////////AD/////////////////////

  // const [rewardedad, setRewardedad] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [isRewardedAddCalled, setIsRewardedAddCalled] = useState(false);
  // const adUnitId3 = REWARDEDAD;

  useEffect(() => {
    // initRewardedad();
  }, []);

  useEffect(() => {
    // if (isLoaded && !isRewardedAddCalled) {
    //   rewardedadd();
    //   setIsRewardedAddCalled(true);
    // }
  }, [isLoaded]);
  // const initRewardedad = () => {
  //   const rewarded = RewardedAd.createForAdRequest(adUnitId3, {
  //     keywords: ['fashion', 'clothing'],
  //   });
  //   rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
  //     setRewardedad(rewarded);
  //     setIsLoaded(true);
  //     console.log('Rewardedad ad loaded!!###############');
  //   });
  //   rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
  //     initRewardedad();
  //     console.log('Rewardedad ad Closed!!');
  //   });
  //   rewarded.load();
  // };
  // const rewardedadd = () => {
  //   if (rewardedad) {
  //     rewardedad.show();
  //   }
  // };
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
      <StatusBar backgroundColor={'#263d2d'} barStyle="light-content" />
      <ImageBackground
        style={{
          height: device_height,
          width: device_width,
          alignSelf: 'center',
        }}
        resizeMode="cover"
        source={require('../../../assets/0.png')}>
        <View
          style={{
            height: 60,
            width: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={30}
            // backgroundColor={Colors.secondary}
            color={Colors.secondary}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginHorizontal: 10,
            width: device_width,
            height: device_height * 0.85,
          }}>
          <LinearGradient
            colors={['#3442e9', '#1496eb']}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '90%',
              height: device_height * 0.25,
              backgroundColor: 'green',
              borderRadius: 25,
            }}>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                // setModalStatus(false)
                navigation.navigate('SignUpScreen1', {
                  email: '',
                  phone: '',
                  otplogin: false,
                  emailLogin: false,
                  pswdLogin: true,
                  languages: userLanguage,
                });
              }}>
              <ImageBackground
                animation="bounceIn"
                duraton="1500"
                source={require('../../../assets/card-design.png')}
                style={{
                  minWidth: device_width * 0.72,
                  height: '100%',
                  //     width: '100%',
                  // height:device_height*0.25,
                  overflow: 'hidden',
                  alignSelf: 'center',
                  // marginTop: -20,
                  alignItems: 'center',
                  borderRadius: 35,
                  justifyContent: 'center',
                  // borderWidth: 1,
                  // zIndex:-1
                }}
                resizeMode="cover">
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 30,
                    fontWeight: 'bold',
                    letterSpacing: 1,
                    // width:'20%'
                  }}>
                  {'New User?'}
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20,
                    // fontWeight: 'bold',
                    letterSpacing: 1,
                    width: '80%',
                  }}>
                  {'Register Here!'}
                </Text>
                <View
                  style={{
                    marginTop: 5,
                    borderRadius: 20,
                    width: '50',
                    backgroundColor: '#fff',
                  }}>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={30}
                    // backgroundColor={'#def'}
                    color={'#3442e9'}
                  />
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={['#308b25', '#1dc731']}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '90%',
              height: device_height * 0.25,
              backgroundColor: 'green',
              // minHeight: device_height * 0.05,
              // height: '30%',
              // borderWidth: 5,
              marginTop: 25,
              borderRadius: 25,
            }}>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                // setModalStatus(false)
                // dispatch(setLanguage(selectedLanguage));
                navigation.navigate('SignInScreen', {
                  language: userLanguage,
                });
              }}>
              <ImageBackground
                animation="bounceIn"
                duraton="1500"
                source={require('../../../assets/card-design.png')}
                style={{
                  minWidth: device_width * 0.72,
                  height: '100%',
                  overflow: 'hidden',
                  alignSelf: 'center',
                  // marginTop: -20,
                  alignItems: 'center',
                  borderRadius: 35,
                  justifyContent: 'center',
                  // borderWidth: 1,
                  // zIndex:-1
                }}
                resizeMode="cover">
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 30,
                    fontWeight: 'bold',
                    letterSpacing: 1,
                  }}>
                  {'Existing User ?'}
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20,
                    // fontWeight: 'bold',
                    letterSpacing: 1,
                  }}>
                  {'Sign In'}
                </Text>
                <View
                  style={{
                    marginTop: 5,

                    borderRadius: 20,
                    width: '50',
                    backgroundColor: '#fff',
                  }}>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={30}
                    // backgroundColor={'#def'}
                    color={'#308b25'}
                  />
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SelectUserScreen;
