import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import LottieView from 'lottie-react-native';
import {useDrawerStatus} from '@react-navigation/drawer';
import {CommonStyles} from '../utils/CommonStyles';
import Title from '../components/Title';
import Strings from '../assets/dictionaries/strings.json';
import {colors} from '../utils/Colors';

const HomeScreen = ({navigation}) => {
  const [height, setHeight] = useState();
  const drawer = useDrawerStatus();
  const {shadowStyle} = CommonStyles;

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <View style={[shadowStyle, styles.alignCenter, styles.titleParentStyle]}>
        <Title title={Strings.homeTitle} />
      </View>
      <View
        style={{flex: 1}}
        onLayout={e => {
          setHeight(parseInt(e.nativeEvent.layout.height));
        }}>
        <View style={[{flex: 1}, styles.alignCenter]}>
          <View
            style={[
              shadowStyle,
              styles.alignCenter,
              styles.contentBoxStyle,
              ,
            ]}>
            <View style={{paddingBottom: 10}}>
              <Text style={{fontSize: 24, fontWeight: '700'}}>
                {Strings.homeBodyTitle}
              </Text>
            </View>
            <View
              style={[
                styles.alignCenter,
                {
                  paddingHorizontal: 16,
                },
              ]}>
              <Text style={{fontSize: 20, textAlign: 'center'}}>
                {Strings.homeBodyContent}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {drawer === 'closed' && height && (
        <View style={{marginLeft: -35}}>
          <LottieView
            style={{
              position: 'absolute',
              top: -(height / 10),
              height: 100,
            }}
            autoPlay
            loop={true}
            source={require('../assets/lottie/swipeRight.json')}
          />
        </View>
      )}
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={[shadowStyle, styles.alignCenter, styles.touchableStyle]}>
        <Text style={styles.touchableButtonStyle}>
          {Strings.homeButtonText}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {flex: 1, backgroundColor: colors.mainBg, paddingVertical: 16},
  titleParentStyle: {
    padding: 8,
    backgroundColor: colors.Cyan,
    marginHorizontal: 32,
    borderRadius: 10,
  },
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableStyle: {
    padding: 10,
    marginTop: 50,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: colors.darkCyan,
  },
  touchableButtonStyle: {fontSize: 20, fontWeight: '700', color: colors.white},
  contentBoxStyle: {
    backgroundColor: colors.Cyan,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
});

export default HomeScreen;
