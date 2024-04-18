import React, {useState} from 'react';

//import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  Image,
  ImageBackground
} from 'react-native';
import Colors from '../../../assets/Colors';
import { device_height, device_width } from '../style';

const LoadingScreen = ({flag}) => {
  const [loading, setLoading] = useState(flag);

  return (
    <SafeAreaView style={{flex: 1,}}>
     <ImageBackground
        style={{
          // borderRadius: 50,
          // borderWidth: 1,
          width: device_width,
          height: device_height,
          // borderRadius: 25,
          flex: 1,
          alignSelf: 'center',
          // justifyContent: 'center',
          // alignItems: 'center',
        }}
        resizeMode="cover"
        // source={require('../../../assets/0.png')}
        >

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          // backgroundColor: '#eaeef2',
          alignItems: 'center',
        }}>
        {/* <Image
          source={{
            // uri: 'https://img.freepik.com/premium-vector/man-with-laptop-education-working-concept_113065-223.jpg',
            uri: 'https://img.freepik.com/free-photo/front-view-stacked-books-graduation-cap-ladders-education-day_23-2149241014.jpg',
          }}
          style={{
            borderBottomRightRadius: 50,
            height: device_height*0.5,
            width: device_width,
          }}
          resizeMode="contain"
        /> */}
        {loading ? (
          <ActivityIndicator
            size={'large'}
            color={'crimson'}
            //visibility of Overlay Loading Spinner
            visible={loading}
            //Text with the Spinner
            textContent={'Loading...'}
            //Text style of the Spinner Text
            textStyle={styles.spinnerTextStyle}
          />
        ) : (
          <></>
        )}
      </View>
        </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  spinnerTextStyle: {
    color: Colors.primary,
  },
});

export default LoadingScreen;
