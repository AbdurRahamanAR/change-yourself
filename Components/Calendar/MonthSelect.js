import moment from 'moment';
import React, {useCallback, useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {CURRENT_MONTH} from '.';

const MONTHS = moment.months();

const MONTH_ITEM_WIDTH = 110;

export default function MonthSelect({onChange, value}) {
  console.log(value);
  const [monthRef, setMonthRef] = useState();
  const [selectMonth, setSelectMonth] = useState(value);
  const safeOnChange = useRef(onChange);

  useEffect(() => {
    if (monthRef) {
      monthScrollHandler(value);
    }
  }, [value, monthScrollHandler, monthRef]);

  const monthScrollHandler = useCallback(
    to => {
      const windowWidth = Dimensions.get('window').width;
      monthRef.scrollTo({
        x: (to - 1) * MONTH_ITEM_WIDTH - windowWidth / 2 + 72,
        y: 0,
        animated: true,
      });
    },
    [monthRef],
  );

  const handleSelectMonth = monthNumber => {
    setSelectMonth(monthNumber);
    safeOnChange.current(monthNumber);
    monthScrollHandler(monthNumber);
  };

  return (
    <ScrollView
      horizontal
      persistentScrollbar
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ref={ref => {
        setMonthRef(ref);
      }}>
      {MONTHS.map((month, index) => {
        const monthNo = index + 1;
        const color =
          selectMonth === monthNo ? '#FF6E50' : 'rgba(4, 4, 5, 0.5)';
        const fontWeight = selectMonth === monthNo ? 'bold' : '500';
        return (
          <TouchableOpacity
            style={styles.monthButton}
            onPress={e => handleSelectMonth(monthNo)}
            key={month}>
            <Text
              style={{
                ...styles.monthText,
                fontWeight,
                color,
              }}>
              {month}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  monthButton: {
    padding: 15,
    width: MONTH_ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

MonthSelect.defaultProps = {
  onChange: () => {},
  value: CURRENT_MONTH,
};

MonthSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
};
