import React, {useState} from 'react';
import {View, Picker, StyleSheet, Text} from 'react-native';
import HabitsList from './HabitsList';

export default function AllHabits() {
  const [selectedValue, setSelectedValue] = useState('Archived');

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <Picker
          selectedValue={selectedValue}
          style={styles.dropDown}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          <Picker.Item label="Archived" value="Archived" />
          <Picker.Item label="New" value="New" />
          <Picker.Item label="Old" value="Old" />
        </Picker>
      </View>
      <HabitsList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,

    borderWidth: 1,
  },
  dropDown: {
    height: 50,
    width: 150,
  },
});
