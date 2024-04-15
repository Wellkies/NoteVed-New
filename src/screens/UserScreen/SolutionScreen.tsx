import {View, Text, ScrollView, SafeAreaView,ImageBackground} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {device_height, device_width} from '../style';
import {BackHandler} from 'react-native';
import {useWindowDimensions} from 'react-native';
import WebView from 'react-native-webview';

import Colors from '../../../assets/Colors';
import {useTranslation} from 'react-i18next';
import Header from '../CommonScreens/Header';


const SolutionScreen = ({navigation, route}) => {
  const {solution = ''} = route.params;
  // function handleBackButtonClick() {
  //   navigation.goBack();
  //   return true;
  // }
  const {t: trans, i18n} = useTranslation();

  useEffect(() => {
    navigation.addListener('focus', () => {
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

  const {width} = useWindowDimensions();
  // console.log(solution, 'solution-------');
  const solutionData = solution != '' ? JSON.parse(solution) : '';
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
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
        label1={trans('Solution')}
        // label2={`{Std - ${stage}`}
        // label2={`${trans('Std')}-${stage}`}
        isbackIconShow={true}
        functionName={() => navigation.goBack()}
      />
      <ScrollView
        style={{
          flex: 1,
          // paddingBottom: 300,
          paddingHorizontal: 10,
          backgroundColor: Colors.secondary,
        }}>
        {/* <RenderHtml
        contentWidth={width}
        source={{
          html: `
          ${solution}
          `,
        }}
      /> */}
        {/* <WebView style={{flex:1,color:'#333',borderWidth:1,height:device_height}} originWhitelist={['*']} source={{html: '<p>Here I am</p>'}} /> */}
        {/* <WebView
        style={{flex: 1, color: '#333', borderWidth: 1, height: device_height,fontSize:'18'}}
        originWhitelist={['*']}
        source={{
          html: "<table  style='border: 1px solid black,font-size:20px'><tr style='border: 1px solid black'><th style='border: 1px solid black'>Name</th></tr><tr style='border: 1px solid black'><td style='border: 1px solid black'>John</td></tr><tr style='border: 1px solid black'><td style='border: 1px solid black'>Elsa</td></tr</table>"
        }}
      /> */}

        <View
          style={{
            padding: 20,
            color: '#333',
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            fontSize: '38',
            // backgroundColor:Colors.secondary,
            backgroundColor: '#fff',
          }}>
          <WebView
            style={{
              flex: 1,
              minHeight: device_height,
            }}
            originWhitelist={['*']}
            source={{
              html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><p>${solutionData}</p></body></html>`,
            }}
          />
          {/* <WebView
            style={{
              flex: 1,
              height: device_height,
            }}
            originWhitelist={['*']}
            source={{
              html: `${solutionData}`,
            }}
          /> */}
        </View>
      </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SolutionScreen;
