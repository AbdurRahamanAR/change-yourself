import moment from 'moment';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import {CURRENT_YEAR, CURRENT_MONTH, TODAY_DATE} from '../../App';

export function getDaysArrayByMonth(monthNo, year) {
  var daysInMonth = moment(`${year} ${monthNo}`, 'YYYY MM').daysInMonth();
  var arrDays = [];

  while (daysInMonth) {
    var current = moment().date(daysInMonth);
    arrDays.push(current);
    daysInMonth--;
  }

  return arrDays.reverse();
}

const DAY_BUTTON_WIDTH = 40;
const DAY_BUTTON_MARGIN = 13;

export default function DaySelect({
  month = CURRENT_MONTH,
  year = CURRENT_YEAR,
  value = TODAY_DATE,
  onChange,
  blockAfter,
}) {
  const [selectDay, setSelectDay] = useState(value);
  const [dateRef, setDateRef] = useState();
  const [days, setDays] = useState([]);
  const safeOnChange = useRef(onChange);

  useEffect(() => {
    if (dateRef) {
      setSelectDay(value);
      dateScrollHandler(value);
    }
  }, [value, dateScrollHandler, dateRef]);

  const handleSelectDay = date => {
    setSelectDay(date);
    dateScrollHandler(date);
    safeOnChange.current(date);
  };

  useEffect(() => {
    setDays(getDaysArrayByMonth(month, year));
  }, [month, year]);

  const dateScrollHandler = useCallback(
    to => {
      const windowWidth = Dimensions.get('window').width;
      if (dateRef) {
        dateRef.scrollTo({
          x:
            (to - 1) * (DAY_BUTTON_MARGIN + DAY_BUTTON_WIDTH) -
            windowWidth / 2 +
            36,
          y: 0,
          animated: true,
        });
      }
    },
    [dateRef],
  );

  return (
    <ScrollView
      horizontal
      style={styles.root}
      persistentScrollbar
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ref={ref => {
        setDateRef(ref);
      }}>
      {days.map((day, index) => {
        const selected = selectDay === index + 1;
        const backgroundColor = selected ? '#FF7648' : '#fff';
        const dayNameTextColor = selected ? '#fff' : '#BCC1CD';
        const dayDateTextColor = selected ? '#fff' : '#000';
        const marginLeft = index === 0 ? 0 : DAY_BUTTON_MARGIN;
        const date = index + 1;

        const shouldBlock =
          blockAfter.date < date &&
          month === blockAfter.month &&
          year === blockAfter.year;
        const disableColor = '#dddddd';

        if (shouldBlock) {
          return (
            <View
              key={month + day}
              style={{...styles.dayButton, backgroundColor, marginLeft}}>
              <Text
                style={{
                  color: disableColor,
                  ...styles.dayNameText,
                }}>
                {moment(day).format('dd')[0]}
              </Text>
              <Text
                style={{
                  color: disableColor,
                  ...styles.dayDateText,
                }}>
                {moment(day).format('DD')}
              </Text>
            </View>
          );
        }

        return (
          <TouchableOpacity
            onPress={e => handleSelectDay(date)}
            key={month + day}
            style={{...styles.dayButton, backgroundColor, marginLeft}}>
            <Text
              style={{
                color: dayNameTextColor,
                ...styles.dayNameText,
              }}>
              {moment(day).format('dd')[0]}
            </Text>
            <Text
              style={{
                color: dayDateTextColor,
                ...styles.dayDateText,
              }}>
              {moment(day).format('DD')}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: 26,
  },
  dayButton: {
    width: DAY_BUTTON_WIDTH,
    height: 57,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayNameText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    fontStyle: 'normal',
    marginBottom: 1,
  },
  dayDateText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
  },
});

DaySelect.defaultProps = {
  month: CURRENT_MONTH,
  year: CURRENT_YEAR,
  value: TODAY_DATE,
  onChange: () => {},
};

DaySelect.propTypes = {
  month: PropTypes.number,
  year: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.number,
};
