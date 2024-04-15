import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  StatusBar,
  ToastAndroid,
  Linking,
  Image,
  SafeAreaView,
  BackHandler,
  ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import {Modal} from 'react-native-paper';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {emailRegex, name_reg, phoneRegex} from '../../../constants/Constants';
import Colors from '../../../assets/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';
// import {createContactApi} from '../../redux/actions/Action';
import {device_height, device_width} from '../style';
import {useTranslation} from 'react-i18next';

import FastImage from 'react-native-fast-image';
import Header from '../CommonScreens/Header';
import {RootState} from '../../redux/store/Store';
import {
  selectStudentInfo,
  selectStudentStatus,
} from '../../redux/reducers/StudentInfoReducer';
import {useNavigation} from '@react-navigation/native';
import {createContactApi} from '../../redux/actions/createContactApi';
import {
  getyoutubelist,
  selectyoutube,
  selectyoutubeStatus,
} from '../../redux/reducers/youtubeReducer';

const YoutibeList = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const {t: trans, i18n} = useTranslation();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const youtubelist = useAppSelector(selectyoutube);
  const load = useAppSelector(selectyoutubeStatus);
  console.log(youtubelist, 'youtubelist.....');
  const l1 = youtubelist.map(r => r.snippet);
  console.log(l1, 'l1?????????????????????.thumbnails.high');

  useEffect(() => {
    dispatch(getyoutubelist());
    // CALLBACK(youtubelist)
    navigation.addListener('focus', () => {
      // dispatch(getyoutubelist())

      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.goBack();
        return true;
      });
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        navigation.goBack();
        return true;
      });
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{
          width: device_width,
          height: device_height,
          flex: 1,
          alignSelf: 'center',
        }}
        resizeMode="cover"
        source={require('../../../assets/0.png')}>
        <Header
          label1={trans('Youtubelist')}
          // label2={`{Std - ${stage}`}
          // label2={`${trans('Std')}-${stage}`}
          isbackIconShow={true}
          functionName={() => navigation.goBack()}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginHorizontal: 3}}>
          {l1.map((rec, idx) => {
            const {thumbnails = {}, resourceId = {}} = rec;
            let videoID = [resourceId];
            const l3 = videoID.map(r => r.videoId);

            console.log(l3, 'l3/////////');
            let thumb = [thumbnails];
            const l2 = thumb.map(r => r.high);
            return (
              <View key={idx}>
                {/* {thumbnails.map} */}
                {l2.map((record, indx) => {
                  const {url = ''} = record;
                  return (
                    <TouchableOpacity
                      key={indx}
                      onPress={() => {
                        navigation.navigate('Youtubevideo', {
                          recordLink: l3,
                        });
                      }}>
                      <ImageBackground
                        style={{
                          // borderRadius: 50,
                          // borderWidth: 1,
                          width: device_width * 0.94,
                          height: device_height * 0.3,
                          // borderRadius: 25,
                          flex: 1,
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                          marginVertical: 10,
                        }}
                        resizeMode="contain"
                        source={{
                          uri:
                            url != '' && url != null
                              ? url
                              : 'https://notevook.s3.ap-south-1.amazonaws.com/Adarsh/Notevook+NVA.png',
                        }}></ImageBackground>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default YoutibeList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },

  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
  },
  textArea: {
    height: 110,
    justifyContent: 'flex-start',
  },
  text_footer: {
    color: '#FFB901',
    fontSize: 15,
    fontWeight: 'bold',
  },
  action: {
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -5,
    marginBottom: Platform.OS === 'ios' ? 0 : -15,
    paddingLeft: 10,
    color: '#fff',
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
