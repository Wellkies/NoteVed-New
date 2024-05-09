import React, { useRef, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { device_height, device_width } from '../style';

const LevelCompleted = (play: any) => {
  const animationRef = useRef(null);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    if (animationRef.current && showAnimation) {
      animationRef.current.play();

      const timeout = setTimeout(() => {
        setShowAnimation(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [showAnimation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginHorizontal: 10,
        marginVertical: 20,
        position: 'absolute'
      }}>
      {showAnimation && (
        <LottieView
          ref={animationRef}
          style={{ width: device_width, height: device_height }}
          source={require('../../../assets/greetings.json')}
        />
      )}
    </View>
  );
};

export default LevelCompleted;
