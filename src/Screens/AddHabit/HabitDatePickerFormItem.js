/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import {ErrroMessageViewer} from '.';
import Icon from '../../Components/Icon';

const DayList = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wenesday',
  'Thursday',
  'Firday',
  'Saturday',
];

export default function HabitDatePickerFormItem({
  style = {},
  value = [],
  onChange,
  error,
}) {
  const {colors} = useTheme();
  const [selectedDay, setSelectedDay] = useState(value);

  const handleSelectDay = (index, active) => {
    if (active) {
      setSelectedDay(state => {
        const newData = state.filter(item => item !== index);
        onChange(newData);
        return newData;
      });
    } else {
      setSelectedDay(state => {
        const newData = [...state, index];
        onChange(newData);
        return newData;
      });
    }
  };

  return (
    <>
      <View style={{flexDirection: 'row', ...style}}>
        {DayList.map((day, index) => {
          const active = selectedDay.includes(index);
          return (
            <TouchableOpacity
              key={day}
              style={{
                width: 33,
                height: 35,
                marginRight: 15,
                backgroundColor: active ? colors.primary : colors.accent,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                handleSelectDay(index, active);
              }}>
              <Text style={{color: active ? '#fff' : '#212525'}}>{day[0]}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
          onPress={() => {
            if (selectedDay.length === 7) {
              const newValue = [];
              onChange(newValue);
              setSelectedDay(newValue);
            } else {
              const newValue = [0, 1, 2, 3, 4, 5, 6];
              onChange(newValue);
              setSelectedDay(newValue);
            }
          }}>
          <Icon
            name="correct-square"
            size={20}
            color={selectedDay.length === 7 ? colors.primary : '#F5F3FC'}
          />
          <Text style={{marginLeft: 12}}>Repeat Everyday</Text>
        </TouchableOpacity>
        <View style={{marginLeft: 'auto'}}>
          <ErrroMessageViewer error={error} />
        </View>
      </View>
    </>
  );
}
