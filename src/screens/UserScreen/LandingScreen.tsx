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
  getChildDetailsAPI,
  selectStudentInfo,
  selectStudentStatus,
} from '../../redux/reducers/StudentInfoReducer';
import {RootState} from '../../redux/store/Store';
import Header from '../CommonScreens/Header';
import {updateChildProfile} from '../../redux/actions/UpdateStudentProfile';
import {selectUserInfo} from '../../redux/reducers/loginReducer';
import CommonMessage from '../../../constants/CommonMessage';
import {
  getAllCoursesAPI,
  selectAllCoursesInfo,
} from '../../redux/reducers/GetAllCoursesReducer';
import {
  getAllSubjectLevelDataAPI,
  selectAllSubjectLevelInfo,
  selectAllSubjectLevelStatus,
} from '../../redux/reducers/GetAllSubjectLevelReducer';
import Modal from 'react-native-modal';

const LandingScreen = ({}) => {
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
  const {authToken, status, userInfo = {}} = useAppSelector(selectUserInfo);

  // console.log(childInfo, 'in STUDENT PROFILE.............');

  const {t: trans, i18n} = useTranslation();

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
  const ExamAvailable = useAppSelector(selectAllCoursesInfo);
  // console.log(ExamAvailable, "==============ExamAvailable");

  useEffect(() => {
    navigation.addListener('focus', () => {
      dispatch(getAllCoursesAPI());
      BackHandler.addEventListener('hardwareBackPress', () => {
        // navigation.goBack();
        BackHandler.exitApp();
        return true;
      });
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        BackHandler.exitApp();
        // navigation.goBack();
        return true;
      });
    };
  }, []);

  useEffect(() => {
    const user = userInfo;
    const userid = user._id;
    // const stageid = user.stageid;
    // const boardid = user.boardid;
    // const childid = user.childid;

    dispatch(getChildDetailsAPI(userid));
    dispatch(getAllCoursesAPI());
    dispatch(getAllSubjectLevelDataAPI());
  }, []);

  const AllSubjectLevelData = useAppSelector(selectAllSubjectLevelInfo);

  console.log(
    AllSubjectLevelData,
    '@@@@@@@@@@@@@@@@@@@@@***AllSubjectLevelData',
  );

  // const ListColor = ['#fee2a3', '#f6c4b9', '#c3ccf5', '#76f0c7'];

  const ListColor = ['#50C878', '#00FF7F', '#1dfc8c', '#50C878'];

  // const ExamAvailable = [
  //   {
  //     examName: "Exam 1",
  //     contents: "Adarsha, Navodaya and Medhabruti",
  //     image: require('../../../assets/OAV_logo.jpg'),
  //     navigationfunc: () => { navigation.navigate('SubjectList',{stageid:'5', boardid:'1'}) }
  //   },
  //   {
  //     examName: "Exam 2",
  //     contents: "Adarsha, Navodaya and Medhabruti",
  //     image: require('../../../assets/Jawahar_Navodaya_Vidyalaya_logo.png'),
  //     navigationfunc: () => CommonMessage("Coming Soon !"),
  //     // navigationfunc: () => { navigation.navigate('SubjectList',{stageid:stageid, boardid:boardid}) }
  //   },
  //   {
  //     examName: "Exam 3",
  //     contents: "Adarsha, Navodaya and Medhabruti",
  //     image: require('../../../assets/teacher.jpg'),
  //     navigationfunc: () => CommonMessage("Coming Soon !"),
  //     // navigationfunc: () => { navigation.navigate('SubjectList',{stageid:stageid, boardid:boardid}) }
  //   },
  //   {
  //     examName: "Exam 4",
  //     contents: "Adarsha, Navodaya and Medhabruti",
  //     image: require('../../../assets/test.png'),
  //     navigationfunc: () => CommonMessage("Coming Soon !"),
  //     // navigationfunc: () => { navigation.navigate('SubjectList',{stageid:stageid, boardid:boardid}) }
  //   },
  // ]

  const [isModalVisible, setModalVisible] = useState(false);

  const navigateCourseDetails = (course: any) => {
    if (course?.coursename === 'Mind Melters') {
      navigation.navigate('SubjectLevel', {
        coursename: course?.coursename,
        subjectname: course?.description,
        courseid: course?.courseid,
      });
    } else if (course?.coursename === 'Vidyalaya Vista') {
      setModalVisible(true);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {isModalVisible && (
          <Modal
            isVisible={isModalVisible}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            animationInTiming={50}
            animationOutTiming={50}
            hideModalContentWhileAnimating={true}
            backdropTransitionInTiming={50}
            backdropTransitionOutTiming={50}
            onBackdropPress={() => setModalVisible(false)}
            onBackButtonPress={() => setModalVisible(false)}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <LinearGradient
                  colors={['#012650','#012650']}
                style={{
                  //backgroundColor: '#222222',
                  padding: 30,
                  borderRadius: 10,
                }}>
                <Text
                  style={{marginBottom: 20, fontSize: 18, fontWeight: '600',color:'#FFFFFF'}}>
                  {trans('Preparing for JNV and OAV entrance exam!')}
                </Text>
                <Text
                  style={{marginBottom: 20, fontSize: 18, fontWeight: '500',color:'#FFFFFF'}}>
                  {trans('Please download our app.')}
                </Text>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginTop: 40,
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#EEF8FB',
                      borderRadius: 10,
                      padding: 10,
                      width: device_width * 0.25,
                    }}
                    onPress={() =>
                      Linking.openURL(
                        'https://play.google.com/store/apps/details?id=com.notevook',
                      )
                    }>
                    <Text
                      style={{
                        color: '#000000',
                        fontSize: 18,
                        fontWeight: '600',
                      }}>
                      {trans('Download')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={{
                      backgroundColor: '#FF4433',
                      borderRadius: 10,
                      padding: 10,
                      width: device_width * 0.20,
                    }}>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 18,
                        fontWeight: '600',
                        textAlign: 'center'
                      }}>
                      {trans('Exit')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </Modal>
        )}
        <ImageBackground
          style={{
            width: device_width,
            height: device_height,
            flex: 1,
            alignSelf: 'center',
          }}
          resizeMode="cover"
          source={require('../../../assets/0.png')}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: '900',
              textAlign: 'center',
              color: 'white',
              marginTop: 10,
              textTransform: 'uppercase',
            }}>
            {trans('Welcome to Our Courses')}
          </Text>
          <Animatable.View
            animation="fadeInUpBig"
            style={{
              flex: Platform.OS === 'ios' ? 3 : 12,
              paddingVertical: 20,
              paddingBottom: 15,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'left',
                marginLeft: 15,
                color: 'white',
              }}>
              {`Choose one course to continue`}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20,
                // borderWidth: 1
              }}>
              {ExamAvailable.map((item, index) => {
                const {
                  slcourse = '',
                  courseid = '',
                  coursename = '',
                  description = '',
                  image = '',
                  createon = '',
                  updatedon = '',
                } = item;

                //console.log(item, "================item");
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigateCourseDetails(item);
                    }}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#2C7DB5',
                      paddingVertical: 25,
                      height: '55%',
                      width: '45%',
                      paddingHorizontal: 15,
                      margin: 10,
                      borderWidth: 1,
                      borderColor: '#999',
                      elevation: 15,
                      borderRadius: 10,
                    }}>
                    {image != '' && image != null ? (
                      <Image
                        style={{
                          height: '85%',
                          width: '100%'
                         }}
                        source={{uri: image}}
                        resizeMode="contain"
                      />
                    ) : (
                      <Image
                        style={{
                          marginTop: 5,
                          height: device_height * 0.15,
                          width: device_width * 0.4,
                        }}
                        source={require('../../../assets/teacher.jpg')}
                        resizeMode="contain"
                      />
                    )}
                    <Text
                      style={{
                        borderTopWidth: 1,
                        borderColor: '#666',
                        width: '120%',
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: '#000',
                      }}>
                      {coursename}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '700',
                        textAlign: 'center',
                        color: '#333',
                      }}>
                      {description}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              {AllSubjectLevelData.map((item, index) => {
                const {
                  subjectid = '',
                  subjectname = '',
                  subjectImage = '',
                  courseid = '',
                  coursename = '',
                  createdAt = '',
                  updatedAt = '',
                } = item;
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate('TopicDetails', {
                        coursename: coursename,
                        subjectname: subjectname,
                        subjectid: subjectid,
                      });
                    }}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#2C7DB5',
                      paddingVertical: 25,
                      width: device_width * 0.42,
                      minHeight: device_height * 0.25,
                      paddingHorizontal: 15,
                      margin: 10,
                      borderWidth: 1,
                      borderColor: '#999',
                      elevation: 15,
                      borderRadius: 10,
                    }}>
                    {image != '' && image != null ? (
                      <FastImage
                        style={{
                          marginTop: 5,
                          height: device_height * 0.15,
                          width: device_width * 0.4,
                          // borderWidth:1,
                        }}
                        source={{uri: image}}
                        resizeMode="contain"
                      />
                    ) : (
                      <FastImage
                        style={{
                          marginTop: 5,
                          height: device_height * 0.15,
                          width: device_width * 0.4,
                          // borderWidth:1,
                        }}
                        source={require('../../../assets/teacher.jpg')}
                        resizeMode="contain"
                      />
                    )}
                    <Text
                      style={{
                        borderTopWidth: 1,
                        borderColor: '#666',
                        width: '120%',
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: '#000',
                      }}>
                      {subjectname}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '700',
                        textAlign: 'center',
                        color: '#333',
                      }}>
                      {coursename}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Animatable.View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
