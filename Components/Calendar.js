/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

function getDaysArrayByMonth(month) {
  var daysInMonth = moment(`2021 ${month}`, 'YYYY MM').daysInMonth();
  var arrDays = [];

  while (daysInMonth) {
    var current = moment().date(daysInMonth);
    arrDays.push(current);
    daysInMonth--;
  }

  return arrDays.reverse();
}

export default function Calendar({onChange = () => {}, value = moment()}) {
  const months = moment.months();
  const now = moment();
  const [selectMonth, setSelectMonth] = useState(value.month() + 1);
  const [selectDay, setSelectDay] = useState(value.date());
  const [days, setDays] = useState(() => getDaysArrayByMonth(selectMonth));
  const [monthRef, setMonthRef] = useState();
  const [dateRef, setDateRef] = useState();

  useEffect(() => {
    setDays(getDaysArrayByMonth(selectMonth));
  }, [selectMonth]);

  const handleSelectMonth = index => {
    setSelectMonth(index + 1);
    if (now.month() !== index) {
      setSelectDay(1);
    }
  };

  useEffect(() => {
    onChange(moment(`${selectMonth} ${selectDay}`, 'mm DD'));
    if (dateRef && monthRef) {
      dateScrollHandler(selectDay - 1);
      monthScrollHandler(selectMonth - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dateRef,
    monthRef,
    selectDay,
    selectMonth,
    monthScrollHandler,
    dateScrollHandler,
  ]);

  const handleSelectDay = index => {
    setSelectDay(index + 1);
  };

  const monthScrollHandler = useCallback(
    to => {
      const windowWidth = Dimensions.get('window').width;
      if (monthRef) {
        monthRef.scrollTo({
          x: to * 110 - windowWidth / 2 + 80,
          y: 0,
          animated: true,
        });
      }
    },
    [monthRef],
  );

  const dateScrollHandler = useCallback(
    to => {
      const windowWidth = Dimensions.get('window').width;
      if (dateRef) {
        dateRef.scrollTo({
          x: to * 55 - windowWidth / 2,
          y: 0,
          animated: true,
        });
      }
    },
    [dateRef],
  );

  return (
    <View style={{marginTop: 25, backgroundColor: 'none'}}>
      <ScrollView
        horizontal
        persistentScrollbar
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ref={ref => {
          setMonthRef(ref);
        }}>
        {months.map((month, index) => (
          <TouchableOpacity onPress={e => handleSelectMonth(index)} key={month}>
            <View
              style={{
                padding: 15,
                width: 110,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  fontWeight: '500',
                  color:
                    selectMonth === index + 1
                      ? '#212525'
                      : 'rgba(4, 4, 5, 0.5)',
                }}>
                {month}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        style={{marginTop: 26}}
        persistentScrollbar
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ref={ref => {
          setDateRef(ref);
        }}>
        {days.map((day, index) => {
          const selected = selectDay === index + 1;
          return (
            <TouchableOpacity
              onPress={e => handleSelectDay(index)}
              key={selectMonth + day}>
              <View
                style={{
                  width: 40,
                  height: 57,
                  backgroundColor: selected ? '#FF7648' : '#fff',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: index === 0 ? 0 : 13,
                }}>
                <Text
                  style={{
                    color: selected ? '#fff' : '#BCC1CD',
                    fontSize: 12,
                    lineHeight: 18,
                    fontWeight: '500',
                    fontStyle: 'normal',
                    marginBottom: 1,
                  }}>
                  {moment(day).format('dd')[0]}
                </Text>
                <Text
                  style={{
                    color: selected ? '#fff' : '#000',
                    fontSize: 16,
                    lineHeight: 24,
                    fontWeight: 'bold',
                  }}>
                  {moment(day).format('DD')}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
