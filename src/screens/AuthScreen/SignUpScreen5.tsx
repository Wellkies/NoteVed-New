import React, {useContext, useEffect, useState} from 'react';
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
  ImageBackground,
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
import Colors from '../../../assets/Colors';
import CommonMessage from '../../../constants/CommonMessage';
import {
  ageRegex,
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
// import {setLanguage} from '../../redux/actions/Action';
import i18n from 'i18next';
import {Dropdown} from 'react-native-element-dropdown';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
// import CommonModalUser from '../UserScreens/CommonModalUser';
import FastImage from 'react-native-fast-image';
import {
  selectStudentLanguage,
  setLanguage,
} from '../../redux/reducers/languageReducer';
import {useAppSelector} from '../../redux/store/reducerHook';
import {
  RegisterNewChild,
  RegisterNewGmailChild,
} from '../../redux/actions/RegisterAPI';
import {login} from '../../redux/reducers/loginReducer';
import AsyncStorage from '../../utils/AsyncStorage';
import {
  getState,
  selectStudentState,
} from '../../redux/reducers/GetAllStateReducer';
const {t: trans} = i18n;

const SignUpScreen5 = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const {
    fname = '',
    lname = '',
    st_phone = '',
    // st_age = '',
    gender = '',
    st_email = '',
    alt_phone = '',
    father_name = '',
    parents_phone = '',
    password = '',
    confirmPassword = '',
    phone = '',
    email = '',
    otplogin = false,
    emailLogin = '',
    pswdLogin = false,
    isFromGoogleSignIn = false,
    Googleemail = '',
  } = route.params;

  console.log(route.params, '==================route.params');

  const selectedLanguage = useAppSelector(selectStudentLanguage);
  console.log(selectedLanguage, 'selectedLanguage**********');

  const {signOut} = useContext(AuthContext);
  const [language, setLanguages] = useState([
    // {name: 'हिंदी', code: 'hi', isSelected: selectedLanguage === 'hindi'},
    {name: 'ଓଡିଆ', code: 'odia', isSelected: selectedLanguage === 'odia'},
    {
      name: 'English',
      code: 'english',
      isSelected: selectedLanguage === 'english',
    },
  ]);

  const googleSignOut = async () => {
    try {
      GoogleSignin.configure();
      await GoogleSignin.signOut();
      // setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      // console.error(error, '========signout error');
    }
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', () => {
        goBackFunction();
      });
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        goBackFunction();
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
    dispatch(getState());
  }, []);

  const {signIn} = React.useContext(AuthContext);

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
    academyYear: '',
    st_age: '',
    stateData: '',
    // stateID: '',
    school_name: '',
    board_name: 1,
    boardid: '',
    stage: 5,
    stageid: '',
    st_address: '',
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
  });
  const [dob, setDob] = useState('');
  const {
    st_age,
    stateData,
    //stateID,
    ref_Code,
    // acdmy_year,
    id,
    username,
    secureTextEntry,
    confirmSecureTextEntry,
  } = info;
  const [agevalue, setAgeValue] = useState('');
  const [yearvalue, setyearValue] = useState('');
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
  const [academyYearError, setacademyYearError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [standardError, setStandardError] = useState(false);
  const [boardError, setBoardError] = useState(false);
  const [altPhoneError, setAltPhoneError] = useState(false);
  const [schoolNameError, setSchoolNameError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [statevalue, setStateValue] = useState('');
  const [stateError, setStateError] = useState(false);

  const updateSecureTextEntry = () => {
    setInfo({
      ...info,
      secureTextEntry: !info.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setInfo({
      ...info,
      confirmSecureTextEntry: !info.confirmSecureTextEntry,
    });
  };
  const [ages, setAge] = useState('');

  const handleInputChange = (inputName: string, inputValue: string) => {
    if (inputName == 'st_phone') {
      // if (phoneRegex.test(inputValue)) {
      if (phoneRegexWithout91.test(inputValue)) {
        setPhoneerror(false);
        //dispatch(childPhoneVerifyAPI(inputValue));
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
    } else if (inputName == 'parents_phone') {
      if (inputValue != '') {
        if (phoneRegex.test(inputValue)) {
          setAltPhoneError(false);
        } else {
          setAltPhoneError(true);
        }
      } else {
        setAltPhoneError(false);
      }
    } else if (inputName == 'school_name') {
      if (!name_reg.test(inputValue)) {
        setSchoolNameError(true);
      } else {
        setSchoolNameError(false);
      }
    } else if (inputName == 'board_name') {
      // console.log(inputName, 'inputName.........');
      if (inputValue.length == '') {
        setBoardError(true);
      } else {
        ////console.log(present_zip.length, 'length');
        setBoardError(false);
      }

      if (inputValue == 1) {
        setLanguage('odia', dispatch);
        i18n.changeLanguage('odia');
        setLanguages(prevState =>
          prevState.map(lang =>
            lang.code === 'odia'
              ? {...lang, isSelected: true}
              : {...lang, isSelected: false},
          ),
        );
      } else {
        setLanguage('english', dispatch);
        i18n.changeLanguage('english');
        setLanguages(prevState =>
          prevState.map(lang =>
            lang.code === 'english'
              ? {...lang, isSelected: true}
              : {...lang, isSelected: false},
          ),
        );
      }
    } else if (inputName == 'st_age') {
      console.log(inputValue, '@AGEinputValue');

      if (ageRegex.test(inputValue)) {
        setAgeError(false);
      } else {
        setAgeError(true);
      }
    } else if (inputName == 'stateData') {
      console.log(inputValue.value, 'inputValue.value');

      if (inputValue.value !== 'Odisha1712675266782') {
        console.log('11111111111111111111111');
        // i18n.changeLanguage('english');
        // dispatch(setLanguage('english'));
      }
      // else if(inputValue.value=='Odisha1712675266782')
      // {
      //  console.log("222222222222222222222")
      //   i18n.changeLanguage(languages.length>0?languages: selectedLang)
      //   dispatch(setLanguage(languages.length>0?languages: selectedLang));

      // }
      else {
      }
      if (inputValue.length != '' || inputValue != undefined) {
        setStateError(false);
      } else {
        setStateError(true);
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
  // console.log(email_regex_validate,"========email_regex_validate");

  const submitForm = async () => {
    console.log(st_age, '=============st_age', '======submitForm called');
    const validate =
      fname != '' && st_phone != '' && gender != '' && st_age != '';
    const pswd_validate =
      otplogin == false && password != '' && confirmPassword != '';

    let fname_validate = false;
    let lname_validate = false;
    let phone_validate = false;
    let fathername_validate = false;
    let email_validate = false;
    let schoolname_validate = false;
    console.log(phone_validate, 'phone_validate-------------', st_phone, fname);

    if (st_phone || fname) {
      phone_validate = phoneRegex.test(st_phone);
      email_validate = emailRegex.test(st_email);
      fname_validate = name_reg.test(fname);
      lname_validate = name_reg.test(lname);
      // mothername_validate = name_reg.test(info.mother_name);
      console.log(phone_validate, '==============phone_validate');
    }
    if (
      phone == '' || pswdLogin == true
        ? validate == false && pswd_validate == false
        : validate == false
    ) {
      if (st_phone == '' || phone_validate == false) {
        setPhoneerror(true);
      } else {
        setPhoneerror(false);
      }
      if (fname == '' || fname_validate == false) {
        setFnameError(true);
      } else {
        setFnameError(false);
      }
      if (gender == '') {
        setGenderError(true);
      } else {
        setGenderError(false);
      }
      if (otplogin == false && info.password == '') {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
      if (otplogin == false && info.confirmPassword == '') {
        setConfirmPasswordError(true);
      } else {
        setConfirmPasswordError(false);
      }
      if (st_age == '' || st_age == '0') {
        setAgeError(true);
      } else {
        setAgeError(false);
      }
    } else if (fnameError == true) {
      ToastAndroid.showWithGravityAndOffset(
        'Please enter your first name',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (lnameError == true) {
      ToastAndroid.showWithGravityAndOffset(
        'Please enter your last name',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (fatherNameError == true) {
      ToastAndroid.showWithGravityAndOffset(
        `Please Enter Guardian's Name`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (schoolNameError == true) {
      ToastAndroid.showWithGravityAndOffset(
        `Please Enter Student's School Name`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (passwordError == true) {
      ToastAndroid.showWithGravityAndOffset(
        `Please Enter Valid Password`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (mismatchError == true) {
      ToastAndroid.showWithGravityAndOffset(
        `Password Didn't Matched`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (confirmPasswordError == true) {
      ToastAndroid.showWithGravityAndOffset(
        `Please Enter Valid Password`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (genderError == true) {
      ToastAndroid.showWithGravityAndOffset(
        `Please Enter Your Gender`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (boardError == true) {
      ToastAndroid.showWithGravityAndOffset(
        `Please Enter Student's Board Name`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (standardError == true) {
      ToastAndroid.showWithGravityAndOffset(
        `Please Enter Student's Standard Name`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (ageError == true) {
      ToastAndroid.showWithGravityAndOffset(
        `Please Enter Student's Age`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (emailError == true) {
      ToastAndroid.showWithGravityAndOffset(
        'Please enter valid email id',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (refCodeError == true) {
      ToastAndroid.showWithGravityAndOffset(
        'Please enter valid referal code',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      let confirmVal = handlePhoneNumber(st_phone);
      // console.log(confirmVal, 'SignIn phone Screen', phone_validate);
      phone_validate = phoneRegex.test(confirmVal);
      if (phone_validate) {
        setshowprog(true);
        const bodydata = {
          fname: fname,
          lname: lname,
          email: isFromGoogleSignIn ? Googleemail : st_email,
          phone: confirmVal,
          alterphone: alt_phone,
          age: st_age,
          statename: stateData.label,
          stateid: stateData.value,
          password: password,
          gender: gender,
          image: '',
          imagename: '',
          name: fname + ' ' + lname,
          status: '',
          isPremium: false,
          subscriptionStartDate: '',
          subscriptionEndDate: '',
        };
        console.log(bodydata, '============RegisterNewChild bodydata');
        RegisterNewChild(bodydata, handleCallBack);
      }
    }
    if (isFromGoogleSignIn) {
      const bodydata = {
        fname: fname,
        lname: lname,
        email: isFromGoogleSignIn ? Googleemail : st_email,
        phone: '',
        alterphone: alt_phone,
        age: st_age,
        statename: stateData.label,
        stateid: stateData.value,
        password: password,
        gender: gender,
        image: '',
        imagename: '',
        name: fname + ' ' + lname,
        status: '',
        isPremium: false,
        subscriptionStartDate: '',
        subscriptionEndDate: '',
      };
      console.log(bodydata, '============RegisterNewChild bodydata');

      RegisterNewGmailChild(bodydata, handleCallBack);
    }
  };
  const handleCallBack = (
    user: any,
    message: string,
    authtoken: string,
    data: any,
  ) => {
    console.log(user, authtoken, 'user==============================');

    if (user != undefined) {
      signIn(user, authtoken);
      dispatch(login(data));
      // dispatch(clearChildProgressData())
      const tokenstore = AsyncStorage.storeObject('@auth_Token', authtoken);
      const userdata = AsyncStorage.storeObject('@user', user);
    } else if (message == 'User already registered') {
      // setInfoModal(true);
      CommonMessage(message);

      // CommonMessage("User already registered ! Please Signin instead")
    } else {
      if (message != '') {
        CommonMessage(message);
      }
    }
  };

  const navigationFunction = () => {
    navigation.navigate('SignInScreen');
  };
  const stateValue = useAppSelector(selectStudentState);
  console.log(stateValue, '@stateValue');

  const stateDataDropDown = stateValue.map(state => ({
    label: state.statename,
    value: state.stateid,
  }));
  const data = [
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
    {
      label: '16',
      value: '16',
    },
    {
      label: '17',
      value: '17',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#272727'} barStyle="light-content" />
      <ImageBackground
        style={{
          width: device_width,
          height: device_height,
          flex: 1,
          alignSelf: 'center',
          //backgroundColor: '#272727',
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
            {/* {trans(`New Account`)} */}
            {`New Account`}
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          <Animatable.View
            animation="fadeInUpBig"
            style={{
              flex: 1,
              // backgroundColor: Colors.secondary,
              // borderTopLeftRadius: 30,
              // borderTopRightRadius: 30,
              paddingHorizontal: 20,
              // paddingVertical: 10,
              // marginVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                // borderWidth:1,
                width: device_width * 0.96,
                alignSelf: 'center',
              }}>
              <Animatable.View
                // style={{position:'absolute', left:0, top:0}}
                animation="fadeInLeft"
                duration={500}>
                <FastImage
                  style={{
                    height: device_height * 0.15,
                    width: device_width * 0.6,
                    marginLeft: -30,
                  }}
                  // source={require('../../../assets/hh.png')}
                  // resizeMode="contain"
                />
              </Animatable.View>
              <Animatable.View
                style={{
                  width: device_width * 0.3,
                  // marginRight:5,
                  // borderWidth: 1,
                  zIndex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}
                animation="fadeInRight"
                duration={500}>
                <FastImage
                  style={{
                    height: device_height * 0.12,
                    width: device_width * 0.3,
                    // borderWidth: 1,
                    // marginLeft: -30,
                  }}
                  // source={require('../../../assets/i.png')}
                  // resizeMode="contain"
                />
              </Animatable.View>
            </View>
            <View
              style={{
                // backgroundColor: '#000',
                marginTop: -20,
                zIndex: -1,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <View
                  style={{
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: '#999',
                    minHeight: device_height * 0.75,
                    minWidth: device_width * 0.9,
                    paddingHorizontal: 20,
                    // marginHorizontal:10,
                    backgroundColor: 'rgba(0,255,0,0.12)',
                    //   backgroundColor: '#fff',
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
                            //   borderWidth: 1,
                            borderColor: '#ccc',
                            elevation: 10,
                            width: device_width * 0.9,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                            backgroundColor: '#2c581f',
                            marginLeft: -20,
                            marginRight: -30,
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              width: device_width * 0.7,
                              fontSize: 15,
                              color: '#fff',
                              marginTop: 5,
                              // marginLeft: 5,
                              fontWeight: '700',
                            }}>
                            {/* {trans('Complete Your Registration ')} */}
                            {'Complete Your Registration '}
                            <Text style={{fontWeight: '900', fontSize: 16}}>
                              {/* {trans('5/5')} */}
                              {'4/4'}
                            </Text>
                          </Text>
                        </View>
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
                            paddingLeft: 15,
                            alignItems: 'center',
                            borderWidth:
                              st_age == '' ? 1 : ageError == true ? 1 : 0,
                            borderColor:
                              st_age == ''
                                ? 'darkorange'
                                : ageError == true
                                ? Colors.red
                                : '#fff',
                            pointerEvents: 'auto',
                          }}>
                          <MaterialCommunityIcons
                            name="face-recognition"
                            color={'#263d2d'}
                            size={20}
                          />
                          <TextInput
                            placeholder="Enter your age"
                            placeholderTextColor="#333"
                            value={st_age}
                            keyboardType="numeric"
                            onChangeText={val =>
                              handleInputChange('st_age', val.toString())
                            }
                            onFocus={() => setAge(agevalue)}
                            style={{
                              color: '#000',
                              flex: 1,
                              marginLeft: 10,
                            }}
                          />
                        </View>
                        {st_age == '' ? (
                          <Animatable.View
                            animation="fadeInLeft"
                            duration={500}>
                            <Text
                              style={{color: 'darkorange', marginBottom: 10}}>
                              {"Please Enter Student's Age"}
                            </Text>
                          </Animatable.View>
                        ) : ageError ? (
                          <Animatable.View
                            animation="fadeInLeft"
                            duration={500}>
                            <Text style={{color: Colors.red, marginBottom: 10}}>
                              {/* {"Please Enter Valid Student's Age"} */}
                              {
                                "Please Enter Valid Student's Age. Age must be 13 or older."
                              }
                            </Text>
                          </Animatable.View>
                        ) : (
                          <></>
                        )}
                        <View
                          style={{
                            flexDirection: 'row',
                            // marginTop: 5,
                            borderBottomWidth: 1,
                            borderBottomColor: '#f2f2f2',
                            // paddingBottom: 5,
                            marginVertical: 10,
                            backgroundColor: '#fff',
                            elevation: 10,
                            borderRadius: 8,
                            height: 50,
                            paddingLeft: 15,
                            // marginTop: Platform.OS === 'ios' ? 0 : 10,
                            alignItems: 'center',
                            borderWidth:
                              stateData == '' ? 1 : stateError == true ? 1 : 0,
                            borderColor:
                              stateData == ''
                                ? 'red'
                                : stateError == true
                                ? 'red'
                                : '#fff',
                          }}>
                          <MaterialCommunityIcons
                            name="home-city"
                            color={'#263d2d'}
                            size={20}
                          />
                          <Dropdown
                            style={[styles.dropdown, {width: '90%'}]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            iconStyle={styles.iconStyle}
                            itemTextStyle={{color: '#333'}}
                            itemContainerStyle={{
                              borderBottomWidth: 0.5,
                              borderBottomColor: '#999',
                            }}
                            data={stateDataDropDown}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select your state'}
                            searchPlaceholder={'Select your state'}
                            value={stateData}
                            setValue={statevalue}
                            onChange={value =>
                              handleInputChange('stateData', value)
                            }
                            onFocus={() => {
                              setStateValue(statevalue);
                            }}
                          />
                        </View>
                        {stateData == '' ? (
                          <Animatable.View
                            animation="fadeInLeft"
                            duration={500}>
                            <Text
                              style={{color: 'darkorange', marginBottom: 10}}>
                              {trans('Please Enter State Name')}
                            </Text>
                          </Animatable.View>
                        ) : stateError ? (
                          <Animatable.View
                            animation="fadeInLeft"
                            duration={500}>
                            <Text
                              style={{color: 'darkorange', marginBottom: 10}}>
                              {trans('Please Enter State Name')}
                            </Text>
                          </Animatable.View>
                        ) : (
                          <></>
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
                          st_age != '' && st_age !== null && !ageError
                            ? // acdmy_year != '' &&
                              // acdmy_year !== null
                              false
                            : true
                        }
                        style={{
                          borderRadius: 10,
                          width: '50%',
                          marginVertical: 5,
                          backgroundColor:
                            st_age != '' &&
                            st_age !== null &&
                            st_age != '0' &&
                            !ageError
                              ? '#a3b448'
                              : '#ccc',
                          marginHorizontal: 20,
                          paddingVertical: 10,
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          submitForm();
                          // setInputModal5(false);
                          // setInputModal6(true);
                        }}>
                        <Text
                          style={{
                            color:
                              st_age != '' && st_age !== null && !ageError
                                ? // acdmy_year != '' &&
                                  // acdmy_year !== null
                                  '#333'
                                : '#666',
                            fontSize: 13,
                            fontWeight: '600',
                            textAlign: 'center',
                            alignItems: 'center',
                          }}>
                          {/* {trans('Submit')} */}
                          {'Submit'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {/* <View style={[styles.button, {}]}> */}
            {/* <Text
              style={[
                styles.text_footer,
                {
                  color: '#666',
                  fontWeight: 'bold',
                  // textAlign: 'left',
                  alignSelf: 'flex-start',
                },
              ]}>
              Have Referral Code ?
            </Text>

            <View
              style={[
                styles.action,
                {
                  marginBottom: 20,
                  borderBottomColor: '#fff',
                  paddingVertical: 10,
                },
              ]}>
              {/* <FontAwesome name="user-o" color={'#333'} size={20} /> 
              <TextInput
                placeholder="Enter code"
                placeholderTextColor="#999"
                value={ref_Code}
                style={{
                  color: '#999',
                  flex: 1,
                  marginTop: Platform.OS === 'ios' ? 0 : -12,
                  paddingLeft: 10,
                  // color: '#05375a',
                  backgroundColor: '#fff',
                  elevation: 10,
                  borderRadius: 15,
                  height: 50,
                  fontSize: 18,
                  fontWeight: '600',
                }}
                autoCapitalize="none"
                // onChangeText={(val) => textInputChange(val)}
                // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                onChangeText={val => handleInputChange('ref_Code', val)}
              />
            </View>

            {refCodeError && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{color: 'darkorange', marginBottom: 10}}>
                  Please enter valid referal code
                </Text>
              </Animatable.View>
            )} */}
            {/* </View> */}
          </Animatable.View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default SignUpScreen5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.secondary,
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
