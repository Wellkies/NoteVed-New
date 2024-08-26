import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS, ROUTES } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StatusBar } from 'react-native';
import Colors from '../../assets/Colors';
import { useTranslation } from 'react-i18next';
import Notification from '../screens/UserScreen/Notification';

const Stack = createStackNavigator();

function NotificationTabNavigator() {
  const { t: trans, i18n } = useTranslation();
  return (
    <>
      <StatusBar backgroundColor={'#263d2d'} barStyle="light-content" />

      <Stack.Navigator
        screenOptions={({ route, navigation }) => ({
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
        initialRouteName={ROUTES.NOTIFICATION_TAB}>
        <Stack.Screen
          name={ROUTES.NOTIFICATION}
          component={Notification}
          options={({ route, navigation }) => ({
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
      </Stack.Navigator>
    </>
  );
}

export default NotificationTabNavigator;
