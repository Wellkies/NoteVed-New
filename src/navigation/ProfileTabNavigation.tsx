import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {COLORS, ROUTES} from '../../constants';
// import ClinicList from '../screens/ClinicList';
// import AddClinic from '../screens/AddClinic';
import Icon from 'react-native-vector-icons/Ionicons';
import {StatusBar} from 'react-native';
// import Profile from '../screens/AppScreens/Profile';
import Colors from '../../assets/Colors';
import {useTranslation} from 'react-i18next';
import UserProfile from '../screens/UserScreen/UserProfile';
// import ContactUs from '../screens/AppScreens/ContactUs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EditProfile from '../screens/UserScreen/EditProfile';
import ContactUs from '../screens/UserScreen/ContactUs';
import ChangePassword from '../screens/UserScreen/ChangePassword';
import PremiumAccess from '../screens/UserScreen/PremiumAccess';
import PremiumPurchase from '../screens/UserScreen/PremiumPurchase';
// import PremiumAccess from '../screens/AppScreens/PremiumAccess';
// import PremimumPurchase from '../screens/AppScreens/PremimumPurchase';
// import KidsProfile from '../screens/AppScreens/KidsProfile';
// import ChangePassword from '../screens/AppScreens/ChangePassword';

const Stack = createStackNavigator();

function ProfileTabNavigation() {
  const {t: trans, i18n} = useTranslation();
  //   console.log(Stack);
  //   const Clinicparams={isTodaysFlag : false, isbookingAppointment : false}
  return (
    <>
      <StatusBar backgroundColor={'#272727'} barStyle="light-content" />

      <Stack.Navigator
        screenOptions={({route, navigation}) => ({
          headerShown: false,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
          headerTitleStyle: {
            fontWeight: '400',
            marginLeft: -20,
            fontFamily: 'Yaldevi-Regular',
          },
        })}
        initialRouteName={ROUTES.USERPROFILE}>
        <Stack.Screen
          name={ROUTES.USERPROFILE}
          component={UserProfile}
          // initialParams={Clinicparams}
          options={({route, navigation}) => ({
            // route:{params:{isTodaysFlag :true, isbookingAppointment : false}},
            title: trans('UserProfile'),
            //   {isTodaysFlag = true, isbookingAppointment = false}
            //   title: 'Clinics List',
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
          name={ROUTES.EDITPROFILE}
          component={EditProfile}
          // initialParams={Clinicparams}
          options={({route, navigation}) => ({
            // route:{params:{isTodaysFlag :true, isbookingAppointment : false}},
            title: trans('EditProfile'),
            //   {isTodaysFlag = true, isbookingAppointment = false}
            //   title: 'Clinics List',
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
          name={ROUTES.PROFILE_DETAILS}
          component={Profile}
          // initialParams={Clinicparams}
          options={({route, navigation}) => ({
            // route:{params:{isTodaysFlag :true, isbookingAppointment : false}},
            title: trans('UserProfile'),
            //   {isTodaysFlag = true, isbookingAppointment = false}
            //   title: 'Clinics List',
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
          name={ROUTES.KIDS_PROFILE}
          component={KidsProfile}
          options={({navigation}) => ({
            title: trans("Student's Profile"),
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
          name={ROUTES.CONTACT_US}
          component={ContactUs}
          options={({route, navigation}) => ({
            title: 'Contact Us',
            // title: route.params.isTodaysFlag == true ? 'Todays Appointment' : 'Clinics List',
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
          name={ROUTES.CHANGEPASSWORD}
          component={ChangePassword}
          options={({route, navigation}) => ({
            title: 'Contact Us',
            // title: route.params.isTodaysFlag == true ? 'Todays Appointment' : 'Clinics List',
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
      </Stack.Navigator>
    </>
  );
}

export default ProfileTabNavigation;
