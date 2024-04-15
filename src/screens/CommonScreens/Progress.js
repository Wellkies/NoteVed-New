import {View, Text, TouchableOpacity, Animated, ScrollView} from 'react-native';
import React, {useRef, useState} from 'react';
const Progress = ({selectedStep = 1, progress1, progress2}) => {
  return (
    <View>
      <ScrollView
        horizontal={true}
        showsVerticalScrollIndicator={false}
        justifyContent={'center'}
        height={100}
        style={{borderWidth: 2}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            //   padding: 20,
            // width: '100%',
            alignItems: 'center',
            padding: 20,
            // position: 'absolute',
            top: 0,
          }}>
          <View>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: selectedStep > 0 ? 'green' : '#ccc',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff'}}>1</Text>
            </View>
            <Text style={{color: '#333'}}>Low</Text>
          </View>
          <View>
            <View
              style={{
                height: 5,
                width: 50,
                backgroundColor: '#ccc',
              }}></View>
            <Text style={{color: '#333'}}></Text>
          </View>
          <View>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,

                backgroundColor: selectedStep > 1 ? 'green' : '#ccc',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff'}}>2</Text>
            </View>
            <Text style={{color: '#333'}}>Mid</Text>
          </View>
          <View>
            <View
              style={{
                height: 5,
                width: 50,
                backgroundColor: '#ccc',
              }}></View>
            <Text style={{color: '#333'}}></Text>
          </View>
          <View>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: selectedStep > 2 ? 'green' : '#ccc',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff'}}>3</Text>
            </View>
            <Text style={{color: '#333'}}>High</Text>
          </View>
          {/* <View
          style={{
            width: 50,
            height: 5,
            backgroundColor: '#ccc',
          }}></View>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: selectedStep > 3 ? 'green' : '#ccc',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>4</Text>
        </View> */}
        </View>

        <View
          style={{
            // display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            //   padding: 20,
            //   paddingTop:30,
            // width: '100%',
            alignItems: 'center',
            padding: 20,
            paddingTop: 30,
            position: 'absolute',
            // position:'relative'
            top: 0,
          }}>
          <Animated.View
            style={{
              height: 6,
              width: progress1,
              marginLeft: 28,
              backgroundColor: 'green',
            }}></Animated.View>

          <Animated.View
            style={{
              height: 6,
              width: progress2,
              marginLeft: 20,
              backgroundColor: 'green',
            }}></Animated.View>
          {/* <Animated.View
          style={{
            height: 6,
            width: progress3,
            marginLeft: 20,
            backgroundColor: 'green',
          }}></Animated.View> */}
        </View>
      </ScrollView>
      {/* <TouchableOpacity
        style={{
          marginTop: 100,
          height: 50,
          width: 200,
          backgroundColor: 'orange',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          alignSelf: 'center',
        }}
        onPress={() => {
          if (selectedStep == 1) {
            start1();
          }
          if (selectedStep == 2) {
            start2();
            console.log("clicked")
          }
          //   if (selectedStep == 3) {
          //     start3();
          //   }
          if (selectedStep == 0) {
            setSelectedStep(selectedStep + 1);
          } else {
            setTimeout(() => {
              setSelectedStep(selectedStep + 1);
            }, 2000);
          }
        }}>
        <Text>Next Step</Text>
      </TouchableOpacity> */}
    </View>
  );
};
export default Progress;
