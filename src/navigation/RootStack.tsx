import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/AuthScreen/SplashScreen';
import SignInScreen from '../screens/AuthScreen/SignInScreen';
import TermAndConditions from '../screens/AuthScreen/TermAndConditions';
import IntroVideoScreen from '../screens/AuthScreen/IntroVideoScreen';
import SignUpScreen1 from '../screens/AuthScreen/SignUpScreen1';
import SignUpScreen2 from '../screens/AuthScreen/SignUpScreen2';
import SignUpScreen3 from '../screens/AuthScreen/SignUpScreen3';
import SignUpScreen4 from '../screens/AuthScreen/SignUpScreen4';
import SignUpScreen5 from '../screens/AuthScreen/SignUpScreen5';
import SelectUserScreen from '../screens/AuthScreen/SelectUserScreen';

export type RootStackParamList = {
  onboarding: NavigatorScreenParams<OnboardingStackParamList>;
};

export type OnboardingStackParamList = {
  SplashScreen: undefined;
  SignInScreen: undefined;
  TermAndConditions: undefined;
  IntroVideoScreen: undefined;
  SignUpScreen1: undefined;
  SignUpScreen2: undefined;
  SignUpScreen3: undefined;
  SignUpScreen4: undefined;
  SignUpScreen5: undefined;
  SelectUserScreen: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const RootStackScreens = createNativeStackNavigator<OnboardingStackParamList>();

const RootStackScreen = () => {
  return (
    <RootStackScreens.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={'SplashScreen'}>
      <RootStackScreens.Screen name="SplashScreen" component={SplashScreen} />
      <RootStackScreens.Screen name="SignInScreen" component={SignInScreen} />
      <RootStackScreens.Screen name="SignUpScreen1" component={SignUpScreen1} />
      <RootStackScreens.Screen name="SignUpScreen2" component={SignUpScreen2} />
      <RootStackScreens.Screen name="SignUpScreen3" component={SignUpScreen3} />
      <RootStackScreens.Screen name="SignUpScreen4" component={SignUpScreen4} />
      <RootStackScreens.Screen name="SignUpScreen5" component={SignUpScreen5} />
      <RootStackScreens.Screen name="TermAndConditions" component={TermAndConditions} />
      <RootStackScreens.Screen name="IntroVideoScreen" component={IntroVideoScreen} />
      <RootStackScreens.Screen name="SelectUserScreen" component={SelectUserScreen} />
    </RootStackScreens.Navigator>
  );
};
export default RootStackScreen;
