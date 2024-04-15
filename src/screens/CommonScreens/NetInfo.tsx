import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  Alert,
  ScrollView,
  SafeAreaView,
  ToastAndroid,
  Animated,
  ImageBackground
} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNetInfo } from '@react-native-community/netinfo';
import * as Animatable from 'react-native-animatable';
import { useTranslation } from 'react-i18next';
import { device_height, device_width } from '../style';

interface NetInfoProps { }

const NetInfo: React.FC<NetInfoProps> = props => {
  const netInfo = useNetInfo();
  const { t: trans, i18n } = useTranslation();
  const [rotateAnim] = useState(new Animated.Value(0));

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle = {
    transform: [
      {
        rotate: rotateInterpolate,
      },
    ],
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ImageBackground
        style={{
          width: device_width,
          height: device_height,
          flex: 1,
          alignSelf: 'center',
          alignItems:'center',
          justifyContent:'center'
        }}
        resizeMode="cover"
        source={require('../../../assets/0.png')}>
        <View
          style={{
            borderRadius: 15,
          }}>
          {netInfo?.isConnected ? (
            <></>
          ) : (
            <>
              <StatusBar backgroundColor={'#263d2d'} barStyle="light-content" />
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <MaterialCommunityIcons
                  size={90}
                  name="wifi-off"
                  color="darkorange"
                  style={{ alignSelf: 'center' }}
                />
              </View>
            </>
          )}

          <Text
            style={{
              marginTop: 0,
              color: netInfo?.isConnected ? 'green' : 'darkorange',
              paddingVertical: 5,
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: netInfo?.isConnected ? 15 : 15,
            }}>
            {netInfo?.isConnected
              ? ''
              : trans('Uh Oh! It looks like you lost your internet connection!')}
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: device_height * 0.25,
            width: device_width,
            justifyContent: 'flex-start',
          }}>
          {/* <FastImage
          style={{
            height: device_height * 0.25,
            width: device_width,
            position: 'absolute',
            bottom: 0,
          }}
          source={require('../../../assets/jungle.png')}
          resizeMode="contain"
        /> */}
        </View>
      </ImageBackground>
    </View>
  );
};

export default NetInfo;
// <>
//   <Text>HIII ney</Text>
// </>
