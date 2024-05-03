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
  Animated,
  Alert,
  ImageBackground,
  BackHandler,
  useWindowDimensions,
  Button,
  Linking,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';

import React, {useEffect, useState, useRef, useCallback} from 'react';
import Colors from '../../../assets/Colors';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {Avatar, Modal, RadioButton} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
// import {updateParentProfile} from '../../redux/actions/Action';
import {emailRegex, name_reg, phoneRegex} from '../../../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {device_height, device_width} from '../style';
import CommonMessage from '../../../constants/CommonMessage';

import {useTranslation} from 'react-i18next';
import WebView from 'react-native-webview';
import RenderHtml from 'react-native-render-html';
import {RootState} from '../../redux/store/Store';
import {selectExamName} from '../../redux/reducers/ExamTestNameReducer';
import {useNavigation} from '@react-navigation/native';
import Header from '../CommonScreens/Header';

const AnswerSheet = ({route}) => {
  const {t: trans, i18n} = useTranslation();
  const {
    subjectname = '',
    chapterName = '',
    examSet = '',
    quiz = [],
    securemark = '',
    totalmark = '',
    Wronganswer = '',
    Skipped = '',
    subjectId = '',
    contentid = '',
    stage = '',
    isNotificationFlag = false,
    is2ndAvailable = '',
    subjectName = '',
    // chapterName='' '',
    allPrevQuiz = '',
    prevYearStudentdata = '',
    ExamQuestionsets = '',
    previousyearquestionid = '',
    scholarship = '',
    year = '',
    scholarshipid = '',
    timeDuration = '',
    SubjectList = '',
    yearid = '',
    isViewAnswer = false,
    Class = '',
    // subjectId:subjectId,
    boardid = '',
    // scholarshipid:scholarshipid,
    childId = '',
    // subjectName:subjectName,
    topicName = '',
    // ExamQuestionsets = [],
    isScoreBoardFlag = '',
    scholarshipName = '',
    topicid = '',
    index = '',
    isVideotab = false,
    setid = '',
    mostprobablequestionid = '',
    ProbSubjectId = '',
    ProbSubjectName = '',
    studentdata = '',
    screenName = '',
  } = route.params;
  console.log(
    route.params,
    'route.params......................ANSWERSHEET',
    'topicid',
    topicid,
  );
  const navigation = useNavigation();

  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

  const ExamName = useAppSelector(selectExamName);

  console.log(ExamName, 'ExamName.............');
  const [selectedStep, setSelectedStep] = useState(1);
  const [Questionlist, setQuestionlist] = useState(quiz);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [solution, setSolution] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [isProgress, setIsProgress] = React.useState(true);

  const [questions, setQuestions] = useState([]);
  const [loadedQuestions, setLoadedQuestions] = useState([]);

  useEffect(() => {
    // Fetch your questions from an API or data source and update the 'questions' state.
    // You should initially load the first question here.

    // Define the pattern for loading questions (1, 3, 5, 5, 5, ...)
    const pattern = [3, 10, 15, 15, 15];
    let currentIndex = 0; // Index for the pattern array
    let lastquestion = 0;
    // Function to load questions based on the pattern
    const loadQuestionsByPattern = () => {
      if (lastquestion >= quiz.length) {
        return; // Stop loading if the pattern is exhausted
      }

      const countToLoad = pattern[currentIndex];

      lastquestion = lastquestion + countToLoad;
      setLoadedQuestions(prevLoadedQuestions => {
        const newLoadedQuestions = [...prevLoadedQuestions];
        const questionsToLoad = quiz.slice(
          newLoadedQuestions.length,
          newLoadedQuestions.length + countToLoad,
        );
        newLoadedQuestions.push(...questionsToLoad);
        return newLoadedQuestions;
      });
      if (currentIndex < 3) {
        currentIndex++;
      } else {
        currentIndex = 3;
      }

      // Move to the next pattern element
      setTimeout(loadQuestionsByPattern, 500); // Load the next batch after 5 seconds
    };

    // Start loading questions according to the pattern
    loadQuestionsByPattern();
  }, []);

  const handleBackButtonClick = () => {
    if (ExamName === 'PreviousYearList') {
      navigation.goBack();
    } else if (ExamName === 'ProbableQuestionList') {
      navigation.goBack();
    } else if (ExamName === 'SubjectRevisionList') {
      navigation.navigate('ExamSets', {
        Class: Class,
        // subjectId:subjectId,
        boardid: boardid,
        subjectId: subjectId,
        scholarshipid: scholarshipid,
        // scholarshipid:scholarshipid,
        childId: childId,
        subjectName: subjectname,
        topicName: chapterName,
        // ExamQuestionsets = [],
        isScoreBoardFlag: isScoreBoardFlag,
        scholarshipName: scholarshipName,
        topicid: topicid,
        index: index,
        isVideotab: false,
        isViewAnswer: true,
        is2ndAvailable: is2ndAvailable,
      });
    } else if (ExamName === 'SubjectRevision') {
      navigation.navigate('ScoreBoard', {
        isReattempt: false,
        topicName: chapterName,
        ExamQuestionsets: quiz,
        subjectName: subjectname,
        chapterName: chapterName,
        examSet: examSet,
        quiz: Questionlist,
        studentdata: '',
        contentid: contentid,
        subjectId: subjectId,
        scholarshipid: scholarshipid,
        topicid: topicid,
        boardid: boardid,
        is2ndAvailable: is2ndAvailable,
        scholarshipName: scholarshipName,
      });
      // console.log("SubjectRevision............")
    } else if (isNotificationFlag == true) {
      // navigation.goBack();
      navigation.navigate('NotificationScoreBoard', {
        contentid: contentid,
        // subjectName: subjectName,
        isReattempt: false,
        subjectId: subjectId,
        // boardid: boardid,
        ExamQuestionsets: quiz,
        quiz: Questionlist,
        isNotificationFlag: true,
        stage: stage,
      });
    } else {
      if (ExamName === 'PreviousYear') {
        // console.log('previouus year...........');
        navigation.navigate('ScoreBoard', {
          isReattempt: false,
          topicName: chapterName,
          ExamQuestionsets: quiz,
          subjectName: subjectname,
          chapterName: chapterName,
          examSet: examSet,
          quiz: Questionlist,
          studentdata: '',
          contentid: '',
          scholarshipid: '',
          subjectId: '',
          boardid: '',
          // is2ndAvailable:is2ndAvailable,

          subjectName: subjectName,
          chapterName: '',
          allPrevQuiz: allPrevQuiz,
          prevYearStudentdata: prevYearStudentdata,
          ExamQuestionsets: '',
          previousyearquestionid: previousyearquestionid,
          scholarship: scholarship,
          year: year,
          scholarshipid: scholarshipid,
          timeDuration: timeDuration,
          SubjectList: SubjectList,
          yearid: yearid,
        });
      } else if (ExamName === 'ProbableQuestion') {
        navigation.navigate('ScoreBoard', {
          isReattempt: false,
          topicName: chapterName,
          ExamQuestionsets: quiz,
          subjectName: subjectname,
          // chapterName: chapterName,
          examSet: examSet,
          quiz: Questionlist,
          // studentdata: '',
          contentid: '',

          subjectId: '',
          boardid: '',
          // is2ndAvailable:is2ndAvailable,
          subjectName: subjectName,
          // chapterName: '',
          // allPrevQuiz: allPrevQuiz,
          studentdata: studentdata,
          ProbSubjectId: ProbSubjectId,
          ProbSubjectName: ProbSubjectName,
          ExamQuestionsets: '',
          mostprobablequestionid: mostprobablequestionid,
          scholarship: scholarship,
          screenName: screenName,
          year: year,
          scholarshipid: scholarshipid,
          timeDuration: timeDuration,
          SubjectList: SubjectList,
          setid: setid,
        });
      } else {
        navigation.navigate('ScoreBoard', {
          isReattempt: false,
          topicName: chapterName,
          ExamQuestionsets: quiz,
          subjectName: subjectname,
          chapterName: chapterName,
          examSet: examSet,
          quiz: Questionlist,
          studentdata: '',
          contentid: '',
          scholarshipid: '',
          subjectId: '',
          boardid: '',
          is2ndAvailable: is2ndAvailable,
        });
      }
    }
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      handleBackButtonClick();
      return true;
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        handleBackButtonClick();
        return true;
      });
    };
  }, [ExamName]);
  const source = {
    html: `
    <div style='background-color:#fff; height:250px; border-width : 1px; margin:10px; border-radius : 10px' >
      <p style='text-align:center; color : green; font-size : 20px; font-weight : bold'>
        2 + 2 = 4
      </p>
    </div>`,
  };
  // height:device_height * 0.3, width:device_width
  const {width} = useWindowDimensions();
  const {height} = device_height * 0.3;
  const selectedhandler = (index, answersheet) => {
    if (selectedId == index) {
      setSelectedId(null);
      setShowSolution(false);
      setSolution('');
    } else {
      setSelectedId(index);
      setShowSolution(true);
      setSolution(answersheet);
      //
    }
  };

  function isObjectEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && obj[key].trim() !== '') {
        return false; // Object is not empty
      }
    }
    return true; // Object is empty (or contains only empty spaces)
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <StatusBar backgroundColor={Colors.secondary} barStyle="dark-content" /> */}
      {/* {loading ? (
        <LoadingScreen flag={loading} />
      ) : (
        <> */}
      <ImageBackground
        style={{
          width: device_width,
          height: device_height,
          flex: 1,
          alignSelf: 'center',
          backgroundColor: '#272727',
        }}
        resizeMode="cover"
        // source={require('../../../assets/0.png')}
        >
        <Header
          label1={trans('Answer Sheet')}
          // label2={`{Std - ${stage}`}
          // label2={`${trans('Std')}-${stage}`}
          isbackIconShow={true}
          functionName={handleBackButtonClick}
        />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: 500,
              textTransform: 'capitalize',
            }}>
            {`${subjectname}`}{' '}
            {chapterName != '' && chapterName != null ? (
              `(${chapterName})`
            ) : (
              <></>
            )}
          </Text>
        </View>
        <ScrollView>
          <View style={{flex: 1, paddingVertical: 15}}>
            {loadedQuestions.map((item, index) => {
              const {
                id = '',
                question = '',
                option = [],
                answer: answerVal = '',
                selectedAns = '',
                answersheet = '',
                videolink = '',
                questiontype = '',
              } = item;
              let answer = answerVal.toLowerCase();
              let userAnswer = selectedAns.toLowerCase();

              console.log(
                answersheet,
                answersheet != '',
                'answersheet............',
                answerVal,
                'selectedAns///////////',
                selectedAns,
                userAnswer,
                question,
                '==============question-----------',
                questiontype,
              );
              const answerobj = option.find(rec => rec.label == answer);
              const answerlabel = answerobj != undefined ? answerobj.value : '';
              const selectobj = option.find(rec => rec.label == userAnswer);
              const selectlabel = selectobj != undefined ? selectobj.value : '';
              const wrong = userAnswer != answer;

              // if (questiontype == 'image') {
              //   if (question != '' && JSON.parse(question) != undefined) {
              //     QuestionVal = `${JSON.parse(question)}`;
              //   } else {
              //     QuestionVal = question;
              //   }

              // const questionval = question != '' ? JSON.parse(question) : ''
              {
                /* return (
                <View
                  key={index}
                  style={{
                    padding: 20,
                    color: '#333',
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    fontSize: '38',
                    // backgroundColor:Colors.secondary,
                    backgroundColor: '#fff',
                  }}>
                  <WebView
                    style={{
                      // flex: 1,
                      minHeight: device_height * 0.4,
                    }}
                    originWhitelist={['*']}
                    source={{
                      html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><p>${(
                        <span>test</span>
                      )}</p></body></html>`,
                    }}
                  />
 
                  {/* <WebView
                    style={{
                      flex: 1,
                      minHeight: device_height * 0.4,
                    }}
                    originWhitelist={['*']}
                    source={{
                      html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><p><p></p>
<img src="https://notevook.s3.ap-south-1.amazonaws.com/Adarsh/kona+o+ehara+mapa+Q4.PNG" alt="undefined" style="height: auto;width: auto"/>
<p></p></p></body></html>`,
                    }}
                  /> */
              }

              if (questiontype == 'image') {
                return (
                  <View
                    key={index}
                    style={{
                      // elevation: 15,
                      width: '96%',
                      alignSelf: 'center',
                      backgroundColor: 'rgba(0,255,0, 0.1)',
                      marginTop: 10,
                      padding: 10,
                      // justifyContent: 'center',
                      // alignItems: 'center',
                      borderRadius: 10,
                    }}>
                    {/* <WebView
                    style={{
                      minHeight: device_height * 0.2,
                      fontSize: 14,
                      borderWidth:1
                    }}
                    // originWhitelist={['*']}

                    source={{
                      html: JSON.parse(question),
                    }}
                  /> */}
                    {/* <Text>{JSON.parse(question)}</Text> */}
                    {/* <WebView
                    style={{
                      minHeight: device_height * 0.2,
                      fontSize: 14,
                    }}
                    // originWhitelist={['*']}

                    source={{
                      html: JSON.parse(question),
                    }}
                  /> */}
                    {/* <WebView
                                style={{
                                  minHeight: device_height * 0.4,
                                  fontSize: 25,
                                }}
                                originWhitelist={['*']}
                                // nestedScrollEnabled
                                source={{
                                  html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><p>${JSON.parse(question)}</p></body></html>`,
                                }}
                              /> */}
                    {/* <WebView 
                              source={{
                                  html: `<span>test</span>`
                              }}
                              /> */}
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        // backgroundColor: 'rgba(0,255,0, 0.1)'
                      }}>
                      <MaterialCommunityIcons
                        // name="add-circle"
                        name="hand-pointing-right"
                        color="#fff"
                        size={40}
                        style={{marginRight: 10}}
                      />
                      <Text
                        style={[
                          styles.question,
                          {
                            width: '92%',
                            marginLeft: 5,
                            color: '#fff',
                            fontWeight: '600',
                          },
                        ]}>
                        {'Q'} {'('}
                        {index + 1}
                        {')'}
                        {/* {' : '} */}
                        {/* <Text
                        style={[
                          styles.question,
                          {
                            width: '92%',
                            marginLeft: 15,
                            color: '#2e35de',
                            fontWeight: '600',
                          },
                        ]}>
                        {question}
                      </Text> */}
                      </Text>
                    </View>

                    <RenderHtml
                      contentWidth={width * 0.95}
                      tagsStyles={{img: {objectFit: 'contain'}}}
                      source={{html: `${JSON.parse(question)}`}}
                      color={'#fff'}
                    />
                    <View>
                      {userAnswer != '' ? (
                        <Text
                          style={{
                            color: wrong ? 'red' : '#FFB901',
                            fontSize: 15,
                            fontWeight: '600',
                            marginLeft: 20,
                            marginTop: 10,
                          }}>
                          {trans('Selected Answer')}
                          {' : '}

                          <Text
                            style={{
                              textTransform: 'capitalize',
                              color: wrong ? 'red' : '#FFB901',
                              fontSize: 15,
                              fontWeight: 'bold',
                            }}>
                            {`(${userAnswer})`} {`${selectlabel}`}
                          </Text>
                        </Text>
                      ) : (
                        <Text
                          style={{
                            color: 'darkorange',
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginLeft: 20,
                            // width:'50%'
                          }}>
                          {trans('Question Skipped')}
                        </Text>
                      )}

                      <Text
                        style={{
                          color: '#FFB901',
                          fontSize: 15,
                          fontWeight: '600',
                          marginLeft: 20,
                          marginBottom: 7,
                        }}>
                        {trans('Correct Answer')}
                        {' : '}
                        <Text
                          style={{
                            textTransform: 'capitalize',
                            color: '#FFB901',
                            fontSize: 16,
                            fontWeight: 'bold',
                          }}>
                          {`(${answer})`} {`${answerlabel}`}
                        </Text>
                      </Text>
                    </View>

                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginTop: 10,
                        marginHorizontal: 10,
                        // marginLeft: 10,
                      }}>
                      {answersheet.trim() !== '' &&
                        answersheet.trim() !== '""' &&
                        answersheet.trim() !== '"<p><br></p>"' && (
                          <TouchableOpacity
                            disabled={
                              Object.keys(answersheet).some(
                                key => answersheet[key].trim() !== '',
                              )
                                ? false
                                : true
                            }
                            onPress={() => {
                              // selectedhandler(index, answersheet)
                              navigation.navigate('SolutionScreen', {
                                solution: answersheet,
                              });
                            }}
                            style={{
                              width: '48%',
                              elevation: 15,
                            }}>
                            <Text
                              style={{
                                color: answersheet != '' ? '#fff' : '#C5C6D0',
                                paddingVertical: 5,
                                fontSize: 15,
                                textAlign: 'center',
                                fontWeight: 'bold',
                                backgroundColor:
                                  answersheet != '' ? '#708C1B' : '#ededed',
                                borderRadius: 15,
                                borderWidth: 0.3,
                                borderColor: Colors.primary,
                              }}>
                              <MaterialCommunityIcons
                                // name="add-circle" refresh
                                name="lightbulb-on-outline"
                                // color="#2e35de"
                                color={answersheet != '' ? '#fff' : '#C5C6D0'}
                                size={18}
                                style={{marginRight: 10}}
                              />
                              {trans('View Solution')}
                            </Text>
                          </TouchableOpacity>
                        )}
                      {videolink != '' && (
                        <TouchableOpacity
                          disabled={videolink != '' ? false : true}
                          onPress={() => {
                            if (videolink != '') {
                              navigation.navigate('VideoSolutionScreen', {
                                url: videolink,
                              });
                            }
                          }}
                          style={{
                            width: '48%',
                            elevation: 15,
                          }}>
                          <Text
                            style={{
                              color: videolink != '' ? '#333' : '#888',
                              paddingVertical: 5,
                              fontSize: 15,
                              textAlign: 'center',
                              fontWeight: 'bold',
                              backgroundColor:
                                videolink != '' ? '#fff' : '#ededed',
                              borderRadius: 15,
                              borderWidth: 0.3,
                              borderColor: Colors.primary,
                            }}>
                            <AntDesign
                              style={{color: videolink != '' ? '#333' : '#888'}}
                              name="playcircleo"
                              size={15}
                            />{' '}
                            {trans('Video Reference')}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                );
              } else {
                return (
                  <TouchableOpacity
                    key={index}
                    disabled={true}
                    style={{
                      // elevation: 15,
                      width: '96%',
                      alignSelf: 'center',
                      backgroundColor: 'rgba(0,255,0, 0.1)',
                      marginTop: 10,
                      padding: 10,
                      // justifyContent: 'center',
                      // alignItems: 'center',
                      borderRadius: 10,
                      // borderWidth: 0.5,
                      // borderColor: Colors.primary,
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                      }}>
                      <MaterialCommunityIcons
                        // name="add-circle"
                        name="hand-pointing-right"
                        color="#fff"
                        size={40}
                        style={{marginRight: 10}}
                      />
                      <Text
                        style={[
                          styles.question,
                          {
                            width: '92%',
                            marginLeft: 5,
                            color: '#fff',
                            fontWeight: '600',
                          },
                        ]}>
                        {'Q'} {'('}
                        {index + 1}
                        {')'}
                        {' : '}
                        <Text
                          style={[
                            styles.question,
                            {
                              width: '92%',
                              marginLeft: 15,
                              color: '#fff',
                              fontWeight: '600',
                            },
                          ]}>
                          {question}
                        </Text>
                      </Text>
                    </View>

                    <View>
                      {userAnswer != '' ? (
                        <Text
                          style={{
                            color: wrong ? 'red' : '#FFB901',
                            fontSize: 15,
                            fontWeight: '600',
                            marginLeft: 20,
                            marginTop: 10,
                          }}>
                          {trans('Selected Answer')}
                          {' : '}

                          <Text
                            style={{
                              textTransform: 'capitalize',
                              color: wrong ? 'red' : '#FFB901',
                              fontSize: 15,
                              fontWeight: 'bold',
                            }}>
                            {`(${userAnswer.trim()})`} {`${selectlabel}`}
                          </Text>
                        </Text>
                      ) : (
                        <Text
                          style={{
                            color: 'darkorange',
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginLeft: 20,
                            // width:'50%'
                          }}>
                          {trans('Question Skipped')}
                        </Text>
                      )}

                      <Text
                        style={{
                          color: '#FFB901',
                          fontSize: 15,
                          fontWeight: '600',
                          marginLeft: 20,
                          marginBottom: 7,
                        }}>
                        {trans('Correct Answer')}
                        {' : '}
                        <Text
                          style={{
                            textTransform: 'capitalize',
                            color: '#FFB901',
                            fontSize: 16,
                            fontWeight: 'bold',
                          }}>
                          {`(${answer.trim()})`} {`${answerlabel}`}
                        </Text>
                      </Text>
                    </View>

                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginTop: 10,
                        marginHorizontal: 10,
                        // marginLeft: 10,
                      }}>
                      {answersheet.trim() !== '' &&
                        answersheet.trim() !== '""' &&
                        answersheet.trim() !== '"<p><br></p>"' && (
                          <TouchableOpacity
                            disabled={
                              Object.keys(answersheet).some(
                                key => answersheet[key].trim() !== '',
                              )
                                ? false
                                : true
                            }
                            onPress={() => {
                              // selectedhandler(index, answersheet)
                              //
                              navigation.navigate('SolutionScreen', {
                                solution: answersheet,
                              });
                            }}
                            style={{
                              width: '48%',
                              // elevation: 15,
                            }}>
                            <Text
                              style={{
                                color: answersheet != '' ? '#fff' : '#C5C6D0',
                                paddingVertical: 5,
                                fontSize: 15,
                                textAlign: 'center',
                                fontWeight: 'bold',
                                backgroundColor:
                                  answersheet != '' ? '#708C1B' : '#708C1B',
                                borderRadius: 15,
                                borderWidth: 0.3,
                                borderColor: Colors.primary,
                              }}>
                              <MaterialCommunityIcons
                                name="lightbulb-on-outline"
                                // color="#2e35de"
                                color={answersheet != '' ? '#fff' : '#C5C6D0'}
                                size={18}
                                style={{marginRight: 10}}
                              />
                              {trans('View Solution')}
                            </Text>
                          </TouchableOpacity>
                        )}
                      {videolink != '' && (
                        <TouchableOpacity
                          disabled={videolink != '' ? false : true}
                          onPress={() => {
                            if (videolink != '') {
                              navigation.navigate('VideoSolutionScreen', {
                                url: videolink,
                              });
                            }
                          }}
                          style={{
                            width: '48%',
                            elevation: 15,
                          }}>
                          <Text
                            style={{
                              color: videolink != '' ? '#333' : '#888',
                              paddingVertical: 5,
                              fontSize: 15,
                              textAlign: 'center',
                              fontWeight: 'bold',
                              backgroundColor:
                                videolink != '' ? '#fff' : '#ededed',
                              borderRadius: 15,
                              borderWidth: 0.3,
                              borderColor: Colors.primary,
                            }}>
                            <AntDesign
                              style={{color: videolink != '' ? '#333' : '#888'}}
                              name="playcircleo"
                              size={15}
                            />{' '}
                            {trans('Video Reference')}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              }
            })}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default AnswerSheet;
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
    // borderWidth: 1,
    // borderColor: '#E5E4E2',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },

  headerInner: {
    width: '95%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 15,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  headerinner1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
    // width: '100',
    // height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
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
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    // width: '100%',
    height: 100,
  },
});
