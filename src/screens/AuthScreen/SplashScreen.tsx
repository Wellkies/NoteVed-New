import React, {useState, useEffect, useRef} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../redux/store/Store';
import {Avatar, Chip} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  selectCount,
} from '../../redux/reducers/demoReducers';
import {
  fetchUserAsync,
  selectUserInfo,
} from '../../redux/reducers/loginReducer';
// import {selectedLang} from '../redux/reducers/languageReducer'
import Icon from 'react-native-vector-icons/Entypo';
import FastImage from 'react-native-fast-image';
import {device_height, device_width} from '../style';
import Colors from '../../../assets/Colors';
import {useNavigation} from '@react-navigation/native';
import {
  selectStudentLanguage,
  setLanguage,
} from '../../redux/reducers/languageReducer';
import {useTranslation} from 'react-i18next';
import {IsTabScreen} from '../../../constants/Constants';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const SplashScreen = () => {
  const dispatch = useDispatch<any>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const {t: trans, i18n} = useTranslation();
  const count = useAppSelector(selectCount);
  const userData = useAppSelector(selectUserInfo);

  interface type {
    language: string;
  }

  const selectedLanguage = useAppSelector(selectStudentLanguage);
  console.log(selectedLanguage, '==============selectedLanguage');

  // const selectedLanguage = useAppSelector(selectedLang)
  const [incrementAmount, setIncrementAmount] = useState('2');
  const [phone, setPhone] = useState('9668857601');
  const [password, setPassword] = useState('123456');

  const [language, setLanguages] = useState([
    // {name: 'हिंदी', code: 'hi', isSelected: selectedLanguage === 'hindi'},
    {name: 'ଓଡିଆ', code: 'odia', isSelected: selectedLanguage === 'odia'},
    {
      name: 'English',
      code: 'english',
      isSelected: selectedLanguage === 'english',
    },
    //  {name: 'हिंदी', code: 'hindi', isSelected: selectedLanguage === 'hindi'},
  ]);
  console.log(language, 'language///////////////');
  // The `state` arg is correctly typed as `RootState` already
  // const count = useAppSelector(selectCount);
  // const status = useAppSelector(state => state.counter.status);
  // const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const loginFun = () => {
    const data = {phone: phone, password: password};
    dispatch(fetchUserAsync(Object(data) || {}));
  };
  useEffect(() => {
    dispatch(setLanguage(selectedLanguage));
    if (selectedLanguage == '') {
      dispatch(setLanguage('english'));
    }
  }, [language]);
  const data = [
    'https://wkresources.s3.ap-south-1.amazonaws.com/1711375669645_348037080.png',
    'https://wkresources.s3.ap-south-1.amazonaws.com/1711375694585_76334385.png',
    'https://wkresources.s3.ap-south-1.amazonaws.com/1711375713290_21045758.png',
    'https://wkresources.s3.ap-south-1.amazonaws.com/1711375736090_576690145.png',
  ];
  console.log(data.length, '@data.length');
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);
  const renderItem = ({item}) => (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        height: device_height * 0.49,
        width: device_width,
        borderRadius: 10,
        padding: 5,
        //marginTop: 10,
        //marginRight: 20,
      }}>
      <FastImage
        style={{
          borderRadius: 15,
          height: device_height * 0.50,
          width: device_width * 0.93,
        }}
        source={{uri: item}}
        resizeMode={IsTabScreen ? 'contain' : 'cover'}
      />
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={'#263d2d'} barStyle="light-content" />
      <ImageBackground
        style={{
          width: device_width,
          height: device_height,
          flex: 1,
          alignSelf: 'center',
          //backgroundColor: '#404040'
        }}
        resizeMode="cover"
        source={require('../../../assets/0.png')}>
        <View
          style={{
            // height: device_height,
            // width: device_width * 0.98,
            alignSelf: 'center',
          }}>
          <View style={{
            height:device_height * 0.30,
            justifyContent: 'center',
          }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                color: '#f1a722',
                textAlign: 'center',
             marginTop:20
                // marginTop: IsTabScreen ? -10 : -15,
              }}>
              {'A Product of Noteved Siksha Sandhan Pvt. Ltd.'}
            </Text>
            <View
              style={{
                alignItems: 'center',
                marginHorizontal: 10,
                // marginTop: IsTabScreen ? -5 : -35,
                // borderWidth:1
              }}>
              <Text style={{fontWeight: '900', fontSize: 35, color: '#fff'}}>
                {'NOTEVED'}
              </Text>
            </View>
          </View>
          {/* )} */}
          <View
            //style={{borderWidth: 0}}
            //persistentScrollbar={true}
            //showsVerticalScrollIndicator={true}
          >
            <View>
              <Carousel
                ref={carouselRef}
                data={data}
                renderItem={renderItem}
                sliderWidth={device_width}
                itemWidth={device_width}
                autoplay={true}
                autoplayInterval={5000}
                loop={true}
                onSnapToItem={index => setActiveSlide(index)}
              />
              <Pagination
                dotsLength={data.length}
                activeDotIndex={activeSlide}
                carouselRef={carouselRef}
                tappableDots={true}
                containerStyle={{paddingVertical: 10}} 
                dotStyle={{
                  // Style for each dot
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor:
                    'rgba(255, 255, 255, 0.8)',
                }}
                inactiveDotOpacity={0.4} // Opacity for inactive dots
                inactiveDotScale={0.6} // Scale for inactive dots
                inactiveDotStyle={styles.inactiveDot}
              />
            </View>
            <View
              style={{
                height: device_height * 0.33,
                width: device_width,
                justifyContent: 'flex-start',
                marginTop: 30,
              }}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(setLanguage(selectedLanguage));
                  navigation.navigate('SignInScreen', {
                    language: selectedLanguage,
                  });
                }}
                style={{
                  zIndex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  width: '60%',
                  marginHorizontal: 10,
                  flexDirection: 'row',
                  backgroundColor: '#ffff',
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: '#f1a722',
                }}>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    borderRadius: 15,
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                  }}
                  onPress={() => {
                    dispatch(setLanguage(selectedLanguage));
                    navigation.navigate('SignInScreen', {
                      language: selectedLanguage,
                    });
                  }}>
                  <Text
                    style={{fontWeight: '700', fontSize: 14, color: 'green'}}>
                    {'Get Started'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setLanguage(selectedLanguage));
                    navigation.navigate('SignInScreen', {
                      language: selectedLanguage,
                    });
                  }}>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={25}
                    color={'green'}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
            {/* </ImageBackground> */}
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // item: {
  //   backgroundColor: 'lightgray',
  //   borderRadius: 8,
  //   height: 200,
  //   padding: 50,
  //   marginLeft: 25,
  //   marginRight: 25,
  // },
  // title: {
  //   fontSize: 20,
  // },
  paginationContainer: {
    paddingVertical: 8,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: '#FFFFFF',
  },
  inactiveDot: {
    backgroundColor: 'gray',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});

export default SplashScreen;
