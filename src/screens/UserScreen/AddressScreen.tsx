import {
  View,
  Text,
  BackHandler,
  SafeAreaView,
  TextInput,
  ToastAndroid,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Colors from '../../../assets/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {device_height, device_width} from '../style';
import {TouchableOpacity} from 'react-native';
import CommonMessage from '../../../constants/CommonMessage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {
//   UpdateUserAddressAPI,
//   createUserAddressAPI,
//   getAddressByIdAPI,
//   getUserAllAddressAPI,
//   removeAddressAPI,
// } from '../../redux/actions/Action';
import i18n from 'i18next';
import {name_reg, phoneRegex} from '../../../constants/Constants';
import LoadingScreen from '../CommonScreens/LoadingScreen';
import CommonModalUser from '../CommonScreens/CommonModalUser';
import { useNavigation } from '@react-navigation/native';
import { getAddressByIdAPI, selectAddressInfo } from '../../redux/reducers/GetAddressByIdReducer';
import { getUserAllAddressAPI, selectAllAddressInfo } from '../../redux/reducers/GetAllAddressReducer';
import { UpdateUserAddressAPI, createUserAddressAPI, removeAddressAPI } from '../../redux/actions/MyStoreAPI';
import { selectStudentInfo } from '../../redux/reducers/StudentInfoReducer';
import { useAppSelector } from '../../redux/store/reducerHook';

const AddressScreen = ({route}) => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation()
  const {t: trans} = i18n;
  const {
    addressID = '',
    isEdit = false,
    name = '',
    phone = '',
    alphone = '',
    houseNo = '',
    area = '',
    street = '',
    disrict = '',
    estate = '',
    country = '',
    pincode = '',
  } = route.params;
  console.log(route.params, '========== route.params');

  const childInfo = useAppSelector(selectStudentInfo) as ChildInfo;
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
    scholarship: object[];
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
  const {
    _id: id = '',
    stageid = '',
    childid = '',
    boardid = '',
    stage = '',
    scholarship = [],
    name: userName = '',
    fname = '',
    gender = '',
    lname = '',
    email = '',
    phone: phone_num = '',
    image = '',
    age = '',
    address = '',
    language = '',
  } = childInfo;

  console.log(childInfo, "====================childinfo");

  const [loading, setLoading] = useState(false);
  const [st_address, setSt_address] = useState(AllAddress);
  const [contentLoading, setContentLoading] = useState(true);
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [altPhoneError, setAltPhoneError] = useState(false);
  const [pincodeError, setPincodeError] = useState(false);
  const [houseNoError, setHouseNoError] = useState(false);
  const [areaError, setAreaError] = useState(false);
  const [streetError, setStreetError] = useState(false);
  const [districtError, setDistrictError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [addresssID, setAddresssID] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);

  const [info, setInfo] = useState({
    st_name: fname + ' ' + lname,
    st_phone: phone_num,
    // st_address: '',
    st_pincode: '',
    st_altPhone: '',
    st_HouseNo: '',
    st_street: '',
    st_area: '',
    st_disrict: '',
    st_estate: 'Odisha',
    st_country: 'India',
  });

  // const {AddressData = []} = useSelector(state => state.GetAddressByIdReducer);
  const AddressData = useAppSelector(selectAddressInfo)
  console.log(AddressData, 'AddressData=============');

  const [addressInfo, setAddressInfo] = useState({
    child_name: name,
    child_phone: phone,
    // child_address: '',
    child_pincode: pincode,
    child_altPhone: alphone,
    child_HouseNo: houseNo,
    child_street: street,
    child_area: area,
    child_disrict: disrict,
    child_estate: 'Odisha',
    child_country: 'India',
  });

  const {
    st_name,
    st_phone,
    st_pincode,
    // st_address,
    st_altPhone,
    st_HouseNo,
    st_street,
    st_area,
    st_disrict,
    st_estate,
    st_country,
  } = info;
  console.log(info, '=============info');

  const {
    child_name,
    child_phone,
    child_pincode,
    // child_address,
    child_altPhone,
    child_HouseNo,
    child_street,
    child_area,
    child_disrict,
    child_estate,
    child_country,
  } = addressInfo;
  console.log(addressInfo, '=============addressInfo');

  useEffect(() => {
    if (addressInfo != '') {
      setTimeout(() => {
        setContentLoading(false);
      }, 1000);
    }
    dispatch(getAddressByIdAPI(addressID));

    // if (isEdit == true) {
    //   setAddressInfo({
    //     // st_address: '',
    //     child_name: fname + ' ' + lname,
    //     child_phone: phone,
    //     child_pincode: pincode,
    //     child_altPhone: alphone,
    //     child_HouseNo: houseNo,
    //     child_street: street,
    //     child_area: area,
    //     child_disrict: disrict,
    //     child_estate: 'Odisha',
    //     child_country: 'India',
    //   });
    // } else {
    //   if (Object.keys(childInfo).length != 0) {
    //     setInfo({
    //       // st_address: '',
    //       st_name: fname + ' ' + lname,
    //       st_phone: phone,
    //       st_pincode: info.st_pincode,
    //       st_altPhone: info.st_altPhone,
    //       st_HouseNo: info.st_HouseNo,
    //       st_street: info.st_street,
    //       st_area: info.st_area,
    //       st_disrict: info.st_disrict,
    //       st_estate: 'Odisha',
    //       st_country: 'India',
    //     });
    //   }
    // }
  }, [childInfo]);

  // const {AllAddress = []} = useSelector(state => state.GetAllAddressReducer);
  // console.log(AllAddress, 'AllAddress////////////////////');
  const AllAddress = useAppSelector(selectAllAddressInfo);
  // console.log(AllAddress, 'AllAddress.............');

  // const address = 'ctc';

  useEffect(() => {
    navigation.addListener('focus', () => {
      //   setSelectedIndex(1);
      dispatch(getUserAllAddressAPI(childid));

      BackHandler.addEventListener('hardwareBackPress', () => {
        // navigation.goBack();
        dispatch(getUserAllAddressAPI(childid));
        navigation.navigate('MyCart', {AllAddress: st_address});
        return true;
      });
      if (isEdit == true) {
        setAddressInfo({
          // st_address: '',
          child_name: fname + ' ' + lname,
          child_phone: phone_num,
          child_pincode: pincode,
          child_altPhone: alphone,
          child_HouseNo: houseNo,
          child_street: street,
          child_area: area,
          child_disrict: disrict,
          child_estate: 'Odisha',
          child_country: 'India',
        });
      } else {
        if (Object.keys(childInfo).length != 0) {
          setInfo({
            // st_address: '',
            st_name: fname + ' ' + lname,
            st_phone: phone_num,
            st_pincode: info.st_pincode,
            st_altPhone: info.st_altPhone,
            st_HouseNo: info.st_HouseNo,
            st_street: info.st_street,
            st_area: info.st_area,
            st_disrict: info.st_disrict,
            st_estate: 'Odisha',
            st_country: 'India',
          });
        }
      }
    });
    return () => {
      //   setSelectedIndex(1);
      dispatch(getUserAllAddressAPI(childid));

      BackHandler.removeEventListener('hardwareBackPress', () => {
        // navigation.goBack();
        dispatch(getUserAllAddressAPI(childid));
        navigation.navigate('MyCart', {AllAddress: st_address});
        return true;
      });
    };
  }, []);

  const handleInputChange = (inputName, inputValue) => {
    if (inputName == 'st_name') {
      if (!name_reg.test(inputValue)) {
        setNameError(true);
      } else {
        setNameError(false);
      }
    } else if (inputName == 'st_phone') {
      if (!phoneRegex.test(inputValue)) {
        setPhoneError(true);
      } else {
        setPhoneError(false);
      }
    } else if (inputName == 'st_altPhone') {
      if (!phoneRegex.test(inputValue)) {
        setAltPhoneError(true);
      } else {
        setAltPhoneError(false);
      }
    } else if (inputName == 'st_pincode') {
      if (inputValue.length < 6) {
        setPincodeError(true);
      } else {
        setPincodeError(false);
      }
    } else if (inputName == 'st_HouseNo') {
      if (inputValue.length < 3) {
        setHouseNoError(true);
      } else {
        setHouseNoError(false);
      }
    } else if (inputName == 'st_area') {
      if (inputValue.length < 3) {
        setAreaError(true);
      } else {
        setAreaError(false);
      }
    } else if (inputName == 'st_disrict') {
      if (inputValue.length < 3) {
        setDistrictError(true);
      } else {
        setDistrictError(false);
      }
    } else if (inputName == 'st_street') {
      if (inputValue.length < 4) {
        setStreetError(true);
      } else {
        setStreetError(false);
      }
    } else if (inputName == 'st_state') {
      if (inputValue.length < 4) {
        setStateError(true);
      } else {
        setStateError(false);
      }
    } else if (inputName == 'st_country') {
      if (inputValue.length < 4) {
        setCountryError(true);
      } else {
        setCountryError(false);
      }
    }
    setInfo(Info => ({...Info, [inputName]: inputValue}));
  };

  const handleEditInputChange = (inputName, inputValue) => {
    if (inputName == 'child_name') {
      if (!name_reg.test(inputValue)) {
        setNameError(true);
      } else {
        setNameError(false);
      }
    } else if (inputName == 'child_phoneNo') {
      if (!phoneRegex.test(inputValue)) {
        setPhoneError(true);
      } else {
        setPhoneError(false);
      }
    } else if (inputName == 'child_alphone') {
      if (!phoneRegex.test(inputValue)) {
        setAltPhoneError(true);
      } else {
        setAltPhoneError(false);
      }
    } else if (inputName == 'child_pincode') {
      if (inputValue.length < 6) {
        setPincodeError(true);
      } else {
        setPincodeError(false);
      }
    } else if (inputName == 'child_houseNo') {
      if (inputValue.length < 3) {
        setHouseNoError(true);
      } else {
        setHouseNoError(false);
      }
    } else if (inputName == 'child_area') {
      if (inputValue.length < 3) {
        setAreaError(true);
      } else {
        setAreaError(false);
      }
    } else if (inputName == 'child_disrict') {
      if (inputValue.length < 3) {
        setDistrictError(true);
      } else {
        setDistrictError(false);
      }
    } else if (inputName == 'child_street') {
      if (inputValue.length < 4) {
        setStreetError(true);
      } else {
        setStreetError(false);
      }
    } else if (inputName == 'child_state') {
      if (inputValue.length < 4) {
        setStateError(true);
      } else {
        setStateError(false);
      }
    } else if (inputName == 'child_country') {
      if (inputValue.length < 4) {
        setCountryError(true);
      } else {
        setCountryError(false);
      }
    }
    setAddressInfo(addressInfo => ({...addressInfo, [inputName]: inputValue}));
  };

  const handleEditAddress = async () => {
    //console.log("PRESSEDDDD");
    const add_validate =
      addressInfo.child_name == '' ||
      addressInfo.child_phone == '' ||
      addressInfo.child_pincode == '' ||
      addressInfo.child_HouseNo == '' ||
      addressInfo.child_area == '' ||
      addressInfo.child_disrict == '';

    //const phone_reg = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    let phone_validate = false;
    let name_validate = false;
    let pin_validate = false;
    let address_validate = false;
    if (
      addressInfo.child_name ||
      addressInfo.child_phone ||
      addressInfo.child_pincode ||
      addressInfo.child_HouseNo ||
      addressInfo.child_area ||
      addressInfo.child_disrict
    ) {
      phone_validate = phoneRegex.test(addressInfo.child_phone);
      name_validate = name_reg.test(addressInfo.child_name);
      pin_validate = addressInfo.child_pincode.length == 6;
      //   address_validate =
      //     info.st_HouseNo.length >= 3 &&
      //     info.st_area.length >= 3 &&
      //     info.st_disrict.length >= 3;
      // email_validate = emailRegex.test(info.p_email);
    }
    const {
      child_name = '',
      child_phone = '',
      child_pincode = '',
      // child_address = '',
      child_altPhone = '',
      child_HouseNo = '',
      child_street = '',
      child_area = '',
      child_disrict = '',
      child_estate = '',
      child_country = '',
    } = addressInfo;

    const UpdateBodyData = {
      id: addressID,
      name: child_name,
      phone: child_phone,
      alphone: child_altPhone,
      houseNo: child_HouseNo,
      street: child_street,
      area: child_area,
      disrict: child_disrict,
      estate: child_estate,
      country: child_country,
      pincode: child_pincode,
    };
    console.log(UpdateBodyData, 'mycart_UpdateBodyData....');

    if (add_validate == true) {
      if (addressInfo.child_phone == '' || phone_validate == false) {
        setPhoneError(true);
      } else {
        setPhoneError(false);
      }
      if (addressInfo.child_name == '' || name_validate == false) {
        setNameError(true);
      } else {
        setNameError(false);
      }
      if (addressInfo.child_HouseNo == '') {
        setHouseNoError(true);
      } else {
        setHouseNoError(false);
      }
      if (addressInfo.child_area == '') {
        setAreaError(true);
      } else {
        setAreaError(false);
      }
      if (addressInfo.child_street == '') {
        setStreetError(true);
      } else {
        setStreetError(false);
      }
      if (addressInfo.child_disrict == '') {
        setDistrictError(true);
      } else {
        setDistrictError(false);
      }
      if (addressInfo.child_estate == '') {
        setStateError(true);
      } else {
        setStateError(false);
      }
      if (addressInfo.child_country == '') {
        setCountryError(true);
      } else {
        setCountryError(false);
      }
      if (addressInfo.child_pincode == '' || pin_validate == false) {
        setPincodeError(true);
      } else {
        setPincodeError(false);
      }
      ToastAndroid.showWithGravityAndOffset(
        'Please Enter Valid Input',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (name_validate == false) {
      setNameError(true);
      ToastAndroid.showWithGravityAndOffset(
        'Please Enter Your Valid Name',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (phone_validate == false) {
      setPhoneError(true);
      ToastAndroid.showWithGravityAndOffset(
        'Please Enter Valid Phone Number',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (pin_validate == false) {
      setPincodeError(true);
      ToastAndroid.showWithGravityAndOffset(
        'Please Enter Valid Pincode',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      // } else if (address_validate == false) {
      //   setPincodeError(true);
      //   ToastAndroid.showWithGravityAndOffset(
      //     'Please Enter Valid Address',
      //     ToastAndroid.LONG,
      //     ToastAndroid.BOTTOM,
      //     25,
      //     50,
      //   );
    } else {
      // ToastAndroid.showWithGravityAndOffset(
      //   'Your query sended successfully',
      //   ToastAndroid.LONG,
      //   ToastAndroid.BOTTOM,
      //   25,
      //   50,
      // );
      //   if (isEdit == true) {
    UpdateUserAddressAPI(UpdateBodyData, handleCallback);
      //   } else {
      //     dispatch(createUserAddressAPI(bodyData, handleCallback));
      //   }
    }
  };

  const handleAddAddress = async () => {
    //console.log("PRESSEDDDD");
    const validate =
      info.st_name == '' ||
      info.st_phone == '' ||
      info.st_pincode == '' ||
      info.st_HouseNo == '' ||
      info.st_area == '' ||
      info.st_disrict == '';

    //const phone_reg = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    let phone_validate = false;
    let name_validate = false;
    let pin_validate = false;
    let address_validate = false;
    if (
      info.st_phone ||
      info.st_name ||
      info.st_pincode ||
      info.st_HouseNo ||
      info.st_area ||
      info.st_disrict
    ) {
      phone_validate = phoneRegex.test(info.st_phone);
      name_validate = name_reg.test(info.st_name);
      pin_validate = info.st_pincode.length == 6;
      address_validate =
        info.st_HouseNo.length >= 3 &&
        info.st_area.length >= 3 &&
        info.st_disrict.length >= 3;
      // email_validate = emailRegex.test(info.p_email);
    }
    const {
      st_name: name = '',
      st_phone: phone = '',
      st_pincode: pincode = '',
      st_altPhone = '',
      st_area = '',
      st_street = '',
      st_HouseNo = '',
      st_disrict = '',
      st_estate = '',
      st_country = '',
    } = info;

    const bodyData = {
      userid: childid,
      name: name,
      phone: phone,
      alphone: st_altPhone,
      houseNo: st_HouseNo,
      street: st_street,
      area: st_area,
      disrict: st_disrict,
      estate: st_estate,
      country: st_country,
      pincode: pincode,
      selectedadress: false,
    };
    console.log(bodyData, 'mycart_bodyData....');

    const UpdateBodyData = {
      id: addressID,
      name: name,
      phone: phone,
      alphone: st_altPhone,
      houseNo: st_HouseNo,
      street: st_street,
      area: st_area,
      disrict: st_disrict,
      estate: st_estate,
      country: st_country,
      pincode: pincode,
      selectedadress: false,
    };
    console.log(UpdateBodyData, 'mycart_UpdateBodyData....');

    if (validate == true) {
      if (info.st_phone == '' || phone_validate == false) {
        setPhoneError(true);
      } else {
        setPhoneError(false);
      }
      if (info.st_name == '' || name_validate == false) {
        setNameError(true);
      } else {
        setNameError(false);
      }
      if (info.st_HouseNo == '' || address_validate == false) {
        setHouseNoError(true);
      } else {
        setHouseNoError(false);
      }
      if (info.st_area == '' || address_validate == false) {
        setAreaError(true);
      } else {
        setAreaError(false);
      }
      if (info.st_street == '' || address_validate == false) {
        setStreetError(true);
      } else {
        setStreetError(false);
      }
      if (info.st_disrict == '' || address_validate == false) {
        setDistrictError(true);
      } else {
        setDistrictError(false);
      }
      if (info.st_estate == '' || address_validate == false) {
        setStateError(true);
      } else {
        setStateError(false);
      }
      if (info.st_country == '' || address_validate == false) {
        setCountryError(true);
      } else {
        setCountryError(false);
      }
      if (info.st_pincode == '' || pin_validate == false) {
        setPincodeError(true);
      } else {
        setPincodeError(false);
      }
      ToastAndroid.showWithGravityAndOffset(
        'Please Enter Valid Input',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (name_validate == false) {
      setNameError(true);
      ToastAndroid.showWithGravityAndOffset(
        'Please Enter Your Valid Name',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (phone_validate == false) {
      setPhoneError(true);
      ToastAndroid.showWithGravityAndOffset(
        'Please Enter Valid Phone Number',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (pin_validate == false) {
      setPincodeError(true);
      ToastAndroid.showWithGravityAndOffset(
        'Please Enter Valid Pincode',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (address_validate == false) {
      setPincodeError(true);
      ToastAndroid.showWithGravityAndOffset(
        'Please Enter Valid Address',
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
      if (isEdit == true) {
        UpdateUserAddressAPI(UpdateBodyData, handleCallback);
      } else {
      createUserAddressAPI(bodyData, handleCallback);
      }
    }
  };

  const handleCallback = () => {
    console.log('called0000000000');
    dispatch(getUserAllAddressAPI(childid));
    // setAddressModal(false);
    if (isEdit == true) {
      CommonMessage('Address Updated');
      setAddressInfo([]);
      // navigation.goBack();
      setSt_address(AllAddress)
      console.log(AllAddress,"=============AllAddress_data-------------");
      navigation.navigate('MyCart', {AllAddress: st_address});
    } else {
      CommonMessage('Address Added');
      setSt_address(AllAddress)
      // setAddressInfo('');
      // navigation.goBack();
      navigation.navigate('MyCart', {AllAddress: st_address});
    }
  };

  const handleDelete = () => {
    removeAddressAPI(addressID, deleteCallBack);
  };

  const deleteCallBack = () => {
    setDeleteModal(false);
    dispatch(getUserAllAddressAPI(childid));
    // navigation.goBack();
    navigation.navigate('MyCart', {AllAddress: st_address});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.secondary}}>
      <View>
        {contentLoading == true ? (
          <>
          <View
            style={{
              height: device_height * 0.8,
              width: device_width,
              alignItems: 'center',
              // alignSelf:'center',
              // flex:1,
              justifyContent: 'center',
            }}>
            <LoadingScreen flag={contentLoading} />
            </View>
              
            {/* <View
            style={{
              height: device_height * 0.8,
              width: device_width,
              alignItems: 'center',
              // alignSelf:'center',
              // flex:1,
              justifyContent: 'center',
            }}>
            <ActivityIndicator
              size="medium"
              color={Colors.primary}
              style={{
                alignSelf: 'center',
                // paddingRight: 10,
                justifyContent: 'center',
                fontSize: 12,
              }}
            />
            </View> */}
          </>
        ) : (
          <>
            {/* {loading ? (
              <LoadingScreen flag={loading} />
            ) : ( */}
            <View style={{borderWidth: 0}}>
              <ScrollView
                showsVerticalScrollIndicator={true}
                style={{
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderColor: '#ccc',
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                }}>
                {isEdit == true ? (
                  <View
                    style={{
                      // borderWidth: 1,
                      elevation: 15,
                      backgroundColor: '#fff',
                      width: device_width * 0.94,
                      paddingVertical: 20,
                      borderRadius: 10,
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: 20,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderWidth: 1,
                        borderColor: '#aaa',
                        // paddingBottom: 5,
                        // marginTop: 30,
                        // paddingBottom: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        marginHorizontal: 20,
                      }}>
                      <TextInput
                        placeholder={trans(`Your Name`)}
                        placeholderTextColor={'#999'}
                        value={child_name}
                        onChangeText={val =>
                          handleEditInputChange('child_name', val)
                        }
                        style={{
                          flex: 1,
                          marginTop: -5,
                          marginBottom: -5,
                          paddingLeft: 10,
                          color: '#333',
                          fontWeight: '600',
                        }}
                      />
                    </View>
                    {nameError && (
                      <Text
                        style={{
                          color: Colors.red,
                          marginBottom: 5,
                          marginTop: -3,
                          alignSelf: 'flex-start',
                          marginLeft: 25,
                          fontSize: 12,
                        }}>
                        {trans('Please Enter Your Name')}
                      </Text>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderWidth: 1,
                        borderColor: '#aaa',
                        // paddingBottom: 5,
                        // marginTop: 30,
                        // paddingBottom: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        marginHorizontal: 20,
                      }}>
                      <TextInput
                        placeholder={trans(`Phone`)}
                        placeholderTextColor={'#999'}
                        value={child_phone}
                        keyboardType="number-pad"
                        onChangeText={val =>
                          handleEditInputChange('child_phone', val)
                        }
                        style={{
                          flex: 1,
                          marginTop: -5,
                          marginBottom: -5,
                          paddingLeft: 10,
                          color: '#333',
                          fontWeight: '600',
                        }}
                      />
                    </View>
                    {phoneError && (
                      <Text
                        style={{
                          color: Colors.red,
                          marginBottom: 5,
                          marginTop: -3,
                          alignSelf: 'flex-start',
                          marginLeft: 25,
                          fontSize: 12,
                        }}>
                        {trans('Please Enter Valid Phone Number')}
                      </Text>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderWidth: 1,
                        borderColor: '#aaa',
                        // paddingBottom: 5,
                        // marginTop: 30,
                        // paddingBottom: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        marginHorizontal: 20,
                      }}>
                      <TextInput
                        placeholder={trans(`Alternative Phone`)}
                        placeholderTextColor={'#999'}
                        value={child_altPhone}
                        keyboardType="number-pad"
                        onChangeText={val =>
                          handleEditInputChange('child_altPhone', val)
                        }
                        style={{
                          flex: 1,
                          marginTop: -5,
                          marginBottom: -5,
                          paddingLeft: 10,
                          color: '#333',
                          fontWeight: '600',
                        }}
                      />
                    </View>
                    {altPhoneError && (
                      <Text
                        style={{
                          color: Colors.red,
                          marginBottom: 5,
                          marginTop: -3,
                          alignSelf: 'flex-start',
                          marginLeft: 25,
                          fontSize: 12,
                        }}>
                        {trans('Please Enter Valid Phone Number')}
                      </Text>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderWidth: 1,
                        borderColor: '#aaa',
                        // paddingBottom: 5,
                        // marginTop: 30,
                        // paddingBottom: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        marginHorizontal: 20,
                      }}>
                      <TextInput
                        placeholder={trans(`House Number`)}
                        placeholderTextColor={'#999'}
                        value={child_HouseNo}
                        textAlignVertical="top"
                        onChangeText={val =>
                          handleEditInputChange('child_HouseNo', val)
                        }
                        style={{
                          flex: 1,
                          marginTop: -3,
                          marginBottom: -7,
                          paddingLeft: 10,
                          color: '#333',
                          fontWeight: '500',
                        }}
                      />
                    </View>
                    {houseNoError && (
                      <Text
                        style={{
                          color: Colors.red,
                          marginBottom: 5,
                          marginTop: -3,
                          alignSelf: 'flex-start',
                          marginLeft: 25,
                          fontSize: 12,
                        }}>
                        {trans('Please Enter Valid Address')}
                      </Text>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderWidth: 1,
                        borderColor: '#aaa',
                        // paddingBottom: 5,
                        // marginTop: 30,
                        // paddingBottom: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        marginHorizontal: 20,
                      }}>
                      <TextInput
                        placeholder={trans(`Area Name`)}
                        placeholderTextColor={'#999'}
                        value={child_area}
                        textAlignVertical="top"
                        onChangeText={val =>
                          handleEditInputChange('child_area', val)
                        }
                        style={{
                          flex: 1,
                          marginTop: -3,
                          marginBottom: -7,
                          paddingLeft: 10,
                          color: '#333',
                          fontWeight: '500',
                        }}
                      />
                    </View>
                    {areaError && (
                      <Text
                        style={{
                          color: Colors.red,
                          marginBottom: 5,
                          marginTop: -3,
                          alignSelf: 'flex-start',
                          marginLeft: 25,
                          fontSize: 12,
                        }}>
                        {trans('Please Enter Valid Area')}
                      </Text>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderWidth: 1,
                        borderColor: '#aaa',
                        // paddingBottom: 5,
                        // marginTop: 30,
                        // paddingBottom: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        marginHorizontal: 20,
                      }}>
                      <TextInput
                        placeholder={trans(`Street Name`)}
                        placeholderTextColor={'#999'}
                        value={child_street}
                        textAlignVertical="top"
                        onChangeText={val =>
                          handleEditInputChange('child_street', val)
                        }
                        style={{
                          flex: 1,
                          marginTop: -3,
                          marginBottom: -7,
                          paddingLeft: 10,
                          color: '#333',
                          fontWeight: '500',
                        }}
                      />
                    </View>
                    {streetError && (
                      <Text
                        style={{
                          color: Colors.red,
                          marginBottom: 5,
                          marginTop: -3,
                          alignSelf: 'flex-start',
                          marginLeft: 25,
                          fontSize: 12,
                        }}>
                        {trans('Please Enter Valid Street Name')}
                      </Text>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderWidth: 1,
                        borderColor: '#aaa',
                        // paddingBottom: 5,
                        // marginTop: 30,
                        // paddingBottom: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        marginHorizontal: 20,
                      }}>
                      <TextInput
                        placeholder={trans(`District`)}
                        placeholderTextColor={'#999'}
                        value={child_disrict}
                        textAlignVertical="top"
                        onChangeText={val =>
                          handleEditInputChange('child_disrict', val)
                        }
                        style={{
                          flex: 1,
                          marginTop: -3,
                          marginBottom: -7,
                          // borderWidth:1,
                          paddingLeft: 10,
                          color: '#333',
                          fontWeight: '500',
                        }}
                      />
                    </View>
                    {districtError && (
                      <Text
                        style={{
                          color: Colors.red,
                          marginBottom: 5,
                          marginTop: -3,
                          alignSelf: 'flex-start',
                          marginLeft: 25,
                          fontSize: 12,
                        }}>
                        {trans('Please Enter Valid Address')}
                      </Text>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderWidth: 1,
                        borderColor: '#aaa',
                        // paddingBottom: 5,
                        // marginTop: 30,
                        // paddingBottom: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        marginHorizontal: 20,
                      }}>
                      <TextInput
                        placeholder={trans(`State`)}
                        placeholderTextColor={'#999'}
                        value={child_estate}
                        textAlignVertical="top"
                        onChangeText={val =>
                          handleEditInputChange('child_estate', val)
                        }
                        style={{
                          flex: 1,
                          marginTop: -3,
                          marginBottom: -7,
                          paddingLeft: 10,
                          color: '#333',
                          fontWeight: '500',
                        }}
                      />
                    </View>
                    {stateError && (
                      <Text
                        style={{
                          color: Colors.red,
                          marginBottom: 5,
                          marginTop: -3,
                          alignSelf: 'flex-start',
                          marginLeft: 25,
                          fontSize: 12,
                        }}>
                        {trans('Please Enter Valid State Name')}
                      </Text>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderWidth: 1,
                        borderColor: '#aaa',
                        // paddingBottom: 5,
                        // marginTop: 30,
                        // paddingBottom: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        marginHorizontal: 20,
                      }}>
                      <TextInput
                        placeholder={trans(`Country Name`)}
                        placeholderTextColor={'#999'}
                        value={child_country}
                        textAlignVertical="top"
                        onChangeText={val =>
                          handleEditInputChange('child_country', val)
                        }
                        style={{
                          flex: 1,
                          marginTop: -3,
                          marginBottom: -7,
                          paddingLeft: 10,
                          color: '#333',
                          fontWeight: '500',
                        }}
                      />
                    </View>
                    {countryError && (
                      <Text
                        style={{
                          color: Colors.red,
                          marginBottom: 5,
                          marginTop: -3,
                          alignSelf: 'flex-start',
                          marginLeft: 25,
                          fontSize: 12,
                        }}>
                        {trans('Please Enter Valid Country Name')}
                      </Text>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderWidth: 1,
                        borderColor: '#aaa',
                        // paddingBottom: 5,
                        // marginTop: 30,
                        // paddingBottom: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        marginHorizontal: 20,
                      }}>
                      <TextInput
                        placeholder={trans(`Pincode`)}
                        placeholderTextColor={'#999'}
                        value={child_pincode}
                        keyboardType="number-pad"
                        onChangeText={val =>
                          handleEditInputChange('child_pincode', val)
                        }
                        style={{
                          flex: 1,
                          marginTop: -5,
                          marginBottom: -5,
                          paddingLeft: 10,
                          color: '#333',
                          fontWeight: '500',
                        }}
                      />
                    </View>
                    {pincodeError && (
                      <Text
                        style={{
                          color: Colors.red,
                          marginBottom: 5,
                          marginTop: -3,
                          alignSelf: 'flex-start',
                          marginLeft: 25,
                          fontSize: 12,
                        }}>
                        {trans('Please Enter Valid Pincode')}
                      </Text>
                    )}
                    <View
                      style={{
                        marginVertical: 20,
                        width: '100%',
                      }}>
                      <TouchableOpacity
                        disabled={
                          child_name !== '' &&
                          child_phone !== '' &&
                          // child_altPhone !== '' &&
                          child_HouseNo !== '' &&
                          child_area !== '' &&
                          child_street !== '' &&
                          child_disrict !== '' &&
                          child_estate !== '' &&
                          child_pincode !== '' &&
                          child_country !== ''
                            ? false
                            : true
                        }
                        style={{
                          width: '80%',
                          borderRadius: 10,
                          backgroundColor:
                            child_name !== '' &&
                            child_phone !== '' &&
                            // child_altPhone !== '' &&
                            child_HouseNo !== '' &&
                            child_area !== '' &&
                            child_street !== '' &&
                            child_disrict !== '' &&
                            child_estate !== '' &&
                            child_pincode !== '' &&
                            child_country !== ''
                              ? '#263d2d'
                              : '#999',
                          alignSelf: 'center',
                          alignItems: 'center',
                          paddingVertical: 12,
                          // borderWidth:1
                          // marginBottom: 20,
                        }}
                        onPress={() => {
                          handleEditAddress();
                          // CommonMessage('Address Updated');
                          // setAddressModal(false);
                        }}>
                        <Text
                          style={{
                            fontWeight: '600',
                            color: '#fff',
                            fontSize: 15,
                          }}>
                          {trans('Update Address')}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setAddresssID(addressID);
                          setDeleteModal(true);
                          // dispatch(
                          //   getAddressByIdAPI(undefined, addressId, setLoading),
                          // );
                          // setInfo(rec => ({...rec}));
                        }}
                        style={{
                          width: '80%',
                          borderRadius: 10,
                          flexDirection: 'row',
                          backgroundColor: 'firebrick',
                          alignSelf: 'center',
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingVertical: 12,
                          // borderWidth:1
                          marginTop: 10,
                        }}>
                        <MaterialIcons
                          name="delete-forever"
                          color={'#fff'}
                          size={20}
                        />
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 14,
                            color: '#fff',
                            textDecorationLine: 'underline',
                            marginLeft: 5,
                          }}>
                          Remove Address
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      // borderWidth: 1,
                      elevation: 15,
                      backgroundColor: '#fff',
                      width: device_width * 0.94,
                      paddingVertical: 20,
                      borderRadius: 10,
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderWidth: 1,
                        borderColor: '#aaa',
                        // paddingBottom: 5,
                        // marginTop: 30,
                        // paddingBottom: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        marginHorizontal: 20,
                      }}>
                      <TextInput
                        placeholder={trans(`Your Name`)}
                        placeholderTextColor={'#999'}
                        value={info.st_name}
                        onChangeText={val => handleInputChange('st_name', val)}
                        style={{
                          flex: 1,
                          marginTop: -5,
                          marginBottom: -5,
                          paddingLeft: 10,
                          color: '#333',
                          fontWeight: '600',
                        }}
                      />
                    </View>
                    {nameError && (
                      <Text
                        style={{
                          color: Colors.red,
                          marginBottom: 5,
                          marginTop: -3,
                          alignSelf: 'flex-start',
                          marginLeft: 25,
                          fontSize: 12,
                        }}>
                        {trans('Please Enter Your Name')}
                      </Text>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderWidth: 1,
                        borderColor: '#aaa',
                        // paddingBottom: 5,
                        // marginTop: 30,
                        // paddingBottom: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        marginHorizontal: 20,
                      }}>
                      <TextInput
                        placeholder={trans(`Phone`)}
                        placeholderTextColor={'#999'}
                        value={info.st_phone}
                        keyboardType="number-pad"
                        onChangeText={val => handleInputChange('st_phone', val)}
                        style={{
                          flex: 1,
                          marginTop: -5,
                          marginBottom: -5,
                          paddingLeft: 10,
                          color: '#333',
                          fontWeight: '600',
                        }}
                      />
                    </View>
                    {phoneError && (
                      <Text
                        style={{
                          color: Colors.red,
                          marginBottom: 5,
                          marginTop: -3,
                          alignSelf: 'flex-start',
                          marginLeft: 25,
                          fontSize: 12,
                        }}>
                        {trans('Please Enter Valid Phone Number')}
                      </Text>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderWidth: 1,
                        borderColor: '#aaa',
                        // paddingBottom: 5,
                        // marginTop: 30,
                        // paddingBottom: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        marginHorizontal: 20,
                      }}>
                      <TextInput
                        placeholder={trans(`Alternative Phone`)}
                        placeholderTextColor={'#999'}
                        value={info.st_altPhone}
                        keyboardType="number-pad"
                        onChangeText={val =>
                          handleInputChange('st_altPhone', val)
                        }
                        style={{
                          flex: 1,
                          marginTop: -5,
                          marginBottom: -5,
                          paddingLeft: 10,
                          color: '#333',
                          fontWeight: '600',
                        }}
                      />
                    </View>
                    {altPhoneError && (
                      <Text
                        style={{
                          color: Colors.red,
                          marginBottom: 5,
                          marginTop: -3,
                          alignSelf: 'flex-start',
                          marginLeft: 25,
                          fontSize: 12,
                        }}>
                        {trans('Please Enter Valid Phone Number')}
                      </Text>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderWidth: 1,
                        borderColor: '#aaa',
                        // paddingBottom: 5,
                        // marginTop: 30,
                        // paddingBottom: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        marginHorizontal: 20,
                      }}>
                      <TextInput
                        placeholder={trans(`House Number`)}
                        placeholderTextColor={'#999'}
                        value={info.st_HouseNo}
                        textAlignVertical="top"
                        onChangeText={val =>
                          handleInputChange('st_HouseNo', val)
                        }
                        style={{
                          flex: 1,
                          marginTop: -3,
                          marginBottom: -7,
                          paddingLeft: 10,
                          color: '#333',
                          fontWeight: '500',
                        }}
                      />
                    </View>
                    {houseNoError && (
                      <Text
                        style={{
                          color: Colors.red,
                          marginBottom: 5,
                          marginTop: -3,
                          alignSelf: 'flex-start',
                          marginLeft: 25,
                          fontSize: 12,
                        }}>
                        {trans('Please Enter Valid Address')}
                      </Text>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderWidth: 1,
                        borderColor: '#aaa',
                        // paddingBottom: 5,
                        // marginTop: 30,
                        // paddingBottom: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        marginHorizontal: 20,
                      }}>
                      <TextInput
                        placeholder={trans(`Area Name`)}
                        placeholderTextColor={'#999'}
                        value={info.st_area}
                        textAlignVertical="top"
                        onChangeText={val => handleInputChange('st_area', val)}
                        style={{
                          flex: 1,
                          marginTop: -3,
                          marginBottom: -7,
                          paddingLeft: 10,
                          color: '#333',
                          fontWeight: '500',
                        }}
                      />
                    </View>
                    {areaError && (
                      <Text
                        style={{
                          color: Colors.red,
                          marginBottom: 5,
                          marginTop: -3,
                          alignSelf: 'flex-start',
                          marginLeft: 25,
                          fontSize: 12,
                        }}>
                        {trans('Please Enter Valid Area')}
                      </Text>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderWidth: 1,
                        borderColor: '#aaa',
                        // paddingBottom: 5,
                        // marginTop: 30,
                        // paddingBottom: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        marginHorizontal: 20,
                      }}>
                      <TextInput
                        placeholder={trans(`Street Name`)}
                        placeholderTextColor={'#999'}
                        value={st_street}
                        textAlignVertical="top"
                        onChangeText={val =>
                          handleInputChange('st_street', val)
                        }
                        style={{
                          flex: 1,
                          marginTop: -3,
                          marginBottom: -7,
                          paddingLeft: 10,
                          color: '#333',
                          fontWeight: '500',
                        }}
                      />
                    </View>
                    {streetError && (
                      <Text
                        style={{
                          color: Colors.red,
                          marginBottom: 5,
                          marginTop: -3,
                          alignSelf: 'flex-start',
                          marginLeft: 25,
                          fontSize: 12,
                        }}>
                        {trans('Please Enter Valid Street Name')}
                      </Text>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderWidth: 1,
                        borderColor: '#aaa',
                        // paddingBottom: 5,
                        // marginTop: 30,
                        // paddingBottom: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        marginHorizontal: 20,
                      }}>
                      <TextInput
                        placeholder={trans(`District`)}
                        placeholderTextColor={'#999'}
                        value={st_disrict}
                        textAlignVertical="top"
                        onChangeText={val =>
                          handleInputChange('st_disrict', val)
                        }
                        style={{
                          flex: 1,
                          marginTop: -3,
                          marginBottom: -7,
                          // borderWidth:1,
                          paddingLeft: 10,
                          color: '#333',
                          fontWeight: '500',
                        }}
                      />
                    </View>
                    {districtError && (
                      <Text
                        style={{
                          color: Colors.red,
                          marginBottom: 5,
                          marginTop: -3,
                          alignSelf: 'flex-start',
                          marginLeft: 25,
                          fontSize: 12,
                        }}>
                        {trans('Please Enter Valid Address')}
                      </Text>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderWidth: 1,
                        borderColor: '#aaa',
                        // paddingBottom: 5,
                        // marginTop: 30,
                        // paddingBottom: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        marginHorizontal: 20,
                      }}>
                      <TextInput
                        placeholder={trans(`State`)}
                        placeholderTextColor={'#999'}
                        value={st_estate}
                        textAlignVertical="top"
                        onChangeText={val =>
                          handleInputChange('st_estate', val)
                        }
                        style={{
                          flex: 1,
                          marginTop: -3,
                          marginBottom: -7,
                          paddingLeft: 10,
                          color: '#333',
                          fontWeight: '500',
                        }}
                      />
                    </View>
                    {stateError && (
                      <Text
                        style={{
                          color: Colors.red,
                          marginBottom: 5,
                          marginTop: -3,
                          alignSelf: 'flex-start',
                          marginLeft: 25,
                          fontSize: 12,
                        }}>
                        {trans('Please Enter Valid State Name')}
                      </Text>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderWidth: 1,
                        borderColor: '#aaa',
                        // paddingBottom: 5,
                        // marginTop: 30,
                        // paddingBottom: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        marginHorizontal: 20,
                      }}>
                      <TextInput
                        placeholder={trans(`Country Name`)}
                        placeholderTextColor={'#999'}
                        value={st_country}
                        textAlignVertical="top"
                        onChangeText={val =>
                          handleInputChange('st_country', val)
                        }
                        style={{
                          flex: 1,
                          marginTop: -3,
                          marginBottom: -7,
                          paddingLeft: 10,
                          color: '#333',
                          fontWeight: '500',
                        }}
                      />
                    </View>
                    {countryError && (
                      <Text
                        style={{
                          color: Colors.red,
                          marginBottom: 5,
                          marginTop: -3,
                          alignSelf: 'flex-start',
                          marginLeft: 25,
                          fontSize: 12,
                        }}>
                        {trans('Please Enter Valid Country Name')}
                      </Text>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderWidth: 1,
                        borderColor: '#aaa',
                        // paddingBottom: 5,
                        // marginTop: 30,
                        // paddingBottom: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        marginHorizontal: 20,
                      }}>
                      <TextInput
                        placeholder={trans(`Pincode`)}
                        placeholderTextColor={'#999'}
                        value={st_pincode}
                        keyboardType="number-pad"
                        onChangeText={val =>
                          handleInputChange('st_pincode', val)
                        }
                        style={{
                          flex: 1,
                          marginTop: -5,
                          marginBottom: -5,
                          paddingLeft: 10,
                          color: '#333',
                          fontWeight: '500',
                        }}
                      />
                    </View>
                    {pincodeError && (
                      <Text
                        style={{
                          color: Colors.red,
                          marginBottom: 5,
                          marginTop: -3,
                          alignSelf: 'flex-start',
                          marginLeft: 25,
                          fontSize: 12,
                        }}>
                        {trans('Please Enter Valid Pincode')}
                      </Text>
                    )}
                    <TouchableOpacity
                      disabled={
                        st_disrict !== '' &&
                        st_HouseNo !== '' &&
                        st_area !== '' &&
                        st_pincode !== ''
                          ? false
                          : true
                      }
                      style={{
                        width: '80%',
                        marginVertical: 20,
                        // width: '100%',
                        borderRadius: 10,
                        backgroundColor:
                          st_disrict !== '' &&
                          st_HouseNo !== '' &&
                          st_area !== '' &&
                          st_pincode !== ''
                            ? '#263d2d'
                            : '#999',
                        alignSelf: 'center',
                        alignItems: 'center',
                        paddingVertical: 12,
                        // borderWidth:1
                        // marginBottom: 20,
                      }}
                      onPress={() => {
                        handleAddAddress();
                        // CommonMessage('Address Updated');
                        // setAddressModal(false);
                      }}>
                      <Text
                        style={{
                          fontWeight: '600',
                          color: '#fff',
                          fontSize: 15,
                        }}>
                        {trans('Add Address')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </ScrollView>
            </View>
          </>
        )}
      </View>
      {deleteModal && (
        <CommonModalUser
          ModalStatus={deleteModal}
          isIconShow={false}
          closeModalFunc={() => setDeleteModal(false)}
          label1={trans(`Are you sure you want to remove this address ?`)}
          label2={trans(`Address will be permanently removed`)}
          yesbtnName={trans('YES')}
          yesbtnFunction={() => handleDelete()}
          nobtnName={trans('NO')}
          nobtnFunction={() => setDeleteModal(false)}
        />
      )}
    </SafeAreaView>
  );
};

export default AddressScreen;
