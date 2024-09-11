import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Colors from '../../../assets/Colors';
import {Avatar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ImageBackground } from 'react-native';
import { device_height, device_width } from '../style';

const UpdateModal = ({
  visible,
  height,
  width,
  version,
  backgroundColor,
  heading,
  onpressyes,
  onpressno,
  isIconVisible = true,
  yesBtnLabel = '',
  isYesBtnVisible = true,
  isNoBtnVisible = true,
  appVersion = false,
}) => {
  const {t: trans, i18n} = useTranslation();

  return (
    <Modal transparent={true} visible={visible}>
    <ImageBackground
        style={{
          width: device_width,
          height: device_height,
          flex: 1,
          alignSelf: 'center',
        }}
        resizeMode="cover"
        source={require('../../../assets/0.png')}>
      <View
        style={{
          backgroundColor: '#000000aa',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            borderRadius: 10,
            height: height,
            width: width,
            backgroundColor: '#0f6f25',
            borderColor:'#FFB901',
            borderWidth:1,
            // alignItems: 'center',
            justifyContent: 'center',
          }}>
          {isIconVisible && (
            <MaterialCommunityIcons
              size={30}
              name="emoticon-sad"
              color={'#fff'}
              style={{alignSelf: 'center', marginTop: 10}}
            />
          )}
          {appVersion && (
            <View>
              {/* <TouchableOpacity onPress={onpressno}>
                <AntDesign
                  name="closecircleo"
                  style={{
                    fontSize: 28,
                    color: '#fff',
                    position: 'absolute',
                    // top: 10,
                    right: 10,
                    // marginTop: 10,
                    backgroundColor: 'crimson',
                    borderRadius: 50,
                  }}
               
                />
              </TouchableOpacity> */}
              <View style={{flexDirection: 'column', alignItems: 'center',marginTop:10}}>
                <View
                  style={{
                    borderWidth: 1.5,
                    borderColor: Colors.primary,
                    borderRadius: 50,
                    // padding: 5,
                  }}>
                  <Avatar.Image
                    source={require('../../../assets/IQ.jpg')}
                    // source={{
                    //   uri: "https://wkresources.s3.ap-south-1.amazonaws.com/clinic-icon.png",
                    // }}
                    size={65}
                    // resizeMode={'contain'}
                    style={{
                      resizeMode: 'contain',
                    }}
                  />
                </View>
                <Text style={{color: '#fff', fontWeight: '600'}}>
                  {trans('New Version')} {version} {trans('is Available')}
                </Text>
              </View>
            </View>
          )}
          <Text
            style={{
              fontSize: 15,
              color: '#fff',
              alignSelf: 'center',
              margin: 10,
              fontWeight: '700',
            }}>
            {heading}
          </Text>
          {appVersion && (
            <TouchableOpacity onPress={onpressyes}>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Ionicons
                  style={{color:'#FFB901'}}
                  name="logo-google-playstore"
                  size={25}
                />
                <Text
                  style={{
                    color: '#FFB901',
                    fontWeight: '700',
                    textDecorationLine: 'underline',
                  }}>
                  {trans('Update from PlayStore')}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {/* <Button title='OK' onPress={onpress}></Button> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              margin: 20,
            }}>
            {isYesBtnVisible && (
              <TouchableOpacity
                onPress={onpressyes}
                style={[styles.buttons, {backgroundColor: Colors.green}]}>
                <Text
                  style={{
                    alignItems: 'center',
                    color: Colors.white,
                    alignSelf: 'center',
                  }}>
                  {yesBtnLabel != '' ? yesBtnLabel : 'Yes'}
                </Text>
              </TouchableOpacity>
            )}
            {isNoBtnVisible && (
              <TouchableOpacity
                onPress={onpressno}
                style={[styles.buttons, {backgroundColor: Colors.red}]}>
                <Text
                  style={{
                    alignItems: 'center',
                    color: Colors.white,
                    alignSelf: 'center',
                  }}>
                  No
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
        </ImageBackground>
    </Modal>
  );
};

export default UpdateModal;

const styles = StyleSheet.create({
  buttons: {
    height: 30,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
