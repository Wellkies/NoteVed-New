import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS, ROUTES } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'react-native';
import Colors from '../../assets/Colors';
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStore from '../screens/UserScreen/MyStore';
import ProductList from '../screens/UserScreen/ProductList';
import MyCart from '../screens/UserScreen/MyCart';
import ProductDetails from '../screens/UserScreen/ProductDetails';
import AddressScreen from '../screens/UserScreen/AddressScreen';
import Thanks from '../screens/UserScreen/Thanks';
import OrderList from '../screens/UserScreen/OrderList';
import OrderDetails from '../screens/UserScreen/OrderDetails';

const Stack = createStackNavigator();

const StoreTabNavigator = () => {
  const { t: trans, i18n } = useTranslation();
  return (
    <>
      <StatusBar backgroundColor={'#263d2d'} barStyle="light-content" />

      <Stack.Navigator
        screenOptions={({ route, navigation }) => ({
          headerShown:
            navigation.getState().routes[navigation.getState().index].name ==
              'ProductDetails' ||
              // navigation.getState().routes[navigation.getState().index].name ==
              //   'OrderList' ||
              navigation.getState().routes[navigation.getState().index].name ==
              'ProductList'
              ? // navigation.getState().routes[navigation.getState().index].name ==
              // 'SubjectsDetails'
              false
              : true,
          headerStyle: {
            backgroundColor: Colors.secondary,
          },
          headerTintColor: '#263d2d',
          headerTitleStyle: {
            fontWeight: '700',
            marginLeft: -20,
            fontFamily: 'Yaldevi-Regular',
          },
        })}
        // initialRouteName={ROUTES.MYSTORE}
        initialRouteName={ROUTES.PRODUCT_LIST}>
        {/* <Stack.Screen
          name={ROUTES.MYSTORE}
          component={MyStore}
          options={({route, navigation}) => ({
            title: trans('My Store'),
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
          name={ROUTES.PRODUCT_LIST}
          component={ProductList}
          options={({ navigation }) => ({
            title: trans('Product List'),
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                // backgroundColor={Colors.secondary}
                color={'#263d2d'}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />

        <Stack.Screen
          name={ROUTES.PRODUCTDETAILS}
          component={ProductDetails}
          options={({ navigation }) => ({
            // title: trans('Answersheet'),
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.secondary}
                color={'#263d2d'}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name={ROUTES.MYCART}
          component={MyCart}
          options={({ navigation }) => ({
            title: trans('Cart'),
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.secondary}
                color={'#263d2d'}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />

        <Stack.Screen
          name={ROUTES.ADDRESSSCREEN}
          component={AddressScreen}
          options={({ route, navigation }) => ({
            // title: 'Address',
            title: route.params.isEdit == true ? 'Edit Address' : 'Add Address',
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.secondary}
                color={'#263d2d'}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />

        <Stack.Screen
          name={ROUTES.THANKS}
          component={Thanks}
          options={({ route, navigation }) => ({
            title: 'Order Success',
            // title: route.params.isEdit == true ? 'Edit Address' : 'Add Address',
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.secondary}
                color={'#263d2d'}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name={ROUTES.ORDERLIST}
          component={OrderList}
          options={({ route, navigation }) => ({
            title: 'All Orders',
            // title: route.params.isEdit == true ? 'Edit Address' : 'Add Address',
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.secondary}
                color={'#263d2d'}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name={ROUTES.ORDERDETAILS}
          component={OrderDetails}
          options={({ route, navigation }) => ({
            title: 'Order Details',
            // title: route.params.isEdit == true ? 'Edit Address' : 'Add Address',
            headerLeft: () => (
              <MaterialIcons.Button
                name="keyboard-arrow-left"
                size={30}
                backgroundColor={Colors.secondary}
                color={'#263d2d'}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />

      </Stack.Navigator>
    </>
  );
};

export default StoreTabNavigator;
