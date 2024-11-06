import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  Platform,
  StyleSheet,
  Dimensions,
  StatusBar,
  Alert,
  ScrollView,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Iconz from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useTheme } from "react-native-paper";
import {useNavigation, useTheme} from '@react-navigation/native';
import {Modal, RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
// import {LOGIN_URL} from '../../../constants/ApiPaths';
// import axios from "axios";
import Colors from '../../../assets/Colors';
import CommonMessage from '../../../constants/CommonMessage';
import {
  emailRegex,
  handlePhoneNumber,
  name_reg,
  password_regex,
  phoneRegex,
  phoneRegexWithout91,
} from '../../../constants/Constants';
import {device_height, device_width} from '../style';
import {Avatar, Chip} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AuthContext} from '../../../context';
import i18n from 'i18next';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
// import CommonModalUser from '../UserScreens/CommonModalUser';
import {ImageBackground} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useAppSelector} from '../../redux/store/reducerHook';
import {selectStudentLanguage} from '../../redux/reducers/languageReducer';
import {
  getStandard,
  selectStudentStandard,
} from '../../redux/reducers/StandardReducer';
import {getBoard, selectStudentBoard} from '../../redux/reducers/BoardReducer';
import {
  childPhoneVerifyAPI,
  selectVerifyPhInfo,
} from '../../redux/reducers/VerifyPhoneReducer';
import {RegisterNewChild} from '../../redux/actions/RegisterAPI';
const {t: trans} = i18n;
import {loginOtp} from '../../redux/actions/LoginAPI';

import {
  EDZ_LOGIN_CHILD_OTP_VERIFY_URL,
  EDZ_LOGIN_WITH_PASSWORD_URL,
  LOGIN_CHILD_OTP_VERIFY_URL,
} from '../../../constants/ApiPaths';

import {login} from '../../redux/reducers/loginReducer';

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

const SignUpScreen1 = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const device_width = Dimensions.get('window').width;
  const device_height = Dimensions.get('window').height;
  const {
    phone = '',
    email = '',
    otplogin = false,
    emailLogin = '',
    pswdLogin = false,
    isFromGoogleSignIn = false,
    Googleemail =''
  } = route.params;
  //console.log(route.params, '==================route.params');

  // const selectedLanguage = useAppSelector(selectStudentLanguage)
  // console.log(selectedLanguage, "selectedLanguage**********")
  // const Standard = useAppSelector(selectStudentStandard);
  // const Board = useAppSelector(selectStudentBoard);
  const VerifyPhone = useAppSelector(selectVerifyPhInfo);
  console.log(VerifyPhone, 'VerifyPhone**********');

  const {signOut} = useContext(AuthContext);
  // const [language, setLanguages] = useState([
  //   // {name: 'हिंदी', code: 'hi', isSelected: selectedLanguage === 'hindi'},
  //   { name: 'ଓଡିଆ', code: 'odia', isSelected: selectedLanguage === 'odia' },
  //   {
  //     name: 'English',
  //     code: 'english',
  //     isSelected: selectedLanguage === 'english',
  //   },
  //   // {name: 'हिंदी', code: 'hindi', isSelected: selectedLanguage === 'hindi'},

  //   // {name: 'বাঙ্গালি', code: 'bn', isSelected: selectedLanguage === 'bn'},
  // ]);

  const [language, setLanguages] = useState('english');
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      const {width, height} = window;
      setOrientation(height >= width ? 'portrait' : 'landscape');
    });
    console.log(orientation, 'Orientation');
    return () => subscription?.remove();
  }, [orientation]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      // setInputModal1(true);
      BackHandler.addEventListener('hardwareBackPress', () => {
        try {
          GoogleSignin.configure();
          GoogleSignin.signOut();
          // setState({ user: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
          // console.error(error, '========signout error');
        }
        navigation.goBack();
        setInfo({});
        return true;
      });
    });
    return () => {
      // setInputModal1(true);
      BackHandler.removeEventListener('hardwareBackPress', () => {
        try {
          GoogleSignin.configure();
          GoogleSignin.signOut();
          // setState({ user: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
          // console.error(error, '========signout error');
        }
        setInfo({});
        navigation.goBack();
        return true;
      });
    };
  }, []);

  const goBackFunction = () => {
    // console.log('goBackFunction called===============');
    try {
      GoogleSignin.configure();
      GoogleSignin.signOut();
      // setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      // console.error(error, '========signout error');
    }
    setInfo({});
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    if (phone != '') {
      dispatch(childPhoneVerifyAPI(phone));
    }
    // dispatch(getBoard());
    // dispatch(getStandard());
    // i18n.changeLanguage(selectedLanguage);
  }, []);

  const data = [
    {
      label: '8',
      value: '8',
    },
    {
      label: '9',
      value: '9',
    },
    {
      label: '10',
      value: '10',
    },
    {
      label: '11',
      value: '11',
    },
    {
      label: '12',
      value: '12',
    },
    {
      label: '13',
      value: '13',
    },
    {
      label: '14',
      value: '14',
    },
    {
      label: '15',
      value: '15',
    },
  ];

  const {signIn} = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const [infoModal, setInfoModal] = useState();
  const [info, setInfo] = useState({
    id: '',
    phone_secondary: '',
    username: '',
    secureTextEntry: true,
    confirmSecureTextEntry: true,
    updateSecureTextEntry: true,
    ref_Code: '',
    st_email: email != '' ? email : '',
    parents_phone: '',
    fname: '',
    lname: '',
    father_name: '',
    mother_name: '',
    father_phone: '',
    st_age: '',
    school_name: '',
    board_name: 1,
    boardid: '',
    stage: 5,
    stageid: '',
    st_address: '',
    // standard:stageid != '' ? stageid : '5',
    // standard: '',
    st_phone: phone != '' ? phone : '',
    password: '',
    confirmPassword: '',
    gender: '',
    isValidFstName: false,
    isValidLstName: false,
    isValidEmail: false,
    isValidUser: false,
    isValidPassword: false,
    check_textInputChange: false,
    otp: '',
  });
  const [dob, setDob] = useState('');
  const {
    fname,
    lname,
    st_phone,
    st_email,
    father_phone,
    gender,
    father_name,
    mother_name,
    parents_phone,
    school_name,
    board_name,
    boardid,
    stage,
    stageid,
    st_age,
    st_address,
    ref_Code,
    id,
    username,
    password,
    confirmPassword,
    secureTextEntry,
    confirmSecureTextEntry,
    otp,
  } = info;
  const [agevalue, setAgeValue] = useState('');
  // console.log(agevalue, 'agevalue..............');
  const [showprog, setshowprog] = useState(false);
  const [phoneerror, setPhoneerror] = useState(false);
  const [fnameError, setFnameError] = useState(false);
  const [lnameError, setLnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [refCodeError, setRefCodeError] = useState(false);
  const [mismatchError, setmismatchError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [genderVal, setGender] = useState('');
  const [fatherNameError, setFatherNameError] = useState(false);
  const [motherNameError, setMotherNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [standardError, setStandardError] = useState(false);
  const [boardError, setBoardError] = useState(false);
  const [altPhoneError, setAltPhoneError] = useState(false);
  const [schoolNameError, setSchoolNameError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleInputChange = (inputName: string, inputValue: string) => {
    if (inputName == 'st_phone') {
      // if (phoneRegex.test(inputValue)) {
      if (phoneRegexWithout91.test(inputValue)) {
        setPhoneerror(false);
        dispatch(childPhoneVerifyAPI(inputValue));
      } else {
        setPhoneerror(true);
      }
    } else if (inputName == 'fname') {
      if (!name_reg.test(inputValue)) {
        setFnameError(true);
      } else {
        setFnameError(false);
      }
    } else if (inputName == 'father_name') {
      if (!name_reg.test(inputValue)) {
        setFatherNameError(true);
      } else {
        setFatherNameError(false);
      }
    } else if (inputName == 'lname') {
      if (inputValue != '') {
        if (!name_reg.test(inputValue)) {
          setLnameError(true);
        } else {
          setLnameError(false);
        }
      } else {
        setLnameError(false);
      }
    } else if (inputName == 'password') {
      // if (!password_regex.test(inputValue)) {
      if (inputValue != '' && inputValue.length < 6) {
        setPasswordError(true);
        // setConfirmPasswordError(true);
        setmismatchError(false);
      } else {
        setPasswordError(false);
        setConfirmPasswordError(false);
        if (inputValue == info.confirmPassword) {
          // setmismatchError(false);
          setConfirmPasswordError(false);
        } else {
          // setmismatchError(true);
          setConfirmPasswordError(true);
        }
      }
    } else if (inputName == 'confirmPassword') {
      // if (!password_regex.test(inputValue)) {
      if (inputValue != '' && inputValue.length < 6) {
        setConfirmPasswordError(true);
        setmismatchError(false);
      } else if (inputValue !== info.password) {
        setConfirmPasswordError(false);
        setmismatchError(true);
        // if (inputValue == info.password) {
        //   setmismatchError(false);
        // } else {
        //   setmismatchError(true);
        // }
      } else if (inputValue == info.password) {
        setConfirmPasswordError(false);
        setmismatchError(false);
      } else {
        setConfirmPasswordError(false);
      }
    } else if (inputName == 'st_email') {
      if (inputValue != '') {
        if (emailRegex.test(inputValue)) {
          setEmailError(false);
        } else {
          setEmailError(true);
        }
      } else {
        setEmailError(false);
      }
    }
    let infodata = {...info};
    setInfo({...infodata, [inputName]: inputValue});
  };

  const email_regex_validate = emailRegex.test(st_email);
  const phone_regex_validate = phoneRegex.test(st_phone);
  const phone_regex_without_91_validate = phoneRegexWithout91.test(st_phone);

  const navigationFunction = () => {
    setInfoModal(false);
    navigation.navigate('SignInScreen');
  };

  const [showOTPContent, setShowOTPContent] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [otpMisMatchError, setOtpMissMatchError] = React.useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [setOtp, setShowOtp] = useState(false);
  const [count, setCount] = useState(0);
  const [otpError, setOtpError] = React.useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [f1, setF1] = useState('');
  const [f2, setF2] = useState('');
  const [f3, setF3] = useState('');
  const [f4, setF4] = useState('');
  const [f5, setF5] = useState('');
  const [f6, setF6] = useState('');

  const btn1 = useRef();
  const btn2 = useRef();
  const btn3 = useRef();
  const btn4 = useRef();
  const btn5 = useRef();
  const btn6 = useRef();

  const emptyBtns =
    f1 == '' && f2 == '' && f3 == '' && f4 == '' && f5 == '' && f6 == '';

  const [otpData, setOtpData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isValidOtp: true,
  });
  const handleReset = () => {
    setF1('');
    setF2('');
    setF3('');
    setF4('');
    setF5('');
    setF6('');
    setShowOtp(false);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (count == 0) {
        clearInterval(interval);
      } else {
        setCount(count - 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [count, clicked]);

  const OTPhandle = async () => {
    if (emptyBtns == true) {
      setOtpError(true);
    }
    const enteredOTP = f1 + f2 + f3 + f4 + f5 + f6;

    const validate = info.st_phone != '' && enteredOTP != '';
    let phone_validate = false;
    if (info.st_phone) {
      phone_validate = phoneRegex.test(info.st_phone);
    }

    if (validate == false) {
      const otpvalidate =
        f1 == '' && f2 == '' && f3 == '' && f4 == '' && f5 == '' && f6 == '';
      if (info.st_phone == '' || phone_validate == false) {
        setPhoneError(true);
      } else {
        setPhoneError(false);
      }
      if (otpvalidate) {
        setOtpError(true);
        setOtpMissMatchError(false);
      } else {
        setOtpError(false);
        setOtpMissMatchError(false);
      }
    } else if (
      otpError == true &&
      phoneError == true &&
      otpMisMatchError == true
    ) {
      ToastAndroid.showWithGravityAndOffset(
        'Please enter valid input',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      let confirmVal = handlePhoneNumber(st_phone);
      phone_validate = phoneRegex.test(confirmVal);
      if (phone_validate) {
        const body = {
          phone: confirmVal,
          senderid: '',
          status: '',
          otp: enteredOTP,
        };
        console.log(body, '==========EDZ_LOGIN_CHILD_OTP_VERIFY_URL');
        await axios
          .post(EDZ_LOGIN_CHILD_OTP_VERIFY_URL, body)
          .then(function (response) {
            const {
              authtoken = '',
              message = '',
              status,
              user = [],
              newUser = false,
            } = response.data;
            console.log(
              response.data,
              '==============EDZ_LOGIN_CHILD_OTP_VERIFY_URL response',
            );
            if (user.length > 0 && user[0].status == 'active') {
              signIn(response.data);
              dispatch(login(response.data));
              signIn(response.data);
              signIn(user, authtoken);
              const tokenstore = Storage.storeObject(
                '@auth_Token',
                response.data.authtoken,
              );
              const userdata = Storage.storeObject(
                '@user',
                response.data.user[0],
              );
              console.log(
                tokenstore,
                '=========tokenstore',
                userdata,
                '----userdata------------------------',
              );
            } else if (response.data.message == "OTP didn't match") {
              setOtpMissMatchError(true);
              setOtpError(false);
            } else if (response.data.message == 'OTP verified Successfully') {
              {
                setOtpVerified(true);
                //selectedLanguage == 'english'
                CommonMessage(
                  'Mobile phone number has been verified successfully !',
                );
              }
              handleReset();
              Storage.storeObject('newUser', String(user.length == 0));
            }
          })
          .catch(function (error) {
            // handle error
          })
          .finally(function () {
            // always executed
          });
      }
    }
  };
  const loginphoneHandle = async () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
    setF1('');
    setF2('');
    setF3('');
    setF4('');
    setF5('');
    setF6('');
    setOtpMissMatchError(false);
    const validate = info.st_phone == '';
    let phone_validate = false;
    if (info.st_phone) {
      phone_validate = phoneRegex.test(info.st_phone);
    }
    if (validate) {
      if (info.st_phone == '' || phone_validate == false) {
        setPhoneError(true);
      } else {
        setPhoneError(false);
      }
    } else if (phone_validate == false) {
      ToastAndroid.showWithGravityAndOffset(
        'Please enter valid phone number',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      setShowOtp(true);
      let phone_validate = false;
      const phoneVal = info.st_phone;
      let confirmVal = handlePhoneNumber(phoneVal);
      //
      phone_validate = phoneRegex.test(confirmVal);

      if (phone_validate) {
        const bodydata = {
          phone: confirmVal,
        };
        loginOtp(bodydata, () => setCount(30));
      }
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#272727'} barStyle="light-content" />
      <ImageBackground
        style={{
          // borderRadius: 50,
          // borderWidth: 1,
          width: device_width,
          height: device_height,
          // borderRadius: 25,
          flex: 1,
          alignSelf: 'center',
          //backgroundColor: '#272727'
          // justifyContent: 'center',
          // alignItems: 'center',
        }}
        resizeMode="cover"
        source={require('../../../assets/0.png')}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: Colors.secondary,
            marginBottom: 10,
          }}>
          <TouchableOpacity
            onPress={() => goBackFunction()}
            style={{paddingLeft: 10, position: 'absolute', left: 0}}>
            <MaterialIcons
              name="keyboard-arrow-left"
              size={30}
              // backgroundColor={Colors.secondary}
              color={'#fff'}
              onPress={() => goBackFunction()}
            />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 23,
              color: '#fff',
              marginLeft: 10,
              textTransform: 'capitalize',
              fontWeight: '600',
            }}>
            {trans(`New Account`)}
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          <Animatable.View
            style={{top: 10}}
            animation="fadeInLeft"
            duration={500}>
            <FastImage
              style={{
                height: device_height * 0.15,
                width: device_width * 0.28,
                marginLeft: -2,
                // borderWidth:1
              }}
              //source={require('../../../assets/aa.png')}
              // resizeMode="contain"
            />
          </Animatable.View>
          <Animatable.View
            animation="fadeInUpBig"
            style={{
              flex: 1,
              // backgroundColor: Colors.secondary,
              // borderTopLeftRadius: 30,
              // borderTopRightRadius: 30,
              paddingHorizontal: 20,
              marginTop: -30,
              // borderWidth:1,
              zIndex: -1,
            }}>
            <View
              style={{
                // backgroundColor: '#000',
                // position:'absolute',
                // borderWidth:1,
                borderColor: 'red',
                // flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <View
                  style={{
                    borderRadius: 15,
                    borderWidth: 1,
                    // elevation:10,
                    borderColor: '#999',
                    minHeight: device_height * 0.55,
                    minWidth: device_width * 0.9,
                    paddingHorizontal: 20,
                    backgroundColor: 'rgba(0,255,0,0.11)',
                    // backgroundColor:'#263d2d',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <View
                      style={{
                        alignItems: 'center',
                        // borderWidth:1
                      }}>
                      <View>
                        <View
                          style={{
                            alignItems: 'center',
                            paddingVertical: 15,
                            // borderWidth: 1,
                            borderColor: '#ccc',
                            elevation: 10,
                            width: device_width * 0.89,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                            backgroundColor: '#2c581f',
                            marginLeft: -26,
                            marginRight: -26,
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              width: device_width * 0.7,
                              fontSize: 15,
                              color: '#dee',
                              marginTop: 5,
                              // marginLeft: 5,
                              fontWeight: '700',
                            }}>
                            {/* {trans('Complete Your Registration ')} */}
                            {'Complete Your Registration '}
                            <Text style={{fontWeight: '900', fontSize: 16}}>
                              {/* {trans('1/5')} */}
                              {'1/4'}
                            </Text>
                          </Text>
                        </View>
                        <View
                          style={{
                            // marginTop: 5,
                            // paddingBottom: 5,
                            // marginTop: Platform.OS === 'ios' ? 0 : -12,
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderBottomColor: '#f2f2f2',
                            marginVertical: 10,
                            backgroundColor: '#fff',
                            elevation: 10,
                            borderRadius: 8,
                            height: 50,
                            paddingLeft: 20,
                            alignItems: 'center',
                            borderWidth:
                              fname == '' ? 1 : fnameError == true ? 1 : 0,
                            borderColor:
                              fname == ''
                                ? 'darkorange'
                                : fnameError == true
                                ? 'darkorange'
                                : '#fff',
                          }}>
                          <FontAwesome
                            name="user"
                            color={'#263d2d'}
                            size={22}
                          />
                          <TextInput
                            // placeholder={trans(`Student's first name *`)}
                            placeholder={`Student's first name *`}
                            placeholderTextColor="#666666"
                            value={fname}
                            style={{
                              color: '#333',
                              flex: 1,
                              fontSize: 15,
                              fontWeight: '600',
                              paddingLeft: 10,
                            }}
                            autoCapitalize="none"
                            onChangeText={val =>
                              handleInputChange('fname', val)
                            }
                          />
                        </View>

                        {fname == '' ? (
                          <Animatable.View
                            animation="fadeInLeft"
                            style={{alignItems: 'flex-start'}}
                            duration={500}>
                            <Text
                              style={{
                                color: 'darkorange',
                                marginBottom: 5,
                                marginTop: -3,
                                textAlign: 'left',
                                marginLeft: 5,
                              }}>
                              {/* {trans('Please enter valid first name')} */}
                              {'Please enter valid first name'}
                            </Text>
                          </Animatable.View>
                        ) : fnameError ? (
                          <Animatable.View
                            animation="fadeInLeft"
                            duration={500}>
                            <Text
                              style={{
                                color: 'darkorange',
                                marginBottom: 5,
                                marginTop: 5,
                                marginLeft: 5,
                              }}>
                              {/* {trans('Please enter valid first name')} */}
                              {'Please enter valid first name'}
                            </Text>
                          </Animatable.View>
                        ) : (
                          <></>
                        )}
                        <View
                          style={{
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderBottomColor: '#f2f2f2',
                            marginVertical: 10,
                            backgroundColor: '#fff',
                            elevation: 10,
                            borderRadius: 8,
                            height: 50,
                            paddingLeft: 20,
                            alignItems: 'center',
                          }}>
                          <FontAwesome
                            name="user"
                            color={'#263d2d'}
                            size={22}
                          />
                          <TextInput
                            // placeholder={trans(`Student's last name`)}
                            placeholder={`Student's last name`}
                            placeholderTextColor="#666666"
                            value={lname}
                            style={{
                              color: '#333',
                              flex: 1,
                              fontSize: 15,
                              fontWeight: '600',
                              paddingLeft: 10,
                            }}
                            autoCapitalize="none"
                            onChangeText={val =>
                              handleInputChange('lname', val)
                            }
                          />
                        </View>
                        {lnameError && (
                          <Animatable.View
                            animation="fadeInLeft"
                            duration={500}>
                            <Text
                              style={{
                                color: 'darkorange',
                                marginBottom: 5,
                                marginTop: -3,
                                marginLeft: 5,
                              }}>
                              {/* {trans('Please enter valid last name')} */}
                              {'Please enter valid last name'}
                            </Text>
                          </Animatable.View>
                        )}
                        <View
                          style={{
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderBottomColor: '#f2f2f2',
                            marginVertical: 10,
                            backgroundColor: '#fff',
                            elevation: 10,
                            borderRadius: 8,
                            height: 50,
                            paddingLeft: 20,
                            alignItems: 'center',
                            borderWidth:
                              st_phone == '' ? 1 : phoneerror == true ? 1 : 0,
                            borderColor:
                              st_phone == ''
                                ? 'darkorange'
                                : phoneerror == true
                                ? 'darkorange'
                                : '#fff',
                          }}>
                          <FontAwesome5
                            name="phone-alt"
                            color={'#263d2d'}
                            size={20}
                          />
                          <Text
                            style={{
                              color: '#666',
                              // flex: 1,
                              paddingLeft: 10,
                              fontSize: 15,
                              fontWeight: '600',
                              marginBottom: 2,
                            }}>
                            {'+91  |'}
                          </Text>
                          <TextInput
                            // placeholder={trans(`Student's Phone Number`)}
                            placeholder={`Student's Phone Number`}
                            placeholderTextColor="#666666"
                            value={st_phone}
                            style={{
                              color: '#333',
                              flex: 1,
                              fontSize: 15,
                              fontWeight: '600',
                              paddingLeft: 10,
                            }}
                            autoCapitalize="none"
                            // maxLength={13}
                            onChangeText={val =>
                              handleInputChange('st_phone', val)
                            }
                          />
                          {/* )} */}
                        </View>
                        {VerifyPhone != undefined &&
                        Object.keys(VerifyPhone).length !== 0 &&
                        phone_regex_without_91_validate == true &&
                        VerifyPhone.newUser == false &&
                        VerifyPhone.message === 'User already registered' ? (
                          <Animatable.View
                            animation="fadeInLeft"
                            duration={500}>
                            <Text
                              style={{
                                color: 'darkorange',
                                marginBottom: 10,
                                // marginTop: -10,
                                marginLeft: 5,
                              }}>
                              {'User already registered !'}
                            </Text>
                          </Animatable.View>
                        ) : VerifyPhone != undefined &&
                          Object.keys(VerifyPhone).length !== 0 &&
                          phone_regex_without_91_validate == true &&
                          VerifyPhone.newUser == true &&
                          VerifyPhone.message === 'User not registered' ? (
                          <Animatable.View
                            animation="fadeInLeft"
                            duration={500}>
                            <Text
                              style={{
                                color: 'lawngreen',
                                marginBottom: 10,
                                // marginTop: -10,
                                marginLeft: 5,
                              }}>
                              <Feather
                                name="check-circle"
                                color="lawngreen"
                                size={17}
                              />
                              {'  '}
                              {'New user !'}
                            </Text>
                            <TouchableOpacity
                              onPress={() => {
                                setShowOTPContent(true);
                              }}
                              style={{
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                height: 70,
                              }}>
                              <View
                                style={{
                                  height: 51,
                                  width: 51,
                                  alignItems: 'center',
                                  borderRadius: 50,
                                }}>
                                <Avatar.Image
                                  source={require('../../../assets/msg.jpg')}
                                  size={40}
                                  style={{backgroundColor: '#fff'}}
                                />
                              </View>
                              <Text
                                style={{
                                  fontWeight: '800',
                                  color: '#fff',
                                  textAlign: 'center',
                                  textDecorationLine: 'underline',
                                  fontSize: 13,
                                  alignSelf: 'center',
                                }}>
                                {'Verify with OTP'}
                              </Text>
                            </TouchableOpacity>
                          </Animatable.View>
                        ) : (
                          <></>
                        )}
                        {st_phone == '' ? (
                          <Animatable.View
                            animation="fadeInLeft"
                            duration={500}>
                            <Text
                              style={{
                                color: 'darkorange',
                                marginBottom: 10,
                                marginTop: -3,
                                marginLeft: 5,
                              }}>
                              {/* {trans('Please enter 10 digit phone number')} */}
                              {'Please enter 10 digit phone number'}
                            </Text>
                          </Animatable.View>
                        ) : (
                          phoneerror && (
                            <Animatable.View
                              animation="fadeInLeft"
                              duration={500}>
                              <Text
                                style={{
                                  color: 'darkorange',
                                  marginBottom: 10,
                                  // marginTop: -10,
                                  marginLeft: 5,
                                }}>
                                {/* {trans('Please enter 10 digit phone number')} */}
                                {'Please enter 10 digit phone number'}
                              </Text>
                            </Animatable.View>
                          )
                        )}
                      </View>
                    </View>
                    <View
                      style={{
                        // borderWidth: 1,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignSelf: 'center',
                        marginTop: 10,
                      }}>
                      <TouchableOpacity
                        disabled={
                          (isFromGoogleSignIn &&
                            fname != '' &&
                            fnameError == false) ||
                          (st_phone != '' &&
                            otpVerified &&
                            fname != '' &&
                            phoneerror == false &&
                            VerifyPhone != undefined &&
                            Object.keys(VerifyPhone).length > 0 &&
                            VerifyPhone.message === 'User not registered' &&
                            fnameError == false)
                            ? false
                            : true
                        }
                        style={{
                          borderRadius: 10,
                          width: '30%',
                          marginVertical: 5,
                          backgroundColor:
                            (isFromGoogleSignIn &&
                              fname != '' &&
                              fnameError == false) ||
                            (st_phone != '' &&
                              otpVerified &&
                              fname != '' &&
                              phoneerror == false &&
                              VerifyPhone != undefined &&
                              Object.keys(VerifyPhone).length > 0 &&
                              VerifyPhone.message === 'User not registered' &&
                              fnameError == false)
                              ? '#a3b448'
                              : '#ccc',
                          paddingVertical: 10,
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          navigation.navigate('SignUpScreen2', {
                            fname: fname,
                            lname: lname,
                            st_phone: st_phone,
                            phone: phone,
                            email: email,
                            otplogin: otplogin,
                            emailLogin: emailLogin,
                            pswdLogin: pswdLogin,
                            isFromGoogleSignIn: isFromGoogleSignIn,
                            Googleemail: Googleemail
                          });
                          // setInputModal1(false);
                          // setInputModal2(true);
                        }}>
                        <Text
                          style={{
                            color:
                              (isFromGoogleSignIn &&
                                fname != '' &&
                                fnameError == false) ||
                              (st_phone != '' &&
                                otpVerified &&
                                fname != '' &&
                                phoneerror == false &&
                                VerifyPhone != undefined &&
                                Object.keys(VerifyPhone).length > 0 &&
                                VerifyPhone.message === 'User not registered' &&
                                fnameError == false)
                                ? 'white'
                                : '#666',
                            fontSize: 13,
                            fontWeight: '600',
                            textAlign: 'center',
                            alignItems: 'center',
                          }}>
                          {'Next'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Animatable.View>
        </ScrollView>
        {infoModal && (
          <Modal transparent={true} visible={infoModal}>
            <View
              style={{
                backgroundColor: '#fff',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <View
                  style={{
                    borderRadius: 15,
                    borderWidth: 1,
                    minHeight: device_height * 0.35,
                    minWidth: device_width * 0.8,
                    backgroundColor: '#fff',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <View style={{alignItems: 'center', paddingVertical: 15}}>
                        <View
                          style={{
                            borderColor: 'green',
                            borderRadius: 50,
                            elevation: 15,
                            backgroundColor: '#dee',
                          }}>
                          <MaterialIcons
                            name="info"
                            color={'orange'}
                            size={50}
                          />
                        </View>

                        <Text
                          style={{
                            textAlign: 'center',
                            width: device_width * 0.8,
                            fontSize: 17,
                            color: '#333',
                            marginTop: 10,
                            marginLeft: 10,
                            fontWeight: '900',
                          }}>
                          {trans('User Already Registered with this number')}
                        </Text>
                        <Text
                          style={{
                            textAlign: 'center',
                            width: device_width * 0.7,
                            fontSize: 15,
                            color: '#666',
                            marginTop: 5,
                            fontWeight: '500',
                          }}>
                          {trans('Please try new number or login instead')}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        paddingVertical: 15,
                        alignItems: 'center',
                        marginTop: 10,
                        marginLeft: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        padding: 10,
                      }}>
                      <TouchableOpacity
                        style={{
                          borderRadius: 10,
                          width: '30%',
                          marginVertical: 5,
                          borderWidth: 1,
                          marginRight: 25,
                          borderColor: 'white',
                          backgroundColor: Colors.primary,
                          paddingVertical: 5,
                          justifyContent: 'center',
                        }}
                        onPress={() => navigationFunction()}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 15,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            alignItems: 'center',
                          }}>
                          {trans('OK')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        )}
        {showOTPContent && (
          <Modal
            transparent={true}
            visible={showOTPContent}
            backdropTransitionInTiming={50}
            backdropTransitionOutTiming={50}
            onBackdropPress={() => setShowOTPContent(false)}
            onBackButtonPress={() => setShowOTPContent(false)}>
            <View
              style={{
                width: device_width * 1.28,
                height: device_height * 0.3,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: 10,
                paddingVertical: 20,
                paddingHorizontal: 20,
              }}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 1,
                  borderRadius: 50,
                  padding: 5,
                  marginRight: 30,
                  right: 30,
                }}
                onPress={() => setShowOTPContent(false)}>
                <MaterialCommunityIcons
                  name="close-circle"
                  size={40}
                  style={{
                    color: 'red',
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#000',
                  fontWeight: '700',
                  fontSize: 24,
                }}>
                {trans('Verify the number')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 10,
                  marginTop: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.secondary,
                  width: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    borderColor: '#ccc',
                    borderRadius: 3,
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    backgroundColor: '#fff',
                    elevation: 10,
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: '900',
                      fontSize: 18,
                    }}>
                    {' '}
                    +91
                  </Text>
                </View>
                <TextInput
                  placeholder={`Enter Mobile Number *`}
                  placeholderTextColor="#888"
                  keyboardType="numeric"
                  style={{
                    color: '#000',
                    textAlign: 'center',
                    width: '80%',
                    backgroundColor: '#fff',
                    elevation: 10,
                    borderColor: '#ccc',
                    borderRadius: 3,
                    height: 45,
                    marginLeft: 10,
                    fontSize: st_phone.length < 10 ? 13 : 18,
                    fontWeight: '900',
                  }}
                  value={st_phone}
                  onChangeText={val => handleInputChange('st_phone', val)}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  top: 20,
                  width: '80%',
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    width: '40%',
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    backgroundColor: '#f1a722',
                  }}
                  disabled={false}
                  onPress={() => {
                    loginphoneHandle();
                    setShowOTPContent(false);
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '900',
                      color: '#000',
                      fontFamily: 'Yaldevi-Bold',
                    }}>
                    {`Continue`}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
        {setOtp == true ? (
          <Modal transparent={true} visible={setOtp}>
            <View
              style={{
                width: device_width * 1.28,
                height: device_height * 0.3,
                paddingTop: 30,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: 10,
                paddingVertical: 20,
                paddingHorizontal: 20,
              }}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 1,
                  borderRadius: 50,
                  padding: 5,
                  marginRight: 30,
                  right: 30,
                }}
                onPress={() => setShowOtp(false)}>
                <MaterialCommunityIcons
                  name="close-circle"
                  size={40}
                  style={{
                    color: 'red',
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 15,
                  color: '#333',
                  fontWeight: '900',
                }}>
                {'Sending SMS Code to'}{' '}
                <Text style={{fontSize: 18, color: 'green', fontWeight: '900'}}>
                  {info.st_phone}
                </Text>
              </Text>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: device_width * 0.65,
                  paddingHorizontal: 5,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 7,
                  backgroundColor: '#ccc',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#333',
                    fontWeight: '800',
                  }}>
                  {'Enter OTP Code'}
                </Text>

                <View
                  style={{
                    paddingHorizontal: 8,
                    marginTop: 10,
                    paddingVertical: 7,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    backgroundColor: '#f1a722',
                    borderRadius: 5,
                    paddingBottom: 5,
                  }}>
                  <TextInput
                    ref={btn1}
                    style={{
                      height: 30,
                      width: 25,
                      borderWidth: 1,
                      borderRadius: 5,
                      marginHorizontal: 3,
                      textAlign: 'center',
                      fontWeight: '700',
                      fontSize: 20,
                      borderColor: '#000',
                      letterSpacing: 5,
                      color: '#000',
                      paddingBottom: -10,
                      paddingTop: -15,
                    }}
                    keyboardType="number-pad"
                    maxLength={6}
                    value={f1}
                    onChangeText={txt => {
                      setF1(txt);
                      if (txt.length >= 1) {
                        btn2.current.focus();
                      }
                    }}
                    onKeyPress={({nativeEvent}) => {
                      if (nativeEvent.key === 'Backspace' && f1 === '') {
                        btn1.current.focus();
                      }
                    }}
                  />
                  <TextInput
                    ref={btn2}
                    style={{
                      height: 30,
                      width: 25,
                      borderWidth: 1,
                      borderRadius: 5,
                      marginHorizontal: 3,
                      textAlign: 'center',
                      fontWeight: '700',
                      fontSize: 18,
                      borderColor: '#000',
                      color: '#000',
                      paddingBottom: -10,
                      paddingTop: -15,
                    }}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={f2}
                    onChangeText={txt => {
                      setF2(txt);
                      if (txt.length >= 1) {
                        btn3.current.focus();
                      } else if (txt.length < 1) {
                        btn1.current.focus();
                      }
                    }}
                    onKeyPress={({nativeEvent}) => {
                      if (nativeEvent.key === 'Backspace') {
                        btn1.current.focus();
                      }
                    }}
                  />
                  <TextInput
                    ref={btn3}
                    style={{
                      height: 30,
                      width: 25,
                      borderWidth: 1,
                      borderRadius: 5,
                      marginHorizontal: 3,
                      textAlign: 'center',
                      fontWeight: '900',
                      fontSize: 18,
                      borderColor: '#000',
                      color: '#000',
                      paddingBottom: -10,
                      paddingTop: -15,
                    }}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={f3}
                    onChangeText={txt => {
                      setF3(txt);
                      if (txt.length >= 1) {
                        btn4.current.focus();
                      } else if (txt.length < 1) {
                        btn2.current.focus();
                      }
                    }}
                    onKeyPress={({nativeEvent}) => {
                      if (nativeEvent.key === 'Backspace') {
                        btn2.current.focus();
                      }
                    }}
                  />
                  <TextInput
                    ref={btn4}
                    style={{
                      height: 30,
                      width: 25,
                      borderWidth: 1,
                      borderRadius: 5,
                      marginHorizontal: 3,
                      textAlign: 'center',
                      fontWeight: '900',
                      fontSize: 18,
                      borderColor: '#000',
                      color: '#000',
                      paddingBottom: -10,
                      paddingTop: -15,
                    }}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={f4}
                    onChangeText={txt => {
                      setF4(txt);
                      if (txt.length >= 1) {
                        btn5.current.focus();
                      } else if (txt.length < 1) {
                        btn3.current.focus();
                      }
                    }}
                    onKeyPress={({nativeEvent}) => {
                      if (nativeEvent.key === 'Backspace') {
                        btn3.current.focus();
                      }
                    }}
                  />
                  <TextInput
                    ref={btn5}
                    style={{
                      height: 30,
                      width: 25,
                      borderWidth: 1,
                      borderRadius: 5,
                      marginHorizontal: 3,
                      textAlign: 'center',
                      fontWeight: '900',
                      fontSize: 18,
                      borderColor: '#000',
                      color: '#000',
                      paddingBottom: -10,
                      paddingTop: -15,
                    }}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={f5}
                    onChangeText={txt => {
                      setF5(txt);
                      if (txt.length >= 1) {
                        btn6.current.focus();
                      } else if (txt.length < 1) {
                        btn4.current.focus();
                      }
                    }}
                    onKeyPress={({nativeEvent}) => {
                      if (nativeEvent.key === 'Backspace') {
                        btn4.current.focus();
                      }
                    }}
                  />
                  <TextInput
                    ref={btn6}
                    style={{
                      height: 30,
                      width: 25,
                      borderWidth: 1,
                      borderRadius: 5,
                      marginHorizontal: 3,
                      textAlign: 'center',
                      fontWeight: '900',
                      fontSize: 18,
                      borderColor: '#000',
                      color: '#000',
                      paddingBottom: -10,
                      paddingTop: -15,
                    }}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={f6}
                    onChangeText={txt => {
                      setF6(txt);
                      if (txt.length >= 1) {
                        btn6.current.focus();
                      } else if (txt.length < 1) {
                        btn5.current.focus();
                      }
                    }}
                    onKeyPress={({nativeEvent}) => {
                      if (nativeEvent.key === 'Backspace') {
                        btn5.current.focus();
                      }
                    }}
                    onSubmitEditing={() => OTPhandle()}
                  />
                </View>

                {otpData.check_textInputChange ? (
                  <Animatable.View animation="bounceIn">
                    <Feather
                      name="check-circle"
                      style={{paddingTop: 12, marginRight: 10}}
                      color="green"
                      size={20}
                    />
                  </Animatable.View>
                ) : null}
                {otp != '' &&
                  otp.length == 6 &&
                  !otpError &&
                  !otpMisMatchError && (
                    <Animatable.View animation="bounceIn">
                      <Feather name="check-circle" color="green" size={20} />
                    </Animatable.View>
                  )}
              </View>
              {otpError && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={{color: Colors.red, marginVertical: 0}}>
                    {`**OTP must be 6 digit code`}
                  </Text>
                </Animatable.View>
              )}
              <View style={{marginTop: 5}}>
                {clicked == true ? (
                  <>
                    <ActivityIndicator
                      size="small"
                      color={Colors.orange}
                      style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                      }}
                    />
                  </>
                ) : (
                  <>
                    {setOtp == true && count != 0 ? (
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: Colors.primary,
                          textAlign: 'center',
                        }}>
                        {`${count} `}
                        {'seconds'}
                      </Text>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontWeight: '800',
                            color: count == 0 ? Colors.primary : '#000',
                            fontSize: 12,
                          }}
                          onPress={() => {
                            loginphoneHandle();
                          }}>
                          {'Not Received SMS Code Yet ?'}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            loginphoneHandle();
                          }}
                          style={{
                            backgroundColor: 'saddlebrown',
                            paddingVertical: 8,
                            borderRadius: 15,
                            paddingHorizontal: 25,
                            marginLeft: 10,
                          }}>
                          <Text
                            style={{
                              fontWeight: '700',
                              fontSize: 11,
                              color: count == 0 ? '#fff' : '#999',
                            }}>
                            {`Resend `}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </>
                )}
              </View>
              {otpMisMatchError && (
                <Animatable.View animation="bounceIn" duration={500}>
                  <Text style={{color: '#FF0000', fontSize: 13}}>
                    {`OTP didn't match ! Please check`}
                  </Text>
                </Animatable.View>
              )}
              <TouchableOpacity
                style={{
                  backgroundColor: '#f1a722',
                  flexDirection: 'row',
                  width: '40%',
                  marginTop: 10,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}
                onPress={() => {
                  OTPhandle();
                }}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#000',
                      fontWeight: '900',
                      textAlign: 'center',
                    },
                  ]}>
                  {`Verify & Sign In`}
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        ) : (
          <></>
        )}
      </ImageBackground>
    </View>
  );
};

export default SignUpScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.8,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    // paddingBottom: 50,
  },
  placeholderStyle: {
    color: '#666666',
    paddingLeft: 10,
    fontSize: 15,
    flex: 1,
    fontWeight: '600',
  },
  label: {
    position: 'absolute',
    backgroundColor: '#000',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  selectedTextStyle: {
    color: '#666666',
    paddingLeft: 10,
    fontSize: 15,
    flex: 1,
    fontWeight: '600',
  },
  footer: {
    flex: 1,
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text_header: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 35,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    marginVertical: 10,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 20,
  },
  signIn: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
