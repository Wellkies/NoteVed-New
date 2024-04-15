import React, {useEffect, useState, useRef, useMemo} from 'react';
import Storage from '../../utils/AsyncStorage';
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
  Linking,
  Switch,
  ImageBackground,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import {login} from '../../redux/reducers/loginReducer';
import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  useNavigation,
  useTheme,
  NavigationContainerRef,
} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  LOGIN_CHILD_OTP_VERIFY_URL,
  // LOGIN_URL,
  LOGIN_USING_EMAIL_URL,
  LOGIN_WITH_PASSWORD_URL,
  VERIFY_LOGIN_OTP_URL,
} from '../../../constants/ApiPaths';
import Colors from '../../../assets/Colors';
import CommonMessage from '../../../constants/CommonMessage';
import {
  emailRegex,
  handlePhoneNumber,
  password_regex,
  phoneRegex,
} from '../../../constants/Constants';
import {device_width, device_height} from '../style';
import {Avatar, Modal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
// import {
//   createFcmTokenWithDeviceIdAPI,
//   getAppVersionApi,
//   loginOtp,
// } from '../../redux/actions/Action';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../context';
import {ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import UpdateModal from '../CommonScreens/UpdateModal';
import DeviceInfo from 'react-native-device-info';
import Foundation from 'react-native-vector-icons/Foundation';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useAppSelector} from '../../redux/store/reducerHook';
import {selectStudentLanguage} from '../../redux/reducers/languageReducer';
import {LoginOtpVerifyAPI, loginOtp} from '../../redux/actions/LoginAPI';
// import VideoCard from '../AppScreens/VideoCard';
var Spinner = require('react-native-spinkit');

const SignInScreen = ({route}) => {
  const {t: trans, i18n} = useTranslation();
  const navigation = useNavigation();
  const [updateModalStatus, setUpdateModalStatus] = useState(false);
  // const {language: selectedLanguage = ''} = route.params;
  const [appStatus, setAppStatus] = useState({});
  const [appId, setAppId] = useState('');
  const [errorFlag, setErrorFlag] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);
  const [appVersion, setAppVersion] = useState();
  const currentappVersion = DeviceInfo.getVersion();
  const [loading, setLoading] = React.useState(false);
  const {signIn} = React.useContext(AuthContext);
  const {colors} = useTheme();
  // const orientation = useOrientation();
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isValidOtp: true,
  });

  // const {language = ''} = useSelector(state => state.LanguageReducer);
  const selectedLanguage = useAppSelector(selectStudentLanguage);

  const [otpError, setOtpError] = React.useState(false);
  const [otpMisMatchError, setOtpMissMatchError] = React.useState(false);
  const [showOTPContent, setShowOTPContent] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [langModal, setLangModal] = useState(false);
  const [help, setHelp] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [userBlink, setUserBlink] = useState(true);
  const [paused, setPaused] = useState(false);
  // const toggleSwitch = () => {
  //   // setIsEnabled(previousState => !previousState);
  //   setIsEnabled(!isEnabled);
  //   setLangModal(true);
  // };
  let deviceId = DeviceInfo.getDeviceId();
  //

  const dispatch = useDispatch();
  const [info, setInfo] = useState({
    id: '',
    phonenum: '',
    otp: '',
    email: '',
    password: '',
    secureTextEntry: true,
  });
  const {id, phonenum, otp, password, email, secureTextEntry} = info;
  const [showprog, setshowprog] = useState(false);

  const btn1 = useRef();
  const btn2 = useRef();
  const btn3 = useRef();
  const btn4 = useRef();
  const btn5 = useRef();
  const btn6 = useRef();

  const [f1, setF1] = useState('');
  const [f2, setF2] = useState('');
  const [f3, setF3] = useState('');
  const [f4, setF4] = useState('');
  const [f5, setF5] = useState('');
  const [f6, setF6] = useState('');
  const [count, setCount] = useState(0);

  const _retrieveFcmToken = async (deviceId: string) => {
    //
    try {
      //
      // let value = '';
      let value: string | null = null;
      value = await AsyncStorage.getItem('fcmToken');
      // await AsyncStorage.getItem('fcmToken').then(data => {
      //   value = data;
      // });
      //
      const bodyData = {
        deviceid: deviceId,
        usertype: '',
        token: value,
        childname: '',
      };

      if (value !== null) {
        // We have data!!
        // dispatch(createFcmTokenWithDeviceIdAPI(bodyData));///////typescript/////////
        // setFcmToken(value);
        // // //
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setUserBlink(userBlink => !userBlink);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    GoogleSignin.configure();
    navigation.addListener('focus', () => {
      _retrieveFcmToken(deviceId);
      setIsEnabled(false);
    });
    return () => {
      navigation.addListener('focus', () => {
        _retrieveFcmToken(deviceId);
        setIsEnabled(false);
      });
    };
    // dispatch(getAppVersionApi(setAppId, setAppVersion, setAppStatus));
    // //
    // if (appVersion != '' && appVersion != undefined) {
    //   setUpdateModalStatus(
    //     appVersion != '' && appVersion != currentappVersion ? true : false,
    //     false,
    //   );
    //   // if (appVersion != '' && appVersion != currentappVersion) {
    //   //   signOut();
    //   // }
    // }
  }, []);

  useMemo(() => {
    //
    if (appStatus != null && Object.keys(appStatus).length > 0) {
      // console.log(
      //   appStatus,
      //   appStatus.error == true,
      //   appStatus.error,
      //   'appStatus.error',
      // );
      if (appStatus.error == true) {
        setUpdateModalStatus(true);
        setErrorFlag(true);
      }
    }
  }, [appStatus]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.navigate('SplashScreen');
        // navigation.goBack();
        return true;
      });
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        navigation.navigate('SplashScreen');
        // navigation.goBack();
        return true;
      });
    };
  }, []);

  useEffect(() => {
    // if (count != 0) {
    // setShowOTPContent(true);

    const interval = setInterval(() => {
      if (count == 0) {
        clearInterval(interval);
      } else {
        setCount(count - 1);
      }
    }, 1000);
    // }
    return () => {
      clearInterval(interval);
    };
  }, [count]);

  const handleInputChange = (inputName: string, inputValue: string) => {
    let phone_validate: boolean = false;
    let password_validate: boolean = false;
    //const phone_reg = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    if (inputName == 'phonenum') {
      phone_validate = phoneRegex.test(inputValue);

      ////
    }
    if (inputName == 'password') {
      password_validate = !(inputValue != '' && inputValue.length < 6);
      // password_validate = password_regex.test(inputValue);
    }

    if (inputName == 'phonenum') {
      if (phone_validate == false) {
        setPhoneError(true);
        setshowprog(false);
        setOtpMissMatchError(false);
        setF1('');
        setF2('');
        setF3('');
        setF4('');
        setF5('');
        setF6('');
      } else {
        setPhoneError(false);
      }
    } else if (inputName == 'password') {
      if (password_validate == false) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }
    //  else if (inputName == 'otp') {
    //   if (inputValue.length == 6) {
    //     setOtpError(false);
    //     setOtpMissMatchError(false);
    //   } else {
    //     setOtpError(true);
    //     setOtpMissMatchError(false);
    //   }
    // }
    setInfo(Info => ({...Info, [inputName]: inputValue}));
  };

  const loginphoneHandle = async () => {
    setF1('');
    setF2('');
    setF3('');
    setF4('');
    setF5('');
    setF6('');
    setOtpMissMatchError(false);
    // const phone_reg = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    const validate = info.phonenum == '';
    let phone_validate = false;
    if (info.phonenum) {
      phone_validate = phoneRegex.test(info.phonenum);
    }
    if (validate) {
      if (info.phonenum == '' || phone_validate == false) {
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
      setshowprog(true);

      // const inf = { phone: info.phonenum };
      // const bodyFormData = new FormData();
      // bodyFormData.append('phone', info.phonenum);
      let phone_validate = false;
      const phoneVal = info.phonenum;
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

  const handleLoginWithPassword = async () => {
    const validate = info.phonenum != '' && info.password != '';
    // console.log(
    //   validate,
    //   info.phonenum,
    //   'info.phonenum',
    //   'validate...............',
    //   enteredOTP,
    //   'enteredOTP',
    //   info,
    // );
    let phone_validate = false;
    let password_validate = false;
    if (info.phonenum) {
      phone_validate = phoneRegex.test(info.phonenum);
    }
    if (info.password) {
      password_validate = info.password != '' && info.password.length < 6;
      // password_validate = password_regex.test(info.password);
    }

    if (validate == false) {
      if (info.phonenum == '' || phone_validate == false) {
        setPhoneError(true);
      } else {
        setPhoneError(false);
      }
      if (info.password || password_validate == false) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    } else if (passwordError == true) {
      ToastAndroid.showWithGravityAndOffset(
        'Please enter valid password',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (phoneError == true) {
      ToastAndroid.showWithGravityAndOffset(
        'Please enter valid phone number',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      let confirmVal = handlePhoneNumber(phonenum);
      //
      phone_validate = phoneRegex.test(confirmVal);
      if (phone_validate) {
        const body = {
          phone: confirmVal,
          senderid: '',
          status: '',
          password: password,
        };

        console.log(
          body,
          'body............',
          LOGIN_WITH_PASSWORD_URL,
          '================LOGIN_WITH_PASSWORD_URL',
        );
        await axios
          .post(LOGIN_WITH_PASSWORD_URL, body)
          .then(function (response) {
            const {
              status,
              user = [],
              authtoken = '',
              newUser = false,
              message = '',
            } = response.data;
            let statusCheck: string[] = user.map((r: any) => r.status);
            // let passwordCheck = user.map(r => r.password);

            console.log(
              LOGIN_WITH_PASSWORD_URL,
              body,
              'LOGIN_WITH_PASSWORD_URL, body.................',
              response.data,
              '==============LOGIN_WITH_PASSWORD_URL response',
              user.length > 0,
              newUser == false,
              response.data.message,
              'response.data.message',
              user,
              'user.......',
              statusCheck[0],
              '..........statusCheck[0]',
              user.status == 'inactive',
              "user.status == 'inactive'...................",
            );

            // CommonMessage(message);
            // if (user.length > 0) {
            //   // if (obj?.hasOwnProperty('status')) {
            //   if (user.length > 0 && user[0].status == 'active') {
            //     //
            //     signIn(user, authtoken);
            //     const childData = JSON.stringify(user);
            //     AsyncStorage.setItem('userInfo', childData);
            //     // signIn(user, user[0].childid);
            //   } else if (user.length > 0 && user[0].status == 'inactive') {
            //     setModalStatus(true);
            //   } else if (user.length == 0) {
            //     CommonMessage('Please create an account to continue !');
            //     setPaused(true);
            //     navigation.navigate('SignUpScreen', {
            //       phone: '',
            //       email: email,
            //       otplogin: false,
            //       emailLogin: true,
            //       pswdLogin: true,
            //     });
            //     handleReset();
            //     AsyncStorage.setItem('newUser', String(user.length == 0));
            //   } else {
            //     //
            //   }
            //   // } else {
            //   //   setModalStatus(true);
            //   // }
            // } else {
            //   CommonMessage('Please create an account to continue !');
            //   setPaused(true);
            //   navigation.navigate('SignUpScreen', {
            //     phone: '',
            //     email: email,
            //     otplogin: false,
            //     emailLogin: true,
            //     pswdLogin: true,
            //   });
            //   handleReset();
            //   AsyncStorage.setItem('newUser', String(user.length == 0));
            // }

            if (user.length > 0) {
              //
              if (user.length > 0 && statusCheck[0] == 'inactive') {
                setModalStatus(true);
              } else {
                dispatch(login(response.data));
                signIn(response.data);
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
                  'async',
                  userdata,
                  'async------------------------',
                );

                // handleReset();
                // const childData = JSON.stringify(user);
                // Storage.storeObject("@user", childData)
                // AsyncStorage.setItem('userInfo', childData);
                // // localStorage.setItem("userInfo", JSON.stringify(user));
                // // localStorage.setItem("accessToken","77cd4400f54ea04e8a2825ad41ba8a7e3ef8bb5f");
                // navigation.navigate('Home');
              }
              // signIn(user, user[0].childid);
            } else if (response.data.newUser == false) {
              setPasswordError(true);
              // setOtpError(false);
            } else if (response.data.newUser == true) {
              // bottomModalFunc('Profile');
              //
              {
                selectedLanguage == 'english'
                  ? CommonMessage('Please create an account to continue !')
                  : CommonMessage('ଜାରି ରଖିବାକୁ ଦୟାକରି ଏକ ଖାତା ସୃଷ୍ଟି କରନ୍ତୁ!');
              }
              setPaused(true);
              navigation.navigate('SignUpScreen1', {
                phone: phonenum,
                email: '',
                otplogin: false,
                emailLogin: false,
                pswdLogin: true,
              });
              handleReset();
              // let userInfo={...user,phone:phone}
              // AsyncStorage.setItem('newUser', String(user.length == 0));
              Storage.storeObject('newUser', String(user.length == 0));
              // signIn(userInfo,"77cd4400f54ea04e8a2825ad41ba8a7e3ef8bb5f");
            }
          })
          .catch(function (error) {
            // handle error
            //
          })
          .finally(function () {
            // always executed
          });
      }
    }
  };

  const handleReset = () => {
    type Info = {
      id: string;
      phonenum: string;
      otp: string;
    };
    setInfo({id: '', phonenum: '', otp: ''});
    setF1('');
    setF2('');
    setF3('');
    setF4('');
    setF5('');
    setF6('');
    setshowprog(false);
  };

  const OTPhandle = async () => {
    if (emptyBtns == true) {
      setOtpError(true);
    }
    const enteredOTP = f1 + f2 + f3 + f4 + f5 + f6;
    // const enteredOTP = f1;

    const validate = info.phonenum != '' && enteredOTP != '';
    let phone_validate = false;
    if (info.phonenum) {
      phone_validate = phoneRegex.test(info.phonenum);
    }

    if (validate == false) {
      // const otpvalidate = f1 == '';
      const otpvalidate =
        f1 == '' && f2 == '' && f3 == '' && f4 == '' && f5 == '' && f6 == '';
      if (info.phonenum == '' || phone_validate == false) {
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
      let confirmVal = handlePhoneNumber(phonenum);
      //
      phone_validate = phoneRegex.test(confirmVal);
      if (phone_validate) {
        const body = {
          phone: confirmVal,
          senderid: '',
          status: '',
          otp: enteredOTP,
        };
        console.log(body, '==========LOGIN_CHILD_OTP_VERIFY_URL_body');
        await axios
          .post(LOGIN_CHILD_OTP_VERIFY_URL, body)
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
              '==============LOGIN_CHILD_OTP_VERIFY_URL response',
              user.length > 0,
              '====================user.length > 0',
              newUser,
              'newUser============,',
              authtoken,
              '=====================authtoken',
            );
            // CommonMessage(message);
            if (user.length > 0 && user[0].status == 'active') {
              // signIn(response.data);
              dispatch(login(response.data));
              signIn(response.data);
              // signIn(user, authtoken);
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

              // signIn(user, user[0].childid);
              // handleReset();
              // const childData = JSON.stringify(user);
              //   Storage.storeObject("@user", childData)
              // const childData = JSON.stringify(user);
              // AsyncStorage.setItem('userInfo', childData);
              // Storage.storeObject("@user", childData)
              // // localStorage.setItem("userInfo", JSON.stringify(user));
              // // localStorage.setItem("accessToken","77cd4400f54ea04e8a2825ad41ba8a7e3ef8bb5f");
              // navigation.navigate('Home');
            } else if (user.length > 0 && user[0].status == 'inactive') {
              setModalStatus(true);
            } else if (response.data.message == "OTP didn't match") {
              setOtpMissMatchError(true);
              setOtpError(false);
            } else if (user.length == 0) {
              {
                selectedLanguage == 'english'
                  ? CommonMessage('Please create an account to continue !')
                  : CommonMessage('ଜାରି ରଖିବାକୁ ଦୟାକରି ଏକ ଖାତା ସୃଷ୍ଟି କରନ୍ତୁ!');
              }
              setPaused(true);
              navigation.navigate('SignUpScreen1', {
                phone: phonenum,
                email: '',
                otplogin: true,
                emailLogin: false,
                pswdLogin: false,
              });
              handleReset();
              // let userInfo={...user,phone:phone}
              // AsyncStorage.setItem('newUser', String(user.length == 0));
              Storage.storeObject('newUser', String(user.length == 0));
              // signIn(userInfo,"77cd4400f54ea04e8a2825ad41ba8a7e3ef8bb5f");
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

  // const emptyBtns = f1 == '';
  const emptyBtns =
    f1 == '' && f2 == '' && f3 == '' && f4 == '' && f5 == '' && f6 == '';

  const closeModalFunc = () => {
    setPaused(true);
    setModalStatus(false);
    navigation.navigate('SplashScreen');
  };

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // setState({ userInfo });

      const {email = ''} = userInfo.user;

      const bodydata = {
        email: email,
      };

      await axios
        .post(LOGIN_USING_EMAIL_URL, bodydata)
        .then(function (response) {
          const {
            authtoken = '',
            message = '',
            status,
            user = [],
            newUser = false,
          } = response.data;
          const obj = user[0];
          console.log(
            LOGIN_USING_EMAIL_URL,
            '==============LOGIN_USING_EMAIL_URL====',
            response.data,
            '=======LOGIN_USING_EMAIL_URL_response====',
            bodydata,
            '==============LOGIN_USING_EMAIL_URL_bodydata====',
            status,
            '======LOGIN_USING_EMAIL_URL_status..............',
          );
          if (user.length > 0) {
            if (obj?.hasOwnProperty('status')) {
              if (user.length > 0 && user[0].status == 'active') {
                //

                signIn(user, authtoken);
                const childData = JSON.stringify(user);
                AsyncStorage.setItem('userInfo', childData);
                // signIn(user, user[0].childid);
              } else if (user.length > 0 && user[0].status == 'inactive') {
                setModalStatus(true);
              } else if (user.length == 0) {
                {
                  selectedLanguage == 'english'
                    ? CommonMessage('Please create an account to continue !')
                    : CommonMessage(
                        'ଜାରି ରଖିବାକୁ ଦୟାକରି ଏକ ଖାତା ସୃଷ୍ଟି କରନ୍ତୁ!',
                      );
                }
                setPaused(true);
                // navigation.navigate('SignUpScreen1', {
                //   phone: '',
                //   email: email,
                //   otplogin: false,
                //   emailLogin: true,
                //   pswdLogin: true,
                // });
                handleReset();
                AsyncStorage.setItem('newUser', String(user.length == 0));
              } else {
              }
            } else {
              setModalStatus(true);
            }
          } else {
            {
              selectedLanguage == 'english'
                ? CommonMessage('Please create an account to continue !')
                : CommonMessage('ଜାରି ରଖିବାକୁ ଦୟାକରି ଏକ ଖାତା ସୃଷ୍ଟି କରନ୍ତୁ!');
            }
            setPaused(true);
            // navigation.navigate('SignUpScreen1', {
            //   phone: '',
            //   email: email,
            //   otplogin: false,
            //   emailLogin: true,
            //   pswdLogin: true,
            // });
            handleReset();
            AsyncStorage.setItem('newUser', String(user.length == 0));
          }

          // if (setLoading) setLoading(false);
        });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <UpdateModal
        visible={updateModalStatus}
        heading={
          errorFlag
            ? trans('Our app is under maintenance. Please try after some time')
            : trans('Please update the app to get new features')
        }
        appVersion={true}
        backgroundColor={'darkorange'}
        version={appVersion}
        height={250}
        width={350}
        isIconVisible={false}
        // yesBtnLabel={"update"}
        // isYesBtnVisible={errorFlag ? false : true}
        isYesBtnVisible={false}
        isNoBtnVisible={false}
        onpressno={() => {
          setUpdateModalStatus(false);
        }}
        onpressyes={() => {
          const url = `https://play.google.com/store/apps/details?id=com.notevook`;
          // const url = require('../../../assets/app_logo.jpeg');
          Linking.openURL(url);
        }}
      />
      <ImageBackground
        style={{
          width: device_width,
          height: device_height,
          flex: 1,
          alignSelf: 'center',
        }}
        resizeMode="cover"
        source={require('../../../assets/0.png')}>
        <StatusBar backgroundColor={'#263d2d'} barStyle="light-content" />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            // backgroundColor: Colors.secondary,
            // zIndex:1,
            // borderColor:'#fff',
            // marginBottom: 10,
            // borderWidth: 1,
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{paddingLeft: 10}}>
            <MaterialIcons
              name="keyboard-arrow-left"
              size={30}
              // backgroundColor={Colors.secondary}
              color={Colors.secondary}
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>

          {/* <Text
            style={{
              fontSize: 20,
              color: '#333',
              marginLeft: 10,
              textTransform: 'capitalize',
              fontWeight: '600',
            }}>
            {language === 'odia'
              ? 'ଚାଲ ଆରମ୍ଭ କରିବା '
              : language === 'english'
              ? `Let's Get Started`
              : 'आओ शुरू करें'}
          </Text> */}
        </View>
        {/* <View
          style={{
            width: '100%',
            height: 220,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.secondary,
            // borderWidth: 1,
          }}>
          {language === 'odia' ? (
            <FastImage
              style={{height: 220, width: device_width * 0.65}}
              source={require('../../../assets/SplashImage.jpeg')}
              resizeMode="contain"
              // source={{
              //   // uri: "https://wkresources.s3.ap-south-1.amazonaws.com/f_logo.png",-          //   uri: 'https://leverageedu.com/blog/wp-content/uploads/2020/04/Types-of-Education.jpg',
              // }}
            />
          ) : (
            <FastImage
              style={{height: 220, width: device_width * 0.7}}
              source={require('../../../assets/SplashImage2.png')}
              resizeMode="contain"
              // source={{
              //   // uri: "https://wkresources.s3.ap-south-1.amazonaws.com/f_logo.png",-          //   uri: 'https://leverageedu.com/blog/wp-content/uploads/2020/04/Types-of-Education.jpg',
              // }}
            />
          )} */}
        {/* <TouchableOpacity onPress={() => setPaused(!paused)}>
          <VideoCard
            navigation={navigation}
            // url={(src = require('../../../assets/students.mp4'))}
            // url={require('../../../assets/students.mp4')}
            url={
              language == 'odia'
                ? 'https://notevook.s3.ap-south-1.amazonaws.com/login+using+password+odia.mp4'
                : 'https://notevook.s3.ap-south-1.amazonaws.com/login+using+password.mp4'
            }
            isVideoPaused={paused}
            // thumbnaillink={
            //   (src = require('../../../assets/login.png'))
            //   // thumbnaillink != '' && thumbnaillink != undefined
            //   // ? thumbnaillink :
            //   // 'https://notevook.s3.ap-south-1.amazonaws.com/Adarsh/Notevook+NVA.png'
            // }
            // resizeMode={'contain'}
          />
        </TouchableOpacity> */}
        {/* </View> */}
        {/* <Text
          style={{
            fontSize: 14,
            color: '#666',
            marginTop: 10,
            textTransform: 'capitalize',
            fontWeight: '600',
            textAlign: 'center',
            width: '85%',
            alignSelf: 'center',
          }}>
          {language === 'odia'
            ? '୨-ଷ୍ଟେପ୍ ଯାଞ୍ଚ ସକ୍ଷମ କରିବାକୁ ଆପଣଙ୍କର ମୋବାଇଲ୍ ନମ୍ବର ପ୍ରବେଶ କରନ୍ତୁ'
            : language === 'english'
            ? `Enter your mobile number to enable 2-step verification`
            : '2-चरणीय सत्यापन सक्षम करने के लिए अपना मोबाइल नंबर दर्ज करें'}
        </Text> */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{paddingVertical: 5}}>
          {showOTPContent ? (
            <Animatable.View
              animation="fadeInUpBig"
              style={
                {
                  // flex: 3,
                  // backgroundColor: '#fff',
                  // borderTopLeftRadius: 30,
                  // borderTopRightRadius: 30,
                  // paddingHorizontal: 20,
                  // paddingVertical: 10,
                  // backgroundColor: Colors.secondary,
                  // borderWidth:1
                  // flex: 3,
                  // backgroundColor: '#fff',
                  // borderTopLeftRadius: 30,
                  // borderTopRightRadius: 30,
                  // paddingHorizontal: 20,
                  // paddingVertical: 30,
                }
              }>
              {showprog == false && (
                <ImageBackground
                  style={{
                    // borderRadius: 50,
                    // borderWidth: 1,
                    width: device_width * 1.28,
                    height: device_height * 0.7,
                    // marginTop:-50,
                    // paddingTop: 20,
                    // borderRadius: 25,
                    // flex: 1,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  resizeMode="cover"
                  source={require('../../../assets/01.png')}>
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: '700',
                      // marginBottom: 20,
                      // fontSize: language === 'english' ? 28 : 24,
                      fontSize: 24,
                    }}>
                    {/* {'ଚାଲ ଆରମ୍ଭ କରିବା '} */}
                    {selectedLanguage === 'odia'
                      ? 'ଚାଲ ଆରମ୍ଭ କରିବା '
                      : selectedLanguage === 'english'
                      ? `Let's Begin`
                      : // : 'आओ शुरू करें'
                        `Let's Begin`}
                    {/* {language === 'odia'
                    ? 'ଫୋନ୍ ନମ୍ବର ଏବଂ ଓଟିପି ମାଧ୍ୟମରେ ଲଗ୍ ଇନ୍ କରନ୍ତୁ'
                    : language === 'english'
                    ? 'Login With Phone Number And OTP'
                    : 'फोन नंबर और ओटीपी के साथ लॉगिन करें'} */}
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
                    {/* <FontAwesome name="user-o" color={'#333'} size={20} /> */}
                    <View
                      style={{
                        // borderWidth: 1,
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
                          // marginBottom: 20,
                          fontSize: 18,
                        }}>
                        {' '}
                        +91
                      </Text>
                    </View>
                    <TextInput
                      // placeholder={'ମୋବାଇଲ୍ ନମ୍ବର ପ୍ରବେଶ କରନ୍ତୁ *'}
                      placeholder={
                        selectedLanguage === 'odia'
                          ? 'ମୋବାଇଲ୍ ନମ୍ବର ପ୍ରବେଶ କରନ୍ତୁ *'
                          : selectedLanguage === 'english'
                          ? `Enter Mobile Number *`
                          : // : 'मोबाइल नंबर दर्ज करें *'
                            `Enter Mobile Number *`
                      }
                      placeholderTextColor="#888"
                      // value={p_phone}
                      keyboardType="numeric"
                      style={{
                        color: '#000',
                        // flex: 1,
                        // marginTop: Platform.OS === 'ios' ? 0 : -12,
                        // paddingLeft: 10,
                        textAlign: 'center',
                        width: '80%',
                        // color: '#05375a',
                        backgroundColor: '#fff',
                        elevation: 10,
                        borderColor: '#ccc',
                        borderRadius: 3,
                        height: 45,
                        marginLeft: 10,
                        fontSize: phonenum.length < 10 ? 13 : 18,
                        fontWeight: '900',
                      }}
                      value={phonenum}
                      onChangeText={val => handleInputChange('phonenum', val)}
                      // onFocus={val => handleInputChange('phonenum', val)}
                    />
                    {/* {phonenum != '' && phonenum.length >= 10 && !phoneError && (
                        <Animatable.View
                          animation="bounceIn"
                          style={{marginTop: 5, marginLeft: 15}}>
                          <Feather name="check-circle" color="green" size={20} />
                        </Animatable.View>
                     )} */}
                  </View>
                  {phoneError && (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={{color: Colors.red, marginTop: -10}}>
                        {/* {'** ଦୟାକରି ବୈଧ ଫୋନ୍ ନମ୍ବର ପ୍ରବେଶ କରନ୍ତୁ'} */}
                        {
                          selectedLanguage === 'odia'
                            ? '** ଦୟାକରି ବୈଧ ଫୋନ୍ ନମ୍ବର ପ୍ରବେଶ କରନ୍ତୁ'
                            : selectedLanguage === 'english'
                            ? `** Please enter valid phone number`
                            : `** Please enter valid phone number`
                          // '** कृपया मान्य फ़ोन नंबर दर्ज करें'
                        }
                      </Text>
                    </Animatable.View>
                  )}
                  <View style={{marginTop: 0, marginHorizontal: 0}}>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '600',
                        fontSize: 11,
                        marginLeft: 15,
                        marginTop: 20,
                      }}>
                      {/* {'ସାଇନ୍ ଇନ୍ କରି, ମୁଁ ଏହାକୁ ଗ୍ରହଣ କରେ'} */}
                      {selectedLanguage === 'odia'
                        ? 'ସାଇନ୍ ଇନ୍ କରି, ମୁଁ ଏହାକୁ ଗ୍ରହଣ କରେ'
                        : selectedLanguage === 'english'
                        ? `By signing in, I accept the`
                        : // : 'साइन इन करके, मैं स्वीकार करता हूं'}
                          `By signing in, I accept the`}
                      <Text
                        onPress={() => {
                          setPaused(true);
                          navigation.navigate('TermAndConditions');
                        }}
                        style={{
                          fontSize: 12,
                          color: 'green',
                          textDecorationLine: 'underline',
                          fontWeight: '600',
                        }}>
                        {' '}
                        {/* {'ସର୍ତ୍ତାବଳୀ'} */}
                        {selectedLanguage === 'odia'
                          ? 'ସର୍ତ୍ତାବଳୀ'
                          : selectedLanguage === 'english'
                          ? `Terms & Conditions`
                          : `Terms & Conditions`}
                        {/* 'नियम और शर्तें'} */}
                      </Text>
                    </Text>
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

                        //emptyBtns ? '#999' : Colors.primary
                      }}
                      disabled={false}
                      onPress={() => {
                        // showprog == true
                        //   ? // loginHandle(data.username, data.password);
                        loginphoneHandle();
                        // :
                        //   OTPhandle()
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '900',
                          color: '#000',
                          fontFamily: 'Yaldevi-Bold',
                        }}>
                        {/* {'ଓଟିପି ପଠାନ୍ତୁ '} */}
                        {selectedLanguage === 'odia'
                          ? 'ଓଟିପି ପଠାନ୍ତୁ '
                          : selectedLanguage === 'english'
                          ? `Continue`
                          : `Continue`}
                        {/* 'ओटीपी भेजें'} */}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              )}

              {showprog == true ? (
                <ImageBackground
                  style={{
                    // borderRadius: 50,
                    // borderWidth: 1,
                    width: device_width * 1.25,
                    height: device_height * 0.63,
                    // marginTop:-50,
                    paddingTop: 30,
                    // borderRadius: 25,
                    // flex: 1,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  resizeMode="cover"
                  source={require('../../../assets/01.png')}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#333',
                      fontWeight: '900',
                      // marginTop:15
                    }}>
                    {/* {'SMS କୋଡ୍ ପଠାଯାଇଛି'} */}
                    {selectedLanguage === 'odia'
                      ? 'SMS କୋଡ୍ ପଠାଯାଇଛି'
                      : 'Sending SMS Code to'}{' '}
                    <Text
                      style={{fontSize: 18, color: 'green', fontWeight: '900'}}>
                      {info.phonenum}
                    </Text>
                    {/* {language === 'odia'
                        ? 'ଓଟିପି ପ୍ରବେଶ କରନ୍ତୁ '
                        : language === 'english'
                        ? `Enter OTP`
                        : 'ओटीपी दर्ज करें'}{' '} */}
                  </Text>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      // flexDirection: 'row',
                      width: device_width * 0.65,
                      // marginTop: 10,
                      paddingHorizontal: 5,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 7,
                      // backgroundColor: '#f1a722',
                      backgroundColor: '#ccc',
                      // paddingVertical: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#333',
                        fontWeight: '800',
                      }}>
                      {/* {'ଓଟିପି କୋଡ୍ ପ୍ରବେଶ କରନ୍ତୁ'} */}
                      {selectedLanguage === 'odia'
                        ? 'ଓଟିପି କୋଡ୍ ପ୍ରବେଶ କରନ୍ତୁ'
                        : 'Enter OTP Code'}
                    </Text>

                    <View
                      style={{
                        // borderWidth:1,
                        paddingHorizontal: 8,
                        // width:'30%',
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
                          // borderBottomWidth: 2,
                          borderRadius: 5,
                          marginHorizontal: 3,
                          textAlign: 'center',
                          fontWeight: '700',
                          fontSize: 20,
                          borderColor: '#000',
                          letterSpacing: 5,
                          // borderColor: f1.length >= 1 ? Colors.primary : '#666',
                          // color: Colors.primary,
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
                      />
                      <TextInput
                        ref={btn2}
                        style={{
                          height: 30,
                          width: 25,
                          borderWidth: 1,
                          // borderBottomWidth: 2,
                          // borderWidth:1,
                          borderRadius: 5,
                          marginHorizontal: 3,
                          textAlign: 'center',
                          fontWeight: '700',
                          fontSize: 18,
                          borderColor: '#000',
                          // borderColor: f2.length >= 1 ? Colors.primary : '#666',
                          color: '#000',
                          // color: Colors.primary,
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
                      />
                      <TextInput
                        ref={btn3}
                        style={{
                          height: 30,
                          width: 25,
                          borderWidth: 1,
                          // borderBottomWidth: 2,
                          borderRadius: 5,
                          marginHorizontal: 3,
                          textAlign: 'center',
                          fontWeight: '900',
                          fontSize: 18,
                          borderColor: '#000',
                          // borderColor: f3.length >= 1 ? Colors.primary : '#666',
                          color: '#000',
                          // color: Colors.primary,
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
                      />
                      <TextInput
                        ref={btn4}
                        style={{
                          height: 30,
                          width: 25,
                          borderWidth: 1,
                          // borderBottomWidth: 2,
                          borderRadius: 5,
                          marginHorizontal: 3,
                          textAlign: 'center',
                          fontWeight: '900',
                          fontSize: 18,
                          borderColor: '#000',
                          // borderColor: f4.length >= 1 ? Colors.primary : '#666',
                          color: '#000',
                          // color: Colors.primary,
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
                      />
                      <TextInput
                        ref={btn5}
                        style={{
                          height: 30,
                          width: 25,
                          borderWidth: 1,
                          // borderBottomWidth: 2,
                          borderRadius: 5,
                          marginHorizontal: 3,
                          textAlign: 'center',
                          fontWeight: '900',
                          fontSize: 18,
                          // borderColor: f5.length >= 1 ? Colors.primary : '#666',
                          borderColor: '#000',
                          color: '#000',
                          // color: Colors.primary,
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
                      />
                      <TextInput
                        ref={btn6}
                        style={{
                          height: 30,
                          width: 25,
                          borderWidth: 1,
                          // borderBottomWidth: 2,
                          borderRadius: 5,
                          marginHorizontal: 3,
                          textAlign: 'center',
                          fontWeight: '900',
                          fontSize: 18,
                          // borderColor: f6.length >= 1 ? Colors.primary : '#666',
                          borderColor: '#000',
                          color: '#000',
                          // color: Colors.primary,
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
                        onSubmitEditing={() => OTPhandle()}
                      />
                    </View>

                    {data.check_textInputChange ? (
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
                          <Feather
                            name="check-circle"
                            color="green"
                            size={20}
                          />
                        </Animatable.View>
                      )}
                  </View>
                  {otpError && (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={{color: Colors.red, marginVertical: 0}}>
                        {/* '**ଓଟିପି ନିଶ୍ଚିତ ଭାବରେ ୬ ଅଙ୍କ ବିଶିଷ୍ଟ କୋଡ୍ ହେବା ଆବଶ୍ୟକ' */}
                        {selectedLanguage === 'odia'
                          ? '**ଓଟିପି ନିଶ୍ଚିତ ଭାବରେ ୬ ଅଙ୍କ ବିଶିଷ୍ଟ କୋଡ୍ ହେବା ଆବଶ୍ୟକ'
                          : selectedLanguage === 'english'
                          ? `**OTP must be 6 digit code`
                          : `**OTP must be 6 digit code`}
                        {/* // : '** ओटीपी 6 अंकों का कोड होना चाहिए'} */}
                      </Text>
                    </Animatable.View>
                  )}
                  <View style={{marginTop: 5}}>
                    {showprog == true && count !== 0 ? (
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: Colors.primary,
                          textAlign: 'center',
                        }}>
                        {`${count} `}
                        {selectedLanguage === 'odia'
                          ? 'ସେକେଣ୍ଡ୍'
                          : selectedLanguage === 'english'
                          ? 'seconds'
                          : 'seconds'}
                        {/* // : 'सेकंड'} */}
                      </Text>
                    ) : (
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={{
                            fontWeight: '800',
                            color: count == 0 ? Colors.primary : '#000',
                            fontSize: 12,
                          }}
                          onPress={() => {
                            loginphoneHandle();
                          }}>
                          {/* {'ଏପର୍ଯ୍ୟନ୍ତ SMS କୋଡ୍ ଗ୍ରହଣ କରି ନାହାଁନ୍ତି କି?'} */}
                          {selectedLanguage === 'odia'
                            ? 'ଏପର୍ଯ୍ୟନ୍ତ SMS କୋଡ୍ ଗ୍ରହଣ କରି ନାହାଁନ୍ତି କି?'
                            : 'Not Received SMS Code Yet ?'}
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
                            // borderWidth: 1,
                          }}>
                          <Text
                            style={{
                              fontWeight: '700',
                              fontSize: 11,
                              color: count == 0 ? '#fff' : '#999',
                            }}>
                            {/* {'ପୁନର୍ବାର ପଠାନ୍ତୁ'} */}
                            {selectedLanguage === 'odia'
                              ? 'ପୁନର୍ବାର ପଠାନ୍ତୁ'
                              : selectedLanguage === 'english'
                              ? `Resend `
                              : `Resend `}
                            {/* // : 'पुन भेजें'} */}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '600',
                        fontSize: 11,
                        marginLeft: 15,
                        marginTop: 10,
                      }}>
                      {/* {'ସାଇନ୍ ଇନ୍ କରି, ମୁଁ ଏହାକୁ ଗ୍ରହଣ କରେ'} */}
                      {selectedLanguage === 'odia'
                        ? 'ସାଇନ୍ ଇନ୍ କରି, ମୁଁ ଏହାକୁ ଗ୍ରହଣ କରେ'
                        : selectedLanguage === 'english'
                        ? `By signing in, I accept the`
                        : `By signing in, I accept the`}{' '}
                      {/* : 'साइन इन करके, मैं स्वीकार करता हूं'}{' '} */}
                      <Text
                        onPress={() => {
                          setPaused(true);
                          navigation.navigate('TermAndConditions');
                        }}
                        style={{
                          fontSize: 12,
                          color: 'green',
                          textDecorationLine: 'underline',
                          fontWeight: '600',
                        }}>
                        {/* {'ସର୍ତ୍ତାବଳୀ'} */}
                        {selectedLanguage === 'odia'
                          ? 'ସର୍ତ୍ତାବଳୀ'
                          : selectedLanguage === 'english'
                          ? `Terms & Conditions`
                          : `Terms & Conditions`}
                        {/* // : 'नियम और शर्तें'} */}
                      </Text>
                    </Text>
                  </View>

                  {otpMisMatchError && (
                    <Animatable.View animation="bounceIn" duration={500}>
                      <Text style={{color: '#FF0000', fontSize: 13}}>
                        {/* {'ଓଟିପି ମେଳ ଖାଉ ନାହିଁ! ପରଖି ନିଅନ୍ତୁ'} */}
                        {selectedLanguage === 'odia'
                          ? 'ଓଟିପି ମେଳ ଖାଉ ନାହିଁ! ପରଖି ନିଅନ୍ତୁ'
                          : selectedLanguage === 'english'
                          ? `OTP didn't match ! Please check`
                          : `OTP didn't match ! Please check`}
                        {/* : 'ओटीपी मेल नहीं खा रहा था! कृपया जाँच करें'} */}
                      </Text>
                    </Animatable.View>
                  )}

                  {/* <View
                    style={[

                      {alignItems:'center',marginVertical:10},
                    ]}> */}
                  <TouchableOpacity
                    style={{
                      // backgroundColor: Colors.primary,
                      backgroundColor: '#f1a722',
                      flexDirection: 'row',
                      width: '40%',
                      marginTop: 10,
                      height: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                    }}
                    // disabled={emptyBtns ? true : false}
                    onPress={() => {
                      // loginHandle(data.username, data.password);
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
                      {/* {'ଯାଞ୍ଚ ଏବଂ ସାଇନ୍ ଇନ୍ କରନ୍ତୁ'} */}
                      {selectedLanguage === 'odia'
                        ? 'ଯାଞ୍ଚ ଏବଂ ସାଇନ୍ ଇନ୍ କରନ୍ତୁ'
                        : selectedLanguage === 'english'
                        ? `Verify & Sign In`
                        : `Verify & Sign In`}
                      {/* : 'सत्यापित करें और साइन इन करें'} */}
                    </Text>
                    {/* <View
                    style={{
                      position: 'absolute',
                      right: 30,
                      paddingHorizontal: 6,
                      paddingVertical: 4,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 35,
                      borderWidth: 2,
                      borderColor: '#fff',
                    }}>
                    <FontAwesome
                      name="chevron-right"
                      color={Colors.white}
                      size={12}
                    />
                  </View> */}
                  </TouchableOpacity>
                  {/* </View> */}
                </ImageBackground>
              ) : (
                <></>
              )}

              {/* <View style={{marginTop: 0, marginHorizontal: 0}}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '600',
                    fontSize: 11,
                    marginLeft: 15,
                  }}>
                  {language === 'odia'
                    ? 'ସାଇନ୍ ଇନ୍ କରି, ମୁଁ ଏହାକୁ ଗ୍ରହଣ କରେ'
                    : language === 'english'
                    ? `By signing in, I accept the`
                    : 'साइन इन करके, मैं स्वीकार करता हूं'}{' '}
                  <Text
                    onPress={() => {
                      setPaused(true);
                      navigation.navigate('TermAndConditions');
                    }}
                    style={{
                      fontSize: 12,
                      color: 'lawngreen',
                      textDecorationLine: 'underline',
                      fontWeight: '600',
                    }}>
                    {language === 'odia'
                      ? 'ସର୍ତ୍ତାବଳୀ'
                      : language === 'english'
                      ? `Terms & Conditions`
                      : 'नियम और शर्तें'}
                  </Text>
                </Text>
              </View> */}

              {/* {showprog == false ? (
               <View
                  style={[
                    styles.button,
                    {marginBottom: 15, borderWidth: 0, width: '100%'},
                  ]}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      width: '50%',
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      backgroundColor: '#f1a722',
                      //emptyBtns ? '#999' : Colors.primary
                    }}
                    disabled={false}
                    onPress={() => {
                      // showprog == true
                      //   ? // loginHandle(data.username, data.password);
                      loginphoneHandle();
                      // :
                      //   OTPhandle()
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '900',
                        color: '#000',
                        fontFamily: 'Yaldevi-Bold',
                      }}>
                      {language === 'odia'
                        ? 'ଓଟିପି ପଠାନ୍ତୁ '
                        : language === 'english'
                        ? `Continue`
                        : 'ओटीपी भेजें'}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={[styles.button, {marginVertical: 15}]}>
                  <TouchableOpacity
                    style={{
                      // backgroundColor: Colors.primary,
                      backgroundColor: '#f1a722',
                      flexDirection: 'row',
                      width: '85%',
                      height: 48,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                    }}
                    disabled={emptyBtns ? true : false}
                    onPress={() => {
                      // loginHandle(data.username, data.password);
                      OTPhandle();
                    }}>
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: '#000',
                        },
                      ]}>
                      {language === 'odia'
                        ? 'ଯାଞ୍ଚ ଏବଂ ସାଇନ୍ ଇନ୍ କରନ୍ତୁ'
                        : language === 'english'
                        ? `Verify & Sign In`
                        : 'सत्यापित करें और साइन इन करें'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )} */}
              {/* {loading?<> */}
              {showprog == true ? (
                <></>
              ) : (
                <>
                  <Text
                    style={{
                      fontWeight: '800',
                      // letterSpacing: 1,
                      // color: Colors.primary,
                      color: '#f1a722',
                      marginLeft: 15,
                      fontSize: 13,
                      // borderWidth:1,
                      margin: 10,
                      // alignSelf: 'center',
                    }}>
                    {/* {'ଲଗଇନ୍ କରିବାକୁ ଅନ୍ୟ ଉପାୟ ଚେଷ୍ଟା କରନ୍ତୁ'} */}
                    {selectedLanguage === 'odia'
                      ? 'ଲଗଇନ୍ କରିବାକୁ ଅନ୍ୟ ଉପାୟ ଚେଷ୍ଟା କରନ୍ତୁ'
                      : selectedLanguage === 'english'
                      ? 'Try other ways to login'
                      : 'Try other ways to login'}
                    {/* : 'लॉगिन करने के अन्य तरीकों का प्रयास करें'} */}
                  </Text>
                  <View
                    style={{
                      // width: device_width * 0.98,
                      width: '80%',
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      flexDirection: 'row',
                      marginTop: 10,
                      // height:70
                      // paddingVertical:10,
                      // borderWidth:1
                    }}>
                    {/* <TouchableOpacity
                      disabled={showprog == true ? true : false}
                      onPress={() => googleLogin()}
                      style={{
                        // flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        // backgroundColor: Colors.secondary,
                        width: device_width * 0.4,
                        height: 70,
                        // borderBottomWidth: 2,
                      }}>
                      <View
                        style={{
                          // width: '100%',
                          height: 55,
                          width: 55,
                          alignItems: 'center',
                          borderRadius: 50,
                          padding: 5,
                        }}>
                        <Avatar.Image
                          onPress={() => {
                            googleLogin();
                          }}
                          source={require('../../../assets/google.jpg')}
                          size={50}
                          style={{backgroundColor: Colors.primary}}
                        />
                        {/* <GoogleSigninButton
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={() => googleLogin()}
                            disabled={showprog == true ? true : false}
                          />
                      </View>
                      <Text
                        style={{
                          fontWeight: '600',
                          // letterSpacing: 1,
                          // color: '#333',
                          color: '#fff',
                          textAlign: 'center',
                          fontSize: 13,
                          alignSelf: 'center',
                        }}>
                        {'Google'}
                        {/* {language === 'odia' ?'ଗୁଗୁଲ୍':language === 'english'?'Google':'गूगल'}
                      </Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                      disabled={showprog ? true : false}
                      onPress={() => setShowOTPContent(false)}
                      style={{
                        // flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        // backgroundColor: Colors.secondary,
                        width: device_width * 0.4,
                        // borderRadius:50,
                        height: 70,
                        // borderWidth: 1,
                      }}>
                      <View
                        style={{
                          // width: '100%',
                          height: 55,
                          width: 55,
                          alignItems: 'center',
                          backgroundColor: '#fff',
                          borderRadius: 50,
                          padding: 5,
                          marginBottom: 8,
                        }}>
                        <Avatar.Image
                          onPress={() => {
                            setShowOTPContent(false);
                          }}
                          source={require('../../../assets/password.png')}
                          size={50}
                          style={{backgroundColor: '#fff'}}
                        />

                        {/* <GoogleSigninButton
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => googleLogin()}
                    disabled={showprog == true ? true : false}
                  /> */}
                      </View>
                      <Text
                        style={{
                          fontWeight: '600',
                          // letterSpacing: 1,
                          // color: '#333',
                          color: '#fff',
                          textAlign: 'center',
                          fontSize: 13,
                          marginTop: 5,
                          alignSelf: 'center',
                        }}>
                        {selectedLanguage == 'english'
                          ? 'Sign-in with Password'
                          : selectedLanguage == 'odia'
                          ? 'ପାସୱାର୍ଡ ଦ୍ଵାରା ସାଇନ୍-ଇନ୍ କରନ୍ତୁ'
                          : 'Sign-in with Password'}
                        {/* // : 'पासवर्ड'} */}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* <Text
                  style={{
                    fontWeight: '800',
                    letterSpacing: 1,
                    color: Colors.primary,
                    fontSize: 13,
                    alignSelf: 'center',
                  }}>
                  {trans('OR')}
                </Text> */}
                  {/* <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                    borderWidth: 0,
                    alignItems: 'center',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                  }}
                  disabled={showprog == true ? true : false}
                  onPress={() => setShowOTPContent(false)}>
                  <Text
                    // onPress={() => setShowOTPContent(true)}
                    style={{
                      fontSize: 16,
                      color: showprog == true ? '#999' : Colors.primary,
                      textDecorationLine: 'underline',
                      fontWeight: '800',
                      letterSpacing: 1,
                    }}>
                    {trans('Login With Password')}
                  </Text>
                </TouchableOpacity> */}
                </>
              )}
              {showprog == true && count == 0 && (
                <View style={{marginTop: 0, marginHorizontal: 0}}>
                  <Text
                    onPress={() => setshowprog(false)}
                    style={{
                      fontWeight: '900',
                      // letterSpacing: 1,
                      marginLeft: 15,
                      color: '#f1a722',
                      fontSize: 14,
                      textDecorationLine: 'underline',
                      // alignSelf: 'center',
                    }}>
                    {/* {'ଲଗଇନ୍ କରିବାକୁ ଅନ୍ୟ ଉପାୟ ଚେଷ୍ଟା କରନ୍ତୁ'} */}
                    {selectedLanguage === 'odia'
                      ? 'ଲଗଇନ୍ କରିବାକୁ ଅନ୍ୟ ଉପାୟ ଚେଷ୍ଟା କରନ୍ତୁ'
                      : selectedLanguage === 'english'
                      ? 'Try other ways to login'
                      : 'Try other ways to login'}
                    {/* : 'लॉगिन करने के अन्य तरीकों का प्रयास करें'} */}
                  </Text>
                </View>
              )}
              <View
                style={{
                  backgroundColor: '#ffde59',
                  padding: 5,
                  borderRadius: 10,
                  marginTop: 20,
                  // borderWidth:1,
                  width: device_width * 0.94,
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    paddingLeft: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    elevation: 5,
                    marginVertical: 5,
                    backgroundColor: '#ffde59',
                    paddingVertical: 10,
                    borderRadius: 7,
                    // alignSelf: 'flex-end',
                  }}
                  onPress={() => setHelp(true)}>
                  <View
                    style={{
                      backgroundColor: 'green',
                      borderRadius: 50,
                      padding: 5,
                    }}>
                    <AntDesign
                      name={'customerservice'}
                      style={{fontSize: 25, color: '#fff'}}
                    />
                  </View>
                  <View style={{width: '85%', marginLeft: 5, borderWidth: 0}}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: '700',
                        // color: Colors.primary,
                        color: '#333',
                        paddingLeft: 10,
                      }}>
                      {/* {'ସହାୟତା କେନ୍ଦ୍ର'} */}
                      {selectedLanguage === 'odia'
                        ? 'ସହାୟତା କେନ୍ଦ୍ର'
                        : selectedLanguage === 'english'
                        ? 'Help Desk'
                        : 'Help Desk'}
                      {/* : 'हेल्प डेस्क'} */}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '600',
                        // color: Colors.primary,
                        color: '#333',
                        paddingLeft: 10,
                      }}>
                      {/* 'ଯଦି ଆପଣ ଆପ୍ ଲଗଇନ୍ କିମ୍ବା ଓଟିପି ପାଇବାରେ କୌଣସି ଅସୁବିଧାର ସମ୍ମୁଖୀନ ହେଉଛନ୍ତି, ଦୟାକରି ଏହି ସମସ୍ତ ନମ୍ବର ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ :- 8018990558, 8249375247, 7008699927' */}
                      {selectedLanguage === 'odia'
                        ? 'ଯଦି ଆପଣ ଆପ୍ ଲଗଇନ୍ କିମ୍ବା ଓଟିପି ପାଇବାରେ କୌଣସି ଅସୁବିଧାର ସମ୍ମୁଖୀନ ହେଉଛନ୍ତି, ଦୟାକରି ଏହି ସମସ୍ତ ନମ୍ବର ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ :- 9861302757,7008699927,9337052091'
                        : selectedLanguage === 'english'
                        ? 'We kindly request you to reach out to our dedicated support team if you  encounter any issues with app login or OTP . Please contact on. 9861302757,7008699927,9337052091'
                        : 'We kindly request you to reach out to our dedicated support team if you  encounter any issues with app login or OTP . Please contact on. 9861302757,7008699927,9337052091'}

                      {/* : 'यदि आपको ऐप लॉगिन या ओटीपी के साथ कोई समस्या आती है तो हम कृपया हमारी समर्पित सहायता टीम से संपर्क करें। कृपया संपर्क करें। 8018990558, 8249375247, 7008699927'} */}
                      {/* {trans('Contact our customer care')} */}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingLeft: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    elevation: 5,
                    marginVertical: 5,
                    backgroundColor: '#ffde59',
                    paddingVertical: 10,
                    borderRadius: 7,
                    // alignSelf: 'flex-end',
                  }}
                  onPress={() => setLangModal(true)}>
                  <View
                    style={{
                      // borderWidth:1,
                      backgroundColor: 'green',
                      borderRadius: 50,
                      padding: 5,
                    }}>
                    <AntDesign
                      name={'playcircleo'}
                      style={{fontSize: 25, color: '#fff'}}
                    />
                  </View>
                  <View style={{width: '85%', marginLeft: 5, borderWidth: 0}}>
                    {/* <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                      top: -15,
                      right: -10,
                      // borderWidth:1,
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#222',
                        fontWeight: '700',
                        marginRight: 5,
                        // width: 40,
                      }}>
                      ଓଡିଆ
                    </Text>
                    <Switch
                      trackColor={{false: '#888', true: 'green'}}
                      thumbColor={isEnabled ? '#ddd' : 'green'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#333',
                        fontWeight: '700',
                        // width: 40,
                      }}>
                      English
                    </Text>
                  </View> */}
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: '700',
                        // color: Colors.primary,
                        color: '#333',
                        paddingLeft: 10,
                      }}>
                      {/* {'ଟ୍ୟୁଟୋରିଆଲ୍ ଭିଡିଓ'} */}
                      {selectedLanguage === 'odia'
                        ? 'ଟ୍ୟୁଟୋରିଆଲ୍ ଭିଡିଓ'
                        : selectedLanguage === 'english'
                        ? 'Tutorial Video'
                        : 'Tutorial Video'}
                      {/* : 'ट्यूटोरियल वीडियो'} */}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '600',
                        // color: Colors.primary,
                        color: '#333',
                        paddingLeft: 10,
                      }}>
                      {/* {'ଆପ୍ କିପରି ବ୍ୟବହାର କରାଯିବ ତାହାର ଗାଇଡ୍ ଭିଡିଓ'} */}
                      {/* {trans(
                      'If you are facing any difficulty in app login or getting OTP. Please contact these number.',
                    )} */}
                      {selectedLanguage === 'odia'
                        ? 'ଆପ୍ କିପରି ବ୍ୟବହାର କରାଯିବ ତାହାର ଗାଇଡ୍ ଭିଡିଓ'
                        : selectedLanguage === 'english'
                        ? 'Guide video of how to use the app'
                        : 'Guide video of how to use the app'}
                      {/* : 'एप्लिकेशन का उपयोग करने के तरीके के बारे में वीडियो गाइड करें'} */}
                    </Text>
                  </View>
                </TouchableOpacity>
                {/*  <TouchableOpacity
                onPress={() => {
                  navigation.navigate('VideoScreen', {
                    url: 'https://wkresources.s3.ap-south-1.amazonaws.com/1695365304297_608952947.mp4',
                  });
                }}
                style={{
                  width: device_width * 0.9,
                  alignSelf: 'center',
                  elevation: 5,
                  // height: 90,
                  paddingVertical: 7,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 10,
                  backgroundColor: '#ffde59',
                  // flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AntDesign
                  name={'playcircleo'}
                  style={{
                    fontSize: 20,
                    color: Colors.primary,
                    // position: 'absolute',
                    // left: 30,
                  }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: '#222',
                    marginLeft: 10,
                    textTransform: 'capitalize',
                    fontWeight: '700',
                    textAlign: 'center',
                    textDecorationLine: 'underline',
                    // position: 'absolute',
                    // right: 10,
                    // width: '85%',
                    // alignSelf: 'flex-end',
                  }}>
                  {trans(
                    `If you are facing any issues while login then click on this link to watch the guide video`,
                  )}
                </Text>
                {/* <Text
                  style={{
                    fontSize: 14,
                    color: '#000',
                    marginLeft: 10,
                    textTransform: 'capitalize',
                    fontWeight: '900',
                    textAlign: 'right',
                    position: 'absolute',
                    left: 50,
                    top: 10,
                    zIndex: 1,

                    // width: '85%',
                    // alignSelf: 'flex-end',
                  }}>
                  {trans(`login failed !`)}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#000',
                    marginLeft: 10,
                    textTransform: 'capitalize',
                    fontWeight: '900',
                    textAlign: 'right',
                    position: 'absolute',
                    left: 10,
                    zIndex: 1,

                    // width: '85%',
                    // alignSelf: 'flex-end',
                  }}>
                  {trans(`Create New Account !`)}
                </Text>
                <ImageBackground
                  style={{
                    height: 75,
                    width: device_width,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                  source={require('../../../assets/How-to-Use.png')}
                  resizeMode="contain"
                  // source={{
                  //   // uri: "https://wkresources.s3.ap-south-1.amazonaws.com/f_logo.png",
                  //   uri: 'https://leverageedu.com/blog/wp-content/uploads/2020/04/Types-of-Education.jpg',
                  // }}
                >
                  <AntDesign
                    name={'playcircleo'}
                    style={{
                      fontSize: 50,
                      color: '#222',
                      // position: 'absolute',
                      // left: 30,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#000',
                      marginLeft: 10,
                      textTransform: 'capitalize',
                      fontWeight: '900',
                      textAlign: 'right',
                      position: 'absolute',
                      right: 10,
                      // width: '85%',
                      // alignSelf: 'flex-end',
                    }}>
                    {trans(`if you are facing any issues while login then click on this link to watch the guide video`)}
                  </Text>
                </ImageBackground> */}
                {/* </TouchableOpacity>*/}
              </View>
            </Animatable.View>
          ) : (
            <Animatable.View
              animation="fadeInUpBig"
              style={
                {
                  // backgroundColor: Colors.secondary,
                  // flex: 3,
                  // backgroundColor: '#fff',
                  // borderTopLeftRadius: 30,
                  // borderTopRightRadius: 30,
                  // paddingHorizontal: 20,
                  // paddingVertical: 10,
                  // borderWidth:1
                }
              }>
              <ImageBackground
                style={{
                  // borderRadius: 50,
                  // borderWidth: 1,
                  width: device_width * 1.28,
                  height: device_height * 0.7,
                  // marginTop:-50,
                  // paddingTop: 20,
                  // borderRadius: 25,
                  // flex: 1,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                resizeMode="cover"
                source={require('../../../assets/01.png')}>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '800',
                    // marginBottom: 10,
                    // fontSize: language === 'english' ? 28 : 22,
                    fontSize: 22,
                  }}>
                  {/* {'ଚାଲ ଆରମ୍ଭ କରିବା '} */}
                  {selectedLanguage === 'odia'
                    ? 'ଚାଲ ଆରମ୍ଭ କରିବା '
                    : selectedLanguage === 'english'
                    ? `Let's Begin`
                    : `Let's Begin`}
                  {/* : 'आओ शुरू करें'} */}
                </Text>
                {/* <Text
                style={{
                  fontSize: 16,
                  color: '#333',
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}>
                {language === 'odia'
                  ? 'ପାସୱାର୍ଡ ସହ ଲଗ୍ ଇନ୍ କରନ୍ତୁ'
                  : language === 'english'
                  ? 'Login With Password'
                  : 'पासवर्ड के साथ लॉगिन'}
              </Text> */}
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                    // marginTop: 10,
                    // borderBottomWidth: 1,
                    // borderBottomColor: Colors.secondary,
                    width: '70%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {/* <FontAwesome name="user-o" color={'#333'} size={20} /> */}
                  <TextInput
                    // placeholder={'ମୋବାଇଲ୍ ନମ୍ବର ପ୍ରବେଶ କରନ୍ତୁ *'}
                    placeholder={
                      selectedLanguage === 'odia'
                        ? 'ମୋବାଇଲ୍ ନମ୍ବର ପ୍ରବେଶ କରନ୍ତୁ *'
                        : selectedLanguage === 'english'
                        ? `Enter Mobile Number *`
                        : `Enter Mobile Number *`
                    }
                    // : 'मोबाइल नंबर दर्ज करें *'
                    // }
                    placeholderTextColor="#888"
                    // value={p_phone}
                    keyboardType="numeric"
                    style={{
                      color: '#000',
                      width: '80%',
                      textAlign: 'center',
                      backgroundColor: '#fff',
                      elevation: 10,
                      borderColor: '#ccc',
                      borderRadius: 3,
                      height: 45,
                      marginLeft: 10,
                      fontSize: 15,
                      fontWeight: '900',
                    }}
                    value={phonenum}
                    onChangeText={val => handleInputChange('phonenum', val)}
                    // onFocus={val => handleInputChange('phonenum', val)}
                  />
                  {/* {phonenum != '' && phonenum.length >= 10 && !phoneError && (
                <Animatable.View
                  animation="bounceIn"
                  style={{marginTop: 5, marginLeft: 15}}>
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              )} */}
                </View>
                {phoneError && (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text
                      style={{
                        color: Colors.red,
                        marginTop: -5,
                        // marginBottom: 5,
                        fontSize: 12,
                      }}>
                      {/* {'** ଦୟାକରି ବୈଧ ଫୋନ୍ ନମ୍ବର ପ୍ରବେଶ କରନ୍ତୁ'} */}
                      {selectedLanguage === 'odia'
                        ? '** ଦୟାକରି ବୈଧ ଫୋନ୍ ନମ୍ବର ପ୍ରବେଶ କରନ୍ତୁ'
                        : selectedLanguage === 'english'
                        ? `** Please enter valid phone number`
                        : `** Please enter valid phone number`}
                      {/* : '** कृपया मान्य फ़ोन नंबर दर्ज करें'} */}
                    </Text>
                  </Animatable.View>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                    // marginTop: 10,
                    // borderBottomWidth: 1,
                    // borderBottomColor: Colors.secondary,
                    width: '70%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {/* <FontAwesome name="user-o" color={'#333'} size={20} /> */}
                  <TextInput
                    // placeholder={'ପାସ୍‌ୱାର୍ଡ ପ୍ରବେଶ କରନ୍ତୁ *'}
                    placeholder={
                      selectedLanguage === 'odia'
                        ? 'ପାସ୍‌ୱାର୍ଡ ପ୍ରବେଶ କରନ୍ତୁ *'
                        : selectedLanguage === 'english'
                        ? `Enter Password *`
                        : `Enter Password *`
                    }
                    // : 'पासवर्ड दर्ज करें *'
                    placeholderTextColor="#888"
                    // value={p_phone}
                    // keyboardType="numeric"
                    style={{
                      color: '#000',
                      width: '80%',
                      textAlign: 'center',
                      backgroundColor: '#fff',
                      elevation: 10,
                      borderColor: '#ccc',
                      borderRadius: 3,
                      height: 45,
                      marginLeft: 10,
                      fontSize: 15,
                      fontWeight: '900',
                    }}
                    value={password}
                    onChangeText={val => handleInputChange('password', val)}
                    onSubmitEditing={() => handleLoginWithPassword()}
                    // onFocus={val => handleInputChange('password', val)}
                  />
                </View>
                {passwordError && (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text
                      style={{color: Colors.red, fontSize: 12, marginTop: -5}}>
                      {/* {'** ଦୟାକରି ବୈଧ ପାସୱାର୍ଡ ପ୍ରବେଶ କରନ୍ତୁ'} */}
                      {selectedLanguage === 'odia'
                        ? '** ଦୟାକରି ବୈଧ ପାସୱାର୍ଡ ପ୍ରବେଶ କରନ୍ତୁ'
                        : selectedLanguage === 'english'
                        ? `** Please enter valid password`
                        : `** Please enter valid password`}
                      {/* : '** कृपया मान्य पासवर्ड दर्ज करें'} */}
                    </Text>
                  </Animatable.View>
                )}
                <View
                  style={{
                    width: device_width * 0.99,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 11,
                      fontWeight: '600',
                      // marginLeft: 15,
                    }}>
                    {/* {'ସାଇନ୍ ଇନ୍ କରି, ମୁଁ ଏହାକୁ ଗ୍ରହଣ କରେ'} */}
                    {selectedLanguage === 'odia'
                      ? 'ସାଇନ୍ ଇନ୍ କରି, ମୁଁ ଏହାକୁ ଗ୍ରହଣ କରେ'
                      : selectedLanguage === 'english'
                      ? `By signing in, I accept the`
                      : `By signing in, I accept the`}{' '}
                    {/* : 'साइन इन करके, मैं स्वीकार करता हूं'}{' '} */}
                    <Text
                      onPress={() => {
                        setPaused(true);
                        navigation.navigate('TermAndConditions');
                      }}
                      style={{
                        fontSize: 11,
                        // color: '#f1a722',
                        color: 'green',
                        textDecorationLine: 'underline',
                        fontWeight: '600',
                      }}>
                      {/* {'ସର୍ତ୍ତାବଳୀ'} */}
                      {selectedLanguage === 'odia'
                        ? 'ସର୍ତ୍ତାବଳୀ'
                        : selectedLanguage === 'english'
                        ? `Terms & Conditions`
                        : `Terms & Conditions`}
                      {/* // : 'नियम और शर्तें'} */}
                    </Text>
                  </Text>
                  {/* <View
                  style={{ alignItems: 'center',marginVertical:17,position:'absolute',top:10,}}> */}
                  <TouchableOpacity
                    style={{
                      marginVertical: 17,
                      position: 'absolute',
                      top: 10,
                      backgroundColor: '#f1a722',
                      flexDirection: 'row',
                      width: '55%',
                      alignSelf: 'center',
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                    }}
                    // disabled={emptyBtns ? true : false}
                    onPress={() => {
                      // loginHandle(data.username, data.password);
                      handleLoginWithPassword();
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 16,
                        fontWeight: '900',
                      }}>
                      {/* {'ଯାଞ୍ଚ ଏବଂ ସାଇନ୍ ଇନ୍ କରନ୍ତୁ'} */}
                      {selectedLanguage === 'odia'
                        ? 'ଯାଞ୍ଚ ଏବଂ ସାଇନ୍ ଇନ୍ କରନ୍ତୁ'
                        : selectedLanguage === 'english'
                        ? `Verify & Sign In`
                        : `Verify & Sign In`}
                      {/* : 'सत्यापित करें और साइन इन करें'} */}
                    </Text>
                    {/* <View
                  style={{
                    position: 'absolute',
                    right: 30,
                    paddingHorizontal: 6,
                    paddingVertical: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 35,
                    borderWidth: 2,
                    borderColor: '#fff',
                  }}>
                  <FontAwesome
                    name="chevron-right"
                    color={Colors.white}
                    size={12}
                  />
                </View> */}
                  </TouchableOpacity>
                  {/* </View> */}
                </View>
              </ImageBackground>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // borderWidth:1,
                  marginBottom: 20,
                  top: -15,
                  width: device_width * 0.98,
                  alignSelf: 'center',
                  // backgroundColor:userBlink ? Colors.secondary : 'crimson'
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: device_width * 0.62,
                    paddingHorizontal: 5,
                    borderRadius: 10,
                    backgroundColor: userBlink ? '#dee' : 'lawngreen',
                  }}>
                  <Foundation
                    name="burst-new"
                    size={30}
                    backgroundColor={userBlink ? '#dee' : 'lawngreen'}
                    // backgroundColor={'green'}
                    color={userBlink ? 'lawngreen' : 'gold'}
                    borderRadius={20}
                    // onPress={() => navigation.goBack()}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setPaused(true);
                      navigation.navigate('SignUpScreen1', {
                        email: '',
                        phone: '',
                        otplogin: false,
                        emailLogin: false,
                        pswdLogin: true,
                      });
                    }}
                    style={{
                      width: '90%',
                      alignItems: 'flex-start',
                      borderWidth: 0,
                      // marginHorizontal: 5,
                      paddingLeft: 8,
                      // borderWidth:1,
                      justifyContent: 'center',
                      alignSelf: 'flex-start',
                      marginVertical: 10,
                    }}>
                    <Text
                      style={{
                        // textDecorationLine: 'underline',
                        color: '#333',
                        fontSize: 11,
                        fontWeight: '700',
                      }}>
                      {/* {'ନୂତନ ବ୍ୟବହାରକାରୀ ?'} */}
                      {selectedLanguage === 'odia'
                        ? 'ନୂତନ ବ୍ୟବହାରକାରୀ ?'
                        : selectedLanguage === 'english'
                        ? 'New User ?'
                        : 'New User ?'}{' '}
                      {/* // : 'नया उपयोगकर्ता?'}{' '} */}
                      <Text
                        style={{
                          textDecorationLine: 'underline',
                          // color: userBlink ? Colors.primary : 'gold',
                          color: Colors.primary,
                          fontSize: 12,
                          fontWeight: '700',
                        }}>
                        {/* {'ଏଠାରେ ପଞ୍ଜିକରଣ କର'} */}
                        {selectedLanguage === 'odia'
                          ? 'ଏଠାରେ ପଞ୍ଜିକରଣ କର'
                          : selectedLanguage === 'english'
                          ? 'Register here'
                          : 'Register here'}
                        {/* : 'यहां रजिस्टर करें'} */}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setHelp(true), setForgotPass(true);
                  }}
                  style={{
                    // width: '40%',
                    alignItems: 'flex-end',
                    // borderWidth: 1,
                    paddingRight: 5,
                    justifyContent: 'center',
                    alignSelf: 'flex-end',
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                      color: '#f1a722',
                      fontSize: 11,
                      fontWeight: '600',
                    }}>
                    {/* {'ପାସୱାର୍ଡ ଭୁଲି ଯାଇଛନ୍ତି କି ?'} */}
                    {selectedLanguage === 'odia'
                      ? 'ପାସୱାର୍ଡ ଭୁଲି ଯାଇଛନ୍ତି କି ?'
                      : selectedLanguage === 'english'
                      ? 'Forgot Password ?'
                      : 'Forgot Password ?'}
                    {/* // : 'पासवर्ड भूल गए?'} */}
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <TouchableOpacity
              style={{
                alignSelf:'flex-end',
                borderWidth: 0,
                alignItems: 'center',
                paddingVertical: 5,
                paddingHorizontal: 10,
                marginBottom:5
              }}
              onPress={() =>navigation.navigate("ForgetPasswordOtp")}

              >
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.primary,
                  textDecorationLine: 'underline',
                  fontWeight: '800',
                  letterSpacing: 1,
                }}>
                {trans('Forget Password ?')}
              </Text>
            </TouchableOpacity> */}

              <Text
                style={{
                  fontWeight: '700',
                  // letterSpacing: 1,
                  color: '#f1a722',
                  fontSize: 13,
                  marginLeft: 15,
                  // alignSelf: 'center',
                }}>
                {/* {'ଲଗଇନ୍ କରିବାକୁ ଅନ୍ୟ ଉପାୟ ଚେଷ୍ଟା କରନ୍ତୁ'} */}
                {selectedLanguage === 'odia'
                  ? 'ଲଗଇନ୍ କରିବାକୁ ଅନ୍ୟ ଉପାୟ ଚେଷ୍ଟା କରନ୍ତୁ'
                  : selectedLanguage === 'english'
                  ? 'Try other ways to login'
                  : 'Try other ways to login'}
                {/* : 'लॉगिन करने के अन्य तरीकों का प्रयास करें'} */}
              </Text>
              <View
                style={{
                  width: '80%',
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                {/* <TouchableOpacity
                  disabled={showprog == true ? true : false}
                  onPress={() => googleLogin()}
                  style={{
                    // flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    // backgroundColor: Colors.secondary,
                    width: device_width * 0.4,
                    height: 70,
                    // borderWidth: 1,
                  }}>
                  <View
                    style={{
                      // width: '100%',
                      height: 51,
                      width: 51,
                      alignItems: 'center',
                      borderRadius: 50,
                      // padding: 5,
                    }}>
                    <Avatar.Image
                      onPress={() => {
                        googleLogin();
                      }}
                      source={require('../../../assets/google.jpg')}
                      size={50}
                      style={{backgroundColor: Colors.primary}}
                    />

                    {/* <GoogleSigninButton
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => googleLogin()}
                    disabled={showprog == true ? true : false}
                  />
                  </View>
                  <Text
                    style={{
                      fontWeight: '600',
                      // letterSpacing: 1,
                      color: '#fff',
                      textAlign: 'center',
                      fontSize: 13,
                      alignSelf: 'center',
                    }}>
                    {'Google'}
                    {/* {language === 'english' ?'Google':language === 'odia' ?'ଗୁଗୁଲ୍':'गूगल'}
                  </Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  // disabled={showprog == true ? true : false}
                  onPress={() => setShowOTPContent(true)}
                  style={{
                    // flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    // backgroundColor: Colors.secondary,
                    width: device_width * 0.4,
                    height: 70,
                    // borderWidth: 1,
                  }}>
                  <View
                    style={{
                      // width: '100%',
                      height: 51,
                      width: 51,
                      alignItems: 'center',
                      borderRadius: 50,
                      // padding: 5,
                    }}>
                    <Avatar.Image
                      onPress={() => {
                        setShowOTPContent(true);
                      }}
                      source={require('../../../assets/msg.jpg')}
                      size={50}
                      style={{backgroundColor: '#fff'}}
                    />

                    {/* <GoogleSigninButton
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => googleLogin()}
                    disabled={showprog == true ? true : false}
                  /> */}
                  </View>
                  <Text
                    style={{
                      fontWeight: '600',
                      // letterSpacing: 1,
                      color: '#fff',
                      textAlign: 'center',
                      fontSize: 13,
                      alignSelf: 'center',
                    }}>
                    {/* {'ଓଟିପି ସହ ସାଇନ୍-ଇନ୍ କରନ୍ତୁ'} */}
                    {selectedLanguage === 'english'
                      ? 'Sign-in with OTP'
                      : selectedLanguage === 'odia'
                      ? 'ଓଟିପି ସହ ସାଇନ୍-ଇନ୍ କରନ୍ତୁ'
                      : 'Sign-in with OTP'}
                    {/* // : 'ओटीपी प्राप्त करें'} */}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* <Text
              style={{
                fontWeight: '800',
                letterSpacing: 1,
                color: Colors.primary,
                fontSize: 13,
                alignSelf: 'center',
              }}>
              {trans('OR')}
            </Text>
            <View style={{width: '100%', alignItems: 'center'}}>
              <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => googleLogin()}
                // disabled={this.state.isSigninInProgress}
              />
            </View>
            <Text
              style={{
                fontWeight: '800',
                letterSpacing: 1,
                color: Colors.primary,
                fontSize: 13,
                alignSelf: 'center',
              }}>
              {trans('OR')}
            </Text>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                borderWidth: 0,
                alignItems: 'center',
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}
              onPress={() => setShowOTPContent(true)}>
              <Text
                style={{
                  fontSize: 16,
                  color: Colors.primary,
                  textDecorationLine: 'underline',
                  fontWeight: '800',
                  letterSpacing: 1,
                }}>
                {trans('Login with OTP')}
              </Text>
            </TouchableOpacity> */}
              <View
                style={{
                  backgroundColor: '#ffde59',
                  padding: 5,
                  borderRadius: 10,
                  marginTop: 20,
                  width: device_width * 0.94,
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    paddingLeft: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    elevation: 5,
                    marginVertical: 5,
                    backgroundColor: '#ffde59',
                    paddingVertical: 10,
                    borderRadius: 7,
                    // alignSelf: 'flex-end',
                  }}
                  onPress={() => setHelp(true)}>
                  <View
                    style={{
                      backgroundColor: 'green',
                      borderRadius: 50,
                      padding: 5,
                    }}>
                    <AntDesign
                      name={'customerservice'}
                      style={{fontSize: 25, color: '#fff'}}
                    />
                  </View>
                  <View style={{width: '85%', marginLeft: 5, borderWidth: 0}}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: '700',
                        // color: Colors.primary,
                        color: '#333',
                        paddingLeft: 10,
                      }}>
                      {/* {'ସହାୟତା କେନ୍ଦ୍ର'} */}
                      {selectedLanguage === 'odia'
                        ? 'ସହାୟତା କେନ୍ଦ୍ର'
                        : selectedLanguage === 'english'
                        ? 'Help Desk'
                        : 'Help Desk'}
                      {/* // : 'हेल्प डेस्क'} */}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '600',
                        // color: Colors.primary,
                        color: '#333',
                        paddingLeft: 10,
                      }}>
                      {' '}
                      {/* 'ଯଦି ଆପଣ ଆପ୍ ଲଗଇନ୍ କିମ୍ବା ଓଟିପି ପାଇବାରେ କୌଣସି ଅସୁବିଧାର ସମ୍ମୁଖୀନ ହେଉଛନ୍ତି, ଦୟାକରି ଏହି ସମସ୍ତ ନମ୍ବର ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ :- 8018990558, 8249375247, 7008699927' */}
                      {selectedLanguage === 'odia'
                        ? 'ଯଦି ଆପଣ ଆପ୍ ଲଗଇନ୍ କିମ୍ବା ଓଟିପି ପାଇବାରେ କୌଣସି ଅସୁବିଧାର ସମ୍ମୁଖୀନ ହେଉଛନ୍ତି, ଦୟାକରି ଏହି ସମସ୍ତ ନମ୍ବର ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ :- 9861302757,7008699927,9337052091'
                        : selectedLanguage === 'english'
                        ? 'We kindly request you to reach out to our dedicated support team if you  encounter any issues with app login or OTP . Please contact on. 9861302757,7008699927,9337052091'
                        : 'We kindly request you to reach out to our dedicated support team if you  encounter any issues with app login or OTP . Please contact on. 9861302757,7008699927,9337052091'}
                      {/* // : 'यदि आपको ऐप लॉगिन या ओटीपी के साथ कोई समस्या आती है तो हम कृपया हमारी समर्पित सहायता टीम से संपर्क करें। कृपया संपर्क करें। 8018990558, 8249375247, 7008699927'} */}
                      {/* {trans('Contact our customer care')} */}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingLeft: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    elevation: 5,
                    marginVertical: 5,
                    backgroundColor: '#ffde59',
                    paddingVertical: 10,
                    borderRadius: 7,
                    // alignSelf: 'flex-end',
                  }}
                  // onPress={() => {
                  //   {
                  //     language == 'odia'
                  //       ? navigation.navigate('IntroVideoScreen', {
                  //           url: 'https://notevook.s3.ap-south-1.amazonaws.com/Login+odia.mp4',
                  //         })
                  //       : navigation.navigate('IntroVideoScreen', {
                  //           url: 'https://notevook.s3.ap-south-1.amazonaws.com/login+process.mp4',
                  //         });
                  //   }
                  // }}
                  // onPress={() => setHelp(true)}
                  onPress={() => setLangModal(true)}>
                  <View
                    style={{
                      backgroundColor: 'green',
                      borderRadius: 50,
                      padding: 5,
                    }}>
                    <AntDesign
                      name={'playcircleo'}
                      style={{fontSize: 25, color: '#fff'}}
                    />
                  </View>
                  <View style={{width: '85%', marginLeft: 5, borderWidth: 0}}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: '700',
                        // color: Colors.primary,
                        color: '#333',
                        paddingLeft: 10,
                      }}>
                      {/* {'ଟ୍ୟୁଟୋରିଆଲ୍ ଭିଡିଓ'} */}
                      {selectedLanguage === 'odia'
                        ? 'ଟ୍ୟୁଟୋରିଆଲ୍ ଭିଡିଓ'
                        : selectedLanguage === 'english'
                        ? 'Tutorial Video'
                        : 'Tutorial Video'}
                      {/* : 'ट्यूटोरियल वीडियो'} */}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '600',
                        // color: Colors.primary,
                        color: '#333',
                        paddingLeft: 10,
                      }}>
                      {/* {'ଆପ୍ କିପରି ବ୍ୟବହାର କରାଯିବ ତାହାର ଗାଇଡ୍ ଭିଡିଓ'} */}
                      {/* {trans(
                      'If you are facing any difficulty in app login or getting OTP. Please contact these number.',
                    )} */}
                      {selectedLanguage === 'odia'
                        ? 'ଆପ୍ କିପରି ବ୍ୟବହାର କରାଯିବ ତାହାର ଗାଇଡ୍ ଭିଡିଓ'
                        : selectedLanguage === 'english'
                        ? 'Guide video of how to use the app'
                        : 'Guide video of how to use the app'}
                      {/* : 'एप्लिकेशन का उपयोग करने के तरीके के बारे में वीडियो गाइड करें'} */}
                    </Text>
                  </View>
                </TouchableOpacity>
                {/*  <TouchableOpacity
                onPress={() => {
                  navigation.navigate('VideoScreen', {
                    url: 'https://notevook.s3.ap-south-1.amazonaws.com/VID_20231103_183115.mp4',
                  });
                }}
                style={{
                  width: device_width * 0.9,
                  alignSelf: 'center',
                  elevation: 5,
                  // height: 90,
                  paddingVertical: 7,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 10,
                  backgroundColor: '#ffde59',
                  // flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AntDesign
                  name={'playcircleo'}
                  style={{
                    fontSize: 20,
                    color: Colors.primary,
                    // position: 'absolute',
                    // left: 30,
                  }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: '#222',
                    marginLeft: 10,
                    textTransform: 'capitalize',
                    fontWeight: '700',
                    textAlign: 'center',
                    textDecorationLine: 'underline',
                    // position: 'absolute',
                    // right: 10,
                    // width: '85%',
                    // alignSelf: 'flex-end',
                  }}>
                  {trans(
                    `If you are facing any issues while login then click on this link to watch the guide video`,
                  )}
                </Text>
                {/* <Text
                  style={{
                    fontSize: 14,
                    color: '#000',
                    marginLeft: 10,
                    textTransform: 'capitalize',
                    fontWeight: '900',
                    textAlign: 'right',
                    position: 'absolute',
                    left: 50,
                    top: 10,
                    zIndex: 1,

                    // width: '85%',
                    // alignSelf: 'flex-end',
                  }}>
                  {trans(`login failed !`)}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#000',
                    marginLeft: 10,
                    textTransform: 'capitalize',
                    fontWeight: '900',
                    textAlign: 'right',
                    position: 'absolute',
                    left: 10,
                    zIndex: 1,

                    // width: '85%',
                    // alignSelf: 'flex-end',
                  }}>
                  {trans(`Create New Account !`)}
                </Text>
                <ImageBackground
                  style={{
                    height: 75,
                    width: device_width,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                  source={require('../../../assets/How-to-Use.png')}
                  resizeMode="contain"
                  // source={{
                  //   // uri: "https://wkresources.s3.ap-south-1.amazonaws.com/f_logo.png",
                  //   uri: 'https://leverageedu.com/blog/wp-content/uploads/2020/04/Types-of-Education.jpg',
                  // }}
                >
                  <AntDesign
                    name={'playcircleo'}
                    style={{
                      fontSize: 50,
                      color: '#222',
                      // position: 'absolute',
                      // left: 30,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#000',
                      marginLeft: 10,
                      textTransform: 'capitalize',
                      fontWeight: '900',
                      textAlign: 'right',
                      position: 'absolute',
                      right: 10,
                      // width: '85%',
                      // alignSelf: 'flex-end',
                    }}>
                    {trans(`if you are facing any issues while login then click on this link to watch the guide video`)}
                  </Text>
                </ImageBackground> */}
                {/* </TouchableOpacity>*/}
              </View>
            </Animatable.View>
          )}
        </ScrollView>
        {modalStatus && (
          <Modal transparent={true} visible={modalStatus}>
            <ImageBackground
              style={{
                // borderRadius: 50,
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderColor: '#fff',
                // width: device_width,
                // height: device_height,
                minHeight: device_height * 0.6,
                minWidth: device_width * 0.8,
                // borderRadius: 25,
                // flex: 1,
                alignSelf: 'center',
                // justifyContent: 'center',
                // alignItems: 'center',
              }}
              resizeMode="cover"
              source={require('../../../assets/0.png')}>
              <View
                style={{
                  borderRadius: 15,
                  borderWidth: 1,
                  minHeight: device_height * 0.7,
                  minWidth: device_width * 0.8,
                  // backgroundColor: '#fff',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  flex: 1,
                  alignItems: 'center',
                  //   paddingHorizontal: 20,
                }}>
                <FastImage
                  style={{
                    height: 100,
                    width: 200,
                    // position: 'absolute',
                    //left: 10,
                  }}
                  resizeMode="contain"
                  source={require('../../../assets/NOTEVOOK.jpeg')}
                />
                <AntDesign
                  name="closecircleo"
                  style={{
                    fontSize: 35,
                    color: '#333',
                    position: 'absolute',
                    top: 30,
                    right: 30,
                    // marginTop: 10,
                    backgroundColor: '#f1a722',
                    borderRadius: 50,
                  }}
                  onPress={() => closeModalFunc()}
                />

                <View
                  style={{
                    // flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    // borderWidth: 1,
                    paddingVertical: 15,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      width: device_width * 0.8,
                      fontSize: 27,
                      color: '#f1a722',
                      marginTop: 10,
                      marginLeft: 10,
                      fontWeight: '900',
                    }}>
                    {/* {'କ୍ଷମା କରନ୍ତୁ !'} */}
                    {selectedLanguage === 'odia'
                      ? 'କ୍ଷମା କରନ୍ତୁ !'
                      : selectedLanguage === 'english'
                      ? 'Sorry !'
                      : 'Sorry !'}
                    {/* : 'क्षमा करें !'} */}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      width: device_width * 0.7,
                      fontSize: 16,
                      color: '#ddd',
                      marginTop: 5,
                      // marginLeft: 5,
                      fontWeight: '700',
                    }}>
                    {/* {'ଆପଣଙ୍କର ଖାତା ବର୍ତ୍ତମାନ ନିଷ୍କ୍ରିୟ ଅଟେ'} */}
                    {selectedLanguage === 'odia'
                      ? 'ଆପଣଙ୍କର ଖାତା ବର୍ତ୍ତମାନ ନିଷ୍କ୍ରିୟ ଅଟେ'
                      : selectedLanguage === 'english'
                      ? 'Your account is currently inactive'
                      : 'Your account is currently inactive'}
                    {/* // : 'आपका खाता वर्तमान में निष्क्रिय है'} */}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      width: device_width * 0.7,
                      fontSize: 15,
                      color: '#ddd',
                      marginTop: 5,
                      // marginLeft: 5,
                      fontWeight: '500',
                    }}>
                    {/* {'ଆମେ ଆପଣଙ୍କୁ ଶୀଘ୍ର ଅପଡେଟ୍ କରିବୁ'} */}
                    {selectedLanguage === 'odia'
                      ? 'ଆମେ ଆପଣଙ୍କୁ ଶୀଘ୍ର ଅପଡେଟ୍ କରିବୁ'
                      : selectedLanguage === 'english'
                      ? 'We will update you shortly'
                      : 'We will update you shortly'}
                    {/* // : 'हम आपको जल्द ही अपडेट करेंगे'} */}
                  </Text>
                </View>
                <View
                  style={{
                    // borderWidth: 1,
                    paddingVertical: 15,
                    alignItems: 'center',
                    marginTop: 10,
                    marginLeft: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    // borderColor: '#aaa',
                    // borderRadius: 8,
                    padding: 10,
                  }}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 10,
                      width: '40%',
                      marginVertical: 5,
                      // borderWidth: 1,
                      marginRight: 25,
                      borderColor: 'white',
                      backgroundColor: 'green',
                      paddingVertical: 15,
                      justifyContent: 'center',
                    }}
                    onPress={() => closeModalFunc()}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        alignItems: 'center',
                      }}>
                      {/* {'ଠିକ ଅଛି'} */}
                      {selectedLanguage === 'odia'
                        ? 'ଠିକ ଅଛି'
                        : selectedLanguage === 'english'
                        ? 'OK'
                        : 'OK'}
                      {/* // : 'ठीक है'} */}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    textAlign: 'left',
                    width: device_width * 0.7,
                    fontSize: 18,
                    color: '#f1a722',
                    marginTop: 5,
                    // marginLeft: 5,
                    fontWeight: '500',
                  }}>
                  {/* {'ବି. ଦ୍ର-'} */}
                  {selectedLanguage === 'odia'
                    ? 'ବି. ଦ୍ର-'
                    : selectedLanguage === 'english'
                    ? 'Note:'
                    : 'Note:'}
                  {/* : 'नोट :'} */}
                </Text>
                <Text
                  style={{
                    textAlign: 'left',
                    width: device_width * 0.7,
                    fontSize: 15,
                    color: '#f1a722',
                    marginTop: 5,
                    // marginLeft: 5,
                    fontWeight: '500',
                  }}>
                  {/* 'ଆପ୍ଲିକେସନ୍ ରେ ଆପଣଙ୍କ ପୂର୍ବ ବ୍ୟବହୃତ ସମସ୍ତ ତଥ୍ୟ ୯୦ ଦିନ ପାଇଁ ଉପଲବ୍ଧ ରହିଛି l ଆପଣ ଚାହିଁଲେ ପୁନର୍ବାର ବ୍ୟବହାର କରି ପାରିବେ' */}
                  {/* {language === 'odia'
                  ? 'ବି. ଦ୍ର-  '
                  : 'Note:  '} */}
                  {selectedLanguage === 'odia'
                    ? 'ଆପ୍ଲିକେସନ୍ ରେ ଆପଣଙ୍କ ପୂର୍ବ ବ୍ୟବହୃତ ସମସ୍ତ ତଥ୍ୟ ୯୦ ଦିନ ପାଇଁ ଉପଲବ୍ଧ ରହିଛି l ଆପଣ ଚାହିଁଲେ ପୁନର୍ବାର ବ୍ୟବହାର କରି ପାରିବେ'
                    : selectedLanguage === 'english'
                    ? 'Your data will be stored with us for the next 90 days. However you can retrieve your used data in this period.'
                    : 'Your data will be stored with us for the next 90 days. However you can retrieve your used data in this period.'}

                  {/* // : 'आपका डेटा अगले 90 दिनों के लिए हमारे साथ संग्रहीत किया जाएगा। हालाँकि, आप इस अवधि में अपने उपयोग किए गए डेटा को पुनर्प्राप्त कर सकते हैं।'} */}
                </Text>
              </View>
            </ImageBackground>
          </Modal>
        )}

        <Modal transparent={true} visible={help}>
          <ImageBackground
            style={{
              // borderRadius: 50,
              borderTopWidth: 1,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderColor: '#fff',
              // width: device_width,
              // height: device_height,
              minHeight: device_height * 0.6,
              minWidth: device_width * 0.94,
              // borderRadius: 25,
              // flex: 1,
              alignSelf: 'center',
              // justifyContent: 'center',
              // alignItems: 'center',
            }}
            resizeMode="cover"
            source={require('../../../assets/0.png')}>
            <View
              style={{
                // backgroundColor: '#fff',
                // flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{alignItems: 'flex-end', justifyContent: 'center'}}>
                <View
                  style={{
                    borderRadius: 15,
                    // borderWidth: 1,
                    height: device_height * 0.6,
                    width: device_width * 0.94,
                    // backgroundColor: '#fff',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <View style={{alignItems: 'center', paddingVertical: 20}}>
                        {forgotPass == false ? (
                          <Text
                            style={{
                              textAlign: 'center',
                              width: device_width * 0.8,
                              fontSize: 17,
                              color: '#fff',
                              marginTop: 10,
                              marginLeft: 10,
                              fontWeight: '900',
                            }}>
                            {/* 'ଯଦି ଆପଣ ଆପ୍ ଲଗଇନ୍ କିମ୍ବା ଓଟିପି ପାଇବାରେ କୌଣସି ଅସୁବିଧାର ସମ୍ମୁଖୀନ ହେଉଛନ୍ତି' */}
                            {selectedLanguage === 'odia'
                              ? 'ଯଦି ଆପଣ ଆପ୍ ଲଗଇନ୍ କିମ୍ବା ଓଟିପି ପାଇବାରେ କୌଣସି ଅସୁବିଧାର ସମ୍ମୁଖୀନ ହେଉଛନ୍ତି'
                              : selectedLanguage === 'english'
                              ? 'If you are facing any difficulty in app login or getting OTP'
                              : 'If you are facing any difficulty in app login or getting OTP'}
                            {/* // : 'यदि आपको ऐप लॉगिन या ओटीपी प्राप्त करने में किसी भी कठिनाई का सामना करना पड़ रहा है'} */}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              textAlign: 'center',
                              width: device_width * 0.8,
                              fontSize: 17,
                              color: '#fff',
                              marginTop: 10,
                              marginLeft: 10,
                              fontWeight: '900',
                            }}>
                            {' '}
                            {/* 'ଯଦି ଆପଣ ଆପ୍ ଲଗଇନ୍ ରେ କୌଣସି ଅସୁବିଧାର ସମ୍ମୁଖୀନ ହେଉଛନ୍ତି କିମ୍ବା ଆପଣ ପାସୱାର୍ଡ ଭୁଲି ଯାଇଛନ୍ତି' */}
                            {selectedLanguage === 'odia'
                              ? 'ଯଦି ଆପଣ ଆପ୍ ଲଗଇନ୍ ରେ କୌଣସି ଅସୁବିଧାର ସମ୍ମୁଖୀନ ହେଉଛନ୍ତି କିମ୍ବା ଆପଣ ପାସୱାର୍ଡ ଭୁଲି ଯାଇଛନ୍ତି'
                              : selectedLanguage === 'english'
                              ? 'If you are facing any difficulty in app login or you forgot password'
                              : 'If you are facing any difficulty in app login or you forgot password'}
                            {/* // : 'यदि आपको ऐप लॉगिन में कोई कठिनाई आ रही है या आप पासवर्ड भूल गए हैं'} */}
                          </Text>
                        )}
                        <Text
                          style={{
                            textAlign: 'center',
                            width: device_width * 0.7,
                            fontSize: 15,
                            color: '#def',
                            marginTop: 10,
                            // marginLeft: 5,
                            fontWeight: '500',
                          }}>
                          {/* {'ଦୟାକରି ଏହି ସମସ୍ତ ନମ୍ବର ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ'} */}
                          {selectedLanguage === 'odia'
                            ? 'ଦୟାକରି ଏହି ସମସ୍ତ ନମ୍ବର ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ'
                            : selectedLanguage === 'english'
                            ? 'Please contact these number'
                            : 'Please contact these number'}
                          {/* : 'कृपया इन नंबरों पर संपर्क करें'} */}
                        </Text>
                        <View
                          style={{
                            backgroundColor: '#f1a722',
                            borderRadius: 50,
                            padding: 5,
                            marginTop: 10,
                            alignSelf: 'center',
                            elevation: 8,
                          }}>
                          <AntDesign
                            name={'customerservice'}
                            style={{fontSize: 25, color: '#333'}}
                          />
                        </View>
                        {/* <Text
                      style={{
                        textAlign: 'center',
                        width: device_width * 0.7,
                        fontSize: 15,
                        color: Colors.primary,
                        marginTop: 5,
                        // marginLeft: 5,
                        fontWeight: '700',
                      }}>
                      {trans('Contact No. :')}
                    </Text> */}
                      </View>
                      <AntDesign
                        name="closecircleo"
                        style={{
                          fontSize: 38,
                          color: '#fff',
                          position: 'absolute',
                          top: -10,
                          right: -10,
                          // marginTop: 10,
                          backgroundColor: 'crimson',
                          // backgroundColor: '#f1a722',
                          borderRadius: 50,
                        }}
                        onPress={() => setHelp(false)}
                      />
                    </View>
                    <View
                      style={{
                        // borderWidth: 1,
                        paddingVertical: 15,
                        alignItems: 'center',
                        // marginTop: 10,
                        marginLeft: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        // padding: 10,
                      }}>
                      <TouchableOpacity
                        style={{flexDirection: 'row', borderWidth: 0}}
                        onPress={() => Linking.openURL(`tel:${9861302757}`)}>
                        <View
                          style={{
                            backgroundColor: Colors.white,
                            borderRadius: 50,
                            height: 30,
                            width: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5,
                            marginRight: 10,
                          }}>
                          <Ionicons
                            style={{color: '#50B450'}}
                            name="call"
                            size={22}
                          />
                        </View>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              marginRight: 10,
                              fontWeight: '700',
                              color: '#f1a722',
                            }}>
                            +91 9861302757
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{display: 'flex', flexDirection: 'row'}}
                        onPress={() => Linking.openURL(`tel:${7008699927}`)}>
                        <View
                          style={{
                            backgroundColor: Colors.white,
                            borderRadius: 50,
                            height: 30,
                            width: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 10,
                            marginTop: 5,
                          }}>
                          <Ionicons
                            style={{color: '#50B450'}}
                            name="call"
                            size={22}
                          />
                        </View>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              marginRight: 10,
                              fontWeight: '700',
                              color: '#f1a722',
                            }}>
                            +91 7008699927
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        // borderWidth: 1,
                        paddingVertical: 15,
                        alignItems: 'center',
                        // marginTop: 10,
                        marginLeft: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        // padding: 10,
                      }}>
                      <TouchableOpacity
                        style={{flexDirection: 'row', borderWidth: 0}}
                        onPress={() => Linking.openURL(`tel:${9337052091}`)}>
                        <View
                          style={{
                            backgroundColor: Colors.white,
                            borderRadius: 50,
                            height: 30,
                            width: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5,
                            marginRight: 10,
                          }}>
                          <Ionicons
                            style={{color: '#50B450'}}
                            name="call"
                            size={22}
                          />
                        </View>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              marginRight: 10,
                              fontWeight: '700',
                              color: '#f1a722',
                            }}>
                            +91 9337052091
                          </Text>
                        </View>
                      </TouchableOpacity>
                      
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  position: 'absolute',
                  bottom: -20,
                  height: 100,
                  width: '100%',
                }}>
                <FastImage
                  style={{
                    height: 100,
                    width: '100%',
                    // position:'absolute', bottom:-23
                    // borderWidth: 1,
                    borderColor: 'red',
                    marginTop: -30,
                    marginBottom: -15,
                  }}
                  source={require('../../../assets/resting1.png')}
                  resizeMode="contain"
                />
                <FastImage
                  style={{
                    height: 30,
                    width: device_width * 0.97,
                    alignSelf: 'center',
                    // borderWidth: 1,
                    // borderColor: 'blue',
                    // position:'absolute', bottom:-23
                    // marginTop:-8
                  }}
                  source={require('../../../assets/grass.png')}
                  resizeMode="contain"
                />
              </View>
            </View>
          </ImageBackground>
        </Modal>
        {langModal && (
          <Modal transparent={true} visible={langModal}>
            <ImageBackground
              style={{
                // borderRadius: 50,
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderColor: '#fff',
                // width: device_width,
                // height: device_height,
                minHeight: device_height * 0.45,
                minWidth: device_width * 0.94,
                // borderRadius: 25,
                // flex: 1,
                alignSelf: 'center',
                // justifyContent: 'center',
                // alignItems: 'center',
              }}
              resizeMode="cover"
              source={require('../../../assets/0.png')}>
              <View
                style={{
                  borderRadius: 15,
                  // borderWidth: 1,
                  height: device_height * 0.4,
                  width: device_width * 0.95,
                  // backgroundColor: 'green',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  // flex: 1,
                  alignItems: 'center',
                  alignSelf: 'center',
                  paddingBottom: 20,
                }}>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: -5,
                    paddingVertical: 10,
                    // borderWidth: 1,
                    height: device_height * 0.15,
                    width: '90%',
                  }}>
                  <FastImage
                    style={{
                      height: device_height * 0.14,
                      width: '70%',
                      // alignSelf:'flex-start',

                      // backgroundColor:'rgba(0,255,0,0.1)',
                      // top: 20,
                    }}
                    resizeMode="cover"
                    source={require('../../../assets/snake.png')}
                  />
                </View>
                {/* // <
                  // style={{color: '#f1a722', borderWidth: 0, zIndex: -1}}
                  // name="language"
                  // size={80}
                // /> */}
                <FastImage
                  style={{
                    height: 30,
                    width: '100%',
                    position: 'absolute',
                    bottom: -40,
                    // backgroundColor:'rgba(0,255,0,0.1)',
                    // top: 20,
                  }}
                  resizeMode="contain"
                  source={require('../../../assets/grass.png')}
                />
                <AntDesign
                  name="closecircleo"
                  style={{
                    fontSize: 40,
                    color: '#333',
                    position: 'absolute',
                    top: -15,
                    right: -5,
                    // marginTop: 10,
                    backgroundColor: '#f1a722',
                    borderRadius: 50,
                  }}
                  onPress={() => setLangModal(false)}
                />

                <TouchableOpacity
                  onPress={() => {
                    setPaused(true);
                    setLangModal(false);
                    navigation.navigate('IntroVideoScreen', {
                      url: 'https://notevook.s3.ap-south-1.amazonaws.com/Odia+Login+Process.mp4',
                      // 'https://notevook.s3.ap-south-1.amazonaws.com/login+using+password+odia.mp4',
                      // url: 'https://notevook.s3.ap-south-1.amazonaws.com/Login+odia.mp4',
                      // url: 'https://notevook.s3.ap-south-1.amazonaws.com/Screenrecorder-2023-11-25-14-31-23-647.mp4',
                    });
                  }}
                  style={{
                    // flexDirection: 'row',
                    width: '90%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    borderRadius: 10,
                    borderColor: '#aaa',
                    backgroundColor: '#f1a722',
                    borderWidth: 1,
                    paddingVertical: 15,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      width: device_width * 0.7,
                      fontSize: 16,
                      color: '#333',
                      // marginTop: 5,
                      // marginLeft: 5,
                      fontWeight: '900',
                      textDecorationLine: 'underline',
                    }}>
                    {'ଓଡିଆରେ ଭିଡିଓ ଦେଖିବାକୁ ଏଠାରେ କ୍ଲିକ୍ କରନ୍ତୁ'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setPaused(true);
                    setLangModal(false);
                    navigation.navigate('IntroVideoScreen', {
                      url: 'https://notevook.s3.ap-south-1.amazonaws.com/ENG+Login+Process.mp4',
                      // 'https://notevook.s3.ap-south-1.amazonaws.com/login+using+password.mp4',
                      // url: 'https://notevook.s3.ap-south-1.amazonaws.com/login+process.mp4',
                      // url: 'https://notevook.s3.ap-south-1.amazonaws.com/Screenrecorder-2023-11-25-14-42-37-365.mp4',
                    });
                  }}
                  style={{
                    // flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    borderColor: '#aaa',
                    backgroundColor: '#f1a722',
                    width: '90%',
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingVertical: 15,
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      width: device_width * 0.7,
                      fontSize: 16,
                      color: '#333',
                      // marginTop: 5,
                      // marginLeft: 5,
                      fontWeight: '900',
                      textDecorationLine: 'underline',
                    }}>
                    {'Click here to watch video in English'}
                  </Text>
                </TouchableOpacity>
                {/* <View
              style={{
                // borderWidth: 1,
                paddingVertical: 15,
                alignItems: 'center',
                marginTop: 10,
                marginLeft: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                // borderColor: '#aaa',
                // borderRadius: 8,
                padding: 10,
              }}>
              <TouchableOpacity
                style={{
                  borderRadius: 10,
                  width: '40%',
                  marginVertical: 5,
                  // borderWidth: 1,
                  marginRight: 25,
                  borderColor: 'white',
                  backgroundColor: 'green',
                  paddingVertical: 15,
                  justifyContent: 'center',
                }}
                onPress={() => introVideoFunc()}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    alignItems: 'center',
                  }}>
                  {trans('OK')}
                </Text>
              </TouchableOpacity>
            </View> */}
              </View>
            </ImageBackground>
          </Modal>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.secondary,
  },
  header: {
    flex: 0.6,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    // paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
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
    borderBottomColor: Colors.secondary,
    paddingBottom: 5,
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
    // display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
