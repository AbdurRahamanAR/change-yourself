/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {habit_types} from '.';
import Icon from '../../Components/Icon';
import {theme} from '../../config';

export default function HabitTypePickerFormIitem({
  value,
  onChange,
  style = {},
}) {
  const [selectedType, setSelectedType] = useState(value);

  return (
    <View style={{flexDirection: 'row', ...style}}>
      {Object.keys(habit_types).map(item => {
        const type = habit_types[item];
        const icon =
          type === habit_types.DO ? 'correct-filled' : 'wrong-filled';
        const text = type === habit_types.DO ? 'To-do' : 'Not to-do';
        return (
          <TouchableOpacity
            key={type}
            onPress={() => {
              setSelectedType(type);
              onChange(type);
            }}>
            <View
              style={[
                styles.button,
                {
                  marginRight: 20,
                  borderWidth: selectedType === type ? 1.5 : 0,
                  borderColor: theme.colors.primary,
                },
              ]}>
              <Icon name={icon} />
              <Text
                s
                style={{
                  marginTop: 10,
                  color: '#212525',
                  fontFamily: 'gilroy-regular',
                  fontSize: 14,
                }}>
                {text}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.accent,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 116,
    height: 90,
  },
});
