import React from 'react';
import {colors} from '../utils/Colors';
import {CommonStyles} from '../utils/CommonStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CarouselItem = props => {
  const {shadowStyle} = CommonStyles;

  return (
    <View
      style={[
        shadowStyle,
        styles.carouselItem,
        {backgroundColor: colors.darkCyan},
      ]}>
      <View style={styles.innerContainer}>
        <View style={styles.absoluteIcon}>
          {props.env === 'Web' ? (
            <MaterialCommunityIcons
              name={'web'}
              size={40}
              color={colors.white}
            />
          ) : (
            <AntDesign name={'mobile1'} size={40} color={colors.white} />
          )}
        </View>
        <View style={{marginTop: 5, marginHorizontal: 5}}>
          <Text style={styles.textTitle}>{props.title}</Text>
          <Text style={styles.description}>{props.description}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.footer} onPress={props.onPress}>
        <MaterialCommunityIcons
          name={'github'}
          size={25}
          color={colors.white}
        />
        <AntDesign name={'arrowright'} size={25} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.darkCyan,
    justifyContent: 'space-between',
    maxHeight: 220,
  },
  description: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '500',
    marginTop: 5,
    marginBottom: 5,
  },
  innerContainer: {
    backgroundColor: colors.Cyan,
    padding: 5,
    marginTop: 10,
    borderRadius: 10,
    minHeight: 150,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  textTitle: {fontSize: 18, fontWeight: '700', color: colors.white},
  absoluteIcon: {position: 'absolute', right: 0, padding: 10, top: -25},
});

export default CarouselItem;
