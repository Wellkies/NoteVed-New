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
//   getOrderDetailsAPI,
//   getProductByCategoryAPI,
//   getUserAllAddressAPI,
// } from '../../redux/actions/Action';
// import {GET_CART_ITEM} from '../../redux/actions/actiontypes';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { useAppSelector } from '../../redux/store/reducerHook';
import { selectStudentInfo } from '../../redux/reducers/StudentInfoReducer';
import { useNavigation } from '@react-navigation/native';
import { getOrderDetailsAPI, selectOrderInfo, selectOrderInfoStatus } from '../../redux/reducers/GetOrderDetailsReducer';
import LoadingScreen from '../CommonScreens/LoadingScreen';
const { t: trans } = i18n;

const OrderDetails = ({ route }) => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation()
  const { orderid = '' } = route.params;

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(getOrderDetailsAPI(orderid));
    // dispatch(getProductByCategoryAPI(undefined, CategoryID, undefined));
    // dispatch(getAllProductAPI(undefined, setLoading));
    return () => { };
  }, []);
  // const {OrderDetails = []} = useSelector(
  //   state => state.GetOrderDetailsReducer,
  // );
  const OrderDetails = useAppSelector(selectOrderInfo)
  const orderLoading = useAppSelector(selectOrderInfoStatus)
  //   console.log(
  //     OrderDetails,
  //     'OrderDetails................',
  //     OrderDetails.length,
  //   );

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
      dispatch(getOrderDetailsAPI(orderid));

      //   dispatch(getUserAllAddressAPI(undefined, setLoading));
      //   dispatch(getCartItemAPI(undefined, childid, undefined));
    });
    return () => { };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.secondary }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {orderLoading == 'loading' ? <LoadingScreen flag={orderLoading == 'loading'} /> :
          <View
            style={{
              flex: 1,
              // justifyContent: 'center',
              // alignItems: 'center',
              backgroundColor: Colors.secondary,
            }}>
            <View
              style={{
                borderWidth: 2,
                borderColor: Colors.primary,
                Width: device_width * 0.7,
                //   paddingHorizontal:15,
                borderRadius: 10,
                elevation: 10,
                backgroundColor: 'lavender',
                marginHorizontal: 10,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  marginLeft: 20,
                  fontSize: 20,
                  fontWeight: '900',
                  color: '#333',
                  marginVertical: 7,
                }}>
                Delivery Address
              </Text>
              {OrderDetails.length > 0 ? (
                OrderDetails.map((item, index) => {
                  const {
                    image = '',

                    _id = '',
                    amoutpaid = '',
                    childid = '',
                    createon = '',
                    orderadress = [],
                    orderid = '',
                    paymentid = '',
                    productDetails = [],
                    status = '',
                    updatedon = '',
                  } = item;

                  const {
                    alphone = '',
                    area = '',
                    country = '',
                    disrict = '',
                    estate = '',
                    houseNo = '',
                    name = '',
                    phone = '',
                    pincode = '',
                    street = '',
                    userid = '',
                  } = orderadress[0];
                  return (
                    <View
                      key={index}
                      style={{
                        borderTopWidth: 1,
                        borderColor: '#999',
                        borderBottomRightRadius: 10,
                        borderBottomLeftRadius: 10,
                        paddingVertical: 5,
                        paddingHorizontal: 20,
                        backgroundColor: '#fff',
                        //   width: '100%',
                      }}>
                      <Text
                        style={{
                          fontWeight: '600',
                          fontSize: 14,
                          color: '#333',
                        }}>
                        {name}
                      </Text>
                      <Text
                        style={{
                          fontWeight: '600',
                          fontSize: 14,
                          color: '#333',
                        }}>
                        {phone}, {alphone}
                      </Text>
                      <Text
                        style={{
                          fontWeight: '600',
                          fontSize: 14,
                          color: '#333',
                        }}>
                        {houseNo}, {area}, {street}, {disrict}
                      </Text>
                      <Text
                        style={{
                          fontWeight: '600',
                          fontSize: 14,
                          color: '#333',
                        }}>
                        {estate}, {country}
                        {' - '}
                        {pincode}
                      </Text>
                    </View>
                  );
                })
              ) : (
                <></>
              )}
            </View>

            <View
              style={{
                //   flex: 1,
                // flexDirection: 'row',
                // border
                //   borderWidth: 1,
                minheight: device_height * 0.2,
                alignItems: 'center',
                // flexWrap: 'wrap',
                // justifyContent: 'center',
              }}>
              {OrderDetails.length > 0 ? (
                OrderDetails.map((item, index) => {
                  const {
                    _id = '',
                    amoutpaid = '',
                    childid = '',
                    orderadress = [],
                    orderid = '',
                    orderquantity = '',
                    paymentid = '',
                    productDetails = [],
                    status = '',
                    updatedon = '',
                    createon = '',
                  } = item;

                  {/* console.log(item, 'item..................', productDetails); */ }

                  const {
                    productname = '',
                    image = '',
                  } = productDetails[0];

                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        width: device_width,
                        marginHorizontal: 10,
                        marginVertical: 5,
                        borderWidth: 2,
                        borderColor: '#def',
                        //   borderRadius: 10,
                        //   elevation: 10,
                        backgroundColor: '#ddd',
                        alignItems: 'center',
                        paddingTop: 5,
                        paddingBottom: 2,
                        // paddingHorizontal: 5,
                        // flexDirection: 'row',
                        // justifyContent: 'space-around',
                      }}
                      onPress={() => { }}>
                      <View
                        style={{
                          // alignItems: 'center',
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
                            justifyContent: 'center',
                            // borderRadius: 10,
                          }}>
                          {image != '' ? (
                            <Image
                              style={{
                                width: 85,
                                height: 75,
                                resizeMode: 'cover',
                                alignSelf: 'center',
                              }}
                              source={{ uri: image[0] }}
                            />
                          ) : (
                            <Image
                              style={{
                                width: 85,
                                height: 75,
                                resizeMode: 'cover',
                                alignSelf: 'center',
                              }}
                              source={require('../../../assets/shopping-bag.jpg')}
                            />
                          )}
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
                              color: Colors.primary,
                              marginTop: 10,
                              fontSize: 16,
                            }}>
                            {productname}
                          </Text>
                          <Text
                            style={{
                              fontWeight: '800',
                              color: '#333',
                              fontSize: 14,
                            }}>
                            Ordered On : {moment(createon).format('Do MMM YYYY')}
                          </Text>
                          <Text
                            style={{
                              fontWeight: '600',
                              color: '#666',
                              fontSize: 12,
                            }}>
                            Order Id : {orderid}
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
                          width: '100%',
                          backgroundColor: '#fff',
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingVertical: 10,
                        }}>
                        <Text
                          style={{
                            fontWeight: '900',
                            color:
                              status === 'inProgress'
                                ? 'orange'
                                : status === 'outForDelivery'
                                  ? 'green'
                                  : status === 'delivered'
                                    ? 'green'
                                    : '#333',
                            // marginTop: 10,
                            fontSize: 18,
                            textTransform: 'uppercase',
                          }}>
                          {status}
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
                      height: device_height * 0.6,
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

            {/* <View
            style={{
              borderWidth: 0,
              elevation: 10,
              backgroundColor: Colors.secondary,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                marginLeft: 20,
                fontSize: 20,
                fontWeight: '900',
                color: '#333',
                marginVertical: 7,
              }}>
              Product Details
            </Text>
            {OrderDetails.map((item, index) => {
              const {products = [], status = '', updatedon = ''} = item;
              return (
                <View key={index}>
                  {products.map((rec, index) => {
                    const {
                      image = '',
                      productname = '',
                      quantity = '1',
                      productPrice = '',
                    } = rec;
                   
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{
                          width: device_width * 0.99,
                          //   marginHorizontal: 10,
                          //   marginVertical: 5,
                          borderBottomWidth: 1,
                          borderColor: '#ccc',
                          //   borderRadius: 10,
                          //   elevation: 10,
                          backgroundColor: '#fff',
                          alignItems: 'center',
                          paddingVertical: 5,
                          paddingHorizontal: 5,
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                        }}
                        onPress={() => {}}>
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
                            {image != '' ? (
                              <Image
                                style={{
                                  width: 75,
                                  height: 75,
                                  resizeMode: 'cover',
                                  alignSelf: 'center',
                                }}
                                source={{uri: image[0]}}
                              />
                            ) : (
                              <Image
                                style={{
                                  width: 75,
                                  height: 75,
                                  resizeMode: 'cover',
                                  alignSelf: 'center',
                                }}
                                source={{
                                  uri: 'https://img.freepik.com/free-photo/notebook_74190-2720.jpg?w=996&t=st=1698310498~exp=1698311098~hmac=f14f63dd7e2b1e9e0816ffb27ad12f53c94bf9c3de46b08e93d6d1927d54bc62',
                                }}
                              />
                            )}
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
                                color: '#333',
                                fontSize: 12,
                              }}>
                              Quantity : {quantity}
                            </Text>

                            <Text
                              style={{
                                fontWeight: '800',
                                color: Colors.primary,
                                marginTop: 10,
                                fontSize: 16,
                              }}>
                              Price : ₹ {productPrice}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}
          </View> */}
          </View>}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetails;
