import React, {useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import TouchableButton from '../components/Button';
import Strings from '../assets/dictionaries/strings.json';
import {colors} from '../utils/Colors';

const RotateY = () => {
  let flipValue = 0;
  const animatedValue = useRef(new Animated.Value(0)).current;

  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: animatedValue.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };
  const backAnimatedStyle = {
    transform: [
      {
        rotateY: animatedValue.interpolate({
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
            <Text style={styles.textLabel}>Back</Text>
          </Animated.View>
          <Animated.View
            style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
            <Text style={styles.textLabel}>Front</Text>
          </Animated.View>
        </View>
      </View>
      <TouchableButton
        text={Strings.animationsFlipLabel}
        handler={handleFlip}
      />
    </>
  );
};

const styles = StyleSheet.create({
  flipCard: {
    height: 200,
    width: 200,
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipCardBack: {
    backfaceVisibility: 'hidden',
    position: 'absolute',
    backgroundColor: colors.darkGreen,
    top: 0,
  },
  textLabel: {color: colors.white, fontSize: 20},
});

export default RotateY;
