import {colors} from '../utils/Colors';
import Faded from '../components/Faded';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import IconBubble from '../components/IconBubble';
import CarouselItem from '../components/CarouselItem';
import React, {useEffect, useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, StyleSheet, Dimensions, Animated, Linking} from 'react-native';
import {DATA} from '../assets/carouselData';

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
      <Ionicons size={35} name={'logo-javascript'} color={colors.mainBg} />
    );
    const react = (
      <Ionicons size={35} name={'logo-react'} color={colors.mainBg} />
    );

    return (
      <Animated.View style={[translateStyle, styles.animatedIcons]}>
        {DATA[activeIndex]?.technologies.map((tech, i) => {
          return (
            <IconBubble key={i} index={i}>
              {tech.includes('React') && react}
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

  return (
    <>
      <View style={styles.container}>
        <View style={{height: Dimensions.get('window').height / 2.5}}>
          <Animated.Image
            style={{
              width: '100%',
              height: Dimensions.get('window').height / 2.5,
              opacity: fadeValue,
            }}
            resizeMode={'stretch'}
            source={DATA[activeIndex]?.image}
          />
          <View style={styles.fadeStyle}>
            <Faded color={colors.mainBg} height={50} direction={'up'} />
          </View>
        </View>
        {getIcons()}
        <View
          style={{
            marginVertical: 10,
            height: 250,
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
          <Pagination
            dotsLength={DATA.length}
            activeDotIndex={activeIndex}
            dotStyle={styles.dotStyle}
            inactiveDotStyle={styles.inactiveDotStyle}
            containerStyle={{paddingVertical: 0}}
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
    paddingTop: 15,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dotStyle: {
    width: 36,
    height: 9,
    borderRadius: 8,
    marginTop: 10,
    marginHorizontal: -7,
    margin: 0,
    padding: 0,
    backgroundColor: colors.softCyan,
  },
  inactiveDotStyle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: -7,
    margin: 0,
    padding: 0,
    backgroundColor: colors.darkCyan,
  },
});

export default ProjectScreen;
