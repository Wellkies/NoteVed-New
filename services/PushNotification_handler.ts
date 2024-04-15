import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {navigateToScreen} from '../src/navigation/Navigationref';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // //
    getFcmToken();
  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  // //
  if (!fcmToken) {
    try {
      let fcmToken = await messaging().getToken();
      if (fcmToken) {
        // //
        AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      // //
    }
  }
};

export const NotificationServices = () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(remoteMessage => {
    // console.log(
    //   'Notification caused app to open from background state:',
    //   remoteMessage.notification,
    // );
    // navigation.navigate(remoteMessage.data.route_name);
    if (remoteMessage.data.fcmmessagetype == 'text') {
      navigateToScreen('UserHome', remoteMessage.data);
    } else if (remoteMessage.data.fcmmessagetype == 'quiz') {
      navigateToScreen('NotificationMockTest', remoteMessage.data);
    } else {
      navigateToScreen('UserHome', remoteMessage.data);
    }
  });

  messaging().onMessage(async remoteMessage => {
    console.log(remoteMessage.data.fcmmessagetype, '===========message_123');
    if (remoteMessage.data.fcmmessagetype == 'text') {
      navigateToScreen('UserHome', remoteMessage.data);
    } else if (remoteMessage.data.fcmmessagetype == 'quiz') {
      navigateToScreen('NotificationMockTest', remoteMessage.data);
    } else {
      navigateToScreen('UserHome', remoteMessage.data);
    }
  });
  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        const notificationQuiz = remoteMessage.data;
        // console.log(remoteMessage.data, '===========message');
        // console.log(remoteMessage.data.fcmmessagetitle,"============fcmmessagetitle-----------");
        if (remoteMessage.data.fcmmessagetype == 'text') {
          navigateToScreen('UserHome', remoteMessage.data);
        } else if (remoteMessage.data.fcmmessagetype == 'quiz') {
          navigateToScreen('NotificationMockTest', remoteMessage.data);
        } else {
          navigateToScreen('UserHome', remoteMessage.data);
        }
        // const {
        //   subjectName = '',
        //   chapterName = '',
        //   examSet = '',
        //   quiz = [],
        //   contentid = '',
        //   isReattempt = '',
        //   studentdata = [],
        //   scholarshipid = '',
        //   subjectId = '',
        //   boardid = '',
        //   timeDuration = '',
        //   scholarshipName = '',

        //   _id = "",
        //   subjectname = '',
        //   answersheet = '',
        //   question = '',
        //   questionno = '',
        //   answertype = "",
        //   videolink = "",
        //   questiontype = "",
        //   subjectid = "",
        //   selectedAns = "",
        //   answer = "",
        //   subquestions = [],
        //   option = []
        // } = notificationQuiz;

        // Navigation.navigate('NotificationMockTest', {
        //   subjectName: subjectName,
        //   chapterName: chapterName,
        //   examSet: examSet,
        //   quiz: notificationQuiz,
        //   contentid: contentid,
        //   isReattempt: isReattempt,
        //   studentdata: studentdata,
        //   scholarshipid: scholarshipid,
        //   subjectId: subjectId,
        //   boardid: boardid,
        //   timeDuration:timeDuration,
        //   scholarshipName: scholarshipName,
        // });
      }
      //   setLoading(false);
    });
};
