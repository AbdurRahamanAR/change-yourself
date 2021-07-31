/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from '../../Components/Icon';

export default function HabitTypePickerFormIitem({style = {}}) {
  const [selectedType, setSelectedType] = useState(1);

  return (
    <View style={{flexDirection: 'row', ...style}}>
      <TouchableOpacity onPress={() => setSelectedType(1)}>
        <View
          style={[
            styles.button,
            {
              marginRight: 20,
              borderWidth: selectedType === 1 ? 1.5 : 0,
              borderColor: '#FF6E50',
            },
          ]}>
          <Icon name="correct-filled" />
          <Text
            s
            style={{
              marginTop: 10,
              color: '#212525',
              fontFamily: 'gilroy-regular',
              fontSize: 14,
            }}>
            To-do
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSelectedType(0)}>
        <View
          style={[
            styles.button,
            {
              marginRight: 20,
              borderWidth: selectedType === 0 ? 1.5 : 0,
              borderColor: '#FF6E50',
            },
          ]}>
          <Icon name="wrong-filled" />
          <Text
            style={{
              marginTop: 10,
              color: '#212525',
              fontFamily: 'gilroy-regular',
              fontSize: 14,
            }}>
            Not to-do
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F5F5F7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 116,
    height: 90,
  },
});
