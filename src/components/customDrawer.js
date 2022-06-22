import {Image, Linking, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  useDrawerStatus,
} from '@react-navigation/drawer';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Links from '../assets/dictionaries/appLinks.json';
import {safeAreaTop} from '../utils/ScreenUtils';
import {colors} from '../utils/Colors';
import Strings from '../assets/dictionaries/strings.json';

const CustomDrawer = props => {
  const drawer = useDrawerStatus();
  const ref = useRef(null);

  if (drawer === 'open') {
    ref?.current?.play();
  } else {
    ref?.current?.pause();
  }

  const handleClick = (url, urlApp = undefined) => {
    if (urlApp) {
      Linking.canOpenURL(urlApp).then(supported => {
        if (supported) {
          Linking.openURL(urlApp);
        } else {
          Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            } else {
              console.log("Don't know how to open URI: " + url);
            }
          });
        }
      });
    } else {
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + url);
        }
      });
    }
  };

  const {
    facebookLink,
    facebookAppLink,
    instagramLink,
    instagramAppLink,
    linkedinLink,
  } = Links;

  return (
    <View style={{flex: 1, backgroundColor: colors.softCyan}}>
      <View style={{height: 250, backgroundColor: colors.darkCyan}}>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{Strings.name}</Text>
          <Image
            source={require('../assets/images/me.jpeg')}
            style={styles.imageStyle}
          />
          <View style={styles.touchIcons}>
            <TouchableOpacity
              onPress={() => {
                handleClick(facebookLink, facebookAppLink);
              }}>
              <Icon name={'facebook-square'} size={26} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleClick(linkedinLink);
              }}>
              <Icon
                name={'linkedin-square'}
                size={26}
                color={colors.white}
                style={{marginHorizontal: 18}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleClick(instagramLink, instagramAppLink);
              }}>
              <Icon name={'instagram'} size={26} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View>
        <LottieView
          ref={ref}
          style={styles.lottieStyle}
          loop={true}
          source={require('../assets/lottie/swipeLeft.json')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nameContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: safeAreaTop,
    marginBottom: 15,
  },
  nameText: {color: colors.white, fontWeight: '700', fontSize: 18},
  imageStyle: {
    height: 120,
    width: 120,
    borderRadius: 50,
    borderColor: colors.white,
    borderWidth: 3,
  },
  touchIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieStyle: {
    position: 'absolute',
    right: 0,
    bottom: 52,
    height: 100,
  },
});

export default CustomDrawer;
