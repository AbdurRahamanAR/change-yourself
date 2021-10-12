/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import HabitsList from './HabitsList';
import {useHabitList} from '../../Components/HabitProvider';

export default function AllHabits() {
  const {habitList, deleteHabit} = useHabitList();

  return (
    <View style={styles.dropDownContainer}>
      <HabitsList habits={habitList} handleDelete={deleteHabit} />
    </View>
  );
}

const styles = StyleSheet.create({
  dropDownContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  dotMenu: {
    height: 40,
    width: 117,
    borderWidth: 1,
    borderColor: 'rgba(4, 4, 5, 0.2)',
    marginTop: 20,
    marginLeft: 16,
    paddingLeft: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
});
