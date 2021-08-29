/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Text, ScrollView, StyleSheet, View, Dimensions} from 'react-native';
import {CURRENT_YEAR, CURRENT_MONTH} from '../../App';
import {useCallback} from 'react';

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

export default function ActivityViewer({
  month = CURRENT_MONTH,
  year = CURRENT_YEAR,
  data,
}) {
  const [days, setDays] = useState([]);
  const [dateRef, setDateRef] = useState();

  useEffect(() => {
    setDays(getDaysArrayByMonth(month, year));
  }, [month, year, dateScrollHandler]);
  useEffect(() => {
    if (dateRef) {
      dateScrollHandler(moment().date());
    }
  }, [dateRef, dateScrollHandler]);

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
        const marginLeft = index === 0 ? 0 : DAY_BUTTON_MARGIN;
        const isToday = moment().date() === index + 1;
        return (
          <View
            key={month + day}
            style={{
              ...styles.dayButton,
              backgroundColor: '#fff',
              marginLeft,
            }}>
            <Text
              style={{
                color: isToday ? '#FF6E50' : '#BCC1CD',
                ...styles.dayNameText,
              }}>
              {moment(day).format('dd')[0]}
            </Text>
            <Text
              style={{
                color: isToday ? '#FF6E50' : '#000',
                ...styles.dayDateText,
              }}>
              {moment(day).format('DD')}
            </Text>
            <View
              style={[
                styles.indecator,
                {backgroundColor: data[index] ? '#FF6E50' : '#fff'},
              ]}
            />
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: 27,
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
  indecator: {
    width: 4,
    height: 4,
    borderRadius: 4,
    marginTop: 5,
  },
});

ActivityViewer.defaultProps = {
  month: CURRENT_MONTH,
  year: CURRENT_YEAR,
};

ActivityViewer.propTypes = {
  month: PropTypes.number,
  year: PropTypes.number,
};
