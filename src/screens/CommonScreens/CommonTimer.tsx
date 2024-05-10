import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../../../assets/Colors';

const CommonTimer = ({duration, handleAnswerSubmit}) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  // console.log(timeRemaining, '===============timeRemaining--------------');

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(time => time - 1);
      } else {
        clearInterval(interval);
        handleAnswerSubmit();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeRemaining]);

  const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    // console.log(
    //   formattedHours,
    //   formattedMinutes,
    //   formattedSeconds,
    //   '==================new time format---------',
    // );
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            borderWidth: 1,
            //borderColor: '#f1a722',
            borderColor:'#2C7DB5',
            padding: 5,
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal:5
          }}>
          <Text style={{fontWeight: '900', color: '#2C7DB5', fontSize: 22}}>
            {formattedHours}
          </Text>
        </View>
          <Text style={{fontWeight: '900', color: '#2C7DB5', fontSize: 22}}>:</Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#2C7DB5',
            padding: 5,
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal:5
          }}>
          <Text style={{fontWeight: '900', color: '#2C7DB5', fontSize: 22}}>
            {formattedMinutes}
          </Text>
        </View>
          <Text style={{fontWeight: '900', color: '#2C7DB5', fontSize: 22}}>:</Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#2C7DB5',
            padding: 5,
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal:5
          }}>
          <Text style={{fontWeight: '900', color: '#2C7DB5', fontSize: 22}}>
            {formattedSeconds}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.timerText,
          {
            color: '#f1a722',
          },
        ]}>
        {formatTime(timeRemaining)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  timerText: {
    fontSize: 22,
    fontWeight: '900',
    color: 'crimson',
  },
});

export default CommonTimer;
