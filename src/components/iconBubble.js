import {View} from 'react-native';
import React from 'react';
import {colors} from '../utils/Colors';

export default function IconBubble(props) {
  return (
    <View
      style={[
        props.index !== 0 && {marginLeft: 15},
        {
          height: 60,
          width: 60,
          backgroundColor: colors.white,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 30,
        },
      ]}>
      {props.children}
    </View>
  );
}
