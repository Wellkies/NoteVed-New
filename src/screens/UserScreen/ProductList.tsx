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
  BackHandler,
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
//   getProductByCategoryAPI,
//   getProductByIdAPI,
//   getUserAllAddressAPI,
// } from '../../redux/actions/Action';
// import {GET_CART_ITEM} from '../../redux/actions/actiontypes';
// import Header from './CommonScreens/Header';
import FastImage from 'react-native-fast-image';
import LoadingScreen from '../CommonScreens/LoadingScreen';
import { useNavigation } from '@react-navigation/native';
import { selectStudentInfo } from '../../redux/reducers/StudentInfoReducer';
import { useAppSelector } from '../../redux/store/reducerHook';
import { getAllProductAPI, selectAllProduct, selectAllProductStatus } from '../../redux/reducers/GetAllProductReducer';
import { getUserAllAddressAPI, selectAllAddressInfo } from '../../redux/reducers/GetAllAddressReducer';
import { getCartItemAPI, selectCartItemInfo } from '../../redux/reducers/GetCartItemReducer';
import { getProductByIdAPI } from '../../redux/reducers/GetProductDetailsReducer';
import { getChildAllOrdersAPI } from '../../redux/reducers/GetAllOrdersReducer';
const { t: trans } = i18n;

const ProductList = () => {
  // const [loading, setLoading] = useState(false);
  const navigation = useNavigation()
  // const {CategoryID = ''} = route.params;
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(getAllProductAPI());
    return () => { };
  }, []);
  // const {ProductByCategory = []} = useSelector(
  //   state => state.GetProductByCategoryReducer,
  // );
  // console.log(ProductByCategory, 'ProductByCategory................');

  // const {AllProduct = []} = useSelector(state => state.GetAllProductReducer);
  const AllProduct = useAppSelector(selectAllProduct);
  const ProductLoading = useAppSelector(selectAllProductStatus)
 // console.log(AllProduct, 'AllProduct.............');

  // const {AllAddress = []} = useSelector(state => state.GetAllAddressReducer);
  const AllAddress = useAppSelector(selectAllAddressInfo);
  // console.log(AllAddress, 'AllAddress.............');
  // const {CartItem = []} = useSelector(state => state.GetCartItemReducer);
  const CartItem = useAppSelector(selectCartItemInfo);
  // console.log(CartItem, 'CartItemlength.............');

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

  useEffect(() => {
    navigation.addListener('focus', () => {
      dispatch(getUserAllAddressAPI(childid));
      dispatch(getCartItemAPI(childid));
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.navigate('UserHome');
        return true;
      });
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        navigation.navigate('UserHome');
        return true;
      });
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
      {ProductLoading == 'loading' ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: device_height * 0.9,
            width: device_width,
            backgroundColor: Colors.secondary,
          }}>
          <LoadingScreen flag={ProductLoading == 'loading'} />
        </View>
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: Colors.secondary,
              // borderWidth:1,
              justifyContent: 'space-between',
              paddingBottom: 5,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ paddingLeft: 10, borderWidth: 0 }}>
                <MaterialIcons.Button
                  name="keyboard-arrow-left"
                  size={30}
                  backgroundColor={Colors.secondary}
                  color={'#263d2d'}
                  onPress={() => navigation.goBack()}
                />
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: 20,
                  color: '#263d2d',
                  marginLeft: 10,
                  textTransform: 'capitalize',
                  fontWeight: '700',
                }}>
                {'Product List'}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                dispatch(getUserAllAddressAPI(childid));
                navigation.navigate('MyCart', { AllAddress: AllAddress });
              }}
              style={{
                right: 15,
                flexDirection: 'row',
              }}>
              <FontAwesome
                name="shopping-cart"
                size={25}
                style={{
                  alignItems: 'center',
                  color: '#263d2d',
                }}
              />

              <View
                style={{
                  backgroundColor: 'crimson',
                  height: 18,
                  width: 17,
                  borderWidth: 1,
                  borderColor: 'crimson',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: -8,
                  right: -10,
                  borderRadius: 15,
                  alignContent: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    alignItems: 'center',
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: '700',
                  }}>
                  {CartItem.length}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.secondary,
              }}>
              <View
                style={{
                  flex: 1,
                  // flexDirection: 'row',
                  // borderWidth:1,
                  height: device_height * 0.9,
                  alignItems: 'center',
                  // flexWrap: 'wrap',
                  // justifyContent: 'center',
                }}>
                {AllProduct.length > 0 ? (
                  <>
                    {AllProduct.map((res, index) => {
                      const {
                        _id: id = '',
                        productname = '',
                        image = '',
                        productPrice = '',
                        productDetails = '',
                        isAvailable = '',
                        categoryName = '',
                        categoryid = '',
                        productType = '',
                        productid = '',
                        quantity = '',
                        stockAvailability = '',
                      } = res;
                      {/* console.log(res,"res..................") */ }
                      return (
                        <TouchableOpacity
                          key={index}
                          style={{
                            width: device_width * 0.95,
                            marginHorizontal: 10,
                            marginVertical: 5,
                            borderWidth: 1,
                            borderColor: '#def',
                            borderRadius: 10,
                            elevation: 10,
                            backgroundColor: '#fff',
                            alignItems: 'center',
                            paddingVertical: 5,
                            paddingHorizontal: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                          }}
                          // onPress={() => CommonMessage('We will update shortly !')}
                          onPress={() => {
                            // dispatch({
                            //   type: GET_CART_ITEM,
                            //   payload: [],
                            // });
                            dispatch(
                              getProductByIdAPI(id),
                            );
                            navigation.navigate('ProductDetails', {
                              productPrice: productPrice,
                              productname: productname,
                              image: image,
                              productDetails: productDetails,
                              id: id,
                              isAvailable: isAvailable,
                              categoryName: categoryName,
                              categoryid: categoryid,
                              productType: productType,
                              productid: productid,
                              quantity: quantity,
                              stockAvailability: stockAvailability,
                            });
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
                              {image != '' ? (
                                <Image
                                  style={{
                                    width: 75,
                                    height: 75,
                                    resizeMode: 'cover',
                                    alignSelf: 'center',
                                  }}
                                  source={{ uri: image[0] }}
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
                                width: device_width * 0.5,
                                // borderWidth: 1,
                                paddingHorizontal: 15,
                              }}>
                              <Text
                                style={{
                                  fontWeight: '600',
                                  color: '#333',
                                  fontSize: 14,
                                }}>
                                {productname}
                              </Text>
                              <Text
                                style={{
                                  fontWeight: '600',
                                  color: '#aaa',
                                  fontSize: 12,
                                }}>
                                {'NoteVed Publication'}
                              </Text>
                              <Text
                                style={{
                                  fontWeight: '800',
                                  color: '#263d2d',
                                  marginTop: 15,
                                  fontSize: 16,
                                }}>
                                ₹ {productPrice}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(getChildAllOrdersAPI(childid));
                        navigation.navigate('OrderList');
                      }}
                      style={{
                        // borderWidth: 1,
                        // right: 25,
                        position: 'absolute',
                        flexDirection: 'row',
                        backgroundColor: '#263d2d',
                        height: 48,
                        width: '50%',
                        right: 10,
                        bottom: 80,
                        borderRadius: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          // borderWidth: 1,
                          borderColor: '#263d2d',
                          // position: 'absolute',
                          // top: -8,
                          alignContent: 'center',
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            alignItems: 'center',
                            color: '#fff',
                            fontSize: 15,
                            fontWeight: '600',
                          }}>
                          {'Your Orders'}
                        </Text>
                      </View>
                      <View>
                        <Fontisto
                          style={{
                            marginHorizontal: 10,
                            borderRadius: 25,
                            borderWidth: 0,
                          }}
                          name={'shopping-bag-1'}
                          size={30}
                          color={'#fff'}
                          backgroundColor={'#263d2d'}
                        />
                      </View>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
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
                        color={'#263d2d'}
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
                        source={require('../../../assets/Out-of-Stock.jpg')}
                        resizeMode="contain"
                      />
                    </View>
                  </>
                )}
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default ProductList;
