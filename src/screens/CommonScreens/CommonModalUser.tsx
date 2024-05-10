import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import React from 'react';
import Colors from '../../../assets/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ActivityIndicator, Modal} from 'react-native-paper';
// import {device_height, device_width} from '../../style';
import {device_height, device_width} from '../style';
import LinearGradient from 'react-native-linear-gradient';

const CommonModalUser = ({
  ModalStatus,
  iconColor = '',
  iconname = '',
  iconSize = '',
  isIconShow = false,
  closeModalFunc,
  label1 = '',
  label2 = '',
  yesbtnName = '',
  yesbtnFunction,
  nobtnName = '',
  nobtnFunction,
  loading = '',
}) => {
  return (
    <Modal transparent={true} visible={ModalStatus}>
      <View
        style={{
          //backgroundColor: '#0f6f25',
          backgroundColor:'#2C7DB5',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{alignItems: 'flex-end', justifyContent: 'center'}}>
          <View
            style={{
              // borderRadius: 10,
              //   borderTopLeftRadius: 25,
              //   borderTopRightRadius: 25,
              //   borderBottomLeftRadius: 25,
              //   borderBottomRightRadius: 25,
              borderRadius: 15,
              borderWidth: 1,
              minHeight: isIconShow
                ? device_height * 0.1
                : device_height * 0.35,
              minWidth: device_width * 0.9,
              backgroundColor: '#002650',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderColor: '#FFFFFF',
              //   alignItems:'center'
              //   paddingHorizontal: 20,
            }}>
            <View>
              <View
                style={{
                  // flexDirection: 'row',
                  // justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <View style={{alignItems: 'center', paddingVertical: 15}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      width: device_width * 0.8,
                      fontSize: 18,
                      color: '#FFFFFF',
                      marginTop: 10,
                      marginLeft: 10,
                      fontWeight: '700',
                    }}>
                    {label1}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      width: device_width * 0.7,
                      fontSize: 15,
                      color: '#fff',
                      marginTop: 5,
                      // marginLeft: 5,
                      fontWeight: '500',
                    }}>
                    {label2}
                  </Text>
                </View>
                {/* <AntDesign
                  name="closecircleo"
                  style={{
                    fontSize: 28,
                    color: '#fff',
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    // marginTop: 10,
                    backgroundColor: 'crimson',
                    borderRadius: 50,
                  }}
                  onPress={closeModalFunc}
                /> */}
              </View>
              <View
                style={{
                  // borderWidth: 1,
                  paddingVertical: 15,
                  alignItems: 'center',
                  marginTop: 10,
                  marginLeft: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  // borderColor: '#aaa',
                  // borderRadius: 8,
                  padding: 10,
                }}>
                <TouchableOpacity
                  disabled={loading ? true : false}
                  style={{
                    borderRadius: 15,
                    width: '30%',
                    marginVertical: 5,
                    borderWidth: 1,
                    marginRight: 25,
                    //borderColor: 'white',
                  }}
                  onPress={() => yesbtnFunction()}>
                  <LinearGradient
                    colors={['#EEF8FB', '#EEF8FB']}
                    style={{
                      borderRadius: 15,

                      width: '100%',
                      paddingVertical: 5,
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      {loading && (
                        <ActivityIndicator
                          size="small"
                          color={'#fff'}
                          style={{alignSelf: 'flex-start', paddingRight: 10}}
                        />
                      )}
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 15,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          alignItems: 'center',
                        }}>
                        {yesbtnName}
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderRadius: 15,
                    width: '30%',
                    marginVertical: 5,
                    borderWidth: 1,
                    borderColor: '#fff',
                  }}
                  onPress={() => nobtnFunction()}>
                  <LinearGradient
                    colors={['#EA2E0E', '#800000']}
                    style={{
                      borderRadius: 15,
                      width: '100%',
                      paddingVertical: 5,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 15,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        alignItems: 'center',
                      }}>
                      {nobtnName}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CommonModalUser;
