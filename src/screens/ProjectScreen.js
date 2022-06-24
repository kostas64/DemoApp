import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  StatusBar,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {CommonStyles} from '../utils/CommonStyles';
import {colors} from '../utils/Colors';
import Carousel from 'react-native-snap-carousel';
import Ionic from 'react-native-vector-icons/Ionicons';
import IconBubble from '../components/IconBubble';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Faded from '../components/Faded';

const WIDTH_CARD_MAX = 280;
const WIDTH_SCREEN_MAX = 375;
const WIDTH_CARD_MIN = 260;
const WIDTH_SCREEN_MIN = 320;
const WIDTH_THR = 320;
const SCREEN_WIDTH = Dimensions.get('window').width;

const ProjectScreen = () => {
  const carouselRef = useRef();
  const fadeValue = useRef(new Animated.Value(1)).current;
  const translateValue = useRef(new Animated.Value(0)).current;
  const [prevIndex, setPrevIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const DATA = [
    {
      id: '1',
      title: 'Authentication App',
      description:
        'This app contains logic about authentication logic. Also it follows react native docs on how to handle navigation based on user token.',
      technologies: ['React Native', 'Javascript'],
      image: require('../assets/images/sea.jpeg'),
    },
    {
      id: '2',
      title: 'Demonstration App',
      description:
        'This project is the one you use right now. App demonstrates mechanisms of React Native and how i use them. Some of them is DrawerNavigation, Lotties, Animated API, AppState and Carousel',
      technologies: ['Mobile', 'Javascript', 'React Native'],
      image: require('../assets/images/lake.jpeg'),
    },
  ];

  useEffect(() => {
    if (prevIndex !== null)
      Animated.timing(fadeValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start(() =>
        Animated.timing(fadeValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start(),
      );
  }, [prevIndex]);

  const translateStyle = {
    transform: [
      {
        translateX: translateValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 400],
        }),
      },
    ],
  };

  useEffect(() => {
    if (prevIndex !== null)
      Animated.timing(translateValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start(() =>
        Animated.spring(translateValue, {
          toValue: 0,
          friction: 3,
          tension: 30,
          useNativeDriver: true,
        }).start(),
      );
  }, [prevIndex]);

  const getSize = () => {
    if (SCREEN_WIDTH > WIDTH_THR) {
      return (WIDTH_CARD_MAX * SCREEN_WIDTH) / WIDTH_SCREEN_MAX;
    } else {
      return (WIDTH_CARD_MIN * SCREEN_WIDTH) / WIDTH_SCREEN_MIN;
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={[shadowStyle, styles.carouselItem]}>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
        <Text>{item.technologies}</Text>
      </View>
    );
  };

  const getIcons = () => {
    const javaScriptIcon = (
      <Ionic size={40} name={'logo-javascript'} color={colors.mainBg} />
    );
    const react = <Ionic size={40} name={'logo-react'} color={colors.mainBg} />;
    const mobile = <AntIcon size={40} name={'mobile1'} color={colors.mainBg} />;
    return (
      <Animated.View style={[translateStyle, styles.animatedIcons]}>
        {DATA[activeIndex]?.technologies.map((tech, i) => {
          return (
            <IconBubble key={i} index={i}>
              {tech === 'React Native' && react}
              {tech === 'Javascript' && javaScriptIcon}
              {tech === 'Mobile' && mobile}
            </IconBubble>
          );
        })}
      </Animated.View>
    );
  };

  const {shadowStyle} = CommonStyles;

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Animated.Image
            style={{
              position: 'absolute',
              height: '100%',
              opacity: fadeValue,
            }}
            imageStyle={{resizeMode: 'center'}}
            source={DATA[activeIndex]?.image}
          />
          <View style={styles.fadeStyle}>
            <Faded color={colors.mainBg} height={40} direction={'up'} />
          </View>
        </View>
        {getIcons()}
        <View
          style={{
            marginVertical: 32,
            height: '25%',
          }}>
          <Carousel
            data={DATA}
            ref={carouselRef}
            renderItem={renderItem}
            itemWidth={getSize() + 16}
            sliderWidth={SCREEN_WIDTH}
            onSnapToItem={index => {
              setPrevIndex(activeIndex);
              setTimeout(() => {
                setActiveIndex(index);
              }, 100);
            }}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBg,
  },
  fadeStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  animatedIcons: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItem: {
    flex: 1,
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.darkCyan,
  },
});

export default ProjectScreen;
