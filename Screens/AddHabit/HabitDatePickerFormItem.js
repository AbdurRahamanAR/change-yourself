/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const DayList = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wenesday',
  'Thursday',
  'Firday',
  'Saturday',
];

export default function HabitDatePickerFormItem({style = {}}) {
  const [selectedDay, setSelectedDay] = useState([]);

  return (
    <View style={{flexDirection: 'row', ...style}}>
      {DayList.map(day => {
        const active = selectedDay.includes(day);
        return (
          <TouchableOpacity
            key={day}
            style={{
              width: 33,
              height: 35,
              marginRight: 15,
              backgroundColor: active ? '#FF6E50' : '#F5F5F7',
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              if (active) {
                setSelectedDay(state => state.filter(item => item !== day));
              } else {
                setSelectedDay(state => [...state, day]);
              }
            }}>
            <Text style={{color: active ? '#fff' : '#212525'}}>{day[0]}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
