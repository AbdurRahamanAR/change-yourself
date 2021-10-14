/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {useHabitList} from '../../Provider/HabitProvider';
import HabitsList from './HabitsList';

export default function InProgress() {
  const {habitList, deleteHabit} = useHabitList();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HabitsList habits={habitList} handleDelete={deleteHabit} />
    </View>
  );
}
