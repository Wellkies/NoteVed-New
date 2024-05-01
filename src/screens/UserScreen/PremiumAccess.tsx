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
  RefreshControl,
  BackHandler,
  ImageBackground,
  SafeAreaView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import {Modal} from 'react-native-paper';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {emailRegex, name_reg, phoneRegex} from '../../../constants/Constants';
import Colors from '../../../assets/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme, FAB} from 'react-native-paper';
// import {
//   createContactApi,
//   getPremiumAccessAPI,
//   getScholarshipByClassAPI,
//   getDiwaliCouponAPI,
//   getScholarshipPremiumAPI,
// } from '../../redux/actions/Action';
import {device_height, device_width} from '../style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import AntDesign from 'react-native-vector-icons/AntDesign';
// import {
//   GET_PREMIUM_ACCESS,
//   GET_SCHOLARSHIP_LIST,
//   SET_CHILD_INFO,
// } from '../../redux/actions/actiontypes';
import {useTranslation} from 'react-i18next';
import {AuthContext} from '../../../context';
// import LoadingScreen from './LoadingScreen';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {RootState} from '../../redux/store/Store';
import {
  getScholarshipPremiumAPI,
  selectPremiumPurchase,
  selectPremiumPurchaseStatus,
} from '../../redux/reducers/GetPremiumPurchaseReducer';
import Header from '../CommonScreens/Header';
import {
  getPremiumAccessAPI,
  selectPremiumAccess,
  selectPremiumAccessStatus,
} from '../../redux/reducers/GetPremiumAccessReducer';
import {
  selectStudentInfo,
  selectStudentStatus,
} from '../../redux/reducers/StudentInfoReducer';
import {
  getCouponAPI,
  selectCouponData,
} from '../../redux/reducers/GetAvailableCouponOfferReducer';
import {useNavigation} from '@react-navigation/native';
import LoadingScreen from '../CommonScreens/LoadingScreen';

const PremiumAccess = ({route}) => {
  const {t: trans, i18n} = useTranslation();
  const {
    screenName = '',
    subjectId = '',
    subjectName = '',
    topicid = '',
    topicName = '',
    ExamQuestionsets = [],
    isScoreBoardFlag = false,
    is2ndAvailable = '',
    index = '',
    scholarshipid = '',
    scholarship_name = '',
    quizList = [],
    showFeedback = '',
  } = route.params;
  console.log(screenName, '==============screenName');
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
  const PricingAvailable = [
    {
      featureName: 'Full access to every class',
      trial: '',
      premium: require('../../../assets/check.png'),
    },
    {
      featureName: 'Take unlimited classes',
      trial: require('../../../assets/check.png'),
      premium: require('../../../assets/check.png'),
    },
    {
      featureName: 'Choose the tutor you want',
      trial: '',
      premium: require('../../../assets/check.png'),
    },
    {
      featureName: 'Downloadable content',
      trial: require('../../../assets/check.png'),
      premium: require('../../../assets/check.png'),
    },
    {
      featureName: 'Contact private tutor privately',
      trial: require('../../../assets/check.png'),
      premium: require('../../../assets/check.png'),
    },
    {
      featureName: 'Set your own courses hours',
      trial: require('../../../assets/check.png'),
      premium: require('../../../assets/check.png'),
    },
  ];

  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const count = useAppSelector(selectStudentStatus);
  const childInfo = useAppSelector(selectStudentInfo) as ChildInfo;
  const PremiumPurchase = useAppSelector(selectPremiumPurchase);
  console.log(PremiumPurchase, 'PremiumPurchase..........');
  console.log(
    PremiumPurchase.length > 0,
    "PremiumPurchase.length > 0 && paymentid == 'free7days'",
  );
  const PremiumLoading = useAppSelector(selectPremiumPurchaseStatus);
  console.log(PremiumLoading, 'PremiumLoading////////////////');
  const ScholarshipList = useAppSelector(selectPremiumAccess);
  console.log(ScholarshipList, 'ScholarshipList..........%%');
  const PremiumAccessLoad = useAppSelector(selectPremiumAccessStatus);
  console.log(PremiumAccessLoad, 'PremiumAccessLoad????????????????????');
  const AvailableCoupon = useAppSelector(selectCouponData);
  console.log(AvailableCoupon, 'AvailableCoupon........');
  useEffect(() => {
    const Predata = {childid, stageid, boardid};
    const PreAccesdata = {stageid, boardid};
    dispatch(getScholarshipPremiumAPI(Predata));
    dispatch(getPremiumAccessAPI(PreAccesdata));
    dispatch(getCouponAPI());
  }, []);

  //   const {Premium: ScholarshipList = []} = useSelector(
  //     state => state.GetPremiumAccessReducer,
  //   );
  // console.log(ScholarshipList, 'ScholarshipList...............');

  //   const {AvailableCoupon = []} = useSelector(
  //     state => state.GetAvailableCouponOfferReducer,
  //   );
  // console.log(AvailableCoupon,"AvailableCoupon...........")
  const {couponcode = ''} =
    AvailableCoupon.length > 0 ? AvailableCoupon[0] : AvailableCoupon;
  // console.log(AvailableCoupon, 'AvailableCoupon...............');

  const {signOut} = useContext(AuthContext);
  const [help, setHelp] = useState(false);

  const [scholarshipName, setScholarshipName] = useState('');
  const [selectedBtn, setSelectedbtn] = useState([]);
  const [childList, setChildList] = useState([]);
  // const [Premium, setPremium] = useState([]);
  const [isScholarshipData, setScholarshipData] = useState([]);
  const [preminumData, setPreminumData] = useState([]);
  const [ispreminumFlag, setIspreminumFlag] = useState([]);
  const [isScholarBuy, setIsScholarBuy] = useState([]);
  const [isselectedscholarship, setselectedscholarship] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedScholarshipData, setSelectedscholarshipData] = useState();
  const [scholarID, setScholarID] = useState('');

  const [licenseLastDate, setLicenseLastDate] = useState('');
  const schID = ScholarshipList[0]?._id;
  useEffect(() => {
    console.log(
      PremiumPurchase.length == 0,
      'bbbb',

      PremiumPurchase.length > 0,
      'cccccccc',
      paymentid == 'free7days',
      'dddddddd',
    );
    dataCall(ScholarshipList);
  }, [ScholarshipList]);

  const dataCall = ScholarshipList => {
    if (scholarLicenceID.length > 0 && videoLicenceID.length > 0) {
      console.log('11');
      setSelectedscholarshipData([]);
      setScholarID();
    } else if (scholarLicenceID.length > 0) {
      console.log('22');

      setSelectedscholarshipData([ScholarshipList[0]]);
      setScholarID(ScholarshipList[0]?._id);
    } else if (videoLicenceID.length > 0 && paymentid == 'free7days') {
      console.log('44');
      setSelectedscholarshipData([ScholarshipList[0]]);
      setScholarID(ScholarshipList[0]?._id);
    } else if (videoLicenceID.length > 0) {
      console.log('33');
      setSelectedscholarshipData([]);
      setScholarID();
      // setSelectedscholarshipData([ScholarshipList[0]]);
      // setScholarID(ScholarshipList[0]?._id);
    }
    // else if(PremiumPurchase.length>0 && paymentid=='free7days'){
    //  console.log("44")
    //  setSelectedscholarshipData([ScholarshipList[0]]);
    //  setScholarID(ScholarshipList[0]?._id);
    // }
    else {
      console.log('55');
      setSelectedscholarshipData([ScholarshipList[0]]);
      setScholarID(ScholarshipList[0]?._id);
    }
  };
  console.log(
    selectedScholarshipData,
    'selectedScholarshipData.........................',
  );
  const stageID = childList.stageid;
  const boardID = childList.boardid;

  const childID = childList.childid;

  // const scholarImage = [
  //   {
  //     scholarimg: require('../../../assets/Jawahar_Navodaya_Vidyalaya_logo.png'),
  //   },
  //   {
  //     scholarimg: require('../../../assets/Odisha Adarsha Vidyalaya logo.jpg'),
  //   },
  // ];

  //   const images = [
  //     require('../assets/clinicPic.jpg'), // Local image
  //     require('../assets/doctors.jpg'), // Local image
  //     require('../assets/Lab.jpg'), // Local image
  //   ];
  //   const {childInfo = {}} = useSelector(state => state.ChildDetailsReducer);
  const {
    // _id: childID = '',
    age: p_age = '',
    // child = [],
    image = '',
    imagename = '',
    childid = '',
    name = '',
    stage: standard = '',
    // boardofeducation = '',
    fathername = '',
    mothername = '',
    subscriptionStartDate = '',
    subscriptionEndDate = '',
    // isPremium = false,
    parentid: parentId = '',
    boardid = '',
    scholarship = [],
    classname = '',
    stageid = '',
    language = '',
  } = childInfo || {};

  //  console.log(childInfo,"childInfo................");
  console.log(scholarship, 'scholarship................');

  const {paymentid = '', enddate = ''} = PremiumPurchase.length
    ? PremiumPurchase[0]
    : [];

  console.log(paymentid, 'paymentid,,,,,,,,,,,,,,');
  const [scholarLicenceID, setScholarLicenseID] = useState('');
  const [videoLicenceID, setVideoLicenseID] = useState('');
  console.log(videoLicenceID, 'videoLicenceID.......');
  useEffect(() => {
    if (PremiumPurchase.length > 0) {
      handleCall(PremiumPurchase);
      //  console.log(SLicenseID, 'VIDEO', scholarLicenseID, 'SCHOLAR');
    }
  }, [PremiumPurchase]);

  const handleCall = PremiumPurchase => {
    const VLicenseID = PremiumPurchase.filter(
      rec =>
        rec.licenseid == '1704875373950' || rec.licenseid == '1705039500455',
    );
    // console.log(VLicenseID,"VLicenseID{{{{{{{{{{{{{")

    {
      if (VLicenseID.length > 0) {
        const VideoLicenseID = VLicenseID[0].licenseid;
        setVideoLicenseID(VideoLicenseID);
        // console.log(VideoLicenseID,"VideoLicenseID+++++++++++++++")
      }
    }

    const SLicenseID = PremiumPurchase.filter(
      rec =>
        rec.licenseid == '1695358760234' ||
        rec.licenseid == 'ADA51690528084298',
    );
    // console.log(SLicenseID,"sllllllllID{{{{{{{{{{")
    if (SLicenseID.length > 0) {
      const scholarLicenseID = SLicenseID[0].licenseid;
      setScholarLicenseID(scholarLicenseID);
      // console.log(scholarLicenseID, 'scholarLicenseID++++++++++.');
    }
  };

  const LicenseID = PremiumPurchase.map(
    rec =>
      rec.licenseid == '1695358760234' ||
      rec.licenseid == 'ADA51690528084298' ||
      rec.licenseid == '1704875373950' ||
      rec.licenseid == '1705039500455',
  );
  console.log(LicenseID[0], 'LicenseID[0]^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
  // if (LicenseID[0] == true) {}
  const BackBtnFunction = () => {
    if (screenName === 'ExamSets') {
      navigation.navigate('ExamSets', {
        index: index,
        subjectName: subjectName,
        topicName: topicName,
        ExamQuestionsets: ExamQuestionsets,
        Class: standard,
        subjectId: subjectId,
        boardid: boardid,
        scholarshipid: scholarshipid,
        childId: childid,
        isScoreBoardFlag: isScoreBoardFlag,
        scholarshipName: scholarship_name,
        is2ndAvailable: is2ndAvailable,
        topicid: topicid,
      });
    } else if (screenName === 'PrevYearQues') {
      navigation.navigate('PrevYearQues', {
        scholarshipId: scholarshipid,
        scholarshipName: scholarship_name,
        quizList: quizList,
        showFeedback: showFeedback,
      });
    } else if (screenName === 'ProbQuestion') {
      navigation.navigate('ProbQuestion', {
        scholarshipName: scholarship_name,
        quizList: quizList,
        showFeedback: showFeedback,
      });
    } else navigation.goBack();
    // navigation.navigate('UserHome');
  };

  const licenseId = isScholarshipData.map(rec => rec._id);
  const licenseRec = isScholarshipData;
  const licenseName = isScholarshipData.map(rec => rec.licensename);
  // console.log(
  //   licenseId,
  //   licenseRec[0],
  //   '===============licenseName',
  //   licenseName[0],
  // );
  // const licenseId1=licenseId[0]
  // const licenseRec1=licenseRec[0]
  // const licenseName1=licenseName[0]
  useEffect(() => {
    navigation.addListener('focus', () => {
      const Predata = {childid, stageid, boardid};
      const PreAccesdata = {stageid, boardid};
      dispatch(getScholarshipPremiumAPI(Predata));
      dispatch(getPremiumAccessAPI(PreAccesdata));
      dispatch(getCouponAPI());
      //   handleBuy(licenseId, licenseRec, licenseName);
      BackHandler.addEventListener('hardwareBackPress', () => {
        BackBtnFunction();
        return true;
      });
      //   dispatch(getDiwaliCouponAPI());
      if (childid) {
        // dispatch(getPremiumAccessAPI(stageid, boardid, setLoading));
        // dispatch(
        //   getScholarshipPremiumAPI(undefined, childid, stageid, boardid),
        // );
      } else {
        // dispatch({
        //   type: GET_PREMIUM_ACCESS,
        //   payload: [],
        // });
      }
    });
    return () => {
      //   dispatch(getDiwaliCouponAPI());
      handleBuy(licenseId, licenseRec, licenseName);
      BackHandler.removeEventListener('hardwareBackPress', () => {
        // navigation.goBack();
        BackBtnFunction();
        return true;
      });
    };
  }, [childid, stageid, boardid, ScholarshipList]);

  useEffect(() => {
    if (ScholarshipList.length > 0) {
      setScholarshipData(ScholarshipList);
    } else {
      setScholarshipData([]);
    }
  }, [ScholarshipList]);

  //   const AvlCouponEnglishMsg = AvailableCoupon.map(rec => rec.engmessage);
  //   const AvlCouponOdiaMsg = AvailableCoupon.map(rec => rec.odmessage);
  //   const AvlCouponHindiMsg = AvailableCoupon.map(rec => rec.hinmessage);

  // const handleBuy = (_id, item, licensename) => {
  //   const isExist = isScholarBuy.includes(_id);
  //   setScholarshipName(licensename);
  //   if (isExist) {
  //     let datalist = isScholarBuy.filter(rec => rec != _id);
  //     let updateddatalist = isselectedscholarship.filter(
  //       rec => rec._id != item._id,
  //     );
  //     // console.log(updateddatalist,"updateddatalist.............")
  //     setIsScholarBuy(datalist);
  //     setselectedscholarship(updateddatalist);
  //   } else {
  //     setIsScholarBuy([_id]);
  //     setselectedscholarship([item]);
  //     // console.log(isScholarBuy, 'isScholarBuy...................');
  //     // let datalistData = isScholarBuy.map(rec => (rec._id = _id));
  //     // console.log(datalistData, 'datalistData..................');
  //   }
  // };
  const handleBuy = (_id, item, licensename) => {
    console.log(
      _id,
      '_id...............',
      isScholarshipData,
      'isScholarshipData...........',
    );
    const isExist = isScholarshipData.filter(rec => rec._id == _id);
    console.log(isExist, 'isExist////////////////');
    setSelectedscholarshipData(isExist);
    setScholarID(_id);
    // licenseRec==isExist
    //setScholarshipName(licensename);
    console.log(licenseRec, 'licenseRec@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
  };
  console.log(PremiumPurchase, 'PremiumPurchase............');

  return (
    <SafeAreaView style={{flex: 1}}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          width: device_width,
          height: device_height,
          flex: 1,
          backgroundColor: '#282828',
        }}
      >
        <View
          style={{
            marginVertical: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 12,
            paddingVertical: 6,
          }}>
          <TouchableOpacity
            onPress={() => BackBtnFunction()}>
            <MaterialIcons
              name="arrow-back"
              size={28}
              style={{color: '#FFFFFF'}}
            />
          </TouchableOpacity>
          <View
            style={{
              // paddingHorizontal: 12,
              // paddingVertical: 6,
              //alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontWeight: '600',
                fontSize: 18,
              }}>
              {trans('Pricing')}
            </Text>
          </View>
          <View style={{
            // paddingHorizontal: 12,
            // paddingVertical: 6,
          }}>
          <TouchableOpacity>
            <Entypo
              name="dots-three-vertical"
              size={28}
              style={{
                color: '#FFFFFF',
                fontSize: 18,
              }}
            />
          </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity>
            <View
              style={{
                borderRadius: 8,
                backgroundColor: '#FFFFFF',
                padding: 10,
                margin: 10,
                width: device_width * 0.45,
                height: device_height * 0.21,
              }}>
              <View
                style={{
                  alignContent: 'center',
                  justifyContent: 'space-between',
                }}>
                <MaterialIcons
                  name="person-outline"
                  size={50}
                  style={{
                    alignSelf: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                    backgroundColor: '#f8f8f8',
                    padding: 2,
                  }}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  marginTop: 8,
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 14,
                    color: '#000000',
                  }}>
                  {trans('TRIAL PLAN')}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                  justifyContent: 'center',
                  paddingTop: 5,
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 28,
                    color: '#2CBE99',
                    textAlign: 'center',
                  }}>
                  {trans('Free')}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 10,
                    color: '#a0a0a0',
                    fontWeight: '300',
                  }}>
                  {trans('/7 days')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                borderRadius: 8,
                backgroundColor: '#2CBE99',
                padding: 10,
                margin: 10,
                width: device_width * 0.45,
                height: device_height * 0.21,
              }}>
              <View
                style={{
                  alignContent: 'center',
                  justifyContent: 'space-between',
                }}>
                <MaterialCommunityIcons
                  name="crown-outline"
                  size={50}
                  style={{
                    alignSelf: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 10,
                    padding: 2,
                  }}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  marginTop: 8,
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 14,
                    color: '#f8f8f8',
                  }}>
                  {trans('PREMIUM PLAN')}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                  justifyContent: 'center',
                  paddingTop: 5,
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 28,
                    color: '#FFFFFF',
                    textAlign: 'center',
                  }}>
                  {trans('Rs.1499')}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 10,
                    color: '#FFFFFF',
                    fontWeight: '300',
                  }}>
                  {trans('/year')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{}}>
          <Text
            style={{
              color: '#a0a0a0',
              //color: '#2E3231',
              fontWeight: '500',
              fontSize: 18,
              marginTop: 20,
              marginBottom: 15,
              marginHorizontal: 15,
            }}>
            {trans('Choose your Subscription')}
          </Text>
        </View>
        <View
          style={{
            alignContent: 'center',
            backgroundColor: '#FFFFFF',
            paddingVertical: 25,
            width: device_width * 0.95,
            height: device_height * 0.4,
            paddingHorizontal: 25,
            margin: 10,
            borderRadius: 10,
            overflow:'hidden',
            //flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 20,
            }}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                color: 'black',
              }}>
              {trans('Features')}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                textAlign: 'right',
                marginRight: 10,
                flex: 1,
              }}>
              {trans('TRIAL')}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
              }}>
              {trans('PREMIUM')}
            </Text>
          </View>
          {PricingAvailable.map((item, index) => {
            return (
              <View key={index}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical:10,                     
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 15,
                      flex: 1,
                    }}>
                    {item.featureName}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 20,
                    }}>
                    {item.trial && (
                      <Image
                        style={{
                          width: 20,
                          height: 20,
                          resizeMode: 'contain',
                          marginRight: 20,
                        }}
                        source={item.trial}
                      />
                    )}
                    {item.premium && (
                      <Image
                        style={{
                          width: 20,
                          height: 20,
                          resizeMode: 'contain',
                          marginRight: 20,
                        }}
                        source={item.premium}
                      />
                    )}
                  </View>
                </View>
                {index !== PricingAvailable.length - 1 && (
                  <View
                    style={{
                      borderBottomColor: '#E0E0E0',
                      borderBottomWidth: 1,
                      marginTop: 2,
                      marginBottom: 2,
                    }}
                  />
                )}
              </View>
            );
          })}
        </View>
        <TouchableOpacity
          onPress={async () => {
            navigation.navigate('Details');
          }}
          style={{
            marginLeft: 20,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
              marginBottom: 8,
              backgroundColor: '#2CBE99',
              padding: 10,
              borderRadius: 10,
              paddingHorizontal: 10,
              width: device_width * 0.9,
              marginRight: 10,
              paddingRight: 10,
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontWeight: '600',
                fontSize: 18,
                textAlign: 'center',
              }}>
              {trans('Choose Plan')}
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 5,
            marginBottom: 5,
          }}>
          <Text
            style={{
              color: '#a0a0a0',
              fontSize: 13,
              fontWeight: '500',
              paddingHorizontal: 10,
            }}>
            {trans('By joining to our privacy policy and terms of service')}
          </Text>
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
    // <View style={styles.container}>
    //   {/* <StatusBar backgroundColor={'#def'} barStyle="dark-content" /> */}

    //   <ImageBackground
    //     style={{
    //       width: device_width,
    //       height: device_height,
    //       flex: 1,
    //       alignSelf: 'center',
    //     }}
    //     resizeMode="cover"
    //     source={require('../../../assets/0.png')}>
    //     <Header
    //       label1={trans('Available Scholarship')}
    //       // label2={`{Std - ${stage}`}
    //       // label2={`${trans('Std')}-${stage}`}
    //       isbackIconShow={true}
    //       functionName={() => BackBtnFunction()}
    //     />
    //     {PremiumAccessLoad == 'loading' ? (
    //       <LoadingScreen flag={PremiumAccessLoad == 'loading'} />
    //     ) : (
    //       <>
    //         {AvailableCoupon.length > 0 &&
    //           (PremiumPurchase.length == 0 ||
    //             (PremiumPurchase.length > 0 && paymentid == 'free7days')) &&
    //           isScholarshipData.length != 0 && (
    //             <View
    //               style={{
    //                 // backgroundColor: 'burlywood',
    //                 backgroundColor: '#79851f',
    //                 paddingVertical: 10,
    //                 paddingHorizontal: 15,
    //                 marginVertical: 10,
    //                 // marginHorizontal: 15,
    //                 // borderRadius: 7,
    //                 alignItems: 'center',
    //                 justifyContent: 'center',
    //                 flexDirection: 'row',
    //               }}>
    //               <AntDesign
    //                 style={{
    //                   marginHorizontal: 10,
    //                   backgroundColor: '#fff',
    //                   borderRadius: 25,
    //                 }}
    //                 name={'infocirlce'}
    //                 size={30}
    //                 color={'#0f6f25'}
    //               />
    //               <Text
    //                 style={{
    //                   color: '#fff',
    //                   fontWeight: '700',
    //                   fontSize: 15,
    //                   textAlign: 'center',
    //                   // borderWidth: 1,
    //                   // borderLeftWidth:1,
    //                   width: '85%',
    //                   // textTransform:'capitalize'
    //                 }}>
    //                 {/* {language == 'english'
    //                 ? AvlCouponEnglishMsg
    //                 : language == 'odia'
    //                 ? AvlCouponOdiaMsg
    //                 : AvlCouponHindiMsg} */}
    //               </Text>
    //             </View>
    //           )}
    //         {isScholarshipData.length == 0 ? (
    //           <View
    //             style={{
    //               height: 70,
    //               width: '100%',
    //               marginVertical: 20,
    //               justifyContent: 'center',
    //               flexDirection: 'row',
    //               borderColor: 'darkgoldenrod',
    //               borderWidth: 1,
    //             }}>
    //             <View
    //               style={{
    //                 width: 10,
    //                 backgroundColor: 'darkgoldenrod',
    //                 height: 69,
    //               }}></View>
    //             <View
    //               style={{
    //                 width: '98%',
    //                 flexDirection: 'row',
    //                 alignItems: 'center',
    //                 // justifyContent: 'space-around',
    //                 backgroundColor: 'burlywood',
    //                 paddingHorizontal: 10,
    //               }}>
    //               <MaterialIcons name="info" color={'green'} size={30} />
    //               <Text
    //                 style={{
    //                   fontSize: 15,
    //                   color: '#0f6f25',
    //                   fontWeight: '600',
    //                   textAlign: 'center',
    //                   alignSelf: 'center',
    //                 }}>
    //                 {'   '}
    //                 {trans('Sorry ! No scholarship Available')}
    //               </Text>
    //             </View>
    //           </View>
    //         ) : (
    //           <>
    //             <ScrollView
    //               contentContainerStyle={{paddingBottom: 50}}
    //               showsVerticalScrollIndicator={false}
    //               // refreshControl={
    //               //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    //               // }
    //             >
    //               <View style={{marginHorizontal: 0}}>
    //                 {isScholarshipData.map((item, index) => {
    //                   const {
    //                     _id = '',
    //                     scholarshipname = '',
    //                     amount = '',
    //                     offerpercentage = '',
    //                     paidtotalamount = '',
    //                     offeramount = '',
    //                     licenseid = '',
    //                     discountamount = '',
    //                     licensename = '',
    //                     licensestatus = '',
    //                     scholarshipimage = '',
    //                   } = item;

    //                   {
    //                     console.log(
    //                       videoLicenceID == licenseid,
    //                       ' videoLicenceID == licenseid............',
    //                     );
    //                   }
    //                   const isExist = isScholarBuy.includes(_id);
    //                   {
    //                     /* const premiumFlag = premiumDataVal != licenseid; */
    //                   }
    //                   let premiumFlag = false;
    //                   let endLicenceDate = '';
    //                   {
    //                     /* console.log(
    //                   PremiumPurchase,
    //                   'premiumrec11111111................',
    //                   licenseid,
    //                 ); */
    //                   }

    //                   if (PremiumPurchase.length) {
    //                     {
    //                       /* console.log(premiumrec,"premiumrec................") */
    //                     }
    //                     const selectedData = PremiumPurchase.find(
    //                       rec => rec.licenseid == licenseid,
    //                     );
    //                     const licenseLastDate = PremiumPurchase.map(
    //                       rec => rec.enddate,
    //                     );

    //                     {
    //                       /* console.log(
    //                     licenseLastDate,
    //                     'licenseLastDate...........',
    //                   ); */
    //                     }
    //                     if (
    //                       selectedData != undefined &&
    //                       licenseLastDate != undefined
    //                     ) {
    //                       premiumFlag = true;
    //                       endLicenceDate = licenseLastDate;
    //                       {
    //                         /* console.log(endLicenceDate, 'endLicenceDate.........'); */
    //                       }
    //                       {
    //                         /* setLicenseLastDate(licenseLastDate)  */
    //                       }
    //                     }
    //                   }
    //                   let licenseInactive = false;
    //                   if (licensestatus == 'inactive') licenseInactive = true;
    //                   return (
    //                     <TouchableOpacity
    //                       key={index}
    //                       onPress={() => {
    //                         handleBuy(_id, item, licensename);
    //                       }}
    //                       disabled={
    //                         paymentid == 'free7days'
    //                           ? false
    //                           : scholarLicenceID == licenseid ||
    //                             videoLicenceID == licenseid ||
    //                             videoLicenceID.length > 0 ||
    //                             paymentid == 'free7days'
    //                           ? // paymentid == 'free7days'
    //                             true
    //                           : false

    //                         // licenseInactive || premiumFlag ? true : false
    //                       }>
    //                       <View
    //                         style={{
    //                           backgroundColor:
    //                             (scholarID == _id) == false
    //                               ? licenseInactive == false
    //                                 ? premiumFlag == false
    //                                   ? isExist
    //                                     ? '#def'
    //                                     : 'rgba(0,255,0, 0.05)'
    //                                   : '#fff'
    //                                 : '#dadada'
    //                               : 'lightgreen',
    //                           padding: 20,
    //                           marginHorizontal: 10,
    //                           marginVertical: 10,
    //                           borderRadius: 10,
    //                           // elevation: 10,
    //                           borderWidth: 2,
    //                           borderColor:
    //                             (scholarID == _id) == false
    //                               ? '#FFF'
    //                               : '#FFB901',
    //                           // width: '95%',
    //                         }}>
    //                         <View
    //                           style={{
    //                             justifyContent: 'space-between',
    //                             height: device_height * 0.3,
    //                             // backgroundColor: colors[index % colors.length],
    //                             flexDirection: 'row',
    //                           }}>
    //                           {/* <View
    //                           style={{
    //                             flexDirection: 'row',
    //                             // justifyContent: 'space-between',
    //                           }}> */}

    //                           <View
    //                             style={{
    //                               // marginHorizontal: 15,
    //                               justifyContent: 'center',
    //                               // alignItems: 'center',
    //                               // borderWidth: 1,
    //                               width: '63%',
    //                             }}>
    //                             <View>
    //                               <Text
    //                                 style={{
    //                                   color:
    //                                     licenseInactive == false
    //                                       ? premiumFlag == false
    //                                         ? Colors.primary
    //                                         : premiumFlag
    //                                         ? Colors.primary
    //                                         : '#fff'
    //                                       : '#444',
    //                                   width: '98%',
    //                                   fontSize: 20,
    //                                   textAlign: 'left',
    //                                   fontWeight: 'bold',
    //                                   // marginRight: 10,
    //                                 }}>
    //                                 {licensename}
    //                               </Text>
    //                             </View>

    //                             {/* {PremiumPurchase.length == 0 ||
    //                           (PremiumPurchase.length > 0 &&
    //                             paymentid == 'free7days') ? ( */}
    //                             {/* {scholarLicenceID == licenseid ||
    //                             videoLicenceID == licenseid ||
    //                             paymentid == 'free7days' ? (
    //                               <></>
    //                             ) : ( */}
    //                             <View
    //                               style={{
    //                                 width: '100%',
    //                                 alignItems: 'center',
    //                                 // borderTopWidth: premiumFlag ? 0 : 0.7,
    //                                 // marginTop: 5,
    //                                 justifyContent: 'center',
    //                                 flexDirection: 'row',
    //                                 // borderWidth: 1,
    //                                 borderColor: 'grey',
    //                               }}>
    //                               {/* <Text
    //                                 style={{
    //                                   color:
    //                                     PremiumPurchase.length == 0 ||
    //                                       (PremiumPurchase.length > 0 &&
    //                                         paymentid == 'free7days')
    //                                       ? '#000'
    //                                       : '#fff',
    //                                 borderWidth: 1,
    //                                 fontSize: 15,
    //                                 textAlign:'center',
    //                                 alignItems:'center',
    //                                 justifyContent:'center',
    //                                   fontWeight: '600',
    //                                 }}> */}
    //                               {/* <Ionicons
    //                                 name="pricetag-sharp"
    //                                 size={20}
    //                                 style={{ marginRight: 5 }}
    //                                 color={Colors.primary}
    //                               /> */}
    //                               <MaterialCommunityIcons
    //                                 name="brightness-percent"
    //                                 // color="#FFB901"
    //                                 color={Colors.primary}
    //                                 size={22}
    //                                 // style={{ marginRight: 10 }}
    //                               />
    //                               {/* {trans('Get at')} */}
    //                               <Text
    //                                 style={{
    //                                   fontWeight: 'bold',
    //                                   fontSize: 15,
    //                                   color: 'crimson',
    //                                 }}>
    //                                 {' '}
    //                                 {offerpercentage}
    //                                 {'%'} {trans('off')}{' '}
    //                               </Text>
    //                               <Text
    //                                 style={{
    //                                   fontSize: 15,
    //                                   color:
    //                                     PremiumPurchase.length == 0 ||
    //                                     (PremiumPurchase.length > 0 &&
    //                                       paymentid == 'free7days')
    //                                       ? '#808080'
    //                                       : '#666',
    //                                   textDecorationLine: 'line-through',
    //                                   textDecorationStyle: 'solid',
    //                                   fontWeight: '700',
    //                                 }}>
    //                                 {' '}
    //                                 ₹{amount}{' '}
    //                               </Text>
    //                               <Text
    //                                 style={{
    //                                   fontWeight: '900',
    //                                   fontSize: 20,
    //                                   color: Colors.primary,
    //                                 }}>
    //                                 {' '}
    //                                 ₹{paidtotalamount}
    //                               </Text>
    //                               {/* </Text> */}

    //                               {/* <Text
    //                                 style={{
    //                                   fontWeight: 'bold',
    //                                   fontSize: 12,
    //                                 }}>
    //                                 {'( '}
    //                                 {trans(
    //                                   `Our application's annual subscription comes at an incredible price of just ₹599 for the entire academic year`,
    //                                 )}
    //                                 {' )'}
    //                               </Text> */}

    //                               {/* {AvailableCoupon.length > 0 && (
    //                                   <View
    //                                     style={{
    //                                       flexDirection: 'row',
    //                                       alignItems: 'center',
    //                                       borderWidth: 1,
    //                                       borderColor: 'rebeccapurple',
    //                                       backgroundColor: 'lavender',
    //                                       width: device_width * 0.6,
    //                                       padding: 7,
    //                                       borderRadius: 8,
    //                                       marginTop: 5,
    //                                     }}>
    //                                     <Text
    //                                       style={{
    //                                         fontWeight: 'bold',
    //                                         fontSize: 12,
    //                                         width: '70%',

    //                                         color: '#333',
    //                                       }}>
    //                                       {language == 'english'
    //                                         ? AvlCouponEnglishMsg
    //                                         : language == 'odia'
    //                                         ? AvlCouponOdiaMsg
    //                                         : AvlCouponHindiMsg}
                                          
    //                                     </Text>
    //                                     <FastImage
    //                                       style={{
    //                                         height: 40,
    //                                         width: 60,
    //                                         marginVertical: 5,
    //                                         backgroundColor: 'lavender',
    //                                       }}
    //                                       resizeMode="contain"
    //                                       source={require('../../../assets/coupon.png')}
    //                                     />
    //                                   </View>
    //                                 )} */}
    //                             </View>
    //                             {/* )} */}
    //                             {PremiumPurchase.length == '' ? (
    //                               <>
    //                                 <Text
    //                                   style={{
    //                                     color: 'crimson',
    //                                     fontSize: 13,
    //                                     fontWeight: 'bold',
    //                                   }}>
    //                                   {trans('Your Free trial has expired')}
    //                                 </Text>
    //                               </>
    //                             ) : (
    //                               <></>
    //                             )}
    //                             {premiumFlag == false ? (
    //                               <>
    //                                 {isExist == false ? (
    //                                   <View
    //                                     style={{
    //                                       flexDirection: 'row',
    //                                       marginTop: 5,
    //                                       justifyContent: 'flex-start',
    //                                     }}>
    //                                     <>
    //                                       {/* <TouchableOpacity
    //                                       disabled={
    //                                         licenseInactive ? true : false
    //                                       }
    //                                       style={{
    //                                         paddingVertical: 7,
    //                                         // paddingHorizontal: 10,
    //                                         // borderWidth: 1,
    //                                       }}
    //                                       onPress={() => {
    //                                         handleBuy(_id, item, licensename);
    //                                       }}>
    //                                       <View
    //                                         style={{
    //                                           backgroundColor: licenseInactive
    //                                             ? '#dadada'
    //                                             : Colors.primary,
    //                                           width: licenseInactive
    //                                             ? 200
    //                                             : 100,
    //                                           height: 50,
    //                                           borderRadius: 10,
    //                                           flexDirection: 'row',
    //                                           paddingVertical: 1,
    //                                           borderWidth: licenseInactive
    //                                             ? 0
    //                                             : 1,
    //                                           borderColor: '#fff',
    //                                           alignItems: 'center',
    //                                           justifyContent: licenseInactive
    //                                             ? 'flex-start'
    //                                             : 'center',
    //                                         }}>
    //                                         <Text
    //                                           style={{
    //                                             fontWeight: '800',
    //                                             color: licenseInactive
    //                                               ? 'crimson'
    //                                               : '#fff',
    //                                             fontSize: licenseInactive
    //                                               ? 15
    //                                               : 15,
    //                                             // textAlign: 'left',
    //                                             // alignSelf:'center',
    //                                             textAlign: 'center',
    //                                           }}>
    //                                           {licenseInactive
    //                                             ? trans(
    //                                                 'Sorry ! We will update shortly',
    //                                               )
    //                                             : trans('BUY')}
    //                                         </Text>
    //                                       </View>
    //                                     </TouchableOpacity> */}
    //                                     </>
    //                                   </View>
    //                                 ) : (
    //                                   <View
    //                                     style={{
    //                                       flexDirection: 'row',
    //                                       marginTop: 5,
    //                                       justifyContent: 'flex-start',
    //                                     }}>
    //                                     {/* <>
    //                                     <TouchableOpacity
    //                                       disabled={
    //                                         licenseInactive || premiumFlag
    //                                           ? true
    //                                           : false
    //                                       }
    //                                       style={{
    //                                         paddingVertical: 7,
    //                                         paddingHorizontal: 10,
    //                                         // borderWidth: 1,
    //                                       }}
    //                                       onPress={() => {
    //                                         handleBuy(_id, item, licensename);
    //                                       }}>
    //                                       <View
    //                                         style={{
    //                                           backgroundColor: 'red',
    //                                           width: 100,
    //                                           height: 50,
    //                                           borderRadius: 10,
    //                                           flexDirection: 'row',
    //                                           paddingVertical: 1,
    //                                           paddingHorizontal: 5,
    //                                           // borderWidth: 1,
    //                                           borderColor: '#fff',
    //                                           alignItems: 'center',
    //                                           justifyContent: 'center',
    //                                         }}>
    //                                         <Text
    //                                           style={{
    //                                             fontWeight: '800',
    //                                             color: '#fff',
    //                                             fontSize: 15,
    //                                             textAlign: 'center',
    //                                           }}>
    //                                           {licenseInactive
    //                                             ? trans('Not Available')
    //                                             : trans('REMOVE')}
    //                                         </Text>
    //                                       </View>
    //                                     </TouchableOpacity>
    //                                   </> */}
    //                                   </View>
    //                                 )}
    //                               </>
    //                             ) : (
    //                               <View
    //                                 style={{
    //                                   justifyContent: 'center',
    //                                   // alignItems: 'center',
    //                                 }}>
    //                                 {PremiumPurchase.length > 0 &&
    //                                 paymentid === 'free7days' ? (
    //                                   <>
    //                                     <Text
    //                                       style={{
    //                                         color: 'green',
    //                                         fontSize: 13,
    //                                         // marginTop: 5,
    //                                         marginBottom: 5,
    //                                         // textAlign: 'center',
    //                                         fontWeight: '800',
    //                                         alignItems: 'flex-start',
    //                                       }}>
    //                                       {trans('Free trial ends on : ')}
    //                                       {moment(enddate).format('DD/MM/YY')}
    //                                     </Text>
    //                                   </>
    //                                 ) : (
    //                                   <Text
    //                                     style={{
    //                                       color: 'darkgreen',
    //                                       fontSize: 16,
    //                                       marginTop: 10,
    //                                       marginBottom: 5,
    //                                       // textAlign: 'center',
    //                                       fontWeight: '800',
    //                                       alignItems: 'flex-start',
    //                                     }}>
    //                                     {trans('Purchased')}
    //                                   </Text>
    //                                 )}
    //                                 {PremiumPurchase.length > 0 &&
    //                                 paymentid == 'free7days' ? (
    //                                   <>
    //                                     {isExist == false ? (
    //                                       <View
    //                                         style={{
    //                                           flexDirection: 'row',
    //                                           marginTop: 5,
    //                                           justifyContent: 'flex-start',
    //                                         }}>
    //                                         <>
    //                                           {/* <TouchableOpacity
    //                                           disabled={
    //                                             licenseInactive ? true : false
    //                                           }
    //                                           style={{
    //                                             paddingVertical: 7,
    //                                             // paddingHorizontal: 10,
    //                                             // borderWidth: 1,
    //                                           }}
    //                                           onPress={() => {
    //                                             handleBuy(
    //                                               _id,
    //                                               item,
    //                                               licensename,
    //                                             );
    //                                           }}>
    //                                           <View
    //                                             style={{
    //                                               backgroundColor:
    //                                                 licenseInactive
    //                                                   ? '#dadada'
    //                                                   : Colors.primary,
    //                                               width: licenseInactive
    //                                                 ? 200
    //                                                 : 100,

    //                                               // height: licenseInactive ? 40 : 40,
    //                                               height: 50,

    //                                               borderRadius: 10,
    //                                               flexDirection: 'row',
    //                                               paddingVertical: 1,
    //                                               // paddingHorizontal: 3,

    //                                               borderWidth: licenseInactive
    //                                                 ? 0
    //                                                 : 1,
    //                                               borderColor: '#fff',
    //                                               alignItems: 'center',
    //                                               justifyContent:
    //                                                 licenseInactive
    //                                                   ? 'flex-start'
    //                                                   : 'center',
    //                                             }}>
    //                                             <Text
    //                                               style={{
    //                                                 fontWeight: '800',
    //                                                 color: licenseInactive
    //                                                   ? 'crimson'
    //                                                   : '#fff',
    //                                                 fontSize: licenseInactive
    //                                                   ? 15
    //                                                   : 15,
    //                                                 // textAlign: 'left',
    //                                                 // alignSelf:'center',
    //                                                 textAlign: 'center',
    //                                               }}>
    //                                               {licenseInactive
    //                                                 ? trans(
    //                                                     'Sorry ! We will update shortly',
    //                                                   )
    //                                                 : trans('BUY')}
    //                                             </Text>
    //                                           </View>
    //                                         </TouchableOpacity> */}
    //                                         </>
    //                                       </View>
    //                                     ) : (
    //                                       <View
    //                                         style={{
    //                                           flexDirection: 'row',
    //                                           marginTop: 5,
    //                                           justifyContent: 'flex-start',
    //                                         }}>
    //                                         <>
    //                                           {/* <TouchableOpacity
    //                                           disabled={
    //                                             licenseInactive || premiumFlag
    //                                               ? false
    //                                               : true
    //                                           }
    //                                           style={{
    //                                             paddingVertical: 7,
    //                                             paddingHorizontal: 10,
    //                                             // borderWidth: 1,
    //                                           }}
    //                                           onPress={() => {
    //                                             handleBuy(
    //                                               _id,
    //                                               item,
    //                                               licensename,
    //                                             );
    //                                           }}>
    //                                           <View
    //                                             style={{
    //                                               backgroundColor: 'red',
    //                                               width: 100,
    //                                               height: 50,
    //                                               borderRadius: 10,
    //                                               flexDirection: 'row',
    //                                               paddingVertical: 1,
    //                                               paddingHorizontal: 5,
    //                                               // borderWidth: 1,
    //                                               borderColor: '#fff',
    //                                               alignItems: 'center',
    //                                               justifyContent: 'center',
    //                                             }}>
    //                                             <Text
    //                                               style={{
    //                                                 fontWeight: '800',
    //                                                 color: '#fff',
    //                                                 fontSize: 15,
    //                                                 textAlign: 'center',
    //                                               }}>
    //                                               {licenseInactive
    //                                                 ? trans('Not Available')
    //                                                 : trans('REMOVE')}
    //                                             </Text>
    //                                           </View>
    //                                         </TouchableOpacity> */}
    //                                         </>
    //                                       </View>
    //                                     )}
    //                                   </>
    //                                 ) : (
    //                                   <Text
    //                                     style={{
    //                                       // color: '#FFB901',
    //                                       color: 'darkgreen',
    //                                       fontWeight: '700',
    //                                       // textAlign: 'center',
    //                                     }}>
    //                                     {trans('Valid Upto :')}{' '}
    //                                     {trans('Till exam ends')}
    //                                     {/* {moment(endLicenceDate[index]).format(
    //                                   'DD-MMM-YYYY',
    //                                 )} */}
    //                                   </Text>
    //                                 )}
    //                               </View>
    //                             )}
    //                           </View>
    //                           <View
    //                             style={{
    //                               // marginTop: 10,
    //                               marginLeft: 5,
    //                               // width: 90,
    //                               // height: 80,
    //                               // backgroundColor: '#fff',
    //                               // borderRadius: 10,
    //                               alignItems: 'center',
    //                               justifyContent: 'space-evenly',

    //                               // borderWidth: 1,
    //                             }}>
    //                             <FastImage
    //                               style={{
    //                                 width: 90,
    //                                 height: 80,
    //                                 // borderRadius: 10,
    //                                 // resizeMode: 'contain',
    //                                 // borderWidth: 1,
    //                                 // borderColor: '#fff',
    //                               }}
    //                               resizeMode="contain"
    //                               // source={
    //                               // subjectimage
    //                               source={require('../../../assets/OAV_logo.jpg')}

    //                               //   scholarshipimage != ''
    //                               //     ? { uri: scholarshipimage }
    //                               //     : {
    //                               //       uri: 'https://img.freepik.com/premium-vector/graduation-cost-expensive-education-scholarship-loan-budget_101884-1023.jpg',
    //                               //     }
    //                               // }
    //                             />
    //                             <FastImage
    //                               style={{
    //                                 width: 90,
    //                                 height: 80,
    //                                 // borderRadius: 10,

    //                                 // borderWidth: 1,
    //                                 // borderColor: '#fff',
    //                               }}
    //                               resizeMode="contain"
    //                               source={require('../../../assets/Jawahar_Navodaya_Vidyalaya_logo.png')}
    //                             />
    //                           </View>

    //                           {/* </View> */}
    //                         </View>

    //                         {/* <View
    //                           style={{
    //                             marginTop: 10,
    //                             marginLeft: 5,
    //                             width: 190,
    //                             height: 90,
    //                             backgroundColor: '#fff',
    //                             borderRadius: 10,
    //                             alignItems: 'center',
    //                             justifyContent: 'center',
    //                             alignSelf:'center',
    //                             // borderWidth: 1,
    //                           }}>
    //                           <Image
    //                             style={{
    //                               width: 190,
    //                               height: 90,
    //                               borderRadius: 10,
    //                               resizeMode: 'contain',
    //                               // borderWidth: 1,
    //                               // borderColor: '#fff',
    //                             }}
    //                             source={require('../../../assets/Jawahar_Navodaya_Vidyalaya_logo.png')} 
    //                           />
    //                         </View> */}
    //                       </View>
    //                     </TouchableOpacity>
    //                   );
    //                 })}
    //               </View>
    //             </ScrollView>
    //             {/* <TouchableOpacity
    //             style={{
    //               paddingLeft: 12,
    //               flexDirection: 'row',
    //               alignItems: 'center',
    //               marginBottom: 20,
    //             }}
    //             onPress={() => setHelp(true)}>
    //             <AntDesign
    //               name={'customerservice'}
    //               style={{fontSize: 25, color: Colors.primary}}></AntDesign>
    //             <Text
    //               style={{
    //                 fontSize: 20,
    //                 fontWeight: '700',
    //                 color: Colors.primary,
    //                 paddingLeft: 10,
    //               }}>
    //               {trans('Help Desk')}
    //             </Text>
    //           </TouchableOpacity> */}
    //             {/* <View
    //           style={{
    //             backgroundColor: '#ffde59',
    //             padding: 8,
    //             borderRadius: 10,
    //           }}>

    //           </View> */}
    //             <TouchableOpacity
    //               style={{
    //                 marginVertical: 10,
    //                 alignSelf: 'center',
    //                 paddingLeft: 12,
    //                 width: device_width * 0.97,
    //                 flexDirection: 'row',
    //                 alignItems: 'center',
    //                 elevation: 5,
    //                 // marginVertical: 5,
    //                 backgroundColor: '#ffde59',
    //                 paddingVertical: 10,
    //                 borderRadius: 7,
    //                 // alignSelf: 'flex-end',
    //               }}
    //               onPress={() => setHelp(true)}>
    //               <View
    //                 style={{
    //                   backgroundColor: 'green',
    //                   borderRadius: 50,
    //                   padding: 5,
    //                 }}>
    //                 <AntDesign
    //                   name={'customerservice'}
    //                   style={{fontSize: 25, color: '#fff'}}
    //                 />
    //               </View>
    //               <View style={{width: '85%', marginLeft: 5, borderWidth: 0}}>
    //                 <Text
    //                   style={{
    //                     fontSize: 17,
    //                     fontWeight: '700',
    //                     // color: Colors.primary,
    //                     color: '#333',
    //                     paddingLeft: 10,
    //                   }}>
    //                   {trans('Help Desk')}
    //                 </Text>
    //                 <Text
    //                   style={{
    //                     fontSize: 13,
    //                     fontWeight: '600',
    //                     // color: Colors.primary,
    //                     color: '#333',
    //                     paddingLeft: 10,
    //                   }}>
    //                   {trans(
    //                     'If you encounter any issues on our Noteved Academy digital platform, please contact our support team and provide all relevant details using the provided numbers :- 9861302757,7008699927,9337052091',
    //                   )}
    //                   {/* {trans('Contact our customer care')} */}
    //                 </Text>
    //               </View>
    //             </TouchableOpacity>
    //             <View>
    //               <TouchableOpacity
    //                 disabled={
    //                   PremiumPurchase.length == 0 ||
    //                   (PremiumPurchase.length > 0 && paymentid == 'free7days')
    //                     ? false
    //                     : true
    //                 }
    //                 // disabled={
    //                 //   paymentid == 'free7days'
    //                 //     ? false
    //                 //     : videoLicenceID.length > 0
    //                 //       ? true
    //                 //       : false
    //                 // }
    //                 style={{
    //                   width: '80%',
    //                   borderRadius: 10,
    //                   // backgroundColor:
    //                   //   // isScholarBuy == '' ||
    //                   //   PremiumPurchase.length == 0 ||
    //                   //   (PremiumPurchase.length > 0 && paymentid == 'free7days')
    //                   //     ? Colors.primary
    //                   //     : '#a9a9a9',
    //                   backgroundColor:
    //                     // isScholarBuy == '' ||
    //                     PremiumPurchase.length == 0 ||
    //                     (PremiumPurchase.length > 0 && paymentid == 'free7days')
    //                       ? '#FFB901'
    //                       : '#a9a9a9',
    //                   // backgroundColor:
    //                   //   paymentid == 'free7days'
    //                   //     ? '#FFB901'
    //                   //     : videoLicenceID.length > 0
    //                   //       ? '#a9a9a9'
    //                   //       : '#FFB901',
    //                   alignSelf: 'center',
    //                   alignItems: 'center',
    //                   paddingVertical: 10,
    //                   marginBottom: 20,
    //                 }}
    //                 onPress={() => {
    //                   {
    //                     console.log(
    //                       selectedScholarshipData,
    //                       'selectedScholarshipData.................))))))))',
    //                     );
    //                   }
    //                   navigation.navigate('PremiumPurchase', {
    //                     selectedscholarship: isselectedscholarship,
    //                     scholarshipName: scholarshipName,
    //                     screenName: screenName,
    //                     subjectId: subjectId,
    //                     subjectName: subjectName,
    //                     couponcode: couponcode,
    //                     topicid: topicid,
    //                     topicName: topicName,
    //                     ExamQuestionsets: ExamQuestionsets,
    //                     isScoreBoardFlag: isScoreBoardFlag,
    //                     is2ndAvailable: is2ndAvailable,
    //                     index: index,
    //                     quizList: quizList,
    //                     showFeedback: showFeedback,
    //                     // stageID: childList.stageid,
    //                     // boardID: childList.boardid,
    //                     // childID: childList.childid,
    //                     licenseRec: selectedScholarshipData,
    //                     //                   selectedscholarship = [],
    //                     // scholarshipName = '',
    //                     // couponcode = '',
    //                     // screenName = '',
    //                     // subjectId = '',
    //                     // subjectName = '',
    //                     // topicid = '',
    //                     // topicName = '',
    //                     // ExamQuestionsets = [],
    //                     // isScoreBoardFlag = '',
    //                     // is2ndAvailable = '',
    //                     // index = '',
    //                     // quizList = [],
    //                     // showFeedback = '',
    //                   });
    //                 }}>
    //                 <Text
    //                   style={{
    //                     fontWeight: '800',
    //                     color: 'darkgreen',
    //                     fontSize: 15,
    //                   }}>
    //                   {trans('Continue to Cart')}
    //                 </Text>
    //               </TouchableOpacity>
    //             </View>
    //             <Modal transparent={true} visible={help}>
    //               <ImageBackground
    //                 style={{
    //                   // borderRadius: 50,
    //                   borderTopWidth: 1,
    //                   borderLeftWidth: 1,
    //                   borderRightWidth: 1,
    //                   borderColor: '#fff',
    //                   // width: device_width,
    //                   // height: device_height,
    //                   minHeight: device_height * 0.6,
    //                   minWidth: device_width * 0.9,
    //                   // borderRadius: 25,
    //                   // flex: 1,
    //                   alignSelf: 'center',
    //                   // justifyContent: 'center',
    //                   // alignItems: 'center',
    //                 }}
    //                 resizeMode="cover"
    //                 source={require('../../../assets/0.png')}>
    //                 <View
    //                   style={{
    //                     // backgroundColor: '#fff',
    //                     flex: 1,
    //                     alignItems: 'center',
    //                     justifyContent: 'center',
    //                   }}>
    //                   <View
    //                     style={{
    //                       alignItems: 'flex-end',
    //                       justifyContent: 'center',
    //                     }}>
    //                     <View
    //                       style={{
    //                         borderRadius: 15,
    //                         // borderWidth: 1,
    //                         minHeight: device_height * 0.6,
    //                         minWidth: device_width * 0.9,
    //                         // backgroundColor: '#fff',
    //                         flexDirection: 'column',
    //                         justifyContent: 'space-between',
    //                       }}>
    //                       <View>
    //                         <View
    //                           style={{
    //                             alignItems: 'center',
    //                           }}>
    //                           <View
    //                             style={{
    //                               alignItems: 'center',
    //                               paddingVertical: 15,
    //                             }}>
    //                             <Text
    //                               style={{
    //                                 textAlign: 'center',
    //                                 width: device_width * 0.8,
    //                                 fontSize: 17,
    //                                 color: '#fff',
    //                                 marginTop: 10,
    //                                 marginLeft: 10,
    //                                 fontWeight: '900',
    //                               }}>
    //                               {trans(
    //                                 'Are you facing any problem in our NoteVed digital platform ?',
    //                               )}
    //                             </Text>
    //                             <Text
    //                               style={{
    //                                 textAlign: 'center',
    //                                 width: device_width * 0.7,
    //                                 fontSize: 15,
    //                                 color: '#fff',
    //                                 marginTop: 5,
    //                                 // marginLeft: 5,
    //                                 fontWeight: '500',
    //                               }}>
    //                               {trans(
    //                                 'Then contact our service agent immediately',
    //                               )}
    //                             </Text>
    //                             <Text
    //                               style={{
    //                                 textAlign: 'center',
    //                                 width: device_width * 0.7,
    //                                 fontSize: 15,
    //                                 color: '#FFB901',
    //                                 marginTop: 5,
    //                                 // marginLeft: 5,
    //                                 fontWeight: '700',
    //                               }}>
    //                               {trans('Contact No. :')}
    //                             </Text>
    //                           </View>
    //                           <AntDesign
    //                             name="closecircleo"
    //                             style={{
    //                               fontSize: 38,
    //                               color: '#fff',
    //                               position: 'absolute',
    //                               top: -10,
    //                               right: -10,
    //                               // marginTop: 10,
    //                               backgroundColor: 'crimson',
    //                               borderRadius: 50,
    //                             }}
    //                             onPress={() => setHelp(false)}
    //                           />
    //                         </View>

    //                         <View
    //                           style={{
    //                             // borderWidth: 1,
    //                             paddingVertical: 10,
    //                             alignItems: 'center',
    //                             // marginTop: 10,
    //                             marginLeft: 10,
    //                             flexDirection: 'row',
    //                             justifyContent: 'center',
    //                             alignSelf: 'center',
    //                             // padding: 10,
    //                           }}>
    //                           <TouchableOpacity
    //                             style={{display: 'flex', flexDirection: 'row'}}
    //                             onPress={() =>
    //                               Linking.openURL(`tel:${7008699927}`)
    //                             }>
    //                             <View
    //                               style={{
    //                                 backgroundColor: Colors.white,
    //                                 borderRadius: 1000,
    //                                 height: 30,
    //                                 width: 30,
    //                                 justifyContent: 'center',
    //                                 alignItems: 'center',
    //                                 marginTop: 5,
    //                                 marginRight: 10,
    //                               }}>
    //                               <Ionicons
    //                                 style={{color: '#50B450'}}
    //                                 name="call"
    //                                 size={22}
    //                               />
    //                             </View>
    //                             <View
    //                               style={{
    //                                 justifyContent: 'center',
    //                                 alignItems: 'center',
    //                               }}>
    //                               <Text
    //                                 style={{
    //                                   marginRight: 10,
    //                                   fontWeight: '700',
    //                                   color: '#FFB901',
    //                                 }}>
    //                                 +91 7008699927
    //                               </Text>
    //                             </View>
    //                           </TouchableOpacity>
    //                           <TouchableOpacity
    //                             style={{display: 'flex', flexDirection: 'row'}}
    //                             onPress={() =>
    //                               Linking.openURL(`tel:${9861302757}`)
    //                             }>
    //                             <View
    //                               style={{
    //                                 backgroundColor: Colors.white,
    //                                 borderRadius: 1000,
    //                                 height: 30,
    //                                 width: 30,
    //                                 justifyContent: 'center',
    //                                 alignItems: 'center',
    //                                 marginTop: 5,
    //                                 marginRight: 10,
    //                               }}>
    //                               <Ionicons
    //                                 style={{color: '#50B450'}}
    //                                 name="call"
    //                                 size={22}
    //                               />
    //                             </View>
    //                             <View
    //                               style={{
    //                                 justifyContent: 'center',
    //                                 alignItems: 'center',
    //                               }}>
    //                               <Text
    //                                 style={{
    //                                   marginRight: 10,
    //                                   fontWeight: '700',
    //                                   color: '#FFB901',
    //                                 }}>
    //                                 +91 9861302757
    //                               </Text>
    //                             </View>
    //                           </TouchableOpacity>
    //                         </View>

    //                         <View
    //                           style={{
    //                             // borderWidth: 1,
    //                             paddingVertical: 10,
    //                             alignItems: 'center',
    //                             // marginTop: 10,
    //                             marginLeft: 10,
    //                             flexDirection: 'row',
    //                             justifyContent: 'center',
    //                             alignSelf: 'center',
    //                             // padding: 10,
    //                           }}>
    //                           <TouchableOpacity
    //                             style={{display: 'flex', flexDirection: 'row'}}
    //                             onPress={() =>
    //                               Linking.openURL(`tel:${9337052091}`)
    //                             }>
    //                             <View
    //                               style={{
    //                                 backgroundColor: Colors.white,
    //                                 borderRadius: 1000,
    //                                 height: 30,
    //                                 width: 30,
    //                                 justifyContent: 'center',
    //                                 alignItems: 'center',
    //                                 marginTop: 5,
    //                                 marginRight: 10,
    //                               }}>
    //                               <Ionicons
    //                                 style={{color: '#50B450'}}
    //                                 name="call"
    //                                 size={22}
    //                               />
    //                             </View>
    //                             <View
    //                               style={{
    //                                 justifyContent: 'center',
    //                                 alignItems: 'center',
    //                               }}>
    //                               <Text
    //                                 style={{
    //                                   marginRight: 10,
    //                                   fontWeight: '700',
    //                                   color: '#FFB901',
    //                                 }}>
    //                                 +91 9337052091
    //                               </Text>
    //                             </View>
    //                           </TouchableOpacity>
                             
    //                         </View>
    //                       </View>
    //                     </View>
    //                   </View>
    //                   <View
    //                     style={{
    //                       position: 'absolute',
    //                       bottom: -20,
    //                       height: 100,
    //                       width: '100%',
    //                     }}>
    //                     <FastImage
    //                       style={{
    //                         height: 100,
    //                         width: '100%',
    //                         // position:'absolute', bottom:-23
    //                         // borderWidth: 1,
    //                         borderColor: 'red',
    //                         marginTop: -30,
    //                         marginBottom: -15,
    //                       }}
    //                       source={require('../../../assets/resting1.png')}
    //                       resizeMode="contain"
    //                     />
    //                     <FastImage
    //                       style={{
    //                         height: 30,
    //                         width: '100%',
    //                         // borderWidth: 1,
    //                         borderColor: 'blue',
    //                         // position:'absolute', bottom:-23
    //                         // marginTop:-8
    //                       }}
    //                       source={require('../../../assets/grass.png')}
    //                       resizeMode="contain"
    //                     />
    //                   </View>
    //                 </View>
    //               </ImageBackground>
    //             </Modal>
    //           </>
    //         )}
    //       </>
    //     )}
    //   </ImageBackground>
    // </View>
  );
};

export default PremiumAccess;

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
  action: {
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#f2f2f2',
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
