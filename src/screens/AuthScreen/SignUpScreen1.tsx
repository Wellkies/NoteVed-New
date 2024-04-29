import React, { useContext, useEffect, useState } from 'react';
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
import { useNavigation, useTheme } from '@react-navigation/native';
import { Modal, RadioButton } from 'react-native-paper';
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
import { device_height, device_width } from '../style';
import { Avatar, Chip } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AuthContext } from '../../../context';
import i18n from 'i18next';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
// import CommonModalUser from '../UserScreens/CommonModalUser';
import { ImageBackground } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useAppSelector } from '../../redux/store/reducerHook';
import { selectStudentLanguage } from '../../redux/reducers/languageReducer';
import { getStandard, selectStudentStandard } from '../../redux/reducers/StandardReducer';
import { getBoard, selectStudentBoard } from '../../redux/reducers/BoardReducer';
import { childPhoneVerifyAPI, selectVerifyPhInfo } from '../../redux/reducers/VerifyPhoneReducer';
import { RegisterNewChild } from '../../redux/actions/RegisterAPI';
const { t: trans } = i18n;

const SignUpScreen1 = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();

  const {
    phone = '',
    email = '',
    otplogin = false,
    emailLogin = '',
    pswdLogin = false,
  } = route.params;
  console.log(route.params, '==================route.params');

  // const selectedLanguage = useAppSelector(selectStudentLanguage)
  // console.log(selectedLanguage, "selectedLanguage**********")
  // const Standard = useAppSelector(selectStudentStandard);
  // const Board = useAppSelector(selectStudentBoard);
  const VerifyPhone = useAppSelector(selectVerifyPhInfo);
  console.log(VerifyPhone, "VerifyPhone**********")

  // const { message = '', newUser = '' } =
  //   Object.keys(VerifyPhone).length > 0 ? VerifyPhone : {};
  // // User already registered,
  // console.log(
  //   VerifyPhone.data,
  //   '===================VerifyPhone',
  //   // message,
  //   // '===message',
  //   // newUser,
  //   // '==newuser',
  // );
  const { signOut } = useContext(AuthContext);
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

  const [language, setLanguages] = useState('english')


  // const googleSignOut = async () => {
  //   // console.log('=======signout func called');
  //   try {
  //     GoogleSignin.configure();
  //     await GoogleSignin.signOut();
  //     // setState({ user: null }); // Remember to remove the user from your app's state as well
  //   } catch (error) {
  //     // console.error(error, '========signout error');
  //   }
  // };

  // const handleRadioChange = value => {
  //   if (value == 'Male') {
  //     setInfo({ ...info, gender: 'Male' });
  //   } else if (value == 'Female') {
  //     setInfo({ ...info, gender: 'Female' });
  //   } else {
  //     setInfo({ ...info, gender: 'others' });
  //   }
  //   setGenderError(false);
  //   setGender(value);
  //   // handleInputChange( "p_fname", f_name.trim())
  // };

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

  const { signIn } = React.useContext(AuthContext);
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

  // const updateSecureTextEntry = () => {
  //   setInfo({
  //     ...info,
  //     secureTextEntry: !info.secureTextEntry,
  //   });
  // };

  // const updateConfirmSecureTextEntry = () => {
  //   setInfo({
  //     ...info,
  //     confirmSecureTextEntry: !info.confirmSecureTextEntry,
  //   });
  // };

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
    }
    //  else if (inputName == 'mother_name') {
    //   if (!name_reg.test(inputValue)) {
    //     setMotherNameError(true);
    //   } else {
    //     setMotherNameError(false);
    //   }
    // }
    // else if (inputName == 'parents_phone') {
    //   if (inputValue != '') {
    //     if (phoneRegex.test(inputValue)) {
    //       setAltPhoneError(false);
    //     } else {
    //       setAltPhoneError(true);
    //     }
    //   } else {
    //     setAltPhoneError(false);
    //   }
    // } else if (inputName == 'school_name') {
    //   if (!name_reg.test(inputValue)) {
    //     setSchoolNameError(true);
    //   } else {
    //     setSchoolNameError(false);
    //   }
    // } else if (inputName == 'board_name') {
    //   // console.log(inputName, 'inputName.........');
    //   if (inputValue.length == '') {
    //     setBoardError(true);
    //   } else {
    //     ////console.log(present_zip.length, 'length');
    //     setBoardError(false);
    //   }

      // if (inputValue == 1) {
      // setLanguage('odia', dispatch);
      // i18n.changeLanguage(selectedLanguage);
      // setLanguages(prevState =>
      //   prevState.map(lang =>
      //     lang.code === 'odia'
      //       ? {...lang, isSelected: true}
      //       : {...lang, isSelected: false},
      //   ),
      // );
      // } else {
      //   setLanguage('english', dispatch);
      //   i18n.changeLanguage('english');
      //   setLanguages(prevState =>
      //     prevState.map(lang =>
      //       lang.code === 'english'
      //         ? {...lang, isSelected: true}
      //         : {...lang, isSelected: false},
      //     ),
      //   );
      // }
    // } else if (inputName == 'stage') {
    //   // console.log(inputName, 'inputName.........');
    //   if (inputValue.length == '') {
    //     setStandardError(true);
    //   } else {
    //     ////console.log(present_zip.length, 'length');
    //     setStandardError(false);
    //   }
    // } else if (inputName == 'st_age') {
    //   if (inputValue.length != '' || inputValue != undefined) {
    //     // if (inputValue >=20)
    //     setAgeError(false);
    //   } else {
    //     setAgeError(true);
    //   }
    // }
    else if (inputName == 'lname') {
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
    // else if (inputName == 'alt_phone') {
    //   if (inputValue != '') {
    //     if (phoneRegex.test(inputValue)) {
    //       setAltPhoneError(false);
    //     } else {
    //       setAltPhoneError(true);
    //     }
    //   } else {
    //     setAltPhoneError(false);
    //   }
    // }

    // else if (info.password && info.confirmPassword) {
    //   if (matchData.test(inputValue)) {
    //     setmismatchError(true);
    //   } else {
    //     setmismatchError(false);
    //   }
    // }
    // else if (inputName == 'password' || inputName == 'confirmPassword') {
    //   if (password.inputValue !== confirmPassword.inputValue) {
    //     setmismatchError(true);
    //   } else {
    //     setmismatchError(false);
    //   }
    // }

    // } else if (inputName == 'age') {
    //   if (inputValue.length >= 1) {
    //     setAgeError(false);
    //   } else {
    //     setAgeError(true);
    //   }
    // }
    let infodata = { ...info };
    setInfo({ ...infodata, [inputName]: inputValue });
  };

  const email_regex_validate = emailRegex.test(st_email);
  const phone_regex_validate = phoneRegex.test(st_phone);
  const phone_regex_without_91_validate = phoneRegexWithout91.test(st_phone);
  // console.log(email_regex_validate,"========email_regex_validate");

  // const submitForm = async () => {
  //   // console.log(st_age.value,"=============st_age");
  //   const validate =
  //     fname != '' &&
  //     st_phone != '' &&
  //     gender != '' &&
  //     father_name != '' &&
  //     // mother_name != '' &&
  //     board_name !== '' &&
  //     stage != '' &&
  //     school_name != '' &&
  //     st_age != '';
  //   const pswd_validate =
  //     otplogin == false && password != '' && confirmPassword != '';

  //   // info.p_pass == '';
  //   // info.gender == '';
  //   let fname_validate = false;
  //   let lname_validate = false;
  //   let phone_validate = false;
  //   let fathername_validate = false;
  //   // let mothername_validate = false;
  //   let email_validate = false;
  //   let schoolname_validate = false;
  //   // //console.log(phone_validate, 'phone_validate')

  //   if (info.st_phone || info.fname) {
  //     phone_validate = phoneRegex.test(info.st_phone);
  //     email_validate = emailRegex.test(info.st_email);
  //     fname_validate = name_reg.test(info.fname);
  //     lname_validate = name_reg.test(info.lname);
  //     fathername_validate = name_reg.test(info.father_name);
  //     schoolname_validate = name_reg.test(info.school_name);
  //     // mothername_validate = name_reg.test(info.mother_name);
  //   }
  //   if (
  //     phone == '' || pswdLogin == true
  //       ? validate == false && pswd_validate == false
  //       : validate == false
  //   ) {
  //     // if (email_validate == false) {
  //     //   setEmailError(true);
  //     // } else {
  //     //   setEmailError(false);
  //     // }
  //     if (info.st_phone == '' || phone_validate == false) {
  //       setPhoneerror(true);
  //     } else {
  //       setPhoneerror(false);
  //     }
  //     if (info.fname == '' || fname_validate == false) {
  //       setFnameError(true);
  //     } else {
  //       setFnameError(false);
  //     }
  //     if (info.school_name == '' || schoolname_validate == false) {
  //       setSchoolNameError(true);
  //     } else {
  //       setSchoolNameError(false);
  //     }

  //     // if (info.lname == '' || lname_validate == false) {
  //     //   setLnameError(true);
  //     // } else {
  //     //   setLnameError(false);
  //     // }
  //     if (info.gender == '') {
  //       setGenderError(true);
  //     } else {
  //       setGenderError(false);
  //     }
  //     if (info.father_name == '' || fathername_validate == false) {
  //       setFatherNameError(true);
  //     } else {
  //       setFatherNameError(false);
  //     }
  //     // if (info.mother_name == '' || mothername_validate == false) {
  //     //   setMotherNameError(true);
  //     // } else {
  //     //   setMotherNameError(false);
  //     // }
  //     if (otplogin == false && info.password == '') {
  //       setPasswordError(true);
  //     } else {
  //       setPasswordError(false);
  //     }
  //     if (otplogin == false && info.confirmPassword == '') {
  //       setConfirmPasswordError(true);
  //     } else {
  //       setConfirmPasswordError(false);
  //     }
  //     if (info.board_name == '') {
  //       setBoardError(true);
  //     } else {
  //       setBoardError(false);
  //     }
  //     if (info.stage == '') {
  //       setStandardError(true);
  //     } else {
  //       setStandardError(false);
  //     }
  //     if (info.st_age == '') {
  //       setAgeError(true);
  //     } else {
  //       setAgeError(false);
  //     }
  //     // if (info.phone_secondary == '' || phone_validate == false) {
  //     //   // //console.log(phone_validate, 'phone_validate');
  //     //   setPhoneError(true);
  //     // } else {
  //     //   setPhoneError(false);
  //   } else if (fnameError == true) {
  //     ToastAndroid.showWithGravityAndOffset(
  //       'Please enter your first name',
  //       ToastAndroid.LONG,
  //       ToastAndroid.BOTTOM,
  //       25,
  //       50,
  //     );
  //   } else if (lnameError == true) {
  //     ToastAndroid.showWithGravityAndOffset(
  //       'Please enter your last name',
  //       ToastAndroid.LONG,
  //       ToastAndroid.BOTTOM,
  //       25,
  //       50,
  //     );
  //     // } else if (phoneerror == true) {
  //     //   ToastAndroid.showWithGravityAndOffset(
  //     //     'Please enter valid phone number',
  //     //     ToastAndroid.LONG,
  //     //     ToastAndroid.BOTTOM,
  //     //     25,
  //     //     50,
  //     //   );
  //   } else if (fatherNameError == true) {
  //     ToastAndroid.showWithGravityAndOffset(
  //       `Please Enter Guardian's Name`,
  //       ToastAndroid.LONG,
  //       ToastAndroid.BOTTOM,
  //       25,
  //       50,
  //     );
  //   } else if (schoolNameError == true) {
  //     ToastAndroid.showWithGravityAndOffset(
  //       `Please Enter Student's School Name`,
  //       ToastAndroid.LONG,
  //       ToastAndroid.BOTTOM,
  //       25,
  //       50,
  //     );
  //   }
  //   // else if (motherNameError == true) {
  //   //   ToastAndroid.showWithGravityAndOffset(
  //   //     `Please Enter Mother's Name`,
  //   //     ToastAndroid.LONG,
  //   //     ToastAndroid.BOTTOM,
  //   //     25,
  //   //     50,
  //   //   );
  //   // }
  //   else if (passwordError == true) {
  //     ToastAndroid.showWithGravityAndOffset(
  //       `Please Enter Valid Password`,
  //       ToastAndroid.LONG,
  //       ToastAndroid.BOTTOM,
  //       25,
  //       50,
  //     );
  //   } else if (mismatchError == true) {
  //     ToastAndroid.showWithGravityAndOffset(
  //       `Password Didn't Matched`,
  //       ToastAndroid.LONG,
  //       ToastAndroid.BOTTOM,
  //       25,
  //       50,
  //     );
  //   } else if (confirmPasswordError == true) {
  //     ToastAndroid.showWithGravityAndOffset(
  //       `Please Enter Valid Password`,
  //       ToastAndroid.LONG,
  //       ToastAndroid.BOTTOM,
  //       25,
  //       50,
  //     );
  //   } else if (genderError == true) {
  //     ToastAndroid.showWithGravityAndOffset(
  //       `Please Enter Your Gender`,
  //       ToastAndroid.LONG,
  //       ToastAndroid.BOTTOM,
  //       25,
  //       50,
  //     );
  //   } else if (boardError == true) {
  //     ToastAndroid.showWithGravityAndOffset(
  //       `Please Enter Student's Board Name`,
  //       ToastAndroid.LONG,
  //       ToastAndroid.BOTTOM,
  //       25,
  //       50,
  //     );
  //   } else if (standardError == true) {
  //     ToastAndroid.showWithGravityAndOffset(
  //       `Please Enter Student's Standard Name`,
  //       ToastAndroid.LONG,
  //       ToastAndroid.BOTTOM,
  //       25,
  //       50,
  //     );
  //   } else if (ageError == true) {
  //     ToastAndroid.showWithGravityAndOffset(
  //       `Please Enter Student's Age`,
  //       ToastAndroid.LONG,
  //       ToastAndroid.BOTTOM,
  //       25,
  //       50,
  //     );
  //     // } else if (altPhoneError == true) {
  //     //   ToastAndroid.showWithGravityAndOffset(
  //     //     `Please Enter Valid Phone Number`,
  //     //     ToastAndroid.LONG,
  //     //     ToastAndroid.BOTTOM,
  //     //     25,
  //     //     50,
  //     //   );
  //   } else if (emailError == true) {
  //     ToastAndroid.showWithGravityAndOffset(
  //       'Please enter valid email id',
  //       ToastAndroid.LONG,
  //       ToastAndroid.BOTTOM,
  //       25,
  //       50,
  //     );
  //   } else if (refCodeError == true) {
  //     ToastAndroid.showWithGravityAndOffset(
  //       'Please enter valid referal code',
  //       ToastAndroid.LONG,
  //       ToastAndroid.BOTTOM,
  //       25,
  //       50,
  //     );
  //   } else {
  //     let confirmVal = handlePhoneNumber(info.st_phone);
  //     //console.log(confirmVal,'SignIn phone Screen');
  //     phone_validate = phoneRegex.test(confirmVal);
  //     if (phone_validate) {
  //       setshowprog(true);
  //       const schoolBoardName = Board.find(rec => rec.boardid == board_name);
  //       const ClassID = Standard.find(rec => rec.stageid == stage);
  //       const bodydata = {
  //         // email: info.st_email,
  //         // phone: confirmVal,
  //         // age: info.st_age,
  //         // referralcode: ref_Code,
  //         // fname: info.fname,
  //         // lname: info.lname,
  //         // language: selectedLanguage,

  //         email: info.st_email,
  //         phone: confirmVal,
  //         age: st_age.value,
  //         referralcode: ref_Code,
  //         fname: info.fname,
  //         lname: info.lname,
  //         language: selectedLanguage,
  //         stage: info.stage,
  //         stageid: ClassID != undefined ? ClassID.stageid : '',
  //         alterphone: parents_phone,
  //         password: password,
  //         schoolname: school_name,
  //         // schoolname: '',
  //         // address: info.st_address,
  //         address: '',
  //         gender: gender,
  //         image: '',
  //         imagename: '',
  //         boardname:
  //           schoolBoardName != undefined ? schoolBoardName.boardname : '',
  //         fathername: father_name,
  //         // mothername: mother_name,
  //         mothername: '',
  //         name: info.fname + ' ' + info.lname,
  //         isPremium: false,
  //         subscriptionStartDate: '',
  //         subscriptionEndDate: '',
  //         boardid: schoolBoardName != undefined ? schoolBoardName.boardid : '',
  //       };
  //       //   let uuu = await Apiconnect.postData_noauth('postdata/usersignup', inf);
  //       console.log(bodydata, '============RegisterNewChild bodydata');

  //       dispatch(RegisterNewChild(bodydata, handleCallBack));
  //     }
  //   }
  // };

  // const handleCallBack = (user, message, authtoken) => {
  //   if (user != undefined) signIn(user, authtoken);
  //   else if (message == 'User already registered') {
  //     // setInfoModal(true);
  //     CommonMessage(message);

  //     // CommonMessage("User already registered ! Please Signin instead")
  //   } else {
  //     if (message != '') {
  //       CommonMessage(message);
  //     }
  //   }
  //   // navigation.navigate('SignInScreen');
  // };

  // const navigationFunction = () => {
  //   setInfoModal(false);
  //   navigation.navigate('SignInScreen');
  // };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#263d2d'} barStyle="light-content" />
      <ImageBackground
        style={{
          // borderRadius: 50,
          // borderWidth: 1,
          width: device_width,
          height: device_height,
          // borderRadius: 25,
          flex: 1,
          alignSelf: 'center',
          backgroundColor: '#272727'
          // justifyContent: 'center',
          // alignItems: 'center',
        }}
        // resizeMode="cover"
        // source={require('../../../assets/0.png')}
        >
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
            style={{ paddingLeft: 10, position: 'absolute', left: 0 }}>
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
            style={{ top: 10 }}
            animation="fadeInLeft"
            duration={500}>
            <FastImage
              style={{
                height: device_height * 0.15,
                width: device_width * 0.28,
                marginLeft: -2,
                // borderWidth:1
              }}
              // source={require('../../../assets/aa.png')}
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
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
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
                            <Text style={{ fontWeight: '900', fontSize: 16 }}>
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
                            style={{ alignItems: 'flex-start' }}
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
                        {VerifyPhone != undefined && Object.keys(VerifyPhone).length !== 0 &&
                          phone_regex_without_91_validate == true &&
                          VerifyPhone.newUser == false &&
                          VerifyPhone.message ===
                          'User already registered' ? (
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
                              {/* {trans('User already registered !')} */}
                              {'User already registered !'}
                            </Text>
                          </Animatable.View>
                        ) : VerifyPhone != undefined && Object.keys(VerifyPhone).length !== 0 &&
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
                              {/* {trans('New user !')} */}
                              {'New user !'}
                            </Text>
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
                          st_phone != '' &&
                            fname != '' &&
                            phoneerror == false &&
                            VerifyPhone != undefined &&
                            Object.keys(VerifyPhone).length > 0 &&
                            VerifyPhone.message === 'User not registered' &&
                            fnameError ==false
                            ? false
                            : true
                        }
                        style={{
                          borderRadius: 10,
                          width: '30%',
                          marginVertical: 5,
                          backgroundColor:
                            st_phone != '' &&
                              fname != '' &&
                              phoneerror == false &&
                              VerifyPhone != undefined &&
                              Object.keys(VerifyPhone).length > 0 &&
                              VerifyPhone.message === 'User not registered' &&
                              fnameError ==false
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
                          });
                          // setInputModal1(false);
                          // setInputModal2(true);
                        }}>
                        <Text
                          style={{
                            color:
                              st_phone != '' &&
                                fname != '' &&
                                phoneerror == false &&
                                VerifyPhone != undefined &&
                                Object.keys(VerifyPhone).length > 0 &&
                                VerifyPhone.message === 'User not registered' &&
                                fnameError ==false
                                ? 'white'
                                : '#666',
                            fontSize: 13,
                            fontWeight: '600',
                            textAlign: 'center',
                            alignItems: 'center',
                          }}>
                          {/* {trans('Next')} */}
                          {'Next'}
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
                <Text style={{color: Colors.red, marginBottom: 10}}>
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
