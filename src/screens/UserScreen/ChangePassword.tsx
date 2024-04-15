import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  StatusBar,
  ToastAndroid,
  Linking,
  Image,
  SafeAreaView,
  BackHandler,
  ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
// import {format} from 'date-fns';
import Icon from 'react-native-vector-icons/Ionicons';
// import {FABGroup} from 'react-native-paper';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {emailRegex, name_reg, phoneRegex} from '../../../constants/Constants';
import Colors from '../../../assets/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';
// import {createContactApi, updateChildProfile} from '../../redux/actions/Action';
import {device_height, device_width} from '../style';
import {useTranslation} from 'react-i18next';
// import Header from './CommonScreens/Header';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {
  selectStudentInfo,
  selectStudentStatus,
} from '../../redux/reducers/StudentInfoReducer';
import {RootState} from '../../redux/store/Store';
import Header from '../CommonScreens/Header';
import {updateChildProfile} from '../../redux/actions/UpdateStudentProfile';

// import {SET_CHILD_INFO} from '../../redux/actions/actiontypes';

const ChangePassword = ({}) => {
  interface ChildInfo {
    _id: string;
    age: string;
    childid: string;
    image: string;
    imagename: string;
    fname: string;
    lname: string;
    phone: string;
    name: string;
    boardname: string;
    fathername: string;
    mothername: string;
    // board: string;
    subscriptionStartDate: string;
    subscriptionEndDate: string;
    isPremium: boolean;
    parentid: string;
    stage: string;
    gender: string;
    address: string;
    alterphone: string;
    schoolname: string;
    language: string;
    email: string;
    stageid: string;
    boardid: string;
    classname: string;
    password: string;
  }
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const count = useAppSelector(selectStudentStatus);
  const childInfo = useAppSelector(selectStudentInfo) as ChildInfo;

  // console.log(childInfo, 'in STUDENT PROFILE.............');

  const {t: trans, i18n} = useTranslation();
  // const {userInfo = {}} = useSelector(state => state.UserInfoReducer);
  //   const {childInfo = {}} = useSelector(state => state.ChildDetailsReducer);
  // const {handleContactUs,userDetails = {}} = useContext(GlobalContext);
  const {colors} = useTheme();
  const [oldpasswordError, setOldPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);

  const [mismatchError, setmismatchError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [open, setopen] = useState(false);
  const {
    _id: childID = '',
    age: p_age = '',
    childid = '',
    image = '',
    imagename = '',
    fname = '',
    lname = '',
    phone = '',
    name = '',
    boardname = '',
    fathername = '',
    mothername = '',
    // board = '',
    subscriptionStartDate = '',
    subscriptionEndDate = '',
    isPremium = false,
    parentid: parentId = '',
    stage = '',
    gender = '',
    address = '',
    alterphone = '',
    schoolname = '',
    language: userLang = '',
    email = '',
    stageid = '',
    boardid = '',
    classname = '',
    password = '',
  } = childInfo || {};
  useEffect(() => {
    navigation.addListener('focus', () => {
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
  // console.log(childInfo, '=======childInfo=======');
  const [info, setInfo] = useState({
    secureTextEntry: true,
    confirmSecureTextEntry: true,
    updateSecureTextEntry: true,
    p_name: fname + ' ' + lname,
    query: '',
    p_phone: phone,
    p_email: email,
    old_password: password ? password : '',
    new_password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const {old_password, new_password, confirmPassword} = info;
  //console.log(info,"=======info=======");

  const handleInputChange = (inputName: string, inputValue: string | any[]) => {
    // console.log(info.new_password, '...............');
    // console.log(info.confirmPassword, '...confirmPassword............');

    if (inputName == 'old_password') {
      if (inputValue == '' || inputValue.length < 6) {
        setOldPasswordError(true);
      } else {
        setOldPasswordError(false);
      }
    }
    if (inputName == 'new_password') {
      // if (!password_regex.test(inputValue)) {
      if (inputValue != '' && inputValue.length < 6) {
        setNewPasswordError(true);
        setConfirmPasswordError(true);
        setmismatchError(false);
      } else {
        setNewPasswordError(false);
        setConfirmPasswordError(false);
        if (inputValue == info.confirmPassword) {
          setmismatchError(false);
        } else {
          setmismatchError(true);
        }
      }
    } else if (inputName == 'confirmPassword') {
      // if (!password_regex.test(inputValue)) {
      if (inputValue != '' && inputValue.length < 6) {
        setConfirmPasswordError(true);
        setmismatchError(false);
      } else if (inputValue !== info.new_password) {
        setConfirmPasswordError(false);
        setmismatchError(true);
        //   else if (info.new_password !== '' && inputValue.length < 6) {
        //     setConfirmPasswordError(false);
        //     setmismatchError(true);
        //     if (inputValue == info.new_password) {
        //         console.log(info.new_password,"info.new_password.....");
        //       setmismatchError(false);
        //     } else {
        //       setmismatchError(true);
        //     }
      } else if (inputValue == info.new_password) {
        setConfirmPasswordError(false);
        setmismatchError(false);
      } else {
        setConfirmPasswordError(false);
      }
    }
    setInfo(Info => ({...Info, [inputName]: inputValue}));
  };

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
  const handleCallback = () => {
    navigation.navigate('UserHome');
  };
  const handleUpdateCallback = (updatebodyData: any) => {
    // dispatch(getChildDetailsAPI(undefined, undefined, setLoading));
    // setChildList({...childList[0],...updatebodyData})
    // console.log(childList, 'childList=======');
    const data = childInfo;
    const childListData = [{...data, ...updatebodyData}];
    ToastAndroid.showWithGravityAndOffset(
      trans(`Password Change Successfully`),
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    // dispatch({
    //   type: SET_CHILD_INFO,
    //   payload: childListData,
    // });
    // commonCallback();
    navigation.navigate('UserProfile');
  };
  const submitForm = async () => {
    //console.log("PRESSEDDDD");
    const updatebodyData = {
      id: childID,
      parentid: '',
      name: fname + ' ' + lname,
      fname: fname,
      lname: lname,
      stage: stage,
      age: p_age,
      boardname: boardname,
      fathername: fathername,
      mothername: mothername,
      image: image,
      imagename: imagename,
      subscriptionStartDate: '',
      subscriptionEndDate: '',
      isPremium: '',
      boardid: boardid,
      stageid: stageid,
      classname: classname,
      language: userLang,
      email: email,
      alterphone: alterphone,
      password: new_password,
      schoolname: schoolname,
      address: address,
      gender: gender,
    };
    const validate = info.new_password != '' && info.confirmPassword != '';

    // console.log(
    //   info.new_password,
    //   'info.new_password',
    //   info.confirmPassword,
    //   'info.confirmPassword',
    // );

    console.log(updatebodyData, 'bodyData....CONTACTUS');
    if (validate == false) {
      // console.log(validate, 'validate.........................');
      // if (info.old_password == '') {
      //   setOldPasswordError(true);
      // } else {
      //   setOldPasswordError(false);
      // }

      if (info.new_password == '' || info.new_password.length < 6) {
        setNewPasswordError(true);
      } else {
        setNewPasswordError(false);
      }
      if (info.confirmPassword == '' || info.confirmPassword.length < 6) {
        setConfirmPasswordError(true);
      } else {
        setConfirmPasswordError(false);
      }
      ToastAndroid.showWithGravityAndOffset(
        trans('Please Enter Valid Input'),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (newPasswordError == true) {
      // console.log("passerror","................");
      // setNewPasswordError(true)
      ToastAndroid.showWithGravityAndOffset(
        trans('Please Enter Valid Password'),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (confirmPasswordError == true) {
      // console.log("confirm........error","................");
      ToastAndroid.showWithGravityAndOffset(
        trans('Please Enter Valid Password'),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (mismatchError == true) {
      // console.log('pass........error', '................');
      ToastAndroid.showWithGravityAndOffset(
        trans('Please Enter Valid Password'),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
    // else if (oldpasswordError == true) {
    //   setOldPasswordError(true)
    //   ToastAndroid.showWithGravityAndOffset(
    //     'Please Enter Valid Password',
    //     ToastAndroid.LONG,
    //     ToastAndroid.BOTTOM,
    //     25,
    //     50,
    //   );
    // }
    else {
      // console.log('called..................');
      // console.log(updatebodyData, '.........................');
      
        updateChildProfile(
          updatebodyData,
          // undefined,
          // setLoading,
          handleUpdateCallback,
          // true,
        );
    
    }
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
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
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{
          width: device_width,
          height: device_height,
          flex: 1,
          alignSelf: 'center',
        }}
        resizeMode="cover"
        source={require('../../../assets/0.png')}>
        <Header
          label1={
            password ? trans('Change password') : trans('Set new password')
          }
          // label2={`{Std - ${stage}`}
          // label2={`${trans('Std')}-${stage}`}
          isbackIconShow={true}
          functionName={() => navigation.goBack()}
        />
        <Animatable.View
          animation="fadeInUpBig"
          style={{
            flex: Platform.OS === 'ios' ? 3 : 12,
            backgroundColor: 'rgba(0,255,0, 0.05)',
            // borderTopLeftRadius: 15,
            // borderTopRightRadius: 15,
            paddingHorizontal: 20,
            paddingBottom: 15,
          }}>
          <View
            style={{
              height: 120,
              width: device_width,
              marginLeft: 5,
              // backgroundColor: '#fff',
              // backgroundColor: 'rgba(0,255,0, 0.05)',
              // position: "absolute",
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <FastImage
              style={{height: 100, width: device_width * 0.5, marginTop: 5}}
              // source={{
              //   uri: 'https://t3.ftcdn.net/jpg/03/55/93/36/360_F_355933634_1BaLq0FIg4tWUXfztbFvfaPRRtEKx7rp.jpg',
              // }}
              source={require('../../../assets/el3.png')}
              resizeMode="contain"
            />
          </View>
          <View style={{width: '100%', marginTop: 25, marginBottom: 20}}>
            <Text style={{fontSize: 25, fontWeight: '900', color: '#FFB901'}}>
              {trans('New Password')}
            </Text>
            <Text
              style={{
                fontSize: 13,
                marginTop: 10,
                color: '#fff',
                fontWeight: 'bold',
              }}>
              {trans('Set new password to continue')}
            </Text>
          </View>
          <ScrollView style={{marginVertical: 20}}>
            {/* {password?
      <>
        <View
          style={{
            // borderWidth:1,
            width: '95%',
            alignSelf:'center',
            flexDirection: 'row',
            marginTop: 5,
            borderBottomWidth: 1,
            borderBottomColor: '#f2f2f2',
            paddingBottom: 5,
            marginVertical: 10,
            backgroundColor: '#fff',
            elevation: 10,
            borderRadius: 18,
            height: 60,
            paddingLeft: 15,
            marginTop: Platform.OS === 'ios' ? 0 : 5,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '85%',
            }}>
            {/* <Feather name="lock" size={20} color={Colors.primary} /> */}
            {/*<Text
              placeholder={trans(`Old Password`)}
              placeholderTextColor="#666"
              value={old_password}
              style={{
                color: '#333',
                flex: 1,
                paddingLeft: 10,
                fontSize: 18,
                fontWeight: '600',
              }}
              autoCapitalize="none"
              // secureTextEntry={info.secureTextEntry ? true : false}
              // onChangeText={val => handleInputChange('old_password', val)}
            

            >
            {old_password}
            </Text>
          </View>
        </View>
        {oldpasswordError && (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={{color: Colors.red, marginBottom: 10}}>
              {/* {trans('Please enter valid password format')}{" "}{`(ex: ' Aa@123 ')`}
              {'\n'} */}
            {/*{trans(`Please enter valid password`)}
            </Text>
          </Animatable.View>
        )}</>:<></>
      } */}

            <View>
              <View
                style={{
                  // borderWidth:1,
                  width: '95%',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  marginTop: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: '#f2f2f2',
                  paddingBottom: 5,
                  marginVertical: 10,
                  backgroundColor: '#fff',
                  elevation: 10,
                  borderRadius: 18,
                  height: 60,
                  paddingLeft: 15,

                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '85%',
                  }}>
                  <Feather name="lock" size={20} color={'#FFB901'} />
                  <TextInput
                    placeholder={trans(`New Password`)}
                    placeholderTextColor="#666"
                    value={new_password}
                    style={{
                      color: '#333',
                      flex: 1,
                      paddingLeft: 10,
                      fontSize: 18,
                      fontWeight: '600',
                    }}
                    autoCapitalize="none"
                    secureTextEntry={info.secureTextEntry ? true : false}
                    onChangeText={val => handleInputChange('new_password', val)}
                  />
                </View>
                <TouchableOpacity onPress={updateSecureTextEntry}>
                  {info.secureTextEntry ? (
                    <Feather
                      name="eye-off"
                      style={{
                        paddingTop: 10,
                        marginRight: 20,
                      }}
                      color="#FFB901"
                      size={20}
                    />
                  ) : (
                    <Feather
                      name="eye"
                      color="#FFB901"
                      style={{
                        paddingTop: 10,
                        marginRight: 20,
                      }}
                      size={20}
                    />
                  )}
                </TouchableOpacity>
              </View>
              {newPasswordError && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={{color: Colors.red, marginBottom: 10}}>
                    {/* {trans('Please enter valid password format')}{" "}{`(ex: ' Aa@123 ')`}
              {'\n'} */}
                    {trans(`Password must be atleast 6 characters`)}
                  </Text>
                </Animatable.View>
              )}

              <View
                style={{
                  // borderWidth:1,
                  width: '95%',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  marginTop: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: '#f2f2f2',
                  paddingBottom: 5,
                  marginVertical: 10,
                  backgroundColor: '#fff',
                  elevation: 10,
                  borderRadius: 18,
                  height: 60,
                  paddingLeft: 15,

                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '85%',
                  }}>
                  <Feather name="lock" size={20} color={'#FFB901'} />
                  <TextInput
                    placeholder={trans(`Confirm Password`)}
                    placeholderTextColor={'#666'}
                    secureTextEntry={info.confirmSecureTextEntry ? true : false}
                    style={{
                      color: '#333',
                      flex: 1,
                      paddingLeft: 10,
                      fontSize: 18,
                      fontWeight: '600',
                    }}
                    autoCapitalize="none"
                    value={confirmPassword}
                    onChangeText={val =>
                      handleInputChange('confirmPassword', val)
                    }
                  />
                </View>
                <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
                  {info.confirmSecureTextEntry ? (
                    <Feather
                      name="eye-off"
                      style={{
                        paddingTop: 10,
                        marginRight: 20,
                      }}
                      color="#FFB901"
                      size={20}
                    />
                  ) : (
                    <Feather
                      name="eye"
                      color="#FFB901"
                      style={{
                        paddingTop: 10,
                        marginRight: 20,
                      }}
                      size={20}
                    />
                  )}
                </TouchableOpacity>
              </View>
              {confirmPasswordError && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={{color: Colors.red, marginBottom: 10}}>
                    {trans('Please enter confirm password')}
                  </Text>
                </Animatable.View>
              )}
              {mismatchError && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={{color: Colors.red, marginBottom: 10}}>
                    {trans(`Password didn't match`)}
                  </Text>
                </Animatable.View>
              )}
            </View>
            <View style={{alignItems: 'center', marginTop: 50}}>
              <TouchableOpacity
                style={[
                  styles.signIn,
                  {
                    backgroundColor: '#fff',
                    borderColor: '#FFB901',
                    borderWidth: 2,
                  },
                ]}
                onPress={() => {
                  submitForm();
                }}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: 'green',
                    },
                  ]}>
                  {password
                    ? trans('Change Password')
                    : trans('Set new password')}
                </Text>
                {/* </LinearGradient> */}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animatable.View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },

  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
  },
  textArea: {
    height: 110,
    justifyContent: 'flex-start',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 15,
    fontWeight: 'bold',
  },
  action: {
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -5,
    marginBottom: Platform.OS === 'ios' ? 0 : -15,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
