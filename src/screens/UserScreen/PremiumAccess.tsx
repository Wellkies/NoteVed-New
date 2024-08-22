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
  FlatList,
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Iconz from 'react-native-vector-icons/Entypo';

import {device_height, device_width} from '../style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AntDesign from 'react-native-vector-icons/AntDesign';

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
  getChildDetailsAPI,
  selectStudentInfo,
  selectStudentStatus,
} from '../../redux/reducers/StudentInfoReducer';
import {
  getCouponAPI,
  selectCouponData,
} from '../../redux/reducers/GetAvailableCouponOfferReducer';
import {useNavigation} from '@react-navigation/native';
import LoadingScreen from '../CommonScreens/LoadingScreen';
import {selectUserInfo} from '../../redux/reducers/loginReducer';
// import {
//   getFreePremiumDetailsApi,
//   selectFreeScholarshipData,
// } from '../../redux/reducers/GetFreeLicenseDetailsReducer';
import {
  getAllLicenseDataAPI,
  selectAllLicenseLevelInfo,
  selectAllLicenseLevelStatus,
} from '../../redux/reducers/GetAllLicenseReducer';

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
    stateid: any;
  }

  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const count = useAppSelector(selectStudentStatus);
  const childInfo = useAppSelector(selectStudentInfo) as ChildInfo;
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
    stateid = '',
  } = childInfo || {};
  //
  // let stateid = 'hhhhh'
  // const PremiumPurchase = [
  //   {"__v": 0, "_id": "664eeb93b358306069b6379b", "amount": 1800, "boardid": "2", "boardname": "CBSE", "couponcode": "NVD5", "createon": "2024-05-23T07:09:07.786Z", "discountamount": 0, "durationDays": 365, "gstamount": 0, "gstpercentage": 0, "licenseid": "1716448147785", "licensemessageen": "", "licensemessageod": "", "licensename": "Adarsh & Navodayaa Video", "licensestatus": "active", "offeramount": 501, "offerpercentage": 27, "paidtotalamount": 1299, "scholarshipid": "NVOOKADA1690811843420", "scholarshipimage": "", "scholarshipname": "Adarsha", "stage": "5", "stageid": "5", "updatedon": "2024-05-23T07:09:07.786Z"},
  // ];
  const PremiumPurchase = useAppSelector(selectPremiumPurchase);

  const PremiumDetails = PremiumPurchase?.filter(r => r.licenseid);

  const PremiumLoading = useAppSelector(selectPremiumPurchaseStatus);
  //
  const ScholarshipList = useAppSelector(selectPremiumAccess);
  //
  const OtherstateScholarship1 = ScholarshipList?.filter(
    r => r.licenseid == '1695358760234' || r.licenseid == 'ADA51690528084298',
  );
  const OtherstateScholarship2 = ScholarshipList?.filter(
    r => r.licenseid == '1717413071896',
  );

  const PremiumAccessLoad = useAppSelector(selectPremiumAccessStatus);
  //
  //const FreeScholarship = useAppSelector(selectFreeScholarshipData);
  //
  // const Scholarshipdata1 = FreeScholarship?.filter(
  //   r => r.licenseid == '1717060263931',
  // );
  // const Scholarshipdata2 = FreeScholarship?.filter(
  //   r => r.licenseid == '1716448147785' || r.licenseid == '1716448133885',
  // );
  // console.log(
  //   Scholarshipdata1,
  //   'Scholarshipdata1',
  //   Scholarshipdata2,
  //   'Scholarshipdata2',
  // );
  //
  //const [freeScholar, setFreeScholar] = useState();
  // useEffect(() => {
  //   if (FreeScholarship.length > 0 && stateid == '') {
  //     setFreeScholar(FreeScholarship);
  //   } else if (
  //     FreeScholarship.length > 0 &&
  //     stateid.length > 0 &&
  //     stateid == 'Odisha1712675266782'
  //   ) {
  //     setFreeScholar(Scholarshipdata2);
  //   } else if (
  //     FreeScholarship.length > 0 &&
  //     stateid.length > 0 &&
  //     stateid != 'Odisha1712675266782'
  //   ) {
  //     setFreeScholar(Scholarshipdata1);
  //   } else {
  //     setFreeScholar([]);
  //   }
  // }, [FreeScholarship]);

  const AvailableCoupon = useAppSelector(selectCouponData);
  //
  useEffect(() => {
    const freeScholar = {stageid, boardid};
    //const Predata = {childid, stageid, boardid};
    const Predata = {childid};
    const PreAccesdata = {stageid, boardid};
    dispatch(getScholarshipPremiumAPI(Predata));
    dispatch(getPremiumAccessAPI(PreAccesdata));
    dispatch(getCouponAPI());
    // dispatch(getFreePremiumDetailsApi(freeScholar));
  }, []);
  useEffect(() => {
    dispatch(getAllLicenseDataAPI());
  }, []);

  const {couponcode = ''} =
    AvailableCoupon.length > 0 ? AvailableCoupon[0] : AvailableCoupon;
  //

  const {signOut} = useContext(AuthContext);
  const [help, setHelp] = useState(false);

  const [scholarshipName, setScholarshipName] = useState('');

  const [childList, setChildList] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [indexNo, setIndexNo] = useState(0);
  const [isScholarshipData, setScholarshipData] = useState([]);

  const [isScholarBuy, setIsScholarBuy] = useState([]);
  const [isselectedscholarship, setselectedscholarship] = useState([]);

  const [selectedScholarshipData, setSelectedscholarshipData] = useState();
  const [scholarID, setScholarID] = useState('');
  //
  const [licenseLastDate, setLicenseLastDate] = useState('');
  const schID = ScholarshipList[0]?._id;
  useEffect(() => {
    if (ScholarshipList.length > 0 && stateid == '') {
      setScholarID(ScholarshipList[0]?._id);
    } else if (
      ScholarshipList.length > 0 &&
      stateid.length > 0 &&
      stateid == 'Odisha1712675266782'
    ) {
      setScholarID(ScholarshipList[0]?._id);
    } else if (
      ScholarshipList.length > 0 &&
      stateid.length > 0 &&
      stateid != 'Odisha1712675266782'
    ) {
      setScholarID(ScholarshipList[1]?._id);
    } else {
      setScholarID(ScholarshipList[0]?._id);
    }
  }, [ScholarshipList]);
  //

  //

  const {userInfo = {}} = useAppSelector(selectUserInfo);
  const user = userInfo;
  const userid = user._id;
  const stageId = user.stageid;
  const boardId = user.boardid;

  //
  //

  const {paymentid = '', enddate = ''} = PremiumPurchase.length
    ? PremiumPurchase[0]
    : [];

  //
  const [scholarLicenceID, setScholarLicenseID] = useState('');
  const [videoLicenceID, setVideoLicenseID] = useState('');
  //
  useEffect(() => {
    if (PremiumPurchase.length > 0) {
      handleCall(PremiumPurchase);
      //
    }
  }, [PremiumPurchase]);
  const [arrayData, setArraydAta] = useState([]);
  //
  // const handleDetails = (licensedetails: any) => {
  //   // setIndexNo(idx + 1);
  //   setArraydAta(licensedetails);
  //   setModalStatus(true);
  // };

  const handleCall = PremiumPurchase => {
    const VLicenseID = PremiumPurchase.filter(
      rec =>
        rec.licenseid == '1716448147785' || rec.licenseid == '1705039500455',
    );
    //

    {
      if (VLicenseID.length > 0) {
        const VideoLicenseID = VLicenseID[0].licenseid;
        setVideoLicenseID(VideoLicenseID);
        //
      }
    }

    const SLicenseID = PremiumPurchase.filter(
      rec =>
        rec.licenseid == '1695358760234' ||
        rec.licenseid == 'ADA51690528084298',
    );
    //
    if (SLicenseID.length > 0) {
      const scholarLicenseID = SLicenseID[0].licenseid;
      setScholarLicenseID(scholarLicenseID);
      //
    }
  };

  const LicenseID = PremiumPurchase.map(
    rec =>
      rec.licenseid == '1695358760234' ||
      rec.licenseid == 'ADA51690528084298' ||
      rec.licenseid == '1704875373950' ||
      rec.licenseid == '1705039500455',
  );
  //
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
  const licenseData = useAppSelector(selectAllLicenseLevelInfo);

  const filterLicenseByType = type => {
    return licenseData.filter(license => license.licensetype === type);
  };

  const premiumLicense = filterLicenseByType('premium');
  console.log(premiumLicense,'@premiumLicense');

  // Example usage for "freemium" type
  const freemiumLicense = filterLicenseByType('freemium');

  console.log(freemiumLicense,'@freemiumLicense');
  // const licenseId = isScholarshipData.map(rec => rec._id);
  // const licenseRec = isScholarshipData;
  // const licenseName = isScholarshipData.map(rec => rec.licensename);
  const licenseId = premiumLicense.map(rec => rec._id);
  const licenseRec = premiumLicense;
  const licenseName = premiumLicense.map(rec => rec.licensename);
  //
  useEffect(() => {
    navigation.addListener('focus', () => {
      //const Predata = {childid, stageid, boardid};
      const Predata = {childid};
      const PreAccesdata = {stageid: stageId, boardid: boardId};
      //
      dispatch(getChildDetailsAPI(userid));
      dispatch(getScholarshipPremiumAPI(Predata));
      dispatch(getPremiumAccessAPI(PreAccesdata));
      dispatch(getCouponAPI());
      //   handleBuy(licenseId, licenseRec, licenseName);
      BackHandler.addEventListener('hardwareBackPress', () => {
        BackBtnFunction();
        return true;
      });
      //   dispatch(getDiwaliCouponAPI());
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
    if (ScholarshipList.length > 0 && stateid == '') {
      setScholarshipData(ScholarshipList);
      setSelectedscholarshipData(ScholarshipList);
    } else if (
      ScholarshipList.length > 0 &&
      stateid.length > 0 &&
      stateid == 'Odisha1712675266782'
    ) {
      setScholarshipData(OtherstateScholarship1);
      setSelectedscholarshipData(OtherstateScholarship1);
    } else if (
      ScholarshipList.length > 0 &&
      stateid.length > 0 &&
      stateid != 'Odisha1712675266782'
    ) {
      setScholarshipData(OtherstateScholarship2);
      setSelectedscholarshipData(OtherstateScholarship2);
    } else {
      setScholarshipData([]);
    }
  }, [ScholarshipList]);

  const handleBuy = (_id, item, licensename) => {
    const isExist = premiumLicense.filter(rec => rec._id == _id);
    //
    setSelectedscholarshipData(isExist);
    setScholarID(_id);
  };
  

  return (
    <View style={styles.container}>
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
            justifyContent: 'space-between',
            width: '95%',
            marginTop: 15,
            // borderWidth: 1,
          }}>
          <Header
            // label1={trans('Available Scholarship')}
            // label2={`{Std - ${stage}`}
            // label2={`${trans('Std')}-${stage}`}
            isbackIconShow={true}
            functionName={() => BackBtnFunction()}
          />
          <View
            style={{
              width: '34%',
              // paddingVertical:10,
              // paddingHorizontal:10,
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <Text
                style={{
                  color: '#fff',
                  // fontWeight: '700',
                  fontSize: 15,
                  textAlign: 'center',
                }}>
                {'Current plan'}
              </Text>
            </View>
            {/* <View>
              <Text
                style={{
                  color: 'yellow',
                  // fontWeight: '700',
                  fontSize: 15,
                  textAlign: 'center',
                }}>
                {' Freemium'}
              </Text>
            </View> */}
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                fontSize: 12,
                fontWeight: '700',
              }}>
              {'1 Device | With Ads'}
            </Text>
          </View>
        </View>
        {PremiumAccessLoad == 'loading' ? (
          <LoadingScreen flag={PremiumAccessLoad == 'loading'} />
        ) : (
          <>
            {/* {AvailableCoupon.length > 0 &&
              (PremiumPurchase.length == 0 ||
                (PremiumPurchase.length > 0 && paymentid == 'free7days')) &&
              isScholarshipData.length != 0 && (
                <View
                  style={{
                    // backgroundColor: 'burlywood',
                    backgroundColor: '#79851f',
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    marginVertical: 10,
                    // marginHorizontal: 15,
                    // borderRadius: 7,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <AntDesign
                    style={{
                      marginHorizontal: 10,
                      backgroundColor: '#fff',
                      borderRadius: 25,
                    }}
                    name={'infocirlce'}
                    size={30}
                    color={'#0f6f25'}
                  />
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: '700',
                      fontSize: 15,
                      textAlign: 'center',
                      // borderWidth: 1,
                      // borderLeftWidth:1,
                      width: '85%',
                      // textTransform:'capitalize'
                    }}>
                    {/* {language == 'english'
                    ? AvlCouponEnglishMsg
                    : language == 'odia'
                    ? AvlCouponOdiaMsg
                    : AvlCouponHindiMsg} */}
            {/* </Text>
                </View>
              )} */}
            {/* {isScholarshipData.length == 0 ? (
              <View
                style={{
                  height: 70,
                  width: '100%',
                  marginVertical: 20,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  borderColor: 'darkgoldenrod',
                  borderWidth: 1,
                }}>
                <View
                  style={{
                    width: 10,
                    backgroundColor: 'darkgoldenrod',
                    height: 69,
                  }}></View>
                <View
                  style={{
                    width: '98%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'space-around',
                    backgroundColor: 'burlywood',
                    paddingHorizontal: 10,
                  }}>
                  <MaterialIcons name="info" color={'green'} size={30} />
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#0f6f25',
                      fontWeight: '600',
                      textAlign: 'center',
                      alignSelf: 'center',
                    }}>
                    {'   '}
                    {trans('Sorry ! No scholarship Available')}
                  </Text>
                </View>
              </View>
            ) : ( */}
            <>
              <ScrollView
                contentContainerStyle={{paddingBottom: 50}}
                showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    width: '90%',
                    borderWidth: 0.5,
                    borderColor: '#fff',
                    height: '0%',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}></View>
                <View
                  style={{
                    width: '98%',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.upgradeText}>
                    Upgrade to{' '}
                    <Text style={styles.premiumHighlight}>Premium Plan</Text> to
                    get the ad-free experience and ultimate support
                  </Text>
                </View>

                {freemiumLicense?.map((item, index) => {
                  const {
                    _id = '',
                    scholarshipname = '',
                    scholarshipid: ScholarshipID = '',
                    amount = '',
                    offerpercentage = '',
                    paidtotalamount = '',
                    offeramount = '',
                    licenseid = '',
                    discountamount = '',
                    licensename = '',
                    licensestatus = '',
                    scholarshipimage = '',
                    licensedetails = [],
                  } = item;

                  return (
                    <View key={index} style={styles.freemium}>
                      <Text style={styles.planTitle}>{licensename}</Text>
                      <View style={styles.planFeature}>
                        <FlatList
                          data={licensedetails}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({item, index}) => (
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#333',
                                fontWeight: '600',
                                marginTop: 5,
                              }}>
                              {/* {index + 1} */}
                              {' - '}
                              {item}
                            </Text>
                          )}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                        }}>
                        {/* <Iconz name="sound" color={'red'} size={22} /> */}
                        <FastImage
                          style={{
                            width: 23,
                            height: 23,
                          }}
                          resizeMode="contain"
                          source={require('../../../assets/ads.png')}
                        />
                        <Text
                          style={{
                            color: 'red',
                            fontSize: 15,
                            // marginTop: 5,
                            fontWeight: 'bold',
                          }}>
                          {'ADs present'}
                        </Text>
                      </View>
                    </View>
                  );
                })}

                <View style={{marginHorizontal: 0}}>
                  {premiumLicense.map((item, index) => {
                    const {
                      _id = '',
                      scholarshipname = '',
                      scholarshipid: ScholarshipID = '',
                      amount = '',
                      offerpercentage = '',
                      paidtotalamount = '',
                      offeramount = '',
                      licenseid = '',
                      discountamount = '',
                      licensename = '',
                      licensestatus = '',
                      scholarshipimage = '',
                      licensedetails = [],
                    } = item;

                    const isExist = isScholarBuy.includes(_id);
                    {
                      /* const premiumFlag = premiumDataVal != licenseid; */
                    }
                    let premiumFlag = false;
                    let endLicenceDate = '';
                    let allCarddisable = false;

                    if (PremiumPurchase.length) {
                      {
                        /*  */
                      }
                      const selectedData = PremiumPurchase.find(
                        rec => rec.licenseid == licenseid,
                      );
                      //
                      const licenseLastDate = PremiumPurchase.map(
                        rec => rec.enddate,
                      );

                      const HighvalueLicense = PremiumPurchase.map(
                        rec =>
                          rec.licenseid == '1716448147785' ||
                          rec.licenseid == '1716448133885',
                      );

                      //
                      {
                        if (HighvalueLicense[0] == true) {
                          allCarddisable = true;
                        } else {
                          allCarddisable = false;
                        }
                      }

                      if (
                        selectedData != undefined &&
                        licenseLastDate != undefined
                      ) {
                        premiumFlag = true;
                        endLicenceDate = licenseLastDate;
                        {
                          /*  */
                        }
                        {
                          /* setLicenseLastDate(licenseLastDate)  */
                        }
                      }
                    }
                    let licenseInactive = false;
                    if (licensestatus == 'inactive') licenseInactive = true;
                    return (
                      <TouchableOpacity
                        key={index}
                        disabled={
                          PremiumDetails[0]?.licenseid == licenseid
                            ? true
                            : false
                        }
                        style={[
                          styles.premium,
                          {
                            backgroundColor:
                              PremiumDetails[0]?.licenseid != licenseid
                                ? (scholarID == _id) == false
                                  ? licenseInactive == false
                                    ? premiumFlag == false
                                      ? isExist
                                        ? '#def'
                                        : 'limegreen'
                                      : '#fff'
                                    : '#dadada'
                                  : '#ffeb01'
                                : 'gray',
                          },
                        ]}
                        onPress={() => {
                          handleBuy(_id, item, licensename);
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            // height:'10%'
                          }}>
                          <Text style={styles.planTitle}>{licensename}</Text>
                          <FontAwesome5
                            style={{color: '#000'}}
                            name={'crown'}
                            size={25}
                          />
                        </View>
                        {/* <Text style={styles.planSubtitle}>
                           
                          </Text> */}
                        <FlatList
                          data={licensedetails}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({item, index}) => {
                            // Define the word you want to make bold

                            const wordsToBold = [
                              'Basic Plan',
                              'Freemium',
                              'Experience ads',
                              'Noteved Academy',
                              'Previous years',
                              'Most Probable',
                              'free learning',
                            ];

                            // Split the item text into parts based on the word to be bold
                            const regex = new RegExp(
                              `(${wordsToBold.join('|')})`,
                              'gi',
                            );
                            const parts = item.split(regex);
                            return (
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: '#333',
                                  fontWeight: '600',
                                  marginTop: 5,
                                }}>
                                {parts.map((part, i) =>
                                  wordsToBold.some(
                                    word =>
                                      word.toUpperCase() === part.toUpperCase(),
                                  ) ? (
                                    <Text
                                      key={i}
                                      style={{
                                        fontWeight: 'bold',
                                        fontSize: 16,
                                      }}>
                                      {part}
                                    </Text>
                                  ) : (
                                    <Text key={i}>{part}</Text>
                                  ),
                                )}
                              </Text>
                            );
                          }}
                        />
                        

                        <View
                          style={[
                            styles.priceContainer,
                            {
                              height: 100,
                              width: '100%',
                              position: 'absolute',
                              bottom: -32,
                              // borderWidth: 1,
                              borderColor: 'red',
                              // marginTop: -30,
                              marginBottom: -40,
                            },
                          ]}>
                          {/* <Text style={styles.price}>Rs. 1199/-</Text> */}
                          <TouchableOpacity style={styles.upgradeButton}>
                            <Text style={styles.upgradeButtonText}>
                              Rs. {amount}/-
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
              <TouchableOpacity
                style={{
                  marginVertical: 10,
                  alignSelf: 'center',
                  paddingLeft: 12,
                  width: device_width * 0.97,
                  flexDirection: 'row',
                  alignItems: 'center',
                  elevation: 5,
                  // marginVertical: 5,
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
                      'If you encounter any issues on our Noteved Academy digital platform, please contact our support team and provide all relevant details using the provided numbers :- 9861302757,7008699927',
                    )}
                    {/* {trans('Contact our customer care')} */}
                  </Text>
                </View>
              </TouchableOpacity>
              <View>
                <TouchableOpacity
                  // disabled={
                  //   PremiumPurchase.length == 0 ||
                  //   (PremiumPurchase.length > 0 && paymentid == 'free7days')
                  //     ? false
                  //     : true
                  // }
                  disabled={
                    PremiumDetails[0]?.licenseid ==
                    premiumLicense[0]?.licenseid
                      ? true
                      : scholarID == ''
                      ? true
                      : false
                  }
                  style={{
                    width: '80%',
                    borderRadius: 10,

                    // backgroundColor:
                    //   // isScholarBuy == '' ||
                    //   PremiumPurchase.length == 0 ||
                    //   (PremiumPurchase.length > 0 && paymentid == 'free7days')
                    //     ? '#FFB901'
                    //     : '#a9a9a9',
                    backgroundColor:
                      PremiumDetails[0]?.licenseid ==
                      premiumLicense[0]?.licenseid
                        ? '#a9a9a9'
                        : scholarID == ''
                        ? '#a9a9a9'
                        : '#FFB901',

                    alignSelf: 'center',
                    alignItems: 'center',
                    paddingVertical: 10,
                    marginBottom: 20,
                  }}
                  onPress={() => {
                    {
                      console.log(
                        selectedScholarshipData,
                        'selectedScholarshipData.................))))))))',
                      );
                    }
                    setScholarID('');
                    console.log(isselectedscholarship, 'isselectedscholarship');
                    navigation.navigate('PremiumPurchase', {
                      selectedscholarship: isselectedscholarship,
                      scholarshipName: scholarshipName,
                      screenName: screenName,
                      subjectId: subjectId,
                      subjectName: subjectName,
                      couponcode: couponcode,
                      topicid: topicid,
                      topicName: topicName,
                      ExamQuestionsets: ExamQuestionsets,
                      isScoreBoardFlag: isScoreBoardFlag,
                      is2ndAvailable: is2ndAvailable,
                      index: index,
                      quizList: quizList,
                      showFeedback: showFeedback,

                      licenseRec: premiumLicense,
                    });
                  }}>
                  <Text
                    style={{
                      fontWeight: '800',
                      color: 'darkgreen',
                      fontSize: 15,
                    }}>
                    {trans('Continue to Cart')}
                  </Text>
                </TouchableOpacity>
              </View>
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
                    minHeight: device_height * 0.65,
                    minWidth: device_width * 0.9,
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
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          borderRadius: 15,
                          // borderWidth: 1,
                          minHeight: device_height * 0.65,
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
                            <View
                              style={{
                                alignItems: 'center',
                                paddingVertical: 15,
                              }}>
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
                                  'Are you facing any problem in our NoteVed digital platform ?',
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
                                  'Then contact our service agent immediately',
                                )}
                              </Text>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  width: device_width * 0.7,
                                  fontSize: 15,
                                  color: '#FFB901',
                                  marginTop: 5,
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
                              paddingVertical: 10,
                              alignItems: 'center',
                              // marginTop: 10,
                              marginLeft: 10,
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignSelf: 'center',
                              // padding: 10,
                            }}>
                            <TouchableOpacity
                              style={{display: 'flex', flexDirection: 'row'}}
                              onPress={() =>
                                Linking.openURL(`tel:${7008699927}`)
                              }>
                              <View
                                style={{
                                  backgroundColor: Colors.white,
                                  borderRadius: 1000,
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
                                    color: '#FFB901',
                                  }}>
                                  +91 7008699927
                                </Text>
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{display: 'flex', flexDirection: 'row'}}
                              onPress={() =>
                                Linking.openURL(`tel:${9861302757}`)
                              }>
                              <View
                                style={{
                                  backgroundColor: Colors.white,
                                  borderRadius: 1000,
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
                                    color: '#FFB901',
                                  }}>
                                  +91 9861302757
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>

                          <View
                            style={{
                              // borderWidth: 1,
                              paddingVertical: 10,
                              alignItems: 'center',
                              // marginTop: 10,
                              marginLeft: 10,
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignSelf: 'center',
                              // padding: 10,
                            }}></View>

                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              borderRadius: 10,
                              paddingHorizontal: 5,
                              borderWidth: 1,
                              // backgroundColor:  '#FFB901',
                              marginTop: 10,
                              backgroundColor: 'limegreen',
                              paddingVertical: 10,
                              width: '90%',
                              alignSelf: 'center',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderColor: '#FFB901',
                              // height: '20%',
                            }}
                            onPress={() =>
                              Linking.openURL(
                                'whatsapp://send?phone=9861302757',
                              )
                            }>
                            <FontAwesome
                              name={'whatsapp'}
                              size={28}
                              color={'#fff'}
                              // whatsapp://send?text=hello&phone=9861302757'
                              onPress={() =>
                                Linking.openURL(
                                  'whatsapp://send?phone=9861302757',
                                )
                              }
                            />
                            <Text
                              style={{
                                left: 15,
                                fontSize: 15,
                                color: '#fff',
                                fontWeight: '900',
                              }}>
                              {trans('Whatsapp Us')}
                            </Text>
                          </TouchableOpacity>
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
                          width: '100%',
                          // borderWidth: 1,
                          borderColor: 'blue',
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
            </>
            {/* )} */}
            {modalStatus && arrayData.length > 0 && (
              <Modal transparent={true} visible={modalStatus}>
                <View
                  style={{
                    padding: 10,
                    borderWidth: 1,
                    width: '98%',
                    height: device_height * 0.92,
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}>
                  <MaterialIcons name="info" color={'green'} size={40} />

                  <Text
                    style={{
                      fontSize: 22,
                      color: '#333',
                      fontWeight: '800',
                      textAlign: 'center',
                      textDecorationLine: 'underline',
                      marginVertical: 15,
                      width: '92%',
                    }}>
                    {premiumLicense[indexNo].licensename}
                  </Text>
                  <View
                    style={{
                      width: '90%',
                      borderWidth: 1,
                      borderColor: '#999',
                      alignItems: 'left',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      paddingHorizontal: 10,
                      paddingVertical: 15,
                    }}>
                    <FlatList
                      data={arrayData}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => (
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#333',
                            fontWeight: '600',
                            marginTop: 5,
                          }}>
                          {index + 1}
                          {' - '}
                          {item}
                        </Text>
                      )}
                    />
                    {/* {isScholarshipData[indexNo].licensedetails.map(
                      (item, index) => {
                        return (
                          <View style={{flexDirection: 'row'}} key={index}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#333',
                                fontWeight: '600',
                              }}>
                              {item}
                            </Text>
                          </View>
                        );
                      },
                    )} */}
                  </View>
                  <TouchableOpacity
                    style={{
                      width: '60%',
                      paddingHorizontal: 20,
                      paddingVertical: 15,
                      backgroundColor: 'green',
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: 'gold',
                      marginTop: 15,
                    }}
                    onPress={() => {
                      setModalStatus(false);
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        alignItems: 'center',
                        fontSize: 16,
                        color: 'gold',
                        fontWeight: '600',
                      }}>
                      {trans('OK')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            )}
          </>
        )}
      </ImageBackground>
    </View>
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

  currentPlan: {
    fontSize: 18,
    color: 'white',
  },
  deviceInfo: {
    fontSize: 14,
    // color: '#B0BEC5',
  },
  upgradeText: {
    textAlign: 'left',
    marginVertical: 20,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  premiumHighlight: {
    color: '#F1C40F',
    fontWeight: 'bold',
  },
  planContainer: {
    width: '100%',
  },
  freemium: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    marginBottom: 10,
    width: '90%',
    justifyContent: 'center',
    // alignItems:'center',
    alignContent: 'center',
    // alignSelf:''
    borderWidth: 1,
    alignSelf: 'center',
  },
  premium: {
    backgroundColor: '#F1C40F',
    padding: 15,
    borderRadius: 25,
    color: '#2C3E50',
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  planTitle: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '800',
    color: '#2C3E50',
  },
  planSubtitle: {
    marginTop: 10,
    marginBottom: 10,
  },
  planFeature: {
    fontSize: 14,
    marginVertical: 2,
  },
  boldText: {
    fontWeight: 'bold',
  },
  priceContainer: {
    // marginTop: 20,
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  upgradeButton: {
    heigth: '40%',
    // borderWidth:1,
    borderColor: '#fff',
    backgroundColor: '#000',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  upgradeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    fontStyle: 'italic',
  },
});
