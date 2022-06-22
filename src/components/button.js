import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {colors} from '../utils/Colors';
import {CommonStyles} from '../utils/CommonStyles';

const TouchableButton = props => {
  const {shadowStyle} = CommonStyles;

  return (
    <TouchableOpacity
      onPress={() => props.handler()}
      style={[
        shadowStyle,
        {
          height: 50,
          width: 250,
          padding: 10,
          marginHorizontal: 20,
          borderRadius: 10,
          backgroundColor: colors.darkCyan,
          justifyContent: 'center',
          alignItems: 'center',
        },
        props?.margin && {marginTop: 50},
      ]}>
      <Text
        style={{
          color: colors.white,
          fontSize: 20,
        }}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default TouchableButton;
