import React from 'react';
import {Platform, View} from 'react-native';
import {ColorUtils} from '../utils/ColorUtils';

//Divisor => # of views to render
//More views -> better opacity escalation
const divisor = Platform.OS === 'ios' ? 600 : 50;
const pi = 1 / divisor;

const Faded = props => {
  let i;
  let collection = [];
  let pixelsStyle = {
    width: '100%',
    position: 'absolute',
    height: props.height,
    flexDirection: 'column',
  };

  if (props.direction === 'up') {
    pixelsStyle = {
      ...pixelsStyle,
      bottom: 0,
    };
    collection = [...collection, 0];
    i = pi;
    while (i < 1) {
      collection = [...collection, i];
      i += pi;
    }
    collection = [...collection, 1];
  } else {
    pixelsStyle = {
      ...pixelsStyle,
      top: 0,
    };
    collection = [...collection, 1];
    i = 1.0;
    while (i > 0) {
      collection = [...collection, i];
      i -= pi;
    }
    collection = [...collection, 0];
  }
  let r = 0,
    g = 0,
    b = 0;
  if (ColorUtils.HexToRgb(props.color)) {
    r = ColorUtils.HexToRgb(props.color).r;
    g = ColorUtils.HexToRgb(props.color).g;
    b = ColorUtils.HexToRgb(props.color).b;
  }

  const {children, height} = props;

  return (
    <View style={{flexDirection: 'column'}}>
      <View style={pixelsStyle}>
        {collection.map((o, key) => (
          <View
            key={key}
            style={{
              height: height / divisor,
              backgroundColor: `rgba(${r}, ${g}, ${b}, ${o})`,
            }}
          />
        ))}
      </View>
      {children}
    </View>
  );
};

export default Faded;
