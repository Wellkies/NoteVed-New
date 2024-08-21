import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ScrollView,
  TextInput,
  SafeAreaView,
  BackHandler,
  ImageBackground,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, { useEffect, useState, useRef } from 'react';
import Colors from '../../../assets/Colors';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { Avatar, Modal, RadioButton } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { device_height, device_width } from '../style';
import LoadingScreen from '../CommonScreens/LoadingScreen';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../../redux/store/Store';
import { getTopicBySubClassAPI, selectTopicInfo, selectTopicStatus } from '../../redux/reducers/GetTopicBySubjectReducer';
import { selectStudentInfo } from '../../redux/reducers/StudentInfoReducer';
import { getUnlockChildAPI, selectUnlockStudent } from '../../redux/reducers/GetUnlockChildReducer';
import { getChildRevisionDetailsAPI, selectRevisionChild, selectRevisionChildStatus } from '../../redux/reducers/GetChildRevisionReducer';
import { selectTopicDetailsStatus } from '../../redux/reducers/GetTopicDetailsFormTopicIdReducer';
import { handleSetTopicIdForRevision } from '../../redux/reducers/GetTopicIdReducer';
// import CommonFeedback from '../AppScreens/CommonScreens/CommonFeedback';
// import Progress from './CommonScreens/Progress';
// import ExamSets from './ExamSets';

const SubjectsDetails = ({ route }) => {
  const navigation = useNavigation()
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dispatch = useDispatch<any>();
  // const scholarshipid = 'Navodaya1690353664697';
  const {
    subjectid='',
    subjectname='',
    subjectImage='',
    quiz='',
    contentid='' ,
    slcontent='',
    contentimage='',
    contentset='',
    slsubject='' ,
    sltopic='' ,
    timeDuration='' ,
    topicid='' ,
    topicimage='' ,
    topicname='' ,
  } = route.params;
  //console.log(route.params, "=================route.params");

  // console.log(childId, "childId................")
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [quizList, setQuizList] = useState();
  const [feedbackModalStatus, setFeedbackModalStatus] = useState(false);

  const scrollViewRef = useRef(null);

  const scrollToHighlightedRow = (highlightedIndex: any) => {
    if (scrollViewRef.current) {
      if (highlightedIndex == 1) {
        const yOffset = highlightedIndex;
        scrollViewRef.current.scrollTo({ y: yOffset, animated: true });
      } else {
        const yOffset = highlightedIndex * 80;
        scrollViewRef.current.scrollTo({ y: yOffset, animated: true });
      }
      // Adjust this value based on your row height
    }
  };

  const handleFeedbackSubmit = () => {
    setFeedbackModalStatus(false);
  };

  const RowItem = ({ item, index }) => {
    // const isHighlighted = index === highlightedIndex;
    const isHighlighted = false;
    return (
      <TouchableOpacity>
        <View
          style={{
            // backgroundColor: isHighlighted ? 'orange' : Colors.secondary,
            borderWidth: isHighlighted ? 2 : 0,
            borderColor: isHighlighted ? 'orange' : Colors.secondary,
            paddingHorizontal: isHighlighted ? 10 : 0,
            paddingBottom: isHighlighted ? 10 : 0,
            paddingTop: isHighlighted ? 10 : 0,
            borderRadius: 10,
            elevation: isHighlighted ? 10 : 0,
            marginVertical: 5,
          }}>
          {item}
        </View>
      </TouchableOpacity>
    );
  };

  // const {TopicBySubClass: TopicList = []} = useSelector(
  //   state => state.GetTopicBySubClassReducer,
  // );
  const TopicList = useAppSelector(selectTopicInfo);
  const TopicListLoading = useAppSelector(selectTopicStatus);
  //console.log(TopicList, "==========TopicList", TopicListLoading);

  // const {UnlockChild = []} = useSelector(state => state.GetUnlockChildReducer);
  const UnlockChild = useAppSelector(selectUnlockStudent)
  const unlockstudent = UnlockChild.filter(r =>
    r.childid == childId
  );

  const RevisionData = useAppSelector(selectRevisionChild)
  const RevisionLoading = useAppSelector(selectRevisionChildStatus)

  // console.log(RevisionData,"RevisionData..................")
  // console.log(unlockstudent, 'unlockstudent..........');
  // console.log(UnlockChild, 'UnlockChild//////////////////////////');
  // const {RevisionData = []} = useSelector(
  //   state => state.GetChildRevisionReducer,
  // );
  // const {TopicDetailsByTopicId: TopicListData = []} = useSelector(
  //   state => state.GetTopicDetailsFormTopicIdReducer,
  // );

  // const {topicid=''}=TopicListData

  const [TopicBySubClass, setTopicBySubClass] = useState(TopicList);
  const [revisionData, setrevisionData] = React.useState();

  // console.log(revisionData,"///////////////////////////revisionData")
  const [show, setShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [revisionLoading, setRevisionLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState('');
  const [asyncData, setasyncData] = useState([]);
  // const [quizList, setQuizList] = useState(reviewquestionsets);

  const { t: trans, i18n } = useTranslation();

  const childInfo = useAppSelector(selectStudentInfo) as ChildInfo;
  // console.log(childInfo, 'childInfo..........');

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
    name = '',
    stage = '',
    phone = '',
    // cityname = '',
    image = '',
    age = '',
    address = '',
    // cityid = '',
    childid = '',
    isPremium = '',
    // coordinates='',
  } = childInfo;
  
  const isReattempt = true;

  const selectedhandler = (index, name) => {
    if (selectedId == index && selectedName == name) {
      setSelectedId(null);
      setSelectedName('');
      setShow(false);
    } else {
      setSelectedId(index);
      setSelectedName(name);
      setShow(true);
    }
  };

  const colorList = [
    ['#2775cf', '#e3eefa'],
    ['#f08441', '#f7d7c3'],
    ['#8356a8', '#f3e1f7'],
    ['#05a851', '#d9fceb'],
    ['#f2618a', '#ffdeeb'],
  ];

  // const handleSubCallback = () => {
  //   if (asyncData == subject) {
  //   } else {
  //     dispatch(
  //       getTopicBySubClassAPI(
  //         undefined,
  //         Class,
  //         subjectid,
  //         boardid,
  //         scholarshipid,
  //         childId,
  //         setLoading,
  //       ),
  //     );
  //   }
  // };

  // useEffect(() => {
  //   // storeSubjectAsyncData();
  //   navigation.addListener('focus', () => {
  //     BackHandler.addEventListener('hardwareBackPress', () => {
  //       navigation.goBack();
  //       return true;
  //     });
  //     dispatch(
  //       getTopicBySubClassAPI(
  //         undefined,
  //         Class,
  //         subjectid,
  //         boardid,
  //         scholarshipid,
  //         childId,
  //         setLoading,
  //       ),
  //     );
  //   }
  // };

  useEffect(() => {
    dispatch(getUnlockChildAPI());

    const Revdata = {
      Class,
      subjectid,
      boardid,
      scholarshipid,
      childId,
    }
    // storeSubjectAsyncData();
    dispatch(
      getChildRevisionDetailsAPI(Revdata));
    navigation.addListener('focus', () => {
      dispatch(
        getChildRevisionDetailsAPI(Revdata));
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.goBack();
        return true;
      });
      // console.log(
      //   Revdata, "============Revdata"
      // );
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        navigation.goBack();
        return true;
      });
      dispatch(getTopicBySubClassAPI(Revdata));
    };
  }, []);

  const handleBackButtonClick = () => {
    navigation.goBack();
    return true;
  };

  const thresholdPercentage = 90;

  const setLockStatus = (RevisionData: any) => {
    let previousTopicUnlocked = true;

    let topicdetails: any[] = [];
    // console.log(RevisionData,"$$$$$$$$$$RevisionData.......................")
    RevisionData.forEach((row, index) => {
      // RevisionData.map((row,index)=>{
      //   RevisionData.push({...row, isExamAvailable: false});
      // })
      //console.log(index, '...............v..................');

      if (index < 1) {
        topicdetails.push({ ...row, isExamAvailable: true });
      } else if (index == 1) {
        let topiconePer = RevisionData[0].studenttopic;
        // console.log(
        //   topiconePer,
        //   'topiconePer*************',
        //   topiconePer.length > 0,
        // );
        if (topiconePer.length > 0) {
          topicdetails.push({ ...row, isExamAvailable: true });
        } else {
          if (unlockstudent != undefined && unlockstudent.length > 0) {
            topicdetails.push({ ...row, isExamAvailable: true });
          }
          else {
            topicdetails.push({ ...row, isExamAvailable: false });
          }
        }
      } else {
        let topiconePers = RevisionData[index - 1].studenttopic;
        // let topicprePer = RevisionData.map(
        //   item => item.studenttopic,
        // );
       // console.log(topiconePers.length, '________________________________');
        if (topiconePers.length > 0) {
          topicdetails.push({ ...row, isExamAvailable: true });
        } else {
          if (unlockstudent != undefined && unlockstudent.length > 0) {
            topicdetails.push({ ...row, isExamAvailable: true });
          }
          else {
            topicdetails.push({ ...row, isExamAvailable: false });
          }
        }
      }
      // }
      // // Set the lock status for each exercise within the topic
      // topic.reviewquestionsets.forEach(exercise => {
      //     exercise.isExamAvailable = previousTopicUnlocked ? true : false;
      // });

      // Check if the student has completed all exercises in the current topic
      // if (topic.reviewquestionsets.every(exercise => exercise.isExamAvailable === true)) {
      //     previousTopicUnlocked = true;
      // }
    });
    setrevisionData(topicdetails);
    // console.log(revisionData,"///////////////////////////revisionData")

    /////////////Code for Heighlight
    const lastindex = topicdetails.findLastIndex(object => {
      return object.isExamAvailable == true;
    });
    setQuizList(topicdetails);
    if (lastindex != -1) {
      setHighlightedIndex(lastindex);
      // scrollToHighlightedRow(lastindex);
      setTimeout(() => scrollToHighlightedRow(lastindex), 100);
      //
    } else {
      setHighlightedIndex(0);
      // scrollToHighlightedRow(0);
      setTimeout(() => scrollToHighlightedRow(0), 400);
      //
    }
  };

  useEffect(() => {
    if (RevisionData) {
      setLockStatus(RevisionData);
    }
  }, [RevisionData]);

  // const AllExamAttempted = quizList.find(rec => rec.isExamAvailable == false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={{
          width: device_width,
          height: device_height,
          flex: 1,
          alignSelf: 'center',
          backgroundColor:'#feecde'
        }}
        resizeMode="cover"
        // source={require('../../../assets/0.png')}
        >
        {RevisionLoading == 'loading' ? (
          <LoadingScreen flag={RevisionLoading == 'loading'} />
        ) : (
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // backgroundColor: Colors.secondary,
                justifyContent: 'space-between',
                paddingBottom: 5,
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ paddingLeft: 10 }}>
                  <MaterialIcons
                    name="arrow-back"
                    size={30}
                    // backgroundColor={Colors.secondary}
                    color={'#dee'}
                    onPress={() => navigation.goBack()}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 20,
                    color: '#fff',
                    marginLeft: 10,
                    textTransform: 'capitalize',
                    fontWeight: '600',
                  }}>
                  {subject}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  disabled={true}
                  // onPress={() => { }}
                  style={{
                    right: 15,
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#fff',
                      marginLeft: 10,
                      fontWeight: '600',
                    }}>
                    {trans('Std')} - {Class}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* {AllExamAttempted !== undefined && ( */}
            <View
              style={{
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
                style={{ marginHorizontal: 10, borderWidth: 0 }}
                name={'infocirlce'}
                size={20}
                color={'#fff'}
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
                }}>
                {trans(
                  'You have to complete all active test to view next locked topic',
                )}
              </Text>
            </View>

            <ScrollView ref={scrollViewRef}>
              <View>
                {revisionData?.length > 0 && RevisionLoading == 'idle' ? (
                  <>
                    {revisionData?.map((item, index) => {
                      const {
                        reviewquestionsets = [],
                        topic = '',
                        topicid = '',
                        image = '',
                        chaptername = '',
                        chapterimage = '',
                        quiz = [],
                        isExamAvailable = false,
                        studenttopic = [],
                      } = item;
                      {
                        /* {console.log(item,"item",isExamAvailable,"isExamAvailable...................")} */
                      }
                      {
                        /* let is2ndAvailable=false
                          if (TopicBySubClass.index == "2")
                          {
                            is2ndAvailable=true
                          } */
                      }

                      // const {
                      //   id = '',
                      //   contentset = '',
                      //   contentid = '',
                      //   studentdata = [],
                      //   quiz: ExamQuiz = [],
                      //   score = '',
                      //   result = '',
                      //   fullmark = '',
                      //   isPremium = false,
                      // } = reviewquestionsets;

                      {
                        /* console.log(
                      reviewquestionsets,
                      '==============reviewquestionsets item',
                      TopicBySubClass.length,
                      'TopicBySubClass.length',
                      isExamAvailable,
                    ); */
                      }

                      return (
                        <RowItem
                          key={index}
                          item={
                            <TouchableOpacity
                              disabled={isExamAvailable ? false : true}
                              key={index}
                              style={{
                                // elevation: 15,
                                width: '96%',
                                alignSelf: 'center',
                                // height: 80,
                                // backgroundColor: '#ddd',
                                marginTop: 5,
                                // backgroundColor: '#fff',
                                backgroundColor: 'rgba(0,255,0,0.1)',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                // borderWidth: 0.5,
                                // borderColor:colorList[index % colorList.length]
                              }}
                              onPress={() => {
                                dispatch(handleSetTopicIdForRevision(topicid))
                                navigation.navigate('ExamSets', {
                                  index: index,
                                  subjectName: subject,
                                  topicName: topic,
                                  ExamQuestionsets: reviewquestionsets,
                                  Class: Class,
                                  subjectId: subjectid,
                                  boardid: boardid,
                                  scholarshipid: scholarshipid,
                                  childId: childId,
                                  isScoreBoardFlag: false,
                                  scholarshipName: scholarshipName,
                                  is2ndAvailable: index,
                                  topicid: topicid,
                                });
                              }}>
                              <View
                                // colors={colorList[index % colorList.length]}
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  width: '100%',
                                  height: 78,
                                  borderRadius: 10,
                                  borderWidth: 0.5,
                                  // borderColor: '#aaa',
                                  borderColor: isExamAvailable
                                    ? Colors.primary
                                    : '#999',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  paddingHorizontal: 15,
                                  // backgroundColor: 'rgba(0,255,0,0.1)',
                                  // backgroundColor: '#ccc',
                                  backgroundColor: isExamAvailable
                                    ? 'rgba(0,255,0,0.1)'
                                    : 'rgba(220,220,220,0.4)',
                                }}>
                                <View
                                  style={{
                                    width: '80%',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    // borderWidth:1,
                                    // backgroundColor:'rgba(0,255,0,0.1)'
                                  }}>
                                  {chapterimage != '' ? (
                                    <FastImage
                                      source={
                                        { chapterimage }
                                        // : require('../../../assets/test.png')
                                      }
                                      // size={50}
                                      style={{ height: 50, width: 50 }}
                                    />
                                  ) : (
                                    <Ionicons
                                      style={{ marginRight: 10 }}
                                      color={isExamAvailable ? '#fff' : '#333'}
                                      name="eye-outline"
                                      size={28}
                                    />
                                  )}
                                  <Text
                                    style={{
                                      width: '80%',
                                      color: isExamAvailable ? '#fff' : '#333',
                                      // isExamAvailable
                                      //   ?
                                      //  Colors.primary,
                                      // : '#999',
                                      // color:
                                      //    Colors.primary
                                      // ,

                                      fontSize: 16,
                                      marginLeft: 20,
                                      fontWeight: '800',
                                      textTransform: 'uppercase',
                                    }}>
                                    {topic}
                                  </Text>
                                </View>

                                <TouchableOpacity
                                  disabled={isExamAvailable ? false : true}
                                  style={{
                                    width: '22%',
                                    // borderWidth: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 60,
                                  }}
                                  onPress={() => {
                                    dispatch(handleSetTopicIdForRevision(
                                      topicid,

                                    ))
                                    navigation.navigate('ExamSets', {
                                      subjectName: subject,
                                      topicName: topic,
                                      ExamQuestionsets: reviewquestionsets,
                                      Class: Class,
                                      subjectId: subjectid,
                                      boardid: boardid,
                                      scholarshipid: scholarshipid,
                                      childId: childId,
                                      isScoreBoardFlag: false,
                                      scholarshipName: scholarshipName,
                                      is2ndAvailable: index,
                                      topicid: topicid,
                                    });
                                  }}>
                                  {/* <MaterialIcons
                                      name="chevron-right"
                                      color={'#f1a722'}
                                      size={25}
                                      style={{
                                        marginLeft: 10,
                                        fontWeight: '900',
                                      }}
                                    /> */}
                                  {isExamAvailable ? (
                                    <MaterialIcons
                                      name="chevron-right"
                                      color={'#FFB901'}
                                      size={25}
                                      style={{
                                        marginLeft: 10,
                                        fontWeight: '900',
                                      }}
                                    />
                                  ) : (
                                    <Fontisto
                                      style={{ color: '#333' }}
                                      name="locked"
                                      size={15}
                                    />
                                  )}
                                </TouchableOpacity>
                              </View>
                            </TouchableOpacity>
                          }
                          index={index}
                        />
                      );
                    })}
                  </>
                ) : (
                  <View
                    style={{
                      height: 70,
                      width: '94%',
                      alignSelf: 'center',
                      // alignItems: 'center',
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
                          fontSize: 18,
                          color: '#333',
                          fontWeight: '600',
                        }}>
                        {'   '}
                        {trans('Currently no subjects added')}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </ScrollView>
            {/* </ImageBackground> */}
            {/* </ImageBackground> */}
            {/* {feedbackModalStatus && (
              <CommonFeedback
                ModalStatus={feedbackModalStatus}
                isIconShow={true}
                closeModalFunc={() => setFeedbackModalStatus(false)}
                label1={`${trans('Please share your Feedback')}`}
                label2={`${trans(
                  'How was your experience with last mock test',
                )}`}
                yesbtnName={trans('Send')}
                loading={loading}
                yesbtnFunction={() => handleFeedbackSubmit()}
                // nobtnName={trans('NO')}
                // nobtnFunction={() => setFeedbackModalStatus(false)}
              />
            )} */}
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};
export default SubjectsDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
  headerCointain: {
    width: '100%',
    backgroundColor: '#D6EAF8',
    borderWidth: 1,
    borderColor: '#E5E4E2',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },

  headerInner: {
    width: '95%',
    // height: '10%',

    // elevation: 10,
    // backgroundColor: '#fff',
    borderWidth: 1,
    // borderBottomWidth: 0,
    borderColor: '#fff',
    // borderTopColor: '#ccc',
    borderRadius: 40,
    // marginTop: 15,
    // alignSelf: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  headerinner1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  innerText: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: '700',
    marginLeft: 5,
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
    // marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
  cardstyle: {
    width: '95%',
    height: '30%',
    backgroundColor: '#fff',
    // borderWidth: 2,
    // borderBottomWidth: 0,
    // borderColor: Colors.primary,
    // borderTopColor: '#ccc',
    borderRadius: 9,
    elevation: 20,
    alignSelf: 'center',
    // padding: 15,
  },
  cardstyle1: {
    width: '95%',
    height: '15%',
    backgroundColor: '#fff',
    borderWidth: 1,
    // borderBottomWidth: 0,
    // borderColor: Colors.primary,
    // borderTopColor: '#ccc',
    borderColor: Colors.primary,
    borderRadius: 10,
    // elevation: 20,
    // alignSelf: 'center',
    alignItems: 'center',
    padding: 15,
  },
  Innercardstyle: {
    width: '24%',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    // borderBottomWidth: 0,
    borderColor: '#fff',
    // borderTopColor: '#ccc',
    borderRadius: 9,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingLeft: 10,

    // alignSelf: 'center',
    // padding: 15,
  },
  question: {
    fontSize: 17,
    fontWeight: '500',
    color: Colors.primary,
  },
});
