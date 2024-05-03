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
import { useAppSelector } from '../../redux/store/reducerHook';
// import { selectStudentLanguage } from '../../redux/reducers/languageReducer';
// import { getStandard, selectStudentStandard } from '../../redux/reducers/StandardReducer';
// import { getBoard, selectStudentBoard } from '../../redux/reducers/BoardReducer';
import { childPhoneVerifyAPI, selectVerifyPhInfo } from '../../redux/reducers/VerifyPhoneReducer';
const { t: trans } = i18n;

const SignUpScreen2 = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const {
    fname = '',
    lname = '',
    st_phone = '',
    phone = '',
    email = '',
    otplogin = false,
    emailLogin = '',
    pswdLogin = false,
  } = route.params;
  console.log(route.params, '==================route.params');

  // const selectedLanguage = useAppSelector(selectStudentLanguage)
  // console.log(selectedLanguage, "selectedLanguage**********")

  // const { signOut } = useContext(AuthContext);

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
  // console.log(isSelected,"isSelected.....")

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

  // const { signIn } = React.useContext(AuthContext);

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
    // fname,
    // lname,
    // st_phone,
    st_email,
    father_phone,
    alt_phone,
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
    if (inputName == 'st_email') {
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
    else if (inputName == 'alt_phone') {
      if (inputValue != '') {
        if (phoneRegexWithout91.test(inputValue)) {
          setAltPhoneError(false);
        } else {
          setAltPhoneError(true);
        }
      } else {
        setAltPhoneError(false);
      }
    }
    let infodata = { ...info };
    setInfo({ ...infodata, [inputName]: inputValue });
  };

  const email_regex_validate = emailRegex.test(st_email);
  const phone_regex_validate = phoneRegex.test(st_phone);
  const phone_regex_without_91_validate = phoneRegexWithout91.test(st_phone);
  // console.log(email_regex_validate,"========email_regex_validate");

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
            marginBottom: 10,
          }}>
          <TouchableOpacity
            onPress={() => goBackFunction()}
            style={{ paddingLeft: 10, position: 'absolute', left: 0 }}>
            <MaterialIcons
              name="keyboard-arrow-left"
              size={30}
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
            style={{
              width: device_width * 0.7,
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
                height: device_height * 0.18,
                width: device_width * 0.55,
                // borderWidth: 1,
                marginLeft: -30,
              }}
              // source={require('../../../assets/c.png')}
              // resizeMode="contain"
            />
          </Animatable.View>
          <Animatable.View
            animation="fadeInUpBig"
            style={{
              flex: 1,
              paddingHorizontal: 20,
              // paddingVertical: 10,
              // marginVertical: 10,
            }}>
            <View
              style={{
                // backgroundColor: '#000',
                marginTop: -30,
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
                    minHeight: device_height * 0.6,
                    minWidth: device_width * 0.9,
                    paddingHorizontal: 20,
                    // marginHorizontal:10,
                    //   backgroundColor: '#fff',
                    backgroundColor: 'rgba(0,255,0,0.11)',
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
                            width: device_width * 0.89,
                            alignSelf: 'center',
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                            //   backgroundColor: '#def',
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
                              {/* {trans('2/5')} */}
                              {'2/4'}
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
                            paddingLeft: 20,
                            // marginTop: Platform.OS === 'ios' ? 0 : 5,
                            alignItems: 'center',
                          }}>
                          <MaterialIcons
                            name="email"
                            color={'#263d2d'}
                            size={22}
                          />
                          {emailLogin == true &&
                            st_email != '' &&
                            email_regex_validate ? (
                            <Text
                              style={{
                                color: '#bbb',
                                flex: 1,
                                paddingLeft: 10,
                                fontSize: 13,
                                fontWeight: '600',
                              }}>
                              {st_email}
                            </Text>
                          ) : (
                            <TextInput
                              // placeholder={trans(`Student's email (optional)`)}
                              placeholder={`Student's email (optional)`}
                              placeholderTextColor="#666666"
                              value={st_email}
                              style={{
                                color: '#333',
                                flex: 1,
                                paddingLeft: 10,
                                fontSize: 15,
                                fontWeight: '600',
                              }}
                              autoCapitalize="none"
                              onChangeText={val =>
                                handleInputChange('st_email', val)
                              }
                            />
                          )}
                        </View>
                        {emailError && (
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
                              {/* {trans('Please enter valid email id')} */}
                              {'Please enter valid email id'}
                            </Text>
                          </Animatable.View>
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
                            paddingLeft: 20,
                            // marginTop: Platform.OS === 'ios' ? 0 : 5,
                            alignItems: 'center',
                            borderWidth:
                              gender == '' ? 1 : genderError == true ? 1 : 0,
                            borderColor:
                              gender == ''
                                ? 'darkorange'
                                : genderError == true
                                  ? 'darkorange'
                                  : '#fff',
                          }}>
                          <MaterialCommunityIcons
                            name="human-male-female"
                            color={'#263d2d'}
                            size={22}
                          />
                          <TouchableOpacity
                            key={1}
                            onPress={() => handleRadioChange('Male')}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <RadioButton
                              onPress={() => handleRadioChange('Male')}
                              value={gender}
                              status={
                                gender == 'Male' ? 'checked' : 'unchecked'
                              }
                              selectedColor="#3A7AB0"
                              color={'#263d2d'}
                              style={{ alignaItems: 'center', color: '#000' }}
                            />
                            <View
                              style={{
                                paddingHorizontal: 5,
                                flexDirection: 'row',
                              }}>
                              <Text
                                style={[
                                  styles.text_footer,
                                  {
                                    fontSize: 15,
                                    color: '#666',
                                    fontWeight: '600',
                                  },
                                ]}>
                                {/* {trans('Boy')}{' '} */}
                                {'Boy'}{' '}
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            key={2}
                            onPress={() => handleRadioChange('Female')}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <RadioButton
                              status={
                                gender == 'Female' ? 'checked' : 'unchecked'
                              }
                              value={gender}
                              onPress={() => handleRadioChange('Female')}
                              selectedColor="#3A7AB"
                              color={'#263d2d'}
                              style={{ paddingHorizontal: 10, color: '#000' }}
                            />
                            <View
                              style={{
                                paddingHorizontal: 5,
                                flexDirection: 'row',
                              }}>
                              <Text
                                style={[
                                  styles.text_footer,
                                  {
                                    fontSize: 15,
                                    color: '#666',
                                    fontWeight: '600',
                                  },
                                ]}>
                                {/* {trans('Girl')}{' '} */}
                                {'Girl'}{' '}
                              </Text>
                            </View>
                          </TouchableOpacity>
                          {/* <TouchableOpacity
                              key={3}
                              onPress={() => handleRadioChange('others')}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <RadioButton
                                status={
                                  gender == 'others' ? 'checked' : 'unchecked'
                                }
                                value={gender}
                                onPress={() => handleRadioChange('others')}
                                selectedColor="#3A7AB"
                                color={Colors.primary}
                                style={{paddingHorizontal: 10, color: '#000'}}
                              />
                              <View
                                style={{
                                  paddingHorizontal: 5,
                                  flexDirection: 'row',
                                }}>
                                <Text
                                  style={[
                                    styles.text_footer,
                                    {fontSize: 16, color: '#444'},
                                  ]}>
                                  Others{' '}
                                </Text>
                              </View>
                            </TouchableOpacity> */}
                        </View>
                        {gender == '' ? (
                          <Animatable.View
                            animation="fadeInLeft"
                            duration={500}>
                            <Text
                              style={{ color: 'darkorange', marginBottom: 10 }}>
                              {/* {trans('Please select your gender')} */}
                              {'Please select your gender'}
                            </Text>
                          </Animatable.View>
                        ) : genderError ? (
                          <Animatable.View
                            animation="fadeInLeft"
                            duration={500}>
                            <Text
                              style={{ color: 'darkorange', marginBottom: 10 }}>
                              {/* {trans('Please select your gender')} */}
                              {'Please select your gender'}
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
                            borderWidth:
                              alt_phone == '' ? 1 : altPhoneError == true ? 1 : 0,
                            borderColor:
                              alt_phone == ''
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
                            placeholder={`Alt. Phone (optional)`}
                            placeholderTextColor="#666666"
                            value={alt_phone}
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
                              handleInputChange('alt_phone', val)
                            }
                          />
                          {/* )} */}
                        </View>
                        {alt_phone == '' ? (
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
                          altPhoneError && (
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

                        {/* <View
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
                              st_age == '' ? 1 : ageError == true ? 1 : 0,
                            borderColor:
                              st_age == ''
                                ? 'darkorange'
                                : ageError == true
                                  ? 'darkorange'
                                  : '#fff',
                          }}>
                          <MaterialCommunityIcons
                            name="face-recognition"
                            color={'#263d2d'}
                            size={20}
                          />
                          <Dropdown
                            style={[styles.dropdown, { width: '90%' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            // inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            itemTextStyle={{ color: '#333' }}
                            itemContainerStyle={{
                              borderBottomWidth: 0.5,
                              borderBottomColor: '#999',
                            }}
                            data={data}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            // placeholder={trans('Select your age')}
                            placeholder={'Select your age'}
                            searchPlaceholder="Select your age"
                            value={st_age}
                            setValue={agevalue}
                            onChange={value =>
                              handleInputChange('st_age', value)
                            }
                            // onFocus={value => handleInputChange('st_age', value)}
                            onFocus={() => {
                              // handleInputChange('cityid', cityid);
                              // selectAreaForCity(cityid);
                              setAgeValue(agevalue);
                            }}
                          />
                        </View>
                        <View
                          style={{
                            backgroundColor: '#dee',
                            // marginTop: 10,
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            alignItems: 'center',
                            borderRadius: 3,
                            // justifyContent: 'center',
                            flexDirection: 'row',
                          }}>
                          <AntDesign
                            // style={{padding:10}}
                            name={'infocirlce'}
                            size={15}
                            color={'#263d2d'}
                          />
                          <Text
                            style={{
                              color: '#444',
                              marginLeft: 10,
                              fontWeight: '600',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            {trans('Age Should Be In Between 9 - 17')}
                          </Text>
                        </View>

                        {st_age == '' ? (
                          <Animatable.View
                            animation="fadeInLeft"
                            duration={500}>
                            <Text
                              style={{ color: 'darkorange', marginBottom: 10 }}>
                              {trans("Please Enter Student's Age")} 
                            </Text>
                          </Animatable.View>
                        ) : ageError ? (
                          <Animatable.View
                            animation="fadeInLeft"
                            duration={500}>
                            <Text
                              style={{ color: 'darkorange', marginBottom: 10 }}>
                              {trans("Please Enter Student's Age")}
                            </Text>
                          </Animatable.View>
                        ) : (
                          <></>
                        )} */}
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
                        disabled={ gender != '' ? false : true}
                        style={{
                          borderRadius: 10,
                          width: '30%',
                          marginVertical: 5,
                          backgroundColor:
                             gender != '' ? '#a3b448' : '#ccc',
                          paddingVertical: 10,
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          navigation.navigate('SignUpScreen4', {
                            fname: fname,
                            lname: lname,
                            st_phone: st_phone,
                            // st_age: st_age,
                            gender: gender,
                            st_email: st_email,
                            phone: phone,
                            alt_phone: alt_phone,
                            email: email,
                            otplogin: otplogin,
                            emailLogin: emailLogin,
                            pswdLogin: pswdLogin,
                          });
                          //   setInputModal2(false);
                          //   setInputModal3(true);
                        }}>
                        <Text
                          style={{
                            color:
                               gender != '' ? '#333' : '#666',
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
                <Text style={{color: 'darkorange', marginBottom: 10}}>
                  Please enter valid referal code
                </Text>
              </Animatable.View>
            )} */}
            {/* </View> */}
          </Animatable.View>
          <Animatable.View
            style={{
              width: device_width,
              // marginRight:5,
              // borderWidth: 1,
              zIndex: 1,
              marginTop: -100
              // alignSelf: 'flex-end',
              // alignItems: 'flex-end',
              // justifyContent: 'flex-end',
            }}
            animation="fadeInLeft"
            duration={500}>
            <FastImage
              style={{
                height: device_height * 0.38,
                width: device_width,
                // borderWidth: 1,
                // marginLeft: -30,
              }}
              // source={require('../../../assets/b.png')}
              // resizeMode="contain"
            />
          </Animatable.View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default SignUpScreen2;

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
