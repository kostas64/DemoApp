import React, {useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import TouchableButton from '../components/button';
import Strings from '../assets/dictionaries/strings.json';
import {colors} from '../utils/Colors';

const Translate = () => {
  let positionIn = true;
  const animatedValue = useRef(new Animated.Value(0)).current;

  const translateStyle = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1000],
        }),
      },
    ],
  };

  const handleTranslate = () => {
    if (positionIn) {
      positionIn = false;
      Animated.spring(animatedValue, {
        toValue: 1,
        friction: 3,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      positionIn = true;
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 3,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <>
      <View style={{paddingBottom: 16}}>
        <View
          style={{
            marginTop: 20,
          }}>
          <Animated.View style={[styles.card, translateStyle]} />
        </View>
      </View>
      <TouchableButton
        text={Strings.animationsTranslateLabel}
        handler={handleTranslate}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 200,
    width: 200,
    backgroundColor: colors.pink,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Translate;
