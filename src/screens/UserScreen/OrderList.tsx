import React, { useState, useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ToastAndroid,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import i18n from 'i18next';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Colors from '../../../assets/Colors';
import { device_height, device_width } from '../style';
import CommonMessage from '../../../constants/CommonMessage';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import {
//   childLoginOTPVerification,
//   getAllProductAPI,
//   getCartItemAPI,
//   getChildAllOrdersAPI,
//   getOrderDetailsAPI,
//   getProductByCategoryAPI,
//   getUserAllAddressAPI,
// } from '../../redux/actions/Action';
// import {GET_CART_ITEM} from '../../redux/actions/actiontypes';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { selectStudentInfo } from '../../redux/reducers/StudentInfoReducer';
import { useAppSelector } from '../../redux/store/reducerHook';
import { getUserAllAddressAPI, selectAllAddressInfo } from '../../redux/reducers/GetAllAddressReducer';
import { getCartItemAPI, selectCartItemInfo } from '../../redux/reducers/GetCartItemReducer';
import { getChildAllOrdersAPI, selectAllOrders, selectAllOrdersInfo, selectAllOrdersStatus } from '../../redux/reducers/GetAllOrdersReducer';
import { getOrderDetailsAPI } from '../../redux/reducers/GetOrderDetailsReducer';
import LoadingScreen from '../CommonScreens/LoadingScreen';
const { t: trans } = i18n;

const OrderList = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // dispatch(getProductByCategoryAPI(undefined, CategoryID, undefined));
    dispatch(getChildAllOrdersAPI(childid));
    return () => { };
  }, []);

  // const {AllAddress = []} = useSelector(state => state.GetAllAddressReducer);
  const AllAddress = useAppSelector(selectAllAddressInfo);
  // console.log(AllAddress, 'AllAddress.............');

  const AllOrders = useAppSelector(selectAllOrdersInfo)
  const orderLoding = useAppSelector(selectAllOrdersStatus)
  // console.log(AllOrders, 'AllOrders.............');

  // const {CartItem = []} = useSelector(state => state.GetCartItemReducer);
  const CartItem = useAppSelector(selectCartItemInfo);
  // console.log(CartItem, 'CartItem.............');

  const childInfo = useAppSelector(selectStudentInfo) as ChildInfo;
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
    stageid = '',
    childid = '',
    boardid = '',
    stage = '',
    scholarship = [],
    name: userName = '',
    fname = '',
    gender = '',
    lname = '',
    email = '',
    phone = '',
    // cityname = '',
    image = '',
    age = '',
    address = '',
    // cityid = '',
    language = '',
    // coordinates='',
  } = childInfo;

  // console.log(childInfo, "====================childinfo");
  useEffect(() => {
    navigation.addListener('focus', () => {
      dispatch(getUserAllAddressAPI(childid));
      dispatch(getCartItemAPI(childid));
    });
    return () => { };
  }, [CartItem]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
      {orderLoding == 'loading' ? <LoadingScreen flag={orderLoding == 'loading'} />
        : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                // flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.secondary,
              }}>
              <View
                style={{
                  // flex: 1,
                  // flexDirection: 'row',
                  // border
                  // borderWidth:1,
                  // height: device_height * 0.98,
                  alignItems: 'center',
                  // flexWrap: 'wrap',
                  // justifyContent: 'center',
                }}>
                {AllOrders.length > 0 ? (
                  AllOrders.map((item, index) => {
                    const {
                      _id = '',
                      amoutpaid = '',
                      childid = '',
                      orderadress = [],
                      orderid = '',
                      paymentid = '',
                      productDetails = [],
                      updatedon = '',
                      createon = '',
                      status = '',
                      orderquantity = '',
                      image = '',
                    } = item;
                    console.log(item, 'AllOrders_item..................');
                    const { productname = '' } = productDetails[0];
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{
                          width: device_width * 0.95,
                          marginHorizontal: 10,
                          marginVertical: 5,
                          borderWidth: 2,
                          borderColor:
                            status === 'inProgress' || status === 'Pending'
                              ? 'orange'
                              : status === 'cancelled'
                                ? 'crimson'
                                : status === 'shipped'
                                  ? '#999'
                                  : status === 'inTransit'
                                    ? 'lavender'
                                    : status === 'outForDelivery'
                                      ? 'lightgreen'
                                      : 'green',
                          borderRadius: 10,
                          elevation: 10,
                          backgroundColor: '#fff',
                          alignItems: 'center',
                          paddingTop: 5,
                          // paddingHorizontal: 5,
                          // flexDirection: 'row',
                          // justifyContent: 'space-around',
                        }}
                        onPress={() => {
                          dispatch(
                            getOrderDetailsAPI(orderid),
                          );
                          navigation.navigate('OrderDetails', { orderid: orderid });
                        }}>
                        <View
                          style={{
                            alignItems: 'center',
                            paddingVertical: 5,
                            paddingHorizontal: 5,
                            flexDirection: 'row',
                            // justifyContent: 'space-around',
                            // borderWidth:1,
                            width: device_width * 0.9,
                          }}>
                          <View
                            style={{
                              borderColor: Colors.lightgrey,
                              borderWidth: 1.5,
                              elevation: 5,
                              backgroundColor: '#fff',
                              // borderRadius: 10,
                            }}>
                            <Image
                              style={{
                                width: 75,
                                height: 75,
                                resizeMode: 'cover',
                                alignSelf: 'center',
                              }}
                              source={require('../../../assets/shopping-bag.jpg')}
                            />
                          </View>
                          <View
                            style={{
                              justifyContent: 'flex-start',
                              // backgroundColor: Colors.white,
                              width: device_width * 0.66,
                              //   borderWidth: 1,
                              paddingHorizontal: 15,
                            }}>
                            <Text
                              style={{
                                fontWeight: '800',
                                color: '#333',
                                fontSize: 14,
                              }}>
                              {productname}
                            </Text>
                            <Text
                              style={{
                                fontWeight: '600',
                                color: '#666',
                                fontSize: 12,
                              }}>
                              {/* Order Id : {orderid} */}
                              Ordered On : {moment(createon).format('Do MMM YYYY')}
                            </Text>
                            <Text
                              style={{
                                fontWeight: '800',
                                color: '#333',
                                fontSize: 14,
                              }}>
                              Items Ordered : {orderquantity}
                            </Text>
                            <Text
                              style={{
                                fontWeight: '800',
                                color: Colors.primary,
                                marginTop: 10,
                                fontSize: 16,
                              }}>
                              Total Amount : ₹ {amoutpaid}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            height: 35,
                            borderBottomLeftRadius: 7,
                            borderBottomRightRadius: 7,
                            marginHorizontal: -5,
                            backgroundColor:
                              status === 'inProgress' || status === 'Pending'
                                ? 'orange'
                                : status === 'cancelled'
                                  ? 'crimson'
                                  : status === 'shipped'
                                    ? '#999'
                                    : status === 'inTransit'
                                      ? 'lavender'
                                      : status === 'outForDelivery'
                                        ? 'lightgreen'
                                        : 'green',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: 'bold',
                              color:
                                status === 'inProgress' || status === 'Pending'
                                  ? '#333'
                                  : status === 'cancelled'
                                    ? '#fff'
                                    : status === 'shipped'
                                      ? '#333'
                                      : status === 'inTransit'
                                        ? '#333'
                                        : status === 'outForDelivery'
                                          ? '#333'
                                          : '#fff',
                              textTransform: 'uppercase',
                            }}>
                            {status === 'inProgress'
                              ? 'Order In Progress'
                              : status === 'Pending' ?
                                'Order Pending'
                                : status === 'cancelled'
                                  ? 'Order Cancelled'
                                  : status === 'shipped'
                                    ? 'Order Shipped'
                                    : status === 'In Transit'
                                      ? 'Order InTransit'
                                      : status === 'outForDelivery'
                                        ? 'Out For Delivery'
                                        : 'Order Delivered'}
                            {/* {status === 'Pending'
                          ? 'Order Pending'
                          : 'Order Delivered'} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      //   justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: 'burlywood',
                        paddingVertical: 15,
                        paddingHorizontal: 15,
                        marginVertical: 10,
                        marginHorizontal: 15,
                        // borderRadius: 7,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                      }}>
                      <AntDesign
                        style={{
                          marginHorizontal: 10,
                          borderWidth: 0,
                        }}
                        name={'infocirlce'}
                        size={30}
                        color={'green'}
                      />
                      <Text
                        style={{
                          color: '#333',
                          fontWeight: '700',
                          fontSize: 15,
                          textAlign: 'center',
                          // borderWidth: 1,
                          // borderLeftWidth:1,
                          width: '85%',
                        }}>
                        {trans('Currently No Content Added')}
                      </Text>
                    </View>
                    <View
                      style={{
                        // borderWidth:1,
                        // flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: device_height * 0.8,
                        width: device_width * 0.9,
                      }}>
                      <FastImage
                        style={{
                          height: 300,
                          width: '100%',
                          // position: 'absolute',
                          //left: 10,
                        }}
                        source={require('../../../assets/norecordfound.png')}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        )}
    </SafeAreaView>
  );
};

export default OrderList;
