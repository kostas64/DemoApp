import {
  View,
  Text,
  AppState,
  SafeAreaView,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import Title from '../components/Title';
import {CommonStyles} from '../utils/CommonStyles';
import Strings from '../assets/dictionaries/strings.json';
import {colors} from '../utils/Colors';

const AppStateScreen = ({navigation}) => {
  const appStateRef = useRef(AppState.currentState);
  const [appState, setAppState] = useState(appStateRef.current);

  useFocusEffect(
    React.useCallback(() => {
      const appStateListener = AppState.addEventListener(
        'change',
        nextAppState => {
          if (
            appStateRef.current.match(/inactive|background/) &&
            nextAppState === 'active'
          ) {
            Alert.alert(Strings.appStateAlertTitle, Strings.appStateAlertBody, [
              {text: Strings.appStateAlertAction},
            ]);
          }

          appStateRef.current = nextAppState;
          setAppState(appStateRef.current);
        },
      );

      return () => {
        !!appStateListener && appStateListener.remove();
      };
    }, []),
  );

  const {shadowStyle} = CommonStyles;

  return (
    <SafeAreaView
      style={[{backgroundColor: colors.mainBg}, {flex: 1, paddingTop: 16}]}>
      <View style={[shadowStyle, styles.titleContainer]}>
        <Title title={Strings.appStateTitle} />
      </View>
      <View style={[{flex: 1}, styles.alignCenter]}>
        <View style={[shadowStyle, styles.alignCenter, styles.viewContainer]}>
          <View
            style={[
              styles.alignCenter,
              {
                paddingHorizontal: 16,
              },
            ]}>
            <Text style={{fontSize: 20, textAlign: 'center'}}>
              {Strings.appStateBody}
            </Text>
          </View>
        </View>
        {Platform.OS === 'ios' && (
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{`Status: ${appState}`}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginHorizontal: 16,
    backgroundColor: colors.Cyan,
    padding: 5,
    borderRadius: 10,
  },
  viewContainer: {
    backgroundColor: colors.Cyan,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  statusContainer: {
    marginTop: 50,
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.darkCyan,
  },
  statusText: {
    fontSize: 25,
    fontWeight: '700',
    color: colors.white,
  },
});

export default AppStateScreen;
