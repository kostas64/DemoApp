import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {colors} from '../utils/Colors';

const LoadingScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Project');
    }, 1500);
  }, []);

  return (
    <View style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
      <LottieView
        autoPlay
        style={styles.lottieStyle}
        loop={true}
        source={require('../assets/lottie/loading.json')}
      />
      <Text style={{fontWeight: '700', fontSize: 24, color: colors.black}}>
        Loading...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  lottieStyle: {
    position: 'absolute',
    right: 0,
    bottom: 42,
    height: 100,
  },
});

export default LoadingScreen;
