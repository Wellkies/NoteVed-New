import React from 'react';
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
import {useDispatch} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import i18n from 'i18next';
import Colors from '../../../assets/Colors';
import {device_width} from '../style';
import {
  getAllProductAPI,
  getAllProductCategoryAPI,
} from '../../redux/actions/Action';
// import AutocompleteInput from 'react-native-autocomplete-input';
import Autocomplete from 'react-native-autocomplete-input';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const {t: trans} = i18n;

const MyStore = () => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation()
  const Products = [
    {
      name: 'Pencil Set',
      img: 'https://img.freepik.com/free-vector/pencil-colorful-realistic-set-isolated-white_1284-48170.jpg?w=740&t=st=1698310680~exp=1698311280~hmac=c8aeec491b18a78c501b51c86f5551fd7323b6e349fed119f2e27fcfb3962d94',
      productList: [
        {
          prodName: 'Pencil 1',
          prodPrice: '5',
          prodImg:
            'https://opusartsupplies.com/cdn/shop/products/FBC115200.jpg?v=1660673542&width=1000',
        },
        {
          prodName: 'Pencil 2',
          prodPrice: '7',
          prodImg:
            'https://opusartsupplies.com/cdn/shop/products/FBC115200.jpg?v=1660673542&width=1000',
        },
        {
          prodName: 'Pencil 3',
          prodPrice: '6',
          prodImg:
            'https://opusartsupplies.com/cdn/shop/products/FBC115200.jpg?v=1660673542&width=1000',
        },
      ],
    },
    {
      name: 'Pen Set',
      img: 'https://img.freepik.com/free-vector/business-pen-set_1284-21143.jpg?w=740&t=st=1698310388~exp=1698310988~hmac=5c1e50c3f4ae1bb0871dbae6ac4ff4fcbd3a5c6d74c9974299444353d86803f1',
      productList: [
        {
          prodName: 'Pen 1',
          prodPrice: '10',
          prodImg:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRWm6yT_z9bjSPYS1x5tS7X-dS9vL2tFX5PUgMLmpH8YewzmEw7AJuHa03YFARs5AhGa4&usqp=CAU',
        },
        {
          prodName: 'Pen 2',
          prodPrice: '15',
          prodImg:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRWm6yT_z9bjSPYS1x5tS7X-dS9vL2tFX5PUgMLmpH8YewzmEw7AJuHa03YFARs5AhGa4&usqp=CAU',
        },
        {
          prodName: 'Pen 3',
          prodPrice: '20',
          prodImg:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRWm6yT_z9bjSPYS1x5tS7X-dS9vL2tFX5PUgMLmpH8YewzmEw7AJuHa03YFARs5AhGa4&usqp=CAU',
        },
      ],
    },
    {
      name: 'Note Books',
      img: 'https://img.freepik.com/free-photo/notebook_74190-2720.jpg?w=996&t=st=1698310498~exp=1698311098~hmac=f14f63dd7e2b1e9e0816ffb27ad12f53c94bf9c3de46b08e93d6d1927d54bc62',
      productList: [
        {
          prodName: 'Note Book 1',
          prodPrice: '20',
          prodImg:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwowQHOR_GENGvZZtBmgEUtVN8T70XdPWI-b8joMo1Z-4l3q36GdpB9cgBBYUYkp0qF-4&usqp=CAU',
        },
        {
          prodName: 'Note Book 2',
          prodPrice: '25',
          prodImg:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwowQHOR_GENGvZZtBmgEUtVN8T70XdPWI-b8joMo1Z-4l3q36GdpB9cgBBYUYkp0qF-4&usqp=CAU',
        },
        {
          prodName: 'Note Book 3',
          prodPrice: '30',
          prodImg:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwowQHOR_GENGvZZtBmgEUtVN8T70XdPWI-b8joMo1Z-4l3q36GdpB9cgBBYUYkp0qF-4&usqp=CAU',
        },
      ],
    },
    {
      name: 'Eraser',
      img: 'https://m.media-amazon.com/images/I/716YBLPCc7L._AC_UF1000,1000_QL80_.jpg',
      productList: [
        {
          prodName: 'Eraser 1',
          prodPrice: '5',
          prodImg:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjmoKDNvqoVCiTPoiLl-q4TbzmYGAoRg7t3g&usqp=CAU',
        },
        {
          prodName: 'Eraser 2',
          prodPrice: '5',
          prodImg:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjmoKDNvqoVCiTPoiLl-q4TbzmYGAoRg7t3g&usqp=CAU',
        },
        {
          prodName: 'Eraser 3',
          prodPrice: '7',
          prodImg:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjmoKDNvqoVCiTPoiLl-q4TbzmYGAoRg7t3g&usqp=CAU',
        },
      ],
    },
    {
      name: 'Sharpener',
      img: 'https://img.freepik.com/free-vector/different-colorful-sharpener-vector-illustrations-set_778687-1306.jpg?w=900&t=st=1698311106~exp=1698311706~hmac=60b79240ff8be7bdc138d56f475e6d9d64e1ac7a45dd5bbc519794788f99ae26',
      productList: [
        {
          prodName: 'Sharpener 1',
          prodPrice: '5',
          prodImg:
            'https://i.ebayimg.com/00/s/ODIwWDg3Nw==/z/ZV4AAOSw94FjxU83/$_12.JPG?set_id=880000500F',
        },
        {
          prodName: 'Sharpener 2',
          prodPrice: '10',
          prodImg:
            'https://i.ebayimg.com/00/s/ODIwWDg3Nw==/z/ZV4AAOSw94FjxU83/$_12.JPG?set_id=880000500F',
        },
        {
          prodName: 'Sharpener 3',
          prodPrice: '8',
          prodImg:
            'https://i.ebayimg.com/00/s/ODIwWDg3Nw==/z/ZV4AAOSw94FjxU83/$_12.JPG?set_id=880000500F',
        },
      ],
    },
    {
      name: 'Pencil Box',
      img: 'https://5.imimg.com/data5/RW/YE/VX/SELLER-4721338/plastic-boxes.jpeg',
      productList: [
        {
          prodName: 'Pencil Box 1',
          prodPrice: '45',
          prodImg:
            'https://img.ltwebstatic.com/images3_spmp/2023/05/26/16850747619a7418a9605c55f07acd53c113b97199_thumbnail_720x.webp',
        },
        {
          prodName: 'Pencil Box 2',
          prodPrice: '50',
          prodImg:
            'https://img.ltwebstatic.com/images3_spmp/2023/05/26/16850747619a7418a9605c55f07acd53c113b97199_thumbnail_720x.webp',
        },
        {
          prodName: 'Pencil Box 3',
          prodPrice: '100',
          prodImg:
            'https://img.ltwebstatic.com/images3_spmp/2023/05/26/16850747619a7418a9605c55f07acd53c113b97199_thumbnail_720x.webp',
        },
      ],
    },
    {
      name: 'Geometry Box',
      img: 'https://www.jiomart.com/images/product/original/490094816/camlin-scholar-mathematical-geometry-box-product-images-o490094816-p490094816-7-202206061841.jpg?im=Resize=(420,420)',
      productList: [
        {
          prodName: 'Geometry Box 1',
          prodPrice: '75',
          prodImg:
            'https://5.imimg.com/data5/GB/LU/CR/SELLER-50047875/classmate-geometry-box-set-4.jpeg',
        },
        {
          prodName: 'Geometry Box 2',
          prodPrice: '85',
          prodImg:
            'https://5.imimg.com/data5/GB/LU/CR/SELLER-50047875/classmate-geometry-box-set-4.jpeg',
        },
        {
          prodName: 'Geometry Box 3',
          prodPrice: '120',
          prodImg:
            'https://5.imimg.com/data5/GB/LU/CR/SELLER-50047875/classmate-geometry-box-set-4.jpeg',
        },
      ],
    },
    {
      name: 'Crayon Set',
      img: 'https://media.istockphoto.com/id/1347051898/vector/set-of-crayons-contains-seven-rainbow-colors-vector-isolated-illustration.jpg?s=612x612&w=0&k=20&c=2NToJ9jE5uFhBZS-tBmJTFy15YMpnB9M31pBRy1n3QA=',
      productList: [
        {
          prodName: 'Crayon 1',
          prodPrice: '50',
          prodImg:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtLxmSsM1sMRBJwmlgUkwMOACPDgPb2FEwIX4AlKDB0STnM0m3zQKfIT8l6kBStVKb8gs&usqp=CAU',
        },
        {
          prodName: 'Crayon 2',
          prodPrice: '75',
          prodImg:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtLxmSsM1sMRBJwmlgUkwMOACPDgPb2FEwIX4AlKDB0STnM0m3zQKfIT8l6kBStVKb8gs&usqp=CAU',
        },
        {
          prodName: 'Crayon 3',
          prodPrice: '95',
          prodImg:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtLxmSsM1sMRBJwmlgUkwMOACPDgPb2FEwIX4AlKDB0STnM0m3zQKfIT8l6kBStVKb8gs&usqp=CAU',
        },
      ],
    },
  ];
  const [FilterData, setFilterData] = useState([]);
  const [selectedItem, setselectedItem] = useState({});
  useEffect(() => {
    dispatch(getAllProductCategoryAPI(undefined, undefined));
    dispatch(getAllProductAPI(undefined, undefined));
    setFilterData([]);
    setselectedItem({});
    this.textInput.clear();
    SearchDataFromJSON('');
    navigation.addListener('focus', () => {
      dispatch(getAllProductCategoryAPI(undefined, undefined));
    });
    return () => {};
  }, []);

  const {AllProduct = []} = useSelector(state => state.GetAllProductReducer);
  console.log(AllProduct, 'AllProduct.............');
  const {AllProductCategory = []} = useSelector(
    state => state.GetAllProductCategoryReducer,
  );
  // console.log(AllProductCategory, 'AllProductCategory.............');
  // const newsymptom = symptoms.length > 0 ? symptoms.slice(0, 8) : [];
  // const newsymptom2 = symptoms.length > 0 ? symptoms.slice(8, 16) : [];
  // const newsymptom3 = symptoms.length > 0 ? symptoms.slice(15, 24) : [];
  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'We will update shortly !',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };
 
  const SearchDataFromJSON = (query, inputName, inputValue) => {
    if (query && AllProduct.length > 0) {
      //Making the Search as Case Insensitive.
      // const {f_name ="",l_name=""}= alldoctorlist
      const regex = new RegExp(`${query.trim()}`, 'i');
      // const DoctorName=f_name+" "+l_name;

      const filterListdata = AllProduct.filter(
        data => data.productname.search(regex) >= 0,
        // data.department.search(regex) >= 0 ||
        // data.symptomName.search(regex) >= 0,
      );
      // const {f_name+}=doc_list
      setFilterData(filterListdata);

      // console.log(filterListdata,"filterListdata");
    } else {
      // let infodata = { ...info };
      setFilterData([]);
    }
    // let infodata = { ...info };
    // setInfo({ ...infodata, [inputName]: inputValue });
  };

  const close = () => {
    setFilterData([]);
    setselectedItem({});
    this.textInput.clear();
    SearchDataFromJSON('');
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.secondary}}>
      {/* <Header
        label1={trans('My Store')}
        label2={<Ionicons name={'storefront'} size={22} color={Colors.primary} />}
        isbackIconShow={true}
        functionName={() => navigation.goBack()}
      /> */}
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        vertical={true}>
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            // marginHorizontal:20,
            width: '90%',
            flexDirection: 'row',
            marginTop: 2,
            backgroundColor: '#fff',
            borderBottomWidth: 1,
            borderBottomColor: '#f2f2f2',
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 10,
            marginTop: 10,
            borderRadius: 20,
          }}>
        

          <View
            style={{
              flex: 1,
              // height: 'auto',
              // height:50,
              borderRadius: 10,
              flexDirection: 'row',
              // justifyContent: 'center',
              // alignItems: 'center',
              marginLeft: '5%',
              marginRight: '5%',
              backgroundColor: '#fff',
            }}>
            <View style={{marginTop: 10}}>
              <AntDesign
                name="search1"
                size={18}
                color="gray"
                // on onPress={()=>SearchDataFromJSON()}
                // style={styles1.searchIcon}
              />
            </View>
            <Autocomplete
              autoCapitalize="none"
              // placeholderTextColor={"#333"}
              autoCorrect={false}
              style={{color: '#333', fontWeight: '500'}}
              containerStyle={{
                backgroundColor: '#ffffff',
                borderWidth: 0,
                marginLeft: 10,
                marginRight: 10,
              }}
              inputContainerStyle={{
                borderBottomWidth: 1,
                borderColor: 'transparent',
              }}
              data={FilterData}
              ref={input => {
                this.textInput = input;
              }}
              defaultValue={
                JSON.stringify(selectedItem) === '{}'
                  ? ''
                  : selectedItem.productname
              }
              onChangeText={val => SearchDataFromJSON(val)}
              // placeholder={trans('Find your doctors quickly')}
              placeholder={trans(`What are you looking for?`)}
              placeholderTextColor={'#333'}
              flatListProps={{
                keyboardShouldPersistTaps: 'always',
                keyExtractor: item => item._id,
                renderItem: ({item}) => (
                  <ScrollView showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity
                     onPress={() => {
                        navigation.navigate('ProductList', {
                          CategoryID: item.categoryid,
                          // ProductCategory: name,
                        });
                      }}
                      >
                      <View
                        style={{
                          padding: 8,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        {/* <View>
                          <Avatar.Image
                            source={
                              item.image != null && item.image != ''
                                ? {uri: item.image}
                                : {
                                    uri: 'https://wkresources.s3.ap-south-1.amazonaws.com/userrr.png',
                                  }
                            }
                            size={50}
                            style={{marginTop: 12, backgroundColor: '#fff'}}
                          />
                        </View> */}
                        <View style={{marginHorizontal: 10}}>
                          <Text
                            style={[
                              {
                                fontSize: 14,
                                marginTop: 10,
                                // paddingTop: 10,
                                color: '#333',
                                textTransform: 'capitalize',
                                fontWeight: '700',
                                alignItems: 'center',
                                color: Colors.primary,
                              },
                            ]}>
                            {item.productname}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#333',
                              fontWeight: '600',
                              textTransform: 'capitalize',
                              margin: 3,
                              fontSize: 13,
                              // marginBottom: 5,
                              // paddingTop: 10,
                              color: '#fff',
                            }}>
                            {item.productDetails}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </ScrollView>
                ),
              }}
            />
            <View style={{marginTop: 10}}>
              <AntDesign
                name="close"
                size={18}
                color="gray"
                onPress={() => {
                  close();
                }}
              />
            </View>
            {/* // </Index> */}
          </View>
        </View>
        <View>
          <Text
            style={{
              color: '#333',
              fontWeight: '700',
              fontSize: 20,
              paddingLeft: 20,
              marginTop: 15,
              paddingBottom: 5,
            }}>
            {trans('Products Category')}
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} vertical={true}>
          <View>
            <View style={{backgroundColor: Colors.secondary, paddingTop: 10}}>
              <View
                style={{
                  flex: 1,
                  // flexDirection: 'row',
                  alignItems: 'center',
                  // flexWrap: 'wrap',
                  justifyContent: 'center',
                }}>
               {AllProductCategory.map((res, index) => {
              const {categoryName = '', image = '', categoryid = ''} = res;
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        width: device_width * 0.95,
                        marginHorizontal: 10,
                        marginVertical: 5,
                        borderWidth: 1,
                        borderColor: Colors.primary,
                        borderRadius: 10,
                        elevation: 10,
                        backgroundColor: '#def',
                        alignItems: 'center',
                        paddingVertical: 5,
                        paddingHorizontal: 5,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}
                      onPress={() => {
                        navigation.navigate('ProductList', {
                          CategoryID: categoryid,
                          // ProductCategory: name,
                        });
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          paddingVertical: 5,
                          paddingHorizontal: 5,
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          // borderWidth:1,
                          width: device_width * 0.75,
                        }}>
                        <View
                          style={{
                            borderColor: Colors.primary,
                            borderWidth: 2,
                            backgroundColor: 'lightgrey',
                            // borderRadius: 10,
                          }}>
                          {/* {image != '' ? (
                            <Image
                              style={{
                                width: 75,
                                height: 75,
                                resizeMode: 'cover',
                                alignSelf: 'center',
                              }}
                              source={{uri: image}}
                            />
                          ) : ( */}
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
                          {/* ) */}
                          {/* } */}
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
                              fontWeight: '800',
                              color: Colors.primary,
                              fontSize: 18,
                            }}>
                            {categoryName}
                          </Text>
                        </View>
                      </View>
                      <MaterialIcons.Button
                        name="keyboard-arrow-right"
                        size={30}
                        backgroundColor={'#def'}
                        color={Colors.primary}
                        onPress={() => {
                          navigation.navigate('ProductList', {
                            CategoryID: categoryid,
                            // ProductCategory: name,
                          });
                        }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyStore;

const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;
const styles1 = StyleSheet.create({
  avatar_mm1: {
    // width: IsTabScreen ? screen_width / 10 : screen_width / 6.4,
    // height: IsTabScreen ? screen_width / 10 : screen_width / 6.4,
    width: screen_width / 6.4,
    height: screen_width / 6.4,
    // borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    // textAlign:'center',
    alignContent: 'center',
  },
  avatar_img: {
    width: 40,
    height: 40,
    borderRadius: 50,
    resizeMode: 'cover',
    alignSelf: 'center',
    // color:'red'
    // borderRadius: 45,
  },
  avatar_img1: {
    width: 60,
    height: 60,
    // borderRadius: 50,
    resizeMode: 'cover',
    alignSelf: 'center',
    // color:'red'
    // borderRadius: 45,
  },
});
