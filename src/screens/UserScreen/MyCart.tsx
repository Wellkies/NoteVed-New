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
  StatusBar,
  Pressable,
  TextInput,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import i18n from 'i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../../assets/Colors';
import { device_height, device_width } from '../style';
import CommonMessage from '../../../constants/CommonMessage';
// import {
//   AddManyProductChildOrderAPI,
//   AddProductChildOrderAPI,
//   UpdateUserAddressAPI,
//   couponDiscountForProductAPI,
//   craeteScholarshipMembershipApi,
//   createAddToCartApi,
//   createUserAddressAPI,
//   deleteAllCartItemAPI,
//   getAddressByIdAPI,
//   getCartItemAPI,
//   getProductByCategoryAPI,
//   getProductByIdAPI,
//   getSignatureVerification,
//   getUserAllAddressAPI,
//   removeAddressAPI,
//   removeCartItemApi,
//   updateCartUrl,
// } from '../../redux/actions/Action';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';
import { API_URL } from '../../../constants/ApiPaths';
import { Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../redux/store/reducerHook';
import { selectStudentInfo } from '../../redux/reducers/StudentInfoReducer';
import { getCartItemAPI, selectCartItemInfo, selectCartItemStatus } from '../../redux/reducers/GetCartItemReducer';
import { getUserAllAddressAPI, selectAllAddressInfo, selectAllAddressStatus } from '../../redux/reducers/GetAllAddressReducer';
import { AddManyProductChildOrderAPI, couponDiscountForProductAPI, createAddToCartApi, deleteAllCartItemAPI, removeCartItemApi, updateCartUrl } from '../../redux/actions/MyStoreAPI';
import { getAddressByIdAPI } from '../../redux/reducers/GetAddressByIdReducer';
import { getSignatureVerification } from '../../redux/actions/ScholarshipPremiumAPI';
import LoadingScreen from '../CommonScreens/LoadingScreen';
const { t: trans } = i18n;

const MyCart = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch<any>();
  const [cartItem, setCartItem] = useState();
  const [count, setCount] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [priceLoading, setPriceLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [totalAmount, setTotalAmount] = useState('');
  const [addressID, setAddressID] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [paymentID, setpaymentID] = useState('');
  const [prodQuantity, setProdQuantity] = useState(0);
  const [prodId, setProdId] = useState('');

  const [cartCount, setCartCount] = useState(true);

  console.log(
    cartCount,
    '==============cartCount',
    //   addressID,
    //   '=============addressID',
    //   isEdit,
    //   paymentID,
    //   '===========paymentID',
  );
  const [info, setInfo] = useState({
    st_name: fname + ' ' + lname,
    st_phone: phone,
    // st_address: '',
    st_pincode: '',
    st_altPhone: '',
    st_HouseNo: '',
    st_street: '',
    st_area: '',
    st_disrict: '',
    st_estate: 'Odisha',
    st_country: 'India',
  });

  const {
    st_name,
    st_phone,
    st_pincode,
    // st_address,
    st_altPhone,
    st_HouseNo,
    st_street,
    st_area,
    st_disrict,
    st_estate,
    st_country,
  } = info;

  // console.log(info, '=============info');

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
    name = fname + " " + lname,
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
    if (Object.keys(childInfo).length != 0) {
      setInfo({
        // st_address: '',
        st_name: fname + ' ' + lname,
        st_phone: phone,
        st_pincode: info.st_pincode,
        st_altPhone: info.st_altPhone,
        st_HouseNo: info.st_HouseNo,
        st_street: info.st_street,
        st_area: info.st_area,
        st_disrict: info.st_disrict,
        st_estate: 'Odisha',
        st_country: 'India',
      });
    }
  }, [childInfo]);

  // const {AllAddress = []} = useSelector(state => state.GetAllAddressReducer);
  const AllAddress = useAppSelector(selectAllAddressInfo);
  const loading = useAppSelector(selectAllAddressStatus)
  // console.log(AllAddress, 'AllAddress.............');

  // const {CartItem = []} = useSelector(state => state.GetCartItemReducer);
  const CartItem = useAppSelector(selectCartItemInfo);
  const cartLoading = useAppSelector(selectCartItemStatus)
  // console.log(CartItem, 'CartItem.............');
  const fjgfg = AllAddress.length < 1 && !priceLoading ? false : true
  // console.log(AllAddress, priceLoading, 'AllAddress////////////////////', fjgfg);


  let allProductIds = CartItem.map(rec => rec.productid);
  // console.log(allProductIds, 'allProductIds/////////-----------///////////');
  // let allProductTotalPrice = CartItem.map(rec => rec.productid);
  let allProducts = CartItem.map((rec, index) => {
    const { productid = '', noOfitems = '' } = rec;
    return { productid: productid, quantity: noOfitems };
  });
  // console.log(allProducts, '===========allProducts');

  const discountBodyData = {
    productDetails: allProducts,
    couponcodeid: '',
  };

  useEffect(() => {
    dispatch(getCartItemAPI(childid));
    // dispatch(couponDiscountForProductAPI(discountBodyData, handleCallback));
    // return () => {};
  }, []);

  useEffect(() => {
    // console.log(
    //   discountBodyData,
    //   'useEffect_discountBodyData..............',
    //   cartCount,
    // );
    couponDiscountForProductAPI(
      discountBodyData,
      handleCallback,
      // setPriceLoading,
    );
    // setModalStatus(false);
    navigation.addListener('focus', () => {
      dispatch(getUserAllAddressAPI(childid));
      BackHandler.addEventListener('hardwareBackPress', () =>
        navigation.goBack(),
      );
    });

    return () => {
      // dispatch(couponDiscountForProductAPI(discountBodyData, handleCallback));
      // dispatch(getUserAllAddressAPI(undefined, setLoading));
      BackHandler.removeEventListener('hardwareBackPress', () =>
        navigation.goBack(),
      );
    };
  }, [CartItem, cartCount]);

  const handleCallback = (
    discountedPrice: string,
    message: string,
    totalPrice: string) => {
    setTotalAmount(totalPrice);
    // console.log(totalAmount, "==============totalAmount",
    //   totalPrice, "==========totalPrice", message, discountedPrice);
  };

  useEffect(() => {
    if (CartItem.length < 0) {
      navigation.navigate('MyStore');
    }
  }, [CartItem]);

  const handleUpdateAddress = (
    addressId,
    name,
    phone,
    alphone,
    houseNo,
    area,
    street,
    disrict,
    estate,
    country,
    pincode,
  ) => {
    // setInfo({...rec});
    // setAddressID(addressId);
    // setAddressModal(true);
    // setIsEdit(true)
    dispatch(getAddressByIdAPI(addressId));
    navigation.navigate('AddressScreen', {
      addressID: addressId,
      isEdit: true,
      name: name,
      phone: phone,
      alphone: alphone,
      houseNo: houseNo,
      area: area,
      street: street,
      disrict: disrict,
      estate: estate,
      country: country,
      pincode: pincode,
    });
  };

  const handleAddtoCart = (count, productID, noOfitems) => {
    // setClicked(true)
    // setTimeout(() => setClicked(false), 5000);
    if (CartItem.length > 0) {
      // console.log('called0000000000');
      let matchproductID = CartItem.filter(r => r.productid == productID);
      // console.log(matchproductID, 'matchproductID...................');
      if (matchproductID.length > 0) {
        setCount(count + 1);
        setCartCount(prevState => !prevState);
        let getID = matchproductID.map(r => r._id);
        console.log(getID, 'getID...................');
        const updatecartBody = {
          id: getID[0],
          noOfitems: noOfitems + 1,
        };
        console.log(updatecartBody, 'updatecartBody..............');

        updateCartUrl(updatecartBody, () => callBack());
      } else {
        console.log('called22222222222');

        const cartBody = {
          userid: childid,
          productid: productID,
          productname: productname,
          productType: productType,
          productPrice: productPrice,
          quantity: quantity,
          categoryid: categoryid,
          categoryName: categoryName,
          image: ProductImage,
          productDetails: productDetails,
          isAvailable: isAvailable,
          stockAvailability: stockAvailability,
          noOfitems: '1',
        };
        console.log(cartBody, 'cartBody..............');
        createAddToCartApi(cartBody, () => callBack());
      }
    } else {
      const cartBody = {
        userid: childid,
        productid: productID,
        productname: productname,
        productType: productType,
        productPrice: productPrice,
        quantity: quantity,
        categoryid: categoryid,
        categoryName: categoryName,
        image: ProductImage,
        productDetails: productDetails,
        isAvailable: isAvailable,
        stockAvailability: stockAvailability,
        noOfitems: '1',
      };
      // console.log(cartBody, 'cartBody..............');
      createAddToCartApi(cartBody, () => callBack());
    }
  };

  const callBack = () => {
    // setCartItem(cartBody)
    // console.log('object called=========');
    dispatch(getCartItemAPI(childid));
    let allProducts = CartItem.map((rec, index) => {
      const { productid = '', noOfitems = '' } = rec;
      return { productid: productid, quantity: noOfitems };
    });
    // console.log(allProducts, '===========allProducts');

    const discountBodyData = {
      productDetails: allProducts,
      couponcodeid: '',
    };
    console.log(discountBodyData, 'discountBodyData..............');
    dispatch(couponDiscountForProductAPI(discountBodyData, handleCallback));
  };

  const handleRemove = (ID: string, productId: string, noOfitems: number) => {
    console.log(ID, "=============ID", productId, "====productId", noOfitems, "====noOfitems");
    // setClicked(true)
    // setTimeout(() => setClicked(false), 5000);
    setCartCount(prevState => !prevState);
    if (noOfitems > 1) {
      const updatecartBody = {
        id: ID,
        noOfitems: noOfitems - 1,
      };
      console.log(updatecartBody, "===============updatecartBody");
      updateCartUrl(updatecartBody, () => callBack());
    } else {
      removeCartItemApi(ID, () => callBack());
    }

    let allProducts = CartItem.map((rec, index) => {
      const { productid = '', noOfitems = '' } = rec;
      return { productid: productid, quantity: noOfitems };
    });
    // console.log(allProducts, '===========allProducts');

    // const discountBodyData = {
    //   productDetails: allProducts,
    //   couponcodeid: '',
    // };
    // console.log(
    //   discountBodyData,
    //   'handleRemove_discountBodyData..............',
    // );
    // dispatch(couponDiscountForProductAPI(discountBodyData, handleCallback));
  };

  const handlePurchase = async () => {
    console.log("handlePurchase called");
    // const totalAmount = isReferalCodeamount + '00';
    const initialAmount = totalAmount + '00';
    const data = await axios.post(API_URL + '/edsubscription', {
      // amount: isReferalCodeamount ? totalAmount : initialAmount,
      amount: initialAmount,
    }); // for live data

    // const data = await axios.get('https://wellkie.org/demoApi/edsubscription'); // for test data

    //
    //

    // var options = {
    //   description: 'WELLKIES PAYMENT',
    //   image: 'https://wkresources.s3.ap-south-1.amazonaws.com/WHPL.png',
    //   currency: 'INR',
    //   key: "rzp_test_PioX2Xi5hjQ6Om", //test api key
    //   // key: "rzp_live_dhcsVqGgxMqkbi",//live api key
    //   amount: doc_charge !== '' ? Math.round(doc_charge) * 100 : '10000',
    //   // amount: '1000',
    //   name: "Wellkies Healthcare Pvt Ltd.",
    //   prefill: {
    //     email: ee,
    //     contact: pp,
    //     name: '',
    //   },
    //   theme: {color: '#4372b8'},
    // };

    var options = {
      description: 'Product Payment',
      image: 'https://notevook.s3.ap-south-1.amazonaws.com/Noteved+logo.jpeg',
      // 'https://wkresources.s3.ap-south-1.amazonaws.com/1691151621228_65595701.png',
      // image: require('../../../assets/NOTEVOOK.jpeg'),
      currency: 'INR',
      key: 'rzp_test_PioX2Xi5hjQ6Om', //test api key
      // key: 'rzp_live_rBFsxA1CJU1sJU', //Live Api key

      amount: data.data.data.amount.toString(),
      // amount: '1000',
      name: 'NoteVed Academy',
      order_id: data.data.data.id,
      prefill: {
        name: name,
        email: email,
        contact: phone,
      },
      theme: { color: '#263d2d' },
    };

    // var options = {
    //   key: 'rzp_test_PioX2Xi5hjQ6Om', //test api key
    //   // key: "rzp_live_dhcsVqGgxMqkbi",//live api key
    //   // amount: "1000",

    //   amount: data.data.data.amount,
    //   currency: 'INR',
    //   name: 'Education APP',
    //   description: 'Subscription PAYMENT',
    //   image: 'https://wkresources.s3.ap-south-1.amazonaws.com/WHPL.png',
    //   order_id: data.data.data.id,
    //   // handler: async function (response) {
    //   //   if (response.razorpay_payment_id) {
    //   //     const data = {
    //   //       userid: parentid,
    //   //       amount:data.data.data.amount,
    //   //       razorpay_payment_id: response.razorpay_payment_id,

    //   //       razorpay_order_id: response.razorpay_order_id,
    //   //       razorpay_signature: response.razorpay_signature,
    //   //     };
    //   //

    //   //     //  const bodyData={
    //   //     //   :'',
    //   //     //   :amount,razorpay_order_id,razorpay_payment_id,razorpay_signature
    //   //     //  }
    //   //     dispatch(getSignatureVerification(bodyData, handleCallback()));
    //   //   } else {
    //   //     CommonMessage('Razorpay SDK fails to load. Are you online?');
    //   //   }
    //   // },
    //   // callback_url: '',
    //   prefill: {
    //     name: userName,
    //     email: email,
    //     contact: parentPhone,

    //   },
    //   notes: {
    //     address: 'Wellkies Healthcare Pvt Ltd.',
    //   },
    //   theme: {
    //     color: '#0756bb',
    //   },
    // };

    RazorpayCheckout.open(options)
      .then(response => {
        console.log(
          response,
          '---------response--------',
          response.razorpay_payment_id,
          '================response.razorpay_payment_id',
        );
        if (response.razorpay_payment_id) {
          const bodydata = {
            userid: childid,
            amount: data.data.data.amount.toString(),
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };
          //

          //  const bodyData={
          //   :'',
          //   :amount,razorpay_order_id,razorpay_payment_id,razorpay_signature
          //  }

          getSignatureVerification(bodydata, handleSuccessCallback);
        } else {
          CommonMessage('Razorpay SDK fails to load. Are you online?');
        }
        // handle success
        //alert(`Success: ${data.razorpay_payment_id}`);
        // setshowprog(true);

        // BookSlotApi(data.razorpay_payment_id);
        // setLoading(false);
      })
      .catch(error => {
        Alert.alert('Oops!', 'Could not complete payment.', [{ text: 'Retry' }]);
        // setLoading(false);
      });
  };

  const handleSuccessCallback = async (razorpay_payment_id: any) => {
    console.log(razorpay_payment_id, "====handleSuccessCallback========razorpay_payment_id");
    let d = new Date();
    let currTime =
      '' +
      d.getDate() +
      '' +
      d.getMonth() +
      1 +
      '' +
      d.getFullYear() +
      '' +
      d.getHours() +
      '' +
      d.getMinutes() +
      '' +
      d.getSeconds();

    let allProductOrder = CartItem.map((rec, index) => {
      const { productid = '', noOfitems = '', productPrice = '' } = rec;
      return {
        productid: productid,
        childid: childid,
        orderid: childid + productid + currTime,
        orderadress: AllAddress[0],
        amoutpaid: productPrice,
        paymentid: razorpay_payment_id,
        status: 'Pending',
        orderquantity: noOfitems,
      };
    });
    console.log(
      allProductOrder,
      '===========allProductOrder',
      currTime,
      '===========currTime',
    );

    const bodyData = allProductOrder;

    // childid: childid,
    // orderid: '',
    // orderadress: checkAddress,
    // products: CartItem,
    // amoutpaid: totalAmount,
    // paymentid: razorpay_payment_id,
    // status: '',

    console.log(bodyData, '................bodyData................');
    // dispatch(AddProductChildOrderAPI(bodyData, orderCallBack));
    dispatch(AddManyProductChildOrderAPI(bodyData, orderCallBack));
  };

  const orderCallBack = () => {
    console.log('------orderCallBack called');
    dispatch(deleteAllCartItemAPI(childid, ClearCartCallBack));
  };
  
  const ClearCartCallBack = () => {
    // CommonMessage('Cart Deleted !')
    console.log('Cart Deleted !!!!');
    navigation.navigate('Thanks');
  };

  // const [newArray, setNewArray] = useState(
  //   AllAddress !== '' && AllAddress != undefined ? AllAddress : {},
  // );
  // console.log(
  //   newArray,
  //   '==============newArray',
  //   AllAddress !== '',
  //   AllAddress != undefined,
  // );

  // const handleSelectedAddress = selectedaddressId => {
  //   let addressData = AllAddress.filter(rec => rec._id == selectedaddressId);

  //   let arrayData = newArray.map(rec => {
  //     if (rec._id === selectedaddressId) {
  //       // setSelectedAddress(true);
  //       return {...rec, selectedadress: true};
  //     } else {
  //       // setSelectedAddress(false);
  //       return {...rec, selectedadress: false};
  //     }
  //     return rec;
  //   });
  //   setNewArray(arrayData);
  //   console.log(
  //     // addressData,
  //     '===============addressData==&&&&&&&',
  //     // UpdatedAddress,
  //     '======UpdatedAddress=========',
  //     newArray,
  //   );
  // };

  // const checkAddress = newArray.find(
  //   ({selectedadress}) => selectedadress === true,
  // );

  // console.log(
  //   checkAddress,
  //   // checkAddress.length,
  //   // Object.keys(checkAddress).length != 0,
  //   // Object.keys(checkAddress).length,
  //   'checkAddress................',
  // );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.secondary }}>
      {cartLoading == 'loading' ? <LoadingScreen flag={cartLoading == 'loading'} />
        : (<>
          <ScrollView showsVerticalScrollIndicator={false} vertical={true}>
            {CartItem.length > 0 ? (
              <View style={{ backgroundColor: Colors.secondary, paddingTop: 0 }}>
                <View
                  style={{
                    flex: 1,
                    // flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 10,
                    marginHorizontal: 10,
                    backgroundColor: '#fff',
                    // flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}>
                  {CartItem.map((res, index) => {
                    const {
                      _id = '',
                      productPrice = '',
                      noOfitems = '',
                      image = '',
                      productDetails = '',
                      productname = '',
                      productid = '',
                      totalamounttobepaid = '',
                    } = res;
                    return (
                      <View
                        key={index}
                        style={{
                          width: '100%',
                          marginHorizontal: 10,
                          marginVertical: 7,
                          // borderWidth: 1,
                          // borderColor: Colors.primary,
                          // borderRadius: 10,
                          // elevation: 10,
                          backgroundColor: '#fff',
                          alignItems: 'flex-start',
                          // paddingVertical: 10,
                          paddingHorizontal: 10,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            alignItems: 'flex-start',
                            paddingVertical: 5,
                            paddingHorizontal: 5,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            // borderWidth:1,
                            width: device_width * 0.9,
                          }}>
                          <View
                            style={{
                              borderColor: '#263d2d',
                              borderWidth: 2,
                              backgroundColor: 'lightgrey',
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
                              // marginTop:10,
                              width: device_width * 0.65,
                              // borderWidth: 1,
                              paddingHorizontal: 15,
                            }}>
                            <Text
                              style={{
                                fontWeight: '700',
                                color: '#263d2d',
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
                              {productDetails}
                            </Text>
                            <Text
                              style={{
                                fontWeight: '800',
                                color: Colors.green,
                                fontSize: 18,
                              }}>
                              {productPrice}
                            </Text>
                            <View style={{}}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: '#000',
                                  fontWeight: '500',
                                }}>
                                {'Quantity -'}
                                {noOfitems}
                              </Text>
                            </View>
                            <View
                              style={{
                                // borderWidth:1,
                                alignSelf: 'flex-end',
                                width: '70%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <TouchableOpacity
                                style={{
                                  width: 70,
                                  height: 35,
                                  borderRadius: 10,
                                  borderWidth: 2,
                                  alignSelf: 'center',
                                  justifyContent: 'center',
                                  borderColor: 'green',
                                }}
                                onPress={() =>
                                  handleAddtoCart(count, productid, noOfitems)
                                }>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: 'green',
                                    fontWeight: '600',
                                    textAlign: 'center',
                                  }}>
                                  {'Add'}
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={{
                                  width: 70,
                                  height: 35,
                                  borderRadius: 10,
                                  borderWidth: 2,
                                  alignSelf: 'center',
                                  justifyContent: 'center',
                                  borderColor: 'red',
                                }}
                                onPress={() => handleRemove(_id, productid, noOfitems)}>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: 'red',
                                    fontWeight: '600',
                                    textAlign: 'center',
                                  }}>
                                  {'Remove'}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
                {/* <TouchableOpacity onPress={() => navigation.navigate('Thanks')}>
            <Text>click</Text>
          </TouchableOpacity> */}
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 10,
                    marginTop: 10,
                    marginHorizontal: 10,
                    borderColor: '#666',
                    backgroundColor: 'lavender',
                    paddingTop: 7,
                  }}>
                  {AllAddress != '' ? (
                    <View style={{ marginTop: 0, paddingTop: 5 }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            marginLeft: 20,
                            fontSize: 20,
                            fontWeight: '900',
                            color: '#333',
                            // textDecorationLine: 'underline',
                            // marginLeft: 10,
                          }}>
                          Delivery Address
                        </Text>
                        {/* <Pressable
                      onPress={() => {
                        // setAddressModal(true);
                        navigation.navigate('AddressScreen', {
                          isEdit: false,
                          addressID: '',
                        });
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // margin: 15,
                        marginHorizontal: 10,
                        // marginBottom: 15,
                        // marginTop: 8,
                        // borderWidth:1
                      }}>
                      <MaterialIcons
                        name="add-circle"
                        color={'green'}
                        size={17}
                      />

                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 13,
                          color: 'green',
                          marginLeft: 5,
                        }}>
                        Add New
                      </Text>
                    </Pressable> */}
                      </View>
                      {loading == 'loading' ? (
                        <View
                          style={{
                            paddingVertical: 20,
                            borderWidth: 1,
                            borderTopWidth: 2,
                            borderColor: '#666',
                          }}>
                          {/* <LoadingScreen flag={loading} /> */}
                          <ActivityIndicator
                            size="small"
                            color={'#263d2d'}
                            style={{
                              alignSelf: 'center',
                              justifyContent: 'center',
                            }}
                          />
                        </View>
                      ) : (
                        <>
                          {AllAddress.map((rec, index) => {
                            const {
                              _id: addressId = '',
                              alphone = '',
                              area = '',
                              country = '',
                              disrict = '',
                              estate = '',
                              houseNo = '',
                              name = '',
                              pincode = '',
                              street = '',
                              userid = '',
                              selectedadress = true,
                            } = rec;
                            // console.log(
                            //   selectedadress,
                            //   '===============selectedadress',
                            // );
                            return (
                              <View
                                key={index}
                                style={{
                                  borderTopWidth: 2,
                                  borderColor: '#666',
                                  // marginVertical: 3,
                                  // marginHorizontal: 5,
                                  borderBottomRightRadius: 8,
                                  borderBottomLeftRadius: 8,
                                  paddingVertical: 10,
                                  paddingHorizontal: 15,
                                  backgroundColor: '#fff',
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                  }}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      // handleSelectedAddress(addressId);
                                    }}
                                    style={{
                                      borderWidth: 2,
                                      // borderColor:
                                      //   selectedadress == true
                                      //     ? Colors.primary
                                      //     : '#999',
                                      borderColor: '#263d2d',
                                      padding: 3,
                                      height: 25,
                                      width: 25,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      borderRadius: 15,
                                    }}>
                                    <View
                                      style={{
                                        borderWidth: 1,
                                        padding: 5,
                                        height: 13,
                                        width: 13,
                                        borderRadius: 15,
                                        // borderColor:
                                        //   selectedadress == true
                                        //     ? Colors.primary
                                        //     : '#ccc',
                                        borderColor: '#263d2d',

                                        // backgroundColor:
                                        //   selectedadress == true
                                        //     ? Colors.primary
                                        //     : '#ddd',
                                        backgroundColor: '#263d2d',
                                      }}></View>
                                  </TouchableOpacity>
                                  <View
                                    style={{
                                      borderWidth: 0,
                                      paddingHorizontal: 12,
                                      width: '75%',
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
                                      {houseNo}, {area}, {street}
                                    </Text>
                                    <Text
                                      style={{
                                        fontWeight: '600',
                                        fontSize: 14,
                                        color: '#333',
                                      }}>
                                      {disrict}, {estate},
                                    </Text>
                                    <Text
                                      style={{
                                        fontWeight: '600',
                                        fontSize: 14,
                                        color: '#333',
                                      }}>
                                      {country}
                                      {' - '}
                                      {pincode}
                                    </Text>
                                  </View>

                                  <Pressable
                                    onPress={() => {
                                      // setIsEdit(true);
                                      handleUpdateAddress(
                                        addressId,
                                        name,
                                        phone,
                                        alphone,
                                        houseNo,
                                        area,
                                        street,
                                        disrict,
                                        estate,
                                        country,
                                        pincode,
                                      );
                                    }}
                                    style={{
                                      flexDirection: 'row',
                                      justifyContent: 'flex-end',
                                      // borderWidth: 1,
                                      // marginRight: 10,
                                      // marginVertical: 10,
                                    }}>
                                    <MaterialIcons
                                      name="edit"
                                      color={'#666'}
                                      size={18}
                                    />
                                    <Text
                                      style={{
                                        fontWeight: 'bold',
                                        fontSize: 14,
                                        color: '#666',
                                        textDecorationLine: 'underline',
                                        marginLeft: 5,
                                      }}>
                                      Edit
                                    </Text>
                                  </Pressable>
                                </View>
                              </View>
                            );
                          })}
                        </>
                      )}
                    </View>
                  ) : (
                    <Pressable
                      onPress={() => {
                        navigation.navigate('AddressScreen', {
                          isEdit: false,
                          addressID: '',
                        });
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // margin: 15,
                        marginHorizontal: 15,
                        marginBottom: 15,
                        marginTop: 8,
                        // borderWidth:1
                      }}>
                      <MaterialIcons name="add-circle" color={'green'} size={20} />

                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 17,
                          color: 'green',
                          marginLeft: 10,
                        }}>
                        Add Delivery Address
                      </Text>
                    </Pressable>
                  )}
                </View>

                <View
                  style={{
                    // borderWidth: 1,
                    borderColor: '#000',
                    backgroundColor: '#fff',
                    // borderRadius: 15,
                    // paddingHorizontal: 20,
                    width: device_width * 0.98,
                    alignSelf: 'center',
                    paddingVertical: 20,
                    padding: 10,
                    marginTop: 20,
                    // marginHorizontal: 10,
                    bottom: 10,
                  }}>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: 15,
                      fontWeight: '900',
                      textAlign: 'center',
                      textDecorationLine: 'underline',
                    }}>
                    {trans('Price Details')}
                  </Text>
                  <View
                    style={{
                      marginTop: 5,
                      flexDirection: 'row',
                      // justifyContent: 'space-between',
                      borderTopColor: 'gray',
                      marginHorizontal: 20,
                      // borderTopWidth: 0.3,
                    }}>
                    <Text style={{ color: '#333', fontSize: 14, fontWeight: '700' }}>
                      {trans('Total Items - ')}
                    </Text>
                    <Text style={{ color: '#333', fontSize: 13, fontWeight: '700' }}>
                      {CartItem.length}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: '#ccc',
                      width: '95%',
                      backgroundColor: '#f4f4f4',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      paddingVertical: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottomWidth: 2,
                        paddingVertical: 3,
                        borderColor: '#666',
                        paddingLeft: 10,
                      }}>
                      <Text
                        style={{
                          fontWeight: '800',
                          fontSize: 14,
                          // borderWidth: 1,
                          width: '15%',
                          color: '#333',
                        }}>
                        Sl. No
                      </Text>
                      <Text
                        style={{
                          fontWeight: '800',
                          // borderWidth: 1,
                          width: '45%',
                          fontSize: 14,
                          color: '#333',
                        }}>
                        Product
                      </Text>
                      <Text
                        style={{
                          fontWeight: '800',
                          fontSize: 14,
                          // borderWidth: 1,
                          width: '15%',
                          color: '#333',
                        }}>
                        Qnty.
                      </Text>
                      <Text
                        style={{
                          fontWeight: '800',
                          // borderWidth: 1,
                          width: '20%',
                          fontSize: 14,
                          color: '#333',
                        }}>
                        Price
                      </Text>
                    </View>
                    {CartItem.map((item, index) => {
                      const {
                        _id = '',
                        productPrice = '',
                        noOfitems = '',
                        image = '',
                        productDetails = '',
                        productname = '',
                        productid = '',
                        totalamounttobepaid = '',
                      } = item;

                      return (
                        <View
                          key={index}
                          style={{
                            // borderBottomWidth: 1,
                            // paddingTop: 10,
                            borderBottomColor: '#999',
                            paddingHorizontal: 10,
                            // borderEndWidth: 50,
                            // borderEndColor: '#fff',
                            // borderStartWidth: 50,
                            // borderWidth:1,
                            // borderStartColor: '#fff',
                            width: '100%',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              // borderWidth:1,
                              marginTop: 5,
                            }}>
                            <Text
                              style={{
                                color: '#333',
                                fontSize: 13,
                                // borderWidth: 1,
                                width: '10%',
                                textAlign: 'center',
                                fontWeight: '600',
                              }}>
                              {index + 1}
                            </Text>
                            <Text
                              style={{
                                color: '#333',
                                fontSize: 13,
                                // borderWidth: 1,
                                // textAlign:'center',
                                width: '50%',
                                marginLeft: 10,
                                fontWeight: '600',
                              }}>
                              {productname}
                            </Text>
                            <Text
                              style={{
                                color: '#333',
                                textAlign: 'center',
                                fontSize: 13,
                                // borderWidth: 1,
                                width: '10%',
                                fontWeight: '600',
                              }}>
                              {noOfitems}
                            </Text>
                            <Text
                              style={{
                                color: '#333',
                                textAlign: 'center',
                                fontSize: 14,
                                // borderWidth: 1,
                                width: '20%',
                                fontWeight: '700',
                              }}>
                              ₹ {noOfitems * productPrice}
                            </Text>
                          </View>
                          <View
                            style={{
                              borderWidth: 0.5,
                              width: '80%',
                              alignSelf: 'center',
                              borderColor: '#ccc',
                            }}></View>
                        </View>
                      );
                    })}

                    <View
                      style={{
                        marginTop: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderTopColor: 'gray',
                        marginHorizontal: 50,
                        // borderTopWidth: 0.3,
                      }}>
                      <Text
                        style={{ color: '#333', fontSize: 17, fontWeight: '900' }}>
                        {trans('Total Amount')}
                      </Text>
                      {priceLoading == true ? (
                        <View
                          style={
                            {
                              // paddingVertical: 20,
                              // borderWidth: 1,
                              // borderTopWidth: 2,
                              // borderColor: '#666',
                            }
                          }>
                          {/* <LoadingScreen flag={loading} /> */}
                          <ActivityIndicator
                            size="small"
                            color={'#263d2d'}
                            style={{
                              alignSelf: 'center',
                              justifyContent: 'center',
                            }}
                          />
                        </View>
                      ) : (
                        <Text
                          style={{ color: '#333', fontSize: 17, fontWeight: '900' }}>
                          ₹ {totalAmount}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>
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
                    position: 'absolute',
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
                      marginTop: 5,
                      // borderWidth: 1,
                      // borderLeftWidth:1,
                      width: '85%',
                    }}>
                    {trans('Currently No Content Added To Cart')}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: device_height * 0.8,
                  }}>
                  <FastImage
                    style={{
                      height: 200,
                      width: '100%',
                      // position: 'absolute',
                      //left: 10,
                    }}
                    source={require('../../../assets/empty-cart.png')}
                    resizeMode="contain"
                  />
                </View>
              </>
            )}
          </ScrollView>
          {CartItem.length > 0 && (
            <View
              style={{
                // position: 'absolute',
                // bottom: 10,
                backgroundColor: '#fff',
                paddingVertical: 10,
                borderTopWidth: 1,
                borderColor: '#999',
                width: '100%',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                disabled={
                  AllAddress != null && AllAddress != undefined && !priceLoading ? false : true
                }
                style={{
                  width: '80%',
                  borderRadius: 10,
                  backgroundColor:
                    AllAddress != null && AllAddress != undefined && !priceLoading
                      ? '#263d2d'
                      : '#aaa',
                  alignSelf: 'center',
                  alignItems: 'center',
                  paddingVertical: 10,
                  // marginBottom: 20,
                }}
                onPress={() => handlePurchase()}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: AllAddress ? '#fff' : '#555',
                    fontSize: 15,
                  }}>
                  {trans('BUY NOW')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>)}
    </SafeAreaView>
  );
};

export default MyCart;
