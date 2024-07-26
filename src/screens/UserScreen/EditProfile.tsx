import React, {useState, useEffect} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ScrollView,
  BackHandler,
  ToastAndroid,
  StatusBar,
  Platform,
} from 'react-native';
import Storage from '../../utils/AsyncStorage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Avatar, Chip, RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
// import {RootState, AppDispatch} from '../redux/store/Store';
import {useTranslation} from 'react-i18next';
import {Dropdown} from 'react-native-element-dropdown';
// import { selectStudentStatus } from '../../redux/reducers/ChildInfoReducer';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../../redux/store/Store';
import {
  getChildDetailsAPI,
  selectStudentInfo,
  selectStudentStatus,
} from '../../redux/reducers/StudentInfoReducer';
import {
  getStandard,
  selectStudentStandard,
  selectStudentStandardStatus,
} from '../../redux/reducers/StandardReducer';
import {getBoard, selectStudentBoard} from '../../redux/reducers/BoardReducer';
import {
  IsTabScreen,
  emailRegex,
  name_reg,
  phoneRegex,
} from '../../../constants/Constants';
import {device_height, device_width} from '../style';
import {updateChildProfile} from '../../redux/actions/UpdateStudentProfile';
import {
  selectStudentLanguage,
  setLanguage,
} from '../../redux/reducers/languageReducer';
import {uploadPhotoApi} from '../../redux/actions/UploadPhoto';
import {getScholarshipByClassAPI} from '../../redux/reducers/GetAllScholarshipReducer';
import {getUserbyId, selectUserInfo} from '../../redux/reducers/loginReducer';
import AsyncStorage from '../../utils/AsyncStorage';
import {
  getState,
  selectStudentState,
} from '../../redux/reducers/GetAllStateReducer';

const EditProfile = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const {t: trans, i18n} = useTranslation();
  const {childId = ''} = route.params;
  console.log(childId, '===================childId route.params');

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
    stateid: any;
    statename: any;
  }
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const count = useAppSelector(selectStudentStatus);
  // const childInfo = useAppSelector(selectStudentInfo) as ChildInfo;
  const {authToken, status, userInfo} = useAppSelector(selectUserInfo);

  // console.log(childInfo, 'childInfo..........');
  const Standard = useAppSelector(selectStudentStandard);
  const standardsts = useAppSelector(selectStudentStandardStatus);
  // console.log(Standard, 'Standard//////////////', standardsts, 'standardsts');
  const Board = useAppSelector(selectStudentBoard);

  const childInfo = useAppSelector(selectStudentInfo) as ChildInfo;

  const selectedLanguage = useAppSelector(selectStudentLanguage);

  // console.log(selectedLanguage, 'selectedLanguage..........');
  ///////////////////
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);

  const [modalStatus, setModalStatus] = useState(false);
  // const [user, setUser] = React.useState();
  const [nightMode, setNightmode] = useState(false);
  const [useremail, setUseremail] = React.useState();
  const [thumb, setthumb] = React.useState('');
  const [fnameError, setFnameError] = useState(false);
  const [lnameError, setLnameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [boardError, setBoardError] = useState(false);
  const [fatherNameError, setFatherNameError] = useState(false);
  const [motherNameError, setMotherNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [standardError, setStandardError] = useState(false);
  const [imageData, setImageData] = useState({image: '', imagename: ''});
  const [altPhoneError, setAltPhoneError] = useState(false);
  const [schoolNameError, setSchoolNameError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [refCodeError, setRefCodeError] = useState(false);
  const [mismatchError, setmismatchError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [genderError, setGenderError] = useState(false);

  const [genderVal, setGender] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const [childAge, setChildAge] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [scholarshipId, selectScholarshipId] = useState();

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
  const asyncScholarship = async () => {
    const asyncScholarshipValue = await Storage.getObject('SchlrshipId');
    console.log(
      asyncScholarshipValue,
      '=======asyncScholarshipValue++++++++++++',
    );
    selectScholarshipId(asyncScholarshipValue);
  };

  useEffect(() => {
    // asyncScholarship()
    navigation.addListener('focus', () => {
      dispatch(getChildDetailsAPI(childID));
      dispatch(getUserbyId(childID));
    });
  }, []);

  const [language, setLanguages] = useState([
    {name: 'ଓଡିଆ', code: 'odia', isSelected: selectedLanguage === 'odia'},
    {
      name: 'English',
      code: 'english',
      isSelected: selectedLanguage === 'english',
    },
    // {name: 'हिंदी', code: 'hindi', isSelected: selectedLanguage === 'hindi'},

    // {name: 'বাঙ্গালি', code: 'bn', isSelected: selectedLanguage === 'bn'},
  ]);

  const {
    _id: childID = '',
    age: p_age = '',
    statename: stateData = '',
    stateid = '',
    childid = '',
    image = '',
    imagename = '',
    fname = '',
    lname = '',
    phone = '',
    name = '',
    isPremium = false,
    gender = '',
    alterphone = '',
    email = '',
  } = userInfo;
  console.log(userInfo, '==================userInfo======================');

  const [value, setValue] = useState(p_age);
  const [statevalue, setStateValue] = useState(stateData);

  const [ages, setAge] = useState('');

  const [info, setInfo] = useState({
    _id: childID,
    firstName: fname,
    lastname: lname,
    phone: phone,
    age: p_age != '' ? p_age : '',
    statename: stateData != '' ? stateData : '',
    stateid: stateid,
    p_image: image,
    p_imagename: imagename,
    st_gender: gender,
    phone_secondary: alterphone,
    st_email: email,
  });
  const {
    _id,
    firstName,
    lastname,
    phone_secondary,
    st_gender,
    st_email,
    age,
    statename,
    p_image,
    p_imagename,
  } = info;

  useEffect(() => {
    dispatch(getState());
  }, []);

  useEffect(() => {
    if (childId != '' && Object.keys(userInfo).length != 0) {
      const {
        _id: childID = '',
        age: p_age = '',
        statename: stateData = '',
        image = '',
        imagename = '',
        fname = '',
        lname = '',
        name = '',
        boardname = '',
        fathername = '',
        mothername = '',
        subscriptionStartDate = '',
        subscriptionEndDate = '',
        isPremium = false,
        parentid: parentId = '',
        stage = '',
        stageid = '',
        boardid = '',
        classname = '',
        gender = '',
        address = '',
        alterphone = '',
        schoolname = '',
      } = userInfo;
      // console.log(childInfo, 'childInfo===============');
      setInfo({
        _id: childID,
        firstName: fname,
        lastname: lname,
        phone: phone,
        age: p_age != '' ? p_age : '',
        statename: stateData != '' ? stateData : '',
        p_image: image,
        p_imagename: imagename,
        st_email: email != '' ? email : '',
        phone_secondary: alterphone != '' ? alterphone : '',
        st_gender: gender,
      });
    }
  }, [childId, userInfo]);

  const handleRadioChange = value => {
    if (value == 'Male') {
      setInfo({...info, st_gender: 'Male'});
    } else if (value == 'Female') {
      setInfo({...info, st_gender: 'Female'});
    } else {
      setInfo({...info, st_gender: 'others'});
    }
    setGenderError(false);
    setGender(value);
    // handleInputChange( "p_fname", f_name.trim())
  };

  const handleInputChange = (inputName, inputValue) => {
    // console.log(inputValue,classid, 'classid');
    // const name_reg = /^[A-Za-z]{2,}$/;
    // const phone_reg = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    // //console.log(inputValue, inputName.length, 'phone');
    if (inputName == 'phone_secondary') {
      if (phoneRegex.test(inputValue)) {
        setPhoneError(false);
      } else {
        setPhoneError(true);
      }
    } else if (inputName == 'firstName') {
      // inputValue = inputValue.trim();
      if (!name_reg.test(inputValue)) {
        setFnameError(true);
      } else {
        setFnameError(false);
      }
    } else if (inputName == 'lastname') {
      if (inputValue != '') {
        if (!name_reg.test(inputValue)) {
          // console.log( (!name_reg.test(inputValue)),"inputValue")
          setLnameError(true);
        } else {
          setLnameError(false);
        }
      } else {
        setLnameError(false);
      }
    } else if (inputName == 'standard') {
      if (inputValue.length == '') {
        setStandardError(true);
      } else {
        setStandardError(false);
      }
    } else if (inputName == 'father_name') {
      if (!name_reg.test(inputValue)) {
        setFatherNameError(true);
      } else {
        setFatherNameError(false);
      }
    }
    // else if (inputName == 'mother_name') {
    //   if (!name_reg.test(inputValue)) {
    //     setMotherNameError(true);
    //   } else {
    //     setMotherNameError(false);
    //   }
    // }
    else if (inputName == 'schoolBoard') {
      // console.log(inputName, 'inputName.........');
      if (inputValue.length == '') {
        // console.log(inputValue, 'inputValue.........');

        // if (inputValue.length == 6) {
        setBoardError(true);
      } else {
        ////console.log(present_zip.length, 'length');
        setBoardError(false);
      }
      if (inputValue == 1) {
        // console.log('.................');

        dispatch(setLanguage('odia'));
        setLanguages(prevState =>
          prevState.map(lang =>
            lang.code === 'odia'
              ? {...lang, isSelected: true}
              : {...lang, isSelected: false},
          ),
        );
      } else {
        dispatch(setLanguage('english'));
        // setLanguage('english', dispatch);
        setLanguages(prevState =>
          prevState.map(lang =>
            lang.code === 'english'
              ? {...lang, isSelected: true}
              : {...lang, isSelected: false},
          ),
        );
      }
    } else if (inputName == 'age') {
      if (inputValue.length == '') {
        //setStandardError(true);
      } else {
        setAge(inputValue);
        //setStandardError(false);
      }
      // if (inputValue > 0 && inputValue <= 20) {
      //   // if (inputValue >=20)
      //   setAgeError(false);
      // } else {
      //   setAgeError(true);
      // }
    }
    else if (inputName == 'statename') {
      // console.log(
      //   selectedLanguage,
      //   'selectedLanguage..........',
      //   inputValue.value,
      //   userLang,
      // );
      
      if (inputValue.value != 'Odisha1712675266782') {
        setLanguages([
          {
            name: 'English',
            code: 'english',
            isSelected: 'english' === 'english',
          },
        ]);
      } else {
        setLanguages([
          {name: 'ଓଡିଆ', code: 'odia', isSelected: selectedLanguage === 'odia'},
          {
            name: 'English',
            code: 'english',
            isSelected: selectedLanguage === 'english',
          },
        ]);
      }
    }else if (inputName == 'parents_phone') {
      if (inputValue != '') {
        if (phoneRegex.test(inputValue)) {
          setAltPhoneError(false);
        } else {
          setAltPhoneError(true);
        }
      } else {
        setAltPhoneError(false);
      }
    }
    // else if (inputName == 'age') {
    //   if (inputValue.length != '') {
    //     // if (inputValue >=20)
    //     setAgeError(false);
    //   } else {
    //     setAgeError(true);
    //   }
    // }
    else if (inputName == 'school_name') {
      if (inputValue.length == '') {
        setSchoolNameError(true);
      } else {
        setSchoolNameError(false);
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

  const ChildFlag = childId != '' && childId != undefined;
  const submitForm = async () => {
    const validForm =
      firstName !== '' &&
      // lastname !== '' &&
      // lastname !== '' &&
      st_gender !== '' &&
      // standard !== '' &&
      // schoolBoard != '' &&
      // father_name !== '' &&
      // mother_name !== '' &&
      // school_name !== '' &&
      // weight !== '' &&
      age !== '';
      statename !== '';
    const schoolBoardName = Board.find(rec => rec.boardid == schoolBoard);
    const ClassID = Standard.find(rec => rec.stageid == standard);
    // console.log(age.value, 'ClassID..............',schoolBoardName,"schoolBoardName..");
    const updatebodyData = {
      id: _id,
      fname: firstName,
      lname: lastname,
      name: firstName + ' ' + lastname,
      gender: st_gender,
      email: st_email,
      phone: phone,
      alterphone: phone_secondary,
      password: '',
      image: p_image,
      imagename: p_imagename,
      age: age.value,
      status: '',
      stateid: statename.value,
      statename: statename.label,
      // parentid: '',
      // stage: ClassID != undefined ? ClassID.stage : '',
      // boardname: schoolBoardName != undefined ? schoolBoardName.boardname : '',
      // fathername: father_name,
      // mothername: mother_name,
      // mothername: '',
      // subscriptionStartDate: SubscriptionStartDate,
      // subscriptionEndDate: SubscriptionEndDate,
      // isPremium: IsPremium,
      // boardid: schoolBoard,
      // stageid: standard,
      // classname: standard,
      // language: selectedLanguage,
      // schoolname: school_name,
      // schoolname: '',
      // address: st_address,
      // address: '',
    };

    console.log(updatebodyData, '...............updatebodyData//////////////');
    // setImageData({image: imageUrl, imagename: originalname});
    // setInfo({...info, p_image: result.assets[0].uri})
    const {image: Child_imageUrl = '', imagename: child_imageName = ''} =
      imageData;

    // const bodyData = {
    //   parentid: '',
    //   fname: firstName,
    //   lname: lastname,
    //   name: firstName + ' ' + lastname,
    //   stage: ClassID != undefined ? ClassID.stage : '',
    //   age: age,
    //   boardname: schoolBoardName != undefined ? schoolBoardName.boardname : '',
    //   fathername: father_name,
    //   mothername: mother_name,
    //   image: p_image,
    //   imagename: p_imagename,
    //   subscriptionStartDate: SubscriptionStartDate,
    //   subscriptionEndDate: SubscriptionEndDate,
    //   isPremium: false,
    //   boardid: schoolBoard,
    //   stageid: standard,
    //   classname: standard,
    // };
    // console.log(bodyData, 'register bodyData//////////////');
    let phone_validate = false;
    let fname_validate = false;
    let lname_validate = false;
    let fathername_validate = false;
    let mothername_validate = false;
    // let fathername_validate = false;
    if (
      info.age ||
      info.firstName ||
      info.lastname
      // info.father_name ||
      // info.mother_name ||
      // info.schoolBoard ||
      // info.standard
      // info.present_zip
    ) {
      phone_validate = phoneRegex.test(info.phone_secondary);
      fname_validate = name_reg.test(info.firstName);
      lname_validate = name_reg.test(info.lastname);
      // fathername_validate = name_reg.test(info.father_name);
      // mothername_validate = name_reg.test(info.mother_name);
      // zip_validate = zip_regex.test(info.present_zip);
    }
    if (validForm == false) {
      // if (info.age == '') {
      //   setAgeError(true);
      // } else {
      //   setAgeError(false);
      // }
      if (info.firstName == '' || fname_validate == false) {
        setFnameError(true);
      } else {
        setFnameError(false);
      }

      // if (lname_validate == false) {
      //   setLnameError(true);
      // } else {
      //   setLnameError(false);
      // }

      // if (info.father_name == '' || fathername_validate == false) {
      //   setFatherNameError(true);
      // } else {
      //   setFatherNameError(false);
      // }
      // if (info.mother_name == '' || mothername_validate == false) {
      //   setMotherNameError(true);
      // } else {
      //   setMotherNameError(false);
      // }
      // if (info.schoolBoard == '') {
      //   setBoardError(true);
      // } else {
      //   setBoardError(false);
      // }
      if (info.st_gender == '') {
        setGenderError(true);
      } else {
        setGenderError(false);
      }
      // if (info.school_name == '') {
      //   setSchoolNameError(true);
      // } else {
      //   setSchoolNameError(false);
      // }
      if (info.age == '') {
        setAgeError(true);
      } else {
        setAgeError(false);
      }

      ToastAndroid.showWithGravityAndOffset(
        trans('Please Enter Valid Input'),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (fname_validate == false) {
      // //console.log(fname_validate, 'fname_validate');
      setFnameError(true);
      ToastAndroid.showWithGravityAndOffset(
        trans(`Please Enter Student's First Name`),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (standardError == true) {
      ToastAndroid.showWithGravityAndOffset(
        trans(`Please Enter Student's Standard`),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (fatherNameError == true) {
      ToastAndroid.showWithGravityAndOffset(
        trans(`Please Enter Guardian's Name`),
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
    else if (boardError == true) {
      ToastAndroid.showWithGravityAndOffset(
        trans('Please Enter School Board Name'),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (ageError == true) {
      ToastAndroid.showWithGravityAndOffset(
        trans('Please Enter Valid Age'),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (emailError == true) {
      ToastAndroid.showWithGravityAndOffset(
        trans(`Please Enter Student's Email Id`),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (altPhoneError == true) {
      ToastAndroid.showWithGravityAndOffset(
        trans(`Please Enter Valid Phone Number`),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
    else if (lnameError == true) {
      ToastAndroid.showWithGravityAndOffset(
        trans(`Please Enter Student's Last Name`),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      // dispatch(
      updateChildProfile(updatebodyData, handleUpdateCallback);
      // );
    }
  };
  const handleUpdateCallback = (updatebodyData: any) => {
    // dispatch(getChildDetailsAPI(undefined, undefined, setLoading));
    // setChildList({...childList[0],...updatebodyData})
    // console.log(childList, 'childList=======');
    console.log(updatebodyData, 'updatebodyData????????????????????????');
    const data = userInfo;
    const childListData = [{...data, ...updatebodyData}];
    const user = AsyncStorage.storeObject('@user', childListData);
    dispatch(getChildDetailsAPI(childID));
    dispatch(getUserbyId(childID));
    // const scholardata = {
    //   stageid,
    //   boardid,
    // };
    // dispatch(getScholarshipByClassAPI(scholardata));
    ToastAndroid.showWithGravityAndOffset(
      trans(`Student Data Updated Successfully`),
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    // const prevQues = {
    //   stageid,
    //   boardid,
    //   scholarshipId: scholarshipId,
    //   childid,
    // };
    // dispatch(getPreviousYearQuestionAPI(prevQues));
    // dispatch(getChildProbableQuestionDetailsAPI(prevQues));
    // dispatch({
    //   type: SET_CHILD_INFO,
    //   payload: childListData,
    // });
    // commonCallback();
    // navigation.navigate('UserHome');
    navigation.goBack();
  };

  const handleImageCallback = (imageUrl: string, originalname: string) => {
    // if (childID != '') {
    console.log('handleImageCallbackhandleImageCallbackvvvvvvvvvvvvvvv');
    console.log(imageUrl, originalname, 'handleImageCallback======');
    // dispatch(
    updateChildProfile(
      {id: childID, image: imageUrl, imagename: originalname},
      updateCallback,
      // undefined,
      // false,
      // ),
    );
    // } else {
    //   setImageData({image: imageUrl, imagename: originalname});
    // }
  };
  const updateCallback = () => {
    dispatch(getChildDetailsAPI(childID));
    dispatch(getUserbyId(childID));
  };
  const handleChoosePhoto = async () => {
    const options = {
      storageOptions: {
        mediaType: 'photo',
        path: 'images',
      },

      includeBase64: true,
    };
    const result = await launchImageLibrary();
    console.log(result, 'response');
    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.error) {
      console.log('ImagePicker Error: ', result.error);
    } else if (result.customButton) {
      console.log('User tapped custom button: ', result.customButton);
    } else {
      // if (ChildFlag) {
      setthumb(result.assets[0].uri);
      const bodyFormData = new FormData();
      // bodyFormData.append('file', result);
      bodyFormData.append('file', {
        name: result.assets[0].fileName,
        type: result.assets[0].type,
        uri:
          Platform.OS === 'android'
            ? result.assets[0].uri
            : result.assets[0].uri.replace('file://', ''),
      });

      setInfo({...info, p_image: result.assets[0].uri});
      // dispatch(
      uploadPhotoApi(bodyFormData, handleImageCallback);
      // }
    }
  };
  const deleteCallBack = () => {
    dispatch(
      getChildDetailsAPI(undefined, signOut, undefined, setLoading, undefined),
    );
    // navigation.navigate('UserHome');
  };

  const stateValueData = useAppSelector(selectStudentState);
  const stateDataDropDown = stateValueData.map(state => ({
    label: state.statename,
    value: state.stateid,
  }));
  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor={'#263d2d'} barStyle="light-content" /> */}

      <ImageBackground
        style={{
          width: device_width,
          height: device_height,
          flex: 1,
          alignSelf: 'center',
        }}
        resizeMode="cover"
        source={require('../../../assets/0.png')}
        // source={{uri:'https://as2.ftcdn.net/v2/jpg/02/71/22/77/1000_F_271227781_gt3nHI7H3CgUENSbM3V14x2QhPB04Glb.jpg'}}
      >
        <View style={{flex: 1, marginBottom: 20}}>
          <View
            style={{
              // flexDirection: 'row',
              // alignItems: 'center',
              backgroundColor: 'rgba(0,255,0, 0.1)',
              // justifyContent: 'space-between',
              // borderWidth: 1,
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
              height: device_height * 0.25,
            }}>
            <View style={{paddingTop: 10, alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  borderWidth: 0,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  position: 'absolute',
                  top: 0,
                  left: 5,
                }}>
                <MaterialIcons
                  name="arrow-back"
                  size={30}
                  // backgroundColor={ '#0f6f25'}
                  // backgroundColor={'#263d2d'}
                  color={'#fff'}
                  onPress={() => navigation.goBack()}
                />
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <Avatar.Image
                  size={100}
                  style={{
                    backgroundColor: '#fff',
                    borderColor: '#fff',
                  }}
                  source={
                    p_image != '' && p_image != null
                      ? {uri: p_image}
                      : st_gender == 'Male'
                      ? require('../../../assets/boy.png')
                      : st_gender == 'Female'
                      ? require('../../../assets/girl.png')
                      : {
                          uri: 'https://wkresources.s3.ap-south-1.amazonaws.com/userrr.png',
                        }
                  }
                />

                <FontAwesome
                  onPress={() => {
                    handleChoosePhoto();
                  }}
                  name="camera"
                  size={24}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 5,
                    marginLeft: 5,
                    // color: "#fff",
                    color: '#FFB901',
                  }}
                />
              </View>

              <Text
                style={{
                  fontSize: 18,
                  // color: '#FFB901',
                  color: '#fff',
                  fontWeight: '700',
                  marginHorizontal: 20,
                  // marginVertical: 10,
                  // paddingTop: 5,
                  // letterSpacing: -0.3,
                }}>
                {trans('Welcome')} {fname}
              </Text>

              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={'#def'}
                color={'#fff'}
                style={{position: 'absolute', top: 0, left: 20}}
                onPress={() => navigation.goBack()}
              />
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{paddingHorizontal: 25}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 22,
                  // color: '#FFB901',
                  color: '#fff',
                  fontWeight: '900',
                  // marginHorizontal: 20,
                  // marginVertical: 10,
                  paddingTop: 10,
                  // letterSpacing: -0.3,
                }}>
                {trans('Edit Student Details')}
              </Text>
            </View>

            <View style={[styles.action, {marginTop: 10}]}>
              <FontAwesome name="user" color={'#FFB901'} size={22} />
              <TextInput
                placeholder={trans("Enter Student's First Name")}
                placeholderTextColor={'#aaa'}
                value={firstName}
                style={[
                  {
                    width: '100%',
                    marginTop: -12,
                    paddingLeft: 10,
                    // borderWidth:1,
                    color: '#fff',
                    fontWeight: 'bold',
                    // color: "#fff",
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}
                autoCapitalize="none"
                // onChangeText={(val) => textInputChange(val)}
                // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                onChangeText={val => handleInputChange('firstName', val)}
              />
            </View>
            {fnameError && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text
                  style={{color: 'red', marginBottom: 10, fontWeight: '600'}}>
                  {trans("Please Enter Student's First Name")}
                </Text>
              </Animatable.View>
            )}
            <View style={[styles.action, {marginTop: 10}]}>
              {/* <FontAwesome name="user-o" color={'#333'} size={20} /> */}
              <FontAwesome name="user" color={'#FFB901'} size={22} />

              <TextInput
                placeholder={trans("Enter Student's Last Name")}
                placeholderTextColor={'#aaa'}
                value={lastname}
                style={[
                  {
                    width: '100%',
                    marginTop: -12,
                    paddingLeft: 10,
                    // borderWidth:1,
                    color: '#fff',
                    fontWeight: 'bold',
                    // color: "#fff",
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}
                autoCapitalize="none"
                // onChangeText={(val) => textInputChange(val)}
                // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                onChangeText={val => handleInputChange('lastname', val)}
              />
            </View>
            {lnameError && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text
                  style={{color: 'red', marginBottom: 10, fontWeight: '600'}}>
                  {trans("Please Enter Student's Last Name")}
                </Text>
              </Animatable.View>
            )}
            <View style={[styles.action, {marginTop: 0, paddingVertical: 15}]}>
              <FontAwesome5 name="phone-alt" color={'#FFB901'} size={18} />

              <Text
                style={[
                  {
                    width: '100%',
                    // marginTop: Platform.OS === 'ios' ? 0 : -12,
                    paddingLeft: 10,
                    // borderWidth:1,
                    color: '#fff',
                    fontWeight: 'bold',
                    // color: "#fff",
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                {phone}
              </Text>
            </View>
            <View style={[styles.action, {marginTop: 0, paddingVertical: 15}]}>
              <MaterialIcons name="email" color={'#FFB901'} size={22} />

              <Text
                style={[
                  {
                    width: '100%',
                    marginTop: -12,
                    paddingLeft: 10,
                    // borderWidth:1,
                    color: '#fff',
                    fontWeight: 'bold',
                    // color: "#fff",
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                {st_email}
              </Text>
              <TextInput
                placeholder={trans(
                  "Please Enter Student's Email Id (optional)",
                )}
                placeholderTextColor={'#aaa'}
                // value={st_email}
                style={[
                  {
                    width: '100%',
                    marginTop: -12,
                    paddingLeft: 10,
                    // borderWidth:1,
                    color: '#fff',
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}
                autoCapitalize="none"
                // onChangeText={(val) => textInputChange(val)}
                // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                // onChangeText={val => handleInputChange('st_email', val)}
              />
            </View>
            {emailError && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text
                  style={{color: 'red', marginBottom: 10, fontWeight: '600'}}>
                  {trans('Please Enter Valid Email Id')}
                </Text>
              </Animatable.View>
            )}

            <View
              style={[
                styles.action,
                {marginTop: 0, paddingVertical: 5, alignItems: 'center'},
              ]}>
              <MaterialCommunityIcons
                name="human-male-female"
                color={'#FFB901'}
                size={22}
              />
              <TouchableOpacity
                key={1}
                onPress={() => handleRadioChange('Male')}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton
                  onPress={() => handleRadioChange('Male')}
                  value={st_gender}
                  status={st_gender == 'Male' ? 'checked' : 'unchecked'}
                  selectedColor="#fff"
                  color={'#FFB901'}
                  style={{alignaItems: 'center', color: '#FFB901'}}
                />
                <View style={{paddingHorizontal: 5, flexDirection: 'row'}}>
                  <Text
                    style={[{fontSize: 15, color: '#fff', fontWeight: '600'}]}>
                    {trans('Boy')}{' '}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                key={2}
                // onPress={() => handleRadioChange('Female')}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton
                  status={st_gender == 'Female' ? 'checked' : 'unchecked'}
                  value={st_gender}
                  onPress={() => handleRadioChange('Female')}
                  selectedColor="#fff"
                  color={'#FFB901'}
                  style={{paddingHorizontal: 10, color: '#FFB901'}}
                />
                <View style={{paddingHorizontal: 5, flexDirection: 'row'}}>
                  <Text
                    style={[
                      styles.text_footer,
                      {fontSize: 15, color: '#fff', fontWeight: '600'},
                    ]}>
                    {trans('Girl')}{' '}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {genderError && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text
                  style={{color: 'red', marginBottom: 10, fontWeight: '600'}}>
                  {trans('Please select your gender')}
                </Text>
              </Animatable.View>
            )}

            <View style={[styles.action, {marginTop: 10}]}>
              <Icon name="old-phone" color={'#FFB901'} size={22} />
              <TextInput
                placeholder={trans(`Alternate Mobile Number`)}
                placeholderTextColor={'#aaa'}
                value={phone_secondary}
                style={[
                  styles.textInput,
                  {
                    width: '100%',
                    marginTop: -12,
                    paddingLeft: 10,
                    // borderWidth:1,
                    color: '#fff',
                    fontWeight: 'bold',

                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}
                autoCapitalize="none"
                // onChangeText={(val) => textInputChange(val)}
                // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                onChangeText={val => handleInputChange('phone_secondary', val)}
              />
            </View>

            {altPhoneError && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text
                  style={{color: 'red', marginBottom: 10, fontWeight: '600'}}>
                  {trans('Please enter valid phone number')}
                </Text>
              </Animatable.View>
            )}

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                borderBottomWidth: 0.9,
                borderBottomColor: '#999',
              }}>
              <MaterialCommunityIcons
                name="home-city"
                color={'#FFB901'}
                size={20}
              />
              {/* <Text
                style={{
                  width: '100%',
                  marginTop: 10,
                  marginBottom: 10,
                  paddingLeft: 10,
                  color: '#fff',
                  fontWeight: 'bold',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {statename}
              </Text> */}
              <Dropdown
                style={[styles.dropdown, {width: IsTabScreen ? '50%' : '90%'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
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
                placeholder={trans('Select your state name')}
                value={stateid}
                setValue={statevalue}
                onChange={statevalue =>
                  handleInputChange('statename', statevalue)
                }
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="face-recognition"
                color={'#FFB901'}
                size={20}
              />
              <Text
                style={{
                  width: '100%',
                  marginTop: 10,
                  marginBottom: 10,
                  paddingLeft: 10,
                  color: '#fff',
                  fontWeight: 'bold',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {age}
              </Text>
              {/* //placeholderTextColor={'#aaa'}
                //placeholder="Enter your age"
                //value={age}
                // onChangeText={value => handleInputChange('age', value)}
                // onFocus={() => setAge(age)} */}

              {/* <Dropdown
                style={[styles.dropdown, { width: IsTabScreen ? '50%' : '90%' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
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
                placeholder={trans('Select your age')}
                value={age}
                setValue={value}
                onChange={value => handleInputChange('age', value)}
              /> */}
            </View>
            <View style={[styles.button, {margin: 15}]}>
              <TouchableOpacity
                style={styles.signIn}
                // disabled={loading}
                onPress={() => {
                  submitForm();
                }}>
                <LinearGradient colors={['#fff', '#fff']} style={styles.signIn}>
                  {/* {loading && (
                <ActivityIndicator
                  size="small"
                  color={'#fff'}
                  style={{marginRight: 10}}
                />
              )} */}
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#0f6f25',
                      },
                    ]}>
                    {trans('UPDATE')}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
          {/* </View> */}
        </View>
      </ImageBackground>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderBottomWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    color: '#666666',
    paddingLeft: 10,
    fontSize: 18,
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
    color: '#fff',
    paddingLeft: 10,
    fontSize: 18,
    flex: 1,
    fontWeight: '600',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    // borderWidth:1,
    borderBottomColor: '#ccc',
    // paddingBottom: 5,
    marginTop: 10,
    // paddingBottom: 10,
    marginBottom: 10,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    // flex: 1,
    marginTop: -12,
    paddingLeft: 10,
    color: '#fff',
    fontWeight: 'bold',
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
  // textSign: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  // },
});
