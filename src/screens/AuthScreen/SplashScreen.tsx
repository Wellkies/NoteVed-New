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
  BackHandler,
  Dimensions,
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
  const device_width = Dimensions.get('window').width;
  const device_height = Dimensions.get('window').height;
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const {t: trans, i18n} = useTranslation();
  const count = useAppSelector(selectCount);
  const userData = useAppSelector(selectUserInfo);

  interface type {
    language: string;
  }

  const selectedLanguage = useAppSelector(selectStudentLanguage);

  const [incrementAmount, setIncrementAmount] = useState('2');
  const [phone, setPhone] = useState('9668857601');
  const [password, setPassword] = useState('123456');

  const [language, setLanguages] = useState([
    {name: 'ଓଡିଆ', code: 'odia', isSelected: selectedLanguage === 'odia'},
    {
      name: 'English',
      code: 'english',
      isSelected: selectedLanguage === 'english',
    },
  ]);
  const navigation = useNavigation();
  const loginFun = () => {
    const data = {phone: phone, password: password};
    dispatch(fetchUserAsync(Object(data) || {}));
  };
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      const {width, height} = window;
      setOrientation(height >= width ? 'portrait' : 'landscape');
    });
    console.log(orientation, 'Orientation');
    return () => subscription?.remove();
  }, [orientation]);
  useEffect(() => {
    dispatch(setLanguage(selectedLanguage));
    if (selectedLanguage == '') {
      dispatch(setLanguage('english'));
    }
  }, [language]);
  const data = [
    require('../../../assets/skill1.jpg'),
    require('../../../assets/skill2.jpg'),
    require('../../../assets/skill3.jpg'),
    require('../../../assets/skill4.jpg'),
  ];
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);
  const renderItem = ({item}) => (
    <FastImage
      style={{
        width: device_width,
        height: '100%',
        flex: 1,
      }}
      source={item}
      resizeMode="contain"
    />
  );
  useEffect(() => {
    navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', () => {
        BackHandler.exitApp();
        return true;
      });
    });
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={'#FFFFFF'} barStyle="light-content" />
      {/* <ImageBackground
        style={{
          width: device_width,
          height: device_height,
          flex: 1,
          alignSelf: 'center',
          backgroundColor:'#FFFFFF'
        }}
        resizeMode="cover" */}
      {/* //source={require('../../../assets/0.png')} */}
      {/* > */}
      <View
        style={{
          justifyContent: 'space-evenly',
          width: device_width,
          height: device_height,
          flex: 1,
          //alignSelf: 'center',
          backgroundColor: '#FFFFFF',
        }}>
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
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: '#1F8434',
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
        <View
          style={{
            height: device_height * 0.1,
            width: device_width,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              dispatch(setLanguage(selectedLanguage));
              navigation.navigate('SelectUserScreen', {
                language: selectedLanguage,
              });
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: device_width * 0.8,
              backgroundColor: '#ffff',
              borderRadius: 20,
              borderWidth: 2,
              borderColor: '#f1a722',
              flexDirection: 'row',
              paddingVertical: 10,
            }}>
            <Text style={{fontWeight: '700', fontSize: 15, color: 'green'}}>
              {'Get Started'}
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={25}
              color={'green'}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
