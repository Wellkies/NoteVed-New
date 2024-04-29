import React, { useState, useEffect } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store/Store';
import { Avatar, Chip } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  selectCount,
} from '../../redux/reducers/demoReducers';
import {
  fetchUserAsync,
  selectUserInfo,
} from '../../redux/reducers/loginReducer';
// import {selectedLang} from '../redux/reducers/languageReducer'
import Icon from 'react-native-vector-icons/Entypo';
import FastImage from 'react-native-fast-image';
import { device_height, device_width } from '../style';
import Colors from '../../../assets/Colors';
import { useNavigation } from '@react-navigation/native';
import {
  selectStudentLanguage,
  setLanguage,
} from '../../redux/reducers/languageReducer';
import { useTranslation } from 'react-i18next';
import { IsTabScreen } from '../../../constants/Constants';

const SplashScreen = () => {
  const dispatch = useDispatch<any>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { t: trans, i18n } = useTranslation();
  const count = useAppSelector(selectCount);
  const userData = useAppSelector(selectUserInfo);

  interface type {
    language: string;
  }

  const selectedLanguage = useAppSelector(selectStudentLanguage);
  console.log(selectedLanguage, '==============selectedLanguage');

  // const selectedLanguage = useAppSelector(selectedLang)
  const [incrementAmount, setIncrementAmount] = useState('2');
  const [phone, setPhone] = useState('9668857601');
  const [password, setPassword] = useState('123456');

  const [language, setLanguages] = useState([
    // {name: 'हिंदी', code: 'hi', isSelected: selectedLanguage === 'hindi'},
    { name: 'ଓଡିଆ', code: 'odia', isSelected: selectedLanguage === 'odia' },
    {
      name: 'English',
      code: 'english',
      isSelected: selectedLanguage === 'english',
    },
    //  {name: 'हिंदी', code: 'hindi', isSelected: selectedLanguage === 'hindi'},
  ]);
console.log(language,"language///////////////")
  // The `state` arg is correctly typed as `RootState` already
  // const count = useAppSelector(selectCount);
  // const status = useAppSelector(state => state.counter.status);
  // const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const loginFun = () => {
    const data = { phone: phone, password: password };
    dispatch(fetchUserAsync(Object(data) || {}));
  };
  useEffect(() => {
    dispatch(setLanguage(selectedLanguage));
    if (selectedLanguage == '') {
      dispatch(setLanguage('english'));
    }
  }, [language]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={'#263d2d'} barStyle="light-content" />
      <ImageBackground
        style={{
          width: device_width,
          height: device_height,
          flex: 1,
          alignSelf: 'center',
          backgroundColor: '#404040'
        }}
        // resizeMode="cover"
        // source={require('../../../assets/0.png')}
        >
        <View
          style={{
            // backgroundColor: Colors.secondary,
            // borderBottomRightRadius: 50,
            height: device_height,
            width: device_width * 0.98,
            alignItems: 'center',
            // borderWidth: 1,
            alignSelf: 'center',
          }}>
          {selectedLanguage === 'odia' ? (
            <View style={{ height: device_height * 0.52, borderWidth: 0 }}>
              <Image
                // animation="bounceIn"
                // duraton="1500"
                style={{
                  // height: device_height * 0.45,
                  // width: device_width * 0.85,
                  height: IsTabScreen
                    ? device_height * 0.4
                    : device_height * 0.45,
                  width: IsTabScreen
                    ? device_width * 0.8
                    : device_width * 0.85,
                  top: IsTabScreen ? 0 : -10,
                }}
                source={require('../../../assets/odlogo1.png')}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: '#f1a722',
                  textAlign: 'center',
                  marginTop: IsTabScreen ? -5 : -15,
                }}>
                {selectedLanguage === 'odia'
                  ? 'A Product of Noteved Siksha Sandhan Pvt. Ltd.'
                  : selectedLanguage === 'english'
                    ? 'A Product of Noteved Siksha Sandhan Pvt. Ltd.'
                    : // : 'कृपया अपनी भाषा प्राथमिकता चुनें'}
                    'A Product of Noteved Siksha Sandhan Pvt. Ltd.'}
              </Text>
              {/* <ImageBackground
              // source={require("../assets/splash.png")}
              source={require('../../../assets/logo1.png')}
              style={{
                height: device_height * 0.45,
                width: device_width * 0.85,
                // marginTop: -10,
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingTop:20,
                // marginBottom:-40,
                borderWidth: 1,
              }}
              resizeMode="contain">
            </ImageBackground> */}
              <View
                style={{
                  alignItems: 'center',
                  marginHorizontal: 10,
                  // marginTop: IsTabScreen ? -5 : -35,
                  // borderWidth:1
                }}>
                <Text style={{ fontWeight: '900', fontSize: 35, color: '#fff' }}>
                  {/* {trans('NOTEVED')} */}
                  {selectedLanguage === 'odia' ? 'ନୋଟଭେଦ' : 'NOTEVED'}
                </Text>
              </View>
            </View>
          ) : (
            <View style={{ height: device_height * 0.52, borderWidth: 0 }}>
              <Image
                // animation="bounceIn"
                // duraton="1500"
                style={{
                  // height: device_height * 0.45,
                  // width: device_width * 0.93,
                  height: IsTabScreen
                    ? device_height * 0.4
                    : device_height * 0.43,
                  width: IsTabScreen
                    ? device_width * 0.85
                    : device_width * 0.91,
                  // top: IsTabScreen ? 0 : -10,
                }}
                source={require('../../../assets/enlogo2.png')}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: '#f1a722',
                  textAlign: 'center',
                  // marginTop: IsTabScreen ? -10 : -15,
                }}>
                {selectedLanguage === 'odia'
                  ? 'A Product of Noteved Siksha Sandhan Pvt. Ltd.'
                  : selectedLanguage === 'english'
                    ? 'A Product of Noteved Siksha Sandhan Pvt. Ltd.'
                    : // : 'कृपया अपनी भाषा प्राथमिकता चुनें'}
                    'A Product of Noteved Siksha Sandhan Pvt. Ltd.'}
              </Text>

              {/* <ImageBackground
              animation="bounceIn"
              duraton="1500"
              // source={require("../assets/splash.png")}
              source={require('../../../assets/enlogo2.png')}
              style={{
                height: device_height * 0.45,
                width: device_width * 0.85,
                marginTop: -20,
                alignItems: 'center',
                justifyContent: 'flex-end',
                borderWidth: 1,
              }}
              resizeMode="contain">
            </ImageBackground> */}
              <View
                style={{
                  alignItems: 'center',
                  marginHorizontal: 10,
                  // marginTop: IsTabScreen ? -5 : -35,
                  // borderWidth:1
                }}>
                <Text style={{ fontWeight: '900', fontSize: 35, color: '#fff' }}>
                  {selectedLanguage === 'odia'
                    ? 'ନୋଟଭେଦ'
                    : selectedLanguage === 'english'
                      ? 'NOTEVED'
                      : // : 'नोटवेद'}
                      'NOTEVED'}
                </Text>
              </View>
            </View>
          )}
          <ScrollView
            style={{ borderWidth: 0 }}
            persistentScrollbar={true}
            showsVerticalScrollIndicator={true}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 12,
                color: '#dee',
                textAlign: 'center',
                marginTop: 5,
                width: device_width * 0.92,
                alignSelf: 'center',
              }}>
              {selectedLanguage === 'odia'
                ? 'ଓଡ଼ିଆ (ବିଏସଇ) ଏବଂ ଇଂରାଜୀ ମାଧ୍ୟମ (ସିବିଏସଇ/ ଆଇସିଏସଇ) ଉଭୟ ବର୍ଗର ଶିକ୍ଷାର୍ଥୀଙ୍କ ପାଇଁ ନିର୍ଭରଯୋଗ୍ୟ ଆପ୍ଲିକେସନ୍ ନୋଟଭେଦ'
                : selectedLanguage === 'english'
                  ? 'Noteved Academy Application is designed for both Odia (BSE) and English medium (CBSE/ICSE) students'
                  : // : ' "नोटवेद एकेडमी एप्लिकेशन ओडिया (बीएसई) और अंग्रेजी माध्यम (सीबीएसई/आईसीएसई) दोनों छात्रों के लिए डिज़ाइन किया गया है",'}
                  'Noteved Academy Application is designed for both Odia (BSE) and English medium (CBSE/ICSE) students'}
            </Text>
            <View
              style={{
                // flexDirection: 'row',
                // alignItems: 'center',
                width: '94%',
                borderWidth: 1,
                borderColor: '#aaa',
                borderRadius: 15,
                backgroundColor: 'rgba(0,255,0,0.2)',
                marginVertical: 20,
                alignSelf: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <FontAwesome name="language" color={'#fff'} size={38} />
                <View style={{ borderWidth: 0, width: '75%', marginVertical: 0 }}>
                  <View style={{ padding: 5, marginTop: 8 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '700',
                        color: '#fff',
                      }}>
                      {selectedLanguage === 'odia'
                        ? 'ଦୟାକରି ଭାଷା ଚୟନ କରନ୍ତୁ'
                        : selectedLanguage === 'english'
                          ? 'Please select your preferred language'
                          : // : 'कृपया अपनी भाषा प्राथमिकता चुनें'}
                          'Please select your preferred language'}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      marginBottom: 5,
                    }}>
                    {language.map(({ name, code, isSelected }) => (
                      <View key={code}>
                        <Chip
                          mode={isSelected ? 'outlined' : 'flat'}
                          style={{
                            marginHorizontal: 5,
                            marginLeft: 0,
                            // padding: 2,
                            borderWidth: 1,
                            borderColor: isSelected ? Colors.goldenrod : '#fff',

                            // borderRadius: 5,
                            // backgroundColor: isSelected ? '#1E88E5' : '#fff',
                            paddingHorizontal: 5,
                            // paddingVertical: 5,
                            // width: '30%',
                            borderRadius: 10,
                            backgroundColor: isSelected ? '#f1a722' : '#fff',
                          }}
                          selectedColor={'#0f6f25'}
                          selected={isSelected}
                          onPress={() => {
                            i18n.changeLanguage(code);
                            // setLanguage(code, dispatch);
                            if (name == 'English') {
                              dispatch(setLanguage('english'));
                            } else if (name == 'ଓଡିଆ') {
                              dispatch(setLanguage('odia'));
                            } else {
                              dispatch(setLanguage('english'));
                            }
                            setLanguages(prevState =>
                              prevState.map(lang =>
                                lang.code === code
                                  ? { ...lang, isSelected: true }
                                  : { ...lang, isSelected: false },
                              ),
                            );
                          }}
                          textStyle={{
                            color: isSelected ? '#0f6f25' : Colors.green,
                            fontWeight: isSelected ? '800' : 'bold',
                          }}>
                          {name}
                        </Chip>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  // borderTopWidth: 1,
                  // borderColor: 'lavender',
                  // alignItems: 'center',
                  paddingVertical: 7,
                  justifyContent: 'center',
                }}>
                <AntDesign
                  style={{
                    marginHorizontal: 10,
                    // marginRight:20
                  }}
                  name={'infocirlce'}
                  size={16}
                  color={'#f1a722'}
                />
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 10,
                    color: '#dee',
                    // marginLeft: 20,
                    width: '85%',
                    // marginBottom: 10,
                    // textAlign:'center'
                  }}>
                  {selectedLanguage === 'odia'
                    ? 'ବି. ଦ୍ର: ଆପଣଙ୍କ ଦ୍ଵାରା ସ୍ଥିରୀକୃତ ଭାଷାରେ ଆପଣ ଆପ୍ଲିକେସନକୁ ଦେଖି ପାରିବେ !'
                    : selectedLanguage === 'english'
                      ? 'Note: You can view the content of the application in the language you have selected'
                      : // : 'नोट: आप एप्लिकेशन की सामग्री को आपके द्वारा चुनी गई भाषा में देख सकते हैं'}
                      'Note: You can view the content of the application in the language you have selected'}
                </Text>
              </View>
            </View>
            <ImageBackground
              style={{
                // height: device_height * 0.5,
                width: device_width,
              }}
              // source={require('../../../assets/jungle.png')}
              // resizeMode="contain"
              >
              <View
                style={{
                  // position: 'absolute',
                  // bottom: 0,
                  // borderWidth: 2,
                  height: device_height * 0.33,
                  width: device_width,
                  justifyContent: 'flex-start',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate('SignInScreen')
                    dispatch(setLanguage(selectedLanguage));
                    navigation.navigate('SignInScreen', {
                      language: selectedLanguage,
                    });
                  }}
                  style={{
                    zIndex: 1,
                    alignItems: 'center',
                    // justifyContent: 'flex-end',
                    justifyContent: 'center',
                    // display: 'flex',
                    alignSelf: 'center',
                    width: '60%',
                    marginHorizontal: 10,
                    flexDirection: 'row',
                    // backgroundColor: '#f1a722',
                    backgroundColor: '#ffff',
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: '#f1a722',
                  }}>
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      // backgroundColor: '#f1a722',
                      borderRadius: 15,
                      paddingVertical: 10,
                      paddingHorizontal: 5,
                      // borderWidth: 1,
                      // borderColor: '#000',
                      // marginHorizontal: 10,
                    }}
                    onPress={() => {
                      // navigation.navigate('SignInScreen')
                      dispatch(setLanguage(selectedLanguage));
                      navigation.navigate('SignInScreen', {
                        language: selectedLanguage,
                      });
                    }}>
                    <Text
                      style={{ fontWeight: '700', fontSize: 14, color: 'green' }}>
                      {selectedLanguage === 'odia'
                        ? 'ଆରମ୍ଭ କର'
                        : selectedLanguage === 'english'
                          ? 'Get Started'
                          : // : 'आरंभ करें'
                          'Get Started'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      // navigation.navigate('SignInScreen')
                      dispatch(setLanguage(selectedLanguage));
                      navigation.navigate('SignInScreen', {
                        language: selectedLanguage,
                      });
                    }}>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={25}
                      color={'green'}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});

export default SplashScreen;
