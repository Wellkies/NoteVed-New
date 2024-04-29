import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  BackHandler,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import {device_width, device_height} from '../style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {dispatch} from '../../redux/store/reducerHook';
import {getAllSubByCourseAPI} from '../../redux/reducers/GetSubjectByCourseReducer';
import {Image} from 'react-native-animatable';

const Pricing = () => {
  const navigation = useNavigation();
  const {t: trans, i18n} = useTranslation();

  const PricingAvailable = [
    {
      featureName: 'Full access to every class',
      trial: '',
      premium: require('../../../assets/check.png'),
    },
    {
      featureName: 'Take unlimited classes',
      trial: require('../../../assets/check.png'),
      premium: require('../../../assets/check.png'),
    },
    {
      featureName: 'choose the tutor you want',
      trial: '',
      premium: require('../../../assets/check.png'),
    },
    {
      featureName: 'Downloadable content',
      trial: require('../../../assets/check.png'),
      premium: require('../../../assets/check.png'),
    },
    {
      featureName: 'Contact private tutor privately',
      trial: require('../../../assets/check.png'),
      premium: require('../../../assets/check.png'),
    },
    {
      featureName: 'Set your own courses hours',
      trial: require('../../../assets/check.png'),
      premium: require('../../../assets/check.png'),
    },
  ];
  useEffect(() => {
    navigation.addListener('focus', () => {
      // const data = {
      //   stageid,
      //   boardid,
      //   scholarshipid: SchlrshipId,
      // };
      dispatch(getAllSubByCourseAPI());
      BackHandler.addEventListener('hardwareBackPress', () => {
        // navigation.navigate('LandingScreen');
        navigation.goBack();
        return true;
      });
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        // navigation.navigate('LandingScreen');
        navigation.goBack();
        return true;
      });
    };
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          style={{
            width: device_width,
            height: device_height,
            flex: 1,
            // alignSelf: 'center',
            // borderWidth: 1,
            backgroundColor: '#404040',
          }}
          resizeMode="contain"
          // source={require('../../../assets/testBG3.jpg')}
        >
          <View
            style={{
              marginVertical: 12,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              alignSelf: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                flex: 1,
              }}>
              <MaterialIcons
                name="arrow-back"
                size={28}
                style={{color: 'white'}}
              />
            </TouchableOpacity>
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                flex: 1,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                {trans('Pricing')}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                flex: 1,
              }}>
              <Entypo
                name="dots-three-vertical"
                size={20}
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity>
              <View
                style={{
                  borderRadius: 8,
                  backgroundColor: 'white',
                  padding: 10,
                  margin: 10,
                  width: device_width * 0.45,
                  height: device_height * 0.21,
                }}>
                <View
                  style={{
                    alignContent: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <MaterialIcons
                    name="person-outline"
                    size={50}
                    style={{
                      alignSelf: 'center',
                      marginTop: 10,
                      marginBottom: 10,
                      backgroundColor: '#f8f8f8',
                      padding: 2,
                    }}
                  />
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    marginTop: 8,
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 14,
                      color: '#000000',
                    }}>
                    {trans('TRIAL PLAN')}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 8,
                    justifyContent: 'center',
                    paddingTop: 5,
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 28,
                      color: '#009933',
                      textAlign: 'center',
                    }}>
                    {trans('Free')}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      marginTop: 10,
                      color: '#a0a0a0',
                      fontWeight: '300',
                    }}>
                    {trans('/7days')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={{
                  borderRadius: 8,
                  backgroundColor: '#3cb371',
                  padding: 10,
                  margin: 10,
                  width: device_width * 0.45,
                  height: device_height * 0.21,
                }}>
                <View
                  style={{
                    alignContent: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <MaterialCommunityIcons
                    name="crown-outline"
                    size={50}
                    style={{
                      alignSelf: 'center',
                      marginTop: 10,
                      marginBottom: 10,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      padding: 2,
                    }}
                  />
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    marginTop: 8,
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 14,
                      color: '#f8f8f8',
                    }}>
                    {trans('PREMIUM PLAN')}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 8,
                    justifyContent: 'center',
                    paddingTop: 5,
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 28,
                      color: 'white',
                      textAlign: 'center',
                    }}>
                    {trans('Rs.1499')}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      marginTop: 10,
                      color: 'white',
                      fontWeight: '300',
                    }}>
                    {trans('/year')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <Text
              style={{
                color: '#a0a0a0',
                fontWeight: '500',
                fontSize: 18,
                marginTop: 20,
                marginBottom: 15,
                marginHorizontal: 15,
              }}>
              {trans('Choose your Subscription')}
            </Text>
          </View>
          <View
            style={{
              alignContent: 'center',
              backgroundColor: 'white',
              paddingVertical: 25,
              width: device_width * 0.95,
              height: device_height * 0.4,
              paddingHorizontal: 25,
              margin: 10,
              borderRadius: 10,
              overflow:'hidden',
              //flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 20,
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 14,
                  color: 'black',
                }}>
                {trans('Features')}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  textAlign: 'right',
                  marginRight: 10,
                  flex: 1,
                }}>
                {trans('TRIAL')}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                }}>
                {trans('PREMIUM')}
              </Text>
            </View>
            {PricingAvailable.map((item, index) => {
              return (
                <View key={index}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginVertical:10,                     
                    }}>
                    <Text
                      style={{
                        fontWeight: '600',
                        fontSize: 15,
                        flex: 1,
                      }}>
                      {item.featureName}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 20,
                      }}>
                      {item.trial && (
                        <Image
                          style={{
                            width: 20,
                            height: 20,
                            resizeMode: 'contain',
                            marginRight: 20,
                          }}
                          source={item.trial}
                        />
                      )}
                      {item.premium && (
                        <Image
                          style={{
                            width: 20,
                            height: 20,
                            resizeMode: 'contain',
                            marginRight: 20,
                          }}
                          source={item.premium}
                        />
                      )}
                    </View>
                  </View>
                  {index !== PricingAvailable.length - 1 && (
                    <View
                      style={{
                        borderBottomColor: '#E0E0E0',
                        borderBottomWidth: 1,
                        marginTop: 2,
                        marginBottom: 2,
                      }}
                    />
                  )}
                </View>
              );
            })}
          </View>
          <TouchableOpacity
            onPress={async () => {
              navigation.navigate('Details');
            }}
            style={{
              marginLeft: 20,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 15,
                marginBottom: 8,
                backgroundColor: '#3cb371',
                padding: 10,
                borderRadius: 10,
                paddingHorizontal: 10,
                width: device_width * 0.9,
                marginRight: 10,
                paddingRight: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  fontSize: 18,
                  textAlign: 'center',
                }}>
                {trans('Choose Plan')}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
              marginBottom: 5,
            }}>
            <Text
              style={{
                color: '#a0a0a0',
                fontSize: 13,
                fontWeight: '500',
                paddingHorizontal: 10,
              }}>
              {trans('By joining to our privacy policy and terms of service')}
            </Text>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Pricing;

const styles = StyleSheet.create({});
