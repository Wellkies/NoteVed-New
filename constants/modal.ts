import {
    StyleSheet,
    Text,
    View,
    Modal,
    Button,
    TouchableOpacity,
    TextInput,
  } from 'react-native';
  import React from 'react';
  import Colors from '../assets/Colors';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  
  const modal = ({
    visible,
    height,
    width,
    backgroundColor,
    heading,
    onpressyes,
    onpressno,
    isIconVisible = true,
    yesBtnLabel = '',
    isYesBtnVisible = true,
    isYesBtnDisabled = false,
    isShowReason = false,
    isNoBtnVisible = true,
    noBtnLabel = '',
    reasonval = '',
    setReasonval,
  }) => {
    // console.log(isYesBtnDisabled, isShowReason, 'isShowReason');
    return (
      <Modal transparent={true} visible={visible}>
        <View
          style={{
            backgroundColor: '#000000aa',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
            <View
              style={{
                borderRadius: 10,
                minHeight: height,
                minWidth: width,
                backgroundColor: backgroundColor,
                // alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* {isIconVisible && (
                <MaterialCommunityIcons
                  size={30}
                  name="emoticon-sad"
                  color={Colors.primary}
                  style={{alignSelf: 'center', marginTop: 10}}
                />
              )} */}
              <Text
                style={{
                  fontSize: 15,
                  color: Colors.primary,
                  alignSelf: 'center',
                  margin: 10,
                  fontWeight: '700',
                }}>
                {heading}
              </Text>
              {/* <Button title='OK' onPress={onpress}></Button> */}
              {isShowReason && (
                <View style={{marginHorizontal: 10}}>
                  <Text style={styles.text_footer}>
                    Please describe the reason for cancellation{' '}
                  </Text>
                  {/* <View style={styles.action}>
                <TextInput
                  placeholder="Enter reason"
                  // placeholderTextColor={'#999'}
                  multiline={true}
                  numberOfLines={5}
          maxLength={40}
                  value={reasonval}
                  onChangeText={val => setReasonval(val)}
                  style={styles.textInput}
                />
              </View> */}
                  <View
                    style={{
                      backgroundColor: '#fff',
                      borderColor: Colors.primary,
                      borderWidth: 1,
                    }}>
                    <TextInput
                      placeholder="Enter reason"
                      editable
                      multiline
                      numberOfLines={4}
                      maxLength={40}
                      value={reasonval}
                      onChangeText={val => setReasonval(val)}
                      style={{
                        // flex: 1,
                        textAlignVertical: 'top',
                        paddingHorizontal: 10,
                        color:'#333'
                      }}
                    />
                  </View>
                </View>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  margin: 20,
                }}>
                {isYesBtnVisible && (
                  <TouchableOpacity
                    disabled={isYesBtnDisabled}
                    onPress={onpressyes}
                    style={[
                      styles.buttons,
                      {backgroundColor: isYesBtnDisabled ? '#999' : Colors.green},
                    ]}>
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
                      {noBtnLabel != '' ? noBtnLabel : 'No'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  
  export default modal;
  
  const styles = StyleSheet.create({
    buttons: {
      height: 30,
      width: 60,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
    },
    text_footer: {
      color: '#666',
      fontSize: 15,
      fontWeight: 'bold',
    },
    action: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      // marginTop: 2,
      // marginBottom: 10,
      borderWidth: 1,
      borderColor: '#f2f2f2',
    },
    textInput: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      // marginTop: Platform.OS === 'ios' ? 0 : -5,
      // marginBottom: Platform.OS === 'ios' ? 0 : -15,
      // paddingLeft: 10,
      color: '#05375a',
    },
  });
  