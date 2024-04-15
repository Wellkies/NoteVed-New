import React from 'react'
import { ToastAndroid } from 'react-native';

const CommonMessage = (Message) => {
    ToastAndroid.showWithGravityAndOffset(
        Message,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50,
      );
}

export default CommonMessage