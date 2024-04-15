import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Picker,
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
  RefreshControl,
  BackHandler,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import {FABGroup} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  changeIsoDateToLocaldate,
  emailRegex,
  name_reg,
  phoneRegex,
} from '../../../constants/Constants';
import Colors from '../../../assets/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';
import {
  createContactApi,
  getChildDetailsAPI,
  getLiveClassDetailsAPI,
  getScholarshipByClassAPI,
  getScholarshipPremiumAPI,
  updateZoomUrl,
} from '../../redux/actions/Action';
import {device_height, device_width} from '../style';
import colors from '../../../constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AntDesign from 'react-native-vector-icons/AntDesign';

import {useTranslation} from 'react-i18next';
import {AuthContext} from '../../../context';

import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {tRenderEngineProviderPropTypes} from 'react-native-render-html/lib/typescript/TRenderEngineProvider';
import YoutubePlayer from 'react-native-youtube-iframe';

import {useNavigation} from '@react-navigation/native';
import Header from '../CommonScreens/Header';

// import {Icon} from 'react-native-elements';
const Youtubevideo = ({route}) => {
  const {t: trans, i18n} = useTranslation();
  const navigation = useNavigation();

  const {recordLink = ''} = route.params;
  console.log(recordLink, 'recordLink..................');

  // let recordLinkData = recordLink.split('v=')[1].split('&')[0];
  // console.log(recordLinkData, 'recordLinkData.............');

  const [playing, setPlaying] = useState(false);
  const [isMute, setMute] = useState(false);
  const controlRef = useRef();
  const onStateChange = state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
    if (state !== 'playing') {
      setPlaying(false);
    }
  };
  const togglePlaying = () => {
    setPlaying(prev => !prev);
  };
  const seekBackAndForth = control => {
    console.log('currentTime');
    controlRef.current?.getCurrentTime().then(currentTime => {
      control === 'forward'
        ? controlRef.current?.seekTo(currentTime + 15, true)
        : controlRef.current?.seekTo(currentTime - 15, true);
    });
  };
  const muteVideo = () => setMute(!isMute);
  const ControlIcon = ({name, onPress}) => (
    <Icon onPress={onPress} name={name} size={40} color="#fff" />
  );
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
          label1={trans('Recorded Class')}
          label2={
            <MaterialCommunityIcons
              size={32}
              name="human-male-board"
              color={'#fff'}
              style={{alignSelf: 'center'}}
            />
          }
          // label2={`${trans('Std')}-${stage}`}
          isbackIconShow={true}
          functionName={() => navigation.goBack()}
        />
        {/* <Header
          label1={'Youtubelist'}
          // label2={`{Std - ${stage}`}
          // label2={`${trans('Std')}-${stage}`}
          isbackIconShow={true}
          functionName={() => navigation.goBack()}
        /> */}
        <View
          style={{
            flex: 1,
            // backgroundColor: '#222',
            alignSelf: 'center',
            // alignItems: 'center',
            justifyContent: 'center',
            height: device_height * 0.9,
            width: device_width,
            paddingHorizontal: 5,
          }}>
          <YoutubePlayer
            height={300}
            ref={controlRef}
            play={true}
            mute={isMute}
            videoId={recordLink[0]}
            onChangeState={onStateChange}
          />
        </View>
        {/* <View style={styles.controlContainer}> */}
        {/* <ControlIcon
          onPress={() => seekBackAndForth('rewind')}
          name="skip-previous"
        /> */}
        {/* <ControlIcon
          onPress={togglePlaying}
          name={playing ? 'pause' : 'play-arrow'}
        />
        <ControlIcon
          onPress={() => seekBackAndForth('forward')}
          name="skip-next"
        /> */}
        {/* </View> */}
        {/* <ControlIcon
        onPress={muteVideo}
        name={isMute ? 'volume-up' : 'volume-off'}
      /> */}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Youtubevideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.secondary,
  },
  controlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
