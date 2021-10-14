/* eslint-disable react-native/no-inline-styles */
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {useHabitList} from '../../Provider/HabitProvider';
import HabitsList from './HabitsList';

export default function InProgress() {
  const {habitList, deleteHabit} = useHabitList();
  const progressList = useMemo(
    () => habitList.filter(habit => !habit.completed),
    [habitList],
  );

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HabitsList habits={progressList} handleDelete={deleteHabit} />
    </View>
  );
}
