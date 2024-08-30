import React, { useContext, useEffect, useState } from 'react';
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import { Modal } from 'react-native-paper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { emailRegex, name_reg, phoneRegex } from '../../../constants/Constants';
import Colors from '../../../assets/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'react-native-paper';
// import {createContactApi} from '../../redux/actions/Action';
import { device_height, device_width } from '../style';
import { useTranslation } from 'react-i18next';

import FastImage from 'react-native-fast-image';
import Header from '../CommonScreens/Header';
import { RootState } from '../../redux/store/Store';
import {
  selectStudentInfo,
  selectStudentStatus,
} from '../../redux/reducers/StudentInfoReducer';
import { useNavigation } from '@react-navigation/native';
import { createContactApi } from '../../redux/actions/createContactApi';

const ContactUs = ({ }) => {
  const { t: trans, i18n } = useTranslation();
  const navigation = useNavigation();
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
  }
  const dispatch = useDispatch<any>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const count = useAppSelector(selectStudentStatus);
  const childInfo = useAppSelector(selectStudentInfo) as ChildInfo;

  // console.log(childInfo, 'in STUDENT PROFILE.............');
  // const {userInfo = {}} = useSelector(state => state.UserInfoReducer);

  // const {handleContactUs,userDetails = {}} = useContext(GlobalContext);
  const { colors } = useTheme();
  const [nameError, setnameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [queryError, setqueryError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [sucessMessage, setSucessMessage] = useState(false);
  const [help, setHelp] = useState(false);
  const [open, setopen] = useState(false);
  const {
    // patientid: emailid  = '',
    phone = '',
    fname = '',
    lname = '',
    email = '',
  } = childInfo || {};
  // console.log(childInfo, '=======childInfo=======');
  const [info, setInfo] = useState({
    p_name: fname + ' ' + lname,
    query: '',
    p_phone: phone,
    p_email: email,
  });

  const { p_name, query, p_email, p_phone } = info;
  useEffect(() => {
    if (Object.keys(childInfo).length != 0) {
      setInfo({
        query: '',
        p_name: fname + ' ' + lname,
        query: '',
        p_phone: phone,
        p_email: email,
      });
    }
  }, [childInfo]);
  // //console.log(info,"=======info=======");

  const handleInputChange = (inputName: string, inputValue: string) => {
    let phone_validate = false;
    let email_validate = false;
    if (info.p_phone || info.p_email) {
      phone_validate = phoneRegex.test(inputValue);
      email_validate = emailRegex.test(inputValue);
    }
    //   // let phone=info.phone
    //   // const params=phone.split(' ')
    //   // phone_validate=params[0].length==9?true:false
    //   ////console.log(phone_validate,"phone data",info.phone.length);
    // }
    if (inputName == 'p_phone') {
      if (!phoneRegex.test(inputValue)) {
        setPhoneError(true);
      } else {
        setPhoneError(false);
      }
    } else if (inputName == 'p_name') {
      if (!name_reg.test(inputValue)) {
        setnameError(true);
      } else {
        setnameError(false);
      }
    } else if (inputName == 'p_email') {
      if (inputValue != '') {
        if (!emailRegex.test(inputValue)) {
          setEmailError(true);
        } else {
          setEmailError(false);
        }
      } else {
        setEmailError(false);
      }
    } else if (inputName == 'query') {
      if (inputValue.length == ' ') {
        setqueryError(true);
      } else {
        setqueryError(false);
      }
    }
    setInfo(Info => ({ ...Info, [inputName]: inputValue }));
  };
  const handleCallback = () => {

    setSucessMessage(true);
  };
  const closeFunction = () => {
    setSucessMessage(false);
    navigation.popToTop()
    navigation.navigate('UserProfile');
  };
  const submitForm = async () => {
    //console.log("PRESSEDDDD");
    const validate =
      info.p_name == '' || info.p_phone == '' || info.query == '';

    //const phone_reg = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    let phone_validate = false;
    let name_validate = false;
    let email_validate = false;
    if (info.p_phone || info.p_name) {
      phone_validate = phoneRegex.test(info.p_phone);
      name_validate = name_reg.test(info.p_name);
      email_validate = emailRegex.test(info.p_email);
    }
    // const bodyFormData = new FormData();
    // bodyFormData.append('name', p_name);
    // bodyFormData.append('phone', p_phone);
    // bodyFormData.append('query', query);
    // bodyFormData.append('email', p_email);
    const {
      p_name: name = '',
      p_email: email = '',
      p_phone: phone = '',
      query: message = '',
      subject = '',
    } = info;

    const bodyData = {
      edcontactName: name,
      edcontactemail: email,
      subject: subject,
      phone: phone,
      message: message,
    };
    // console.log(bodyData, 'bodyData....CONTACTUS');
    if (validate == true) {
      if (info.p_phone == '' || phone_validate == false) {
        setPhoneError(true);
      } else {
        setPhoneError(false);
      }
      if (info.p_name == '' || name_validate == false) {
        setnameError(true);
      } else {
        setnameError(false);
      }
      // if (info.p_email == '' || email_validate == false) {
      //   setEmailError(true);
      // } else {
      //   setEmailError(false);
      // }
      if (info.query == '') {
        setqueryError(true);
      } else {
        setqueryError(false);
      }
      ToastAndroid.showWithGravityAndOffset(
        trans('Please Enter Valid Input'),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (name_validate == false) {
      ToastAndroid.showWithGravityAndOffset(
        trans('Please Enter Valid Name'),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (phone_validate == false) {
      setPhoneError(true);
      ToastAndroid.showWithGravityAndOffset(
        trans('Please Enter Valid Phone Number'),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (emailError == true) {
      setEmailError(true);
      ToastAndroid.showWithGravityAndOffset(
        trans('Please Enter Valid Email Id'),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      // ToastAndroid.showWithGravityAndOffset(
      //   'Your query sended successfully',
      //   ToastAndroid.LONG,
      //   ToastAndroid.BOTTOM,
      //   25,
      //   50,
      // );
      // dispatch(createContactApi(bodyFormData, navigation));
      createContactApi(bodyData, handleCallback);
    }
  };

  const goBackFunc = () => {
    //navigation.popToTop()
    navigation.goBack();
  }

  useEffect(() => {
    navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', () => {
        goBackFunc()
        return true;
      });
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        goBackFunc()
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
          label1={trans('Contact Us')}
          // label2={`{Std - ${stage}`}
          // label2={`${trans('Std')}-${stage}`}
          isbackIconShow={true}
          functionName={() => goBackFunc()}
        />

        <Animatable.View
          animation="fadeInUpBig"
          style={{
            flex: Platform.OS === 'ios' ? 3 : 12,
            // backgroundColor: '#fff',
            backgroundColor: 'rgba(0,255,0, 0.05)',
            // borderTopLeftRadius: 15,
            // borderTopRightRadius: 15,
            paddingHorizontal: 20,
            // paddingBottom: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                height: 100,
                width: 60,
                // borderWidth:1,
                // marginLeft: 10,
                // backgroundColor: '#fff',
                // position: "absolute",
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <FastImage
                style={{ height: 90, width: '100%' }}
                source={require('../../../assets/NOTEVOOK.jpeg')}
                resizeMode="contain"
              />
            </View>
            <View style={{ width: '80%', margin: 25, borderWidth: 0 }}>
              <Text style={{ fontSize: 25, fontWeight: '900', color: '#FFB901' }}>
                {trans('Need Help ?')}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  marginTop: 10,
                  color: '#fff',
                  fontWeight: 'bold',
                }}>
                {trans('Send your query to get help')}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              borderRadius: 10,
              paddingHorizontal: 5,
              borderWidth: 2,
              // backgroundColor:  '#FFB901',
              backgroundColor: '#fff',
              paddingVertical: 10,
              width: '100%',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: '#FFB901',
              // height: '20%',
            }}
            onPress={() => Linking.openURL('whatsapp://send?phone=7008699927')}>
            <FontAwesome
              name={'whatsapp'}
              size={25}
              color={'#0f6f25'}
              // whatsapp://send?text=hello&phone=7008699927'
              onPress={() =>
                Linking.openURL('whatsapp://send?phone=7008699927')
              }
            />
            <Text
              style={{
                left: 15,
                fontSize: 15,
                color: '#0f6f25',
                fontWeight: '800',
              }}>
              {trans('Whatsapp Us')}
            </Text>
          </TouchableOpacity>
          <ScrollView style={{ marginVertical: 20 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text_footer}>{trans('Name')} </Text>
              {nameError ? (
                <Text style={{ color: Colors.red, fontWeight: 'bold' }}>*</Text>
              ) : (
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>*</Text>
              )}
            </View>
            <View style={styles.action}>
              <TextInput
                placeholder={trans('Name')}
                placeholderTextColor={'#fff'}
                value={p_name}
                onChangeText={val => handleInputChange('p_name', val)}
                style={[styles.textInput]}
              />
            </View>
            {nameError && (
              <Text
                style={{ color: Colors.red, marginBottom: 5, fontWeight: '600' }}>
                {trans('Please Enter Your Name')}
              </Text>
            )}
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text_footer}>{trans('Phone Number')} </Text>
              {phoneError ? (
                <Text style={{ color: Colors.red, fontWeight: 'bold' }}>*</Text>
              ) : (
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>*</Text>
              )}
            </View>
            <View style={styles.action}>
              <TextInput
                placeholder={trans('Phone Number')}
                placeholderTextColor={'#fff'}
                value={p_phone}
                keyboardType="numeric"
                onChangeText={val => handleInputChange('p_phone', val)}
                style={styles.textInput}
              />
            </View>
            {phoneError && (
              <Text
                style={{ color: Colors.red, marginBottom: 5, fontWeight: '600' }}>
                {trans('Please Enter Valid Phone Number')}
              </Text>
            )}

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text_footer}>{trans('Email')} </Text>
              {/* {emailError ? (
              <Text style={{color: Colors.red, fontWeight: 'bold'}}>*</Text>
            ) : (
              <Text style={{color: '#fff', fontWeight: 'bold'}}>*</Text>
            )} */}
            </View>
            <View style={styles.action}>
              <TextInput
                placeholder={trans('Email')}
                placeholderTextColor={'#fff'}
                value={p_email}
                // keyboardType="numeric"
                onChangeText={val => handleInputChange('p_email', val)}
                style={styles.textInput}
              />
            </View>
            {emailError && (
              <Text
                style={{ color: Colors.red, marginBottom: 5, fontWeight: '600' }}>
                {trans('Please Enter Valid Email Id')}
              </Text>
            )}

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text_footer}>{trans('Your Query')} </Text>
              {queryError ? (
                <Text style={{ color: Colors.red, fontWeight: 'bold' }}>*</Text>
              ) : (
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>*</Text>
              )}
            </View>
            <View style={styles.action}>
              <TextInput
                placeholder={trans('Your Query')}
                placeholderTextColor={'#fff'}
                value={query}
                multiline={true}
                numberOfLines={5}
                textAlignVertical="top"
                onChangeText={val => handleInputChange('query', val)}
                style={styles.textInput}
              />
            </View>
            {queryError && (
              <Text
                style={{ color: Colors.red, marginBottom: 5, fontWeight: '600' }}>
                {trans('Please Enter Your Query')}
              </Text>
            )}
            <View style={[styles.button, {}]}>
              <TouchableOpacity
                style={[
                  styles.signIn,
                  {
                    backgroundColor: '#fff',
                    borderWidth: 2,
                    borderColor: '#FFB901',
                  },
                ]}
                onPress={() => {
                  submitForm();
                }}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      fontSize: 15,
                      fontWeight: '700',
                      color: 'green',
                    },
                  ]}>
                  {trans('Send us your query')}
                </Text>
                {/* </LinearGradient> */}
              </TouchableOpacity>

              {/* <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                submitForm();
              }}>
              
              <View
                style={[
                  styles.signIn,
                  {backgroundColor: '#2f60e2', borderRadius: 10},
                ]}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  Sign Up
                </Text>
              </View>
            </TouchableOpacity> */}
            </View>

            {/* <View style={{paddingLeft: 7, marginTop: 30}}>
            <Text style={{color:Colors.primary, fontWeight: '900', fontSize: 26}}>
              Need Help ?
            </Text>
            <Text style={{fontSize: 16, color: colors.text}}>
              Are you facing problems, you can talk to our customer supports
            </Text>
            <TouchableOpacity
              style={{display: 'flex', flexDirection: 'row'}}
              onPress={() => Linking.openURL(`tel:${7008699927}`)}>
              <View
                style={{
                  backgroundColor: Colors.white,
                  borderRadius: 1000,
                  height: 30,
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Ionicons style={{color: '#50B450'}} name="call" size={22} />
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{
                    marginRight: 10,
                    fontWeight: '700',
                    color: Colors.primary,
                  }}>
                  +91 7008699927
                </Text>
              </View>
            </TouchableOpacity>
          </View> */}
            <TouchableOpacity
              style={{
                width: '100%',
                marginVertical: 10,
                alignSelf: 'center',
                paddingLeft: 12,
                // width: device_width * 0.97,
                flexDirection: 'row',
                alignItems: 'center',
                elevation: 5,
                // borderWidth:1,
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
                  style={{ fontSize: 25, color: '#fff' }}
                />
              </View>
              <View style={{ width: '85%', marginLeft: 5, borderWidth: 0 }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '700',
                    // color: Colors.primary,
                    color: '#333',
                    paddingLeft: 10,
                  }}>
                  {trans('Help Desk')}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    // color: Colors.primary,
                    color: '#333',
                    paddingLeft: 10,
                  }}>
                  {trans(
                    'If you encounter any issues on our Noteved Academy digital platform, please contact our support team and provide all relevant details using the provided numbers :- 9861302757,7008699927,9337052091',
                  )}
                  {/* {trans('Contact our customer care')} */}
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </Animatable.View>
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
              minWidth: device_width * 0.9,
              // borderRadius: 15,
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
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                <View
                  style={{
                    borderRadius: 15,
                    // borderWidth: 1,
                    minHeight: device_height * 0.6,
                    minWidth: device_width * 0.9,
                    // backgroundColor: '#fff',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <View style={{ alignItems: 'center' }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            paddingVertical: 15,
                            width: device_width * 0.8,
                            fontSize: 17,
                            color: '#fff',
                            marginTop: 25,
                            marginLeft: 10,
                            fontWeight: '900',
                          }}>
                          {trans(
                            'Are you facing any problem in our NoteVed digital platform ?',
                          )}
                        </Text>
                        <Text
                          style={{
                            textAlign: 'center',
                            width: device_width * 0.7,
                            fontSize: 15,
                            color: '#fff',
                            // marginTop: 5,
                            // marginLeft: 5,
                            fontWeight: '500',
                          }}>
                          {trans('Then contact our service agent immediately')}
                        </Text>
                        <Text
                          style={{
                            textAlign: 'center',
                            // width: device_width * 0.7,
                            fontSize: 15,
                            color: '#f1a722',
                            // marginTop: 5,
                            // marginLeft: 5,
                            fontWeight: '700',
                          }}>
                          {trans('Contact No. :')}
                        </Text>
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
                          borderRadius: 50,
                        }}
                        onPress={() => setHelp(false)}
                      />
                    </View>
                    <View
                      style={{
                        // borderWidth: 1,
                        // paddingVertical: 10,
                        alignItems: 'center',
                        marginTop: 10,
                        marginLeft: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        // padding: 10,
                      }}>
                      <TouchableOpacity
                        style={{ display: 'flex', flexDirection: 'row' }}
                        onPress={() => Linking.openURL(`tel:${9861302757 }`)}>
                        <View
                          style={{
                            backgroundColor: Colors.white,
                            borderRadius: 1000,
                            height: 30,
                            width: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5,
                          }}>
                          <Ionicons
                            style={{ color: '#50B450' }}
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
                              color: '#FFB901',
                            }}>
                            +91 9861302757 
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ display: 'flex', flexDirection: 'row' }}
                        onPress={() => Linking.openURL(`tel:${7008699927}`)}>
                        <View
                          style={{
                            backgroundColor: Colors.white,
                            borderRadius: 1000,
                            height: 30,
                            width: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5,
                          }}>
                          <Ionicons
                            style={{ color: '#50B450' }}
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
                              color: '#FFB901',
                            }}>
                            +91 7008699927
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        // borderWidth: 1,
                        // paddingVertical: 10,
                        alignItems: 'center',
                        marginTop: 10,
                        marginLeft: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        // padding: 10,
                      }}>
                      <TouchableOpacity
                        style={{ display: 'flex', flexDirection: 'row' }}
                        onPress={() => Linking.openURL(`tel:${9337052091}`)}>
                        <View
                          style={{
                            backgroundColor: Colors.white,
                            borderRadius: 1000,
                            height: 30,
                            width: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5,
                          }}>
                          <Ionicons
                            style={{ color: '#50B450' }}
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
                              color: '#FFB901',
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
                  //source={require('../../../assets/resting1.png')}
                  //resizeMode="contain"
                />
                <FastImage
                  style={{
                    height: 30,
                    width: '100%',
                    // borderWidth: 1,
                    borderColor: 'blue',
                    // position:'absolute', bottom:-23
                    // marginTop:-8
                  }}
                  //source={require('../../../assets/grass.png')}
                  //resizeMode="contain"
                />
              </View>
            </View>
          </ImageBackground>
        </Modal>
        {sucessMessage && (
          <Modal transparent={true} visible={sucessMessage}>
            <View
              style={{
                backgroundColor: '#fff',
                flex: 1,
                // borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                <View
                  style={{
                    borderRadius: 15,
                    // borderWidth: 1,
                    minHeight: device_height * 0.4,
                    minWidth: device_width * 0.9,
                    backgroundColor: '#0f6f25',
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
                            // height: 20,
                            // width: device_width,
                            marginLeft: 5,
                            // backgroundColor: '#fff',
                            // backgroundColor:  '#0f6f25',
                            // position: "absolute",
                            alignItems: 'center',
                            alignSelf: 'center',
                            // borderWidth: 2,
                          }}>
                          <FastImage
                            style={{ height: 40, width: 40 }}
                            source={require('../../../assets/NOTEVOOK.jpeg')}
                            resizeMode="contain"
                          />
                        </View>

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
                          {trans(
                            'Thanks for contacting with NoteVed Academy Support',
                          )}
                        </Text>
                        <Text
                          style={{
                            textAlign: 'center',
                            width: device_width * 0.7,
                            fontSize: 15,
                            color: '#fff',
                            marginTop: 5,
                            // marginLeft: 5,
                            fontWeight: '500',
                          }}>
                          {trans(
                            'We received your query and hope we will get contact to you soon',
                          )}
                        </Text>
                      </View>
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
                          backgroundColor: '#FFB901',
                          // width: '100%',
                          paddingVertical: 5,
                          justifyContent: 'center',
                        }}
                        onPress={() => closeFunction()}>
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
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ContactUs;

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
    color: '#FFB901',
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
    color: '#fff',
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
  },
  signIn: {
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
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
