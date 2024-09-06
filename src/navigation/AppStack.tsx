import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '../../constants';
import {Image, StatusBar, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  NavigationContainer,
  DarkTheme,
  NavigatorScreenParams,
} from '@react-navigation/native';
import Colors from '../../assets/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import UserHome from '../screens/UserScreen/UserHome';
import SubjectsDetails from '../screens/UserScreen/SubjectDetails';
import PrevYearQues from '../screens/UserScreen/PrevYearQues';
import PrevSubjectList from '../screens/UserScreen/PrevSubjectList';
import ExamSets from '../screens/UserScreen/ExamSets';
import ProbQuestion from '../screens/UserScreen/ProbQuestion';
import ProbSubjectList from '../screens/UserScreen/ProbSubjectList';
import ProbableMockTest from '../screens/UserScreen/ProbableMockTest';
import MockTests from '../screens/UserScreen/MockTests';
import ScoreBoard from '../screens/UserScreen/ScoreBoard';
import EditProfile from '../screens/UserScreen/EditProfile';
import AnswerSheet from '../screens/UserScreen/AnswerSheet';
import PrevMockTest from '../screens/UserScreen/PrevMockTest';
import VideoSolutionScreen from '../screens/UserScreen/VideoSolutionScreen';
import SolutionScreen from '../screens/UserScreen/SolutionScreen';
import MaintenanceModal from '../screens/CommonScreens/MaintenanceModal';
import PremiumAccess from '../screens/UserScreen/PremiumAccess';
import VideoScreen from '../screens/UserScreen/VideoScreen';
import PremiumPurchase from '../screens/UserScreen/PremiumPurchase';
import ExpiredTokenScreen from '../screens/CommonScreens/ExpiredTokenScreen';
import YoutibeList from '../screens/UserScreen/YoutubeList';
import Youtubevideo from '../screens/UserScreen/Youtubevideo';
import LiveClassList from '../screens/UserScreen/LiveClassList';
import LandingScreen from '../screens/UserScreen/LandingScreen';
import SubjectList from '../screens/UserScreen/SubjectList';
import SubjectLevel from '../screens/UserScreen/SubjectLevel';
import Reviews from '../screens/UserScreen/Reviews';
import Details from '../screens/UserScreen/Details';
import TopicDetails from '../screens/UserScreen/TopicDetails';
import ContentDetails from '../screens/UserScreen/ContentDetails';
import LevelCompleted from '../screens/UserScreen/LevelCompleted';
import CircularProgressBar from '../screens/UserScreen/CircularProgressBar';
import LiveQuiz from '../screens/UserScreen/LiveQuiz';
import LiveQuizScoreBoard from '../screens/UserScreen/LiveQuizScoreBoard';
import LiveQuizInfo from '../screens/UserScreen/LiveQuizInfo';
import LiveQuizAnswerSheet from '../screens/UserScreen/LiveQuizAnswerSheet';
import LiveQuizDetails from '../screens/UserScreen/LiveQuizDetails';
import LiveQuizLeaderBoardList from '../screens/UserScreen/LiveQuizLeaderBoardList';

export type RootStackParamList = {
  AppStack: NavigatorScreenParams<AppStackParamList>;
};

export type AppStackParamList = {
  UserHome: undefined;
  SubjectsDetails: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Stack = createStackNavigator<AppStackParamList>();

const AppStack = props => {
  const {t: trans, i18n} = useTranslation();

  const mytheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
    },
  };
  const {hideTabbar} = props;

  return (
    <>
      <StatusBar backgroundColor={'#272727'} barStyle="light-content" />
      <Stack.Navigator
        screenOptions={({navigation}) => (
          navigation.getState().routes[navigation.getState().index].name ==
            'MockTests' ||
          navigation.getState().routes[navigation.getState().index].name ==
            'PrevMockTest' ||
          navigation.getState().routes[navigation.getState().index].name ==
            'VideoScreen' ||
            navigation.getState().routes[navigation.getState().index].name ==
            'LiveQuiz' ||
          navigation.getState().routes[navigation.getState().index].name ==
            'NotificationMockTest' ||
          navigation.getState().routes[navigation.getState().index].name ==
            'MaintenanceModal' ||
          navigation.getState().routes[navigation.getState().index].name ==
            'ExpiredTokenScreen' ||
          navigation.getState().routes[navigation.getState().index].name ==
            'ProbableMockTest'
            ? props.hideTabbar(true)
            : props.hideTabbar(false),
          {
            headerShown:
              navigation.getState().routes[navigation.getState().index].name ==
                'UserHome' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'LandingScreen' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'SubjectList' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'SubjectLevel' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'EditProfile' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'PrevMockTest' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'Reviews' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'Details' ||
                navigation.getState().routes[navigation.getState().index].name ==
                'TopicDetails' ||
                navigation.getState().routes[navigation.getState().index].name ==
                'ContentDetails' ||
                navigation.getState().routes[navigation.getState().index].name ==
                'LevelCompleted' ||
                navigation.getState().routes[navigation.getState().index].name ==
                'CircularProgressBar' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'ProbableMockTest' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'MaintenanceModal' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'ExpiredTokenScreen' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'ProbQuestion' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'PrevYearQues' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'ProductDetails' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'MyCart' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'SubjectsDetails' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'ExamSets' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'AnswerSheet' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'PrevYearAnswersheet' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'ProgressChart' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'PrevSubjectList' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'ProbSubjectList' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'LiveClassList' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'Youtubevideo' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'Profile' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'MockTests' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'Notification' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'ScoreBoard' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'SolutionScreen' ||
                navigation.getState().routes[navigation.getState().index].name ==
                'LiveQuizScoreBoard' ||
                navigation.getState().routes[navigation.getState().index].name ==
                'LiveQuizLeaderBoardList' ||
                navigation.getState().routes[navigation.getState().index].name ==
                'LiveQuizInfo' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'LiveQuizDetails' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'LiveQuiz' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'LiveQuizAnswerSheet' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'PremiumAccess' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'PremiumPurchase' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'NotificationMockTest' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'NotificationScoreBoard' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'NotificationQuestion' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'ContactUs' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'YoutibeList' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'ProductDetails' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'ProductList' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'VideoSolutionScreen' ||
              navigation.getState().routes[navigation.getState().index].name ==
                'VideoScreen'
                ? false
                : true,
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTintColor: Colors.white,
            headerTitleStyle: {
              fontWeight: '400',
              marginLeft: -20,
              fontFamily: 'Yaldevi-Regular',
            },
          }
        )}
        initialRouteName={'SubjectLevel'}>
        <Stack.Screen
          name={ROUTES.SUBJECT_LEVEL}
          component={SubjectLevel}
          // options={({ route, navigation }) => ({
          //   title: 'LandingScreen',
          //   headerLeft: () => (
          //     <Icon.Button
          //       name="ios-chevron-back-outline"
          //       size={25}
          //       backgroundColor={Colors.primary}
          //       onPress={() => navigation.goBack()}></Icon.Button>
          //   ),
          // })}
        />

        <Stack.Screen
          name={ROUTES.SUBJECT_LIST}
          component={SubjectList}
          // options={({ navigation }) => ({
          //   title: trans('Answersheet'),
          //   headerLeft: () => (
          //     <MaterialIcons.Button
          //       name="keyboard-arrow-left"
          //       size={30}
          //       backgroundColor={Colors.secondary}
          //       color={Colors.primary}
          //       onPress={() => navigation.goBack()}
          //     />
          //   ),
          // })}
        />

        {/* <Stack.Screen
          name={ROUTES.SUBJECT_LEVEL}
          component={SubjectLevel}
          options={({route, navigation}) => ({
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.primary}
                color={Colors.secondary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        /> */}

        <Stack.Screen
          name={'UserHome'}
          component={UserHome}
          // options={({navigation}) => ({
          //   title: (),
          // })}
          // name={ROUTES.HOME}
          // component={Home}
        />
         <Stack.Screen
          name={ROUTES.LIVEQUIZDETAILS}
          component={LiveQuizDetails}
          options={({navigation}) => ({
            title: trans('Live Quiz Details'),
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.primary}
                color={Colors.secondary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />

        <Stack.Screen
          name={ROUTES.LIVEQUIZINFO}
          component={LiveQuizInfo}
          options={({navigation}) => ({
            title: trans('Live Quiz'),
            // headerLeft: () => (
            //   <MaterialIcons.Button
            //     name="keyboard-arrow-left"
            //     size={30}
            //     backgroundColor={Colors.primary}
            //     color={Colors.secondary}
            //     onPress={() => navigation.goBack()}
            //   />
            // ),
          })}
        />
        <Stack.Screen
          name={ROUTES.LIVEQUIZ}
          component={LiveQuiz}
          options={({navigation}) => ({
            title: trans('Live Quiz'),
            // headerLeft: () => (
            //   <MaterialIcons.Button
            //     name="keyboard-arrow-left"
            //     size={30}
            //     backgroundColor={Colors.primary}
            //     color={Colors.secondary}
            //     onPress={() => navigation.goBack()}
            //   />
            // ),
          })}
        />

        <Stack.Screen
          name={ROUTES.LIVEQUIZSCOREBOARD}
          component={LiveQuizScoreBoard}
          options={({navigation}) => ({
            // title: "Scoreboard",
            // headerLeft: () => (
            //   <MaterialIcons.Button
            //     name="keyboard-arrow-left"
            //     size={30}
            //     backgroundColor={Colors.primary}
            //     color={Colors.secondary}
            //     onPress={() => navigation.goBack()}
            //   />
            // ),
          })}
        />

        <Stack.Screen
          name={ROUTES.LIVEQUIZANSWERSHEET}
          component={LiveQuizAnswerSheet}
          options={({navigation}) => ({
            // title: trans('Edit Profile'),
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.primary}
                color={Colors.secondary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
         <Stack.Screen
          name={ROUTES.LIVEQUIZLEADERBOARDLIST}
          component={LiveQuizLeaderBoardList}
          options={({navigation}) => ({
            // title: "Scoreboard",
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.primary}
                color={Colors.secondary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />


        <Stack.Screen
          name={ROUTES.ANSWERSHEET}
          component={AnswerSheet}
          options={({navigation}) => ({
            title: trans('Answersheet'),
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.secondary}
                color={Colors.primary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name={ROUTES.REVIEWS}
          component={Reviews}
          options={({navigation}) => ({
            title: trans(''),
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.secondary}
                color={Colors.primary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />      
        <Stack.Screen
          name={ROUTES.DETAILS}
          component={Details}
          options={({navigation}) => ({
            title: trans(''),
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.secondary}
                color={Colors.primary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
         <Stack.Screen
          name={ROUTES.TOPICDETAILS}
          component={TopicDetails}
          options={({navigation}) => ({
            title: trans(''),
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.secondary}
                color={Colors.primary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name={ROUTES.CONTENTDETAILS}
          component={ContentDetails}
          options={({navigation}) => ({
            title: trans(''),
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.secondary}
                color={Colors.primary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name={ROUTES.LEVELCOMPLETED}
          component={LevelCompleted}
          options={({navigation}) => ({
            title: trans(''),
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.secondary}
                color={Colors.primary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
         <Stack.Screen
          name={ROUTES.CIRCULARPROGRESSBAR}
          component={CircularProgressBar}
          options={({navigation}) => ({
            title: trans(''),
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.secondary}
                color={Colors.primary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name={ROUTES.SOLUTIONSCREEN}
          component={SolutionScreen}
          options={({navigation}) => ({
            title: 'View Solution',
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.primary}
                color={Colors.secondary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name={ROUTES.VIDEOTUTORIALSCREEN}
          component={VideoScreen}
          options={({navigation}) => ({
            // title: 'Answersheet',
            // headerLeft: () => (
            //   <Icon.Button
            //     name="ios-chevron-back-outline"
            //     size={25}
            //     backgroundColor={Colors.primary}
            //     onPress={() => navigation.goBack()}></Icon.Button>
            // ),
          })}
        />
        <Stack.Screen
          name={ROUTES.SCOREBOARD}
          component={ScoreBoard}
          options={({navigation}) => ({
            // title: "Scoreboard",
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.primary}
                color={Colors.secondary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name={ROUTES.EDITPROFILE}
          component={EditProfile}
          options={({navigation}) => ({
            title: trans('Edit Profile'),
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.primary}
                color={Colors.secondary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />

        <Stack.Screen
          name={ROUTES.EXAMSETS}
          component={ExamSets}
          options={({navigation}) => ({
            title: trans('Exam Set'),
            // headerLeft: () => (
            //   <Icon.Button
            //     name="ios-chevron-back-outline"
            //     size={25}
            //     backgroundColor={Colors.primary}
            //     onPress={() => navigation.goBack()}></Icon.Button>
            // ),
          })}
        />
        <Stack.Screen
          name="SubjectsDetails"
          component={SubjectsDetails}
          options={({route, navigation}) => ({
            title: 'Subject Details',
            // title: route.params.isTodaysFlag == true ? 'Todays Appointment' : 'Clinics List',
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.primary}
                color={Colors.secondary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name={ROUTES.MOCKTESTS}
          component={MockTests}
          options={({navigation}) => ({
            title: 'Mock Test',
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.primary}
                color={Colors.secondary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name={ROUTES.PREV_QUESTION}
          component={PrevYearQues}
          options={({route, navigation}) => ({
            title: 'Previous Year Questions',
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.secondary}
                color={Colors.primary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name={ROUTES.PROBABLE_QUESTION}
          component={ProbQuestion}
          options={({route, navigation}) => ({
            title: 'Probable Questions',
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.primary}
                color={Colors.secondary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        {/* <Stack.Screen
          name={ROUTES.NOTIFICATIONMOCKTEST}
          component={NotificationMockTest}
          options={({route, navigation}) => ({
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.primary}
                color={Colors.secondary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        /> */}
        <Stack.Screen
          name={ROUTES.PREVMOCKTEST}
          component={PrevMockTest}
          options={({route, navigation}) => ({
            // title: 'Probable Questions',
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.primary}
                color={Colors.secondary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name={ROUTES.PROBABLEMOCKTEST}
          component={ProbableMockTest}
          options={({route, navigation}) => ({
            // title: 'Probable Questions',
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.primary}
                color={Colors.secondary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name={ROUTES.MAINTENANCE}
          component={MaintenanceModal}
          options={({route, navigation}) => ({
            // title: 'Probable Questions',
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.primary}
                color={Colors.secondary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name={ROUTES.EXPIREDTOKENSCREEN}
          component={ExpiredTokenScreen}
          options={({route, navigation}) => ({
            // title: 'Probable Questions',
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.primary}
                color={Colors.secondary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />

        <Stack.Screen
          name={ROUTES.PREMIUMACCESS}
          component={PremiumAccess}
          options={({route, navigation}) => ({
            title: 'Available Scholarship',
            headerLeft: () => (
              <Icon.Button
                name="ios-chevron-back-outline"
                size={25}
                backgroundColor={Colors.primary}
                onPress={() => navigation.goBack()}></Icon.Button>
            ),
          })}
        />
        <Stack.Screen
          name={ROUTES.YOUTUBELIST}
          component={YoutibeList}
          options={({route, navigation}) => ({
            title: 'Available Scholarship',
            headerLeft: () => (
              <Icon.Button
                name="ios-chevron-back-outline"
                size={25}
                backgroundColor={Colors.primary}
                onPress={() => navigation.goBack()}></Icon.Button>
            ),
          })}
        />

        <Stack.Screen
          name={ROUTES.PREMIUMPURCHASE}
          component={PremiumPurchase}
          options={({route, navigation}) => ({
            title: 'Purchase',
            headerLeft: () => (
              <Icon.Button
                name="ios-chevron-back-outline"
                size={25}
                backgroundColor={Colors.primary}
                onPress={() => navigation.goBack()}></Icon.Button>
            ),
          })}
        />
        {/* <Stack.Screen
          name={ROUTES.PROGRESSCHART}
          component={ProgressChart}
          options={({route, navigation}) => ({
            title: 'Purchase',
            headerLeft: () => (
              <Icon.Button
                name="ios-chevron-back-outline"
                size={25}
                backgroundColor={Colors.primary}
                onPress={() => navigation.goBack()}></Icon.Button>
            ),
          })}
        /> */}
        <Stack.Screen
          name={ROUTES.YOUTUBEVIDEO}
          component={Youtubevideo}
          options={({route, navigation}) => ({
            title: 'Purchase',
            headerLeft: () => (
              <Icon.Button
                name="ios-chevron-back-outline"
                size={25}
                backgroundColor={Colors.primary}
                onPress={() => navigation.goBack()}></Icon.Button>
            ),
          })}
        />
        <Stack.Screen
          name={ROUTES.LIVECLASSLIST}
          component={LiveClassList}
          options={({route, navigation}) => ({
            title: 'Purchase',
            headerLeft: () => (
              <Icon.Button
                name="ios-chevron-back-outline"
                size={25}
                backgroundColor={Colors.primary}
                onPress={() => navigation.goBack()}></Icon.Button>
            ),
          })}
        />
        <Stack.Screen
          name={ROUTES.PREV_SUB_LIST}
          component={PrevSubjectList}
          options={({route, navigation}) => ({
            title: 'Subject List',
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.secondary}
                color={Colors.primary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name={ROUTES.PROB_SUB_LIST}
          component={ProbSubjectList}
          options={({route, navigation}) => ({
            title: 'Subject List',
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.secondary}
                color={Colors.primary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        {/* <Stack.Screen
          name={ROUTES.PRODUCT_LIST}
          component={ProductList}
          options={({navigation}) => ({
            title: trans('Product List'),
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.secondary}
                color={Colors.primary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        /> */}
        {/* <Stack.Screen
          name={ROUTES.PRODUCTDETAILS}
          component={ProductDetails}
          options={({navigation}) => ({
            // title: trans('Answersheet'),
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.secondary}
                color={Colors.primary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        /> */}
        {/* <Stack.Screen
          name={ROUTES.MYCART}
          component={MyCart}
          options={({navigation}) => ({
            title: trans('Cart'),
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.secondary}
                color={Colors.primary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        /> */}

        {/* <Stack.Screen
          name={ROUTES.ADDRESSSCREEN}
          component={AddressScreen}
          options={({route, navigation}) => ({
            // title: 'Address',
            title: route.params.isEdit == true ? 'Edit Address' : 'Add Address',
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.secondary}
                color={Colors.primary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        /> */}

        {/* <Stack.Screen
          name={ROUTES.THANKS}
          component={Thanks}
          options={({route, navigation}) => ({
            title: 'Order Success',
            // title: route.params.isEdit == true ? 'Edit Address' : 'Add Address',
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.secondary}
                color={Colors.primary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        /> */}
        {/* <Stack.Screen
          name={ROUTES.ORDERLIST}
          component={OrderList}
          options={({route, navigation}) => ({
            title: 'All Orders',
            // title: route.params.isEdit == true ? 'Edit Address' : 'Add Address',
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.secondary}
                color={Colors.primary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        /> */}
        {/* <Stack.Screen
          name={ROUTES.ORDERDETAILS}
          component={OrderDetails}
          options={({route, navigation}) => ({
            title: 'Order Details',
            // title: route.params.isEdit == true ? 'Edit Address' : 'Add Address',
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.secondary}
                color={Colors.primary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        /> */}
        <Stack.Screen
          name={ROUTES.VIDEOSOLUTIONSCREEN}
          component={VideoSolutionScreen}
          options={({route, navigation}) => ({
            // title: 'Probable Questions',
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.primary}
                color={Colors.secondary}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </>
  );
};
export default AppStack;
