import {
  View,
  Text,
  ActivityIndicator,
  BackHandler,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Video from 'react-native-video';
import { device_height, device_width } from '../style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
import Header from '../CommonScreens/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../assets/Colors';
import { useNavigation } from '@react-navigation/native';

const IntroVideoScreen = ({ route }) => {
  const navigation = useNavigation();

  const [clicked, setClicked] = useState(false);
  const [puased, setPaused] = useState(false);
  const [progress, setProgress] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  const ref = useRef();
  const format = (seconds: any) => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const { url = '' } = route.params;
  console.log(url, '==============url route.params');

  const { t: trans, i18n } = useTranslation();
  const videoRef = useRef(null);
  const [opacity, setOpacity] = useState(0);
  const [error, setError] = useState('');
  // const onBuffer = e => {
  //
  // };
  const onLoadStart = () => {
    // this.setState({opacity: 1});
    setOpacity(1);
  };

  const onLoad = () => {
    setOpacity(0);
  };

  const onBuffer = ({ isBuffering }) => {
    // console.log(isBuffering, '=============isBuffering');
    setOpacity(isBuffering ? 1 : 0);
  };
  const onError = meta => {
    const {
      error: { code },
    } = meta;
    let error = 'An error occurred playing this video';
    switch (code) {
      case -11800:
        error = 'Could not load video from URL.';
        break;
    }
    setError(error);
    setOpacity(0);
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.goBack();
        Orientation.lockToPortrait();
        setFullScreen(false);
        return true;
      });
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        navigation.goBack();
        Orientation.lockToPortrait();
        setFullScreen(false);
        return true;
      });
    };
  }, []);

  // const youtubeLink = 'https://youtu.be/04F_c2r8aRI';
  // const videourl =
  //   'https://wkresources.s3.ap-south-1.amazonaws.com/1689250418158_543971992.mp4';
  //   const videoFileURL= URL.createObjectURL(youtubeLink)
  //
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#222',
        // alignItems: 'center',
        // justifyContent: 'center',
      }}>
      {!fullScreen && (
        <Header
          label1={trans('Video Screen')}
          isbackIconShow={true}
          functionName={() => {
            navigation.goBack();
          }}
        />
      )}

      {opacity == 1 || error ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: device_height * 0.95,
            width: device_width,
            // width: fullScreen ? '100%' : device_width,
            // height: fullScreen ? '100%' : device_height,
            marginBottom: 350,
            // backgroundColor: '#222',
            // flex:1.5
          }}>
          {opacity == 1 ? (
            <>
              <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <ImageBackground
                  style={{
                    // borderRadius: 50,
                    // borderWidth: 1,
                    width: device_width * 0.94,
                    height: device_height,
                    borderRadius: 25,
                    flex: 1,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                  }}
                  resizeMode="contain"
                  source={require('../../../assets/intro.png')}
                // source={{
                //   uri: 'https://notevook.s3.ap-south-1.amazonaws.com/Adarsh/Notevook+NVA.png',
                // }}
                >
                  <ActivityIndicator
                    animating
                    size="large"
                    color={Colors.primary}
                    style={{
                      opacity: opacity,
                      height: device_height,
                      width: device_width,
                    }}
                  />
                </ImageBackground>
              </View>
            </>
          ) : error ? (
            <View
              style={{
                padding: 30,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderWidth: 2,
                width: device_width,
                borderRadius: 10,
              }}>
              <FontAwesome5 name="exclamation-triangle" size={30} color="red" />
              <Text color={Colors.cornsilk}>{error}</Text>
            </View>
          ) : (
            <></>
          )}
        </View>
      ) : (
        <>
          {/* ):<></>} */}
          {/* <Video
          ref={videoRef}
          controls={true}
          repeat={true}
          volume={5}
          muted={false}
          onBuffer={onBuffer}
          onError={onError}
          fullscreenOrientation={'landscape'}
          onLoadStart={onLoadStart}
          onLoad={onLoad}
          // onLoad={() => {
          //   setLoading(true);
          // }}
          // onEnd={() => {
          //   setLoading(false);
          // }}
          // source={{
          //   uri: 'https://www.youtube.com/watch?v=ITOXb8K74is&ab_channel=AAtoonsKids',
          // }} // Can be a URL or a local file.
          // source={require('../../../assets/Record.mp4')}
          source={{uri: url}}
          // source={{uri: youtubeLink}}
          resizeMode={'contain'}
          // ref={ref => {
          //   this.player = ref;
          // }} // Store reference
          // onBuffer={this.onBuffer} // Callback when remote video is buffering
          // onError={this.videoError} // Callback when video cannot be loaded
          // style={styles.backgroundVideo}
          style={{
            backgroundColor: '#333',
            height: device_height * 0.85,
            width: device_width * 0.98,
            // position: 'relative',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        /> */}
        </>
      )}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          height: device_height,
          width: device_width,
        }}
        onStartShouldSetResponder={() => {
          setClicked(true);
          setTimeout(() => setClicked(false), 2500);
        }}>
        <TouchableOpacity
          style={{
            width: device_width,
            // height: fullScreen ? '100%' : 250,
            height: device_height * 0.9,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setClicked(true);
            setTimeout(() => setClicked(false), 2500);
          }}>
          <Video
            paused={puased}
            source={{
              uri: url,
            }}
            ref={ref}
            onProgress={x => {
              setProgress(x);
            }}
            repeat={true}
            volume={5}
            onBuffer={onBuffer}
            onError={onError}
            // fullscreenOrientation={'landscape'}
            // fullscreenOrientation={'Portrait'}
            onLoadStart={onLoadStart}
            onLoad={onLoad}
            // Can be a URL or a local file.
            //  ref={(ref) => {
            //    this.player = ref
            //  }}                                      // Store reference
            //  onBuffer={this.onBuffer}                // Callback when remote video is buffering
            //  onError={this.videoError}

            // Callback when video cannot be loaded
            muted={false}
            // style={{width: '100%', height: fullScreen ? '100%' : 215}}
            style={{ width: device_width, height: device_height * 0.9 }}
            resizeMode="contain"
          />

          {clicked && (
            <TouchableOpacity
              style={{
                width: device_width,
                height: device_height * 0.9,
                flex: 1,
                position: 'absolute',
                backgroundColor: 'rgba(0,0,0,.5)',
                // justifyContent: 'flex-end',
                // alignItems: 'center',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  // flex: 1,
                  // display: 'flex',
                }}>
                <TouchableOpacity
                  style={{ width: 45, height: 45, tintColor: 'white' }}
                  onPress={() => {
                    ref.current.seek(parseInt(progress.currentTime) - 10);
                  }}>
                  <MaterialIcons name="replay-10" color={'#fff'} size={40} />
                  {/* <Image
                        source={require('../../../assets/icons/backward.png')}
                        style={{width: 30, height: 30, tintColor: 'white'}}
                      /> */}
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: fullScreen ? 150 : 50,
                    // flex: 1,
                    // display: 'flex',
                  }}
                  onPress={() => {
                    setPaused(!puased);
                  }}>
                  <Image
                    source={
                      puased
                        ? require('../../../assets/icons/play-button.png')
                        : require('../../../assets/icons/pause.png')
                    }
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: 'white',
                      // marginLeft: 50,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ width: 45, height: 45, tintColor: 'white' }}
                  onPress={() => {
                    ref.current.seek(parseInt(progress.currentTime) + 10);
                  }}>
                  <MaterialIcons name="forward-10" color={'#fff'} size={40} />
                  {/* <Image
                        source={require('../../../assets/icons/forward.png')}
                        style={{
                          width: 30,
                          height: 30,
                          tintColor: 'white',
                          marginLeft: 50,
                        }}
                      /> */}
                </TouchableOpacity>
              </View>
              {progress != null && (
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    position: 'absolute',
                    bottom: 30,
                    paddingLeft: 20,
                    paddingRight: 20,
                    alignItems: 'center',
                  }}>
                  <Text style={{ color: 'white' }}>
                    {format(progress.currentTime)}
                  </Text>

                  <Slider
                    style={{ width: '80%', height: 40 }}
                    minimumValue={0}
                    maximumValue={progress.seekableDuration}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#fff"
                    value={progress.currentTime}
                    onValueChange={x => {
                      ref.current.seek(x);
                    }}
                  />

                  <Text style={{ color: 'white' }}>
                    {format(progress.seekableDuration)}
                  </Text>
                </View>
              )}
              {/* <View
                style={{
                  width: '100%',
                  // flexDirection: 'row',
                  // justifyContent: 'space-between',
                  position: 'absolute',
                  bottom: 10,
                  right: 20,
                  // paddingLeft: 20,
                  // paddingRight: 20,
                  alignItems: 'flex-end',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (fullScreen) {
                      Orientation.lockToPortrait();
                    } else {
                      Orientation.lockToLandscape();
                    }
                    setFullScreen(!fullScreen);
                  }}>
                  <Image
                    source={
                      fullScreen
                        ? require('../../../assets/icons/minimize.png')
                        : require('../../../assets/icons/full-size.png')
                    }
                    style={{width: 20, height: 20, tintColor: 'white'}}
                  />
                </TouchableOpacity>
              </View> */}
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default IntroVideoScreen;
