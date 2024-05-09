import React, {useRef, useEffect, useState} from 'react';
import {Text, View, Button, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import {device_height, device_width} from '../style';
import Modal from 'react-native-modal';

const LevelCompleted = () => {
  const animationRef = useRef(null);
  const [showAnimation, setShowAnimation] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();

      const timeout = setTimeout(() => {
        setShowAnimation(false);
        setShowModal(true);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginHorizontal: 10,
        marginVertical: 20,
        position: 'absolute',
      }}>
      {showAnimation && (
        <LottieView
          ref={animationRef}
          style={{width: device_width, height: device_height}}
          source={require('../../../assets/greetings.json')}
        />
      )}
      <Modal
        isVisible={showModal}
        animationIn={'bounceInDown'}
        animationOut={'bounceOutDown'}
        animationInTiming={50}
        animationOutTiming={50}
        hideModalContentWhileAnimating={true}
        backdropTransitionInTiming={50}
        backdropTransitionOutTiming={50}
        onBackdropPress={() => setShowModal(false)}
        onBackButtonPress={() => setShowModal(false)}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 30,
              borderRadius: 10,
            }}>
            <Text style={{marginBottom: 20, fontSize: 18, fontWeight: '600'}}>
              Congratulations!
            </Text>
            <Text style={{marginBottom: 20, fontSize: 18, fontWeight: '600'}}>
              You've completed this Level. You can proceed to next Level.
            </Text>
            <TouchableOpacity onPress={() => setShowModal(false)}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#2C7DB5',
                  marginVertical: 10,
                  borderRadius: 20,
                  width: device_width * 0.30,
                  height: device_height * 0.05,
                }}>
                <Text
                  style={{color: '#FFFFFF', fontSize: 18, fontWeight: '600'}}>
                  OK
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LevelCompleted;
