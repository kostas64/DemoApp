import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ImageBackground,
  StatusBar,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Title from '../components/title';
import {CommonStyles} from '../utils/CommonStyles';
import {colors} from '../utils/Colors';
import Strings from '../assets/dictionaries/strings.json';
import Carousel from 'react-native-snap-carousel';

const WIDTH_CARD_MAX = 280;
const WIDTH_SCREEN_MAX = 375;
const WIDTH_CARD_MIN = 260;
const WIDTH_SCREEN_MIN = 320;
const HEIGHT_CARD_MIN = 280;
const WIDTH_THR = 320;
const SCREEN_WIDTH = Dimensions.get('window').width;

const ProjectScreen = () => {
  const {shadowStyle} = CommonStyles;
  const carouselRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const DATA = [
    {
      id: '1',
      title: 'Authentication App',
      description:
        'This app contains logic about authentication logic. Also it follows react native docs on how to handle navigation based on user token.',
      technologies: ['React Native', 'Javascript'],
      image: require('../assets/images/mountain.jpeg'),
    },
    {
      id: '2',
      title: 'Demonstration App',
      description:
        'This project is the one you use right now. App demonstrates mechanisms of React Native and how i use them. Some of them is DrawerNavigation, Lotties, Animated API, AppState and Carousel',
      technologies: ['React Native', 'Javascript'],
      image: require('../assets/images/lake.jpeg'),
    },
  ];

  const getSize = () => {
    if (SCREEN_WIDTH > WIDTH_THR) {
      return (WIDTH_CARD_MAX * SCREEN_WIDTH) / WIDTH_SCREEN_MAX;
    } else {
      return (WIDTH_CARD_MIN * SCREEN_WIDTH) / WIDTH_SCREEN_MIN;
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        key={index}
        style={[
          shadowStyle,
          {
            flex: 1,
            backgroundColor: colors.darkCyan,
            padding: 8,
            borderRadius: 12,
          },
        ]}>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
        <Text>{item.technologies}</Text>
      </View>
    );
  };

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <ImageBackground
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
          }}
          imageStyle={{resizeMode: 'cover'}}
          source={DATA[activeIndex]?.image}
        />
        {/* getIcons() to Show tech, LinearGradient*/}
        <View style={{flex: 1, alignItems: 'center', marginVertical: 32}}>
          <Carousel
            data={DATA}
            ref={carouselRef}
            renderItem={renderItem}
            itemWidth={getSize() + 16}
            sliderWidth={SCREEN_WIDTH}
            onSnapToItem={index => setActiveIndex(index)}
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
});

export default ProjectScreen;
