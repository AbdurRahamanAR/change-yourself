/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Calendar from '../Components/Calendar';

export default function Home() {
  const [selectDate, setSelectDate] = useState(moment());
  return (
    <View style={{backgroundColor: '#fff', height: 800, padding: 16}}>
      <Text>Home</Text>
      <Calendar
        value={selectDate}
        onChange={v => {
          setSelectDate(v);
        }}
      />
    </View>
  );
}
