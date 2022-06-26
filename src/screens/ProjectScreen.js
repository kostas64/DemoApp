import {colors} from '../utils/Colors';
import Faded from '../components/Faded';
import Carousel from 'react-native-snap-carousel';
import IconBubble from '../components/IconBubble';
import CarouselItem from '../components/CarouselItem';
import React, {useEffect, useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
  Linking,
  Text,
} from 'react-native';

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
  const [loading, setLoading] = useState(true);
  const [prevIndex, setPrevIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const DATA = [
    {
      id: '1',
      title: 'Authentication App',
      description:
        'This app contains logic about authentication flow. Also it follows react native docs on how to handle navigation based on user token.',
      technologies: ['React Native', 'Javascript'],
      env: 'Web',
      url: 'https://github.com/kostas64/authenticationApp',
      image: require('../assets/images/sea.jpeg'),
    },
    {
      id: '2',
      title: 'Demonstration App',
      description:
        'This project is the one you use right now. App demonstrates mechanisms of React Native and how i use them. Some of them is DrawerNavigation, Lotties, Animated API, AppState and Carousel',
      technologies: ['Javascript', 'React Native'],
      url: 'https://github.com/kostas64/foodOrder',
      env: 'Mobile',
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
      <CarouselItem
        key={index}
        title={item.title}
        description={item.description}
        env={item.env}
        onPress={() => handleClick(item.url)}
      />
    );
  };

  const getIcons = () => {
    const javaScriptIcon = (
      <Ionicons size={40} name={'logo-javascript'} color={colors.mainBg} />
    );
    const react = (
      <Ionicons size={40} name={'logo-react'} color={colors.mainBg} />
    );

    return (
      <Animated.View style={[translateStyle, styles.animatedIcons]}>
        {DATA[activeIndex]?.technologies.map((tech, i) => {
          return (
            <IconBubble key={i} index={i}>
              {tech === 'React Native' && react}
              {tech === 'Javascript' && javaScriptIcon}
            </IconBubble>
          );
        })}
      </Animated.View>
    );
  };

  const handleClick = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading)
    return (
      <View style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
        <LottieView
          autoPlay
          style={styles.lottieStyle}
          loop={true}
          source={require('../assets/lottie/loading.json')}
        />
        <Text style={{fontWeight: '700', fontSize: 24, color: colors.black}}>
          Loading...
        </Text>
      </View>
    );

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
            marginVertical: 18,
            height: Dimensions.get('window').height * 0.35,
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
          {/* TO DO PAGINATION */}
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
  lottieStyle: {
    position: 'absolute',
    right: 0,
    bottom: 42,
    height: 100,
  },
});

export default ProjectScreen;
