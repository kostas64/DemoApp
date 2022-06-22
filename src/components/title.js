import React from 'react';
import {Text} from 'react-native';

const Title = props => {
  return (
    <Text
      style={{
        fontSize: 24,
        fontWeight: '700',
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
      {props.title}
    </Text>
  );
};

export default Title;
