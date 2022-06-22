import {Platform, StatusBar} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const hasNotch = DeviceInfo.hasNotch();
const platform = Platform.OS;
const isIos = platform === 'ios';
const isIphoneWithNotch = isIos && hasNotch;

const androidCurrentHeight = StatusBar.currentHeight
  ? StatusBar.currentHeight
  : 0;

const deviceSafeAreaTop = isIos ? 20 : androidCurrentHeight;
const safeAreaTop = isIphoneWithNotch ? 40 : deviceSafeAreaTop;
const safeAreaBottom = isIphoneWithNotch ? 34 : 0;
export {safeAreaTop, safeAreaBottom};
