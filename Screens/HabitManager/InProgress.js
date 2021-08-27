import React from 'react';
import {View, Text} from 'react-native';
import HabitsList from './HabitsList';

export default function InProgress() {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HabitsList />
    </View>
  );
}
