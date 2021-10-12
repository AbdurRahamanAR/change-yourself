/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useTheme} from 'react-native-paper';
import Icon from '../Icon';

const slides = [
  {
    key: '1',
    title: 'The best time to start\nis now!',
    text: 'If you are looking for a change\nthen the time is now.\nLet us help you in your journey.',
    image: require('../../assets/img/intro-slide-1.png'),
  },
  {
    key: '2',
    title: 'Track your habit & your\naccomplishment ',
    text: 'While building your habit or giving up\na bad habit track them with us.\nAnd track your accomplishments too.',
    image: require('../../assets/img/intro-slide-2.png'),
  },
  {
    key: '3',
    title: 'Get notified to keep\nforming habits',
    text: 'In case you might forget about your\nhabit, we will notify you if you\nhavent done it yet.',
    image: require('../../assets/img/intro-slide-3.png'),
  },
];

export default function IntroSlider({onDone}) {
  const sliderRef = useRef();
  const {colors} = useTheme();

  const handleOnDone = () => {
    if (onDone && typeof onDone !== 'function') {
      throw new Error(
        `onDone must be a function but you provied ${typeof onDone}`,
      );
    }
    if (onDone) {
      onDone();
    } else {
      console.warn('onDone function not provided.');
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const renderPagination = activeIndex => {
    return (
      <View style={styles.paginationContainer}>
        <View style={styles.paginationDots}>
          {slides.length > 1 &&
            slides.map((_, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.dot,
                  i === activeIndex
                    ? {backgroundColor: colors.primary}
                    : {backgroundColor: 'rgba(255, 110, 80, 0.1)'},
                ]}
                onPress={() => sliderRef.current?.goToSlide(i, true)}
              />
            ))}
        </View>
        {activeIndex < slides.length - 1 ? (
          <View
            style={[
              styles.nextButton,
              {
                backgroundColor: colors.primary,
              },
            ]}>
            <TouchableOpacity
              onPress={() => sliderRef.current.goToSlide(activeIndex + 1)}>
              <Icon name="fancy_arrow_right" color="#fff" size={27} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={{
              height: 54,
              width: '100%',
              borderRadius: 10,
              backgroundColor: colors.primary,
              marginTop: 39,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleOnDone}>
            <Text style={styles.doneButText}>Let's get started</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const keyExtractor = item => item.key;

  return (
    <AppIntroSlider
      keyExtractor={keyExtractor}
      ref={sliderRef}
      renderItem={renderItem}
      data={slides}
      renderPagination={renderPagination}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    paddingTop: 126,
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    maxWidth: 300,
    maxHeight: 225,
  },
  title: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 28,
    lineHeight: 39,
    fontFamily: 'gilroy-bold',
  },
  text: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 19,
    fontFamily: 'gilroy-regular',
    opacity: 0.6,
  },
  paginationContainer: {
    position: 'absolute',
    top: 560,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  paginationDots: {
    height: 16,
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  nextButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 34,
  },
  doneButText: {
    color: '#fff',
    fontFamily: 'gilroy-bold',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
  },
});
