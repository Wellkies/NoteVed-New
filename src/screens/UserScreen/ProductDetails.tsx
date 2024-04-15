import React, {useState} from 'react';
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
} from 'react-native';
import {useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import i18n from 'i18next';
import Colors from '../../../assets/Colors';
import {device_height, device_width} from '../style';
import CommonMessage from '../../../constants/CommonMessage';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../redux/store/reducerHook';
import { selectStudentInfo } from '../../redux/reducers/StudentInfoReducer';
import { getUserAllAddressAPI, selectAllAddressInfo } from '../../redux/reducers/GetAllAddressReducer';
import { getCartItemAPI, selectCartItemInfo } from '../../redux/reducers/GetCartItemReducer';
import { getProductByIdAPI, selectProductDetailsInfo } from '../../redux/reducers/GetProductDetailsReducer';
import { couponDiscountForProductAPI, createAddToCartApi, updateCartUrl } from '../../redux/actions/MyStoreAPI';
// import {
//   couponDiscountForProductAPI,
//   createAddToCartApi,
//   getCartItemAPI,
//   getProductByCategoryAPI,
//   getProductByIdAPI,
//   getUserAllAddressAPI,
//   removeCartItemApi,
//   updateCartUrl,
// } from '../../redux/actions/Action';
const {t: trans} = i18n;

const ProductDetails = ({route}) => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation()
  const [cartItem, setCartItem] = useState();
  const [loading, setLoading] = useState();
  const [cartCount, setCartCount] = useState();
  const [totalAmount, setTotalAmount] = useState('');
  const [count, setCount] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [cartData, setCartData] = React.useState({});

  const {
    // productPrice = '',
    // productname = '',
    id = '',
    // image: ProductImage = '',
    // productDetails = '',
    // isAvailable = '',
    // categoryName = '',
    // categoryid = '',
    // productType = '',
    // productid = '',
    // quantity = '',
    // stockAvailability = '',
  } = route.params;
  // console.log(productid, 'productid...........');

  // const {AllAddress = []} = useSelector(state => state.GetAllAddressReducer);
  const AllAddress = useAppSelector(selectAllAddressInfo);
  // console.log(AllAddress, 'AllAddress.............');

  // const {CartItem = []} = useSelector(state => state.GetCartItemReducer);
  const CartItem = useAppSelector(selectCartItemInfo);
  // console.log(CartItem, 'CartItem.............');

  // const {ProductDetails: ProductDetailsById = {}} = useSelector(
  //   state => state.GetProductDetailsReducer,
  //   );
  const ProductDetailsById = useAppSelector(selectProductDetailsInfo)
  // console.log(ProductDetailsById,"================ProductDetailsById");
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
      // _id = '',
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

  const [productData, setProductData] = useState({});

  useEffect(() => {
    setProductData(ProductDetailsById);
    dispatch(getProductByIdAPI(id));
  }, [ProductDetailsById]);

  useEffect(() => {
    dispatch(getCartItemAPI(childid));
    dispatch(getUserAllAddressAPI(childid));
    navigation.addListener('focus', () => {
      dispatch(getCartItemAPI(childid));
    });
    return () => {};
  }, []);

  const {
    _id = '',
    author = '',
    bookpages = '',
    categoryName = '',
    categoryid = '',
    createon = '',
    image: ProductImage = [],
    instructions = '',
    isAvailable = '',
    noofpurchased = '',
    productDetails = '',
    productPrice = '',
    productType = '',
    productid = '',
    productname = '',
    quantity = '',
    stockAvailability = '',
    updatedon = '',
  } = productData;

  // console.log(
  //   productData,
  //   'productData.......................',
  //   // productData != '',
  // );

  useEffect(() => {
    dispatch(getProductByIdAPI(id));
    if (CartItem.length > 0) {
      let cartDataItem = CartItem.filter(r => r.productid == productid);
      // console.log(cartDataItem, 'cartDataItem...................');
      setCartData(cartDataItem);
      let cartCount = CartItem.map(r => r.noOfitems);
      // console.log(cartCount, 'cartCount............');

      const sum = cartCount.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      );
      setCartCount(sum);
      // console.log(sum, 'cartCount.............');
    } else {
      setCartCount(0);
    }
  }, [CartItem]);

  const handleAddtoCart = (count, productID) => {
    if (CartItem.length > 0) {
      let matchproductID = CartItem.filter(r => r.productid == productID);
      console.log(matchproductID, 'matchproductID...................');
      if (matchproductID.length > 0) {
        setCount(count + 1);

        let getID = matchproductID.map(r => r._id);

        const updatecartBody = {
          id: getID[0],
          noOfitems: count,
        };
        console.log(updatecartBody, 'updatecartBody..............');
        updateCartUrl(updatecartBody, () => updateCallback());
      } else {
        const cartBody = {
          userid: childid,
          productid: productid,
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
        createAddToCartApi(cartBody, () => callBack);
      }
    } else {
      const cartBody = {
        userid: childid,
        productid: productid,
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

  const callBack = async () => {
    // setCartItem(cartBody)
    dispatch(getCartItemAPI(childid));
    if (cartCount > 0) {
      couponDiscountForProductAPI(discountBodyData, handleCallback);
    }
    console.log('callBack_called');
  };
  // const handleRemove=()=>{
  //   dispatch(removeCartItemApi(productid,removeCallback))
  // }

  // console.log(CartItem, 'CartItem.............');

  let allProducts = CartItem.map((rec, index) => {
    const {productid = '', noOfitems = ''} = rec;
    return {productid: productid, quantity: noOfitems};
  });
  // console.log(allProducts, '===========allProducts');

  const discountBodyData = {
    productDetails: allProducts,
    couponcodeid: '',
  };
  // console.log(discountBodyData,"=========discountBodyData_addtocart");

  const updateCallback = async () => {
    dispatch(getCartItemAPI(childid));
    if (cartCount > 0) {
      couponDiscountForProductAPI(discountBodyData, handleCallback);
    }
  };

  const handleCallback = totalPrice => {
    setTotalAmount(totalPrice);
  };
  // console.log(ProductByCategory, 'ProductByCategory................');

  const TabButton = [
    {
      label: trans('Description'),
      btnId: 1,
      isSelected: false,
    },
    {
      label: trans('Reviews'),
      btnId: 2,
      isSelected: false,
    },
    {
      label: trans('Instructions'),
      btnId: 3,
      isSelected: false,
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.secondary}}>
      <View>
        <StatusBar backgroundColor={Colors.secondary} barStyle="dark-content" />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.secondary,
            justifyContent: 'space-between',
            paddingBottom: 5,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* {isbackIconShow ? ( */}
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{paddingLeft: 10, borderWidth: 0}}>
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
              {'Product Details'}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              dispatch(getUserAllAddressAPI(childid));
              navigation.navigate('MyCart', {AllAddress: AllAddress});
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
                {cartCount}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={true}
        persistentScrollbar={true}>
        <View
          // key={index}
          style={{
            width: device_width * 0.8,
            minheight: device_height * 0.28,
            // borderWidth: 1,
            borderColor: '#263d2d',
            borderRadius: 10,
            marginTop: 10,
            elevation: 10,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            paddingVertical: 5,
            paddingHorizontal: 25,
          }}>
          <View
            style={{
              borderColor: '#263d2d',
              // borderWidth: 1,
              width: '90%',
              alignSelf: 'center',
              height: device_height * 0.33,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {ProductImage != '' ? (
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  // borderWidth:1
                }}
                source={{uri: ProductImage[0]}}
              />
            ) : (
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  // borderWidth:1
                }}
                source={{
                  uri: 'https://img.freepik.com/free-photo/notebook_74190-2720.jpg?w=996&t=st=1698310498~exp=1698311098~hmac=f14f63dd7e2b1e9e0816ffb27ad12f53c94bf9c3de46b08e93d6d1927d54bc62',
                }}
              />
            )}
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              width: device_width * 0.78,
              // alignItems: 'center',
              // borderWidth:1
            }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '700',
                color: '#666',
                marginLeft: 20,
                color: '#444',
              }}>
              {productname}
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '700',
                marginLeft: 20,
                color: 'green',
              }}>
              ₹{productPrice}
            </Text>
            <View
              style={{
                justifyContent: 'space-between',
                alignSelf: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                borderWidth:
                  noofpurchased == '' && author == '' && bookpages == ''
                    ? 0
                    : 1.5,
                borderColor: '#263d2d',
                borderRadius: 10,
                marginVertical: 5,
                paddingHorizontal: 15,
                width: '98%',
              }}>
              {noofpurchased != '' && (
                <View
                  style={{
                    width: '30%',
                    // borderWidth: 1,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: '#666',
                    }}>
                    {'Purchased'}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '700',
                      color: '#263d2d',
                    }}>
                    {noofpurchased}
                  </Text>
                </View>
              )}
              {bookpages != '' && (
                <View
                  style={{
                    width: '25%',
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderColor: '#999',
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: '#666',
                    }}>
                    {'Pages'}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '700',
                      color: '#263d2d',
                    }}>
                    {bookpages}
                  </Text>
                </View>
              )}
              {author != '' && (
                <View
                  style={{
                    width: '44%',
                    borderWidth: 0,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: '#666',
                      textAlign: 'center',
                      width: '100%',
                    }}>
                    {'Author'}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '700',
                      color: '#263d2d',
                      textAlign: 'center',
                      width: '100%',
                    }}>
                    {author}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* <View
        style={{
          flexDirection: 'column',
          marginTop: 5,
          width: '90%',
          //   borderWidth: 1,
          paddingVertical: 5,
          paddingHorizontal: 5,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <>
          {cartData.length > 0 ? (
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                width: '100%',
                height: 60,
                borderRadius: 10,
                flexDirection: 'row',
                paddingVertical: 1,
                paddingHorizontal: 5,
                borderWidth: 2,

                borderColor: '#263d2d',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                navigation.navigate('MyCart');
              }}>
              <Text
                style={{
                  fontWeight: '800',
                  color: '#263d2d',
                  fontSize: 13,
                  marginLeft: 3,
                }}>
                {'Go to Cart'}
              </Text>
              <FontAwesome
                name="shopping-cart"
                color="#fff"
                size={18}
                style={{left: 3}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: '#263d2d',
                width: '100%',
                height: 60,
                borderRadius: 10,
                flexDirection: 'row',
                paddingVertical: 1,
                paddingHorizontal: 5,
                //   borderWidth: 1,

                borderColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                handleAddtoCart(count, productid);
              }}>
              <Text
                style={{
                  fontWeight: '800',
                  color: '#fff',
                  fontSize: 13,
                  marginLeft: 3,
                }}>
                {'Add'}
              </Text>
              <FontAwesome
                name="shopping-cart"
                color="#fff"
                size={18}
                style={{left: 3}}
              />
            </TouchableOpacity>
          )}
        </>
      </View> */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // borderWidth: 1,
            justifyContent: 'space-around',
            width: '100%',
            alignSelf: 'center',
            marginBottom: 15,
          }}>
          {TabButton.map((item, index) => {
            const {label = '', btnId = '', isSelected = ''} = item;
            const isselectedBtn = btnId == selectedIndex ? true : false;
            return (
              <TouchableOpacity
                key={index}
                style={{
                  width: isselectedBtn
                    ? device_width * 0.32
                    : device_width * 0.34,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 10,
                  // borderWidth: 1.5,
                  borderBottomWidth: isselectedBtn ? 5 : 5,
                  height: 60,
                  // borderBottomWidth:0,
                  // borderRadius: isselectedBtn ? 10 : 10,
                  borderColor: isselectedBtn ? '#263d2d' : '#ccc',
                  // backgroundColor: isselectedBtn ? '#263d2d' : '#ddd',
                  // paddingHorizontal: index == 0 ? 28 : index == 1 ? 20 : 28,

                  // borderBottomLeftRadius: index == 0 ? 15 : index == 1 ? 0 : 0,
                  // borderTopLeftRadius: index == 0 ? 15 : index == 1 ? 0 : 0,
                  // borderBottomRightRadius: index == 1 ? 0 : index == 0 ? 0 : 15,
                  // borderTopRightRadius: index == 1 ? 0 : index == 0 ? 0 : 15,
                }}
                onPress={() => {
                  setSelectedIndex(btnId);
                  // setContentList(contentList);
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: isselectedBtn ? '900' : '700',
                    color: isselectedBtn ? '#263d2d' : '#666',
                    textAlign: 'center',
                    // borderWidth:1,
                    textAlignVertical: 'center',
                    width: '100%',
                    height: '100%',
                  }}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {selectedIndex == 1 && (
          <View
            style={{
              // borderWidth: 1,
              width: device_width * 0.88,
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: '#444',
                fontWeight: '600',
                fontSize: 14,
                width: '100%',
              }}>
              {productDetails}
            </Text>
            <Text>{''}</Text>
            {/* <Text
              style={{
                color: '#444',
                fontWeight: '600',
                fontSize: 14,
                width: '100%',
              }}>
              The NoteVed App is revolutionizing the way kids study and practice
              their course material. With its user-friendly interface and
              comprehensive mock tests, this app aims to make learning a fun and
              interactive experience for students.
            </Text> */}
            <Text>{''}</Text>
            {/* <Text
              style={{
                color: '#444',
                fontWeight: '600',
                fontSize: 14,
                width: '100%',
              }}>
              NoteVed Academy, proudly under the umbrella of Wellkies Healthcare
              Private Limited. Wellkies.in
            </Text> */}
          </View>
        )}
        {selectedIndex == 2 && (
          <View
            style={{
              // borderWidth: 1,
              width: device_width * 0.88,
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: '#444',
                fontWeight: '600',
                fontSize: 14,
                width: '100%',
              }}>
              No Reviews Yet !
            </Text>
          </View>
        )}
        {selectedIndex == 3 && (
          <View
            style={{
              // borderWidth: 1,
              width: device_width * 0.88,
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: '#444',
                fontWeight: '600',
                fontSize: 14,
                width: '100%',
              }}>
              {instructions}
            </Text>
            {/*
            <Text
              style={{
                color: '#444',
                fontWeight: '600',
                fontSize: 14,
                width: '100%',
              }}>
              Use it daily for outstanding results in your entrance exams.
            </Text> */}
          </View>
        )}
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          width: device_width,
          justifyContent: 'space-around',
          alignItems: 'center',
          alignSelf: 'center',
          // borderWidth: 1.5,
          backgroundColor: '#fff',
          paddingVertical: 10,
        }}>
        <TouchableOpacity
          // disabled={CartItem.length > 0 ? false : true}
          style={{
            // backgroundColor: CartItem.length > 0 ? '#fff' : 'gray',
            backgroundColor: '#fff',
            width: '42%',
            height: 45,
            borderRadius: 20,
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: '#263d2d',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            CommonMessage('Item Added to Cart');
            handleAddtoCart(count, productid);
          }}>
          <FontAwesome
            name="shopping-cart"
            color={'#263d2d'}
            size={18}
            style={{left: -5}}
          />
          <Text
            style={{
              fontWeight: '800',
              color: '#263d2d',
              fontSize: 13,
              marginLeft: 3,
            }}>
            {'Add to cart'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          // disabled={CartItem.length > 0 ? false : true}
          style={{
            // backgroundColor: CartItem.length > 0 ? '#fff' : 'gray',
            backgroundColor: '#263d2d',
            width: '42%',
            height: 45,
            borderRadius: 20,
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: '#263d2d',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            handleAddtoCart(count, productid);
            dispatch(getUserAllAddressAPI(childid));
            navigation.navigate('MyCart', {AllAddress: AllAddress});
          }}>
          <FontAwesome
            name="rupee"
            color={'#fff'}
            size={16}
            style={{left: -5}}
          />
          <Text
            style={{
              fontWeight: '800',
              color: '#fff',
              fontSize: 12,
              marginBottom: 3,
            }}>
            Buy Now
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;
