import React, {useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import TouchableButton from '../components/Button';
import Strings from '../assets/dictionaries/strings.json';
import {colors} from '../utils/Colors';

const Scale = () => {
  let toScaleUp = true;
  const animatedValue = useRef(new Animated.Value(1)).current;

  const scaleUpStyle = {
    transform: [
      {
        scaleX: animatedValue.interpolate({
          inputRange: [1, 2],
          outputRange: [1, 2],
        }),
      },
      {
        scaleY: animatedValue.interpolate({
          inputRange: [1, 2],
          outputRange: [1, 2],
        }),
      },
    ],
  };

  const handleScale = () => {
    if (toScaleUp) {
      toScaleUp = false;
      Animated.timing(animatedValue, {
        toValue: 2,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      toScaleUp = true;
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <>
      <View style={{paddingBottom: 16}}>
        <View
          style={{
            marginTop: 70,
          }}>
          <Animated.View style={[styles.card, scaleUpStyle]} />
        </View>
      </View>
      <TouchableButton
        text={Strings.animationsScaleLabel}
        handler={handleScale}
        margin
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    backgroundColor: colors.red,
  },
});

export default Scale;
