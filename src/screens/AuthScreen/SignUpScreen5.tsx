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
import { useNavigation, useTheme } from '@react-navigation/native';
import { Modal, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { LOGIN_URL } from '../../../constants/ApiPaths';
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

// import {
//   ParentRegister,
//   RegisterNewChild,
//   childPhoneVerifyAPI,
//   getBoard,
//   getStandard,
// } from '../../redux/actions/Action';
import { AuthContext } from '../../../context';
// import {setLanguage} from '../../redux/actions/Action';
import i18n from 'i18next';
import { Dropdown } from 'react-native-element-dropdown';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
// import CommonModalUser from '../UserScreens/CommonModalUser';
import FastImage from 'react-native-fast-image';
import { getStandard, selectStudentStandard } from '../../redux/reducers/StandardReducer';
import { getBoard, selectStudentBoard } from '../../redux/reducers/BoardReducer';
import { childPhoneVerifyAPI, selectVerifyPhInfo } from '../../redux/reducers/VerifyPhoneReducer';
import { selectStudentLanguage, setLanguage } from '../../redux/reducers/languageReducer';
import { useAppSelector } from '../../redux/store/reducerHook';
import { RegisterNewChild } from '../../redux/actions/RegisterAPI';
import { login } from '../../redux/reducers/loginReducer';
import AsyncStorage from '../../utils/AsyncStorage';
const { t: trans } = i18n;

var Spinner = require('react-native-spinkit');

const SignUpScreen5 = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const {
    fname = '',
    lname = '',
    st_phone = '',
    st_age = '',
    gender = '',
    st_email = '',
    father_name = '',
    parents_phone = '',
    password = '',
    confirmPassword = '',
    phone = '',
    email = '',
    otplogin = false,
    emailLogin = '',
    pswdLogin = false,
  } = route.params;

  console.log(route.params, '==================route.params');

  const selectedLanguage = useAppSelector(selectStudentLanguage)
  console.log(selectedLanguage, "selectedLanguage**********")
  const Standard = useAppSelector(selectStudentStandard);
  const Board = useAppSelector(selectStudentBoard);
  const VerifyPhone = useAppSelector(selectVerifyPhInfo);
  console.log(VerifyPhone, "VerifyPhone**********")

  const { signOut } = useContext(AuthContext);
  // console.log(
  //   Standard,
  //   'Standard.................',
  //   Board,
  //   'Board..............',
  // );
  const [language, setLanguages] = useState([
    // {name: 'हिंदी', code: 'hi', isSelected: selectedLanguage === 'hindi'},
    { name: 'ଓଡିଆ', code: 'odia', isSelected: selectedLanguage === 'odia' },
    {
      name: 'English',
      code: 'english',
      isSelected: selectedLanguage === 'english',
    },
    // {name: 'हिंदी', code: 'hindi', isSelected: selectedLanguage === 'hindi'},

    // {name: 'বাঙ্গালি', code: 'bn', isSelected: selectedLanguage === 'bn'},
  ]);
  // console.log(isSelected,"isSelected.....")

  const googleSignOut = async () => {
    // console.log('=======signout func called');

    try {
      GoogleSignin.configure();
      await GoogleSignin.signOut();
      // setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      // console.error(error, '========signout error');
    }
  };

  const handleRadioChange = value => {
    if (value == 'Male') {
      setInfo({ ...info, gender: 'Male' });
    } else if (value == 'Female') {
      setInfo({ ...info, gender: 'Female' });
    } else {
      setInfo({ ...info, gender: 'others' });
    }
    setGenderError(false);
    setGender(value);
    // handleInputChange( "p_fname", f_name.trim())
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      setInputModal1(true);
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
      setInputModal1(true);
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
    dispatch(getBoard());
    dispatch(getStandard());
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
  const [inputModal1, setInputModal1] = useState(false);
  const [inputModal2, setInputModal2] = useState(false);
  const [inputModal3, setInputModal3] = useState(false);
  const [inputModal4, setInputModal4] = useState(false);
  const [inputModal5, setInputModal5] = useState(false);
  const [inputModal6, setInputModal6] = useState(false);
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
    // fname,
    // lname,
    // st_phone,
    // st_email,
    father_phone,
    // gender,
    // father_name,
    mother_name,
    // parents_phone,
    // st_age,
    school_name,
    board_name,
    boardid,
    stage,
    stageid,
    st_address,
    ref_Code,
    id,
    username,
    p_height_feet,
    p_height_inch,
    p_weight,
    // password,
    // confirmPassword,
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
    else if (inputName == 'parents_phone') {
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
              ? { ...lang, isSelected: true }
              : { ...lang, isSelected: false },
          ),
        );
      } else {
        setLanguage('english', dispatch);
        i18n.changeLanguage('english');
        setLanguages(prevState =>
          prevState.map(lang =>
            lang.code === 'english'
              ? { ...lang, isSelected: true }
              : { ...lang, isSelected: false },
          ),
        );
      }
    } else if (inputName == 'stage') {
      // console.log(inputName, 'inputName.........');
      if (inputValue.length == '') {
        setStandardError(true);
      } else {
        ////console.log(present_zip.length, 'length');
        setStandardError(false);
      }
    } else if (inputName == 'st_age') {
      if (inputValue.length != '' || inputValue != undefined) {
        // if (inputValue >=20)
        setAgeError(false);
      } else {
        setAgeError(true);
      }
    }
    //  else if (inputName == 'st_age') {
    //   if (inputValue > 0 && inputValue <= 20) {
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

  const submitForm = async () => {
    console.log(st_age.value, "=============st_age", "======submitForm called");
    const validate =
      fname != '' &&
      st_phone != '' &&
      gender != '' &&
      father_name != '' &&
      // mother_name != '' &&
      board_name !== null && board_name !== undefined && 
      stage !== null && stage !== undefined &&
      school_name != '' &&
      st_age != '';
    const pswd_validate =
      otplogin == false && password != '' && confirmPassword != '';

    // info.p_pass == '';
    // info.gender == '';
    let fname_validate = false;
    let lname_validate = false;
    let phone_validate = false;
    let fathername_validate = false;
    // let mothername_validate = false;
    let email_validate = false;
    let schoolname_validate = false;
    console.log(phone_validate, 'phone_validate-------------', st_phone, fname)

    if (st_phone || fname) {
      phone_validate = phoneRegex.test(st_phone);
      email_validate = emailRegex.test(st_email);
      fname_validate = name_reg.test(fname);
      lname_validate = name_reg.test(lname);
      fathername_validate = name_reg.test(father_name);
      schoolname_validate = name_reg.test(school_name);
      // mothername_validate = name_reg.test(info.mother_name);
      console.log(phone_validate,"==============phone_validate");
    }
    if (
      phone == '' || pswdLogin == true
        ? validate == false && pswd_validate == false
        : validate == false
    ) {
      // if (email_validate == false) {
      //   setEmailError(true);
      // } else {
      //   setEmailError(false);
      // }
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
      if (school_name == '' || schoolname_validate == false) {
        setSchoolNameError(true);
      } else {
        setSchoolNameError(false);
      }

      // if (info.lname == '' || lname_validate == false) {
      //   setLnameError(true);
      // } else {
      //   setLnameError(false);
      // }
      if (gender == '') {
        setGenderError(true);
      } else {
        setGenderError(false);
      }
      if (father_name == '' || fathername_validate == false) {
        setFatherNameError(true);
      } else {
        setFatherNameError(false);
      }
      // if (mother_name == '' || mothername_validate == false) {
      //   setMotherNameError(true);
      // } else {
      //   setMotherNameError(false);
      // }
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
      if (board_name == null || board_name == undefined) {
        setBoardError(true);
      } else {
        setBoardError(false);
      }
      if (stage == null || stage == undefined) {
        setStandardError(true);
      } else {
        setStandardError(false);
      }
      if (st_age == '') {
        setAgeError(true);
      } else {
        setAgeError(false);
      }
      // if (info.phone_secondary == '' || phone_validate == false) {
      //   // //console.log(phone_validate, 'phone_validate');
      //   setPhoneError(true);
      // } else {
      //   setPhoneError(false);
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
      // } else if (phoneerror == true) {
      //   ToastAndroid.showWithGravityAndOffset(
      //     'Please enter valid phone number',
      //     ToastAndroid.LONG,
      //     ToastAndroid.BOTTOM,
      //     25,
      //     50,
      //   );
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
    }
    // else if (motherNameError == true) {
    //   ToastAndroid.showWithGravityAndOffset(
    //     `Please Enter Mother's Name`,
    //     ToastAndroid.LONG,
    //     ToastAndroid.BOTTOM,
    //     25,
    //     50,
    //   );
    // }
    else if (passwordError == true) {
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
      // } else if (altPhoneError == true) {
      //   ToastAndroid.showWithGravityAndOffset(
      //     `Please Enter Valid Phone Number`,
      //     ToastAndroid.LONG,
      //     ToastAndroid.BOTTOM,
      //     25,
      //     50,
      //   );
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
      console.log(confirmVal,'SignIn phone Screen', phone_validate);
      phone_validate = phoneRegex.test(confirmVal);
      if (phone_validate) {
        setshowprog(true);
        const schoolBoardName = Board.find(rec => rec.boardid == board_name);
        const ClassID = Standard.find(rec => rec.stageid == stage);
        const bodydata = {
          email: st_email,
          phone: confirmVal,
          age: st_age.value,
          referralcode: ref_Code,
          fname: fname,
          lname: lname,
          language: selectedLanguage,
          stage: stage,
          stageid: ClassID != undefined ? ClassID.stageid : '',
          alterphone: parents_phone,
          password: password,
          schoolname: school_name,
          // schoolname: '',
          // address: st_address,
          address: '',
          gender: gender,
          image: '',
          imagename: '',
          boardname:
            schoolBoardName != undefined ? schoolBoardName.boardname : '',
          fathername: father_name,
          // mothername: mother_name,
          mothername: '',
          name: fname + ' ' + lname,
          isPremium: false,
          subscriptionStartDate: '',
          subscriptionEndDate: '',
          boardid: schoolBoardName != undefined ? schoolBoardName.boardid : '',
        };
        //   let uuu = await Apiconnect.postData_noauth('postdata/usersignup', inf);
        console.log(bodydata, '============RegisterNewChild bodydata');

        RegisterNewChild(bodydata, handleCallBack);
      }
    }
  };
  const handleCallBack = (user: any, message: string, authtoken: string,data:any) => {
    console.log(user, authtoken,"user==============================");
    
    if (user != undefined) {
      signIn(user, authtoken);
      dispatch(login(data))
       const tokenstore = AsyncStorage.storeObject("@auth_Token", authtoken)
    const userdata = AsyncStorage.storeObject("@user", user)

    }
    else if (message == 'User already registered') {
      // setInfoModal(true);
      CommonMessage(message);

      // CommonMessage("User already registered ! Please Signin instead")
    } else {
      if (message != '') {
        CommonMessage(message);
      }
    }
    // navigation.navigate('SignInScreen');
  };
  const navigationFunction = () => {
    setInfoModal(false);
    navigation.navigate('SignInScreen');
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#263d2d'} barStyle="light-content" />
      <ImageBackground
        style={{
          width: device_width,
          height: device_height,
          flex: 1,
          alignSelf: 'center',
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
                alignSelf: 'center'
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
                  source={require('../../../assets/hh.png')}
                  resizeMode="contain"
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
                  source={require('../../../assets/i.png')}
                  resizeMode="contain"
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
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
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
                            {trans('Complete Your Registration ')}
                            <Text style={{ fontWeight: '900', fontSize: 16 }}>
                              {trans('5/5')}
                            </Text>
                          </Text>
                        </View>
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
                            // marginTop: Platform.OS === 'ios' ? 0 : 5,
                            alignItems: 'center',
                            borderWidth:
                              school_name == ''
                                ? 1
                                : schoolNameError == true
                                  ? 1
                                  : 0,
                            borderColor:
                              school_name == ''
                                ? 'darkorange'
                                : schoolNameError == true
                                  ? 'darkorange'
                                  : '#fff',
                          }}>
                          <FontAwesome5
                            name="school"
                            color={'#263d2d'}
                            size={20}
                          />
                          <TextInput
                            placeholder={trans(`Student's School Name`)}
                            placeholderTextColor="#666666"
                            value={school_name}
                            style={{
                              color: '#333',
                              flex: 1,
                              paddingLeft: 10,
                              fontSize: 15,
                              fontWeight: '600',
                            }}
                            autoCapitalize="none"
                            // onChangeText={(val) => textInputChange(val)}
                            // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                            onChangeText={val =>
                              handleInputChange('school_name', val)
                            }
                          />
                        </View>
                        {school_name == '' ? (
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
                              {trans('Please enter school name')}
                            </Text>
                          </Animatable.View>
                        ) : schoolNameError ? (
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
                              {trans('Please enter school name')}
                            </Text>
                          </Animatable.View>
                        ) : (
                          <></>
                        )}

                        <View
                          style={{
                            backgroundColor: '#fff',
                            elevation: 10,
                            borderRadius: 8,
                            borderBottomWidth: 1,
                            borderBottomColor: '#f2f2f2',
                            paddingVertical: 10,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              // marginTop: 5,
                              borderBottomColor: '#f2f2f2',
                              // paddingBottom: 5,
                              backgroundColor: '#fff',
                              borderRadius: 8,
                              paddingLeft: 15,
                              // marginTop: Platform.OS === 'ios' ? 0 : 5,
                              alignItems: 'center',
                            }}>
                            <MaterialIcons
                              name="school"
                              color={'#263d2d'}
                              size={25}
                            />
                            <Text
                              style={{
                                color: '#333',
                                flex: 1,
                                paddingLeft: 10,
                                color: '#666666',
                                fontSize: 15,
                                fontWeight: '600',
                              }}>
                              {trans(`Student's School Board`)}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              paddingHorizontal: 15,
                            }}>
                            {Board.map((row, index) => {
                              const {
                                boardname = '',
                                boardid = '',
                                isSelected = '',
                              } = row;
                              return (
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => {
                                    handleInputChange(
                                      'board_name',
                                      boardid,
                                      boardname,
                                    );
                                  }}
                                  onFocus={() =>
                                    handleInputChange('board_name', boardid)
                                  }>
                                  <Text
                                    style={{
                                      borderWidth: 1,
                                      borderColor:
                                        boardid !== null &&
                                          info.board_name == boardid
                                          ? '#fff'
                                          : '#263d2d',
                                      backgroundColor:
                                        boardid !== null &&
                                          info.board_name == boardid
                                          ? '#263d2d'
                                          : '#fff',
                                      paddingVertical: 7,
                                      paddingHorizontal: 20,
                                      borderRadius: 10,
                                      margin: 5,
                                    }}>
                                    <Text
                                      style={{
                                        color:
                                          boardid !== null &&
                                            info.board_name == boardid
                                            ? '#fff'
                                            : '#263d2d',
                                      }}>
                                      {boardname}
                                    </Text>
                                  </Text>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        </View>
                        {boardError && (
                          <Animatable.View
                            animation="fadeInLeft"
                            duration={500}>
                            <Text
                              style={{
                                color: 'darkorange',
                                // marginBottom: 5,
                                marginTop: -3,
                              }}>
                              {trans("Please Enter School's Board Name")}
                            </Text>
                          </Animatable.View>
                        )}

                        <View
                          style={{
                            backgroundColor: '#fff',
                            elevation: 10,
                            borderRadius: 8,
                            borderBottomWidth: 1,
                            borderBottomColor: '#f2f2f2',
                            paddingVertical: 10,
                            marginTop: 10,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              // marginTop: 5,
                              borderBottomColor: '#f2f2f2',
                              // paddingBottom: 5,
                              backgroundColor: '#fff',
                              borderRadius: 8,
                              paddingLeft: 15,
                              // marginTop: Platform.OS === 'ios' ? 0 : 5,
                              alignItems: 'center',
                            }}>
                            <MaterialCommunityIcons
                              name="account-group"
                              color={'#263d2d'}
                              size={25}
                            />
                            <Text
                              style={{
                                color: '#666',
                                flex: 1,
                                paddingLeft: 10,
                                fontSize: 15,
                                fontWeight: '600',
                              }}>
                              {trans(`Enter Student's Standard`)}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              paddingHorizontal: 15,
                            }}>
                            {Standard.map((row, index) => {
                              const {
                                classname = '',
                                classid = '',
                                isSelected = '',
                                stage = '',
                                stageid = '',
                              } = row;
                              return (
                                <TouchableOpacity
                                  onPress={() => {
                                    handleInputChange('stage', stageid);
                                  }}
                                  onFocus={() =>
                                    handleInputChange('stage', stageid)
                                  }
                                  key={index}>
                                  <Text
                                    style={{
                                      borderWidth: 1,
                                      borderColor:
                                        stageid !== null &&
                                          info.stage == stageid
                                          ? '#fff'
                                          : '#263d2d',
                                      backgroundColor:
                                        stageid !== null &&
                                          info.stage == stageid
                                          ? '#263d2d'
                                          : '#fff',
                                      paddingVertical: 7,
                                      paddingHorizontal: 20,
                                      borderRadius: 10,
                                      margin: 5,
                                    }}>
                                    <Text
                                      style={{
                                        color:
                                          stageid !== null &&
                                            info.stage == stageid
                                            ? '#fff'
                                            : '#2f60e2',
                                      }}>
                                      {stage}
                                    </Text>
                                  </Text>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        </View>
                        {standardError && (
                          <Animatable.View
                            animation="fadeInLeft"
                            duration={500}>
                            <Text
                              style={{
                                color: 'darkorange',
                                marginTop: -3,
                                // marginBottom: 5,
                                width: '100%',
                              }}>
                              {trans("Please Enter Student's Standard")}
                            </Text>
                          </Animatable.View>
                        )}
                        <View
                          style={{
                            backgroundColor: '#fff',
                            elevation: 10,
                            borderRadius: 8,
                            borderBottomWidth: 1,
                            borderBottomColor: '#f2f2f2',
                            paddingVertical: 10,
                            marginTop: 10,
                            paddingHorizontal: 20,
                          }}>
                          <View style={{ marginBottom: 10 }}>
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: '700',
                                color: '#263d2d',
                              }}>
                              {trans('Select Your Preferred Language')}
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
                                    borderColor: '#263d2d',

                                    // borderRadius: 5,
                                    // backgroundColor: isSelected ? '#1E88E5' : '#fff',
                                    paddingHorizontal: 5,
                                    // paddingVertical: 5,
                                    // width: '30%',
                                    borderRadius: 10,
                                    backgroundColor: isSelected
                                      ? '#263d2d'
                                      : '#fff',
                                  }}
                                  selectedColor={'#fff'}
                                  selected={isSelected}
                                  onPress={() => {
                                    i18n.changeLanguage(code);
                                    dispatch(setLanguage(code));
                                    setLanguages(prevState =>
                                      prevState.map(lang =>
                                        lang.code === code
                                          ? { ...lang, isSelected: true }
                                          : { ...lang, isSelected: false },
                                      ),
                                    );
                                  }}
                                  textStyle={{
                                    color: isSelected ? '#fff' : '#263d2d',
                                    fontWeight: 'bold',
                                  }}>
                                  {name}
                                </Chip>
                              </View>
                            ))}
                          </View>
                        </View>
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
                          school_name != '' && board_name !== null && board_name !== undefined && stage !== null && stage !== undefined
                            ? false
                            : true
                        }
                        style={{
                          borderRadius: 10,
                          width: '50%',
                          marginVertical: 5,
                          backgroundColor:
                            school_name != '' && board_name !== null && board_name !== undefined && stage !== null && stage !== undefined
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
                              school_name != '' &&
                                board_name !== null && board_name !== undefined && stage !== null && stage !== undefined
                                ? '#333'
                                : '#666',
                            fontSize: 13,
                            fontWeight: '600',
                            textAlign: 'center',
                            alignItems: 'center',
                          }}>
                          {trans('Submit')}
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

        {inputModal5 && (
          <Modal transparent={true} visible={inputModal5}>
            <View
              style={{
                backgroundColor: '#fff',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View
                  style={{
                    borderRadius: 15,
                    // borderWidth: 1,
                    minHeight: device_height * 0.75,
                    minWidth: device_width * 0.9,
                    paddingHorizontal: 20,
                    // marginHorizontal:10,
                    backgroundColor: '#fff',
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
                            borderWidth: 1,
                            borderColor: '#ccc',
                            elevation: 10,
                            width: device_width * 0.9,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            backgroundColor: '#def',
                            marginLeft: -30,
                            marginRight: -30,
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              width: device_width * 0.7,
                              fontSize: 15,
                              color: '#333',
                              marginTop: 5,
                              // marginLeft: 5,
                              fontWeight: '700',
                            }}>
                            {trans('Complete Your Registration ')}
                            <Text style={{ fontWeight: '900', fontSize: 16 }}>
                              5/5
                            </Text>
                          </Text>
                        </View>
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
                            // marginTop: Platform.OS === 'ios' ? 0 : 5,
                            alignItems: 'center',
                            borderWidth:
                              school_name == ''
                                ? 1
                                : schoolNameError == true
                                  ? 1
                                  : 0,
                            borderColor:
                              school_name == ''
                                ? 'darkorange'
                                : schoolNameError == true
                                  ? 'darkorange'
                                  : '#fff',
                          }}>
                          <FontAwesome5
                            name="school"
                            color={Colors.primary}
                            size={20}
                          />
                          <TextInput
                            placeholder={trans(`Student's School Name`)}
                            placeholderTextColor="#666666"
                            value={school_name}
                            style={{
                              color: '#333',
                              flex: 1,
                              paddingLeft: 10,
                              fontSize: 15,
                              fontWeight: '600',
                            }}
                            autoCapitalize="none"
                            // onChangeText={(val) => textInputChange(val)}
                            // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                            onChangeText={val =>
                              handleInputChange('school_name', val)
                            }
                          />
                        </View>
                        {school_name == '' ? (
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
                              {trans('Please enter school name')}
                            </Text>
                          </Animatable.View>
                        ) : schoolNameError ? (
                          <Animatable.View
                            animation="fadeInLeft"
                            duration={500}>
                            <Text
                              style={{
                                color: Colors.red,
                                marginBottom: 10,
                                marginTop: -3,
                                marginLeft: 5,
                              }}>
                              {trans('Please enter school name')}
                            </Text>
                          </Animatable.View>
                        ) : (
                          <></>
                        )}

                        <View
                          style={{
                            backgroundColor: '#fff',
                            elevation: 10,
                            borderRadius: 8,
                            borderBottomWidth: 1,
                            borderBottomColor: '#f2f2f2',
                            paddingVertical: 10,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              // marginTop: 5,
                              borderBottomColor: '#f2f2f2',
                              // paddingBottom: 5,
                              backgroundColor: '#fff',
                              borderRadius: 8,
                              paddingLeft: 15,
                              // marginTop: Platform.OS === 'ios' ? 0 : 5,
                              alignItems: 'center',
                            }}>
                            <MaterialIcons
                              name="school"
                              color={Colors.primary}
                              size={25}
                            />
                            <Text
                              style={{
                                color: '#333',
                                flex: 1,
                                paddingLeft: 10,
                                color: '#666666',
                                fontSize: 15,
                                fontWeight: '600',
                              }}>
                              {trans(`Student's School Board`)}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              paddingHorizontal: 15,
                            }}>
                            {Board.map((row, index) => {
                              const {
                                boardname = '',
                                boardid = '',
                                isSelected = '',
                              } = row;
                              return (
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => {
                                    handleInputChange(
                                      'board_name',
                                      boardid,
                                      boardname,
                                    );
                                  }}
                                  onFocus={() =>
                                    handleInputChange('board_name', boardid)
                                  }>
                                  <Text
                                    style={{
                                      borderWidth: 1,
                                      borderColor:
                                        boardid !== null &&
                                          info.board_name == boardid
                                          ? '#fff'
                                          : Colors.primary,
                                      backgroundColor:
                                        boardid !== null &&
                                          info.board_name == boardid
                                          ? Colors.primary
                                          : '#fff',
                                      paddingVertical: 7,
                                      paddingHorizontal: 20,
                                      borderRadius: 10,
                                      margin: 5,
                                    }}>
                                    <Text
                                      style={{
                                        color:
                                          boardid !== null &&
                                            info.board_name == boardid
                                            ? '#fff'
                                            : Colors.primary,
                                      }}>
                                      {boardname}
                                    </Text>
                                  </Text>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        </View>
                        {boardError && (
                          <Animatable.View
                            animation="fadeInLeft"
                            duration={500}>
                            <Text
                              style={{
                                color: Colors.red,
                                // marginBottom: 5,
                                marginTop: -3,
                              }}>
                              {trans("Please Enter School's Board Name")}
                            </Text>
                          </Animatable.View>
                        )}

                        <View
                          style={{
                            backgroundColor: '#fff',
                            elevation: 10,
                            borderRadius: 8,
                            borderBottomWidth: 1,
                            borderBottomColor: '#f2f2f2',
                            paddingVertical: 10,
                            marginTop: 10,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              // marginTop: 5,
                              borderBottomColor: '#f2f2f2',
                              // paddingBottom: 5,
                              backgroundColor: '#fff',
                              borderRadius: 8,
                              paddingLeft: 15,
                              // marginTop: Platform.OS === 'ios' ? 0 : 5,
                              alignItems: 'center',
                            }}>
                            <MaterialCommunityIcons
                              name="account-group"
                              color={Colors.primary}
                              size={25}
                            />
                            <Text
                              style={{
                                color: '#666',
                                flex: 1,
                                paddingLeft: 10,
                                fontSize: 15,
                                fontWeight: '600',
                              }}>
                              {trans(`Enter Student's Standard`)}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              paddingHorizontal: 15,
                            }}>
                            {Standard.map((row, index) => {
                              const {
                                classname = '',
                                classid = '',
                                isSelected = '',
                                stage = '',
                                stageid = '',
                              } = row;
                              return (
                                <TouchableOpacity
                                  onPress={() => {
                                    handleInputChange('stage', stageid);
                                  }}
                                  onFocus={() =>
                                    handleInputChange('stage', stageid)
                                  }
                                  key={index}>
                                  <Text
                                    style={{
                                      borderWidth: 1,
                                      borderColor:
                                        stageid !== null &&
                                          info.stage == stageid
                                          ? '#fff'
                                          : Colors.primary,
                                      backgroundColor:
                                        stageid !== null &&
                                          info.stage == stageid
                                          ? Colors.primary
                                          : '#fff',
                                      paddingVertical: 7,
                                      paddingHorizontal: 20,
                                      borderRadius: 10,
                                      margin: 5,
                                    }}>
                                    <Text
                                      style={{
                                        color:
                                          stageid !== null &&
                                            info.stage == stageid
                                            ? '#fff'
                                            : '#2f60e2',
                                      }}>
                                      {stage}
                                    </Text>
                                  </Text>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        </View>
                        {standardError && (
                          <Animatable.View
                            animation="fadeInLeft"
                            duration={500}>
                            <Text
                              style={{
                                color: Colors.red,
                                marginTop: -3,
                                // marginBottom: 5,
                                width: '100%',
                              }}>
                              {trans("Please Enter Student's Standard")}
                            </Text>
                          </Animatable.View>
                        )}
                        <View
                          style={{
                            backgroundColor: '#fff',
                            elevation: 10,
                            borderRadius: 8,
                            borderBottomWidth: 1,
                            borderBottomColor: '#f2f2f2',
                            paddingVertical: 10,
                            marginTop: 10,
                            paddingHorizontal: 20,
                          }}>
                          <View style={{ marginBottom: 10 }}>
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: '700',
                                color: Colors.primary,
                              }}>
                              {trans('Select Your Preferred Language')}
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
                                    borderColor: Colors.primary,

                                    // borderRadius: 5,
                                    // backgroundColor: isSelected ? '#1E88E5' : '#fff',
                                    paddingHorizontal: 5,
                                    // paddingVertical: 5,
                                    // width: '30%',
                                    borderRadius: 10,
                                    backgroundColor: isSelected
                                      ? Colors.primary
                                      : '#fff',
                                  }}
                                  selectedColor={'#fff'}
                                  selected={isSelected}
                                  onPress={() => {
                                    i18n.changeLanguage(code);
                                    setLanguage(code, dispatch);
                                    setLanguages(prevState =>
                                      prevState.map(lang =>
                                        lang.code === code
                                          ? { ...lang, isSelected: true }
                                          : { ...lang, isSelected: false },
                                      ),
                                    );
                                  }}
                                  textStyle={{
                                    color: isSelected ? '#fff' : Colors.primary,
                                    fontWeight: 'bold',
                                  }}>
                                  {name}
                                </Chip>
                              </View>
                            ))}
                          </View>
                        </View>
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
                          school_name != '' && board_name != '' && stage != ''
                            ? false
                            : true
                        }
                        style={{
                          borderRadius: 10,
                          width: '50%',
                          marginVertical: 5,
                          backgroundColor:
                            school_name != '' && board_name != '' && stage != ''
                              ? 'green'
                              : '#ccc',
                          marginHorizontal: 20,
                          paddingVertical: 10,
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          submitForm();
                          setInputModal5(false);
                          // setInputModal6(true);
                        }}>
                        <Text
                          style={{
                            color:
                              school_name != '' &&
                                board_name != '' &&
                                stage != ''
                                ? 'white'
                                : '#666',
                            fontSize: 13,
                            fontWeight: '600',
                            textAlign: 'center',
                            alignItems: 'center',
                          }}>
                          {trans('Submit')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        )}

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
                      <View style={{ alignItems: 'center', paddingVertical: 15 }}>
                        <View
                          style={{
                            // borderWidth: 0.8,
                            borderColor: 'green',
                            borderRadius: 50,
                            // padding: 10,
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
                            // marginLeft: 5,
                            fontWeight: '500',
                          }}>
                          {trans('Please try new number or login instead')}
                        </Text>
                      </View>
                      {/* <AntDesign
                      name="closecircleo"
                      style={{
                        fontSize: 28,
                        color: '#fff',
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        // marginTop: 10,
                        backgroundColor: 'crimson',
                        borderRadius: 50,
                      }}
                      onPress={() => setLockedModalStatus(false)}
                    /> */}
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
                          // width: '100%',
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
        {/* {showprog && (
        <Spinner
          style={{
            position: 'absolute',
            top: device_height / 2.8,
            left: device_width / 2.7,
          }}
          isVisible={showprog}
          size={spinner_size}
          type={spinner_typ}
          color={spinner_color}
        />
      )} */}
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
