import moment from 'moment';
import React, {useCallback, useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import {CURRENT_MONTH} from '../../App';
import {useTheme} from 'react-native-paper';

const MONTHS = moment.months();

const MONTH_ITEM_WIDTH = 110;

export default function MonthSelect({onChange, value, blockAfter, selectYear}) {
  const {colors} = useTheme();
  const [monthRef, setMonthRef] = useState();
  const [selectMonth, setSelectMonth] = useState(value);
  const safeOnChange = useRef(onChange);

  useEffect(() => {
    if (monthRef) {
      setSelectMonth(value);
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
          selectMonth === monthNo ? colors.primary : colors.textSecondary;
        const fontWeight = selectMonth === monthNo ? 'bold' : '500';
        const shouldBlock =
          monthNo > blockAfter.month && selectYear === blockAfter.year;

        if (shouldBlock) {
          return (
            <View style={styles.monthButton} key={month}>
              <Text
                style={{
                  ...styles.monthText,
                  fontWeight,
                  color: colors.disabled,
                }}>
                {month}
              </Text>
            </View>
          );
        }

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
  blockAfter: PropTypes.object,
};
