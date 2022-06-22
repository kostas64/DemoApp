import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import Title from '../components/title';
import Scale from '../animations/scale';
import RotateY from '../animations/rotateY';
import RotateX from '../animations/rotateX';
import Translate from '../animations/translate';
import {CommonStyles} from '../utils/CommonStyles';
import Strings from '../assets/dictionaries/strings.json';
import {colors} from '../utils/Colors';

const AnimationsScreen = () => {
  const {shadowStyle} = CommonStyles;

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={[shadowStyle, styles.titleContainer]}>
        <Title title={Strings.animationsTitle} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <Scale />
        <RotateY />
        <RotateX />
        <Translate />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {backgroundColor: colors.mainBg, flex: 1, paddingTop: 16},
  titleContainer: {
    marginHorizontal: 16,
    backgroundColor: colors.Cyan,
    padding: 5,
    borderRadius: 10,
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 16,
  },
});

export default AnimationsScreen;
