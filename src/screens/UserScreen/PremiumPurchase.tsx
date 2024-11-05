import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Picker,
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
  RefreshControl,
  ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import Icon from 'react-native-vector-icons/Ionicons';
import {Modal} from 'react-native-paper';
// import moment from 'moment';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {
  IsTabScreen,
  emailRegex,
  getCurrentDateTime,
  name_reg,
  phoneRegex,
} from '../../../constants/Constants';
import Colors from '../../../assets/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';
// import {
//   couponCodeDiscountApi,
//   craeteScholarshipMembershipApi,
//   createContactApi,
//   getChildDetailsAPI,
//   getDiwaliCouponAPI,
//   getPremiumAccessAPI,
//   getScholarshipPremiumAPI,
//   getSignatureVerification,
//   getTopicBySubClassAPI,
// } from '../../redux/actions/Action';
import {device_height, device_width} from '../style';
import colors from '../../../constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {API_URL} from '../../../constants/ApiPaths';
import RazorpayCheckout from 'react-native-razorpay';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../../redux/store/Store';
import {
  getChildDetailsAPI,
  selectStudentInfo,
} from '../../redux/reducers/StudentInfoReducer';
import {
  getCouponAPI,
  selectCouponData,
} from '../../redux/reducers/GetAvailableCouponOfferReducer';
import CommonMessage from '../../../constants/CommonMessage';
import Header from '../CommonScreens/Header';
import {
  couponCodeDiscountApi,
  craeteScholarshipMembershipApi,
  getSignatureVerification,
} from '../../redux/actions/ScholarshipPremiumAPI';

const PremiumPurchase = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const device_width = Dimensions.get('window').width;
  const device_height = Dimensions.get('window').height;
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
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
    scholarship: [];
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
  const childInfo = useAppSelector(selectStudentInfo) as ChildInfo;
  // const PremiumPurchase = useAppSelector(selectPremiumPurchase)
  // console.log(PremiumPurchase, 'PremiumPurchase..........');
  // const ScholarshipList = useAppSelector(selectPremiumAccess)
  // console.log(ScholarshipList, 'ScholarshipList..........');
  const AvailableCoupon = useAppSelector(selectCouponData);
  const {t: trans, i18n} = useTranslation();
  const [CouponAvailable, setdCouponAvailable] = useState(false);
  
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
    dispatch(getChildDetailsAPI(childid));
    dispatch(getCouponAPI());
    if (AvailableCoupon.length > 0) {
      setdCouponAvailable(true);
    }
  }, []);

  const AvlCouponEnglishMsg = AvailableCoupon.map(rec => rec.engmessage);
  const AvlCouponOdiaMsg = AvailableCoupon.map(rec => rec.odmessage);
  const AvlCouponHindiMsg = AvailableCoupon.map(rec => rec.hinmessage);
  const {
    selectedscholarship = [],
    scholarshipName = '',
    couponcode = '',
    screenName = '',
    subjectId = '',
    subjectName = '',
    topicid = '',
    topicName = '',
    ExamQuestionsets = [],
    isScoreBoardFlag = '',
    is2ndAvailable = '',
    index = '',
    quizList = [],
    showFeedback = '',
    licenseRec = '',
  } = route.params;
  console.log(screenName, 'screennnnnnnnn');
  // console.log(
  //   // selectedscholarship,"selectedscholarship",
  //   // scholarshipName,"scholarshipName",
  //   // couponcode,"couponcode",
  //   // screenName ,"screenName",
  //   // subjectId ,"subjectId",
  //   // subjectName,"subjectName",
  //   // topicid,"topicid",
  //   // topicName,"topicName",
  //   // ExamQuestionsets,"ExamQuestionsets",
  //   // isScoreBoardFlag,"isScoreBoardFlag",
  //   // is2ndAvailable,"is2ndAvailable",
  //   // index,"index",
  //   // quizList,"quizList",
  //   // showFeedback,"showFeedback",
  //   licenseRec,"licenseRec",
  //   ".................ROUTE"

  // )
  // const {, "amount": 1800, "boardid": "1", "boardname": "BSE", "couponcode": "ABC10", "createon": "2023-11-14T14:35:55.138Z", "discountamount": 0, "durationDays": 365, "gstamount": 0, "gstpercentage": 0, "licenseid": "ADA51690528084298", "licensename": "Adarsh & Navodaya", "licensestatus": "active", "offeramount": 1201, "offerpercentage": 33, "paidtotalamount": 599, "scholarshipid": "NVOOKADA1690811843420", "scholarshipimage": "https://notevook.s3.ap-south-1.amazonaws.com/Odisha+Adarsha+Vidyalaya+logo.jpg", "scholarshipname": "Adarsh", "stage": "STD-5", "stageid": "5", "updatedon": "2023-11-14T14:35:55.138Z"}=licenseRec
  const [modalStatus, setModalStatus] = useState(false);
  // useEffect(() => {
  //   setModalStatus(true)
  // }, [])

  const {
    boardid = '',
    boardname = '',
    // couponcode = '',
    createon = '',
    durationDays = '',
    gstamount = '',
    gstpercentage = '',
    licenseid = '',
    licensename = '',
    offeramount = '',
    offerpercentage = '',
    paidtotalamount = '',
    scholarshipid = '',
    scholarshipimage = '',
    scholarshipname = '',
    stage = '',
    stageid = '',
    updatedon = '',
  } = licenseRec[0];
  // } = selectedscholarship[0];

  // console.log(licenseRec[0],"licenseRec[0]...........")
  const [isReferalCode, setisReferalCode] = useState(false);
  const [succesCodeModal, setsuccesCodeModal] = useState(false);

  const [isReferalCodeamount, setisReferalCodeAmount] = useState(null);

  const [isReferalCodePercentage, setisReferalCodePercentage] = useState(null);
  const [messageResponse, setMessageResponse] = useState(null);
  console.log(
    messageResponse,
    'messageResponse......................................',
  );
  const [referalError, setReferalError] = useState(false);
  const [discountCode, setdiscountCode] = useState(false);

  const [info, setInfo] = useState({
    referalCode: '',
  });
  const {referalCode} = info;

  const handleReferal = (inputName: any, inputValue: any) => {
    //

    if (inputName == 'referalCode') {
      //

      if (inputValue != '') {
        if (inputValue.length <= 2) {
          setReferalError(true);
          setisReferalCodeAmount(null);
          setisReferalCodePercentage(null);
          setMessageResponse(null);
        } else {
          setReferalError(false);
          setMessageResponse(null);
          setisReferalCodeAmount(null);
          setisReferalCodePercentage(null);
        }
      } else {
        setMessageResponse(null);
        setReferalError(false);
        setisReferalCodeAmount(null);
        setisReferalCodePercentage(null);
      }
    }
    let infodata = {...info};
    setInfo({...infodata, [inputName]: inputValue});
  };
  const referalCodeFunction = () => {
    //
    if (info.referalCode == '') {
      setReferalError(true);
    } else {
      const referalBody = {
        licenseid: licenseid,
        couponcodeid: referalCode,
      };

      couponCodeDiscountApi(referalBody, refralCallback);
      // setReferalError(false);
      // setisReferalCode(!isReferalCode);
    }
  };

  const manualReferal = () => {
    console.log('called');
    setInfo({...info, ['referalCode']: couponcode});
    setdCouponAvailable(false);
    const referalBody = {
      licenseid: licenseid,
      couponcodeid: couponcode,
    };
    couponCodeDiscountApi(referalBody, refralCallback);
  };
  console.log('called', info);

  const refralCallback = (
    updatedAmount: any,
    percentage: any,
    message: any,
  ) => {
    console.log(message, 'updatedAmount, percentage, message');
    if (message == 'Coupon code not found') {
      setMessageResponse(message);
    }
    if (message == 'Successfully coupon applied!') {
      setisReferalCodeAmount(updatedAmount);
      setisReferalCodePercentage(percentage);

      // setsuccesCodeModal(true);
      setTimeout(() => {
        setsuccesCodeModal(false);
      }, 3000);
    }
    //
  };
  const removecode = () => {
    setReferalError(false);
    setInfo({referalCode: ''});
    // setisReferalCode('');
  };
  // const {userInfo = {}} = useSelector(state => state.UserInfoReducer);

  // const {
  //   _id: id = '',
  //   parentid = '',
  //   fname = '',
  //   lname = '',
  //   email = '',
  //   phone: parentPhone = '',

  //   // coordinates='',
  // } = userInfo;
  // const userName = fname + ' ' + lname;
  // console.log(
  //   userInfo,
  //   'userInfo..............',
  //   userName,
  //   'parentPhone........',
  // );

  // const {user = []} = childInfo;
  const {
    _id: id = '',
    stageid: stageID = '',
    childid = '',
    boardid: boardID = '',
    stage: standard = '',
    scholarship = [],
    name: userName = '',
    fname = '',
    lname = '',
    email = '',
    phone = '',
    image = '',
    age = '',
    address = '',
    language = '',
    // coordinates='',
  } = childInfo;
  const totalAmount = isReferalCodeamount;
  const initialAmount = paidtotalamount;

  // console.log(totalAmount,initialAmount)
  const date = new Date();
  const dateValue = moment(date).format('YYYY-MM-DD') + 'T00:00:000Z';

  const createOn = dateValue;
  const updatedOn =
    moment(dateValue)
      .add(durationDays.toString(), 'days')
      .format('YYYY-MM-DD') + 'T00:00:000Z';
  //  const childData=child.map(rec=>rec._id)
  // const{childid='',stageid = '', boardid = '',}=child[0]
  //
  //
  //

  const now = new Date();
  const duedate = new Date(now);
  duedate.setDate(now.getDate() + 365);

  const nowDate = now.toISOString();
  const dueDatedata = duedate.toISOString();

  const callBack = () => {
    // navigation.navigate('UserHome');
    setModalStatus(true);
    ToastAndroid.showWithGravityAndOffset(
      trans('Successfully payment completed'),
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };
  const handleCallback = async razorpay_payment_id => {
    const bodyData = {
      // childid: childid,
      // parentid: '',
      // licensename: licensename,
      // licenseid: licenseid,
      // duration: durationDays,
      // startdate: nowDate,
      // enddate: dueDatedata,
      // childname: userName,
      // parentname: '',
      // scholarshipid: scholarshipid,
      // scholarshipname: licensename,
      // scholarshipimage: scholarshipimage,
      // stageid: stageid,
      // stage: stage,
      // boardid: boardid,
      // boardname: boardname,
      // amountpaid: isReferalCodeamount ? totalAmount : initialAmount,
      // couponapplied: 'false',
      // coupondiscountamount: '',
      // offerapplied: 'true',
      // offerdiscountamount: offeramount,
      // paymentid: razorpay_payment_id,

      childid: childid,
      licensename: licensename,
      licenseid: licenseid,
      durationDays: durationDays,
      gstamount: gstamount,
      offerpercentage:offerpercentage,
      paidtotalamount: paidtotalamount,
      startdate: nowDate,
      enddate: dueDatedata,
      childname: userName,
      scholarshipid: scholarshipid,
      scholarshipname: licensename,
      scholarshipimage: scholarshipimage,
      amountpaid: isReferalCodeamount ? totalAmount : initialAmount,
      couponapplied: 'false',
      discountamount: '',
      offerapplied: 'true',
      offerdiscountamount: offeramount,
      paymentid: razorpay_payment_id,
      membershipstatus:'',
      membershipname:'',
    };
    console.log(bodyData, '................bodyData................');
    craeteScholarshipMembershipApi(bodyData, callBack);
  };
  const handlePurchase = async () => {
    const totalAmount = isReferalCodeamount + '00';
    const initialAmount = paidtotalamount + '00';
    const data = await axios.post(API_URL + '/edsubscription', {
      amount: isReferalCodeamount ? totalAmount : initialAmount,
    });
    var options = {
      description: 'Subscription Payment',
      image: 'https://notevook.s3.ap-south-1.amazonaws.com/Noteved+logo.jpeg',
      // 'https://wkresources.s3.ap-south-1.amazonaws.com/1691151621228_65595701.png',
      // image: require('../../../assets/NOTEVOOK.jpeg'),
      currency: 'INR',
      // key: 'rzp_test_PioX2Xi5hjQ6Om', //test api key
      // key: 'rzp_live_rBFsxA1CJU1sJU', //Live Api key
      //  key:'rzp_test_AzAWvJ1AuuO42Z',
      key:"rzp_live_RVPKXDqNlyFMke",  //new prod
      amount: data.data.data.amount.toString(),
      // amount: '1000',
      name: 'NoteVed Academy',
      order_id: data.data.data.id,
      prefill: {
        name: userName,
        email: email,
        contact: phone,
      },
      theme: {color: '#fff'},
    };

    RazorpayCheckout.open(options)
      .then(response => {
        if (response.razorpay_payment_id) {
          const bodydata = {
            userid: childid,
            amount: data.data.data.amount.toString(),
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };

          getSignatureVerification(bodydata, handleCallback);
        } else {
          CommonMessage('Razorpay SDK fails to load. Are you online?');
        }
      })
      .catch(error => {
        Alert.alert('Oops!', 'Could not complete payment.', [{text: 'Retry'}]);
        // setLoading(false);
      });
  };
  const closeModalFunc = () => {
    setModalStatus(false);
      navigation.navigate('UserProfile', {
        screenName: '',
        subjectId: '',
        subjectName: '',
        topicid: '',
        topicName: '',
        ExamQuestionsets: '',
        isScoreBoardFlag: '',
        is2ndAvailable: '',
        index: '',
        quizList: '',
        showFeedback: '',
      });
    };
  return (
    <View style={{flex: 1}}>
      {/* <StatusBar backgroundColor={'#def'} barStyle="dark-content" /> */}
      {/* <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'center',
          alignItems: 'center',
          top: 0,
          left: 20,
          borderWidth:1
        }}>
        <AntDesign
          color={Colors.primary}
          name="left"
          size={20}
          backgroundColor={'#def'}
          style={{borderWidth:1}}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            color: Colors.primary,
            fontSize: 20,
            fontWeight: '600',
            marginLeft: 10,
          }}>
          {'Payment'}
        </Text>
      </View> */}
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
          label1={trans('Payment')}
          isbackIconShow={true}
          functionName={() => navigation.goBack()}
        />
        <View style={{height: device_height * 0.65}}>
          <TouchableOpacity
            disabled={AvailableCoupon.length == '' ? true : false}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: device_width * 0.95,
              backgroundColor: '#FFB901',
              marginTop: 30,
              borderRadius: 20,
              paddingHorizontal: 15,
              marginHorizontal: 10,
            }}>
            {AvailableCoupon.length != '' ? (
              <TextInput
                placeholder={trans('Enter Referal Code')}
                placeholderTextColor={'#0f6f25'}
                value={referalCode}
                style={{
                  // borderWidth:1,
                  width: '60%',
                  color: '#0f6f25',
                  fontWeight: 'bold',
                  // marginHorizontal: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  //   height: 30,
                }}
                autoCapitalize="none"
                // onChangeText={(val) => textInputChange(val)}
                // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                onChangeText={val => handleReferal('referalCode', val)}
              />
            ) : (
              <View
                style={{
                  // borderWidth:1,
                  width: '60%',
                  // color: '#0f6f25',
                  // marginHorizontal: 15,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  height: 40,
                }}>
                <Text
                  style={{
                    color: '#0f6f25',
                    fontWeight: 'bold',
                    textAlign: 'left',
                  }}>
                  {trans('Enter Referal Code')}
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={{
                width: '35%',
                // borderWidth:1,
                alignSelf: 'center',
                alignItems: 'flex-end',
                paddingVertical: 10,
              }}
              disabled={AvailableCoupon.length == '' ? true : false}
              onPress={() => {
                isReferalCode == false && referalError == false
                  ? referalCodeFunction()
                  : removecode();
              }}>
              {isReferalCode == false && referalError == false ? (
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#0f6f25',
                    fontSize: 15,
                    textDecorationLine: 'underline',
                  }}>
                  {isReferalCodeamount ? trans('Applied') : trans('Apply')}
                </Text>
              ) : (
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'red',
                    fontSize: 15,
                    textDecorationLine: 'underline',
                  }}>
                  {trans('Remove')}
                </Text>
              )}
            </TouchableOpacity>
          </TouchableOpacity>
          <View style={{marginLeft: 20, marginTop: 5}}>
            {referalError && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text
                  style={{
                    color: Colors.red,
                    marginBottom: 10,
                    fontWeight: '600',
                  }}>
                  {trans('Please Enter Valid Referal Code')}
                </Text>
              </Animatable.View>
            )}
            {messageResponse ? (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text
                  style={{
                    color: Colors.red,
                    marginBottom: 10,
                    fontWeight: '600',
                  }}>
                  {trans('Wrong Coupon Code Entered')}
                </Text>
              </Animatable.View>
            ) : (
              <></>
            )}
          </View>

          {isReferalCodeamount ? (
            <Text
              style={{
                textAlign: 'center',
                marginLeft: 15,
                fontWeight: 'bold',
                color: '#FFB901',
                fontSize: 18,
                marginTop: 10,
              }}>
              {trans('Coupon Code Applied')}
            </Text>
          ) : (
            <></>
          )}
          <ScrollView>
            <View
              style={{
                borderColor: '#fff',
                borderRadius: 15,
                paddingHorizontal: 20,
                paddingVertical: 20,
                padding: 10,
                marginTop: 20,
                marginHorizontal: 10,
                bottom: 10,
                //   borderWidth: 1,
              }}>
              <View>
                {licenseRec.map((item, index) => {
                  {
                    /* {selectedscholarship.map((item, index) => { */
                  }
                  const {
                    _id = '',
                    scholarshipname = '',
                    amount = '',
                    paidtotalamount = '',
                    discountvalue = '',
                    offeramount = '',
                    gstpercentage = '',
                    gstamount = '',
                    licensename = '',
                  } = item;

                  return (
                    <View key={index}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          // borderWidth: 1,
                          marginTop: 5,
                        }}>
                        {/* <Text
                          style={{
                            color: '#fff',
                            fontSize: 15,
                            fontWeight: '700',
                          }}>
                          {trans('Scholarship Name')}
                        </Text> */}
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 15,
                            fontWeight: '700',
                            // width: IsTabScreen ? device_width * 0.6 : device_width * 0.45
                          }}>
                          {licensename}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          // borderWidth:1,
                          marginTop: 5,
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 15,
                            fontWeight: '700',
                          }}>
                          {trans('Payment Details')}
                        </Text>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 15,
                            fontWeight: '700',
                          }}>
                          ₹ {amount}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          // borderBottomColor:"gray",
                          marginTop: 5,
                        }}>
                        <Text
                          style={{
                            color: 'red',
                            fontSize: 15,
                            fontWeight: '700',
                          }}>
                          {trans('Discount Amount')}
                        </Text>
                        <Text
                          style={{
                            color: 'red',
                            fontSize: 15,
                            fontWeight: '700',
                          }}>
                          {' '}
                          {/* - ₹ {discountvalue} */}- ₹ {offeramount}
                        </Text>
                      </View>

                      {/* <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // borderBottomColor:"gray",
                        marginTop: 5,
                      }}>
                      <Text
                        style={{color: '#fff', fontSize: 15, fontWeight: '500'}}>
                        {'Amount'}
                      </Text>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 15,
                          fontWeight: '500',
                        }}>
                        {' '}
                        ₹ {discountamount}
                      </Text>
                    </View> */}
                      {gstamount != '' && (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            //   borderBottomColor: 'gray',
                            //   borderBottomWidth: 0.2,
                            marginTop: 5,
                          }}>
                          <Text
                            style={{
                              color: '#000',
                              fontSize: 15,
                              fontWeight: '700',
                            }}>
                            {trans('GST')} {`${gstpercentage}%`}
                          </Text>
                          <Text
                            style={{
                              color: '#000',
                              fontSize: 15,
                              fontWeight: '700',
                            }}>
                            {'+ ₹'} {gstamount}
                          </Text>
                        </View>
                      )}
                    </View>
                  );
                })}

                {isReferalCodeamount ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      //   borderBottomColor: 'gray',
                      //   borderBottomWidth: 0.2,
                      marginTop: 5,
                    }}>
                    <Text
                      style={{color: 'red', fontSize: 15, fontWeight: '700'}}>
                      {trans('Coupon Code Applied')}
                    </Text>
                    <Text
                      style={{color: 'red', fontSize: 15, fontWeight: '700'}}>
                      {'- ₹'} {isReferalCodePercentage}
                    </Text>
                  </View>
                ) : (
                  <></>
                )}

                {isReferalCode == false ? (
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderTopColor: 'gray',
                      borderTopWidth: 0.8,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 17,
                        marginTop: 10,
                        fontWeight: '800',
                      }}>
                      {trans('Total Amount')}
                    </Text>
                    {licenseRec.map((item, index) => {
                      {
                        /* {selectedscholarship.map((item, index) => { */
                      }
                      const {
                        _id = '',
                        scholarshipname = '',
                        amount = '',
                        paidtotalamount = '',
                        discountvalue = '',
                        offeramount = '',
                        gstpercentage = '',
                        gstamount = '',
                      } = item;

                      return (
                        <Text
                          key={index}
                          style={{
                            color: '#fff',
                            fontSize: 17,
                            fontWeight: '700',
                            marginTop: 10,
                          }}>
                          {' '}
                          ₹
                          {isReferalCodeamount
                            ? isReferalCodeamount
                            : paidtotalamount}
                        </Text>
                      );
                    })}
                  </View>
                ) : (
                  <View
                    style={{
                      marginTop: 15,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderTopColor: 'gray',
                      borderTopWidth: 0.3,
                    }}>
                    <Text
                      style={{color: '#fff', fontSize: 16, fontWeight: '700'}}>
                      {trans('TotalAmount')}
                    </Text>
                    {/* <Text
                    style={{color: '#000', fontSize: 15, fontWeight: '500'}}>
                    {' '}
                    ₹ {'totalAmountReferal'}
                  </Text> */}
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </View>

        <View>
          <TouchableOpacity
            //   disabled={isScholarBuy == ''}
            style={{
              width: '80%',
              borderRadius: 10,
              backgroundColor: '#FFB901',
              alignSelf: 'center',
              alignItems: 'center',
              paddingVertical: 10,
              // borderWidth:1
              // marginBottom: 20,
            }}
            onPress={() => handlePurchase()}>
            <Text style={{fontWeight: 'bold', color: '#0f6f25', fontSize: 15}}>
              {trans('BUY NOW')}
            </Text>
          </TouchableOpacity>
        </View>
        <Modal transparent={true} visible={modalStatus}>
          <View
            style={{
              borderRadius: 15,
              borderWidth: 1,
              minHeight: device_height,
              minWidth: device_width,
              backgroundColor: '#263d2d',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
              alignItems: 'center',
              //   paddingHorizontal: 20,
            }}>
            <FastImage
              style={{
                height: 200,
                width: 300,
                // position: 'absolute',
                //left: 10,
              }}
              source={require('../../../assets/CCA.png')}
              resizeMode="contain"
            />
            <AntDesign
              name="closecircleo"
              style={{
                fontSize: 38,
                color: '#fff',
                position: 'absolute',
                top: 50,
                right: 20,
                // marginTop: 10,
                backgroundColor: 'crimson',
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
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  width: device_width * 0.8,
                  fontSize: 27,
                  color: '#FFB901',
                  // marginTop: 10,
                  marginLeft: 10,
                  fontWeight: '900',
                }}>
                {trans('Thank You')}
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
                {trans('Now You Are Premium Member')}
              </Text>
            </View>
            <View
              style={{
                // borderWidth: 1,
                paddingVertical: 15,
                alignItems: 'center',
                alignSelf: 'center',
                marginTop: 10,
                // marginLeft: 10,
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
                  // marginRight: 25,
                  borderColor: '#000',
                  backgroundColor: '#fff',
                  paddingVertical: 15,
                  justifyContent: 'center',
                }}
                onPress={() => closeModalFunc()}>
                <Text
                  style={{
                    color: '#0f6f25',
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    alignItems: 'center',
                  }}>
                  {trans('OK')}
                </Text>
              </TouchableOpacity>
            </View>
            <ImageBackground
              style={{
                height: device_height * 0.23,
                width: device_width,
                position: 'absolute',
                bottom: 15,
                // top: -60,
                // borderWidth:1
              }}
              //source={require('../../../assets/jungle.png')}
              resizeMode="contain"></ImageBackground>
          </View>
        </Modal>

        {succesCodeModal && (
          <Modal transparent={true} visible={succesCodeModal}>
            <View
              style={{
                backgroundColor: '#fff',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{alignItems: 'flex-end', justifyContent: 'center'}}>
                <View
                  style={{
                    borderRadius: 15,
                    // borderWidth: 1,
                    minHeight: device_height * 0.5,
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
                      <View
                        style={{
                          // height: 120,
                          // width: device_width,
                          marginLeft: 5,
                          backgroundColor: '#fff',
                          // position: "absolute",
                          alignItems: 'center',
                          alignSelf: 'center',
                        }}>
                        <FastImage
                          style={{height: 150, width: device_width * 0.3}}
                          source={require('../../../assets/couponImage.png')}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={{alignItems: 'center', paddingVertical: 15}}>
                        <Text
                          style={{
                            textAlign: 'center',
                            width: device_width * 0.8,
                            fontSize: 35,
                            color: 'mediumpurple',
                            marginTop: 10,
                            marginLeft: 10,
                            fontWeight: 'bold',
                          }}>
                          {trans('Congratulation!')}
                        </Text>
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
                          {trans('You have successfully applied the coupon')}
                        </Text>
                      </View>
                      {/* <View
                      style={{
                        // borderWidth: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        alignSelf: 'center',
                        marginVertical: 15,
                      }}>
                      <TouchableOpacity
                        style={{
                          borderRadius: 10,
                          width: 150,
                          alignSelf: 'center',
                          alignItems: 'center',
                          backgroundColor: 'green',
                          paddingVertical: 10,
                          justifyContent: 'center',
                        }}
                        onPress={() => setsuccesCodeModal(false)}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            alignItems: 'center',
                          }}>
                          {trans('OK')}
                        </Text>
                      </TouchableOpacity>
                    </View> */}
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
                      onPress={() => setsuccesCodeModal(false)}
                    /> */}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        )}

        {CouponAvailable && (
          <Modal transparent={true} visible={CouponAvailable}>
            <View
              style={{
                backgroundColor: 'mediumpurple',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{alignItems: 'flex-end', justifyContent: 'center'}}>
                <View
                  style={{
                    borderRadius: 20,
                    borderWidth: 2,
                    // flex:1,
                    borderColor: 'mediumpurple',
                    height: device_height * 0.6,
                    minWidth: device_width * 0.8,
                    backgroundColor: 'mediumpurple',
                    flexDirection: 'column',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        // height: 120,
                        width: device_width * 0.85,
                        // marginLeft: 5,
                        borderRadius: 18,
                        borderWidth: 2,
                        borderColor: '#fff',
                        backgroundColor: '#fff',
                        // position: "absolute",
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <FastImage
                        style={{height: 182, width: device_width * 0.8}}
                        // source={{
                        //   uri: 'https://img.freepik.com/premium-vector/gift-box-with-present-gift-promotion-strategy-gift-voucher-discount-coupon-gift-certificat_112545-1284.jpg?w=1060',
                        // }}
                        source={require('../../../assets/coupongift.jpg')}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={{alignItems: 'center', paddingVertical: 15}}>
                      <Text
                        style={{
                          textAlign: 'center',
                          width: device_width * 0.8,
                          fontSize: 15,
                          color: '#fff',
                          marginTop: 10,
                          marginLeft: 10,
                          fontWeight: 'bold',
                        }}>
                        {/* {trans('Congratulation!')}  */}

                        {language == 'english'
                          ? AvlCouponEnglishMsg
                          : language == 'odia'
                          ? AvlCouponOdiaMsg
                          : AvlCouponHindiMsg}
                      </Text>
                    </View>
                    <View
                      style={{
                        // borderWidth: 1,
                        // paddingVertical: 15,
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginTop: 10,
                        // marginLeft: 10,
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
                          // marginRight: 25,
                          borderColor: '#000',
                          backgroundColor: '#FFB901',
                          paddingVertical: 8,
                          justifyContent: 'center',
                        }}
                        onPress={() => manualReferal()}>
                        <Text
                          style={{
                            color: '#0f6f25',
                            fontSize: 14,
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
    </View>
  );
};

export default PremiumPurchase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.secondary,
  },

  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  tests: {
    color: '#2f60e2',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
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

  button: {
    alignItems: 'center',
    marginTop: 50,
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

  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  checkboxContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderRadius: 15,
    paddingHorizontal: 20,
    // paddingVertical: 20,
    borderWidth: 1,
    // marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});
