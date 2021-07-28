/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Calendar from '../../Components/Calendar/index';
import OverviewCard from './OverviewCard';
import TaskList from './TaskList';

export default function Home() {
  const [selectDate, setSelectDate] = useState(moment());
  return (
    <View style={{backgroundColor: '#fff', height: 800, padding: 16}}>
      <Text
        style={{
          fontSize: 24,
          lineHeight: 29,
          color: '#212525',
          marginBottom: 20,
          fontFamily: 'Gilroy-Sami-Bold',
          marginTop: 17,
        }}>
        Let’s make some {'\n'}great habit together
      </Text>
      <OverviewCard />
      <Calendar
        value={selectDate}
        onChange={v => {
          setSelectDate(v);
        }}
      />
      <TaskList />
      <TouchableOpacity>
        <Text
          style={{
            marginTop: 20,
            fontWeight: 'bold',
            fontSize: 16,
            lineHeight: 20,
            color: '#212525',
          }}>
          + Add a habit
        </Text>
      </TouchableOpacity>
    </View>
  );
}
