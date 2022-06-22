import React, {useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import TouchableButton from '../components/button';
import Strings from '../assets/dictionaries/strings.json';
import {colors} from '../utils/Colors';

const RotateX = () => {
  let flipValue = 0;
  const animatedValue = useRef(new Animated.Value(0)).current;

  const frontAnimatedStyle = {
    transform: [
      {
        rotateX: animatedValue.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateX: animatedValue.interpolate({
          inputRange: [180, 360],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };

  const handleFlip = () => {
    if (flipValue === 0) {
      flipValue = 1;
      Animated.timing(animatedValue, {
        toValue: 180,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      flipValue = 0;
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <>
      <View style={{paddingBottom: 16}}>
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
            <Text style={{fontSize: 20}}>Back</Text>
          </Animated.View>
          <Animated.View
            style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
            <Text style={{fontSize: 20}}>Front</Text>
          </Animated.View>
        </View>
      </View>
      <TouchableButton
        text={Strings.animationsFlipYLabel}
        handler={handleFlip}
      />
    </>
  );
};

const styles = StyleSheet.create({
  flipCard: {
    height: 200,
    width: 200,
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipCardBack: {
    backfaceVisibility: 'hidden',
    position: 'absolute',
    backgroundColor: colors.yellow,
    top: 0,
  },
});

export default RotateX;
