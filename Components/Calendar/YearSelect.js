import React, {useEffect, useState, useRef, useCallback} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Icon from '../Icon';
import {CURRENT_YEAR} from '../../App';

const supportYears = [2021, 2022, 2023, 2024, 2025];

const WINDOW_WIDTH = Dimensions.get('window').width;

// width cut by 2 arrow buttoms
const CUT_WIDTH = 64;

const getScrollX = nextIdx => {
  return nextIdx * WINDOW_WIDTH - CUT_WIDTH * nextIdx;
};

const getYearIndex = year => supportYears.findIndex(item => item === year);

export default function YearSelect({onChange, value, blockAfter}) {
  const [yearRef, setYearRef] = useState();
  const [activeIdx, setActiveIdx] = useState(getYearIndex(value));
  const safeOnChange = useRef(onChange);

  useEffect(() => {
    if (yearRef) {
      handleScrollTo(getYearIndex(value), false);
    }
  }, [value, handleScrollTo, yearRef]);

  const handlePev = () => {
    const nextIdx = activeIdx - 1;
    if (activeIdx !== 0) {
      setActiveIdx(state => state - 1);
      safeOnChange.current(supportYears[nextIdx]);
      handleScrollTo(nextIdx);
    }
  };

  const handleNext = () => {
    const nextIdx = activeIdx + 1;
    if (nextIdx !== supportYears.length) {
      setActiveIdx(state => state + 1);
      safeOnChange.current(supportYears[nextIdx]);
      handleScrollTo(nextIdx);
    }
  };

  const handleScrollTo = useCallback(
    (index, animated = true) => {
      yearRef.scrollTo({
        x: getScrollX(index),
        y: 0,
        animated,
      });
    },
    [yearRef],
  );

  return (
    <View style={styles.root}>
      {activeIdx !== 0 ? (
        <TouchableOpacity onPress={handlePev}>
          <Icon name="arrow_left" size={16} color="rgba(4, 4, 5, 0.5)" />
        </TouchableOpacity>
      ) : (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{width: 16}} />
      )}
      <ScrollView
        horizontal
        persistentScrollbar
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={styles.yearScrollList}
        ref={ref => {
          setYearRef(ref);
        }}>
        {supportYears.map((year, index) => (
          <View
            key={year}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: Dimensions.get('window').width - 64,
              alignItems: 'center',
            }}>
            <Text style={styles.yearText}>{year}</Text>
          </View>
        ))}
      </ScrollView>

      {activeIdx !== supportYears.length - 1 &&
      blockAfter > supportYears[activeIdx] ? (
        <TouchableOpacity onPress={handleNext}>
          <Icon name="arrow_right" size={16} color="rgba(4, 4, 5, 0.5)" />
        </TouchableOpacity>
      ) : (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{width: 16}} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {display: 'flex', alignItems: 'center', flexDirection: 'row'},
  yearScrollList: {
    flexDirection: 'row',
    display: 'flex',
  },
  yearText: {
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(33, 37, 37, 1)',
    fontFamily: 'Gilroy-Bold',
  },
});

YearSelect.defaultProps = {
  onChange: () => {},
  value: CURRENT_YEAR,
};

YearSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOf(supportYears),
  blockAfter: PropTypes.number,
};
