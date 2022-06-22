import {StyleSheet, Platform} from 'react-native';
import {colors} from './Colors';

export const CommonStyles = StyleSheet.create({
  shadowStyle:
    Platform.OS === 'ios'
      ? {
          shadowColor: colors.black,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
        }
      : {elevation: 3},
});
