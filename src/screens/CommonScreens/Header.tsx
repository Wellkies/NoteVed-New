import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import React from 'react';
// import Colors from '../../../../assets/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Header = ({isbackIconShow = false, label1, label2, functionName}) => {
  return (
    <View>
      <StatusBar backgroundColor={'#263d2d'} barStyle="light-content" />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // backgroundColor: '#263d2d',
          justifyContent: 'space-between',
          paddingBottom: 5,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {isbackIconShow ? (
            <TouchableOpacity
              onPress={() => functionName()}
              style={{paddingLeft: 10, borderWidth: 0, marginTop: 10}}>
              <MaterialIcons
                name="arrow-back"
                size={30}
                // backgroundColor={'#263d2d'}
                color={'#fff'}
                onPress={() => functionName()}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <Text
            style={{
              fontSize: 20,
              color: '#fff',
              marginLeft: 10,
              marginTop:10,
              textTransform: 'capitalize',
              fontWeight: '600',
            }}>
            {label1}
          </Text>
        </View>
        <View style={{}}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              right: 15,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 20,
                color: '#fff',
                marginLeft: 10,
                marginTop:10,
                fontWeight: '600',
              }}>
              {label2}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;
